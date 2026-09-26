// content/experience.tsx
// ----------------------
// Expériences professionnelles affichées dans la frise « Expérience » de la
// page d'accueil (components/ExperienceTimeline.tsx), de la plus récente à la
// plus ancienne.
//
// Chaque expérience est structurée en champs séparés — poste, entreprise,
// type de contrat, période, lieu — pour composer le titre « Poste · Entreprise »
// et la ligne « Contrat · Période · Lieu ». `note` est une remarque affichée
// en tête des réalisations, en italique atténué.

export type Locale = "en" | "fr" | "es";

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  contract: string;
  period: string;
  location: string;
  /** Remarque facultative, affichée avant les réalisations. */
  note?: string;
  highlights: string[];
};

export function getExperienceItems(locale: Locale): ExperienceItem[] {
  if (locale === "fr") {
    return [
      {
        id: "exp-ld-cdi",
        role: "Développeuse Salesforce",
        company: "LD Digitales",
        contract: "CDI",
        period: "Oct. 2025 — Aujourd’hui",
        location: "Télétravail",
        note: "CDI proposé à l'issue de l'alternance, sans période d'essai.",
        highlights: [
          "Conception et mise en œuvre de solutions Salesforce avancées en collaboration avec les équipes métier.",
          "Optimisation et refactoring du code Apex existant pour améliorer la qualité, la performance et la maintenabilité.",
          "Supervision des bonnes pratiques de développement : CI/CD, revues de code et gestion des performances.",
          "Accompagnement et formation des collègues et apprenants sur les outils et méthodes Salesforce.",
          "Coordination avec les équipes produit et marketing pour aligner les solutions techniques sur les besoins métier.",
        ],
      },
      {
        id: "exp-ld-alt",
        role: "Développeuse Salesforce",
        company: "LD Digitales",
        contract: "Alternance",
        period: "Oct. 2023 — Sept. 2025",
        location: "Télétravail",
        highlights: [
          "Développement et maintenance de 10+ classes Apex et batchs pour automatiser le traitement de données et le reporting.",
          "Création de 20+ Flows pour orchestrer les processus métier, réduisant la charge manuelle d’environ 30 %.",
          "Conception de composants réutilisables via Lightning App Builder et Lightning Web Components.",
          "Mise en place de pratiques CI/CD avec Salesforce CLI et Git, rationalisant les déploiements entre sandboxes.",
          "Support migrations de données (CSV / assistants d’import), avec contrôle qualité et intégrité des données.",
          "Développement d’applications web (Java, JavaScript) en complément des projets Salesforce — intégrations, scripts d’automatisation et interfaces légères.",
          "Administration et requêtage de bases de données relationnelles (PostgreSQL, MySQL) pour les besoins d’intégration et de reporting.",
          "Déploiement et gestion d’applications sur Heroku (pipelines, variables d’environnement, logs de production).",
        ],
      },
      {
        id: "exp-midrange",
        role: "Administratrice systèmes & réseaux junior",
        company: "Midrange Group",
        contract: "Stage",
        period: "Fév. 2023 — Mai 2023",
        location: "France · Présentiel",
        highlights: [
          "Support technique pour 50+ postes de travail et portables sur plusieurs sites.",
          "Installation et maintenance de logiciels (Blancco, Acronis, Datto RMM).",
          "Supervision de l’infrastructure réseau et réponse à des incidents de sécurité, dont des exercices de type ransomware.",
          "Rédaction de procédures et contribution à une base de connaissances sur les incidents récurrents.",
        ],
      },
    ];
  }

  if (locale === "es") {
    return [
      {
        id: "exp-ld-cdi-es",
        role: "Desarrolladora Salesforce",
        company: "LD Digitales",
        contract: "Contrato indefinido",
        period: "Oct. 2025 — Actualidad",
        location: "Remoto",
        note: "Conversión directa desde el contrato de formación en alternancia — sin periodo de prueba.",
        highlights: [
          "Diseño e implementación de soluciones Salesforce avanzadas en estrecha colaboración con las áreas de negocio.",
          "Refactorización del código Apex existente para mejorar la calidad, el rendimiento y la mantenibilidad.",
          "Aplicación de buenas prácticas de ingeniería: CI/CD, revisiones de código y supervisión del rendimiento.",
          "Acompañamiento y formación de compañeros y aprendices en herramientas y metodologías Salesforce.",
          "Coordinación con los equipos de Producto y Marketing para alinear las soluciones técnicas con los objetivos de negocio.",
        ],
      },
      {
        id: "exp-ld-alt-es",
        role: "Desarrolladora Salesforce",
        company: "LD Digitales",
        contract: "Formación en alternancia",
        period: "Oct. 2023 — Sept. 2025",
        location: "Remoto",
        highlights: [
          "Desarrollo y mantenimiento de más de 10 clases Apex y batch jobs para automatizar el procesamiento de datos y los informes.",
          "Creación de más de 20 Flows para orquestar procesos de negocio, reduciendo la carga manual en cerca de un 30 %.",
          "Diseño de componentes reutilizables con Lightning App Builder y Lightning Web Components.",
          "Implementación de prácticas CI/CD con Salesforce CLI y Git, agilizando los despliegues entre sandboxes.",
          "Soporte en migraciones de datos (CSV / asistentes de importación), con control de calidad e integridad de los datos.",
          "Desarrollo de funcionalidades web (Java, JavaScript) junto a los proyectos Salesforce — integraciones, scripts de automatización e interfaces ligeras.",
          "Administración y consultas de bases de datos relacionales (PostgreSQL, MySQL) para necesidades de integración e informes.",
          "Despliegue y gestión de aplicaciones en Heroku (pipelines, variables de entorno, logs de producción).",
        ],
      },
      {
        id: "exp-midrange-es",
        role: "Administradora júnior de sistemas y redes",
        company: "Midrange Group",
        contract: "Prácticas",
        period: "Feb. 2023 — May. 2023",
        location: "Francia · Presencial",
        highlights: [
          "Soporte técnico para más de 50 puestos de trabajo y portátiles en varias sedes.",
          "Instalación y mantenimiento de software (Blancco, Acronis, Datto RMM).",
          "Supervisión de la infraestructura de red y respuesta a incidentes de seguridad, incluidos simulacros de tipo ransomware.",
          "Redacción de procedimientos y contribución a una base de conocimiento sobre incidentes recurrentes.",
        ],
      },
    ];
  }

  // EN
  return [
    {
      id: "exp-ld-ft",
      role: "Salesforce Developer",
      company: "LD Digitales",
      contract: "Full-time",
      period: "Oct 2025 — Present",
      location: "Remote",
      note: "Direct conversion from apprenticeship — no probation period.",
      highlights: [
        "Designed and delivered advanced Salesforce solutions in close collaboration with business stakeholders.",
        "Refactored existing Apex codebases to improve quality, performance and maintainability.",
        "Enforced engineering best practices: CI/CD, code reviews, and performance monitoring.",
        "Coached teammates and learners on Salesforce tooling and methods.",
        "Coordinated with Product and Marketing to align technical delivery with business goals.",
      ],
    },
    {
      id: "exp-ld-apprenticeship",
      role: "Salesforce Developer",
      company: "LD Digitales",
      contract: "Apprenticeship",
      period: "Oct 2023 — Sep 2025",
      location: "Remote",
      highlights: [
        "Built and maintained 10+ Apex classes and batch jobs to automate data processing and reporting.",
        "Created 20+ Flows to orchestrate business processes, reducing manual workload by ~30%.",
        "Delivered reusable UI components with Lightning App Builder and Lightning Web Components.",
        "Implemented CI/CD practices with Salesforce CLI and Git to streamline deployments across sandboxes.",
        "Supported data migrations (CSV/import tools) with strong focus on quality and integrity.",
        "Built web application features in Java and JavaScript alongside Salesforce work — integrations, automation scripts, and lightweight interfaces.",
        "Queried and administered relational databases (PostgreSQL, MySQL) for integration and reporting needs.",
        "Deployed and managed applications on Heroku (pipelines, environment variables, production logs).",
      ],
    },
    {
      id: "exp-midrange-intern",
      role: "Junior Systems & Network Administrator",
      company: "Midrange Group",
      contract: "Intern",
      period: "Feb 2023 — May 2023",
      location: "France · On-site",
      highlights: [
        "Provided support for 50+ workstations/laptops across multiple sites.",
        "Installed and maintained software using tools like Blancco, Acronis and Datto RMM.",
        "Monitored network infrastructure and responded to security incidents, including ransomware drills.",
        "Wrote procedures and contributed to a knowledge base for recurring incidents.",
      ],
    },
  ];
}
