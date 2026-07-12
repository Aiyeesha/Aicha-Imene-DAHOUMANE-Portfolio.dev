// __tests__/ratelimit.test.ts
// Couvre lib/ratelimit.ts, un module 0% testé jusqu'ici malgré son rôle de
// protection anti-abus (cf. audit : cibler les modules critiques plutôt qu'un
// chiffre global). Aucune variable Upstash n'est configurée en environnement
// de test, donc chaque limiteur exporté utilise la voie "no-op" — exactement
// la branche fail-closed/fail-open qu'on veut vérifier explicitement.
//
// @upstash/redis pulls in `uncrypto`, an ESM-only package Jest can't parse
// without extending transformIgnorePatterns. Mocked instead — the no-op path
// under test never touches the real Upstash client anyway.

jest.mock("@upstash/redis", () => ({ Redis: jest.fn() }));
jest.mock("@upstash/ratelimit", () => ({
  Ratelimit: Object.assign(jest.fn(), { slidingWindow: jest.fn() }),
}));

describe("lib/ratelimit.ts — no-op limiter (Upstash env vars absent)", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = originalNodeEnv;
    jest.resetModules();
  });

  it("fails OPEN (success: true) outside production — no friction in dev/CI", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    jest.resetModules();
    const { contactRatelimit } = require("@/lib/ratelimit");

    const result = await contactRatelimit.limit("contact:ip:1.2.3.4");
    expect(result.success).toBe(true);
  });

  it("fails CLOSED (success: false) in production — no silent bypass on Redis outage", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    jest.resetModules();
    const { contactRatelimit } = require("@/lib/ratelimit");

    const result = await contactRatelimit.limit("contact:ip:1.2.3.4");
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });
});

describe("safeLimit() — fail-open wrapper around Redis errors", () => {
  afterEach(() => jest.resetModules());

  it("passes through a successful limiter result", async () => {
    const { safeLimit } = require("@/lib/ratelimit");
    const limiter = { limit: async () => ({ success: true, reset: 12345 }) };

    const result = await safeLimit(limiter, "some-key");
    expect(result).toEqual({ success: true, reset: 12345 });
  });

  it("defaults reset to ~10s from now when the limiter doesn't provide one", async () => {
    const { safeLimit } = require("@/lib/ratelimit");
    const limiter = { limit: async () => ({ success: false }) };

    const before = Date.now();
    const result = await safeLimit(limiter, "some-key");
    expect(result.success).toBe(false);
    expect(result.reset).toBeGreaterThanOrEqual(before + 9_000);
    expect(result.reset).toBeLessThanOrEqual(before + 11_000);
  });

  it("fails OPEN when the limiter throws (e.g. Redis unreachable)", async () => {
    const { safeLimit } = require("@/lib/ratelimit");
    const limiter = { limit: async () => { throw new Error("ECONNREFUSED"); } };

    const result = await safeLimit(limiter, "some-key");
    expect(result.success).toBe(true);
  });
});
