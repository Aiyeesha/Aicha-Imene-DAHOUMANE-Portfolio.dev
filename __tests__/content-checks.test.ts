/**
 * @jest-environment node
 */
// __tests__/content-checks.test.ts
// Consistency checks on content/ that replaced the Supabase queries of the
// health checks and of /admin (lib/contentChecks.ts).

import {
  SAAS_EMBARGO_SLUGS,
  featuredWithoutContent,
  isLanguageNeutral,
  localeParityGaps,
  saasEmbargoViolations,
  projectTranslationGaps,
  securityProjectCount,
} from "@/lib/contentChecks";
import { allPublished } from "@/lib/data/projectsSource";

describe("lib/contentChecks", () => {
  it("ne signale aucun projet mis en avant sans étude de cas (contenu actuel)", () => {
    expect(featuredWithoutContent()).toEqual([]);
  });

  it("signale un projet mis en avant sans sections quand son MDX est introuvable", () => {
    const featuredWithMdxOnly = allPublished("en").filter((p) => p.featured && (p.sections?.length ?? 0) === 0);
    // Without any MDX file on disk, these projects would be reported in every locale.
    const gaps = featuredWithoutContent(() => false);
    for (const p of featuredWithMdxOnly) {
      expect(gaps).toContainEqual({ slug: p.slug, locale: "en" });
    }
  });

  it("garde au moins un projet du cluster Sécurité", () => {
    expect(securityProjectCount()).toBeGreaterThan(0);
  });

  it("respecte l'embargo des SaaS jusqu'en 2027", () => {
    expect(saasEmbargoViolations(new Date("2026-10-31T00:00:00Z"))).toEqual([]);
    expect(SAAS_EMBARGO_SLUGS.length).toBeGreaterThan(0);
  });

  it("publie chaque projet dans les trois langues", () => {
    expect(localeParityGaps()).toEqual([]);
  });

  it("ne signale pas une liste d'outils identique dans toutes les langues", () => {
    expect(isLanguageNeutral("Datto RMM · Splashtop · MalwareBytes")).toBe(true);
    expect(isLanguageNeutral("Supervision of a client fleet")).toBe(false);
    expect(projectTranslationGaps().filter((g) => g.slug === "it-ops-rmm-supervision")).toEqual([]);
  });

  it("décrit chaque écart de traduction par slug, langue, champ et cause", () => {
    for (const gap of projectTranslationGaps()) {
      expect(["fr", "es"]).toContain(gap.locale);
      expect(["title", "heroSubtitle"]).toContain(gap.field);
      expect(["missing", "matches_en"]).toContain(gap.reason);
    }
  });
});
