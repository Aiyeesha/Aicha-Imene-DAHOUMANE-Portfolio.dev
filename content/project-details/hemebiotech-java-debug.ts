// content/project-details/hemebiotech-java-debug.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "hemebiotech-java-debug",
  "gallery": [
    {
      "alt": "Cover",
      "src": "/projects/hemebiotech-java-debug/cover.webp"
    },
    {
      "alt": "Screenshot 1",
      "src": "/projects/hemebiotech-java-debug/screenshot-1.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Java debugging & refactor (Heme Biotech)",
      "heroSubtitle": "Debugging and fixing a Java application for medical needs prediction at Hemebiotech.",
      "sections": [
        {
          "body": "Heme Biotech (\"Remedies for those we love\"), a pharmaceutical company specializing in blood disorders, had assigned a chemistry researcher to build a small Java trend-analysis tool: read a symptom file and output each symptom's count, alphabetically sorted. The researcher got stuck with a counter that always returned 0. In the training scenario, the CTO then handed me the follow-up: diagnose the bug, refactor the code to Java OOP standards, and document everything in Javadoc for team handover.",
          "type": "text",
          "title": "Context"
        },
        {
          "type": "bullets",
          "items": [
            "Symptom counter consistently returning 0, regardless of the actual number of occurrences in the file (e.g. 3 occurrences of \"headache\" → 0 in the output)",
            "Monolithic code with no separation of concerns between reading, counting and writing",
            "No interfaces or OOP patterns in place",
            "Naming not compliant with Java camelCase conventions",
            "No Javadoc documentation available for team handover"
          ],
          "title": "Problem Scope"
        },
        {
          "type": "bullets",
          "items": [
            "I fixed the bug with a TreeMap.merge() aggregation: a single data structure handles both exact counting and native alphabetical ordering — no separate sort step needed",
            "I delegated reading to ReadSymptomDataFromFile, implementing the ISymptomReader interface (getSymptoms())",
            "I encapsulated writing in WriteSymptomDataToFile, implementing ISymptomWriter",
            "I refocused AnalyticsCounter on 2 responsibilities: countSymptoms() (TreeMap aggregation) and writeSymptoms() (output file generation)",
            "I isolated the entry point into a dedicated Main class orchestrating read → count → write",
            "I applied camelCase naming throughout the entire codebase",
            "I wrote full Javadoc on all public methods",
            "I generated a result.out file with alphabetically sorted symptoms and exact counts"
          ],
          "title": "Solution & Deliverables"
        },
        {
          "type": "bullets",
          "items": [
            "Java 8+ — primary language",
            "TreeMap — data structure for natural ordering and accurate counting",
            "Java Interfaces — ISymptomReader, ISymptomWriter",
            "Javadoc — automated code documentation",
            "Git — dev → main workflow, atomic commits per step",
            "IntelliJ IDEA — development environment"
          ],
          "title": "Stack & Technologies"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analysis & diagnosis",
              "description": "I reviewed the code, identified the bug (TreeMap logic), and mapped out the OOP violations"
            },
            {
              "label": "Bug fix",
              "description": "I replaced the broken counter logic with a TreeMap for correct counting and natural ordering"
            },
            {
              "label": "OOP refactor",
              "description": "I created interfaces, separated classes, and applied camelCase naming throughout"
            },
            {
              "label": "Documentation",
              "description": "I wrote full Javadoc for all public methods"
            },
            {
              "label": "Validation & delivery",
              "description": "I ran manual tests, generated result.out, and passed my defense with 2/2 skills validated"
            }
          ],
          "title": "Project Timeline"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Skills validated",
              "value": "2/2"
            },
            {
              "label": "Bugs fixed",
              "value": "1 critical"
            },
            {
              "label": "Classes created",
              "value": "4"
            },
            {
              "label": "Interfaces",
              "value": "2"
            }
          ],
          "title": "Defense Results"
        }
      ]
    },
    "fr": {
      "title": "Débogage & refactoring Java (Heme Biotech)",
      "heroSubtitle": "Débogage et correction d'une application Java de prédiction des besoins médicaux chez Hemebiotech.",
      "sections": [
        {
          "body": "Heme Biotech (\"Des remèdes pour ceux qu'on aime\"), entreprise pharmaceutique spécialisée dans les troubles sanguins, avait confié à un chercheur en chimie le développement d'un petit outil Java d'analyse de tendances : lire un fichier de symptômes et produire le décompte de chacun, trié alphabétiquement. Le chercheur s'est retrouvé bloqué avec un compteur qui retournait toujours 0. Dans le scénario de formation, la directrice technique m'a confié la suite : diagnostiquer le bug, refactoriser vers des standards Java OOP, et documenter le tout en Javadoc pour la reprise en équipe.",
          "type": "text",
          "title": "Contexte"
        },
        {
          "type": "bullets",
          "items": [
            "Compteur de symptômes retournant systématiquement 0, quel que soit le nombre réel d'occurrences dans le fichier (ex. 3 occurrences de \"maux de tête\" → 0 en sortie)",
            "Code monolithique sans séparation des responsabilités entre lecture, comptage et écriture",
            "Absence d'interfaces et de patterns OOP",
            "Nommage non conforme aux conventions Java (camelCase)",
            "Aucune documentation Javadoc disponible pour la reprise par l'équipe"
          ],
          "title": "Problèmes & Périmètre"
        },
        {
          "type": "bullets",
          "items": [
            "J'ai résolu le bug par agrégation via TreeMap.merge() : une seule structure de données gère à la fois le comptage exact et l'ordre alphabétique natif — plus besoin d'étape de tri séparée",
            "J'ai délégué la lecture à ReadSymptomDataFromFile, qui implémente l'interface ISymptomReader (getSymptoms())",
            "J'ai encapsulé l'écriture dans WriteSymptomDataToFile, qui implémente ISymptomWriter",
            "J'ai recentré AnalyticsCounter sur 2 responsabilités : countSymptoms() (agrégation TreeMap) et writeSymptoms() (génération du fichier de sortie)",
            "J'ai isolé le point d'entrée dans une classe Main dédiée qui orchestre lecture → comptage → écriture",
            "J'ai appliqué le nommage camelCase sur l'ensemble du code",
            "J'ai rédigé une Javadoc complète sur toutes les méthodes publiques",
            "J'ai généré un fichier result.out avec les symptômes triés alphabétiquement et leur décompte exact"
          ],
          "title": "Solution & Livrables"
        },
        {
          "type": "bullets",
          "items": [
            "Java 8+ — langage principal",
            "TreeMap — structure de données pour tri naturel et comptage exact",
            "Interfaces Java — ISymptomReader, ISymptomWriter",
            "Javadoc — documentation automatique du code",
            "Git — workflow dev → main, commits atomiques par étape",
            "IntelliJ IDEA — environnement de développement"
          ],
          "title": "Stack et outils"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "label": "Analyse & diagnostic",
              "description": "J'ai relu le code existant, identifié le bug TreeMap et cartographié les violations OOP"
            },
            {
              "label": "Correction du bug",
              "description": "J'ai remplacé la logique de comptage défaillante par une TreeMap pour un tri et un comptage corrects"
            },
            {
              "label": "Refactorisation OOP",
              "description": "J'ai créé les interfaces, séparé les classes, et appliqué le nommage camelCase sur l'ensemble du code"
            },
            {
              "label": "Documentation",
              "description": "J'ai rédigé la Javadoc complète sur toutes les méthodes publiques"
            },
            {
              "label": "Validation & livraison",
              "description": "J'ai effectué les tests manuels, généré le fichier result.out, et validé ma soutenance avec 2/2 compétences"
            }
          ],
          "title": "Étapes du projet"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Compétences validées",
              "value": "2/2"
            },
            {
              "label": "Bugs corrigés",
              "value": "1 critique"
            },
            {
              "label": "Classes créées",
              "value": "4"
            },
            {
              "label": "Interfaces",
              "value": "2"
            }
          ],
          "title": "Résultats de la soutenance"
        }
      ]
    },
    "es": {
      "title": "Depuración y refactorización Java (Heme Biotech)",
      "heroSubtitle": "Depurar y refactorizar una aplicación Java de análisis de síntomas (Heme Biotech)",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "Heme Biotech necesitaba un programa de análisis sencillo: leer un archivo de síntomas y generar el número de ocurrencias por síntoma.",
            "La lectura del archivo era correcta, pero el conteo era incorrecto: el contador siempre devolvía 0, sin importar el número real de apariciones (ej. 3 apariciones de \"dolor de cabeza\" → 0 en la salida). El investigador se quedó bloqueado en este punto; en el escenario de formación, la directora técnica me encargó el resto: diagnosticar el error, refactorizar el código a POO y documentarlo todo para el traspaso al equipo."
          ]
        },
        {
          "type": "bullets",
          "items": [
            "Corregir el conteo para agregar correctamente las ocurrencias de cada síntoma.",
            "Generar un archivo de salida (result.out) ordenado alfabéticamente, con el formato: síntoma, cantidad.",
            "Refactorizar en POO (interfaces + métodos cortos) para hacer el código mantenible.",
            "Aplicar un flujo de trabajo Git limpio (rama dev, commits frecuentes, historial claro)."
          ],
          "title": "Objetivos"
        },
        {
          "type": "timeline",
          "steps": [
            {
              "title": "Reproducir y aislar el error",
              "description": "Ejecuté el programa en local, comparé la salida con el comportamiento esperado y localicé el punto de cálculo de las ocurrencias."
            },
            {
              "title": "Corrección del conteo + casos límite",
              "description": "Implementé un conteo robusto (agregación vía Map) y validé el incremento en síntomas repetidos."
            },
            {
              "title": "Refactorización mediante interfaces",
              "description": "Creé la interfaz de escritura (ISymptomWriter) y dividí el proceso en etapas: leer → contar → ordenar → escribir."
            },
            {
              "title": "Orden alfabético determinista",
              "description": "Usé una estructura ordenada (TreeMap) para garantizar el orden alfabético sin lógica de ordenación adicional."
            },
            {
              "title": "Refuerzo de la calidad",
              "description": "Limpié el código (naming camelCase, eliminación de comentarios innecesarios), añadí Javadoc, indentación y validaciones repetidas."
            }
          ],
          "title": "Enfoque"
        },
        {
          "code": "javac com/hemebiotech/analytics/*.java\njava -cp \".\" com.hemebiotech.analytics.Main",
          "type": "code",
          "title": "Ejecutar en local",
          "language": "bash"
        },
        {
          "type": "metrics",
          "items": [
            {
              "label": "Conteo correcto",
              "value": "Los recuentos coinciden con las ocurrencias del archivo"
            },
            {
              "label": "Salida ordenada",
              "value": "Orden alfabético garantizado (TreeMap)"
            },
            {
              "label": "Arquitectura mantenible",
              "value": "Interfaces reader/writer + métodos cortos"
            },
            {
              "label": "Listo para trabajo en equipo",
              "value": "Flujo Git + código documentado (Javadoc)"
            }
          ],
          "title": "Resultados"
        },
        {
          "type": "resources",
          "items": [
            {
              "href": "https://github.com/Aiyeesha/Hemebiotech",
              "label": "Repositorio GitHub"
            }
          ],
          "title": "Entregables"
        }
      ]
    }
  }
};

export default details;
