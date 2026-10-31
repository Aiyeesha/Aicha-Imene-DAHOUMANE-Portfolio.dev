/**
 * @jest-environment node
 */
// __tests__/cron-ping.test.ts
// Daily cron (/api/cron/ping): the Redis uptime history is the source of
// /status, so a failed write fails the job; the Supabase copy is best effort.

jest.mock("server-only", () => ({}), { virtual: true });
jest.mock("next/server", () => {
  const actual = jest.requireActual("next/server");
  return { ...actual, after: (fn: () => unknown) => { void fn(); } };
});

const report = {
  checkedAt: "2026-10-31T08:00:00.000Z",
  overall: "operational",
  services: [{ name: "Website", status: "operational", latencyMs: 120 }],
};
jest.mock("@/lib/health", () => ({ runHealthChecks: async () => report }));

const recordPingBatch = jest.fn(async (): Promise<boolean> => true);
jest.mock("@/lib/uptime", () => ({ recordPingBatch: (...a: unknown[]) => recordPingBatch(...(a as [])) }));

const insert = jest.fn(async (): Promise<{ error: { message: string } | null }> => ({ error: null }));
// Purges: delete().lt() is awaited directly, or followed by .eq().
const purge = () => Object.assign(Promise.resolve({ error: null }), { eq: async () => ({ error: null }) });
jest.mock("@/lib/supabase/admin", () => ({
  createAdminSupabaseClient: () => ({
    from: () => ({ insert, delete: () => ({ lt: purge }) }),
  }),
}));

import { GET } from "@/app/api/cron/ping/route";

const call = () => GET(new Request("http://localhost/api/cron/ping", { headers: { authorization: "Bearer s3cret" } }));

beforeEach(() => {
  process.env.CRON_SECRET = "s3cret";
  delete process.env.ALERT_WEBHOOK_URL;
  delete process.env.HEALTHCHECK_URL;
  recordPingBatch.mockClear();
  insert.mockClear();
});

describe("GET /api/cron/ping", () => {
  it("enregistre le relevé dans Redis", async () => {
    const res = await call();
    expect(res.status).toBe(200);
    expect(recordPingBatch).toHaveBeenCalledWith({
      checkedAt: report.checkedAt,
      services: [{ name: "Website", status: "operational", latencyMs: 120 }],
    });
  });

  it("échoue si l'historique Redis n'a pas pu être écrit", async () => {
    recordPingBatch.mockResolvedValueOnce(false);
    const res = await call();
    expect(res.status).toBe(500);
    expect(await res.json()).toMatchObject({ error: "history_store_failed" });
  });

  it("réussit même si la copie Supabase échoue", async () => {
    insert.mockResolvedValueOnce({ error: { message: "paused project" } });
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    expect((await call()).status).toBe(200);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Supabase copy skipped"), "paused project");
    warn.mockRestore();
  });

  it("refuse une requête sans le bon secret", async () => {
    const res = await GET(new Request("http://localhost/api/cron/ping", { headers: { authorization: "Bearer faux" } }));
    expect(res.status).toBe(401);
    expect(recordPingBatch).not.toHaveBeenCalled();
  });
});
