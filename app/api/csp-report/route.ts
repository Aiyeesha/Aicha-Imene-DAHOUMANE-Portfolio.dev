// app/api/csp-report/route.ts
// ---------------------------
// Receives CSP violation reports, both enforced and report-only:
//   - POST /api/csp-report       → enforced CSP (blocked)
//   - POST /api/csp-report?ro=1  → report-only (Trusted Types)
//
// Accepted formats (lib/security/cspReport.ts):
//   - CSP Level 2: { "csp-report": { "violated-directive": "…", "blocked-uri": "…", … } }
//   - Reporting API (Chrome/Edge): [{ "type": "csp-violation", "body": { "blockedURL": "…", … } }]
//
// Rate limited with an Upstash sliding window (20 requests / 60s / IP), which
// survives serverless cold starts unlike an in-memory counter.

import { after, type NextRequest, NextResponse } from "next/server";
import { cspAlertGlobalRatelimit, cspAlertRatelimit, cspReportRatelimit, safeLimit } from "@/lib/ratelimit";
import { normaliseBlocked, normaliseDirective, parseCspReports } from "@/lib/security/cspReport";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";

// ── Known false positives ────────────────────────────────────────────────────
// Browser extensions trigger violations in their own context; these are not
// site vulnerabilities and are dropped to keep the logs clean.
const FALSE_POSITIVE_PREFIXES = [
  "chrome-extension://",
  "moz-extension://",
  "safari-extension://",
  "safari-web-extension://",
  "ms-browser-extension://",
  "edge-extension://",
];

// "Empty" URIs some browsers send for blocked inline scripts; "(null)" is the
// textual null URI in CSP Level 2 reports.
const FALSE_POSITIVE_EXACT = new Set(["", "(null)", "about:blank", "data:"]);

function isFalsePositive(blockedUri: string | undefined): boolean {
  if (!blockedUri) return true;
  if (FALSE_POSITIVE_EXACT.has(blockedUri)) return true;
  return FALSE_POSITIVE_PREFIXES.some((prefix) => blockedUri.startsWith(prefix));
}

// ── Severity ──────────────────────────────────────────────────────────────────
// script-src violations are the most critical (code execution); img-src or
// font-src ones are benign.
function getSeverity(violatedDirective: string | undefined): "critical" | "high" | "medium" | "low" {
  if (!violatedDirective) return "low";
  const directive = violatedDirective.split(" ")[0]; // e.g. "script-src-elem"
  if (directive.startsWith("script-src") || directive === "require-trusted-types-for") return "critical";
  if (directive === "object-src" || directive === "base-uri" || directive === "form-action") return "high";
  if (directive.startsWith("connect-src") || directive.startsWith("frame-src")) return "medium";
  return "low";
}

// Reports are capped at 16 KB before parsing (same bound as /api/cache/invalidate).
const MAX_BODY_BYTES = 16 * 1024;

// ── Alert payload normalisation ───────────────────────────────────────────
// This endpoint is public: anyone can POST a forged "critical" report. Only
// normalised values reach the webhook, so a report cannot inject @everyone,
// Markdown or phishing links into the alert channel.
/** True when the report claims to come from one of this site's pages. */
function isOwnDocument(documentUri: string): boolean {
  try {
    return new URL(documentUri).origin === new URL(getSiteUrl()).origin;
  } catch {
    return false;
  }
}

// ── Webhook alert on critical violations ──────────────────────────────────
// Non-blocking: an error here never fails the 204. One alert per
// (directive, blocked origin) fingerprint per window: a flood of forged
// reports with the same fingerprint cannot use up the budget, so a real
// script-src violation with another fingerprint still alerts.
async function sendCriticalAlert(data: {
  violatedDirective: string;
  blockedUri: string;
  documentUri: string;
}) {
  const webhookUrl = process.env.CSP_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;
  if (!isOwnDocument(data.documentUri)) return;

  const directive = normaliseDirective(data.violatedDirective);
  const blocked = normaliseBlocked(data.blockedUri);
  const { success } = await safeLimit(cspAlertRatelimit, `fp:${directive}|${blocked}`);
  if (!success) return;
  const { success: underGlobalCap } = await safeLimit(cspAlertGlobalRatelimit, "global");
  if (!underGlobalCap) return;

  const page = (() => { try { return new URL(data.documentUri).pathname.slice(0, 120); } catch { return "/"; } })();
  const msg = `🚨 CSP Critical Violation\nDirective: ${directive}\nBlocked: ${blocked}\nPage: ${page}`;
  // after(): sent once the response is out, but the function stays alive
  // until it completes (a bare un-awaited fetch can be cut off by Vercel).
  after(() =>
    fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      // allowed_mentions: Discord never pings anyone from this message.
      body:    JSON.stringify({ content: msg, text: msg, message: msg, allowed_mentions: { parse: [] } }),
    })
      .then(() => undefined)
      .catch((e) => console.warn("[CSP-VIOLATION] Alert webhook failed:", String(e)))
  );
}

/** Cuts a URL before "?" or "#" (special values such as "inline" unchanged). */
function stripQuery(uri: string): string {
  const cut = uri.search(/[?#]/);
  return cut === -1 ? uri : uri.slice(0, cut);
}

export async function POST(req: NextRequest) {
  // ── Report-only (CSPO) report? ───────────────────────────────────────────
  const { searchParams } = new URL(req.url);
  const isReportOnly = searchParams.get("ro") === "1";

  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const { success: rateLimitOk } = await safeLimit(cspReportRatelimit, ip);
  if (!rateLimitOk) {
    // 204 rather than 429: the browser does not need to know
    return new NextResponse(null, { status: 204 });
  }

  try {
    const declared = Number(req.headers.get("content-length") ?? "0");
    if (declared > MAX_BODY_BYTES) return new NextResponse(null, { status: 204 });
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return new NextResponse(null, { status: 204 });
    const reports = parseCspReports(JSON.parse(text));

    for (const report of reports) {
      // Query string and fragment stripped before logging: they may carry a
      // token (signed invitation link) or form data.
      const blockedUri        = stripQuery(report.blockedUri);
      const violatedDirective = report.violatedDirective;
      const documentUri       = stripQuery(report.documentUri);
      const referrer          = stripQuery(report.referrer);
      // The Reporting API does not use ?ro=1: it marks report-only in the
      // disposition field.
      const reportOnly = isReportOnly || report.disposition === "report";

      // ── Drop false positives silently ───────────────────────────────────
      if (isFalsePositive(blockedUri)) continue;

      const severity = getSeverity(violatedDirective);

      // ── Structured log → Vercel runtime logs ───────────────────────────
      // [CSP-VIOLATION] / [CSPO-VIOLATION] prefixes make filtering easy.
      const prefix = reportOnly ? "[CSPO-VIOLATION]" : "[CSP-VIOLATION]";

      console.warn(prefix, JSON.stringify({
        severity,
        report_only:        reportOnly,
        blocked_uri:        blockedUri,
        violated_directive: violatedDirective,
        document_uri:       documentUri,
        referrer:           referrer || undefined,
        original_policy:    report.originalPolicy,
      }));

      // ── Webhook alert for critical enforced violations ─────────────────
      // Report-only violations are not blocked yet. Enforced script-src or
      // require-trusted-types-for violations point to an injection attempt or
      // a CSP regression.
      if (severity === "critical" && !reportOnly) {
        await sendCriticalAlert({ violatedDirective, blockedUri, documentUri });
      }
    }
  } catch {
    // Malformed body: ignore
  }

  // 204 No Content: the browser expects no body
  return new NextResponse(null, { status: 204 });
}
