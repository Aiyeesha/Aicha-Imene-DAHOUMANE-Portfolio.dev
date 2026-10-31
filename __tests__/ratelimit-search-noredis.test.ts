/**
 * @jest-environment node
 */
// __tests__/ratelimit-search-noredis.test.ts
// Without Upstash (CI runs `next start`, NODE_ENV=production), the no-op
// limiters fail closed, which suits write routes (contact, admin). The blog
// search is a public read route: failing closed would switch search off
// entirely, so its no-op limiter lets requests through.

describe("searchRatelimit sans Redis, en production", () => {
  const original = { ...process.env };
  afterEach(() => { process.env = original; jest.resetModules(); });

  async function load() {
    process.env = { ...original, NODE_ENV: "production" } as NodeJS.ProcessEnv;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    jest.spyOn(console, "warn").mockImplementation(() => {});
    return import("@/lib/ratelimit");
  }

  it("laisse passer les recherches (route publique en lecture seule)", async () => {
    const { searchRatelimit, safeLimit } = await load();
    expect((await safeLimit(searchRatelimit, "search:ip:203.0.113.7")).success).toBe(true);
  });

  it("garde le refus par défaut pour les routes d'écriture (contact)", async () => {
    const { contactRatelimit, safeLimit } = await load();
    expect((await safeLimit(contactRatelimit, "contact:ip:203.0.113.7")).success).toBe(false);
  });
});
