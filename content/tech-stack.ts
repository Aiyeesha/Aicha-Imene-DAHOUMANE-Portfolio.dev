// content/tech-stack.ts
// ---------------------
// Données de la grille de stack technique (TechStackGrid).
//
// Chaque technologie expose :
//   id       — identifiant unique (slug)
//   name     — nom affiché
//   abbr     — 2-3 lettres pour le badge icône (si pas de SVG dédié)
//   category — regroupe visuellement par couleur de badge
//   level    — maîtrise de 1 (Débutant) à 4 (Expert). Aucun item n'est au
//              niveau 4 depuis l'audit de contenu du 2026-09-25 : « Expert »
//              après 2 à 3 ans d'expérience n'était pas défendable en entretien.
//   years    — années d'expérience (nombre décimal)
//   context  — phrase courte de contexte (EN, traduite en FR ci-dessous)
//   track    — "salesforce" | "itops" | "both"

export type Locale = "en" | "fr" | "es";

export type TechLevel = 1 | 2 | 3 | 4;

export type TechCategory =
  | "salesforce"  // Salesforce platform — cyan
  | "code"        // Programmation — violet
  | "devops"      // CI/CD, pipelines — orange
  | "systems"     // Systèmes, réseaux — emerald
  | "data"        // Base de données, intégrations — amber
  | "tools";      // Outils transverses — slate

export type TechItem = {
  id: string;
  name: string;
  abbr: string;
  category: TechCategory;
  level: TechLevel;
  years: number;
  context: Record<Locale, string>;
  track: "salesforce" | "itops" | "both";
};

// ── Données ────────────────────────────────────────────────────────────────

