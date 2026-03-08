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
  /** Nom affiché de la série (bilingue) */
  name: { en: string; fr: string };
  /** Slugs des articles dans l'ordre de lecture */
  slugs: string[];
};

// ── Séries Salesforce ─────────────────────────────────────────────────────────

const SALESFORCE_DEV: Serie = {
  id: "salesforce-dev",
  name: {
    en: "Salesforce Development Essentials",
    fr: "Développement Salesforce — l'essentiel",
  },
  slugs: [
    "flow-vs-apex-decision-guide",
    "apex-triggers-best-practices",
    "apex-batch-jobs-scheduling",
    "soql-performance-optimization",
  ],
};

const SALESFORCE_LWC: Serie = {
  id: "salesforce-lwc",
  name: {
    en: "Lightning Web Components",
    fr: "Lightning Web Components",
  },
  slugs: [
    "lwc-reusable-components",
    "salesforce-lwc-testing",
  ],
};

const SALESFORCE_CICD: Serie = {
  id: "salesforce-cicd",
  name: {
    en: "Salesforce DevOps & CI/CD",
    fr: "DevOps Salesforce & CI/CD",
  },
  slugs: [
    "salesforce-sandbox-management",
    "salesforce-cicd-github-actions",
  ],
};

// ── Séries IT Ops ─────────────────────────────────────────────────────────────

const ITOPS_WINDOWS: Serie = {
  id: "itops-windows",
  name: {
    en: "Windows Server Administration",
    fr: "Administration Windows Server",
  },
  slugs: [
    "windows-server-2022-hardening",
    "active-directory-gpo-best-practices",
    "windows-autopilot-deployment",
  ],
};

const ITOPS_MONITORING: Serie = {
  id: "itops-monitoring",
  name: {
    en: "IT Ops: Monitoring & Security",
    fr: "IT Ops : Supervision & Sécurité",
  },
  slugs: [
    "datto-rmm-supervision-runbooks",
    "acronis-backup-recovery-ops",
    "malwarebytes-alert-triage-mitre",
  ],
};

const ITOPS_AUTOMATION: Serie = {
  id: "itops-automation",
  name: {
    en: "IT Ops: Automation & Ticketing",
    fr: "IT Ops : Automatisation & Ticketing",
  },
  slugs: [
    "powershell-sysadmin-automation",
    "autotask-ticketing-workflow",
  ],
};

// ── Export ────────────────────────────────────────────────────────────────────

export const SERIES: Serie[] = [
  SALESFORCE_DEV,
  SALESFORCE_LWC,
  SALESFORCE_CICD,
  ITOPS_WINDOWS,
  ITOPS_MONITORING,
  ITOPS_AUTOMATION,
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
