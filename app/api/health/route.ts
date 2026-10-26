// app/api/health/route.ts
// ----------------------
// Public JSON health check: pings Supabase, Redis and Formhook and returns
// each service's status (GET /api/health → HealthReport). Never cached, no
// authentication (statuses only, no secrets).
//
// CORS is limited to the site origin: monitoring tools call server-to-server
// and need no CORS, and a wildcard would let any page read internal latencies.
// Light rate limiting prevents abuse loops.

import { NextRequest, NextResponse } from "next/server";
import { runHealthChecks } from "@/lib/health";
import { getLatestPingReport } from "@/lib/uptime";
import { blogRatelimit, safeLimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic"; // never cached by Next.js

export async function GET(req: NextRequest) {
  // ── Light rate limiting ──────────────────────────────────────────────
  // Reuses the blog limiter (30 requests / 60s), same traffic profile.
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success: rateLimitOk } = await safeLimit(blogRatelimit, `health:${ip}`);
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Run live checks + read last cron-stored ping in parallel
  const [report, storedPing] = await Promise.all([
    runHealthChecks(),
    getLatestPingReport(),
  ]);

  // HTTP status from the global status
  const httpStatus =
    report.overall === "operational" ? 200 :
    report.overall === "degraded"    ? 207 : // Multi-Status
                                       503;  // Service Unavailable

  // Strip internal details from public response:
  //   - latencyMs : reveals infrastructure timings (Supabase: 117ms, Redis: 66ms)
  //                 enabling fingerprinting and timing attacks.
  //   - message   : reveals internal configuration state ("Formhook not configured",
  //                 "Redis unavailable", etc.) — information an attacker can use to
  //                 identify which fallbacks are active and plan targeted attacks.
  // The cron job stores the full data server-side — they never need to be public.
  const publicReport = {
    ...report,
    services: report.services.map(({ latencyMs: _l, message: _m, ...rest }) => rest),
    // Last cron run timestamp (null before the first run), used by the
    // drift-check workflow to detect stale monitoring.
    lastStoredCheckAt: storedPing?.checkedAt ?? null,
  };

  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return NextResponse.json(publicReport, {
    status: httpStatus,
    headers: {
      // CORS limited to the site origin (monitoring tools need none).
      "Access-Control-Allow-Origin": siteOrigin,
      // Never cached
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
