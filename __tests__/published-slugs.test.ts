// __tests__/published-slugs.test.ts
// The slug lists read by proxy.ts must match the published content exactly:
// a missing slug would answer 404 for a real page, an extra one would let an
// unknown URL reach the empty error shell again.

import { PUBLISHED_BLOG_SLUGS, PUBLISHED_PROJECT_SLUGS } from "@/lib/data/publishedSlugs";
import { allPublished } from "@/lib/data/projectsSource";
import { readAllPosts } from "@/content/blog/fs";

describe("lib/data/publishedSlugs.ts à jour", () => {
  for (const locale of ["fr", "en", "es"] as const) {
    it(`projets publiés (${locale})`, () => {
      expect([...PUBLISHED_PROJECT_SLUGS].sort()).toEqual(allPublished(locale).map((p) => p.slug).sort());
    });
    it(`articles publiés (${locale})`, () => {
      expect([...PUBLISHED_BLOG_SLUGS].sort()).toEqual(readAllPosts(locale).map((p) => p.slug).sort());
    });
  }
});
