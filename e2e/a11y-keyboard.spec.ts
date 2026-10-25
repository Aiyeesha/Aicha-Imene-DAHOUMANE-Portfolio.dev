// e2e/a11y-keyboard.spec.ts
// -------------------------
// Tests E2E — interactions clavier et modale (audit 2026-10-23, P4).
//
//   - A11Y-7 : le menu déroulant « Projets » (role="menu", rendu en portail)
//     se pilote au clavier selon le pattern WAI-ARIA « menu button » :
//     ↓ ouvre et place le focus sur la 1re entrée, ↑/↓/Début/Fin déplacent
//     le focus, Échap ferme et rend le focus au bouton.
//   - A11Y-6 : la modale de disponibilité bloque le défilement de
//     l'arrière-plan et le rétablit à la fermeture.

import { test, expect, type Page } from "@playwright/test";

// Attend la fin de l'hydratation (data-track posé par un useEffect de
// Providers) avant toute interaction — même technique que track-toggle.spec.ts.
async function gotoHydrated(page: Page, path: string) {
  await page.goto(path);
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-track"));
}

// Le texte de l'élément qui a le focus (entrée de menu ou bouton).
const focusedText = (page: Page) =>
  page.evaluate(() => (document.activeElement as HTMLElement | null)?.textContent?.trim() ?? "");

test.describe("A11Y-7 — menu Projets au clavier", () => {
  // Navigation desktop : le menu déroulant n'existe qu'au-delà du breakpoint xl.
  test.use({ viewport: { width: 1440, height: 900 } });

  test("↓ ouvre le menu et parcourt les entrées ; Échap rend le focus au bouton", async ({ page }) => {
    // Page interne : la navigation desktop y affiche le menu Projets.
    await gotoHydrated(page, "/en/about");

    const trigger = page.locator('#desktop-nav button[data-section="projects"]');
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await trigger.focus();

    // ↓ : ouverture + focus sur la première entrée
    await page.keyboard.press("ArrowDown");
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const items = menu.getByRole("menuitem");
    const count = await items.count();
    expect(count).toBeGreaterThan(1);
    await expect(items.first()).toBeFocused();

    // ↓ : entrée suivante
    await page.keyboard.press("ArrowDown");
    await expect(items.nth(1)).toBeFocused();

    // Fin / Début
    await page.keyboard.press("End");
    await expect(items.last()).toBeFocused();
    await page.keyboard.press("Home");
    await expect(items.first()).toBeFocused();

    // ↑ depuis la première entrée : boucle sur la dernière
    await page.keyboard.press("ArrowUp");
    await expect(items.last()).toBeFocused();

    // Échap : fermeture, focus rendu au bouton
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
    expect(await focusedText(page)).toContain("Projects");
  });

  test("Tab dans le menu le ferme et rend le focus au bouton", async ({ page }) => {
    await gotoHydrated(page, "/en/about");
    const trigger = page.locator('#desktop-nav button[data-section="projects"]');
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("menu")).toBeVisible();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("menu")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("les entrées du menu sont hors de l'ordre de tabulation (focus géré aux flèches)", async ({ page }) => {
    await gotoHydrated(page, "/en/about");
    await page.locator('#desktop-nav button[data-section="projects"]').focus();
    await page.keyboard.press("ArrowDown");
    const tabIndexes = await page
      .getByRole("menuitem")
      .evaluateAll((els) => els.map((el) => el.getAttribute("tabindex")));
    expect(tabIndexes.every((t) => t === "-1")).toBe(true);
  });
});

test.describe("A11Y-6 — modale de disponibilité", () => {
  test("bloque le défilement de l'arrière-plan pendant l'ouverture", async ({ page }) => {
    await gotoHydrated(page, "/en");

    const badge = page.getByRole("button", { name: /available from/i }).first();
    await expect(badge).toBeVisible();
    const before = await page.evaluate(() => document.body.style.overflow);

    await badge.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    // Valeur d'origine restaurée, et focus rendu au badge (comportement existant).
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(before);
    await expect(badge).toBeFocused();
  });
});
