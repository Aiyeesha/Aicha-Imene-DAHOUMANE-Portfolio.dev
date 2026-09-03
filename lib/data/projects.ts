// lib/data/projects.ts
// --------------------
// Project list accessors, backed by file content (see lib/data/projectsSource.ts).
// The Supabase read path was removed in the de-Supabase refactor — project
// content now lives in content/projects.ts + content/projectDetails.ts and
// images under /public/projects/.
//
// Signatures stay async so existing `await` call sites and the Redis-cached
// wrappers (lib/data/*.cached.ts) keep working unchanged.

import { allPublished } from "@/lib/data/projectsSource";

export async function getPublishedProjectsWithAssets(locale: string) {
  return allPublished(locale);
}

// Lightweight list for the navbar dropdown — slug/title/track of featured projects.
// The Navbar itself filters by active track and caps at 6 per track.
export async function getFeaturedProjectsForNav(locale: string) {
  return allPublished(locale)
    .filter((p) => p.featured)
    .map((p) => ({ slug: p.slug, title: p.title, track: p.track ?? null }));
}

// Count for the "Security cluster" nav + home links. Kept as a function (not a
// hard-coded number) so it can't drift from the actual project set.
export async function getSecurityClusterCount(locale: string) {
  return allPublished(locale).filter((p) => p.is_security).length;
}
