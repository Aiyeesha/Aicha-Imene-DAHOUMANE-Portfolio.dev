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
      featured, sort_order, status, gallery, updated_at,
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

  // En CI ou si Supabase est indisponible, retourner un tableau vide plutôt que de
  // crasher la page entière. Une erreur fatale ici entraîne une page d'erreur Next.js
  // sans root layout, ce qui déclenche des violations axe (html-has-lang) dans les E2E.
  if (error) {
    console.error("[projects] Supabase error:", error.message ?? error);
    return [];
  }

  return (data ?? []).map((p: any) => ({
    ...p,
    repo_url: p.repo_url || GITHUB_REPOS[p.slug] || null,
    project_assets: (p.project_assets ?? []).sort(
      (a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    ),
  }));
}

// Requête légère pour la navbar — uniquement slug/title/track des projets featured.
// Appelée dans le layout (serveur) pour passer les données au composant Navbar (client).
export async function getFeaturedProjectsForNav(locale: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select("slug, title, track")
      .in("locale", [locale, "multi"])
      .eq("status", "published")
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(6);
    if (error) {
      console.error("[projects/nav] Supabase error:", error.message);
      return [] as { slug: string; title: string; track: string | null }[];
    }
    return (data ?? []) as { slug: string; title: string; track: string | null }[];
  } catch {
    return [] as { slug: string; title: string; track: string | null }[];
  }
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