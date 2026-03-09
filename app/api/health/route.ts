// app/api/health/route.ts
// ----------------------
// Endpoint JSON public de health check.
// Pinge Supabase, Redis, Formspree et renvoie l'état de chaque service.
//
// GET /api/health → HealthReport JSON
//
// Cache : no-store (résultat toujours frais — pas de cache CDN).
// Pas d'authentification : les données sont publiques (statuts sans secrets).

import { NextResponse } from "next/server";
import { runHealthChecks } from "@/lib/health";

export const dynamic = "force-dynamic"; // jamais mis en cache par Next.js

export async function GET() {
  const report = await runHealthChecks();

  // Code HTTP basé sur le statut global
  const httpStatus =
    report.overall === "operational" ? 200 :
    report.overall === "degraded"    ? 207 : // Multi-Status
                                       503;  // Service Unavailable

  return NextResponse.json(report, {
    status: httpStatus,
    headers: {
      // Autorise la lecture depuis n'importe quelle origine (utile pour les outils de monitoring)
      "Access-Control-Allow-Origin": "*",
      // Pas de cache — le résultat doit toujours être frais
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
