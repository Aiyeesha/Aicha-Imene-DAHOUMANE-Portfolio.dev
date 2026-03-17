// app/api/health/route.ts
// ----------------------
// Endpoint JSON public de health check.
// Pinge Supabase, Redis, Formspree et renvoie l'état de chaque service.
//
// GET /api/health → HealthReport JSON
//
// Cache : no-store (résultat toujours frais — pas de cache CDN).
// Pas d'authentification : les données sont publiques (statuts sans secrets).
//
// SÉCURITÉ :
//   - CORS restreint à l'origine du site (plus de wildcard *).
//     Les outils de monitoring externes (UptimeRobot, etc.) n'ont pas besoin
//     de CORS — ils font des requêtes serveur-à-serveur, pas depuis un navigateur.
//     Le wildcard * permettait à n'importe quelle page tierce de lire les
//     latences internes (Supabase : 117 ms, Redis : 66 ms) via fetch() côté client.
//   - Rate-limiting léger pour éviter l'abus en boucle (DoS indirect Supabase).

import { NextRequest, NextResponse } from "next/server";
import { runHealthChecks } from "@/lib/health";
import { blogRatelimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic"; // jamais mis en cache par Next.js

export async function GET(req: NextRequest) {
  // ── Rate-limiting léger ──────────────────────────────────────────────
  // Réutilise le limiteur blog (30 req/60 s) — profil de trafic identique.
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success } = await blogRatelimit.limit(`health:${ip}`);
  if (!success) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const report = await runHealthChecks();

  // Code HTTP basé sur le statut global
  const httpStatus =
    report.overall === "operational" ? 200 :
    report.overall === "degraded"    ? 207 : // Multi-Status
                                       503;  // Service Unavailable

  // Strip internal details from public response:
  //   - latencyMs : reveals infrastructure timings (Supabase: 117ms, Redis: 66ms)
  //                 enabling fingerprinting and timing attacks.
  //   - message   : reveals internal configuration state ("Formspree not configured",
  //                 "Redis unavailable", etc.) — information an attacker can use to
  //                 identify which fallbacks are active and plan targeted attacks.
  // The cron job stores the full data server-side — they never need to be public.
  const publicReport = {
    ...report,
    services: report.services.map(({ latencyMs: _l, message: _m, ...rest }) => rest),
  };

  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return NextResponse.json(publicReport, {
    status: httpStatus,
    headers: {
      // CORS restreint à l'origine du site uniquement.
      // Les outils de monitoring font des requêtes serveur-à-serveur → pas de CORS nécessaire.
      "Access-Control-Allow-Origin": siteOrigin,
      // Pas de cache — le résultat doit toujours être frais
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
