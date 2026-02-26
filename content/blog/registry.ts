// NOTE: This project uses a lightweight locale setup (see i18n/routing.ts).
// We define the supported locales here to avoid importing a non-existent module.
export type SupportedLocale = "en" | "fr";

export type BlogPostMeta = {
  slug: string;
  locale: SupportedLocale;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  tags: string[];
};

/**
 * Optional post registry.
 *
 * The blog pages also support filesystem-based discovery (MDX in /content/blog/posts).
 * This registry is convenient for curated lists, home page highlights, etc.
 */
export const BLOG_POSTS: BlogPostMeta[] = [
  // --- Next.js / i18n
  {
    slug: "next-intl-app-router",
    locale: "en",
    title: "Next.js App Router i18n with next-intl: a clean, production-ready setup",
    excerpt:
      "A step-by-step guide to build a robust i18n architecture in Next.js App Router with next-intl, including routing, messages, and SEO-friendly locales.",
    date: "2025-01-15",
    tags: ["Next.js", "i18n", "next-intl"],
  },
  {
    slug: "next-intl-app-router",
    locale: "fr",
    title: "Next.js App Router + next-intl : une i18n propre et prête pour la prod",
    excerpt:
      "Guide pas à pas pour une architecture i18n robuste sur Next.js App Router avec next-intl : routing, messages, et bonnes pratiques SEO multi-langues.",
    date: "2025-01-15",
    tags: ["Next.js", "i18n", "next-intl"],
  },

  // --- Salesforce / CI-CD
  {
    slug: "salesforce-cicd-github-actions",
    locale: "en",
    title: "Salesforce CI/CD with GitHub Actions: validate, test, and deploy safely",
    excerpt:
      "A pragmatic CI/CD pipeline for Salesforce: scratch org validation, Apex tests, quality gates, and safe deployments with GitHub Actions.",
    date: "2025-01-22",
    tags: ["Salesforce", "CI/CD", "GitHub Actions"],
  },
  {
    slug: "salesforce-cicd-github-actions",
    locale: "fr",
    title: "Salesforce CI/CD avec GitHub Actions : valider, tester et déployer proprement",
    excerpt:
      "Pipeline CI/CD pragmatique pour Salesforce : validation en scratch org, tests Apex, quality gates et déploiements sécurisés avec GitHub Actions.",
    date: "2025-01-22",
    tags: ["Salesforce", "CI/CD", "GitHub Actions"],
  },

  // --- IT Ops / RMM / Ticketing / Security / Backup
  {
    slug: "datto-rmm-supervision-runbooks",
    locale: "en",
    title: "Datto RMM: monitoring, alerting, and runbooks (from alert to remediation)",
    excerpt:
      "Build an actionable Datto RMM setup: monitors, noise control, escalation, and runbooks/Quick Jobs to remediate fast.",
    date: "2025-02-10",
    tags: ["RMM", "Monitoring", "Automation", "Runbooks", "IT Ops"],
  },
  {
    slug: "datto-rmm-supervision-runbooks",
    locale: "fr",
    title: "Datto RMM : supervision, alerting et runbooks (de l’alerte à la remédiation)",
    excerpt:
      "Mettre en place une supervision Datto RMM actionnable : monitors, réduction du bruit, escalade, runbooks/Quick Jobs et remédiation.",
    date: "2025-02-10",
    tags: ["RMM", "Monitoring", "Automation", "Runbooks", "IT Ops"],
  },
  {
    slug: "autotask-ticketing-workflow",
    locale: "en",
    title: "Autotask: a pragmatic ticketing workflow (triage, SLA, escalation, closure)",
    excerpt:
      "A practical Autotask workflow: email intake, qualification, SLA control, N2 escalation, time entries, and clean closure.",
    date: "2025-02-14",
    tags: ["Ticketing", "IT Ops", "SLA", "Runbooks", "Support"],
  },
  {
    slug: "autotask-ticketing-workflow",
    locale: "fr",
    title: "Autotask : workflow de ticketing (tri, SLA, escalade, clôture)",
    excerpt:
      "Mettre en place un workflow Autotask pragmatique : intake email, qualification, SLA, escalade N2, time entries et clôture propre.",
    date: "2025-02-14",
    tags: ["Ticketing", "IT Ops", "SLA", "Runbooks", "Support"],
  },
  {
    slug: "acronis-backup-recovery-ops",
    locale: "en",
    title: "Acronis: backups (Cloud + NAS), alerts, and remediation",
    excerpt:
      "A practical Acronis Cyber Protect Cloud runbook: plans, destinations (Cloud/NAS), retention, alerting, and how to fix common failures.",
    date: "2025-02-20",
    tags: ["Backup", "Acronis", "Monitoring", "Runbooks", "IT Ops"],
  },
  {
    slug: "acronis-backup-recovery-ops",
    locale: "fr",
    title: "Acronis : sauvegardes (Cloud + NAS), alertes et remédiation",
    excerpt:
      "Runbook Acronis Cyber Protect Cloud : plans, destinations (Cloud/NAS), rétention, alerting et résolution des erreurs fréquentes.",
    date: "2025-02-20",
    tags: ["Backup", "Acronis", "Monitoring", "Runbooks", "IT Ops"],
  },
  {
    slug: "malwarebytes-alert-triage-mitre",
    locale: "en",
    title: "Malwarebytes: alert triage and investigation (MITRE mapping)",
    excerpt:
      "From Malwarebytes alert to decision: triage, evidence collection, containment, remediation, and MITRE ATT&CK mapping.",
    date: "2025-02-28",
    tags: ["Security", "Monitoring", "Runbooks", "IT Ops", "MITRE"],
  },
  {
    slug: "malwarebytes-alert-triage-mitre",
    locale: "fr",
    title: "Malwarebytes : triage d’alertes et investigation (mapping MITRE)",
    excerpt:
      "De l’alerte Malwarebytes à la décision : triage, collecte, containment, remédiation et cartographie MITRE ATT&CK.",
    date: "2025-02-28",
    tags: ["Security", "Monitoring", "Runbooks", "IT Ops", "MITRE"],
  },
];
