/**
 * @jest-environment node
 */
// __tests__/testimonial-invite.test.ts
// Audit 2026-10-25 : invitations à témoigner réutilisables, clé de session
// commune à tous les visiteurs, champs non bornés, photo en http:.

jest.mock("server-only", () => ({}), { virtual: true });

const store = new Map<string, string>();
jest.mock("@/lib/redis", () => ({
  redis: {
    exists: async (k: string) => (store.has(k) ? 1 : 0),
    set: async (k: string, v: string) => { store.set(k, v); return "OK"; },
  },
}));
jest.mock("@/lib/ratelimit", () => ({
  testimonialRatelimit: {},
  safeLimit: async () => ({ success: true }),
}));
jest.mock("next/headers", () => ({ headers: async () => new Headers({ "x-real-ip": "1.2.3.4" }) }));
const insert = jest.fn(async () => ({ error: null }));
jest.mock("@/lib/supabase/admin", () => ({
  createAdminSupabaseClient: () => ({ from: () => ({ insert }) }),
}));

import {
  isInviteValid,
  isSessionKeyValid,
  sessionKeyFor,
  signInvite,
} from "@/lib/security/testimonialInvite";
import { POST } from "@/app/api/testimonial-submit/route";
import { NextRequest } from "next/server";

const SECRET = "s".repeat(40);
const exp = Math.floor(Date.now() / 1000) + 3600;

describe("lib/security/testimonialInvite", () => {
  it("valide une invitation signée et non expirée", () => {
    expect(isInviteValid(SECRET, signInvite(SECRET, exp), exp)).toBe(true);
    expect(isInviteValid(SECRET, signInvite(SECRET, exp), exp - 7200)).toBe(false);
    expect(isInviteValid(SECRET, signInvite("autre-secret", exp), exp)).toBe(false);
  });

  it("lie la clé de session à une invitation précise", () => {
    const a = signInvite(SECRET, exp);
    const b = signInvite(SECRET, exp + 1);
    expect(isSessionKeyValid(SECRET, a, sessionKeyFor(SECRET, a))).toBe(true);
    expect(isSessionKeyValid(SECRET, b, sessionKeyFor(SECRET, a))).toBe(false);
  });
});

describe("POST /api/testimonial-submit", () => {
  beforeEach(() => {
    process.env.TESTIMONIAL_SUBMIT_TOKEN = SECRET;
    store.clear();
    insert.mockClear();
  });

  const invite = () => signInvite(SECRET, exp);
  const body = (over: Record<string, unknown> = {}) => ({
    full_name: "Ada Lovelace",
    role: "Formatrice",
    relation_type: "trainer",
    message: "Aïcha est rigoureuse et pédagogue, un plaisir de travailler avec elle.",
    locale: "fr",
    invite: invite(),
    exp,
    sessionKey: sessionKeyFor(SECRET, invite()),
    ...over,
  });
  const post = (b: unknown) =>
    POST(new NextRequest("http://localhost/api/testimonial-submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(b),
    }));

  it("accepte une première soumission puis refuse la réutilisation du lien (410)", async () => {
    expect((await post(body())).status).toBe(201);
    expect((await post(body())).status).toBe(410);
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("refuse une clé de session émise pour une autre invitation", async () => {
    const other = signInvite(SECRET, exp + 5);
    expect((await post(body({ sessionKey: sessionKeyFor(SECRET, other) }))).status).toBe(403);
  });

  it("refuse une photo en http: et les champs trop longs", async () => {
    expect((await post(body({ photo_url: "http://example.com/p.jpg" }))).status).toBe(400);
    expect((await post(body({ full_name: "x".repeat(101) }))).status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });
});
