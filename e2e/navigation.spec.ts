// e2e/navigation.spec.ts
// ----------------------
// Tests E2E — Navigation de base

import { test, expect } from "@playwright/test";

test.describe("Navigation de base", () => {
  test("la page d'accueil charge et affiche le hero", async ({ page }) => {
    await page.goto("/en");

    // Titre de la page — "Salesforce Developer & Consultant"
    await expect(page).toHaveTitle(/Salesforce|Developer|Consultant/i);

    // Un h1 est présent dans le hero
    const h1 = page.getByRole("heading", { level: 1 }).first();
    await expect(h1).toBeVisible();
  });

  test("le changement de langue EN → FR redirige", async ({ page }) => {
    await page.goto("/en");

    // Le lien FR dans le LocaleSwitcher pointe vers /fr
    const frLink = page.locator('a[href="/fr"]').first();
    await expect(frLink).toBeVisible();
    await frLink.click();

    await expect(page).toHaveURL(/\/fr/);
  });

  test("le changement de langue FR → EN redirige", async ({ page }) => {
    await page.goto("/fr");

    // Le lien EN pointe vers /en
    const enLink = page.locator('a[href="/en"]').first();
    await expect(enLink).toBeVisible();
    await enLink.click();

    await expect(page).toHaveURL(/\/en/);
  });

  test("la page About est accessible via URL directe", async ({ page }) => {
    // La Navbar a un handler custom — on teste la route directement
    await page.goto("/en/about");
    await expect(page).toHaveURL(/\/en\/about/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("un lien vers About est présent sur la page d'accueil", async ({ page }) => {
    await page.goto("/en");
    // Le lien /en/about existe quelque part dans le DOM (nav desktop ou mobile)
    const aboutLink = page.locator('a[href="/en/about"]').first();
    await expect(aboutLink).toBeAttached();
  });

  test("la page Blog est accessible via URL directe", async ({ page }) => {
    // Blog n'est pas dans le desktop nav (mobile only) — on vérifie la route
    await page.goto("/en/blog");
    await expect(page).toHaveURL(/\/en\/blog/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("la page d'accueil FR charge correctement", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    // Balise lang HTML en français
    await expect(page.locator("html")).toHaveAttribute("lang", /fr/);
  });

  // UX-01 : /projects accessible depuis la navigation primaire
  test("un lien vers /projects est présent dans le desktop nav (hors home)", async ({ page }) => {
    await page.goto("/en/about");
    // Sur une page non-home, Projects doit apparaître comme lien de page (/en/projects)
    const projectsLink = page.locator('a[href="/en/projects"]').first();
    await expect(projectsLink).toBeAttached();
  });

  test("la page Projects est accessible via URL directe", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page).toHaveURL(/\/en\/projects/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  // Régression : About/Certifications/Resources/Projects/Blog restaient bloqués
  // indéfiniment sur le squelette de app/[locale]/loading.tsx en navigation directe
  // (URL tapée, lien partagé, reload) — le contenu réel était bien streamé par le
  // serveur mais jamais appliqué au DOM côté client. Reproductible uniquement en
  // build de production (`next build && next start`), jamais en `next dev` — d'où
  // l'ajout explicite ici plutôt que de se fier au seul test "About" déjà présent
  // ci-dessus, qui ne suffisait pas à couvrir les autres routes touchées.
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

  // Régression — audit 2026-08-13 : #desktop-nav (overflow-x-auto, scrollbar
  // masquée) débordait silencieusement autour du seuil xl=1280px. Mesuré en
  // conditions réelles : ~1011px de contenu pour ~512px de large sur un des
  // viewports testés — Services/Projects/Blog/Contact hors
  // champ sans scrollbar visible, sans dégradé, et la molette verticale ne
  // redirigeait pas vers le scroll horizontal du conteneur. Ce test ne suppose
  // pas qu'un débordement se produit à 1280px dans tous les environnements CI —
  // il vérifie que SI ça déborde, l'affordance de scroll existe, et que dans
  // tous les cas le lien le plus à droite (Contact, depuis le retrait du lien
  // autonome « Cluster Sécurité » le 2026-10-22) est réellement atteignable
  // dans le viewport, pas juste présent dans le DOM.
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

  // Audit 2026-10-25, constat 3 : depuis une autre page, « Contact » / « Me
  // recruter » atterrissaient dans la section Projets (sections dynamiques
  // montées après le défilement) et useHashSync réécrivait le hash en #projects.
  for (const width of [1440, 390]) {
    test(`l'ancre #contact atterrit sur le formulaire (accès direct, ${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en/about");
      await page.goto("/en#contact");
      await page.waitForLoadState("networkidle");
      // Laisse lib/anchorScroll.ts conclure (stabilisation 600 ms).
      await page.waitForTimeout(1500);

      await expect(page.locator("#contact h2")).toBeInViewport();
      expect(new URL(page.url()).hash).toBe("#contact");
      // Le focus suit l'ancre : la tabulation repart de la section atteinte.
      await expect(page.locator("#contact")).toBeFocused();
    });
  }
});
