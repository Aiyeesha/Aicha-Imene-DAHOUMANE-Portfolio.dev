// content/project-details/bdr-prospection-tool.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "bdr-prospection-tool",
  "gallery": [],
  "locales": {
    "en": {
      "title": "BdR Prospection Tool — Salesforce Outreach",
      "sections": [
        {
          "body": "Personal project built to automate and structure sales prospecting via Salesforce. The goal: create a real lead qualification tool with automatic scoring, Outreach.io integration and pipeline visibility — using only the native Salesforce stack (Apex, LWC, Flows).",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Time-consuming manual qualification: lead scoring and prioritization without clear rules",
            "No automated outreach sequences or open/reply rate tracking",
            "Limited pipeline visibility: no dashboard for lead to opportunity conversion",
            "Underused Salesforce data: firmographics, activity, interaction history"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "Automatic lead scoring (0-100) based on firmographics and engagement, calculated in Apex",
            "Outreach.io integration: bidirectional Salesforce ↔ Outreach sync, automatic sequence enrollment",
            "Real-time LWC dashboard: pipeline, conversion rates by source, progression",
            "Automation Flows: automatic follow-up, escalation, SLA alerts",
            "Automated weekly reports via Salesforce Reports & Dashboards"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Salesforce: Apex (scoring engine), Lightning Web Components (dashboard), Flows (automations)",
            "Outreach.io API: contact sync, sequence enrollment, metrics retrieval",
            "Reports & Dashboards: native Salesforce dashboards",
            "Permission Sets: role-based granular access",
            "Scheduled Apex: score recalculation every 6h, automatic weekly reports"
          ],
          "title": "Tech Stack"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analysis & Design",
              "description": "Scoring criteria definition, dashboard wireframes, Apex architecture"
            },
            {
              "label": "v1 Development",
              "description": "Apex scoring engine, LWC dashboard, Outreach.io API integration"
            },
            {
              "label": "Testing & Deployment",
              "description": "Apex unit tests, end-to-end validation, sandbox then prod deployment"
            },
            {
              "label": "v1 in Production",
              "description": "Tool delivered and functional, minor iterations ongoing"
            }
          ],
          "title": "Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Thanks to automatic scoring",
              "label": "Qualification time reduced",
              "value": "-40%"
            },
            {
              "note": "vs manual qualification",
              "label": "Lead → opportunity conversion",
              "value": "+25%"
            },
            {
              "note": "In production, iterations ongoing",
              "label": "Status",
              "value": "Delivered v1"
            }
          ],
          "title": "Results"
        }
      ]
    },
    "fr": {
      "title": "BdR Prospection Tool — Outreach Salesforce",
      "sections": [
        {
          "body": "Projet personnel développé pour automatiser et structurer la prospection commerciale via Salesforce. L'objectif : construire un vrai outil de qualification de leads avec scoring automatique, intégration Outreach.io et visibilité pipeline — en utilisant uniquement la stack Salesforce native (Apex, LWC, Flows).",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Qualification manuelle chronophage : scoring et priorisation des leads sans règles claires",
            "Pas de séquences outreach automatisées ni de suivi des taux d'ouverture/réponse",
            "Visibilité limitée sur le pipeline : pas de dashboard de conversion leads vers opportunités",
            "Données Salesforce sous-exploitées : firmographics, activité, historique interactions"
          ],
          "title": "Problème"
        },
        {
          "type": "bullets",
          "items": [
            "Scoring automatique des leads (0-100) basé sur firmographics et engagement, calculé en Apex",
            "Intégration Outreach.io : sync bidirectionnelle Salesforce ↔ Outreach, enrollment automatique en séquences",
            "Dashboard LWC temps réel : pipeline, taux de conversion par source, progression",
            "Flows d'automatisation : relance automatique, escalade, alertes SLA",
            "Rapports hebdomadaires automatisés via Salesforce Reports & Dashboards"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Salesforce : Apex (scoring engine), Lightning Web Components (dashboard), Flows (automations)",
            "Outreach.io API : sync contacts, enrollment séquences, récupération métriques",
            "Reports & Dashboards : tableaux de bord natifs Salesforce",
            "Permission Sets : accès granulaire par rôle",
            "Scheduled Apex : calcul du score toutes les 6h, rapports hebdomadaires automatiques"
          ],
          "title": "Stack Technique"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analyse & Design",
              "description": "Définition des critères de scoring, wireframes dashboard, architecture Apex"
            },
            {
              "label": "Développement v1",
              "description": "Apex scoring engine, LWC dashboard, intégration Outreach.io API"
            },
            {
              "label": "Tests & Déploiement",
              "description": "Tests unitaires Apex, validation end-to-end, déploiement sandbox puis prod"
            },
            {
              "label": "v1 en production",
              "description": "Outil livré et fonctionnel, itérations mineures en cours"
            }
          ],
          "title": "Avancement"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Grâce au scoring automatique",
              "label": "Temps de qualification réduit",
              "value": "-40%"
            },
            {
              "note": "vs qualification manuelle",
              "label": "Conversion leads → opportunités",
              "value": "+25%"
            },
            {
              "note": "En production, itérations en cours",
              "label": "Statut",
              "value": "Livré v1"
            }
          ],
          "title": "Résultats"
        }
      ]
    }
  }
};

export default details;
