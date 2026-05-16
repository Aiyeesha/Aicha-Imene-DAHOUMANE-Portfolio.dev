export type Locale = "en" | "fr";
export type Track = "salesforce" | "itops";

export type ServiceCard = {
  title: string;
  description: string;
  bullets: string[];
  deliverable: string;
  duration: string;
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
          ],
          deliverable: "Rapport d’audit structuré + plan d’action priorisé",
          duration: "3 à 5 jours"
        },
        {
          title: "Développement & administration",
          description:
            "Concevoir le modèle de données, automatiser la logique métier et gérer les environnements du sandbox à la production.",
          bullets: [
            "Conception d’objets custom & modèles de données",
            "Automatisation avec Flows & Apex",
            "Configuration des environnements & de la sécurité"
          ],
          deliverable: "Code versionné (git) + documentation technique + recette de déploiement",
          duration: "Selon périmètre — 1 semaine à 2 mois"
        },
        {
          title: "Intégrations & APIs",
          description:
            "Connecter Salesforce à des systèmes externes et assurer la cohérence des données entre plateformes.",
          bullets: [
            "Intégration via API REST / SOAP",
            "Configuration ETL & synchronisation de données",
            "Supervision & gestion des erreurs"
          ],
          deliverable: "Intégration opérationnelle + runbook de configuration + guide de supervision",
          duration: "1 à 3 semaines"
        },
        {
          title: "Formation & support",
          description:
            "Accompagner les utilisateurs et admins avec des formations pratiques, de la documentation et du support post-déploiement.",
          bullets: [
            "Formations utilisateurs & administrateurs",
            "Documentation & bonnes pratiques",
            "Support post-déploiement"
          ],
          deliverable: "Support de formation + documentation utilisateur + FAQ",
          duration: "1 à 3 jours par session"
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
        ],
        deliverable: "Rapport d’évaluation + checklist de durcissement + plan de remédiation",
        duration: "2 à 4 jours"
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
        ],
        deliverable: "Environnement opérationnel + documentation d’architecture + runbooks",
        duration: "Selon périmètre — 3 jours à 4 semaines"
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
        ],
        deliverable: "Pipeline fonctionnel + documentation + guide de maintenance",
        duration: "1 à 2 semaines"
      },
      {
        title: "Support, formation & documentation",
        description:
          "Fournir support utilisateur, documentation, et accompagnement sur l’exploitation et la gestion d’incidents.",
        bullets: [
          "Formation & transfert de connaissances",
          "Runbooks & documentation",
          "Réponse aux incidents & dépannage"
        ],
        deliverable: "Runbooks livrés + support de formation + documentation d’exploitation",
        duration: "1 à 2 jours par session"
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
        bullets: ["Org health check", "Process & workflow optimization", "Security & compliance review"],
        deliverable: "Structured audit report + prioritised action plan",
        duration: "3 to 5 days"
      },
      {
        title: "Development & administration",
        description:
          "Design data models, automate business logic, and manage environments from sandbox to production.",
        bullets: ["Custom objects & data models", "Automation with Flows & Apex", "Environment & security configuration"],
        deliverable: "Versioned code (git) + technical documentation + deployment runbook",
        duration: "Scope-dependent — 1 week to 2 months"
      },
      {
        title: "Integrations & APIs",
        description:
          "Connect Salesforce to external systems and keep data consistent across platforms.",
        bullets: ["REST / SOAP integrations", "ETL configuration & data sync", "Monitoring & error handling"],
        deliverable: "Live integration + configuration runbook + monitoring guide",
        duration: "1 to 3 weeks"
      },
      {
        title: "Training & support",
        description:
          "Enable users and admins with practical training, clear documentation and post-go-live support.",
        bullets: ["User/admin training", "Documentation & best practices", "Post-deployment support"],
        deliverable: "Training deck + user documentation + FAQ",
        duration: "1 to 3 days per session"
      }
    ];
  }

  return [
    {
      title: "Infra audit & hardening",
      description:
        "Assess and secure your infrastructure: monitoring, hardening, backups and runbooks.",
      bullets: ["Infrastructure health check", "Hardening & security best practices", "Monitoring & alerting", "Runbooks & backup planning"],
      deliverable: "Assessment report + hardening checklist + remediation plan",
      duration: "2 to 4 days"
    },
    {
      title: "Setup & administration",
      description:
        "Deploy and manage servers, networks, virtualization and cloud environments on Windows/Linux.",
      bullets: ["Windows & Linux server installation", "Active Directory & network services (DNS, DHCP)", "Virtualization & containerization", "pfSense configuration & security"],
      deliverable: "Operational environment + architecture documentation + runbooks",
      duration: "Scope-dependent — 3 days to 4 weeks"
    },
    {
      title: "CI/CD & DevOps pipelines",
      description:
        "Implement automated pipelines with solid delivery and versioning practices.",
      bullets: ["CI/CD pipeline design", "Automation with GitHub Actions", "Dockerization & environment provisioning", "Collaboration & version control"],
      deliverable: "Working pipeline + documentation + maintenance guide",
      duration: "1 to 2 weeks"
    },
    {
      title: "Support, training & documentation",
      description:
        "Provide user support, documentation and guidance for operations and incident handling.",
      bullets: ["Training & knowledge transfer", "Runbooks & documentation", "Incident response & troubleshooting"],
      deliverable: "Delivered runbooks + training materials + operations documentation",
      duration: "1 to 2 days per session"
    }
  ];
}
