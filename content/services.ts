// content/services.ts
// --------------------
// Cartes de la section « Ce que j'apporte à une équipe » de l'accueil
// (ex-section « Services »), une liste par locale et par track.
//
// Réécrites à l'audit de contenu du 2026-09-25 (lot 3, option a) : les cartes
// étaient rédigées comme une offre de prestation adressée à un client
// (« En 3 à 5 jours, je pose le diagnostic… », « pas les ressources en
// interne ? Je prends en charge… », livrable, durée typique). Elles décrivent
// désormais ce que j'apporte à une équipe qui me recrute, où je l'ai
// réellement pratiqué (poste, stage, formation, projets personnels — sans
// sur-déclaration) et où en trouver la preuve dans le portfolio.

export type Locale = "en" | "fr" | "es";
export type Track = "salesforce" | "itops";

export type ServiceCard = {
  /** Domaine de compétence, formulé du point de vue de l'équipe qui recrute. */
  title: string;
  /** Ce que j'apporte, en une ou deux phrases. */
  pitch: string;
  /** Détail technique court. */
  description: string;
  bullets: string[];
  /** Où je l'ai pratiqué : poste, stage, formation ou projets personnels. */
  experience: string;
  /** Où le vérifier dans le portfolio (études de cas, pages du site). */
  proof: string;
};

