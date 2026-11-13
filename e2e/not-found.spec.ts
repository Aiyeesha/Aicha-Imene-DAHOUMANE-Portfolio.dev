// e2e/not-found.spec.ts
// ---------------------
// 404 pages must be complete server-rendered HTML (readable without
// JavaScript, in the URL's language), not Next.js's empty error shell
// (<html id="__next_error__">), which a page's own notFound() produces in
// Next.js 16. Covers unknown URLs (app/not-found.tsx) and the testimonial
// page opened without an invitation (rewritten by proxy.ts to that 404).

import { test, expect } from "@playwright/test";

const TITLES = {
  fr: "Page introuvable",
  en: "Page not found",
  es: "Página no encontrada",
} as const;

test.describe("Pages 404 — HTML complet côté serveur", () => {
  for (const [locale, title] of Object.entries(TITLES)) {
    for (const path of [`/${locale}/page-inexistante`, `/${locale}/testimonial-submit`]) {
      test(`${path} : 404 localisée, lisible sans JavaScript`, async ({ request }) => {
        const res = await request.get(path);
        expect(res.status()).toBe(404);

        const html = await res.text();
        expect(html, "pas d'enveloppe d'erreur vide").not.toContain('id="__next_error__"');
        expect(html).toContain(`lang="${locale}"`);
        expect(html).toContain(`<title>${title}`);
        // The rewritten 404 keeps the per-request CSP.
        expect(res.headers()["content-security-policy"]).toContain("nonce-");
      });
    }
  }

  test("un lien d'invitation forgé reste refusé (404)", async ({ request }) => {
    const res = await request.get("/fr/testimonial-submit?invite=forged&exp=9999999999");
    expect(res.status()).toBe(404);
  });
});
