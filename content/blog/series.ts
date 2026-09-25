// content/blog/series.ts
// ----------------------
// Définition statique des séries d'articles du blog.
// Une série = un parcours de lecture ordonné reliant des articles complémentaires.
//
// Pour ajouter une série :
//   1. Ajouter un objet dans SERIES (id unique, noms EN/FR, slugs dans l'ordre)
//   2. Les slugs doivent correspondre exactement aux noms de fichiers MDX (sans extension)
//   3. Les articles des deux locales partagent le même slug — pas besoin de dupliquer
//
// Usage : getSerie(slug) → trouve la série d'un article + sa position

export type Serie = {
  /** Identifiant unique de la série */
  id: string;
  /** Nom affiché de la série (trilingue) */
  name: { en: string; fr: string; es: string };
  /** Slugs des articles dans l'ordre de lecture */
  slugs: string[];
};

// ── Séries Salesforce ─────────────────────────────────────────────────────────
// Séries resserrées à l'audit de contenu du 2026-09-25 (lot 4) : le blog ne
// garde que 14 articles, tous rattachés à un projet du portfolio.

const SALESFORCE_DEV: Serie = {
  id: "salesforce-dev",
  name: {
    en: "Salesforce Development Essentials",
    fr: "Développement Salesforce — l'essentiel",
    es: "Desarrollo Salesforce — lo esencial",
  },
  slugs: [
    "flow-vs-apex-decision-guide",
    "apex-triggers-best-practices",
    "salesforce-governor-limits",
    "soql-performance-optimization",
    "apex-test-classes-best-practices",
  ],
};

const SALESFORCE_DEVOPS: Serie = {
  id: "salesforce-devops",
  name: {
    en: "Salesforce DevOps",
    fr: "DevOps Salesforce",
    es: "DevOps Salesforce",
  },
  slugs: [
    "salesforce-sandbox-management",
    "salesforce-deployment-strategies",
  ],
};

// ── Séries IT Ops ─────────────────────────────────────────────────────────────

const ITOPS_WINDOWS: Serie = {
  id: "itops-windows",
  name: {
    en: "Windows Server Administration",
    fr: "Administration Windows Server",
    es: "Administración de Windows Server",
  },
  slugs: [
    "windows-server-2022-hardening",
    "active-directory-gpo-best-practices",
    "windows-autopilot-deployment",
  ],
};

// ── Export ────────────────────────────────────────────────────────────────────

export const SERIES: Serie[] = [
  SALESFORCE_DEV,
  SALESFORCE_DEVOPS,
  ITOPS_WINDOWS,
];

// ── Helper : trouver la série d'un article ────────────────────────────────────

export type SeriePosition = {
  serie:    Serie;
  /** Index 0-based de l'article dans la série */
  index:    number;
  /** Slug de l'article précédent dans la série (ou null) */
  prevSlug: string | null;
  /** Slug de l'article suivant dans la série (ou null) */
  nextSlug: string | null;
};

/**
 * Retourne la position d'un article dans sa série, ou null s'il n'appartient à aucune.
 * Si un article est dans plusieurs séries (rare), retourne la première trouvée.
 */
export function getSeriePosition(slug: string): SeriePosition | null {
  for (const serie of SERIES) {
    const index = serie.slugs.indexOf(slug);
    if (index === -1) continue;

    return {
      serie,
      index,
      prevSlug: index > 0 ? serie.slugs[index - 1] : null,
      nextSlug: index < serie.slugs.length - 1 ? serie.slugs[index + 1] : null,
    };
  }
  return null;
}
