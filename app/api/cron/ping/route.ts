// app/api/cron/ping/route.ts
// --------------------------
// Vercel cron endpoint, called daily at 08:00 UTC (see vercel.json):
//   1. checks CRON_SECRET in the Authorization header;
//   2. runs the health checks (lib/health.ts);
//   3. records the run in the uptime history (Upstash Redis, lib/uptime.ts),
//      trimmed to 30 days;
//   4. pings an external heartbeat if configured.
// Contact messages and testimonials are e-mailed (Formhook) and never stored,
// so there is nothing else to purge.

import { after, NextResponse }         from "next/server";
import { runHealthChecks }             from "@/lib/health";
import { recordPingBatch }             from "@/lib/uptime";
import { timingSafeStringEqual }       from "@/lib/security/timingSafeEqual";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  // ── 1. Authentication: CRON_SECRET required ───────────────────────────────
  // Without the variable, every request is refused (never a public endpoint).
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[CRON/PING] CRON_SECRET is not configured — request blocked.");
    return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") ?? "";
  if (!await timingSafeStringEqual(auth, `Bearer ${cronSecret}`)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // ── 2. Health checks ──────────────────────────────────────────────────────
  const report = await runHealthChecks();

  // ── 2b. Webhook alert (optional) ──────────────────────────────────────────
  // When ALERT_WEBHOOK_URL is set and the global status is not "operational",
  // POST a notification (Discord, Slack, ntfy, Make…). Non-blocking.
  const alertUrl = process.env.ALERT_WEBHOOK_URL;
  if (alertUrl && report.overall !== "operational") {
    const lines = report.services
      .filter((s) => s.status !== "operational")
      .map((s) => `• ${s.name}: ${s.status}${s.message ? ` — ${s.message}` : ""}`)
      .join("\n");
    const msg = `Portfolio status: ${report.overall}\n${lines}`;
    // Generic payload: content (Discord), text (Slack), message (ntfy/Make).
    // after(): runs after the response without being cut off by Vercel.
    after(() =>
      fetch(alertUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ content: msg, text: msg, message: msg }),
      })
        .then(() => undefined)
        .catch((e) => console.warn("[CRON/PING] Alert webhook failed:", String(e)))
    );
  }

  // ── 3. Uptime history (Redis) ─────────────────────────────────────────────
  // Source of /status. A failed write is a real failure of this job.
  const stored = await recordPingBatch({
    checkedAt: report.checkedAt,
    services: report.services.map((s) => ({
      name: s.name,
      status: s.status,
      latencyMs: s.latencyMs ?? null,
    })),
  });
  if (!stored) {
    console.error("[CRON/PING] Could not record the uptime history in Redis.");
    return NextResponse.json({ ok: false, error: "history_store_failed" }, { status: 500 });
  }

  // ── 4. External heartbeat (dead-man's switch) ────────────────────────────
  // When HEALTHCHECK_URL is set, a GET is sent after each successful run; a
  // missing ping triggers an alert on the external service (e.g.
  // healthchecks.io), independent of GitHub and Vercel. Non-blocking.
  const healthcheckUrl = process.env.HEALTHCHECK_URL;
  if (healthcheckUrl) {
    after(() =>
      fetch(healthcheckUrl, { method: "GET" })
        .then(() => undefined)
        .catch((e) => console.warn("[CRON/PING] Heartbeat failed:", String(e)))
    );
  }

  return NextResponse.json({
    ok:             true,
    checkedAt:      report.checkedAt,
    servicesStored: report.services.length,
    overall:        report.overall,
  });
}
