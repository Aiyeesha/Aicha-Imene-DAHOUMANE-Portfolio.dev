import type { MetadataRoute } from "next";
import { readAllPosts } from "@/content/blog/fs";
import { getPublishedProjectsWithAssetsCached } from "@/lib/data/projects.cached";

const STATIC_LAST_MODIFIED = new Date(process.env.NEXT_PUBLIC_SITE_LASTMOD ?? "2026-02-04");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/en`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/fr`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/en/blog`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/fr/blog`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/en/blog/tags`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/fr/blog/tags`, lastModified: STATIC_LAST_MODIFIED }
  ];

  // Fetch slugs once from Supabase (EN locale covers all slugs since every project has an EN row)
  const enProjects = await getPublishedProjectsWithAssetsCached("en");
  const slugs = [...new Set(enProjects.map((p) => p.slug))];

  for (const locale of ["en", "fr"] as const) {
    const posts = readAllPosts(locale);
    for (const p of posts) {
      pages.push({
        url: `${base}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.date)
      });
    }

    // Project detail pages
    for (const slug of slugs) {
      pages.push({
        url: `${base}/${locale}/projects/${slug}`,
        lastModified: STATIC_LAST_MODIFIED
      });
    }
  }

  return pages;
}
