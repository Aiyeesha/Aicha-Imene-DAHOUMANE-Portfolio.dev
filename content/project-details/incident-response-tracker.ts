// content/project-details/incident-response-tracker.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "incident-response-tracker",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/incident-response-tracker/cover.webp"
    },
    {
      "alt": "Incident detail with audit timeline",
      "src": "/projects/incident-response-tracker/screenshot-1.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Incident Response Tracker — SOC Ticketing Workflow",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "A dashboard of alerts is only half the job — someone has to own each one until it is resolved, and prove the SLA was followed. This tracker enforces that workflow instead of leaving it to convention."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "I built a pure state_machine module defining every legal transition and per-severity SLA target, with zero I/O",
            "I added FastAPI endpoints that reject illegal transitions with a 409 and the list of allowed next states",
            "I implemented a timestamped audit timeline — every status change, comment, and assignment recorded",
            "I built a React master-detail dashboard with inline status transition buttons",
            "I wrote 15 Pytest tests, including pure unit tests of the state machine independent of the database"
          ],
          "title": "What I built"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "new to resolved correctly returned HTTP 409",
              "label": "Illegal transition test",
              "value": "Rejected"
            },
            {
              "note": "Critical 4h / High 24h / Medium 72h / Low 7d",
              "label": "SLA tiers",
              "value": "4"
            },
            {
              "note": "Spanning every lifecycle state",
              "label": "Seeded incidents",
              "value": "10"
            }
          ],
          "title": "Verified live"
        }
      ]
    },
    "fr": {
      "title": "Incident Response Tracker — Workflow de ticketing SOC",
      "heroSubtitle": "Workflow de ticketing pour incidents de sécurité : cycle de vie strict imposé par une machine à états, délai SLA par sévérité et piste d'audit horodatée de chaque changement de statut, commentaire et affectation.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Un tableau d'alertes ne fait que la moitié du travail — quelqu'un doit prendre en charge chaque alerte jusqu'à sa résolution, et prouver que le SLA a été respecté. Ce tracker impose ce workflow au lieu de le laisser à la convention."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "J'ai construit un module state_machine pur définissant chaque transition légale et la cible SLA par sévérité, sans aucun I/O",
            "J'ai ajouté des endpoints FastAPI qui rejettent les transitions illégales avec un 409 et la liste des états suivants autorisés",
            "J'ai implémenté une chronologie d'audit horodatée — chaque changement de statut, commentaire et assignation enregistré",
            "J'ai construit un tableau de bord React maître-détail avec boutons de transition de statut intégrés",
            "J'ai écrit 15 tests Pytest, dont des tests unitaires purs de la machine à états indépendants de la base de données"
          ],
          "title": "Ce que j'ai construit"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "new vers resolved a correctement retourné un HTTP 409",
              "label": "Test de transition illégale",
              "value": "Rejetée"
            },
            {
              "note": "Critique 4h / Élevée 24h / Moyenne 72h / Faible 7j",
              "label": "Paliers SLA",
              "value": "4"
            },
            {
              "note": "Couvrant tous les états du cycle de vie",
              "label": "Incidents semés",
              "value": "10"
            }
          ],
          "title": "Vérifié en direct"
        }
      ]
    },
    "es": {
      "title": "Incident Response Tracker — Flujo de tickets SOC",
      "heroSubtitle": "Flujo de tickets para incidentes de seguridad: ciclo de vida estricto impuesto por una máquina de estados, plazo SLA por gravedad y registro de auditoría con marca de tiempo de cada cambio de estado, comentario y asignación.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Un panel de alertas es solo la mitad del trabajo — alguien debe hacerse cargo de cada una hasta resolverla, y demostrar que se siguió el SLA. Este tracker impone ese flujo de trabajo en lugar de dejarlo a la convención."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Construí un módulo state_machine puro que define cada transición legal y el objetivo SLA por severidad, sin ningún I/O",
            "Añadí endpoints FastAPI que rechazan las transiciones ilegales con un 409 y la lista de estados siguientes permitidos",
            "Implementé una cronología de auditoría con marca de tiempo — cada cambio de estado, comentario y asignación registrado",
            "Construí un dashboard React maestro-detalle con botones de transición de estado integrados",
            "Escribí 15 pruebas Pytest, incluyendo pruebas unitarias puras de la máquina de estados independientes de la base de datos"
          ],
          "title": "Lo que construí"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "new a resolved devolvió correctamente un HTTP 409",
              "label": "Prueba de transición ilegal",
              "value": "Rechazada"
            },
            {
              "note": "Crítica 4h / Alta 24h / Media 72h / Baja 7d",
              "label": "Niveles SLA",
              "value": "4"
            },
            {
              "note": "Cubriendo todos los estados del ciclo de vida",
              "label": "Incidentes sembrados",
              "value": "10"
            }
          ],
          "title": "Verificado en vivo"
        }
      ]
    }
  }
};

export default details;
