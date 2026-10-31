// app/api/cron/ping/route.ts
// --------------------------
// Vercel cron endpoint, called daily at 08:00 UTC (see vercel.json):
//   1. checks CRON_SECRET in the Authorization header;
//   2. runs the health checks (lib/health.ts);
//   3. records the run in the uptime history (Upstash Redis, lib/uptime.ts),
//      then copies it to Supabase uptime_pings, best effort, until Supabase
//      is retired;
//   4. purges Supabase uptime rows older than 30 days;
//   5. pings an external heartbeat if configured.
// Contact messages and testimonials are e-mailed (Formhook) and never stored,
// so there is nothing else to purge.

import { after, NextResponse }         from "next/server";
import { runHealthChecks }             from "@/lib/health";
import { createAdminSupabaseClient }   from "@/lib/supabase/admin";
import { recordPingBatch }             from "@/lib/uptime";
import { timingSafeStringEqual }       from "@/lib/security/timingSafeEqual";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // Supabase JS does not support the Edge runtime

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

  // ── 3b. Copy to Supabase (best effort, until Supabase is retired) ─────────
  // Keeps the former table in sync so the move can be rolled back; a failure
  // here only logs a warning.
  const supabase = createAdminSupabaseClient();

  const rows = report.services.map((s) => ({
    service:    s.name,
    status:     s.status,
    latency_ms: s.latencyMs ?? null,
    checked_at: report.checkedAt, // shared timestamp groups the ping
  }));

  const { error } = await supabase.from("uptime_pings").insert(rows);
  if (error) console.warn("[CRON/PING] Supabase copy skipped:", error.message);

  // ── 4. Purge uptime_pings older than 30 days (non-blocking) ───────────────
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error: purgeError } = await supabase
    .from("uptime_pings")
    .delete()
    .lt("checked_at", cutoff);
  if (purgeError) console.warn("[CRON/PING] Purge warning:", purgeError.message);

  // ── 5. External heartbeat (dead-man's switch) ────────────────────────────
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
    servicesStored: rows.length,
    overall:        report.overall,
  });
}
