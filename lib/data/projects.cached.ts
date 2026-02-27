import { cacheGetOrSet } from "@/lib/cache";
import { getPublishedProjectsWithAssets } from "@/lib/data/projects";

// On déduit le type réel depuis la fonction source (toujours synchro)
type ProjectsWithAssets = Awaited<ReturnType<typeof getPublishedProjectsWithAssets>>;

export async function getPublishedProjectsWithAssetsCached(locale: string) {
  const key = `projects_with_assets:${locale}`;
  const ttl = 300; // 5 minutes

  return cacheGetOrSet<ProjectsWithAssets>(key, ttl, async () => {
    return getPublishedProjectsWithAssets(locale);
  });
}