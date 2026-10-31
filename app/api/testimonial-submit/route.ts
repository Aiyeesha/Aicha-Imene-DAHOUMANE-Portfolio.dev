// app/api/testimonial-submit/route.ts
// ------------------------------------
// POST: emails a testimonial to the site owner through Formhook, like the
// contact form (app/api/contact/route.ts). Nothing is stored server side:
// moderation happens when reading the email, and a published testimonial is
// added to content/testimonials.ts by hand.
//
//   1. Signed invitation, not expired, not used, with a session key bound to
//      it (lib/security/testimonialInvite.ts)
//   2. Rate limit: 3 submissions / 24h per IP (Upstash Redis)
//   3. Honeypot ("website" must be empty)
//   4. Required fields (full_name, role, relation_type, message, locale) and
//      maximum lengths
//   5. Atomic single-use claim of the invitation (Redis SET NX)
//   6. Delivery to Formhook (same endpoint and token as the contact form);
//      on failure the invitation is released so the author can retry
//
// Uses TESTIMONIAL_SUBMIT_TOKEN, FORMHOOK_ENDPOINT and FORMHOOK_AUTH_TOKEN
// (server-only, never NEXT_PUBLIC_).

import { NextRequest, NextResponse } from "next/server";
import { log } from "@/lib/logger";
import { testimonialRatelimit, safeLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";
import {
  claimInvite,
  isInviteUsed,
  isInviteValid,
  isSessionKeyValid,
  releaseInvite,
} from "@/lib/security/testimonialInvite";

// Formhook call timeout, so a slow upstream cannot keep the function open
// until the platform timeout (same value as the contact form).
const FORMHOOK_TIMEOUT_MS = 5000;

// ── Allowed relation_type values ──────────────────────────────────────────────
const VALID_RELATIONS = new Set([
  "colleague", "trainer", "jury", "classmate", "client", "other"
]);

export async function POST(req: NextRequest) {
  // ── 1. Per-IP rate limit ────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const { success: rateLimitOk } = await safeLimit(testimonialRatelimit, ip);
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // ── 2. Parse the JSON body ──────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // ── 3. Honeypot ("website" must be missing or empty) ────────────────────────
  if (body.website) {
    // Bot: answer 200 so it is not tipped off
    return NextResponse.json({ ok: true });
  }

  // ── 4. Invitation and session key ───────────────────────────────────────────
  // The signed invitation must be valid, unexpired and unused; the session key
  // is an HMAC of the invitation and a 30-minute slot, issued by the server
  // page. The raw token is never exposed.
  const secret     = process.env.TESTIMONIAL_SUBMIT_TOKEN ?? "";
  const invite     = typeof body.invite === "string" ? body.invite.trim() : "";
  const expUnix    = typeof body.exp === "number" ? body.exp : NaN;
  const sessionKey = typeof body.sessionKey === "string" ? body.sessionKey.trim() : "";

  if (!isInviteValid(secret, invite, expUnix) || !isSessionKeyValid(secret, invite, sessionKey)) {
    return NextResponse.json(
      { error: "Invalid or missing access token." },
      { status: 403 }
    );
  }
  if (await isInviteUsed(invite)) {
    return NextResponse.json(
      { error: "This invitation has already been used." },
      { status: 410 }
    );
  }

  // ── 5. Required fields ──────────────────────────────────────────────────────
  const full_name             = typeof body.full_name === "string" ? body.full_name.trim() : "";
  const role                  = typeof body.role === "string" ? body.role.trim() : "";
  const company               = typeof body.company === "string" ? body.company.trim() : null;
  const relation_type         = typeof body.relation_type === "string" ? body.relation_type.trim() : "";
  const collaboration_context = typeof body.collaboration_context === "string"
    ? body.collaboration_context.trim() || null
    : null;
  const message               = typeof body.message === "string" ? body.message.trim() : "";
  const photo_url             = typeof body.photo_url === "string" ? body.photo_url.trim() || null : null;
  const locale                = body.locale === "fr" ? "fr" : body.locale === "es" ? "es" : "en";

  if (!full_name)                         return NextResponse.json({ error: "Name is required." }, { status: 400 });
  if (!role)                              return NextResponse.json({ error: "Role is required." }, { status: 400 });
  if (!VALID_RELATIONS.has(relation_type)) return NextResponse.json({ error: "Invalid relation type." }, { status: 400 });
  if (message.length < 20)               return NextResponse.json({ error: "Message too short (20 chars min)." }, { status: 400 });
  if (message.length > 2000)             return NextResponse.json({ error: "Message too long (2000 chars max)." }, { status: 400 });
  // Maximum lengths
  if (full_name.length > 100 || role.length > 100 || (company?.length ?? 0) > 100) {
    return NextResponse.json({ error: "Field too long (100 chars max)." }, { status: 400 });
  }
  if ((collaboration_context?.length ?? 0) > 500 || (photo_url?.length ?? 0) > 500) {
    return NextResponse.json({ error: "Field too long (500 chars max)." }, { status: 400 });
  }

  // photo_url must be a valid https URL or null: blocks javascript: URLs and
  // mixed content.
  if (photo_url) {
    try {
      const parsed = new URL(photo_url);
      if (parsed.protocol !== "https:") {
        return NextResponse.json({ error: "Invalid photo URL protocol." }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid photo URL format." }, { status: 400 });
    }
  }

  // ── 6. Single use: atomic claim before delivery ──────────────────────────────
  // The isInviteUsed() check above only gives an early, friendly answer; two
  // concurrent requests can both pass it. SET NX lets exactly one through.
  if (!(await claimInvite(invite, expUnix))) {
    return NextResponse.json(
      { error: "This invitation has already been used." },
      { status: 410 }
    );
  }

  // ── 7. Delivery by email (Formhook) ─────────────────────────────────────────
  // Read at request time so tests and redeploys pick up the current values.
  const endpoint = process.env.FORMHOOK_ENDPOINT || "";
  const authToken = process.env.FORMHOOK_AUTH_TOKEN || "";

  // Gives the link back so the author can retry, then answers with `status`.
  const fail = async (status: number, error: string) => {
    await releaseInvite(invite).catch((e) =>
      log.error("testimonial/release-failed", { error: String(e) }),
    );
    return NextResponse.json({ error }, { status });
  };

  if (!endpoint) {
    // Never accept a testimonial that would go nowhere.
    log.error("testimonial/formhook-not-configured", {});
    return fail(503, "Testimonial delivery is not configured.");
  }

  let resp: Response;
  try {
    resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(authToken ? { "X-Auth-Token": authToken } : {}),
      },
      body: JSON.stringify({
        name: full_name,
        topic: "testimonial",
        subject: `Nouveau témoignage — ${full_name}, ${role}`,
        role,
        company: company || "",
        relation_type,
        collaboration_context: collaboration_context || "",
        message,
        photo_url: photo_url || "",
        locale,
        source: "Aicha-Imene-DAHOUMANE-Portfolio.dev",
      }),
      signal: AbortSignal.timeout(FORMHOOK_TIMEOUT_MS),
    });
  } catch (err) {
    log.error("testimonial/formhook-unreachable", { error: err instanceof Error ? err.name : "unknown" });
    return fail(502, "Delivery failed. Please try again.");
  }

  if (!resp.ok) {
    log.error("testimonial/formhook-failed", { status: resp.status });
    return fail(502, "Delivery failed. Please try again.");
  }

  // No personal data in the log.
  log.info("testimonial/sent-via-formhook", { relation_type, locale });
  return NextResponse.json({ ok: true }, { status: 201 });
}
