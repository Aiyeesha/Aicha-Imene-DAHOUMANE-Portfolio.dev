/**
 * @jest-environment node
 */
// __tests__/proxy-track-link.test.ts
// ?track=itops / ?track=salesforce: shareable link to a profile. The proxy
// sets the `track` cookie and redirects to the same URL without the parameter.

jest.mock("next-intl/middleware", () => () => () => {
  const { NextResponse } = jest.requireActual("next/server");
  return NextResponse.next();
});
jest.mock("@/lib/ratelimit", () => ({
  adminRatelimit: { getRemaining: jest.fn(), limit: jest.fn() },
  pseudonymizeKey: async (ip: string) => `h:${ip}`,
}));

import { proxy } from "@/proxy";
import { NextRequest } from "next/server";

const run = (url: string) => proxy(new NextRequest(url));

describe("proxy — lien de profil partageable (?track=)", () => {
  it("pose le cookie IT Ops et redirige vers l'URL sans paramètre", async () => {
    const res = await run("https://example.test/fr/projects?tab=security&track=itops");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://example.test/fr/projects?tab=security");
    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toMatch(/^track=itops;/);
    expect(cookie).toMatch(/Path=\//);
    expect(cookie).toMatch(/Max-Age=31536000/);
    expect(cookie).toMatch(/SameSite=lax/i);
    expect(cookie).toMatch(/Secure/);
  });

  it("accepte aussi salesforce", async () => {
    const res = await run("https://example.test/en?track=salesforce");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://example.test/en");
    expect(res.headers.get("set-cookie")).toMatch(/^track=salesforce;/);
  });

  it("ignore une valeur inconnue : redirection sans cookie", async () => {
    const res = await run("https://example.test/es?track=<script>");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://example.test/es");
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("ne touche pas aux pages sans paramètre", async () => {
    const res = await run("https://example.test/fr/about");
    expect(res.status).toBe(200);
    expect(res.headers.get("set-cookie")).toBeNull();
  });
});
