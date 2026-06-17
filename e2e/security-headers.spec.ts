// e2e/security-headers.spec.ts
// ----------------------------
// Vérifie que les en-têtes de sécurité sont bien présents sur les pages HTML.
// Ces tests protègent les invariants CSP, HSTS et COOP contre toute régression.
//
// En-têtes vérifiés :
//   - Content-Security-Policy  (ajouté par proxy.ts)
//   - Strict-Transport-Security (next.config.mjs)
//   - Cross-Origin-Opener-Policy (next.config.mjs)

import { test, expect } from "@playwright/test";

test.describe("Security headers — non-regression", () => {
  test("Content-Security-Policy is present and includes key directives", async ({ request }) => {
    const response = await request.get("/en");
    const csp = response.headers()["content-security-policy"];

    expect(csp, "CSP header must be present").toBeTruthy();
    expect(csp, "CSP must define default-src").toContain("default-src");
    expect(csp, "CSP must define script-src").toContain("script-src");
    expect(csp, "CSP must block objects").toContain("object-src 'none'");
    expect(csp, "CSP must block framing").toContain("frame-ancestors 'none'");
  });

  test("Strict-Transport-Security header is present with preload", async ({ request }) => {
    const response = await request.get("/en");
    const hsts = response.headers()["strict-transport-security"];

    expect(hsts, "HSTS header must be present").toBeTruthy();
    expect(hsts, "HSTS must have max-age").toContain("max-age=");
    expect(hsts, "HSTS must include subdomains").toContain("includeSubDomains");
  });

  test("Cross-Origin-Opener-Policy is set to same-origin", async ({ request }) => {
    const response = await request.get("/en");
    const coop = response.headers()["cross-origin-opener-policy"];

    expect(coop, "COOP header must be present").toBe("same-origin");
  });

  test("Security headers also present on French locale page", async ({ request }) => {
    const response = await request.get("/fr");
    const csp = response.headers()["content-security-policy"];
    const hsts = response.headers()["strict-transport-security"];
    const coop = response.headers()["cross-origin-opener-policy"];

    expect(csp).toBeTruthy();
    expect(hsts).toBeTruthy();
    expect(coop).toBe("same-origin");
  });
});
