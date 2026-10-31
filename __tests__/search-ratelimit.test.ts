/**
 * @jest-environment node
 */
// __tests__/search-ratelimit.test.ts
// GET /api/search is rate limited per IP (lib/ratelimit.ts, 30 / 60s): a
// refused query answers 429 with Retry-After and no-store (never cached by
// the CDN for other visitors); queries too short to search are not counted.

const safeLimit = jest.fn();
jest.mock("@/lib/ratelimit", () => ({
  searchRatelimit: {},
  safeLimit: (...args: unknown[]) => safeLimit(...args),
}));

import { GET } from "@/app/api/search/route";
import { NextRequest } from "next/server";

const search = (q: string) =>
  GET(new NextRequest(`http://localhost/api/search?q=${encodeURIComponent(q)}&locale=en`, {
    headers: { "x-real-ip": "203.0.113.7" },
  }));

describe("GET /api/search — rate limiting", () => {
  beforeEach(() => safeLimit.mockReset());

  it("cherche normalement sous la limite, avec une clé par IP", async () => {
    safeLimit.mockResolvedValue({ success: true, reset: Date.now() + 60_000 });
    const res = await search("apex");
    expect(res.status).toBe(200);
    expect(Array.isArray((await res.json()).results)).toBe(true);
    expect(safeLimit).toHaveBeenCalledWith({}, "search:ip:203.0.113.7");
  });

  it("répond 429 avec Retry-After et no-store une fois la limite atteinte", async () => {
    safeLimit.mockResolvedValue({ success: false, reset: Date.now() + 30_000 });
    const res = await search("apex");
    expect(res.status).toBe(429);
    expect(Number(res.headers.get("retry-after"))).toBeGreaterThan(0);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ results: [], error: "rate_limited" });
  });

  it("ne décompte pas les requêtes trop courtes pour lancer une recherche", async () => {
    const res = await search("a");
    expect(res.status).toBe(200);
    expect(safeLimit).not.toHaveBeenCalled();
  });
});
