// content/project-details/it-ops-workstation-setup.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-workstation-setup",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/it-ops-workstation-setup/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/it-ops-workstation-setup/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/it-ops-workstation-setup/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/it-ops-workstation-setup/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/it-ops-workstation-setup/screenshot-4.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Workstation Setup: Windows 10 Install & Software Deployment",
      "heroSubtitle": "Windows 10 Pro · Ninite · Office 2016 · BIOS · Driver setup",
      "sections": [
        {
          "body": "As part of a training exercise at Greta du Val d'Oise, a client brought me an extremely slow HP laptop with no data to recover. My mission: full workstation rebuild — clean OS reinstall, driver validation, batch software deployment, and final configuration before client handover.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Reinstall Windows 10 Pro 64-bit from a bootable USB drive",
            "Validate all drivers (audio, network, GPU) after installation",
            "Rapidly deploy the full required software suite (7+ applications)",
            "Configure the workstation for immediate client handover (shortcuts, backup, antivirus)",
            "Intervene without any data loss — blank machine, no recovery needed"
          ],
          "title": "Scope & Objectives"
        },
        {
          "type": "bullets",
          "items": [
            "I configured USB boot via BIOS and installed Windows 10 Pro 64-bit with the trainer-provided OEM key",
            "I completed the OOBE: region France, user account creation, Cortana, Microsoft Hello, geolocation",
            "I validated all drivers in Device Manager — network, audio, GPU",
            "I deployed 7+ applications in one unattended pass via Ninite.com — no toolbars, no clicks",
            "I installed and activated Office 2016 Professional Plus at the same time",
            "I configured desktop shortcuts, wallpaper, and Windows Backup — workstation validated by the trainer"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Windows 10 Pro 64-bit — OS reinstalled from ISO on USB drive",
            "BIOS/UEFI — boot order configuration",
            "Device Manager — post-installation driver validation",
            "Ninite.com — batch app deployment without interaction (Chrome, Firefox, 7-Zip, Zoom, LibreOffice, TeamViewer, MalwareBytes)",
            "Office 2016 Professional Plus — office productivity suite",
            "Windows Backup — post-installation backup configuration"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "BIOS & USB boot",
              "description": "I entered the BIOS (F2/DEL), changed the boot order to place the USB key (Windows 10 Pro ISO) first, saved with F10, and rebooted."
            },
            {
              "label": "Windows 10 Pro installation",
              "description": "I ran a French, Custom installation of Windows 10 Pro 64-bit with the OEM key, accepted the license, created the user account, and completed the OOBE (region France, Cortana, Microsoft Hello)."
            },
            {
              "label": "Driver verification",
              "description": "I opened Device Manager and validated the audio, network (Ethernet + Wi-Fi), and GPU drivers, connected the network, and installed the antivirus."
            },
            {
              "label": "Batch deployment via Ninite",
              "description": "I used Ninite.com to install Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15, and MalwareBytes in one unattended run, installing Office 2016 Pro Plus at the same time."
            },
            {
              "label": "Finalization",
              "description": "I configured the desktop shortcuts, applied the wallpaper, and enabled Windows Backup. I handed the workstation over to the client after the trainer's validation."
            }
          ],
          "title": "Procedure"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Clean install — all drivers validated",
              "label": "OS",
              "value": "Windows 10 Pro 64-bit"
            },
            {
              "note": "Deployed via Ninite — zero user interaction",
              "label": "Software",
              "value": "7+ applications"
            },
            {
              "note": "Installed and activated",
              "label": "Office",
              "value": "Office 2016 Pro Plus"
            },
            {
              "note": "Workstation ready for client handover",
              "label": "Time",
              "value": "Single session"
            }
          ],
          "title": "Outcomes"
        }
      ]
    },
    "fr": {
      "title": "Préparation poste client : Installation Windows 10 & Déploiement logiciels",
      "heroSubtitle": "Windows 10 Pro · Ninite · Office 2016 · BIOS · Installation pilotes",
      "sections": [
        {
          "body": "Dans le cadre d'un exercice de formation au Greta du Val d'Oise, un client m'a apporté un portable HP extrêmement lent, sans données à récupérer. Ma mission : remise à neuf complète du poste — réinstallation propre de l'OS, validation des pilotes, déploiement automatisé des logiciels métier et configuration finale avant remise au client.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Réinstaller Windows 10 Pro 64 bits depuis un support USB bootable",
            "Valider tous les pilotes (audio, réseau, carte graphique) après installation",
            "Déployer rapidement l'ensemble des logiciels métier requis (7+ applications)",
            "Configurer le poste pour remise immédiate au client (raccourcis, sauvegardes, antivirus)",
            "Intervenir sans perte de données — poste vierge, aucune récupération nécessaire"
          ],
          "title": "Périmètre & Objectifs"
        },
        {
          "type": "bullets",
          "items": [
            "J'ai configuré le démarrage USB via le BIOS et installé Windows 10 Pro 64 bits avec la clé OEM fournie par le formateur",
            "J'ai finalisé l'OOBE : région France, création du compte utilisateur, Cortana, Microsoft Hello, géolocalisation",
            "J'ai validé tous les pilotes dans le Gestionnaire de périphériques — réseau, audio, GPU",
            "J'ai déployé 7+ applications en une passe via Ninite.com, sans interaction utilisateur ni toolbars",
            "J'ai installé et activé Office 2016 Professionnel Plus en parallèle",
            "J'ai configuré les raccourcis bureau, le fond d'écran et la sauvegarde Windows — poste validé par le formateur"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Windows 10 Pro 64 bits — OS réinstallé depuis ISO sur clé USB",
            "BIOS/UEFI — configuration de l'ordre de démarrage",
            "Gestionnaire de périphériques — validation des pilotes post-installation",
            "Ninite.com — déploiement batch d'applications sans interaction (Chrome, Firefox, 7-Zip, Zoom, LibreOffice, TeamViewer, MalwareBytes)",
            "Office 2016 Professionnel Plus — suite bureautique",
            "Sauvegarde Windows — configuration post-installation"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "BIOS & démarrage USB",
              "description": "Je suis entrée dans le BIOS (F2/DEL), j'ai modifié l'ordre de démarrage pour placer la clé USB ISO Windows 10 Pro en premier, sauvegardé avec F10, puis redémarré."
            },
            {
              "label": "Installation Windows 10 Pro",
              "description": "J'ai lancé une installation personnalisée en français de Windows 10 Pro 64 bits avec la clé OEM, accepté la licence, créé le compte utilisateur et finalisé l'OOBE (région France, Cortana, Microsoft Hello)."
            },
            {
              "label": "Validation des pilotes",
              "description": "J'ai ouvert le Gestionnaire de périphériques et validé les pilotes audio, réseau (Ethernet + Wi-Fi) et GPU, établi la connexion réseau et installé l'antivirus."
            },
            {
              "label": "Déploiement batch via Ninite",
              "description": "J'ai utilisé Ninite.com pour installer Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 et MalwareBytes en un seul passage, tout en installant Office 2016 Pro Plus en parallèle."
            },
            {
              "label": "Finalisation",
              "description": "J'ai configuré les raccourcis bureau, appliqué le fond d'écran et activé la sauvegarde Windows. J'ai remis le poste au client après validation du formateur."
            }
          ],
          "title": "Procédure"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Installation propre — tous pilotes validés",
              "label": "OS",
              "value": "Windows 10 Pro 64 bits"
            },
            {
              "note": "Déployées via Ninite — sans intervention",
              "label": "Logiciels",
              "value": "7+ applications"
            },
            {
              "note": "Installé et activé",
              "label": "Office",
              "value": "Office 2016 Pro Plus"
            },
            {
              "note": "Poste opérationnel remis au client",
              "label": "Délai",
              "value": "Session unique"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "Preparación de puesto de trabajo: instalación de Windows 10 y despliegue de software",
      "heroSubtitle": "Windows 10 · Ninite · Office 2016 · OOBE · Greta du Val d'Oise",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Como parte de un ejercicio de formación en el Greta du Val d'Oise, un cliente me trajo un portátil HP extremadamente lento, sin datos que recuperar. Mi misión: puesta a punto completa del equipo — reinstalación limpia del SO, validación de controladores, despliegue automatizado del software profesional y configuración final antes de la entrega al cliente."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Reinstalar Windows 10 Pro de 64 bits desde un soporte USB de arranque",
            "Validar todos los controladores (audio, red, tarjeta gráfica) tras la instalación",
            "Desplegar rápidamente el conjunto de software profesional requerido (7+ aplicaciones)",
            "Configurar el equipo para su entrega inmediata al cliente (accesos directos, copias de seguridad, antivirus)",
            "Intervenir sin pérdida de datos — equipo vacío, sin necesidad de recuperación"
          ],
          "title": "Alcance y objetivos"
        },
        {
          "type": "bullets",
          "items": [
            "Configuré el arranque USB vía BIOS e instalé Windows 10 Pro de 64 bits con la clave OEM proporcionada por el formador",
            "Finalicé el OOBE: región Francia, creación de la cuenta de usuario, Cortana, Microsoft Hello, geolocalización",
            "Validé todos los controladores en el Administrador de dispositivos — red, audio, GPU",
            "Desplegué 7+ aplicaciones en una sola pasada vía Ninite.com, sin interacción del usuario ni barras de herramientas",
            "Instalé y activé Office 2016 Professional Plus al mismo tiempo",
            "Configuré los accesos directos de escritorio, el fondo de pantalla y la copia de seguridad de Windows — equipo validado por el formador"
          ],
          "title": "Solución y entregables"
        },
        {
          "type": "bullets",
          "items": [
            "Windows 10 Pro de 64 bits — SO reinstalado desde ISO en llave USB",
            "BIOS/UEFI — configuración del orden de arranque",
            "Administrador de dispositivos — validación de controladores tras la instalación",
            "Ninite.com — despliegue por lotes de aplicaciones sin interacción (Chrome, Firefox, 7-Zip, Zoom, LibreOffice, TeamViewer, MalwareBytes)",
            "Office 2016 Professional Plus — suite ofimática",
            "Copia de seguridad de Windows — configuración posterior a la instalación"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "BIOS y arranque USB",
              "description": "Entré en la BIOS (F2/DEL), cambié el orden de arranque para colocar la llave USB con la ISO de Windows 10 Pro en primer lugar, guardé con F10 y reinicié."
            },
            {
              "label": "Instalación de Windows 10 Pro",
              "description": "Realicé una instalación personalizada en francés de Windows 10 Pro de 64 bits con la clave OEM, acepté la licencia, creé la cuenta de usuario y finalicé el OOBE (región Francia, Cortana, Microsoft Hello)."
            },
            {
              "label": "Validación de controladores",
              "description": "Abrí el Administrador de dispositivos y validé los controladores de audio, red (Ethernet + Wi-Fi) y GPU, establecí la conexión de red e instalé el antivirus."
            },
            {
              "label": "Despliegue por lotes vía Ninite",
              "description": "Usé Ninite.com para instalar Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 y MalwareBytes en una sola pasada, instalando Office 2016 Pro Plus al mismo tiempo."
            },
            {
              "label": "Finalización",
              "description": "Configuré los accesos directos de escritorio, apliqué el fondo de pantalla y activé la copia de seguridad de Windows. Entregué el equipo al cliente tras la validación del formador."
            }
          ],
          "title": "Procedimiento"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Instalación limpia — todos los controladores validados",
              "label": "SO",
              "value": "Windows 10 Pro 64 bits"
            },
            {
              "note": "Desplegadas vía Ninite — sin intervención",
              "label": "Software",
              "value": "7+ aplicaciones"
            },
            {
              "note": "Instalado y activado",
              "label": "Office",
              "value": "Office 2016 Pro Plus"
            },
            {
              "note": "Equipo operativo entregado al cliente",
              "label": "Tiempo",
              "value": "Sesión única"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
