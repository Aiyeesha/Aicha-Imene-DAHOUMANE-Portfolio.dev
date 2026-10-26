// e2e/a11y-keyboard.spec.ts
// -------------------------
// E2E: keyboard interactions and modal.
//   - The "Projects" dropdown (role="menu", portalled) follows the WAI-ARIA
//     menu button pattern: ↓ opens and focuses the first entry, ↑/↓/Home/End
//     move focus, Escape closes and returns focus to the button.
//   - The availability modal locks background scrolling and restores it on
//     close.

import { test, expect, type Page } from "@playwright/test";

// Wait for hydration (data-track is set by a Providers effect) before any
// interaction, as in track-toggle.spec.ts.
async function gotoHydrated(page: Page, path: string) {
  await page.goto(path);
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-track"));
}

// Text of the focused element (menu entry or button).
const focusedText = (page: Page) =>
  page.evaluate(() => (document.activeElement as HTMLElement | null)?.textContent?.trim() ?? "");

test.describe("A11Y-7 — menu Projets au clavier", () => {
  // Desktop navigation: the dropdown only exists from the xl breakpoint.
  test.use({ viewport: { width: 1440, height: 900 } });

  test("↓ ouvre le menu et parcourt les entrées ; Échap rend le focus au bouton", async ({ page }) => {
    // Inner page: the desktop nav shows the Projects menu there.
    await gotoHydrated(page, "/en/about");

    const trigger = page.locator('#desktop-nav button[data-section="projects"]');
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    await trigger.focus();

    // ↓: opens and focuses the first entry
    await page.keyboard.press("ArrowDown");
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const items = menu.getByRole("menuitem");
    const count = await items.count();
    expect(count).toBeGreaterThan(1);
    await expect(items.first()).toBeFocused();

    // ↓: next entry
    await page.keyboard.press("ArrowDown");
    await expect(items.nth(1)).toBeFocused();

    // End / Home
    await page.keyboard.press("End");
    await expect(items.last()).toBeFocused();
    await page.keyboard.press("Home");
    await expect(items.first()).toBeFocused();

    // ↑ from the first entry wraps to the last
    await page.keyboard.press("ArrowUp");
    await expect(items.last()).toBeFocused();

    // Escape: closes, focus back on the button
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
    // Original value restored, focus back on the badge.
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(before);
    await expect(badge).toBeFocused();
  });
});

test.describe("Audit 2026-10-25 — focus au chargement et palette sans clavier", () => {
  // Below xl: the nav shrinks to the menu button; the palette button shows.
  test.use({ viewport: { width: 1024, height: 800 } });

  test("constat 6 : le focus n'est pas placé sur le bouton du menu au chargement", async ({ page }) => {
    await gotoHydrated(page, "/fr");
    expect(await page.evaluate(() => document.activeElement === document.body)).toBe(true);
    // The skip link stays the first tab stop.
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toHaveAttribute("href", /#main/);
  });

  test("constat 7 : la palette s'ouvre au clic, chargée à la demande", async ({ page }) => {
    await gotoHydrated(page, "/fr/about");
    // No palette mounted before the first request.
    await expect(page.locator("[cmdk-root]")).toHaveCount(0);
    await page.getByRole("button", { name: /palette de commandes/i }).click();
    await expect(page.locator("[cmdk-root]")).toBeVisible();
  });
});
