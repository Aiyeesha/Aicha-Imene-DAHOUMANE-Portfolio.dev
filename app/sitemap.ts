// sitemap.ts
// ----------
// Sitemap dynamique — inclut toutes les pages indexables dans les trois langues.
// Chaque entrée expose ses alternates hreflang (EN / FR / ES / x-default)
// pour que Google indexe correctement les trois versions linguistiques.
//
// Pages statiques : accueil, about, certifications, blog, tags, resources, uses,
//                   work-with-me, colophon, changelog, legal, privacy, accessibility
// Pages dynamiques : articles de blog (MDX) + pages projets (Supabase)
//
// NEXT_PUBLIC_SITE_LASTMOD (optionnel) — permet de figer la date si nécessaire.
// Si absent, la date du jour est utilisée (acceptable pour un portfolio).

import type { MetadataRoute } from "next";
import { readAllPosts } from "@/content/blog/fs";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";
import { getSiteUrl } from "@/lib/siteUrl";

// Rendu à la requête — le sitemap appelle Supabase (getPublishedProjectsWithAssetsCached)
// qui ne doit pas être appelé au build time (credentials absentes en CI pour les PRs Dependabot).
export const dynamic = "force-dynamic";

// Si NEXT_PUBLIC_SITE_LASTMOD n'est pas défini, on utilise la date du jour.
// La valeur est correcte au déploiement (Vercel injecte la variable via les Settings).
const STATIC_LAST_MODIFIED = process.env.NEXT_PUBLIC_SITE_LASTMOD
  ? new Date(process.env.NEXT_PUBLIC_SITE_LASTMOD)
  : new Date();

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
    es: `${base}/es${path}`,
  };

  return (["en", "fr", "es"] as const).map((locale) => ({
    url: `${base}/${locale}${path}`,
    lastModified,
    priority,
    changeFrequency,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

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

    // ── Galerie projets ──────────────────────────────────────────────────────
    ...biEntry(base, "/projects", { priority: 0.8, changeFrequency: "monthly" }),

    // ── Freelance ─────────────────────────────────────────────────────────────
    ...biEntry(base, "/work-with-me", { priority: 0.7, changeFrequency: "monthly" }),
    ...biEntry(base, "/contact", { priority: 0.8, changeFrequency: "monthly" }),

    // ── Pages légales (faible priorité SEO, peu de changements) ──────────────
    ...biEntry(base, "/legal", { priority: 0.2, changeFrequency: "yearly" }),
    ...biEntry(base, "/privacy", { priority: 0.2, changeFrequency: "yearly" }),
    ...biEntry(base, "/accessibility", { priority: 0.2, changeFrequency: "yearly" }),
  ];

  // ── Projets depuis Supabase ───────────────────────────────────────────────
  // Récupère EN + FR pour savoir quels slugs existent dans chaque locale.
  // Un projet locale="multi" apparaît dans les deux ; locale="en" uniquement en EN.
  // biEntry crée des URLs EN+FR — on le restreint aux slugs qui ont une version FR.
  const [enProjects, frProjects, esProjects] = await Promise.all([
    getPublishedProjectsWithAssetsCached("en"),
    getPublishedProjectsWithAssetsCached("fr"),
    getPublishedProjectsWithAssetsCached("es"),
  ]);
  const enSlugs = [...new Set(enProjects.map((p) => p.slug))];
  const frSlugSetProjects = new Set(frProjects.map((p) => p.slug));
  const esSlugSetProjects = new Set(esProjects.map((p) => p.slug));

  for (const slug of enSlugs) {
    const hasFr = frSlugSetProjects.has(slug);
    const hasEs = esSlugSetProjects.has(slug);

    const projectLanguages: Record<string, string> = {
      "x-default": `${base}/en/projects/${slug}`,
      en: `${base}/en/projects/${slug}`,
    };
    if (hasFr) {
      projectLanguages.fr = `${base}/fr/projects/${slug}`;
    }
    if (hasEs) {
      projectLanguages.es = `${base}/es/projects/${slug}`;
    }

    const enProject = enProjects.find((p) => p.slug === slug);
    const projectLastMod = enProject?.updated_at
      ? new Date(enProject.updated_at)
      : STATIC_LAST_MODIFIED;

    // Entrée EN — toujours présente
    pages.push({
      url: `${base}/en/projects/${slug}`,
      lastModified: projectLastMod,
      priority: 0.7,
      changeFrequency: "monthly",
      alternates: { languages: projectLanguages },
    });

    // Entrée FR — uniquement si le projet est disponible en FR
    if (hasFr) {
      pages.push({
        url: `${base}/fr/projects/${slug}`,
        lastModified: projectLastMod,
        priority: 0.7,
        changeFrequency: "monthly",
        alternates: { languages: projectLanguages },
      });
    }

    // Entrée ES — uniquement si le projet est disponible en ES
    if (hasEs) {
      pages.push({
        url: `${base}/es/projects/${slug}`,
        lastModified: projectLastMod,
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
  const esPosts = readAllPosts("es");
  const frSlugSet = new Set(frPosts.map((p) => p.slug));
  const esSlugSet = new Set(esPosts.map((p) => p.slug));

  for (const post of enPosts) {
    const hasFr = frSlugSet.has(post.slug);
    const hasEs = esSlugSet.has(post.slug);
    const lastModified = new Date(post.date);

    const languages: Record<string, string> = {
      "x-default": `${base}/en/blog/${post.slug}`,
      en: `${base}/en/blog/${post.slug}`,
    };
    if (hasFr) {
      languages.fr = `${base}/fr/blog/${post.slug}`;
    }
    if (hasEs) {
      languages.es = `${base}/es/blog/${post.slug}`;
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

    // Entrée ES — uniquement si la traduction existe
    if (hasEs) {
      pages.push({
        url: `${base}/es/blog/${post.slug}`,
        lastModified,
        priority: 0.7,
        changeFrequency: "yearly",
        alternates: { languages },
      });
    }
  }

  return pages;
}
