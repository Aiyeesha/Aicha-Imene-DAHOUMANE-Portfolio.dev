// app/api/admin/testimonial-invite/route.ts
// ------------------------------------------
// Admin endpoint generating a time-limited HMAC invitation link for the
// testimonial page. The link never contains TESTIMONIAL_SUBMIT_TOKEN, only a
// signed, timestamped derivative:
//   invite = HMAC-SHA256(TESTIMONIAL_SUBMIT_TOKEN, "testimonial-invite:" + exp)
//   URL    = /{locale}/testimonial-submit?invite={invite}&exp={exp}
//
// Auth: Bearer ADMIN_PASSWORD (timing-safe). Rate limit shared with
// adminRatelimit (5 requests / 15 min / IP).
//
//   curl -X POST https://yoursite.com/api/admin/testimonial-invite \
//     -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
//     -H "Content-Type: application/json" \
//     -d '{"locale":"fr","days":7}'

import { NextRequest, NextResponse } from "next/server";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { adminRatelimit, safeLimit } from "@/lib/ratelimit";
import { getSiteUrl } from "@/lib/siteUrl";
import { MAX_INVITE_DAYS, signInvite } from "@/lib/security/testimonialInvite";

export const runtime = "nodejs";

// At most 14 days (lib/security/testimonialInvite.ts).
const MAX_DAYS = MAX_INVITE_DAYS;
const DEFAULT_DAYS = 7;

export async function POST(req: NextRequest) {
  // ── 1. Rate limit (brute force) ────────────────────────────────────────────
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success: rateLimitOk } = await safeLimit(adminRatelimit, `invite:${ip}`);
  if (!rateLimitOk) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  // ── 2. Bearer ADMIN_PASSWORD ────────────────────────────────────────────────
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedPass) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!(await timingSafeStringEqual(bearerToken, expectedPass))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // ── 3. TESTIMONIAL_SUBMIT_TOKEN configured? ───────────────────────────────
  const secret = process.env.TESTIMONIAL_SUBMIT_TOKEN ?? "";
  if (!secret) {
    return NextResponse.json({ error: "Testimonial feature not configured." }, { status: 503 });
  }

  // ── 4. Optional parameters ──────────────────────────────────────────────────
  let days = DEFAULT_DAYS;
  let locale: "en" | "fr" | "es" = "en";

  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (typeof body.days === "number" && body.days > 0 && body.days <= MAX_DAYS) {
      days = Math.floor(body.days);
    }
    if (body.locale === "fr") locale = "fr";
    else if (body.locale === "es") locale = "es";
  } catch {
    // Missing or invalid body: defaults
  }

  // ── 5. Invitation HMAC ─────────────────────────────────────────────────────
  // exp = link expiry, Unix seconds
  const expUnix = Math.floor(Date.now() / 1000) + days * 86_400;

  // HMAC-SHA256(secret, "testimonial-invite:" + exp), with a domain-separation prefix
  const invite = signInvite(secret, expUnix);

  // ── 6. Invitation URL ───────────────────────────────────────────────────────
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${locale}/testimonial-submit?invite=${invite}&exp=${expUnix}`;

  return NextResponse.json(
    {
      url,
      expiresAt: new Date(expUnix * 1000).toISOString(),
      locale,
      daysValid: days,
    },
    { status: 201 }
  );
}
