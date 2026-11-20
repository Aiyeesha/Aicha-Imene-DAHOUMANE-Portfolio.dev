// content/project-details/it-ops-virtualization-lab.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-virtualization-lab",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/it-ops-virtualization-lab/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/it-ops-virtualization-lab/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/it-ops-virtualization-lab/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/it-ops-virtualization-lab/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/it-ops-virtualization-lab/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/it-ops-virtualization-lab/screenshot-5.webp"
    },
    {
      "alt": "Screenshot 6",
      "src": "/projects/it-ops-virtualization-lab/screenshot-6.webp"
    },
    {
      "alt": "Screenshot 7",
      "src": "/projects/it-ops-virtualization-lab/screenshot-7.webp"
    },
    {
      "alt": "Screenshot 8",
      "src": "/projects/it-ops-virtualization-lab/screenshot-8.webp"
    },
    {
      "alt": "Screenshot 9",
      "src": "/projects/it-ops-virtualization-lab/screenshot-9.webp"
    },
    {
      "alt": "Screenshot 10",
      "src": "/projects/it-ops-virtualization-lab/screenshot-10.webp"
    },
    {
      "alt": "Screenshot 11",
      "src": "/projects/it-ops-virtualization-lab/screenshot-11.webp"
    },
    {
      "alt": "Screenshot 12",
      "src": "/projects/it-ops-virtualization-lab/screenshot-12.webp"
    },
    {
      "alt": "Screenshot 13",
      "src": "/projects/it-ops-virtualization-lab/screenshot-13.webp"
    },
    {
      "alt": "Screenshot 14",
      "src": "/projects/it-ops-virtualization-lab/screenshot-14.webp"
    },
    {
      "alt": "Screenshot 15",
      "src": "/projects/it-ops-virtualization-lab/screenshot-15.webp"
    },
    {
      "alt": "Screenshot 16",
      "src": "/projects/it-ops-virtualization-lab/screenshot-16.webp"
    },
    {
      "alt": "Screenshot 17",
      "src": "/projects/it-ops-virtualization-lab/screenshot-17.webp"
    },
    {
      "alt": "Screenshot 18",
      "src": "/projects/it-ops-virtualization-lab/screenshot-18.webp"
    },
    {
      "alt": "Screenshot 19",
      "src": "/projects/it-ops-virtualization-lab/screenshot-19.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Maintaining a Virtualized IT Environment",
      "heroSubtitle": "Windows Server 2022 lab on VMware Workstation: Active Directory domain, DNS, DHCP and automated OS deployment via WDS/PXE on a private NAT network.",
      "sections": [
        {
          "body": "Personal lab built as part of a Systems & Networks program. I deployed a complete Windows Server 2022 environment inside VMware Workstation Pro 17 to replicate a real enterprise IT infrastructure: Active Directory domain, DNS, DHCP, and automated OS deployment via WDS/PXE — all on a fully managed private VMware NAT network.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Hypervisor: VMware Workstation Pro 17 (Type 2) — VMware NAT network 192.168.100.0/24",
            "DCAD22 — Windows Server 2022: static IP 192.168.100.250, gateway 192.168.100.2",
            "AD domain: DP-AICHA.LAN (forest root), DNS with 8.8.8.8 forwarder",
            "DHCP scope POOL1: 192.168.100.1–254, exclusions .1–.20 and .240–.254, PXEClient option",
            "WDS linked to AD domain, boot.wim imported, admin approval for unknown machines",
            "Windows 10 Pro client — joined as PC LYES, roaming profile and mapped drive configured"
          ],
          "title": "Lab Architecture"
        },
        {
          "type": "bullets",
          "items": [
            "AD DS: DP-AICHA.LAN forest, OUs, accounts LYES (standard) and Technicien (IT admin)",
            "DNS: DP-AICHA.LAN zone with 8.8.8.8 forwarder for internet resolution",
            "DHCP: POOL1 scope with option 060 PXEClient for network deployment",
            "WDS / PXE: Windows 10 OS deployment over the network — no USB or manual install",
            "GPO: roaming profiles and mapped drive (\\\\DCAD22\\Partage) applied at logon",
            "Permissions: shared folder Modify+Read for LYES, Read for Technicien"
          ],
          "title": "Services Deployed"
        },
        {
          "type": "bullets",
          "items": [
            "VMware Workstation Pro 17 — Type 2 hypervisor, VMware NAT network",
            "Windows Server 2022 — Domain controller (DCAD22)",
            "Active Directory DS — Identity management, OUs, accounts and policies",
            "DNS Server — Domain name resolution with internet forwarder",
            "DHCP Server — Dynamic IP address allocation with PXE options",
            "WDS (Windows Deployment Services) — Network OS deployment (PXE/TFTP)",
            "Group Policy (GPO) — Roaming profiles and mapped network drives"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "VM setup & DC promotion",
              "description": "Windows Server 2022 installed from ISO. Static IP 192.168.100.250, hostname DCAD22. Promoted to DC via AD DS wizard — created DP-AICHA.LAN forest root. DNS installed with 8.8.8.8 forwarder."
            },
            {
              "label": "DHCP & WDS",
              "description": "DHCP role installed and authorized. POOL1 scope created with PXEClient option. WDS linked to AD domain, boot.wim imported. Admin-approval mode enabled for unknown machines."
            },
            {
              "label": "Active Directory & GPO",
              "description": "OUs and accounts created: LYES (standard) and Technicien (admin). GPOs applied for roaming profiles and mapped drive \\\\DCAD22\\Partage at logon."
            },
            {
              "label": "Domain join & PXE deployment",
              "description": "Blank Windows 10 VM booted from NIC. DHCP IP obtained, PXE options received, WDS contacted. After admin approval, Windows 10 deployed over the network. Renamed PC LYES and joined to DP-AICHA.LAN."
            }
          ],
          "title": "Setup Phases"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Full VMware NAT network",
              "label": "Infrastructure",
              "value": "AD domain operational"
            },
            {
              "note": "No USB or manual install required",
              "label": "OS deployment",
              "value": "PXE/WDS working"
            },
            {
              "note": "Roaming profiles + mapped drives",
              "label": "Policies",
              "value": "GPOs active"
            },
            {
              "note": "Unknown machines require authorization",
              "label": "WDS security",
              "value": "Admin approval mode"
            },
            {
              "note": "Complete personal lab",
              "label": "Skills",
              "value": "AD DS, DNS, DHCP, WDS, GPO"
            },
            {
              "note": "Profile and mapped drive verified",
              "label": "Client validated",
              "value": "PC LYES joined"
            }
          ],
          "title": "Outcomes"
        }
      ]
    },
    "fr": {
      "title": "Maintenir et exploiter un environnement virtualisé",
      "heroSubtitle": "Lab Windows Server 2022 sous VMware Workstation : domaine Active Directory, DNS, DHCP et déploiement d'OS automatisé par WDS/PXE sur un réseau NAT privé.",
      "sections": [
        {
          "body": "Lab personnel réalisé dans le cadre d'une formation Systèmes & Réseaux. J ai déployé un environnement Windows Server 2022 complet sous VMware Workstation Pro 17 pour reproduire une infrastructure IT d'entreprise : domaine Active Directory, DNS, DHCP et déploiement automatisé d'OS via WDS/PXE — sur un réseau NAT VMware privé entièrement géré.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Hyperviseur : VMware Workstation Pro 17 (type 2) — réseau NAT VMware 192.168.100.0/24",
            "DCAD22 — Windows Server 2022 : IP statique 192.168.100.250, gateway 192.168.100.2",
            "Domaine AD : DP-AICHA.LAN (racine de forêt), DNS avec redirecteur 8.8.8.8",
            "DHCP étendue POOL1 : 192.168.100.1–254, exclusions .1–.20 et .240–.254, option PXEClient",
            "WDS lié au domaine AD, image boot.wim importée, validation manuelle des machines inconnues",
            "Client Windows 10 Pro — joint sous PC LYES, profil itinérant et lecteur réseau configurés"
          ],
          "title": "Architecture du lab"
        },
        {
          "type": "bullets",
          "items": [
            "AD DS : forêt DP-AICHA.LAN, OUs, comptes LYES (standard) et Technicien (admin IT)",
            "DNS : zone DP-AICHA.LAN avec redirecteur 8.8.8.8 pour résolution Internet",
            "DHCP : étendue POOL1 avec option 060 PXEClient pour le déploiement réseau",
            "WDS / PXE : déploiement OS Windows 10 via réseau — sans clé USB ni installation manuelle",
            "GPO : profils itinérants et lecteur réseau (\\\\DCAD22\\Partage) mappé à l'ouverture de session",
            "Permissions : dossier partagé Modifier+Lire pour LYES, Lire pour Technicien"
          ],
          "title": "Services déployés"
        },
        {
          "type": "bullets",
          "items": [
            "VMware Workstation Pro 17 — Hyperviseur de type 2, réseau NAT VMware",
            "Windows Server 2022 — Contrôleur de domaine (DCAD22)",
            "Active Directory DS — Gestion des identités, OUs, comptes et politiques",
            "DNS Server — Résolution de noms de domaine avec redirecteur Internet",
            "DHCP Server — Attribution dynamique d'adresses IP avec options PXE",
            "WDS (Windows Deployment Services) — Déploiement OS via réseau (PXE/TFTP)",
            "Group Policy (GPO) — Profils itinérants et mappage de lecteurs réseau"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "VM & promotion DC",
              "description": "Windows Server 2022 installé depuis ISO. IP statique 192.168.100.250, hostname DCAD22. Promotion DC via l'assistant AD DS — création de la forêt DP-AICHA.LAN. DNS installé avec redirecteur 8.8.8.8."
            },
            {
              "label": "DHCP & WDS",
              "description": "Rôle DHCP installé et autorisé. Étendue POOL1 créée avec option PXEClient. WDS lié au domaine AD, boot.wim importé. Mode validation manuelle activé pour les machines inconnues."
            },
            {
              "label": "Active Directory & GPO",
              "description": "OUs et comptes créés : LYES (standard) et Technicien (admin). GPO appliquées pour les profils itinérants et le mappage du lecteur réseau \\\\DCAD22\\Partage à l'ouverture de session."
            },
            {
              "label": "Jonction domaine & déploiement PXE",
              "description": "VM Windows 10 sans OS démarrée sur NIC. IP obtenue via DHCP, options PXE reçues, WDS contacté. Après validation dans la console WDS, Windows 10 déployé via réseau. Machine renommée PC LYES et jointe à DP-AICHA.LAN."
            }
          ],
          "title": "Phases de mise en place"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Sur réseau NAT VMware complet",
              "label": "Infrastructure",
              "value": "Domaine AD opérationnel"
            },
            {
              "note": "Sans clé USB ni installation manuelle",
              "label": "Déploiement OS",
              "value": "PXE/WDS fonctionnel"
            },
            {
              "note": "Profils itinérants + lecteurs mappés",
              "label": "Politiques",
              "value": "GPO actives"
            },
            {
              "note": "Machines inconnues approuvées par admin",
              "label": "Sécurité WDS",
              "value": "Validation manuelle"
            },
            {
              "note": "Lab personnel complet",
              "label": "Compétences",
              "value": "AD DS, DNS, DHCP, WDS, GPO"
            },
            {
              "note": "Profil et lecteur réseau vérifiés",
              "label": "Client validé",
              "value": "PC LYES joint"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "Mantener un entorno IT virtualizado",
      "heroSubtitle": "Laboratorio Windows Server 2022 en VMware Workstation: dominio Active Directory, DNS, DHCP y despliegue automatizado de SO mediante WDS/PXE en una red NAT privada.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Laboratorio personal realizado en el marco de una formación en Sistemas y Redes. Desplegué un entorno Windows Server 2022 completo bajo VMware Workstation Pro 17 para reproducir una infraestructura IT empresarial: dominio Active Directory, DNS, DHCP y despliegue automatizado de SO vía WDS/PXE — sobre una red NAT privada de VMware totalmente gestionada."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Hipervisor: VMware Workstation Pro 17 (tipo 2) — red NAT de VMware 192.168.100.0/24",
            "DCAD22 — Windows Server 2022: IP estática 192.168.100.250, puerta de enlace 192.168.100.2",
            "Dominio AD: DP-AICHA.LAN (raíz del bosque), DNS con reenviador 8.8.8.8",
            "Ámbito DHCP POOL1: 192.168.100.1–254, exclusiones .1–.20 y .240–.254, opción PXEClient",
            "WDS vinculado al dominio AD, imagen boot.wim importada, validación manual de máquinas desconocidas",
            "Cliente Windows 10 Pro — unido como PC LYES, perfil itinerante y unidad de red configurados"
          ],
          "title": "Arquitectura del laboratorio"
        },
        {
          "type": "bullets",
          "items": [
            "AD DS: bosque DP-AICHA.LAN, UO, cuentas LYES (estándar) y Technicien (admin IT)",
            "DNS: zona DP-AICHA.LAN con reenviador 8.8.8.8 para resolución de Internet",
            "DHCP: ámbito POOL1 con opción 060 PXEClient para el despliegue por red",
            "WDS / PXE: despliegue del SO Windows 10 por red — sin llave USB ni instalación manual",
            "GPO: perfiles itinerantes y unidad de red (\\\\DCAD22\\Partage) montada al iniciar sesión",
            "Permisos: carpeta compartida Modificar+Leer para LYES, Leer para Technicien"
          ],
          "title": "Servicios desplegados"
        },
        {
          "type": "bullets",
          "items": [
            "VMware Workstation Pro 17 — Hipervisor de tipo 2, red NAT de VMware",
            "Windows Server 2022 — Controlador de dominio (DCAD22)",
            "Active Directory DS — Gestión de identidades, UO, cuentas y directivas",
            "DNS Server — Resolución de nombres de dominio con reenviador a Internet",
            "DHCP Server — Asignación dinámica de direcciones IP con opciones PXE",
            "WDS (Windows Deployment Services) — Despliegue de SO por red (PXE/TFTP)",
            "Directiva de grupo (GPO) — Perfiles itinerantes y asignación de unidades de red"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "VM y promoción a DC",
              "description": "Windows Server 2022 instalado desde ISO. IP estática 192.168.100.250, nombre de host DCAD22. Promoción a DC mediante el asistente AD DS — creación del bosque DP-AICHA.LAN. DNS instalado con reenviador 8.8.8.8."
            },
            {
              "label": "DHCP y WDS",
              "description": "Rol DHCP instalado y autorizado. Ámbito POOL1 creado con la opción PXEClient. WDS vinculado al dominio AD, boot.wim importado. Modo de validación manual activado para máquinas desconocidas."
            },
            {
              "label": "Active Directory y GPO",
              "description": "UO y cuentas creadas: LYES (estándar) y Technicien (admin). GPO aplicadas para los perfiles itinerantes y la asignación de la unidad de red \\\\DCAD22\\Partage al iniciar sesión."
            },
            {
              "label": "Unión al dominio y despliegue PXE",
              "description": "VM Windows 10 sin SO iniciada por NIC. IP obtenida vía DHCP, opciones PXE recibidas, WDS contactado. Tras la validación en la consola WDS, Windows 10 desplegado por red. Máquina renombrada PC LYES y unida a DP-AICHA.LAN."
            }
          ],
          "title": "Fases de implementación"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Sobre red NAT de VMware completa",
              "label": "Infraestructura",
              "value": "Dominio AD operativo"
            },
            {
              "note": "Sin llave USB ni instalación manual",
              "label": "Despliegue del SO",
              "value": "PXE/WDS funcional"
            },
            {
              "note": "Perfiles itinerantes + unidades asignadas",
              "label": "Directivas",
              "value": "GPO activas"
            },
            {
              "note": "Máquinas desconocidas aprobadas por el administrador",
              "label": "Seguridad WDS",
              "value": "Validación manual"
            },
            {
              "note": "Laboratorio personal completo",
              "label": "Competencias",
              "value": "AD DS, DNS, DHCP, WDS, GPO"
            },
            {
              "note": "Perfil y unidad de red verificados",
              "label": "Cliente validado",
              "value": "PC LYES unido"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
