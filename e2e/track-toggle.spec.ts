// e2e/track-toggle.spec.ts
// ------------------------
// Tests E2E — Bascule de parcours (Salesforce / IT Ops)

import { test, expect, type Page } from "@playwright/test";

// Charge la page puis attend la fin de l'hydratation React avant tout clic.
// Sans cette attente, un clic peut arriver sur le HTML rendu côté serveur
// avant que les gestionnaires onClick soient attachés : il est alors perdu et
// le test échoue sans défaut réel (~1 exécution sur 100 en CI). L'attribut
// data-track de <html> n'est posé que par un useEffect de Providers
// (app/[locale]/providers.tsx), donc après l'hydratation : c'est un signal
// fiable, sans rien ajouter au code de l'application.
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

    // Après le clic, le bouton Salesforce devient visible (IT Ops est actif)
    await expect(
      page.getByRole("button", { name: /switch to salesforce/i })
    ).toBeVisible();
  });

  test("le bouton Salesforce est cliquable et change l'état actif", async ({
    page,
  }) => {
    await gotoHydrated(page, "/en");

    // Passer en IT Ops, puis revenir en Salesforce
    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await page.getByRole("button", { name: /switch to salesforce/i }).click();

    // De retour en Salesforce : bouton IT Ops visible à nouveau
    await expect(
      page.getByRole("button", { name: /switch to it ops/i })
    ).toBeVisible();
  });

  test("le track est persisté dans le localStorage", async ({ page }) => {
    await gotoHydrated(page, "/en");

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
    await gotoHydrated(page, "/en");
    const h1 = page.getByRole("heading", { level: 1 });
    // Depuis le 01/10/2026, le titre du H1 est commun aux deux tracks
    // (« Salesforce & Infrastructure Developer ») : seul le sous-titre
    // (messages/en.json, hero.subtitle_*) distingue les deux états.
    const itopsTitle = /From workstations and servers/i;
    const salesforceTitle = /From the CRM to the servers/i;

    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await expect(h1).toContainText(itopsTitle);
    await expect(h1).not.toContainText(salesforceTitle);

    // 2e clic — celui qui reproduisait le gel
    await page.getByRole("button", { name: /switch to salesforce/i }).click();
    await expect(h1).toContainText(salesforceTitle);
    await expect(h1).not.toContainText(itopsTitle);

    // 3e clic — retour, pour confirmer que ce n'est pas un cas isolé
    await page.getByRole("button", { name: /switch to it ops/i }).click();
    await expect(h1).toContainText(itopsTitle);
    await expect(h1).not.toContainText(salesforceTitle);
  });
});
