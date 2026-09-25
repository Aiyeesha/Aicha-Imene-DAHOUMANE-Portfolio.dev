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
  // --- IT Ops / RMM / Ticketing / Security / Backup
  {
    slug: "soql-performance-optimization",
    locale: "en",
    title: "SOQL Performance Optimization: From Slow Queries to Sub-Second Results",
    excerpt:
      "Practical techniques to write faster SOQL queries in Salesforce — indexes, selective filters, query plans, and common anti-patterns to eliminate.",
    date: "2025-05-05",
    tags: ["Salesforce", "SOQL", "Performance", "Database", "Best Practices"],
  },
  {
    slug: "soql-performance-optimization",
    locale: "fr",
    title: "Optimisation des performances SOQL : des requêtes lentes aux résultats en moins d’une seconde",
    excerpt:
      "Techniques concrètes pour écrire des requêtes SOQL plus rapides dans Salesforce — index, filtres sélectifs, Query Plan et anti-patterns à éliminer.",
    date: "2025-05-05",
    tags: ["Salesforce", "SOQL", "Performance", "Base de données", "Bonnes pratiques"],
  },

  // --- Windows Autopilot
  {
    slug: "windows-autopilot-deployment",
    locale: "en",
    title: "Windows Autopilot: Mass Deployment of 200+ Workstations, Step by Step",
    excerpt:
      "A field-tested guide to deploying Dell workstations at scale using Windows Autopilot and Intune — from hardware hash collection to first user login.",
    date: "2025-06-02",
    tags: ["IT Ops", "Windows Autopilot", "Intune", "Deployment", "Runbook"],
  },
  {
    slug: "windows-autopilot-deployment",
    locale: "fr",
    title: "Windows Autopilot : déploiement en masse de 200+ postes, pas à pas",
    excerpt:
      "Guide éprouvé sur le terrain pour déployer des postes Dell à grande échelle avec Windows Autopilot et Intune — de la collecte des hashs matériels au premier login utilisateur.",
    date: "2025-06-02",
    tags: ["IT Ops", "Windows Autopilot", "Intune", "Déploiement", "Runbook"],
  },

  // --- Active Directory / GPO
  {
    slug: "active-directory-gpo-best-practices",
    locale: "en",
    title: "Active Directory & GPO: Administration and Security Best Practices",
    excerpt:
      "A practical guide to structuring your AD OU hierarchy, designing GPOs that are maintainable and secure, and avoiding the most common administration mistakes.",
    date: "2025-07-07",
    tags: ["IT Ops", "Active Directory", "GPO", "Windows Server", "Security"],
  },
  {
    slug: "active-directory-gpo-best-practices",
    locale: "fr",
    title: "Active Directory et GPO : administration et bonnes pratiques de sécurité",
    excerpt:
      "Guide pratique pour structurer la hiérarchie d’OU de votre AD, concevoir des GPO maintenables et sécurisées, et éviter les erreurs d’administration les plus fréquentes.",
    date: "2025-07-07",
    tags: ["IT Ops", "Active Directory", "GPO", "Windows Server", "Sécurité"],
  },

  // --- PfSense + Squid
  {
    slug: "pfsense-squid-proxy-setup",
    locale: "en",
    title: "PfSense + Squid Proxy: Secure Internet Access with Content Filtering",
    excerpt:
      "How to set up PfSense as a perimeter firewall with Squid as a transparent proxy — including HTTPS inspection, ACLs, and SquidGuard content filtering.",
    date: "2025-08-04",
    tags: ["IT Ops", "PfSense", "Network", "Security", "Firewall", "Proxy"],
  },
  {
    slug: "pfsense-squid-proxy-setup",
    locale: "fr",
    title: "PfSense + Squid : accès internet sécurisé avec filtrage de contenu",
    excerpt:
      "Comment configurer PfSense comme pare-feu périmétrique avec Squid en proxy transparent — inspection HTTPS, ACL et filtrage SquidGuard.",
    date: "2025-08-04",
    tags: ["IT Ops", "PfSense", "Réseau", "Sécurité", "Pare-feu", "Proxy"],
  },

  // --- Windows Server Hardening
  {
    slug: "windows-server-2022-hardening",
    locale: "en",
    title: "Windows Server 2022 Security Hardening: A Practical Checklist",
    excerpt:
      "Step-by-step hardening guide for Windows Server 2022 — from disabling legacy protocols to configuring audit policies, local firewall, and privileged access management.",
    date: "2025-09-08",
    tags: ["IT Ops", "Windows Server", "Security", "Hardening", "Runbook"],
  },
  {
    slug: "windows-server-2022-hardening",
    locale: "fr",
    title: "Durcissement de Windows Server 2022 : checklist pratique",
    excerpt:
      "Guide de durcissement pas à pas pour Windows Server 2022 — désactivation des protocoles obsolètes, configuration des stratégies d’audit, pare-feu local et gestion des accès privilégiés.",
    date: "2025-09-08",
    tags: ["IT Ops", "Windows Server", "Sécurité", "Durcissement", "Runbook"],
  },

  // --- PowerShell Automation
  {
    slug: "salesforce-governor-limits",
    locale: "en",
    title: "Salesforce Governor Limits: Understanding, Monitoring, and Avoiding Them",
    excerpt:
      "A practical guide to Salesforce governor limits — the most critical ones, how to monitor your consumption, and patterns to stay well within bounds.",
    date: "2025-11-03",
    tags: ["Salesforce", "Apex", "Performance", "Governor Limits", "Best Practices"],
  },
  {
    slug: "salesforce-governor-limits",
    locale: "fr",
    title: "Governor Limits Salesforce : comprendre, surveiller et les éviter",
    excerpt:
      "Guide pratique sur les governor limits Salesforce — les plus critiques, comment surveiller votre consommation et les patterns pour rester bien en dessous des seuils.",
    date: "2025-11-03",
    tags: ["Salesforce", "Apex", "Performance", "Governor Limits", "Bonnes pratiques"],
  },

  // --- Sandbox Management
  {
    slug: "salesforce-sandbox-management",
    locale: "en",
    title: "Salesforce Sandbox Management: Types, Refresh Strategy, and Deployment Workflow",
    excerpt:
      "How to manage Salesforce sandboxes effectively — choosing the right sandbox type, refresh planning, data masking for compliance, and a clean deployment workflow from dev to production.",
    date: "2025-12-08",
    tags: ["Salesforce", "Sandbox", "DevOps", "CI/CD", "Deployment"],
  },
  {
    slug: "salesforce-sandbox-management",
    locale: "fr",
    title: "Gestion des sandboxes Salesforce : types, stratégie de rafraîchissement et workflow de déploiement",
    excerpt:
      "Comment gérer efficacement les sandboxes Salesforce — choisir le bon type, planifier les rafraîchissements, anonymiser les données pour la conformité et mettre en place un workflow de déploiement propre.",
    date: "2025-12-08",
    tags: ["Salesforce", "Sandbox", "DevOps", "CI/CD", "Déploiement"],
  },

  // --- Apex Triggers Best Practices
  {
    slug: "apex-triggers-best-practices",
    locale: "en",
    title: "Apex Triggers: 10 Best Practices for Maintainable Code",
    excerpt:
      "Practical guide to building robust, performant, and maintainable Apex triggers in your Salesforce projects.",
    date: "2026-02-15",
    tags: ["Salesforce", "Apex", "Best Practices", "Development"],
  },
  {
    slug: "apex-triggers-best-practices",
    locale: "fr",
    title: "Triggers Apex : 10 bonnes pratiques pour un code maintenable",
    excerpt:
      "Guide pratique pour développer des triggers Apex robustes, performants et faciles à maintenir dans vos projets Salesforce.",
    date: "2026-02-15",
    tags: ["Salesforce", "Apex", "Bonnes pratiques", "Développement"],
  },

  // --- Flow vs Apex Decision Guide
  {
    slug: "flow-vs-apex-decision-guide",
    locale: "en",
    title: "Flow Builder vs Apex: When to Choose What?",
    excerpt:
      "Practical decision guide for choosing between Flow Builder and Apex for your Salesforce automation needs.",
    date: "2026-02-10",
    tags: ["Salesforce", "Flow", "Apex", "Automation", "Architecture"],
  },
  {
    slug: "flow-vs-apex-decision-guide",
    locale: "fr",
    title: "Flow Builder vs Apex : Quand choisir quoi ?",
    excerpt:
      "Guide de décision pratique pour choisir entre Flow Builder et Apex selon vos besoins d'automatisation Salesforce.",
    date: "2026-02-10",
    tags: ["Salesforce", "Flow", "Apex", "Automatisation", "Architecture"],
  },

  // --- LWC Testing
  {
    slug: "apex-integration-patterns",
    locale: "en",
    title: "Apex Integration Patterns: REST, Callouts, and Named Credentials",
    excerpt:
      "Build reliable Salesforce integrations — REST callouts with Named Credentials, handling async limits, retry logic with Platform Events, and external service mocking.",
    date: "2026-02-17",
    tags: ["Salesforce", "Apex", "Integration", "API"],
  },
  {
    slug: "apex-integration-patterns",
    locale: "fr",
    title: "Patterns d'intégration Apex : REST, callouts et Named Credentials",
    excerpt:
      "Construisez des intégrations Salesforce fiables — callouts REST avec Named Credentials, gestion des limites async, logique de retry avec Platform Events et mock des services externes.",
    date: "2026-02-17",
    tags: ["Salesforce", "Apex", "Integration", "API"],
  },
  {
    slug: "apex-test-classes-best-practices",
    locale: "en",
    title: "Apex Test Classes: 85%+ Coverage Without Cheating",
    excerpt:
      "Write meaningful Apex tests that actually catch bugs — TestDataFactory, async testing, callout mocks, and the anti-patterns that inflate coverage without value.",
    date: "2026-01-20",
    tags: ["Salesforce", "Apex", "Testing", "Best Practices"],
  },
  {
    slug: "apex-test-classes-best-practices",
    locale: "fr",
    title: "Classes de test Apex : couverture 85 %+ sans tricher",
    excerpt:
      "Écrivez des tests Apex qui détectent vraiment les bugs — TestDataFactory, tests asynchrones, mocks de callouts et anti-patterns à éviter.",
    date: "2026-01-20",
    tags: ["Salesforce", "Apex", "Testing", "Best Practices"],
  },
  {
    slug: "salesforce-deployment-strategies",
    locale: "en",
    title: "Salesforce Deployment: Change Sets vs CLI vs DevOps Center",
    excerpt:
      "Compare the three main Salesforce deployment methods — when to use Change Sets, Salesforce CLI (SFDX), or DevOps Center for your project.",
    date: "2025-12-16",
    tags: ["Salesforce", "DevOps", "CI/CD", "Deployment"],
  },
  {
    slug: "salesforce-deployment-strategies",
    locale: "fr",
    title: "Déploiement Salesforce : Change Sets vs CLI vs DevOps Center",
    excerpt:
      "Comparez les trois méthodes de déploiement Salesforce — quand utiliser les Change Sets, Salesforce CLI (SFDX) ou DevOps Center selon votre projet.",
    date: "2025-12-16",
    tags: ["Salesforce", "DevOps", "CI/CD", "Deployment"],
  },];
