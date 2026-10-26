/**
 * @jest-environment node
 */
// __tests__/contact-route.test.ts
// /api/contact: body shape validation (no 500 on a non-string field) and the
// Formhook call timeout.

jest.mock("@/lib/ratelimit", () => ({
  contactRatelimit: {},
  safeLimit: async () => ({ success: true, reset: Date.now() + 1000 }),
}));
jest.mock("@/lib/logger", () => ({ log: { info: jest.fn(), error: jest.fn() } }));

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  topic: "general",
  message: "Bonjour, je souhaite échanger sur un poste.",
  acceptedPolicy: true,
  company: "",
  locale: "fr",
};

const post = (body: unknown) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/contact — forme du corps", () => {
  let POST: (req: Request) => Promise<Response>;
  beforeAll(async () => {
    ({ POST } = await import("@/app/api/contact/route"));
  });

  it("accepte le corps envoyé par le formulaire", async () => {
    expect((await POST(post(valid))).status).toBe(200);
  });

  it.each([
    ["un nom numérique", { ...valid, name: 42 }],
    ["un message objet", { ...valid, message: { x: 1 } }],
    ["une clé inconnue", { ...valid, role: "admin" }],
    ["un sujet trop long", { ...valid, subject: "x".repeat(201) }],
  ])("répond 400 invalid_payload pour %s (et non 500)", async (_label, body) => {
    const res = await POST(post(body));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_payload");
  });
});

describe("POST /api/contact — délai Formhook", () => {
  const originalFetch = globalThis.fetch;
  afterEach(() => {
    globalThis.fetch = originalFetch;
    delete process.env.FORMHOOK_ENDPOINT;
    jest.resetModules();
  });

  it("répond 502 si Formhook ne répond pas à temps", async () => {
    process.env.FORMHOOK_ENDPOINT = "https://formhook.example/submit";
    jest.resetModules();
    const { POST } = await import("@/app/api/contact/route");
    const fetchMock = jest.fn((_url: string, init?: RequestInit) =>
      Promise.reject(Object.assign(new Error("timeout"), { name: init?.signal ? "TimeoutError" : "Error" })),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const res = await POST(post(valid));
    expect(res.status).toBe(502);
    // The timeout signal is passed to fetch.
    expect(fetchMock.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal);
  });
});
