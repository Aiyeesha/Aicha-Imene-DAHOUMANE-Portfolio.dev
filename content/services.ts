export type Locale = "en" | "fr" | "es";
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
            "Connecter Salesforce à des systèmes externes et assurer la cohérence des données entre plateformes — avec, si besoin, la supervision infra de ces flux prise en charge par la même personne, sans relais externe.",
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
          "Évaluer et sécuriser l’infrastructure : supervision, hardening, sauvegardes et runbooks — y compris la sécurité des accès API côté Salesforce quand l’infra alimente directement l’org.",
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

  if (locale === "es") {
    if (track === "salesforce") {
      return [
        {
          title: "Auditoría y asesoría Salesforce",
          pitch: "Tu org de Salesforce se ha vuelto compleja y ya no sabes qué está frenando a tus equipos. En 3 a 5 días, hago el diagnóstico y te entrego un plan de acción concreto, priorizado y directamente aplicable.",
          description:
            "Analizar el estado actual, identificar oportunidades de optimización y ofrecer recomendaciones accionables.",
          bullets: [
            "Auditoría de la org y diagnóstico de salud",
            "Optimización de procesos y flujos de trabajo",
            "Revisión de seguridad y cumplimiento"
          ],
          deliverable: "Informe de auditoría estructurado + plan de acción priorizado",
          duration: "3 a 5 días"
        },
        {
          title: "Desarrollo y administración",
          pitch: "Necesitas automatizar un proceso o implementar una funcionalidad en Salesforce, pero no cuentas con los recursos internos. Me encargo del diseño, el código y el despliegue — del sandbox a producción.",
          description:
            "Diseñar el modelo de datos, automatizar la lógica de negocio y gestionar los entornos del sandbox a producción.",
          bullets: [
            "Diseño de objetos personalizados y modelos de datos",
            "Automatización con Flows y Apex",
            "Configuración de entornos y seguridad"
          ],
          deliverable: "Código versionado (git) + documentación técnica + guía de despliegue",
          duration: "Según alcance — de 1 semana a 2 meses"
        },
        {
          title: "Integraciones y APIs",
          pitch: "Tus datos están dispersos entre Salesforce y otras herramientas, generando errores y doble captura. Conecto tus sistemas y configuro la supervisión para que todo fluya sin fricción.",
          description:
            "Conectar Salesforce con sistemas externos y mantener la coherencia de los datos entre plataformas — incluyendo, si es necesario, la supervisión de infraestructura de esos flujos a cargo de la misma persona, sin intermediarios externos.",
          bullets: [
            "Integraciones vía API REST / SOAP",
            "Configuración ETL y sincronización de datos",
            "Supervisión y gestión de errores"
          ],
          deliverable: "Integración operativa + guía de configuración + manual de supervisión",
          duration: "1 a 3 semanas"
        },
        {
          title: "Formación y soporte",
          pitch: "Tus usuarios o administradores no están aprovechando Salesforce al máximo tras la puesta en producción. Diseño formaciones prácticas y documentación clara para que tu equipo gane autonomía rápidamente.",
          description:
            "Acompañar a usuarios y administradores con formación práctica, documentación y soporte posterior al despliegue.",
          bullets: [
            "Formación de usuarios y administradores",
            "Documentación y buenas prácticas",
            "Soporte posterior al despliegue"
          ],
          deliverable: "Material de formación + documentación de usuario + FAQ",
          duration: "1 a 3 días por sesión"
        }
      ];
    }

    // IT Ops / DevOps
    return [
      {
        title: "Auditoría y hardening de infraestructura",
        pitch: "No tienes una visión clara del estado de tu infraestructura y desconoces qué vulnerabilidades podrían estar presentes. En pocos días, mapeo los riesgos y te entrego un plan de remediación priorizado.",
        description:
          "Evaluar y proteger la infraestructura: supervisión, hardening, copias de seguridad y runbooks — incluyendo la seguridad de los accesos API de Salesforce cuando la infraestructura alimenta directamente la org.",
        bullets: [
          "Evaluación de infraestructura y diagnóstico de salud",
          "Hardening y buenas prácticas de seguridad",
          "Implementación de supervisión y alertas",
          "Planificación de runbooks y copias de seguridad"
        ],
        deliverable: "Informe de evaluación + checklist de hardening + plan de remediación",
        duration: "2 a 4 días"
      },
      {
        title: "Implantación y administración",
        pitch: "Necesitas desplegar o modernizar una infraestructura de servidores/red sin contar con los recursos internos disponibles. Me encargo de la instalación, configuración y documentación de principio a fin.",
        description:
          "Desplegar y gestionar servidores, redes, virtualización y entornos cloud en Windows/Linux.",
        bullets: [
          "Instalación de servidores Windows y Linux",
          "Active Directory y servicios de red (DNS, DHCP)",
          "Virtualización y contenedorización",
          "Configuración de pfSense y seguridad"
        ],
        deliverable: "Entorno operativo + documentación de arquitectura + runbooks",
        duration: "Según alcance — de 3 días a 4 semanas"
      },
      {
        title: "Pipelines CI/CD y DevOps",
        pitch: "Tus despliegues son manuales, lentos y propensos a errores — cada puesta en producción es una fuente de estrés. Implemento un pipeline automatizado que hace tus entregas rápidas, reproducibles y trazables.",
        description:
          "Implementar pipelines automatizados con buenas prácticas de entrega y control de versiones.",
        bullets: [
          "Diseño de pipelines CI/CD",
          "Automatización con GitHub Actions",
          "Dockerización y aprovisionamiento de entornos",
          "Colaboración y control de versiones"
        ],
        deliverable: "Pipeline funcional + documentación + guía de mantenimiento",
        duration: "1 a 2 semanas"
      },
      {
        title: "Soporte, formación y documentación",
        pitch: "Tus equipos gestionan demasiados incidentes recurrentes por falta de procedimientos claros y documentación actualizada. Redacto los runbooks y formo a tus equipos para que operen con confianza.",
        description:
          "Brindar soporte a usuarios, documentación y acompañamiento en la operación y gestión de incidentes.",
        bullets: [
          "Formación y transferencia de conocimiento",
          "Runbooks y documentación",
          "Respuesta a incidentes y resolución de problemas"
        ],
        deliverable: "Runbooks entregados + material de formación + documentación operativa",
        duration: "1 a 2 días por sesión"
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
          "Connect Salesforce to external systems and keep data consistent across platforms — with the infra-side monitoring of those flows handled by the same person when needed, no external hand-off.",
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
        "Assess and secure your infrastructure: monitoring, hardening, backups and runbooks — including Salesforce-side API access security when the infra feeds directly into the org.",
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