const CARDS: Record<Locale, Record<Track, ServiceCard[]>> = {
  fr: {
    salesforce: [
      {
        title: "Développement Apex & LWC",
        pitch: "J'écris du code Apex et des composants LWC pensés pour durer : bulk-safe, testés, respectueux des governor limits et du modèle de sécurité.",
        description: "Triggers en pattern handler, classes de service, traitements asynchrones et tests unitaires avec une couverture documentée.",
        bullets: [
          "Triggers & classes de service bulk-safe",
          "Batch Apex, Queueable, Schedulable",
          "Lightning Web Components réutilisables",
          "Tests unitaires & TestDataFactory"
        ],
        experience: "Développeuse Salesforce chez LD Digitales (alternance puis CDI, depuis oct. 2023).",
        proof: "Études de cas iDEM Connect et FASHA (projets du titre RNCP 6)."
      },
      {
        title: "Administration & automatisation",
        pitch: "Je configure l'org et j'automatise les processus métier avec Flow, en gardant la main sur la sécurité : profils, permission sets, partage.",
        description: "Modèle de données, automatisations déclaratives et contrôle des accès, du sandbox à la production.",
        bullets: [
          "Modèle de données & objets custom",
          "Record-Triggered Flows & Screen Flows",
          "Profils, permission sets & règles de partage",
          "Rapports & tableaux de bord"
        ],
        experience: "LD Digitales (alternance puis CDI) ; profil Trailhead Expeditioner.",
        proof: "Études de cas Digit Learning et Tours For Life."
      },
      {
        title: "Intégrations & DevOps Salesforce",
        pitch: "Je relie Salesforce aux autres systèmes et j'outille les mises en production : c'est là que mon parcours infrastructure devient un atout pour l'équipe.",
        description: "API, synchronisation de données et pipeline de déploiement, avec la même personne côté Salesforce et côté infrastructure.",
        bullets: [
          "API REST Apex & Named Credentials",
          "Synchronisation Heroku ↔ Salesforce",
          "CI/CD avec Salesforce CLI & GitHub Actions",
          "Procédures de déploiement et de retour arrière"
        ],
        experience: "LD Digitales ; projet de diplôme Légarant-AXG ; projet personnel de pipeline CI/CD.",
        proof: "Études de cas Légarant-AXG et Pipeline CI/CD."
      },
      {
        title: "Cadrage, documentation & accompagnement",
        pitch: "Je découpe le besoin, je documente ce que je livre et j'accompagne les utilisateurs : l'équipe doit pouvoir maintenir le travail sans moi.",
        description: "User stories chiffrées, spécifications, décisions d'architecture et guides utilisateurs.",
        bullets: [
          "Backlogs & user stories chiffrées",
          "Spécifications techniques & ADR",
          "Guides utilisateurs & support",
          "Passation aux équipes"
        ],
        experience: "LD Digitales ; projets du titre RNCP 6, soutenus devant jury.",
        proof: "Études de cas Avenir Télécom et LTP."
      }
    ],
    itops: [
      {
        title: "Administration systèmes Windows",
        pitch: "J'administre des environnements Windows Server et Active Directory : comptes, GPO, services réseau et parc de postes.",
        description: "Services d'annuaire et réseau, déploiement de postes, virtualisation et filtrage.",
        bullets: [
          "AD DS, DNS, DHCP, GPO",
          "Déploiement de postes (WDS, PXE, Autopilot)",
          "Virtualisation (VMware, VirtualBox)",
          "pfSense & proxy Squid"
        ],
        experience: "Stage chez MIDRANGE GROUP (févr.–mai 2023) ; titres TAI et TSSR (Greta du Val d'Oise).",
        proof: "Études de cas déploiement de postes en masse et lab de virtualisation."
      },
      {
        title: "Supervision, sauvegardes & support",
        pitch: "Je surveille, je trie les alertes et je résous les incidents avec méthode, en documentant chaque intervention.",
        description: "Supervision centralisée, contrôle des sauvegardes et traitement des tickets de support.",
        bullets: [
          "Supervision RMM (Datto RMM)",
          "Sauvegardes Acronis Cyber Protect",
          "Ticketing Autotask & prise en main à distance",
          "Diagnostic & résolution d'incidents"
        ],
        experience: "Stage chez MIDRANGE GROUP (févr.–mai 2023).",
        proof: "Études de cas supervision RMM, sauvegardes Acronis et gestion d'incidents."
      },
      {
        title: "Automatisation & CI/CD",
        pitch: "J'automatise ce qui se répète et je rends les livraisons traçables : scripts, pipelines et contrôles automatiques.",
        description: "Scripts d'administration, intégration continue et gestion de versions.",
        bullets: [
          "PowerShell & scripts d'administration",
          "GitHub Actions",
          "Contrôles qualité et sécurité en CI",
          "Git & gestion de versions"
        ],
        experience: "Projets personnels, dont ce portfolio (Lighthouse, axe et CodeQL en intégration continue).",
        proof: "Étude de cas Pipeline CI/CD ; colophon de ce site."
      },
      {
        title: "Sécurité défensive",
        pitch: "J'aborde la sécurité côté défense : durcissement, triage des vulnérabilités et réponse aux incidents.",
        description: "Réduction de la surface d'attaque, priorisation des correctifs et procédures d'incident.",
        bullets: [
          "Durcissement Windows & Linux",
          "Triage de vulnérabilités (CVSS, KEV)",
          "Playbooks de réponse aux incidents",
          "Labs d'analyse réseau & honeypot"
        ],
        experience: "Labs et projets personnels.",
        proof: "Études de cas CVE Watchlist, Incident Response Tracker et honeypot Cowrie."
      }
    ]
  },

  en: {
    salesforce: [
      {
        title: "Apex & LWC development",
        pitch: "I write Apex code and LWC components built to last: bulk-safe, tested, and respectful of governor limits and the security model.",
        description: "Handler-pattern triggers, service classes, asynchronous processing and unit tests with documented coverage.",
        bullets: [
          "Bulk-safe triggers & service classes",
          "Batch Apex, Queueable, Schedulable",
          "Reusable Lightning Web Components",
          "Unit tests & TestDataFactory"
        ],
        experience: "Salesforce Developer at LD Digitales (work-study, then permanent, since Oct 2023).",
        proof: "iDEM Connect and FASHA case studies (RNCP Level 6 diploma projects)."
      },
      {
        title: "Administration & automation",
        pitch: "I configure the org and automate business processes with Flow, while keeping security under control: profiles, permission sets, sharing.",
        description: "Data model, declarative automation and access control, from sandbox to production.",
        bullets: [
          "Data model & custom objects",
          "Record-Triggered Flows & Screen Flows",
          "Profiles, permission sets & sharing rules",
          "Reports & dashboards"
        ],
        experience: "LD Digitales (work-study, then permanent); Trailhead Expeditioner profile.",
        proof: "Digit Learning and Tours For Life case studies."
      },
      {
        title: "Salesforce integrations & DevOps",
        pitch: "I connect Salesforce to other systems and tool up releases: this is where my infrastructure background becomes an asset for the team.",
        description: "APIs, data synchronization and a deployment pipeline, with the same person on the Salesforce side and the infrastructure side.",
        bullets: [
          "Apex REST APIs & Named Credentials",
          "Heroku ↔ Salesforce synchronization",
          "CI/CD with Salesforce CLI & GitHub Actions",
          "Deployment and rollback procedures"
        ],
        experience: "LD Digitales; Légarant-AXG diploma project; personal CI/CD pipeline project.",
        proof: "Légarant-AXG and CI/CD Pipeline case studies."
      },
      {
        title: "Scoping, documentation & user support",
        pitch: "I break down the need, document what I ship and support users: the team must be able to maintain the work without me.",
        description: "Estimated user stories, specifications, architecture decisions and user guides.",
        bullets: [
          "Backlogs & estimated user stories",
          "Technical specifications & ADRs",
          "User guides & support",
          "Handover to teams"
        ],
        experience: "LD Digitales; RNCP Level 6 diploma projects, defended before a jury.",
        proof: "Avenir Télécom and LTP case studies."
      }
    ],
    itops: [
      {
        title: "Windows systems administration",
        pitch: "I administer Windows Server and Active Directory environments: accounts, GPOs, network services and workstation fleets.",
        description: "Directory and network services, workstation deployment, virtualization and filtering.",
        bullets: [
          "AD DS, DNS, DHCP, GPO",
          "Workstation deployment (WDS, PXE, Autopilot)",
          "Virtualization (VMware, VirtualBox)",
          "pfSense & Squid proxy"
        ],
        experience: "Internship at MIDRANGE GROUP (Feb–May 2023); TAI and TSSR diplomas (Greta du Val d'Oise).",
        proof: "Mass workstation deployment and virtualization lab case studies."
      },
      {
        title: "Monitoring, backups & support",
        pitch: "I monitor, triage alerts and resolve incidents methodically, documenting every intervention.",
        description: "Centralized monitoring, backup checks and support-ticket handling.",
        bullets: [
          "RMM monitoring (Datto RMM)",
          "Acronis Cyber Protect backups",
          "Autotask ticketing & remote support",
          "Incident diagnosis & resolution"
        ],
        experience: "Internship at MIDRANGE GROUP (Feb–May 2023).",
        proof: "RMM monitoring, Acronis backup and incident management case studies."
      },
      {
        title: "Automation & CI/CD",
        pitch: "I automate what repeats and make releases traceable: scripts, pipelines and automated checks.",
        description: "Administration scripts, continuous integration and version control.",
        bullets: [
          "PowerShell & administration scripts",
          "GitHub Actions",
          "Quality and security checks in CI",
          "Git & version control"
        ],
        experience: "Personal projects, including this portfolio (Lighthouse, axe and CodeQL in CI).",
        proof: "CI/CD Pipeline case study; this site's colophon."
      },
      {
        title: "Defensive security",
        pitch: "I approach security from the defensive side: hardening, vulnerability triage and incident response.",
        description: "Attack-surface reduction, patch prioritization and incident procedures.",
        bullets: [
          "Windows & Linux hardening",
          "Vulnerability triage (CVSS, KEV)",
          "Incident response playbooks",
          "Network analysis & honeypot labs"
        ],
        experience: "Personal labs and projects.",
        proof: "CVE Watchlist, Incident Response Tracker and Cowrie honeypot case studies."
      }
    ]
  },

  es: {
    salesforce: [
      {
        title: "Desarrollo Apex y LWC",
        pitch: "Escribo código Apex y componentes LWC pensados para durar: bulk-safe, probados y respetuosos con los governor limits y el modelo de seguridad.",
        description: "Triggers con patrón handler, clases de servicio, procesos asíncronos y pruebas unitarias con cobertura documentada.",
        bullets: [
          "Triggers y clases de servicio bulk-safe",
          "Batch Apex, Queueable, Schedulable",
          "Lightning Web Components reutilizables",
          "Pruebas unitarias y TestDataFactory"
        ],
        experience: "Desarrolladora Salesforce en LD Digitales (formación dual y después contrato indefinido, desde oct. 2023).",
        proof: "Casos de estudio iDEM Connect y FASHA (proyectos del título RNCP nivel 6)."
      },
      {
        title: "Administración y automatización",
        pitch: "Configuro la org y automatizo los procesos de negocio con Flow, manteniendo el control de la seguridad: perfiles, permission sets, compartición.",
        description: "Modelo de datos, automatizaciones declarativas y control de accesos, del sandbox a producción.",
        bullets: [
          "Modelo de datos y objetos personalizados",
          "Record-Triggered Flows y Screen Flows",
          "Perfiles, permission sets y reglas de compartición",
          "Informes y paneles"
        ],
        experience: "LD Digitales (formación dual y después contrato indefinido); perfil Trailhead Expeditioner.",
        proof: "Casos de estudio Digit Learning y Tours For Life."
      },
      {
        title: "Integraciones y DevOps Salesforce",
        pitch: "Conecto Salesforce con otros sistemas y preparo las puestas en producción: ahí es donde mi trayectoria en infraestructura se convierte en una ventaja para el equipo.",
        description: "APIs, sincronización de datos y pipeline de despliegue, con la misma persona en el lado Salesforce y en el lado infraestructura.",
        bullets: [
          "APIs REST Apex y Named Credentials",
          "Sincronización Heroku ↔ Salesforce",
          "CI/CD con Salesforce CLI y GitHub Actions",
          "Procedimientos de despliegue y de vuelta atrás"
        ],
        experience: "LD Digitales; proyecto de titulación Légarant-AXG; proyecto personal de pipeline CI/CD.",
        proof: "Casos de estudio Légarant-AXG y Pipeline CI/CD."
      },
      {
        title: "Análisis, documentación y acompañamiento",
        pitch: "Desgloso la necesidad, documento lo que entrego y acompaño a los usuarios: el equipo debe poder mantener el trabajo sin mí.",
        description: "User stories estimadas, especificaciones, decisiones de arquitectura y guías de usuario.",
        bullets: [
          "Backlogs y user stories estimadas",
          "Especificaciones técnicas y ADR",
          "Guías de usuario y soporte",
          "Traspaso a los equipos"
        ],
        experience: "LD Digitales; proyectos del título RNCP nivel 6, defendidos ante un tribunal.",
        proof: "Casos de estudio Avenir Télécom y LTP."
      }
    ],
    itops: [
      {
        title: "Administración de sistemas Windows",
        pitch: "Administro entornos Windows Server y Active Directory: cuentas, GPO, servicios de red y parque de equipos.",
        description: "Servicios de directorio y de red, despliegue de equipos, virtualización y filtrado.",
        bullets: [
          "AD DS, DNS, DHCP, GPO",
          "Despliegue de equipos (WDS, PXE, Autopilot)",
          "Virtualización (VMware, VirtualBox)",
          "pfSense y proxy Squid"
        ],
        experience: "Prácticas en MIDRANGE GROUP (feb.–may. 2023); títulos TAI y TSSR (Greta du Val d'Oise).",
        proof: "Casos de estudio de despliegue masivo de equipos y laboratorio de virtualización."
      },
      {
        title: "Supervisión, copias de seguridad y soporte",
        pitch: "Superviso, clasifico las alertas y resuelvo las incidencias con método, documentando cada intervención.",
        description: "Supervisión centralizada, control de las copias de seguridad y gestión de tickets de soporte.",
        bullets: [
          "Supervisión RMM (Datto RMM)",
          "Copias de seguridad Acronis Cyber Protect",
          "Ticketing Autotask y asistencia remota",
          "Diagnóstico y resolución de incidencias"
        ],
        experience: "Prácticas en MIDRANGE GROUP (feb.–may. 2023).",
        proof: "Casos de estudio de supervisión RMM, copias de seguridad Acronis y gestión de incidencias."
      },
      {
        title: "Automatización y CI/CD",
        pitch: "Automatizo lo que se repite y hago trazables las entregas: scripts, pipelines y controles automáticos.",
        description: "Scripts de administración, integración continua y control de versiones.",
        bullets: [
          "PowerShell y scripts de administración",
          "GitHub Actions",
          "Controles de calidad y seguridad en CI",
          "Git y control de versiones"
        ],
        experience: "Proyectos personales, incluido este portfolio (Lighthouse, axe y CodeQL en integración continua).",
        proof: "Caso de estudio Pipeline CI/CD; colofón de este sitio."
      },
      {
        title: "Seguridad defensiva",
        pitch: "Abordo la seguridad desde la defensa: bastionado, clasificación de vulnerabilidades y respuesta a incidentes.",
        description: "Reducción de la superficie de ataque, priorización de parches y procedimientos de incidentes.",
        bullets: [
          "Bastionado Windows y Linux",
          "Clasificación de vulnerabilidades (CVSS, KEV)",
          "Playbooks de respuesta a incidentes",
          "Laboratorios de análisis de red y honeypot"
        ],
        experience: "Laboratorios y proyectos personales.",
        proof: "Casos de estudio CVE Watchlist, Incident Response Tracker y honeypot Cowrie."
      }
    ]
  }
};

export function getServices(locale: Locale, track: Track): ServiceCard[] {
  return CARDS[locale][track];
}
