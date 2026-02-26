import { cacheGetOrSet } from "@/lib/cache";
import { getPublishedProjectsWithAssets } from "@/lib/data/projects";
import type { ProjectWithAssets } from "@/lib/data/projects";

export async function getPublishedProjectsWithAssetsCached(locale: string) {
  const key = `projects_with_assets:${locale}`;
  const ttl = 300; // 5 minutes

  return cacheGetOrSet<ProjectWithAssets[]>(key, ttl, async () => {
    return getPublishedProjectsWithAssets(locale);
  });
}
