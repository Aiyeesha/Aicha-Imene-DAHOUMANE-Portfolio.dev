"use client";

// GlobalErrorHandler.tsx
// ----------------------
// Client component mounted once in the root layout. Reports uncaught errors
// to /api/errors: window error events (code outside React rendering) and
// unhandled promise rejections. Error boundaries cover render crashes.
//
// Ignored: "Script error." (cross-origin, no details), browser extensions,
// and errors already reported in this session.
// Sent with navigator.sendBeacon, falling back to fetch keepalive.
// In development: console only, no API call.

import { useEffect } from "react";

// ── Size limits (characters) ──────────────────────────────────────────────
const MAX_MSG   = 200;
const MAX_STACK = 1_500;
const MAX_URL   = 300;

// ── Per-session dedup ───────────────────────────────────────────────────────
// Module-level, so it survives re-renders; the same React crash can replay
// when reset() is called.
const seen = new Set<string>();

function makeFingerprint(message: string, source: string, line?: number): string {
  return `${message.slice(0, 80)}|${source.slice(0, 80)}|${line ?? 0}`;
}

// ── Filters ──────────────────────────────────────────────────────────────────
function shouldIgnore(message: string, source: string): boolean {
  // Cross-origin error without details
  if (!message || message === "Script error.") return true;
  // Browser extension noise
  return /^(?:chrome|moz|safari|safari-web|ms-browser)-extension:\/\//.test(source);
}

// ── URL cleanup ───────────────────────────────────────────────────────────────
// Drops query string and hash so no sensitive data is logged.
function cleanUrl(raw: string): string {
  try {
    const u = new URL(raw);
    return (u.origin + u.pathname).slice(0, MAX_URL);
  } catch {
    return raw.slice(0, MAX_URL);
  }
}

// ── Transport ─────────────────────────────────────────────────────────────────
// sendBeacon is non-blocking and survives page unload; fetch keepalive is the
// fallback where sendBeacon with JSON is unsupported.
function send(payload: Record<string, unknown>): void {
  const body = JSON.stringify(payload);
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    // A Blob forces the application/json Content-Type
    navigator.sendBeacon("/api/errors", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/errors", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => { /* fire and forget */ });
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function GlobalErrorHandler() {
  useEffect(() => {
    // ── window.onerror ───────────────────────────────────────────────────────
    function handleError(event: ErrorEvent): void {
      const { message, filename, lineno, colno, error } = event;
      const source = filename ?? "";

      if (shouldIgnore(message, source)) return;

      const fp = makeFingerprint(message, source, lineno);
      if (seen.has(fp)) return;
      seen.add(fp);

      const payload = {
        type: "uncaught",
        message: String(message).slice(0, MAX_MSG),
        stack: (error instanceof Error ? error.stack : undefined)?.slice(0, MAX_STACK),
        url: cleanUrl(source || window.location.href),
        line: lineno ?? undefined,
        col: colno ?? undefined,
      };

      if (process.env.NODE_ENV !== "production") {
        // Dev: console only, no API call
        console.error("[GlobalErrorHandler:uncaught]", payload);
        return;
      }

      send(payload);
    }

    // ── unhandledrejection ───────────────────────────────────────────────────
    function handleRejection(event: PromiseRejectionEvent): void {
      const reason = event.reason;
      const message =
        reason instanceof Error
          ? reason.message
          : String(reason ?? "Unhandled promise rejection");

      if (shouldIgnore(message, "")) return;

      const fp = makeFingerprint(message, window.location.pathname, undefined);
      if (seen.has(fp)) return;
      seen.add(fp);

      const payload = {
        type: "unhandledrejection",
        message: message.slice(0, MAX_MSG),
        stack: (reason instanceof Error ? reason.stack : undefined)?.slice(0, MAX_STACK),
        url: cleanUrl(window.location.href),
      };

      if (process.env.NODE_ENV !== "production") {
        console.error("[GlobalErrorHandler:unhandledrejection]", payload);
        return;
      }

      send(payload);
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  // Renders nothing: behaviour only
  return null;
}
