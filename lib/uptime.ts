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

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { cacheGetOrSet }              from "@/lib/cache";
import { redis }                      from "@/lib/redis";
import type { ServiceStatus, HealthReport } from "@/lib/health";

// Minimum de pings pour afficher un %, évite "100%" après le 1er déploiement
const MIN_PINGS = 3;

// ── Dernier rapport de statut (depuis uptime_pings) ───────────────────────────
// Reconstruit un HealthReport à partir du dernier ping stocké par le cron.
// Évite tout appel sortant en direct lors du rendu de /status.

export async function getLatestPingReport(): Promise<HealthReport | null> {
  if (!redis) {
    return fetchLatestPingsFromSupabase();
  }

  try {
    const cached = await redis.get<HealthReport | null>("portfolio:uptime:latest");
    if (cached && cached.checkedAt) {
      // Guard: if cached data is older than 10 min the key is stale (e.g. set
      // manually without TTL). Delete it and fall through to a fresh fetch.
      const ageMs = Date.now() - new Date(cached.checkedAt).getTime();
      if (ageMs < 10 * 60 * 1000) return cached;
      await redis.del("portfolio:uptime:latest").catch(() => {});
    }
  } catch {}

  const fresh = await fetchLatestPingsFromSupabase();
  if (fresh) {
    await redis.set("portfolio:uptime:latest", fresh, { ex: 60 }).catch(() => {});
  }
  return fresh;
}

async function fetchLatestPingsFromSupabase(): Promise<HealthReport | null> {
  try {
    const supabase = createAdminSupabaseClient();

    // Récupère le dernier ping de chaque service (1 requête)
    const { data, error } = await supabase
      .from("uptime_pings")
      .select("service, status, latency_ms, checked_at")
      .order("checked_at", { ascending: false })
      .limit(50); // assez pour couvrir tous les services du dernier batch

    if (error || !data || data.length === 0) {
      console.error("[uptime] latest pings fetch error:", error?.message);
      return null;
    }

    // Garder seulement le ping le plus récent par service
    const seen = new Set<string>();
    const latest: typeof data = [];
    for (const row of data) {
      if (!seen.has(row.service)) {
        seen.add(row.service);
        latest.push(row);
      }
    }

    // Le timestamp du rapport = le plus récent parmi tous les services
    const checkedAt = latest[0].checked_at as string;

    const services = latest.map((row) => ({
      name:      row.service as string,
      status:    row.status  as ServiceStatus,
      latencyMs: row.latency_ms as number | null,
    }));

    // Statut global : outage si au moins un est en panne, degraded si dégradé
    const overall: ServiceStatus =
      services.some((s) => s.status === "outage")    ? "outage"      :
      services.some((s) => s.status === "degraded")  ? "degraded"    :
                                                       "operational";

    return { checkedAt, overall, services };
  } catch (e) {
    console.error("[uptime] latest pings unexpected error:", e);
    return null;
  }
}

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
    const supabase = createAdminSupabaseClient();
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
    const supabase = createAdminSupabaseClient();
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
