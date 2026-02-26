export type Locale = "en" | "fr";
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
            "Déploiements via Change Sets & Salesforce CLI"
          ]
        },
        {
          title: "Programmation & plateformes",
          items: [
            "Bases de Java, JavaScript / TypeScript",
            "Concepts d’API REST / SOAP",
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
          "Dockerisation & environnements reproductibles",
          "Monitoring & alerting",
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
          "Français (natif), Anglais (C2), Espagnol (B1), Italien (A1)",
          "Collaboration à distance",
          "Communication structurée",
          "Autonomie",
          "Transparence & apprentissage continu"
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
          "Deployments via Change Sets & Salesforce CLI"
        ]
      },
      {
        title: "Programming & platforms",
        items: [
          "Java, JavaScript / TypeScript fundamentals",
          "REST / SOAP API concepts",
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
        "Docker & reproducible environments",
        "Monitoring & alerting",
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
        "French (native), English (C2), Spanish (B1), Italian (A1)",
        "Remote collaboration",
        "Structured communication",
        "Autonomy",
        "Transparency & continuous learning"
      ]
    }
  ];
}
