// content/project-details/log-anomaly-detector.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "log-anomaly-detector",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/log-anomaly-detector/cover.webp"
    },
    {
      "alt": "An anomaly marked resolved",
      "src": "/projects/log-anomaly-detector/screenshot-1.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Log Anomaly Detector — Rule-Based Auth Log Analysis",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "Most SOC dashboard demos display alerts that already exist somewhere else. This one generates them — reasoning over sequences of events instead of filtering pre-labeled data."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "I wrote four independent detection rules (detection.py) as pure functions: brute force, impossible travel, credential stuffing, off-hours access",
            "I built a windowing + dedup layer so a sustained attack does not spam duplicate anomalies",
            "I designed a deterministic demo scenario, anchored to a fixed time-of-day so tests never depend on real wall-clock time",
            "I added a Simulate attack traffic button replaying that scenario live from the dashboard",
            "I wrote 20 Pytest tests — all 4 rules unit-tested with plain event dicts, zero database or clock dependency"
          ],
          "title": "What I built"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Each rule fires exactly once per scenario run",
              "label": "Anomalies per rule",
              "value": "1"
            },
            {
              "note": "Re-running the scenario correctly creates zero duplicates",
              "label": "Dedup on replay",
              "value": "0 new"
            },
            {
              "note": "Brute force, impossible travel, credential stuffing, off-hours",
              "label": "Detection rules",
              "value": "4"
            }
          ],
          "title": "Verified live"
        }
      ]
    },
    "fr": {
      "title": "Log Anomaly Detector — Analyse de logs d'authentification par règles",
      "heroSubtitle": "Moteur de détection par règles pour les logs d'authentification : tentatives de force brute, connexions impossibles géographiquement, vagues de credential stuffing et accès hors horaires — chaque règle est une fonction pure, testée unitairement, sans entrée-sortie.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "La plupart des démos « tableau de bord SOC » affichent des alertes qui existent déjà ailleurs. Celui-ci les génère — en raisonnant sur des séquences d'événements plutôt qu'en filtrant des données déjà étiquetées."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "J'ai écrit quatre règles de détection indépendantes (detection.py) sous forme de fonctions pures : force brute, voyage impossible, credential stuffing, accès hors-horaires",
            "J'ai construit une couche de fenêtrage + déduplication pour qu'une attaque soutenue ne spamme pas d'anomalies en double",
            "J'ai conçu un scénario de démo déterministe, ancré à une heure fixe pour que les tests ne dépendent jamais de l'heure réelle",
            "J'ai ajouté un bouton Simulate attack traffic rejouant ce scénario en direct depuis le tableau de bord",
            "J'ai écrit 20 tests Pytest — les 4 règles testées unitairement avec de simples dictionnaires d'événements, sans base de données ni dépendance à l'horloge"
          ],
          "title": "Ce que j'ai construit"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Chaque règle se déclenche exactement une fois par exécution du scénario",
              "label": "Anomalies par règle",
              "value": "1"
            },
            {
              "note": "Rejouer le scénario ne crée correctement aucun doublon",
              "label": "Dédup au rejeu",
              "value": "0 nouvelle"
            },
            {
              "note": "Force brute, voyage impossible, credential stuffing, hors-horaires",
              "label": "Règles de détection",
              "value": "4"
            }
          ],
          "title": "Vérifié en direct"
        }
      ]
    },
    "es": {
      "title": "Log Anomaly Detector — Análisis de logs de autenticación por reglas",
      "heroSubtitle": "Motor de detección por reglas para logs de autenticación: intentos de fuerza bruta, inicios de sesión geográficamente imposibles, oleadas de credential stuffing y accesos fuera de horario — cada regla es una función pura, probada unitariamente, sin entrada/salida.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "La mayoría de las demos de dashboard SOC muestran alertas que ya existen en otro lugar. Este las genera — razonando sobre secuencias de eventos en lugar de filtrar datos ya etiquetados."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Escribí cuatro reglas de detección independientes (detection.py) como funciones puras: fuerza bruta, viaje imposible, credential stuffing, acceso fuera de horario",
            "Construí una capa de ventaneo + deduplicación para que un ataque sostenido no sature de anomalías duplicadas",
            "Diseñé un escenario de demostración determinista, anclado a una hora fija para que las pruebas nunca dependan del reloj real",
            "Añadí un botón Simulate attack traffic que reproduce ese escenario en vivo desde el dashboard",
            "Escribí 20 pruebas Pytest — las 4 reglas probadas unitariamente con simples diccionarios de eventos, sin base de datos ni dependencia del reloj"
          ],
          "title": "Lo que construí"
        },
        {
          "type": "metrics",
          "items": [
            {
              "note": "Cada regla se activa exactamente una vez por ejecución del escenario",
              "label": "Anomalías por regla",
              "value": "1"
            },
            {
              "note": "Repetir el escenario no crea correctamente ningún duplicado",
              "label": "Dedup al repetir",
              "value": "0 nuevas"
            },
            {
              "note": "Fuerza bruta, viaje imposible, credential stuffing, fuera de horario",
              "label": "Reglas de detección",
              "value": "4"
            }
          ],
          "title": "Verificado en vivo"
        }
      ]
    }
  }
};

export default details;
