import type { MetadataRoute } from "next";
import { readAllPosts } from "@/content/blog/fs";
import { projects } from "@/content/projects";

const STATIC_LAST_MODIFIED = new Date(process.env.NEXT_PUBLIC_SITE_LASTMOD ?? "2026-02-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/en`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/fr`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/en/blog`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/fr/blog`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/en/blog/tags`, lastModified: STATIC_LAST_MODIFIED },
    { url: `${base}/fr/blog/tags`, lastModified: STATIC_LAST_MODIFIED }
  ];

  for (const locale of ["en","fr"] as const) {
    const posts = readAllPosts(locale);
    for (const p of posts) {
      pages.push({
        url: `${base}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.date)
      });
    }

    // Project detail pages
    for (const proj of projects) {
      pages.push({
        url: `${base}/${locale}/projects/${proj.slug}`,
        lastModified: STATIC_LAST_MODIFIED
      });
    }
  }

  return pages;
}
