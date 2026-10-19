// app/api/admin/testimonial-invite/route.ts
// ------------------------------------------
// Endpoint admin — génère un lien d'invitation HMAC à durée limitée
// pour la page de soumission de témoignage.
//
// Le lien ne contient JAMAIS le token brut (TESTIMONIAL_SUBMIT_TOKEN) : voir
// lib/testimonialInvite.ts, partagé avec le bouton de la page /admin.
//
// Authentification : Bearer token = ADMIN_PASSWORD (comparaison timing-safe).
// Rate-limit : partagé avec adminRatelimit (5 req / 15 min / IP).
//
// Exemple d'appel :
//   curl -X POST https://yoursite.com/api/admin/testimonial-invite \
//     -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
//     -H "Content-Type: application/json" \
//     -d '{"locale":"fr","days":7}'

import { NextRequest, NextResponse } from "next/server";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { adminRatelimit, safeLimit } from "@/lib/ratelimit";
import {
  createTestimonialInvite,
  normalizeInviteDays,
  normalizeInviteLocale,
  INVITE_DEFAULT_DAYS,
  type InviteLocale,
} from "@/lib/testimonialInvite";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // ── 1. Rate-limit anti brute-force ─────────────────────────────────────────
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success: rateLimitOk } = await safeLimit(adminRatelimit, `invite:${ip}`);
  if (!rateLimitOk) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  // ── 2. Authentification Bearer ADMIN_PASSWORD ───────────────────────────────
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedPass) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!(await timingSafeStringEqual(bearerToken, expectedPass))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // ── 3. Paramètres optionnels ────────────────────────────────────────────────
  let days = INVITE_DEFAULT_DAYS;
  let locale: InviteLocale = "en";

  try {
    const body = (await req.json()) as Record<string, unknown>;
    days = normalizeInviteDays(body.days);
    locale = normalizeInviteLocale(body.locale);
  } catch {
    // Body absent ou invalide → paramètres par défaut
  }

  // ── 4. Génération du lien (null si TESTIMONIAL_SUBMIT_TOKEN absent) ─────────
  const invite = createTestimonialInvite(locale, days);
  if (!invite) {
    return NextResponse.json({ error: "Testimonial feature not configured." }, { status: 503 });
  }

  return NextResponse.json(invite, { status: 201 });
}
