// content/project-details/it-ops-roaming-profiles.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-roaming-profiles",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/it-ops-roaming-profiles/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/it-ops-roaming-profiles/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/it-ops-roaming-profiles/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/it-ops-roaming-profiles/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/it-ops-roaming-profiles/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/it-ops-roaming-profiles/screenshot-5.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Configuring AD DS Roaming Profiles",
      "heroSubtitle": "Windows Server 2016 · AD DS · Roaming Profiles · ebtai.fr domain",
      "sections": [
        {
          "body": "As part of a training exercise at Greta du Val d'Oise, I configured roaming profiles on a Windows Server 2016 domain controller (ebtai.fr) and verified synchronization from a Windows 10 client VM — both running in VirtualBox. Goal: allow users to retrieve their full work environment (desktop, documents, settings) on any domain-joined machine they log into.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Create a shared folder on the server to host roaming profile data",
            "Configure NTFS and share permissions for the domain Users group",
            "Set the profile path in Active Directory using the %username% variable",
            "Verify automatic subfolder creation on first client login",
            "Validate full synchronization from the Windows 10 client VM"
          ],
          "title": "Scope & Objectives"
        },
        {
          "type": "bullets",
          "items": [
            "I created the Profil itinérant folder on C: and shared it via Advanced Sharing",
            "I set share permissions to EBTAI\\Utilisateurs — Modify + Read (removed Everyone)",
            "I verified NTFS permissions to allow profile ownership by users",
            "I configured the AD profile path: \\\\DC1\\Profil itinérants\\%username%",
            "I confirmed the technicien.tai.V6 subfolder auto-created on first Windows 10 login — sync confirmed"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Windows Server 2016 — domain controller (ebtai.fr)",
            "Active Directory Users and Computers — profile path configuration",
            "NTFS Permissions — file-system level access control",
            "SMB Share / Advanced Sharing — network share for roaming profiles",
            "%username% variable — automatic per-user path personalization",
            "VirtualBox — Type 2 hypervisor for the training environment"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Create shared folder",
              "description": "I created the Profil itinérant folder on C:, then went to Properties → Sharing → Advanced Sharing and enabled it under the share name Profil itinérant."
            },
            {
              "label": "Configure share permissions",
              "description": "I removed Everyone from Permissions and added EBTAI\\Utilisateurs with Modify + Read, then clicked Apply."
            },
            {
              "label": "Configure NTFS permissions",
              "description": "I verified the folder's security settings to ensure Full Control for profile ownership. Network path: \\\\serveur\\Profil itinérant."
            },
            {
              "label": "Set AD profile path",
              "description": "In AD Users and Computers (ebtai.fr), I right-clicked technicien → Properties → Profile tab and set the path to \\\\DC1\\Profil itinérants\\%username%, then applied it."
            },
            {
              "label": "Verify from client VM",
              "description": "I logged into Windows 10 as EBTAI\\technicien. The subfolder technicien.tai.V6 appeared in the share (15/06/2022) — the roaming profile was linked and synchronized."
            }
          ],
          "title": "Procedure"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "EBTAI\\Utilisateurs: Modify + Read",
              "label": "Shared folder",
              "value": "Profil itinérant"
            },
            {
              "note": "Per-user automatic path",
              "label": "AD profile path",
              "value": "\\\\DC1\\Profil itinérants\\%username%"
            },
            {
              "note": "Automatically on first login",
              "label": "Verification",
              "value": "technicien.tai.V6 created"
            },
            {
              "note": "Validated autonomously",
              "label": "Skills",
              "value": "AD DS, roaming profiles, NTFS, SMB"
            }
          ],
          "title": "Outcomes"
        }
      ]
    },
    "fr": {
      "title": "Configuration des profils itinérants AD DS",
      "heroSubtitle": "Windows Server 2016 · AD DS · Profils itinérants · domaine ebtai.fr",
      "sections": [
        {
          "body": "Dans le cadre d'un exercice de formation au Greta du Val d'Oise, j'ai configuré des profils itinérants sur un contrôleur de domaine Windows Server 2016 (ebtai.fr) et vérifié la synchronisation depuis une VM cliente Windows 10 — les deux sous VirtualBox. L'objectif : permettre aux utilisateurs de retrouver leur environnement de travail (bureau, documents, paramètres) quelle que soit la machine du domaine sur laquelle ils se connectent.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Créer un dossier partagé sur le serveur pour héberger les profils itinérants",
            "Configurer les permissions NTFS et de partage pour le groupe Utilisateurs du domaine",
            "Paramétrer le chemin de profil dans Active Directory avec la variable %username%",
            "Vérifier la création automatique du sous-dossier de profil à la première connexion client",
            "Valider la synchronisation complète depuis la VM cliente Windows 10"
          ],
          "title": "Périmètre & Objectifs"
        },
        {
          "type": "bullets",
          "items": [
            "J'ai créé le dossier Profil itinérant sur C: et l'ai partagé via Partage avancé",
            "J'ai configuré les permissions de partage : EBTAI\\Utilisateurs — Modifier + Lire (Everyone supprimé)",
            "J'ai vérifié les permissions NTFS pour permettre l'appropriation des profils par les utilisateurs",
            "J'ai configuré le chemin de profil AD : \\\\DC1\\Profil itinérants\\%username%",
            "J'ai confirmé la création automatique du sous-dossier technicien.tai.V6 à la première connexion Windows 10 — synchronisation vérifiée"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Windows Server 2016 — contrôleur de domaine (ebtai.fr)",
            "Active Directory Users and Computers — configuration du chemin de profil",
            "NTFS Permissions — contrôle d'accès au niveau fichier système",
            "SMB Share / Partage avancé — partage réseau du dossier de profils",
            "Variable %username% — personnalisation automatique du chemin par utilisateur",
            "VirtualBox — hyperviseur de type 2 pour l'environnement de formation"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Création du dossier partagé",
              "description": "J'ai créé le dossier Profil itinérant sur C:, puis suis allée dans Propriétés → Partage → Partage avancé pour l'activer sous le nom Profil itinérant."
            },
            {
              "label": "Configuration des permissions de partage",
              "description": "J'ai supprimé Everyone des Autorisations et ajouté EBTAI\\Utilisateurs avec Modifier + Lire, puis cliqué sur Appliquer."
            },
            {
              "label": "Configuration des permissions NTFS",
              "description": "J'ai vérifié la sécurité du dossier pour garantir le Contrôle total nécessaire à l'appropriation des profils. Chemin réseau : \\\\serveur\\Profil itinérant."
            },
            {
              "label": "Paramétrage du chemin AD",
              "description": "Dans Utilisateurs et ordinateurs AD (ebtai.fr), j'ai fait un clic droit sur technicien → Propriétés → onglet Profil, puis défini le chemin \\\\DC1\\Profil itinérants\\%username% avant d'appliquer."
            },
            {
              "label": "Vérification depuis la VM cliente",
              "description": "Je me suis connectée à Windows 10 avec EBTAI\\technicien. Le sous-dossier technicien.tai.V6 est apparu dans le partage (15/06/2022) — le profil itinérant était lié et synchronisé."
            }
          ],
          "title": "Procédure"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "EBTAI\\Utilisateurs : Modifier + Lire",
              "label": "Dossier partagé",
              "value": "Profil itinérant"
            },
            {
              "note": "Personnalisé par utilisateur",
              "label": "Chemin AD",
              "value": "\\\\DC1\\Profil itinérants\\%username%"
            },
            {
              "note": "Automatiquement à la première connexion",
              "label": "Vérification",
              "value": "technicien.tai.V6 créé"
            },
            {
              "note": "Validées en autonomie",
              "label": "Compétences",
              "value": "AD DS, profils itinérants, NTFS, SMB"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "Configuración de perfiles móviles de AD DS",
      "heroSubtitle": "Active Directory · Perfiles móviles · Windows Server · Dominio EBTAI · Greta du Val d'Oise",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Como parte de un ejercicio de formación en el Greta du Val d'Oise, configuré perfiles itinerantes en un controlador de dominio Windows Server 2016 (ebtai.fr) y verifiqué la sincronización desde una VM cliente Windows 10 — ambas bajo VirtualBox. El objetivo: permitir que los usuarios recuperen su entorno de trabajo (escritorio, documentos, configuración) sin importar en qué máquina del dominio inicien sesión."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Crear una carpeta compartida en el servidor para alojar los perfiles itinerantes",
            "Configurar los permisos NTFS y de recurso compartido para el grupo Usuarios del dominio",
            "Configurar la ruta de perfil en Active Directory con la variable %username%",
            "Verificar la creación automática de la subcarpeta de perfil en el primer inicio de sesión del cliente",
            "Validar la sincronización completa desde la VM cliente Windows 10"
          ],
          "title": "Alcance y objetivos"
        },
        {
          "type": "bullets",
          "items": [
            "Creé la carpeta Perfil itinerante en C: y la compartí mediante Uso compartido avanzado",
            "Configuré los permisos de recurso compartido: EBTAI\\\\Utilisateurs — Modificar + Leer (Todos eliminado)",
            "Verifiqué los permisos NTFS para permitir la apropiación de los perfiles por los usuarios",
            "Configuré la ruta de perfil AD: \\\\DC1\\Profil itinérants\\%username%",
            "Confirmé la creación automática de la subcarpeta technicien.tai.V6 en el primer inicio de sesión de Windows 10 — sincronización verificada"
          ],
          "title": "Solución y entregables"
        },
        {
          "type": "bullets",
          "items": [
            "Windows Server 2016 — controlador de dominio (ebtai.fr)",
            "Active Directory Users and Computers — configuración de la ruta de perfil",
            "Permisos NTFS — control de acceso a nivel de sistema de archivos",
            "Recurso compartido SMB / Uso compartido avanzado — recurso de red de la carpeta de perfiles",
            "Variable %username% — personalización automática de la ruta por usuario",
            "VirtualBox — hipervisor de tipo 2 para el entorno de formación"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Creación de la carpeta compartida",
              "description": "Creé la carpeta Perfil itinerante en C: y fui a Propiedades → Compartir → Uso compartido avanzado para activarla con el nombre Perfil itinerante."
            },
            {
              "label": "Configuración de los permisos de recurso compartido",
              "description": "Eliminé Todos de los Permisos y añadí EBTAI\\\\Utilisateurs con Modificar + Leer, luego hice clic en Aplicar."
            },
            {
              "label": "Configuración de los permisos NTFS",
              "description": "Verifiqué la seguridad de la carpeta para garantizar el Control total necesario para la apropiación de los perfiles. Ruta de red: \\\\servidor\\Perfil itinerante."
            },
            {
              "label": "Configuración de la ruta AD",
              "description": "En Usuarios y equipos de AD (ebtai.fr), hice clic derecho en técnico → Propiedades → pestaña Perfil, configuré la ruta \\\\DC1\\Profil itinérants\\%username% y la apliqué."
            },
            {
              "label": "Verificación desde la VM cliente",
              "description": "Inicié sesión en Windows 10 como EBTAI\\\\technicien. La subcarpeta technicien.tai.V6 apareció en el recurso compartido (15/06/2022) — el perfil itinerante quedó vinculado y sincronizado."
            }
          ],
          "title": "Procedimiento"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "EBTAI\\\\Utilisateurs: Modificar + Leer",
              "label": "Carpeta compartida",
              "value": "Perfil itinerante"
            },
            {
              "note": "Personalizada por usuario",
              "label": "Ruta AD",
              "value": "\\\\DC1\\Profil itinérants\\%username%"
            },
            {
              "note": "Automáticamente en el primer inicio de sesión",
              "label": "Verificación",
              "value": "technicien.tai.V6 creado"
            },
            {
              "note": "Validadas de forma autónoma",
              "label": "Competencias",
              "value": "AD DS, perfiles itinerantes, NTFS, SMB"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
