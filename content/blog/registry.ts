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

  // --- LWC
  {
    slug: "lwc-reusable-components",
    locale: "en",
    title: "Building Reusable Lightning Web Components: Patterns and Best Practices",
    excerpt:
      "Learn how to design and build truly reusable LWC components using composition, events, and slots — with real-world patterns you can apply today.",
    date: "2025-03-10",
    tags: ["Salesforce", "LWC", "Lightning", "Front-end", "Best Practices"],
  },
  {
    slug: "lwc-reusable-components",
    locale: "fr",
    title: "Créer des composants Lightning Web Components réutilisables : patterns et bonnes pratiques",
    excerpt:
      "Comment concevoir et construire de vrais LWC réutilisables grâce à la composition, les événements et les slots — avec des patterns concrets applicables immédiatement.",
    date: "2025-03-10",
    tags: ["Salesforce", "LWC", "Lightning", "Front-end", "Bonnes pratiques"],
  },

  // --- Apex Batch
  {
    slug: "apex-batch-jobs-scheduling",
    locale: "en",
    title: "Apex Batch Jobs: Scheduling, Chaining, and Monitoring in Production",
    excerpt:
      "A complete guide to Apex Batch Jobs — from writing your first Database.Batchable to chaining jobs, scheduling with Cron, and monitoring failures in production.",
    date: "2025-04-07",
    tags: ["Salesforce", "Apex", "Batch", "Automation", "Performance"],
  },
  {
    slug: "apex-batch-jobs-scheduling",
    locale: "fr",
    title: "Apex Batch Jobs : planification, chaînage et supervision en production",
    excerpt:
      "Guide complet sur les Apex Batch Jobs — du premier Database.Batchable au chaînage de jobs, à la planification CRON et à la surveillance des échecs en production.",
    date: "2025-04-07",
    tags: ["Salesforce", "Apex", "Batch", "Automatisation", "Performance"],
  },

  // --- SOQL Performance
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
    slug: "powershell-sysadmin-automation",
    locale: "en",
    title: "PowerShell Automation for Sysadmins: Scripts That Save Hours Every Week",
    excerpt:
      "Practical PowerShell scripts for Windows system administrators — user management, disk monitoring, log collection, remote execution, and scheduled reporting.",
    date: "2025-10-06",
    tags: ["IT Ops", "PowerShell", "Automation", "Windows", "Scripting"],
  },
  {
    slug: "powershell-sysadmin-automation",
    locale: "fr",
    title: "Automatisation PowerShell pour les sysadmins : des scripts qui font gagner des heures chaque semaine",
    excerpt:
      "Scripts PowerShell pratiques pour les administrateurs systèmes Windows — gestion des utilisateurs, supervision des disques, collecte de journaux, exécution distante et rapports planifiés.",
    date: "2025-10-06",
    tags: ["IT Ops", "PowerShell", "Automatisation", "Windows", "Scripts"],
  },

  // --- Governor Limits
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
    slug: "salesforce-lwc-testing",
    locale: "en",
    title: "Testing Lightning Web Components with Jest: From Setup to Production-Grade Tests",
    excerpt:
      "A complete guide to unit testing LWC components with Jest and @lwc/jest-utils — mocking wire adapters, testing events, and achieving reliable component coverage.",
    date: "2026-01-05",
    tags: ["Salesforce", "LWC", "Jest", "Testing", "Front-end"],
  },
  {
    slug: "salesforce-lwc-testing",
    locale: "fr",
    title: "Tester les Lightning Web Components avec Jest : du setup aux tests de niveau production",
    excerpt:
      "Guide complet pour tester les composants LWC avec Jest et @lwc/jest-utils — mocker les wire adapters, tester les événements et obtenir une couverture fiable.",
    date: "2026-01-05",
    tags: ["Salesforce", "LWC", "Jest", "Tests", "Front-end"],
  },

  // --- Next.js Admin Dashboard (personal project)
  {
    slug: "nextjs-admin-dashboard-supabase",
    locale: "en",
    title: "Building a Secure Admin Dashboard with Next.js 16 + Supabase",
    excerpt:
      "Step-by-step tutorial: protected /admin route with HTTP Basic Auth, Supabase service_role client, and a full data visualization dashboard — no extra dependencies.",
    date: "2026-03-06",
    tags: ["Next.js", "Supabase", "Web", "Security", "Dashboard"],
  },
  {
    slug: "nextjs-admin-dashboard-supabase",
    locale: "fr",
    title: "Construire un dashboard admin sécurisé avec Next.js 16 + Supabase",
    excerpt:
      "Tutoriel complet : route /admin protégée par HTTP Basic Auth, client Supabase service_role, et visualisation des données — sans dépendance supplémentaire.",
    date: "2026-03-06",
    tags: ["Next.js", "Supabase", "Web", "Sécurité", "Dashboard"],
  },
];
