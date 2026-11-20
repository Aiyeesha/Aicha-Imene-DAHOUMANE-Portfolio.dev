// content/project-details/industrak-salesforce.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "industrak-salesforce",
  "gallery": [],
  "locales": {
    "en": {
      "title": "IndusTrak — Salesforce FSL Portfolio",
      "sections": [
        {
          "body": "Industrial companies look for Salesforce Field Service Lightning experts with proven experience on complex scenarios: field technician management, optimized dispatching, contractual SLA compliance. This portfolio demonstrates that expertise through a complete, documented FSL implementation covering real-world industrial use cases.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Recruiters and clients want concrete FSL experience, not just certifications",
            "FSL configurations (scheduling policy, work rules, territories) are complex to document",
            "No turnkey industrial FSL demo available as a public reference",
            "Need to cover real field use cases: emergencies, SLAs, spare parts, mobile reports"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "Complete industrial FSL application: asset management, interventions, technicians and territories",
            "Optimized scheduling policy with work rules (skills, availability, geographic proximity)",
            "SLAs configured with automatic escalations via Flows and real-time notifications",
            "Analytics reports: first-pass resolution rate, MTTR, performance per technician",
            "Detailed documentation of each configuration choice for client presentations"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Salesforce Field Service (FSL) — core platform",
            "Apex classes and triggers for complex business logic",
            "Lightning Web Components (LWC) for technician mobile interfaces",
            "Flows and Process Builder for automations and escalations",
            "Permission Sets and Sharing Rules for multi-role security"
          ],
          "title": "Tech Stack"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Design",
              "description": "Definition of business scenarios, roles, territories and industrial SLAs"
            },
            {
              "label": "FSL Configuration",
              "description": "Scheduling policies, work rules, service territories and resource capacities setup"
            },
            {
              "label": "Development",
              "description": "Apex custom logic, LWC mobile interface, Flow automations"
            },
            {
              "label": "Documentation",
              "description": "Configuration writeups, screenshots, client presentation guide"
            }
          ],
          "title": "Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "All FSL objects configured",
              "label": "FSL Coverage",
              "value": "Target: 100%"
            },
            {
              "note": "Emergencies, SLA, parts, reports",
              "label": "Business scenarios",
              "value": "Target: 8+"
            },
            {
              "note": "Portfolio publication planned Q2 2026",
              "label": "Availability",
              "value": "Coming Soon"
            }
          ],
          "title": "Portfolio Goals"
        }
      ]
    },
    "fr": {
      "title": "IndusTrak — Portfolio Salesforce FSL",
      "sections": [
        {
          "body": "Les entreprises industrielles cherchent des experts Salesforce Field Service Lightning avec une expérience prouvée sur des cas complexes : gestion de techniciens terrain, dispatching optimisé, respect de SLAs contractuels. Ce portfolio démontre cette expertise via une implémentation complète et documentée couvrant les use cases réels du secteur.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Les recruteurs et clients veulent voir de l'expérience FSL concrète, pas seulement des certifications",
            "Les configurations FSL (scheduling policy, work rules, territories) sont complexes à documenter",
            "Pas de démo clé-en-main FSL industrielle disponible comme référence publique",
            "Besoin de couvrir les use cases terrain : urgences, SLAs, pièces détachées, rapports mobiles"
          ],
          "title": "Périmètre du Problème"
        },
        {
          "type": "bullets",
          "items": [
            "Application FSL industrielle complète : gestion des assets, interventions, techniciens et territoires",
            "Scheduling policy optimisée avec work rules (compétences, disponibilité, proximité géographique)",
            "SLAs configurés avec escalades automatiques via Flows et notifications temps réel",
            "Rapports analytiques : taux de résolution premier passage, MTTR, performance par technicien",
            "Documentation détaillée de chaque choix de configuration pour présentation client"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Salesforce Field Service (FSL) — plateforme principale",
            "Apex classes et triggers pour logique métier complexe",
            "Lightning Web Components (LWC) pour interfaces mobiles techniciens",
            "Flows et Process Builder pour automations et escalades",
            "Permission Sets et Sharing Rules pour sécurité multi-rôles"
          ],
          "title": "Stack Technique"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Conception",
              "description": "Définition des scenarios métier, rôles, territoires et SLAs industriels"
            },
            {
              "label": "Configuration FSL",
              "description": "Setup scheduling policies, work rules, service territories et resource capacities"
            },
            {
              "label": "Développement",
              "description": "Apex custom logic, LWC mobile interface, Flow automations"
            },
            {
              "label": "Documentation",
              "description": "Writeups de chaque configuration, captures écran, guide de présentation client"
            }
          ],
          "title": "Avancement"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Tous les objets FSL configurés",
              "label": "Couverture FSL",
              "value": "Cible : 100%"
            },
            {
              "note": "Urgences, SLA, pièces, rapports",
              "label": "Scenarios métier",
              "value": "Cible : 8+"
            },
            {
              "note": "Publication portfolio prévue Q2 2026",
              "label": "Disponibilité",
              "value": "Bientôt"
            }
          ],
          "title": "Objectifs Portfolio"
        }
      ]
    }
  }
};

export default details;
