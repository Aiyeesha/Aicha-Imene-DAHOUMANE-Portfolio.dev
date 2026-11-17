// __tests__/ratelimit.test.ts
// Covers lib/ratelimit.ts, a critical anti-abuse module. No Upstash variable
// is set in tests, so every exported limiter takes the no-op path: exactly
// the fail-closed / fail-open branch to check explicitly.
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

describe("safeLimit() — policy on Redis errors", () => {
  const originalEnv = process.env.NODE_ENV;
  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = originalEnv;
    jest.resetModules();
  });
  const throwing = { limit: async () => { throw new Error("ECONNREFUSED"); } };

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

  it("fails OPEN outside production when the limiter throws", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    const { safeLimit } = require("@/lib/ratelimit");
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect((await safeLimit(throwing, "some-key")).success).toBe(true);
  });

  it("fails CLOSED in production when the limiter throws (write routes)", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    const { safeLimit } = require("@/lib/ratelimit");
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect((await safeLimit(throwing, "contact:ip:1.2.3.4")).success).toBe(false);
    // Logs the error class only, never the key.
    expect(spy.mock.calls.flat().join(" ")).not.toContain("1.2.3.4");
  });

  it("stays OPEN in production with failOpen: true (read-only / telemetry routes)", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    const { safeLimit } = require("@/lib/ratelimit");
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect((await safeLimit(throwing, "search:ip:1.2.3.4", { failOpen: true })).success).toBe(true);
  });
});
