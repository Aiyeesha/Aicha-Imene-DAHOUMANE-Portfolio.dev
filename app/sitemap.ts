// sitemap.ts
// ----------
// Sitemap dynamique — inclut toutes les pages indexables dans les deux langues.
// Pages statiques : accueil, about, certifications, blog, tags
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pages: MetadataRoute.Sitemap = [
    // Pages d'accueil — priorité maximale
    { url: `${base}/en`, lastModified: STATIC_LAST_MODIFIED, priority: 1.0 },
    { url: `${base}/fr`, lastModified: STATIC_LAST_MODIFIED, priority: 1.0 },

    // Page About — haute valeur SEO (positionnement professionnel)
    { url: `${base}/en/about`, lastModified: STATIC_LAST_MODIFIED, priority: 0.9 },
    { url: `${base}/fr/about`, lastModified: STATIC_LAST_MODIFIED, priority: 0.9 },

    // Page Certifications
    { url: `${base}/en/certifications`, lastModified: STATIC_LAST_MODIFIED, priority: 0.8 },
    { url: `${base}/fr/certifications`, lastModified: STATIC_LAST_MODIFIED, priority: 0.8 },

    // Blog (index + tags)
    { url: `${base}/en/blog`, lastModified: STATIC_LAST_MODIFIED, priority: 0.8 },
    { url: `${base}/fr/blog`, lastModified: STATIC_LAST_MODIFIED, priority: 0.8 },
    { url: `${base}/en/blog/tags`, lastModified: STATIC_LAST_MODIFIED, priority: 0.5 },
    { url: `${base}/fr/blog/tags`, lastModified: STATIC_LAST_MODIFIED, priority: 0.5 }
  ];

  // Slugs des projets depuis Supabase (EN couvre tous les slugs — chaque projet a une ligne EN)
  const enProjects = await getPublishedProjectsWithAssetsCached("en");
  const slugs = [...new Set(enProjects.map((p) => p.slug))];

  for (const locale of ["en", "fr"] as const) {
    // Articles de blog MDX
    const posts = readAllPosts(locale);
    for (const p of posts) {
      pages.push({
        url: `${base}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        priority: 0.7
      });
    }

    // Pages détaillées des projets (conservées dans le repo même si non visibles en production)
    for (const slug of slugs) {
      pages.push({
        url: `${base}/${locale}/projects/${slug}`,
        lastModified: STATIC_LAST_MODIFIED,
        priority: 0.7
      });
    }
  }

  return pages;
}
