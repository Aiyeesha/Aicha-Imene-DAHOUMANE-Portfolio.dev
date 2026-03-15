// lib/data/projects.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { GITHUB_REPOS } from "@/content/github-repos";

export async function getPublishedProjectsWithAssets(locale: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id, slug, locale, title, summary, content, tech_stack, repo_url, live_url,
      track, categories, tags, badge, highlights,
      featured, sort_order, status, gallery,
      project_assets (
        id, project_id, type, visibility, title, description,
        storage_bucket, storage_path, external_url, mime_type, size_bytes, sort_order
      )
    `)
    // ✅ IMPORTANT : multi + locale demandé
    .in("locale", [locale, "multi"])
    // ✅ Ne montrer que les publiés
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((p: any) => ({
    ...p,
    repo_url: p.repo_url || GITHUB_REPOS[p.slug] || null,
    project_assets: (p.project_assets ?? []).sort(
      (a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    ),
  }));
}

export function getAssetUrl(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  asset: {
    external_url: string | null;
    storage_bucket: string | null;
    storage_path: string | null;
  }
) {
  if (asset.external_url) return asset.external_url;

  if (asset.storage_bucket && asset.storage_path) {
    const { data } = supabase.storage
      .from(asset.storage_bucket)
      .getPublicUrl(asset.storage_path);
    return data.publicUrl;
  }

  return null;
}