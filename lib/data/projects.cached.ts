import { cacheGetOrSet } from "@/lib/cache";
import { getPublishedProjectsWithAssets } from "@/lib/data/projects";

// Real type inferred from the source function (always in sync)
type ProjectsWithAssets = Awaited<ReturnType<typeof getPublishedProjectsWithAssets>>;

export async function getPublishedProjectsWithAssetsCached(locale: string) {
  const key = `projects_with_assets:${locale}`;
  const ttl = 600; // 10 minutes: projects rarely change in production

  return cacheGetOrSet<ProjectsWithAssets>(key, ttl, async () => {
    return getPublishedProjectsWithAssets(locale);
  });
}