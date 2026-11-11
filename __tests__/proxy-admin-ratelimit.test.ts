/**
 * @jest-environment node
 */
// __tests__/proxy-admin-ratelimit.test.ts
// /admin rate limit (5 / 15 min): only failed authentications consume a token,
// so normal admin browsing never locks itself out, and an exhausted quota
// blocks before any credential check.

const limiter = { remaining: 5, limit: jest.fn(), getRemaining: jest.fn() };

jest.mock("next-intl/middleware", () => () => () => {
  const { NextResponse } = jest.requireActual("next/server");
  return NextResponse.next();
});
jest.mock("@/lib/ratelimit", () => ({
  adminRatelimit: {
    getRemaining: (...a: unknown[]) => limiter.getRemaining(...a),
    limit: (...a: unknown[]) => limiter.limit(...a),
  },
  pseudonymizeKey: async (ip: string) => `h:${ip}`,
}));

import { proxy } from "@/proxy";
import { NextRequest } from "next/server";

const basic = (u: string, p: string) => `Basic ${btoa(`${u}:${p}`)}`;
const req = (auth?: string) =>
  new NextRequest("http://localhost/admin/incidents", {
    headers: { "x-real-ip": "1.2.3.4", ...(auth ? { authorization: auth } : {}) },
  });

describe("proxy /admin — rate-limit sur les seuls échecs", () => {
  beforeEach(() => {
    process.env.ADMIN_USERNAME = "admin-test";
    process.env.ADMIN_PASSWORD = "correct-horse-battery";
    limiter.remaining = 5;
    limiter.limit.mockClear();
    limiter.getRemaining.mockImplementation(async () => ({ remaining: limiter.remaining, reset: 0 }));
    limiter.limit.mockImplementation(async () => {
      limiter.remaining -= 1;
      return { success: limiter.remaining >= 0, remaining: Math.max(limiter.remaining, 0) };
    });
  });

  it("n'entame pas le quota pour des requêtes authentifiées", async () => {
    for (let i = 0; i < 10; i++) {
      const res = await proxy(req(basic("admin-test", "correct-horse-battery")));
      expect(res.status).toBe(200);
    }
    expect(limiter.limit).not.toHaveBeenCalled();
  });

  it("consomme un jeton par échec, puis répond 429 sans vérifier les identifiants", async () => {
    for (let i = 0; i < 5; i++) {
      expect((await proxy(req(basic("admin-test", "wrong")))).status).toBe(401);
    }
    expect(limiter.limit).toHaveBeenCalledTimes(5);
    // Quota exhausted: even valid credentials are refused until the window ends.
    expect((await proxy(req(basic("admin-test", "correct-horse-battery")))).status).toBe(429);
    expect(limiter.limit).toHaveBeenCalledTimes(5);
  });

  it("ne compte pas le défi 401 initial (sans en-tête Authorization)", async () => {
    for (let i = 0; i < 10; i++) {
      expect((await proxy(req())).status).toBe(401);
    }
    expect(limiter.limit).not.toHaveBeenCalled();
  });

  it("accepte un mot de passe non ASCII (décodage UTF-8)", async () => {
    process.env.ADMIN_PASSWORD = "mötdepässe-€-très-long";
    const utf8 = (s: string) => `Basic ${btoa(String.fromCharCode(...new TextEncoder().encode(s)))}`;
    expect((await proxy(req(utf8("admin-test:mötdepässe-€-très-long")))).status).toBe(200);
    expect(limiter.limit).not.toHaveBeenCalled();
  });

  it("reste fail-closed si Redis est indisponible", async () => {
    limiter.getRemaining.mockRejectedValue(new Error("redis down"));
    const err = jest.spyOn(console, "error").mockImplementation(() => {});
    expect((await proxy(req(basic("admin-test", "correct-horse-battery")))).status).toBe(429);
    err.mockRestore();
  });
});
