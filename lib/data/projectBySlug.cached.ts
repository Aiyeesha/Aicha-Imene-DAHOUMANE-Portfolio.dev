// lib/data/projectBySlug.cached.ts
// --------------------------------
// Kept as the single entry point used by pages. The project content is
// static TypeScript already in memory, so it is no longer copied to Upstash
// (see lib/data/projects.cached.ts).
import { getPublishedProjectBySlugWithAssets } from "@/lib/data/projectBySlug";
import { oneBySlug } from "@/lib/data/projectsSource";
import { isValidSlug } from "@/lib/security/slug";

export async function getPublishedProjectBySlugWithAssetsCached(
  locale: string,
  slug: string
) {
  // Unknown or malformed slug: answer at once.
  if (!isValidSlug(slug) || !oneBySlug(locale, slug)) return null;
  return getPublishedProjectBySlugWithAssets(locale, slug);
}
