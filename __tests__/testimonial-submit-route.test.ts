/**
 * @jest-environment node
 */
// __tests__/testimonial-submit-route.test.ts
// /api/testimonial-submit: body shape (strict zod schema), honeypot, required
// fields and delivery. Invitation checks are mocked as valid here; they have
// their own tests (testimonial-invite.test.ts).

jest.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-real-ip": "203.0.113.7" }),
}));
jest.mock("@/lib/ratelimit", () => ({
  testimonialRatelimit: {},
  safeLimit: async () => ({ success: true, reset: Date.now() + 1000 }),
}));
jest.mock("@/lib/logger", () => ({ log: { info: jest.fn(), error: jest.fn() } }));
jest.mock("@/lib/security/testimonialInvite", () => ({
  isInviteValid: () => true,
  isSessionKeyValid: () => true,
  isInviteUsed: async () => false,
  claimInvite: async () => true,
  releaseInvite: async () => undefined,
}));

import { NextRequest } from "next/server";

const valid = {
  full_name: "Ada Lovelace",
  role: "Tech lead",
  company: "",
  relation_type: "colleague",
  collaboration_context: "",
  message: "Une collègue rigoureuse, qui documente tout et livre à l'heure.",
  photo_url: "",
  locale: "fr",
  website: "",
  sessionKey: "k",
  invite: "i",
  exp: 2_000_000_000,
};

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/testimonial-submit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/testimonial-submit", () => {
  const originalFetch = globalThis.fetch;
  let POST: (req: NextRequest) => Promise<Response>;

  beforeAll(async () => {
    process.env.FORMHOOK_ENDPOINT = "https://formhook.example/endpoint";
    ({ POST } = await import("@/app/api/testimonial-submit/route"));
  });
  beforeEach(() => {
    globalThis.fetch = jest.fn(async () => new Response("{}", { status: 200 })) as unknown as typeof fetch;
  });
  afterAll(() => {
    globalThis.fetch = originalFetch;
    delete process.env.FORMHOOK_ENDPOINT;
  });

  it("accepte le corps envoyé par le formulaire et le transmet", async () => {
    const res = await POST(post(valid));
    expect(res.status).toBe(201);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["une clé inconnue", { ...valid, admin: true }],
    ["un nom numérique", { ...valid, full_name: 42 }],
    ["un message objet", { ...valid, message: { x: 1 } }],
    ["une date d'expiration en texte", { ...valid, exp: "demain" }],
  ])("répond 400 invalid_payload pour %s", async (_label, body) => {
    const res = await POST(post(body));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_payload");
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("répond 200 sans rien envoyer quand le pot de miel est rempli", async () => {
    const res = await POST(post({ ...valid, website: "https://spam.example" }));
    expect(res.status).toBe(200);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("refuse un message trop court", async () => {
    const res = await POST(post({ ...valid, message: "Trop court" }));
    expect(res.status).toBe(400);
  });

  it("refuse une photo qui n'est pas en https", async () => {
    const res = await POST(post({ ...valid, photo_url: "javascript:alert(1)" }));
    expect(res.status).toBe(400);
  });
});
