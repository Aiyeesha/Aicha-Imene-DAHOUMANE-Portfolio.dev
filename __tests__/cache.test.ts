// __tests__/cache.test.ts
// cacheGetOrSet (lib/cache.ts): a hit is served from Redis, a miss is fetched
// and stored, and a null result is returned without being stored (an invented
// project URL must not create a Redis key on every request).

const mockGet = jest.fn();
const mockSet = jest.fn();

jest.mock("@/lib/redis", () => ({
  redis: { get: (...a: unknown[]) => mockGet(...a), set: (...a: unknown[]) => mockSet(...a) },
}));
jest.mock("next/navigation", () => ({ unstable_rethrow: jest.fn() }));

import { cacheGetOrSet } from "@/lib/cache";

beforeEach(() => {
  mockGet.mockReset();
  mockSet.mockReset().mockResolvedValue("OK");
});

describe("cacheGetOrSet", () => {
  it("serves a cached value without calling the fetcher", async () => {
    mockGet.mockResolvedValue({ a: 1 });
    const fetcher = jest.fn();
    await expect(cacheGetOrSet("k", 60, fetcher)).resolves.toEqual({ a: 1 });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("stores a fresh non-null value on a miss", async () => {
    mockGet.mockResolvedValue(null);
    await expect(cacheGetOrSet("k", 60, async () => ({ b: 2 }))).resolves.toEqual({ b: 2 });
    expect(mockSet).toHaveBeenCalledWith("k", { b: 2 }, { ex: 60 });
  });

  it("returns null without storing it", async () => {
    mockGet.mockResolvedValue(null);
    await expect(cacheGetOrSet("k", 60, async () => null)).resolves.toBeNull();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it("falls back to the fetcher when Redis fails", async () => {
    mockGet.mockRejectedValue(new Error("WRONGPASS"));
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    await expect(cacheGetOrSet("k", 60, async () => "direct")).resolves.toBe("direct");
    warn.mockRestore();
  });
});
