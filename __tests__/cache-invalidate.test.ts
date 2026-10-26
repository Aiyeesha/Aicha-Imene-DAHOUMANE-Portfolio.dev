/**
 * @jest-environment node
 */
// __tests__/cache-invalidate.test.ts
// Unit tests: POST /api/cache/invalidate. Covers invalid locale, invalid slug,
// empty body (full flush through SCAN), the nominal case, and the guards
// (invalid JSON, slug without locale, unknown key, body size, secret).
// Node environment: next/server needs Node's Web Fetch globals.

jest.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-real-ip": "1.2.3.4" }),
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

jest.mock("@/lib/ratelimit", () => ({
  cacheInvalidateRatelimit: {},
  safeLimit: async () => ({ success: true, reset: Date.now() + 60_000 }),
}));

// Mock Redis client: del records keys, scan returns two pages to check the
// iteration follows the cursor until "0".
const mockDel = jest.fn(async (..._keys: string[]) => _keys.length);
const mockScan = jest.fn();
const mockKeys = jest.fn();
jest.mock("@/lib/redis", () => ({
  redis: {
    del: (...keys: string[]) => mockDel(...keys),
    scan: (...args: unknown[]) => mockScan(...args),
    keys: (...args: unknown[]) => mockKeys(...args),
  },
}));

import { POST } from "@/app/api/cache/invalidate/route";

const SECRET = "test-cache-secret";

function makeRequest(body: string | undefined, extraHeaders: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/cache/invalidate", {
    method: "POST",
    headers: { "content-type": "application/json", "x-cache-secret": SECRET, ...extraHeaders },
    body,
  });
}

describe("POST /api/cache/invalidate", () => {
  beforeEach(() => {
    process.env.CACHE_INVALIDATE_SECRET = SECRET;
    mockDel.mockClear();
    mockKeys.mockClear();
    mockScan.mockReset();
    mockScan
      .mockResolvedValueOnce(["42", ["project:fr:a", "project:en:b"]])
      .mockResolvedValueOnce(["0", ["project:es:c", "project:fr:a"]]);
  });

  afterAll(() => {
    delete process.env.CACHE_INVALIDATE_SECRET;
  });

  it("refuse un secret invalide (401) sans toucher au cache", async () => {
    const res = await POST(makeRequest("{}", { "x-cache-secret": "wrong" }));
    expect(res.status).toBe(401);
    expect(mockDel).not.toHaveBeenCalled();
  });

  it("cas nominal : locale + slug → liste et fiche du projet uniquement", async () => {
    const res = await POST(makeRequest(JSON.stringify({ locale: "fr", slug: "idemconnect-apex-backend" })));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.deleted).toEqual(["projects_with_assets:fr", "project:fr:idemconnect-apex-backend"]);
    expect(mockScan).not.toHaveBeenCalled();
  });

  it("locale seule → clés de cette locale", async () => {
    const res = await POST(makeRequest(JSON.stringify({ locale: "es" })));
    expect(res.status).toBe(200);
    expect((await res.json()).deleted).toEqual([
      "projects_with_assets:es",
      "about:es",
      "certifications:es",
    ]);
  });

  it("locale invalide → 400", async () => {
    const res = await POST(makeRequest(JSON.stringify({ locale: "de" })));
    expect(res.status).toBe(400);
    expect(mockDel).not.toHaveBeenCalled();
  });

  it.each([
    ["traversée", "../secret"],
    ["joker Redis", "*"],
    ["injection de clé", "a:b"],
    ["majuscules", "My-Project"],
    ["retour à la ligne", "a\nb"],
    ["type non chaîne", 42],
  ])("slug invalide (%s) → 400", async (_label, slug) => {
    const res = await POST(makeRequest(JSON.stringify({ locale: "fr", slug })));
    expect(res.status).toBe(400);
    expect(mockDel).not.toHaveBeenCalled();
  });

  it("slug sans locale → 400 (et non plus un vidage complet)", async () => {
    const res = await POST(makeRequest(JSON.stringify({ slug: "idemconnect-apex-backend" })));
    expect(res.status).toBe(400);
    expect(mockDel).not.toHaveBeenCalled();
  });

  it("clé inconnue → 400", async () => {
    const res = await POST(makeRequest(JSON.stringify({ locale: "fr", pattern: "*" })));
    expect(res.status).toBe(400);
  });

  it("JSON invalide → 400 (et non plus un vidage complet)", async () => {
    const res = await POST(makeRequest("{not json"));
    expect(res.status).toBe(400);
    expect(mockDel).not.toHaveBeenCalled();
  });

  it("corps trop volumineux → 413", async () => {
    const big = JSON.stringify({ locale: "fr", padding: "x".repeat(2000) });
    const res = await POST(makeRequest(big));
    expect(res.status).toBe(413);
    expect(mockDel).not.toHaveBeenCalled();
  });

  it.each([
    ["corps vide", undefined],
    ["objet vide", "{}"],
  ])("%s → vidage complet, clés projet via SCAN (jamais KEYS)", async (_label, body) => {
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);

    // SCAN follows the cursor: 2 calls ("0" then "42"), pattern project:*.
    expect(mockScan).toHaveBeenCalledTimes(2);
    expect(mockScan.mock.calls[0][0]).toBe("0");
    expect(mockScan.mock.calls[1][0]).toBe("42");
    expect(mockScan.mock.calls[0][1]).toMatchObject({ match: "project:*" });
    expect(mockKeys).not.toHaveBeenCalled();

    const { deleted } = await res.json();
    expect(deleted).toEqual(expect.arrayContaining(["about:es", "portfolio:uptime:latest"]));
    // Project keys deduplicated (project:fr:a returned twice by SCAN).
    const projectKeys = deleted.filter((k: string) => k.startsWith("project:"));
    expect(projectKeys.sort()).toEqual(["project:en:b", "project:es:c", "project:fr:a"]);
  });
});
