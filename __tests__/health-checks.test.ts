/**
 * @jest-environment node
 */
// __tests__/health-checks.test.ts
// --------------------------------
// lib/health.ts:
//   - a production deployment without FORMHOOK_ENDPOINT reports the contact
//     form as an outage (the form would answer 503), not as operational;
//   - elsewhere (local, previews) a missing endpoint is not a degradation;
//   - runHealthChecksCached() reuses a report for 60 seconds.

import { resetHealthCache, runHealthChecks, runHealthChecksCached } from "@/lib/health";

const ENV = { ...process.env };

beforeEach(() => {
  process.env = { ...ENV };
  delete process.env.FORMHOOK_ENDPOINT;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  resetHealthCache();
});

afterAll(() => {
  process.env = ENV;
});

const contact = async () =>
  (await runHealthChecks()).services.find((s) => s.name === "Contact form");

describe("contact form check", () => {
  it("is an outage in production when Formhook is not configured", async () => {
    process.env.VERCEL_ENV = "production";
    expect((await contact())?.status).toBe("outage");
  });

  it("is not a degradation outside production", async () => {
    process.env.VERCEL_ENV = "preview";
    expect((await contact())?.status).toBe("operational");
  });
});

describe("runHealthChecksCached", () => {
  it("reuses the same report for 60 seconds, then runs the checks again", async () => {
    const t0 = 1_000_000;
    const first = runHealthChecksCached(t0);
    expect(runHealthChecksCached(t0 + 59_000)).toBe(first);
    const later = runHealthChecksCached(t0 + 60_000);
    expect(later).not.toBe(first);
    await Promise.all([first, later]);
  });
});
