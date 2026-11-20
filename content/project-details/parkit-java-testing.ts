// content/project-details/parkit-java-testing.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "parkit-java-testing",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/parkit-java-testing/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/parkit-java-testing/screenshot-1.webp"
    },
    {
      "alt": "Screenshot 2",
      "src": "/projects/parkit-java-testing/screenshot-2.webp"
    },
    {
      "alt": "Screenshot 3",
      "src": "/projects/parkit-java-testing/screenshot-3.webp"
    },
    {
      "alt": "Screenshot 4",
      "src": "/projects/parkit-java-testing/screenshot-4.webp"
    },
    {
      "alt": "Screenshot 5",
      "src": "/projects/parkit-java-testing/screenshot-5.webp"
    },
    {
      "alt": "Screenshot 6",
      "src": "/projects/parkit-java-testing/screenshot-6.webp"
    },
    {
      "alt": "Screenshot 7",
      "src": "/projects/parkit-java-testing/screenshot-7.webp"
    },
    {
      "alt": "Screenshot 8",
      "src": "/projects/parkit-java-testing/screenshot-8.webp"
    },
    {
      "alt": "Screenshot 9",
      "src": "/projects/parkit-java-testing/screenshot-9.webp"
    },
    {
      "alt": "Screenshot 10",
      "src": "/projects/parkit-java-testing/screenshot-10.webp"
    },
    {
      "alt": "Screenshot 11",
      "src": "/projects/parkit-java-testing/screenshot-11.webp"
    },
    {
      "alt": "Screenshot 12",
      "src": "/projects/parkit-java-testing/screenshot-12.webp"
    },
    {
      "alt": "Screenshot 13",
      "src": "/projects/parkit-java-testing/screenshot-13.webp"
    },
    {
      "alt": "Screenshot 14",
      "src": "/projects/parkit-java-testing/screenshot-14.webp"
    },
    {
      "alt": "Screenshot 15",
      "src": "/projects/parkit-java-testing/screenshot-15.webp"
    },
    {
      "alt": "Screenshot 16",
      "src": "/projects/parkit-java-testing/screenshot-16.webp"
    },
    {
      "alt": "Screenshot 17",
      "src": "/projects/parkit-java-testing/screenshot-17.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Java testing & TDD feature delivery (Parkit)",
      "heroSubtitle": "Bug fixes, TDD unit tests and JUnit integration tests for the Park'it application at Move'it.",
      "sections": [
        {
          "body": "Move'it is developing Park'it, an automated parking payment system. The previous developer, Tek, left several critical bugs and unimplemented features. Mission: fix the existing errors, deliver 2 new features using strict TDD, and reach test coverage above 70% validated by JaCoCo and Surefire.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Critical bug: incorrect duration calculation for stays over 24h (producing negative values)",
            "Missing feature: first 30 minutes of parking free of charge",
            "Missing feature: 5% recurring customer discount",
            "Insufficient test coverage on ParkingService",
            "No integration tests against the real database"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "I fixed the duration bug: replaced the broken calculation logic for stays exceeding 24h",
            "TDD Feature 1: I wrote the tests first → price = 0 for parking stays under 30 minutes",
            "TDD Feature 2: I wrote the tests first → 5% discount applied after license plate lookup",
            "I wrote ParkingService unit tests with Mockito — coverage above 90%",
            "I wrote ParkingDataBaseIT integration tests on the real database — global coverage above 70%",
            "I generated the JaCoCo and Surefire reports, validated by the jury"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Java + Maven — build and dependency management",
            "JUnit 5 — unit testing framework",
            "Mockito — mocks (TicketDAO, ParkingSpotDAO, InputReaderUtil)",
            "JaCoCo — code coverage report",
            "Surefire — test execution report",
            "MySQL — database for integration tests",
            "Git — versioning with feature/fix branches"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Code analysis",
              "description": "I reviewed the existing project and identified the duration bug and the missing features"
            },
            {
              "label": "Bug fix",
              "description": "I fixed the negative duration calculation for parking stays over 24 hours"
            },
            {
              "label": "TDD Feature 1",
              "description": "I wrote the tests first, then implemented the free 30-minute stay rule"
            },
            {
              "label": "TDD Feature 2",
              "description": "I wrote the tests first, then implemented the 5% recurring-user discount with plate lookup"
            },
            {
              "label": "Unit tests",
              "description": "I added Mockito mocks on ParkingService — coverage above 90%"
            },
            {
              "label": "Integration tests",
              "description": "I wrote ParkingDataBaseIT tests on the real database — global coverage above 70%, defense validated 4/4"
            }
          ],
          "title": "Project Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Skills validated",
              "value": "4/4"
            },
            {
              "label": "Global coverage (JaCoCo)",
              "value": ">70%"
            },
            {
              "label": "ParkingService coverage",
              "value": ">90%"
            },
            {
              "label": "TDD features delivered",
              "value": "2"
            }
          ],
          "title": "Defense Results"
        }
      ]
    },
    "fr": {
      "title": "Tests Java & livraison TDD (Parkit)",
      "heroSubtitle": "Correction de bugs, tests unitaires TDD et tests d'intégration JUnit pour l'application Park'it chez Move'it.",
      "sections": [
        {
          "body": "Move'it développe Park'it, un système de paiement de parking automatisé. Le développeur précédent, Tek, a laissé plusieurs bugs critiques et des fonctionnalités à implémenter. Mission : corriger les erreurs existantes, livrer 2 nouvelles fonctionnalités en TDD strict, et atteindre une couverture de tests supérieure à 70% validée par JaCoCo et Surefire.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Bug critique : calcul de durée erroné pour les stationnements > 24h (valeurs négatives)",
            "Fonctionnalité manquante : gratuité des 30 premières minutes de stationnement",
            "Fonctionnalité manquante : réduction de 5% pour les utilisateurs récurrents",
            "Couverture de tests insuffisante sur ParkingService",
            "Absence de tests d'intégration sur la base de données réelle"
          ],
          "title": "Problèmes & Périmètre"
        },
        {
          "type": "bullets",
          "items": [
            "J'ai corrigé le bug de durée : remplacement de la logique de calcul pour les séjours > 24h",
            "TDD Feature 1 : j'ai écrit les tests en premier → prix à 0 pour stationnement < 30 min",
            "TDD Feature 2 : j'ai écrit les tests en premier → réduction 5% après vérification de la plaque d'immatriculation",
            "J'ai écrit les tests unitaires ParkingService avec Mockito — couverture > 90%",
            "J'ai écrit les tests d'intégration ParkingDataBaseIT sur base de données réelle — couverture globale > 70%",
            "J'ai généré les rapports JaCoCo et Surefire, validés par le jury"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Java + Maven — build et gestion des dépendances",
            "JUnit 5 — framework de tests unitaires",
            "Mockito — mocks (TicketDAO, ParkingSpotDAO, InputReaderUtil)",
            "JaCoCo — rapport de couverture de code",
            "Surefire — rapport d'exécution des tests",
            "MySQL — base de données pour les tests d'intégration",
            "Git — versionning avec branches feature/fix"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analyse du code",
              "description": "J'ai relu le projet existant et identifié le bug de durée ainsi que les fonctionnalités manquantes"
            },
            {
              "label": "Bug fix",
              "description": "J'ai corrigé le calcul de durée négatif pour les stationnements supérieurs à 24h"
            },
            {
              "label": "TDD Feature 1",
              "description": "J'ai écrit les tests d'abord, puis implémenté la gratuité des 30 premières minutes"
            },
            {
              "label": "TDD Feature 2",
              "description": "J'ai écrit les tests d'abord, puis implémenté la remise de 5% pour les utilisateurs récurrents"
            },
            {
              "label": "Tests unitaires",
              "description": "J'ai ajouté des mocks Mockito sur ParkingService — couverture > 90%"
            },
            {
              "label": "Tests d'intégration",
              "description": "J'ai écrit les tests ParkingDataBaseIT sur base réelle — couverture globale > 70%, soutenance validée 4/4"
            }
          ],
          "title": "Étapes du projet"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Compétences validées",
              "value": "4/4"
            },
            {
              "label": "Couverture globale (JaCoCo)",
              "value": ">70%"
            },
            {
              "label": "Couverture ParkingService",
              "value": ">90%"
            },
            {
              "label": "Fonctionnalités TDD livrées",
              "value": "2"
            }
          ],
          "title": "Résultats de la soutenance"
        }
      ]
    },
    "es": {
      "title": "Tests Java y entrega TDD (Parkit)",
      "heroSubtitle": "TDD + pruebas unitarias y de integración en un sistema de pago de parking en Java (Park’it)",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Park’it es un backend de pago de aparcamiento (interfaz en terminal) que debe pasar de una beta a una versión más robusta. El equipo de producto esperaba correcciones de errores, una estrategia de pruebas y nuevas funcionalidades antes de ampliar el despliegue.",
            "Las expectativas incluían: corregir las regresiones existentes, desarrollar nuevas reglas de tarificación en TDD, completar las pruebas de integración pendientes y proporcionar evidencias de ejecución (informes Surefire + JaCoCo)."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Corregir el error de tarificación que producía duraciones negativas cuando el vehículo permanecía más de 24h.",
            "Implementar la gratuidad de los primeros 30 minutos (0$) y cubrirla con pruebas unitarias (TDD).",
            "Implementar un descuento del 5% para usuarios recurrentes (según el número de tickets) y cubrirlo con pruebas unitarias (TDD).",
            "Reforzar las pruebas de ParkingService mediante mocks de Mockito y alcanzar una alta cobertura en esa clase.",
            "Completar los TODO de las pruebas de integración (base de datos) y alcanzar una cobertura global >= 70%."
          ],
          "title": "Objetivos y requisitos"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Línea base y reproducción",
              "description": "Configuré el versionado, ejecuté mvn test / mvn verify, y analicé las pruebas fallidas para aislar las causas."
            },
            {
              "title": "Corrección: duración negativa (>24h)",
              "description": "Corregí el cálculo de duración mediante timestamps en milisegundos (Date.getTime()), con una conversión coherente a minutos."
            },
            {
              "title": "TDD: 30 minutos gratuitos",
              "description": "Escribí pruebas unitarias (coche + moto) para estancias < 30 minutos, y adapté FareCalculatorService para devolver una tarifa de 0 en ese caso."
            },
            {
              "title": "TDD: descuento 5% usuario recurrente",
              "description": "Añadí un flujo calculateFare(Ticket, boolean), implementé el conteo en TicketDAO (getNbTicket), y apliqué el descuento cuando el usuario no estaba en su primer uso."
            },
            {
              "title": "Refuerzo de pruebas unitarias (Mockito)",
              "description": "Amplié las pruebas unitarias de ParkingService mediante mocks (TicketDAO, ParkingSpotDAO, InputReader), y añadí pruebas específicas para cubrir los caminos exitosos y de error."
            },
            {
              "title": "Pruebas de integración + informes",
              "description": "Terminé los TODO en ParkingDatabaseIT, añadí una prueba de integración para el descuento (usuario recurrente), y generé los informes Surefire + JaCoCo mediante mvn verify."
            }
          ],
          "title": "Flujo de implementación"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Fiabilidad de tarificación",
              "value": "Error de duración negativa corregido"
            },
            {
              "label": "Funcionalidades entregadas",
              "value": "30 min gratis + descuento 5% usuario recurrente"
            },
            {
              "label": "Alcance de pruebas",
              "value": "Pruebas unitarias + pruebas de integración (BD)"
            },
            {
              "note": "Verificado vía JaCoCo",
              "label": "Objetivos de cobertura",
              "value": ">= 70% global; > 90% en ParkingService (instrucciones)"
            },
            {
              "note": "Capturas incluidas en los entregables",
              "label": "Evidencias",
              "value": "Informes Surefire + JaCoCo capturados"
            }
          ],
          "title": "Resultados de calidad"
        },
        {
          "code": "https://github.com/Aiyeesha/ParkingSystem.git",
          "type": "code",
          "title": "Repositorio",
          "language": "text"
        }
      ]
    }
  }
};

export default details;
