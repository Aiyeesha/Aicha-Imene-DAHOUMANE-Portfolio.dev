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

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Limit report ingestion — browsers can flood this endpoint if a page
// triggers many violations (e.g. browser extension injecting scripts).
// A lightweight in-memory counter is sufficient; this endpoint is not
// critical and will restart between cold-starts.
const BURST_WINDOW_MS  = 60_000; // 1 minute
const BURST_MAX        = 20;     // max reports per IP per window
const windowStart      = new Map<string, number>();
const windowCount      = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const start = windowStart.get(ip) ?? 0;
  if (now - start > BURST_WINDOW_MS) {
    windowStart.set(ip, now);
    windowCount.set(ip, 1);
    return false;
  }
  const count = (windowCount.get(ip) ?? 0) + 1;
  windowCount.set(ip, count);
  return count > BURST_MAX;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return new NextResponse(null, { status: 429 });
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
