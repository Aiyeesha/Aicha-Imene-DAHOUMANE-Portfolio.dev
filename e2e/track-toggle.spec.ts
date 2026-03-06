// e2e/track-toggle.spec.ts
// ------------------------
// Tests E2E — Bascule de parcours (Salesforce / IT Ops)

import { test, expect } from "@playwright/test";

test.describe("Track toggle", () => {
  test("le groupe de bascule est visible", async ({ page }) => {
    await page.goto("/en");
    const trackGroup = page.getByRole("group", { name: /choose a track/i });
    await expect(trackGroup).toBeVisible();
  });

  test("le bouton IT Ops est cliquable et change l'état actif", async ({
    page,
  }) => {
    await page.goto("/en");
    const itOpsBtn = page.getByRole("button", { name: /switch to it ops/i });
    await itOpsBtn.click();

    // Après le clic, le bouton Salesforce devient visible (IT Ops est actif)
    await expect(
      page.getByRole("button", { name: /switch to salesforce/i })
    ).toBeVisible();
  });

  test("le bouton Salesforce est cliquable et change l'état actif", async ({
    page,
  }) => {
    await page.goto("/en");

    // Passer en IT Ops, puis revenir en Salesforce
    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await page.getByRole("button", { name: /switch to salesforce/i }).click();

    // De retour en Salesforce : bouton IT Ops visible à nouveau
    await expect(
      page.getByRole("button", { name: /switch to it ops/i })
    ).toBeVisible();
  });

  test("le track est persisté dans le localStorage", async ({ page }) => {
    await page.goto("/en");

    await page.getByRole("button", { name: /switch to it ops/i }).click();

    // Attendre que localStorage soit effectivement mis à jour
    await page.waitForFunction(
      () => window.localStorage.getItem("track") !== null
    );

    const storedTrack = await page.evaluate(() =>
      localStorage.getItem("track")
    );
    expect(storedTrack).toBe("itops");

    // Recharger la page — le track doit être restauré
    await page.reload();
    await expect(
      page.getByRole("button", { name: /switch to salesforce/i })
    ).toBeVisible();
  });
});
