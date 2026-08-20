// lib/data/projects.ts
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { withRetry, isPlaceholderSupabaseUrl } from "@/lib/supabase/withRetry";
import { GITHUB_REPOS } from "@/content/github-repos";

export async function getPublishedProjectsWithAssets(locale: string) {
  // Contre le placeholder, l'appel échouera de toute façon (voir withRetry.ts) —
  // autant ne jamais l'émettre plutôt que payer même un timeout raccourci sur
  // CHAQUE page rendue. C'est cet appel-ci, répété par page sous charge E2E
  // concurrente, qui faisait dépasser les timeouts d'assertion stricts en CI.
  if (isPlaceholderSupabaseUrl) return [];

  const supabase = createServerSupabaseClient();

  const { data, error } = await withRetry(() =>
    supabase
      .from("projects")
      .select(`
        id, slug, locale, title, summary, content, tech_stack, repo_url, live_url,
        track, categories, tags, badge, highlights,
        featured, sort_order, status, is_bridge, is_security, gallery, updated_at,
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
      .order("sort_order", { ascending: true })
  );

  // En CI ou si Supabase est indisponible, retourner un tableau vide plutôt que de
  // crasher la page entière. Une erreur fatale ici entraîne une page d'erreur Next.js
  // sans root layout, ce qui déclenche des violations axe (html-has-lang) dans les E2E.
  if (error) {
    console.error("[projects] Supabase error:", (error as any)?.message ?? error);
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
// Pas de .limit() ici : le composant Navbar filtre ensuite par track actif et
// tronque à 6 par track lui-même. Un limit(6) ici, avant tout filtrage par track,
// tronquerait la liste globalement (mélange Salesforce/IT Ops) et pourrait ne
// laisser aucun candidat pour l'un des deux tracks selon le sort_order — ~12
// projets featured au total (6 par track), le coût de tout récupérer est négligeable.
export async function getFeaturedProjectsForNav(locale: string) {
  // Appelé depuis le layout sur CHAQUE page — voir le même raisonnement dans
  // getPublishedProjectsWithAssets ci-dessus.
  if (isPlaceholderSupabaseUrl) return [] as { slug: string; title: string; track: string | null }[];

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await withRetry(() =>
      supabase
        .from("projects")
        .select("slug, title, track")
        .in("locale", [locale, "multi"])
        .eq("status", "published")
        .eq("featured", true)
        .order("sort_order", { ascending: true })
    );
    if (error) {
      console.error("[projects/nav] Supabase error:", (error as any)?.message ?? error);
      return [] as { slug: string; title: string; track: string | null }[];
    }
    return (data ?? []) as { slug: string; title: string; track: string | null }[];
  } catch {
    return [] as { slug: string; title: string; track: string | null }[];
  }
}

// Comptage léger pour le lien "Cluster Sécurité" (navbar + home) — head:true +
// count:"exact" ne transfère aucune ligne de données, juste le total. Évite de
// coder ce nombre en dur dans les traductions (voir audit du 2026-08-12 : le
// texte marketing affichait "16" alors que /projects en comptait déjà 17).
// Appel direct (pas withRetry) : ce wrapper ne propage pas `count` sur les
// requêtes head:true, et un raté ici ne fait que retomber sur 0 — pas critique
// au point de justifier des tentatives supplémentaires.
export async function getSecurityClusterCount(locale: string) {
  // Cet appel n'est pas enveloppé par withRetry (voir commentaire plus haut sur
  // ce choix) et n'a donc AUCUN plafond de timeout propre — contre le placeholder,
  // il dépend entièrement du délai réseau brut du client Supabase, qui peut largement
  // dépasser les quelques centaines de ms des autres appels de ce module. Appelé
  // depuis le layout sur chaque page, c'était le contributeur le plus probable aux
  // dépassements de timeout d'assertion en CI. Court-circuiter avant tout appel réseau.
  if (isPlaceholderSupabaseUrl) return 0;

  try {
    const supabase = createServerSupabaseClient();
    const { count, error } = await supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .in("locale", [locale, "multi"])
      .eq("status", "published")
      .eq("is_security", true);
    if (error) {
      console.error("[projects/security-count] Supabase error:", (error as any)?.message ?? error);
      return 0;
    }
    return count ?? 0;
  } catch {
    return 0;
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