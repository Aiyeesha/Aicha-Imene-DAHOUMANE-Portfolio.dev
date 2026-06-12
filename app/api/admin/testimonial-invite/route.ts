// app/api/admin/testimonial-invite/route.ts
// ------------------------------------------
// Endpoint admin — génère un lien d'invitation HMAC à durée limitée
// pour la page de soumission de témoignage.
//
// Le lien ne contient JAMAIS le token brut (TESTIMONIAL_SUBMIT_TOKEN).
// Il contient uniquement un dérivé HMAC signé et horodaté :
//   invite = HMAC-SHA256(TESTIMONIAL_SUBMIT_TOKEN, "testimonial-invite:" + exp)
//   URL    = /{locale}/testimonial-submit?invite={invite}&exp={exp}
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
import { createHmac } from "crypto";
import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";
import { adminRatelimit, safeLimit } from "@/lib/ratelimit";
import { getSiteUrl } from "@/lib/siteUrl";

export const runtime = "nodejs";

const MAX_DAYS = 30;
const DEFAULT_DAYS = 7;

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

  // ── 3. Vérification TESTIMONIAL_SUBMIT_TOKEN configuré ─────────────────────
  const secret = process.env.TESTIMONIAL_SUBMIT_TOKEN ?? "";
  if (!secret) {
    return NextResponse.json({ error: "Testimonial feature not configured." }, { status: 503 });
  }

  // ── 4. Paramètres optionnels ────────────────────────────────────────────────
  let days = DEFAULT_DAYS;
  let locale: "en" | "fr" = "en";

  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (typeof body.days === "number" && body.days > 0 && body.days <= MAX_DAYS) {
      days = Math.floor(body.days);
    }
    if (body.locale === "fr") locale = "fr";
  } catch {
    // Body absent ou invalide → paramètres par défaut
  }

  // ── 5. Génération du token d'invitation HMAC ────────────────────────────────
  // exp = timestamp Unix (secondes) — date d'expiration du lien
  const expUnix = Math.floor(Date.now() / 1000) + days * 86_400;

  // HMAC-SHA256(secret, "testimonial-invite:" + exp) — préfixe domain-separation
  const invite = createHmac("sha256", secret)
    .update(`testimonial-invite:${expUnix}`)
    .digest("hex");

  // ── 6. Construction de l'URL d'invitation ──────────────────────────────────
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
