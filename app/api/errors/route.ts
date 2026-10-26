// app/api/errors/route.ts
// -----------------------
// Receives client JS errors from GlobalErrorHandler (sendBeacon) and logs
// them (Vercel runtime logs). Rate limited (10 requests / 60s / IP), strict
// payload validation, nothing stored, no personal data logged (no IP or
// user agent; stack truncated on the client).
// Responses: 202 Accepted, 429 rate limited, 400 invalid payload.

import { type NextRequest, NextResponse } from "next/server";
import { errorRatelimit, safeLimit } from "@/lib/ratelimit";
import { log } from "@/lib/logger";

// ── Client payload type ───────────────────────────────────────────────────────
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
    b.message.length <= 200 && // matches the client's MAX_MSG
    // Optional fields must have the right type when present
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

  const { success: rateLimitOk } = await safeLimit(errorRatelimit, ip);
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

  // Structured log → Vercel runtime logs (filter: msg = "client-error")
  log.error("client-error", {
    type:    body.type,
    message: body.message,
    url:     body.url,
    line:    body.line,
    col:     body.col,
    stack:   body.stack,
  });

  // 202 Accepted: sendBeacon ignores the response
  return new NextResponse(null, { status: 202 });
}
