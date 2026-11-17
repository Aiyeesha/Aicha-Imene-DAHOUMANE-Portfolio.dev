// __tests__/server-error-alert.test.ts
// Alert on server errors (lib/monitoring/serverErrorAlert.ts): production
// only, normalised content without personal data, rate limited, never throws.

const limit = jest.fn();
jest.mock("@/lib/ratelimit", () => ({
  serverErrorAlertRatelimit: {},
  serverErrorAlertGlobalRatelimit: {},
  safeLimit: (...args: unknown[]) => limit(...args),
}));

import {
  __resetServerErrorAlertThrottle,
  buildServerErrorMessage,
  fingerprintOf,
  reportServerError,
  safePath,
} from "@/lib/monitoring/serverErrorAlert";

const env = process.env as Record<string, string | undefined>;
const ctx = { routePath: "/[locale]/projects/[slug]", routeType: "render" };
const req = { path: "/fr/projects/demo?invite=SECRET#x", method: "GET" };
const err = () => Object.assign(new Error("user@example.com not found"), { digest: "123456789" });

describe("serverErrorAlert", () => {
  const fetchMock = jest.fn().mockResolvedValue({ ok: true });

  beforeEach(() => {
    __resetServerErrorAlertThrottle();
    fetchMock.mockClear();
    limit.mockReset().mockResolvedValue({ success: true, reset: 0 });
    global.fetch = fetchMock as unknown as typeof fetch;
    env.ALERT_WEBHOOK_URL = "https://hooks.example.test/x";
    env.VERCEL_ENV = "production";
  });

  afterAll(() => {
    delete env.ALERT_WEBHOOK_URL;
    delete env.VERCEL_ENV;
  });

  it("drops the query string, fragment and unsafe characters from paths", () => {
    expect(safePath("/fr/a?invite=SECRET#frag")).toBe("/fr/a");
    expect(safePath("/fr/<b>@everyone")).toBe("/fr/beveryone");
  });

  it("builds a message without the error text, query string or headers", () => {
    const msg = buildServerErrorMessage(err(), req, ctx, "production");
    expect(msg).toContain("/[locale]/projects/[slug]");
    expect(msg).toContain("GET /fr/projects/demo");
    expect(msg).toContain("digest 123456789");
    expect(msg).not.toContain("SECRET");
    expect(msg).not.toContain("user@example.com");
  });

  it("posts one alert in production", async () => {
    await reportServerError(err(), req, ctx);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.allowed_mentions).toEqual({ parse: [] });
    expect(body.content).toContain("Server error (production)");
  });

  it("stays quiet on previews and without a webhook", async () => {
    env.VERCEL_ENV = "preview";
    await reportServerError(err(), req, ctx);
    env.VERCEL_ENV = "production";
    delete env.ALERT_WEBHOOK_URL;
    await reportServerError(err(), req, ctx);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not repeat the same fingerprint within the window (in-memory throttle)", async () => {
    await reportServerError(err(), req, ctx);
    await reportServerError(err(), req, ctx);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("respects the Upstash limiters (per fingerprint, then global)", async () => {
    limit.mockResolvedValueOnce({ success: false, reset: 0 });
    await reportServerError(err(), req, ctx);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(limit.mock.calls[0][1]).toBe(`fp:${fingerprintOf(err(), ctx)}`);
    expect(limit.mock.calls[0][2]).toEqual({ failOpen: true });
  });

  it("never throws when the webhook fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));
    jest.spyOn(console, "warn").mockImplementation(() => {});
    await expect(reportServerError(err(), req, ctx)).resolves.toBeUndefined();
  });
});
