export type Locale = "en" | "fr";
export type Track = "salesforce" | "itops";

export type ServiceCard = {
  title: string;
  description: string;
  bullets: string[];
};

export function getServices(locale: Locale, track: Track): ServiceCard[] {
  if (locale === "fr") {
    if (track === "salesforce") {
      return [
        {
          title: "Audit & conseil Salesforce",
          description:
            "Analyser l’existant, identifier les opportunités d’optimisation, et fournir des recommandations actionnables.",
          bullets: [
            "Audit d’org & bilan de santé",
            "Optimisation de processus & workflows",
            "Revue sécurité & conformité"
          ]
        },
        {
          title: "Développement & administration",
          description:
            "Concevoir le modèle de données, automatiser la logique métier et gérer les environnements du sandbox à la production.",
          bullets: [
            "Conception d’objets custom & modèles de données",
            "Automatisation avec Flows & Apex",
            "Configuration des environnements & de la sécurité"
          ]
        },
        {
          title: "Intégrations & APIs",
          description:
            "Connecter Salesforce à des systèmes externes et assurer la cohérence des données entre plateformes.",
          bullets: [
            "Intégration via API REST / SOAP",
            "Configuration ETL & synchronisation de données",
            "Supervision & gestion des erreurs"
          ]
        },
        {
          title: "Formation & support",
          description:
            "Accompagner les utilisateurs et admins avec des formations pratiques, de la documentation et du support post-déploiement.",
          bullets: [
            "Formations utilisateurs & administrateurs",
            "Documentation & bonnes pratiques",
            "Support post-déploiement"
          ]
        }
      ];
    }

    // IT Ops / DevOps
    return [
      {
        title: "Audit & durcissement infra",
        description:
          "Évaluer et sécuriser l’infrastructure : supervision, hardening, sauvegardes et runbooks.",
        bullets: [
          "Évaluation d’infrastructure & bilan de santé",
          "Durcissement & bonnes pratiques de sécurité",
          "Mise en place de supervision & alerting",
          "Planification de runbooks & de sauvegardes"
        ]
      },
      {
        title: "Mise en place & administration",
        description:
          "Déployer et gérer serveurs, réseaux, virtualisation et environnements cloud sous Windows/Linux.",
        bullets: [
          "Installation de serveurs Windows & Linux",
          "Active Directory & services réseau (DNS, DHCP)",
          "Virtualisation & conteneurisation",
          "Configuration pfSense & sécurité"
        ]
      },
      {
        title: "Pipelines CI/CD & DevOps",
        description:
          "Mettre en œuvre des pipelines automatisés avec de bonnes pratiques de livraison et de versioning.",
        bullets: [
          "Conception de pipelines CI/CD",
          "Automatisation avec GitHub Actions",
          "Dockerisation & provisionnement d’environnements",
          "Collaboration & gestion de versions"
        ]
      },
      {
        title: "Support, formation & documentation",
        description:
          "Fournir support utilisateur, documentation, et accompagnement sur l’exploitation et la gestion d’incidents.",
        bullets: [
          "Formation & transfert de connaissances",
          "Runbooks & documentation",
          "Réponse aux incidents & dépannage"
        ]
      }
    ];
  }

  // EN
  if (track === "salesforce") {
    return [
      {
        title: "Salesforce audit & advisory",
        description:
          "Review the org and processes, identify optimization opportunities, and deliver actionable recommendations.",
        bullets: ["Org health check", "Process & workflow optimization", "Security & compliance review"]
      },
      {
        title: "Development & administration",
        description:
          "Design data models, automate business logic, and manage environments from sandbox to production.",
        bullets: ["Custom objects & data models", "Automation with Flows & Apex", "Environment & security configuration"]
      },
      {
        title: "Integrations & APIs",
        description:
          "Connect Salesforce to external systems and keep data consistent across platforms.",
        bullets: ["REST / SOAP integrations", "ETL configuration & data sync", "Monitoring & error handling"]
      },
      {
        title: "Training & support",
        description:
          "Enable users and admins with practical training, clear documentation and post-go-live support.",
        bullets: ["User/admin training", "Documentation & best practices", "Post-deployment support"]
      }
    ];
  }

  return [
    {
      title: "Infra audit & hardening",
      description:
        "Assess and secure your infrastructure: monitoring, hardening, backups and runbooks.",
      bullets: ["Infrastructure health check", "Hardening & security best practices", "Monitoring & alerting", "Runbooks & backup planning"]
    },
    {
      title: "Setup & administration",
      description:
        "Deploy and manage servers, networks, virtualization and cloud environments on Windows/Linux.",
      bullets: ["Windows & Linux server installation", "Active Directory & network services (DNS, DHCP)", "Virtualization & containerization", "pfSense configuration & security"]
    },
    {
      title: "CI/CD & DevOps pipelines",
      description:
        "Implement automated pipelines with solid delivery and versioning practices.",
      bullets: ["CI/CD pipeline design", "Automation with GitHub Actions", "Dockerization & environment provisioning", "Collaboration & version control"]
    },
    {
      title: "Support, training & documentation",
      description:
        "Provide user support, documentation and guidance for operations and incident handling.",
      bullets: ["Training & knowledge transfer", "Runbooks & documentation", "Incident response & troubleshooting"]
    }
  ];
}
