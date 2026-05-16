export type Locale = "en" | "fr";
export type Track = "salesforce" | "itops";

export type ServiceCard = {
  title: string;
  pitch: string;
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
          pitch: "Votre org Salesforce s’est alourdie et vous ne savez plus ce qui freine vos équipes. En 3 à 5 jours, je pose le diagnostic et vous remets un plan d’action concret, priorisé et directement applicable.",
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
          pitch: "Vous avez un besoin métier à automatiser ou une fonctionnalité à livrer dans Salesforce, mais pas les ressources en interne. Je prends en charge la conception, le code et le déploiement — du sandbox à la production.",
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
          pitch: "Vos données sont éparpillées entre Salesforce et d'autres outils, générant des erreurs et de la saisie double. Je connecte vos systèmes et mets en place la supervision pour que tout circule sans friction.",
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
          pitch: "Vos utilisateurs ou admins peinent à tirer parti de Salesforce après le déploiement. Je conçois des formations pratiques et une documentation claire pour que votre équipe soit autonome rapidement.",
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
        pitch: "Vous n’avez pas de visibilité claire sur l’état de votre infrastructure et ignorez quelles vulnérabilités y sommeillent. En quelques jours, je cartographie les risques et vous remets un plan de remédiation hiérarchisé.",
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
        pitch: "Vous devez déployer ou moderniser une infrastructure serveur/réseau sans avoir les ressources disponibles en interne. Je prends en charge l'installation, la configuration et la documentation de A à Z.",
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
        pitch: "Vos déploiements sont manuels, lents et sources d'erreurs — chaque mise en production est une source de stress. Je mets en place un pipeline automatisé qui rend vos livraisons rapides, reproductibles et traçables.",
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
        pitch: "Vos équipes gèrent trop d’incidents récurrents faute de procédures claires et de documentation à jour. Je rédige les runbooks et forme vos équipes pour qu’elles maîtrisent l’exploitation sereinement.",
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
        pitch: "Your Salesforce org has grown complex and you're not sure what's slowing your teams down. In 3 to 5 days, I diagnose the issues and hand you a prioritised, actionable plan.",
        description:
          "Review the org and processes, identify optimization opportunities, and deliver actionable recommendations.",
        bullets: ["Org health check", "Process & workflow optimization", "Security & compliance review"],
        deliverable: "Structured audit report + prioritised action plan",
        duration: "3 to 5 days"
      },
      {
        title: "Development & administration",
        pitch: "You need to automate a process or build a feature in Salesforce but lack the internal capacity. I handle design, code, and deployment — from sandbox to production.",
        description:
          "Design data models, automate business logic, and manage environments from sandbox to production.",
        bullets: ["Custom objects & data models", "Automation with Flows & Apex", "Environment & security configuration"],
        deliverable: "Versioned code (git) + technical documentation + deployment runbook",
        duration: "Scope-dependent — 1 week to 2 months"
      },
      {
        title: "Integrations & APIs",
        pitch: "Your data is scattered across Salesforce and other tools, causing errors and double entry. I connect your systems and set up monitoring so everything flows without friction.",
        description:
          "Connect Salesforce to external systems and keep data consistent across platforms.",
        bullets: ["REST / SOAP integrations", "ETL configuration & data sync", "Monitoring & error handling"],
        deliverable: "Live integration + configuration runbook + monitoring guide",
        duration: "1 to 3 weeks"
      },
      {
        title: "Training & support",
        pitch: "Your users or admins aren't getting the most out of Salesforce after go-live. I design hands-on training and clear documentation so your team becomes self-sufficient quickly.",
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
      pitch: "You lack clear visibility into your infrastructure's health and don't know what vulnerabilities are lurking. In a few days, I map the risks and hand you a prioritised remediation plan.",
      description:
        "Assess and secure your infrastructure: monitoring, hardening, backups and runbooks.",
      bullets: ["Infrastructure health check", "Hardening & security best practices", "Monitoring & alerting", "Runbooks & backup planning"],
      deliverable: "Assessment report + hardening checklist + remediation plan",
      duration: "2 to 4 days"
    },
    {
      title: "Setup & administration",
      pitch: "You need to deploy or modernise a server/network infrastructure but lack the time or in-house skills. I handle installation, configuration, and documentation from start to finish.",
      description:
        "Deploy and manage servers, networks, virtualization and cloud environments on Windows/Linux.",
      bullets: ["Windows & Linux server installation", "Active Directory & network services (DNS, DHCP)", "Virtualization & containerization", "pfSense configuration & security"],
      deliverable: "Operational environment + architecture documentation + runbooks",
      duration: "Scope-dependent — 3 days to 4 weeks"
    },
    {
      title: "CI/CD & DevOps pipelines",
      pitch: "Your deployments are manual, slow, and error-prone — every release is a moment of stress. I set up an automated pipeline that makes your deliveries fast, repeatable, and traceable.",
      description:
        "Implement automated pipelines with solid delivery and versioning practices.",
      bullets: ["CI/CD pipeline design", "Automation with GitHub Actions", "Dockerization & environment provisioning", "Collaboration & version control"],
      deliverable: "Working pipeline + documentation + maintenance guide",
      duration: "1 to 2 weeks"
    },
    {
      title: "Support, training & documentation",
      pitch: "Your team spends too much time on recurring incidents due to unclear procedures and outdated documentation. I write runbooks and train your team so they handle operations with confidence.",
      description:
        "Provide user support, documentation and guidance for operations and incident handling.",
      bullets: ["Training & knowledge transfer", "Runbooks & documentation", "Incident response & troubleshooting"],
      deliverable: "Delivered runbooks + training materials + operations documentation",
      duration: "1 to 2 days per session"
    }
  ];
}
