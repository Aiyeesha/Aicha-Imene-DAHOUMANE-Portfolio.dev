// e2e/navigation.spec.ts
// ----------------------
// E2E tests: basic navigation

import { test, expect } from "@playwright/test";

test.describe("Navigation de base", () => {
  test("la page d'accueil charge et affiche le hero", async ({ page }) => {
    await page.goto("/en");

    // Page title
    await expect(page).toHaveTitle(/Salesforce|Developer|Consultant/i);

    // An h1 is present in the hero
    const h1 = page.getByRole("heading", { level: 1 }).first();
    await expect(h1).toBeVisible();
  });

  test("le changement de langue EN → FR redirige", async ({ page }) => {
    await page.goto("/en");

    // The FR link in the LocaleSwitcher points to /fr
    const frLink = page.locator('a[href="/fr"]').first();
    await expect(frLink).toBeVisible();
    await frLink.click();

    await expect(page).toHaveURL(/\/fr/);
  });

  test("le changement de langue FR → EN redirige", async ({ page }) => {
    await page.goto("/fr");

    // The EN link points to /en
    const enLink = page.locator('a[href="/en"]').first();
    await expect(enLink).toBeVisible();
    await enLink.click();

    await expect(page).toHaveURL(/\/en/);
  });

  test("la page About est accessible via URL directe", async ({ page }) => {
    // The Navbar has a custom handler: test the route directly
    await page.goto("/en/about");
    await expect(page).toHaveURL(/\/en\/about/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("un lien vers About est présent sur la page d'accueil", async ({ page }) => {
    await page.goto("/en");
    // A /en/about link exists somewhere in the DOM (desktop or mobile nav)
    const aboutLink = page.locator('a[href="/en/about"]').first();
    await expect(aboutLink).toBeAttached();
  });

  test("la page Blog est accessible via URL directe", async ({ page }) => {
    // Blog is not in the desktop nav (mobile only): check the route
    await page.goto("/en/blog");
    await expect(page).toHaveURL(/\/en\/blog/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("la page d'accueil FR charge correctement", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    // HTML lang attribute in French
    await expect(page.locator("html")).toHaveAttribute("lang", /fr/);
  });

  // /projects reachable from the primary navigation
  test("un lien vers /projects est présent dans le desktop nav (hors home)", async ({ page }) => {
    await page.goto("/en/about");
    // On a non-home page, Projects must be a page link (/en/projects)
    const projectsLink = page.locator('a[href="/en/projects"]').first();
    await expect(projectsLink).toBeAttached();
  });

  test("la page Projects est accessible via URL directe", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page).toHaveURL(/\/en\/projects/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  // Regression: on a direct visit (typed URL, shared link, reload), several
  // pages stayed stuck on the app/[locale]/loading.tsx skeleton; the content
  // was streamed but never applied. Production builds only (next build &&
  // next start), never next dev, hence every affected route is covered.
  test("Certifications et Resources sont accessibles via URL directe, avec contenu réel", async ({ page }) => {
    await page.goto("/en/certifications");
    await expect(page).toHaveURL(/\/en\/certifications/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.locator("main")).not.toBeEmpty();

    await page.goto("/en/resources");
    await expect(page).toHaveURL(/\/en\/resources/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.locator("main")).not.toBeEmpty();
  });

  // Regression: #desktop-nav (overflow-x-auto, hidden scrollbar) could overflow
  // silently around xl=1280px, hiding the last items with no visible hint.
  // This does not assume an overflow in every CI environment: it checks that
  // IF it overflows, the scroll affordance exists, and that the rightmost link
  // (Contact) is actually reachable in the viewport, not just in the DOM.
  test("le nav desktop reste utilisable à 1280px — le lien Contact reste atteignable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/en");

    const nav = page.locator("#desktop-nav");
    await expect(nav).toBeVisible();

    const contactLink = page.locator('#desktop-nav a[data-section="contact"]');
    await expect(contactLink).toBeAttached();

    const [scrollWidth, clientWidth] = await Promise.all([
      nav.evaluate((el) => el.scrollWidth),
      nav.evaluate((el) => el.clientWidth),
    ]);

    if (scrollWidth > clientWidth + 4) {
      const rightChevron = page.getByRole("button", { name: /scroll menu right/i });
      await expect(rightChevron).toBeVisible();
      await rightChevron.click();
    }

    await contactLink.scrollIntoViewIfNeeded();
    await expect(contactLink).toBeInViewport();
  });

  // From another page, "Contact" / "Hire me" must land on the contact
  // section (dynamic sections mount after the scroll) and keep the hash.
  for (const width of [1440, 390]) {
    test(`l'ancre #contact atterrit sur le formulaire (accès direct, ${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en/about");
      await page.goto("/en#contact");
      await page.waitForLoadState("networkidle");
      // Let lib/anchorScroll.ts settle (600ms stabilisation).
      await page.waitForTimeout(1500);

      await expect(page.locator("#contact h2")).toBeInViewport();
      expect(new URL(page.url()).hash).toBe("#contact");
      // Focus follows the anchor: tabbing continues from the reached section.
      await expect(page.locator("#contact")).toBeFocused();
    });
  }
});
