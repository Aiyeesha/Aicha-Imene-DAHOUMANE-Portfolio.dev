// content/resources.ts
// ---------------------
// Données statiques pour la page Ressources / Boîte à outils.
// Les noms d'outils et URLs sont invariants par langue.
// Les descriptions sont bilingues (en / fr).

export type Locale = "en" | "fr";

export type Resource = {
  name: string;
  url: string;
  description: Record<Locale, string>;
  /** Petit badge affiché à côté du nom (ex: "free", "open-source") */
  tag?: string;
};

export type ResourceCategory = {
  id: string;
  icon: string;
  title: Record<Locale, string>;
  resources: Resource[];
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  // ─── Salesforce ────────────────────────────────────────────────────────────
  {
    id: "salesforce",
    icon: "☁️",
    title: {
      en: "Salesforce Development",
      fr: "Développement Salesforce",
    },
    resources: [
      {
        name: "Salesforce CLI (sf)",
        url: "https://developer.salesforce.com/tools/salesforcecli",
        description: {
          en: "Official CLI for deploying metadata, running Apex tests, and managing orgs from the terminal.",
          fr: "CLI officielle pour déployer des métadonnées, lancer des tests Apex et gérer les orgs depuis le terminal.",
        },
        tag: "free",
      },
      {
        name: "VS Code + Salesforce Extensions",
        url: "https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode",
        description: {
          en: "The standard IDE for Apex, LWC, SOQL, and SOSL development with rich IntelliSense.",
          fr: "L'IDE de référence pour développer en Apex, LWC, SOQL et SOSL avec un IntelliSense complet.",
        },
        tag: "free",
      },
      {
        name: "Salesforce Inspector Reloaded",
        url: "https://chromewebstore.google.com/detail/salesforce-inspector-relo/hpijlohoihegkfehhibggnkbjhoemldh",
        description: {
          en: "Chrome extension to inspect any Salesforce org — fields, record IDs, REST Explorer, and bulk export.",
          fr: "Extension Chrome pour inspecter une org Salesforce — champs, IDs, explorateur REST et export en masse.",
        },
        tag: "free",
      },
      {
        name: "PMD Apex (Static Analysis)",
        url: "https://pmd.github.io/latest/pmd_rules_apex.html",
        description: {
          en: "Static analysis tool for Apex code — catches security issues, dead code, and performance anti-patterns.",
          fr: "Outil d'analyse statique pour Apex — détecte les failles de sécurité, le code mort et les anti-patterns de performance.",
        },
        tag: "open-source",
      },
      {
        name: "Salesforce Trailhead",
        url: "https://trailhead.salesforce.com",
        description: {
          en: "Official Salesforce learning platform. Badges, superbadges, and hands-on challenges in free dev orgs.",
          fr: "Plateforme d'apprentissage officielle Salesforce. Badges, superbadges et défis pratiques dans des orgs de développement gratuites.",
        },
        tag: "free",
      },
    ],
  },

  // ─── Dev Stack ─────────────────────────────────────────────────────────────
  {
    id: "devstack",
    icon: "⚡",
    title: {
      en: "Dev Stack",
      fr: "Stack de développement",
    },
    resources: [
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org",
        description: {
          en: "Typed superset of JavaScript. Strict mode + editor integration dramatically reduces runtime errors.",
          fr: "Surcouche typée de JavaScript. Le mode strict et l'intégration IDE réduisent drastiquement les erreurs à l'exécution.",
        },
        tag: "open-source",
      },
      {
        name: "Next.js (App Router)",
        url: "https://nextjs.org",
        description: {
          en: "Full-stack React framework with RSC, SSR, SSG, API Routes, and built-in image/font optimization.",
          fr: "Framework React full-stack avec RSC, SSR, SSG, API Routes et optimisation native des images et polices.",
        },
        tag: "open-source",
      },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com",
        description: {
          en: "Utility-first CSS framework. Eliminates dead CSS and speeds up UI iteration without leaving the HTML.",
          fr: "Framework CSS utility-first. Élimine le CSS mort et accélère l'itération UI sans quitter le HTML.",
        },
        tag: "open-source",
      },
      {
        name: "Supabase",
        url: "https://supabase.com",
        description: {
          en: "Open-source Firebase alternative — PostgreSQL, Auth, Storage, and Realtime, fully self-hostable.",
          fr: "Alternative open-source à Firebase — PostgreSQL, Auth, Storage et Realtime, entièrement auto-hébergeable.",
        },
        tag: "open-source",
      },
      {
        name: "Jest + Testing Library",
        url: "https://testing-library.com",
        description: {
          en: "The go-to testing stack for React. Encourages tests that resemble how users interact with the UI.",
          fr: "La stack de test de référence pour React. Encourage des tests qui reflètent la façon dont les utilisateurs interagissent avec l'UI.",
        },
        tag: "open-source",
      },
    ],
  },

  // ─── IT & Ops ──────────────────────────────────────────────────────────────
  {
    id: "itops",
    icon: "🖥️",
    title: {
      en: "IT & Ops",
      fr: "IT & Ops",
    },
    resources: [
      {
        name: "Ansible",
        url: "https://www.ansible.com",
        description: {
          en: "Agentless automation engine for configuration management, app deployment, and orchestration.",
          fr: "Moteur d'automatisation sans agent pour la gestion de configuration, le déploiement d'applications et l'orchestration.",
        },
        tag: "open-source",
      },
      {
        name: "Windows Server (AD DS / DNS / DHCP / GPO)",
        url: "https://learn.microsoft.com/en-us/windows-server/",
        description: {
          en: "Foundation of most enterprise Windows environments. AD DS, DNS, DHCP, and GPO are day-one skills.",
          fr: "Socle de la plupart des environnements Windows d'entreprise. AD DS, DNS, DHCP et GPO sont des compétences fondamentales.",
        },
      },
      {
        name: "pfSense",
        url: "https://www.pfsense.org",
        description: {
          en: "Open-source firewall and router — routing, VPN (WireGuard/OpenVPN), IDS/IPS, and traffic shaping.",
          fr: "Pare-feu et routeur open-source — routage, VPN (WireGuard/OpenVPN), IDS/IPS et contrôle du trafic.",
        },
        tag: "open-source",
      },
      {
        name: "GitHub Actions",
        url: "https://github.com/features/actions",
        description: {
          en: "CI/CD pipelines directly in GitHub. Used for lint, typecheck, tests, and deployments on every push.",
          fr: "Pipelines CI/CD directement dans GitHub. Utilisé pour le lint, le typecheck, les tests et les déploiements à chaque push.",
        },
        tag: "free",
      },
      {
        name: "Datto RMM",
        url: "https://www.datto.com/products/rmm/",
        description: {
          en: "Remote monitoring and management platform for endpoint oversight, patching, and automation scripts.",
          fr: "Plateforme de supervision et gestion à distance des endpoints — surveillance, patchs et scripts d'automatisation.",
        },
      },
    ],
  },

  // ─── Learning & Reference ──────────────────────────────────────────────────
  {
    id: "learning",
    icon: "📚",
    title: {
      en: "Learning & Reference",
      fr: "Apprentissage & Référence",
    },
    resources: [
      {
        name: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        description: {
          en: "The definitive reference for HTML, CSS, JavaScript, and Web APIs. Bookmark it.",
          fr: "La référence incontournable pour HTML, CSS, JavaScript et les APIs web. À mettre en favoris.",
        },
        tag: "free",
      },
      {
        name: "roadmap.sh",
        url: "https://roadmap.sh",
        description: {
          en: "Visual learning roadmaps for frontend, backend, DevOps, and more. Great for structuring self-study.",
          fr: "Parcours d'apprentissage visuels pour frontend, backend, DevOps et plus. Idéal pour structurer une formation autonome.",
        },
        tag: "free",
      },
      {
        name: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
        description: {
          en: "The standard reference for web application security risks. Essential reading before shipping anything.",
          fr: "La référence standard pour les risques de sécurité des applications web. Lecture obligatoire avant tout déploiement.",
        },
        tag: "free",
      },
      {
        name: "The Pragmatic Programmer",
        url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
        description: {
          en: "Timeless book on software craftsmanship — DRY, orthogonality, debugging, and professionalism.",
          fr: "Ouvrage intemporel sur l'artisanat logiciel — DRY, orthogonalité, débogage et professionnalisme.",
        },
        tag: "book",
      },
      {
        name: "Salesforce Developer Documentation",
        url: "https://developer.salesforce.com/docs",
        description: {
          en: "The authoritative reference for Apex, LWC, REST API, Metadata API, and Salesforce platform limits.",
          fr: "La référence officielle pour Apex, LWC, REST API, Metadata API et les limites de la plateforme Salesforce.",
        },
        tag: "free",
      },
    ],
  },
];
