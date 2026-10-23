/**
 * @jest-environment node
 */
// __tests__/testimonial-submit.test.ts
// Tests unitaires — envoi des témoignages par e-mail via Formhook (même
// mécanisme que le formulaire de contact, rien n'est stocké côté serveur).
// Env node (pas jsdom) : next/server requiert les Web Fetch globals de Node.js.

import { createHmac } from "crypto";
import { NextRequest } from "next/server";

jest.mock("@/lib/ratelimit", () => ({
  testimonialRatelimit: null,
  safeLimit: async () => ({ success: true, reset: Date.now() + 10_000 }),
}));

// headers() exige un contexte de requête Next.js : on renvoie une IP fixe.
jest.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-real-ip": "1.2.3.4" }),
}));

const TOKEN = "test-submit-token";
const FORMHOOK_URL = "https://formhook.example.com/f/test";

// Même calcul que la page serveur : HMAC(token, tranche de 30 min courante).
function sessionKey(): string {
  const bucket = Math.floor(Date.now() / (30 * 60 * 1000));
  return createHmac("sha256", TOKEN).update(bucket.toString()).digest("hex");
}

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost/api/testimonial-submit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = () => ({
  sessionKey: sessionKey(),
  full_name: "Jeanne Martin",
  role: "Tech Lead",
  company: "Exemple SA",
  relation_type: "colleague",
  collaboration_context: "Projet Salesforce, 6 mois",
  message: "Un témoignage suffisamment long pour passer la validation.",
  locale: "fr",
});

// La route lit FORMHOOK_ENDPOINT au chargement du module : on la recharge
// après avoir positionné les variables d'environnement de chaque scénario.
function loadRoute(): typeof import("@/app/api/testimonial-submit/route") {
  let mod!: typeof import("@/app/api/testimonial-submit/route");
  jest.isolateModules(() => {
    mod = require("@/app/api/testimonial-submit/route");
  });
  return mod;
}

describe("POST /api/testimonial-submit — envoi via Formhook", () => {
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    process.env.TESTIMONIAL_SUBMIT_TOKEN = TOKEN;
    process.env.FORMHOOK_ENDPOINT = FORMHOOK_URL;
    process.env.FORMHOOK_AUTH_TOKEN = "formhook-token";
    fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }) as Response
    );
  });

  afterEach(() => {
    delete process.env.TESTIMONIAL_SUBMIT_TOKEN;
    delete process.env.FORMHOOK_ENDPOINT;
    delete process.env.FORMHOOK_AUTH_TOKEN;
    fetchMock.mockRestore();
  });

  it("transmet le témoignage à Formhook avec le jeton serveur", async () => {
    const { POST } = loadRoute();
    const res = await POST(makeRequest(validBody()));

    expect(res.status).toBe(201);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(FORMHOOK_URL);
    expect((init.headers as Record<string, string>)["X-Auth-Token"]).toBe("formhook-token");
    const sent = JSON.parse(String(init.body));
    expect(sent).toMatchObject({
      name: "Jeanne Martin",
      topic: "testimonial",
      role: "Tech Lead",
      relation_type: "colleague",
      locale: "fr",
    });
    // Aucune donnée réseau du témoin n'est transmise.
    expect(JSON.stringify(sent)).not.toContain("1.2.3.4");
  });

  it("renvoie 502 si Formhook refuse l'envoi", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 500 }) as Response);
    const { POST } = loadRoute();
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(502);
  });

  it("refuse une clé de session invalide sans appeler Formhook", async () => {
    const { POST } = loadRoute();
    const res = await POST(makeRequest({ ...validBody(), sessionKey: "0".repeat(64) }));
    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("ignore silencieusement un bot (honeypot rempli)", async () => {
    const { POST } = loadRoute();
    const res = await POST(makeRequest({ ...validBody(), website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
