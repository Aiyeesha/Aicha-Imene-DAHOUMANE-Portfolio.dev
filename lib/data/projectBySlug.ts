// lib/data/projectBySlug.ts
// -------------------------
// Single-project accessor, backed by file content (see lib/data/projectsSource.ts).
// Supabase read path removed in the de-Supabase refactor.
//
// The types below are re-exported from projectsSource so existing imports
// (`import type { ProjectWithAssets } from "@/lib/data/projectBySlug"`) keep
// working without a churn across every consumer.

import { oneBySlug } from "@/lib/data/projectsSource";

export type {
  ProjectAsset,
  ProjectBadge,
  ProjectWithAssets,
} from "@/lib/data/projectsSource";

/** Fetch a single published project by slug, resolving the best locale block. */
export async function getPublishedProjectBySlugWithAssets(
  locale: string,
  slug: string
) {
  return oneBySlug(locale, slug);
}
