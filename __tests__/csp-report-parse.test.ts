/**
 * @jest-environment node
 */
// __tests__/csp-report-parse.test.ts
// CSP report parsing: one test per format (CSP Level 2 object and Reporting
// API array [{ type, body }]), plus a pass through the route.

// after() needs a request scope: run the task right away in tests.
jest.mock("next/server", () => ({
  ...jest.requireActual("next/server"),
  after: (task: () => unknown) => { void task(); },
}));

jest.mock("@/lib/ratelimit", () => ({
  cspReportRatelimit: { limit: async () => ({ success: true }) },
  cspAlertRatelimit:  { limit: async () => ({ success: true }) },
  safeLimit: async (l: { limit: (k: string) => Promise<{ success: boolean }> }, k: string) => l.limit(k),
}));

import { parseCspReports, MAX_REPORTS_PER_REQUEST } from "@/lib/security/cspReport";
import { POST } from "@/app/api/csp-report/route";
import { NextRequest } from "next/server";

const reportingApiEntry = (body: Record<string, unknown>) => ({
  type: "csp-violation",
  age: 0,
  url: "https://example.com/fr",
  user_agent: "Chrome",
  body,
});

describe("parseCspReports", () => {
  it("lit le format CSP Level 2 (Firefox, Safari)", () => {
    const [r] = parseCspReports({
      "csp-report": {
        "blocked-uri": "https://evil.example/x.js",
        "violated-directive": "script-src-elem",
        "document-uri": "https://example.com/fr",
      },
    });
    expect(r).toMatchObject({
      blockedUri: "https://evil.example/x.js",
      violatedDirective: "script-src-elem",
      documentUri: "https://example.com/fr",
    });
  });

  it("lit le format Reporting API (Chrome, Edge)", () => {
    const reports = parseCspReports([
      reportingApiEntry({
        blockedURL: "https://evil.example/x.js",
        effectiveDirective: "script-src-elem",
        documentURL: "https://example.com/fr",
        disposition: "enforce",
      }),
      { type: "deprecation", body: { id: "x" } },
    ]);
    expect(reports).toHaveLength(1);
    expect(reports[0]).toMatchObject({
      blockedUri: "https://evil.example/x.js",
      violatedDirective: "script-src-elem",
      disposition: "enforce",
    });
  });

  it(`plafonne un lot à ${MAX_REPORTS_PER_REQUEST} rapports`, () => {
    const batch = Array.from({ length: 50 }, () => reportingApiEntry({ blockedURL: "https://a.example/" }));
    expect(parseCspReports(batch)).toHaveLength(MAX_REPORTS_PER_REQUEST);
  });

  it("ignore les corps inattendus et les champs non textuels", () => {
    expect(parseCspReports("x")).toEqual([]);
    expect(parseCspReports(null)).toEqual([]);
    expect(parseCspReports({ "csp-report": { "blocked-uri": 42 } })[0].blockedUri).toBe("");
  });
});

describe("POST /api/csp-report — Reporting API", () => {
  let warn: jest.SpyInstance;
  beforeEach(() => { warn = jest.spyOn(console, "warn").mockImplementation(() => {}); });
  afterEach(() => warn.mockRestore());

  const post = (body: unknown) =>
    POST(new NextRequest("http://localhost/api/csp-report", {
      method: "POST",
      headers: { "content-type": "application/reports+json", "x-real-ip": "1.2.3.4" },
      body: JSON.stringify(body),
    }));

  it("journalise une violation Chrome au lieu de l'ignorer", async () => {
    const res = await post([reportingApiEntry({
      blockedURL: "https://evil.example/x.js",
      effectiveDirective: "script-src-elem",
      documentURL: "https://example.com/fr?token=secret",
      disposition: "enforce",
    })]);
    expect(res.status).toBe(204);
    const [prefix, payload] = warn.mock.calls[0];
    expect(prefix).toBe("[CSP-VIOLATION]");
    const logged = JSON.parse(payload);
    expect(logged.blocked_uri).toBe("https://evil.example/x.js");
    // The query string is always stripped before logging.
    expect(logged.document_uri).toBe("https://example.com/fr");
  });

  it("classe disposition=report en report-only (sans ?ro=1)", async () => {
    await post([reportingApiEntry({
      blockedURL: "eval",
      effectiveDirective: "require-trusted-types-for",
      documentURL: "https://example.com/fr",
      disposition: "report",
    })]);
    expect(warn.mock.calls[0][0]).toBe("[CSPO-VIOLATION]");
  });
});
