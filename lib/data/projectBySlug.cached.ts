import { cacheGetOrSet, contentCacheKey } from "@/lib/cache";
import { getPublishedProjectBySlugWithAssets } from "@/lib/data/projectBySlug";
import { oneBySlug } from "@/lib/data/projectsSource";
import { isValidSlug } from "@/lib/security/slug";

// Real type inferred from the source function (always in sync)
type ProjectWithAssets = Awaited<ReturnType<typeof getPublishedProjectBySlugWithAssets>>;

export async function getPublishedProjectBySlugWithAssetsCached(
  locale: string,
  slug: string
) {
  // Unknown or malformed slug: answer from memory, without touching Redis
  // (no key per invented URL, no Redis quota spent by crawlers).
  if (!isValidSlug(slug) || !oneBySlug(locale, slug)) return null;

  const key = contentCacheKey(`project:${locale}:${slug}`);
  const ttl = 300; // 5 minutes

  return cacheGetOrSet<ProjectWithAssets | null>(key, ttl, async () => {
    return getPublishedProjectBySlugWithAssets(locale, slug);
  });
}