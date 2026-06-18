/**
 * @jest-environment node
 */
// __tests__/csp-report-alert.test.ts
// Tests unitaires — SEC-02 : alerting webhook sur violations CSP critiques.
// Env node (pas jsdom) : next/server requiert les Web Fetch globals de Node.js.

jest.mock("@/lib/ratelimit", () => ({
  cspReportRatelimit: { limit: async () => ({ success: true, reset: Date.now() + 60_000 }) },
  cspAlertRatelimit:  { limit: async () => ({ success: true, reset: Date.now() + 60_000 }) },
  safeLimit: async (limiter: { limit: (k: string) => Promise<{ success: boolean; reset?: number }> }, key: string) => {
    const r = await limiter.limit(key);
    return { success: r.success, reset: r.reset ?? Date.now() + 10_000 };
  },
}));

import { POST } from "@/app/api/csp-report/route";
import { NextRequest } from "next/server";

function makeRequest(body: unknown, searchParams = ""): NextRequest {
  return new NextRequest(`http://localhost/api/csp-report${searchParams}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "1.2.3.4" },
    body: JSON.stringify(body),
  });
}

describe("CSP report — webhook alert (SEC-02)", () => {
  const WEBHOOK_URL = "https://hooks.example.com/csp-alert";
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    process.env.CSP_ALERT_WEBHOOK_URL = WEBHOOK_URL;
    fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 204 }) as Response
    );
  });

  afterEach(() => {
    delete process.env.CSP_ALERT_WEBHOOK_URL;
    fetchMock.mockRestore();
  });

  it("envoie une alerte webhook pour une violation script-src (critique)", async () => {
    const body = {
      "csp-report": {
        "violated-directive": "script-src-elem",
        "blocked-uri": "https://evil.example.com/xss.js",
        "document-uri": "https://myportfolio.dev/fr",
      },
    };
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(204);

    const webhookCall = fetchMock.mock.calls.find(
      ([url]: [string]) => url === WEBHOOK_URL
    );
    expect(webhookCall).toBeDefined();
  });

  it("envoie une alerte webhook pour une violation require-trusted-types-for (critique)", async () => {
    const body = {
      "csp-report": {
        "violated-directive": "require-trusted-types-for",
        "blocked-uri": "https://cdn.example.com/script.js",
        "document-uri": "https://myportfolio.dev/en",
      },
    };
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(204);

    const webhookCall = fetchMock.mock.calls.find(
      ([url]: [string]) => url === WEBHOOK_URL
    );
    expect(webhookCall).toBeDefined();
  });

  it("n'envoie PAS d'alerte pour une extension navigateur (faux positif)", async () => {
    const body = {
      "csp-report": {
        "violated-directive": "script-src-elem",
        "blocked-uri": "chrome-extension://abcdef/content.js",
        "document-uri": "https://myportfolio.dev/fr",
      },
    };
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(204);

    const webhookCall = fetchMock.mock.calls.find(
      ([url]: [string]) => url === WEBHOOK_URL
    );
    expect(webhookCall).toBeUndefined();
  });

  it("n'envoie PAS d'alerte pour une violation report-only (CSPO)", async () => {
    const body = {
      "csp-report": {
        "violated-directive": "script-src-elem",
        "blocked-uri": "https://evil.example.com/xss.js",
        "document-uri": "https://myportfolio.dev/fr",
      },
    };
    const res = await POST(makeRequest(body, "?ro=1"));
    expect(res.status).toBe(204);

    const webhookCall = fetchMock.mock.calls.find(
      ([url]: [string]) => url === WEBHOOK_URL
    );
    expect(webhookCall).toBeUndefined();
  });

  it("n'envoie PAS d'alerte si CSP_ALERT_WEBHOOK_URL n'est pas configuré", async () => {
    delete process.env.CSP_ALERT_WEBHOOK_URL;
    const body = {
      "csp-report": {
        "violated-directive": "script-src-elem",
        "blocked-uri": "https://evil.example.com/xss.js",
        "document-uri": "https://myportfolio.dev/fr",
      },
    };
    await POST(makeRequest(body));
    expect(fetchMock).not.toHaveBeenCalledWith(WEBHOOK_URL, expect.anything());
  });

  it("répond toujours 204 même si le webhook échoue", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network error"));
    const body = {
      "csp-report": {
        "violated-directive": "script-src-elem",
        "blocked-uri": "https://evil.example.com/xss.js",
        "document-uri": "https://myportfolio.dev/fr",
      },
    };
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(204);
  });
});
