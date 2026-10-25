// lib/data/projectAssets.ts
// -------------------------
// Présence des logos et couvertures de projet, connue au build
// (content/project-assets.json, généré par scripts/generate-project-assets.mjs).
//
// Audit 2026-10-23 (P5) : les composants ne doivent plus demander une image
// qui n'existe pas. Chaque tentative partait en 404 et recevait une page HTML
// 404 complète (~70 Ko) ; sur /fr/projects, ~18 requêtes de ce type.
// Utilisable côté serveur comme côté client (simple JSON, aucun accès disque).

import manifest from "@/content/project-assets.json";

const PROJECTS_PATH = "/projects";

const LOGOS: ReadonlySet<string> = new Set(manifest.logos);
const COVERS: ReadonlySet<string> = new Set(manifest.covers);

/** Le projet dispose-t-il d'un logo (public/projects/<slug>/logo.webp) ? */
export function hasProjectLogo(slug: string): boolean {
  return LOGOS.has(slug);
}

/** Chemin de la couverture par défaut, ou null si elle n'existe pas. */
export function projectCoverPath(slug: string): string | null {
  return COVERS.has(slug) ? `${PROJECTS_PATH}/${slug}/cover.webp` : null;
}

/**
 * Image à afficher sur une carte de projet : première image de la galerie si
 * elle est renseignée (les chemins de galerie sont vérifiés par
 * __tests__/projectAssets.test.ts), sinon la couverture par défaut si elle
 * existe, sinon null — le composant affiche alors son visuel de remplacement
 * sans émettre la moindre requête.
 */
export function projectCardImage(
  slug: string,
  gallery: { src: string }[] | null | undefined
): { src: string; fallback: string | null } | null {
  const cover = projectCoverPath(slug);
  const first = gallery?.[0]?.src;
  if (first) return { src: first, fallback: cover && cover !== first ? cover : null };
  return cover ? { src: cover, fallback: null } : null;
}
