// lib/monitoring/serverErrorAlert.ts
// ----------------------------------
// Webhook alert for server-side errors (instrumentation.ts → onRequestError):
// a page, route handler, server action or share image that throws in
// production posts a short message to ALERT_WEBHOOK_URL (Discord, Slack,
// ntfy, Make…), the same channel as the uptime cron (app/api/cron/ping).
// Without it, a 500 on a route only shows up in the Vercel logs.
//
// What is sent: environment, route pattern (e.g. /[locale]/projects/[slug]),
// route type, HTTP method, request path without query string or fragment,
// error class and Next.js digest (searchable in the Vercel logs). Never the
// error message, stack, headers, cookies or query string: they may carry
// personal data, tokens (signed invitation links) or form input.
//
// Volume: one alert per fingerprint (route pattern + error class + digest)
// per 10 minutes, and at most 20 alerts per 10 minutes overall (Upstash).
// If Redis fails, the alert still goes out (failOpen) but an in-memory
// per-instance throttle keeps the same fingerprint from repeating.
//
// Never throws: a failure here must not hide the original error.

import { safeLimit, serverErrorAlertGlobalRatelimit, serverErrorAlertRatelimit } from "@/lib/ratelimit";

export type ErrorRequestInfo = Readonly<{ path: string; method: string }>;
export type ErrorContextInfo = Readonly<{ routePath: string; routeType: string }>;

const WINDOW_MS = 10 * 60 * 1000;
const lastSent = new Map<string, number>();

/** Next.js attaches a `digest` to server errors; the same error gives the same digest. */
function digestOf(error: unknown): string {
  const d = (error as { digest?: unknown } | null)?.digest;
  return typeof d === "string" ? d.slice(0, 40) : "none";
}

function nameOf(error: unknown): string {
  const n = error instanceof Error ? error.name : typeof error;
  // Plain identifier only: nothing that could carry Markdown or mentions.
  return n.replace(/[^\w.-]/g, "").slice(0, 40) || "Error";
}

/** Path without query string or fragment, limited to safe URL characters. */
export function safePath(path: string): string {
  const cut = path.search(/[?#]/);
  const bare = cut === -1 ? path : path.slice(0, cut);
  return bare.replace(/[^\w\-./[\]%~]/g, "").slice(0, 120) || "/";
}

/** The alert text, built only from normalised values. */
export function buildServerErrorMessage(
  error: unknown,
  request: ErrorRequestInfo,
  context: ErrorContextInfo,
  env: string,
): string {
  const method = request.method.replace(/[^A-Z]/g, "").slice(0, 10) || "GET";
  return [
    `🔥 Server error (${env})`,
    `Route: ${safePath(context.routePath)} (${context.routeType.replace(/[^\w-]/g, "")})`,
    `Request: ${method} ${safePath(request.path)}`,
    `Error: ${nameOf(error)} · digest ${digestOf(error)}`,
  ].join("\n");
}

export function fingerprintOf(error: unknown, context: ErrorContextInfo): string {
  return `${safePath(context.routePath)}|${nameOf(error)}|${digestOf(error)}`;
}

export async function reportServerError(
  error: unknown,
  request: ErrorRequestInfo,
  context: ErrorContextInfo,
): Promise<void> {
  try {
    const webhookUrl = process.env.ALERT_WEBHOOK_URL;
    // Production deployments only: previews and local runs stay quiet.
    const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown";
    if (!webhookUrl || env !== "production") return;

    const fp = fingerprintOf(error, context);
    const now = Date.now();
    if (now - (lastSent.get(fp) ?? 0) < WINDOW_MS) return;

    const { success } = await safeLimit(serverErrorAlertRatelimit, `fp:${fp}`, { failOpen: true });
    if (!success) return;
    const { success: underCap } = await safeLimit(serverErrorAlertGlobalRatelimit, "global", { failOpen: true });
    if (!underCap) return;

    lastSent.set(fp, now);
    if (lastSent.size > 200) lastSent.clear(); // bounded memory

    const msg = buildServerErrorMessage(error, request, context, env);
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Generic payload: content (Discord), text (Slack), message (ntfy/Make);
      // allowed_mentions: Discord never pings anyone from this message.
      body: JSON.stringify({ content: msg, text: msg, message: msg, allowed_mentions: { parse: [] } }),
      signal: AbortSignal.timeout(3000),
    });
  } catch (e) {
    console.warn("[server-error-alert] webhook failed:", e instanceof Error ? e.name : "unknown");
  }
}

/** Test helper: forget the in-memory throttle. */
export function __resetServerErrorAlertThrottle(): void {
  lastSent.clear();
}
