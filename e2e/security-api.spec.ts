// e2e/security-api.spec.ts
// ------------------------
// E2E: /api/contact security invariants:
//   1. Origin guard: a POST with a foreign Origin gets 403 (production only).
//   2. Honeypot: a POST with `company` filled gets a silent 200.
// The origin guard test is skipped outside CI, as the guard is only active in
// production (NODE_ENV=production + NEXT_PUBLIC_SITE_URL set).

import { test, expect } from "@playwright/test";

test.describe("API security — /api/contact", () => {
  test("POST with foreign Origin → 403 forbidden_origin (production only)", async ({ request }) => {
    // The guard needs NODE_ENV=production. CI runs the production server
    // (npm run start after a build); locally (npm run dev) it is inactive.
    test.skip(!process.env.CI, "origin guard only enforced in production builds");

    const response = await request.post("/api/contact", {
      headers: {
        "Content-Type": "application/json",
        Origin: "https://evil.example.com",
      },
      data: {
        name: "Attacker",
        email: "evil@example.com",
        message: "This should be blocked by origin guard",
        acceptedPolicy: true,
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.error).toBe("forbidden_origin");
  });

  test("POST with honeypot field filled → silent 200 ok:true", async ({ request }) => {
    // `company` is an invisible honeypot field; when filled the route returns
    // { ok: true } without processing (a bot lure).
    const response = await request.post("/api/contact", {
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      data: {
        name: "Bot",
        email: "bot@example.com",
        message: "Automated spam message filling all fields",
        company: "honeypot-should-be-empty",
        acceptedPolicy: true,
      },
    });

    // Silent rejection: no 400 or revealing error message
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });
});
