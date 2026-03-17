// app/api/csp-report/route.ts
// ---------------------------
// Récepteur de rapports de violation CSP.
// Les navigateurs envoient un POST JSON quand une ressource est bloquée
// par la Content-Security-Policy (directive report-uri dans next.config.mjs).
//
// En production : log structuré → visible dans Vercel Runtime Logs.
// En développement : affichage détaillé en console.
//
// Format W3C CSP Level 2 :
//   { "csp-report": { "violated-directive": "…", "blocked-uri": "…", … } }
//
// SÉCURITÉ (rate-limiting) :
//   Utilise Upstash Redis (sliding window, 20 req/60 s par IP) au lieu d'un
//   compteur in-memory. Sur Vercel serverless, chaque invocation peut être
//   une instance distincte — l'état in-memory est réinitialisé à chaque
//   cold-start. Sans Redis, un flood illimité épuiserait les 100 000
//   function invocations/mois du plan Hobby.

import { NextRequest, NextResponse } from "next/server";
import { cspReportRatelimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success } = await cspReportRatelimit.limit(ip);
  if (!success) {
    // 204 plutôt que 429 — le navigateur n'a pas besoin de savoir qu'il est limité
    return new NextResponse(null, { status: 204 });
  }

  try {
    const body = await req.json() as Record<string, unknown>;
    // CSP Level 2 wraps the report under a "csp-report" key.
    // Some older implementations send the fields at the top level.
    const report = (body["csp-report"] ?? body) as Record<string, unknown>;

    // Structured log — appears in Vercel Runtime Logs / your observability tool
    console.warn("[CSP-VIOLATION]", JSON.stringify({
      blockedUri:         report["blocked-uri"]         ?? report["blockedURI"],
      violatedDirective:  report["violated-directive"]  ?? report["violatedDirective"],
      documentUri:        report["document-uri"]        ?? report["documentURL"],
      referrer:           report["referrer"],
      originalPolicy:     report["original-policy"]     ?? report["originalPolicy"],
    }));
  } catch {
    // Malformed body — ignore silently
  }

  // 204 No Content — browser expects no body
  return new NextResponse(null, { status: 204 });
}
