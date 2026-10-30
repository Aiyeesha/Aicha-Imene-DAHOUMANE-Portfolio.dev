/**
 * @jest-environment node
 */
// __tests__/api-feed-errors.test.ts
// /feed/{tag}: a literal "%" never crashes (was 500), unknown tags answer 404.
// /api/errors: server-side size limits match the client's.

jest.mock("@/lib/ratelimit", () => ({
  errorRatelimit: {},
  safeLimit: async () => ({ success: true, reset: Date.now() }),
}));
jest.mock("@/lib/logger", () => ({ log: { error: jest.fn() } }));

import { GET as feed } from "@/app/feed/[tag]/route";
import { POST as reportError } from "@/app/api/errors/route";
import { NextRequest } from "next/server";

const getFeed = (tag: string, locale = "") =>
  feed(new NextRequest(`http://localhost/feed/x${locale}`), { params: Promise.resolve({ tag }) });

describe("GET /feed/[tag]", () => {
  it("sert le flux d'un tag existant (insensible à la casse)", async () => {
    const res = await getFeed("salesforce");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/rss+xml");
  });

  it("décode un tag encodé une seule fois (IT%20Ops)", async () => {
    expect((await getFeed("IT%20Ops")).status).toBe(200);
    expect((await getFeed("IT Ops")).status).toBe(200);
  });

  it("répond 404 pour un tag inventé ou un « % » littéral, sans erreur 500", async () => {
    expect((await getFeed("tag-invente-xyz")).status).toBe(404);
    expect((await getFeed("%")).status).toBe(404);
  });
});

describe("POST /api/errors", () => {
  const post = (body: unknown) =>
    reportError(new NextRequest("http://localhost/api/errors", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }));
  const base = { type: "uncaught", message: "boom" };

  it("accepte un rapport dans les limites du client", async () => {
    expect((await post({ ...base, stack: "s".repeat(1500), url: "u".repeat(300), line: 1 })).status).toBe(202);
  });

  it("refuse une pile ou une URL trop longue", async () => {
    expect((await post({ ...base, stack: "s".repeat(1501) })).status).toBe(400);
    expect((await post({ ...base, url: "u".repeat(301) })).status).toBe(400);
  });
});
