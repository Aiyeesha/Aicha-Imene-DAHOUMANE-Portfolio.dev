/**
 * @jest-environment node
 */
// __tests__/testimonial-invite-admin.test.ts
// POST /api/admin/testimonial-invite: dedicated token (never ADMIN_PASSWORD),
// failure counter shared with /admin (same limiter, same key), fail closed
// when Redis is unavailable.

jest.mock("server-only", () => ({}), { virtual: true });
jest.mock("@/lib/redis", () => ({ redis: null }));

const limiter = { remaining: 5, limit: jest.fn(), getRemaining: jest.fn() };
jest.mock("@/lib/ratelimit", () => ({
  adminRatelimit: {
    getRemaining: (...a: unknown[]) => limiter.getRemaining(...a),
    limit: (...a: unknown[]) => limiter.limit(...a),
  },
  pseudonymizeKey: async (ip: string) => `h:${ip}`,
}));

import { POST } from "@/app/api/admin/testimonial-invite/route";
import { NextRequest } from "next/server";

const TOKEN = "t".repeat(40);
const post = (auth?: string) =>
  POST(new NextRequest("http://localhost/api/admin/testimonial-invite", {
    method: "POST",
    headers: {
      "x-real-ip": "1.2.3.4",
      "content-type": "application/json",
      ...(auth ? { authorization: auth } : {}),
    },
    body: JSON.stringify({ locale: "fr", days: 7 }),
  }));

describe("POST /api/admin/testimonial-invite", () => {
  beforeEach(() => {
    process.env.TESTIMONIAL_INVITE_ADMIN_TOKEN = TOKEN;
    process.env.TESTIMONIAL_SUBMIT_TOKEN = "s".repeat(40);
    process.env.ADMIN_PASSWORD = "correct-horse-battery";
    limiter.remaining = 5;
    limiter.getRemaining.mockReset().mockImplementation(async () => ({ remaining: limiter.remaining, reset: 0 }));
    limiter.limit.mockReset().mockImplementation(async () => {
      limiter.remaining -= 1;
      return { success: limiter.remaining >= 0 };
    });
  });

  it("génère un lien avec le jeton dédié, sans consommer le quota", async () => {
    const res = await post(`Bearer ${TOKEN}`);
    expect(res.status).toBe(201);
    expect((await res.json()).url).toMatch(/\/fr\/testimonial-submit\?invite=[0-9a-f]{64}&exp=\d+$/);
    expect(limiter.limit).not.toHaveBeenCalled();
  });

  it("refuse ADMIN_PASSWORD comme jeton", async () => {
    expect((await post("Bearer correct-horse-battery")).status).toBe(401);
  });

  it("se désactive si le jeton est absent ou trop court", async () => {
    process.env.TESTIMONIAL_INVITE_ADMIN_TOKEN = "court";
    expect((await post("Bearer court")).status).toBe(503);
    delete process.env.TESTIMONIAL_INVITE_ADMIN_TOKEN;
    expect((await post("Bearer ")).status).toBe(503);
  });

  it("partage le compteur /admin (même clé) et bloque après 5 échecs", async () => {
    for (let i = 0; i < 5; i++) expect((await post("Bearer mauvais")).status).toBe(401);
    expect(limiter.limit).toHaveBeenCalledWith("h:1.2.3.4");
    expect((await post(`Bearer ${TOKEN}`)).status).toBe(429);
  });

  it("refuse (fail closed) si Redis est indisponible", async () => {
    limiter.getRemaining.mockImplementation(async () => { throw new Error("redis down"); });
    expect((await post(`Bearer ${TOKEN}`)).status).toBe(429);
  });
});
