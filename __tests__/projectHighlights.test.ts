// __tests__/projectHighlights.test.ts
// Les puces FR et ES des cartes projet (content/projectHighlights.ts) doivent
// suivre la version anglaise : même nombre, même ordre, pour chaque projet
// publié qui a des puces ; et la page FR doit bien afficher la traduction.

import { projects } from "@/content/projects";
import { PROJECT_HIGHLIGHTS } from "@/content/projectHighlights";
import { oneBySlug } from "@/lib/data/projectsSource";

const published = projects.filter((p) => p.status === "published" && (p.highlights ?? []).length > 0);

describe("puces des cartes projet traduites", () => {
  it.each(published.map((p) => [p.slug, p.highlights ?? []] as const))(
    "%s : autant de puces en FR et en ES qu'en anglais",
    (slug, en) => {
      const tr = PROJECT_HIGHLIGHTS[slug];
      expect(tr).toBeDefined();
      expect(tr.fr).toHaveLength(en.length);
      expect(tr.es).toHaveLength(en.length);
    },
  );

  it("sert la traduction selon la locale et l'anglais par défaut", () => {
    const slug = "fasha-apex-backend-optimization";
    expect(oneBySlug("fr", slug)?.highlights?.[0]).toBe(PROJECT_HIGHLIGHTS[slug].fr[0]);
    expect(oneBySlug("es", slug)?.highlights?.[0]).toBe(PROJECT_HIGHLIGHTS[slug].es[0]);
    expect(oneBySlug("en", slug)?.highlights?.[0]).toBe(projects.find((p) => p.slug === slug)?.highlights?.[0]);
  });
});
