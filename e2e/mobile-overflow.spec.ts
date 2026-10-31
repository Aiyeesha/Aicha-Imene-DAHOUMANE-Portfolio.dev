// e2e/mobile-overflow.spec.ts
// ---------------------------
// E2E: no horizontal overflow on mobile (390px), in FR, EN and ES, on pages
// that used to scroll sideways (/projects tab bar, /about tooltips and
// timeline period badge, MDX project pages with long inline <code>).
// Criterion: document.documentElement.scrollWidth <= clientWidth on every route.

import { test, expect } from "@playwright/test";

// Target width: iPhone 12/13/14 (390 × 844), the most common in France.
const MOBILE_VIEWPORT = { width: 390, height: 844 };

const LOCALES = ["fr", "en", "es"] as const;

// Routes (relative to /{locale}).
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

        // Scroll the whole page: many blocks only appear (Reveal, useInView)
        // once in the viewport, and an overflow from an unrevealed block
        // would go unnoticed.
        await page.evaluate(async () => {
          const step = Math.round(window.innerHeight * 0.8);
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 80));
          }
          window.scrollTo(0, 0);
        });
        // Let entrance animations (x/y translations) finish.
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
