// sitemap.ts
// ----------
// Sitemap dynamique — inclut toutes les pages indexables dans les deux langues.
// Chaque entrée bilingue expose ses alternates hreflang (EN / FR / x-default)
// pour que Google indexe correctement les deux versions linguistiques.
//
// Pages statiques : accueil, about, certifications, blog, tags, resources, uses,
//                   work-with-me, colophon, changelog, legal, privacy, accessibility
// Pages dynamiques : articles de blog (MDX) + pages projets (Supabase)
//
// Mettre à jour NEXT_PUBLIC_SITE_LASTMOD (format ISO 8601) après chaque déploiement majeur.

import type { MetadataRoute } from "next";
import { readAllPosts } from "@/content/blog/fs";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";

// Rendu à la requête — le sitemap appelle Supabase (getPublishedProjectsWithAssetsCached)
// qui ne doit pas être appelé au build time (credentials absentes en CI pour les PRs Dependabot).
export const dynamic = "force-dynamic";

const STATIC_LAST_MODIFIED = new Date(process.env.NEXT_PUBLIC_SITE_LASTMOD ?? "2026-02-04");

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Génère une paire d'entrées sitemap (EN + FR) avec les balises hreflang correctes.
 * x-default pointe toujours vers la version EN (langue par défaut du site).
 *
 * @param base     - URL de base (ex : "https://example.com")
 * @param path     - Chemin sans locale (ex : "/about" ou "" pour la home)
 * @param opts     - priority, changeFrequency, lastModified
 */
function biEntry(
  base: string,
  path: string,
  opts: {
    priority: number;
    changeFrequency?: SitemapEntry["changeFrequency"];
    lastModified?: Date;
  }
): SitemapEntry[] {
  const {
    priority,
    changeFrequency = "monthly",
    lastModified = STATIC_LAST_MODIFIED,
  } = opts;

  const languages: Record<string, string> = {
    "x-default": `${base}/en${path}`,
    en: `${base}/en${path}`,
    fr: `${base}/fr${path}`,
  };

  return (["en", "fr"] as const).map((locale) => ({
    url: `${base}/${locale}${path}`,
    lastModified,
    priority,
    changeFrequency,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pages: MetadataRoute.Sitemap = [
    // ── Pages principales ────────────────────────────────────────────────────
    ...biEntry(base, "", { priority: 1.0, changeFrequency: "weekly" }),
    ...biEntry(base, "/about", { priority: 0.9, changeFrequency: "monthly" }),
    ...biEntry(base, "/certifications", { priority: 0.8, changeFrequency: "monthly" }),

    // ── Blog ─────────────────────────────────────────────────────────────────
    ...biEntry(base, "/blog", { priority: 0.8, changeFrequency: "weekly" }),
    ...biEntry(base, "/blog/tags", { priority: 0.5, changeFrequency: "weekly" }),

    // ── Contenu statique ─────────────────────────────────────────────────────
    ...biEntry(base, "/resources", { priority: 0.6, changeFrequency: "monthly" }),
    ...biEntry(base, "/uses", { priority: 0.4, changeFrequency: "monthly" }),
    ...biEntry(base, "/colophon", { priority: 0.3, changeFrequency: "yearly" }),
    ...biEntry(base, "/changelog", { priority: 0.4, changeFrequency: "monthly" }),

    // ── Freelance ─────────────────────────────────────────────────────────────
    ...biEntry(base, "/work-with-me", { priority: 0.7, changeFrequency: "monthly" }),

    // ── Pages légales (faible priorité SEO, peu de changements) ──────────────
    ...biEntry(base, "/legal", { priority: 0.2, changeFrequency: "yearly" }),
    ...biEntry(base, "/privacy", { priority: 0.2, changeFrequency: "yearly" }),
    ...biEntry(base, "/accessibility", { priority: 0.2, changeFrequency: "yearly" }),
  ];

  // ── Projets depuis Supabase ───────────────────────────────────────────────
  // Récupère EN + FR pour savoir quels slugs existent dans chaque locale.
  // Un projet locale="multi" apparaît dans les deux ; locale="en" uniquement en EN.
  // biEntry crée des URLs EN+FR — on le restreint aux slugs qui ont une version FR.
  const [enProjects, frProjects] = await Promise.all([
    getPublishedProjectsWithAssetsCached("en"),
    getPublishedProjectsWithAssetsCached("fr"),
  ]);
  const enSlugs = [...new Set(enProjects.map((p) => p.slug))];
  const frSlugSetProjects = new Set(frProjects.map((p) => p.slug));

  for (const slug of enSlugs) {
    const hasFr = frSlugSetProjects.has(slug);

    const projectLanguages: Record<string, string> = {
      "x-default": `${base}/en/projects/${slug}`,
      en: `${base}/en/projects/${slug}`,
    };
    if (hasFr) {
      projectLanguages.fr = `${base}/fr/projects/${slug}`;
    }

    // Entrée EN — toujours présente
    pages.push({
      url: `${base}/en/projects/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      alternates: { languages: projectLanguages },
    });

    // Entrée FR — uniquement si le projet est disponible en FR
    if (hasFr) {
      pages.push({
        url: `${base}/fr/projects/${slug}`,
        priority: 0.7,
        changeFrequency: "monthly",
        alternates: { languages: projectLanguages },
      });
    }
  }

  // ── Articles de blog MDX ──────────────────────────────────────────────────
  // Les articles FR sont un sous-ensemble des articles EN.
  // On génère une entrée par locale existante, avec hreflang conditionnels.
  const enPosts = readAllPosts("en");
  const frPosts = readAllPosts("fr");
  const frSlugSet = new Set(frPosts.map((p) => p.slug));

  for (const post of enPosts) {
    const hasFr = frSlugSet.has(post.slug);
    const lastModified = new Date(post.date);

    const languages: Record<string, string> = {
      "x-default": `${base}/en/blog/${post.slug}`,
      en: `${base}/en/blog/${post.slug}`,
    };
    if (hasFr) {
      languages.fr = `${base}/fr/blog/${post.slug}`;
    }

    // Entrée EN — toujours présente
    pages.push({
      url: `${base}/en/blog/${post.slug}`,
      lastModified,
      priority: 0.7,
      changeFrequency: "yearly",
      alternates: { languages },
    });

    // Entrée FR — uniquement si la traduction existe
    if (hasFr) {
      pages.push({
        url: `${base}/fr/blog/${post.slug}`,
        lastModified,
        priority: 0.7,
        changeFrequency: "yearly",
        alternates: { languages },
      });
    }
  }

  return pages;
}
