// e2e/mobile-overflow.spec.ts
// ---------------------------
// Tests E2E — Absence de débordement horizontal sur mobile (390 px)
//
// Régression couverte — audit 2026-10-23 (P2) : à 390 px de large, plusieurs
// pages défilaient horizontalement (FR, EN et ES) :
//   - /projects : barre d'onglets « Tous / Salesforce / IT Ops / … » (588-640 px) ;
//   - /about    : tooltips invisibles de la grille de compétences et badge de
//                 période de la frise de carrière (403-420 px) ;
//   - fiches projet MDX : `<code>` en ligne longs (438 px).
// Critère : document.documentElement.scrollWidth <= clientWidth sur chaque route.

import { test, expect } from "@playwright/test";

// Largeur cible : iPhone 12/13/14 (390 × 844), la plus courante en France.
const MOBILE_VIEWPORT = { width: 390, height: 844 };

const LOCALES = ["fr", "en", "es"] as const;

// Routes listées par l'audit (chemin relatif à /{locale}).
const ROUTES = [
  "",
  "/about",
  "/projects",
  "/projects/idemconnect-apex-backend",
  "/blog",
  "/blog/apex-integration-patterns",
  "/certifications",
  "/hybride",
  "/work-with-me",
  "/resources",
  "/uses",
  "/colophon",
  "/status",
  "/legal",
  "/privacy",
  "/accessibility",
];

test.describe("Mobile 390 px — aucun débordement horizontal", () => {
  test.use({ viewport: MOBILE_VIEWPORT });

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      const path = `/${locale}${route}`;

      test(`${path} ne défile pas horizontalement`, async ({ page }) => {
        await page.goto(path, { waitUntil: "domcontentloaded" });

        // Fait défiler toute la page : de nombreux blocs n'apparaissent
        // (Reveal, useInView) qu'une fois dans le viewport. Un débordement
        // causé par un bloc encore non révélé passerait sinon inaperçu.
        await page.evaluate(async () => {
          const step = Math.round(window.innerHeight * 0.8);
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 80));
          }
          window.scrollTo(0, 0);
        });
        // Laisse se terminer les animations d'apparition (translations x/y).
        await page.waitForTimeout(600);

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          scrollWidth,
          `${path} : largeur de défilement ${scrollWidth}px > ${clientWidth}px`
        ).toBeLessThanOrEqual(clientWidth);
      });
    }
  }
});
