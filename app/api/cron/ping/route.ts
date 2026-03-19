// app/api/cron/ping/route.ts
// --------------------------
// Vercel Cron endpoint — appelé une fois par jour à 8h UTC (voir vercel.json).
//
// 1. Vérifie CRON_SECRET dans le header Authorization
// 2. Exécute les health checks (lib/health.ts)
// 3. Insère une ligne par service dans uptime_pings (Supabase service_role)
// 4. Purge les lignes de plus de 30 jours (table bornée)
//
// Env vars :
//   CRON_SECRET           — secret partagé avec Vercel (arbitraire, min 32 chars)
//   NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY — déjà nécessaires ailleurs

import { NextResponse }            from "next/server";
import { runHealthChecks }          from "@/lib/health";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // Supabase JS ne supporte pas l'Edge runtime

export async function GET(req: Request) {
  // ── 1. Authentification — CRON_SECRET obligatoire ─────────────────────────
  // Si la variable n'est pas configurée, on refuse toute requête pour éviter
  // qu'un endpoint non protégé soit accessible publiquement.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[CRON/PING] CRON_SECRET is not configured — request blocked.");
    return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 503 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // ── 2. Health checks ──────────────────────────────────────────────────────
  const report = await runHealthChecks();

  // ── 2b. Alerte webhook (optionnel) ────────────────────────────────────────
  // Si ALERT_WEBHOOK_URL est configuré et que l'état global n'est pas "operational",
  // envoie une notification POST compatible Discord, Slack, ntfy, Make, etc.
  // Non bloquant — une erreur ici ne fait pas échouer la réponse cron.
  const alertUrl = process.env.ALERT_WEBHOOK_URL;
  if (alertUrl && report.overall !== "operational") {
    const lines = report.services
      .filter((s) => s.status !== "operational")
      .map((s) => `• ${s.name}: ${s.status}${s.message ? ` — ${s.message}` : ""}`)
      .join("\n");
    const msg = `Portfolio status: ${report.overall}\n${lines}`;
    // Payload générique : content (Discord), text (Slack), message (ntfy/Make)
    fetch(alertUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ content: msg, text: msg, message: msg }),
    }).catch((e) => console.warn("[CRON/PING] Alert webhook failed:", String(e)));
  }

  // ── 3. Insert dans Supabase ───────────────────────────────────────────────
  const supabase = createAdminSupabaseClient();

  const rows = report.services.map((s) => ({
    service:    s.name,
    status:     s.status,
    latency_ms: s.latencyMs ?? null,
    checked_at: report.checkedAt, // timestamp partagé pour regrouper le ping
  }));

  const { error } = await supabase.from("uptime_pings").insert(rows);
  if (error) {
    console.error("[CRON/PING] Insert error:", error.message);
    return NextResponse.json({ ok: false, error: "db_insert_failed" }, { status: 500 });
  }

  // ── 4. Purge des lignes uptime_pings > 30 jours ──────────────────────────
  // Purge non bloquante — une erreur ici ne fait pas échouer la réponse.
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error: purgeError } = await supabase
    .from("uptime_pings")
    .delete()
    .lt("checked_at", cutoff);
  if (purgeError) console.warn("[CRON/PING] Purge warning:", purgeError.message);

  // ── 5. Purge des messages de contact > 90 jours ───────────────────────────
  // Rétention RGPD : données personnelles (nom, email, message) conservées
  // 90 jours maximum, conformément à la politique de confidentialité.
  // Purge non bloquante.
  const msgCutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const { error: msgPurgeError } = await supabase
    .from("messages")
    .delete()
    .lt("created_at", msgCutoff);
  if (msgPurgeError) console.warn("[CRON/PING] Messages purge warning:", msgPurgeError.message);

  // ── 6. Purge des soumissions de témoignages non approuvées > 90 jours ─────
  // Les testimonial_submissions stockent l'IP de soumission (donnée personnelle).
  // Les soumissions approuvées sont conservées (elles alimentent la table
  // testimonials) ; les soumissions rejetées ou en attente sont purgées.
  // Purge non bloquante.
  const { error: submPurgeError } = await supabase
    .from("testimonial_submissions")
    .delete()
    .lt("created_at", msgCutoff) // même cutoff 90 jours
    .eq("approved", false);
  if (submPurgeError) console.warn("[CRON/PING] Testimonial submissions purge warning:", submPurgeError.message);

  return NextResponse.json({
    ok:             true,
    checkedAt:      report.checkedAt,
    servicesStored: rows.length,
    overall:        report.overall,
  });
}
