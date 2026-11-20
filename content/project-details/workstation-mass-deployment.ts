// content/project-details/workstation-mass-deployment.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "workstation-mass-deployment",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/workstation-mass-deployment/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/workstation-mass-deployment/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/workstation-mass-deployment/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/workstation-mass-deployment/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/workstation-mass-deployment/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/workstation-mass-deployment/screenshot-5.webp"
    },
    {
      "alt": "Screenshot 6",
      "src": "/projects/workstation-mass-deployment/screenshot-6.webp"
    },
    {
      "alt": "Screenshot 7",
      "src": "/projects/workstation-mass-deployment/screenshot-7.webp"
    },
    {
      "alt": "Screenshot 9",
      "src": "/projects/workstation-mass-deployment/screenshot-9.webp"
    },
    {
      "alt": "Screenshot 10",
      "src": "/projects/workstation-mass-deployment/screenshot-10.webp"
    },
    {
      "alt": "Screenshot 12",
      "src": "/projects/workstation-mass-deployment/screenshot-12.webp"
    },
    {
      "alt": "Screenshot 13",
      "src": "/projects/workstation-mass-deployment/screenshot-13.webp"
    },
    {
      "alt": "Screenshot 14",
      "src": "/projects/workstation-mass-deployment/screenshot-14.webp"
    },
    {
      "alt": "Screenshot 15",
      "src": "/projects/workstation-mass-deployment/screenshot-15.webp"
    },
    {
      "alt": "Screenshot 16",
      "src": "/projects/workstation-mass-deployment/screenshot-16.webp"
    },
    {
      "alt": "Screenshot 17",
      "src": "/projects/workstation-mass-deployment/screenshot-17.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Mass Workstation Deployment — 264 Dell Devices",
      "heroSubtitle": "Certified data erasure, Sysprep imaging and Windows Autopilot — 264 Dell devices deployed at MIDRANGE Group.",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "At MIDRANGE Group (Alternative Partner Solutions team), I owned the deployment of two device fleets for a client rollout: 64 repurposed Dell Optiplex desktops, and 200 new Dell devices (Optiplex and Latitude).",
            "The two fleets required different workflows: the repurposed Optiplex machines needed certified wiping and a fresh image before reuse, while the new devices were enrolled through Windows Autopilot."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Repurposed hardware must be certified-erased before re-enrollment — a simple format is not sufficient for compliance. Required: traceable erasure standard (NIST 800-88) with per-device certificates.",
            "Sysprep imaging requires a stable golden image: drivers, Windows updates, and corporate apps must all be baked in before capturing. Any delta after capture means a new image cycle.",
            "Windows Autopilot requires hardware hashes to be pre-registered in Intune before the device is powered on. On new Dell hardware without ProDeploy, Dell ImageAssist is the fastest hash capture path.",
            "Intune deployment profiles, BitLocker policies, Defender configuration, and update rings must all be validated on a test device before rolling out to 200 machines.",
            "Staggered deployment (20–30 devices/day) to catch Intune policy failures before they affect the full fleet."
          ],
          "title": "Technical challenges"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Phase 1 — Blancco data erasure (64 Dell Optiplex)",
              "description": "Each repurposed Optiplex was booted from a Blancco USB key. An erasure task was created (NIST 800-88 standard), all disks selected, and erasure launched. Blancco overwrites every sector and verifies. A tamper-proof PDF compliance certificate is auto-generated per machine. All 64 machines ran overnight in parallel — 2 to 3 hours each depending on disk size."
            },
            {
              "title": "Phase 2 — Sysprep golden image (64 Dell Optiplex)",
              "description": "A reference Optiplex was fully configured: Windows 11, latest drivers, corporate app suite, domain join settings. Sysprep was run (/oobe /generalize /shutdown) to prepare the image for deployment. The image was captured, then deployed to the other Optiplex machines, by network boot (WDS/PXE) or from a WinPE USB key depending on the machine. Each machine then completed OOBE and joined the domain."
            },
            {
              "title": "Phase 3 — Windows Autopilot (200 Dell Optiplex and Latitude)",
              "description": "Each new device's hardware hash was captured (Dell ImageAssist) and registered in the Intune tenant. At first start, the user signed in with their corporate email: Azure AD authenticated them, the Autopilot profile was applied and Intune pushed policies and applications."
            }
          ],
          "title": "How it was done — 3 phases"
        },
        {
          "body": "264 devices deployed: certified erasure for all repurposed hardware, a common Sysprep image for the Optiplex fleet, and Autopilot enrollment for the new devices.",
          "type": "text",
          "title": "Impact"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "64 Optiplex (Sysprep) + 200 Optiplex/Latitude (Autopilot)",
              "label": "Devices deployed",
              "value": "264"
            },
            {
              "note": "One per wiped Optiplex — NIST 800-88 compliant",
              "label": "Blancco certificates",
              "value": "64"
            },
            {
              "note": "Optiplex and Latitude, enrolled in Intune",
              "label": "Autopilot devices",
              "value": "200"
            }
          ],
          "title": "Key figures"
        },
        {
          "type": "bullets",
          "items": [
            "Blancco and Autopilot are complementary, not competing tools: Blancco handles the compliance layer for repurposed hardware, Autopilot handles provisioning for new hardware.",
            "Dell ImageAssist simplifies hardware hash capture for Autopilot on Dell devices: no PowerShell script to run by hand on each device.",
            "Sysprep golden images must be rebuilt for each hardware model — drivers are hardware-specific. A single image covering all Optiplex SKUs requires careful driver injection.",
            "Staggering Autopilot rollouts (batch of 20–30/day) is critical: it surfaces Intune policy failures early, before they affect hundreds of users.",
            "Generating Blancco certificates at the time of erasure (not retroactively) is the only way to guarantee an unbroken chain of custody for compliance audits."
          ],
          "title": "Best Practices"
        },
        {
          "type": "bullets",
          "items": [
            "No documented fallback for a device failing mid-process — a Optiplex failing Blancco erasure (disk fault) or a Latitude failing Autopilot enrollment (hardware defect) was handled case-by-case, not as part of the repeatable process",
            "The rollout covers day-1 provisioning only: no defined re-provisioning path for a device that comes back later (employee offboarding, hardware swap, repair return) — that's a separate lifecycle process this project didn't scope",
            "Autopilot assumes reliable internet at first boot to reach Intune — no offline or on-prem fallback was built for sites where that assumption might not hold",
            "20–30 devices/day was chosen to catch Intune policy failures early without slowing the rollout to a crawl — untested whether a larger batch size would have surfaced the same failures just as fast"
          ],
          "title": "Known Limitations & Decisions"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://docs.microsoft.com/en-us/mem/autopilot/windows-autopilot",
              "label": "Windows Autopilot documentation — Microsoft"
            },
            {
              "href": "https://www.dell.com/en-us/dt/services/deployment-services/imageassist.htm",
              "label": "Dell ImageAssist"
            },
            {
              "href": "https://www.blancco.com/products/drive-eraser/",
              "label": "Blancco Drive Eraser"
            },
            {
              "href": "https://docs.microsoft.com/en-us/mem/intune/enrollment/windows-enrollment-status",
              "label": "Intune Enrollment Status Page"
            }
          ],
          "title": "Tools & references"
        }
      ]
    },
    "fr": {
      "title": "Déploiement en masse de postes de travail — 264 appareils Dell",
      "heroSubtitle": "Effacement certifié, image Sysprep et Windows Autopilot — 264 appareils Dell déployés chez MIDRANGE Group.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Chez MIDRANGE Group (équipe Alternative Partner Solutions), j'ai pris en charge le déploiement de deux flottes d'appareils pour un client : 64 PC de bureau Dell Optiplex reconditionnés, et 200 appareils Dell neufs (Optiplex et Latitude).",
            "Les deux flottes nécessitaient des workflows différents : les Optiplex reconditionnés devaient être effacés de manière certifiée puis réimagés avant réutilisation, tandis que les appareils neufs étaient enrôlés via Windows Autopilot."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Le matériel reconditionné doit être effacé de manière certifiée avant réenrôlement — un simple formatage ne suffit pas pour la conformité. Exigence : norme d'effacement traçable (NIST 800-88) avec certificats par appareil.",
            "L'image Sysprep nécessite une image dorée stable : pilotes, mises à jour Windows et applications métier doivent tous être intégrés avant la capture. Tout delta après la capture impose un nouveau cycle d'image.",
            "Windows Autopilot nécessite que les hashs matériels soient pré-enregistrés dans Intune avant la mise sous tension. Sur du nouveau matériel Dell sans ProDeploy, Dell ImageAssist est le chemin le plus rapide pour la capture des hashs.",
            "Les profils Intune, les stratégies BitLocker, la configuration Defender et les anneaux de mise à jour doivent tous être validés sur un appareil de test avant de déployer sur 200 machines.",
            "Déploiement échelonné (20–30 appareils/jour) pour détecter les échecs de stratégie Intune avant qu'ils touchent la flotte entière."
          ],
          "title": "Défis techniques"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Phase 1 — Effacement des données Blancco (64 Dell Optiplex)",
              "description": "Chaque Optiplex reconditionné a été démarré depuis une clé USB Blancco. Une tâche d'effacement a été créée (norme NIST 800-88), tous les disques sélectionnés, et l'effacement lancé. Blancco écrase chaque secteur et vérifie. Un certificat PDF de conformité inviolable est généré automatiquement par machine. Les 64 machines ont tourné en parallèle la nuit — 2 à 3 heures chacune selon la capacité du disque."
            },
            {
              "title": "Phase 2 — Image Sysprep dorée (64 Dell Optiplex)",
              "description": "Une machine Optiplex de référence a été entièrement configurée : Windows 11, derniers pilotes, suite d'applications métier, paramètres de jonction au domaine. Sysprep a été exécuté (/oobe /generalize /shutdown) pour préparer l'image au déploiement. L'image a été capturée puis déployée sur les autres Optiplex, par démarrage réseau (WDS/PXE) ou depuis une clé USB WinPE selon les machines. Chaque machine a ensuite complété l'OOBE et rejoint le domaine."
            },
            {
              "title": "Phase 3 — Windows Autopilot (200 Dell Optiplex et Latitude)",
              "description": "Le hash matériel de chaque appareil neuf a été capturé (Dell ImageAssist) et enregistré dans le tenant Intune. Au premier démarrage, l'utilisateur se connectait avec son e-mail professionnel : Azure AD l'authentifiait, le profil Autopilot s'appliquait et Intune poussait stratégies et applications."
            }
          ],
          "title": "Déroulement — 3 phases"
        },
        {
          "body": "264 appareils déployés : effacement certifié pour tout le matériel reconditionné, image Sysprep commune pour la flotte Optiplex et enrôlement Autopilot pour les appareils neufs.",
          "type": "text",
          "title": "Impact"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "64 Optiplex (Sysprep) + 200 Optiplex/Latitude (Autopilot)",
              "label": "Appareils déployés",
              "value": "264"
            },
            {
              "note": "Un par Optiplex effacé — conformité NIST 800-88",
              "label": "Certificats Blancco",
              "value": "64"
            },
            {
              "note": "Optiplex et Latitude, enrôlés dans Intune",
              "label": "Appareils Autopilot",
              "value": "200"
            }
          ],
          "title": "Chiffres clés"
        },
        {
          "type": "bullets",
          "items": [
            "Blancco et Autopilot sont complémentaires, pas concurrents : Blancco gère la couche conformité pour le matériel reconditionné, Autopilot gère le provisionnement du matériel neuf.",
            "Dell ImageAssist simplifie la capture des hashs matériels pour Autopilot sur les appareils Dell : pas de script PowerShell à lancer à la main sur chaque appareil.",
            "Les images Sysprep dorées doivent être reconstruites pour chaque modèle matériel — les pilotes sont spécifiques au hardware. Une seule image couvrant tous les SKU Optiplex nécessite une injection de pilotes soigneuse.",
            "Échelonner les déploiements Autopilot (lots de 20–30/jour) est critique : cela fait remonter les échecs de stratégie Intune tôt, avant qu'ils touchent des centaines d'utilisateurs.",
            "Générer les certificats Blancco au moment de l'effacement (pas rétroactivement) est le seul moyen de garantir une chaîne de traçabilité ininterrompue pour les audits de conformité."
          ],
          "title": "Bonnes pratiques"
        },
        {
          "type": "bullets",
          "items": [
            "Aucun repli documenté pour un poste en échec en cours de process — un Optiplex échouant à l'effacement Blancco (disque défectueux) ou un Latitude échouant à l'enrôlement Autopilot (défaut matériel) était traité au cas par cas, pas intégré au processus reproductible",
            "Le déploiement couvre uniquement la mise en service jour 1 : aucun parcours de re-provisioning défini pour un poste qui revient plus tard (départ collaborateur, échange matériel, retour SAV) — c'est un processus de cycle de vie séparé, hors périmètre de ce projet",
            "Autopilot suppose une connexion internet fiable au premier démarrage pour joindre Intune — aucun repli hors-ligne ou on-prem n'a été construit pour les sites où cette hypothèse pourrait ne pas tenir",
            "Le rythme de 20-30 postes/jour a été choisi pour détecter tôt les échecs de policy Intune sans ralentir excessivement le déploiement — jamais vérifié si un lot plus large aurait révélé les mêmes échecs aussi vite"
          ],
          "title": "Limites connues & décisions"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://docs.microsoft.com/fr-fr/mem/autopilot/windows-autopilot",
              "label": "Documentation Windows Autopilot — Microsoft"
            },
            {
              "href": "https://www.dell.com/fr-fr/dt/services/deployment-services/imageassist.htm",
              "label": "Dell ImageAssist"
            },
            {
              "href": "https://www.blancco.com/fr/products/drive-eraser/",
              "label": "Blancco Drive Eraser"
            },
            {
              "href": "https://docs.microsoft.com/fr-fr/mem/intune/enrollment/windows-enrollment-status",
              "label": "Page de statut d'enrôlement Intune"
            }
          ],
          "title": "Outils & références"
        }
      ]
    },
    "es": {
      "title": "Despliegue masivo de puestos de trabajo — 264 dispositivos Dell",
      "heroSubtitle": "Borrado certificado, imagen Sysprep y Windows Autopilot: 264 dispositivos Dell desplegados en MIDRANGE Group.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "En MIDRANGE Group (equipo Alternative Partner Solutions), lideré el despliegue de dos flotas de equipos para un cliente: 64 PC de sobremesa Dell Optiplex reacondicionados y 200 equipos Dell nuevos (Optiplex y Latitude).",
            "Las dos flotas requerían flujos de trabajo distintos: los Optiplex reacondicionados debían borrarse de forma certificada y reinstalarse con una imagen antes de reutilizarse, mientras que los equipos nuevos se inscribían mediante Windows Autopilot."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "El hardware reacondicionado debe borrarse de forma certificada antes de su reinscripción — un simple formateo no es suficiente para el cumplimiento normativo. Se requiere: un estándar de borrado trazable (NIST 800-88) con certificados por dispositivo.",
            "La imagen Sysprep requiere una imagen dorada estable: controladores, actualizaciones de Windows y aplicaciones corporativas deben estar integrados antes de la captura. Cualquier cambio posterior a la captura implica un nuevo ciclo de imagen.",
            "Windows Autopilot requiere que los hashes de hardware estén pre-registrados en Intune antes de encender el dispositivo. En hardware Dell nuevo sin ProDeploy, Dell ImageAssist es la vía más rápida para capturar el hash.",
            "Los perfiles de despliegue de Intune, las políticas de BitLocker, la configuración de Defender y los anillos de actualización deben validarse todos en un equipo de prueba antes de desplegar a 200 máquinas.",
            "Despliegue escalonado (20–30 equipos/día) para detectar fallos de política de Intune antes de que afecten a toda la flota."
          ],
          "title": "Retos técnicos"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Fase 1 — Borrado de datos con Blancco (64 Dell Optiplex)",
              "description": "Cada Optiplex reacondicionado se arrancó desde una llave USB de Blancco. Se creó una tarea de borrado (estándar NIST 800-88), se seleccionaron todos los discos y se lanzó el borrado. Blancco sobrescribe cada sector y verifica. Se genera automáticamente un certificado PDF de conformidad a prueba de manipulaciones por cada máquina. Las 64 máquinas se ejecutaron en paralelo durante la noche — de 2 a 3 horas cada una según el tamaño del disco."
            },
            {
              "title": "Fase 2 — Imagen dorada con Sysprep (64 Dell Optiplex)",
              "description": "Se configuró completamente un Optiplex de referencia: Windows 11, últimos controladores, suite de aplicaciones corporativas, ajustes de unión al dominio. Se ejecutó Sysprep (/oobe /generalize /shutdown) para preparar la imagen para su despliegue. La imagen se capturó y se desplegó en los demás Optiplex, mediante arranque en red (WDS/PXE) o desde una llave USB WinPE según el equipo. Cada máquina completó después el OOBE y se unió al dominio."
            },
            {
              "title": "Fase 3 — Windows Autopilot (200 Dell Optiplex y Latitude)",
              "description": "El hash de hardware de cada equipo nuevo se capturó (Dell ImageAssist) y se registró en el tenant de Intune. En el primer arranque, el usuario iniciaba sesión con su correo corporativo: Azure AD lo autenticaba, se aplicaba el perfil de Autopilot e Intune desplegaba políticas y aplicaciones."
            }
          ],
          "title": "Cómo se hizo — 3 fases"
        },
        {
          "body": "264 dispositivos desplegados: borrado certificado para todo el hardware reacondicionado, imagen Sysprep común para la flota Optiplex e inscripción en Autopilot para los equipos nuevos.",
          "type": "text",
          "title": "Impacto"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "64 Optiplex (Sysprep) + 200 Optiplex/Latitude (Autopilot)",
              "label": "Equipos desplegados",
              "value": "264"
            },
            {
              "note": "Uno por cada Optiplex borrado — conforme a NIST 800-88",
              "label": "Certificados Blancco",
              "value": "64"
            },
            {
              "note": "Optiplex y Latitude, inscritos en Intune",
              "label": "Equipos Autopilot",
              "value": "200"
            }
          ],
          "title": "Cifras clave"
        },
        {
          "type": "bullets",
          "items": [
            "Blancco y Autopilot son complementarios, no competidores: Blancco gestiona la capa de conformidad para el hardware reacondicionado, Autopilot gestiona el aprovisionamiento del hardware nuevo.",
            "Dell ImageAssist simplifica la captura de los hashes de hardware para Autopilot en equipos Dell: no hay que ejecutar un script de PowerShell a mano en cada equipo.",
            "Las imágenes doradas de Sysprep deben reconstruirse para cada modelo de hardware — los controladores son específicos del hardware. Una única imagen que cubra todos los SKU de Optiplex requiere una inyección cuidadosa de controladores.",
            "Escalonar los despliegues de Autopilot (lotes de 20–30/día) es crítico: permite detectar fallos de política de Intune de forma temprana, antes de que afecten a cientos de usuarios.",
            "Generar los certificados Blancco en el momento del borrado (no de forma retroactiva) es la única forma de garantizar una cadena de custodia ininterrumpida para las auditorías de conformidad."
          ],
          "title": "Buenas prácticas"
        },
        {
          "type": "bullets",
          "items": [
            "Sin repliegue documentado para un equipo que falla a mitad de proceso — un Optiplex que falla en el borrado Blancco (disco defectuoso) o un Latitude que falla en la inscripción Autopilot (defecto de hardware) se gestionaba caso por caso, sin formar parte del proceso repetible",
            "El despliegue cubre solo la puesta en marcha del día 1: no hay un proceso de re-aprovisionamiento definido para un equipo que vuelve más tarde (baja de empleado, cambio de hardware, retorno de reparación) — es un proceso de ciclo de vida aparte, fuera del alcance de este proyecto",
            "Autopilot asume una conexión a internet fiable en el primer arranque para llegar a Intune — no se construyó ningún repliegue offline u on-prem para sedes donde esa hipótesis pudiera no cumplirse",
            "El ritmo de 20-30 equipos/día se eligió para detectar pronto los fallos de política de Intune sin ralentizar demasiado el despliegue — nunca se verificó si un lote mayor habría revelado los mismos fallos igual de rápido"
          ],
          "title": "Límites conocidos y decisiones"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://docs.microsoft.com/es-es/mem/autopilot/windows-autopilot",
              "label": "Documentación de Windows Autopilot — Microsoft"
            },
            {
              "href": "https://www.dell.com/es-es/dt/services/deployment-services/imageassist.htm",
              "label": "Dell ImageAssist"
            },
            {
              "href": "https://www.blancco.com/es/products/drive-eraser/",
              "label": "Blancco Drive Eraser"
            },
            {
              "href": "https://docs.microsoft.com/es-es/mem/intune/enrollment/windows-enrollment-status",
              "label": "Página de estado de inscripción de Intune"
            }
          ],
          "title": "Herramientas y referencias"
        }
      ]
    }
  }
};

export default details;
