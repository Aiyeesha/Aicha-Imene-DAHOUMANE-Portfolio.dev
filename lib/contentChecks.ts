// lib/contentChecks.ts
// --------------------
// Consistency checks on the project content in content/ (the source of truth
// since the projects left Supabase). Used by the health checks (lib/health.ts,
// shown on /status) and by the /admin dashboard.
//
//   - featuredWithoutContent: a published, featured project must have a case
//     study in every locale (structured sections or an MDX file);
//   - securityProjectCount: at least one published project must keep
//     isSecurity, the flag behind the "Security" cluster links;
//   - projectTranslationGaps: FR/ES title or subtitle missing, or identical
//     to the English one (never translated).

import { allPublished, type ProjectLocale } from "@/lib/data/projectsSource";
import { projects as CARD_PROJECTS } from "@/content/projects";
import { projectDetails } from "@/content/projectDetails";
import { hasProjectMdx } from "@/lib/data/projectMdx";

const LOCALES: ProjectLocale[] = ["en", "fr", "es"];

export type ContentGap = { slug: string; locale: ProjectLocale };

export function featuredWithoutContent(hasMdx: (slug: string) => boolean = hasProjectMdx): ContentGap[] {
  const gaps: ContentGap[] = [];
  for (const locale of LOCALES) {
    for (const p of allPublished(locale)) {
      if (p.featured && (p.sections?.length ?? 0) === 0 && !hasMdx(p.slug)) {
        gaps.push({ slug: p.slug, locale });
      }
    }
  }
  return gaps;
}

export function securityProjectCount(): number {
  return allPublished("en").filter((p) => p.is_security).length;
}

export type TranslationGap = {
  slug: string;
  locale: "fr" | "es";
  field: "title" | "heroSubtitle";
  reason: "missing" | "matches_en";
};

const norm = (s: string | null | undefined) => (s ?? "").trim().toLowerCase();

/** A list of product names ("Datto RMM · Splashtop") reads the same in every language. */
export const isLanguageNeutral = (s: string | null | undefined) => (s ?? "").includes(" · ");

export function projectTranslationGaps(): TranslationGap[] {
  const details = new Map(projectDetails.map((d) => [d.slug, d.locales]));
  const gaps: TranslationGap[] = [];
  for (const card of CARD_PROJECTS) {
    if ((card.status ?? "published") !== "published") continue;
    const locales = details.get(card.slug);
    const en = locales?.en;
    for (const locale of ["fr", "es"] as const) {
      const block = locales?.[locale];
      for (const field of ["title", "heroSubtitle"] as const) {
        const value = block?.[field];
        const source = en?.[field] ?? (field === "title" ? card.title : card.excerpt);
        if (!norm(value)) gaps.push({ slug: card.slug, locale, field, reason: "missing" });
        else if (norm(source) && norm(value) === norm(source) && !isLanguageNeutral(value)) gaps.push({ slug: card.slug, locale, field, reason: "matches_en" });
      }
    }
  }
  return gaps;
}

// ── Publication rules (also run by npm run content:safety) ──────────────────

/**
 * The author's own SaaS products: never published nor given a live URL
 * before this date, whoever edits content/projects.ts. Add any future
 * product slug as soon as its first entry exists, even as a draft.
 */
export const SAAS_EMBARGO_SLUGS = ["orgdocs-saas", "sfrelease-saas"] as const;
export const SAAS_EMBARGO_UNTIL = "2027-01-01";

export type EmbargoViolation = { slug: string; status: string; liveUrl: string | null };

export function saasEmbargoViolations(now: Date = new Date()): EmbargoViolation[] {
  if (now >= new Date(SAAS_EMBARGO_UNTIL)) return [];
  return CARD_PROJECTS
    .filter((p) => (SAAS_EMBARGO_SLUGS as readonly string[]).includes(p.slug))
    .filter((p) => (p.status ?? "published") === "published" || Boolean(p.liveUrl))
    .map((p) => ({ slug: p.slug, status: p.status ?? "published", liveUrl: p.liveUrl ?? null }));
}

export type ParityGap = { slug: string; missing: ProjectLocale[] };

/** Published projects without a content block (title) in each of en/fr/es. */
export function localeParityGaps(): ParityGap[] {
  const details = new Map(projectDetails.map((d) => [d.slug, d.locales]));
  const gaps: ParityGap[] = [];
  for (const card of CARD_PROJECTS) {
    if ((card.status ?? "published") !== "published") continue;
    const locales = details.get(card.slug);
    const missing = LOCALES.filter((l) => !norm(locales?.[l]?.title));
    if (missing.length > 0) gaps.push({ slug: card.slug, missing });
  }
  return gaps;
}
