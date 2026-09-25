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

  // --- Salesforce / Apex avancé
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
    slug: "git-workflow-salesforce-projects",
    locale: "en",
    title: "Git Workflow for Salesforce Projects: Branching, SFDX, and CI",
    excerpt:
      "Apply a practical Git branching strategy to Salesforce development — feature branches, scratch orgs, pull request validation, and automated deployment pipelines.",
    date: "2025-10-21",
    tags: ["Salesforce", "Git", "DevOps", "CI/CD"],
  },
  {
    slug: "git-workflow-salesforce-projects",
    locale: "fr",
    title: "Workflow Git pour les projets Salesforce : branches, SFDX et CI",
    excerpt:
      "Appliquez une stratégie de branches Git pratique au développement Salesforce — branches de fonctionnalité, scratch orgs, validation par pull request et pipelines de déploiement automatisés.",
    date: "2025-10-21",
    tags: ["Salesforce", "Git", "DevOps", "CI/CD"],
  },
  {
    slug: "salesforce-data-migration-checklist",
    locale: "en",
    title: "Salesforce Data Migration Checklist: From Legacy System to Org",
    excerpt:
      "A practical checklist for migrating data into Salesforce — mapping, deduplication, data loader strategy, validation rules, and rollback planning.",
    date: "2026-01-06",
    tags: ["Salesforce", "Data", "Migration", "Admin"],
  },
  {
    slug: "salesforce-data-migration-checklist",
    locale: "fr",
    title: "Checklist de migration de données Salesforce : du système legacy vers l'org",
    excerpt:
      "Une checklist pratique pour migrer des données vers Salesforce — mapping, déduplication, stratégie Data Loader, règles de validation et plan de rollback.",
    date: "2026-01-06",
    tags: ["Salesforce", "Data", "Migration", "Admin"],
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
  },
  {
    slug: "salesforce-lwc-performance",
    locale: "en",
    title: "LWC Performance: Wire Adapters, Lazy Loading, and Rendering Pitfalls",
    excerpt:
      "Speed up Lightning Web Components — understand wire adapter caching, avoid unnecessary re-renders, lazy load heavy components, and measure with Chrome DevTools.",
    date: "2026-02-03",
    tags: ["Salesforce", "LWC", "Performance", "JavaScript"],
  },
  {
    slug: "salesforce-lwc-performance",
    locale: "fr",
    title: "Performance LWC : wire adapters, lazy loading et pièges de rendu",
    excerpt:
      "Accélérez vos Lightning Web Components — comprenez le cache des wire adapters, évitez les re-rendus inutiles, chargez les composants lourds à la demande et mesurez avec Chrome DevTools.",
    date: "2026-02-03",
    tags: ["Salesforce", "LWC", "Performance", "JavaScript"],
  },
  {
    slug: "salesforce-org-health-check",
    locale: "en",
    title: "Salesforce Org Health Check: Audit Checklist for Admins",
    excerpt:
      "A practical audit checklist to assess your Salesforce org — technical debt, security gaps, unused metadata, governor limit risks, and performance red flags.",
    date: "2025-11-18",
    tags: ["Salesforce", "Admin", "Audit", "Best Practices"],
  },
  {
    slug: "salesforce-org-health-check",
    locale: "fr",
    title: "Bilan de santé de l'org Salesforce : checklist d'audit pour les admins",
    excerpt:
      "Une checklist d'audit pratique pour évaluer votre org Salesforce — dette technique, failles de sécurité, métadonnées inutilisées, risques de governor limits et signaux d'alarme de performance.",
    date: "2025-11-18",
    tags: ["Salesforce", "Admin", "Audit", "Best Practices"],
  },
  {
    slug: "salesforce-platform-events",
    locale: "en",
    title: "Platform Events & CDC: Real-Time Salesforce Integrations",
    excerpt:
      "Build real-time integrations in Salesforce using Platform Events and Change Data Capture — publish, subscribe, and handle replay with practical Apex and LWC examples.",
    date: "2026-03-03",
    tags: ["Salesforce", "Integration", "Events", "Apex"],
  },
  {
    slug: "salesforce-platform-events",
    locale: "fr",
    title: "Platform Events & CDC : intégrations Salesforce en temps réel",
    excerpt:
      "Créez des intégrations temps réel avec Platform Events et Change Data Capture — publication, abonnement et replay avec des exemples Apex et LWC concrets.",
    date: "2026-03-03",
    tags: ["Salesforce", "Integration", "Events", "Apex"],
  },
  {
    slug: "salesforce-reports-dashboards",
    locale: "en",
    title: "Salesforce Reports and Dashboards: Beyond the Basics",
    excerpt:
      "Go beyond simple reports — cross filters, bucket columns, joined reports, dynamic dashboards, and report subscriptions for automated distribution.",
    date: "2025-12-02",
    tags: ["Salesforce", "Reports", "Analytics", "Admin"],
  },
  {
    slug: "salesforce-reports-dashboards",
    locale: "fr",
    title: "Rapports et tableaux de bord Salesforce : au-delà des bases",
    excerpt:
      "Allez au-delà des rapports simples — cross filters, bucket columns, joined reports, tableaux de bord dynamiques et abonnements aux rapports pour une distribution automatisée.",
    date: "2025-12-02",
    tags: ["Salesforce", "Reports", "Analytics", "Admin"],
  },
  {
    slug: "salesforce-security-model",
    locale: "en",
    title: "Salesforce Security Model: Profiles, Permission Sets, and OWD",
    excerpt:
      "Master the Salesforce security model — organization-wide defaults, role hierarchy, profiles vs. permission sets, field-level security, and sharing rules explained clearly.",
    date: "2025-10-07",
    tags: ["Salesforce", "Security", "Admin", "Permissions"],
  },
  {
    slug: "salesforce-security-model",
    locale: "fr",
    title: "Modèle de sécurité Salesforce : Profils, Permission Sets et OWD",
    excerpt:
      "Maîtrisez le modèle de sécurité Salesforce — defaults au niveau de l'organisation, hiérarchie des rôles, profils vs. permission sets, sécurité au niveau des champs et règles de partage.",
    date: "2025-10-07",
    tags: ["Salesforce", "Security", "Admin", "Permissions"],
  },
  {
    slug: "salesforce-trailhead-path-developer",
    locale: "en",
    title: "Salesforce Trailhead Path for Developers: From Zero to Platform Developer I",
    excerpt:
      "A curated Trailhead learning path for developers targeting Platform Developer I — the right order, what to skip, and what to actually practice in a dev org.",
    date: "2025-11-04",
    tags: ["Salesforce", "Trailhead", "Learning", "Certification"],
  },
  {
    slug: "salesforce-trailhead-path-developer",
    locale: "fr",
    title: "Parcours Trailhead Salesforce pour les développeurs : de zéro à Platform Developer I",
    excerpt:
      "Un parcours Trailhead curé pour les développeurs visant la certification Platform Developer I — le bon ordre, ce qu'il faut ignorer et ce qu'il faut vraiment pratiquer dans une dev org.",
    date: "2025-11-04",
    tags: ["Salesforce", "Trailhead", "Learning", "Certification"],
  },
  {
    slug: "visualforce-to-lwc-migration",
    locale: "en",
    title: "Migrating from Visualforce to LWC: A Practical Guide",
    excerpt:
      "Migrate Visualforce pages to Lightning Web Components step by step — mapping VF concepts to LWC, data access patterns, and handling the edge cases that trip up migrations.",
    date: "2026-03-17",
    tags: ["Salesforce", "LWC", "Visualforce", "Migration"],
  },
  {
    slug: "visualforce-to-lwc-migration",
    locale: "fr",
    title: "Migration de Visualforce vers LWC : un guide pratique",
    excerpt:
      "Migrez les pages Visualforce vers les Lightning Web Components étape par étape — correspondance des concepts VF vers LWC, patterns d'accès aux données et gestion des cas limites.",
    date: "2026-03-17",
    tags: ["Salesforce", "LWC", "Visualforce", "Migration"],
  },

  // --- IT Ops / Infrastructure / Security
  {
    slug: "docker-compose-production-setup",
    locale: "en",
    title: "Docker Compose for Production: Networks, Volumes, Health Checks",
    excerpt:
      "Set up a robust Docker Compose stack for production — named networks, persistent volumes, health checks, secrets, resource limits, and zero-downtime restarts.",
    date: "2025-01-07",
    tags: ["IT Ops", "Docker", "DevOps"],
  },
  {
    slug: "docker-compose-production-setup",
    locale: "fr",
    title: "Docker Compose en production : réseaux, volumes et health checks",
    excerpt:
      "Mettez en place un stack Docker Compose robuste pour la production — réseaux nommés, volumes persistants, health checks, secrets, limites de ressources et redémarrages sans interruption.",
    date: "2025-01-07",
    tags: ["IT Ops", "Docker", "DevOps"],
  },
  {
    slug: "github-actions-reusable-workflows",
    locale: "en",
    title: "GitHub Actions: Reusable Workflows and Composite Actions",
    excerpt:
      "Stop duplicating CI/CD config across repos — build reusable workflows, composite actions, and shared secrets strategies for multi-repo organizations.",
    date: "2026-04-07",
    tags: ["IT Ops", "GitHub Actions", "CI/CD", "DevOps"],
  },
  {
    slug: "github-actions-reusable-workflows",
    locale: "fr",
    title: "GitHub Actions : workflows réutilisables et composite actions",
    excerpt:
      "Arrêtez de dupliquer la config CI/CD entre les repos — construisez des workflows réutilisables, des composite actions et des stratégies de secrets partagés pour les organisations multi-dépôts.",
    date: "2026-04-07",
    tags: ["IT Ops", "GitHub Actions", "CI/CD", "DevOps"],
  },
  {
    slug: "hyper-v-virtualization-setup",
    locale: "en",
    title: "Hyper-V Virtualization: Setup, Virtual Switching, and VM Best Practices",
    excerpt:
      "Deploy and configure Hyper-V on Windows Server — virtual switches, VM creation, dynamic memory, checkpoints, live migration, and production hardening tips.",
    date: "2024-10-22",
    tags: ["IT Ops", "Hyper-V", "Virtualization", "Windows Server"],
  },
  {
    slug: "hyper-v-virtualization-setup",
    locale: "fr",
    title: "Virtualisation Hyper-V : installation, commutateurs virtuels et bonnes pratiques VM",
    excerpt:
      "Déployez et configurez Hyper-V sur Windows Server — commutateurs virtuels, création de VMs, mémoire dynamique, points de contrôle, migration en direct et conseils de durcissement en production.",
    date: "2024-10-22",
    tags: ["IT Ops", "Hyper-V", "Virtualization", "Windows Server"],
  },
  {
    slug: "incident-response-runbook-template",
    locale: "en",
    title: "Incident Response Runbook Template for IT Teams",
    excerpt:
      "A practical incident response runbook — severity classification, communication templates, escalation paths, war room setup, and post-incident review process.",
    date: "2025-01-21",
    tags: ["IT Ops", "Incident Response", "SRE", "Operations"],
  },
  {
    slug: "incident-response-runbook-template",
    locale: "fr",
    title: "Modèle de runbook de réponse aux incidents pour les équipes IT",
    excerpt:
      "Un runbook de réponse aux incidents pratique — classification de la sévérité, templates de communication, chemins d'escalade, organisation de la war room et processus de revue post-incident.",
    date: "2025-01-21",
    tags: ["IT Ops", "Incident Response", "SRE", "Operations"],
  },
  {
    slug: "linux-server-hardening-checklist",
    locale: "en",
    title: "Linux Server Hardening Checklist (Ubuntu/Debian Production)",
    excerpt:
      "A practical step-by-step hardening checklist for Ubuntu and Debian servers — SSH lockdown, firewall, automatic updates, and system-level protections.",
    date: "2024-08-15",
    tags: ["IT Ops", "Linux", "Security", "Hardening"],
  },
  {
    slug: "linux-server-hardening-checklist",
    locale: "fr",
    title: "Checklist de durcissement serveur Linux (Ubuntu/Debian production)",
    excerpt:
      "Une checklist de durcissement pratique étape par étape pour serveurs Ubuntu et Debian — verrouillage SSH, pare-feu, mises à jour automatiques et protections système.",
    date: "2024-08-15",
    tags: ["IT Ops", "Linux", "Security", "Hardening"],
  },
  {
    slug: "monitoring-alerting-stack",
    locale: "en",
    title: "Monitoring and Alerting Stack: Prometheus, Grafana, and AlertManager",
    excerpt:
      "Build a production monitoring stack from scratch — Prometheus metrics scraping, Grafana dashboards, AlertManager routing, and on-call escalation with PagerDuty.",
    date: "2024-12-10",
    tags: ["IT Ops", "Monitoring", "Prometheus", "DevOps"],
  },
  {
    slug: "monitoring-alerting-stack",
    locale: "fr",
    title: "Stack de monitoring et d'alerting : Prometheus, Grafana et AlertManager",
    excerpt:
      "Construisez une stack de monitoring de production depuis zéro — scraping de métriques Prometheus, tableaux de bord Grafana, routage AlertManager et escalade d'astreinte avec PagerDuty.",
    date: "2024-12-10",
    tags: ["IT Ops", "Monitoring", "Prometheus", "DevOps"],
  },
  {
    slug: "network-segmentation-vlan",
    locale: "en",
    title: "Network Segmentation with VLANs: Design, Configuration, and Security",
    excerpt:
      "Design and implement network segmentation with VLANs — traffic isolation, inter-VLAN routing, firewall rules, and protecting sensitive systems from lateral movement.",
    date: "2024-09-03",
    tags: ["IT Ops", "Networking", "Security", "VLAN"],
  },
  {
    slug: "network-segmentation-vlan",
    locale: "fr",
    title: "Segmentation réseau avec les VLANs : conception, configuration et sécurité",
    excerpt:
      "Concevez et implémentez la segmentation réseau avec les VLANs — isolation du trafic, routage inter-VLAN, règles de pare-feu et protection des systèmes sensibles contre les mouvements latéraux.",
    date: "2024-09-03",
    tags: ["IT Ops", "Networking", "Security", "VLAN"],
  },
  {
    slug: "powershell-active-directory-automation",
    locale: "en",
    title: "PowerShell Active Directory Automation: User Lifecycle Scripts",
    excerpt:
      "Automate AD user management with PowerShell — bulk provisioning, group assignments, license sync, account disabling workflows, and scheduled audit reports.",
    date: "2024-11-05",
    tags: ["IT Ops", "PowerShell", "Active Directory", "Automation"],
  },
  {
    slug: "powershell-active-directory-automation",
    locale: "fr",
    title: "Automatisation Active Directory avec PowerShell : scripts de cycle de vie utilisateur",
    excerpt:
      "Automatisez la gestion des utilisateurs AD avec PowerShell — provisionnement en masse, affectation de groupes, workflows de désactivation de comptes et rapports d'audit planifiés.",
    date: "2024-11-05",
    tags: ["IT Ops", "PowerShell", "Active Directory", "Automation"],
  },
  {
    slug: "siem-log-analysis-basics",
    locale: "en",
    title: "SIEM and Log Analysis Basics: Detecting Threats with Elastic Stack",
    excerpt:
      "Set up basic SIEM capabilities with Elastic Stack — log collection with Filebeat, detection rules, alerting on suspicious patterns, and building security dashboards.",
    date: "2025-02-11",
    tags: ["IT Ops", "Security", "SIEM", "Elastic"],
  },
  {
    slug: "siem-log-analysis-basics",
    locale: "fr",
    title: "Bases du SIEM et de l'analyse de logs : détecter les menaces avec Elastic Stack",
    excerpt:
      "Mettez en place des capacités SIEM basiques avec Elastic Stack — collecte de logs avec Filebeat, règles de détection, alertes sur les patterns suspects et construction de tableaux de bord de sécurité.",
    date: "2025-02-11",
    tags: ["IT Ops", "Security", "SIEM", "Elastic"],
  },
  {
    slug: "ssl-tls-certificate-management",
    locale: "en",
    title: "SSL/TLS Certificate Management: Let's Encrypt, Renewal, and Monitoring",
    excerpt:
      "Manage TLS certificates at scale — automate Let's Encrypt renewal with Certbot and ACME, monitor expiry across multiple servers, and handle wildcard certificates.",
    date: "2024-09-24",
    tags: ["IT Ops", "TLS", "Security", "Linux"],
  },
  {
    slug: "ssl-tls-certificate-management",
    locale: "fr",
    title: "Gestion des certificats SSL/TLS : Let's Encrypt, renouvellement et surveillance",
    excerpt:
      "Gérez les certificats TLS à grande échelle — automatisez le renouvellement Let's Encrypt avec Certbot et ACME, surveillez l'expiration sur plusieurs serveurs et gérez les certificats wildcard.",
    date: "2024-09-24",
    tags: ["IT Ops", "TLS", "Security", "Linux"],
  },
  {
    slug: "veeam-backup-replication",
    locale: "en",
    title: "Backup Strategy with Veeam: 3-2-1 Rule, Replication, and Recovery Testing",
    excerpt:
      "Implement a production-grade backup strategy with Veeam Backup & Replication — 3-2-1 rule, job configuration, off-site replication to object storage, and automated recovery testing.",
    date: "2024-11-19",
    tags: ["IT Ops", "Backup", "Veeam", "Disaster Recovery"],
  },
  {
    slug: "veeam-backup-replication",
    locale: "fr",
    title: "Stratégie de sauvegarde avec Veeam : règle 3-2-1, réplication et tests de restauration",
    excerpt:
      "Mettez en place une stratégie de sauvegarde digne de la production avec Veeam Backup & Replication — règle 3-2-1, configuration des jobs, réplication hors site vers object storage et tests de restauration automatisés.",
    date: "2024-11-19",
    tags: ["IT Ops", "Backup", "Veeam", "Disaster Recovery"],
  },
  {
    slug: "windows-server-active-directory-setup",
    locale: "en",
    title: "Windows Server & Active Directory Setup: A Practical Guide",
    excerpt:
      "Deploy Windows Server, promote it to a Domain Controller, configure DNS, OUs, Group Policy, and harden AD against common attacks — step by step.",
    date: "2024-10-08",
    tags: ["IT Ops", "Windows Server", "Active Directory", "Security"],
  },
  {
    slug: "windows-server-active-directory-setup",
    locale: "fr",
    title: "Windows Server & Active Directory : guide pratique d'installation",
    excerpt:
      "Déployez Windows Server, promouvez-le en contrôleur de domaine, configurez DNS, UO, stratégies de groupe et renforcez AD contre les attaques courantes — étape par étape.",
    date: "2024-10-08",
    tags: ["IT Ops", "Windows Server", "Active Directory", "Security"],
  },

  // --- Next.js / React / Web avancé
  {
    slug: "framer-motion-animations",
    locale: "en",
    title: "Framer Motion in Next.js: Page Transitions, Scroll Animations, and Gestures",
    excerpt:
      "Add polished animations to Next.js with Framer Motion — page transitions with App Router, scroll-triggered animations, gesture interactions, and performance best practices.",
    date: "2025-04-22",
    tags: ["Next.js", "Framer Motion", "Animation", "UI"],
  },
  {
    slug: "framer-motion-animations",
    locale: "fr",
    title: "Framer Motion dans Next.js : transitions de page, animations au scroll et gestes",
    excerpt:
      "Ajoutez des animations soignées à Next.js avec Framer Motion — transitions de page avec App Router, animations déclenchées au scroll, interactions gestuelles et bonnes pratiques de performance.",
    date: "2025-04-22",
    tags: ["Next.js", "Framer Motion", "Animation", "UI"],
  },
  {
    slug: "nextjs-caching-strategies",
    locale: "en",
    title: "Next.js Caching Strategies: Data Cache, Full Route Cache, and Revalidation",
    excerpt:
      "Master Next.js caching — understand the four caching layers, when each applies, how to revalidate on demand, and how to debug what's actually cached.",
    date: "2025-05-06",
    tags: ["Next.js", "Performance", "Caching", "App Router"],
  },
  {
    slug: "nextjs-caching-strategies",
    locale: "fr",
    title: "Stratégies de cache Next.js : Data Cache, Full Route Cache et revalidation",
    excerpt:
      "Maîtrisez le cache Next.js — comprenez les quatre couches de cache, quand chacune s'applique, comment revalider à la demande et comment déboguer ce qui est réellement en cache.",
    date: "2025-05-06",
    tags: ["Next.js", "Performance", "Caching", "App Router"],
  },
  {
    slug: "nextjs-deployment-vercel",
    locale: "en",
    title: "Next.js Deployment on Vercel: Environment Variables, Preview Branches, and Edge Config",
    excerpt:
      "Deploy Next.js to Vercel correctly — environment scoping, preview deployments per branch, Edge Config for feature flags, domain management, and deployment hooks.",
    date: "2025-07-01",
    tags: ["Next.js", "Vercel", "Deployment", "DevOps"],
  },
  {
    slug: "nextjs-deployment-vercel",
    locale: "fr",
    title: "Déploiement Next.js sur Vercel : variables d'environnement, branches preview et Edge Config",
    excerpt:
      "Déployez Next.js sur Vercel correctement — portée des variables d'environnement, déploiements preview par branche, Edge Config pour les feature flags, gestion des domaines et hooks de déploiement.",
    date: "2025-07-01",
    tags: ["Next.js", "Vercel", "Deployment", "DevOps"],
  },
  {
    slug: "nextjs-image-optimization",
    locale: "en",
    title: "Next.js Image Optimization: next/image, Formats, and CDN Strategy",
    excerpt:
      "Get maximum performance from next/image — responsive sizing, format priority, blur placeholders, remote patterns, and when to use a separate CDN vs. Vercel's built-in optimizer.",
    date: "2025-05-20",
    tags: ["Next.js", "Performance", "Images", "Web"],
  },
  {
    slug: "nextjs-image-optimization",
    locale: "fr",
    title: "Optimisation des images Next.js : next/image, formats et stratégie CDN",
    excerpt:
      "Tirez le maximum de performances de next/image — dimensionnement responsive, priorité des formats, placeholders floutés, patterns distants et quand utiliser un CDN séparé vs. l'optimiseur intégré de Vercel.",
    date: "2025-05-20",
    tags: ["Next.js", "Performance", "Images", "Web"],
  },
  {
    slug: "nextjs-seo-best-practices",
    locale: "en",
    title: "Next.js SEO: Metadata API, Sitemaps, and Structured Data",
    excerpt:
      "Implement SEO correctly in Next.js 14+ — generateMetadata, opengraph-image, next-sitemap configuration, JSON-LD structured data, and canonical URLs.",
    date: "2025-06-17",
    tags: ["Next.js", "SEO", "Web"],
  },
  {
    slug: "nextjs-seo-best-practices",
    locale: "fr",
    title: "SEO Next.js : Metadata API, Sitemaps et données structurées",
    excerpt:
      "Implémentez le SEO correctement dans Next.js 14+ — generateMetadata, opengraph-image, next-sitemap, JSON-LD et URLs canoniques.",
    date: "2025-06-17",
    tags: ["Next.js", "SEO", "Web"],
  },
  {
    slug: "nextjs-supabase-auth",
    locale: "en",
    title: "Next.js + Supabase Auth: Server-Side Sessions with App Router",
    excerpt:
      "Implement secure authentication in Next.js App Router with Supabase — server-side session validation, protected routes, middleware, and OAuth providers.",
    date: "2025-06-03",
    tags: ["Next.js", "Supabase", "Auth", "Security"],
  },
  {
    slug: "nextjs-supabase-auth",
    locale: "fr",
    title: "Next.js + Supabase Auth : sessions côté serveur avec App Router",
    excerpt:
      "Implémentez une authentification sécurisée dans Next.js App Router avec Supabase — validation de session côté serveur, routes protégées, middleware et fournisseurs OAuth.",
    date: "2025-06-03",
    tags: ["Next.js", "Supabase", "Auth", "Security"],
  },
  {
    slug: "nextjs-testing-playwright",
    locale: "en",
    title: "Testing Next.js with Playwright: E2E, Authentication, and CI",
    excerpt:
      "Write reliable end-to-end tests for Next.js with Playwright — auth state reuse, page object pattern, API mocking, visual regression, and GitHub Actions integration.",
    date: "2025-07-15",
    tags: ["Next.js", "Testing", "Playwright", "CI/CD"],
  },
  {
    slug: "nextjs-testing-playwright",
    locale: "fr",
    title: "Tester Next.js avec Playwright : E2E, authentification et CI",
    excerpt:
      "Écrivez des tests end-to-end fiables pour Next.js avec Playwright — réutilisation de l'état d'auth, pattern page object, mock d'API, régression visuelle et intégration GitHub Actions.",
    date: "2025-07-15",
    tags: ["Next.js", "Testing", "Playwright", "CI/CD"],
  },
  {
    slug: "react-server-components-patterns",
    locale: "en",
    title: "React Server Components Patterns: Composition, Streaming, and the Boundary",
    excerpt:
      "Master RSC composition — when to use Server vs. Client Components, streaming with Suspense, passing server data to client, and avoiding the common re-render traps.",
    date: "2025-03-25",
    tags: ["Next.js", "React", "RSC", "Performance"],
  },
  {
    slug: "react-server-components-patterns",
    locale: "fr",
    title: "Patterns React Server Components : composition, streaming et la frontière",
    excerpt:
      "Maîtrisez la composition RSC — quand utiliser Server vs. Client Components, streaming avec Suspense, passage de données serveur au client et éviter les pièges de re-rendu courants.",
    date: "2025-03-25",
    tags: ["Next.js", "React", "RSC", "Performance"],
  },
  {
    slug: "supabase-rls-policies",
    locale: "en",
    title: "Supabase Row Level Security: Policies That Actually Work",
    excerpt:
      "Write RLS policies that secure your data without killing performance — user isolation, multi-tenant patterns, service role bypasses, and policy debugging.",
    date: "2025-04-08",
    tags: ["Next.js", "Supabase", "Database", "Security"],
  },
  {
    slug: "supabase-rls-policies",
    locale: "fr",
    title: "Row Level Security Supabase : des politiques qui fonctionnent vraiment",
    excerpt:
      "Écrivez des politiques RLS qui sécurisent vos données sans tuer les performances — isolation utilisateur, patterns multi-tenant, contournements service role et débogage des politiques.",
    date: "2025-04-08",
    tags: ["Next.js", "Supabase", "Database", "Security"],
  },
  {
    slug: "tailwind-design-system",
    locale: "en",
    title: "Building a Design System with Tailwind CSS and shadcn/ui",
    excerpt:
      "Build a scalable design system with Tailwind CSS — design tokens, component variants with CVA, dark mode, shadcn/ui integration, and keeping it consistent across a team.",
    date: "2025-03-11",
    tags: ["Next.js", "Tailwind", "Design System", "UI"],
  },
  {
    slug: "tailwind-design-system",
    locale: "fr",
    title: "Construire un design system avec Tailwind CSS et shadcn/ui",
    excerpt:
      "Construisez un design system évolutif avec Tailwind CSS — tokens de design, variantes de composants avec CVA, mode sombre, intégration shadcn/ui et cohérence à l'échelle d'une équipe.",
    date: "2025-03-11",
    tags: ["Next.js", "Tailwind", "Design System", "UI"],
  },
  {
    slug: "typescript-best-practices-2026",
    locale: "en",
    title: "TypeScript Best Practices in 2026: Types That Actually Help",
    excerpt:
      "Write TypeScript that catches real bugs — discriminated unions, branded types, satisfies operator, template literal types, and patterns that survive team growth.",
    date: "2025-02-25",
    tags: ["Next.js", "TypeScript", "JavaScript", "Best Practices"],
  },
  {
    slug: "typescript-best-practices-2026",
    locale: "fr",
    title: "Bonnes pratiques TypeScript en 2026 : des types qui aident vraiment",
    excerpt:
      "Écrivez du TypeScript qui détecte les vrais bugs — unions discriminées, branded types, opérateur satisfies, types de littéraux de gabarit et patterns qui résistent à la croissance d'une équipe.",
    date: "2025-02-25",
    tags: ["Next.js", "TypeScript", "JavaScript", "Best Practices"],
  },
];
