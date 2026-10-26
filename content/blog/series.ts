// content/blog/series.ts
// ----------------------
// Blog article series: ordered reading paths across related posts.
// To add one: add an entry to SERIES (unique id, names, slugs in reading
// order). Slugs must match the MDX file names (without extension); all
// locales share the same slug.
// getSeriePosition(slug) finds a post's series and position.

export type Serie = {
  /** Unique series id */
  id: string;
  /** Display name (per locale) */
  name: { en: string; fr: string; es: string };
  /** Post slugs in reading order */
  slugs: string[];
};

// ── Salesforce series ─────────────────────────────────────────────────────────

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

// ── IT Ops series ─────────────────────────────────────────────────────────────

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

// ── Helper: find a post's series ──────────────────────────────────────────────

export type SeriePosition = {
  serie:    Serie;
  /** 0-based index of the post in the series */
  index:    number;
  /** Previous post slug in the series (or null) */
  prevSlug: string | null;
  /** Next post slug in the series (or null) */
  nextSlug: string | null;
};

/**
 * A post's position in its series, or null when it belongs to none. If a post
 * is in several series (rare), the first one found wins.
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
