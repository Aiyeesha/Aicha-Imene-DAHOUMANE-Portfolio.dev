// lib/data/featuredProjects.ts
// ----------------------------
// What the home page's FeaturedProjects (a client component) actually needs.
// Everything passed to a client component is serialized into the HTML: the
// full project list (galleries, highlights, sections) weighed ~140 KB on the
// home page and delayed the first paint on mobile. Only the featured projects
// are kept, with the fields the cards read and the first gallery image.

import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

export type FeaturedProjectCard = Pick<
  ProjectWithAssets,
  | "slug"
  | "title"
  | "summary"
  | "tags"
  | "badge"
  | "track"
  | "featured"
  | "sort_order"
  | "is_bridge"
  | "repo_url"
  | "nature"
> & { gallery: { src: string }[] };

export function toFeaturedProjectCards(projects: ProjectWithAssets[]): FeaturedProjectCard[] {
  return projects
    .filter((p) => p.featured)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      tags: p.tags,
      badge: p.badge,
      track: p.track,
      featured: p.featured,
      sort_order: p.sort_order,
      is_bridge: p.is_bridge,
      repo_url: p.repo_url,
      nature: p.nature,
      gallery: p.gallery?.[0]?.src ? [{ src: p.gallery[0].src }] : [],
    }));
}
