// sitemap.ts
// ----------
// Dynamic sitemap of every indexable page in the three locales, each entry
// with hreflang alternates (EN / FR / ES / x-default).
//
// Static pages: home, about, certifications, blog, tags, uses, hybride,
//               work-with-me, legal, privacy, accessibility
//               (/colophon is noindex; /resources redirects to /uses)
// Dynamic pages: blog posts (MDX) and project pages.
//
// NEXT_PUBLIC_SITE_LASTMOD (optional) pins the date; otherwise the build date
// (SITE_BUILD_DATE, next.config.mjs) is used.

import type { MetadataRoute } from "next";
import { readAllPosts } from "@/content/blog/fs";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";
import { getSiteUrl } from "@/lib/siteUrl";

// Rendered per request: the project data source must not be called at build
// time (credentials are missing in CI for Dependabot PRs).
export const dynamic = "force-dynamic";

// Build date, frozen into the bundle by next.config.mjs, so static pages'
// lastmod does not change on every serverless cold start. `new Date()` is only
// a fallback (Jest, tools outside the Next build).
const STATIC_LAST_MODIFIED = process.env.NEXT_PUBLIC_SITE_LASTMOD
  ? new Date(process.env.NEXT_PUBLIC_SITE_LASTMOD)
  : process.env.SITE_BUILD_DATE
  ? new Date(process.env.SITE_BUILD_DATE)
  : new Date();

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Sitemap entries for one path in every locale, with hreflang alternates.
 * x-default points to the EN version (the default locale).
 *
 * @param base - base URL (e.g. "https://example.com")
 * @param path - path without locale (e.g. "/about", or "" for the home page)
 * @param opts - priority, changeFrequency, lastModified
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
    // ── Main pages ───────────────────────────────────────────────────────────
    ...biEntry(base, "", { priority: 1.0, changeFrequency: "weekly" }),
    ...biEntry(base, "/about", { priority: 0.9, changeFrequency: "monthly" }),
    ...biEntry(base, "/certifications", { priority: 0.8, changeFrequency: "monthly" }),

    // ── Blog ─────────────────────────────────────────────────────────────────
    ...biEntry(base, "/blog", { priority: 0.8, changeFrequency: "weekly" }),
    ...biEntry(base, "/blog/tags", { priority: 0.5, changeFrequency: "weekly" }),

    // ── Static content ───────────────────────────────────────────────────────
    ...biEntry(base, "/uses", { priority: 0.6, changeFrequency: "monthly" }),

    // ── Project gallery ──────────────────────────────────────────────────────
    ...biEntry(base, "/projects", { priority: 0.8, changeFrequency: "monthly" }),

    // ── Positioning & hiring ─────────────────────────────────────────────────
    ...biEntry(base, "/hybride", { priority: 0.8, changeFrequency: "monthly" }),
    ...biEntry(base, "/work-with-me", { priority: 0.7, changeFrequency: "monthly" }),

    // ── Legal pages (low priority, rarely change) ────────────────────────────
    ...biEntry(base, "/legal", { priority: 0.2, changeFrequency: "yearly" }),
    ...biEntry(base, "/privacy", { priority: 0.2, changeFrequency: "yearly" }),
    ...biEntry(base, "/accessibility", { priority: 0.2, changeFrequency: "yearly" }),
  ];

  // ── Projects ──────────────────────────────────────────────────────────────
  // Fetch every locale to know which slugs exist where: a "multi" project is
  // in all locales, an "en" one only in English.
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

    // EN entry, always present
    pages.push({
      url: `${base}/en/projects/${slug}`,
      lastModified: projectLastMod,
      priority: 0.7,
      changeFrequency: "monthly",
      alternates: { languages: projectLanguages },
    });

    // FR entry, only if the project exists in French
    if (hasFr) {
      pages.push({
        url: `${base}/fr/projects/${slug}`,
        lastModified: projectLastMod,
        priority: 0.7,
        changeFrequency: "monthly",
        alternates: { languages: projectLanguages },
      });
    }

    // ES entry, only if the project exists in Spanish
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

  // ── MDX blog posts ────────────────────────────────────────────────────────
  // Translations are a subset of the EN posts: one entry per existing locale,
  // with conditional hreflang.
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

    // EN entry, always present
    pages.push({
      url: `${base}/en/blog/${post.slug}`,
      lastModified,
      priority: 0.7,
      changeFrequency: "yearly",
      alternates: { languages },
    });

    // FR entry, only if the translation exists
    if (hasFr) {
      pages.push({
        url: `${base}/fr/blog/${post.slug}`,
        lastModified,
        priority: 0.7,
        changeFrequency: "yearly",
        alternates: { languages },
      });
    }

    // ES entry, only if the translation exists
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
