// lib/data/projects.cached.ts
// ---------------------------
// Kept as the single entry point used by pages. The project content is
// static TypeScript already in memory, so it is no longer copied to Upstash:
// a Redis round trip on every render cost more than rebuilding the list.
import { getPublishedProjectsWithAssets } from "@/lib/data/projects";

export async function getPublishedProjectsWithAssetsCached(locale: string) {
  return getPublishedProjectsWithAssets(locale);
}
