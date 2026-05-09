// app/api/errors/route.ts
// -----------------------
// Endpoint de réception des erreurs JS clientes (GlobalErrorHandler).
//
// Flux :
//   GlobalErrorHandler (client) → navigator.sendBeacon → POST /api/errors
//                                                      → console.error (Vercel Runtime Logs)
//
// Sécurité :
//   - Rate-limit : 10 req / 60 s par IP (errorRatelimit)
//   - Validation stricte du payload (type, message obligatoires)
//   - Pas de stockage persistant — log structuré uniquement (Vercel Runtime Logs)
//   - Aucune donnée PII loguée (pas d'IP, pas de User-Agent, stack tronquée côté client)
//
// Réponse :
//   202 Accepted — non bloquant côté client (sendBeacon ignore la réponse)
//   429 Too Many Requests — rate limit atteint
//   400 Bad Request — payload invalide

import { type NextRequest, NextResponse } from "next/server";
import { errorRatelimit } from "@/lib/ratelimit";
import { log } from "@/lib/logger";

// ── Type du payload client ────────────────────────────────────────────────────
type ErrorReport = {
  type: "uncaught" | "unhandledrejection";
  message: string;
  stack?: string;
  url?: string;
  line?: number;
  col?: number;
};

// ── Validation ────────────────────────────────────────────────────────────────
function isValidReport(body: unknown): body is ErrorReport {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    (b.type === "uncaught" || b.type === "unhandledrejection") &&
    typeof b.message === "string" &&
    b.message.length > 0 &&
    b.message.length <= 200 && // correspond au MAX_MSG du client
    // Champs optionnels : si présents, doivent être du bon type
    (b.stack === undefined || typeof b.stack === "string") &&
    (b.url   === undefined || typeof b.url   === "string") &&
    (b.line  === undefined || typeof b.line  === "number") &&
    (b.col   === undefined || typeof b.col   === "number")
  );
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Rate-limit ───────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  let rateLimitOk = true;
  try {
    const { success } = await errorRatelimit.limit(ip);
    rateLimitOk = success;
  } catch {
    // Upstash WRONGTYPE ou autre erreur Redis — fail-open
  }
  if (!rateLimitOk) return new NextResponse(null, { status: 429 });

  // ── Parse ─────────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (!isValidReport(body)) {
    return new NextResponse(null, { status: 400 });
  }

  // Log structuré → Vercel Runtime Logs (filtre: msg = "client-error")
  log.error("client-error", {
    type:    body.type,
    message: body.message,
    url:     body.url,
    line:    body.line,
    col:     body.col,
    stack:   body.stack,
  });

  // 202 Accepted — sendBeacon n'attend pas et ignore le corps de la réponse
  return new NextResponse(null, { status: 202 });
}
