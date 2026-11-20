// content/project-details/security-monitoring-dashboard.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "security-monitoring-dashboard",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/security-monitoring-dashboard/cover.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Security Monitoring Dashboard (FastAPI + React)",
      "heroSubtitle": "Real-time security event monitoring dashboard with WebSocket streaming, alert triage, and severity classification",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "I built this as the first project in a 4-project security portfolio, exploring what a unified SOC triage view could look like: severity-ranked events, live updates, and the KPIs a team lead actually watches."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "I built a FastAPI backend with a WebSocket hub broadcasting new events to every connected client",
            "I added SQLite persistence via SQLAlchemy, replacing an initial in-memory prototype",
            "I protected the ingestion endpoint with an API key — reading stays open, writing requires trust",
            "I built a React/TypeScript frontend with a custom useLiveEvents hook managing fetch + WebSocket state",
            "I wrote a Pytest suite covering the events and metrics endpoints"
          ],
          "title": "What I built"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Pytest, FastAPI TestClient",
              "label": "Tests passing",
              "value": "5/5"
            },
            {
              "note": "Survives a backend restart",
              "label": "Persistence",
              "value": "SQLite"
            },
            {
              "note": "Simulated demo event cadence",
              "label": "Live push interval",
              "value": "6s"
            }
          ],
          "title": "Verified"
        }
      ]
    },
    "fr": {
      "title": "Dashboard de surveillance sécurité (FastAPI + React)",
      "heroSubtitle": "Dashboard temps réel de surveillance des événements de sécurité avec streaming WebSocket, triage d'alertes et classification par sévérité",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Je l'ai construit comme premier projet d'un portfolio sécurité de 4 projets, en explorant à quoi pourrait ressembler une vue de triage SOC unifiée : événements classés par sévérité, mises à jour en direct, et les indicateurs qu'un responsable d'équipe surveille réellement."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "J'ai construit un backend FastAPI avec un hub WebSocket diffusant les nouveaux événements à tous les clients connectés",
            "J'ai ajouté une persistance SQLite via SQLAlchemy, en remplacement d'un prototype initial en mémoire",
            "J'ai protégé l'endpoint d'ingestion par une clé API — la lecture reste ouverte, l'écriture demande une clé",
            "J'ai construit un frontend React/TypeScript avec un hook useLiveEvents personnalisé gérant le fetch et l'état WebSocket",
            "J'ai écrit une suite Pytest couvrant les endpoints events et metrics"
          ],
          "title": "Ce que j'ai construit"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Pytest, FastAPI TestClient",
              "label": "Tests réussis",
              "value": "5/5"
            },
            {
              "note": "Survit à un redémarrage du backend",
              "label": "Persistance",
              "value": "SQLite"
            },
            {
              "note": "Cadence des événements de démo simulés",
              "label": "Intervalle de push",
              "value": "6s"
            }
          ],
          "title": "Vérifié"
        }
      ]
    },
    "es": {
      "title": "Dashboard de supervisión de seguridad (FastAPI + React)",
      "heroSubtitle": "Panel de monitorización de seguridad en tiempo real — KPIs, indicadores de amenazas y tendencias de vulnerabilidades.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Lo construí como primer proyecto de un portafolio de seguridad de 4 proyectos, explorando cómo podría ser una vista de triaje SOC unificada: eventos clasificados por severidad, actualizaciones en vivo, y los indicadores que un responsable de equipo realmente vigila."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Construí un backend FastAPI con un hub WebSocket que transmite los nuevos eventos a todos los clientes conectados",
            "Añadí persistencia SQLite vía SQLAlchemy, sustituyendo un prototipo inicial en memoria",
            "Protegí el endpoint de ingesta con una clave API — la lectura permanece abierta, la escritura requiere confianza",
            "Construí un frontend React/TypeScript con un hook useLiveEvents personalizado que gestiona el fetch y el estado WebSocket",
            "Escribí una suite Pytest que cubre los endpoints de eventos y métricas"
          ],
          "title": "Lo que construí"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Pytest, FastAPI TestClient",
              "label": "Pruebas superadas",
              "value": "5/5"
            },
            {
              "note": "Sobrevive a un reinicio del backend",
              "label": "Persistencia",
              "value": "SQLite"
            },
            {
              "note": "Cadencia de eventos de demo simulados",
              "label": "Intervalo de push",
              "value": "6s"
            }
          ],
          "title": "Verificado"
        }
      ]
    }
  }
};

export default details;
