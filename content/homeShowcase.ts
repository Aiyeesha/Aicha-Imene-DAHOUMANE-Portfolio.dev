// content/homeShowcase.ts
// ------------------------
// Les 5 projets phares de l'accueil (Option C, brief §3.3).
//
// Ce fichier ne contient que les données non traduisibles : clé i18n, lien vers
// l'étude de cas, dépôt GitHub public et technologies. Les textes (catégories,
// titre, statut, problème, solution, résultat) vivent dans messages/<locale>.json
// sous `home.projects.items.<key>`, pour qu'aucun texte ne soit codé en dur.
//
// Règle de publication (brief §3.3) : un projet n'apparaît ici que si son dépôt
// GitHub est PUBLIC. Au 18/10/2026, les dépôts vitrines Access Review, SOC
// Detection Lab et Infra Lab ne sont pas visibles sous le compte Aiyeesha : la
// règle de repli s'applique, avec trois projets existants dont le dépôt est
// public (iDEM Connect, CVE Watchlist, Incident Response Tracker). Le projet
// CI/CD sans dépôt est remplacé par le pipeline public de MediCare Solutions.

export type ShowcaseKey = "legarant" | "cicd" | "idem" | "cve" | "irt";

export type ShowcaseProject = {
  /** Clé sous `home.projects.items` dans les fichiers de traduction. */
  key: ShowcaseKey;
  /** Slug de l'étude de cas sur /[locale]/projects/<slug> ; absent = pas d'étude de cas. */
  caseStudySlug?: string;
  /** Dépôt GitHub public (vérifié comme public le 18/10/2026). */
  repoUrl: string;
  /** Lien de preuve complémentaire (ex. fichier de workflow), facultatif. */
  workflowUrl?: string;
  /** Noms de technologies : non traduits (noms de produits). */
  tech: string[];
};

export const homeShowcase: ShowcaseProject[] = [
  {
    key: "legarant",
    caseStudySlug: "legarant-axg-salesforce-deployment",
    repoUrl: "https://github.com/Aiyeesha/legarant-axg-crm-sync",
    tech: ["Apex REST", "Heroku", "Heroku Connect", "PostgreSQL", "Postman"],
  },
  {
    key: "cicd",
    repoUrl: "https://github.com/Aiyeesha/medicare-solutions",
    workflowUrl: "https://github.com/Aiyeesha/medicare-solutions/blob/main/.github/workflows/validate.yml",
    tech: ["GitHub Actions", "Salesforce CLI", "JWT Bearer", "Git"],
  },
  {
    key: "idem",
    caseStudySlug: "idemconnect-apex-backend",
    repoUrl: "https://github.com/Aiyeesha/iDEM-Connect",
    tech: ["Apex", "Batch & Scheduler", "SOQL", "CRUD/FLS"],
  },
  {
    key: "cve",
    caseStudySlug: "cve-watchlist",
    repoUrl: "https://github.com/Aiyeesha/cve-watchlist",
    tech: ["Python", "FastAPI", "React", "TypeScript", "API NVD", "Pytest"],
  },
  {
    key: "irt",
    caseStudySlug: "incident-response-tracker",
    repoUrl: "https://github.com/Aiyeesha/incident-response-tracker",
    tech: ["Python", "FastAPI", "React", "TypeScript", "SQLite", "Pytest"],
  },
];
