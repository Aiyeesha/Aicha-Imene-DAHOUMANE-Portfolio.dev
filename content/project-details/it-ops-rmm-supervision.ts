// content/project-details/it-ops-rmm-supervision.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-rmm-supervision",
  "gallery": [
    {
      "alt": "RMM Supervision — vue principale",
      "src": "/projects/it-ops-rmm-supervision/2023-05-16%2016_44_15-.webp"
    },
    {
      "alt": "RMM Supervision — vue 2",
      "src": "/projects/it-ops-rmm-supervision/2023-05-16%2016_52_39-.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/it-ops-rmm-supervision/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/it-ops-rmm-supervision/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/it-ops-rmm-supervision/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/it-ops-rmm-supervision/screenshot-5.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Infrastructure Monitoring with Datto RMM",
      "heroSubtitle": "Daily Datto RMM monitoring triage across 550+ client endpoints at MIDRANGE Group: alerts, antivirus coverage and Splashtop remote access.",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "At MIDRANGE Group, a managed service provider (MSP) based in the Île-de-France region, I worked within the Exploitation team alongside the team's systems & network administrator. The technical floor was split into two units: Technical Support (handling client calls, ticket creation, and L1/L2 resolution) and Exploitation (server maintenance, security, and L2/L3 escalation support). My role in Exploitation gave me direct hands-on access to the company's RMM platform."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Distinguishing a genuine problem from background noise across 550+ endpoints spread over multiple client sites, all monitored remotely, requires a consistent daily triage method, not just a glance at the dashboard.",
            "Antivirus coverage gaps only became visible by cross-referencing the Default Dashboard's aggregate counts against the software inventory of individual devices — no single view surfaced both at once.",
            "A Quick Job has to be scoped to the exact device group that needs the fix; pushing MalwareBytes fleet-wide when only a handful of machines were missing it would have wasted bandwidth and cluttered the job history for the whole team.",
            "Splashtop sessions depend on the end user being present to grant access in real time, so remote troubleshooting has to work around whoever is actually at the keyboard, not around an ideal maintenance window.",
            "Datto RMM policies and Quick Job templates are owned at the Exploitation team level, shared across the MSP's full client base — every fix had to work within that existing framework rather than introducing a one-off exception for a single device or site."
          ],
          "title": "Technical challenges"
        },
        {
          "type": "text",
          "title": "Platform: Datto RMM",
          "paragraphs": [
            "Datto RMM (Remote Monitoring and Management) is an enterprise-grade platform designed for MSPs and IT teams to remotely monitor and manage endpoints, networks, and systems at scale. I used its core capabilities day to day: real-time device health monitoring, automated patch management, software inventory, remote access, security status tracking, and job automation via Quick Jobs and policies."
          ]
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Devices monitored",
              "value": "550+ endpoints (desktops, laptops, servers) monitored remotely across multiple client sites"
            },
            {
              "label": "Reference site",
              "value": "MID-S0A (MIDRANGE Group internal site)"
            },
            {
              "label": "Agent version",
              "value": "4.4.2195.2195"
            },
            {
              "label": "Remote access tool",
              "value": "Splashtop (integrated into Datto RMM)"
            },
            {
              "label": "Antivirus",
              "value": "Webroot SecureAnywhere Endpoint / MalwareBytes"
            }
          ],
          "title": "Platform Details"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Step 1 — Morning fleet review",
              "description": "Each day started with the Default Dashboard: offline device count by type, antivirus coverage across all client sites, and any new alerts raised overnight by the Datto RMM agents."
            },
            {
              "title": "Step 2 — Device-level triage",
              "description": "For any site or device flagged during the morning review, I opened the individual device profile to check hardware specs, OS version, patch status, and software inventory before deciding on an action."
            },
            {
              "title": "Step 3 — Remote remediation via Quick Job",
              "description": "When a device was missing MalwareBytes or another required agent, I launched a Quick Job scoped to that device (or a small group) to deploy it remotely — no physical access, no user interruption."
            },
            {
              "title": "Step 4 — End-user support via Splashtop",
              "description": "For issues that needed hands-on troubleshooting, I connected to the affected machine via Splashtop with the user's consent, working side by side with Théo on the more complex incidents."
            }
          ],
          "title": "How I worked — day to day"
        },
        {
          "type": "text",
          "title": "Remote Access: Splashtop",
          "paragraphs": [
            "Splashtop is integrated natively into Datto RMM and provides secure remote desktop access to managed endpoints. I used it for: remote technical support for end users (viewing and controlling the client's screen to resolve issues without physical presence); server management tasks (accessing and checking server configurations remotely); and collaborative troubleshooting alongside Théo on complex incidents affecting client infrastructure."
          ]
        },
        {
          "body": "Antivirus coverage extended across the full monitored fleet (550+ devices), with remote deployment requiring zero on-site travel.",
          "type": "text",
          "title": "Impact"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Fleet visibility",
              "value": "Real-time monitoring of 550+ devices with health, patch, and antivirus status at a glance"
            },
            {
              "label": "Remote deployment",
              "value": "MalwareBytes deployed to unprotected endpoints via Quick Jobs — zero on-site travel"
            },
            {
              "label": "Remote support",
              "value": "End-user issues resolved via Splashtop without physical intervention"
            },
            {
              "label": "MSP operations",
              "value": "Direct operational view of MSP work: multi-client management, SLA-driven support, tiered escalation"
            },
            {
              "label": "Skills",
              "value": "Datto RMM, remote monitoring, patch management, endpoint security, Splashtop, MSP workflows"
            }
          ],
          "title": "Outcomes"
        },
        {
          "type": "bullets",
          "items": [
            "Cross-check the dashboard's aggregate numbers against individual device profiles before declaring a fleet healthy — summary counts hide per-device patch or software drift.",
            "Scope every Quick Job to the smallest device group that solves the problem; a fleet-wide push when only a few machines need it adds noise without adding value.",
            "Explain what you're about to do before taking remote control via Splashtop — a short heads-up to the user avoids confusion mid-session and builds trust.",
            "Log every intervention, even a routine Quick Job — in an MSP, the audit trail in the job history matters as much as the fix itself.",
            "Escalate ambiguous cases early instead of guessing — triaging fast and handing a complex case to the right specialist beats improvising a fix under uncertainty."
          ],
          "title": "Best Practices"
        },
        {
          "type": "bullets",
          "items": [
            "Monitoring policies and Quick Job templates were owned at the Exploitation team level, not by any single operator — day-to-day execution (dashboard checks, Quick Jobs, remote sessions) was mine, while policy design belonged to the team lead, the same division of responsibility used across the MSP's client base.",
            "Antivirus coverage gaps were closed reactively, once flagged on the dashboard, rather than through a proactive compliance policy that would auto-remediate — that policy-level fix was outside the internship's scope.",
            "Splashtop support assumes the device is online and a user is present to grant access; offline machines or unattended desks had to wait for the next Quick Job window instead of an immediate session.",
            "RMM-only interventions were tracked through Datto RMM's own job history rather than logged as separate Autotask tickets — that ticketing trail applied to the Support Technique-side incidents, not to routine Exploitation tasks."
          ],
          "title": "Known Limitations & Decisions"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://www.datto.com/products/rmm",
              "label": "Datto RMM — Remote Monitoring & Management"
            },
            {
              "href": "https://www.splashtop.com/",
              "label": "Splashtop — Remote access"
            },
            {
              "href": "https://www.malwarebytes.com/business",
              "label": "Malwarebytes for Business"
            }
          ],
          "title": "Tools & references"
        }
      ]
    },
    "fr": {
      "title": "Supervision d'infrastructure avec Datto RMM",
      "heroSubtitle": "Triage quotidien de la supervision Datto RMM sur plus de 550 postes clients chez MIDRANGE Group : alertes, couverture antivirus et accès distant Splashtop.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Chez MIDRANGE Group, ESN/MSP basée en Île-de-France, j'intervenais au sein de l'équipe Exploitation aux côtés de l'administrateur systèmes & réseaux de l'équipe. Le plateau technique de l'entreprise se divise en deux pôles : Support Technique (gestion des appels clients, création de tickets, résolution N1/N2) et Exploitation (maintenance des serveurs, sécurité, renfort N2/N3). Mon rôle en Exploitation me donnait un accès opérationnel direct à la plateforme RMM de l'entreprise."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Distinguer un problème réel du bruit de fond sur 550+ postes répartis sur plusieurs sites clients, tous supervisés à distance, exige une méthode de triage quotidienne cohérente, pas juste un coup d'œil au tableau de bord.",
            "Les écarts de couverture antivirus n'apparaissaient qu'en croisant les compteurs agrégés du Default Dashboard avec l'inventaire logiciel de chaque poste — aucune vue unique ne réunissait les deux.",
            "Un Quick Job doit être ciblé précisément sur le groupe d'appareils concerné : déployer MalwareBytes sur l'ensemble du parc alors que seule une poignée de postes en avait besoin aurait gaspillé de la bande passante et pollué l'historique des tâches pour toute l'équipe.",
            "Les sessions Splashtop dépendent de la présence de l'utilisateur pour autoriser l'accès en temps réel : le dépannage à distance doit s'adapter à qui est réellement devant le poste, pas à une fenêtre de maintenance idéale.",
            "Les politiques Datto RMM et les modèles de Quick Job sont détenus au niveau de l'équipe Exploitation, partagés sur l'ensemble du portefeuille clients du MSP — chaque correction devait s'inscrire dans ce cadre existant plutôt que d'introduire une exception ponctuelle pour un seul appareil ou site."
          ],
          "title": "Défis techniques"
        },
        {
          "type": "text",
          "title": "Plateforme : Datto RMM",
          "paragraphs": [
            "Datto RMM (Remote Monitoring and Management) est une plateforme professionnelle conçue pour les MSP et les équipes IT afin de surveiller et gérer à distance les équipements, réseaux et systèmes à grande échelle. J'en exploitais au quotidien les fonctionnalités principales : surveillance en temps réel de la santé des équipements, gestion automatisée des correctifs, inventaire logiciel, accès à distance, suivi de l'état de sécurité et automatisation des tâches via Quick Jobs et politiques."
          ]
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Équipements supervisés",
              "value": "550+ postes (desktops, laptops, serveurs) supervisés à distance sur plusieurs sites clients"
            },
            {
              "label": "Site de référence",
              "value": "MID-S0A (site interne MIDRANGE Group)"
            },
            {
              "label": "Version agent",
              "value": "4.4.2195.2195"
            },
            {
              "label": "Outil d'accès distant",
              "value": "Splashtop (intégré à Datto RMM)"
            },
            {
              "label": "Antivirus",
              "value": "Webroot SecureAnywhere Endpoint / MalwareBytes"
            }
          ],
          "title": "Détails de la plateforme"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Étape 1 — Revue matinale du parc",
              "description": "Chaque journée commençait par le Default Dashboard : nombre d'appareils hors ligne par type, couverture antivirus sur l'ensemble des sites clients, et nouvelles alertes levées pendant la nuit par les agents Datto RMM."
            },
            {
              "title": "Étape 2 — Triage au niveau du poste",
              "description": "Pour tout site ou appareil signalé lors de la revue matinale, j'ouvrais la fiche de l'appareil pour vérifier les caractéristiques matérielles, la version de l'OS, le statut des correctifs et l'inventaire logiciel avant de décider d'une action."
            },
            {
              "title": "Étape 3 — Remédiation à distance via Quick Job",
              "description": "Quand un poste n'avait pas MalwareBytes ou un autre agent requis, je lançais un Quick Job ciblé sur cet appareil (ou un petit groupe) pour le déployer à distance — sans accès physique, sans interruption pour l'utilisateur."
            },
            {
              "title": "Étape 4 — Support utilisateur via Splashtop",
              "description": "Pour les incidents nécessitant une intervention manuelle, je me connectais au poste concerné via Splashtop avec l'accord de l'utilisateur, en binôme avec Théo sur les cas les plus complexes."
            }
          ],
          "title": "Mon quotidien — étape par étape"
        },
        {
          "type": "text",
          "title": "Accès distant : Splashtop",
          "paragraphs": [
            "Splashtop est intégré nativement à Datto RMM et fournit un accès bureau à distance sécurisé aux équipements gérés. Je l'utilisais pour : le support technique à distance aux utilisateurs finaux (visualisation et contrôle du poste client pour résoudre les incidents sans déplacement) ; la gestion à distance des serveurs (accès et vérification des configurations) ; et le dépannage collaboratif avec Théo sur des incidents complexes affectant l'infrastructure clients."
          ]
        },
        {
          "body": "Couverture antivirus étendue à l'ensemble du parc supervisé (550+ postes), avec un déploiement à distance ne nécessitant aucun déplacement sur site.",
          "type": "text",
          "title": "Impact"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Visibilité parc",
              "value": "Supervision en temps réel de 550+ équipements avec état de santé, correctifs et antivirus en un coup d'œil"
            },
            {
              "label": "Déploiement distant",
              "value": "MalwareBytes déployé sur les postes non protégés via Quick Jobs — zéro déplacement sur site"
            },
            {
              "label": "Support à distance",
              "value": "Incidents utilisateurs résolus via Splashtop sans intervention physique"
            },
            {
              "label": "Contexte MSP",
              "value": "Vision opérationnelle directe d'un MSP : gestion multi-clients, support orienté SLA, escalade en niveaux"
            },
            {
              "label": "Compétences",
              "value": "Datto RMM, supervision à distance, gestion des patchs, sécurité endpoint, Splashtop, workflows MSP"
            }
          ],
          "title": "Résultats"
        },
        {
          "type": "bullets",
          "items": [
            "Toujours croiser les compteurs agrégés du tableau de bord avec les fiches individuelles avant de déclarer un parc « sain » — les totaux masquent les écarts de correctifs ou de logiciels poste par poste.",
            "Cibler chaque Quick Job sur le plus petit groupe d'appareils qui résout le problème ; un déploiement à l'échelle du parc quand seuls quelques postes sont concernés ajoute du bruit sans valeur ajoutée.",
            "Expliquer ce qu'on s'apprête à faire avant de prendre la main via Splashtop — un court message à l'utilisateur évite la confusion en cours de session et instaure la confiance.",
            "Journaliser chaque intervention, même un Quick Job de routine — dans un MSP, la traçabilité dans l'historique des tâches compte autant que la correction elle-même.",
            "Escalader tôt les cas ambigus plutôt que de deviner — trier vite et transmettre un cas complexe au bon spécialiste vaut toujours mieux qu'improviser une correction dans l'incertitude."
          ],
          "title": "Bonnes pratiques"
        },
        {
          "type": "bullets",
          "items": [
            "Les politiques de supervision et les modèles de Quick Job étaient détenus au niveau de l'équipe Exploitation, pas par un opérateur isolé — l'exécution quotidienne (contrôles du tableau de bord, Quick Jobs, sessions à distance) m'incombait, tandis que la conception des politiques relevait du responsable d'équipe, la même répartition des responsabilités appliquée sur l'ensemble du portefeuille clients du MSP.",
            "Les écarts de couverture antivirus étaient corrigés de façon réactive, une fois signalés sur le tableau de bord, plutôt que via une politique de conformité proactive avec remédiation automatique — cette correction au niveau politique sortait du périmètre du stage.",
            "Le support via Splashtop suppose que le poste est en ligne et qu'un utilisateur est présent pour autoriser l'accès ; les postes hors ligne ou inoccupés devaient attendre la prochaine fenêtre de Quick Job plutôt qu'une session immédiate.",
            "Les interventions purement RMM étaient tracées dans l'historique des tâches de Datto RMM plutôt que consignées comme tickets Autotask séparés — cette traçabilité par ticket s'appliquait aux incidents côté Support Technique, pas aux tâches courantes d'Exploitation."
          ],
          "title": "Limites connues & décisions"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://www.datto.com/fr/products/rmm",
              "label": "Datto RMM — Supervision et gestion à distance"
            },
            {
              "href": "https://www.splashtop.com/fr",
              "label": "Splashtop — Accès à distance"
            },
            {
              "href": "https://www.malwarebytes.com/business",
              "label": "Malwarebytes for Business"
            }
          ],
          "title": "Outils & références"
        }
      ]
    },
    "es": {
      "title": "Supervisión de infraestructura con Datto RMM",
      "heroSubtitle": "Triaje diario de la supervisión Datto RMM en más de 550 equipos de clientes en MIDRANGE Group: alertas, cobertura antivirus y acceso remoto Splashtop.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "En MIDRANGE Group, proveedor de servicios gestionados (MSP) ubicado en la región de Île-de-France, trabajaba dentro del equipo de Explotación junto al administrador de sistemas y redes del equipo. El área técnica se dividía en dos unidades: Soporte Técnico (gestión de llamadas de clientes, creación de tickets y resolución N1/N2) y Explotación (mantenimiento de servidores, seguridad y refuerzo N2/N3). Mi rol en Explotación me daba acceso operativo directo a la plataforma RMM de la empresa."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Distinguir un problema real del ruido de fondo en más de 550 equipos repartidos en varios sitios de clientes, todos supervisados en remoto, exige un método de triaje diario coherente, no solo un vistazo al panel.",
            "Las brechas de cobertura antivirus solo se hacían visibles cruzando los recuentos agregados del Default Dashboard con el inventario de software de cada equipo — ninguna vista única mostraba ambos a la vez.",
            "Un Quick Job debe acotarse exactamente al grupo de equipos que lo necesita; desplegar MalwareBytes en todo el parque cuando solo unos pocos equipos carecían de él habría desperdiciado ancho de banda y saturado el historial de tareas de todo el equipo.",
            "Las sesiones de Splashtop dependen de que el usuario esté presente para autorizar el acceso en tiempo real, así que la resolución remota debe adaptarse a quién está realmente frente al equipo, no a una ventana de mantenimiento ideal.",
            "Las políticas de Datto RMM y las plantillas de Quick Job pertenecen al equipo de Explotación, compartidas en toda la cartera de clientes del MSP — cada corrección debía encajar en ese marco existente en lugar de introducir una excepción puntual para un solo equipo o sitio."
          ],
          "title": "Retos técnicos"
        },
        {
          "type": "text",
          "title": "Plataforma: Datto RMM",
          "paragraphs": [
            "Datto RMM (Remote Monitoring and Management) es una plataforma de nivel empresarial diseñada para que los MSP y equipos de IT supervisen y gestionen de forma remota equipos, redes y sistemas a gran escala. Utilizaba a diario sus capacidades principales: supervisión en tiempo real del estado de los equipos, gestión automatizada de parches, inventario de software, acceso remoto, seguimiento del estado de seguridad y automatización de tareas mediante Quick Jobs y políticas."
          ]
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Equipos supervisados",
              "value": "550+ dispositivos (desktops, laptops, servidores) supervisados en remoto en varios sitios de clientes"
            },
            {
              "label": "Sitio de referencia",
              "value": "MID-S0A (sitio interno de MIDRANGE Group)"
            },
            {
              "label": "Versión del agente",
              "value": "4.4.2195.2195"
            },
            {
              "label": "Herramienta de acceso remoto",
              "value": "Splashtop (integrado en Datto RMM)"
            },
            {
              "label": "Antivirus",
              "value": "Webroot SecureAnywhere Endpoint / MalwareBytes"
            }
          ],
          "title": "Detalles de la plataforma"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Paso 1 — Revisión matinal del parque",
              "description": "Cada jornada comenzaba con el Default Dashboard: número de equipos fuera de línea por tipo, cobertura antivirus en todos los sitios de clientes y nuevas alertas generadas durante la noche por los agentes de Datto RMM."
            },
            {
              "title": "Paso 2 — Triaje a nivel de equipo",
              "description": "Para cualquier sitio o equipo señalado en la revisión matinal, abría la ficha del dispositivo para comprobar las características de hardware, la versión del sistema operativo, el estado de los parches y el inventario de software antes de decidir una acción."
            },
            {
              "title": "Paso 3 — Corrección remota vía Quick Job",
              "description": "Cuando a un equipo le faltaba MalwareBytes u otro agente requerido, lanzaba un Quick Job dirigido a ese dispositivo (o a un pequeño grupo) para desplegarlo de forma remota, sin acceso físico ni interrupción para el usuario."
            },
            {
              "title": "Paso 4 — Soporte al usuario vía Splashtop",
              "description": "Para las incidencias que requerían intervención manual, me conectaba al equipo afectado vía Splashtop con el consentimiento del usuario, trabajando junto a Théo en los casos más complejos."
            }
          ],
          "title": "Mi día a día — paso a paso"
        },
        {
          "type": "text",
          "title": "Acceso remoto: Splashtop",
          "paragraphs": [
            "Splashtop está integrado de forma nativa en Datto RMM y ofrece acceso de escritorio remoto seguro a los equipos gestionados. Lo utilizaba para: soporte técnico remoto a usuarios finales (ver y controlar la pantalla del cliente para resolver incidencias sin presencia física); tareas de gestión de servidores (acceso y verificación remota de configuraciones); y resolución de incidencias colaborativa junto a Théo en incidentes complejos que afectaban a la infraestructura de los clientes."
          ]
        },
        {
          "body": "Cobertura antivirus ampliada a todo el parque supervisado (550+ equipos), con despliegue remoto sin necesidad de desplazamientos.",
          "type": "text",
          "title": "Impacto"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Visibilidad del parque",
              "value": "Supervisión en tiempo real de 550+ equipos con estado de salud, parches y antivirus de un vistazo"
            },
            {
              "label": "Despliegue remoto",
              "value": "MalwareBytes desplegado en equipos desprotegidos vía Quick Jobs — cero desplazamientos in situ"
            },
            {
              "label": "Soporte remoto",
              "value": "Incidencias de usuario resueltas vía Splashtop sin intervención física"
            },
            {
              "label": "Exposición MSP",
              "value": "Visión operativa directa de un MSP: gestión multi-cliente, soporte orientado a SLA, escalado por niveles"
            },
            {
              "label": "Competencias",
              "value": "Datto RMM, supervisión remota, gestión de parches, seguridad de endpoints, Splashtop, flujos de trabajo MSP"
            }
          ],
          "title": "Resultados"
        },
        {
          "type": "bullets",
          "items": [
            "Cruzar siempre los recuentos agregados del panel con las fichas individuales antes de declarar un parque «sano» — los totales ocultan desviaciones de parches o software equipo por equipo.",
            "Acotar cada Quick Job al grupo de equipos más pequeño que resuelve el problema; un despliegue a todo el parque cuando solo unos pocos equipos lo necesitan añade ruido sin aportar valor.",
            "Explicar lo que se va a hacer antes de tomar el control remoto vía Splashtop — un breve aviso al usuario evita confusión durante la sesión y genera confianza.",
            "Registrar cada intervención, incluso un Quick Job rutinario — en un MSP, la trazabilidad en el historial de tareas importa tanto como la propia corrección.",
            "Escalar pronto los casos ambiguos en lugar de adivinar — triar rápido y derivar un caso complejo al especialista adecuado siempre vale más que improvisar una solución con incertidumbre."
          ],
          "title": "Buenas prácticas"
        },
        {
          "type": "bullets",
          "items": [
            "Las políticas de supervisión y las plantillas de Quick Job pertenecían al equipo de Explotación, no a un operador individual — la ejecución diaria (revisiones del panel, Quick Jobs, sesiones remotas) era responsabilidad mía, mientras que el diseño de políticas correspondía al responsable del equipo, el mismo reparto de responsabilidades aplicado en toda la cartera de clientes del MSP.",
            "Las brechas de cobertura antivirus se corregían de forma reactiva, una vez señaladas en el panel, en lugar de mediante una política de cumplimiento proactiva con remediación automática — esa corrección a nivel de política quedaba fuera del alcance de las prácticas.",
            "El soporte vía Splashtop asume que el equipo está en línea y que un usuario está presente para autorizar el acceso; los equipos fuera de línea o sin nadie delante debían esperar a la siguiente ventana de Quick Job en lugar de una sesión inmediata.",
            "Las intervenciones puramente de RMM se registraban en el historial de tareas de Datto RMM y no como tickets independientes en Autotask — esa trazabilidad por ticket se aplicaba a las incidencias del lado de Soporte Técnico, no a las tareas rutinarias de Explotación."
          ],
          "title": "Límites conocidos y decisiones"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://www.datto.com/products/rmm",
              "label": "Datto RMM — Supervisión y gestión remota"
            },
            {
              "href": "https://www.splashtop.com/es",
              "label": "Splashtop — Acceso remoto"
            },
            {
              "href": "https://www.malwarebytes.com/business",
              "label": "Malwarebytes for Business"
            }
          ],
          "title": "Herramientas y referencias"
        }
      ]
    }
  }
};

export default details;
