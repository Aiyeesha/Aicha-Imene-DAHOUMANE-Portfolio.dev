import { createServerSupabaseClient } from "@/lib/supabase/server";

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

export type ProjectWithAssets = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  tech_stack?: string[] | null;
  repo_url?: string | null;
  live_url?: string | null;
  featured?: boolean | null;
  sort_order?: number | null;
  status?: string | null;
  project_assets: ProjectAsset[];
};

/**
 * Fetch a single published project (with assets) by slug.
 * Strategy A: DB rows have locale = 'multi' => accept ['multi', locale].
 */
export async function getPublishedProjectBySlugWithAssets(
  locale: string,
  slug: string
): Promise<ProjectWithAssets | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      id, slug, locale, title, summary, content, tech_stack, repo_url, live_url,
      featured, sort_order, status,
      project_assets (
        id, project_id, type, visibility, title, description,
        storage_bucket, storage_path, external_url, mime_type, size_bytes, sort_order
      )
    `
    )
    .in("locale", ["multi", locale])
    .eq("status", "published")
    .eq("slug", slug)
    .limit(1);

  if (error) throw error;

  const p = data?.[0] as unknown as (ProjectWithAssets | null);
  if (!p) return null;

  const sortedAssets = (p.project_assets ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return { ...p, project_assets: sortedAssets };
}