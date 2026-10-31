/**
 * @jest-environment node
 */
// __tests__/uptime.test.ts
// Uptime history in Redis (lib/uptime.ts): computations behind /status, the
// 30-day trimming of the sorted set, and the cron job that feeds it.

jest.mock("server-only", () => ({}), { virtual: true });

// In-memory stand-in for the sorted set and the cache keys.
const zset = new Map<string, number>(); // member → score
const kv = new Map<string, unknown>();
jest.mock("@/lib/redis", () => ({
  redis: {
    zadd: async (_k: string, { score, member }: { score: number; member: string }) => { zset.set(member, score); return 1; },
    zremrangebyscore: async (_k: string, min: number, max: number) => {
      let n = 0;
      for (const [m, s] of zset) if (s >= min && s <= max) { zset.delete(m); n++; }
      return n;
    },
    zrange: async (_k: string, min: number) =>
      [...zset.entries()].filter(([, s]) => s >= min).sort((a, b) => a[1] - b[1]).map(([m]) => m),
    expire: async () => 1,
    del: async (...keys: string[]) => { keys.forEach((k) => kv.delete(k)); return keys.length; },
    get: async (k: string) => kv.get(k) ?? null,
    set: async (k: string, v: unknown) => { kv.set(k, v); return "OK"; },
  },
}));

import {
  computeLatencyHistory,
  computeUptimeStats,
  getUptimeStats,
  latestReport,
  parseBatch,
  recordPingBatch,
  type PingBatch,
} from "@/lib/uptime";

const batch = (iso: string, status: "operational" | "degraded" | "outage" = "operational", latencyMs: number | null = 100): PingBatch => ({
  checkedAt: iso,
  services: [
    { name: "Website", status, latencyMs },
    { name: "Cache", status: "operational", latencyMs: 20 },
  ],
});

beforeEach(() => { zset.clear(); kv.clear(); });

describe("calculs de lib/uptime", () => {
  it("rend le dernier rapport avec le statut global le plus grave", () => {
    const report = latestReport([batch("2026-10-29T08:00:00.000Z"), batch("2026-10-30T08:00:00.000Z", "degraded")]);
    expect(report?.checkedAt).toBe("2026-10-30T08:00:00.000Z");
    expect(report?.overall).toBe("degraded");
    expect(latestReport([])).toBeNull();
  });

  it("calcule le pourcentage de disponibilité, null sous 3 relevés", () => {
    expect(computeUptimeStats([batch("2026-10-01T08:00:00Z"), batch("2026-10-02T08:00:00Z")]).Website).toBeNull();
    const stats = computeUptimeStats([
      batch("2026-10-01T08:00:00Z"),
      batch("2026-10-02T08:00:00Z", "outage"),
      batch("2026-10-03T08:00:00Z"),
      batch("2026-10-04T08:00:00Z"),
    ]);
    expect(stats.Website).toBe(75);
    expect(stats.Cache).toBe(100);
  });

  it("moyenne les latences par heure, dans l'ordre chronologique, sans les valeurs nulles", () => {
    const history = computeLatencyHistory([
      batch("2026-10-02T08:30:00Z", "operational", 300),
      batch("2026-10-01T08:00:00Z", "operational", 100),
      batch("2026-10-01T08:40:00Z", "operational", 200),
      batch("2026-10-03T08:00:00Z", "operational", null),
    ]);
    expect(history.Website).toEqual([150, 300]);
  });

  it("ignore un membre illisible", () => {
    expect(parseBatch("pas du json")).toBeNull();
    expect(parseBatch({ checkedAt: 1 })).toBeNull();
    expect(parseBatch(JSON.stringify(batch("2026-10-01T08:00:00Z")))?.services).toHaveLength(2);
  });
});

describe("recordPingBatch", () => {
  const now = Date.parse("2026-10-31T08:00:00Z");

  it("enregistre le relevé, supprime ceux de plus de 30 jours et vide le cache", async () => {
    kv.set("portfolio:uptime:stats:30d", { Website: 50 });
    await recordPingBatch(batch("2026-09-20T08:00:00.000Z"), Date.parse("2026-09-20T08:00:00Z"));
    expect(await recordPingBatch(batch("2026-10-31T08:00:00.000Z"), now)).toBe(true);
    const kept = [...zset.keys()].map((m) => JSON.parse(m).checkedAt);
    expect(kept).toEqual(["2026-10-31T08:00:00.000Z"]);
    expect(kv.has("portfolio:uptime:stats:30d")).toBe(false);
  });

  it("refuse un horodatage invalide", async () => {
    expect(await recordPingBatch({ checkedAt: "hier", services: [] }, now)).toBe(false);
  });

  it("alimente les statistiques lues par /status", async () => {
    // Relative to today: getUptimeStats() reads the last 30 days.
    for (const daysAgo of [3, 2, 1]) {
      const iso = new Date(Date.now() - daysAgo * 86_400_000).toISOString();
      await recordPingBatch(batch(iso));
    }
    expect((await getUptimeStats()).Website).toBe(100);
  });
});
