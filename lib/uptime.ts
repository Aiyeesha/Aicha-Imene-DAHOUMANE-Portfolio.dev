// lib/uptime.ts
// -------------
// Calcule le % d'uptime par service sur les 30 derniers jours.
// Fournit aussi l'historique de latence par heure sur 7 jours (sparklines).
// Lit la table `uptime_pings` (Supabase, lecture publique).
// Résultats mis en cache Redis 5 minutes (aligne avec l'intervalle du cron).
//
// Retourne Record<serviceName, number | null> :
//   number → % uptime (ex: 99.7)
//   null   → pas encore assez de données (< 3 pings)
//
// Note : Map n'est pas sérialisable en JSON → on utilise un objet plain.

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cacheGetOrSet }              from "@/lib/cache";

// Minimum de pings pour afficher un %, évite "100%" après le 1er déploiement
const MIN_PINGS = 3;

export type UptimeStats = Record<string, number | null>;

export async function getUptimeStats(): Promise<UptimeStats> {
  return cacheGetOrSet<UptimeStats>(
    "portfolio:uptime:stats:30d",
    300, // 5 minutes
    fetchFromSupabase
  );
}

// ── Latency history ───────────────────────────────────────────────────────────
// Tableau de latences moyennes par heure sur les 7 derniers jours.
// Chaque entrée est une moyenne en ms pour le créneau horaire correspondant.
// Utilisé pour les sparklines sur la page /status.

export type LatencyHistory = Record<string, number[]>;

export async function getLatencyHistory(): Promise<LatencyHistory> {
  return cacheGetOrSet<LatencyHistory>(
    "portfolio:uptime:latency:7d",
    300, // 5 min — aligne avec l'intervalle du cron
    fetchLatencyFromSupabase
  );
}

async function fetchLatencyFromSupabase(): Promise<LatencyHistory> {
  const history: LatencyHistory = {};

  try {
    const supabase = createServerSupabaseClient();
    const since    = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("uptime_pings")
      .select("service, latency_ms, checked_at")
      .gte("checked_at", since)
      .not("latency_ms", "is", null)
      .order("checked_at", { ascending: true });

    if (error || !data) {
      console.error("[uptime] latency fetch error:", error?.message);
      return history;
    }

    // Regrouper par service puis par créneau horaire (ex: "2026-03-15T14")
    type Bucket = { sum: number; count: number };
    const buckets: Record<string, Record<string, Bucket>> = {};

    for (const row of data) {
      if (row.latency_ms == null) continue;
      // Tronquer à l'heure (les 13 premiers caractères de l'ISO string)
      const hour = (row.checked_at as string).slice(0, 13);
      if (!buckets[row.service]) buckets[row.service] = {};
      if (!buckets[row.service][hour]) buckets[row.service][hour] = { sum: 0, count: 0 };
      buckets[row.service][hour].sum   += row.latency_ms as number;
      buckets[row.service][hour].count += 1;
    }

    // Convertir en tableau de moyennes (ordre chronologique garanti par la requête)
    for (const [service, hours] of Object.entries(buckets)) {
      history[service] = Object.values(hours).map(b => Math.round(b.sum / b.count));
    }
  } catch (e) {
    console.error("[uptime] latency unexpected error:", e);
  }

  return history;
}

// ── Uptime stats ──────────────────────────────────────────────────────────────

async function fetchFromSupabase(): Promise<UptimeStats> {
  const stats: UptimeStats = {};

  try {
    const supabase = createServerSupabaseClient();
    const since    = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("uptime_pings")
      .select("service, status")
      .gte("checked_at", since);

    if (error || !data) {
      console.error("[uptime] Supabase error:", error?.message);
      return stats; // objet vide → dégradé gracieusement
    }

    // Regrouper par service
    const grouped: Record<string, { total: number; operational: number }> = {};
    for (const row of data) {
      if (!grouped[row.service]) grouped[row.service] = { total: 0, operational: 0 };
      grouped[row.service].total++;
      if (row.status === "operational") grouped[row.service].operational++;
    }

    // Calculer le % (1 décimale)
    for (const [service, counts] of Object.entries(grouped)) {
      if (counts.total < MIN_PINGS) {
        stats[service] = null; // pas assez de données
      } else {
        const pct = (counts.operational / counts.total) * 100;
        stats[service] = Math.round(pct * 10) / 10;
      }
    }
  } catch (e) {
    console.error("[uptime] Unexpected error:", e);
  }

  return stats;
}
