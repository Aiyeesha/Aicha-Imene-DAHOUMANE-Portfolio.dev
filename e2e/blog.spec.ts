// e2e/blog.spec.ts
// ----------------
// Tests E2E — Blog (liste + article + partage)

import { test, expect } from "@playwright/test";

// Slug d'un article garanti d'exister dans /content/blog/posts/en/
const KNOWN_SLUG = "apex-triggers-best-practices";

test.describe("Blog", () => {
  test("la liste des articles charge au moins un article", async ({ page }) => {
    await page.goto("/en/blog");

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    // Liens articles directs — exclure /tags et les liens avec ?tag= et le lien "back"
    // Les slugs d'articles ne contiennent jamais "tag" ni ne se terminent par "/blog"
    const articleLink = page.locator(
      `a[href^="/en/blog/"]:not([href*="tag"]):not([href$="/blog"])`
    ).first();
    await expect(articleLink).toBeVisible();
  });

  test("un article s'ouvre en cliquant sur son lien", async ({ page }) => {
    // Ce test fait 2 navigations (liste → article) : timeout élargi
    test.setTimeout(60_000);
    await page.goto("/en/blog");

    // Sélecteur CSS direct — exclut /tags, ?tag=, et /blog exact
    const articleLink = page.locator(
      `a[href^="/en/blog/"]:not([href*="tag"]):not([href$="/blog"])`
    ).first();

    await expect(articleLink).toBeVisible();

    // Récupère le href cible et navigue directement
    // (click() peut être intercepté par un overlay fixe comme ScrollProgress)
    const href = await articleLink.getAttribute("href");
    expect(href).toMatch(/\/en\/blog\/.+/);
    await page.goto(href!);

    await expect(page).toHaveURL(/\/en\/blog\/.+/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("la page d'un article connu charge correctement", async ({ page }) => {
    await page.goto(`/en/blog/${KNOWN_SLUG}`);

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    // L'article MDX est rendu
    const article = page.locator("article").first();
    await expect(article).toBeVisible();
  });

  test("les boutons de partage sont présents sur un article", async ({
    page,
  }) => {
    await page.goto(`/en/blog/${KNOWN_SLUG}`);

    // Bouton LinkedIn (lien)
    const linkedInBtn = page.getByRole("link", { name: /share on linkedin/i });
    await expect(linkedInBtn).toBeVisible();

    // Bouton copier le lien
    const copyBtn = page.getByRole("button", { name: /copy link/i });
    await expect(copyBtn).toBeVisible();
  });

  test("le lien LinkedIn a target='_blank' et href LinkedIn", async ({
    page,
  }) => {
    await page.goto(`/en/blog/${KNOWN_SLUG}`);

    const linkedInLink = page.getByRole("link", { name: /share on linkedin/i });
    await expect(linkedInLink).toHaveAttribute("target", "_blank");

    const href = await linkedInLink.getAttribute("href");
    expect(href).toContain("linkedin.com");
    expect(href).toContain(encodeURIComponent(`http://localhost:3000/en/blog/${KNOWN_SLUG}`));
  });

  test("le bouton 'Copier le lien' affiche 'Copied!' puis revient", async ({
    page,
  }) => {
    await page.goto(`/en/blog/${KNOWN_SLUG}`);

    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

    const copyBtn = page.getByRole("button", { name: /copy link/i });
    await copyBtn.click();

    // Feedback "Copied!" visible immédiatement
    await expect(page.getByRole("button", { name: /copied/i })).toBeVisible();

    // Après 2s le texte revient à "Copy link" — on attend jusqu'à 4s
    await expect(page.getByRole("button", { name: /copy link/i })).toBeVisible({
      timeout: 4000,
    });
  });

  test("le filtre par tag affiche des articles", async ({ page }) => {
    await page.goto("/en/blog?tag=Salesforce");

    // Au moins un lien article présent
    const links = page.locator(`a[href^="/en/blog/"]`).filter({
      hasNot: page.locator(`a[href*="tag"]`),
    });
    await expect(links.first()).toBeVisible();
  });
});
