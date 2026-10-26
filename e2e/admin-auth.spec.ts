// e2e/admin-auth.spec.ts
// ----------------------
// E2E: the admin serves no content without authentication, whatever the URL
// variant.
//
// The proxy.ts matcher once skipped URLs containing a dot, so
// /admin/incidents/<x.y> (e.g. /admin/incidents/new.rsc) bypassed it and
// reached /admin/incidents/[id], which rendered the admin layout and ran its
// service_role query unauthenticated. The layout and every /admin page now
// re-check authentication (lib/security/adminAuth.ts).
//
// /admin.rsc and /admin/incidents.rsc do not serve the admin (the first is
// read as an "admin.rsc" locale, the second matches no route); they are
// still tested to make sure no admin content appears.
//
// The check is on CONTENT, not the HTTP status: a notFound() thrown in a
// nested layout is served as 200 (the root shell is already streaming) with
// NEXT_HTTP_ERROR_FALLBACK;404 in the stream.
//
// No credentials are used: only the refusal is checked.

import { test, expect } from "@playwright/test";

// Markers rendered by the admin layout: seeing them in an unauthenticated
// response would reveal a leak.
const ADMIN_MARKERS = ["Portfolio Admin", "service_role"];

const PATHS = [
  "/admin.rsc",
  "/admin/incidents.rsc",
  "/admin/incidents/new.rsc",
  "/admin/incidents/00000000-0000-0000-0000-000000000000.rsc",
  "/admin/incidents/x.json",
];

// With and without the RSC header sent by the Next.js router (Next 16 then
// redirects to ?_rsc; the redirect is followed).
const VARIANTS: { name: string; headers: Record<string, string> }[] = [
  { name: "HTML", headers: {} },
  { name: "RSC", headers: { RSC: "1" } },
];

test.describe("Admin — aucun contenu sans authentification", () => {
  for (const path of PATHS) {
    for (const variant of VARIANTS) {
      test(`GET ${path} (${variant.name}) sans Authorization ne livre pas l'admin`, async ({
        request,
      }) => {
        const response = await request.get(path, {
          headers: variant.headers,
          failOnStatusCode: false,
        });

        // Never a server error (the guard renders a 404, never a 500).
        expect(response.status(), `${path} : statut ${response.status()}`).toBeLessThan(500);

        const body = await response.text();
        for (const marker of ADMIN_MARKERS) {
          expect(body, `${path} ne doit pas contenir « ${marker} »`).not.toContain(marker);
        }
      });
    }
  }

  test("GET /admin sans Authorization → refus du middleware (401 ou 429)", async ({ request }) => {
    const response = await request.get("/admin", { failOnStatusCode: false });
    // 401 + WWW-Authenticate when Redis is available; 429 (fail closed) when
    // the rate limiter is unavailable (CI/local without Upstash).
    expect([401, 429]).toContain(response.status());
    const body = await response.text();
    for (const marker of ADMIN_MARKERS) expect(body).not.toContain(marker);
  });
});
