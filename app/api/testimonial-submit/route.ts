// app/api/testimonial-submit/route.ts
// ------------------------------------
// POST: stores a testimonial in Supabase for moderation.
//
//   1. Signed invitation, not expired, not used, with a session key bound to
//      it (lib/security/testimonialInvite.ts)
//   2. Rate limit: 3 submissions / 24h per IP (Upstash Redis)
//   3. Honeypot ("website" must be empty)
//   4. Required fields (full_name, role, relation_type, message, locale) and
//      maximum lengths
//   5. Insert with the service_role client, approved = false
//
// Uses TESTIMONIAL_SUBMIT_TOKEN, IP_HASH_SALT and the Supabase service_role
// key (server-only, never NEXT_PUBLIC_).

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { testimonialRatelimit, safeLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";
import {
  isInviteUsed,
  isInviteValid,
  isSessionKeyValid,
  markInviteUsed,
} from "@/lib/security/testimonialInvite";

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

  // ── 6. IP pseudonymisation (GDPR) ───────────────────────────────────────────
  // The IP is personal data: it is hashed with a secret salt (IP_HASH_SALT)
  // before storage, which still allows abuse detection.
  const ipHashSalt = process.env.IP_HASH_SALT ?? "";
  const ipHash = createHash("sha256")
    .update(ip + ipHashSalt)
    .digest("hex");

  // ── 7. Insert (service_role bypasses RLS) ───────────────────────────────────
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("testimonial_submissions").insert({
    full_name,
    role,
    company:               company || null,
    relation_type,
    collaboration_context,
    message,
    photo_url,
    locale,
    approved:              false,    // always false: manual moderation
    submitted_ip:          ipHash,   // salted SHA-256 hash, never the raw IP
  });

  if (error) {
    console.error("[testimonial-submit] Supabase error:", error.message);
    return NextResponse.json({ error: "Database error. Please try again." }, { status: 500 });
  }

  // Single use: the invitation stays marked until it expires. A failure here
  // does not undo the stored testimonial.
  await markInviteUsed(invite, expUnix).catch((e) =>
    console.error("[testimonial-submit] could not mark invite as used:", String(e)),
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
