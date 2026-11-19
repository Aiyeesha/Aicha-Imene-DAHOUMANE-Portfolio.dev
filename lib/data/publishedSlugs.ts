// lib/data/publishedSlugs.ts
// ---------------------------
// Slugs of the published projects and blog posts, as plain lists that proxy.ts
// can import without loading the (large) project and article content. Used to
// answer unknown /{locale}/projects/<slug> and /{locale}/blog/<slug> with
// the complete server-rendered 404 page (app/not-found.tsx) instead of the
// empty error shell a page's own notFound() produces in Next.js 16.
//
// Kept in sync by __tests__/published-slugs.test.ts: adding, renaming or
// unpublishing a project or a post fails that test until this file is
// updated. Blog slugs are the same in every locale.

export const PUBLISHED_PROJECT_SLUGS: readonly string[] = [
  "avenir-telecom-lightning-app",
  "cicd-pipeline-setup",
  "cve-watchlist",
  "digit-learning-salesforce-update",
  "fasha-apex-backend-optimization",
  "homelab-cowrie-honeypot",
  "homelab-network-sniffing",
  "homelab-password-cracking-lab",
  "idemconnect-apex-backend",
  "incident-response-playbook",
  "incident-response-tracker",
  "it-ops-acronis-backup",
  "it-ops-incident-management",
  "it-ops-network-security",
  "it-ops-rmm-supervision",
  "it-ops-virtualization-lab",
  "legarant-axg-salesforce-deployment",
  "log-anomaly-detector",
  "ltp-apex-backend-prototype",
  "nova-manufacturing-classic-to-lightning",
  "python-network-scanner",
  "python-password-checker",
  "risk-assessment-matrix",
  "risque360",
  "security-monitoring-dashboard",
  "tours-for-life-salesforce-solution",
  "vulnerability-assessment-report",
  "wirebright-visualforce-to-lightning",
  "workstation-mass-deployment",
];

export const PUBLISHED_BLOG_SLUGS: readonly string[] = [
  "active-directory-gpo-best-practices",
  "apex-integration-patterns",
  "apex-test-classes-best-practices",
  "apex-triggers-best-practices",
  "flow-vs-apex-decision-guide",
  "is-security-data-integrity-bug",
  "msp-internship-lessons",
  "pfsense-squid-proxy-setup",
  "salesforce-deployment-strategies",
  "salesforce-governor-limits",
  "salesforce-sandbox-management",
  "soql-performance-optimization",
  "windows-autopilot-deployment",
  "windows-server-2022-hardening",
];
