// lib/data/projectCards.ts
// ------------------------
// What the /projects grid (ProjectsSection, a client component) actually
// reads. Everything passed to a client component is serialised into the HTML:
// handing it full ProjectWithAssets objects shipped every case study
// (`sections`), every gallery image and the hero subtitles of all published
// projects in the RSC payload. Same approach as lib/data/featuredProjects.ts.

import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

export type ProjectCard = Pick<
  ProjectWithAssets,
  | "slug"
  | "title"
  | "summary"
  | "tags"
  | "categories"
  | "badge"
  | "track"
  | "featured"
  | "sort_order"
  | "status"
  | "is_bridge"
  | "is_security"
  | "repo_url"
  | "nature"
  | "highlights"
> & { gallery: { src: string }[] };

export function toProjectCards(projects: ProjectWithAssets[]): ProjectCard[] {
  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    tags: p.tags,
    categories: p.categories,
    badge: p.badge,
    track: p.track,
    featured: p.featured,
    sort_order: p.sort_order,
    status: p.status,
    is_bridge: p.is_bridge,
    is_security: p.is_security,
    repo_url: p.repo_url,
    nature: p.nature,
    // The card shows three highlights at most.
    highlights: (p.highlights ?? []).slice(0, 3),
    // Only the first gallery image is used (projectCardImage).
    gallery: p.gallery?.[0]?.src ? [{ src: p.gallery[0].src }] : [],
  }));
}
