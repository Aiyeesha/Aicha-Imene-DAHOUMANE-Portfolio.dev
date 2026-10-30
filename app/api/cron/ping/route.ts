// app/api/cron/ping/route.ts
// --------------------------
// Vercel cron endpoint, called daily at 08:00 UTC (see vercel.json):
//   1. checks CRON_SECRET in the Authorization header;
//   2. runs the health checks (lib/health.ts);
//   3. inserts one row per service into uptime_pings (service_role);
//   4. purges old rows (uptime 30 days, contact messages and pending
//      testimonial submissions 90 days);
//   5. pings an external heartbeat if configured.

import { after, NextResponse }         from "next/server";
import { runHealthChecks }             from "@/lib/health";
import { createAdminSupabaseClient }   from "@/lib/supabase/admin";
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

  // ── 3. Insert into Supabase ───────────────────────────────────────────────
  const supabase = createAdminSupabaseClient();

  const rows = report.services.map((s) => ({
    service:    s.name,
    status:     s.status,
    latency_ms: s.latencyMs ?? null,
    checked_at: report.checkedAt, // shared timestamp groups the ping
  }));

  const { error } = await supabase.from("uptime_pings").insert(rows);
  if (error) {
    console.error("[CRON/PING] Insert error:", error.message);
    return NextResponse.json({ ok: false, error: "db_insert_failed" }, { status: 500 });
  }

  // ── 4. Purge uptime_pings older than 30 days (non-blocking) ───────────────
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error: purgeError } = await supabase
    .from("uptime_pings")
    .delete()
    .lt("checked_at", cutoff);
  if (purgeError) console.warn("[CRON/PING] Purge warning:", purgeError.message);

  // ── 5. Purge contact messages older than 90 days ──────────────────────────
  // GDPR retention of personal data (name, email, message), as stated in the
  // privacy policy. Non-blocking.
  const msgCutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const { error: msgPurgeError } = await supabase
    .from("messages")
    .delete()
    .lt("created_at", msgCutoff);
  if (msgPurgeError) console.warn("[CRON/PING] Messages purge warning:", msgPurgeError.message);

  // ── 6. Purge unapproved testimonial submissions older than 90 days ───────
  // Submissions store the submitter's IP hash; approved ones are kept (they
  // feed the testimonials table). Non-blocking.
  const { error: submPurgeError } = await supabase
    .from("testimonial_submissions")
    .delete()
    .lt("created_at", msgCutoff) // same 90-day cutoff
    .eq("approved", false);
  if (submPurgeError) console.warn("[CRON/PING] Testimonial submissions purge warning:", submPurgeError.message);

  // ── 7. External heartbeat (dead-man's switch) ────────────────────────────
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
