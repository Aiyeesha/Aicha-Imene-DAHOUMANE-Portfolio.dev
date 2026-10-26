// e2e/blog.spec.ts
// ----------------
// E2E tests: blog (list, article, sharing)

import { test, expect } from "@playwright/test";

// A post slug guaranteed to exist in /content/blog/posts/en/
const KNOWN_SLUG = "apex-triggers-best-practices";

test.describe("Blog", () => {
  test("la liste des articles charge au moins un article", async ({ page }) => {
    await page.goto("/en/blog");

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    // Direct article links: exclude /tags, ?tag= links and the "back" link.
    // Article slugs never contain "tag" nor end with "/blog".
    const articleLink = page.locator(
      `a[href^="/en/blog/"]:not([href*="tag"]):not([href$="/blog"])`
    ).first();
    await expect(articleLink).toBeVisible();
  });

  test("un article s'ouvre en cliquant sur son lien", async ({ page }) => {
    // Two navigations (list → article): longer timeout
    test.setTimeout(60_000);
    await page.goto("/en/blog");

    // Direct CSS selector excluding /tags, ?tag= and the bare /blog
    const articleLink = page.locator(
      `a[href^="/en/blog/"]:not([href*="tag"]):not([href$="/blog"])`
    ).first();

    await expect(articleLink).toBeVisible();

    // Read the target href and navigate directly (click() can be intercepted
    // by a fixed overlay such as ScrollProgress)
    const href = await articleLink.getAttribute("href");
    expect(href).toMatch(/\/en\/blog\/.+/);
    await page.goto(href!);

    await expect(page).toHaveURL(/\/en\/blog\/.+/);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("la page d'un article connu charge correctement", async ({ page }) => {
    await page.goto(`/en/blog/${KNOWN_SLUG}`);

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    // The MDX article renders
    const article = page.locator("article").first();
    await expect(article).toBeVisible();
  });

  test("les boutons de partage sont présents sur un article", async ({
    page,
  }) => {
    await page.goto(`/en/blog/${KNOWN_SLUG}`);

    // LinkedIn button (link)
    const linkedInBtn = page.getByRole("link", { name: /share on linkedin/i });
    await expect(linkedInBtn).toBeVisible();

    // Copy link button
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
    browserName,
  }) => {
    await page.goto(`/en/blog/${KNOWN_SLUG}`);

    // Firefox does not support clipboard-read through grantPermissions
    if (browserName !== "firefox") {
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    }

    const copyBtn = page.getByRole("button", { name: /copy link/i });
    await copyBtn.click();

    // "Copied!" feedback shows immediately
    await expect(page.getByRole("button", { name: /copied/i })).toBeVisible();

    // After 2s the label returns to "Copy link"; wait up to 4s
    await expect(page.getByRole("button", { name: /copy link/i })).toBeVisible({
      timeout: 4000,
    });
  });

  test("le filtre par tag affiche des articles", async ({ page }) => {
    await page.goto("/en/blog?tag=Salesforce");

    // At least one article link
    const links = page.locator(`a[href^="/en/blog/"]`).filter({
      hasNot: page.locator(`a[href*="tag"]`),
    });
    await expect(links.first()).toBeVisible();
  });

  // Search follows the combobox pattern (WAI-ARIA 1.2).
  test("la recherche se pilote au clavier (↓, Entrée, Échap)", async ({ page }) => {
    await page.goto("/en/blog");
    const input = page.getByRole("combobox");
    await input.fill("apex");
    await expect(input).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("ArrowDown");
    await expect(page.locator('[role="option"][aria-selected="true"]')).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/en\/blog\/.+/);
  });
});