const TECH_STACK: TechItem[] = [
  // ── Salesforce platform ────────────────────────────────────────────────
  {
    id: "apex",
    name: "Apex",
    abbr: "Ax",
    category: "salesforce",
    level: 3,
    years: 3,
    context: {
      en: "10+ classes, triggers and batch jobs in production.",
      fr: "10+ classes, triggers et batchs en production.",
      es: "Más de 10 clases, triggers y batch jobs en producción.",
    },
    track: "salesforce",
  },
  {
    id: "flow-builder",
    name: "Flow Builder",
    abbr: "FL",
    category: "salesforce",
    level: 3,
    years: 3,
    context: {
      en: "20+ Flows built, reducing manual workload by ~30%.",
      fr: "20+ Flows créés, réduisant la charge manuelle d'environ 30 %.",
      es: "Más de 20 Flows creados, reduciendo la carga manual en cerca de un 30 %.",
    },
    track: "salesforce",
  },
  {
    id: "lwc",
    name: "LWC",
    abbr: "LW",
    category: "salesforce",
    level: 3,
    years: 1.5,
    context: {
      en: "Reusable Lightning Web Components for custom UI.",
      fr: "Composants LWC réutilisables pour interfaces personnalisées.",
      es: "Componentes LWC reutilizables para interfaces personalizadas.",
    },
    track: "salesforce",
  },
  {
    id: "soql",
    name: "SOQL / SOSL",
    abbr: "SQ",
    category: "salesforce",
    level: 3,
    years: 3,
    context: {
      en: "Complex queries, governor limits awareness, optimized reports.",
      fr: "Requêtes complexes, respect des governor limits, rapports optimisés.",
      es: "Consultas complejas, respeto de los governor limits, informes optimizados.",
    },
    track: "salesforce",
  },
  {
    id: "salesforce-cli",
    name: "Salesforce CLI",
    abbr: "SF",
    category: "salesforce",
    level: 3,
    years: 3,
    context: {
      en: "Deployments, scratch orgs, metadata management.",
      fr: "Déploiements, scratch orgs, gestion des métadonnées.",
      es: "Despliegues, scratch orgs, gestión de metadatos.",
    },
    track: "salesforce",
  },

  // ── Programmation ──────────────────────────────────────────────────────
  {
    id: "javascript",
    name: "JavaScript",
    abbr: "JS",
    category: "code",
    level: 3,
    years: 3,
    context: {
      en: "Used for LWC, Next.js and scripting.",
      fr: "Utilisé pour LWC, Next.js et l'automatisation.",
      es: "Usado para LWC, Next.js y automatización.",
    },
    track: "both",
  },
  {
    id: "typescript",
    name: "TypeScript",
    abbr: "TS",
    category: "code",
    level: 3,
    years: 1.5,
    context: {
      en: "Type-safe Next.js application and API routes.",
      fr: "Application Next.js typée et routes API.",
      es: "Aplicación Next.js tipada y rutas API.",
    },
    track: "both",
  },
  {
    id: "java",
    name: "Java",
    abbr: "Jv",
    category: "code",
    level: 2,
    years: 1,
    context: {
      en: "OOP fundamentals, training context.",
      fr: "Fondamentaux POO, contexte formation.",
      es: "Fundamentos POO, contexto de formación.",
    },
    track: "salesforce",
  },
  {
    id: "bash",
    name: "Bash / Shell",
    abbr: "sh",
    category: "code",
    level: 3,
    years: 3,
    context: {
      en: "Automation scripts for system administration tasks.",
      fr: "Scripts d'automatisation pour l'administration systèmes.",
      es: "Scripts de automatización para tareas de administración de sistemas.",
    },
    track: "itops",
  },

  // ── DevOps & CI/CD ─────────────────────────────────────────────────────
  {
    id: "github-actions",
    name: "GitHub Actions",
    abbr: "GA",
    category: "devops",
    level: 3,
    years: 2,
    context: {
      en: "CI pipelines: lint, typecheck, test, build.",
      fr: "Pipelines CI : lint, typecheck, tests, build.",
      es: "Pipelines CI: lint, typecheck, tests, build.",
    },
    track: "both",
  },
  {
    id: "git",
    name: "Git",
    abbr: "Gt",
    category: "devops",
    level: 3,
    years: 3,
    context: {
      en: "Daily use: branching, PRs, conflict resolution.",
      fr: "Usage quotidien : branches, PRs, résolution de conflits.",
      es: "Uso diario: ramas, PRs, resolución de conflictos.",
    },
    track: "both",
  },
  {
    id: "docker",
    name: "Docker",
    abbr: "Dk",
    category: "devops",
    level: 2,
    years: 1.5,
    context: {
      en: "Containerized dev environments and CI images.",
      fr: "Environnements de dev conteneurisés et images CI.",
      es: "Entornos de desarrollo en contenedores e imágenes CI.",
    },
    track: "itops",
  },
  {
    id: "nextjs",
    name: "Next.js",
    abbr: "Nx",
    category: "devops",
    level: 3,
    years: 1,
    context: {
      en: "This portfolio. App Router, SSR, i18n, Supabase.",
      fr: "Ce portfolio. App Router, SSR, i18n, Supabase.",
      es: "Este portfolio. App Router, SSR, i18n, Supabase.",
    },
    track: "salesforce",
  },

  // ── Systèmes & réseaux ─────────────────────────────────────────────────
  {
    id: "linux",
    name: "Linux",
    abbr: "Lx",
    category: "systems",
    level: 3,
    years: 3,
    context: {
      en: "Server admin, scripting, package management.",
      fr: "Admin serveurs, scripting, gestion de paquets.",
      es: "Administración de servidores, scripting, gestión de paquetes.",
    },
    track: "itops",
  },
  {
    id: "windows-server",
    name: "Windows Server",
    abbr: "WS",
    category: "systems",
    level: 3,
    years: 3,
    context: {
      en: "AD DS, DNS, DHCP, GPO — internship at MIDRANGE GROUP.",
      fr: "AD DS, DNS, DHCP, GPO — stage chez MIDRANGE GROUP.",
      es: "AD DS, DNS, DHCP, GPO — prácticas en MIDRANGE GROUP.",
    },
    track: "itops",
  },
  {
    id: "active-directory",
    name: "Active Directory",
    abbr: "AD",
    category: "systems",
    level: 3,
    years: 2,
    context: {
      en: "User management, group policies, LDAP.",
      fr: "Gestion utilisateurs, stratégies de groupe, LDAP.",
      es: "Gestión de usuarios, directivas de grupo, LDAP.",
    },
    track: "itops",
  },
  {
    id: "pfsense",
    name: "pfSense",
    abbr: "pf",
    category: "systems",
    level: 2,
    years: 1,
    context: {
      en: "Firewall, VPN, traffic filtering with Squid.",
      fr: "Pare-feu, VPN, filtrage trafic avec Squid.",
      es: "Firewall, VPN, filtrado de tráfico con Squid.",
    },
    track: "itops",
  },

  // ── Données & intégrations ─────────────────────────────────────────────
  {
    id: "supabase",
    name: "Supabase",
    abbr: "Sb",
    category: "data",
    level: 3,
    years: 1,
    context: {
      en: "PostgreSQL backend: RLS, API routes, real-time.",
      fr: "Backend PostgreSQL : RLS, routes API, temps réel.",
      es: "Backend PostgreSQL: RLS, rutas API, tiempo real.",
    },
    track: "salesforce",
  },
  {
    id: "rest-api",
    name: "REST / SOAP",
    abbr: "API",
    category: "data",
    level: 3,
    years: 2,
    context: {
      en: "Salesforce integrations with external systems.",
      fr: "Intégrations Salesforce avec des systèmes externes.",
      es: "Integraciones Salesforce con sistemas externos.",
    },
    track: "salesforce",
  },
  {
    id: "redis",
    name: "Redis / Upstash",
    abbr: "Re",
    category: "data",
    level: 2,
    years: 1,
    context: {
      en: "Cache layer and rate-limiting on this portfolio.",
      fr: "Cache et rate-limiting sur ce portfolio.",
      es: "Capa de caché y limitación de tasa en este portfolio.",
    },
    track: "salesforce",
  },

  // ── Outils transverses ─────────────────────────────────────────────────
  {
    id: "vscode",
    name: "VS Code",
    abbr: "VS",
    category: "tools",
    level: 3,
    years: 3,
    context: {
      en: "Primary IDE: extensions, debugging, CLI integration.",
      fr: "IDE principal : extensions, débogage, intégration CLI.",
      es: "IDE principal: extensiones, depuración, integración CLI.",
    },
    track: "both",
  },
  {
    id: "datto-rmm",
    name: "Datto RMM",
    abbr: "DR",
    category: "tools",
    level: 2,
    years: 1,
    context: {
      en: "Remote monitoring & management — MIDRANGE GROUP.",
      fr: "Supervision et gestion à distance — MIDRANGE GROUP.",
      es: "Supervisión y gestión remota — MIDRANGE GROUP.",
    },
    track: "itops",
  },
  {
    id: "acronis",
    name: "Acronis",
    abbr: "Ac",
    category: "tools",
    level: 2,
    years: 1,
    context: {
      en: "Backup & disaster recovery configuration.",
      fr: "Configuration sauvegardes et reprise après sinistre.",
      es: "Configuración de copias de seguridad y recuperación ante desastres.",
    },
    track: "itops",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Retourne les technologies à afficher selon le track actif.
 * "both" est inclus dans les deux tracks.
 */
export function getTechStack(track: "salesforce" | "itops"): TechItem[] {
  return TECH_STACK.filter((t) => t.track === track || t.track === "both");
}

/**
 * Labels de niveau selon la locale.
 */
export const LEVEL_LABELS: Record<TechLevel, Record<Locale, string>> = {
  1: { en: "Beginner",     fr: "Débutant",      es: "Principiante" },
  2: { en: "Intermediate", fr: "Intermédiaire", es: "Intermedio"   },
  3: { en: "Advanced",     fr: "Avancé",        es: "Avanzado"     },
  4: { en: "Expert",       fr: "Expert",        es: "Experto"      },
};

/**
 * Couleurs de badge par catégorie (classes Tailwind).
 */
export const CATEGORY_COLORS: Record<TechCategory, {
  bg: string;
  text: string;
  border: string;
}> = {
  salesforce: {
    bg:     "bg-cyan-500/15 dark:bg-cyan-400/10",
    text:   "text-cyan-800 dark:text-cyan-300",
    border: "border-cyan-500/20",
  },
  code: {
    bg:     "bg-violet-500/15 dark:bg-violet-400/10",
    text:   "text-violet-800 dark:text-violet-300",
    border: "border-violet-500/20",
  },
  devops: {
    bg:     "bg-orange-500/15 dark:bg-orange-400/10",
    text:   "text-orange-800 dark:text-orange-300",
    border: "border-orange-500/20",
  },
  systems: {
    bg:     "bg-violet-500/15 dark:bg-violet-400/10",
    text:   "text-violet-800 dark:text-violet-300",
    border: "border-violet-500/20",
  },
  data: {
    bg:     "bg-amber-500/15 dark:bg-amber-400/10",
    text:   "text-amber-800 dark:text-amber-300",
    border: "border-amber-500/20",
  },
  tools: {
    bg:     "bg-slate-500/15 dark:bg-slate-400/10",
    text:   "text-slate-700 dark:text-slate-300",
    border: "border-slate-500/20",
  },
};
