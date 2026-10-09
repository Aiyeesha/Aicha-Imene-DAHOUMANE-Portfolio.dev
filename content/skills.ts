export type Locale = "en" | "fr" | "es";
export type Track = "salesforce" | "itops";

export type SkillGroup = {
  title: string;
  items: string[];
};

export function getSkillGroups(locale: Locale, track: Track): SkillGroup[] {
  if (locale === "fr") {
    if (track === "salesforce") {
      return [
        {
          title: "Développement & administration Salesforce",
          items: [
            "Apex (triggers, classes, batchs)",
            "Flow Builder & bonnes pratiques d’automatisation",
            "Lightning App Builder & Lightning Web Components",
            "Modélisation de données & sécurité (types d’enregistrement, rôles, profils, permission sets)",
            "Déploiements via Salesforce CLI"
          ]
        },
        {
          title: "Programmation & plateformes",
          items: [
            "JavaScript / TypeScript (projets personnels, dont ce portfolio) · Java (contexte formation)",
            "PostgreSQL · MySQL (intermédiaire) — requêtes, schémas, intégrations Salesforce via Heroku Connect (projet Légarant-AXG)",
            "Heroku (intermédiaire) — déploiement d’applications connectées à Salesforce via Heroku Connect, pipeline staging → production, variables d’environnement (projet Légarant-AXG)",
            "API REST / SOAP — conception et intégration",
            "Tests unitaires & assertions",
            "Git & workflows GitHub",
            "VS Code, développement piloté par la CLI"
          ]
        },
        {
          title: "Systèmes, DevOps & sécurité",
          items: [
            "Administration Windows & Linux",
            "Fondamentaux réseau & supervision",
            "Pipelines CI/CD avec Salesforce CLI & GitHub Actions",
            "Pratiques de sauvegarde et restauration",
            "Culture sécurité (contrôle d’accès, ransomware)"
          ]
        },
        {
          title: "Soft skills & manière de travailler",
          items: [
            "Français (natif), Anglais (C1+), Espagnol (B1), Italien (A1)",
            "Documentation technique claire",
            "Communication active avec des interlocuteurs non techniques",
            "Collaboration à distance (multi-fuseaux horaires)",
            "Apprentissage rapide avec auto-formation structurée",
            "Approche centrée utilisateur pour la collecte de besoins"
          ]
        }
      ];
    }

    // IT Ops
    return [
      {
        title: "Systèmes, DevOps & sécurité",
        items: [
          "Administration Windows & Linux",
          "Fondamentaux réseau & supervision",
          "Sauvegarde / restauration & PRA (bonnes pratiques)",
          "Culture sécurité (contrôle d’accès, ransomware)",
          "Documentation, runbooks & gestion d’incidents"
        ]
      },
      {
        title: "Pipelines & automatisation",
        items: [
          "CI/CD avec GitHub Actions",
          "Automatisation par scripts (approche pragmatique)",
          "Docker & environnements reproductibles (projets personnels)",
          "Supervision & alerting (Datto RMM en stage)",
          "Gestion de versions (Git)"
        ]
      },
      {
        title: "Support & exploitation",
        items: [
          "Support utilisateurs & diagnostic",
          "Standardisation des procédures",
          "Amélioration continue (réduction dette d’exploitation)",
          "Gestion des changements",
          "Communication claire en situation d’incident"
        ]
      },
      {
        title: "Langues & collaboration",
        items: [
          "Français (natif), Anglais (C1+), Espagnol (B1), Italien (A1)",
          "Collaboration à distance",
          "Communication structurée",
          "Autonomie",
          "Transparence & apprentissage continu"
        ]
      }
    ];
  }

  if (locale === "es") {
    if (track === "salesforce") {
      return [
        {
          title: "Desarrollo y administración de Salesforce",
          items: [
            "Apex (triggers, clases, batch jobs)",
            "Flow Builder y buenas prácticas de automatización",
            "Lightning App Builder y Lightning Web Components",
            "Modelado de datos y seguridad (tipos de registro, roles, perfiles, permission sets)",
            "Despliegues vía Salesforce CLI"
          ]
        },
        {
          title: "Programación y plataformas",
          items: [
            "JavaScript / TypeScript (proyectos personales, incluido este portfolio) · Java (contexto de formación)",
            "PostgreSQL · MySQL (intermedio) — consultas, esquemas, integraciones Salesforce vía Heroku Connect (proyecto Légarant-AXG)",
            "Heroku (intermedio) — despliegue de aplicaciones conectadas a Salesforce vía Heroku Connect, pipeline staging → producción, variables de entorno (proyecto Légarant-AXG)",
            "API REST / SOAP — diseño e integración",
            "Pruebas unitarias y aserciones",
            "Git y flujos de trabajo en GitHub",
            "VS Code, desarrollo guiado por CLI"
          ]
        },
        {
          title: "Sistemas, DevOps y seguridad",
          items: [
            "Administración Windows y Linux",
            "Fundamentos de red y supervisión",
            "Pipelines CI/CD con Salesforce CLI y GitHub Actions",
            "Prácticas de copia de seguridad y restauración",
            "Cultura de seguridad (control de accesos, concienciación sobre ransomware)"
          ]
        },
        {
          title: "Soft skills y forma de trabajar",
          items: [
            "Francés (nativo), Inglés (C1+), Español (B1), Italiano (A1)",
            "Documentación técnica clara",
            "Comunicación activa con interlocutores no técnicos",
            "Colaboración remota (múltiples zonas horarias)",
            "Aprendizaje rápido con autoformación estructurada",
            "Enfoque centrado en el usuario para la recopilación de requisitos"
          ]
        }
      ];
    }

    // IT Ops
    return [
      {
        title: "Sistemas, DevOps y seguridad",
        items: [
          "Administración Windows y Linux",
          "Fundamentos de red y supervisión",
          "Copia de seguridad / restauración y DRP (buenas prácticas)",
          "Cultura de seguridad (control de accesos, concienciación sobre ransomware)",
          "Documentación, runbooks y gestión de incidentes"
        ]
      },
      {
        title: "Pipelines y automatización",
        items: [
          "CI/CD con GitHub Actions",
          "Automatización por scripts (enfoque pragmático)",
          "Docker y entornos reproducibles (proyectos personales)",
          "Monitorización y alertas (Datto RMM en prácticas)",
          "Control de versiones (Git)"
        ]
      },
      {
        title: "Soporte y operaciones",
        items: [
          "Soporte a usuarios y diagnóstico",
          "Estandarización de procedimientos",
          "Mejora continua (reducción de deuda operativa)",
          "Gestión de cambios",
          "Comunicación clara en situaciones de incidente"
        ]
      },
      {
        title: "Idiomas y colaboración",
        items: [
          "Francés (nativo), Inglés (C1+), Español (B1), Italiano (A1)",
          "Colaboración remota",
          "Comunicación estructurada",
          "Autonomía",
          "Transparencia y aprendizaje continuo"
        ]
      }
    ];
  }

  // EN
  if (track === "salesforce") {
    return [
      {
        title: "Salesforce development & administration",
        items: [
          "Apex (triggers, classes, batch jobs)",
          "Flow Builder & automation best practices",
          "Lightning App Builder & Lightning Web Components",
          "Data modeling & security (record types, roles, profiles, permission sets)",
          "Deployments via Salesforce CLI"
        ]
      },
      {
        title: "Programming & platforms",
        items: [
          "JavaScript / TypeScript (personal projects, including this portfolio) · Java (training context)",
          "PostgreSQL · MySQL (intermediate) — queries, schemas, Salesforce integrations via Heroku Connect (Légarant-AXG project)",
          "Heroku (intermediate) — Salesforce-connected app deployments via Heroku Connect, staging → production pipeline, environment variables (Légarant-AXG project)",
          "REST / SOAP API design and integration",
          "Unit tests & assertions",
          "Git & GitHub workflows",
          "VS Code, CLI-driven development"
        ]
      },
      {
        title: "Systems, DevOps & security",
        items: [
          "Windows & Linux administration",
          "Networking fundamentals & monitoring",
          "CI/CD pipelines with Salesforce CLI & GitHub Actions",
          "Backup & restore practices",
          "Security culture (access control, ransomware awareness)"
        ]
      },
      {
        title: "Ways of working",
        items: [
          "French (native), English (C1+), Spanish (B1), Italian (A1)",
          "Clear technical documentation",
          "Active communication with non-technical stakeholders",
          "Remote collaboration across time zones",
          "Fast learning with structured self-training",
          "User-centered approach for requirement gathering"
        ]
      }
    ];
  }

  return [
    {
      title: "Systems, DevOps & security",
      items: [
        "Windows & Linux administration",
        "Networking fundamentals & monitoring",
        "Backup/restore & DR best practices",
        "Security culture (access control, ransomware awareness)",
        "Documentation, runbooks & incident handling"
      ]
    },
    {
      title: "Pipelines & automation",
      items: [
        "CI/CD with GitHub Actions",
        "Pragmatic scripting & automation",
        "Docker & reproducible environments (personal projects)",
        "Monitoring & alerting (Datto RMM, internship)",
        "Version control (Git)"
      ]
    },
    {
      title: "Operations & support",
      items: [
        "User support & troubleshooting",
        "Procedure standardization",
        "Continuous improvement (reducing ops debt)",
        "Change management",
        "Clear communication during incidents"
      ]
    },
    {
      title: "Languages & collaboration",
      items: [
        "French (native), English (C1+), Spanish (B1), Italian (A1)",
        "Remote collaboration",
        "Structured communication",
        "Autonomy",
        "Transparency & continuous learning"
      ]
    }
  ];
}
