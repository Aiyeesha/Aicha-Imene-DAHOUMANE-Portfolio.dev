// e2e/track-toggle.spec.ts
// ------------------------
// E2E tests: track switch (Salesforce / IT Ops)

import { test, expect, type Page } from "@playwright/test";

// Load the page and wait for React hydration before any click: otherwise a
// click can hit the server HTML before onClick handlers are attached and be
// lost (~1 run in 100 in CI). <html data-track> is only set by a Providers
// effect (app/[locale]/providers.tsx), i.e. after hydration: a reliable
// signal without changing the app.
async function gotoHydrated(page: Page, path: string) {
  await page.goto(path);
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute("data-track")
  );
}

test.describe("Track toggle", () => {
  test("le groupe de bascule est visible", async ({ page }) => {
    await gotoHydrated(page, "/en");
    const trackGroup = page.getByRole("group", { name: /choose a track/i });
    await expect(trackGroup).toBeVisible();
  });

  test("le bouton IT Ops est cliquable et change l'état actif", async ({
    page,
  }) => {
    await gotoHydrated(page, "/en");
    const itOpsBtn = page.getByRole("button", { name: /switch to it ops/i });
    await itOpsBtn.click();

    // After the click the Salesforce button shows (IT Ops is active)
    await expect(
      page.getByRole("button", { name: /switch to salesforce/i })
    ).toBeVisible();
  });

  test("le bouton Salesforce est cliquable et change l'état actif", async ({
    page,
  }) => {
    await gotoHydrated(page, "/en");

    // Switch to IT Ops, then back to Salesforce
    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await page.getByRole("button", { name: /switch to salesforce/i }).click();

    // Back on Salesforce: the IT Ops button shows again
    await expect(
      page.getByRole("button", { name: /switch to it ops/i })
    ).toBeVisible();
  });

  test("le track est persisté dans le localStorage", async ({ page }) => {
    await gotoHydrated(page, "/en");

    await page.getByRole("button", { name: /switch to it ops/i }).click();

    // Wait until localStorage is actually updated
    await page.waitForFunction(
      () => window.localStorage.getItem("track") !== null
    );

    const storedTrack = await page.evaluate(() =>
      localStorage.getItem("track")
    );
    expect(storedTrack).toBe("itops");

    // Navigate to /en (not reload): Firefox hangs on reload when the URL has a fragment (#skills)
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("button", { name: /switch to salesforce/i })
    ).toBeVisible({ timeout: 15000 });
  });

  // Regression: on the second consecutive toggle, the hero H1/subtitle stayed
  // on the previous track (AnimatePresence never signalled its exit with React
  // 19 + framer-motion 12) while state, CTA and CV link updated, so the
  // displayed text itself is checked.
  test("le H1 reflète le track actif même après plusieurs clics consécutifs", async ({
    page,
  }) => {
    await gotoHydrated(page, "/en");
    const h1 = page.getByRole("heading", { level: 1 });
    // The H1 is shared by both tracks; only the subtitle
    // (messages/en.json, hero.subtitle_*) tells them apart.
    const itopsTitle = /From workstations and servers/i;
    const salesforceTitle = /From the CRM to the servers/i;

    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await expect(h1).toContainText(itopsTitle);
    await expect(h1).not.toContainText(salesforceTitle);

    // Second click: the one that used to freeze
    await page.getByRole("button", { name: /switch to salesforce/i }).click();
    await expect(h1).toContainText(salesforceTitle);
    await expect(h1).not.toContainText(itopsTitle);

    // Third click, back again, to rule out a one-off
    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await expect(h1).toContainText(itopsTitle);
    await expect(h1).not.toContainText(salesforceTitle);
  });
  // Regression: the toggle replaced the tab title of ANY page with the home
  // page's. Only the home page title depends on the track
  // (app/[locale]/providers.tsx).
  for (const path of ["/en/about", "/en/projects", "/en/projects/idemconnect-apex-backend"]) {
    test(`la bascule ne modifie pas le titre de l'onglet sur ${path}`, async ({
      page,
    }) => {
      await gotoHydrated(page, path);
      const initialTitle = await page.title();

      await page.getByRole("button", { name: /switch to it ops/i }).first().click();
      // The opposite button showing proves the switch happened.
      await expect(
        page.getByRole("button", { name: /switch to salesforce/i }).first()
      ).toBeVisible();
      await expect(page).toHaveTitle(initialTitle);

      await page.getByRole("button", { name: /switch to salesforce/i }).first().click();
      await expect(
        page.getByRole("button", { name: /switch to it ops/i }).first()
      ).toBeVisible();
      await expect(page).toHaveTitle(initialTitle);
    });
  }

  test("sur l'accueil, le titre de l'onglet suit le parcours actif", async ({
    page,
  }) => {
    await gotoHydrated(page, "/en");
    const salesforceTitle = await page.title();

    await page.getByRole("button", { name: /switch to it ops/i }).first().click();
    await expect(page).not.toHaveTitle(salesforceTitle);

    await page.getByRole("button", { name: /switch to salesforce/i }).first().click();
    await expect(page).toHaveTitle(salesforceTitle);
  });
});
