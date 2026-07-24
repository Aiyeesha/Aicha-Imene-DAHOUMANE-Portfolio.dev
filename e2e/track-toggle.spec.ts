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

    // Naviguer vers /en (pas reload) — Firefox se bloque sur reload quand l'URL a un fragment (#skills)
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("button", { name: /switch to salesforce/i })
    ).toBeVisible({ timeout: 15000 });
  });

  // Régression : au 2e clic consécutif du toggle, le H1/sous-titre du hero restait
  // figé sur le track précédent (AnimatePresence mode="wait" ne signalait pas
  // toujours la fin de son animation de sortie — React 19 + framer-motion 12).
  // localStorage/CTA/lien CV se mettaient à jour correctement, ce qui masquait le
  // bug si on ne vérifie que l'état, jamais le texte réellement affiché.
  test("le H1 reflète le track actif même après plusieurs clics consécutifs", async ({
    page,
  }) => {
    await page.goto("/en");
    const h1 = page.getByRole("heading", { level: 1 });

    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await expect(h1).toContainText(/IT Ops|Infrastructure/i);

    // 2e clic — celui qui reproduisait le gel
    await page.getByRole("button", { name: /switch to salesforce/i }).click();
    await expect(h1).toContainText(/Salesforce/i);

    // 3e clic — retour, pour confirmer que ce n'est pas un cas isolé
    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await expect(h1).toContainText(/IT Ops|Infrastructure/i);
  });
});
