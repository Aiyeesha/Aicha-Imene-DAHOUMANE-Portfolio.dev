// app/api/admin/testimonial-invite/route.ts
// ------------------------------------------
// Admin endpoint generating a time-limited HMAC invitation link for the
// testimonial page. The link never contains TESTIMONIAL_SUBMIT_TOKEN, only a
// signed, timestamped derivative:
//   invite = HMAC-SHA256(TESTIMONIAL_SUBMIT_TOKEN, "testimonial-invite:" + exp)
//   URL    = /{locale}/testimonial-submit?invite={invite}&exp={exp}
//
// Auth: Bearer TESTIMONIAL_INVITE_ADMIN_TOKEN (dedicated, 32+ characters,
// timing-safe), never ADMIN_PASSWORD, so a leaked invite token cannot open
// /admin and vice versa. Brute force: same failure counter as /admin
// (adminRatelimit, 5 failures / 15 min / IP, same pseudonymized key as
// proxy.ts), consumed only by failed attempts, fail closed if Redis is down.
//
//   curl -X POST https://yoursite.com/api/admin/testimonial-invite \
//     -H "Authorization: Bearer YOUR_TESTIMONIAL_INVITE_ADMIN_TOKEN" \
//     -H "Content-Type: application/json" \
//     -d '{"locale":"fr","days":7}'

import { NextRequest, NextResponse } from "next/server";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { adminRatelimit, pseudonymizeKey } from "@/lib/ratelimit";
import { getSiteUrl } from "@/lib/siteUrl";
import { MAX_INVITE_DAYS, signInvite } from "@/lib/security/testimonialInvite";

export const runtime = "nodejs";

// At most 14 days (lib/security/testimonialInvite.ts).
const MAX_DAYS = MAX_INVITE_DAYS;
const DEFAULT_DAYS = 7;
// Same minimum as the other machine-to-machine secrets (lib/env.ts).
const MIN_TOKEN_LENGTH = 32;

const tooManyRequests = () =>
  NextResponse.json({ error: "Too many requests." }, { status: 429, headers: { "Retry-After": "300" } });

export async function POST(req: NextRequest) {
  // ── 1. Configured? ─────────────────────────────────────────────────────────
  // A missing or short token disables the route instead of accepting a weak one.
  const expectedToken = process.env.TESTIMONIAL_INVITE_ADMIN_TOKEN ?? "";
  if (expectedToken.length < MIN_TOKEN_LENGTH) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  // ── 2. Brute force: shared /admin failure counter ──────────────────────────
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const rlKey = await pseudonymizeKey(ip);

  // Quota used up: refuse before checking the token. Redis outage: refuse too.
  let remaining = 0;
  try {
    ({ remaining } = await adminRatelimit.getRemaining(rlKey));
  } catch (err) {
    console.error("[testimonial-invite] rate-limit error → fail-closed", err);
  }
  if (remaining <= 0) return tooManyRequests();

  const authHeader = req.headers.get("authorization") ?? "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!(await timingSafeStringEqual(bearerToken, expectedToken))) {
    // Only a failed attempt consumes a token.
    try {
      const { success } = await adminRatelimit.limit(rlKey);
      if (!success) return tooManyRequests();
    } catch (err) {
      console.error("[testimonial-invite] rate-limit error → fail-closed", err);
      return tooManyRequests();
    }
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
