// __tests__/home-featured.test.ts
// The home page shows three projects per track (content/homeFeatured.ts):
// every slug must be published and featured (toFeaturedProjectCards keeps
// only featured projects), and every card needs a result line in fr/en/es.

import { HOME_FEATURED } from "@/content/homeFeatured";
import { allPublished } from "@/lib/data/projectsSource";

describe("Projets phares de l'accueil", () => {
  for (const [track, entries] of Object.entries(HOME_FEATURED)) {
    it(`${track} : trois projets publiés, mis en avant, avec un résultat dans chaque langue`, () => {
      expect(entries).toHaveLength(3);
      for (const locale of ["fr", "en", "es"] as const) {
        const published = new Map(allPublished(locale).map((p) => [p.slug, p]));
        for (const e of entries) {
          const p = published.get(e.slug);
          expect(p).toBeDefined();
          expect(p?.featured).toBe(true);
          expect(e.result[locale].trim().length).toBeGreaterThan(10);
          expect(e.result[locale]).toMatch(/\d/); // a quantified result
        }
      }
    });
  }
});
