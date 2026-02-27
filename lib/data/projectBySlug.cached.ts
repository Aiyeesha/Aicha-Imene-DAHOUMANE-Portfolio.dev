import { cacheGetOrSet } from "@/lib/cache";
import { getPublishedProjectBySlugWithAssets } from "@/lib/data/projectBySlug";

// On déduit le type réel depuis la fonction source (toujours synchro)
type ProjectWithAssets = Awaited<ReturnType<typeof getPublishedProjectBySlugWithAssets>>;

export async function getPublishedProjectBySlugWithAssetsCached(
  locale: string,
  slug: string
) {
  const key = `project:${locale}:${slug}`;
  const ttl = 300; // 5 minutes

  return cacheGetOrSet<ProjectWithAssets | null>(key, ttl, async () => {
    return getPublishedProjectBySlugWithAssets(locale, slug);
  });
}