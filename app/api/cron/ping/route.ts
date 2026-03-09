// app/api/cron/ping/route.ts
// --------------------------
// Vercel Cron endpoint — appelé toutes les 5 minutes (voir vercel.json).
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
  // ── 1. Authentification ───────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  // ── 2. Health checks ──────────────────────────────────────────────────────
  const report = await runHealthChecks();

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

  // ── 4. Purge des lignes > 30 jours ────────────────────────────────────────
  // Purge non bloquante — une erreur ici ne fait pas échouer la réponse.
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error: purgeError } = await supabase
    .from("uptime_pings")
    .delete()
    .lt("checked_at", cutoff);
  if (purgeError) console.warn("[CRON/PING] Purge warning:", purgeError.message);

  return NextResponse.json({
    ok:             true,
    checkedAt:      report.checkedAt,
    servicesStored: rows.length,
    overall:        report.overall,
  });
}
