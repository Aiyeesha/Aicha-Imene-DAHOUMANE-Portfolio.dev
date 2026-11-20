// content/project-details/it-ops-email-config.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-email-config",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/it-ops-email-config/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/it-ops-email-config/screenshot-1.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Configuring Outlook 2016 Email Account",
      "heroSubtitle": "Outlook 2016 · IMAP/Exchange · User Onboarding · Email Provisioning · Greta du Val d'Oise",
      "sections": [
        {
          "body": "As part of the TAI training at Greta du Val d'Oise, I completed an email provisioning exercise using Microsoft Outlook 2016. The scenario mirrors a real-world IT technician task: a new employee arrives on their first day, their workstation is already set up (Windows 10, Office 2016 installed), and the technician must configure their professional email account so they can start working immediately.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Configure a Microsoft/Exchange email account (t•••7@outlook.fr) in Outlook 2016",
            "Validate bidirectional communication with a peer account (t•••12@outlook.fr)",
            "Get the workstation email-ready in under 5 minutes after handover",
            "Simulate a Day 1 onboarding — mailbox, calendar and contacts accessible immediately",
            "Document the procedure for reproduction in a professional context"
          ],
          "title": "Scope & Objectives"
        },
        {
          "type": "bullets",
          "items": [
            "Outlook 2016 profile created using Exchange ActiveSync auto-discovery for outlook.fr",
            "No manual server entry required — automatic account configuration wizard used",
            "Test email sent from t•••7@outlook.fr to t•••12@outlook.fr and confirmed received",
            "Mailbox, calendar and contacts immediately accessible in Outlook 2016",
            "Email operational in under 5 minutes from workstation handover"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Microsoft Outlook 2016 — desktop email client",
            "Exchange ActiveSync — synchronization protocol auto-detected",
            "Autodiscover — automatic server settings detection mechanism",
            "Windows 10 — operating system of the provisioned workstation",
            "Office 2016 — pre-installed productivity suite"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Launch Outlook 2016",
              "description": "Opened Outlook 2016 for the first time — welcome wizard launched automatically to add the email account."
            },
            {
              "label": "Enter account details",
              "description": "Entered user name, email address (t•••7@outlook.fr) and password. Outlook 2016 supports both automatic and manual configuration."
            },
            {
              "label": "Automatic configuration",
              "description": "Autodiscover contacted Microsoft servers and automatically detected Exchange ActiveSync settings. No manual server entry required."
            },
            {
              "label": "Verification — send & receive",
              "description": "Test email sent from tai7 to tai12. Receipt confirmed by switching to the tai12 account — bidirectional communication validated."
            }
          ],
          "title": "Configuration Procedure"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Fully operational Outlook 2016 profile",
              "label": "Account configured",
              "value": "t•••7@outlook.fr"
            },
            {
              "note": "Auto-detected by Autodiscover",
              "label": "Protocol",
              "value": "Exchange ActiveSync"
            },
            {
              "note": "Day 1 onboarding scenario",
              "label": "Time to ready",
              "value": "< 5 minutes"
            },
            {
              "note": "Bidirectional tai7 ↔ tai12",
              "label": "Validation",
              "value": "Test email confirmed"
            }
          ],
          "title": "Outcomes"
        }
      ]
    },
    "fr": {
      "title": "Configuration d'une messagerie Outlook 2016",
      "heroSubtitle": "Outlook 2016 · IMAP/Exchange · Onboarding utilisateur · Provisioning messagerie · Greta du Val d'Oise",
      "sections": [
        {
          "body": "Dans le cadre de la formation TAI au Greta du Val d'Oise, j'ai réalisé un exercice de provisioning de messagerie avec Microsoft Outlook 2016. Le scénario reproduit une tâche réelle de technicien IT : un nouvel employé arrive le premier jour, son poste est installé (Windows 10, Office 2016), et le technicien doit configurer son compte de messagerie professionnel pour qu'il soit opérationnel immédiatement.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Configurer un compte de messagerie Microsoft/Exchange (t•••7@outlook.fr) dans Outlook 2016",
            "Valider la communication bidirectionnelle avec un compte pair (t•••12@outlook.fr)",
            "Rendre le poste opérationnel en moins de 5 minutes après remise à l'utilisateur",
            "Simuler un onboarding Jour 1 — messagerie, calendrier et contacts accessibles immédiatement",
            "Documenter la procédure pour reproduction en contexte professionnel"
          ],
          "title": "Périmètre & Objectifs"
        },
        {
          "type": "bullets",
          "items": [
            "Profil Outlook 2016 créé avec découverte automatique Exchange ActiveSync pour outlook.fr",
            "Aucune saisie manuelle de serveur requise — assistant de configuration automatique utilisé",
            "Email de test envoyé depuis t•••7@outlook.fr vers t•••12@outlook.fr et confirmé reçu",
            "Boîte mail, calendrier et contacts immédiatement accessibles dans Outlook 2016",
            "Messagerie opérationnelle en moins de 5 minutes après remise du poste"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Microsoft Outlook 2016 — client de messagerie bureautique",
            "Exchange ActiveSync — protocole de synchronisation détecté automatiquement",
            "Autodiscover — mécanisme de découverte automatique des paramètres serveur",
            "Windows 10 — système d'exploitation du poste provisionné",
            "Office 2016 — suite bureautique préinstallée"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Lancer Outlook 2016",
              "description": "Ouverture d'Outlook 2016 pour la première fois — assistant de bienvenue lancé automatiquement pour l'ajout du compte."
            },
            {
              "label": "Saisie des informations du compte",
              "description": "Nom de l'utilisateur, adresse (t•••7@outlook.fr) et mot de passe saisis. Outlook 2016 supporte la configuration automatique et manuelle."
            },
            {
              "label": "Configuration automatique",
              "description": "Autodiscover contacte les serveurs Microsoft et détecte automatiquement les paramètres Exchange ActiveSync. Aucune saisie manuelle de serveur nécessaire."
            },
            {
              "label": "Vérification — envoi et réception",
              "description": "Email de test envoyé depuis tai7 vers tai12. Confirmation de réception en basculant sur le compte tai12 — communication bidirectionnelle validée."
            }
          ],
          "title": "Procédure de configuration"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Profil Outlook 2016 opérationnel",
              "label": "Compte configuré",
              "value": "t•••7@outlook.fr"
            },
            {
              "note": "Détecté automatiquement",
              "label": "Protocole",
              "value": "Exchange ActiveSync"
            },
            {
              "note": "Onboarding Jour 1",
              "label": "Délai de mise en service",
              "value": "< 5 minutes"
            },
            {
              "note": "Bidirectionnel tai7 ↔ tai12",
              "label": "Validation",
              "value": "Test email confirmé"
            }
          ],
          "title": "Résultats"
        }
      ]
    },
    "es": {
      "title": "Aprovisionamiento de correo Outlook 2016 (incorporación día 1)",
      "heroSubtitle": "Outlook 2016 · Exchange ActiveSync · Incorporación de usuarios · Greta du Val d'Oise",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "En el marco de la formación TAI en el Greta du Val d'Oise, realicé un ejercicio de aprovisionamiento de correo con Microsoft Outlook 2016. El escenario reproduce una tarea real de técnico IT: un nuevo empleado llega el primer día, su equipo está instalado (Windows 10, Office 2016), y el técnico debe configurar su cuenta de correo profesional para que esté operativa de inmediato."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Configurar una cuenta de correo Microsoft/Exchange (t•••7@outlook.fr) en Outlook 2016",
            "Validar la comunicación bidireccional con una cuenta par (t•••12@outlook.fr)",
            "Dejar el equipo operativo en menos de 5 minutos tras la entrega al usuario",
            "Simular un onboarding de Día 1 — correo, calendario y contactos accesibles de inmediato",
            "Documentar el procedimiento para su reproducción en contexto profesional"
          ],
          "title": "Alcance y objetivos"
        },
        {
          "type": "bullets",
          "items": [
            "Perfil de Outlook 2016 creado con detección automática Exchange ActiveSync para outlook.fr",
            "Ninguna configuración manual de servidor necesaria — asistente de configuración automática utilizado",
            "Correo de prueba enviado desde t•••7@outlook.fr a t•••12@outlook.fr y confirmado como recibido",
            "Buzón, calendario y contactos accesibles de inmediato en Outlook 2016",
            "Correo operativo en menos de 5 minutos tras la entrega del equipo"
          ],
          "title": "Solución y entregables"
        },
        {
          "type": "bullets",
          "items": [
            "Microsoft Outlook 2016 — cliente de correo de escritorio",
            "Exchange ActiveSync — protocolo de sincronización detectado automáticamente",
            "Autodiscover — mecanismo de detección automática de los parámetros del servidor",
            "Windows 10 — sistema operativo del equipo aprovisionado",
            "Office 2016 — suite ofimática preinstalada"
          ],
          "title": "Stack y tecnologías"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Iniciar Outlook 2016",
              "description": "Apertura de Outlook 2016 por primera vez — asistente de bienvenida iniciado automáticamente para agregar la cuenta."
            },
            {
              "label": "Introducción de los datos de la cuenta",
              "description": "Nombre del usuario, dirección (t•••7@outlook.fr) y contraseña introducidos. Outlook 2016 admite configuración automática y manual."
            },
            {
              "label": "Configuración automática",
              "description": "Autodiscover contacta con los servidores de Microsoft y detecta automáticamente los parámetros Exchange ActiveSync. No se requiere configuración manual de servidor."
            },
            {
              "label": "Verificación — envío y recepción",
              "description": "Correo de prueba enviado desde tai7 a tai12. Confirmación de recepción cambiando a la cuenta tai12 — comunicación bidireccional validada."
            }
          ],
          "title": "Procedimiento de configuración"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Perfil de Outlook 2016 operativo",
              "label": "Cuenta configurada",
              "value": "t•••7@outlook.fr"
            },
            {
              "note": "Detectado automáticamente",
              "label": "Protocolo",
              "value": "Exchange ActiveSync"
            },
            {
              "note": "Onboarding Día 1",
              "label": "Tiempo de puesta en servicio",
              "value": "< 5 minutos"
            },
            {
              "note": "Bidireccional tai7 ↔ tai12",
              "label": "Validación",
              "value": "Correo de prueba confirmado"
            }
          ],
          "title": "Resultados"
        }
      ]
    }
  }
};

export default details;
