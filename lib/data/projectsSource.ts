// lib/data/projectsSource.ts
// --------------------------
// File-based project content. Merges:
//   - content/projects.ts        (per-slug card metadata, EN title/excerpt)
//   - content/projectDetails.ts  (per-locale title / heroSubtitle / sections + gallery)
//   - content/github-repos.ts    (slug -> repo URL fallback)
//
// This replaces the former Supabase `projects` + `project_assets` read path.
// Project screenshots/covers are served from /public/projects/<slug>/.
// Deep case studies (MDX) are detected separately — see lib/data/projectMdx.ts.

import { projects as CARD_PROJECTS, type Project } from "@/content/projects";
import { projectDetails as DETAILS, type ProjectSection } from "@/content/projectDetails";
import { GITHUB_REPOS } from "@/content/github-repos";

export type ProjectLocale = "en" | "fr" | "es";

// Kept for back-compat with components/pages that still import these names.
// Assets are no longer a separate concept — galleries carry every image now.
export type ProjectAsset = {
  id: string;
  title?: string | null;
  description?: string | null;
  external_url?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  mime_type?: string | null;
  type?: string | null;
};

export type ProjectBadge = {
  label: string;
  tone: "client" | "personal" | "training" | "capstone" | "simulation" | "anonymized";
};

export type ProjectWithAssets = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  hero_subtitle?: string | null;
  sections?: ProjectSection[] | null;
  gallery?: { src: string; alt: string }[] | null;
  tech_stack?: string[] | null;
  repo_url?: string | null;
  live_url?: string | null;
  track?: string | null;
  categories?: string[] | null;
  tags?: string[] | null;
  badge?: ProjectBadge | null;
  highlights?: string[] | null;
  featured?: boolean | null;
  sort_order?: number | null;
  status?: string | null;
  is_bridge?: boolean | null;
  is_security?: boolean | null;
  updated_at?: string | null;
  /** Always empty — retained so existing consumers keep type-checking. */
  project_assets: ProjectAsset[];
};

const normLocale = (l: string): ProjectLocale =>
  l === "fr" ? "fr" : l === "es" ? "es" : "en";

const detailBySlug = new Map(DETAILS.map((d) => [d.slug, d]));

/** Resolve the best available locale block for a slug, tracking which locale won. */
function resolveLocaleBlock(slug: string, locale: ProjectLocale) {
  const locales = detailBySlug.get(slug)?.locales;
  if (!locales) return undefined;
  const order: ProjectLocale[] = [locale, "en", "fr", "es"];
  for (const loc of order) {
    const block = locales[loc];
    if (block) return { block, loc };
  }
  return undefined;
}

function merge(card: Project, requested: ProjectLocale): ProjectWithAssets {
  const detail = detailBySlug.get(card.slug);
  const resolved = resolveLocaleBlock(card.slug, requested);
  const heroSubtitle = resolved?.block.heroSubtitle ?? card.excerpt ?? null;

  return {
    id: card.slug,
    slug: card.slug,
    locale: resolved?.loc ?? requested,
    title: resolved?.block.title ?? card.title ?? card.slug,
    summary: heroSubtitle,
    content: null,
    hero_subtitle: heroSubtitle,
    sections: resolved?.block.sections ?? [],
    gallery: detail?.gallery ?? [],
    tech_stack: card.techStack ?? [],
    repo_url: card.repoUrl ?? GITHUB_REPOS[card.slug] ?? null,
    live_url: card.liveUrl ?? null,
    track: card.track ?? null,
    categories: card.categories ?? [],
    tags: card.tags ?? [],
    badge: card.badge
      ? { label: card.badge.label, tone: (card.badge.tone ?? "personal") as ProjectBadge["tone"] }
      : null,
    highlights: card.highlights ?? [],
    featured: Boolean(card.featured),
    sort_order: card.sortOrder ?? 0,
    status: card.status ?? "published",
    is_bridge: Boolean(card.isBridge),
    is_security: Boolean(card.isSecurity),
    updated_at: card.updatedAt ?? null,
    project_assets: [],
  };
}

const isPublished = (p: Project) => (p.status ?? "published") === "published";

/** All published projects for a locale, ordered featured-first then by sort_order. */
export function allPublished(locale: string): ProjectWithAssets[] {
  const loc = normLocale(locale);
  return CARD_PROJECTS.filter(isPublished)
    .map((p) => merge(p, loc))
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );
}

/** A single published project by slug, or null. */
export function oneBySlug(locale: string, slug: string): ProjectWithAssets | null {
  const card = CARD_PROJECTS.find((p) => p.slug === slug && isPublished(p));
  return card ? merge(card, normLocale(locale)) : null;
}
