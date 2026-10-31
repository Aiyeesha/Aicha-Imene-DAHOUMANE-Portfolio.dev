/**
 * @jest-environment node
 */
// __tests__/palette-index.test.ts
// ⌘K palette search index: every published project, every post of the locale
// and every certification card, with working destinations.

import fs from "node:fs";
import path from "node:path";
import { buildPaletteIndex, PALETTE_CERT_IDS } from "@/lib/search/paletteIndex";
import { allPublished } from "@/lib/data/projectsSource";
import { readAllPosts } from "@/content/blog/fs";
import { GET, generateStaticParams } from "@/app/api/palette-index/[locale]/route";

const LOCALES = ["fr", "en", "es"] as const;

describe("lib/search/paletteIndex", () => {
  it.each(LOCALES)("indexe tous les projets publiés et tous les articles (%s)", (locale) => {
    const index = buildPaletteIndex(locale);
    expect(index.projects).toHaveLength(allPublished(locale).length);
    expect(index.posts).toHaveLength(readAllPosts(locale).length);
    expect(index.certifications).toHaveLength(PALETTE_CERT_IDS.length);
    expect(index.projects.length).toBeGreaterThan(0);
    expect(index.posts.length).toBeGreaterThan(0);
  });

  it.each(LOCALES)("produit des identifiants uniques et des liens dans la langue (%s)", (locale) => {
    const all = Object.values(buildPaletteIndex(locale)).flat();
    expect(new Set(all.map((e) => e.id)).size).toBe(all.length);
    for (const entry of all) {
      expect(entry.href.startsWith(`/${locale}/`)).toBe(true);
      expect(entry.title.trim()).not.toBe("");
      expect(entry.keywords.length).toBeLessThanOrEqual(12);
    }
  });

  it("retrouve un projet par sa technologie (mots-clés)", () => {
    const { projects } = buildPaletteIndex("fr");
    const withApex = projects.filter((p) => p.keywords.some((k) => /apex/i.test(k)));
    expect(withApex.length).toBeGreaterThan(0);
  });

  it("pointe vers des ancres qui existent sur la page des certifications", () => {
    const page = fs.readFileSync(
      path.join(process.cwd(), "app/[locale]/certifications/page.tsx"),
      "utf8",
    );
    // Each card renders id={cert.id}: the ids must be those of the page data.
    expect(page).toContain("id={cert.id}");
    for (const id of PALETTE_CERT_IDS) {
      expect(page).toContain(`id: "${id}"`);
    }
  });

  it("se replie sur l'anglais pour une langue inconnue", () => {
    const index = buildPaletteIndex("de");
    expect(index.projects.every((p) => p.href.startsWith("/en/"))).toBe(true);
  });
});

describe("GET /api/palette-index/[locale]", () => {
  it("est généré pour les trois langues", () => {
    expect(generateStaticParams()).toEqual([{ locale: "en" }, { locale: "fr" }, { locale: "es" }]);
  });

  it("renvoie l'index en JSON", async () => {
    const res = await GET(new Request("http://localhost/api/palette-index/es"), {
      params: Promise.resolve({ locale: "es" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.certifications[0].href).toMatch(/^\/es\/certifications#/);
  });
});
