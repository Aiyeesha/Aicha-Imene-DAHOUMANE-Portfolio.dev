/**
 * @jest-environment node
 */
// __tests__/testimonial-invite.test.ts
// Testimonial invitations: single use, session key bound to the invitation,
// bounded fields, https-only photo, delivery by email (Formhook) with the
// invitation released when delivery fails.

jest.mock("server-only", () => ({}), { virtual: true });

const store = new Map<string, string>();
jest.mock("@/lib/redis", () => ({
  redis: {
    exists: async (k: string) => (store.has(k) ? 1 : 0),
    set: async (k: string, v: string, opts?: { nx?: boolean }) => {
      if (opts?.nx && store.has(k)) return null;
      store.set(k, v);
      return "OK";
    },
    del: async (k: string) => (store.delete(k) ? 1 : 0),
  },
}));
jest.mock("@/lib/ratelimit", () => ({
  testimonialRatelimit: {},
  safeLimit: async () => ({ success: true }),
}));
jest.mock("next/headers", () => ({ headers: async () => new Headers({ "x-real-ip": "1.2.3.4" }) }));
jest.mock("@/lib/logger", () => ({ log: { info: jest.fn(), error: jest.fn() } }));

import {
  isInviteValid,
  isSessionKeyValid,
  sessionKeyFor,
  signInvite,
} from "@/lib/security/testimonialInvite";
import { POST } from "@/app/api/testimonial-submit/route";
import { NextRequest } from "next/server";

const SECRET = "s".repeat(40);
const send = jest.spyOn(globalThis, "fetch");
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
    process.env.FORMHOOK_ENDPOINT = "https://formhook.example/f/abc";
    process.env.FORMHOOK_AUTH_TOKEN = "formhook-token";
    store.clear();
    send.mockReset().mockResolvedValue(new Response(null, { status: 200 }));
  });

  afterAll(() => send.mockRestore());

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
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("envoie le témoignage par e-mail via Formhook, avec le jeton serveur", async () => {
    expect((await post(body({ company: "Greta" }))).status).toBe(201);
    const [url, init] = send.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://formhook.example/f/abc");
    expect((init.headers as Record<string, string>)["X-Auth-Token"]).toBe("formhook-token");
    const payload = JSON.parse(String(init.body));
    expect(payload).toMatchObject({
      name: "Ada Lovelace",
      topic: "testimonial",
      subject: "Nouveau témoignage — Ada Lovelace, Formatrice",
      company: "Greta",
      relation_type: "trainer",
      locale: "fr",
    });
    // No invitation material or IP in the email.
    expect(JSON.stringify(payload)).not.toMatch(/invite|sessionKey|1\.2\.3\.4/);
  });

  it("refuse (503) et rend le lien si Formhook n'est pas configuré", async () => {
    delete process.env.FORMHOOK_ENDPOINT;
    expect((await post(body())).status).toBe(503);
    expect(send).not.toHaveBeenCalled();
    process.env.FORMHOOK_ENDPOINT = "https://formhook.example/f/abc";
    expect((await post(body())).status).toBe(201);
  });

  it("refuse une clé de session émise pour une autre invitation", async () => {
    const other = signInvite(SECRET, exp + 5);
    expect((await post(body({ sessionKey: sessionKeyFor(SECRET, other) }))).status).toBe(403);
  });

  it("refuse une photo en http: et les champs trop longs", async () => {
    expect((await post(body({ photo_url: "http://example.com/p.jpg" }))).status).toBe(400);
    expect((await post(body({ full_name: "x".repeat(101) }))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("ne laisse passer qu'une soumission sur deux envoyées en même temps", async () => {
    const statuses = (await Promise.all([post(body()), post(body())])).map((r) => r.status).sort();
    expect(statuses).toEqual([201, 410]);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("rend l'invitation réutilisable si Formhook échoue ou ne répond pas", async () => {
    send.mockResolvedValueOnce(new Response(null, { status: 500 }));
    expect((await post(body())).status).toBe(502);
    send.mockRejectedValueOnce(new Error("timeout"));
    expect((await post(body())).status).toBe(502);
    expect((await post(body())).status).toBe(201);
  });
});
