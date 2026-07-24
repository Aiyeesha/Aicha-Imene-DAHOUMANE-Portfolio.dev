import { createServerSupabaseClient } from "@/lib/supabase/server";
import { withRetry } from "@/lib/supabase/withRetry";
import { GITHUB_REPOS } from "@/content/github-repos";

type ProjectAsset = {
  id: string;
  project_id?: string | null;
  type?: string | null;
  visibility?: string | null;
  title?: string | null;
  description?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  external_url?: string | null;
  mime_type?: string | null;
  size_bytes?: number | null;
  sort_order?: number | null;
};

export type ProjectBadge = { label: string; tone: "client" | "personal" | "training" };

export type ProjectWithAssets = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  hero_subtitle?: string | null;
  sections?: unknown[] | null;
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
  project_assets: ProjectAsset[];
};

/**
 * Fetch a single published project (with assets) by slug.
 *
 * Each project exists as two DB rows (locale = 'fr' and locale = 'en').
 * Assets are typically attached to only one of those rows (often 'en').
 * To avoid showing "Aucun asset" on the other locale, we fetch ALL rows
 * sharing the same slug, pick the locale-matching row for text content,
 * then merge assets from every sibling row.
 */
export async function getPublishedProjectBySlugWithAssets(
  locale: string,
  slug: string
): Promise<ProjectWithAssets | null> {
  const supabase = createServerSupabaseClient();

  // Fetch every published row for this slug (all locales) so we can
  // collect assets regardless of which row they were attached to.
  const { data, error } = await withRetry(() =>
    supabase
      .from("projects")
      .select(
        `
      id, slug, locale, title, summary, content, hero_subtitle, sections, gallery,
      tech_stack, repo_url, live_url,
      track, categories, tags, badge, highlights,
      featured, sort_order, status, is_bridge, is_security,
      project_assets (
        id, project_id, type, visibility, title, description,
        storage_bucket, storage_path, external_url, mime_type, size_bytes, sort_order
      )
    `
      )
      .eq("status", "published")
      .eq("slug", slug)
  );

  if (error) throw error;
  if (!data || data.length === 0) return null;

  const rows = data as unknown as ProjectWithAssets[];

  // Prefer the row matching the requested locale, then "multi", then first row.
  const preferred =
    rows.find((r) => r.locale === locale) ??
    rows.find((r) => r.locale === "multi") ??
    rows[0];

  // Use the preferred locale's assets if it has any.
  // Only fall back to merging from sibling rows if the preferred row has none
  // (e.g. assets were only attached to the EN row while browsing in FR).
  const preferredAssets = preferred.project_assets ?? [];
  const finalAssets = preferredAssets.length > 0
    ? preferredAssets
    : rows
        .filter((r) => r.id !== preferred.id)
        .flatMap((r) => r.project_assets ?? []);

  const sortedAssets = finalAssets
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  // Gallery is slug-level (same images regardless of locale).
  // Fall back to a sibling row if the preferred row has no gallery.
  const finalGallery =
    (preferred.gallery && preferred.gallery.length > 0)
      ? preferred.gallery
      : rows.find((r) => r.id !== preferred.id && r.gallery && r.gallery.length > 0)?.gallery ?? [];

  return {
    ...preferred,
    repo_url: preferred.repo_url || GITHUB_REPOS[preferred.slug] || null,
    project_assets: sortedAssets,
    gallery: finalGallery,
  };
}