// lib/uptime.ts
// -------------
// Calcule le % d'uptime par service sur les 30 derniers jours.
// Lit la table `uptime_pings` (Supabase, lecture publique).
// Résultat mis en cache Redis 5 minutes (aligne avec l'intervalle du cron).
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
