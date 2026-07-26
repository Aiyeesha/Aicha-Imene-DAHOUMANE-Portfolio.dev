// AUTO-GENERATED — do not hand-edit.
// Exported from Supabase (public.projects) by scripts/export-projects-from-supabase.ts.
// Re-run that script after any content change in Supabase to keep this file current.
// Last export: 2026-07-26T10:46:32.084Z

import type { GalleryImage } from "@/components/ImageGallery";

export type ProjectSection =
  | { type: "bullets"; title: string; items: string[] }
  | { type: "text"; title: string; paragraphs?: string[]; body?: string }
  | { type: "metrics"; title: string; items: { label: string; value: string; note?: string }[] }
  | { type: "timeline"; title: string; steps: { title?: string; label?: string; description: string }[] }
  | { type: "resources"; title: string; items: { label: string; href: string; note?: string }[] }
  | { type: "code"; title: string; language?: string; code: string; downloadUrl?: string };

export type ProjectDetails = {
  slug: string;
  locales?: {
    en?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    fr?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
    es?: { title?: string; heroSubtitle?: string; sections?: ProjectSection[] };
  };
  gallery?: GalleryImage[];
};

/**
 * Per-project content (sections + gallery), mirrored from Supabase.
 * Screenshots live under /public/projects/<slug>/.
 */
export const projectDetails: ProjectDetails[] = [
  {
    "slug": "hardware-upgrade-hp-laptop",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/hardware-upgrade-hp-laptop/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/hardware-upgrade-hp-laptop/screenshot-1.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "HP Laptop Hardware Upgrade — RAM & SSD",
        "heroSubtitle": "RAM doubled, HDD swapped for SSD, system cloned with Acronis — full hardware upgrade on an HP laptop with zero data loss.",
        "sections": [
          {
            "body": "A friend's HP laptop had two blocking issues: sluggishness (16 GB RAM insufficient for daily multi-tab use) and a nearly full 500 GB HDD. Rather than buying a new machine, I proposed a targeted hardware upgrade: double the RAM and replace the HDD with a larger, faster SSD — cloning all data to guarantee zero data loss and no reinstallation.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Two bottlenecks identified: insufficient RAM (constant paging) and slow mechanical HDD (boot and app launch times)",
              "HP service manual checked: 2 SO-DIMM DDR4-2666 slots (max 32 GB) and a 2.5\" SATA storage slot",
              "2× Samsung DDR4-2666 SO-DIMM 16 GB selected — same brand as original for dual-channel compatibility",
              "Samsung 2 TB SATA SSD selected — same interface, no adapter needed",
              "Acronis True Image verified as compatible with HDD→SSD cloning on Windows before proceeding"
            ],
            "title": "Diagnosis & Component Selection"
          },
          {
            "type": "bullets",
            "items": [
              "Samsung DDR4-2666 SO-DIMM 16 GB × 2 — RAM upgrade in dual-channel",
              "Samsung 2 TB SATA 2.5\" SSD — mechanical HDD replacement",
              "Acronis True Image — full disk clone (OS + data + partitions)",
              "USB-to-SATA adapter — SSD connection for cloning before opening the laptop",
              "Phillips screwdriver + plastic spudger — disassembly without chassis damage",
              "Windows Task Manager & Disk Management — post-swap validation (RAM detected, SSD capacity)"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Parts received & verified",
                "description": "2× DDR4 16 GB sticks and Samsung 2 TB SSD received. References cross-checked against laptop specs — compatibility confirmed before opening."
              },
              {
                "label": "Acronis clone",
                "description": "SSD connected via USB-to-SATA adapter. Acronis True Image → full HDD clone (OS, apps, data, partitions) to the 2 TB SSD. Partition layout preserved — zero data loss risk."
              },
              {
                "label": "Disassembly",
                "description": "Laptop powered off, charger unplugged. Bottom cover removed (≈10 screws). Plastic spudger used to release cover clips. Battery connector disconnected before touching any components."
              },
              {
                "label": "RAM swap",
                "description": "Clips released, original 16 GB stick removed. 2 new DDR4 16 GB sticks inserted at 45° into both slots until clips clicked into place."
              },
              {
                "label": "HDD → SSD replacement",
                "description": "HDD bracket unscrewed, SATA + power connector disconnected from old 500 GB HDD. Cloned 2 TB SSD connected in its place. Bracket resecured."
              },
              {
                "label": "First boot & validation",
                "description": "Cover reassembled. Windows booted from cloned SSD on first attempt — no recovery prompt. Task Manager: 32 GB RAM detected. Disk Management: 2 TB visible. Windows Update and drivers applied."
              }
            ],
            "title": "Step-by-Step Procedure"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "DDR4-2666 dual-channel",
                "label": "RAM",
                "value": "16 → 32 GB"
              },
              {
                "note": "Same SATA interface",
                "label": "Storage",
                "value": "500 GB HDD → 2 TB SSD"
              },
              {
                "note": "Full Acronis clone",
                "label": "Data loss",
                "value": "Zero"
              },
              {
                "note": "Cloned system — first boot successful",
                "label": "Reinstallation",
                "value": "None"
              }
            ],
            "title": "Before / After"
          }
        ]
      },
      "fr": {
        "title": "Upgrade matériel PC portable HP — RAM & SSD",
        "heroSubtitle": "RAM doublée, HDD remplacé par un SSD, système cloné avec Acronis — upgrade complet d'un PC portable HP sans aucune perte de données.",
        "sections": [
          {
            "body": "Le PC portable HP d une amie souffrait de deux problèmes bloquants : un manque de réactivité (16 Go de RAM insuffisants pour un usage quotidien multi-onglets) et un espace disque saturé (HDD 500 Go presque plein). Plutôt qu acheter un nouveau PC, j ai proposé un upgrade matériel ciblé : doubler la RAM et remplacer le HDD par un SSD plus grand — en clonant les données pour garantir zéro perte, zéro réinstallation.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Deux goulots identifiés : RAM insuffisante (pagination constante) et HDD mécanique lent (démarrage et lancement des apps)",
              "Manuel de service HP consulté : 2 emplacements SO-DIMM DDR4-2666 (max 32 Go) et slot SATA 2,5\"",
              "2 barrettes Samsung DDR4-2666 SO-DIMM 16 Go sélectionnées — même marque que l origine pour compatibilité dual-channel",
              "SSD Samsung 2 To SATA sélectionné — même interface, aucun adaptateur nécessaire",
              "Acronis True Image vérifié comme compatible avec le clonage HDD→SSD sous Windows avant intervention"
            ],
            "title": "Diagnostic & Sélection des composants"
          },
          {
            "type": "bullets",
            "items": [
              "Samsung DDR4-2666 SO-DIMM 16 Go × 2 — upgrade RAM en dual-channel",
              "Samsung SSD 2 To SATA 2,5\" — remplacement HDD mécanique",
              "Acronis True Image — clonage complet du disque (OS + données + partitions)",
              "Adaptateur USB-SATA — connexion du SSD pour clonage avant ouverture du PC",
              "Tournevis cruciforme + spudger plastique — démontage sans endommager le châssis",
              "Windows Task Manager & Disk Management — validation post-swap (RAM détectée, capacité SSD)"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Réception & vérification",
                "description": "2 barrettes DDR4 16 Go et SSD Samsung 2 To reçus. Références croisées avec les specs du laptop — compatibilité confirmée avant ouverture."
              },
              {
                "label": "Clonage Acronis",
                "description": "SSD connecté via adaptateur USB-SATA. Acronis True Image → clonage du HDD 500 Go complet (OS, apps, données, partitions) vers le SSD 2 To. Partitions préservées — zéro risque de perte de données."
              },
              {
                "label": "Démontage",
                "description": "PC éteint, chargeur débranché. Capot inférieur retiré (≈10 vis). Spudger plastique pour libérer les clips. Connecteur batterie déconnecté avant tout contact avec les composants."
              },
              {
                "label": "Échange de la RAM",
                "description": "Clips libérés, barrette d origine 16 Go retirée. 2 nouvelles barrettes DDR4 16 Go insérées à 45° dans les deux emplacements jusqu au clic des clips."
              },
              {
                "label": "Remplacement HDD → SSD",
                "description": "Support HDD dévissé, connecteur SATA + alimentation déconnecté du HDD 500 Go. SSD cloné 2 To connecté à sa place. Support refixé."
              },
              {
                "label": "Premier démarrage & validation",
                "description": "Capot remonté. Windows démarre du SSD cloné au premier essai — aucune invite de récupération. Task Manager : 32 Go RAM détectés. Disk Management : 2 To visibles. Windows Update et pilotes mis à jour."
              }
            ],
            "title": "Procédure étape par étape"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "DDR4-2666 dual-channel",
                "label": "RAM",
                "value": "16 → 32 Go"
              },
              {
                "note": "Interface SATA conservée",
                "label": "Stockage",
                "value": "500 Go HDD → 2 To SSD"
              },
              {
                "note": "Clone Acronis complet",
                "label": "Perte de données",
                "value": "Zéro"
              },
              {
                "note": "Système cloné — premier démarrage réussi",
                "label": "Réinstallation",
                "value": "Aucune"
              }
            ],
            "title": "Avant / Après"
          }
        ]
      },
      "es": {
        "title": "Laptop hardware upgrade (RAM + SSD)",
        "heroSubtitle": "Samsung DDR4 · Samsung SSD · Clonado Acronis · HP Laptop · Proyecto personal",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "El portátil HP de una amiga sufría dos problemas bloqueantes: falta de fluidez (16 GB de RAM insuficientes para un uso diario con múltiples pestañas) y espacio en disco saturado (HDD de 500 GB casi lleno). En lugar de comprar un ordenador nuevo, propuse una actualización de hardware específica: duplicar la RAM y sustituir el HDD por un SSD de mayor capacidad — clonando los datos para garantizar cero pérdidas y cero reinstalación."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Dos cuellos de botella identificados: RAM insuficiente (paginación constante) y HDD mecánico lento (arranque y apertura de apps)",
              "Manual de servicio de HP consultado: 2 ranuras SO-DIMM DDR4-2666 (máx. 32 GB) y bahía SATA de 2,5 pulgadas",
              "2 módulos Samsung DDR4-2666 SO-DIMM de 16 GB seleccionados — misma marca que el original para compatibilidad dual-channel",
              "SSD Samsung de 2 TB SATA seleccionado — misma interfaz, sin adaptador necesario",
              "Acronis True Image verificado como compatible con la clonación HDD→SSD en Windows antes de la intervención"
            ],
            "title": "Diagnóstico y selección de componentes"
          },
          {
            "type": "bullets",
            "items": [
              "Samsung DDR4-2666 SO-DIMM 16 GB × 2 — actualización de RAM en dual-channel",
              "SSD Samsung 2 TB SATA 2,5 pulgadas — sustitución del HDD mecánico",
              "Acronis True Image — clonación completa del disco (SO + datos + particiones)",
              "Adaptador USB-SATA — conexión del SSD para clonar antes de abrir el equipo",
              "Destornillador Phillips + spudger de plástico — desmontaje sin dañar el chasis",
              "Windows Task Manager y Administración de discos — validación posterior (RAM detectada, capacidad del SSD)"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Recepción y verificación",
                "description": "2 módulos DDR4 de 16 GB y SSD Samsung de 2 TB recibidos. Referencias cruzadas con las especificaciones del portátil — compatibilidad confirmada antes de abrir el equipo."
              },
              {
                "label": "Clonación con Acronis",
                "description": "SSD conectado mediante adaptador USB-SATA. Acronis True Image → clonación completa del HDD de 500 GB (SO, apps, datos, particiones) al SSD de 2 TB. Particiones preservadas — cero riesgo de pérdida de datos."
              },
              {
                "label": "Desmontaje",
                "description": "Equipo apagado, cargador desconectado. Tapa inferior retirada (≈10 tornillos). Spudger de plástico para liberar los clips. Conector de batería desconectado antes de tocar los componentes."
              },
              {
                "label": "Sustitución de la RAM",
                "description": "Clips liberados, módulo original de 16 GB retirado. 2 nuevos módulos DDR4 de 16 GB insertados a 45° en ambas ranuras hasta el clic de los clips."
              },
              {
                "label": "Sustitución HDD → SSD",
                "description": "Soporte del HDD desatornillado, conector SATA + alimentación desconectados del HDD de 500 GB. SSD clonado de 2 TB conectado en su lugar. Soporte fijado de nuevo."
              },
              {
                "label": "Primer arranque y validación",
                "description": "Tapa colocada de nuevo. Windows arranca desde el SSD clonado a la primera — sin mensajes de recuperación. Task Manager: 32 GB de RAM detectados. Administración de discos: 2 TB visibles. Windows Update y controladores actualizados."
              }
            ],
            "title": "Procedimiento paso a paso"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "DDR4-2666 dual-channel",
                "label": "RAM",
                "value": "16 → 32 GB"
              },
              {
                "note": "Interfaz SATA conservada",
                "label": "Almacenamiento",
                "value": "500 GB HDD → 2 TB SSD"
              },
              {
                "note": "Clon completo con Acronis",
                "label": "Pérdida de datos",
                "value": "Cero"
              },
              {
                "note": "Sistema clonado — primer arranque exitoso",
                "label": "Reinstalación",
                "value": "Ninguna"
              }
            ],
            "title": "Antes / Después"
          }
        ]
      }
    }
  },
  {
    "slug": "hemebiotech-java-debug",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/hemebiotech-java-debug/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/hemebiotech-java-debug/screenshot-1.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Java debugging & refactor (Heme Biotech)",
        "heroSubtitle": "Debugging and fixing a Java application for medical needs prediction at Hemebiotech.",
        "sections": [
          {
            "body": "Heme Biotech (\"Remedies for those we love\"), a pharmaceutical company specializing in blood disorders, had assigned Alex, a chemistry researcher, to build a small Java trend-analysis tool: read a symptom file and output each symptom's count, alphabetically sorted. Alex got stuck with a counter that always returned 0. Caroline, CTO and co-founder, handed the rest to an incoming dev intern: diagnose the bug, refactor to Java OOP standards, and document everything in Javadoc for team handover.",
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
              "Bug fixed via TreeMap.merge() aggregation: a single data structure handles both exact counting and native alphabetical ordering — no separate sort step needed",
              "Reading delegated to ReadSymptomDataFromFile, implementing the ISymptomReader interface (getSymptoms())",
              "Writing encapsulated in WriteSymptomDataToFile, implementing ISymptomWriter",
              "AnalyticsCounter refocused on 2 responsibilities: countSymptoms() (TreeMap aggregation) and writeSymptoms() (output file generation)",
              "Entry point isolated into a dedicated Main class orchestrating read → count → write",
              "camelCase naming applied throughout the entire codebase",
              "Full Javadoc on all public methods",
              "result.out file generated with alphabetically sorted symptoms and exact counts"
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
                "description": "Code review, bug identification (TreeMap logic), mapping of OOP violations"
              },
              {
                "label": "Bug fix",
                "description": "Replaced broken counter logic with TreeMap for correct counting and natural ordering"
              },
              {
                "label": "OOP refactor",
                "description": "Interfaces created, classes separated, camelCase naming applied throughout"
              },
              {
                "label": "Documentation",
                "description": "Full Javadoc written for all public methods"
              },
              {
                "label": "Validation & delivery",
                "description": "Manual testing, result.out generation, defense validated with 2/2 skills"
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
            "body": "Heme Biotech (\"Des remèdes pour ceux qu'on aime\"), entreprise pharmaceutique spécialisée dans les troubles sanguins, avait confié à Alex, chercheur en chimie, le développement d'un petit outil Java d'analyse de tendances : lire un fichier de symptômes et produire le décompte de chacun, trié alphabétiquement. Alex s'est retrouvé bloqué avec un compteur qui retournait toujours 0. Caroline, directrice technique et cofondatrice, a confié la suite à un stagiaire dev : diagnostiquer le bug, refactoriser vers des standards Java OOP, et documenter le tout en Javadoc pour la reprise en équipe.",
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
              "Bug résolu par agrégation via TreeMap.merge() : une seule structure de données gère à la fois le comptage exact et l'ordre alphabétique natif — plus besoin d'étape de tri séparée",
              "Lecture déléguée à ReadSymptomDataFromFile, qui implémente l'interface ISymptomReader (getSymptoms())",
              "Écriture encapsulée dans WriteSymptomDataToFile, qui implémente ISymptomWriter",
              "AnalyticsCounter recentrée sur 2 responsabilités : countSymptoms() (agrégation TreeMap) et writeSymptoms() (génération du fichier de sortie)",
              "Point d'entrée isolé dans une classe Main dédiée qui orchestre lecture → comptage → écriture",
              "Nommage camelCase appliqué sur l'ensemble du code",
              "Javadoc complète sur toutes les méthodes publiques",
              "Fichier result.out généré avec les symptômes triés alphabétiquement et leur décompte exact"
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
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse & diagnostic",
                "description": "Lecture du code existant, identification du bug TreeMap et cartographie des violations OOP"
              },
              {
                "label": "Correction du bug",
                "description": "Remplacement de la logique de comptage défaillante par une TreeMap pour un tri et un comptage corrects"
              },
              {
                "label": "Refactorisation OOP",
                "description": "Création des interfaces, classes séparées, nommage camelCase sur l ensemble du code"
              },
              {
                "label": "Documentation",
                "description": "Rédaction de la Javadoc complète sur toutes les méthodes publiques"
              },
              {
                "label": "Validation & livraison",
                "description": "Tests manuels, génération du fichier result.out, soutenance validée avec 2/2 compétences"
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
        "title": "Java debugging & refactor (Heme Biotech)",
        "heroSubtitle": "Depurar y refactorizar una aplicación Java de análisis de síntomas (Heme Biotech)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Heme Biotech necesitaba un programa de análisis sencillo: leer un archivo de síntomas y generar el número de ocurrencias por síntoma.",
              "La lectura del archivo era correcta, pero el conteo era incorrecto: el contador siempre devolvía 0, sin importar el número real de apariciones (ej. 3 apariciones de \"dolor de cabeza\" → 0 en la salida). Alex, investigador de química, se quedó bloqueado en este punto; Caroline, directora técnica y cofundadora, encargó el resto a un becario de desarrollo."
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
                "description": "Ejecución local, comparación de la salida con el comportamiento esperado, y localización del punto de cálculo de las ocurrencias."
              },
              {
                "title": "Corrección del conteo + casos límite",
                "description": "Implementación de un conteo robusto (agregación vía Map) y validación del incremento en síntomas repetidos."
              },
              {
                "title": "Refactorización mediante interfaces",
                "description": "Creación de la interfaz de escritura (ISymptomWriter) y división en etapas: leer → contar → ordenar → escribir."
              },
              {
                "title": "Orden alfabético determinista",
                "description": "Uso de una estructura ordenada (TreeMap) para garantizar el orden alfabético sin lógica de ordenación adicional."
              },
              {
                "title": "Refuerzo de la calidad",
                "description": "Limpieza del código (naming camelCase, eliminación de comentarios innecesarios), añadido de Javadoc, indentación y validaciones repetidas."
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
          },
          {
            "code": "https://github.com/Aiyeesha/Hemebiotech",
            "type": "code",
            "title": "Repositorio GitHub",
            "language": "text"
          }
        ]
      }
    }
  },
  {
    "slug": "homelab-cowrie-honeypot",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-cowrie-honeypot/screenshot-13.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "SSH/Telnet Honeypot with Cowrie",
        "heroSubtitle": "Intrusion simulation and forensic log analysis on an isolated cybersecurity lab",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "This project is part of a personal cybersecurity lab built on VMware Workstation Pro, with an attacker machine (Kali Linux) and a target machine (Debian) isolated on a dedicated virtual network (VMnet2), with no access to production networks or the Internet.",
              "Goal: deploy an SSH/Telnet honeypot (Cowrie) on the target, simulate a realistic brute-force attack from the attacker machine, then thoroughly analyze the traces left behind."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Deploy and configure Cowrie to emulate a vulnerable SSH service, redirecting the real SSH service to a non-standard port.",
              "Run a realistic brute-force attack (Hydra) against the honeypot from the attacker machine.",
              "Extract and analyze the JSON logs generated by Cowrie (typed commands, file download attempts).",
              "Fully document the process, including incidents encountered, in a Notion knowledge base."
            ],
            "title": "Objectives"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Honeypot setup",
                "description": "Installed Cowrie on the target, redirected port 22 to the honeypot via iptables and moved the real SSH service to port 2200, with persistent rules via iptables-persistent."
              },
              {
                "title": "Major incident: lost access to the attacker machine",
                "description": "Locked out of the Kali Linux password with no usable recovery snapshot. Decided to fully reinstall the VM from the official image rather than attempt an uncertain recovery."
              },
              {
                "title": "Brute-force attack",
                "description": "Launched Hydra against the honeypot. First attempt failed (default parallelism too high for Cowrie's Twisted-based SSH implementation), fixed by lowering the number of parallel tasks."
              },
              {
                "title": "Forensic log analysis",
                "description": "Extracted JSON events with jq: commands typed by the simulated attacker, file download attempts, full session reconstruction."
              }
            ],
            "title": "Project timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Passwords compromised",
                "value": "3 / 3 tested"
              },
              {
                "label": "Attacker commands captured",
                "value": "17"
              },
              {
                "label": "File download attempts",
                "value": "0 (blocked, isolated target)"
              },
              {
                "label": "Restore snapshots",
                "value": "2 (target + attacker)"
              }
            ],
            "title": "Results"
          },
          {
            "type": "text",
            "title": "Incident management",
            "paragraphs": [
              "The most instructive part of this project was unplanned: a configuration mistake locked access to the attacker machine, with no usable snapshot to roll back to.",
              "Rather than losing time on an uncertain recovery (failed GRUB single-user attempt), the VM was fully reinstalled from the official Kali image, network configuration and tooling restored, and the planned attack resumed. This incident is documented in detail in the project log, with a full timeline and remediation commands."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux (attacker) and Debian (target) on VMware Workstation Pro 17",
              "Cowrie (SSH/Telnet honeypot, Python deployment via pip)",
              "Hydra (brute-force attack)",
              "iptables / iptables-persistent (port redirection, persistent rules)",
              "jq (JSON log extraction and analysis)"
            ],
            "title": "Stack and tools"
          }
        ]
      },
      "fr": {
        "title": "Honeypot SSH/Telnet avec Cowrie",
        "heroSubtitle": "Simulation d'intrusion et analyse forensique sur un lab cybersécurité isolé",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Ce projet fait partie d'un lab cybersécurité personnel construit sous VMware Workstation Pro, avec une machine attaquante (Kali Linux) et une machine cible (Debian) isolées sur un réseau virtuel dédié (VMnet2), sans accès au réseau de production ni à Internet.",
              "L'objectif : déployer un honeypot SSH/Telnet (Cowrie) sur la machine cible, simuler une attaque par force brute depuis la machine attaquante, puis analyser en détail les traces laissées par l'attaquant."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Déployer et configurer Cowrie pour émuler un service SSH vulnérable, avec redirection du vrai service SSH vers un port non standard.",
              "Mener une attaque par force brute réaliste (Hydra) contre le honeypot depuis la machine attaquante.",
              "Extraire et analyser les journaux JSON générés par Cowrie (commandes tapées, tentatives de téléchargement de fichiers).",
              "Documenter intégralement la démarche, y compris les incidents rencontrés, dans une base de connaissance Notion."
            ],
            "title": "Objectifs"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Mise en place du honeypot",
                "description": "Installation de Cowrie sur la cible, redirection iptables du port 22 vers le honeypot et du vrai service SSH vers le port 2200, persistance des règles via iptables-persistent."
              },
              {
                "title": "Incident majeur : perte d'accès à la machine attaquante",
                "description": "Verrouillage du mot de passe de Kali Linux sans snapshot de secours exploitable. Décision de réinstaller entièrement la VM à partir de l'image officielle plutôt que de tenter une récupération incertaine."
              },
              {
                "title": "Attaque par force brute",
                "description": "Lancement d'Hydra contre le honeypot. Première tentative en échec (parallélisme par défaut trop élevé pour l'implémentation Twisted de Cowrie), corrigée en réduisant le nombre de tâches parallèles."
              },
              {
                "title": "Analyse forensique des logs",
                "description": "Extraction des événements JSON avec jq : commandes tapées par l'attaquant simulé, tentatives de téléchargement de fichiers, reconstitution de la session complète."
              }
            ],
            "title": "Déroulé du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Mots de passe compromis",
                "value": "3 / 3 testés"
              },
              {
                "label": "Commandes attaquant capturées",
                "value": "17"
              },
              {
                "label": "Tentatives de téléchargement de fichiers",
                "value": "0 (bloquées, cible isolée)"
              },
              {
                "label": "Snapshots de restauration",
                "value": "2 (cible + attaquant)"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "text",
            "title": "Gestion d'incident",
            "paragraphs": [
              "Le point le plus formateur du projet n'était pas prévu au départ : une erreur de manipulation a verrouillé l'accès à la machine attaquante, sans snapshot exploitable pour revenir en arrière.",
              "Plutôt que de perdre du temps sur une récupération incertaine (mode recovery GRUB infructueux), le choix a été de réinstaller entièrement la VM depuis l'image officielle Kali, de restaurer la configuration réseau et les outils nécessaires, puis de reprendre l'attaque planifiée. Cet incident est documenté en détail dans le journal du projet, avec la chronologie complète et les commandes de remédiation."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux (machine attaquante) et Debian (cible), sous VMware Workstation Pro 17",
              "Cowrie (honeypot SSH/Telnet, déploiement Python via pip)",
              "Hydra (attaque par force brute)",
              "iptables / iptables-persistent (redirection de ports, persistance des règles)",
              "jq (extraction et analyse des logs JSON)"
            ],
            "title": "Stack et outils"
          }
        ]
      },
      "es": {
        "title": "Honeypot SSH/Telnet con Cowrie",
        "heroSubtitle": "Simulación de intrusión y análisis forense en un laboratorio de ciberseguridad aislado",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Este proyecto forma parte de un laboratorio personal de ciberseguridad construido con VMware Workstation Pro, con una máquina atacante (Kali Linux) y una máquina objetivo (Debian) aisladas en una red virtual dedicada (VMnet2), sin acceso a redes de producción ni a Internet.",
              "Objetivo: desplegar un honeypot SSH/Telnet (Cowrie) en el objetivo, simular un ataque de fuerza bruta realista desde la máquina atacante, y luego analizar en detalle las huellas dejadas por el atacante."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Desplegar y configurar Cowrie para emular un servicio SSH vulnerable, redirigiendo el servicio SSH real a un puerto no estándar.",
              "Ejecutar un ataque de fuerza bruta realista (Hydra) contra el honeypot desde la máquina atacante.",
              "Extraer y analizar los logs JSON generados por Cowrie (comandos escritos, intentos de descarga de archivos).",
              "Documentar todo el proceso, incluidos los incidentes encontrados, en una base de conocimiento Notion."
            ],
            "title": "Objetivos"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Puesta en marcha del honeypot",
                "description": "Instalación de Cowrie en el objetivo, redirección del puerto 22 al honeypot mediante iptables y traslado del servicio SSH real al puerto 2200, con reglas persistentes vía iptables-persistent."
              },
              {
                "title": "Incidente mayor: pérdida de acceso a la máquina atacante",
                "description": "Bloqueo de la contraseña de Kali Linux sin snapshot de recuperación utilizable. Se decidió reinstalar por completo la VM desde la imagen oficial en lugar de intentar una recuperación incierta."
              },
              {
                "title": "Ataque de fuerza bruta",
                "description": "Lanzamiento de Hydra contra el honeypot. El primer intento falló (paralelismo por defecto demasiado alto para la implementación SSH basada en Twisted de Cowrie), corregido reduciendo el número de tareas paralelas."
              },
              {
                "title": "Análisis forense de logs",
                "description": "Extracción de eventos JSON con jq: comandos escritos por el atacante simulado, intentos de descarga de archivos, reconstrucción completa de la sesión."
              }
            ],
            "title": "Cronología del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Contraseñas comprometidas",
                "value": "3 / 3 probadas"
              },
              {
                "label": "Comandos del atacante capturados",
                "value": "17"
              },
              {
                "label": "Intentos de descarga de archivos",
                "value": "0 (bloqueados, objetivo aislado)"
              },
              {
                "label": "Snapshots de restauración",
                "value": "2 (objetivo + atacante)"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "text",
            "title": "Gestión del incidente",
            "paragraphs": [
              "La parte más formativa del proyecto no estaba planeada: un error de manipulación bloqueó el acceso a la máquina atacante, sin ningún snapshot utilizable para revertir.",
              "En lugar de perder tiempo en una recuperación incierta (intento fallido de modo recovery de GRUB), se optó por reinstalar completamente la VM desde la imagen oficial de Kali, restaurar la configuración de red y las herramientas necesarias, y retomar el ataque planificado. Este incidente está documentado en detalle en el diario del proyecto, con la cronología completa y los comandos de remediación."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux (atacante) y Debian (objetivo) sobre VMware Workstation Pro 17",
              "Cowrie (honeypot SSH/Telnet, despliegue en Python vía pip)",
              "Hydra (ataque de fuerza bruta)",
              "iptables / iptables-persistent (redirección de puertos, reglas persistentes)",
              "jq (extracción y análisis de logs JSON)"
            ],
            "title": "Stack y herramientas"
          }
        ]
      }
    }
  },
  {
    "slug": "homelab-network-sniffing",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-network-sniffing/screenshot-8.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Network Sniffing: tcpdump, Wireshark & Scapy",
        "heroSubtitle": "tcpdump · Wireshark · Scapy · VMware Workstation Pro 17",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "This project is the \"network layer\" counterpart to an earlier password-cracking project. Where that project showed how a stored password can be guessed, this one demonstrates how a password in transit can be read directly if it isn't encrypted.",
              "The goal: capture raw network traffic with the industry's three reference tools (tcpdump, Wireshark, Scapy), read the exact anatomy of a packet, and concretely demonstrate — by intercepting an FTP credential sent in plaintext — why protocols like FTP or Telnet are now considered dangerous in production."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Capture and analyze raw network traffic with tcpdump and Wireshark (ARP, ICMP, TCP).",
              "Demonstrate plaintext reading of a full HTTP exchange via Follow HTTP Stream.",
              "Intercept FTP credentials sent without encryption.",
              "Build a custom network sniffer in Python with Scapy."
            ],
            "title": "Objectives"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Baseline capture with tcpdump",
                "description": "Captured ARP and ICMP traffic between the two lab machines, saved to .pcap, replayed from the command line."
              },
              {
                "title": "Visual analysis with Wireshark",
                "description": "Opened the capture, explored packet anatomy layer by layer (Ethernet → IP → TCP/ICMP), applied display filters."
              },
              {
                "title": "Plaintext HTTP interception",
                "description": "Started a test HTTP server, captured targeted traffic, read the full request and response via Follow HTTP Stream."
              },
              {
                "title": "FTP credential interception",
                "description": "Deployed a test vsftpd server, connected with a dedicated account, and read the login/password directly in cleartext in the Wireshark packet list."
              },
              {
                "title": "Custom Python sniffer (Scapy)",
                "description": "Wrote a script capturing and analyzing ARP/TCP/UDP traffic live, successfully tested on real traffic (ARP resolution, active SSH session)."
              }
            ],
            "title": "Project walkthrough"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Protocols analyzed",
                "value": "ARP, ICMP, TCP, HTTP, FTP"
              },
              {
                "label": "FTP credentials intercepted in plaintext",
                "value": "1 (USER + PASS)"
              },
              {
                "label": "Packets captured (Scapy script)",
                "value": "live ARP + TCP traffic"
              },
              {
                "label": "Tools mastered",
                "value": "3 (tcpdump, Wireshark, Scapy)"
              }
            ],
            "title": "Results"
          },
          {
            "type": "text",
            "title": "Key takeaway",
            "paragraphs": [
              "Sniffing never \"breaks\" encryption: an observer capturing HTTPS or SSH traffic sees unreadable bytes, not content. This project illustrates why widespread TLS adoption has made passive sniffing largely obsolete as a direct threat to content — the real risk today lies in legacy plaintext protocols (FTP, Telnet) and traffic metadata."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux (capture + traffic generation) and Debian (target), on VMware Workstation Pro 17",
              "tcpdump (command-line capture, BPF filtering)",
              "Wireshark (visual analysis, Follow HTTP Stream)",
              "Scapy / Python (custom network sniffer)",
              "vsftpd (test FTP server)"
            ],
            "title": "Stack & tools"
          }
        ]
      },
      "fr": {
        "title": "Sniffing réseau : tcpdump, Wireshark & Scapy",
        "heroSubtitle": "tcpdump · Wireshark · Scapy · VMware Workstation Pro 17",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Ce projet est la contrepartie \"couche réseau\" d'un projet précédent consacré au cracking de mots de passe. Là où celui-ci montrait comment un mot de passe stocké peut être deviné, celui-ci démontre comment un mot de passe en transit peut être directement lu s'il n'est pas chiffré.",
              "L'objectif : capturer du trafic réseau brut avec les trois outils de référence du métier (tcpdump, Wireshark, Scapy), lire l'anatomie exacte d'un paquet, et démontrer concrètement — en interceptant un identifiant FTP transmis en clair — pourquoi des protocoles comme FTP ou Telnet sont aujourd'hui considérés comme dangereux en production."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Capturer et analyser du trafic réseau brut avec tcpdump et Wireshark (ARP, ICMP, TCP).",
              "Démontrer la lecture en clair d'une requête HTTP complète via Follow HTTP Stream.",
              "Intercepter des identifiants FTP transmis sans chiffrement.",
              "Développer un sniffeur réseau personnalisé en Python avec Scapy."
            ],
            "title": "Objectifs"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Capture de référence avec tcpdump",
                "description": "Capture du trafic ARP et ICMP entre les deux machines du lab, écriture au format .pcap, relecture en ligne de commande."
              },
              {
                "title": "Analyse visuelle avec Wireshark",
                "description": "Ouverture de la capture, exploration de l'anatomie de paquet couche par couche (Ethernet → IP → TCP/ICMP), filtrage d'affichage."
              },
              {
                "title": "Interception HTTP en clair",
                "description": "Démarrage d'un serveur HTTP de test, capture ciblée du trafic, lecture complète de la requête et de la réponse via Follow HTTP Stream."
              },
              {
                "title": "Interception d'identifiants FTP",
                "description": "Déploiement d'un serveur vsftpd de test, connexion avec un compte dédié, et lecture directe du login/mot de passe en clair dans la liste des paquets Wireshark."
              },
              {
                "title": "Développement d'un sniffeur Python (Scapy)",
                "description": "Écriture d'un script capturant et analysant le trafic ARP/TCP/UDP en direct, testé avec succès sur trafic réel (résolution ARP, session SSH active)."
              }
            ],
            "title": "Déroulé du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Protocoles analysés",
                "value": "ARP, ICMP, TCP, HTTP, FTP"
              },
              {
                "label": "Identifiants FTP interceptés en clair",
                "value": "1 (USER + PASS)"
              },
              {
                "label": "Paquets capturés (script Scapy)",
                "value": "trafic ARP + TCP en direct"
              },
              {
                "label": "Outils maîtrisés",
                "value": "3 (tcpdump, Wireshark, Scapy)"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "text",
            "title": "Enseignement clé",
            "paragraphs": [
              "Le sniffing ne \"casse\" jamais le chiffrement : un observateur qui capture du trafic HTTPS ou SSH voit des octets illisibles, pas le contenu. Ce projet illustre pourquoi le déploiement généralisé de TLS a rendu le sniffing passif largement obsolète comme menace directe sur le contenu — le risque réel aujourd'hui porte sur les protocoles legacy encore en clair (FTP, Telnet) et sur les métadonnées de trafic."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux (capture + génération de trafic) et Debian (cible), sous VMware Workstation Pro 17",
              "tcpdump (capture en ligne de commande, filtrage BPF)",
              "Wireshark (analyse visuelle, Follow HTTP Stream)",
              "Scapy / Python (sniffeur réseau personnalisé)",
              "vsftpd (serveur FTP de test)"
            ],
            "title": "Stack et outils"
          }
        ]
      },
      "es": {
        "title": "Sniffing de red: tcpdump, Wireshark y Scapy",
        "heroSubtitle": "tcpdump · Wireshark · Scapy · VMware Workstation Pro 17",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Este proyecto es la contraparte de \"capa de red\" de un proyecto anterior de cracking de contraseñas. Mientras ese proyecto mostraba cómo se puede adivinar una contraseña almacenada, este demuestra cómo una contraseña en tránsito puede leerse directamente si no está cifrada.",
              "El objetivo: capturar tráfico de red en bruto con las tres herramientas de referencia del sector (tcpdump, Wireshark, Scapy), leer la anatomía exacta de un paquete, y demostrar concretamente — interceptando una credencial FTP enviada en texto plano — por qué protocolos como FTP o Telnet se consideran hoy peligrosos en producción."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Capturar y analizar tráfico de red en bruto con tcpdump y Wireshark (ARP, ICMP, TCP).",
              "Demostrar la lectura en texto plano de un intercambio HTTP completo mediante Follow HTTP Stream.",
              "Interceptar credenciales FTP enviadas sin cifrado.",
              "Desarrollar un sniffer de red personalizado en Python con Scapy."
            ],
            "title": "Objetivos"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Captura de referencia con tcpdump",
                "description": "Captura del tráfico ARP e ICMP entre las dos máquinas del laboratorio, guardado en formato .pcap, relectura desde la línea de comandos."
              },
              {
                "title": "Análisis visual con Wireshark",
                "description": "Apertura de la captura, exploración de la anatomía del paquete capa por capa (Ethernet → IP → TCP/ICMP), aplicación de filtros de visualización."
              },
              {
                "title": "Interceptación de HTTP en claro",
                "description": "Inicio de un servidor HTTP de prueba, captura dirigida del tráfico, lectura completa de la solicitud y la respuesta mediante Follow HTTP Stream."
              },
              {
                "title": "Interceptación de credenciales FTP",
                "description": "Despliegue de un servidor vsftpd de prueba, conexión con una cuenta dedicada, y lectura directa del usuario/contraseña en texto plano en la lista de paquetes de Wireshark."
              },
              {
                "title": "Sniffer personalizado en Python (Scapy)",
                "description": "Escritura de un script que captura y analiza tráfico ARP/TCP/UDP en vivo, probado con éxito en tráfico real (resolución ARP, sesión SSH activa)."
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Protocolos analizados",
                "value": "ARP, ICMP, TCP, HTTP, FTP"
              },
              {
                "label": "Credenciales FTP interceptadas en claro",
                "value": "1 (USER + PASS)"
              },
              {
                "label": "Paquetes capturados (script Scapy)",
                "value": "tráfico ARP + TCP en vivo"
              },
              {
                "label": "Herramientas dominadas",
                "value": "3 (tcpdump, Wireshark, Scapy)"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "text",
            "title": "Lección clave",
            "paragraphs": [
              "El sniffing nunca \"rompe\" el cifrado: un observador que captura tráfico HTTPS o SSH ve bytes ilegibles, no contenido. Este proyecto ilustra por qué la adopción generalizada de TLS ha vuelto el sniffing pasivo en gran medida obsoleto como amenaza directa al contenido — el riesgo real hoy reside en los protocolos legacy aún en claro (FTP, Telnet) y en los metadatos de tráfico."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux (captura + generación de tráfico) y Debian (objetivo), sobre VMware Workstation Pro 17",
              "tcpdump (captura en línea de comandos, filtrado BPF)",
              "Wireshark (análisis visual, Follow HTTP Stream)",
              "Scapy / Python (sniffer de red personalizado)",
              "vsftpd (servidor FTP de prueba)"
            ],
            "title": "Stack y herramientas"
          }
        ]
      }
    }
  },
  {
    "slug": "homelab-password-cracking-lab",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-password-cracking-lab/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-password-cracking-lab/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-password-cracking-lab/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-password-cracking-lab/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-password-cracking-lab/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/homelab-password-cracking-lab/screenshot-5.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Password Cracking: Hashing, Salting & Stretching",
        "heroSubtitle": "From cryptographic theory to a measured demonstration, on an isolated lab",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "This project complements the honeypot lab with the 'compromised password' angle: how a password is actually stored, why it cannot be 'decrypted', and how industry-standard tools (John the Ripper, Hashcat) automate testing thousands of candidates per second.",
              "Everything ran on the lab's attacker machine (Kali Linux), with no network or external target — only hashes generated locally for the demonstration."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Understand and demonstrate the properties of a cryptographic hash function (determinism, avalanche effect, irreversibility).",
              "Concretely compare cracking speed between a fast algorithm (MD5) and a deliberately slow one (bcrypt).",
              "Implement the four main attack families: dictionary, dictionary + mutation rules, mask, pure brute force.",
              "Run a realistic multi-user case study (shadow-file style) with passwords of varying strength."
            ],
            "title": "Objectives"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Generating test hashes",
                "description": "Unsalted MD5 / SHA1 / SHA256, then salted SHA-512 via mkpasswd, personally verifying the avalanche effect and the role of the salt."
              },
              {
                "title": "Cracking with John the Ripper",
                "description": "Dictionary attack (rockyou.txt, 14.3 million entries) against test MD5 hashes."
              },
              {
                "title": "Cracking with Hashcat",
                "description": "MD5 vs bcrypt benchmark, then dictionary, rule-based (best64) and mask/brute-force attacks with keyspace calculations."
              },
              {
                "title": "GPU-less environment troubleshooting",
                "description": "Resolved a chain of OpenCL failures on a VM with no dedicated GPU: missing software driver, misplaced environment variable, insufficient RAM."
              },
              {
                "title": "Multi-user case study",
                "description": "Three accounts of increasing strength (dictionary word, complexified word, five-word passphrase) run against the same combined attack."
              }
            ],
            "title": "Methodology"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "MD5 vs bcrypt (benchmark)",
                "value": "3,087,100 H/s vs 119 H/s"
              },
              {
                "label": "bcrypt slowdown factor",
                "value": "about 25,900x"
              },
              {
                "label": "Weak password (dictionary)",
                "value": "cracked"
              },
              {
                "label": "5-word passphrase",
                "value": "not cracked (dictionary + rules exhausted)"
              }
            ],
            "title": "Measured results"
          },
          {
            "type": "text",
            "title": "Technical troubleshooting",
            "paragraphs": [
              "Hashcat requires a working OpenCL backend even for CPU-only use, absent by default on this GPU-less VM. Resolving it took several steps: the expected package (pocl-opencl-icd) did not exist in Kali's repositories, so the mesa-opencl-icd alternative (llvmpipe software rendering) was installed instead.",
              "The OpenCL platform then remained invisible to Hashcat (0 devices exposed) until explicitly enabled via the RUSTICL_ENABLE environment variable. A first attempt at making this persistent failed because it was placed in ~/.bashrc, while Kali's default shell is Zsh, which does not read that file.",
              "Once the device was detected, the benchmark still failed with a memory allocation error, resolved by raising the VM's allocated RAM from ~2 GB to 8 GB in VMware settings."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux on VMware Workstation Pro 17",
              "John the Ripper (dictionary attack, MD5 and SHA-512crypt formats)",
              "Hashcat (dictionary, best64 rules, mask, brute force, GPU/CPU benchmark)",
              "mkpasswd / OpenSSL (test hash generation)",
              "Mesa OpenCL (llvmpipe software rendering, GPU-less environment)"
            ],
            "title": "Stack and tools"
          }
        ]
      },
      "fr": {
        "title": "Cracker de mots de passe : hashing, salage et stretching",
        "heroSubtitle": "De la théorie cryptographique à la démonstration chiffrée, sur un lab isolé",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Ce projet complète le lab honeypot par la dimension « mot de passe compromis » : comment un mot de passe est réellement stocké, pourquoi il ne peut pas être « déchiffré », et comment les outils standards du métier (John the Ripper, Hashcat) automatisent le test de milliers de candidats par seconde.",
              "L'ensemble a été mené sur la machine attaquante du lab (Kali Linux), sans réseau ni cible externe : uniquement des hashs générés localement pour la démonstration."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Comprendre et démontrer les propriétés d'une fonction de hachage cryptographique (déterminisme, effet avalanche, irréversibilité).",
              "Comparer concrètement la vitesse de cassage entre un algorithme rapide (MD5) et un algorithme volontairement lent (bcrypt).",
              "Mettre en œuvre les quatre grandes familles d'attaque : dictionnaire, dictionnaire + règles de mutation, masque, force brute pure.",
              "Exécuter un cas pratique multi-utilisateurs réaliste (type fichier /etc/shadow) avec des mots de passe de robustesse variable."
            ],
            "title": "Objectifs"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Génération de hashs de test",
                "description": "MD5 / SHA1 / SHA256 non salés, puis SHA-512 salé via mkpasswd, avec vérification personnelle de l'effet avalanche et du rôle du sel."
              },
              {
                "title": "Cassage avec John the Ripper",
                "description": "Attaque par dictionnaire (rockyou.txt, 14,3 millions d'entrées) sur des hashs MD5 de test."
              },
              {
                "title": "Cassage avec Hashcat",
                "description": "Benchmark MD5 vs bcrypt, puis attaque par dictionnaire, par règles de mutation (best64) et par masque / force brute avec calcul de l'espace de recherche."
              },
              {
                "title": "Dépannage environnement sans GPU",
                "description": "Résolution d'une chaîne de pannes OpenCL sur une VM sans carte graphique dédiée : pilote logiciel manquant, variable d'environnement mal placée, RAM insuffisante."
              },
              {
                "title": "Cas pratique multi-utilisateurs",
                "description": "Trois comptes de robustesse croissante (mot du dictionnaire, mot complexifié, passphrase de cinq mots) soumis à la même attaque combinée."
              }
            ],
            "title": "Méthodologie"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "MD5 vs bcrypt (benchmark)",
                "value": "3 087 100 H/s contre 119 H/s"
              },
              {
                "label": "Facteur de ralentissement bcrypt",
                "value": "environ 25 900 fois"
              },
              {
                "label": "Mot de passe faible (dictionnaire)",
                "value": "cassé"
              },
              {
                "label": "Passphrase de 5 mots",
                "value": "non cassée (dictionnaire + règles épuisés)"
              }
            ],
            "title": "Résultats chiffrés"
          },
          {
            "type": "text",
            "title": "Dépannage technique",
            "paragraphs": [
              "Hashcat nécessite un backend OpenCL fonctionnel même pour un usage CPU pur, absent par défaut sur cette VM sans GPU. La résolution a demandé plusieurs étapes successives : le paquet attendu (pocl-opencl-icd) n'existant pas dans les dépôts Kali, installation de l'alternative mesa-opencl-icd (rendu logiciel llvmpipe).",
              "La plateforme OpenCL restait ensuite invisible pour Hashcat (0 device exposé) jusqu'à l'activation explicite via la variable d'environnement RUSTICL_ENABLE. Une première tentative de persistance a échoué car placée dans ~/.bashrc, alors que le shell par défaut de Kali est Zsh, qui ne lit pas ce fichier.",
              "Une fois le device détecté, le benchmark échouait encore avec une erreur d'allocation mémoire, résolue en portant la RAM allouée à la VM de ~2 Go à 8 Go dans les paramètres VMware."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux sous VMware Workstation Pro 17",
              "John the Ripper (attaque par dictionnaire, formats MD5 et SHA-512crypt)",
              "Hashcat (dictionnaire, règles best64, masque, force brute, benchmark GPU/CPU)",
              "mkpasswd / OpenSSL (génération de hashs de test)",
              "Mesa OpenCL (rendu logiciel llvmpipe, environnement sans GPU dédié)"
            ],
            "title": "Stack et outils"
          }
        ]
      },
      "es": {
        "title": "Cracking de contraseñas: hashing, salado y stretching",
        "heroSubtitle": "De la teoría criptográfica a la demostración medida, en un laboratorio aislado",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Este proyecto complementa el laboratorio de honeypot con el ángulo de la 'contraseña comprometida': cómo se almacena realmente una contraseña, por qué no puede 'desencriptarse', y cómo las herramientas estándar del sector (John the Ripper, Hashcat) automatizan la prueba de miles de candidatos por segundo.",
              "Todo se ejecutó en la máquina atacante del laboratorio (Kali Linux), sin red ni objetivo externo: solo hashes generados localmente para la demostración."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Comprender y demostrar las propiedades de una función de hash criptográfica (determinismo, efecto avalancha, irreversibilidad).",
              "Comparar de forma concreta la velocidad de cracking entre un algoritmo rápido (MD5) y uno deliberadamente lento (bcrypt).",
              "Implementar las cuatro grandes familias de ataque: diccionario, diccionario + reglas de mutación, máscara, fuerza bruta pura.",
              "Ejecutar un caso práctico multiusuario realista (tipo archivo /etc/shadow) con contraseñas de robustez variable."
            ],
            "title": "Objetivos"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Generación de hashes de prueba",
                "description": "MD5 / SHA1 / SHA256 sin salar, luego SHA-512 salado vía mkpasswd, verificando personalmente el efecto avalancha y el papel de la sal."
              },
              {
                "title": "Cracking con John the Ripper",
                "description": "Ataque por diccionario (rockyou.txt, 14,3 millones de entradas) sobre hashes MD5 de prueba."
              },
              {
                "title": "Cracking con Hashcat",
                "description": "Benchmark MD5 vs bcrypt, luego ataques por diccionario, por reglas de mutación (best64) y por máscara/fuerza bruta con cálculo del espacio de búsqueda."
              },
              {
                "title": "Resolución de un entorno sin GPU",
                "description": "Resolución de una cadena de fallos OpenCL en una VM sin tarjeta gráfica dedicada: controlador de software ausente, variable de entorno mal ubicada, RAM insuficiente."
              },
              {
                "title": "Caso práctico multiusuario",
                "description": "Tres cuentas de robustez creciente (palabra de diccionario, palabra complejizada, passphrase de cinco palabras) sometidas al mismo ataque combinado."
              }
            ],
            "title": "Metodología"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "MD5 vs bcrypt (benchmark)",
                "value": "3.087.100 H/s frente a 119 H/s"
              },
              {
                "label": "Factor de ralentización de bcrypt",
                "value": "unas 25.900 veces"
              },
              {
                "label": "Contraseña débil (diccionario)",
                "value": "descifrada"
              },
              {
                "label": "Passphrase de 5 palabras",
                "value": "no descifrada (diccionario + reglas agotados)"
              }
            ],
            "title": "Resultados medidos"
          },
          {
            "type": "text",
            "title": "Resolución técnica",
            "paragraphs": [
              "Hashcat necesita un backend OpenCL funcional incluso para uso exclusivo de CPU, ausente por defecto en esta VM sin GPU. La resolución requirió varios pasos: el paquete esperado (pocl-opencl-icd) no existía en los repositorios de Kali, por lo que se instaló la alternativa mesa-opencl-icd (renderizado por software llvmpipe).",
              "La plataforma OpenCL seguía siendo invisible para Hashcat (0 dispositivos expuestos) hasta activarla explícitamente mediante la variable de entorno RUSTICL_ENABLE. Un primer intento de hacerla persistente falló por colocarse en ~/.bashrc, mientras que el shell por defecto de Kali es Zsh, que no lee ese archivo.",
              "Una vez detectado el dispositivo, el benchmark seguía fallando con un error de asignación de memoria, resuelto aumentando la RAM asignada a la VM de ~2 GB a 8 GB en la configuración de VMware."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Kali Linux sobre VMware Workstation Pro 17",
              "John the Ripper (ataque por diccionario, formatos MD5 y SHA-512crypt)",
              "Hashcat (diccionario, reglas best64, máscara, fuerza bruta, benchmark GPU/CPU)",
              "mkpasswd / OpenSSL (generación de hashes de prueba)",
              "Mesa OpenCL (renderizado por software llvmpipe, entorno sin GPU dedicada)"
            ],
            "title": "Stack y herramientas"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-disk-backup",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-disk-backup/screenshot-8.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Disk Partitioning & Backup (AOMEI + Windows Server Backup)",
        "heroSubtitle": "AOMEI Partition Assistant · AOMEI Backupper · Windows Server 2012 Backup · VirtualBox",
        "sections": [
          {
            "body": "Training exercise at Greta du Val d Oise (Lycée Louis Jouvet, Taverny) under trainer Miguel MI-POUDOU. The task covered two VMs in VirtualBox: a Windows 10 client VM (partition resize + disk backup with AOMEI tools) and a Windows Server 2012 VM (Windows Server Backup role installation + scheduled daily backup).",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Windows 10 client VM: oversized E: partition to shrink without data loss",
              "Windows Server 2012 VM: no backup strategy in place",
              "Need for a full disk image backup on the client VM as a restore point",
              "Need for an automated daily server backup including system state",
              "Virtualized VirtualBox environment — training exercise under real-world conditions"
            ],
            "title": "Scope & Objectives"
          },
          {
            "type": "bullets",
            "items": [
              "E: partition resized from 50.04 GB to 47.71 GB via AOMEI Partition Assistant — zero data loss",
              "Full disk image backup created with AOMEI Backupper Standard — completed successfully",
              "Windows Server Backup role installed and enabled on Windows Server 2012",
              "Scheduled backup configured: full recovery + system state, VSS full, daily at 14:00",
              "22.67 GB transferred to the dedicated 60 GB virtual disk on first run"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "AOMEI Partition Assistant — partition resizing without data loss",
              "AOMEI Backupper Standard — full disk image backup",
              "Windows Server Backup — native Windows Server 2012 backup role",
              "VSS (Volume Shadow Copy Service) — consistent system state backup",
              "VirtualBox — Type 2 hypervisor for the training environment",
              "Windows 10 / Windows Server 2012 — VM operating systems"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Partition resize — AOMEI Partition Assistant",
                "description": "Right-clicked E: → Resize/Move. Reduced from 50.04 GB to 47.71 GB (NTFS, 4 KB cluster, Disk 3). Clicked Apply to commit the pending operation."
              },
              {
                "label": "Disk backup — AOMEI Backupper",
                "description": "Backup → Disk Backup. Named the task, selected source disks, chose destination path and started. Operation completed successfully."
              },
              {
                "label": "Install Windows Server Backup role",
                "description": "Server Manager → Manage → Add Roles and Features. Checked Windows Server Backup in the Features list. Enabled auto-restart and clicked Install."
              },
              {
                "label": "Configure scheduled backup",
                "description": "Added a dedicated 60 GB virtual disk as destination. Configured: full recovery + system state, VSS full backup, daily at 14:00. First run transferred 22.67 GB to SRV2 2022_03_21 13:18 DISK_01."
              }
            ],
            "title": "Procedure"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "No data loss",
                "label": "Partitioning",
                "value": "50.04 GB → 47.71 GB"
              },
              {
                "note": "AOMEI Backupper — success",
                "label": "Client backup",
                "value": "Full disk image"
              },
              {
                "note": "Scheduled daily at 14:00",
                "label": "Server backup",
                "value": "22.67 GB transferred"
              },
              {
                "note": "AOMEI PA, AOMEI Backupper, WSB, VirtualBox",
                "label": "Skills",
                "value": "4 tools mastered"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Partitionnement & Sauvegarde disque (AOMEI + Sauvegarde Windows Server)",
        "heroSubtitle": "AOMEI Partition Assistant · AOMEI Backupper · Sauvegarde Windows Server 2012 · VirtualBox",
        "sections": [
          {
            "body": "Exercice de formation au Greta du Val d Oise (Lycée Louis Jouvet, Taverny) sous la direction de Miguel MI-POUDOU. La mission couvrait deux VM VirtualBox : une VM cliente Windows 10 (redimensionnement de partition + sauvegarde avec les outils AOMEI) et une VM serveur Windows Server 2012 (installation du rôle Sauvegarde Windows Server + sauvegarde planifiée quotidienne).",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "VM cliente Windows 10 : partition E: surdimensionnée à réduire sans perte de données",
              "VM serveur Windows Server 2012 : aucune stratégie de sauvegarde planifiée en place",
              "Besoin d une image disque complète de la VM cliente comme point de restauration",
              "Besoin d une sauvegarde quotidienne automatisée du serveur incluant l état système",
              "Environnement virtualisé VirtualBox — exercice en conditions de formation réelles"
            ],
            "title": "Périmètre & Objectifs"
          },
          {
            "type": "bullets",
            "items": [
              "Partition E: réduite de 50,04 Go à 47,71 Go via AOMEI Partition Assistant — aucune perte de données",
              "Image disque complète créée avec AOMEI Backupper Standard — opération réussie",
              "Rôle Sauvegarde Windows Server installé et activé sur Windows Server 2012",
              "Sauvegarde planifiée configurée : récupération complète + état du système, VSS complète, quotidienne à 14h00",
              "22,67 Go transférés vers le disque virtuel dédié de 60 Go au premier lancement"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "AOMEI Partition Assistant — redimensionnement de partitions sans perte de données",
              "AOMEI Backupper Standard — sauvegarde image disque complète",
              "Sauvegarde Windows Server — rôle natif Windows Server 2012",
              "VSS (Volume Shadow Copy Service) — sauvegarde cohérente de l état système",
              "VirtualBox — hyperviseur de type 2 pour l environnement de formation",
              "Windows 10 / Windows Server 2012 — systèmes d exploitation des VM"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Redimensionnement — AOMEI Partition Assistant",
                "description": "Clic droit sur E: → Redimensionner/Déplacer. Réduction de 50,04 Go à 47,71 Go (NTFS, cluster 4 Ko, Disque 3). Clic Appliquer pour valider l opération en attente."
              },
              {
                "label": "Sauvegarde disque — AOMEI Backupper",
                "description": "Sauvegarder → Sauvegarde de disque. Nommage de la tâche, sélection des disques source, choix de la destination. Opération terminée avec succès."
              },
              {
                "label": "Installation du rôle Sauvegarde Windows Server",
                "description": "Gestionnaire de serveur → Gérer → Ajouter des rôles et fonctionnalités. Coche de Sauvegarde Windows Server dans les fonctionnalités. Activation redémarrage automatique, puis Installer."
              },
              {
                "label": "Configuration de la sauvegarde planifiée",
                "description": "Ajout d un disque virtuel dédié de 60 Go. Sauvegarde configurée : récupération complète + état système, VSS complète, quotidienne à 14h00. Exécution : 22,67 Go transférés vers SRV2 2022_03_21 13:18 DISK_01."
              }
            ],
            "title": "Procédure"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Sans perte de données",
                "label": "Partitionnement",
                "value": "50,04 Go → 47,71 Go"
              },
              {
                "note": "AOMEI Backupper — réussie",
                "label": "Sauvegarde client",
                "value": "Image disque complète"
              },
              {
                "note": "Planifiée quotidiennement à 14h00",
                "label": "Sauvegarde serveur",
                "value": "22,67 Go transférés"
              },
              {
                "note": "AOMEI PA, AOMEI Backupper, WSB, VirtualBox",
                "label": "Compétences",
                "value": "4 outils maîtrisés"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Disk backup & partition management (AOMEI + WSB)",
        "heroSubtitle": "AOMEI Partition Assistant · AOMEI Backupper · Copia de seguridad Windows Server · VirtualBox · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Ejercicio de formación en el Greta du Val d Oise (Lycée Louis Jouvet, Taverny) bajo la dirección de Miguel MI-POUDOU. La misión abarcaba dos VM VirtualBox: una VM cliente Windows 10 (redimensionamiento de partición + copia de seguridad con herramientas AOMEI) y una VM servidor Windows Server 2012 (instalación del rol Copia de seguridad de Windows Server + copia programada diaria)."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "VM cliente Windows 10: partición E: sobredimensionada a reducir sin pérdida de datos",
              "VM servidor Windows Server 2012: ninguna estrategia de copia de seguridad programada en marcha",
              "Necesidad de una imagen de disco completa de la VM cliente como punto de restauración",
              "Necesidad de una copia de seguridad diaria automatizada del servidor, incluyendo el estado del sistema",
              "Entorno virtualizado VirtualBox — ejercicio en condiciones de formación reales"
            ],
            "title": "Alcance y objetivos"
          },
          {
            "type": "bullets",
            "items": [
              "Partición E: reducida de 50,04 GB a 47,71 GB mediante AOMEI Partition Assistant — sin pérdida de datos",
              "Imagen de disco completa creada con AOMEI Backupper Standard — operación completada con éxito",
              "Rol Copia de seguridad de Windows Server instalado y activado en Windows Server 2012",
              "Copia de seguridad programada configurada: recuperación completa + estado del sistema, VSS completa, diaria a las 14:00",
              "22,67 GB transferidos al disco virtual dedicado de 60 GB en la primera ejecución"
            ],
            "title": "Solución y entregables"
          },
          {
            "type": "bullets",
            "items": [
              "AOMEI Partition Assistant — redimensionamiento de particiones sin pérdida de datos",
              "AOMEI Backupper Standard — copia de seguridad de imagen de disco completa",
              "Copia de seguridad de Windows Server — rol nativo de Windows Server 2012",
              "VSS (Volume Shadow Copy Service) — copia de seguridad coherente del estado del sistema",
              "VirtualBox — hipervisor de tipo 2 para el entorno de formación",
              "Windows 10 / Windows Server 2012 — sistemas operativos de las VM"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Redimensionamiento — AOMEI Partition Assistant",
                "description": "Clic derecho en E: → Redimensionar/Mover. Reducción de 50,04 GB a 47,71 GB (NTFS, clúster de 4 KB, Disco 3). Clic en Aplicar para confirmar la operación pendiente."
              },
              {
                "label": "Copia de seguridad de disco — AOMEI Backupper",
                "description": "Copia de seguridad → Copia de seguridad de disco. Nombrado de la tarea, selección de los discos origen, elección del destino. Operación finalizada con éxito."
              },
              {
                "label": "Instalación del rol Copia de seguridad de Windows Server",
                "description": "Administrador del servidor → Administrar → Agregar roles y características. Marcado de Copia de seguridad de Windows Server en las características. Reinicio automático activado, luego Instalar."
              },
              {
                "label": "Configuración de la copia programada",
                "description": "Adición de un disco virtual dedicado de 60 GB. Copia configurada: recuperación completa + estado del sistema, VSS completa, diaria a las 14:00. Ejecución: 22,67 GB transferidos a SRV2 2022_03_21 13:18 DISK_01."
              }
            ],
            "title": "Procedimiento"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Sin pérdida de datos",
                "label": "Particionamiento",
                "value": "50,04 GB → 47,71 GB"
              },
              {
                "note": "AOMEI Backupper — exitosa",
                "label": "Copia cliente",
                "value": "Imagen de disco completa"
              },
              {
                "note": "Programada diariamente a las 14:00",
                "label": "Copia servidor",
                "value": "22,67 GB transferidos"
              },
              {
                "note": "AOMEI PA, AOMEI Backupper, WSB, VirtualBox",
                "label": "Competencias",
                "value": "4 herramientas dominadas"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-roaming-profiles",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-roaming-profiles/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-roaming-profiles/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-roaming-profiles/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-roaming-profiles/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-roaming-profiles/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-roaming-profiles/screenshot-5.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Configuring AD DS Roaming Profiles",
        "heroSubtitle": "Windows Server 2016 · AD DS · Roaming Profiles · ebtai.fr domain",
        "sections": [
          {
            "body": "Training exercise at Greta du Val d Oise under trainer Marc HAZAN. Configured roaming profiles on a Windows Server 2016 domain controller (ebtai.fr) and verified synchronization from a Windows 10 client VM — both running in VirtualBox. Goal: allow users to retrieve their full work environment (desktop, documents, settings) on any domain-joined machine they log into.",
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
              "Profil itinérant folder created on C: and shared via Advanced Sharing",
              "Share permissions: EBTAI\\Utilisateurs — Modify + Read (Everyone removed)",
              "NTFS permissions verified to allow profile ownership by users",
              "AD profile path configured: \\\\\\\\DC1\\\\Profil itinérants\\\\%username%",
              "Subfolder technicien.tai.V6 auto-created on first Windows 10 login — sync confirmed"
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
                "description": "Profil itinérant folder created on C:. Properties → Sharing → Advanced Sharing → enabled with share name Profil itinérant."
              },
              {
                "label": "Configure share permissions",
                "description": "Permissions → removed Everyone → added EBTAI\\Utilisateurs with Modify + Read. Clicked Apply."
              },
              {
                "label": "Configure NTFS permissions",
                "description": "Folder security verified to ensure Full Control for profile ownership. Network path: \\\\\\\\serveur\\\\Profil itinérant."
              },
              {
                "label": "Set AD profile path",
                "description": "AD Users and Computers (ebtai.fr) → right-clicked technicien → Properties → Profile tab. Set path: \\\\\\\\DC1\\\\Profil itinérants\\\\%username%. Applied."
              },
              {
                "label": "Verify from client VM",
                "description": "Logged into Windows 10 as EBTAI\\technicien. Subfolder technicien.tai.V6 appeared in the share (15/06/2022) — roaming profile linked and synchronized."
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
                "value": "\\\\\\\\DC1\\\\Profil itinérants\\\\%username%"
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
            "body": "Exercice de formation au Greta du Val d Oise sous la supervision de Marc HAZAN. Configuration de profils itinérants sur un contrôleur de domaine Windows Server 2016 (ebtai.fr) et vérification de la synchronisation depuis une VM cliente Windows 10 — les deux sous VirtualBox. L objectif : permettre aux utilisateurs de retrouver leur environnement de travail (bureau, documents, paramètres) quelle que soit la machine du domaine sur laquelle ils se connectent.",
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
              "Dossier Profil itinérant créé sur C: et partagé via Partage avancé",
              "Permissions de partage : EBTAI\\Utilisateurs — Modifier + Lire (Everyone supprimé)",
              "Permissions NTFS vérifiées pour l appropriation des profils utilisateurs",
              "Chemin de profil AD configuré : \\\\\\\\DC1\\\\Profil itinérants\\\\%username%",
              "Sous-dossier technicien.tai.V6 créé automatiquement à la première connexion Windows 10"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "Windows Server 2016 — contrôleur de domaine (ebtai.fr)",
              "Active Directory Users and Computers — configuration du chemin de profil",
              "NTFS Permissions — contrôle d accès au niveau fichier système",
              "SMB Share / Partage avancé — partage réseau du dossier de profils",
              "Variable %username% — personnalisation automatique du chemin par utilisateur",
              "VirtualBox — hyperviseur de type 2 pour l environnement de formation"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Création du dossier partagé",
                "description": "Dossier Profil itinérant créé sur C:. Propriétés → Partage → Partage avancé → activation du partage avec le nom Profil itinérant."
              },
              {
                "label": "Configuration des permissions de partage",
                "description": "Autorisations → suppression de Everyone → ajout de EBTAI\\Utilisateurs avec Modifier + Lire. Clic Appliquer."
              },
              {
                "label": "Configuration des permissions NTFS",
                "description": "Sécurité du dossier vérifiée pour garantir le Contrôle total nécessaire à l appropriation des profils. Chemin réseau : \\\\\\\\serveur\\\\Profil itinérant."
              },
              {
                "label": "Paramétrage du chemin AD",
                "description": "Utilisateurs et ordinateurs AD (ebtai.fr) → clic droit sur technicien → Propriétés → onglet Profil. Chemin : \\\\\\\\DC1\\\\Profil itinérants\\\\%username%. Appliquer."
              },
              {
                "label": "Vérification depuis la VM cliente",
                "description": "Connexion Windows 10 avec EBTAI\\technicien. Sous-dossier technicien.tai.V6 apparu dans le partage (15/06/2022) — profil itinérant lié et synchronisé."
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
                "value": "\\\\\\\\DC1\\\\Profil itinérants\\\\%username%"
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
        "title": "Active Directory roaming profiles",
        "heroSubtitle": "Active Directory · Perfiles móviles · Windows Server · Dominio EBTAI · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Ejercicio de formación en el Greta du Val d Oise bajo la supervisión de Marc HAZAN. Configuración de perfiles itinerantes en un controlador de dominio Windows Server 2016 (ebtai.fr) y verificación de la sincronización desde una VM cliente Windows 10 — ambas bajo VirtualBox. El objetivo: permitir que los usuarios recuperen su entorno de trabajo (escritorio, documentos, configuración) sin importar en qué máquina del dominio inicien sesión."
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
              "Carpeta Perfil itinerante creada en C: y compartida mediante Uso compartido avanzado",
              "Permisos de recurso compartido: EBTAI\\\\Utilisateurs — Modificar + Leer (Todos eliminado)",
              "Permisos NTFS verificados para la apropiación de los perfiles de usuario",
              "Ruta de perfil AD configurada: \\\\\\\\DC1\\\\Profil itinérants\\\\%username%",
              "Subcarpeta technicien.tai.V6 creada automáticamente en el primer inicio de sesión de Windows 10"
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
                "description": "Carpeta Perfil itinerante creada en C:. Propiedades → Compartir → Uso compartido avanzado → activación del recurso compartido con el nombre Perfil itinerante."
              },
              {
                "label": "Configuración de los permisos de recurso compartido",
                "description": "Permisos → eliminación de Todos → adición de EBTAI\\\\Utilisateurs con Modificar + Leer. Clic en Aplicar."
              },
              {
                "label": "Configuración de los permisos NTFS",
                "description": "Seguridad de la carpeta verificada para garantizar el Control total necesario para la apropiación de los perfiles. Ruta de red: \\\\\\\\servidor\\\\Perfil itinerante."
              },
              {
                "label": "Configuración de la ruta AD",
                "description": "Usuarios y equipos de AD (ebtai.fr) → clic derecho en técnico → Propiedades → pestaña Perfil. Ruta: \\\\\\\\DC1\\\\Profil itinérants\\\\%username%. Aplicar."
              },
              {
                "label": "Verificación desde la VM cliente",
                "description": "Inicio de sesión Windows 10 con EBTAI\\\\technicien. Subcarpeta technicien.tai.V6 aparecida en el recurso compartido (15/06/2022) — perfil itinerante vinculado y sincronizado."
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
                "value": "\\\\\\\\DC1\\\\Profil itinérants\\\\%username%"
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
  },
  {
    "slug": "it-ops-virtualization-lab",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-17.webp"
      },
      {
        "alt": "Screenshot 18",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-18.webp"
      },
      {
        "alt": "Screenshot 19",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-virtualization-lab/screenshot-19.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Maintaining a Virtualized IT Environment",
        "heroSubtitle": "VMware Workstation Pro 17 · Windows Server 2022 · AD DS / DNS / DHCP / WDS",
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
              "GPO: roaming profiles and mapped drive (\\\\\\\\DCAD22\\\\Partage) applied at logon",
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
                "description": "OUs and accounts created: LYES (standard) and Technicien (admin). GPOs applied for roaming profiles and mapped drive \\\\\\\\DCAD22\\\\Partage at logon."
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
        "heroSubtitle": "VMware Workstation Pro 17 · Windows Server 2022 · AD DS / DNS / DHCP / WDS",
        "sections": [
          {
            "body": "Lab personnel réalisé dans le cadre d une formation Systèmes & Réseaux. J ai déployé un environnement Windows Server 2022 complet sous VMware Workstation Pro 17 pour reproduire une infrastructure IT d entreprise : domaine Active Directory, DNS, DHCP et déploiement automatisé d OS via WDS/PXE — sur un réseau NAT VMware privé entièrement géré.",
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
              "GPO : profils itinérants et lecteur réseau (\\\\\\\\DCAD22\\\\Partage) mappé à l ouverture de session",
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
              "DHCP Server — Attribution dynamique d adresses IP avec options PXE",
              "WDS (Windows Deployment Services) — Déploiement OS via réseau (PXE/TFTP)",
              "Group Policy (GPO) — Profils itinérants et mappage de lecteurs réseau"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "VM & promotion DC",
                "description": "Windows Server 2022 installé depuis ISO. IP statique 192.168.100.250, hostname DCAD22. Promotion DC via l assistant AD DS — création de la forêt DP-AICHA.LAN. DNS installé avec redirecteur 8.8.8.8."
              },
              {
                "label": "DHCP & WDS",
                "description": "Rôle DHCP installé et autorisé. Étendue POOL1 créée avec option PXEClient. WDS lié au domaine AD, boot.wim importé. Mode validation manuelle activé pour les machines inconnues."
              },
              {
                "label": "Active Directory & GPO",
                "description": "OUs et comptes créés : LYES (standard) et Technicien (admin). GPO appliquées pour les profils itinérants et le mappage du lecteur réseau \\\\\\\\DCAD22\\\\Partage à l ouverture de session."
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
        "title": "Virtualized lab: Windows Server 2022 + AD DS",
        "heroSubtitle": "VMware Workstation Pro 17 · Windows Server 2022 · AD DS · DNS · DHCP · WDS",
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
              "GPO: perfiles itinerantes y unidad de red (\\\\\\\\DCAD22\\\\Partage) montada al iniciar sesión",
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
                "description": "UO y cuentas creadas: LYES (estándar) y Technicien (admin). GPO aplicadas para los perfiles itinerantes y la asignación de la unidad de red \\\\\\\\DCAD22\\\\Partage al iniciar sesión."
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
  },
  {
    "slug": "it-ops-workstation-setup",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-workstation-setup/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-workstation-setup/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-workstation-setup/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-workstation-setup/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-workstation-setup/screenshot-4.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Workstation Setup: Windows 10 Install & Software Deployment",
        "heroSubtitle": "Windows 10 Pro · Ninite · Office 2016 · BIOS · Driver setup",
        "sections": [
          {
            "body": "Training exercise at Greta du Val d Oise under trainer Miguel MI-POUDOU. A client brought in an extremely slow HP laptop with no data to recover. Mission: full workstation rebuild — clean OS reinstall, driver validation, batch software deployment, and final configuration before client handover.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Reinstall Windows 10 Pro 64-bit from a bootable USB drive",
              "Validate all drivers (audio, network, GPU) after installation",
              "Rapidly deploy the full required software suite (7+ applications)",
              "Configure the workstation for immediate client handover (shortcuts, backup, antivirus)",
              "Intervene without any data loss — blank machine, no recovery needed"
            ],
            "title": "Scope & Objectives"
          },
          {
            "type": "bullets",
            "items": [
              "USB boot configured via BIOS, Windows 10 Pro 64-bit installed with trainer-provided OEM key",
              "OOBE completed: region France, user account created, Cortana, Microsoft Hello, geolocation",
              "All drivers validated in Device Manager — network, audio, GPU",
              "7+ applications deployed in one unattended pass via Ninite.com — no toolbars, no clicks",
              "Office 2016 Professional Plus installed and activated simultaneously",
              "Desktop shortcuts, wallpaper, and Windows Backup configured — workstation validated by trainer"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "Windows 10 Pro 64-bit — OS reinstalled from ISO on USB drive",
              "BIOS/UEFI — boot order configuration",
              "Device Manager — post-installation driver validation",
              "Ninite.com — batch app deployment without interaction (Chrome, Firefox, 7-Zip, Zoom, LibreOffice, TeamViewer, MalwareBytes)",
              "Office 2016 Professional Plus — office productivity suite",
              "Windows Backup — post-installation backup configuration"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "BIOS & USB boot",
                "description": "Entered BIOS (F2/DEL), changed boot order to place USB key (Windows 10 Pro ISO) first. Saved with F10 and rebooted."
              },
              {
                "label": "Windows 10 Pro installation",
                "description": "French, Custom installation, Windows 10 Pro 64-bit with OEM key. License accepted, user account created, OOBE completed (region France, Cortana, Microsoft Hello)."
              },
              {
                "label": "Driver verification",
                "description": "Device Manager opened — audio, network (Ethernet + Wi-Fi) and GPU drivers validated. Network connected, antivirus installed."
              },
              {
                "label": "Batch deployment via Ninite",
                "description": "Ninite.com used to install Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 and MalwareBytes in one unattended run. Office 2016 Pro Plus installed simultaneously."
              },
              {
                "label": "Finalization",
                "description": "Desktop shortcuts configured, wallpaper applied, Windows Backup enabled. Workstation handed over to client after trainer validation."
              }
            ],
            "title": "Procedure"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Clean install — all drivers validated",
                "label": "OS",
                "value": "Windows 10 Pro 64-bit"
              },
              {
                "note": "Deployed via Ninite — zero user interaction",
                "label": "Software",
                "value": "7+ applications"
              },
              {
                "note": "Installed and activated",
                "label": "Office",
                "value": "Office 2016 Pro Plus"
              },
              {
                "note": "Workstation ready for client handover",
                "label": "Time",
                "value": "Single session"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Préparation poste client : Installation Windows 10 & Déploiement logiciels",
        "heroSubtitle": "Windows 10 Pro · Ninite · Office 2016 · BIOS · Installation pilotes",
        "sections": [
          {
            "body": "Exercice de formation au Greta du Val d Oise sous la direction de Miguel MI-POUDOU. Un client a apporté un portable HP extrêmement lent, sans données à récupérer. La mission : remise à neuf complète du poste — réinstallation propre de l OS, validation des pilotes, déploiement automatisé des logiciels métier et configuration finale avant remise au client.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Réinstaller Windows 10 Pro 64 bits depuis un support USB bootable",
              "Valider tous les pilotes (audio, réseau, carte graphique) après installation",
              "Déployer rapidement l ensemble des logiciels métier requis (7+ applications)",
              "Configurer le poste pour remise immédiate au client (raccourcis, sauvegardes, antivirus)",
              "Intervenir sans perte de données — poste vierge, aucune récupération nécessaire"
            ],
            "title": "Périmètre & Objectifs"
          },
          {
            "type": "bullets",
            "items": [
              "Démarrage USB configuré via BIOS, Windows 10 Pro 64 bits installé avec clé OEM du formateur",
              "OOBE finalisé : région France, création du compte utilisateur, Cortana, Microsoft Hello, géolocalisation",
              "Tous les pilotes validés dans le Gestionnaire de périphériques — réseau, audio, GPU",
              "7+ applications déployées en une passe via Ninite.com sans interaction utilisateur ni toolbars",
              "Office 2016 Professionnel Plus installé et activé simultanément",
              "Raccourcis bureau, fond d écran et sauvegarde Windows configurés — poste validé par le formateur"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "Windows 10 Pro 64 bits — OS réinstallé depuis ISO sur clé USB",
              "BIOS/UEFI — configuration de l ordre de démarrage",
              "Gestionnaire de périphériques — validation des pilotes post-installation",
              "Ninite.com — déploiement batch d applications sans interaction (Chrome, Firefox, 7-Zip, Zoom, LibreOffice, TeamViewer, MalwareBytes)",
              "Office 2016 Professionnel Plus — suite bureautique",
              "Sauvegarde Windows — configuration post-installation"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "BIOS & démarrage USB",
                "description": "Entrée dans le BIOS (F2/DEL), ordre de démarrage modifié pour placer la clé USB ISO Windows 10 Pro en premier. Sauvegarde F10 et redémarrage."
              },
              {
                "label": "Installation Windows 10 Pro",
                "description": "Français, Installation personnalisée, Windows 10 Pro 64 bits avec clé OEM. Licence acceptée, compte utilisateur créé, OOBE finalisé (région France, Cortana, Microsoft Hello)."
              },
              {
                "label": "Validation des pilotes",
                "description": "Gestionnaire de périphériques ouvert — pilotes audio, réseau (Ethernet + Wi-Fi) et GPU vérifiés. Connexion réseau établie, antivirus installé."
              },
              {
                "label": "Déploiement batch via Ninite",
                "description": "Ninite.com utilisé pour installer Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 et MalwareBytes en un passage. Office 2016 Pro Plus installé simultanément."
              },
              {
                "label": "Finalisation",
                "description": "Raccourcis bureau configurés, fond d écran appliqué, sauvegarde Windows activée. Poste remis au client après validation formateur."
              }
            ],
            "title": "Procédure"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Installation propre — tous pilotes validés",
                "label": "OS",
                "value": "Windows 10 Pro 64 bits"
              },
              {
                "note": "Déployées via Ninite — sans intervention",
                "label": "Logiciels",
                "value": "7+ applications"
              },
              {
                "note": "Installé et activé",
                "label": "Office",
                "value": "Office 2016 Pro Plus"
              },
              {
                "note": "Poste opérationnel remis au client",
                "label": "Délai",
                "value": "Session unique"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Windows 10 provisioning + automated software install",
        "heroSubtitle": "Windows 10 · Ninite · Office 2016 · OOBE · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Ejercicio de formación en el Greta du Val d Oise bajo la dirección de Miguel MI-POUDOU. Un cliente trajo un portátil HP extremadamente lento, sin datos que recuperar. La misión: puesta a punto completa del equipo — reinstalación limpia del SO, validación de controladores, despliegue automatizado del software profesional y configuración final antes de la entrega al cliente."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Reinstalar Windows 10 Pro de 64 bits desde un soporte USB de arranque",
              "Validar todos los controladores (audio, red, tarjeta gráfica) tras la instalación",
              "Desplegar rápidamente el conjunto de software profesional requerido (7+ aplicaciones)",
              "Configurar el equipo para su entrega inmediata al cliente (accesos directos, copias de seguridad, antivirus)",
              "Intervenir sin pérdida de datos — equipo vacío, sin necesidad de recuperación"
            ],
            "title": "Alcance y objetivos"
          },
          {
            "type": "bullets",
            "items": [
              "Arranque USB configurado vía BIOS, Windows 10 Pro de 64 bits instalado con clave OEM del formador",
              "OOBE finalizado: región Francia, creación de la cuenta de usuario, Cortana, Microsoft Hello, geolocalización",
              "Todos los controladores validados en el Administrador de dispositivos — red, audio, GPU",
              "7+ aplicaciones desplegadas en una sola pasada vía Ninite.com sin interacción del usuario ni barras de herramientas",
              "Office 2016 Professional Plus instalado y activado simultáneamente",
              "Accesos directos de escritorio, fondo de pantalla y copia de seguridad de Windows configurados — equipo validado por el formador"
            ],
            "title": "Solución y entregables"
          },
          {
            "type": "bullets",
            "items": [
              "Windows 10 Pro de 64 bits — SO reinstalado desde ISO en llave USB",
              "BIOS/UEFI — configuración del orden de arranque",
              "Administrador de dispositivos — validación de controladores tras la instalación",
              "Ninite.com — despliegue por lotes de aplicaciones sin interacción (Chrome, Firefox, 7-Zip, Zoom, LibreOffice, TeamViewer, MalwareBytes)",
              "Office 2016 Professional Plus — suite ofimática",
              "Copia de seguridad de Windows — configuración posterior a la instalación"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "BIOS y arranque USB",
                "description": "Entrada en la BIOS (F2/DEL), orden de arranque modificado para colocar la llave USB con la ISO de Windows 10 Pro en primer lugar. Guardado F10 y reinicio."
              },
              {
                "label": "Instalación de Windows 10 Pro",
                "description": "Francés, Instalación personalizada, Windows 10 Pro de 64 bits con clave OEM. Licencia aceptada, cuenta de usuario creada, OOBE finalizado (región Francia, Cortana, Microsoft Hello)."
              },
              {
                "label": "Validación de controladores",
                "description": "Administrador de dispositivos abierto — controladores de audio, red (Ethernet + Wi-Fi) y GPU verificados. Conexión de red establecida, antivirus instalado."
              },
              {
                "label": "Despliegue por lotes vía Ninite",
                "description": "Ninite.com utilizado para instalar Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 y MalwareBytes en una sola pasada. Office 2016 Pro Plus instalado simultáneamente."
              },
              {
                "label": "Finalización",
                "description": "Accesos directos de escritorio configurados, fondo de pantalla aplicado, copia de seguridad de Windows activada. Equipo entregado al cliente tras la validación del formador."
              }
            ],
            "title": "Procedimiento"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Instalación limpia — todos los controladores validados",
                "label": "SO",
                "value": "Windows 10 Pro 64 bits"
              },
              {
                "note": "Desplegadas vía Ninite — sin intervención",
                "label": "Software",
                "value": "7+ aplicaciones"
              },
              {
                "note": "Instalado y activado",
                "label": "Office",
                "value": "Office 2016 Pro Plus"
              },
              {
                "note": "Equipo operativo entregado al cliente",
                "label": "Tiempo",
                "value": "Sesión única"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "parkit-java-testing",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/parkit-java-testing/screenshot-17.webp"
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
              "Duration bug fix: replaced broken calculation logic for stays exceeding 24h",
              "TDD Feature 1: tests written first → price = 0 for parking stays under 30 minutes",
              "TDD Feature 2: tests written first → 5% discount applied after license plate lookup",
              "ParkingService unit tests with Mockito — coverage above 90%",
              "ParkingDataBaseIT integration tests on real database — global coverage above 70%",
              "JaCoCo and Surefire reports generated and validated by jury"
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
                "description": "Review of existing project, identification of duration bug and missing features"
              },
              {
                "label": "Bug fix",
                "description": "Fixed negative duration calculation for parking stays over 24 hours"
              },
              {
                "label": "TDD Feature 1",
                "description": "Tests written first → implemented free 30-minute stay rule"
              },
              {
                "label": "TDD Feature 2",
                "description": "Tests written first → implemented 5% recurring user discount with plate lookup"
              },
              {
                "label": "Unit tests",
                "description": "Mockito mocks on ParkingService — coverage above 90%"
              },
              {
                "label": "Integration tests",
                "description": "ParkingDataBaseIT on real database — global coverage above 70%, defense validated 4/4"
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
              "Absence de tests d intégration sur la base de données réelle"
            ],
            "title": "Problèmes & Périmètre"
          },
          {
            "type": "bullets",
            "items": [
              "Correction du bug de durée : remplacement de la logique de calcul pour les séjours > 24h",
              "TDD Feature 1 : tests écrits en premier → prix à 0 pour stationnement < 30 min",
              "TDD Feature 2 : tests écrits en premier → réduction 5% après vérification de la plaque d immatriculation",
              "Tests unitaires ParkingService avec Mockito — couverture > 90%",
              "Tests d intégration ParkingDataBaseIT sur base de données réelle — couverture globale > 70%",
              "Rapports JaCoCo et Surefire générés et validés par le jury"
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
              "Surefire — rapport d exécution des tests",
              "MySQL — base de données pour les tests d intégration",
              "Git — versionning avec branches feature/fix"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse du code",
                "description": "Lecture du projet existant, identification du bug de durée et des fonctionnalités manquantes"
              },
              {
                "label": "Bug fix",
                "description": "Correction du calcul de durée négatif pour les stationnements supérieurs à 24h"
              },
              {
                "label": "TDD Feature 1",
                "description": "Écriture des tests d abord → implémentation de la gratuité des 30 premières minutes"
              },
              {
                "label": "TDD Feature 2",
                "description": "Écriture des tests d abord → implémentation de la remise 5% pour les utilisateurs récurrents"
              },
              {
                "label": "Tests unitaires",
                "description": "Mockito mocks sur ParkingService — couverture > 90%"
              },
              {
                "label": "Tests d intégration",
                "description": "ParkingDataBaseIT sur base réelle — couverture globale > 70%, soutenance validée 4/4"
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
                "description": "Configuración del versionado, ejecución de mvn test / mvn verify, y análisis de las pruebas fallidas para aislar las causas."
              },
              {
                "title": "Corrección: duración negativa (>24h)",
                "description": "Corrección del cálculo de duración mediante timestamps en milisegundos (Date.getTime()), con conversión coherente a minutos."
              },
              {
                "title": "TDD: 30 minutos gratuitos",
                "description": "Escritura de pruebas unitarias (coche + moto) para estancias < 30 minutos, y adaptación de FareCalculatorService para devolver una tarifa de 0 en ese caso."
              },
              {
                "title": "TDD: descuento 5% usuario recurrente",
                "description": "Añadido de un flujo calculateFare(Ticket, boolean), implementación del conteo en TicketDAO (getNbTicket), y aplicación del descuento cuando el usuario no está en su primer uso."
              },
              {
                "title": "Refuerzo de pruebas unitarias (Mockito)",
                "description": "Ampliación de las pruebas unitarias de ParkingService mediante mocks (TicketDAO, ParkingSpotDAO, InputReader), y adición de pruebas específicas para cubrir los caminos exitosos y de error."
              },
              {
                "title": "Pruebas de integración + informes",
                "description": "Finalización de los TODO en ParkingDatabaseIT, adición de una prueba de integración para el descuento (usuario recurrente), y generación de los informes Surefire + JaCoCo mediante mvn verify."
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
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/parkit-java-testing/screenshots.zip",
                "label": "Capturas de informes de pruebas (ZIP)"
              },
              {
                "href": "/docs/projects/parkit-java-testing/repository-link.txt",
                "label": "Descargar enlace del repositorio (TXT)"
              }
            ],
            "title": "Entregables y evidencias"
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
  },
  {
    "slug": "pochlib-ui",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-17.webp"
      },
      {
        "alt": "Screenshot 18",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/pochlib-ui/screenshot-18.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "SPA front-end UI (Poch'Lib)",
        "heroSubtitle": "Development of the Poch'Lib SPA frontend interface, a book management library in HTML/CSS/JS.",
        "sections": [
          {
            "body": "Great'App, a 20-person Nice-based startup, tasked its CTO Marie with delivering Poch'Lib — a book management SPA commissioned by bookshop 'La plume enchantée'. Mission: build the entire frontend from scratch, matching UX designer Charlotte's wireframes exactly, with flawless responsive rendering across 3 formats (mobile, tablet, desktop), using no JavaScript framework.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "No existing codebase — entire project to be built from scratch",
              "UX designer wireframes to be followed precisely",
              "Multi-format display required: mobile, tablet, and desktop",
              "External API consumption for book search via Fetch API",
              "SPA constraint: no page reloads allowed",
              "Installation README to be delivered to the end client"
            ],
            "title": "Problem Scope"
          },
          {
            "type": "bullets",
            "items": [
              "Book search via the Google Books API (Fetch) and add to a personal list (\"Poch'List\")",
              "List persisted across views via sessionStorage — no loss on navigation, cleared when the tab closes",
              "Dynamic book removal with real-time DOM updates (solid/empty Font Awesome bookmark icons reflecting state)",
              "Code organized into 3 ES6 modules (application.js, search.js, util.js) with import/export — zero framework dependency",
              "Mobile-first responsive with media queries for 3 breakpoints",
              "Semantic HTML5 aligned with Charlotte's UX wireframes",
              "Structured SASS (variables, mixins, nesting) — DRY approach validated by jury",
              "Installation README delivered to end client"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "Semantic HTML5 — interface structure",
              "SASS — CSS preprocessor (variables, mixins, DRY)",
              "JavaScript ES6 (modules) — SPA logic split across 3 files, DOM manipulation",
              "Google Books API — book search via Fetch",
              "sessionStorage — client-side persistence of the book list",
              "Font Awesome — bookmark and delete icons",
              "Media queries — 3-breakpoint responsive (mobile, tablet, desktop)",
              "Git — versioning and delivery"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Wireframe analysis",
                "description": "Review of Charlotte's mockups, breakdown into HTML/CSS components"
              },
              {
                "label": "HTML/SASS integration",
                "description": "Semantic structure, mobile-first styles, SASS variables and mixins setup"
              },
              {
                "label": "JavaScript logic",
                "description": "Fetch API integration, book add/remove, dynamic DOM updates"
              },
              {
                "label": "Responsive refinement",
                "description": "Media query adjustments for all 3 formats: mobile, tablet and desktop"
              },
              {
                "label": "Documentation & delivery",
                "description": "Installation README written, defense validated with 4/4 skills"
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
                "label": "Responsive formats",
                "value": "3"
              },
              {
                "label": "Jury feedback",
                "value": "Excellent mastery"
              }
            ],
            "title": "Defense Results"
          }
        ]
      },
      "fr": {
        "title": "Interface SPA front-end (Poch'Lib)",
        "heroSubtitle": "Développement de l'interface frontend SPA de Poch'Lib, une librairie de gestion de livres en HTML/CSS/JS.",
        "sections": [
          {
            "body": "Great'App, startup niçoise de 20 personnes, a chargé sa CTO Marie de livrer Poch'Lib — une SPA de gestion de livres commandée par la librairie « La plume enchantée ». Mission : construire l intégralité du frontend de zéro, en respectant les wireframes de l UX designer Charlotte, avec un rendu responsive sur 3 formats (mobile, tablette, bureau), sans aucun framework JavaScript.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Aucune base de code existante — projet à créer intégralement de zéro",
              "Wireframes fournis par l UX designer à respecter à la lettre",
              "Affichage multi-format requis : mobile, tablette et bureau",
              "Consommation d une API externe pour la recherche de livres (Fetch API)",
              "Contrainte SPA : aucun rechargement de page autorisé",
              "Livraison d un README d installation pour la prise en main client"
            ],
            "title": "Problèmes & Périmètre"
          },
          {
            "type": "bullets",
            "items": [
              "Recherche de livres via la Google Books API (Fetch) et ajout à une liste personnelle (« Poch'List »)",
              "Persistance de la liste entre les pages via sessionStorage — pas de perte au changement de vue, réinitialisée à la fermeture de l'onglet",
              "Suppression dynamique des livres avec mise à jour du DOM en temps réel (icônes Font Awesome pleine/vide selon l'état du signet)",
              "Code organisé en 3 modules ES6 (application.js, search.js, util.js) avec import/export — zéro dépendance framework",
              "Responsive mobile-first avec media queries pour 3 breakpoints",
              "HTML5 sémantique aligné sur les wireframes UX de Charlotte",
              "SASS structuré (variables, mixins, nesting) — approche DRY validée par le jury",
              "README d'installation livré au client final"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "HTML5 sémantique — structure de l'interface",
              "SASS — préprocesseur CSS (variables, mixins, DRY)",
              "JavaScript ES6 (modules) — logique SPA répartie sur 3 fichiers, manipulation du DOM",
              "Google Books API — recherche de livres via Fetch",
              "sessionStorage — persistance de la liste de livres côté navigateur",
              "Font Awesome — icônes de signet et de suppression",
              "Media queries — responsive 3 breakpoints (mobile, tablette, bureau)",
              "Git — versionning et livraison"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse des wireframes",
                "description": "Lecture des maquettes de Charlotte, découpage en composants HTML/CSS"
              },
              {
                "label": "Intégration HTML/SASS",
                "description": "Structure sémantique, styles mobile-first, mise en place des variables et mixins SASS"
              },
              {
                "label": "Logique JavaScript",
                "description": "Fetch API, ajout et suppression de livres, mise à jour dynamique du DOM"
              },
              {
                "label": "Responsive",
                "description": "Ajustements des media queries pour les 3 formats : mobile, tablette et bureau"
              },
              {
                "label": "Documentation & livraison",
                "description": "Rédaction du README d installation, soutenance validée avec 4/4 compétences"
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
                "label": "Formats responsive",
                "value": "3"
              },
              {
                "label": "Évaluation jury",
                "value": "Très bonne maîtrise"
              }
            ],
            "title": "Résultats de la soutenance"
          }
        ]
      },
      "es": {
        "title": "Interfaz SPA front-end (Poch'Lib)",
        "heroSubtitle": "Interfaz Single Page Application para una librería (Poch’Lib)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Great'App (Niza) me encargó la realización del front-end de Poch'Lib, una aplicación de gestión de libros solicitada por la librería «La plume enchantée».",
              "El entregable esperado es una Single Page Application responsive (móvil/tablet/escritorio), conforme a las especificaciones funcionales y a los wireframes UX."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Buscar y añadir un libro a la lista del usuario.",
              "Mostrar los libros guardados y eliminar un libro de la lista.",
              "Interfaz responsive en 3 formatos (móvil / tablet / escritorio)."
            ],
            "title": "Funcionalidades clave"
          },
          {
            "type": "bullets",
            "items": [
              "Búsqueda de libros mediante la Google Books API (Fetch) y adición a una lista personal (\"Poch'List\").",
              "Persistencia de la lista entre vistas vía sessionStorage — sin pérdida al navegar, se reinicia al cerrar la pestaña.",
              "Eliminación dinámica de libros con actualización del DOM en tiempo real (iconos Font Awesome de marcador lleno/vacío según el estado).",
              "Código organizado en 3 módulos ES6 (application.js, search.js, util.js) con import/export — sin dependencia de framework."
            ],
            "title": "Puntos técnicos"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Responsive",
                "value": "3 formatos (móvil / tablet / escritorio)"
              },
              {
                "label": "Coherencia visual",
                "value": "Wireframes respetados + tipografía/espaciados coherentes"
              },
              {
                "label": "Buenas prácticas",
                "value": "HTML/CSS/JS + Sass (CSS estructurado)"
              },
              {
                "label": "Dinamismo",
                "value": "Google Books API + sessionStorage + manipulación del DOM"
              }
            ],
            "title": "Señales de calidad"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/pochlib-ui/index.html",
                "label": "Página HTML de demostración (HTML)"
              },
              {
                "href": "https://github.com/Aiyeesha/PochLib",
                "label": "Repositorio GitHub"
              },
              {
                "href": "/docs/projects/pochlib-ui/repository-link.txt",
                "label": "Descargar enlace del repositorio (TXT)"
              }
            ],
            "title": "Entregables y evidencias"
          },
          {
            "code": "https://github.com/Aiyeesha/PochLib",
            "type": "code",
            "title": "Repositorio",
            "language": "text"
          }
        ]
      }
    }
  },
  {
    "slug": "python-network-scanner",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/python-network-scanner/cover.svg"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/python-network-scanner/screenshot-1.svg"
      }
    ],
    "locales": {
      "en": {
        "title": "Network Scanner (FastAPI + React)",
        "heroSubtitle": "Real-time network scanner — FastAPI backend + WebSocket + React/Vite UI",
        "sections": [
          {
            "body": "Personal network security project: a full-stack local network scanner capable of identifying live hosts and open ports on a LAN segment, streaming results in real time via WebSocket, and classifying each service by risk level. Built in two layers: a Python FastAPI backend with concurrent threads, and a React/Vite frontend displaying results live.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Host discovery: local subnet resolution and ping sweep to list all live hosts",
              "Concurrent port scanning via ThreadPoolExecutor — all top ports probed in parallel per host",
              "45-service detection table (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s...)",
              "Risk classification (high / medium / low) per port via RISK_MAP (Telnet, RDP, exposed DBs...)",
              "Real-time WebSocket streaming — results pushed to frontend as each host completes",
              "React/Vite frontend: live host cards, risk-colour-coded port badges, scan progress indicator"
            ],
            "title": "Features Built"
          },
          {
            "type": "bullets",
            "items": [
              "Python 3 + FastAPI — REST API and WebSocket backend",
              "uvicorn — ASGI server for FastAPI",
              "ThreadPoolExecutor — Concurrent port scanning (stdlib concurrent.futures)",
              "WebSockets — Real-time backend → frontend streaming",
              "React 18 + Vite — Live-updating SPA frontend",
              "CORS middleware — Cross-origin backend/frontend integration"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Host discovery",
                "description": "Backend resolves the local subnet and pings each IP to build the list of live hosts."
              },
              {
                "label": "Concurrent port scan",
                "description": "For each live host, a ThreadPoolExecutor probes the TOP_PORTS list in parallel — open ports and service names collected."
              },
              {
                "label": "Risk classification",
                "description": "Each open port is looked up in RISK_MAP and tagged high / medium / low based on known exposure risk."
              },
              {
                "label": "WebSocket streaming",
                "description": "Results pushed to frontend in real time as each host finishes scanning — no need to wait for the full scan."
              },
              {
                "label": "React rendering",
                "description": "Frontend receives JSON events via WebSocket and renders host cards with colour-coded port badges on the fly."
              }
            ],
            "title": "How It Works"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Real-time streaming",
                "label": "Transport",
                "value": "WebSocket (FastAPI + uvicorn)"
              },
              {
                "note": "Parallel port probing per host",
                "label": "Concurrency",
                "value": "ThreadPoolExecutor"
              },
              {
                "note": "KNOWN_SERVICES dict",
                "label": "Port coverage",
                "value": "45 services"
              },
              {
                "note": "High / Medium / Low via RISK_MAP",
                "label": "Risk levels",
                "value": "3 levels"
              },
              {
                "note": "fastapi, uvicorn, websockets + React/Vite",
                "label": "Dependencies",
                "value": "Minimal"
              }
            ],
            "title": "Technical Highlights"
          }
        ]
      },
      "fr": {
        "title": "Scanner Réseau (FastAPI + React)",
        "heroSubtitle": "Scanner réseau temps réel — backend FastAPI + WebSocket + interface React/Vite",
        "sections": [
          {
            "body": "Projet personnel de sécurité réseau : un scanner de réseau local full-stack capable d identifier les hôtes actifs et les ports ouverts sur un segment LAN, de diffuser les résultats en temps réel via WebSocket, et de classifier chaque service par niveau de risque. Conçu en deux couches : un backend Python FastAPI avec threads concurrents, et un frontend React/Vite affichant les résultats en direct.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Découverte d hôtes : résolution du sous-réseau local et ping de chaque IP pour lister les hôtes actifs",
              "Scan de ports concurrent via ThreadPoolExecutor — tous les top ports scannés en parallèle par hôte",
              "Table de détection de 45 services connus (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s...)",
              "Classification des risques (élevé / moyen / faible) par port via RISK_MAP (Telnet, RDP, BDD exposées...)",
              "Streaming WebSocket en temps réel — résultats envoyés au frontend dès que chaque hôte termine",
              "Frontend React/Vite : cartes d hôtes en live, badges de ports colorés par risque, indicateur de progression"
            ],
            "title": "Fonctionnalités développées"
          },
          {
            "type": "bullets",
            "items": [
              "Python 3 + FastAPI — Backend API REST et WebSocket",
              "uvicorn — Serveur ASGI pour FastAPI",
              "ThreadPoolExecutor — Scan de ports concurrent (stdlib concurrent.futures)",
              "WebSockets — Streaming temps réel backend → frontend",
              "React 18 + Vite — Frontend SPA avec mise à jour live",
              "CORS middleware — Intégration backend/frontend cross-origin"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Découverte des hôtes",
                "description": "Le backend résout le sous-réseau local et pinge chaque IP pour construire la liste des hôtes actifs."
              },
              {
                "label": "Scan de ports concurrent",
                "description": "Pour chaque hôte actif, un ThreadPoolExecutor sonde la liste TOP_PORTS en parallèle — ports ouverts et noms de services collectés."
              },
              {
                "label": "Classification des risques",
                "description": "Chaque port ouvert est recherché dans RISK_MAP et étiqueté élevé / moyen / faible selon le risque d exposition connu."
              },
              {
                "label": "Streaming WebSocket",
                "description": "Résultats envoyés au frontend en temps réel dès que chaque hôte termine son scan — sans attendre la fin du scan complet."
              },
              {
                "label": "Rendu React",
                "description": "Le frontend reçoit les événements JSON via WebSocket et affiche des cartes d hôtes avec badges de ports colorés à la volée."
              }
            ],
            "title": "Fonctionnement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Streaming temps réel",
                "label": "Transport",
                "value": "WebSocket (FastAPI + uvicorn)"
              },
              {
                "note": "Sondage parallèle par hôte",
                "label": "Concurrence",
                "value": "ThreadPoolExecutor"
              },
              {
                "note": "Dict KNOWN_SERVICES",
                "label": "Couverture ports",
                "value": "45 services"
              },
              {
                "note": "Élevé / Moyen / Faible via RISK_MAP",
                "label": "Niveaux de risque",
                "value": "3 niveaux"
              },
              {
                "note": "fastapi, uvicorn, websockets + React/Vite",
                "label": "Dépendances",
                "value": "Minimales"
              }
            ],
            "title": "Points techniques clés"
          }
        ]
      },
      "es": {
        "title": "Network Scanner (FastAPI + React)",
        "heroSubtitle": "Escáner de red en tiempo real — backend FastAPI + WebSocket + interfaz React/Vite",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Un escáner de red local full-stack realizado como proyecto personal de seguridad. El objetivo era producir una herramienta capaz de identificar los hosts activos y los puertos abiertos en un segmento LAN, transmitir los resultados en tiempo real y clasificar cada servicio por nivel de riesgo.",
              "El proyecto se compone de dos capas: un backend Python FastAPI que realiza el escaneo real con hilos concurrentes, y un frontend React/Vite que se conecta vía WebSocket y muestra los resultados en directo."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Backend FastAPI con un endpoint WebSocket que transmite los resultados a medida que se obtienen — sin polling ni recarga de página.",
              "Escáner de puertos concurrente mediante ThreadPoolExecutor: recorre todos los puertos principales de una subred en paralelo, y luego agrega los resultados por host.",
              "Tabla de detección de servicios que cubre 45 puertos conocidos (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s API…).",
              "Clasificación de riesgo (alto / medio / bajo) por puerto abierto basada en un RISK_MAP curado (Telnet, RDP, listener de Metasploit, bases de datos expuestas…).",
              "API REST con CORS habilitado en paralelo al endpoint WebSocket para facilitar la integración.",
              "Frontend React/Vite con tarjetas de host actualizadas en tiempo real, badges de puertos coloreados por riesgo e indicador de progreso del escaneo."
            ],
            "title": "Lo que construí"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Transporte",
                "value": "WebSocket (FastAPI + uvicorn) — streaming en tiempo real"
              },
              {
                "label": "Concurrencia",
                "value": "ThreadPoolExecutor — sondeo paralelo de puertos por host"
              },
              {
                "label": "Cobertura de puertos",
                "value": "45 servicios conocidos en el dict KNOWN_SERVICES"
              },
              {
                "label": "Niveles de riesgo",
                "value": "alto / medio / bajo por puerto (Telnet, RDP, BD expuestas…)"
              },
              {
                "label": "Stack",
                "value": "Python 3, FastAPI, uvicorn, websockets · React 18, Vite"
              }
            ],
            "title": "Puntos técnicos clave"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Descubrimiento de hosts",
                "description": "El backend resuelve la subred local y hace ping a cada IP para construir la lista de hosts activos."
              },
              {
                "title": "Escaneo de puertos concurrente",
                "description": "Para cada host activo, un ThreadPoolExecutor sondea la lista TOP_PORTS en paralelo, recopilando los puertos abiertos y los nombres de servicios."
              },
              {
                "title": "Clasificación de riesgos",
                "description": "Cada puerto abierto se busca en RISK_MAP y se etiqueta como alto / medio / bajo según el riesgo de exposición conocido."
              },
              {
                "title": "Streaming WebSocket",
                "description": "Los resultados se envían al frontend en tiempo real en cuanto cada host termina su escaneo — sin esperar a que finalice el escaneo completo."
              },
              {
                "title": "Renderizado de la UI React",
                "description": "El frontend Vite/React recibe eventos JSON vía WebSocket y muestra tarjetas de host con badges de puertos coloreados al vuelo."
              }
            ],
            "title": "Funcionamiento"
          },
          {
            "code": "# Backend\npip install fastapi uvicorn websockets\npython backend.py\n\n# Frontend (terminal separada)\ncd scanner-ui\nnpm install && npm run dev",
            "type": "code",
            "title": "Ejecutar el proyecto",
            "language": "bash"
          }
        ]
      }
    }
  },
  {
    "slug": "python-password-checker",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/python-password-checker/cover.svg"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/python-password-checker/screenshot-1.svg"
      }
    ],
    "locales": {
      "en": {
        "title": "Password Strength Analyzer (Python CLI)",
        "heroSubtitle": "Password strength analyzer — entropy, regex, HaveIBeenPwned (Python CLI)",
        "sections": [
          {
            "body": "Personal security-focused CLI tool: rigorously evaluates password strength without ever transmitting the password in plain text. Built to explore Python's regex engine, entropy mathematics, and privacy-preserving API design (HaveIBeenPwned k-anonymity). Runs interactively in the terminal and produces a full structured report in one pass.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Entropy calculation: log₂(pool^length) character-pool-aware — composite 0–100 score",
              "9 compiled regex rules: repeated chars, numeric/alphabetic sequences, keyboard walks (qwerty/azerty), embedded years",
              "Dictionary matching against 30+ common passwords and base words",
              "Crack-time estimation at 3 attack speeds (10k/s, 1M/s, 1B/s)",
              "HaveIBeenPwned integration via k-anonymity: only the first 5 SHA-1 chars sent to the API — the password never leaves the machine",
              "ANSI-colored terminal output with progress bar, per-criterion checklist and improvement suggestions"
            ],
            "title": "Features Built"
          },
          {
            "type": "bullets",
            "items": [
              "Python 3 stdlib — re, hashlib (SHA-1), math, getpass (input masking)",
              "Compiled regex — 6 rules (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD...)",
              "HIBP k-anonymity — only 5-char SHA-1 prefix sent to the API",
              "requests (optional) — HaveIBeenPwned API call",
              "ANSI escape codes — colored output and terminal progress bar",
              "Zero mandatory dependencies — runs on stdlib alone"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Secure input",
                "description": "getpass.getpass() used to mask password entry in the terminal — never displayed in plain text."
              },
              {
                "label": "Entropy & score",
                "description": "Character pool detected (lowercase, uppercase, digits, special). Entropy computed: log₂(pool^length). Composite 0–100 score with length and complexity bonuses."
              },
              {
                "label": "Pattern analysis",
                "description": "9 compiled regex rules applied: repetitions, sequences, keyboard walks, embedded years. Each detected pattern penalizes the score."
              },
              {
                "label": "HIBP check",
                "description": "SHA-1 hash of the password computed. Only the first 5 characters sent to the HIBP API (k-anonymity). Response analyzed for breach detection — password never revealed."
              },
              {
                "label": "Terminal report",
                "description": "ANSI-colored output: score, progress bar, criteria checklist, crack-time estimate, targeted improvement suggestions."
              }
            ],
            "title": "How It Works"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Character-pool aware",
                "label": "Entropy model",
                "value": "log₂(pool^length)"
              },
              {
                "note": "Only 5 SHA-1 chars sent",
                "label": "HIBP privacy",
                "value": "k-anonymity"
              },
              {
                "note": "RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD...",
                "label": "Pattern engine",
                "value": "9 regex rules"
              },
              {
                "note": "Length, complexity, entropy bonuses + penalties",
                "label": "Score",
                "value": "0–100"
              },
              {
                "note": "stdlib only (requests optional)",
                "label": "Dependencies",
                "value": "Zero required"
              }
            ],
            "title": "Key Technical Choices"
          }
        ]
      },
      "fr": {
        "title": "Analyseur de force de mot de passe (CLI Python)",
        "heroSubtitle": "Analyseur de force de mot de passe — entropie, regex, HaveIBeenPwned (CLI Python)",
        "sections": [
          {
            "body": "Outil CLI personnel centré sur la sécurité : évalue rigoureusement la force d un mot de passe sans jamais le transmettre en clair. Conçu pour explorer le moteur regex de Python, le calcul d entropie et la conception d API respectueuses de la vie privée (k-anonymat HaveIBeenPwned). L outil fonctionne en mode interactif dans le terminal et produit un rapport structuré complet en une seule passe.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Calcul d entropie : log₂(pool^longueur) adapté au pool de caractères — score composite 0-100",
              "6 règles regex compilées : caractères répétés, séquences numériques/alphabétiques, walks clavier (qwerty/azerty), années intégrées",
              "Correspondance dictionnaire : 30+ mots de passe courants et mots de base",
              "Estimation du temps de crack à 3 vitesses d attaque (10k/s, 1M/s, 1 milliard/s)",
              "Intégration HaveIBeenPwned par k-anonymat : seuls les 5 premiers caractères du hash SHA-1 envoyés — le mot de passe ne quitte jamais la machine",
              "Sortie terminal ANSI colorée avec barre de progression, checklist par critère et suggestions d amélioration"
            ],
            "title": "Fonctionnalités développées"
          },
          {
            "type": "bullets",
            "items": [
              "Python 3 stdlib — re, hashlib (SHA-1), math, getpass (masquage saisie)",
              "Regex compilés — 6 règles (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD...)",
              "k-anonymat HIBP — seul le préfixe SHA-1 de 5 caractères envoyé à l API",
              "requests (optionnel) — appel API HaveIBeenPwned",
              "ANSI escape codes — sortie colorée et barre de progression en terminal",
              "Aucune dépendance obligatoire — fonctionne avec la stdlib seule"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Saisie sécurisée",
                "description": "getpass.getpass() utilisé pour masquer la saisie du mot de passe dans le terminal — jamais affiché en clair."
              },
              {
                "label": "Calcul d entropie & score",
                "description": "Pool de caractères détecté (minuscules, majuscules, chiffres, spéciaux). Entropie calculée : log₂(pool^longueur). Score composite 0-100 avec bonus longueur et complexité."
              },
              {
                "label": "Analyse de patterns",
                "description": "6 règles regex compilées appliquées : répétitions, séquences, walks clavier, années intégrées. Chaque pattern détecté pénalise le score."
              },
              {
                "label": "Vérification HIBP",
                "description": "Hash SHA-1 du mot de passe calculé. Seuls les 5 premiers caractères envoyés à l API HIBP (k-anonymat). Réponse analysée pour détecter une compromission sans révéler le mot de passe."
              },
              {
                "label": "Rapport terminal",
                "description": "Sortie ANSI colorée : score, barre de progression, checklist des critères, estimation du temps de crack, suggestions d amélioration ciblées."
              }
            ],
            "title": "Fonctionnement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Adapté au pool de caractères",
                "label": "Modèle d entropie",
                "value": "log₂(pool^longueur)"
              },
              {
                "note": "5 chars SHA-1 seulement envoyés",
                "label": "Confidentialité HIBP",
                "value": "k-anonymat"
              },
              {
                "note": "RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD...",
                "label": "Moteur de patterns",
                "value": "6 règles regex"
              },
              {
                "note": "Bonus longueur, complexité, entropie + pénalités",
                "label": "Score",
                "value": "0–100"
              },
              {
                "note": "stdlib uniquement (requests optionnel)",
                "label": "Dépendances",
                "value": "Zéro obligatoire"
              }
            ],
            "title": "Choix techniques clés"
          }
        ]
      },
      "es": {
        "title": "Password Strength Analyzer (Python CLI)",
        "heroSubtitle": "Analizador de fortaleza de contraseñas — entropía, regex, HaveIBeenPwned (CLI Python)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Una herramienta de línea de comandos que evalúa rigurosamente la fortaleza de una contraseña sin transmitirla nunca en texto plano. Proyecto personal centrado en la seguridad para explorar el motor de regex de Python, el cálculo de entropía y el diseño de APIs respetuosas con la privacidad.",
              "La herramienta funciona en modo interactivo en la terminal, enmascara la entrada y produce un informe estructurado completo en una sola pasada."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Cálculo de entropía basado en el tamaño del conjunto de caracteres y la longitud de la contraseña (bits), con una puntuación compuesta de 0 a 100.",
              "Detección de patrones mediante regex: caracteres repetidos, secuencias numéricas/alfabéticas, patrones de teclado (qwerty/azerty), años incluidos, largas series numéricas.",
              "Comparación con un diccionario de 30+ contraseñas comunes.",
              "Estimación del tiempo de crackeo a tres velocidades de ataque (10k/s, 1M/s, 1.000M/s) mediante la fórmula del espacio de búsqueda.",
              "Integración con HaveIBeenPwned mediante k-anonimato: solo se envían a la API los 5 primeros caracteres del hash SHA-1 — la contraseña nunca sale de la máquina.",
              "Salida de terminal coloreada con ANSI, barra de progreso, checklist por criterio y sugerencias de mejora accionables."
            ],
            "title": "Lo que construí"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Modelo de entropía",
                "value": "log₂(pool^longitud) — adaptado al conjunto de caracteres"
              },
              {
                "label": "Privacidad HIBP",
                "value": "k-anonimato — solo se envían 5 caracteres del hash SHA-1"
              },
              {
                "label": "Motor de patrones",
                "value": "6 reglas regex compiladas (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD…)"
              },
              {
                "label": "Rango de puntuación",
                "value": "0–100 con bonificaciones de longitud, complejidad, entropía y penalizaciones"
              },
              {
                "label": "Dependencias",
                "value": "solo stdlib (re, hashlib, math, getpass) + requests opcional"
              }
            ],
            "title": "Decisiones técnicas clave"
          },
          {
            "code": "# No requiere instalación — solo stdlib (requests opcional para HIBP)\npython password_checker.py",
            "type": "code",
            "title": "Ejecutar la herramienta",
            "language": "bash"
          }
        ]
      }
    }
  },
  {
    "slug": "risk-assessment-matrix",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Matrice de Risques — Interactive Risk Register (Rebuilt)",
        "heroSubtitle": "Interactive 5×5 likelihood/impact risk matrix — localStorage persistence, in-place editing, and a tested Python CLI for report generation",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "matrice-risques rebuilds and extends risk-assessment-matrix, an open-source risk assessment project. Goal: an interactive risk register with a live Likelihood × Impact heat map (5×5), paired with a Python CLI for automation (bulk import, HTML report generation) — while fixing several blocking limitations of the original along the way."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Likelihood × Impact matrix (5×5) with automatic scoring and color coding (Critical / High / Moderate / Low)",
              "Risk register: categories, owners, mitigations, due dates, statuses",
              "Client-side persistence (localStorage) — the register survives a page reload",
              "In-place editing of existing risks (not just add/remove)",
              "Search and filtering, including click-to-filter on a matrix cell (drill-down)",
              "JSON and CSV export (UTF-8 BOM for Excel compatibility)",
              "Python CLI: HTML report generation from a JSON register, on-demand risk scoring",
              "pytest test suite covering the scoring engine"
            ],
            "title": "Features"
          },
          {
            "type": "bullets",
            "items": [
              "No persistence, the register was lost on page reload → Persistence via localStorage, full register serialization/deserialization",
              "README documented a flat CLI (--input, --risk) but the code required undocumented subcommands (report, eval) → CLI rewritten to match exactly what's documented",
              "The register class's update() method was never called by the UI → Full \"Edit\" button, pre-filled form, in-place save",
              "Likelihood/impact labels hardcoded in JS despite already existing in JSON → JS now loads categories_risques.json dynamically (single source of truth)",
              "No automated tests → 6 pytest tests covering scoring, level boundaries, sorting, and example-data validation",
              "Windows CLI output mis-encoded (cp1252) → sys.stdout.reconfigure(encoding=\"utf-8\") — correct accented characters in console"
            ],
            "title": "What was fixed vs. the original"
          },
          {
            "type": "bullets",
            "items": [
              "Vanilla HTML/CSS/JS (ES modules, zero dependencies) — standalone browser app",
              "Python CLI (argparse, Jinja2, pytest) — automation and reporting",
              "localStorage — client-side persistence",
              "JSON / CSV export with UTF-8 BOM"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Immediate remediation",
                "label": "Critical",
                "value": "Score 20-25"
              },
              {
                "note": "Remediation within 30 days",
                "label": "High",
                "value": "Score 12-19"
              },
              {
                "note": "Remediation within 90 days",
                "label": "Moderate",
                "value": "Score 6-11"
              },
              {
                "note": "Acceptance or monitoring",
                "label": "Low",
                "value": "Score 1-5"
              }
            ],
            "title": "Risk scoring"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "argparse, Jinja2, pytest",
                "label": "Stack",
                "value": "Vanilla HTML/CSS/JS + Python CLI"
              },
              {
                "note": "Scoring, level boundaries, sorting, data validation",
                "label": "Tests",
                "value": "6 pytest tests"
              },
              {
                "note": "Fixes the original's main limitation",
                "label": "Persistence",
                "value": "localStorage"
              },
              {
                "note": "matrice-risques later became the base for a platform combining STRIDE, vendor risk, and incident-driven recalibration",
                "label": "Foundation for",
                "value": "risque360"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Matrice de Risques — Registre de Risques Interactif (Reconstruit)",
        "heroSubtitle": "Matrice de risque interactive 5×5 Probabilité/Impact — persistance localStorage, édition en place, et CLI Python testée pour la génération de rapports",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "matrice-risques reconstruit et enrichit risk-assessment-matrix, un projet open source d'évaluation des risques. Objectif : un registre de risques interactif avec matrice de chaleur Probabilité × Impact (5×5) en direct, assorti d'une CLI Python pour l'automatisation (import en masse, génération de rapport HTML) — et corriger au passage plusieurs limites bloquantes de l'original."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Matrice Probabilité × Impact (5×5) avec scoring automatique et code couleur (Critique / Élevé / Modéré / Faible)",
              "Registre de risques : catégories, responsables, mitigations, échéances, statuts",
              "Persistance locale (localStorage) — le registre survit au rechargement de page",
              "Modification en place des risques existants (pas seulement ajout/suppression)",
              "Recherche et filtrage, y compris par clic sur une cellule de la matrice (drill-down)",
              "Export JSON et CSV (BOM UTF-8 pour compatibilité Excel)",
              "CLI Python : génération de rapport HTML à partir d'un registre JSON, évaluation ponctuelle d'un risque",
              "Suite de tests pytest sur le moteur de scoring"
            ],
            "title": "Fonctionnalités"
          },
          {
            "type": "bullets",
            "items": [
              "Aucune persistance, le registre était perdu au rechargement de la page → Persistance via localStorage, sérialisation/désérialisation du registre complet",
              "Le README documentait une CLI à plat (--input, --risk) mais le code exigeait des sous-commandes non documentées (report, eval) → CLI réécrite pour correspondre exactement à ce qui est documenté",
              "La méthode update() de la classe de registre n'était jamais appelée par l'interface → Bouton « Modifier » complet, formulaire pré-rempli, sauvegarde en place",
              "Libellés probabilité/impact codés en dur en JS alors qu'ils existaient déjà en JSON → Le JS charge désormais dynamiquement categories_risques.json (source unique)",
              "Aucun test automatisé → 6 tests pytest sur le scoring, les bornes de niveaux, le tri et la validation des données d'exemple",
              "Sortie CLI Windows mal encodée (cp1252) → sys.stdout.reconfigure(encoding=\"utf-8\") — accents corrects en console"
            ],
            "title": "Ce qui a été corrigé par rapport à l'original"
          },
          {
            "type": "bullets",
            "items": [
              "HTML/CSS/JS vanilla (ES modules, aucune dépendance) — application navigateur autonome",
              "CLI Python (argparse, Jinja2, pytest) — automatisation et rapports",
              "localStorage — persistance côté client",
              "Export JSON / CSV avec BOM UTF-8"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Remédiation immédiate",
                "label": "Critique",
                "value": "Score 20-25"
              },
              {
                "note": "Remédiation sous 30 jours",
                "label": "Élevé",
                "value": "Score 12-19"
              },
              {
                "note": "Remédiation sous 90 jours",
                "label": "Modéré",
                "value": "Score 6-11"
              },
              {
                "note": "Acceptation ou surveillance",
                "label": "Faible",
                "value": "Score 1-5"
              }
            ],
            "title": "Scoring des risques"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "argparse, Jinja2, pytest",
                "label": "Stack",
                "value": "HTML/CSS/JS vanilla + CLI Python"
              },
              {
                "note": "Scoring, bornes de niveaux, tri, validation des données",
                "label": "Tests",
                "value": "6 tests pytest"
              },
              {
                "note": "Corrige la principale limite de l'original",
                "label": "Persistance",
                "value": "localStorage"
              },
              {
                "note": "matrice-risques a ensuite servi de socle à une plateforme combinant STRIDE, risques fournisseurs et recalibration par incidents",
                "label": "Base de",
                "value": "risque360"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Matriz de Riesgos — Registro de Riesgos Interactivo (Reconstruido)",
        "heroSubtitle": "Matriz de riesgos interactiva 5×5 probabilidad/impacto — persistencia localStorage, edición en línea, y CLI Python probada para generación de informes.",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "matrice-risques reconstruye y amplía risk-assessment-matrix, un proyecto open source de evaluación de riesgos. Objetivo: un registro de riesgos interactivo con un mapa de calor Probabilidad × Impacto (5×5) en vivo, junto con una CLI de Python para automatización (importación masiva, generación de informes HTML) — corrigiendo de paso varias limitaciones bloqueantes del original."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Matriz Probabilidad × Impacto (5×5) con puntuación automática y código de colores (Crítico / Alto / Moderado / Bajo)",
              "Registro de riesgos: categorías, responsables, mitigaciones, plazos, estados",
              "Persistencia local (localStorage) — el registro sobrevive a la recarga de la página",
              "Edición en línea de riesgos existentes (no solo añadir/eliminar)",
              "Búsqueda y filtrado, incluido el filtrado por clic en una celda de la matriz (drill-down)",
              "Exportación JSON y CSV (BOM UTF-8 para compatibilidad con Excel)",
              "CLI Python: generación de informe HTML a partir de un registro JSON, evaluación puntual de un riesgo",
              "Suite de tests pytest sobre el motor de puntuación"
            ],
            "title": "Funcionalidades"
          },
          {
            "type": "bullets",
            "items": [
              "Sin persistencia, el registro se perdía al recargar la página → Persistencia mediante localStorage, serialización/deserialización completa del registro",
              "El README documentaba una CLI plana (--input, --risk) pero el código exigía subcomandos no documentados (report, eval) → CLI reescrita para coincidir exactamente con lo documentado",
              "El método update() de la clase de registro nunca era llamado por la interfaz → Botón «Modificar» completo, formulario precargado, guardado en línea",
              "Etiquetas de probabilidad/impacto codificadas en JS aunque ya existían en JSON → El JS carga dinámicamente categories_risques.json (fuente única)",
              "Sin tests automatizados → 6 tests pytest sobre la puntuación, los límites de nivel, el ordenamiento y la validación de datos de ejemplo",
              "Salida de la CLI de Windows mal codificada (cp1252) → sys.stdout.reconfigure(encoding=\"utf-8\") — acentos correctos en consola"
            ],
            "title": "Qué se corrigió respecto al original"
          },
          {
            "type": "bullets",
            "items": [
              "HTML/CSS/JS vanilla (módulos ES, sin dependencias) — aplicación de navegador autónoma",
              "CLI Python (argparse, Jinja2, pytest) — automatización e informes",
              "localStorage — persistencia del lado del cliente",
              "Exportación JSON / CSV con BOM UTF-8"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Remediación inmediata",
                "label": "Crítico",
                "value": "Puntuación 20-25"
              },
              {
                "note": "Remediación en 30 días",
                "label": "Alto",
                "value": "Puntuación 12-19"
              },
              {
                "note": "Remediación en 90 días",
                "label": "Moderado",
                "value": "Puntuación 6-11"
              },
              {
                "note": "Aceptación o supervisión",
                "label": "Bajo",
                "value": "Puntuación 1-5"
              }
            ],
            "title": "Puntuación de riesgos"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "argparse, Jinja2, pytest",
                "label": "Stack",
                "value": "HTML/CSS/JS vanilla + CLI Python"
              },
              {
                "note": "Puntuación, límites de nivel, ordenamiento, validación de datos",
                "label": "Tests",
                "value": "6 tests pytest"
              },
              {
                "note": "Corrige la principal limitación del original",
                "label": "Persistencia",
                "value": "localStorage"
              },
              {
                "note": "matrice-risques sirvió después de base para una plataforma que combina STRIDE, riesgo de proveedores y recalibración por incidentes",
                "label": "Base de",
                "value": "risque360"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "security-monitoring-dashboard",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/security-monitoring-dashboard/cover.webp"
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
              "Built as the first project in a 4-project security portfolio, exploring what a unified SOC triage view could look like: severity-ranked events, live updates, and the KPIs a team lead actually watches."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "FastAPI backend with a WebSocket hub broadcasting new events to every connected client",
              "SQLite persistence via SQLAlchemy, replacing an initial in-memory prototype",
              "API-key-protected ingestion endpoint — reading stays open, writing requires trust",
              "React/TypeScript frontend with a custom useLiveEvents hook managing fetch + WebSocket state",
              "Pytest suite covering the events and metrics endpoints"
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
              "Construit comme premier projet d'un portfolio sécurité de 4 projets, explorant à quoi pourrait ressembler une vue de triage SOC unifiée : événements classés par sévérité, mises à jour en direct, et les indicateurs qu'un responsable d'équipe surveille réellement."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Backend FastAPI avec un hub WebSocket diffusant les nouveaux événements à tous les clients connectés",
              "Persistance SQLite via SQLAlchemy, remplaçant un prototype initial en mémoire",
              "Endpoint d'ingestion protégé par clé API — la lecture reste ouverte, l'écriture demande une clé",
              "Frontend React/TypeScript avec un hook useLiveEvents personnalisé gérant le fetch + l'état WebSocket",
              "Suite Pytest couvrant les endpoints events et metrics"
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
              "Construido como primer proyecto de un portafolio de seguridad de 4 proyectos, explorando cómo podría ser una vista de triaje SOC unificada: eventos clasificados por severidad, actualizaciones en vivo, y los indicadores que un responsable de equipo realmente vigila."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Backend FastAPI con un hub WebSocket que transmite los nuevos eventos a todos los clientes conectados",
              "Persistencia SQLite vía SQLAlchemy, sustituyendo un prototipo inicial en memoria",
              "Endpoint de ingesta protegido por clave API — la lectura permanece abierta, la escritura requiere confianza",
              "Frontend React/TypeScript con un hook useLiveEvents personalizado que gestiona el fetch + el estado WebSocket",
              "Suite Pytest que cubre los endpoints de eventos y métricas"
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
  },
  {
    "slug": "second-brain-claude-code",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Second Brain 2.0 — Claude Code + Notion",
        "sections": [
          {
            "body": "LLMs lose all context between sessions: every conversation starts from scratch. Meanwhile, hundreds of Notion notes sit unused because the AI never reads them. The idea: build a persistent memory architecture where Claude Code reads structured Markdown files at the start of each session, and automatically enriches them at the end.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Systematic context loss between Claude sessions: profile, active projects, past decisions",
              "Notion notes unused by AI due to lack of structured integration",
              "Tedious context repetition at every new conversation",
              "No automatic enrichment: the AI learns but remembers nothing"
            ],
            "title": "Problem Scope"
          },
          {
            "type": "bullets",
            "items": [
              "Structured Markdown memory files (YAML frontmatter) in the .claude/projects/ folder",
              "Automatic loading at startup via CLAUDE.md and memory index",
              "Post-session enrichment: new decisions, projects, technical context added",
              "Notion MCP integration for bidirectional sync with the knowledge base",
              "Segmented memory: user profile, active projects, tech stack, preferences"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "Claude Code CLI — main agent with local file access",
              "Notion MCP Server — read and write Notion pages",
              "Markdown + YAML frontmatter — memory file format",
              "CLAUDE.md — auto-loaded instructions file for Claude Code on startup",
              "Git — memory versioning for history and rollback"
            ],
            "title": "Tech Stack"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "V1 — File memories",
                "description": "User profile and project index as local Markdown files, active"
              },
              {
                "label": "V2 — Auto enrichment",
                "description": "Claude Code enriches memories after each significant session"
              },
              {
                "label": "V3 — Notion sync",
                "description": "MCP Notion connection for bidirectional read/write"
              },
              {
                "label": "V4 — Multi-agent",
                "description": "Specialized agents (research, code, writing) sharing the same memory"
              }
            ],
            "title": "Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Context is loaded automatically",
                "label": "Sessions without re-contextualization",
                "value": "100%"
              },
              {
                "note": "user_profile, project_saas, MEMORY index",
                "label": "Active memory files",
                "value": "3"
              },
              {
                "note": "Actively used in this portfolio project",
                "label": "Status",
                "value": "In production"
              }
            ],
            "title": "Impact"
          }
        ]
      },
      "fr": {
        "title": "Second Brain 2.0 — Claude Code + Notion",
        "sections": [
          {
            "body": "Les LLMs perdent tout contexte entre les sessions : chaque conversation repart de zéro. Parallèlement, des centaines de notes Notion restent inexploitées car jamais lues par l'IA. L'idée : créer une architecture de mémoire persistante où Claude Code lit des fichiers Markdown structurés au démarrage de chaque session, et les enrichit automatiquement à la fin.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Perte de contexte systématique entre chaque session Claude : profil, projets en cours, décisions passées",
              "Notes Notion non exploitées par l'IA faute d'intégration structurée",
              "Répétition fastidieuse du contexte à chaque nouvelle conversation",
              "Pas d'enrichissement automatique : l'IA apprend mais ne mémorise rien"
            ],
            "title": "Problème"
          },
          {
            "type": "bullets",
            "items": [
              "Fichiers mémoire Markdown structurés (YAML frontmatter) dans le dossier .claude/projects/",
              "Lecture automatique au démarrage via CLAUDE.md et memory index",
              "Enrichissement post-session : nouvelles décisions, projets, contexte technique ajoutés",
              "Intégration Notion MCP pour sync bidirectionnelle avec la base de connaissance",
              "Mémoire segmentée : profil utilisateur, projets actifs, stack technique, préférences"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "Claude Code CLI — agent principal avec accès fichiers locaux",
              "Notion MCP Server — lecture et écriture dans les pages Notion",
              "Markdown + YAML frontmatter — format des fichiers mémoire",
              "CLAUDE.md — fichier d'instructions auto-chargé par Claude Code au démarrage",
              "Git — versionnement des mémoires pour historique et rollback"
            ],
            "title": "Stack Technique"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "V1 — Mémoires fichiers",
                "description": "Profil utilisateur et index projets en fichiers Markdown locaux, actifs"
              },
              {
                "label": "V2 — Enrichissement auto",
                "description": "Claude Code enrichit les mémoires après chaque session significative"
              },
              {
                "label": "V3 — Sync Notion",
                "description": "Connexion MCP Notion pour lecture/écriture bidirectionnelle"
              },
              {
                "label": "V4 — Multi-agent",
                "description": "Agents spécialisés (recherche, code, rédaction) partageant la même mémoire"
              }
            ],
            "title": "Avancement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Le contexte est chargé automatiquement",
                "label": "Sessions sans re-contextualisation",
                "value": "100%"
              },
              {
                "note": "user_profile, project_saas, MEMORY index",
                "label": "Fichiers mémoire actifs",
                "value": "3"
              },
              {
                "note": "Utilisé activement dans ce projet portfolio",
                "label": "Statut",
                "value": "En production"
              }
            ],
            "title": "Impact"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-rmm-supervision",
    "gallery": [
      {
        "alt": "RMM Supervision — vue principale",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-rmm-supervision/2023-05-16%2016_44_15-.webp"
      },
      {
        "alt": "RMM Supervision — vue 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-rmm-supervision/2023-05-16%2016_52_39-.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-rmm-supervision/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-rmm-supervision/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-rmm-supervision/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-rmm-supervision/screenshot-5.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Infrastructure Monitoring with Datto RMM",
        "heroSubtitle": "Datto RMM · Splashtop · MalwareBytes · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "At MIDRANGE GROUP, a managed service provider (MSP) based in the Île-de-France region, I worked within the Exploitation team alongside Théo KACEL (Systems & Networks Administrator). The technical floor was split into two units: Technical Support (handling client calls, ticket creation, and L1/L2 resolution) and Exploitation (server maintenance, security, and L2/L3 escalation support). My role in Exploitation gave me direct hands-on access to the company's RMM platform."
            ]
          },
          {
            "type": "text",
            "title": "Platform: Datto RMM",
            "paragraphs": [
              "Datto RMM (Remote Monitoring and Management) is an enterprise-grade platform designed for MSPs and IT teams to remotely monitor and manage endpoints, networks, and systems at scale. I used its core capabilities day to day: real-time device health monitoring, automated patch management, software inventory, remote access, security status tracking, and job automation via Quick Jobs and policies."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Devices monitored",
                "value": "550+ endpoints (desktops, laptops, servers) across multiple client sites"
              },
              {
                "label": "Reference site",
                "value": "MID-S0A (MIDRANGE GROUP internal site)"
              },
              {
                "label": "Agent version",
                "value": "4.4.2195.2195"
              },
              {
                "label": "Remote access tool",
                "value": "Splashtop (integrated into Datto RMM)"
              },
              {
                "label": "Antivirus",
                "value": "Webroot SecureAnywhere Endpoint / MalwareBytes"
              }
            ],
            "title": "Platform Details"
          },
          {
            "type": "text",
            "title": "Tasks Performed",
            "paragraphs": [
              "On the Datto RMM platform, I carried out the following operational tasks: reviewed the Default Dashboard to assess the overall health of the managed fleet (offline device count by type, antivirus coverage across all sites); navigated device profiles to inspect hardware specs, OS version, patch status, and software inventory for individual endpoints; used the Quick Job feature to remotely deploy the MalwareBytes endpoint agent on targeted machines without requiring physical access or user interaction; and connected to client machines via Splashtop for remote troubleshooting and user support sessions."
            ]
          },
          {
            "type": "text",
            "title": "Remote Access: Splashtop",
            "paragraphs": [
              "Splashtop is integrated natively into Datto RMM and provides secure remote desktop access to managed endpoints. I used it for: remote technical support for end users (viewing and controlling the client's screen to resolve issues without physical presence); server management tasks (accessing and checking server configurations remotely); and collaborative troubleshooting alongside Théo on complex incidents affecting client infrastructure."
            ]
          },
          {
            "body": "Antivirus coverage extended across the full monitored fleet (550+ devices), with remote deployment requiring zero on-site travel.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Fleet visibility",
                "value": "Real-time monitoring of 550+ devices with health, patch, and antivirus status at a glance"
              },
              {
                "label": "Remote deployment",
                "value": "MalwareBytes deployed to unprotected endpoints via Quick Jobs — zero on-site travel"
              },
              {
                "label": "Remote support",
                "value": "End-user issues resolved via Splashtop without physical intervention"
              },
              {
                "label": "MSP operations",
                "value": "Direct operational view of MSP work: multi-client management, SLA-driven support, tiered escalation"
              },
              {
                "label": "Skills",
                "value": "Datto RMM, remote monitoring, patch management, endpoint security, Splashtop, MSP workflows"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Supervision d'infrastructure avec Datto RMM",
        "heroSubtitle": "Datto RMM · Splashtop · MalwareBytes · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Chez MIDRANGE GROUP, ESN/MSP basée en Île-de-France, j'intervenais au sein de l'équipe Exploitation aux côtés de Théo KACEL (Administrateur Systèmes & Réseaux). Le plateau technique de l'entreprise se divise en deux pôles : Support Technique (gestion des appels clients, création de tickets, résolution N1/N2) et Exploitation (maintenance des serveurs, sécurité, renfort N2/N3). Mon rôle en Exploitation me donnait un accès opérationnel direct à la plateforme RMM de l'entreprise."
            ]
          },
          {
            "type": "text",
            "title": "Plateforme : Datto RMM",
            "paragraphs": [
              "Datto RMM (Remote Monitoring and Management) est une plateforme professionnelle conçue pour les MSP et les équipes IT afin de surveiller et gérer à distance les équipements, réseaux et systèmes à grande échelle. J'en exploitais au quotidien les fonctionnalités principales : surveillance en temps réel de la santé des équipements, gestion automatisée des correctifs, inventaire logiciel, accès à distance, suivi de l'état de sécurité et automatisation des tâches via Quick Jobs et politiques."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Équipements supervisés",
                "value": "550+ postes (desktops, laptops, serveurs) sur plusieurs sites clients"
              },
              {
                "label": "Site de référence",
                "value": "MID-S0A (site interne MIDRANGE GROUP)"
              },
              {
                "label": "Version agent",
                "value": "4.4.2195.2195"
              },
              {
                "label": "Outil d'accès distant",
                "value": "Splashtop (intégré à Datto RMM)"
              },
              {
                "label": "Antivirus",
                "value": "Webroot SecureAnywhere Endpoint / MalwareBytes"
              }
            ],
            "title": "Détails de la plateforme"
          },
          {
            "type": "text",
            "title": "Tâches effectuées",
            "paragraphs": [
              "Sur la plateforme Datto RMM, je réalisais les opérations suivantes : consultation du tableau de bord Default Dashboard pour évaluer l'état global du parc (comptage des équipements hors ligne par type, couverture antivirus sur l'ensemble des sites) ; navigation dans les profils d'équipements pour inspecter les caractéristiques matérielles, la version OS, le statut des correctifs et l'inventaire logiciel ; utilisation de la fonctionnalité Quick Job pour déployer à distance l'agent MalwareBytes sur les postes ciblés, sans accès physique ni intervention utilisateur ; connexion aux postes clients via Splashtop pour des sessions de dépannage et de support à distance."
            ]
          },
          {
            "type": "text",
            "title": "Accès distant : Splashtop",
            "paragraphs": [
              "Splashtop est intégré nativement à Datto RMM et fournit un accès bureau à distance sécurisé aux équipements gérés. Je l'utilisais pour : le support technique à distance aux utilisateurs finaux (visualisation et contrôle du poste client pour résoudre les incidents sans déplacement) ; la gestion à distance des serveurs (accès et vérification des configurations) ; et le dépannage collaboratif avec Théo sur des incidents complexes affectant l'infrastructure clients."
            ]
          },
          {
            "body": "Couverture antivirus étendue à l'ensemble du parc supervisé (550+ postes), avec un déploiement à distance ne nécessitant aucun déplacement sur site.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Visibilité parc",
                "value": "Supervision en temps réel de 550+ équipements avec état de santé, correctifs et antivirus en un coup d'œil"
              },
              {
                "label": "Déploiement distant",
                "value": "MalwareBytes déployé sur les postes non protégés via Quick Jobs — zéro déplacement sur site"
              },
              {
                "label": "Support à distance",
                "value": "Incidents utilisateurs résolus via Splashtop sans intervention physique"
              },
              {
                "label": "Contexte MSP",
                "value": "Vision opérationnelle directe d'un MSP : gestion multi-clients, support orienté SLA, escalade en niveaux"
              },
              {
                "label": "Compétences",
                "value": "Datto RMM, supervision à distance, gestion des patchs, sécurité endpoint, Splashtop, workflows MSP"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Remote monitoring & endpoint security (Datto RMM)",
        "heroSubtitle": "Datto RMM · Splashtop · MalwareBytes · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En MIDRANGE GROUP, proveedor de servicios gestionados (MSP) ubicado en la región de Île-de-France, trabajaba dentro del equipo de Explotación junto a Théo KACEL (Administrador de Sistemas y Redes). El área técnica se dividía en dos unidades: Soporte Técnico (gestión de llamadas de clientes, creación de tickets y resolución N1/N2) y Explotación (mantenimiento de servidores, seguridad y refuerzo N2/N3). Mi rol en Explotación me daba acceso operativo directo a la plataforma RMM de la empresa."
            ]
          },
          {
            "type": "text",
            "title": "Plataforma: Datto RMM",
            "paragraphs": [
              "Datto RMM (Remote Monitoring and Management) es una plataforma de nivel empresarial diseñada para que los MSP y equipos de IT supervisen y gestionen de forma remota equipos, redes y sistemas a gran escala. Utilizaba a diario sus capacidades principales: supervisión en tiempo real del estado de los equipos, gestión automatizada de parches, inventario de software, acceso remoto, seguimiento del estado de seguridad y automatización de tareas mediante Quick Jobs y políticas."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Equipos supervisados",
                "value": "550+ dispositivos (desktops, laptops, servidores) en varios sitios de clientes"
              },
              {
                "label": "Sitio de referencia",
                "value": "MID-S0A (sitio interno de MIDRANGE GROUP)"
              },
              {
                "label": "Versión del agente",
                "value": "4.4.2195.2195"
              },
              {
                "label": "Herramienta de acceso remoto",
                "value": "Splashtop (integrado en Datto RMM)"
              },
              {
                "label": "Antivirus",
                "value": "Webroot SecureAnywhere Endpoint / MalwareBytes"
              }
            ],
            "title": "Detalles de la plataforma"
          },
          {
            "type": "text",
            "title": "Tareas realizadas",
            "paragraphs": [
              "En la plataforma Datto RMM, realizaba las siguientes tareas operativas: revisión del Default Dashboard para evaluar el estado general del parque gestionado (recuento de equipos fuera de línea por tipo, cobertura antivirus en todos los sitios); navegación por los perfiles de equipos para inspeccionar las especificaciones de hardware, la versión del SO, el estado de los parches y el inventario de software de cada equipo; uso de la función Quick Job para desplegar de forma remota el agente MalwareBytes en los equipos seleccionados sin necesidad de acceso físico ni intervención del usuario; y conexión a los equipos de los clientes vía Splashtop para sesiones de resolución de incidencias y soporte remoto."
            ]
          },
          {
            "type": "text",
            "title": "Acceso remoto: Splashtop",
            "paragraphs": [
              "Splashtop está integrado de forma nativa en Datto RMM y ofrece acceso de escritorio remoto seguro a los equipos gestionados. Lo utilizaba para: soporte técnico remoto a usuarios finales (ver y controlar la pantalla del cliente para resolver incidencias sin presencia física); tareas de gestión de servidores (acceso y verificación remota de configuraciones); y resolución de incidencias colaborativa junto a Théo en incidentes complejos que afectaban a la infraestructura de los clientes."
            ]
          },
          {
            "body": "Cobertura antivirus ampliada a todo el parque supervisado (550+ equipos), con despliegue remoto sin necesidad de desplazamientos.",
            "type": "text",
            "title": "Impacto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Visibilidad del parque",
                "value": "Supervisión en tiempo real de 550+ equipos con estado de salud, parches y antivirus de un vistazo"
              },
              {
                "label": "Despliegue remoto",
                "value": "MalwareBytes desplegado en equipos desprotegidos vía Quick Jobs — cero desplazamientos in situ"
              },
              {
                "label": "Soporte remoto",
                "value": "Incidencias de usuario resueltas vía Splashtop sin intervención física"
              },
              {
                "label": "Exposición MSP",
                "value": "Visión operativa directa de un MSP: gestión multi-cliente, soporte orientado a SLA, escalado por niveles"
              },
              {
                "label": "Competencias",
                "value": "Datto RMM, supervisión remota, gestión de parches, seguridad de endpoints, Splashtop, flujos de trabajo MSP"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "workstation-mass-deployment",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/workstation-mass-deployment/screenshot-17.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Mass Workstation Deployment — 264 Dell Devices",
        "heroSubtitle": "Certified data erasure, Sysprep imaging, and zero-touch Autopilot — 264 Dell devices deployed at MIDRANGE GROUP.",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "At MIDRANGE GROUP (Alternative Partner Solutions team), I owned the deployment of two device fleets for a client rollout: 64 Dell Optiplex desktop PCs for on-site staff and 200 Dell Latitude laptops for field users.",
              "The two fleets required completely different workflows: the Optiplex machines were repurposed hardware that needed certified wiping before reuse, while the Latitude laptops were brand-new units destined for zero-touch remote deployment via Windows Autopilot."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Repurposed hardware must be certified-erased before re-enrollment — a simple format is not sufficient for compliance. Required: traceable erasure standard (NIST 800-88) with per-device certificates.",
              "Sysprep imaging requires a stable golden image: drivers, Windows updates, and corporate apps must all be baked in before capturing. Any delta after capture means a new image cycle.",
              "Windows Autopilot requires hardware hashes to be pre-registered in Intune before the device is powered on. On new Dell hardware without ProDeploy, Dell ImageAssist is the fastest hash capture path.",
              "Intune deployment profiles, BitLocker policies, Defender configuration, and update rings must all be validated on a test device before rolling out to 200 machines.",
              "Staggered deployment (20–30 devices/day) to catch Intune policy failures before they affect the full fleet."
            ],
            "title": "Technical challenges"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Phase 1 — Blancco data erasure (64 Dell Optiplex)",
                "description": "Each repurposed Optiplex was booted from a Blancco USB key. An erasure task was created (NIST 800-88 standard), all disks selected, and erasure launched. Blancco overwrites every sector and verifies. A tamper-proof PDF compliance certificate is auto-generated per machine. All 64 machines ran overnight in parallel — 2 to 3 hours each depending on disk size."
              },
              {
                "title": "Phase 2 — Sysprep golden image (64 Dell Optiplex)",
                "description": "A reference Optiplex was fully configured: Windows 11, latest drivers, corporate app suite, domain join settings. Sysprep was run (/oobe /generalize /shutdown) to prepare the image for deployment. A WinPE USB key was used to boot and capture the image with DISM (dism /Capture-Image). The resulting .wim file was deployed to all 63 remaining Optiplex machines via the same WinPE environment (dism /Apply-Image). Each machine then completed OOBE and joined the domain."
              },
              {
                "title": "Phase 3 — Windows Autopilot via Dell ImageAssist (200 Dell Latitude)",
                "description": "Each new Latitude was booted from a Dell ImageAssist USB key. ImageAssist automatically applied the deployment profile, pulled a fresh Windows image from the cloud, captured the hardware hash, and uploaded it to the Intune tenant. The machine rebooted into a clean, pre-registered OOBE. Users then only needed to enter their corporate email — Azure AD authenticated them, the Autopilot profile downloaded, and Intune silently pushed policies and apps in the background. Total IT intervention per Latitude after initial setup: under 5 minutes."
              }
            ],
            "title": "How it was done — 3 phases"
          },
          {
            "body": "264 devices deployed on schedule with zero compliance gaps — certified erasure for all repurposed hardware, under 5 minutes of IT time per new device.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "64 Optiplex (Sysprep) + 200 Latitude (Autopilot)",
                "label": "Devices deployed",
                "value": "264"
              },
              {
                "note": "One per wiped Optiplex — NIST 800-88 compliant",
                "label": "Blancco certificates",
                "value": "64"
              },
              {
                "note": "After Intune profile and ImageAssist setup",
                "label": "IT time per Latitude",
                "value": "< 5 min"
              },
              {
                "note": "No physical IT at user desks",
                "label": "Zero-touch Autopilot",
                "value": "200"
              }
            ],
            "title": "Key figures"
          },
          {
            "type": "bullets",
            "items": [
              "Blancco and Autopilot are complementary, not competing tools: Blancco handles the compliance layer for repurposed hardware, Autopilot handles the zero-touch provisioning layer for new hardware.",
              "Dell ImageAssist significantly reduces Autopilot setup time on large Dell orders: no need to run PowerShell per device, no pre-enrollment requirement.",
              "Sysprep golden images must be rebuilt for each hardware model — drivers are hardware-specific. A single image covering all Optiplex SKUs requires careful driver injection.",
              "Staggering Autopilot rollouts (batch of 20–30/day) is critical: it surfaces Intune policy failures early, before they affect hundreds of users.",
              "Generating Blancco certificates at the time of erasure (not retroactively) is the only way to guarantee an unbroken chain of custody for compliance audits."
            ],
            "title": "Best Practices"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://docs.microsoft.com/en-us/mem/autopilot/windows-autopilot",
                "label": "Windows Autopilot documentation — Microsoft"
              },
              {
                "href": "https://www.dell.com/en-us/dt/services/deployment-services/imageassist.htm",
                "label": "Dell ImageAssist"
              },
              {
                "href": "https://www.blancco.com/products/drive-eraser/",
                "label": "Blancco Drive Eraser"
              },
              {
                "href": "https://docs.microsoft.com/en-us/mem/intune/enrollment/windows-enrollment-status",
                "label": "Intune Enrollment Status Page"
              }
            ],
            "title": "Tools & references"
          }
        ]
      },
      "fr": {
        "title": "Déploiement en masse de postes de travail — 264 appareils Dell",
        "heroSubtitle": "Effacement certifié, image Sysprep et Autopilot zero-touch — 264 appareils Dell déployés chez MIDRANGE GROUP.",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Chez MIDRANGE GROUP (équipe Alternative Partner Solutions), j'ai pris en charge le déploiement de deux flottes d'appareils pour un client : 64 PC de bureau Dell Optiplex pour les collaborateurs sur site et 200 laptops Dell Latitude pour les utilisateurs en mobilité.",
              "Les deux flottes nécessitaient des workflows entièrement différents : les machines Optiplex étaient du matériel reconditionné qui devait être effacé de manière certifiée avant réutilisation, tandis que les laptops Latitude étaient du matériel neuf destiné à un déploiement zero-touch à distance via Windows Autopilot."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Le matériel reconditionné doit être effacé de manière certifiée avant réenrôlement — un simple formatage ne suffit pas pour la conformité. Exigence : norme d'effacement traçable (NIST 800-88) avec certificats par appareil.",
              "L'image Sysprep nécessite une image dorée stable : pilotes, mises à jour Windows et applications métier doivent tous être intégrés avant la capture. Tout delta après la capture impose un nouveau cycle d'image.",
              "Windows Autopilot nécessite que les hashs matériels soient pré-enregistrés dans Intune avant la mise sous tension. Sur du nouveau matériel Dell sans ProDeploy, Dell ImageAssist est le chemin le plus rapide pour la capture des hashs.",
              "Les profils Intune, les stratégies BitLocker, la configuration Defender et les anneaux de mise à jour doivent tous être validés sur un appareil de test avant de déployer sur 200 machines.",
              "Déploiement échelonné (20–30 appareils/jour) pour détecter les échecs de stratégie Intune avant qu'ils touchent la flotte entière."
            ],
            "title": "Défis techniques"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Phase 1 — Effacement des données Blancco (64 Dell Optiplex)",
                "description": "Chaque Optiplex reconditionné a été démarré depuis une clé USB Blancco. Une tâche d'effacement a été créée (norme NIST 800-88), tous les disques sélectionnés, et l'effacement lancé. Blancco écrase chaque secteur et vérifie. Un certificat PDF de conformité inviolable est généré automatiquement par machine. Les 64 machines ont tourné en parallèle la nuit — 2 à 3 heures chacune selon la capacité du disque."
              },
              {
                "title": "Phase 2 — Image Sysprep dorée (64 Dell Optiplex)",
                "description": "Une machine Optiplex de référence a été entièrement configurée : Windows 11, derniers pilotes, suite d'applications métier, paramètres de jonction au domaine. Sysprep a été exécuté (/oobe /generalize /shutdown) pour préparer l'image au déploiement. Une clé USB WinPE a été utilisée pour démarrer et capturer l'image avec DISM (dism /Capture-Image). Le fichier .wim résultant a été déployé sur les 63 autres Optiplex via le même environnement WinPE (dism /Apply-Image). Chaque machine a ensuite complété l'OOBE et rejoint le domaine."
              },
              {
                "title": "Phase 3 — Windows Autopilot via Dell ImageAssist (200 Dell Latitude)",
                "description": "Chaque nouveau Latitude a été démarré depuis une clé USB Dell ImageAssist. ImageAssist a appliqué automatiquement le profil de déploiement, récupéré une image Windows fraîche depuis le cloud, capturé le hash matériel et l'a uploadé dans le tenant Intune. La machine a redémarré sur une OOBE propre et pré-enregistrée. Les utilisateurs n'avaient plus qu'à saisir leur email professionnel — Azure AD les authentifiait, le profil Autopilot se téléchargeait et Intune poussait silencieusement stratégies et applications en arrière-plan. Temps d'intervention IT par Latitude après la configuration initiale : moins de 5 minutes."
              }
            ],
            "title": "Déroulement — 3 phases"
          },
          {
            "body": "264 appareils déployés dans les délais sans écart de conformité — effacement certifié pour l'intégralité du matériel reconditionné, moins de 5 minutes d'intervention IT par poste neuf.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "64 Optiplex (Sysprep) + 200 Latitude (Autopilot)",
                "label": "Appareils déployés",
                "value": "264"
              },
              {
                "note": "Un par Optiplex effacé — conformité NIST 800-88",
                "label": "Certificats Blancco",
                "value": "64"
              },
              {
                "note": "Après configuration du profil Intune et ImageAssist",
                "label": "Temps IT par Latitude",
                "value": "< 5 min"
              },
              {
                "note": "Aucune intervention physique de l'IT chez les utilisateurs",
                "label": "Autopilot zero-touch",
                "value": "200"
              }
            ],
            "title": "Chiffres clés"
          },
          {
            "type": "bullets",
            "items": [
              "Blancco et Autopilot sont complémentaires, pas concurrents : Blancco gère la couche conformité pour le matériel reconditionné, Autopilot gère la couche provisionnement zero-touch pour le matériel neuf.",
              "Dell ImageAssist réduit significativement le temps de configuration Autopilot sur les grandes commandes Dell : pas besoin d'exécuter PowerShell appareil par appareil, pas de prérequis d'enrôlement préalable.",
              "Les images Sysprep dorées doivent être reconstruites pour chaque modèle matériel — les pilotes sont spécifiques au hardware. Une seule image couvrant tous les SKU Optiplex nécessite une injection de pilotes soigneuse.",
              "Échelonner les déploiements Autopilot (lots de 20–30/jour) est critique : cela fait remonter les échecs de stratégie Intune tôt, avant qu'ils touchent des centaines d'utilisateurs.",
              "Générer les certificats Blancco au moment de l'effacement (pas rétroactivement) est le seul moyen de garantir une chaîne de traçabilité ininterrompue pour les audits de conformité."
            ],
            "title": "Bonnes pratiques"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://docs.microsoft.com/fr-fr/mem/autopilot/windows-autopilot",
                "label": "Documentation Windows Autopilot — Microsoft"
              },
              {
                "href": "https://www.dell.com/fr-fr/dt/services/deployment-services/imageassist.htm",
                "label": "Dell ImageAssist"
              },
              {
                "href": "https://www.blancco.com/fr/products/drive-eraser/",
                "label": "Blancco Drive Eraser"
              },
              {
                "href": "https://docs.microsoft.com/fr-fr/mem/intune/enrollment/windows-enrollment-status",
                "label": "Page de statut d'enrôlement Intune"
              }
            ],
            "title": "Outils & références"
          }
        ]
      },
      "es": {
        "title": "Windows Autopilot & mass imaging (Dell fleet)",
        "heroSubtitle": "Windows Autopilot · Dell Image Assist · Blancco · Intune · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En MIDRANGE GROUP (equipo Alternative Partner Solutions), lideré el despliegue de dos flotas de equipos para un cliente: 64 PC de sobremesa Dell Optiplex para el personal in situ y 200 portátiles Dell Latitude para usuarios en movilidad.",
              "Las dos flotas requerían flujos de trabajo completamente distintos: las máquinas Optiplex eran hardware reacondicionado que debía borrarse de forma certificada antes de su reutilización, mientras que los portátiles Latitude eran unidades nuevas destinadas a un despliegue remoto zero-touch vía Windows Autopilot."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "El hardware reacondicionado debe borrarse de forma certificada antes de su reinscripción — un simple formateo no es suficiente para el cumplimiento normativo. Se requiere: un estándar de borrado trazable (NIST 800-88) con certificados por dispositivo.",
              "La imagen Sysprep requiere una imagen dorada estable: controladores, actualizaciones de Windows y aplicaciones corporativas deben estar integrados antes de la captura. Cualquier cambio posterior a la captura implica un nuevo ciclo de imagen.",
              "Windows Autopilot requiere que los hashes de hardware estén pre-registrados en Intune antes de encender el dispositivo. En hardware Dell nuevo sin ProDeploy, Dell ImageAssist es la vía más rápida para capturar el hash.",
              "Los perfiles de despliegue de Intune, las políticas de BitLocker, la configuración de Defender y los anillos de actualización deben validarse todos en un equipo de prueba antes de desplegar a 200 máquinas.",
              "Despliegue escalonado (20–30 equipos/día) para detectar fallos de política de Intune antes de que afecten a toda la flota."
            ],
            "title": "Retos técnicos"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Fase 1 — Borrado de datos con Blancco (64 Dell Optiplex)",
                "description": "Cada Optiplex reacondicionado se arrancó desde una llave USB de Blancco. Se creó una tarea de borrado (estándar NIST 800-88), se seleccionaron todos los discos y se lanzó el borrado. Blancco sobrescribe cada sector y verifica. Se genera automáticamente un certificado PDF de conformidad a prueba de manipulaciones por cada máquina. Las 64 máquinas se ejecutaron en paralelo durante la noche — de 2 a 3 horas cada una según el tamaño del disco."
              },
              {
                "title": "Fase 2 — Imagen dorada con Sysprep (64 Dell Optiplex)",
                "description": "Se configuró completamente un Optiplex de referencia: Windows 11, últimos controladores, suite de aplicaciones corporativas, ajustes de unión al dominio. Se ejecutó Sysprep (/oobe /generalize /shutdown) para preparar la imagen para su despliegue. Se utilizó una llave USB WinPE para arrancar y capturar la imagen con DISM (dism /Capture-Image). El archivo .wim resultante se desplegó en los 63 Optiplex restantes mediante el mismo entorno WinPE (dism /Apply-Image). Cada máquina completó después el OOBE y se unió al dominio."
              },
              {
                "title": "Fase 3 — Windows Autopilot vía Dell ImageAssist (200 Dell Latitude)",
                "description": "Cada Latitude nuevo se arrancó desde una llave USB de Dell ImageAssist. ImageAssist aplicó automáticamente el perfil de despliegue, descargó una imagen de Windows actualizada desde la nube, capturó el hash de hardware y lo subió al tenant de Intune. El equipo reinició en un OOBE limpio y pre-registrado. Los usuarios solo tenían que introducir su correo corporativo — Azure AD los autenticaba, el perfil de Autopilot se descargaba e Intune desplegaba silenciosamente políticas y aplicaciones en segundo plano. Tiempo total de intervención de IT por Latitude tras la configuración inicial: menos de 5 minutos."
              }
            ],
            "title": "Cómo se hizo — 3 fases"
          },
          {
            "body": "264 dispositivos desplegados en plazo sin brechas de conformidad — borrado certificado para todo el hardware reacondicionado, menos de 5 minutos de intervención de IT por equipo nuevo.",
            "type": "text",
            "title": "Impacto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "64 Optiplex (Sysprep) + 200 Latitude (Autopilot)",
                "label": "Equipos desplegados",
                "value": "264"
              },
              {
                "note": "Uno por cada Optiplex borrado — conforme a NIST 800-88",
                "label": "Certificados Blancco",
                "value": "64"
              },
              {
                "note": "Tras la configuración del perfil Intune e ImageAssist",
                "label": "Tiempo de IT por Latitude",
                "value": "< 5 min"
              },
              {
                "note": "Sin intervención física de IT en los puestos de usuario",
                "label": "Autopilot zero-touch",
                "value": "200"
              }
            ],
            "title": "Cifras clave"
          },
          {
            "type": "bullets",
            "items": [
              "Blancco y Autopilot son complementarios, no competidores: Blancco gestiona la capa de conformidad para el hardware reacondicionado, Autopilot gestiona la capa de provisión zero-touch para el hardware nuevo.",
              "Dell ImageAssist reduce significativamente el tiempo de configuración de Autopilot en grandes pedidos Dell: no es necesario ejecutar PowerShell por dispositivo, ni requiere inscripción previa.",
              "Las imágenes doradas de Sysprep deben reconstruirse para cada modelo de hardware — los controladores son específicos del hardware. Una única imagen que cubra todos los SKU de Optiplex requiere una inyección cuidadosa de controladores.",
              "Escalonar los despliegues de Autopilot (lotes de 20–30/día) es crítico: permite detectar fallos de política de Intune de forma temprana, antes de que afecten a cientos de usuarios.",
              "Generar los certificados Blancco en el momento del borrado (no de forma retroactiva) es la única forma de garantizar una cadena de custodia ininterrumpida para las auditorías de conformidad."
            ],
            "title": "Buenas prácticas"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://docs.microsoft.com/es-es/mem/autopilot/windows-autopilot",
                "label": "Documentación de Windows Autopilot — Microsoft"
              },
              {
                "href": "https://www.dell.com/es-es/dt/services/deployment-services/imageassist.htm",
                "label": "Dell ImageAssist"
              },
              {
                "href": "https://www.blancco.com/es/products/drive-eraser/",
                "label": "Blancco Drive Eraser"
              },
              {
                "href": "https://docs.microsoft.com/es-es/mem/intune/enrollment/windows-enrollment-status",
                "label": "Página de estado de inscripción de Intune"
              }
            ],
            "title": "Herramientas y referencias"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-incident-management",
    "gallery": [
      {
        "alt": "Incident Management — vue principale",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-incident-management/2023-05-16%2016_44_15-.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-incident-management/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-incident-management/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-incident-management/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-incident-management/screenshot-5.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "IT Incident Management — Autotask, Webroot & Datto RMM",
        "heroSubtitle": "Live incident triage at MIDRANGE GROUP: Autotask ticketing, Datto RMM remote access, and Webroot false-positive resolution.",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "At MIDRANGE GROUP, within the Support Technique team alongside Théo KACEL (Systems & Network Administrator), I handled support requests for managed clients, received across three intake channels: direct phone calls to the support line, email to the support address, and automatic alerts raised by the Datto RMM agent installed on client endpoints.",
              "Once a ticket is opened in Autotask, it is routed either to the Support Technique team (user-facing incidents) or to the Exploitation team (infrastructure and monitoring). Here's how I handled a live client ticket from intake to resolution."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Phone: client calls the support line directly. The technician creates a ticket in Autotask manually and begins triage immediately.",
              "Email: client sends a message to the support address. Autotask ingests it automatically and creates a ticket, which is then assigned to the correct queue.",
              "Datto RMM agent: the agent installed on managed endpoints monitors the device in real time and can raise alerts automatically (CPU spike, disk full, security event). These generate tickets in Autotask without any client action."
            ],
            "title": "How tickets reach the support team"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Step 1 — Ticket received in Autotask",
                "description": "A client reported being unable to access a specific website. Webroot was displaying a 'site blocked' warning on their machine. The ticket was assigned to me, with Théo on hand for support."
              },
              {
                "title": "Step 2 — Remote access via Datto RMM",
                "description": "We contacted the client and requested permission to take remote control of their workstation via Datto RMM. This allowed us to reproduce the issue in real time, see the exact Webroot warning message, and confirm which URL was being blocked."
              },
              {
                "title": "Step 3 — Diagnosis: Webroot false positive",
                "description": "After inspecting the blocked URL, we determined it was a legitimate business site incorrectly flagged by Webroot's threat intelligence. The site was not malicious — Webroot had classified it as suspicious based on its domain reputation score."
              },
              {
                "title": "Step 4 — URL suppression in Webroot Management Console",
                "description": "We connected to the Webroot Management Console (CE 23.2) and navigated to the URL suppression list under the client's policy. We added the blocked domain to the suppression (whitelist) list. The change propagated to the client's endpoint within minutes, and the site became accessible without any further intervention on the machine."
              },
              {
                "title": "Step 5 — Resolution logged in Autotask",
                "description": "A time entry was created in Autotask with a summary of the issue, the root cause (false positive), and the resolution steps taken. The ticket was closed as 'Complete'. The time worked was recorded for client billing and used as part of the audit trail."
              }
            ],
            "title": "Incident resolution — step by step"
          },
          {
            "body": "Incident resolved in a single session, entirely remote, with no onsite trip and no software reinstall on the client's machine.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Phone · Email · Datto RMM agent",
                "label": "Ticket intake channels",
                "value": "3"
              },
              {
                "note": "Full remote resolution via Datto RMM",
                "label": "On-site intervention",
                "value": "None"
              },
              {
                "note": "URL suppression from console — endpoint untouched",
                "label": "Webroot reinstall required",
                "value": "No"
              },
              {
                "note": "Autotask time entry with root cause and steps",
                "label": "Resolution documented",
                "value": "Yes"
              }
            ],
            "title": "Key figures"
          },
          {
            "type": "bullets",
            "items": [
              "Webroot false positives on legitimate business sites are a recurring support scenario: the first reflex should always be to check the URL suppression list before escalating or reconfiguring the endpoint.",
              "Datto RMM remote access eliminates the need for on-site visits for most user-facing incidents, reducing resolution time significantly.",
              "Autotask time entries are not optional: they serve as both a billing record for the client and a searchable knowledge base for recurring issues.",
              "Routing matters: distinguishing between a Support Technique ticket (user-facing) and an Exploitation ticket (infrastructure) from the first description saves time and avoids wrong-team assignments.",
              "Always reproduce the issue remotely before touching any configuration — confirming the exact symptom prevents premature or incorrect changes."
            ],
            "title": "Best Practices"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.autotask.net",
                "label": "Autotask — PSA / Ticketing platform"
              },
              {
                "href": "https://www.webroot.com/us/en/business/smb/endpoint-protection",
                "label": "Webroot Business Endpoint Protection"
              },
              {
                "href": "https://www.datto.com/products/rmm",
                "label": "Datto RMM — Remote Monitoring & Management"
              }
            ],
            "title": "Tools used"
          }
        ]
      },
      "fr": {
        "title": "Gestion d'incidents IT — Autotask, Webroot & Datto RMM",
        "heroSubtitle": "Triage d'incidents en production chez MIDRANGE GROUP : ticketing Autotask, accès distant Datto RMM et résolution d'un faux positif Webroot.",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Chez MIDRANGE GROUP, au sein de l'équipe Support Technique aux côtés de Théo KACEL (Administrateur Systèmes & Réseaux), je traitais les demandes de support des clients gérés, réceptionnées via trois canaux : appels téléphoniques directs vers la ligne support, e-mails à l'adresse support, et alertes automatiques levées par l'agent Datto RMM installé sur les postes clients.",
              "Une fois un ticket ouvert dans Autotask, il est routé soit vers l'équipe Support Technique (incidents utilisateurs), soit vers l'équipe Exploitation (infrastructure et supervision). Voici le traitement d'un ticket client en production, de la prise en charge à la résolution."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Téléphone : le client appelle directement la ligne support. Le technicien crée le ticket manuellement dans Autotask et commence le triage immédiatement.",
              "E-mail : le client envoie un message à l'adresse support. Autotask l'ingère automatiquement et crée le ticket, qui est ensuite assigné à la file appropriée.",
              "Agent Datto RMM : l'agent installé sur les postes gérés supervise l'appareil en temps réel et peut lever des alertes automatiquement (pic CPU, disque plein, événement de sécurité). Ces alertes génèrent des tickets dans Autotask sans aucune action du client."
            ],
            "title": "Les trois canaux d'ouverture de tickets"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Étape 1 — Ticket reçu dans Autotask",
                "description": "Un client signalait ne pas pouvoir accéder à un site internet spécifique. Webroot affichait un message « site bloqué » sur son poste. Le ticket m'a été assigné, avec Théo en soutien pour la résolution."
              },
              {
                "title": "Étape 2 — Prise en main à distance via Datto RMM",
                "description": "Nous avons contacté le client et demandé son autorisation pour prendre le contrôle à distance de son poste via Datto RMM. Cela nous a permis de reproduire le problème en temps réel, de voir exactement le message d'avertissement Webroot, et de confirmer quelle URL était bloquée."
              },
              {
                "title": "Étape 3 — Diagnostic : faux positif Webroot",
                "description": "Après examen de l'URL bloquée, nous avons déterminé qu'il s'agissait d'un site professionnel légitime, incorrectement signalé par l'intelligence de menaces de Webroot. Le site n'était pas malveillant — Webroot l'avait classé comme suspect sur la base de son score de réputation de domaine."
              },
              {
                "title": "Étape 4 — Exclusion d'URL dans la console de gestion Webroot",
                "description": "Nous nous sommes connectés à la console de gestion Webroot (CE 23.2) et avons navigué vers la liste de suppression d'URL dans la politique du client. Nous avons ajouté le domaine bloqué à la liste de suppression (liste blanche). Le changement s'est propagé sur le poste du client en quelques minutes, et le site est devenu accessible sans aucune intervention supplémentaire sur la machine."
              },
              {
                "title": "Étape 5 — Résolution consignée dans Autotask",
                "description": "Une saisie de temps a été créée dans Autotask avec un résumé du problème, la cause racine (faux positif) et les étapes de résolution effectuées. Le ticket a été clôturé comme « Terminé ». Le temps de travail a été enregistré pour la facturation client et intégré à la traçabilité des interventions."
              }
            ],
            "title": "Résolution de l'incident — étape par étape"
          },
          {
            "body": "Incident résolu en une seule session, entièrement à distance, sans déplacement ni réinstallation logicielle sur le poste du client.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Téléphone · E-mail · Agent Datto RMM",
                "label": "Canaux d'entrée de tickets",
                "value": "3"
              },
              {
                "note": "Résolution 100% à distance via Datto RMM",
                "label": "Intervention sur site",
                "value": "Aucune"
              },
              {
                "note": "Exclusion d'URL depuis la console — poste non modifié",
                "label": "Réinstallation Webroot",
                "value": "Non"
              },
              {
                "note": "Saisie Autotask avec cause racine et étapes",
                "label": "Résolution documentée",
                "value": "Oui"
              }
            ],
            "title": "Chiffres clés"
          },
          {
            "type": "bullets",
            "items": [
              "Les faux positifs Webroot sur des sites professionnels légitimes sont un scénario de support récurrent : le premier réflexe doit toujours être de vérifier la liste de suppression d'URL avant d'escalader ou de reconfigurer le poste.",
              "L'accès distant Datto RMM élimine le besoin de déplacements sur site pour la majorité des incidents utilisateurs, réduisant significativement le temps de résolution.",
              "Les saisies de temps Autotask ne sont pas optionnelles : elles servent à la fois de pièce de facturation pour le client et de base de connaissances consultable pour les incidents récurrents.",
              "Le routage des tickets est essentiel : distinguer dès le premier signalement un ticket Support Technique (utilisateur) d'un ticket Exploitation (infrastructure) évite les mauvaises attributions et les pertes de temps.",
              "Toujours reproduire le problème à distance avant de modifier une configuration — confirmer le symptôme exact prévient les changements prématurés ou incorrects."
            ],
            "title": "Bonnes pratiques"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.autotask.net",
                "label": "Autotask — PSA / Plateforme de ticketing"
              },
              {
                "href": "https://www.webroot.com/fr/fr/business/smb/endpoint-protection",
                "label": "Webroot Business Endpoint Protection"
              },
              {
                "href": "https://www.datto.com/fr/products/rmm",
                "label": "Datto RMM — Supervision et gestion à distance"
              }
            ],
            "title": "Outils utilisés"
          }
        ]
      },
      "es": {
        "title": "IT helpdesk & incident management (Autotask PSA)",
        "heroSubtitle": "Autotask PSA · Splashtop · Webroot · Datto RMM · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En MIDRANGE GROUP, dentro del equipo de Soporte Técnico junto a Théo KACEL (Administrador de Sistemas y Redes), atendía las solicitudes de soporte de los clientes gestionados, recibidas a través de tres canales: llamadas telefónicas directas a la línea de soporte, correos electrónicos a la dirección de soporte y alertas automáticas generadas por el agente Datto RMM instalado en los equipos de los clientes.",
              "Una vez abierto un ticket en Autotask, se enruta al equipo de Soporte Técnico (incidencias de usuario) o al equipo de Explotación (infraestructura y supervisión). A continuación, el tratamiento de un ticket real de cliente, de la recepción a la resolución."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Teléfono: el cliente llama directamente a la línea de soporte. El técnico crea el ticket manualmente en Autotask y comienza el triaje de inmediato.",
              "Correo electrónico: el cliente envía un mensaje a la dirección de soporte. Autotask lo procesa automáticamente y crea el ticket, que luego se asigna a la cola correspondiente.",
              "Agente Datto RMM: el agente instalado en los equipos gestionados supervisa el dispositivo en tiempo real y puede generar alertas automáticamente (pico de CPU, disco lleno, evento de seguridad). Estas generan tickets en Autotask sin ninguna acción del cliente."
            ],
            "title": "Cómo llegan los tickets al equipo de soporte"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Paso 1 — Ticket recibido en Autotask",
                "description": "Un cliente informó que no podía acceder a un sitio web específico. Webroot mostraba una advertencia de sitio bloqueado en su equipo. El ticket me fue asignado, con Théo como apoyo."
              },
              {
                "title": "Paso 2 — Acceso remoto vía Datto RMM",
                "description": "Contactamos al cliente y solicitamos permiso para tomar el control remoto de su equipo vía Datto RMM. Esto nos permitió reproducir el problema en tiempo real, ver el mensaje exacto de advertencia de Webroot y confirmar qué URL estaba siendo bloqueada."
              },
              {
                "title": "Paso 3 — Diagnóstico: falso positivo de Webroot",
                "description": "Tras inspeccionar la URL bloqueada, determinamos que se trataba de un sitio profesional legítimo, incorrectamente marcado por la inteligencia de amenazas de Webroot. El sitio no era malicioso — Webroot lo había clasificado como sospechoso según su puntuación de reputación de dominio."
              },
              {
                "title": "Paso 4 — Exclusión de URL en la consola de gestión de Webroot",
                "description": "Nos conectamos a la consola de gestión de Webroot (CE 23.2) y navegamos hasta la lista de exclusión de URL dentro de la política del cliente. Añadimos el dominio bloqueado a la lista de exclusión (lista blanca). El cambio se propagó al equipo del cliente en pocos minutos, y el sitio quedó accesible sin ninguna intervención adicional en la máquina."
              },
              {
                "title": "Paso 5 — Resolución registrada en Autotask",
                "description": "Se creó una entrada de tiempo en Autotask con un resumen del problema, la causa raíz (falso positivo) y los pasos de resolución realizados. El ticket se cerró como Completado. El tiempo trabajado se registró para la facturación del cliente y como parte de la trazabilidad de auditoría."
              }
            ],
            "title": "Resolución del incidente — paso a paso"
          },
          {
            "body": "Incidencia resuelta en una única sesión, totalmente en remoto, sin desplazamiento ni reinstalación de software en el equipo del cliente.",
            "type": "text",
            "title": "Impacto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Teléfono · Correo electrónico · Agente Datto RMM",
                "label": "Canales de entrada de tickets",
                "value": "3"
              },
              {
                "note": "Resolución 100% remota vía Datto RMM",
                "label": "Intervención en sitio",
                "value": "Ninguna"
              },
              {
                "note": "Exclusión de URL desde la consola — equipo sin modificar",
                "label": "Reinstalación de Webroot requerida",
                "value": "No"
              },
              {
                "note": "Entrada de tiempo en Autotask con causa raíz y pasos",
                "label": "Resolución documentada",
                "value": "Sí"
              }
            ],
            "title": "Cifras clave"
          },
          {
            "type": "bullets",
            "items": [
              "Los falsos positivos de Webroot en sitios profesionales legítimos son un escenario de soporte recurrente: el primer reflejo debe ser siempre revisar la lista de exclusión de URL antes de escalar o reconfigurar el equipo.",
              "El acceso remoto vía Datto RMM elimina la necesidad de desplazamientos in situ para la mayoría de incidencias de usuario, reduciendo significativamente el tiempo de resolución.",
              "Las entradas de tiempo en Autotask no son opcionales: sirven tanto de justificante de facturación para el cliente como de base de conocimiento consultable para incidencias recurrentes.",
              "El enrutamiento importa: distinguir desde la primera descripción un ticket de Soporte Técnico (usuario) de un ticket de Explotación (infraestructura) ahorra tiempo y evita asignaciones incorrectas.",
              "Reproducir siempre el problema de forma remota antes de tocar cualquier configuración — confirmar el síntoma exacto evita cambios prematuros o incorrectos."
            ],
            "title": "Buenas prácticas"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.autotask.net",
                "label": "Autotask — Plataforma PSA / Ticketing"
              },
              {
                "href": "https://www.webroot.com/us/en/business/smb/endpoint-protection",
                "label": "Webroot Business Endpoint Protection"
              },
              {
                "href": "https://www.datto.com/products/rmm",
                "label": "Datto RMM — Supervisión y gestión remota"
              }
            ],
            "title": "Herramientas utilizadas"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-acronis-backup",
    "gallery": [
      {
        "alt": "Acronis Backup — vue 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-acronis-backup/2023-05-16%2015_54_50-.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-acronis-backup/2023-05-16%2016_02_50-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-acronis-backup/2023-05-16%2016_03_47-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-acronis-backup/2023-05-16%2016_04_30-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-acronis-backup/2023-05-16%2016_04_51-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-acronis-backup/2023-05-16%2016_05_10-SRV-MGT.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Cloud Backup Supervision with Acronis Cyber Backup",
        "heroSubtitle": "Acronis Cyber Backup · Acronis Cyber Protect Cloud · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "At MIDRANGE GROUP (a French IT services / MSP firm), within the Operations team alongside Théo KACEL (Systems & Network Administrator), I owned the daily monitoring of cloud and local backups for a managed client. The backup infrastructure relied on two distinct Acronis products: Acronis Cyber Backup (local/NAS backup solution) and Acronis Cyber Protect Cloud (MSP-oriented cloud backup platform). My mandate: check the Acronis dashboard daily, triage active alerts, and restore backup continuity on every failure detected."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Local backup tool",
                "value": "Acronis Cyber Backup (NAS / private cloud)"
              },
              {
                "label": "Cloud backup tool",
                "value": "Acronis Cyber Protect Cloud (Acronis-hosted)"
              },
              {
                "label": "NAS destination 1",
                "value": "smb://10.20.30.11/backups — 8.77 Tio / 10.5 Tio"
              },
              {
                "label": "NAS destination 2",
                "value": "smb://10.20.30.11/backups-new — 9.57 Tio / 10.5 Tio"
              },
              {
                "label": "Cloud destination",
                "value": "Acronis cloud — 139 Gio / 250 Gio"
              },
              {
                "label": "Protected devices",
                "value": "105 total (89 OK, 16 errors, 0 critical)"
              },
              {
                "label": "Unprotected devices",
                "value": "6 (UPS_LENOVO, VMware vCenter Server, ACRONIS, SRV-EXCH)"
              },
              {
                "label": "Total storage used",
                "value": "9.74 Tio backup / 21.18 Tio total"
              }
            ],
            "title": "Backup Infrastructure"
          },
          {
            "type": "text",
            "title": "Backup Plans",
            "paragraphs": [
              "The client had 5 active backup plans configured in Acronis Cyber Backup: 'Toutes les VM' (all VMs — 16 devices including SRV-RDS04, SRV-BDD, SRV-PRINT2 and 13 others — scheduled Mon–Sat at 23:00, destination: smb backups-new, retention: 2 months monthly / 4 weeks weekly / 6 days daily); 'TMP-BDD' (1 device); 'SQL-CLOUD 2' (86 devices, Mon–Fri at 23:00); 'SQL-CLOUD' (86 devices); 'Bases_Exchange' (2 devices, daily at 03:00)."
            ]
          },
          {
            "type": "text",
            "title": "Alert Investigation & Resolution",
            "paragraphs": [
              "The dashboard showed 85 active alerts: 33 activity failures and 52 warnings. I investigated each case to identify the root cause and apply the appropriate fix. The most common failure scenarios encountered were: (1) NAS storage full at 75%+ — requiring deletion of old full backups to free capacity; (2) server offline or unplugged at backup time — resolved by rescheduling or confirming server availability; (3) corrupted backup plan — requiring recreation of the plan under a new name (same base name + incremented suffix) while keeping the same backup policy; (4) network issue (defective cable or saturated NAS) — causing transfer failures mid-backup."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "SRV-RDS04 warning",
                "value": "VM backup succeeded with warning: CBT disabled — backup ran without Changed Block Tracking (VMware snapshots present)"
              },
              {
                "label": "SRV-BDD.acces.local error",
                "value": "Replication failed — client cloud account storage quota exceeded, new backups will fail"
              },
              {
                "label": "SQL-CLOUD 2 plan",
                "value": "86 devices backed up, Bases_Exchange plan shows red (failure) — investigated network/NAS saturation"
              }
            ],
            "title": "Example Alerts (from dashboard)"
          },
          {
            "body": "Backup continuity restored across all 105 protected endpoints, with no data loss and no recurring manual intervention once root causes were fixed.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Daily monitoring",
                "value": "Systematic review of backup health across 100+ devices every morning"
              },
              {
                "label": "Failure resolution",
                "value": "Root-cause analysis of 85 alerts — storage, network, server availability, and plan corruption"
              },
              {
                "label": "Plan management",
                "value": "Corrupted backup plans recreated without data loss, continuity restored"
              },
              {
                "label": "Storage management",
                "value": "NAS capacity freed by purging obsolete full backups, preventing future failures"
              },
              {
                "label": "Skills",
                "value": "Acronis Cyber Backup, Acronis Cyber Protect Cloud, backup plan management, NAS storage, alert triage"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Supervision des sauvegardes Cloud avec Acronis Cyber Backup",
        "heroSubtitle": "Acronis Cyber Backup · Acronis Cyber Protect Cloud · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Chez MIDRANGE GROUP (ESN/MSP), au sein de l'équipe Exploitation aux côtés de Théo KACEL (Administrateur Systèmes & Réseaux), j'assurais la supervision quotidienne des sauvegardes cloud et locales pour un client géré. L'infrastructure de sauvegarde reposait sur deux produits Acronis distincts : Acronis Cyber Backup (solution de sauvegarde locale/NAS) et Acronis Cyber Protect Cloud (plateforme de sauvegarde cloud orientée MSP). Ma mission : contrôler quotidiennement le tableau de bord Acronis, trier les alertes actives et rétablir la continuité de sauvegarde à chaque échec détecté."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Outil sauvegarde locale",
                "value": "Acronis Cyber Backup (NAS / cloud privé)"
              },
              {
                "label": "Outil sauvegarde cloud",
                "value": "Acronis Cyber Protect Cloud (hébergé chez Acronis)"
              },
              {
                "label": "Destination NAS 1",
                "value": "smb://10.20.30.11/backups — 8,77 Tio / 10,5 Tio"
              },
              {
                "label": "Destination NAS 2",
                "value": "smb://10.20.30.11/backups-new — 9,57 Tio / 10,5 Tio"
              },
              {
                "label": "Destination cloud",
                "value": "Cloud Acronis — 139 Gio / 250 Gio"
              },
              {
                "label": "Appareils protégés",
                "value": "105 au total (89 OK, 16 en erreur, 0 critique)"
              },
              {
                "label": "Appareils non protégés",
                "value": "6 (UPS_LENOVO, VMware vCenter Server, ACRONIS, SRV-EXCH)"
              },
              {
                "label": "Stockage total utilisé",
                "value": "9,74 Tio sauvegarde / 21,18 Tio total"
              }
            ],
            "title": "Infrastructure de sauvegarde"
          },
          {
            "type": "text",
            "title": "Plans de sauvegarde",
            "paragraphs": [
              "Le client disposait de 5 plans de sauvegarde actifs dans Acronis Cyber Backup : 'Toutes les VM' (16 appareils dont SRV-RDS04, SRV-BDD, SRV-PRINT2 et 13 autres — planification Lun–Sam à 23h00, destination : smb backups-new, conservation : 2 mois mensuel / 4 semaines hebdo / 6 jours quotidien) ; 'TMP-BDD' (1 appareil) ; 'SQL-CLOUD 2' (86 appareils, Lun–Ven à 23h00) ; 'SQL-CLOUD' (86 appareils) ; 'Bases_Exchange' (2 appareils, tous les jours à 03h00)."
            ]
          },
          {
            "type": "text",
            "title": "Investigation des alertes & résolution",
            "paragraphs": [
              "Le tableau de bord affichait 85 alertes actives : 33 échecs d'activité et 52 avertissements. J'ai investigué chaque cas pour identifier la cause racine et appliquer la correction appropriée. Les scénarios d'échec les plus fréquemment rencontrés : (1) NAS saturé à 75%+ — nécessitant la suppression d'anciennes sauvegardes complètes pour libérer de l'espace ; (2) serveur hors ligne ou débranché lors de la sauvegarde — résolu par reprogrammation ou vérification de disponibilité ; (3) plan de sauvegarde corrompu — nécessitant la recréation du plan sous un nouveau nom (même base + suffixe incrémenté) en conservant la même politique de sauvegarde ; (4) problème réseau (câble défectueux ou NAS saturé) — provoquant des échecs de transfert en cours de sauvegarde."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Avertissement SRV-RDS04",
                "value": "Sauvegarde VM réussie avec avertissement : CBT désactivé — sauvegarde exécutée sans Changed Block Tracking (snapshots VMware présents)"
              },
              {
                "label": "Erreur SRV-BDD.acces.local",
                "value": "Réplication échouée — quota de stockage du compte cloud client dépassé, les nouvelles sauvegardes échoueront"
              },
              {
                "label": "Plan SQL-CLOUD 2",
                "value": "86 appareils sauvegardés, plan Bases_Exchange en rouge (échec) — investigation saturation réseau/NAS"
              }
            ],
            "title": "Exemples d'alertes (tableau de bord)"
          },
          {
            "body": "Continuité de sauvegarde rétablie sur l'ensemble des 105 postes protégés, sans perte de données ni intervention manuelle récurrente une fois les causes racines corrigées.",
            "type": "text",
            "title": "Impact"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Surveillance quotidienne",
                "value": "Contrôle systématique de la santé des sauvegardes sur 100+ appareils chaque matin"
              },
              {
                "label": "Résolution des échecs",
                "value": "Analyse des causes racines de 85 alertes — stockage, réseau, disponibilité serveur et corruption de plan"
              },
              {
                "label": "Gestion des plans",
                "value": "Plans de sauvegarde corrompus recréés sans perte de données, continuité rétablie"
              },
              {
                "label": "Gestion du stockage",
                "value": "Capacité NAS libérée par purge des sauvegardes complètes obsolètes, évitant de futurs échecs"
              },
              {
                "label": "Compétences",
                "value": "Acronis Cyber Backup, Acronis Cyber Protect Cloud, gestion de plans de sauvegarde, NAS, triage d'alertes"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Backup operations & alert triage (Acronis)",
        "heroSubtitle": "Acronis Cyber Backup · Acronis Cyber Protect Cloud · MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En MIDRANGE GROUP (ESN/MSP francesa), dentro del equipo de Operaciones junto a Théo KACEL (Administrador de Sistemas y Redes), me encargué de la supervisión diaria de las copias de seguridad en la nube y locales de un cliente gestionado. La infraestructura de backup se apoyaba en dos productos Acronis distintos: Acronis Cyber Backup (solución de backup local/NAS) y Acronis Cyber Protect Cloud (plataforma de backup en la nube orientada a MSP). Mi misión: revisar a diario el panel de Acronis, triar las alertas activas y restablecer la continuidad de las copias de seguridad ante cada fallo detectado."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Herramienta de backup local",
                "value": "Acronis Cyber Backup (NAS / nube privada)"
              },
              {
                "label": "Herramienta de backup en la nube",
                "value": "Acronis Cyber Protect Cloud (alojado por Acronis)"
              },
              {
                "label": "Destino NAS 1",
                "value": "smb://10.20.30.11/backups — 8,77 Tio / 10,5 Tio"
              },
              {
                "label": "Destino NAS 2",
                "value": "smb://10.20.30.11/backups-new — 9,57 Tio / 10,5 Tio"
              },
              {
                "label": "Destino en la nube",
                "value": "Nube Acronis — 139 Gio / 250 Gio"
              },
              {
                "label": "Dispositivos protegidos",
                "value": "105 en total (89 OK, 16 con error, 0 críticos)"
              },
              {
                "label": "Dispositivos no protegidos",
                "value": "6 (UPS_LENOVO, VMware vCenter Server, ACRONIS, SRV-EXCH)"
              },
              {
                "label": "Almacenamiento total utilizado",
                "value": "9,74 Tio de backup / 21,18 Tio en total"
              }
            ],
            "title": "Infraestructura de backup"
          },
          {
            "type": "text",
            "title": "Planes de backup",
            "paragraphs": [
              "El cliente disponía de 5 planes de backup activos configurados en Acronis Cyber Backup: ‘Toutes les VM’ (todas las VM — 16 dispositivos incluyendo SRV-RDS04, SRV-BDD, SRV-PRINT2 y otros 13 — programado de lunes a sábado a las 23:00, destino: smb backups-new, retención: 2 meses mensual / 4 semanas semanal / 6 días diario); ‘TMP-BDD’ (1 dispositivo); ‘SQL-CLOUD 2’ (86 dispositivos, lunes a viernes a las 23:00); ‘SQL-CLOUD’ (86 dispositivos); ‘Bases_Exchange’ (2 dispositivos, diario a las 03:00)."
            ]
          },
          {
            "type": "text",
            "title": "Investigación y resolución de alertas",
            "paragraphs": [
              "El panel mostraba 85 alertas activas: 33 fallos de actividad y 52 advertencias. Investigué cada caso para identificar la causa raíz y aplicar la corrección adecuada. Los escenarios de fallo más frecuentes fueron: (1) almacenamiento NAS saturado al 75%+ — requiriendo la eliminación de copias completas antiguas para liberar espacio; (2) servidor fuera de línea o desconectado en el momento del backup — resuelto reprogramando o verificando la disponibilidad del servidor; (3) plan de backup corrupto — requiriendo recrear el plan con un nuevo nombre (misma base + sufijo incrementado) manteniendo la misma política de backup; (4) problema de red (cable defectuoso o NAS saturado) — provocando fallos de transferencia durante el backup."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Advertencia SRV-RDS04",
                "value": "Backup de VM completado con advertencia: CBT desactivado — backup ejecutado sin Changed Block Tracking (snapshots VMware presentes)"
              },
              {
                "label": "Error SRV-BDD.acces.local",
                "value": "Replicación fallida — cuota de almacenamiento de la cuenta cloud del cliente superada, los próximos backups fallarán"
              },
              {
                "label": "Plan SQL-CLOUD 2",
                "value": "86 dispositivos respaldados, el plan Bases_Exchange aparece en rojo (fallo) — investigación de saturación de red/NAS"
              }
            ],
            "title": "Ejemplos de alertas (panel)"
          },
          {
            "body": "Continuidad de backup restablecida en los 105 endpoints protegidos, sin pérdida de datos ni intervención manual recurrente una vez corregidas las causas raíz.",
            "type": "text",
            "title": "Impacto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Supervisión diaria",
                "value": "Revisión sistemática del estado de los backups en más de 100 dispositivos cada mañana"
              },
              {
                "label": "Resolución de fallos",
                "value": "Análisis de causa raíz de 85 alertas — almacenamiento, red, disponibilidad de servidores y corrupción de planes"
              },
              {
                "label": "Gestión de planes",
                "value": "Planes de backup corruptos recreados sin pérdida de datos, continuidad restablecida"
              },
              {
                "label": "Gestión de almacenamiento",
                "value": "Capacidad NAS liberada eliminando backups completos obsoletos, evitando futuros fallos"
              },
              {
                "label": "Competencias",
                "value": "Acronis Cyber Backup, Acronis Cyber Protect Cloud, gestión de planes de backup, almacenamiento NAS, triaje de alertas"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-network-security",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-network-security/screenshot-9.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Securing Internet Access with pfSense & Squid",
        "heroSubtitle": "pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17",
        "sections": [
          {
            "body": "Building on the virtualized lab (AD DS / DNS / DHCP / WDS on Windows Server 2022), I added a pfSense 2.6.0 firewall VM as the network gateway. Goal: secure outbound internet access for all LAN machines (192.168.100.0/24), filter web traffic through a Squid transparent proxy, and enforce access policies — replicating real-world enterprise perimeter security.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Hypervisor: VMware Workstation Pro 17",
              "pfSense 2.6.0 VM: FreeBSD 12 64-bit, 10 GB HDD, 2 GB RAM — LAN/WAN gateway",
              "WAN (em0): Bridged to host 4G USB dongle — DHCP — 192.168.1.110/24",
              "LAN (em1): VMnet8 (NAT) — 192.168.100.220/24 (pfSense gateway)",
              "DCAD22: 192.168.100.250 — AD DS, DNS, DHCP, WDS",
              "SRVSAMBA: 192.168.100.130 — Samba shares | Clients: 192.168.100.21/22"
            ],
            "title": "Lab Architecture"
          },
          {
            "type": "bullets",
            "items": [
              "IP aliases: SRV group (servers) and Client group (workstations) for targeted rules",
              "LAN rules: DNS (UDP 53) and ICMP allowed from SRV — REFUS SRV VERS INTERNET rule placed above allow-all",
              "Squid transparent proxy on LAN interface (port 3128) with SSL inspection enabled",
              "Internal CA Pfsense-CA (RSA 2048, SHA-256, 10 years) for SSL bump on outbound HTTPS",
              "SquidGuard: URL category filtering with blacklists",
              "LightSquid: per-client web traffic reporting dashboard"
            ],
            "title": "Configurations Deployed"
          },
          {
            "type": "bullets",
            "items": [
              "pfSense 2.6.0 — Firewall, NAT, routing (FreeBSD-based)",
              "Squid — Transparent proxy with SSL inspection (port 3128)",
              "SquidGuard — URL category filtering (blacklists)",
              "LightSquid — Per-user web usage reporting dashboard",
              "VMware Workstation Pro 17 — Type 2 hypervisor",
              "PKI / pfSense CA Manager — Internal certificate authority for HTTPS inspection"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "pfSense installation",
                "description": "FreeBSD 12 64-bit VM created in VMware (10 GB, 2 GB RAM), 2 NICs: Bridged (4G WAN) + VMnet8 (LAN). pfSense 2.6.0 ISO installed. Console confirms WAN em0 (192.168.1.110) and LAN em1 (192.168.100.220)."
              },
              {
                "label": "Aliases & firewall rules",
                "description": "SRV (servers) and Client (workstations) IP aliases created. LAN rules: DNS + ICMP allowed from SRV, then REFUS SRV VERS INTERNET placed above allow-all — servers blocked except DNS/ICMP."
              },
              {
                "label": "Squid proxy & SquidGuard",
                "description": "3 packages installed: squid, squidGuard, LightSquid. Squid configured as transparent proxy port 3128 with SSL bump. SquidGuard set up with URL category blacklists. LightSquid enabled for traffic reports."
              },
              {
                "label": "Certificate authority",
                "description": "Pfsense-CA generated (RSA 2048, SHA-256, 10 years, C=FR). Used by Squid to re-sign intercepted HTTPS connections — must be imported as a trusted CA on all client machines."
              }
            ],
            "title": "Setup Phases"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "All LAN traffic routed via 4G WAN",
                "label": "Gateway",
                "value": "pfSense operational"
              },
              {
                "note": "DNS + ICMP exceptions only",
                "label": "Access control",
                "value": "Servers internet-isolated"
              },
              {
                "note": "URL categories blocked",
                "label": "Web filtering",
                "value": "Squid + SquidGuard active"
              },
              {
                "note": "Internal CA for encrypted traffic",
                "label": "HTTPS inspection",
                "value": "SSL bump deployed"
              },
              {
                "note": "Per-client web stats available",
                "label": "Reporting",
                "value": "LightSquid active"
              },
              {
                "note": "Complete personal lab",
                "label": "Skills",
                "value": "pfSense, firewall, proxy, PKI"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Sécuriser les accès à Internet avec pfSense & Squid",
        "heroSubtitle": "pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17",
        "sections": [
          {
            "body": "En prolongement du lab virtualisé (AD DS / DNS / DHCP / WDS sur Windows Server 2022), j ai ajouté une VM pfSense 2.6.0 pour jouer le rôle de passerelle réseau. Objectif : sécuriser les accès Internet sortants de toutes les machines du LAN privé (192.168.100.0/24), filtrer le trafic web via un proxy transparent Squid et appliquer des politiques d accès — reproduisant la sécurité périmétrique d une infrastructure d entreprise réelle.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Hyperviseur : VMware Workstation Pro 17",
              "VM pfSense 2.6.0 : FreeBSD 12 64-bit, 10 Go HDD, 2 Go RAM — passerelle LAN/WAN",
              "WAN (em0) : Bridge sur clé 4G USB de l hôte — DHCP — 192.168.1.110/24",
              "LAN (em1) : VMnet8 (NAT) — 192.168.100.220/24 (passerelle pfSense)",
              "DCAD22 : 192.168.100.250 — AD DS, DNS, DHCP, WDS",
              "SRVSAMBA : 192.168.100.130 — Partages Samba | Clients : 192.168.100.21/22"
            ],
            "title": "Architecture du lab"
          },
          {
            "type": "bullets",
            "items": [
              "Alias IP : groupe SRV (serveurs) et groupe Client (postes) pour règles ciblées",
              "Règles LAN : DNS (UDP 53) et ICMP autorisés depuis SRV — règle REFUS SRV VERS INTERNET au-dessus du allow-all",
              "Proxy Squid transparent sur l interface LAN (port 3128) avec inspection SSL activée",
              "CA interne Pfsense-CA (RSA 2048, SHA-256, 10 ans) pour SSL bump sur HTTPS sortant",
              "SquidGuard : filtrage par catégories d URL avec listes noires",
              "LightSquid : tableau de bord de reporting du trafic web par client"
            ],
            "title": "Configurations déployées"
          },
          {
            "type": "bullets",
            "items": [
              "pfSense 2.6.0 — Firewall, NAT, routage (basé FreeBSD)",
              "Squid — Proxy transparent avec inspection SSL (port 3128)",
              "SquidGuard — Filtrage par catégories d URL (listes noires)",
              "LightSquid — Tableau de bord de reporting web par utilisateur",
              "VMware Workstation Pro 17 — Hyperviseur de type 2",
              "PKI / CA Manager pfSense — Autorité de certification interne pour HTTPS"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Installation pfSense",
                "description": "VM FreeBSD 12 64-bit créée dans VMware (10 Go, 2 Go RAM), 2 NICs : Bridged (WAN 4G) + VMnet8 (LAN). ISO pfSense 2.6.0 installé. Console confirme WAN em0 (192.168.1.110) et LAN em1 (192.168.100.220)."
              },
              {
                "label": "Alias & règles pare-feu",
                "description": "Alias SRV (serveurs) et Client (postes) créés. Règles LAN : DNS + ICMP autorisés depuis SRV, puis REFUS SRV VERS INTERNET placé avant le allow-all — serveurs bloqués sauf DNS/ICMP."
              },
              {
                "label": "Proxy Squid & SquidGuard",
                "description": "3 paquets installés : squid, squidGuard, LightSquid. Squid configuré en proxy transparent port 3128 avec SSL bump. SquidGuard paramétré avec listes noires URL par catégorie. LightSquid activé pour les rapports."
              },
              {
                "label": "Autorité de certification",
                "description": "CA Pfsense-CA générée (RSA 2048, SHA-256, 10 ans, C=FR). Utilisée par Squid pour re-signer les connexions HTTPS interceptées — doit être importée comme CA de confiance sur les postes clients."
              }
            ],
            "title": "Phases de mise en place"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Tout le trafic LAN routé via la 4G WAN",
                "label": "Passerelle",
                "value": "pfSense opérationnel"
              },
              {
                "note": "Exceptions DNS + ICMP uniquement",
                "label": "Contrôle d accès",
                "value": "Serveurs isolés d Internet"
              },
              {
                "note": "Catégories URL bloquées",
                "label": "Filtrage web",
                "value": "Squid + SquidGuard actifs"
              },
              {
                "note": "CA interne pour trafic chiffré",
                "label": "Inspection HTTPS",
                "value": "SSL bump déployé"
              },
              {
                "note": "Stats web par client accessibles",
                "label": "Reporting",
                "value": "LightSquid actif"
              },
              {
                "note": "Lab personnel complet",
                "label": "Compétences",
                "value": "pfSense, pare-feu, proxy, PKI"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "pfSense firewall + Squid transparent proxy",
        "heroSubtitle": "pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17",
        "sections": [
          {
            "body": "En continuidad con el laboratorio virtualizado (AD DS / DNS / DHCP / WDS en Windows Server 2022), añadí una VM pfSense 2.6.0 como firewall para actuar de pasarela de red. Objetivo: asegurar el acceso saliente a Internet de todas las máquinas de la LAN privada (192.168.100.0/24), filtrar el tráfico web mediante un proxy transparente Squid y aplicar políticas de acceso — reproduciendo la seguridad perimetral de una infraestructura empresarial real.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "Hipervisor: VMware Workstation Pro 17",
              "VM pfSense 2.6.0: FreeBSD 12 de 64 bits, 10 GB de disco, 2 GB de RAM — pasarela LAN/WAN",
              "WAN (em0): en modo puente sobre el módem 4G del host — DHCP — 192.168.1.110/24",
              "LAN (em1): VMnet8 (NAT) — 192.168.100.220/24 (pasarela pfSense)",
              "DCAD22: 192.168.100.250 — AD DS, DNS, DHCP, WDS",
              "SRVSAMBA: 192.168.100.130 — recursos compartidos Samba | Clientes: 192.168.100.21/22"
            ],
            "title": "Arquitectura del laboratorio"
          },
          {
            "type": "bullets",
            "items": [
              "Alias IP: grupo SRV (servidores) y grupo Client (puestos) para reglas específicas",
              "Reglas LAN: DNS (UDP 53) e ICMP permitidos desde SRV — regla REFUS SRV VERS INTERNET colocada por encima del allow-all",
              "Proxy transparente Squid en la interfaz LAN (puerto 3128) con inspección SSL activada",
              "CA interna Pfsense-CA (RSA 2048, SHA-256, 10 años) para SSL bump en el tráfico HTTPS saliente",
              "SquidGuard: filtrado por categorías de URL con listas negras",
              "LightSquid: panel de informes de tráfico web por cliente"
            ],
            "title": "Configuraciones desplegadas"
          },
          {
            "type": "bullets",
            "items": [
              "pfSense 2.6.0 — Firewall, NAT, enrutamiento (basado en FreeBSD)",
              "Squid — Proxy transparente con inspección SSL (puerto 3128)",
              "SquidGuard — Filtrado por categorías de URL (listas negras)",
              "LightSquid — Panel de informes de uso web por usuario",
              "VMware Workstation Pro 17 — Hipervisor de tipo 2",
              "PKI / pfSense CA Manager — Autoridad de certificación interna para inspección HTTPS"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Instalación de pfSense",
                "description": "VM FreeBSD 12 de 64 bits creada en VMware (10 GB, 2 GB RAM), 2 tarjetas de red: en puente (WAN 4G) + VMnet8 (LAN). ISO de pfSense 2.6.0 instalada. La consola confirma WAN em0 (192.168.1.110) y LAN em1 (192.168.100.220)."
              },
              {
                "label": "Alias y reglas de firewall",
                "description": "Alias SRV (servidores) y Client (puestos) creados. Reglas LAN: DNS + ICMP permitidos desde SRV, luego REFUS SRV VERS INTERNET colocada antes del allow-all — servidores bloqueados salvo DNS/ICMP."
              },
              {
                "label": "Proxy Squid y SquidGuard",
                "description": "3 paquetes instalados: squid, squidGuard, LightSquid. Squid configurado como proxy transparente en el puerto 3128 con SSL bump. SquidGuard configurado con listas negras de URL por categoría. LightSquid activado para los informes de tráfico."
              },
              {
                "label": "Autoridad de certificación",
                "description": "CA Pfsense-CA generada (RSA 2048, SHA-256, 10 años, C=FR). Utilizada por Squid para volver a firmar las conexiones HTTPS interceptadas — debe importarse como CA de confianza en todos los equipos cliente."
              }
            ],
            "title": "Fases de configuración"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Todo el tráfico LAN enrutado vía WAN 4G",
                "label": "Pasarela",
                "value": "pfSense operativo"
              },
              {
                "note": "Solo excepciones DNS + ICMP",
                "label": "Control de acceso",
                "value": "Servidores aislados de Internet"
              },
              {
                "note": "Categorías de URL bloqueadas",
                "label": "Filtrado web",
                "value": "Squid + SquidGuard activos"
              },
              {
                "note": "CA interna para tráfico cifrado",
                "label": "Inspección HTTPS",
                "value": "SSL bump desplegado"
              },
              {
                "note": "Estadísticas web por cliente disponibles",
                "label": "Informes",
                "value": "LightSquid activo"
              },
              {
                "note": "Laboratorio personal completo",
                "label": "Competencias",
                "value": "pfSense, firewall, proxy, PKI"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "nextjs-admin-dashboard",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/nextjs-admin-dashboard/cover.svg"
      }
    ],
    "locales": {
      "en": {
        "title": "Admin Dashboard — Next.js 16 + Supabase",
        "heroSubtitle": "A secure /admin route built with HTTP Basic Auth, Supabase service_role, and zero extra dependencies.",
        "sections": [
          {
            "type": "text",
            "title": "Why I built this",
            "paragraphs": [
              "Every data-driven portfolio eventually needs a way to monitor its own data without opening the Supabase dashboard every time. I wanted to see my contact messages, project counts, and certification state at a glance — but building a full auth system felt like massive overkill for a personal tool.",
              "The challenge: how do you protect an internal route in Next.js 16 with zero new dependencies, while still being able to read tables that are locked behind Row Level Security for anonymous users?"
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Next.js 16 replaces middleware.ts with proxy.ts — the same file handles i18n routing for next-intl. Admin auth had to be injected without breaking locale prefixes.",
              "Edge runtime has no Buffer: the standard Node.js approach (Buffer.from(b64, 'base64').toString()) fails silently. I had to use atob() instead.",
              "The messages table is SELECT-blocked for the anon role by RLS policy. Reading it requires a service_role client — which must never leave the server.",
              "The admin layout must NOT include <html>/<body> — the root app/layout.tsx already provides those. Duplicating them triggers a React hydration mismatch.",
              "The /admin path must be excluded from next-intl's locale-prefixing logic, otherwise the proxy tries to redirect /admin to /en/admin."
            ],
            "title": "Technical constraints I had to solve"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Step 1 — Admin Supabase client",
                "description": "Created lib/supabase/admin.ts using the SUPABASE_SERVICE_ROLE_KEY env var (no NEXT_PUBLIC_ prefix — server only). This client bypasses all RLS policies and can SELECT from the messages table that the public anon client cannot access."
              },
              {
                "title": "Step 2 — HTTP Basic Auth in proxy.ts",
                "description": "Added an adminAuth() guard at the top of the proxy() function. If the pathname starts with /admin, it checks the Authorization header before passing to the next-intl handler. Used atob() for Edge-compatible base64 decoding. ADMIN_USERNAME and ADMIN_PASSWORD are set in .env.local (server-only)."
              },
              {
                "title": "Step 3 — Isolated admin layout",
                "description": "Created app/admin/layout.tsx returning a <div> wrapper (not <html>/<body>) with a dark Slate theme, a minimal header, and robots: index: false metadata. The layout sits entirely outside the [locale] routing tree."
              },
              {
                "title": "Step 4 — Dashboard Server Component",
                "description": "app/admin/page.tsx fetches all four tables in parallel using Promise.all(). Stat cards, a full project table (status / track / featured / date), the 20 most recent contact messages with clickable mailto links, a certifications table, and testimonial counters. Zero client JavaScript."
              }
            ],
            "title": "How I built it"
          },
          {
            "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin not configured.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — no Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ authorized\n        }\n      }\n    } catch {\n      // malformed base64 — reject\n    }\n  }\n\n  return new NextResponse(\"Authentication required.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": 'Basic realm=\"Admin\", charset=\"UTF-8\"' },\n  });\n}",
            "type": "code",
            "title": "Core: Edge-compatible Basic Auth (proxy.ts)",
            "language": "typescript"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "HTTP Basic Auth via proxy.ts + env vars only",
                "label": "New npm packages added",
                "value": "0"
              },
              {
                "note": "projects · certifications · messages · testimonials",
                "label": "Tables monitored",
                "value": "4"
              },
              {
                "note": "100% Server Components — no hydration overhead",
                "label": "Client JavaScript",
                "value": "0 KB"
              },
              {
                "note": "In proxy.ts — no login page, no session, no JWT",
                "label": "Lines of auth code",
                "value": "~25"
              }
            ],
            "title": "What this project demonstrates"
          },
          {
            "type": "bullets",
            "items": [
              "Edge runtime is more restrictive than Node.js: always check which APIs are available (Buffer, crypto, fs…) before reaching for them.",
              "next-intl and custom proxy logic can coexist cleanly if you guard the admin path before calling the intl handler.",
              "Server Components are the right default for internal dashboards — no state, no effects, no bundles sent to the browser.",
              "RLS is your safety net, not a replacement for server-side secrets: even with service_role, the key never leaves the server."
            ],
            "title": "Key learnings"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://github.com/Aiyeesha/portfolio-next",
                "label": "GitHub repository"
              },
              {
                "href": "https://nextjs.org/docs/messages/middleware-to-proxy",
                "label": "Next.js 16 — proxy.ts migration guide"
              },
              {
                "href": "https://supabase.com/docs/guides/auth/row-level-security",
                "label": "Supabase — Row Level Security"
              }
            ],
            "title": "Source & references"
          }
        ]
      },
      "fr": {
        "title": "Admin Dashboard — Next.js 16 + Supabase",
        "heroSubtitle": "Une route /admin sécurisée par HTTP Basic Auth, client Supabase service_role, et zéro dépendance supplémentaire.",
        "sections": [
          {
            "type": "text",
            "title": "Pourquoi j'ai construit ça",
            "paragraphs": [
              "Tout portfolio data-driven a besoin, à un moment, d'un moyen de surveiller ses propres données sans ouvrir le dashboard Supabase à chaque fois. Je voulais voir mes messages de contact, le nombre de projets et l'état de mes certifications en un coup d'œil — mais construire un système d'authentification complet m'a semblé totalement surdimensionné pour un outil personnel.",
              "Le défi : comment protéger une route interne dans Next.js 16 sans aucune nouvelle dépendance, tout en pouvant lire des tables verrouillées par Row Level Security pour les utilisateurs anonymes ?"
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Next.js 16 remplace middleware.ts par proxy.ts — le même fichier gère le routing i18n pour next-intl. L'auth admin devait être injectée sans casser les préfixes de locale.",
              "L'Edge runtime n'a pas Buffer : l'approche Node.js classique (Buffer.from(b64, 'base64').toString()) échoue silencieusement. J'ai dû utiliser atob() à la place.",
              "La table messages est bloquée en SELECT pour le rôle anon par la politique RLS. La lire nécessite un client service_role — qui ne doit jamais quitter le serveur.",
              "Le layout admin ne doit PAS inclure <html>/<body> — app/layout.tsx les fournit déjà. Les dupliquer provoque une erreur de hydration React.",
              "Le chemin /admin doit être exclu de la logique de préfixage de locale de next-intl, sinon le proxy tente de rediriger /admin vers /en/admin."
            ],
            "title": "Contraintes techniques à résoudre"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Étape 1 — Client Supabase admin",
                "description": "Création de lib/supabase/admin.ts utilisant la clé SUPABASE_SERVICE_ROLE_KEY (sans préfixe NEXT_PUBLIC_ — côté serveur uniquement). Ce client contourne toutes les politiques RLS et peut faire des SELECT sur la table messages que le client anon public ne peut pas lire."
              },
              {
                "title": "Étape 2 — HTTP Basic Auth dans proxy.ts",
                "description": "Ajout d'une garde adminAuth() en début de la fonction proxy(). Si le pathname commence par /admin, le header Authorization est vérifié avant de passer au gestionnaire next-intl. Utilisation d'atob() pour un décodage base64 compatible Edge. ADMIN_USERNAME et ADMIN_PASSWORD sont définis dans .env.local (côté serveur uniquement)."
              },
              {
                "title": "Étape 3 — Layout admin isolé",
                "description": "Création de app/admin/layout.tsx retournant un wrapper <div> (pas <html>/<body>) avec un thème Slate sombre, un header minimal, et les métadonnées robots: index: false. Le layout est entièrement hors de l'arbre de routing [locale]."
              },
              {
                "title": "Étape 4 — Dashboard Server Component",
                "description": "app/admin/page.tsx récupère les quatre tables en parallèle via Promise.all(). Stat cards, table complète des projets (status / track / featured / date), 20 derniers messages de contact avec liens mailto cliquables, table des certifications et compteurs de témoignages. Zéro JavaScript client."
              }
            ],
            "title": "Comment je l'ai construit"
          },
          {
            "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin non configuré.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — sans Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ autorisé\n        }\n      }\n    } catch {\n      // base64 malformé — rejeter\n    }\n  }\n\n  return new NextResponse(\"Authentification requise.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": 'Basic realm=\"Admin\", charset=\"UTF-8\"' },\n  });\n}",
            "type": "code",
            "title": "Noyau : HTTP Basic Auth compatible Edge (proxy.ts)",
            "language": "typescript"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "HTTP Basic Auth via proxy.ts + variables d'env uniquement",
                "label": "Packages npm ajoutés",
                "value": "0"
              },
              {
                "note": "projets · certifications · messages · témoignages",
                "label": "Tables surveillées",
                "value": "4"
              },
              {
                "note": "100% Server Components — aucun overhead d'hydration",
                "label": "JavaScript client",
                "value": "0 Ko"
              },
              {
                "note": "Dans proxy.ts — pas de page de connexion, pas de session, pas de JWT",
                "label": "Lignes de code d'auth",
                "value": "~25"
              }
            ],
            "title": "Ce que ce projet démontre"
          },
          {
            "type": "bullets",
            "items": [
              "L'Edge runtime est plus restrictif que Node.js : toujours vérifier quelles API sont disponibles (Buffer, crypto, fs…) avant de les utiliser.",
              "next-intl et une logique de proxy personnalisée peuvent coexister proprement si on garde le chemin admin avant d'appeler le gestionnaire intl.",
              "Les Server Components sont le bon défaut pour les dashboards internes — pas d'état, pas d'effets, pas de bundles envoyés au navigateur.",
              "RLS est votre filet de sécurité, pas un substitut aux secrets côté serveur : même avec service_role, la clé ne quitte jamais le serveur."
            ],
            "title": "Apprentissages clés"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://github.com/Aiyeesha/portfolio-next",
                "label": "Dépôt GitHub"
              },
              {
                "href": "https://nextjs.org/docs/messages/middleware-to-proxy",
                "label": "Next.js 16 — guide de migration proxy.ts"
              },
              {
                "href": "https://supabase.com/docs/guides/auth/row-level-security",
                "label": "Supabase — Row Level Security"
              }
            ],
            "title": "Source & références"
          }
        ]
      },
      "es": {
        "title": "Admin Dashboard — Next.js 16 + Supabase",
        "heroSubtitle": "Una ruta /admin segura construida con HTTP Basic Auth, Supabase service_role, y cero dependencias adicionales.",
        "sections": [
          {
            "type": "text",
            "title": "Por qué lo construí",
            "paragraphs": [
              "Todo portfolio basado en datos acaba necesitando una forma de supervisar sus propios datos sin abrir el dashboard de Supabase cada vez. Quería ver mis mensajes de contacto, el número de proyectos y el estado de las certificaciones de un vistazo — pero construir un sistema de autenticación completo parecía una sobreingeniería enorme para una herramienta personal.",
              "El reto: ¿cómo proteger una ruta interna en Next.js 16 sin añadir ninguna dependencia nueva, manteniendo la capacidad de leer tablas bloqueadas por Row Level Security para usuarios anónimos?"
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Next.js 16 sustituye middleware.ts por proxy.ts — el mismo archivo gestiona el enrutamiento i18n de next-intl. La autenticación admin debía inyectarse sin romper los prefijos de idioma.",
              "El entorno Edge no tiene Buffer: el enfoque estándar de Node.js (Buffer.from(b64, 'base64').toString()) falla silenciosamente. Tuve que usar atob() en su lugar.",
              "La tabla messages está bloqueada para SELECT por política RLS en el rol anon. Leerla requiere un cliente service_role — que nunca debe salir del servidor.",
              "El layout admin NO debe incluir <html>/<body> — el app/layout.tsx raíz ya los proporciona. Duplicarlos provoca un desajuste de hidratación en React.",
              "La ruta /admin debe excluirse de la lógica de prefijado de idioma de next-intl, o el proxy intentará redirigir /admin a /en/admin."
            ],
            "title": "Restricciones técnicas que tuve que resolver"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Paso 1 — Cliente Supabase admin",
                "description": "Creé lib/supabase/admin.ts usando la variable de entorno SUPABASE_SERVICE_ROLE_KEY (sin prefijo NEXT_PUBLIC_ — solo servidor). Este cliente omite todas las políticas RLS y puede hacer SELECT sobre la tabla messages a la que el cliente anon público no tiene acceso."
              },
              {
                "title": "Paso 2 — HTTP Basic Auth en proxy.ts",
                "description": "Añadí un guard adminAuth() al principio de la función proxy(). Si la ruta empieza por /admin, comprueba la cabecera Authorization antes de pasar al handler de next-intl. Usé atob() para una decodificación base64 compatible con Edge. ADMIN_USERNAME y ADMIN_PASSWORD se definen en .env.local (solo servidor)."
              },
              {
                "title": "Paso 3 — Layout admin aislado",
                "description": "Creé app/admin/layout.tsx devolviendo un <div> envolvente (no <html>/<body>) con un tema oscuro Slate, una cabecera mínima, y metadata robots: index: false. El layout está completamente fuera del árbol de enrutamiento [locale]."
              },
              {
                "title": "Paso 4 — Server Component del dashboard",
                "description": "app/admin/page.tsx obtiene las cuatro tablas en paralelo con Promise.all(). Tarjetas de estadísticas, una tabla completa de proyectos (estado / área / destacado / fecha), los 20 mensajes de contacto más recientes con enlaces mailto, una tabla de certificaciones, y contadores de testimonios. Cero JavaScript de cliente."
              }
            ],
            "title": "Cómo lo construí"
          },
          {
            "code": "function adminAuth(request: NextRequest): NextResponse | null {\n  const expectedUser = process.env.ADMIN_USERNAME;\n  const expectedPass = process.env.ADMIN_PASSWORD;\n\n  if (!expectedUser || !expectedPass) {\n    return new NextResponse(\"Admin not configured.\", { status: 503 });\n  }\n\n  const authHeader = request.headers.get(\"authorization\");\n  if (authHeader?.startsWith(\"Basic \")) {\n    try {\n      const decoded = atob(authHeader.slice(6)); // Edge-safe — no Buffer\n      const colonIdx = decoded.indexOf(\":\");\n      if (colonIdx !== -1) {\n        const user = decoded.slice(0, colonIdx);\n        const pass = decoded.slice(colonIdx + 1);\n        if (user === expectedUser && pass === expectedPass) {\n          return null; // ✅ authorized\n        }\n      }\n    } catch {\n      // malformed base64 — reject\n    }\n  }\n\n  return new NextResponse(\"Authentication required.\", {\n    status: 401,\n    headers: { \"WWW-Authenticate\": 'Basic realm=\"Admin\", charset=\"UTF-8\"' },\n  });\n}",
            "type": "code",
            "title": "Núcleo: Basic Auth compatible con Edge (proxy.ts)",
            "language": "typescript"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "HTTP Basic Auth vía proxy.ts + variables de entorno únicamente",
                "label": "Paquetes npm nuevos añadidos",
                "value": "0"
              },
              {
                "note": "projects · certifications · messages · testimonials",
                "label": "Tablas monitorizadas",
                "value": "4"
              },
              {
                "note": "100% Server Components — sin sobrecarga de hidratación",
                "label": "JavaScript de cliente",
                "value": "0 KB"
              },
              {
                "note": "En proxy.ts — sin página de login, sin sesión, sin JWT",
                "label": "Líneas de código de autenticación",
                "value": "~25"
              }
            ],
            "title": "Qué demuestra este proyecto"
          },
          {
            "type": "bullets",
            "items": [
              "El entorno Edge es más restrictivo que Node.js: siempre hay que comprobar qué APIs están disponibles (Buffer, crypto, fs…) antes de usarlas.",
              "next-intl y una lógica de proxy personalizada pueden convivir sin problemas si proteges la ruta admin antes de llamar al handler de intl.",
              "Los Server Components son la opción correcta por defecto para dashboards internos — sin estado, sin efectos, sin bundles enviados al navegador.",
              "RLS es una red de seguridad, no un sustituto de los secretos del lado servidor: incluso con service_role, la clave nunca sale del servidor."
            ],
            "title": "Aprendizajes clave"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://github.com/Aiyeesha/portfolio-next",
                "label": "Repositorio GitHub"
              },
              {
                "href": "https://nextjs.org/docs/messages/middleware-to-proxy",
                "label": "Next.js 16 — Guía de migración a proxy.ts"
              },
              {
                "href": "https://supabase.com/docs/guides/auth/row-level-security",
                "label": "Supabase — Row Level Security"
              }
            ],
            "title": "Código fuente y referencias"
          }
        ]
      }
    }
  },
  {
    "slug": "incident-management-dashboard",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Incident Management Dashboard — Next.js, Supabase & TypeScript",
        "sections": []
      },
      "fr": {
        "title": "Dashboard de gestion d'incidents — Next.js, Supabase & TypeScript",
        "sections": []
      }
    }
  },
  {
    "slug": "it-ops-wifi-config",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-wifi-config/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-wifi-config/screenshot-1.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Wi-Fi Access Point Configuration (TP-Link)",
        "heroSubtitle": "TP-Link Access Point · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
        "sections": [
          {
            "body": "As part of the TAI training at Greta du Val d Oise (Lycée Louis Jouvet, Taverny), I was tasked with configuring a TP-Link Wi-Fi access point from scratch, working independently. The exercise simulates a real-world IT technician task: deploying wireless connectivity for an office or training room, from physical cabling to full network validation.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Physically connect the TP-Link access point to the lab network switch (RJ45)",
              "Access the AP web administration interface (http://192.168.0.1)",
              "Configure WAN addressing (DHCP or static IP depending on topology)",
              "Enable the integrated DHCP server for Wi-Fi clients",
              "Configure the wireless network: SSID, band, channel and WPA2-PSK security",
              "Validate Wi-Fi connectivity from a test device (DHCP + internet access)"
            ],
            "title": "Scope & Objectives"
          },
          {
            "type": "bullets",
            "items": [
              "TP-Link AP connected to switch and powered on — link LEDs confirmed",
              "Admin interface accessed via http://192.168.0.1 with manufacturer default credentials",
              "WAN set to DHCP — valid IP obtained from upstream router",
              "Integrated DHCP server enabled for automatic address distribution to Wi-Fi clients",
              "SSID configured, 2.4 GHz band, WPA2-PSK encryption with strong passphrase",
              "Test device connected with DHCP IP obtained, ping 8.8.8.8 successful, internet access confirmed"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "TP-Link Access Point — Wi-Fi AP provided by the training lab",
              "TP-Link web admin interface — browser-based configuration (192.168.0.1)",
              "WPA2-PSK — Wi-Fi security protocol with passphrase",
              "Integrated DHCP — automatic IP address distribution to wireless clients",
              "RJ45 / LAN Switch — wired infrastructure for AP uplink",
              "Ping / network test — internet connectivity validation"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Physical connection",
                "description": "TP-Link AP connected to the lab switch via RJ45. Powered on and link LEDs checked to confirm network connection established."
              },
              {
                "label": "Admin interface access",
                "description": "Browser → http://192.168.0.1. Default manufacturer credentials entered (printed on device label). Access to TP-Link configuration panel."
              },
              {
                "label": "WAN addressing",
                "description": "WAN settings → DHCP mode selected to automatically obtain an IP from the upstream router. Valid WAN address verified."
              },
              {
                "label": "LAN & DHCP",
                "description": "AP local IP confirmed. Integrated DHCP server enabled for automatic address distribution to Wi-Fi clients."
              },
              {
                "label": "Wireless network",
                "description": "SSID configured, 2.4 GHz band, channel and transmission mode selected. Security: WPA2-PSK with strong passphrase."
              },
              {
                "label": "Verification",
                "description": "Test device connected to SSID. DHCP IP obtained, ping 8.8.8.8 successful, internet access confirmed, AP visible in admin dashboard."
              }
            ],
            "title": "Configuration Procedure"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "DHCP + internet access validated",
                "label": "Connectivity",
                "value": "Wi-Fi network operational"
              },
              {
                "note": "Custom SSID and passphrase",
                "label": "Security",
                "value": "WPA2-PSK"
              },
              {
                "note": "Addresses distributed to clients",
                "label": "DHCP",
                "value": "Active on AP"
              },
              {
                "note": "Full configuration without assistance",
                "label": "Mode",
                "value": "Autonomous"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Configuration d'un point d'accès Wi-Fi (TP-Link)",
        "heroSubtitle": "Point d'accès TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
        "sections": [
          {
            "body": "Dans le cadre de la formation TAI au Greta du Val d Oise (Lycée Louis Jouvet, Taverny), j ai été chargée de configurer un point d accès Wi-Fi TP-Link de A à Z en autonomie. L exercice simule une mission réelle de technicien IT : déployer la connectivité sans fil pour un bureau ou une salle de formation, du raccordement physique à la validation réseau complète.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Raccorder physiquement le point d accès TP-Link au switch réseau du labo (RJ45)",
              "Accéder à l interface d administration web du PA (http://192.168.0.1)",
              "Configurer l adressage WAN (DHCP ou IP statique selon la topologie)",
              "Activer le serveur DHCP intégré pour les clients Wi-Fi",
              "Configurer le réseau sans fil : SSID, bande, canal et sécurité WPA2-PSK",
              "Valider la connectivité Wi-Fi depuis un appareil test (DHCP + accès Internet)"
            ],
            "title": "Périmètre & Objectifs"
          },
          {
            "type": "bullets",
            "items": [
              "Point d accès TP-Link raccordé au switch et alimenté — LEDs de lien confirmées",
              "Interface d administration accessible via http://192.168.0.1 avec identifiants constructeur",
              "Adressage WAN configuré en DHCP — IP valide obtenue depuis le routeur amont",
              "Serveur DHCP intégré activé pour distribution automatique d adresses aux clients",
              "SSID configuré, bande 2,4 GHz, chiffrement WPA2-PSK avec phrase de passe robuste",
              "Appareil test connecté avec IP DHCP obtenue, ping 8.8.8.8 validé, accès Internet confirmé"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "TP-Link Access Point — point d accès Wi-Fi du labo de formation",
              "Interface d administration web TP-Link — configuration via navigateur (192.168.0.1)",
              "WPA2-PSK — protocole de sécurité Wi-Fi avec phrase de passe",
              "DHCP intégré — attribution automatique d adresses IP aux clients",
              "RJ45 / Switch LAN — infrastructure filaire de connexion du PA",
              "Ping / test réseau — validation de la connectivité Internet"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Connexion physique",
                "description": "PA TP-Link raccordé au switch labo via câble RJ45. Mise sous tension et vérification des LEDs indiquant l établissement du lien réseau."
              },
              {
                "label": "Accès à l interface admin",
                "description": "Navigateur → http://192.168.0.1. Saisie des identifiants constructeur (étiquette de l appareil). Accès au panneau de configuration TP-Link."
              },
              {
                "label": "Adressage WAN",
                "description": "Paramètres WAN → mode DHCP sélectionné pour obtenir automatiquement une IP du routeur amont. Adresse WAN valide vérifiée."
              },
              {
                "label": "LAN & DHCP",
                "description": "IP locale du PA confirmée. Serveur DHCP intégré activé pour attribution automatique aux clients Wi-Fi."
              },
              {
                "label": "Réseau sans fil",
                "description": "SSID configuré, bande 2,4 GHz, canal et mode de transmission sélectionnés. Sécurité : WPA2-PSK avec phrase de passe robuste."
              },
              {
                "label": "Vérification",
                "description": "Connexion appareil test au SSID. IP DHCP obtenue, ping 8.8.8.8 réussi, accès Internet confirmé, PA visible dans le tableau de bord admin."
              }
            ],
            "title": "Procédure de configuration"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "DHCP + accès Internet validés",
                "label": "Connectivité",
                "value": "Réseau Wi-Fi opérationnel"
              },
              {
                "note": "SSID et phrase de passe personnalisés",
                "label": "Sécurité",
                "value": "WPA2-PSK"
              },
              {
                "note": "Adresses distribuées aux clients",
                "label": "DHCP",
                "value": "Actif sur PA"
              },
              {
                "note": "Configuration complète sans assistance",
                "label": "Mode",
                "value": "Autonome"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Wi-Fi access point configuration (TP-Link)",
        "heroSubtitle": "Punto de acceso TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En el marco de la formación TAI en el Greta du Val d Oise (Lycée Louis Jouvet, Taverny), se me encargó configurar un punto de acceso Wi-Fi TP-Link de principio a fin de forma autónoma. El ejercicio simula una misión real de técnico IT: desplegar la conectividad inalámbrica para una oficina o una sala de formación, desde la conexión física hasta la validación completa de la red."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Conectar físicamente el punto de acceso TP-Link al switch de red del laboratorio (RJ45)",
              "Acceder a la interfaz de administración web del PA (http://192.168.0.1)",
              "Configurar el direccionamiento WAN (DHCP o IP estática según la topología)",
              "Activar el servidor DHCP integrado para los clientes Wi-Fi",
              "Configurar la red inalámbrica: SSID, banda, canal y seguridad WPA2-PSK",
              "Validar la conectividad Wi-Fi desde un dispositivo de prueba (DHCP + acceso a Internet)"
            ],
            "title": "Alcance y objetivos"
          },
          {
            "type": "bullets",
            "items": [
              "Punto de acceso TP-Link conectado al switch y alimentado — LED de enlace confirmados",
              "Interfaz de administración accesible vía http://192.168.0.1 con credenciales del fabricante",
              "Direccionamiento WAN configurado en DHCP — IP válida obtenida del router upstream",
              "Servidor DHCP integrado activado para distribución automática de direcciones a los clientes",
              "SSID configurado, banda 2,4 GHz, cifrado WPA2-PSK con frase de contraseña robusta",
              "Dispositivo de prueba conectado con IP DHCP obtenida, ping a 8.8.8.8 validado, acceso a Internet confirmado"
            ],
            "title": "Solución y entregables"
          },
          {
            "type": "bullets",
            "items": [
              "Punto de acceso TP-Link — punto de acceso Wi-Fi del laboratorio de formación",
              "Interfaz de administración web TP-Link — configuración vía navegador (192.168.0.1)",
              "WPA2-PSK — protocolo de seguridad Wi-Fi con frase de contraseña",
              "DHCP integrado — asignación automática de direcciones IP a los clientes",
              "RJ45 / Switch LAN — infraestructura cableada de conexión del PA",
              "Ping / prueba de red — validación de la conectividad a Internet"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Conexión física",
                "description": "PA TP-Link conectado al switch del laboratorio mediante cable RJ45. Encendido y verificación de los LED que indican el establecimiento del enlace de red."
              },
              {
                "label": "Acceso a la interfaz de administración",
                "description": "Navegador → http://192.168.0.1. Introducción de las credenciales del fabricante (etiqueta del dispositivo). Acceso al panel de configuración de TP-Link."
              },
              {
                "label": "Direccionamiento WAN",
                "description": "Configuración WAN → modo DHCP seleccionado para obtener automáticamente una IP del router upstream. Dirección WAN válida verificada."
              },
              {
                "label": "LAN y DHCP",
                "description": "IP local del PA confirmada. Servidor DHCP integrado activado para la asignación automática a los clientes Wi-Fi."
              },
              {
                "label": "Red inalámbrica",
                "description": "SSID configurado, banda 2,4 GHz, canal y modo de transmisión seleccionados. Seguridad: WPA2-PSK con frase de contraseña robusta."
              },
              {
                "label": "Verificación",
                "description": "Conexión del dispositivo de prueba al SSID. IP DHCP obtenida, ping a 8.8.8.8 exitoso, acceso a Internet confirmado, PA visible en el panel de administración."
              }
            ],
            "title": "Procedimiento de configuración"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "DHCP + acceso a Internet validados",
                "label": "Conectividad",
                "value": "Red Wi-Fi operativa"
              },
              {
                "note": "SSID y frase de contraseña personalizados",
                "label": "Seguridad",
                "value": "WPA2-PSK"
              },
              {
                "note": "Direcciones distribuidas a los clientes",
                "label": "DHCP",
                "value": "Activo en el PA"
              },
              {
                "note": "Configuración completa sin asistencia",
                "label": "Modo",
                "value": "Autónomo"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-hardware-procurement",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-hardware-procurement/cover.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Hardware Procurement: Drafting a Multi-PC Quote",
        "heroSubtitle": "Hardware Sizing · Excel Devis · Component Research · Greta du Val d'Oise",
        "sections": [
          {
            "body": "As part of the TAI training at Greta du Val d Oise, I was given a client brief describing a workstation use case (office productivity + light virtualization) and asked to produce a complete hardware procurement quote. The exercise covered the full B2B sourcing workflow: requirements analysis, compatible component research, technical validation, and formalizing the quote in a structured Excel document — the standard deliverable in professional IT procurement.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Mid-range desktop workstation: daily office productivity + 1-2 simultaneous VMs (VirtualBox)",
              "Multi-monitor support required with local professional file storage",
              "Budget constraint: under 1,000 € ex-VAT",
              "Windows 11 Pro compatibility and Active Directory domain join required",
              "Standard ATX tower form factor for easy enterprise maintenance"
            ],
            "title": "Scope & Constraints"
          },
          {
            "type": "bullets",
            "items": [
              "Brief analyzed and hardware constraints extracted (min RAM, SSD, GPU, TPM 2.0)",
              "Components researched across French B2B catalogues (LDLC Pro, Materiel.net, Inmac Wstore)",
              "Compatibility validated: CPU/motherboard socket, DDR generation, storage interface, TDP calculation",
              "Windows 11 requirements verified: TPM 2.0, Secure Boot, compatible CPU list",
              "Structured Excel quote: reference, supplier, unit price ex-VAT, quantity, total, VAT 20%, total inc-VAT",
              "Quote validated under 1,000 € ex-VAT and submitted for instructor review"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "AMD Ryzen 5 / Intel Core i5 (12th-13th gen) — CPU selected on price/performance ratio",
              "16 GB DDR4 (2× 8 GB) — upgradeable to 32 GB for virtualization headroom",
              "512 GB M.2 NVMe SSD (OS) + 1 TB HDD (data)",
              "Windows 11 Pro OEM — licence included in the quote",
              "LDLC Pro / Materiel.net / Inmac Wstore — B2B supplier catalogues",
              "Excel — quote formalization with ex-VAT / inc-VAT calculations"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Requirements analysis",
                "description": "Read and analyzed the client brief. Extracted hardware constraints: 16 GB RAM min, SSD for OS responsiveness, iGPU or discrete GPU, TPM 2.0, ATX tower format."
              },
              {
                "label": "Component research",
                "description": "Consulted French B2B catalogues (LDLC Pro, Materiel.net, Inmac Wstore). Identified candidates per category: CPU, motherboard, RAM, storage, PSU, case."
              },
              {
                "label": "Compatibility validation",
                "description": "Cross-checked CPU/motherboard socket, DDR generation support, M.2 NVMe vs SATA interface, TDP calculation, Windows 11 requirements (TPM 2.0, Secure Boot)."
              },
              {
                "label": "Quote formalization",
                "description": "Entered all components into Excel: reference, supplier, unit price ex-VAT, quantity, total ex-VAT, VAT 20%, total inc-VAT. Grand total verified for budget compliance."
              }
            ],
            "title": "Procurement Process"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Within client budget",
                "label": "Budget",
                "value": "< 1,000 € ex-VAT"
              },
              {
                "note": "Upgradeable to 32 GB for virtualization",
                "label": "RAM",
                "value": "16 GB DDR4"
              },
              {
                "note": "Fast OS + separate data drive",
                "label": "Storage",
                "value": "512 GB NVMe + 1 TB HDD"
              },
              {
                "note": "Ex-VAT / VAT / inc-VAT — validated",
                "label": "Deliverable",
                "value": "Complete Excel quote"
              }
            ],
            "title": "Quote Summary"
          }
        ]
      },
      "fr": {
        "title": "Devis matériel : Proposition d'acquisition de postes de travail",
        "heroSubtitle": "Dimensionnement matériel · Devis Excel · Recherche composants · Greta du Val d'Oise",
        "sections": [
          {
            "body": "Dans le cadre de la formation TAI au Greta du Val d Oise, j ai reçu un cahier des charges client décrivant un cas d usage de poste de travail (bureautique + virtualisation légère) et j ai dû produire un devis matériel complet. L exercice couvrait l intégralité du processus d approvisionnement B2B : analyse des besoins, recherche de composants compatibles, validation des contraintes techniques et formalisation dans un tableau Excel structuré — livrable standard en contexte professionnel IT.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Poste de travail bureau milieu de gamme : bureautique quotidienne + 1-2 VM simultanées (VirtualBox)",
              "Support multi-moniteurs requis et stockage local de fichiers professionnels",
              "Contrainte budgétaire : moins de 1 000 € HT",
              "Compatibilité Windows 11 Pro et jonction à un domaine Active Directory existant",
              "Format ATX tour standard pour faciliter la maintenance en entreprise"
            ],
            "title": "Périmètre & Contraintes"
          },
          {
            "type": "bullets",
            "items": [
              "Analyse du cahier des charges et extraction des contraintes matérielles (RAM min, SSD, GPU, TPM 2.0)",
              "Recherche composants sur catalogues B2B français (LDLC Pro, Materiel.net, Inmac Wstore)",
              "Validation des compatibilités : socket CPU/carte mère, génération DDR, interface stockage, calcul TDP",
              "Vérification des prérequis Windows 11 : TPM 2.0, Secure Boot, liste CPU compatibles",
              "Devis Excel structuré : référence, fournisseur, prix HT, quantité, total HT, TVA 20%, total TTC",
              "Devis validé sous 1 000 € HT et présenté au formateur pour revue"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "AMD Ryzen 5 / Intel Core i5 (12e-13e gen) — CPU selon rapport qualité/prix",
              "16 Go DDR4 (2× 8 Go) — évolutif jusqu à 32 Go pour la virtualisation",
              "512 Go SSD M.2 NVMe (OS) + 1 To HDD (données)",
              "Windows 11 Pro OEM — licence incluse dans le devis",
              "LDLC Pro / Materiel.net / Inmac Wstore — catalogues fournisseurs B2B",
              "Excel — formalisation du devis avec calculs HT/TTC"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse des besoins",
                "description": "Lecture du cahier des charges, extraction des contraintes : RAM min 16 Go, SSD pour l OS, iGPU ou GPU discret, TPM 2.0, format ATX tour."
              },
              {
                "label": "Recherche de composants",
                "description": "Consultation des catalogues B2B (LDLC Pro, Materiel.net, Inmac Wstore). Identification des candidats par catégorie : CPU, carte mère, RAM, stockage, alimentation, boîtier."
              },
              {
                "label": "Validation des compatibilités",
                "description": "Vérification socket CPU/carte mère, génération DDR supportée, interface M.2 NVMe ou SATA, calcul TDP, prérequis Windows 11 (TPM 2.0, Secure Boot)."
              },
              {
                "label": "Formalisation du devis",
                "description": "Saisie dans Excel : référence, fournisseur, prix HT, quantité, total HT, TVA 20%, total TTC. Ligne récapitulative avec total global — conformité budgétaire vérifiée."
              }
            ],
            "title": "Processus d approvisionnement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Conforme à l enveloppe client",
                "label": "Budget",
                "value": "< 1 000 € HT"
              },
              {
                "note": "Évolutif 32 Go — virtualisation prête",
                "label": "RAM",
                "value": "16 Go DDR4"
              },
              {
                "note": "OS rapide + données séparées",
                "label": "Stockage",
                "value": "512 Go NVMe + 1 To HDD"
              },
              {
                "note": "HT / TVA / TTC — validé formateur",
                "label": "Livrable",
                "value": "Devis Excel complet"
              }
            ],
            "title": "Récapitulatif"
          }
        ]
      },
      "es": {
        "title": "IT hardware procurement quote (Excel devis)",
        "heroSubtitle": "Dimensionamiento de hardware · Presupuesto Excel · Investigación de componentes · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En el marco de la formación TAI en el Greta du Val d Oise, recibí un pliego de condiciones de cliente describiendo un caso de uso de puesto de trabajo (ofimática + virtualización ligera) y tuve que elaborar un presupuesto de hardware completo. El ejercicio cubría todo el proceso de aprovisionamiento B2B: análisis de necesidades, búsqueda de componentes compatibles, validación de las limitaciones técnicas y formalización en una tabla Excel estructurada — entregable estándar en contexto profesional IT."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Puesto de trabajo de gama media: ofimática diaria + 1-2 VM simultáneas (VirtualBox)",
              "Soporte multi-monitor requerido y almacenamiento local de archivos profesionales",
              "Restricción presupuestaria: menos de 1.000 € sin IVA",
              "Compatibilidad Windows 11 Pro y unión a un dominio Active Directory existente",
              "Formato ATX torre estándar para facilitar el mantenimiento en empresa"
            ],
            "title": "Alcance y restricciones"
          },
          {
            "type": "bullets",
            "items": [
              "Análisis del pliego de condiciones y extracción de las restricciones de hardware (RAM mín., SSD, GPU, TPM 2.0)",
              "Búsqueda de componentes en catálogos B2B franceses (LDLC Pro, Materiel.net, Inmac Wstore)",
              "Validación de compatibilidades: zócalo CPU/placa base, generación DDR, interfaz de almacenamiento, cálculo de TDP",
              "Verificación de los requisitos de Windows 11: TPM 2.0, Secure Boot, lista de CPU compatibles",
              "Presupuesto Excel estructurado: referencia, proveedor, precio sin IVA, cantidad, total sin IVA, IVA 20%, total con IVA",
              "Presupuesto validado por debajo de 1.000 € sin IVA y presentado al formador para revisión"
            ],
            "title": "Solución y entregables"
          },
          {
            "type": "bullets",
            "items": [
              "AMD Ryzen 5 / Intel Core i5 (12ª-13ª gen) — CPU según relación calidad-precio",
              "16 GB DDR4 (2× 8 GB) — ampliable hasta 32 GB para virtualización",
              "SSD M.2 NVMe de 512 GB (SO) + HDD de 1 TB (datos)",
              "Windows 11 Pro OEM — licencia incluida en el presupuesto",
              "LDLC Pro / Materiel.net / Inmac Wstore — catálogos de proveedores B2B",
              "Excel — formalización del presupuesto con cálculos sin IVA/con IVA"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Análisis de necesidades",
                "description": "Lectura del pliego de condiciones, extracción de las restricciones: RAM mín. 16 GB, SSD para el SO, iGPU o GPU dedicada, TPM 2.0, formato ATX torre."
              },
              {
                "label": "Búsqueda de componentes",
                "description": "Consulta de catálogos B2B (LDLC Pro, Materiel.net, Inmac Wstore). Identificación de candidatos por categoría: CPU, placa base, RAM, almacenamiento, fuente de alimentación, chasis."
              },
              {
                "label": "Validación de compatibilidades",
                "description": "Verificación de zócalo CPU/placa base, generación DDR compatible, interfaz M.2 NVMe o SATA, cálculo de TDP, requisitos de Windows 11 (TPM 2.0, Secure Boot)."
              },
              {
                "label": "Formalización del presupuesto",
                "description": "Introducción en Excel: referencia, proveedor, precio sin IVA, cantidad, total sin IVA, IVA 20%, total con IVA. Línea de resumen con el total global — conformidad presupuestaria verificada."
              }
            ],
            "title": "Proceso de aprovisionamiento"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Conforme al límite del cliente",
                "label": "Presupuesto",
                "value": "< 1.000 € sin IVA"
              },
              {
                "note": "Ampliable a 32 GB — virtualización lista",
                "label": "RAM",
                "value": "16 GB DDR4"
              },
              {
                "note": "SO rápido + datos separados",
                "label": "Almacenamiento",
                "value": "512 GB NVMe + 1 TB HDD"
              },
              {
                "note": "Sin IVA / IVA / con IVA — validado por el formador",
                "label": "Entregable",
                "value": "Presupuesto Excel completo"
              }
            ],
            "title": "Resumen"
          }
        ]
      }
    }
  },
  {
    "slug": "it-ops-email-config",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-email-config/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/it-ops-email-config/screenshot-1.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Configuring Outlook 2016 Email Account",
        "heroSubtitle": "Outlook 2016 · IMAP/Exchange · User Onboarding · Email Provisioning · Greta du Val d'Oise",
        "sections": [
          {
            "body": "As part of the TAI training at Greta du Val d Oise, I completed an email provisioning exercise using Microsoft Outlook 2016. The scenario mirrors a real-world IT technician task: a new employee arrives on their first day, their workstation is already set up (Windows 10, Office 2016 installed), and the technician must configure their professional email account so they can start working immediately.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Configure a Microsoft/Exchange email account (tai7@outlook.fr) in Outlook 2016",
              "Validate bidirectional communication with a peer account (tai12@outlook.fr)",
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
              "Test email sent from tai7@outlook.fr to tai12@outlook.fr and confirmed received",
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
                "description": "Entered user name, email address (tai7@outlook.fr) and password. Outlook 2016 supports both automatic and manual configuration."
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
                "value": "tai7@outlook.fr"
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
            "body": "Dans le cadre de la formation TAI au Greta du Val d Oise, j ai réalisé un exercice de provisioning de messagerie avec Microsoft Outlook 2016. Le scénario reproduit une tâche réelle de technicien IT : un nouvel employé arrive le premier jour, son poste est installé (Windows 10, Office 2016), et le technicien doit configurer son compte de messagerie professionnel pour qu il soit opérationnel immédiatement.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Configurer un compte de messagerie Microsoft/Exchange (tai7@outlook.fr) dans Outlook 2016",
              "Valider la communication bidirectionnelle avec un compte pair (tai12@outlook.fr)",
              "Rendre le poste opérationnel en moins de 5 minutes après remise à l utilisateur",
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
              "Email de test envoyé depuis tai7@outlook.fr vers tai12@outlook.fr et confirmé reçu",
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
              "Windows 10 — système d exploitation du poste provisionné",
              "Office 2016 — suite bureautique préinstallée"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Lancer Outlook 2016",
                "description": "Ouverture d Outlook 2016 pour la première fois — assistant de bienvenue lancé automatiquement pour l ajout du compte."
              },
              {
                "label": "Saisie des informations du compte",
                "description": "Nom de l utilisateur, adresse (tai7@outlook.fr) et mot de passe saisis. Outlook 2016 supporte la configuration automatique et manuelle."
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
                "value": "tai7@outlook.fr"
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
        "title": "Outlook 2016 email provisioning (Day-1 onboarding)",
        "heroSubtitle": "Outlook 2016 · Exchange ActiveSync · Incorporación de usuarios · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En el marco de la formación TAI en el Greta du Val d Oise, realicé un ejercicio de aprovisionamiento de correo con Microsoft Outlook 2016. El escenario reproduce una tarea real de técnico IT: un nuevo empleado llega el primer día, su equipo está instalado (Windows 10, Office 2016), y el técnico debe configurar su cuenta de correo profesional para que esté operativa de inmediato."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Configurar una cuenta de correo Microsoft/Exchange (tai7@outlook.fr) en Outlook 2016",
              "Validar la comunicación bidireccional con una cuenta par (tai12@outlook.fr)",
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
              "Correo de prueba enviado desde tai7@outlook.fr a tai12@outlook.fr y confirmado como recibido",
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
                "description": "Nombre del usuario, dirección (tai7@outlook.fr) y contraseña introducidos. Outlook 2016 admite configuración automática y manual."
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
                "value": "tai7@outlook.fr"
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
  },
  {
    "slug": "cyber-soc-curriculum",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Cyber Curriculum — 70 SOC Projects",
        "sections": [
          {
            "body": "Theoretical cybersecurity training is no longer enough: recruiters and SOCs look for analysts who can demonstrate documented practical experience. This curriculum aims to build a portfolio of 70 hands-on projects covering all SOC Tier 1 to 3 competencies, from network monitoring to advanced threat hunting.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Certifications alone (CompTIA, CEH) are not enough without proven practical experience",
              "Public labs (TryHackMe, HackTheBox) don't produce documented portfolio deliverables",
              "No structured curriculum covering SIEM + forensics + threat hunting coherently",
              "Need real-world scenarios: malware analysis, network intrusions, log analysis, incident response"
            ],
            "title": "Problem Scope"
          },
          {
            "type": "bullets",
            "items": [
              "70 documented projects covering: SIEM (Splunk, Elastic, Wazuh), network (Wireshark, Zeek), forensics (Autopsy, Volatility), threat hunting and red team basics",
              "Detailed writeup for each project: context, methodology, tools, results",
              "Personal virtual lab: attack VMs (Kali) and defensive (Ubuntu SOC) on VMware",
              "Python automation scripts: log parsers, SIEM alerts, IOC extractors",
              "Progressive publication on GitHub and portfolio website"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "SIEM: Splunk Enterprise (trial), Elastic Stack (ELK), Wazuh (open source)",
              "Network: Wireshark, Zeek, Suricata IDS, Nmap",
              "Forensics: Autopsy, Volatility 3, FTK Imager, strings/binwalk",
              "Red Team basics: Metasploit, Nessus, Burp Suite Community",
              "Infrastructure: VMware Workstation, VirtualBox, Kali Linux, Ubuntu Server",
              "Scripting: Python 3, Bash, PowerShell"
            ],
            "title": "Tech Stack"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Module 1 — SIEM",
                "description": "Splunk and Elastic: log ingestion, dashboards, detection rules — completed"
              },
              {
                "label": "Module 2 — Network",
                "description": "Wireshark, Zeek, pcap capture analysis and intrusion detection — completed"
              },
              {
                "label": "Module 3 — Threat Hunting",
                "description": "Hypothesis-driven hunting, ATT&CK framework, SIEM pivots — in progress"
              },
              {
                "label": "Module 4 — Forensics",
                "description": "Memory and disk analysis, Windows artifacts — upcoming"
              },
              {
                "label": "Module 5 — Red Team Basics",
                "description": "Web pentest, basic exploitation, vulnerability reports — upcoming"
              }
            ],
            "title": "Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "SIEM and network modules",
                "label": "Projects completed",
                "value": "~20 / 70"
              },
              {
                "note": "Progressive GitHub publication",
                "label": "Writeups published",
                "value": "In progress"
              },
              {
                "note": "Splunk, Elastic, Wazuh, Wireshark, Zeek...",
                "label": "Tools mastered",
                "value": "12+"
              }
            ],
            "title": "Progress"
          }
        ]
      },
      "fr": {
        "title": "Curriculum Cyber — 70 Projets SOC",
        "sections": [
          {
            "body": "Les formations cybersécurité théoriques ne suffisent plus : les recruteurs et les SOC cherchent des analystes capables de démontrer une expérience pratique documentée. Ce curriculum vise à construire un portfolio de 70 projets hands-on couvrant l'ensemble des compétences SOC Tier 1 à 3, du monitoring réseau au threat hunting avancé.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Les certifications seules (CompTIA, CEH) ne suffisent pas sans expérience pratique prouvée",
              "Les labs publics (TryHackMe, HackTheBox) ne produisent pas de livrables portfolio documentés",
              "Pas de parcours structuré couvrant SIEM + forensics + threat hunting de façon cohérente",
              "Besoin de cas réels : malwares, intrusions réseau, analyse de logs, réponse à incident"
            ],
            "title": "Périmètre du Problème"
          },
          {
            "type": "bullets",
            "items": [
              "70 projets documentés couvrant : SIEM (Splunk, Elastic, Wazuh), réseau (Wireshark, Zeek), forensics (Autopsy, Volatility), threat hunting et bases red team",
              "Writeups détaillés pour chaque projet : contexte, méthodologie, outils, résultats",
              "Lab virtuel personnel : VMs attaquantes (Kali) et défensives (Ubuntu SOC) sur VMware",
              "Scripts Python d'automatisation : parsers de logs, alertes SIEM, IOC extractors",
              "Publication progressive sur GitHub et portfolio web"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "SIEM : Splunk Enterprise (trial), Elastic Stack (ELK), Wazuh (open source)",
              "Réseau : Wireshark, Zeek, Suricata IDS, Nmap",
              "Forensics : Autopsy, Volatility 3, FTK Imager, strings/binwalk",
              "Red Team basics : Metasploit, Nessus, Burp Suite Community",
              "Infrastructure : VMware Workstation, VirtualBox, Kali Linux, Ubuntu Server",
              "Scripting : Python 3, Bash, PowerShell"
            ],
            "title": "Stack Technique"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Module 1 — SIEM",
                "description": "Splunk et Elastic : ingestion de logs, dashboards, règles de détection — terminé"
              },
              {
                "label": "Module 2 — Réseau",
                "description": "Wireshark, Zeek, analyse de captures pcap et détection d'intrusions — terminé"
              },
              {
                "label": "Module 3 — Threat Hunting",
                "description": "Hypothèse-driven hunting, ATT&CK framework, pivots SIEM — en cours"
              },
              {
                "label": "Module 4 — Forensics",
                "description": "Analyse mémoire, disques, artefacts Windows — à venir"
              },
              {
                "label": "Module 5 — Red Team Basics",
                "description": "Pentest web, exploitation basique, rapport de vulnérabilités — à venir"
              }
            ],
            "title": "Avancement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Modules SIEM et réseau",
                "label": "Projets complétés",
                "value": "~20 / 70"
              },
              {
                "note": "Publication GitHub progressive",
                "label": "Writeups publiés",
                "value": "En cours"
              },
              {
                "note": "Splunk, Elastic, Wazuh, Wireshark, Zeek...",
                "label": "Outils maîtrisés",
                "value": "12+"
              }
            ],
            "title": "Progression"
          }
        ]
      }
    }
  },
  {
    "slug": "vulnerability-assessment-report",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Vulnerability Assessment Tool (Python + CVSS)",
        "heroSubtitle": "CLI tool for structured vulnerability assessments with CVSS v3.1 scoring and HTML report generation",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "The initial plan called for a report based on a simulated Nessus scan against a fictional network. In practice, I built my own scanner instead of replaying an existing tool's output — a stronger signal for a SOC/Pentest/AppSec role: the ability to design and code a vulnerability assessment tool (check architecture, CVSS scoring engine, report generation), not just read Nessus output."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Network: concurrent port scan (ThreadPoolExecutor, 1-1024), risky-service detection (SMB/445, Telnet/23, unauthenticated Redis/6379, RDP/3389), DNS zone transfer attempt (AXFR)",
              "System: inspects the machine running the tool (not the target) — OS version, SSH configuration (sshd_config), world-writable files in /tmp",
              "Web: missing security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy), TLS certificate validity"
            ],
            "title": "Methodology — 3 check families"
          },
          {
            "type": "text",
            "title": "The CVSS v3.1 engine",
            "paragraphs": [
              "Each finding carries a CVSS vector (attack vector, complexity, privileges required, user interaction, confidentiality/integrity/availability impact). The score isn't a hand-picked constant — it's computed via the standard's official formula (Exploitability × Impact, with the CVSS spec's Roundup algorithm). Real example — an exposed, unauthenticated SMB service computes CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H = 9.8 (Critical). Severity is then derived from the computed score, not assigned separately, which eliminates any risk of a mismatch between score and displayed severity."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "TLS check never triggered: getpeercert() returns {} when verify_mode=CERT_NONE, so expired-certificate detection silently never worked. Fixed by reading the certificate in DER form (binary_form=True) and parsing via cryptography — verified against expired.badssl.com, correctly detecting a certificate expired since 2015",
              "Sequential port scan: 1024 ports × 0.5s timeout, up to 8-9 minutes per scan. Fixed with ThreadPoolExecutor (concurrent scan) — 8.5 min → 6.4 sec measured live against localhost",
              "Hardcoded CVSS score: the README advertised CVSS v3.1 scoring but the scores were hand-picked constants. Implemented the real formula (Exploitability, Impact, Roundup)",
              "Scope confusion: system checks were analyzing the local machine, not the --target host, undocumented anywhere. IDs renamed to LOCAL-*, with explicit docstrings, README notes, and a console banner",
              "No authorization guard: the tool scanned any target without confirmation. Added an interactive confirmation prompt plus an --i-am-authorized flag for non-interactive/CI use"
            ],
            "title": "Bugs found and fixed during code review"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "SMB/445 → Critical (9.8), MSRPC/135 → Medium (5.3) — down from 8.5 min before the concurrency fix",
                "label": "localhost scan",
                "value": "6.4 sec"
              },
              {
                "note": "expired.badssl.com — expired since 2015-04-12",
                "label": "Expired TLS certificate",
                "value": "Correctly detected"
              },
              {
                "note": "example.com — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy",
                "label": "Security headers",
                "value": "5 missing headers detected"
              }
            ],
            "title": "Real test results"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "No external scanner binaries (nmap, Nessus...)",
                "label": "Stack",
                "value": "Python 3.11+, Jinja2, cryptography"
              },
              {
                "note": "CVSS engine + data models",
                "label": "Tests",
                "value": "12 pytest tests"
              },
              {
                "note": "SIEM/ticketing-compatible",
                "label": "Output",
                "value": "Self-contained HTML report + JSON export"
              },
              {
                "note": "Confirmation required, or --i-am-authorized",
                "label": "Legal framework",
                "value": "Built-in authorization guard"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Outil d'évaluation de vulnérabilités (Python + CVSS)",
        "heroSubtitle": "CLI Python pour des audits de vulnérabilités structurés avec scoring CVSS v3.1 et génération de rapports HTML",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Le plan initial prévoyait un rapport basé sur un scan Nessus simulé contre un réseau fictif. En pratique, j'ai construit mon propre scanner plutôt que de rejouer la sortie d'un outil existant — un signal plus fort pour un poste SOC/Pentest/AppSec : la capacité à concevoir et coder un outil d'évaluation de vulnérabilités (architecture des checks, moteur de scoring CVSS, génération de rapport), pas seulement à lire la sortie de Nessus."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Network : scan de ports concurrent (ThreadPoolExecutor, 1-1024), détection de services à risque (SMB/445, Telnet/23, Redis/6379 sans auth, RDP/3389), tentative de zone transfer DNS (AXFR)",
              "System : inspecte la machine qui exécute l'outil (pas la cible) — version OS, configuration SSH (sshd_config), fichiers world-writable dans /tmp",
              "Web : headers de sécurité manquants (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy), validité du certificat TLS"
            ],
            "title": "Méthodologie — 3 familles de checks"
          },
          {
            "type": "text",
            "title": "Le moteur CVSS v3.1",
            "paragraphs": [
              "Chaque finding porte un vecteur CVSS (vecteur d'attaque, complexité, privilèges requis, interaction utilisateur, impact confidentialité/intégrité/disponibilité). Le score n'est pas une constante choisie à la main : il est calculé via la formule officielle du standard (Exploitability × Impact, algorithme Roundup du spec CVSS). Exemple réel — un SMB exposé sans authentification calcule CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H = 9.8 (Critical). La sévérité est ensuite dérivée du score calculé, pas assignée séparément, ce qui élimine tout risque d'incohérence entre score et sévérité affichée."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Check TLS jamais déclenché : getpeercert() retourne {} quand verify_mode=CERT_NONE, donc la détection de certificat expiré ne fonctionnait jamais, silencieusement. Corrigé par une lecture du certificat en DER (binary_form=True) + parsing via cryptography — vérifié contre expired.badssl.com, qui détecte bien un certificat expiré depuis 2015",
              "Scan de ports séquentiel : 1024 ports × 0,5 s de timeout, jusqu'à 8-9 minutes par scan. Corrigé avec ThreadPoolExecutor (scan concurrent) — 8,5 min → 6,4 s mesuré en réel sur localhost",
              "Score CVSS codé en dur : le README annonçait un calcul CVSS v3.1 mais les scores étaient des constantes choisies à la main. Implémentation de la vraie formule (Exploitability, Impact, Roundup)",
              "Confusion de périmètre : les checks system analysaient la machine locale, pas la cible --target, sans que ce soit documenté nulle part. IDs renommés LOCAL-*, docstrings + README + bannière console explicites",
              "Aucun garde-fou d'autorisation : l'outil scannait n'importe quelle cible sans confirmation. Ajout d'un prompt de confirmation interactif + flag --i-am-authorized pour usage non-interactif/CI"
            ],
            "title": "Bugs trouvés et corrigés pendant la revue de code"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "SMB/445 → Critical (9.8), MSRPC/135 → Medium (5.3) — contre 8,5 min avant le fix de concurrence",
                "label": "Scan localhost",
                "value": "6,4 s"
              },
              {
                "note": "expired.badssl.com — expiré depuis le 12/04/2015",
                "label": "Certificat TLS expiré",
                "value": "Détecté correctement"
              },
              {
                "note": "example.com — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy",
                "label": "Headers de sécurité",
                "value": "5 headers manquants détectés"
              }
            ],
            "title": "Résultats de tests réels"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Aucun binaire de scan externe (nmap, Nessus...)",
                "label": "Stack",
                "value": "Python 3.11+, Jinja2, cryptography"
              },
              {
                "note": "Moteur CVSS + modèles de données",
                "label": "Tests",
                "value": "12 tests pytest"
              },
              {
                "note": "Compatible SIEM/ticketing",
                "label": "Sortie",
                "value": "Rapport HTML autonome + export JSON"
              },
              {
                "note": "Confirmation requise ou --i-am-authorized",
                "label": "Cadre légal",
                "value": "Garde-fou d'autorisation intégré"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Herramienta de evaluación de vulnerabilidades (Python + CVSS)",
        "heroSubtitle": "Evaluación de vulnerabilidades Tenable SecurityCenter — resumen ejecutivo, clasificación por severidad y remediación mapeada a CVE.",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "El plan inicial preveía un informe basado en un escaneo Nessus simulado contra una red ficticia. En la práctica, construí mi propio escáner en lugar de reproducir la salida de una herramienta existente — una señal más fuerte para un puesto SOC/Pentest/AppSec: la capacidad de diseñar y programar una herramienta de evaluación de vulnerabilidades (arquitectura de checks, motor de puntuación CVSS, generación de informes), no solo leer la salida de Nessus."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Network: escaneo de puertos concurrente (ThreadPoolExecutor, 1-1024), detección de servicios de riesgo (SMB/445, Telnet/23, Redis/6379 sin autenticación, RDP/3389), intento de transferencia de zona DNS (AXFR)",
              "System: inspecciona la máquina que ejecuta la herramienta (no el objetivo) — versión del SO, configuración SSH (sshd_config), archivos con permisos de escritura global en /tmp",
              "Web: cabeceras de seguridad ausentes (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy), validez del certificado TLS"
            ],
            "title": "Metodología — 3 familias de checks"
          },
          {
            "type": "text",
            "title": "El motor CVSS v3.1",
            "paragraphs": [
              "Cada hallazgo lleva un vector CVSS (vector de ataque, complejidad, privilegios requeridos, interacción del usuario, impacto en confidencialidad/integridad/disponibilidad). La puntuación no es una constante elegida a mano: se calcula mediante la fórmula oficial del estándar (Exploitability × Impact, con el algoritmo Roundup de la especificación CVSS). Ejemplo real — un servicio SMB expuesto sin autenticación calcula CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H = 9.8 (Crítico). La severidad se deriva después de la puntuación calculada, no se asigna por separado, lo que elimina cualquier riesgo de incoherencia entre la puntuación y la severidad mostrada."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "El check TLS nunca se activaba: getpeercert() devuelve {} cuando verify_mode=CERT_NONE, por lo que la detección de certificados expirados nunca funcionaba, de forma silenciosa. Corregido leyendo el certificado en formato DER (binary_form=True) y analizándolo con cryptography — verificado contra expired.badssl.com, que detecta correctamente un certificado expirado desde 2015",
              "Escaneo de puertos secuencial: 1024 puertos × 0,5 s de timeout, hasta 8-9 minutos por escaneo. Corregido con ThreadPoolExecutor (escaneo concurrente) — 8,5 min → 6,4 s medido en real contra localhost",
              "Puntuación CVSS codificada a mano: el README anunciaba un cálculo CVSS v3.1 pero las puntuaciones eran constantes elegidas manualmente. Implementación de la fórmula real (Exploitability, Impact, Roundup)",
              "Confusión de alcance: los checks system analizaban la máquina local, no el objetivo --target, sin documentarlo en ningún sitio. IDs renombrados a LOCAL-*, con docstrings, notas en el README y un aviso en consola explícitos",
              "Sin garantía de autorización: la herramienta escaneaba cualquier objetivo sin confirmación. Se añadió un aviso de confirmación interactivo más un flag --i-am-authorized para uso no interactivo/CI"
            ],
            "title": "Errores encontrados y corregidos durante la revisión de código"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "SMB/445 → Crítico (9.8), MSRPC/135 → Medio (5.3) — frente a 8,5 min antes de la corrección de concurrencia",
                "label": "Escaneo de localhost",
                "value": "6,4 s"
              },
              {
                "note": "expired.badssl.com — expirado desde el 12/04/2015",
                "label": "Certificado TLS expirado",
                "value": "Detectado correctamente"
              },
              {
                "note": "example.com — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy",
                "label": "Cabeceras de seguridad",
                "value": "5 cabeceras ausentes detectadas"
              }
            ],
            "title": "Resultados de pruebas reales"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Sin binarios de escaneo externos (nmap, Nessus...)",
                "label": "Stack",
                "value": "Python 3.11+, Jinja2, cryptography"
              },
              {
                "note": "Motor CVSS + modelos de datos",
                "label": "Tests",
                "value": "12 tests pytest"
              },
              {
                "note": "Compatible con SIEM/ticketing",
                "label": "Salida",
                "value": "Informe HTML autónomo + exportación JSON"
              },
              {
                "note": "Confirmación requerida, o --i-am-authorized",
                "label": "Marco legal",
                "value": "Garantía de autorización integrada"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "incident-response-tracker",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/incident-response-tracker/cover.webp"
      },
      {
        "alt": "Incident detail with audit timeline",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/incident-response-tracker/screenshot-1.webp"
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
              "A pure state_machine module defining every legal transition and per-severity SLA target, with zero I/O",
              "FastAPI endpoints that reject illegal transitions with a 409 and the list of allowed next states",
              "A timestamped audit timeline — every status change, comment, and assignment recorded",
              "React master-detail dashboard with inline status transition buttons",
              "15 Pytest tests, including pure unit tests of the state machine independent of the database"
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
              "Un module state_machine pur définissant chaque transition légale et la cible SLA par sévérité, sans aucun I/O",
              "Des endpoints FastAPI qui rejettent les transitions illégales avec un 409 et la liste des états suivants autorisés",
              "Une chronologie d'audit horodatée — chaque changement de statut, commentaire et assignation enregistré",
              "Tableau de bord React maître-détail avec boutons de transition de statut intégrés",
              "15 tests Pytest, dont des tests unitaires purs de la machine à états indépendants de la base de données"
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
              "Un módulo state_machine puro que define cada transición legal y el objetivo SLA por severidad, sin ningún I/O",
              "Endpoints FastAPI que rechazan las transiciones ilegales con un 409 y la lista de estados siguientes permitidos",
              "Una cronología de auditoría con marca de tiempo — cada cambio de estado, comentario y asignación registrado",
              "Dashboard React maestro-detalle con botones de transición de estado integrados",
              "15 pruebas Pytest, incluyendo pruebas unitarias puras de la máquina de estados independientes de la base de datos"
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
  },
  {
    "slug": "cve-watchlist",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/cve-watchlist/cover.webp"
      },
      {
        "alt": "Filtered to Critical priority",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/cve-watchlist/screenshot-1.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "CVE Watchlist — Real-Time NVD Vulnerability Triage",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "A CVSS score alone doesn't say what to patch first. This dashboard encodes that judgment call into an explicit, documented formula instead of leaving it to the raw CVSS number."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "httpx-based NVD API v2.0 client with response parsing for CVSS v3.1/v2 metrics",
              "Pure scoring engine (scoring.py) combining CVSS base score, CISA KEV exploitation flag, attack vector, and recency into a 0-100 priority score",
              "SQLAlchemy upsert logic so re-syncing updates existing CVEs instead of duplicating them",
              "React dashboard with severity-band filters and a manual Sync from NVD action",
              "13 Pytest tests, with the NVD client mocked so the suite never depends on live network"
            ],
            "title": "What I built"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Real NVD data, last 30 days",
                "label": "CVEs synced",
                "value": "100"
              },
              {
                "note": "CVE-2018-1273, Spring Data RCE",
                "label": "Top priority score",
                "value": "89/100"
              },
              {
                "note": "Correctly cross-referenced",
                "label": "Actively exploited (KEV)",
                "value": "2"
              }
            ],
            "title": "Verified live"
          }
        ]
      },
      "fr": {
        "title": "CVE Watchlist — Triage de vulnérabilités en temps réel (API NVD)",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Un score CVSS seul ne dit pas quoi corriger en premier. Ce tableau de bord traduit ce jugement en une formule explicite et documentée, plutôt que de s'en remettre au seul chiffre CVSS brut."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Client API NVD v2.0 basé sur httpx avec parsing des métriques CVSS v3.1/v2",
              "Moteur de score pur (scoring.py) combinant score de base CVSS, drapeau d'exploitation CISA KEV, vecteur d'attaque et fraîcheur en un score de priorité 0-100",
              "Logique d'upsert SQLAlchemy pour que la resynchronisation mette à jour les CVE existantes au lieu de les dupliquer",
              "Tableau de bord React avec filtres par bande de sévérité et une action manuelle Sync from NVD",
              "13 tests Pytest, avec le client NVD simulé pour que la suite ne dépende jamais du réseau réel"
            ],
            "title": "Ce que j'ai construit"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Vraies données NVD, 30 derniers jours",
                "label": "CVE synchronisées",
                "value": "100"
              },
              {
                "note": "CVE-2018-1273, RCE Spring Data",
                "label": "Score de priorité max",
                "value": "89/100"
              },
              {
                "note": "Correctement croisées",
                "label": "Activement exploitées (KEV)",
                "value": "2"
              }
            ],
            "title": "Vérifié en direct"
          }
        ]
      },
      "es": {
        "title": "CVE Watchlist — Triaje de vulnerabilidades en tiempo real (API NVD)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Una puntuación CVSS por sí sola no dice qué corregir primero. Este dashboard traduce ese juicio en una fórmula explícita y documentada, en lugar de dejarlo únicamente al número CVSS bruto."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Cliente de la API NVD v2.0 basado en httpx con análisis de las métricas CVSS v3.1/v2",
              "Motor de puntuación puro (scoring.py) que combina la puntuación base CVSS, el indicador de explotación CISA KEV, el vector de ataque y la actualidad en una puntuación de prioridad 0-100",
              "Lógica de upsert en SQLAlchemy para que la resincronización actualice las CVE existentes en lugar de duplicarlas",
              "Dashboard React con filtros por banda de severidad y una acción manual Sync from NVD",
              "13 pruebas Pytest, con el cliente NVD simulado para que la suite nunca dependa de la red real"
            ],
            "title": "Lo que construí"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Datos reales de NVD, últimos 30 días",
                "label": "CVE sincronizadas",
                "value": "100"
              },
              {
                "note": "CVE-2018-1273, RCE de Spring Data",
                "label": "Puntuación de prioridad máxima",
                "value": "89/100"
              },
              {
                "note": "Cruzadas correctamente",
                "label": "Activamente explotadas (KEV)",
                "value": "2"
              }
            ],
            "title": "Verificado en vivo"
          }
        ]
      }
    }
  },
  {
    "slug": "log-anomaly-detector",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/log-anomaly-detector/cover.webp"
      },
      {
        "alt": "An anomaly marked resolved",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/log-anomaly-detector/screenshot-1.webp"
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
              "Four independent detection rules (detection.py) as pure functions: brute force, impossible travel, credential stuffing, off-hours access",
              "A windowing + dedup layer so a sustained attack does not spam duplicate anomalies",
              "A deterministic demo scenario, anchored to a fixed time-of-day so tests never depend on real wall-clock time",
              "A Simulate attack traffic button replaying that scenario live from the dashboard",
              "20 Pytest tests — all 4 rules unit-tested with plain event dicts, zero database or clock dependency"
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
              "Quatre règles de détection indépendantes (detection.py) sous forme de fonctions pures : force brute, voyage impossible, credential stuffing, accès hors-horaires",
              "Une couche de fenêtrage + déduplication pour qu'une attaque soutenue ne spamme pas d'anomalies en double",
              "Un scénario de démo déterministe, ancré à une heure fixe pour que les tests ne dépendent jamais de l'heure réelle",
              "Un bouton Simulate attack traffic rejouant ce scénario en direct depuis le tableau de bord",
              "20 tests Pytest — les 4 règles testées unitairement avec de simples dictionnaires d'événements, sans base de données ni dépendance à l'horloge"
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
              "Cuatro reglas de detección independientes (detection.py) como funciones puras: fuerza bruta, viaje imposible, credential stuffing, acceso fuera de horario",
              "Una capa de ventaneo + deduplicación para que un ataque sostenido no sature de anomalías duplicadas",
              "Un escenario de demostración determinista, anclado a una hora fija para que las pruebas nunca dependan del reloj real",
              "Un botón Simulate attack traffic que reproduce ese escenario en vivo desde el dashboard",
              "20 pruebas Pytest — las 4 reglas probadas unitariamente con simples diccionarios de eventos, sin base de datos ni dependencia del reloj"
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
  },
  {
    "slug": "cosmonote-clone",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Cosmonote Clone — AI Meeting Transcription",
        "sections": [
          {
            "body": "Cosmonote is an AI-powered meeting transcription and summarization SaaS. This project aims to replicate its core features to deeply understand the architecture of an AI audio product: audio processing pipeline, speech-to-text transcription, LLM summarization and smooth user experience.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Understand the real architecture of an AI transcription app by building it",
              "Master the audio pipeline: upload, processing, async transcription, storage",
              "Learn LLM orchestration for structured summaries (action items, decisions, participants)",
              "Evaluate costs and performance: Whisper API vs local model, latency, quality"
            ],
            "title": "Problem Scope"
          },
          {
            "type": "bullets",
            "items": [
              "Next.js interface: audio/video upload, meeting list, synchronized transcript reader",
              "Audio pipeline: Supabase Storage upload → async job → Whisper API transcription",
              "GPT-4o structured summary: title, participants, key points, decisions, action items",
              "Meeting history with full-text search in transcripts",
              "Markdown export and quick summary copy"
            ],
            "title": "Solution & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "Frontend: Next.js 14, TypeScript, shadcn/ui, Tailwind CSS",
              "Transcription: OpenAI Whisper API (or local Whisper via faster-whisper)",
              "Summarization: GPT-4o with structured prompt (JSON schema output)",
              "Backend / DB: Supabase (PostgreSQL + Storage + Realtime)",
              "Deployment: Vercel + Supabase Edge Functions (async jobs)"
            ],
            "title": "Tech Stack"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Design",
                "description": "Audio pipeline architecture, Whisper API vs local choice, DB schema"
              },
              {
                "label": "MVP Pipeline",
                "description": "Upload → Whisper transcription → Supabase transcript storage"
              },
              {
                "label": "AI Summary",
                "description": "GPT-4o integration for structured summaries with action items"
              },
              {
                "label": "Full Interface",
                "description": "Synchronized audio reader with transcript, history, export"
              }
            ],
            "title": "Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "For a 60-minute meeting",
                "label": "Transcription latency",
                "value": "< 2 min"
              },
              {
                "note": "Target word error rate",
                "label": "Quality WER",
                "value": "< 10%"
              },
              {
                "note": "Prototype planned in 6 weeks",
                "label": "Availability",
                "value": "Coming Soon"
              }
            ],
            "title": "Goals"
          }
        ]
      },
      "fr": {
        "title": "Clone Cosmonote — Transcription IA de Réunions",
        "sections": [
          {
            "body": "Cosmonote est une application SaaS de transcription et résumé de réunions propulsée par IA. Ce projet vise à reproduire ses fonctionnalités principales pour comprendre en profondeur l'architecture d'un produit IA audio : pipeline audio, transcription speech-to-text, summarisation LLM et UX fluide.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Comprendre l'architecture réelle d'une app IA transcription en la construisant",
              "Maîtriser le pipeline audio : upload, processing, transcription asynchrone, stockage",
              "Apprendre l'orchestration LLM pour résumés structurés (action items, décisions, participants)",
              "Évaluer coûts et performances : Whisper API vs modèle local, latence, qualité"
            ],
            "title": "Périmètre"
          },
          {
            "type": "bullets",
            "items": [
              "Interface Next.js : upload audio/vidéo, liste des réunions, lecture transcript synchronisée",
              "Pipeline audio : upload Supabase Storage → job asynchrone → Whisper API transcription",
              "Résumé structuré GPT-4o : titre, participants, points clés, décisions, action items",
              "Historique des réunions avec recherche full-text dans les transcripts",
              "Export Markdown et copie rapide des résumés"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "Frontend : Next.js 14, TypeScript, shadcn/ui, Tailwind CSS",
              "Transcription : OpenAI Whisper API (ou Whisper local via faster-whisper)",
              "Résumé : GPT-4o avec prompt structuré (JSON schema output)",
              "Backend / BDD : Supabase (PostgreSQL + Storage + Realtime)",
              "Déploiement : Vercel + Supabase Edge Functions (jobs async)"
            ],
            "title": "Stack Technique"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Conception",
                "description": "Architecture pipeline audio, choix Whisper API vs local, schéma BDD"
              },
              {
                "label": "MVP Pipeline",
                "description": "Upload → transcription Whisper → stockage transcript Supabase"
              },
              {
                "label": "Résumé IA",
                "description": "Intégration GPT-4o pour résumés structurés avec action items"
              },
              {
                "label": "Interface complète",
                "description": "Lecteur audio synchronisé avec transcript, historique, export"
              }
            ],
            "title": "Avancement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Pour une réunion de 60 min",
                "label": "Latence transcription",
                "value": "< 2 min"
              },
              {
                "note": "Word Error Rate cible",
                "label": "Qualité WER",
                "value": "< 10%"
              },
              {
                "note": "Prototype prévu sous 6 semaines",
                "label": "Disponibilité",
                "value": "Bientôt"
              }
            ],
            "title": "Objectifs"
          }
        ]
      }
    }
  },
  {
    "slug": "incident-response-playbook",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Incident Response Playbook (SOC)",
        "heroSubtitle": "Structured incident response procedures for malware, ransomware, data breaches, phishing, and unauthorized access",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "This playbook builds on and extends incident-response-playbook, an open-source repository of incident response procedures. Goal: a set of structured procedures for the 6 most common cybersecurity threats, designed for SOC teams and IT admins at SMBs and mid-market companies alike — beyond theory, with documents a team can actually use."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "P01 — Malware infection (High to Critical severity)",
              "P02 — Ransomware attack (Critical)",
              "P03 — Data breach (High to Critical)",
              "P04 — Phishing (Medium to High)",
              "P05 — Unauthorized access (High to Critical)",
              "P06 — Denial of service, DoS/DDoS (Medium to Critical) — playbook added on top of the original"
            ],
            "title": "6 available playbooks"
          },
          {
            "type": "text",
            "title": "Incident response lifecycle",
            "paragraphs": [
              "Every playbook follows the same cycle: Detection → Triage → Containment → Eradication → Recovery → Lessons Learned, with concrete, checkable actions as checklists — not a theoretical description of the NIST SP 800-61 process, but documents actually usable during a live response."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Identify the incident type using the severity matrix",
              "Open the matching playbook and follow the steps in order",
              "Check the RACI matrix to know who does what",
              "Document every action in real time with the incident report",
              "Escalate per the defined escalation procedures",
              "Communicate internally/externally with the crisis communication template",
              "Capitalize on lessons learned with the post-mortem"
            ],
            "title": "How to use this playbook"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Malware, ransomware, data breach, phishing, unauthorized access, denial of service",
                "label": "Playbooks",
                "value": "6"
              },
              {
                "note": "Added on top of the original",
                "label": "Supporting deliverables",
                "value": "RACI matrix + crisis communication template"
              },
              {
                "note": "Detection → Containment → Eradication → Recovery cycle",
                "label": "Framework",
                "value": "NIST SP 800-61"
              },
              {
                "note": "SMB to mid-market",
                "label": "Target audience",
                "value": "SOC & IT admin teams"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Playbook de réponse aux incidents (SOC)",
        "heroSubtitle": "Procédures structurées de réponse aux incidents : malware, ransomware, violations de données, phishing et accès non autorisés",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Ce playbook reprend et enrichit incident-response-playbook, un dépôt open source de procédures de réponse aux incidents. Objectif : un ensemble de procédures structurées pour les 6 menaces de cybersécurité les plus courantes, conçu pour des équipes SOC et administrateurs IT en PME comme en ETI — au-delà de la théorie, avec des documents directement utilisables par une équipe."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "P01 — Infection par malware (sévérité Élevée à Critique)",
              "P02 — Attaque par ransomware (Critique)",
              "P03 — Fuite de données (Élevée à Critique)",
              "P04 — Hameçonnage / phishing (Moyenne à Élevée)",
              "P05 — Accès non autorisé (Élevée à Critique)",
              "P06 — Déni de service, DoS/DDoS (Moyenne à Critique) — playbook ajouté par rapport à l'original"
            ],
            "title": "6 playbooks disponibles"
          },
          {
            "type": "text",
            "title": "Cycle de vie de la réponse à incident",
            "paragraphs": [
              "Chaque playbook suit le même cycle : Détection → Triage → Confinement → Éradication → Récupération → Retour d'expérience, avec des actions concrètes et vérifiables sous forme de checklists — pas une description théorique du processus NIST SP 800-61, mais des documents réellement exploitables en intervention."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Identifier le type d'incident à l'aide de la matrice de sévérité",
              "Ouvrir le playbook correspondant et suivre les étapes dans l'ordre",
              "Consulter la matrice RACI pour savoir qui fait quoi",
              "Documenter toutes les actions en temps réel avec le rapport d'incident",
              "Escalader selon les procédures d'escalade définies",
              "Communiquer en interne/externe avec le template de communication de crise",
              "Capitaliser avec le post-mortem"
            ],
            "title": "Comment utiliser ce playbook"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Malware, ransomware, fuite de données, phishing, accès non autorisé, déni de service",
                "label": "Playbooks",
                "value": "6"
              },
              {
                "note": "Ajoutés par rapport à l'original",
                "label": "Livrables complémentaires",
                "value": "Matrice RACI + template de communication de crise"
              },
              {
                "note": "Cycle Détection → Confinement → Éradication → Récupération",
                "label": "Cadre",
                "value": "NIST SP 800-61"
              },
              {
                "note": "PME comme ETI",
                "label": "Public visé",
                "value": "Équipes SOC & admin IT"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Playbook de respuesta a incidentes (SOC)",
        "heroSubtitle": "Playbook de respuesta a incidentes de phishing — detectar, triar, contener, erradicar, recuperar.",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Este playbook retoma y amplía incident-response-playbook, un repositorio open source de procedimientos de respuesta a incidentes. Objetivo: un conjunto de procedimientos estructurados para las 6 amenazas de ciberseguridad más comunes, diseñado para equipos SOC y administradores IT tanto en pymes como en empresas medianas — más allá de la teoría, con documentos que un equipo puede usar directamente."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "P01 — Infección por malware (Severidad Alta a Crítica)",
              "P02 — Ataque de ransomware (Crítica)",
              "P03 — Fuga de datos (Alta a Crítica)",
              "P04 — Phishing (Media a Alta)",
              "P05 — Acceso no autorizado (Alta a Crítica)",
              "P06 — Denegación de servicio, DoS/DDoS (Media a Crítica) — playbook añadido respecto al original"
            ],
            "title": "6 playbooks disponibles"
          },
          {
            "type": "text",
            "title": "Ciclo de vida de la respuesta a incidentes",
            "paragraphs": [
              "Cada playbook sigue el mismo ciclo: Detección → Triaje → Contención → Erradicación → Recuperación → Lecciones aprendidas, con acciones concretas y verificables en forma de checklists — no una descripción teórica del proceso NIST SP 800-61, sino documentos realmente utilizables durante una intervención."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Identificar el tipo de incidente con la matriz de severidad",
              "Abrir el playbook correspondiente y seguir los pasos en orden",
              "Consultar la matriz RACI para saber quién hace qué",
              "Documentar todas las acciones en tiempo real con el informe de incidente",
              "Escalar según los procedimientos de escalado definidos",
              "Comunicar interna/externamente con la plantilla de comunicación de crisis",
              "Capitalizar con el post-mortem"
            ],
            "title": "Cómo usar este playbook"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Malware, ransomware, fuga de datos, phishing, acceso no autorizado, denegación de servicio",
                "label": "Playbooks",
                "value": "6"
              },
              {
                "note": "Añadidos respecto al original",
                "label": "Entregables complementarios",
                "value": "Matriz RACI + plantilla de comunicación de crisis"
              },
              {
                "note": "Ciclo Detección → Contención → Erradicación → Recuperación",
                "label": "Marco",
                "value": "NIST SP 800-61"
              },
              {
                "note": "Pymes y empresas medianas",
                "label": "Público objetivo",
                "value": "Equipos SOC y admin IT"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "risque360",
    "gallery": [],
    "locales": {
      "en": {
        "title": "risque360 — STRIDE Threat Modeling, Vendor Risk & Incident Recalibration",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "risque360 extends matrice-risques (itself a French rebuild of the open-source risk-assessment-matrix project): a classic risk register poorly captures threats specific to an application's architecture, risks carried by vendors/third parties, and how a history of incidents should shift a probability declared \"in the abstract\". risque360 brings these three angles together in a single register, with a data-driven probability recalibration mechanism — the most differentiating part of the project."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Organizational risk register — same spirit as matrice-risques (manual form, business categories)",
              "Application threat modeling (STRIDE) — for a given component (API Gateway, auth service, database...), generates one risk per STRIDE category: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
              "Vendor/third-party risk register — a vendor (access level, security questionnaire status, known incident) automatically generates a risk, with an initial probability estimated by a transparent heuristic — never enforced, always editable",
              "Incident log & recalibration — each risk carries a correlation key; incidents logged under that same key are used to compute a suggested probability over a rolling 12-month window. The suggestion is never auto-applied — an explicit \"Apply\" button is required"
            ],
            "title": "The 4 modules"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "0-2 incidents / rolling 12 months",
                "value": "No adjustment"
              },
              {
                "label": "3-5 incidents",
                "value": "Probability +1 (capped at 5)"
              },
              {
                "label": "6+ incidents",
                "value": "Probability +2 (capped at 5)"
              },
              {
                "label": "Test-validated example",
                "value": "\"Phishing — credential theft\" (declared probability 2/5): 4 related incidents in 12 months → suggested 3/5, shown with an explicit \"Apply\" button"
              }
            ],
            "title": "Recalibration algorithm"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Base",
                "value": "High access: 3 · medium: 2 · low: 1"
              },
              {
                "label": "+1",
                "value": "If security questionnaire not completed"
              },
              {
                "label": "+1",
                "value": "If questionnaire compliant with reservations"
              },
              {
                "label": "+1",
                "value": "If a known incident occurred in the last 12 months"
              },
              {
                "label": "Cap",
                "value": "5"
              }
            ],
            "title": "Vendor heuristic (transparent, editable)"
          },
          {
            "type": "text",
            "title": "Bug found and fixed during development",
            "paragraphs": [
              "Automatic correlation-key generation (from a vendor name or a STRIDE component) didn't strip punctuation — for example \"PayGateway Inc.\" generated the vendor key fournisseur-paygateway-inc. with a trailing period, which would have silently broken the link to incidents logged under that same key. Fixed with a shared slugifier() function that strips diacritics and punctuation before generating the key, verified with a direct isolated-module test (cache-busting import) to rule out any ES module caching effect during debugging."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Stack",
                "value": "Vanilla HTML/CSS/JS (ES modules, no dependencies) + Python CLI (argparse, Jinja2, pytest)"
              },
              {
                "label": "Tests",
                "value": "6 pytest tests — level boundaries, vendor heuristic, 12-month window, recalibration tiers, preview non-mutation, combined example-data validation"
              },
              {
                "label": "JS ↔ Python parity",
                "value": "Recalibration logic duplicated identically in the Python CLI (recalibration.py), tested separately"
              },
              {
                "label": "Interface",
                "value": "Tabbed app: Dashboard (heatmap + global register), Register, STRIDE, Vendors, Incidents"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "risque360 — Modélisation STRIDE, Risques Fournisseurs & Recalibration par Incidents",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "risque360 étend matrice-risques (elle-même une reconstruction française du projet open source risk-assessment-matrix) : un registre de risques classique capture mal les menaces propres à une architecture applicative, les risques portés par les fournisseurs/tiers, et la façon dont un historique d'incidents devrait faire évoluer une probabilité déclarée « à froid ». risque360 réunit ces trois angles dans un registre unique, avec un mécanisme de recalibration de probabilité piloté par les données — la partie la plus différenciante du projet."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Registre de risques organisationnels — identique dans l'esprit à matrice-risques (formulaire manuel, catégories métier)",
              "Modélisation de menaces applicatives (STRIDE) — pour un composant donné (API Gateway, service d'auth, base de données...), génère un risque par catégorie STRIDE : Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
              "Registre des risques fournisseurs/tiers — un fournisseur (niveau d'accès, statut du questionnaire de sécurité, incident connu) génère automatiquement un risque, avec une probabilité initiale estimée par une heuristique transparente, jamais imposée, toujours modifiable",
              "Journal d'incidents & recalibration — chaque risque porte une clé de corrélation ; les incidents journalisés partageant cette clé permettent de calculer une probabilité suggérée sur une fenêtre glissante de 12 mois. La suggestion n'est jamais appliquée automatiquement : un bouton « Appliquer » explicite est requis"
            ],
            "title": "Les 4 modules"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "0-2 incidents / 12 mois glissants",
                "value": "Aucun ajustement"
              },
              {
                "label": "3-5 incidents",
                "value": "Probabilité +1 (plafonné à 5)"
              },
              {
                "label": "6+ incidents",
                "value": "Probabilité +2 (plafonné à 5)"
              },
              {
                "label": "Exemple validé par les tests",
                "value": "« Hameçonnage — vol d'identifiants » (probabilité déclarée 2/5) : 4 incidents liés sur 12 mois → suggestion 3/5, affichée avec un bouton « Appliquer » explicite"
              }
            ],
            "title": "Algorithme de recalibration"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Base",
                "value": "Accès élevé : 3 · moyen : 2 · faible : 1"
              },
              {
                "label": "+1",
                "value": "Si questionnaire de sécurité non réalisé"
              },
              {
                "label": "+1",
                "value": "Si questionnaire conforme avec réserves"
              },
              {
                "label": "+1",
                "value": "Si incident connu dans les 12 derniers mois"
              },
              {
                "label": "Plafond",
                "value": "5"
              }
            ],
            "title": "Heuristique fournisseur (transparente, éditable)"
          },
          {
            "type": "text",
            "title": "Bug détecté et corrigé pendant le développement",
            "paragraphs": [
              "La génération automatique de clé de corrélation (à partir du nom d'un fournisseur ou d'un composant STRIDE) ne retirait pas la ponctuation — par exemple « PayGateway Inc. » générait la clé fournisseur-paygateway-inc. avec un point final, ce qui aurait cassé silencieusement le lien avec les incidents journalisés partageant cette clé. Corrigé par une fonction slugifier() partagée qui retire diacritiques et ponctuation avant de générer la clé, vérifiée par un test direct du module en isolation (import avec cache-busting) pour écarter tout effet de cache de module ES pendant le débogage."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Stack",
                "value": "HTML/CSS/JS vanilla (ES modules, sans dépendance) + CLI Python (argparse, Jinja2, pytest)"
              },
              {
                "label": "Tests",
                "value": "6 tests pytest — bornes de niveaux, heuristique fournisseur, fenêtre 12 mois, paliers de recalibration, non-mutation de l'aperçu, validation du jeu d'exemple combiné"
              },
              {
                "label": "Parité JS ↔ Python",
                "value": "Logique de recalibration dupliquée à l'identique côté CLI Python (recalibration.py), testée séparément"
              },
              {
                "label": "Interface",
                "value": "App à onglets : Tableau de bord (heatmap + registre global), Registre, STRIDE, Fournisseurs, Incidents"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "risque360 — Modelado STRIDE, Riesgo de Proveedores y Recalibración por Incidentes",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "risque360 amplía matrice-risques (a su vez una reconstrucción francesa del proyecto open source risk-assessment-matrix): un registro de riesgos clásico capta mal las amenazas propias de una arquitectura de aplicación, los riesgos que aportan los proveedores/terceros, y cómo un historial de incidentes debería modificar una probabilidad declarada «en frío». risque360 reúne estos tres ángulos en un único registro, con un mecanismo de recalibración de probabilidad impulsado por datos — la parte más diferenciadora del proyecto."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Registro de riesgos organizacionales — mismo espíritu que matrice-risques (formulario manual, categorías de negocio)",
              "Modelado de amenazas de aplicación (STRIDE) — para un componente dado (API Gateway, servicio de autenticación, base de datos...), genera un riesgo por categoría STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege",
              "Registro de riesgos de proveedores/terceros — un proveedor (nivel de acceso, estado del cuestionario de seguridad, incidente conocido) genera automáticamente un riesgo, con una probabilidad inicial estimada mediante una heurística transparente — nunca impuesta, siempre editable",
              "Registro de incidentes y recalibración — cada riesgo lleva una clave de correlación; los incidentes registrados bajo esa misma clave permiten calcular una probabilidad sugerida en una ventana móvil de 12 meses. La sugerencia nunca se aplica automáticamente — se requiere un botón «Aplicar» explícito"
            ],
            "title": "Los 4 módulos"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "0-2 incidentes / 12 meses móviles",
                "value": "Sin ajuste"
              },
              {
                "label": "3-5 incidentes",
                "value": "Probabilidad +1 (tope 5)"
              },
              {
                "label": "6+ incidentes",
                "value": "Probabilidad +2 (tope 5)"
              },
              {
                "label": "Ejemplo validado por los tests",
                "value": "«Phishing — robo de credenciales» (probabilidad declarada 2/5): 4 incidentes relacionados en 12 meses → sugerencia 3/5, mostrada con un botón «Aplicar» explícito"
              }
            ],
            "title": "Algoritmo de recalibración"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Base",
                "value": "Acceso alto: 3 · medio: 2 · bajo: 1"
              },
              {
                "label": "+1",
                "value": "Si el cuestionario de seguridad no se ha completado"
              },
              {
                "label": "+1",
                "value": "Si el cuestionario es conforme con reservas"
              },
              {
                "label": "+1",
                "value": "Si hubo un incidente conocido en los últimos 12 meses"
              },
              {
                "label": "Tope",
                "value": "5"
              }
            ],
            "title": "Heurística de proveedores (transparente, editable)"
          },
          {
            "type": "text",
            "title": "Error detectado y corregido durante el desarrollo",
            "paragraphs": [
              "La generación automática de la clave de correlación (a partir del nombre de un proveedor o un componente STRIDE) no eliminaba la puntuación — por ejemplo, «PayGateway Inc.» generaba la clave fournisseur-paygateway-inc. con un punto final, lo que habría roto silenciosamente el enlace con los incidentes registrados bajo esa misma clave. Corregido con una función slugifier() compartida que elimina diacríticos y puntuación antes de generar la clave, verificada con una prueba directa del módulo en aislamiento (importación con cache-busting) para descartar cualquier efecto de caché de módulos ES durante la depuración."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Stack",
                "value": "HTML/CSS/JS vanilla (módulos ES, sin dependencias) + CLI Python (argparse, Jinja2, pytest)"
              },
              {
                "label": "Tests",
                "value": "6 tests pytest — límites de nivel, heurística de proveedores, ventana de 12 meses, niveles de recalibración, no mutación de la vista previa, validación del conjunto de datos de ejemplo combinado"
              },
              {
                "label": "Paridad JS ↔ Python",
                "value": "Lógica de recalibración duplicada de forma idéntica en la CLI Python (recalibration.py), probada por separado"
              },
              {
                "label": "Interfaz",
                "value": "App con pestañas: Panel (mapa de calor + registro global), Registro, STRIDE, Proveedores, Incidentes"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
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
  },
  {
    "slug": "avenir-telecom-lightning-app",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/avenir-telecom-lightning-app/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/avenir-telecom-lightning-app/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/avenir-telecom-lightning-app/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/avenir-telecom-lightning-app/screenshot-3.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Lightning app delivery & backlog (Avenir Télécom)",
        "heroSubtitle": "Creation of a Lightning application for Avenir Télécom: backlog, testing and CRM interface migration.",
        "sections": [
          {
            "body": "Following an internal audit, Avenir Télécom's South-zone sales teams needed a Salesforce Lightning app better aligned with their daily workflow (leads, accounts, opportunities, quotes). The mission covered defining the implementation strategy for a small 3-person Salesforce dev team — Romain (senior, Apex & API integrations), Guillaume (mid-level, workflows & automation) and Hélène (junior, UI/UX, testing & documentation) — then, after a 3-month field pilot, consolidating feedback into an evolutions backlog.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "US1 — Lead management: automatic creation via web form, rule-based assignment (sector, potential) with immediate notification, conversion to account/contact/opportunity without data loss (4 days, Romain)",
              "US2/US11 — Accounts: real-time SIREN verification via Webservice on creation, blocked with an explicit error message on inconsistency (4+2 days, Romain)",
              "US4/US9 — Opportunities: real-time integration with the DeviQo API to display associated quotes in a dedicated block, auto-refresh, displayed in under 2 seconds, no local storage (4+2 days, Guillaume)",
              "US14/US15 — Summary PDF generation (merging Opportunity/Account/Contact) with automatic email to the primary contact, send archived in Salesforce (2+2 days, Hélène)",
              "US13 — GDPR compliance: scheduled job deleting accounts/contacts inactive for over 3 years, with audit logging (3 days, Guillaume)",
              "US18/US20 — Dev Org hardening: profile and access-rights configuration, Apex tests using \"run as user\" to validate each profile only accesses authorized data (2+1 days, Romain/Guillaume)",
              "US19 — Datafactory to automate import and continuous synchronization of data from external sources (2 days, Guillaume)"
            ],
            "title": "Product Backlog (Scrum)"
          },
          {
            "type": "bullets",
            "items": [
              "20 test classes covering unit and integration scenarios (TestLeadsCRUD, TestComptesImport, TestOpportunites, TestRunAsUser, TestSuppressionRGPD...), minimum required coverage: ≥75%",
              "Systematic bulkification: no SOQL query or DML statement inside a loop, collections used throughout (List/Set/Map)",
              "One trigger per object, business logic delegated to handler classes — \"One Trigger Framework\" + Service Layer pattern",
              "Configuration externalized via Custom Settings / Custom Metadata instead of hardcoding",
              "Async processing matched to the use case: Batch Apex (large volumes), Queueable Apex (sequencing), Future Methods (external calls), Scheduled Apex (periodic jobs)",
              "Security: systematic with sharing, CRUD/FLS checks in data-access methods"
            ],
            "title": "Test Plan & Apex Best Practices"
          },
          {
            "type": "bullets",
            "items": [
              "3 evolutions identified: E1 two-way interface with the CaseIn request-management tool, E2 automatic daily backup to a dedicated SFTP server, E3 Dev Org configuration hardening (profiles, access rights, run as user)",
              "3 fixes: C1 account sync with the external system via SIREN Webservice, C2 standardized opportunity naming format, C3 immediate notification to the rep on lead assignment",
              "3 production bugs tracked and prioritized: broken lead → opportunity conversion (B001, high priority), incorrect imported account data (B002), lead-assignment notifications not sending (B003, fixed)",
              "Kanban tracking with To Do / In Progress / In Testing / Done columns and WIP limits, documentation centralized in Notion with dynamic links between the product backlog, test plan and evolutions backlog"
            ],
            "title": "Post-Pilot Kanban Backlog"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Lightning — field business application (App Builder, configuration)",
              "Apex — triggers, handlers, service classes, Batch/Queueable/Future/Scheduled Apex",
              "API integrations — SIREN Webservice, DeviQo API (real-time quotes), Datafactory",
              "Scrum (Trello) — product backlog and sprints; Kanban (Notion) — evolutions management",
              "Test plan — 20 test classes, ≥75% coverage"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Framing & team",
                "description": "Defined objectives, business stakes and the technical team (senior/mid-level/junior) with role split"
              },
              {
                "label": "Product backlog",
                "description": "Wrote 20 prioritized, costed user stories with acceptance criteria and prerequisites for each"
              },
              {
                "label": "Test plan",
                "description": "Defined 20 test classes, documented an Apex best-practices reference (bulkification, triggers, async, security)"
              },
              {
                "label": "Development sprints",
                "description": "Iterative implementation in 2-week sprints, tracked via Trello (Backlog → In Sprint → Pending Validation → Done)"
              },
              {
                "label": "3-month pilot",
                "description": "Deployed to South-zone field teams, production bugs reported (B001-B003)"
              },
              {
                "label": "Audit & Kanban backlog",
                "description": "Post-audit evolution and fix requests consolidated into a prioritized Kanban backlog (E1-E3, C1-C3)"
              }
            ],
            "title": "Project Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "OpenClassrooms jury",
                "label": "Skills validated",
                "value": "4/4"
              },
              {
                "note": "Costed and prioritized",
                "label": "User stories",
                "value": "20"
              },
              {
                "note": "≥75% coverage required",
                "label": "Test classes",
                "value": "20"
              },
              {
                "note": "South zone — real field feedback",
                "label": "Pilot duration",
                "value": "3 months"
              }
            ],
            "title": "Results"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf",
                "label": "Implementation strategy & product backlog (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-initial.xlsx",
                "label": "Initial backlog (XLSX)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/test-workbook.xlsx",
                "label": "Test workbook (XLSX)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions-kanban.pdf",
                "label": "Kanban evolutions backlog (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/audit-report.pdf",
                "label": "Audit report (PDF)"
              }
            ],
            "title": "Deliverables"
          }
        ]
      },
      "fr": {
        "title": "Livraison d'application Lightning & backlog Agile (Avenir Télécom)",
        "heroSubtitle": "Création d'une application Lightning pour Avenir Télécom : backlog, tests et migration de l'interface CRM.",
        "sections": [
          {
            "body": "À la suite d'un audit interne, les équipes commerciales de la zone Sud d'Avenir Télécom avaient besoin d'une application Salesforce Lightning mieux alignée sur leurs usages quotidiens (gestion des leads, comptes, opportunités, devis). La mission couvrait la définition de la stratégie d'implémentation pour une petite équipe de 3 développeurs Salesforce — Romain (senior, Apex & intégrations API), Guillaume (confirmé, workflows & automatisations) et Hélène (junior, UI/UX, tests & documentation) — puis, après 3 mois de pilote terrain, la consolidation des retours en un backlog d'évolutions.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "US1 — Gestion des leads : création automatique via formulaire web, affectation par règles (secteur, potentiel) avec notification immédiate, conversion en compte/contact/opportunité sans perte de données (4 jours, Romain)",
              "US2/US11 — Comptes : vérification SIREN en temps réel via Webservice à la création, blocage et message d'erreur explicite en cas d'incohérence (4+2 jours, Romain)",
              "US4/US9 — Opportunités : intégration temps réel avec l'API DeviQo pour afficher les devis associés dans un bloc dédié, rafraîchissement automatique, affichage en moins de 2 secondes, sans stockage local (4+2 jours, Guillaume)",
              "US14/US15 — Génération d'un PDF de synthèse (fusion Opportunité/Compte/Contact) et envoi automatique par email au contact principal, archivage de l'envoi dans Salesforce (2+2 jours, Hélène)",
              "US13 — Conformité RGPD : job planifié supprimant les comptes/contacts inactifs depuis plus de 3 ans, avec journalisation d'audit (3 jours, Guillaume)",
              "US18/US20 — Sécurisation de la Dev Org : configuration des profils et droits d'accès, tests Apex utilisant « run as user » pour valider que chaque profil n'accède qu'aux données autorisées (2+1 jours, Romain/Guillaume)",
              "US19 — Datafactory pour automatiser l'import et la synchronisation continue des données depuis des sources externes (2 jours, Guillaume)"
            ],
            "title": "Backlog produit (Scrum)"
          },
          {
            "type": "bullets",
            "items": [
              "20 classes de test couvrant les scénarios unitaires et d'intégration (TestLeadsCRUD, TestComptesImport, TestOpportunites, TestRunAsUser, TestSuppressionRGPD...), couverture minimale exigée : ≥75%",
              "Bulkification systématique : aucune requête SOQL ni instruction DML dans une boucle, usage de collections (List/Set/Map)",
              "Un seul trigger par objet, logique métier déléguée à des classes handler — pattern « One Trigger Framework » + Service Layer",
              "Configuration externalisée via Custom Settings / Custom Metadata plutôt que du hardcoding",
              "Traitements asynchrones adaptés au cas d'usage : Batch Apex (gros volumes), Queueable Apex (séquencement), Future Methods (appels externes), Scheduled Apex (tâches périodiques)",
              "Sécurité : with sharing systématique, vérification CRUD/FLS dans les méthodes d'accès aux données"
            ],
            "title": "Cahier de tests & bonnes pratiques Apex"
          },
          {
            "type": "bullets",
            "items": [
              "3 évolutions identifiées : E1 interfaçage bidirectionnel avec l'outil de gestion des requêtes CaseIn, E2 backup quotidien automatique vers un serveur SFTP dédié, E3 durcissement de la configuration Dev Org (profils, droits, run as user)",
              "3 corrections : C1 synchronisation des comptes avec le système externe via Webservice SIREN, C2 format de nommage standardisé des opportunités, C3 notification immédiate au commercial lors de l'affectation d'un lead",
              "3 bugs de production tracés et priorisés : conversion lead → opportunité défaillante (B001, haute priorité), données de comptes importés incorrectes (B002), notifications d'affectation de leads non envoyées (B003, corrigé)",
              "Suivi Kanban avec colonnes À faire / En cours / En recette / Terminé et limites WIP, documentation centralisée sur Notion avec liens dynamiques entre backlog produit, cahier de tests et backlog d'évolutions"
            ],
            "title": "Backlog Kanban post-pilote"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Lightning — application métier terrain (App Builder, configuration)",
              "Apex — triggers, handlers, classes de service, Batch/Queueable/Future/Scheduled Apex",
              "Intégrations API — Webservice SIREN, API DeviQo (devis temps réel), Datafactory",
              "Scrum (Trello) — backlog produit et sprints ; Kanban (Notion) — gestion des évolutions",
              "Cahier de tests — 20 classes de test, couverture ≥75%"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Cadrage & équipe",
                "description": "Définition des objectifs, des enjeux métier et de l'équipe technique (senior/confirmé/junior) avec répartition des rôles"
              },
              {
                "label": "Backlog produit",
                "description": "Rédaction de 20 user stories priorisées et chiffrées, critères d'acceptation et prérequis pour chacune"
              },
              {
                "label": "Cahier de tests",
                "description": "20 classes de test définies, référentiel de bonnes pratiques Apex documenté (bulkification, triggers, asynchrone, sécurité)"
              },
              {
                "label": "Sprints de développement",
                "description": "Implémentation itérative en sprints de 2 semaines, suivi via Trello (Backlog → Sprint en cours → En attente de validation → Terminé)"
              },
              {
                "label": "Pilote 3 mois",
                "description": "Déploiement auprès des équipes terrain zone Sud, remontée de bugs de production (B001-B003)"
              },
              {
                "label": "Audit & backlog Kanban",
                "description": "Consolidation des demandes d'évolution et de correction post-audit en backlog Kanban priorisé (E1-E3, C1-C3)"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "4/4"
              },
              {
                "note": "Chiffrées et priorisées",
                "label": "User stories",
                "value": "20"
              },
              {
                "note": "Couverture ≥75% exigée",
                "label": "Classes de test",
                "value": "20"
              },
              {
                "note": "Zone Sud — retours terrain réels",
                "label": "Durée pilote",
                "value": "3 mois"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf",
                "label": "Stratégie d'implémentation & backlog produit (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-initial.xlsx",
                "label": "Backlog initial (XLSX)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/test-workbook.xlsx",
                "label": "Cahier de tests (XLSX)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions-kanban.pdf",
                "label": "Backlog d'évolutions Kanban (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/audit-report.pdf",
                "label": "Rapport d'audit (PDF)"
              }
            ],
            "title": "Livrables"
          }
        ]
      },
      "es": {
        "title": "Entrega de app Lightning y backlog (Avenir Télécom)",
        "heroSubtitle": "Entrega de una aplicación Lightning, estrategia de pruebas y mejoras continuas (Avenir Télécom)",
        "sections": [
          {
            "body": "Tras una auditoría interna, los equipos comerciales de la zona Sur de Avenir Télécom necesitaban una aplicación Salesforce Lightning mejor alineada con su uso diario (leads, cuentas, oportunidades, presupuestos). El encargo cubría la definición de la estrategia de implementación para un pequeño equipo de 3 desarrolladores Salesforce — Romain (senior, Apex e integraciones API), Guillaume (intermedio, workflows y automatizaciones) y Hélène (júnior, UI/UX, pruebas y documentación) — y, tras 3 meses de piloto en campo, la consolidación de los comentarios en un backlog de evoluciones.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "US1 — Gestión de leads: creación automática desde formulario web, asignación por reglas (sector, potencial) con notificación inmediata, conversión a cuenta/contacto/oportunidad sin pérdida de datos (4 días, Romain)",
              "US2/US11 — Cuentas: verificación del SIREN en tiempo real vía Webservice al crear la cuenta, bloqueo con mensaje de error explícito en caso de inconsistencia (4+2 días, Romain)",
              "US4/US9 — Oportunidades: integración en tiempo real con la API de DeviQo para mostrar los presupuestos asociados en un bloque dedicado, actualización automática, visualización en menos de 2 segundos, sin almacenamiento local (4+2 días, Guillaume)",
              "US14/US15 — Generación de un PDF de síntesis (combinando Oportunidad/Cuenta/Contacto) con envío automático por email al contacto principal, envío archivado en Salesforce (2+2 días, Hélène)",
              "US13 — Cumplimiento RGPD: job planificado que elimina cuentas/contactos inactivos desde hace más de 3 años, con registro de auditoría (3 días, Guillaume)",
              "US18/US20 — Refuerzo de seguridad de la Dev Org: configuración de perfiles y derechos de acceso, pruebas Apex con «run as user» para validar que cada perfil solo accede a los datos autorizados (2+1 días, Romain/Guillaume)",
              "US19 — Datafactory para automatizar la importación y sincronización continua de datos desde fuentes externas (2 días, Guillaume)"
            ],
            "title": "Backlog de producto (Scrum)"
          },
          {
            "type": "bullets",
            "items": [
              "20 clases de test que cubren escenarios unitarios y de integración (TestLeadsCRUD, TestComptesImport, TestOpportunites, TestRunAsUser, TestSuppressionRGPD...), cobertura mínima exigida: ≥75%",
              "Bulkificación sistemática: ninguna consulta SOQL ni instrucción DML dentro de un bucle, uso de colecciones (List/Set/Map)",
              "Un único trigger por objeto, lógica de negocio delegada a clases handler — patrón «One Trigger Framework» + Service Layer",
              "Configuración externalizada mediante Custom Settings / Custom Metadata en lugar de hardcoding",
              "Procesamiento asíncrono adaptado a cada caso: Batch Apex (grandes volúmenes), Queueable Apex (encadenado), Future Methods (llamadas externas), Scheduled Apex (tareas periódicas)",
              "Seguridad: with sharing sistemático, verificación CRUD/FLS en los métodos de acceso a datos"
            ],
            "title": "Cuaderno de pruebas y buenas prácticas Apex"
          },
          {
            "type": "bullets",
            "items": [
              "3 evoluciones identificadas: E1 interfaz bidireccional con la herramienta de gestión de solicitudes CaseIn, E2 backup diario automático a un servidor SFTP dedicado, E3 refuerzo de la configuración de la Dev Org (perfiles, derechos, run as user)",
              "3 correcciones: C1 sincronización de cuentas con el sistema externo vía Webservice de SIREN, C2 formato de nomenclatura estandarizado para las oportunidades, C3 notificación inmediata al comercial al asignar un lead",
              "3 bugs de producción registrados y priorizados: conversión lead → oportunidad fallida (B001, prioridad alta), datos de cuentas importadas incorrectos (B002), notificaciones de asignación de leads no enviadas (B003, corregido)",
              "Seguimiento Kanban con columnas Por hacer / En curso / En validación / Terminado y límites WIP, documentación centralizada en Notion con enlaces dinámicos entre el backlog de producto, el cuaderno de pruebas y el backlog de evoluciones"
            ],
            "title": "Backlog Kanban post-piloto"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Lightning — aplicación de negocio de campo (App Builder, configuración)",
              "Apex — triggers, handlers, clases de servicio, Batch/Queueable/Future/Scheduled Apex",
              "Integraciones API — Webservice de SIREN, API DeviQo (presupuestos en tiempo real), Datafactory",
              "Scrum (Trello) — backlog de producto y sprints; Kanban (Notion) — gestión de evoluciones",
              "Cuaderno de pruebas — 20 clases de test, cobertura ≥75%"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Enfoque y equipo",
                "description": "Definición de objetivos, retos de negocio y equipo técnico (senior/intermedio/júnior) con reparto de roles"
              },
              {
                "label": "Backlog de producto",
                "description": "Redacción de 20 user stories priorizadas y estimadas, con criterios de aceptación y prerrequisitos para cada una"
              },
              {
                "label": "Cuaderno de pruebas",
                "description": "Definición de 20 clases de test, catálogo de buenas prácticas Apex documentado (bulkificación, triggers, asíncrono, seguridad)"
              },
              {
                "label": "Sprints de desarrollo",
                "description": "Implementación iterativa en sprints de 2 semanas, seguimiento vía Trello (Backlog → Sprint en curso → Pendiente de validación → Terminado)"
              },
              {
                "label": "Piloto de 3 meses",
                "description": "Despliegue en los equipos de campo de la zona Sur, bugs de producción reportados (B001-B003)"
              },
              {
                "label": "Auditoría y backlog Kanban",
                "description": "Consolidación de las solicitudes de evolución y corrección post-auditoría en un backlog Kanban priorizado (E1-E3, C1-C3)"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Tribunal OpenClassrooms",
                "label": "Competencias validadas",
                "value": "4/4"
              },
              {
                "note": "Estimadas y priorizadas",
                "label": "User stories",
                "value": "20"
              },
              {
                "note": "Cobertura ≥75% exigida",
                "label": "Clases de test",
                "value": "20"
              },
              {
                "note": "Zona Sur — feedback real de campo",
                "label": "Duración del piloto",
                "value": "3 meses"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf",
                "label": "Estrategia de implementación y backlog de producto (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-initial.xlsx",
                "label": "Backlog inicial (XLSX)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/test-workbook.xlsx",
                "label": "Cuaderno de pruebas (XLSX)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions-kanban.pdf",
                "label": "Backlog de evoluciones Kanban (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/audit-report.pdf",
                "label": "Informe de auditoría (PDF)"
              }
            ],
            "title": "Entregables"
          }
        ]
      }
    }
  },
  {
    "slug": "digit-learning-salesforce-update",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/digit-learning-salesforce-update/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/digit-learning-salesforce-update/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/digit-learning-salesforce-update/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/digit-learning-salesforce-update/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/digit-learning-salesforce-update/screenshot-4.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Salesforce application update (Digit Learning)",
        "heroSubtitle": "Audit and update of the Digit Learning Salesforce application to meet sales team requirements.",
        "sections": [
          {
            "body": "Digit Learning, an online professional training school, had been using Salesforce for about 2 years with dedicated business objects (Student, Mentor, Training). Project manager Jeanne Pierron requested an internal quality audit followed by a modernization plan. The audit's central finding: the data model only allowed a student to be linked to a single training at a time — a blocking limitation for both sales and pedagogical tracking, flagged by both sales reps and management.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Rigid data model: a student can only be linked to a single training — the audit's central finding",
              "Time-consuming manual processes: enrollment and mentor assignment took over 30 minutes per student, with no automation",
              "No structured tracking of former clients to assess satisfaction and encourage loyalty",
              "Insufficient reports and metrics: sales reps and management had no reliable visibility for decision-making"
            ],
            "title": "Audit Findings"
          },
          {
            "type": "bullets",
            "items": [
              "New Purchased Training junction object (master-detail to Student and Training): start/end dates, type and price — lifts the \"one training per student\" limitation and enables multiple enrollments",
              "Existing objects enriched: Student (training history, active-client/former-client status), Mentor (availability), Training (available seats, maximum headcount)",
              "Automated enrollment and mentor assignment, recommended by the audit and implemented to reduce sales reps' manual workload",
              "Structured former-client tracking and a periodic review process for training relevance set up"
            ],
            "title": "Data Model & Automation"
          },
          {
            "type": "bullets",
            "items": [
              "Training availability report — real-time visibility on remaining capacity",
              "Students grouped by status and mentor report — portfolio tracking for sales reps",
              "Prospect → active client conversion rate comparison report — commercial performance tracking for management"
            ],
            "title": "Reports Delivered"
          },
          {
            "type": "bullets",
            "items": [
              "Mentor assignment + training enrollment: from over 30 min to 5 min per student — automation frees up time for higher-value work",
              "Former-client tracking: from over 15 min to 10 min — actionable data to improve training quality and win back alumni",
              "Training catalog management and review: from over 30 min to 15 min — program relevance maintained over time"
            ],
            "title": "Measured Impact"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — custom objects, master-detail relationships, roll-up summaries",
              "Workbench — app deployment via zip package (Migration > Deploy)",
              "Data Loader — import and migration of existing data (students, mentors, trainings)",
              "Reports & Dashboards — sales and management tracking"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Internal quality audit",
                "description": "Interviews with key users, central finding: a student can only be linked to a single training"
              },
              {
                "label": "Recommendations",
                "description": "Action plan: data model overhaul, automation, former-client tracking, new reports"
              },
              {
                "label": "Data model",
                "description": "Built the Purchased Training junction object, master-detail to Student and Training"
              },
              {
                "label": "Automation & reporting",
                "description": "Automated enrollment/mentor assignment, built the 3 management reports"
              },
              {
                "label": "Deployment & import",
                "description": "Deployed via Workbench, migrated existing data via Data Loader"
              },
              {
                "label": "Impact analysis",
                "description": "Qualitative and quantitative analysis of time saved per process — presented to jury"
              }
            ],
            "title": "Project Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "OpenClassrooms jury",
                "label": "Skills validated",
                "value": "5/5"
              },
              {
                "note": "Per student",
                "label": "Mentor assignment + enrollment",
                "value": "30 → 5 min"
              },
              {
                "note": "Per contact",
                "label": "Former-client tracking",
                "value": "15 → 10 min"
              },
              {
                "note": "Per review",
                "label": "Training catalog management",
                "value": "30 → 15 min"
              }
            ],
            "title": "Results"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/digit-learning-salesforce-update/audit-report.docx",
                "label": "Quality audit report (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/analysis-report.docx",
                "label": "Qualitative and quantitative analysis (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/interview-notes.pdf",
                "label": "Interview notes (PDF)"
              }
            ],
            "title": "Deliverables"
          }
        ]
      },
      "fr": {
        "title": "Mise à jour de l'application Salesforce (Digit Learning)",
        "heroSubtitle": "Audit et mise à jour de l'application Salesforce Digit Learning pour répondre aux besoins des commerciaux.",
        "sections": [
          {
            "body": "Digit Learning, école en ligne de formation professionnelle, utilisait Salesforce depuis environ 2 ans avec des objets métier dédiés (Étudiant, Mentor, Formation). Jeanne Pierron, cheffe de projet, a commandé un audit qualité interne suivi d'un plan de modernisation. Le constat central de l'audit : le modèle de données ne permettait à un étudiant d'être associé qu'à une seule formation à la fois — une limitation bloquante pour le suivi commercial et pédagogique, remontée aussi bien par les commerciaux que par la direction.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Modèle de données rigide : un étudiant ne peut être associé qu'à une seule formation — constat central de l'audit qualité",
              "Processus manuels chronophages : inscription aux formations et attribution des mentors prenaient plus de 30 minutes par étudiant, sans automatisation",
              "Aucun suivi structuré des anciens clients pour évaluer leur satisfaction et encourager leur fidélisation",
              "Rapports et métriques insuffisants : commerciaux et direction sans visibilité fiable pour la prise de décision"
            ],
            "title": "Constats de l'audit"
          },
          {
            "type": "bullets",
            "items": [
              "Nouvel objet de jonction Formation Achetée (master-detail vers Étudiant et Formation) : dates de début/fin, type et prix — lève la limitation « une seule formation par étudiant » et permet les multi-inscriptions",
              "Objets existants enrichis : Étudiant (historique de formations, statut client actif/ancien client), Mentor (disponibilité), Formation (places disponibles, effectif maximum)",
              "Automatisation de l'inscription aux formations et de l'attribution des mentors, recommandée par l'audit et implémentée pour réduire la charge manuelle des commerciaux",
              "Mise en place d'un suivi structuré des anciens clients et d'un processus de révision périodique de la pertinence des formations"
            ],
            "title": "Modèle de données & automatisation"
          },
          {
            "type": "bullets",
            "items": [
              "Rapport des formations avec places disponibles — visibilité en temps réel sur la capacité restante",
              "Rapport groupant les étudiants par statut et par mentor — suivi de portefeuille pour les commerciaux",
              "Rapport comparatif du taux de transformation prospect → client actif — pilotage de la performance commerciale pour la direction"
            ],
            "title": "Rapports livrés"
          },
          {
            "type": "bullets",
            "items": [
              "Attribution de mentor + inscription à une formation : de plus de 30 min à 5 min par étudiant — l'automatisation libère du temps pour les activités à forte valeur ajoutée",
              "Suivi des anciens clients : de plus de 15 min à 10 min — données exploitables pour améliorer la qualité des formations et le retour des anciens clients",
              "Gestion et révision du catalogue de formations : de plus de 30 min à 15 min — pertinence des programmes maintenue dans la durée"
            ],
            "title": "Impact mesuré"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — objets personnalisés, relations master-detail, roll-up summaries",
              "Workbench — déploiement de l'application via package zip (Migration > Deploy)",
              "Data Loader — import et migration des données existantes (étudiants, mentors, formations)",
              "Reports & Dashboards — pilotage commercial et direction"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Audit qualité interne",
                "description": "Entretiens avec les utilisateurs clés, constat central : un étudiant ne peut être associé qu'à une seule formation"
              },
              {
                "label": "Recommandations",
                "description": "Plan d'action : refonte du modèle de données, automatisation, suivi des anciens clients, nouveaux rapports"
              },
              {
                "label": "Modèle de données",
                "description": "Création de l'objet de jonction Formation Achetée en master-detail vers Étudiant et Formation"
              },
              {
                "label": "Automatisation & reporting",
                "description": "Automatisation de l'inscription/attribution de mentors, création des 3 rapports de pilotage"
              },
              {
                "label": "Déploiement & import",
                "description": "Déploiement via Workbench, migration des données existantes via Data Loader"
              },
              {
                "label": "Analyse d'impact",
                "description": "Analyse qualitative et quantitative du gain de temps par processus — soutenance devant jury"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "5/5"
              },
              {
                "note": "Par étudiant",
                "label": "Attribution mentor + inscription",
                "value": "30 → 5 min"
              },
              {
                "note": "Par contact",
                "label": "Suivi anciens clients",
                "value": "15 → 10 min"
              },
              {
                "note": "Par révision",
                "label": "Gestion catalogue formations",
                "value": "30 → 15 min"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/digit-learning-salesforce-update/audit-report.docx",
                "label": "Rapport d'audit qualité (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/analysis-report.docx",
                "label": "Analyse qualitative et quantitative (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/interview-notes.pdf",
                "label": "Notes des entretiens (PDF)"
              }
            ],
            "title": "Livrables"
          }
        ]
      },
      "es": {
        "title": "Actualización de la aplicación Salesforce (Digit Learning)",
        "heroSubtitle": "Auditoría y modernización de una org Salesforce para una escuela en línea: rediseño del modelo de datos, automatizaciones (Flows) y reporting.",
        "sections": [
          {
            "body": "Digit Learning, escuela en línea de formación profesional, llevaba unos 2 años usando Salesforce con objetos de negocio dedicados (Estudiante, Mentor, Formación). Jeanne Pierron, jefa de proyecto, encargó una auditoría de calidad interna seguida de un plan de modernización. El hallazgo central de la auditoría: el modelo de datos solo permitía vincular a un estudiante con una única formación a la vez — una limitación bloqueante tanto para el seguimiento comercial como pedagógico, señalada tanto por los comerciales como por la dirección.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "Modelo de datos rígido: un estudiante solo puede vincularse a una única formación — hallazgo central de la auditoría de calidad",
              "Procesos manuales que consumían tiempo: la inscripción a formaciones y la asignación de mentores llevaban más de 30 minutos por estudiante, sin automatización",
              "Ningún seguimiento estructurado de antiguos clientes para evaluar su satisfacción y fomentar la fidelización",
              "Informes y métricas insuficientes: comerciales y dirección sin visibilidad fiable para la toma de decisiones"
            ],
            "title": "Hallazgos de la auditoría"
          },
          {
            "type": "bullets",
            "items": [
              "Nuevo objeto de unión Formación Comprada (master-detail hacia Estudiante y Formación): fechas de inicio/fin, tipo y precio — elimina la limitación de «una sola formación por estudiante» y permite varias inscripciones",
              "Objetos existentes enriquecidos: Estudiante (historial de formaciones, estado cliente activo/antiguo cliente), Mentor (disponibilidad), Formación (plazas disponibles, aforo máximo)",
              "Automatización de la inscripción a formaciones y de la asignación de mentores, recomendada por la auditoría e implementada para reducir la carga manual de los comerciales",
              "Puesta en marcha de un seguimiento estructurado de antiguos clientes y de un proceso de revisión periódica de la pertinencia de las formaciones"
            ],
            "title": "Modelo de datos y automatización"
          },
          {
            "type": "bullets",
            "items": [
              "Informe de formaciones con plazas disponibles — visibilidad en tiempo real de la capacidad restante",
              "Informe de estudiantes agrupados por estado y por mentor — seguimiento de cartera para los comerciales",
              "Informe comparativo de la tasa de conversión prospecto → cliente activo — seguimiento del rendimiento comercial para la dirección"
            ],
            "title": "Informes entregados"
          },
          {
            "type": "bullets",
            "items": [
              "Asignación de mentor + inscripción a una formación: de más de 30 min a 5 min por estudiante — la automatización libera tiempo para actividades de mayor valor añadido",
              "Seguimiento de antiguos clientes: de más de 15 min a 10 min — datos útiles para mejorar la calidad de las formaciones y el retorno de antiguos alumnos",
              "Gestión y revisión del catálogo de formaciones: de más de 30 min a 15 min — pertinencia de los programas mantenida en el tiempo"
            ],
            "title": "Impacto medido"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — objetos personalizados, relaciones master-detail, roll-up summaries",
              "Workbench — despliegue de la aplicación mediante paquete zip (Migration > Deploy)",
              "Data Loader — importación y migración de datos existentes (estudiantes, mentores, formaciones)",
              "Reports & Dashboards — seguimiento comercial y de dirección"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Auditoría de calidad interna",
                "description": "Entrevistas con usuarios clave, hallazgo central: un estudiante solo puede vincularse a una única formación"
              },
              {
                "label": "Recomendaciones",
                "description": "Plan de acción: rediseño del modelo de datos, automatización, seguimiento de antiguos clientes, nuevos informes"
              },
              {
                "label": "Modelo de datos",
                "description": "Creación del objeto de unión Formación Comprada en master-detail hacia Estudiante y Formación"
              },
              {
                "label": "Automatización e informes",
                "description": "Automatización de la inscripción/asignación de mentores, creación de los 3 informes de seguimiento"
              },
              {
                "label": "Despliegue e importación",
                "description": "Despliegue vía Workbench, migración de datos existentes vía Data Loader"
              },
              {
                "label": "Análisis de impacto",
                "description": "Análisis cualitativo y cuantitativo del tiempo ahorrado por proceso — defensa ante el tribunal"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Tribunal OpenClassrooms",
                "label": "Competencias validadas",
                "value": "5/5"
              },
              {
                "note": "Por estudiante",
                "label": "Asignación mentor + inscripción",
                "value": "30 → 5 min"
              },
              {
                "note": "Por contacto",
                "label": "Seguimiento de antiguos clientes",
                "value": "15 → 10 min"
              },
              {
                "note": "Por revisión",
                "label": "Gestión del catálogo de formaciones",
                "value": "30 → 15 min"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/digit-learning-salesforce-update/audit-report.docx",
                "label": "Informe de auditoría de calidad (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/analysis-report.docx",
                "label": "Análisis cualitativo y cuantitativo (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/interview-notes.pdf",
                "label": "Notas de las entrevistas (PDF)"
              }
            ],
            "title": "Entregables"
          }
        ]
      }
    }
  },
  {
    "slug": "tours-for-life-salesforce-solution",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/tours-for-life-salesforce-solution/screenshot-15.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Salesforce solution design (Tours For Life)",
        "heroSubtitle": "Implementation of a complete Salesforce solution for Tours For Life, a growing travel agency.",
        "sections": [
          {
            "body": "Tours for Life, a fast-growing travel agency, wanted to digitize its commercial management end-to-end. President Philippe Bouvet needed a Salesforce CRM covering the full cycle: prospect acquisition, conversion to travelers, trip management, and sales performance tracking by zone (North/South). An additional need surfaced during scoping: managing the bus fleet directly in Salesforce, since a single bus can be assigned to several trips.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Prospect: standard Lead object, tab renamed \"Prospect\" (First/Last Name, required Phone, Email, Status)",
              "Traveler: Account object with Person Accounts enabled, tab renamed \"Traveler\". Dedicated Record Type (\"Account to Traveler\") to allow converting a prospect to a traveler even without an associated business account",
              "Trip (new object): destination, departure/arrival locations, price, status, available seats — the catalog of offered trips",
              "Purchased Trip (new object, distinct from Trip): links to Traveler and Trip, luggage count, seats purchased, bus number — represents an actual booking",
              "Bus Fleet (new object): bus number, capacity, lookup field to Trip — a single bus can be linked to several trips"
            ],
            "title": "Data Model"
          },
          {
            "type": "bullets",
            "items": [
              "2 profiles: Sales Director (full access to all objects and fields), Sales Rep (create/edit prospects and convert them to travelers, view travelers and purchased trips)",
              "3 hierarchical roles: Sales Management, North Sales Rep, South Sales Rep — management sees both teams' data",
              "Per-object OWD: Private on Prospect/Trip, Public Read-Only on Bus Fleet, Controlled by Parent on Purchased Trip",
              "Sharing Rules by role (North/South) on Prospect and Trip to keep sales territories separate while retaining read-only visibility on the other zone's travelers"
            ],
            "title": "Security & Visibility"
          },
          {
            "type": "bullets",
            "items": [
              "Record-triggered Flow #1: confirmation email automatically sent to the prospect when their status changes from \"information gathered\" to \"interested\"",
              "Record-triggered Flow #2: automatic decrement of the \"Available Seats\" field on the Trip whenever a related Purchased Trip is created or updated",
              "Phone number made required on Prospect and Traveler to improve sales data reliability",
              "Automation built entirely no-code (Flow Builder), with no Apex"
            ],
            "title": "Automation (Flow)"
          },
          {
            "type": "bullets",
            "items": [
              "\"Available Trips\" report: filtered on Status = Open, with totals (cumulative price, available seats) — 17 active trips at demo time",
              "\"Prospects to Travelers\" report: conversion tracking by sales rep and role, with conversion date and linked opportunity",
              "\"Trips Purchased per Sales Rep\" report: performance stats grouped by role (North/South Sales Rep, Sales Management)",
              "Reports accessible directly from the Salesforce home page for day-to-day tracking"
            ],
            "title": "Reports & Dashboards"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Sales Cloud — full commercial CRM",
              "Person Accounts — managing travelers as individuals",
              "Salesforce Flow — no-code automation (Record-Triggered Flow)",
              "Custom Objects & Fields — Trip, Purchased Trip, Bus Fleet",
              "Profiles, Roles & Sharing Rules — security and visibility by sales zone",
              "Reports & Dashboards — real-time commercial tracking"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Scoping",
                "description": "Requirements gathered with Philippe Bouvet; bus fleet management need added during scoping"
              },
              {
                "label": "Data model",
                "description": "Person Accounts enabled, Trip, Purchased Trip and Bus Fleet objects created with their relationships"
              },
              {
                "label": "Security",
                "description": "Configured 2 profiles, 3 hierarchical roles, per-object OWD and Sharing Rules by zone (North/South)"
              },
              {
                "label": "Automation",
                "description": "Built the 2 record-triggered Flows: confirmation email and available-seats decrement"
              },
              {
                "label": "Reporting",
                "description": "Built sales reports (available trips, conversions, performance per sales rep)"
              },
              {
                "label": "Defense",
                "description": "Full demonstration on sandbox — solution validated by jury"
              }
            ],
            "title": "Project Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "OpenClassrooms jury",
                "label": "Skills validated",
                "value": "4/4"
              },
              {
                "note": "Traveler (Person Account), Trip, Purchased Trip, Bus Fleet",
                "label": "Business objects designed",
                "value": "4"
              },
              {
                "note": "Management + North/South Sales Rep",
                "label": "Hierarchical roles",
                "value": "3"
              },
              {
                "note": "No Apex code",
                "label": "Flow automations",
                "value": "2"
              }
            ],
            "title": "Results"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
                "label": "Detailed specifications (PDF)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/presentation.pptx",
                "label": "Solution presentation (PPTX)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/data-model.png",
                "label": "Data model (PNG)"
              }
            ],
            "title": "Deliverables"
          }
        ]
      },
      "fr": {
        "title": "Conception de solution Salesforce (Tours For Life)",
        "heroSubtitle": "Implémentation d'une solution Salesforce complète pour Tours For Life, agence de voyages en croissance.",
        "sections": [
          {
            "body": "Tours for Life, agence de voyages en pleine croissance, souhaitait digitaliser sa gestion commerciale de bout en bout. Philippe Bouvet, le président, avait besoin d'un CRM Salesforce couvrant le cycle complet : acquisition de prospects, conversion en voyageurs, gestion des voyages, et suivi des performances commerciales par zone (Nord/Sud). Un besoin complémentaire est apparu en cours de cadrage : gérer la flotte de bus directement dans Salesforce, un même bus pouvant être affecté à plusieurs voyages.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Prospect : objet standard Lead, onglet renommé « Prospect » (Nom, Prénom, Téléphone obligatoire, Email, Statut)",
              "Voyageur : objet Account avec Person Accounts activé, onglet renommé « Voyageur ». Record Type dédié (« Account to Voyageur ») pour permettre la conversion d'un prospect en voyageur même sans compte entreprise associé",
              "Voyage (nouvel objet) : destination, lieux de départ/arrivée, prix, statut, nombre de places disponibles — catalogue des voyages proposés",
              "Voyage Acheté (nouvel objet distinct du Voyage) : lien vers le Voyageur et le Voyage, nombre de bagages, nombre de places achetées, numéro de bus — représente une réservation effective",
              "Flotte de bus (nouvel objet) : numéro du bus, capacité, champ lookup vers Voyage — un même bus peut être relié à plusieurs voyages"
            ],
            "title": "Modèle de données"
          },
          {
            "type": "bullets",
            "items": [
              "2 profils : Directeur Commercial (accès complet à tous les objets et champs), Commercial (créer/modifier des prospects et les convertir en voyageurs, consulter voyageurs et voyages achetés)",
              "3 rôles hiérarchiques : Direction Commerciale, Commerciale Nord, Commerciale Sud — la direction voit les données des deux équipes",
              "OWD différenciés par objet : Private sur Prospect/Voyage, Public Read-Only sur Flotte de bus, Controlled by Parent sur Voyage Acheté",
              "Sharing Rules par rôle (Nord/Sud) sur Prospect et Voyage pour cloisonner les portefeuilles commerciaux tout en gardant une visibilité en lecture seule sur les voyageurs de l'autre zone"
            ],
            "title": "Sécurité & visibilité"
          },
          {
            "type": "bullets",
            "items": [
              "Flow record-triggered n°1 : email de confirmation envoyé automatiquement au prospect lorsque son statut passe de « prise d'information » à « intéressé(e) »",
              "Flow record-triggered n°2 : décrémentation automatique du champ « Nombre de places disponibles » sur le Voyage à chaque création ou modification d'un Voyage Acheté associé",
              "Champ téléphone rendu obligatoire sur Prospect et Voyageur pour fiabiliser le suivi commercial",
              "Automatisations réalisées entièrement en no-code (Flow Builder), sans code Apex"
            ],
            "title": "Automatisations (Flow)"
          },
          {
            "type": "bullets",
            "items": [
              "Rapport « Voyages disponibles » : filtré sur Statut = Ouvert, avec totaux (prix cumulé, places disponibles) — 17 voyages actifs au moment de la démonstration",
              "Rapport « Prospects vers voyageurs » : suivi des conversions par commercial et par rôle, avec date de conversion et opportunité liée",
              "Rapport « Nombre de voyages achetés par commercial » : statistiques de performance groupées par rôle (Commerciale Nord/Sud, Direction Commerciale)",
              "Rapports accessibles directement depuis la page d'accueil Salesforce pour un pilotage quotidien"
            ],
            "title": "Rapports & tableaux de bord"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Sales Cloud — CRM commercial complet",
              "Person Accounts — gestion des voyageurs comme particuliers",
              "Salesforce Flow — automatisation no-code (Record-Triggered Flow)",
              "Custom Objects & Fields — Voyage, Voyage Acheté, Flotte de bus",
              "Profiles, Roles & Sharing Rules — sécurité et visibilité par zone commerciale",
              "Reports & Dashboards — pilotage commercial en temps réel"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Cadrage",
                "description": "Recueil des besoins avec Philippe Bouvet, ajout du besoin de gestion de flotte de bus en cours de cadrage"
              },
              {
                "label": "Modèle de données",
                "description": "Activation des Person Accounts, création des objets Voyage, Voyage Acheté et Flotte de bus avec leurs relations"
              },
              {
                "label": "Sécurité",
                "description": "Configuration des 2 profils, 3 rôles hiérarchiques, OWD par objet et Sharing Rules par zone (Nord/Sud)"
              },
              {
                "label": "Automatisation",
                "description": "Développement des 2 Flows record-triggered : email de confirmation et décrémentation des places disponibles"
              },
              {
                "label": "Reporting",
                "description": "Création des rapports commerciaux (voyages disponibles, conversions, performance par commercial)"
              },
              {
                "label": "Soutenance",
                "description": "Démonstration complète sur sandbox — solution validée par le jury"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "4/4"
              },
              {
                "note": "Voyageur (Person Account), Voyage, Voyage Acheté, Flotte de bus",
                "label": "Objets métier conçus",
                "value": "4"
              },
              {
                "note": "Direction + Commerciale Nord/Sud",
                "label": "Rôles hiérarchiques",
                "value": "3"
              },
              {
                "note": "Sans code Apex",
                "label": "Automatisations Flow",
                "value": "2"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
                "label": "Spécifications détaillées (PDF)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/presentation.pptx",
                "label": "Présentation de la solution (PPTX)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/data-model.png",
                "label": "Modèle de données (PNG)"
              }
            ],
            "title": "Livrables"
          }
        ]
      },
      "es": {
        "title": "Diseño de solución Salesforce (Tours For Life)",
        "heroSubtitle": "Diseño de una solución Salesforce (Tours For Life)",
        "sections": [
          {
            "body": "Tours for Life, una agencia de viajes en pleno crecimiento, quería digitalizar su gestión comercial de principio a fin. Philippe Bouvet, el presidente, necesitaba un CRM Salesforce que cubriera el ciclo completo: captación de prospectos, conversión en viajeros, gestión de los viajes y seguimiento del rendimiento comercial por zona (Norte/Sur). Durante el encuadre surgió una necesidad adicional: gestionar la flota de autobuses directamente en Salesforce, ya que un mismo autobús puede asignarse a varios viajes.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "Prospecto: objeto estándar Lead, pestaña renombrada «Prospecto» (Nombre, Apellidos, Teléfono obligatorio, Email, Estado)",
              "Viajero: objeto Account con Person Accounts activado, pestaña renombrada «Viajero». Record Type dedicado («Account to Viajero») para poder convertir un prospecto en viajero incluso sin una cuenta de empresa asociada",
              "Viaje (objeto nuevo): destino, lugares de salida/llegada, precio, estado, plazas disponibles — catálogo de viajes ofrecidos",
              "Viaje Comprado (objeto nuevo, distinto de Viaje): vinculado al Viajero y al Viaje, número de maletas, plazas compradas, número de autobús — representa una reserva efectiva",
              "Flota de autobuses (objeto nuevo): número del autobús, capacidad, campo lookup hacia Viaje — un mismo autobús puede vincularse a varios viajes"
            ],
            "title": "Modelo de datos"
          },
          {
            "type": "bullets",
            "items": [
              "2 perfiles: Director Comercial (acceso completo a todos los objetos y campos), Comercial (crear/modificar prospectos y convertirlos en viajeros, consultar viajeros y viajes comprados)",
              "3 roles jerárquicos: Dirección Comercial, Comercial Norte, Comercial Sur — la dirección ve los datos de ambos equipos",
              "OWD diferenciado por objeto: Private en Prospecto/Viaje, Public Read-Only en Flota de autobuses, Controlled by Parent en Viaje Comprado",
              "Sharing Rules por rol (Norte/Sur) en Prospecto y Viaje para separar las carteras comerciales, manteniendo visibilidad de solo lectura sobre los viajeros de la otra zona",
              "Con perspectiva, un enfoque más escalable consistiría en mantener un único perfil «Comercial» y otorgar los permisos de director mediante un Permission Set, reduciendo el mantenimiento a largo plazo"
            ],
            "title": "Seguridad y visibilidad"
          },
          {
            "type": "bullets",
            "items": [
              "Flow record-triggered nº1: email de confirmación enviado automáticamente al prospecto cuando su estado pasa de «información recabada» a «interesado/a»",
              "Flow record-triggered nº2: decremento automático del campo «Plazas disponibles» del Viaje cada vez que se crea o modifica un Viaje Comprado asociado",
              "Campo teléfono obligatorio en Prospecto y Viajero para fiabilizar el seguimiento comercial",
              "Automatización construida enteramente sin código (Flow Builder), sin Apex"
            ],
            "title": "Automatización (Flow)"
          },
          {
            "type": "bullets",
            "items": [
              "Informe «Viajes disponibles»: filtrado por Estado = Abierto, con totales (precio acumulado, plazas disponibles) — 17 viajes activos en el momento de la demo",
              "Informe «Prospectos a viajeros»: seguimiento de conversiones por comercial y rol, con fecha de conversión y oportunidad vinculada",
              "Informe «Viajes comprados por comercial»: estadísticas de rendimiento agrupadas por rol (Comercial Norte/Sur, Dirección Comercial)",
              "Informes accesibles directamente desde la página de inicio de Salesforce para el seguimiento diario"
            ],
            "title": "Informes y paneles de control"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Sales Cloud — CRM comercial completo",
              "Person Accounts — gestión de los viajeros como particulares",
              "Salesforce Flow — automatización sin código (Record-Triggered Flow)",
              "Custom Objects & Fields — Viaje, Viaje Comprado, Flota de autobuses",
              "Profiles, Roles & Sharing Rules — seguridad y visibilidad por zona comercial",
              "Reports & Dashboards — seguimiento comercial en tiempo real"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Encuadre",
                "description": "Recogida de requisitos con Philippe Bouvet; se añade la necesidad de gestión de flota durante el encuadre"
              },
              {
                "label": "Modelo de datos",
                "description": "Activación de Person Accounts, creación de los objetos Viaje, Viaje Comprado y Flota de autobuses con sus relaciones"
              },
              {
                "label": "Seguridad",
                "description": "Configuración de 2 perfiles, 3 roles jerárquicos, OWD por objeto y Sharing Rules por zona (Norte/Sur)"
              },
              {
                "label": "Automatización",
                "description": "Desarrollo de los 2 Flows record-triggered: email de confirmación y decremento de plazas disponibles"
              },
              {
                "label": "Informes",
                "description": "Creación de los informes comerciales (viajes disponibles, conversiones, rendimiento por comercial)"
              },
              {
                "label": "Defensa",
                "description": "Demostración completa en sandbox — solución validada por el tribunal"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Tribunal OpenClassrooms",
                "label": "Competencias validadas",
                "value": "4/4"
              },
              {
                "note": "Viajero (Person Account), Viaje, Viaje Comprado, Flota de autobuses",
                "label": "Objetos de negocio diseñados",
                "value": "4"
              },
              {
                "note": "Dirección + Comercial Norte/Sur",
                "label": "Roles jerárquicos",
                "value": "3"
              },
              {
                "note": "Sin código Apex",
                "label": "Automatizaciones Flow",
                "value": "2"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
                "label": "Especificaciones detalladas (PDF)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/presentation.pptx",
                "label": "Presentación de la solución (PPTX)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/data-model.png",
                "label": "Modelo de datos (PNG)"
              }
            ],
            "title": "Entregables"
          }
        ]
      }
    }
  },
  {
    "slug": "idemconnect-apex-backend",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/idemconnect-apex-backend/screenshot-16.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Apex backend development (iDEM Connect)",
        "heroSubtitle": "Development of an Apex backend for iDEM Connect: trigger, service classes and batch scheduler.",
        "sections": [
          {
            "body": "iDEM Connect is an international internet service provider (€1.8B revenue, 3,950 employees). Need: a full Apex backend to equip the sales force on Salesforce — managing accounts, contracts, and orders, with three precise business rules to implement and a strict test coverage requirement. Mission: design the architecture (trigger, handlers, batch, scheduler), implement it, and deliver complete technical documentation (per-class fact sheets, requirements-to-tests traceability matrix).",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "RG-01 — Block activating an Order with no OrderItem: the Draft → Activated transition is intercepted on OrderTrigger.before update, with an aggregate SOQL count of OrderItem per Order, and a blocking addError() when the count is zero",
              "RG-02 — Keep Account.Active__c in sync with order existence: true on Order insert (after insert), false only when the account's last remaining Order is deleted (after delete) — handled by two dedicated handlers, never in the trigger itself",
              "RG-03 — Automatic re-engagement of dormant accounts: every 1st Monday of the month at 9am (CRON 0 0 9 ? * MON#1), a batch creates a J+5 \"Call\" Task for every Account with no Order and no existing Call (manual or automated)",
              "One-trigger-per-object architecture: OrderTrigger contains zero business logic, only orchestration to 3 dedicated handlers — bulk-safe by design"
            ],
            "title": "Business rules & architecture"
          },
          {
            "type": "bullets",
            "items": [
              "OrderValidationHandler — read-only, aggregate SOQL COUNT(OrderItem) grouped by OrderId, addError() on the Status field",
              "OrderInsertionHandler / OrderDeletionHandler — bulk Account.Active__c updates, secured with Security.stripInaccessible(UPDATABLE) before every update",
              "AccountReminderBatch (Database.Batchable) — SOQL anti-join (Accounts with no Order) at start(), \"Call\" Task deduplication via a GROUP BY WhatId aggregate at execute(), with a strict-deduplication mode toggled by a flag (DEDUPE_USING_AUTO_FLAG)",
              "AccountReminderScheduler (Schedulable) — triggers the batch on the monthly CRON, falling back to the running user if the account owner is inactive or missing",
              "AppConfig — centralizes every business constant (statuses, labels, follow-up delay): no magic values in the code, a single place to change behavior",
              "TestDataFactory — decoupled test data factory (generateX() with no DML / createX() with DML), reused across all 6 test classes"
            ],
            "title": "Solutions built"
          },
          {
            "type": "bullets",
            "items": [
              "WITH SECURITY_ENFORCED on the batch's anti-join query (simple query, eligible)",
              "On the deduplication aggregate, not eligible for WITH SECURITY_ENFORCED: explicit CRUD/FLS checks (Task.isAccessible(), access to the WhatId/Subject/Auto_Created__c fields) before running it",
              "Security.stripInaccessible(AccessType.CREATABLE) before every Task insert, (UPDATABLE) before every Account update — silently strips inaccessible fields instead of throwing",
              "Database.insert/update(..., allOrNone=false): resilient inserts with detailed logging of partial failures, instead of a full rollback over a single bad row",
              "Strict bulkification: no SOQL or DML inside a loop, everything via Set/Map and aggregates — validated by a test processing 250 accounts in a single transaction"
            ],
            "title": "Security & best practices"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, Handler pattern, Batchable, Schedulable",
              "SOQL — GROUP BY aggregates, anti-join, WITH SECURITY_ENFORCED",
              "Salesforce DX (sfdx force:source:deploy) — metadata deployment",
              "Apex Test Framework — TestDataFactory, Test.startTest/stopTest, per-class coverage",
              "Structured technical documentation — per-class fact sheets + requirements-to-tests traceability matrix"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Specifications",
                "description": "Analyzed the 3 business rules, designed the one-trigger-per-object architecture and the requirements-to-tests traceability matrix"
              },
              {
                "label": "Trigger & Handlers",
                "description": "Built OrderTrigger and the 3 dedicated handlers (validation, insertion, deletion), each tested in isolation"
              },
              {
                "label": "Batch & Scheduler",
                "description": "AccountReminderBatch (anti-join + configurable deduplication) and AccountReminderScheduler (monthly CRON), with a fallback to the running user when needed"
              },
              {
                "label": "Security",
                "description": "Systematically added WITH SECURITY_ENFORCED, stripInaccessible, and manual CRUD/FLS checks wherever the SOQL aggregate couldn't cover them"
              },
              {
                "label": "Tests & coverage",
                "description": "23 unit tests (nominal, edge, error cases, 250-account bulk) via TestDataFactory — 100% pass rate, 90% org-wide coverage"
              },
              {
                "label": "Documentation",
                "description": "Wrote the per-class technical fact sheets and the complete traceability matrix — jury evaluation: Distinction"
              }
            ],
            "title": "Project timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "OpenClassrooms jury",
                "label": "Validated competencies",
                "value": "3/3"
              },
              {
                "note": "100% pass rate",
                "label": "Tests run",
                "value": "23"
              },
              {
                "note": "OrderTrigger, AppConfig, AccountReminderScheduler at 100%",
                "label": "Org-wide coverage",
                "value": "90%"
              },
              {
                "note": "deduplication + owner fallback + resilient insert",
                "label": "Most complex class",
                "value": "AccountReminderBatch — 86%"
              },
              {
                "note": "Clean, well-documented architecture",
                "label": "Jury evaluation",
                "value": "Distinction!"
              }
            ],
            "title": "Outcomes"
          },
          {
            "type": "bullets",
            "items": [
              "RG-01: detection only targets the Draft → Activated transition — an Order moving straight from Cancelled to Activated would bypass the check. Documented and accepted as an out-of-scope limitation, with a known fix path (broadening the transition condition in OrderValidationHandler).",
              "No Permission Set or Custom Metadata for configuration: a deliberate choice for this project — all configuration flows through the AppConfig class, simpler to audit at this scale, would migrate to a Custom Metadata Type on a multi-environment project.",
              "Reminder deduplication: two possible modes (any \"Call\" Task blocks the reminder, or only auto-created ones) driven by a testable flag — lets the business behavior be tuned without touching the batch logic."
            ],
            "title": "Known limitations & decisions"
          }
        ]
      },
      "fr": {
        "title": "Développement backend Apex (iDEM Connect)",
        "heroSubtitle": "Développement d'un backend Apex pour iDEM Connect : trigger, classes de service et batch scheduler.",
        "sections": [
          {
            "body": "iDEM Connect est un fournisseur d'accès à Internet international (CA 1,8 Md€, 3 950 salariés). Besoin : un backend Apex complet pour outiller la force de vente sur Salesforce — gestion des comptes, contrats et commandes, avec trois règles métier précises à implémenter et une exigence de couverture de tests stricte. Mission : concevoir l'architecture (trigger, handlers, batch, scheduler), l'implémenter, et livrer une documentation technique complète (fiches par classe, matrice de traçabilité exigences → tests).",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "RG-01 — Bloquer l'activation d'une Order sans OrderItem : transition Draft → Activated interceptée sur OrderTrigger.before update, comptage agrégé des OrderItem par Order, addError() bloquant si zéro item",
              "RG-02 — Maintenir Account.Active__c synchronisé avec l'existence de commandes : true à l'insertion d'une Order (after insert), false uniquement quand le dernier Order du compte est supprimé (after delete) — gérés par deux handlers dédiés, jamais dans le trigger lui-même",
              "RG-03 — Relance automatique des comptes dormants : chaque 1er lundi du mois à 9h (CRON 0 0 9 ? * MON#1), un batch crée une Task « Call » à J+5 pour chaque Account sans Order et sans Call existante (manuelle ou automatique)",
              "Architecture one-trigger-per-object : OrderTrigger ne contient aucune logique métier, uniquement l'orchestration vers 3 handlers dédiés — bulk-safe par construction"
            ],
            "title": "Règles métier & architecture"
          },
          {
            "type": "bullets",
            "items": [
              "OrderValidationHandler — lecture seule, agrégat SOQL COUNT(OrderItem) group by OrderId, addError() sur le champ Status",
              "OrderInsertionHandler / OrderDeletionHandler — mise à jour groupée d'Account.Active__c, sécurisée par Security.stripInaccessible(UPDATABLE) avant chaque update",
              "AccountReminderBatch (Database.Batchable) — anti-join SOQL (Account sans Order) au start(), dé-duplication des Task « Call » par agrégat GROUP BY WhatId à l'execute(), option de dé-duplication stricte pilotée par un flag (DEDUPE_USING_AUTO_FLAG)",
              "AccountReminderScheduler (Schedulable) — déclenche le batch selon le CRON mensuel, avec repli sur l'utilisateur courant si le propriétaire du compte est inactif ou absent",
              "AppConfig — centralise toutes les constantes métier (statuts, libellés, délai de relance) : aucune valeur magique dans le code, un seul point de modification",
              "TestDataFactory — usine à données de test découplée (generateX() sans DML / createX() avec DML), réutilisée par les 6 classes de test"
            ],
            "title": "Solutions développées"
          },
          {
            "type": "bullets",
            "items": [
              "WITH SECURITY_ENFORCED sur la requête anti-join du batch (requête simple, éligible)",
              "Sur l'agrégat de dé-duplication, non éligible à WITH SECURITY_ENFORCED : vérifications CRUD/FLS explicites (Task.isAccessible(), accès aux champs WhatId/Subject/Auto_Created__c) avant l'exécution",
              "Security.stripInaccessible(AccessType.CREATABLE) avant chaque insertion de Task, (UPDATABLE) avant chaque mise à jour d'Account — retire silencieusement les champs non accessibles plutôt que de lever une exception",
              "Database.insert/update(..., allOrNone=false) : insertion résiliente avec journalisation détaillée des échecs partiels, plutôt qu'un rollback total sur une seule ligne en erreur",
              "Bulkification stricte : aucun SOQL ni DML dans une boucle, tout en Set/Map et agrégats — validé par un test à 250 comptes traités en une seule transaction"
            ],
            "title": "Sécurité & bonnes pratiques"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, Handler pattern, Batchable, Schedulable",
              "SOQL — agrégats GROUP BY, anti-join, WITH SECURITY_ENFORCED",
              "Salesforce DX (sfdx force:source:deploy) — déploiement des métadonnées",
              "Apex Test Framework — TestDataFactory, Test.startTest/stopTest, couverture par classe",
              "Documentation technique structurée — fiches par classe + matrice de traçabilité exigences → tests"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Spécifications",
                "description": "Analyse des 3 règles métier, conception de l'architecture one-trigger-per-object et de la matrice de traçabilité exigences → tests"
              },
              {
                "label": "Trigger & Handlers",
                "description": "Développement d'OrderTrigger et des 3 handlers dédiés (validation, insertion, suppression), chacun testé isolément"
              },
              {
                "label": "Batch & Scheduler",
                "description": "AccountReminderBatch (anti-join + dé-duplication configurable) et AccountReminderScheduler (CRON mensuel), avec repli sur l'utilisateur courant si besoin"
              },
              {
                "label": "Sécurité",
                "description": "Ajout systématique de WITH SECURITY_ENFORCED, stripInaccessible et des vérifications CRUD/FLS manuelles là où l'agrégat SOQL ne les couvre pas"
              },
              {
                "label": "Tests & couverture",
                "description": "23 tests unitaires (cas nominal, limite, erreur, bulk 250 comptes) via TestDataFactory — 100 % de réussite, 90 % de couverture org-wide"
              },
              {
                "label": "Documentation",
                "description": "Rédaction des fiches techniques par classe et de la matrice de traçabilité complète — évaluation jury : Félicitations"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "3/3"
              },
              {
                "note": "100 % de réussite",
                "label": "Tests exécutés",
                "value": "23"
              },
              {
                "note": "OrderTrigger, AppConfig, AccountReminderScheduler à 100 %",
                "label": "Couverture org-wide",
                "value": "90 %"
              },
              {
                "note": "dé-duplication + repli propriétaire + insertion résiliente",
                "label": "Classe la plus complexe",
                "value": "AccountReminderBatch — 86 %"
              },
              {
                "note": "Architecture propre et bien documentée",
                "label": "Évaluation jury",
                "value": "Félicitations !"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "bullets",
            "items": [
              "RG-01 : la détection ne cible que la transition Draft → Activated — un Order passant de Cancelled directement à Activated échapperait au contrôle. Limite documentée et assumée plutôt que corrigée hors scope, avec un chemin de correction identifié (élargir la condition de transition dans OrderValidationHandler).",
              "Pas de Permission Set ni de Custom Metadata pour la configuration : choix délibéré pour ce projet, toute la configuration passe par la classe AppConfig — plus simple à auditer à cette échelle, migrerait vers un Custom Metadata Type sur un projet à plusieurs environnements.",
              "Dé-duplication des relances : deux modes possibles (toute Task « Call » bloque la relance, ou seulement les Task auto-créées) pilotés par un flag testable — permet d'ajuster le comportement métier sans retoucher la logique du batch."
            ],
            "title": "Limites connues & décisions"
          }
        ]
      },
      "es": {
        "title": "Desarrollo backend Apex (iDEM Connect)",
        "heroSubtitle": "Entrega de un backend Apex (iDEM Connect)",
        "sections": [
          {
            "body": "iDEM Connect es un proveedor de acceso a Internet internacional (1.800 M€ de facturación, 3.950 empleados). Necesidad: un backend Apex completo para dotar de herramientas al equipo de ventas en Salesforce — gestión de cuentas, contratos y pedidos, con tres reglas de negocio precisas por implementar y un requisito estricto de cobertura de tests. Misión: diseñar la arquitectura (trigger, handlers, batch, scheduler), implementarla y entregar documentación técnica completa (fichas por clase, matriz de trazabilidad requisitos → tests).",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "RG-01 — Bloquear la activación de un Order sin OrderItem: la transición Draft → Activated se intercepta en OrderTrigger.before update, con un conteo agregado de OrderItem por Order, y un addError() bloqueante si el conteo es cero",
              "RG-02 — Mantener Account.Active__c sincronizado con la existencia de pedidos: true al insertar un Order (after insert), false solo cuando se elimina el último Order de la cuenta (after delete) — gestionado por dos handlers dedicados, nunca en el propio trigger",
              "RG-03 — Reactivación automática de cuentas inactivas: cada primer lunes del mes a las 9h (CRON 0 0 9 ? * MON#1), un batch crea una Task «Call» a J+5 para cada Account sin Order y sin ninguna Call existente (manual o automática)",
              "Arquitectura one-trigger-per-object: OrderTrigger no contiene ninguna lógica de negocio, solo orquestación hacia 3 handlers dedicados — bulk-safe por diseño"
            ],
            "title": "Reglas de negocio y arquitectura"
          },
          {
            "type": "bullets",
            "items": [
              "OrderValidationHandler — solo lectura, agregado SOQL COUNT(OrderItem) agrupado por OrderId, addError() sobre el campo Status",
              "OrderInsertionHandler / OrderDeletionHandler — actualización masiva de Account.Active__c, asegurada con Security.stripInaccessible(UPDATABLE) antes de cada update",
              "AccountReminderBatch (Database.Batchable) — anti-join SOQL (Accounts sin Order) en start(), desduplicación de Tasks «Call» mediante un agregado GROUP BY WhatId en execute(), con un modo de desduplicación estricta controlado por un flag (DEDUPE_USING_AUTO_FLAG)",
              "AccountReminderScheduler (Schedulable) — dispara el batch según el CRON mensual, con reserva al usuario en ejecución si el propietario de la cuenta está inactivo o ausente",
              "AppConfig — centraliza todas las constantes de negocio (estados, etiquetas, plazo de reactivación): ningún valor mágico en el código, un único punto de cambio",
              "TestDataFactory — fábrica de datos de test desacoplada (generateX() sin DML / createX() con DML), reutilizada por las 6 clases de test"
            ],
            "title": "Soluciones desarrolladas"
          },
          {
            "type": "bullets",
            "items": [
              "WITH SECURITY_ENFORCED en la consulta anti-join del batch (consulta simple, elegible)",
              "En el agregado de desduplicación, no elegible para WITH SECURITY_ENFORCED: verificaciones CRUD/FLS explícitas (Task.isAccessible(), acceso a los campos WhatId/Subject/Auto_Created__c) antes de ejecutarlo",
              "Security.stripInaccessible(AccessType.CREATABLE) antes de cada inserción de Task, (UPDATABLE) antes de cada actualización de Account — elimina silenciosamente los campos no accesibles en lugar de lanzar una excepción",
              "Database.insert/update(..., allOrNone=false): inserciones resilientes con registro detallado de fallos parciales, en lugar de un rollback total por una sola fila con error",
              "Bulkificación estricta: ningún SOQL ni DML dentro de un bucle, todo mediante Set/Map y agregados — validado con un test que procesa 250 cuentas en una sola transacción"
            ],
            "title": "Seguridad y buenas prácticas"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, patrón Handler, Batchable, Schedulable",
              "SOQL — agregados GROUP BY, anti-join, WITH SECURITY_ENFORCED",
              "Salesforce DX (sfdx force:source:deploy) — despliegue de metadatos",
              "Apex Test Framework — TestDataFactory, Test.startTest/stopTest, cobertura por clase",
              "Documentación técnica estructurada — fichas por clase + matriz de trazabilidad requisitos → tests"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Especificaciones",
                "description": "Análisis de las 3 reglas de negocio, diseño de la arquitectura one-trigger-per-object y de la matriz de trazabilidad requisitos → tests"
              },
              {
                "label": "Trigger y handlers",
                "description": "Desarrollo de OrderTrigger y de los 3 handlers dedicados (validación, inserción, eliminación), cada uno probado de forma aislada"
              },
              {
                "label": "Batch y scheduler",
                "description": "AccountReminderBatch (anti-join + desduplicación configurable) y AccountReminderScheduler (CRON mensual), con reserva al usuario en ejecución cuando es necesario"
              },
              {
                "label": "Seguridad",
                "description": "Incorporación sistemática de WITH SECURITY_ENFORCED, stripInaccessible y verificaciones CRUD/FLS manuales donde el agregado SOQL no las cubría"
              },
              {
                "label": "Tests y cobertura",
                "description": "23 tests unitarios (caso nominal, límite, error, bulk de 250 cuentas) vía TestDataFactory — 100% de éxito, 90% de cobertura a nivel de org"
              },
              {
                "label": "Documentación",
                "description": "Redacción de las fichas técnicas por clase y de la matriz de trazabilidad completa — evaluación del jurado: Felicitaciones"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jurado de OpenClassrooms",
                "label": "Competencias validadas",
                "value": "3/3"
              },
              {
                "note": "100% de éxito",
                "label": "Tests ejecutados",
                "value": "23"
              },
              {
                "note": "OrderTrigger, AppConfig, AccountReminderScheduler al 100%",
                "label": "Cobertura a nivel de org",
                "value": "90%"
              },
              {
                "note": "desduplicación + reserva de propietario + inserción resiliente",
                "label": "Clase más compleja",
                "value": "AccountReminderBatch — 86%"
              },
              {
                "note": "Arquitectura limpia y bien documentada",
                "label": "Evaluación del jurado",
                "value": "¡Felicitaciones!"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "bullets",
            "items": [
              "RG-01: la detección solo cubre la transición Draft → Activated — un Order que pase directamente de Cancelled a Activated eludiría el control. Limitación documentada y asumida en lugar de corregida fuera de alcance, con una vía de corrección identificada (ampliar la condición de transición en OrderValidationHandler).",
              "Sin Permission Set ni Custom Metadata para la configuración: decisión deliberada para este proyecto — toda la configuración pasa por la clase AppConfig, más simple de auditar a esta escala, migraría a un Custom Metadata Type en un proyecto con varios entornos.",
              "Desduplicación de reactivaciones: dos modos posibles (cualquier Task «Call» bloquea la reactivación, o solo las creadas automáticamente) controlados por un flag testeable — permite ajustar el comportamiento de negocio sin tocar la lógica del batch."
            ],
            "title": "Limitaciones conocidas y decisiones"
          }
        ]
      }
    }
  },
  {
    "slug": "wirebright-visualforce-to-lightning",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/wirebright-visualforce-to-lightning/screenshot-17.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Visualforce to Lightning migration (WireBright)",
        "heroSubtitle": "Migration of EG Manufacture's Visualforce application to Lightning Web Components at WireBright Consulting.",
        "sections": [
          {
            "body": "EG Manufacture, a tapestry manufacturer, ran Salesforce Classic to manage its leads and accounts — a Visualforce opportunity-search page and a JavaScript status-update button, both incompatible with Lightning Experience. WireBright Consulting led the migration. Mission: produce complete technical and functional specifications (component inventory, costed conversion options, risk management) then deliver a first prototype of the two most critical components in Lightning.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Visualforce page (Account object): search and display opportunities linked to an account via a simple search field → converted to a Lightning Web Component (estimated 8 days)",
              "JavaScript button (Lead object): updates status to \"Working - Contacted\" — JS buttons don't work in Lightning → converted to an Aura Component deployed as a Quick Action (estimated 2 days)",
              "Existing Apex controllers: updated for compatibility with the new LWC and Aura components (estimated 2 days)",
              "Total cost estimate: 17 days (LWC 8d + Aura 2d + controllers 2d + testing/validation 3d + deployment & QA 2d), plus 7-8h of user training"
            ],
            "title": "Identified Components & Proposed Solutions"
          },
          {
            "type": "bullets",
            "items": [
              "AccountOpportunitiesSearch LWC: dynamic search field + lightning-datatable, wired to AccountOpportunitiesController.getOpportunities() (Apex @AuraEnabled cacheable=true, SOQL keyword filtering)",
              "UpdateLeadStatus Aura component (force:lightningQuickAction, force:hasRecordId): Quick Action button calling LeadStatusController.updateStatus() in Apex, with toast notification (notificationsLibrary) on error and automatic view refresh",
              "Side-by-side Classic vs Lightning screenshots across 3 screens (home, account record, lead record) documenting concrete UX gains: KPI widgets, no-reload quick actions, visual status path for leads"
            ],
            "title": "Delivered Prototype"
          },
          {
            "type": "bullets",
            "items": [
              "Apex controller incompatibility (medium impact) → thorough sandbox testing and ongoing code reviews",
              "User adoption challenges (high probability) → training sessions (~7-8h, including advanced admin training) and support documentation",
              "LWC performance issues (low impact) → code optimization",
              "Tooled diagnostic via the Lightning Experience Configuration Converter: 1 unconverted JavaScript button and 18 actions/buttons not yet deployed identified, 0 Visualforce pages requiring immediate action"
            ],
            "title": "Risk Management"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components (LWC) — Visualforce page replacement",
              "Aura Components — Quick Action for the legacy JavaScript button",
              "Apex Controllers — AccountOpportunitiesController, LeadStatusController",
              "Lightning Experience Configuration Converter — migration diagnostic",
              "Salesforce Classic & Lightning — comparative test environments"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Inventory",
                "description": "Identified Visualforce and JavaScript components to migrate; functional analysis and risk per component"
              },
              {
                "label": "Specifications",
                "description": "Technical specs written: proposed solution per component with cost estimate and pros/cons"
              },
              {
                "label": "Comparative screenshots",
                "description": "Classic vs Lightning screenshots across 3 key screens to document expected gains"
              },
              {
                "label": "LWC prototype",
                "description": "Built the AccountOpportunitiesSearch component with its Apex controller"
              },
              {
                "label": "Aura prototype",
                "description": "Built the UpdateLeadStatus Quick Action component, with error handling and toast notification"
              },
              {
                "label": "Rollout plan",
                "description": "Defined post-migration KPIs (adoption, performance) and roadmap (Lightning reports, Flow automation, new LWCs)"
              },
              {
                "label": "Defense",
                "description": "Presented to jury — solutions assessed as complete and relevant, skills validated"
              }
            ],
            "title": "Project Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "OpenClassrooms jury",
                "label": "Skills validated",
                "value": "2/2"
              },
              {
                "note": "AccountOpportunitiesSearch LWC + UpdateLeadStatus Aura",
                "label": "Components prototyped",
                "value": "2"
              },
              {
                "note": "Dev + testing + deployment",
                "label": "Project cost estimate",
                "value": "17 days"
              },
              {
                "note": "Post-migration tracking KPI",
                "label": "Target Lightning adoption",
                "value": ">90%"
              }
            ],
            "title": "Results"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf",
                "label": "Technical & functional specifications (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/lightning-advantages.pdf",
                "label": "Lightning advantages — comparison (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/screenshots.zip",
                "label": "Before/after screenshots (ZIP)"
              }
            ],
            "title": "Deliverables"
          }
        ]
      },
      "fr": {
        "title": "Migration Visualforce vers Lightning (WireBright Consulting)",
        "heroSubtitle": "Migration de l'application Visualforce d'EG Manufacture vers Lightning Web Components chez WireBright Consulting.",
        "sections": [
          {
            "body": "EG Manufacture, spécialisée dans la tapisserie, utilisait Salesforce Classic pour gérer ses leads et ses comptes clients — une page Visualforce de recherche d'opportunités et un bouton JavaScript de mise à jour de statut, tous deux incompatibles avec Lightning Experience. Le cabinet WireBright Consulting pilotait la migration. Mission : produire les spécifications techniques et fonctionnelles complètes (inventaire des composants, options de conversion chiffrées, gestion des risques) puis livrer un premier prototype des deux composants les plus critiques en Lightning.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Page Visualforce (objet Account) : recherche et affichage des opportunités liées à un compte via un champ de recherche simple → conversion en Lightning Web Component (8 jours estimés)",
              "Bouton JavaScript (objet Lead) : mise à jour du statut en « Working - Contacted » — les boutons JS ne fonctionnent pas en Lightning → conversion en Aura Component déployé en Quick Action (2 jours estimés)",
              "Contrôleurs Apex existants : mise à jour pour compatibilité avec les nouveaux composants LWC et Aura (2 jours estimés)",
              "Chiffrage total : 17 jours (LWC 8j + Aura 2j + contrôleurs 2j + tests/validation 3j + déploiement & QA 2j), plus 7-8h de formation utilisateurs"
            ],
            "title": "Composants identifiés & solutions proposées"
          },
          {
            "type": "bullets",
            "items": [
              "Composant LWC AccountOpportunitiesSearch : champ de recherche dynamique + lightning-datatable, alimenté par @wire vers AccountOpportunitiesController.getOpportunities() (Apex @AuraEnabled cacheable=true, filtrage SOQL par mot-clé)",
              "Composant Aura UpdateLeadStatus (force:lightningQuickAction, force:hasRecordId) : bouton Quick Action appelant LeadStatusController.updateStatus() côté Apex, avec notification toast (notificationsLibrary) en cas d'erreur et rafraîchissement automatique de la vue",
              "Captures d'écran comparatives Classic vs Lightning sur 3 écrans (accueil, fiche compte, fiche lead) documentant les gains UX concrets : widgets KPI, actions rapides sans rechargement de page, chemin de statut visuel pour les leads"
            ],
            "title": "Prototype livré"
          },
          {
            "type": "bullets",
            "items": [
              "Incompatibilité des contrôleurs Apex (impact moyen) → tests approfondis en sandbox et revues de code en continu",
              "Difficultés d'adoption par les utilisateurs (probabilité haute) → sessions de formation (~7-8h, dont formation avancée admin) et documents de support",
              "Problèmes de performance des LWC (impact faible) → optimisation du code",
              "Diagnostic outillé via le Lightning Experience Configuration Converter : 1 bouton JavaScript non converti et 18 actions/boutons non encore déployés identifiés, 0 page Visualforce nécessitant une action immédiate"
            ],
            "title": "Gestion des risques"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components (LWC) — remplacement de la page Visualforce",
              "Aura Components — Quick Action pour le bouton JavaScript legacy",
              "Apex Controllers — AccountOpportunitiesController, LeadStatusController",
              "Lightning Experience Configuration Converter — diagnostic de migration",
              "Salesforce Classic & Lightning — environnements de test comparatifs"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Inventaire",
                "description": "Identification des composants Visualforce et JavaScript à migrer, analyse fonctionnelle et risques par composant"
              },
              {
                "label": "Spécifications",
                "description": "Rédaction des specs techniques : solution proposée par composant avec chiffrage et avantages/inconvénients"
              },
              {
                "label": "Captures comparatives",
                "description": "Captures d'écran Classic vs Lightning sur 3 écrans clés pour documenter les gains attendus"
              },
              {
                "label": "Prototype LWC",
                "description": "Développement du composant AccountOpportunitiesSearch avec son contrôleur Apex"
              },
              {
                "label": "Prototype Aura",
                "description": "Développement du composant UpdateLeadStatus en Quick Action, avec gestion d'erreur et notification toast"
              },
              {
                "label": "Plan de suivi",
                "description": "Définition des KPI post-migration (adoption, performance) et de la feuille de route (rapports Lightning, automatisation Flow, nouveaux LWC)"
              },
              {
                "label": "Soutenance",
                "description": "Présentation au jury — solutions jugées complètes et pertinentes, compétences validées"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "2/2"
              },
              {
                "note": "LWC AccountOpportunitiesSearch + Aura UpdateLeadStatus",
                "label": "Composants prototypés",
                "value": "2"
              },
              {
                "note": "Dev + tests + déploiement",
                "label": "Chiffrage projet",
                "value": "17 jours"
              },
              {
                "note": "KPI de suivi post-migration",
                "label": "Adoption Lightning ciblée",
                "value": ">90%"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf",
                "label": "Spécifications techniques et fonctionnelles (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/lightning-advantages.pdf",
                "label": "Avantages de Lightning — comparatif (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/screenshots.zip",
                "label": "Captures avant/après (ZIP)"
              }
            ],
            "title": "Livrables"
          }
        ]
      },
      "es": {
        "title": "Migración de Visualforce a Lightning (WireBright)",
        "heroSubtitle": "Migración de Visualforce a Lightning (WireBright)",
        "sections": [
          {
            "body": "EG Manufacture, especializada en tapicería, utilizaba Salesforce Classic para gestionar sus leads y cuentas — una página Visualforce de búsqueda de oportunidades y un botón JavaScript de actualización de estado, ambos incompatibles con Lightning Experience. La consultora WireBright Consulting lideró la migración. Misión: producir las especificaciones técnicas y funcionales completas (inventario de componentes, opciones de conversión con coste estimado, gestión de riesgos) y entregar después un primer prototipo de los dos componentes más críticos en Lightning.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "Página Visualforce (objeto Account): busca y muestra las oportunidades vinculadas a una cuenta mediante un campo de búsqueda simple → conversión a Lightning Web Component (8 días estimados)",
              "Botón JavaScript (objeto Lead): actualiza el estado a «Working - Contacted» — los botones JS no funcionan en Lightning → conversión a un componente Aura desplegado como Quick Action (2 días estimados)",
              "Controladores Apex existentes: actualizados para ser compatibles con los nuevos componentes LWC y Aura (2 días estimados)",
              "Estimación total: 17 días (LWC 8d + Aura 2d + controladores 2d + pruebas/validación 3d + despliegue y QA 2d), más 7-8h de formación de usuarios"
            ],
            "title": "Componentes identificados y soluciones propuestas"
          },
          {
            "type": "bullets",
            "items": [
              "LWC AccountOpportunitiesSearch: campo de búsqueda dinámico + lightning-datatable, conectado vía @wire a AccountOpportunitiesController.getOpportunities() (Apex @AuraEnabled cacheable=true, filtrado SOQL por palabra clave)",
              "Componente Aura UpdateLeadStatus (force:lightningQuickAction, force:hasRecordId): botón Quick Action que llama a LeadStatusController.updateStatus() en Apex, con notificación toast (notificationsLibrary) en caso de error y actualización automática de la vista",
              "Capturas comparativas Classic vs Lightning en 3 pantallas (inicio, ficha de cuenta, ficha de lead) documentando mejoras de UX concretas: widgets de KPI, acciones rápidas sin recargar la página, ruta de estado visual para los leads"
            ],
            "title": "Prototipo entregado"
          },
          {
            "type": "bullets",
            "items": [
              "Incompatibilidad de los controladores Apex (impacto medio) → pruebas exhaustivas en sandbox y revisiones de código continuas",
              "Dificultades de adopción por parte de los usuarios (probabilidad alta) → sesiones de formación (~7-8h, incluyendo formación avanzada para administradores) y documentación de soporte",
              "Problemas de rendimiento de los LWC (impacto bajo) → optimización del código",
              "Diagnóstico apoyado en el Lightning Experience Configuration Converter: 1 botón JavaScript sin convertir y 18 acciones/botones aún sin desplegar identificados, 0 páginas Visualforce que requirieran acción inmediata"
            ],
            "title": "Gestión de riesgos"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components (LWC) — sustitución de la página Visualforce",
              "Aura Components — Quick Action para el botón JavaScript heredado",
              "Apex Controllers — AccountOpportunitiesController, LeadStatusController",
              "Lightning Experience Configuration Converter — diagnóstico de migración",
              "Salesforce Classic y Lightning — entornos de prueba comparativos"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Inventario",
                "description": "Identificación de los componentes Visualforce y JavaScript a migrar; análisis funcional y riesgo por componente"
              },
              {
                "label": "Especificaciones",
                "description": "Redacción de las specs técnicas: solución propuesta por componente con coste estimado y pros/contras"
              },
              {
                "label": "Capturas comparativas",
                "description": "Capturas Classic vs Lightning en 3 pantallas clave para documentar las mejoras esperadas"
              },
              {
                "label": "Prototipo LWC",
                "description": "Desarrollo del componente AccountOpportunitiesSearch con su controlador Apex"
              },
              {
                "label": "Prototipo Aura",
                "description": "Desarrollo del componente UpdateLeadStatus como Quick Action, con gestión de errores y notificación toast"
              },
              {
                "label": "Plan de seguimiento",
                "description": "Definición de los KPI post-migración (adopción, rendimiento) y de la hoja de ruta (informes Lightning, automatización con Flow, nuevos LWC)"
              },
              {
                "label": "Defensa",
                "description": "Presentación ante el tribunal — soluciones valoradas como completas y pertinentes, competencias validadas"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Tribunal OpenClassrooms",
                "label": "Competencias validadas",
                "value": "2/2"
              },
              {
                "note": "LWC AccountOpportunitiesSearch + Aura UpdateLeadStatus",
                "label": "Componentes prototipados",
                "value": "2"
              },
              {
                "note": "Desarrollo + pruebas + despliegue",
                "label": "Estimación del proyecto",
                "value": "17 días"
              },
              {
                "note": "KPI de seguimiento post-migración",
                "label": "Adopción Lightning objetivo",
                "value": ">90%"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf",
                "label": "Especificaciones técnicas y funcionales (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/lightning-advantages.pdf",
                "label": "Ventajas de Lightning — comparativa (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/screenshots.zip",
                "label": "Capturas antes/después (ZIP)"
              }
            ],
            "title": "Entregables"
          }
        ]
      }
    }
  },
  {
    "slug": "ltp-apex-backend-prototype",
    "gallery": [
      {
        "alt": "LTP Apex Backend - Vue 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-10.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-11.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-12.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-13.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-14.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-15.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-16.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/ltp-apex-backend-prototype/screenshot-17.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Delivery tracking CRM design (LTP)",
        "heroSubtitle": "Design of an Apex backend prototype for LTP (luxury & fashion): data model, security, import strategy.",
        "sections": [
          {
            "body": "Le Temps des Papillons (LTP), a French bridal couture house, tracked its deliveries through 3 carriers with disparate interfaces — generating roughly 194 support calls/day just to check a delivery status. Marie Dupont (delivery tracking) and Sébastien Nozerac (sales team) owned the need client-side. Mission: design the complete technical architecture of the Salesforce application before any development began — UML data model, security matrix, import strategy and carrier integration plan — targeting a 70% cut in inbound calls through automation and a 360° customer view.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Massive data volume: 2,123,000 accounts, 3,239,870 contacts, 234,000 opportunities, 56,700 products",
              "3 carriers with heterogeneous interfaces: real-time REST API (LTP France, Transport Luxe Europe) vs. CSV over SFTP (Rapid International Transport)",
              "≈194 support calls/day for a simple delivery status — target: -70% through automation",
              "Initial import without loss or duplicates, respecting the parent-child dependency order across 10 objects"
            ],
            "title": "Project Challenges"
          },
          {
            "type": "bullets",
            "items": [
              "Real-time channel (LTP France + Transport Luxe Europe): Apex REST endpoint (@RestResource /delivery-webhook, DeliveryWebhook class) receiving carrier webhooks, publishing to a Platform Event (DeliveryEvent__e) to decouple processing, consumed by a record-triggered Flow",
              "On-demand refresh: RefreshStatusQueueable class with limit checks (Limits.getCallouts()) and automatic re-enqueue when callouts are exhausted; DeliveryService / TransporterCalloutService service classes (@future(callout=true)) for outbound GET /track calls",
              "deliveryTracker Lightning Web Component + DeliveryController Apex controller (@AuraEnabled, isAccessible() check before reads) for status display and the \"Refresh\" button",
              "Batch channel (Rapid International Transport): SFTP drop every 2h → Talend job (tSftpInput → tMap → tSalesforceOutputBulkExec) → Bulk API v2 upsert on Tracking_Number__c (External Id) → logged to CSV_Import_Log__c",
              "Secure authentication via Named Credentials (OAuth2) on both channels, mandatory Remote Site Settings, tested with HttpCalloutMock"
            ],
            "title": "Architecture & Carrier Integration"
          },
          {
            "type": "bullets",
            "items": [
              "A single \"Support Agent\" profile across all 3 zones — restriction handled via role hierarchy (Manager → France / Europe / International) + sharing rules on Zone__c, not by multiplying profiles",
              "Private OWD on Livraison__c, Public Read Only on Account / Contact / Opportunity / Transporter_Config__c",
              "Targeted Field-Level Security: Zone__c read-only for support (filter lockdown), CSV_Imported__c read-only on both sides (writable only by Apex), financial fields (AnnualRevenue, ExpectedRevenue) masked from support",
              "Validation Rule blocking any \"Delivered\" status without a Tracking_Number__c set",
              "Point Permission Sets (ReportingAccess, ImportControl, API_Access_Extension) to extend access without multiplying profiles"
            ],
            "title": "Security & Access Rights"
          },
          {
            "type": "bullets",
            "items": [
              "Load order respecting dependencies: Product2 → Pricebook2 → PricebookEntry → Account → Contact → AccountContactRelation → Opportunity → OpportunityLineItem → Livraison__c → Transporter_Config__c",
              "Data Loader CLI for the initial import (50k-row batches), Talend + Bulk API v2 for carrier flows (500,000 lines/hour, 10,000 records/request)",
              "Defined test scenarios: 500k-line CSV import on Talend sandbox (< 15 min), simulated API timeout via HttpCalloutMock, duplicate Tracking Numbers auto-merged via External Id",
              "Target test coverage: ≥90% on integration Apex classes, 100% on error handlers",
              "\"Import Monitor\" dashboard (imports/day, rejection rate) and Flow/Apex email alerts on critical failure"
            ],
            "title": "Import Strategy & Governance"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — Objects, Profiles, Roles, Sharing Rules, Platform Events, Flow, Apex (Queueable, Future, REST)",
              "Lightning Web Components — deliveryTracker component",
              "Talend Open Studio — ETL orchestration, CSV → Bulk API transformation",
              "Salesforce Data Loader — initial bulk CSV import",
              "Bulk API v2 & REST Webservices — carrier integration",
              "UML — data schema modeling",
              "Workbench — API testing and post-import verification"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Business analysis",
                "description": "Requirements gathered from Marie and Sébastien; the -70% support-call target identified as the project's driver"
              },
              {
                "label": "Data model",
                "description": "UML diagram: 5 custom objects (Livraison__c, Transporter_Config__c, CSV_Import_Log__c...) with relations and fields"
              },
              {
                "label": "Security",
                "description": "Profile/role/OWD/sharing-rule matrix by zone, targeted FLS, validation rule on \"Delivered\" status"
              },
              {
                "label": "Import strategy",
                "description": "Dependency order across 10 objects, tool selection (Data Loader, Talend, Bulk API v2) and test scenarios"
              },
              {
                "label": "Integration architecture",
                "description": "Apex REST webhook + Platform Event + Queueable for real-time; Talend + Bulk API v2 for the SFTP batch"
              },
              {
                "label": "Lightning component",
                "description": "deliveryTracker LWC + DeliveryController Apex controller for one-click customer tracking"
              },
              {
                "label": "Defense",
                "description": "Presentation to jury with model demonstration and architecture rationale — skills fully validated"
              }
            ],
            "title": "Project Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Target production data volume",
                "label": "Accounts to manage",
                "value": "2.1M"
              },
              {
                "note": "2 real-time REST APIs + 1 batch CSV/Talend",
                "label": "Carriers integrated",
                "value": "3"
              },
              {
                "note": "UML data model",
                "label": "Custom objects designed",
                "value": "5"
              },
              {
                "note": "OpenClassrooms jury",
                "label": "Skills validated",
                "value": "4/4"
              }
            ],
            "title": "Results"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/specifications.pdf",
                "label": "Technical specifications (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/uml-data-model.pdf",
                "label": "UML diagram (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/access-rights.pdf",
                "label": "Access rights & sharing (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/import-strategy.pdf",
                "label": "Import strategy (PDF)"
              }
            ],
            "title": "Deliverables"
          }
        ]
      },
      "fr": {
        "title": "Conception CRM de suivi de livraison (LTP)",
        "heroSubtitle": "Conception d'un prototype backend Apex pour LTP (luxe & mode) : modèle de données, sécurité, stratégie d'import.",
        "sections": [
          {
            "body": "Le Temps des Papillons (LTP), maison française de couture et robes de mariée, gérait le suivi de ses livraisons via 3 transporteurs aux interfaces disparates — d'où environ 194 appels/jour vers le support pour connaître un simple statut de livraison. Marie Dupont (suivi des livraisons) et Sébastien Nozerac (équipe commerciale) portaient le besoin côté client. Objectif du projet : concevoir l'architecture technique complète de l'application Salesforce avant tout développement — modèle de données UML, matrice de sécurité, stratégie d'import et plan d'intégration transporteurs — avec pour cible fonctionnelle une réduction de 70% des appels entrants via l'automatisation et une vision 360° du client.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Volumétrie massive : 2 123 000 comptes, 3 239 870 contacts, 234 000 opportunités, 56 700 produits",
              "3 transporteurs aux interfaces hétérogènes : API REST temps réel (LTP France, Transport Luxe Europe) vs flux CSV via SFTP (Rapid International Transport)",
              "≈194 appels/jour au support pour un simple statut de livraison — cible : -70% via automatisation",
              "Import initial sans perte ni doublon, en respectant l'ordre de dépendance parent-enfant entre 10 objets"
            ],
            "title": "Enjeux du projet"
          },
          {
            "type": "bullets",
            "items": [
              "Canal temps réel (LTP France + Transport Luxe Europe) : endpoint Apex REST (@RestResource /delivery-webhook, classe DeliveryWebhook) recevant les webhooks transporteurs, publication sur un Platform Event (DeliveryEvent__e) pour découpler le traitement, consommé par un Flow record-triggered",
              "Rafraîchissement à la demande : classe Queueable RefreshStatusQueueable avec vérification des limites (Limits.getCallouts()) et ré-enfilement automatique en cas de callouts épuisés ; classes de service DeliveryService / TransporterCalloutService (@future(callout=true)) pour les appels sortants GET /track",
              "Composant Lightning deliveryTracker (LWC) + contrôleur Apex DeliveryController (@AuraEnabled, vérification isAccessible() avant lecture) pour l'affichage du statut et le bouton \"Actualiser\"",
              "Canal batch (Rapid International Transport) : dépôt SFTP toutes les 2h → job Talend (tSftpInput → tMap → tSalesforceOutputBulkExec) → Bulk API v2 en upsert sur Tracking_Number__c (External Id) → journalisation dans CSV_Import_Log__c",
              "Authentification sécurisée par Named Credentials (OAuth2) des deux côtés, Remote Site Settings obligatoires, tests via HttpCalloutMock"
            ],
            "title": "Architecture & intégration transporteurs"
          },
          {
            "type": "bullets",
            "items": [
              "Un seul profil \"Support Agent\" pour les 3 zones — la restriction se fait par rôle hiérarchique (Responsable → France / Europe / International) + règles de partage sur Zone__c, pas par la multiplication des profils",
              "OWD Private sur Livraison__c, Public Read Only sur Account / Contact / Opportunity / Transporter_Config__c",
              "Field-Level Security ciblée : Zone__c en lecture seule pour le support (verrouillage du filtre), CSV_Imported__c protégé en lecture seule des deux côtés (modifiable uniquement par Apex), champs financiers (AnnualRevenue, ExpectedRevenue) masqués pour le support",
              "Validation Rule bloquant tout statut \"Livré\" sans Tracking_Number__c renseigné",
              "Permission Sets ponctuels (ReportingAccess, ImportControl, API_Access_Extension) pour étendre l'accès sans multiplier les profils"
            ],
            "title": "Sécurité & droits d'accès"
          },
          {
            "type": "bullets",
            "items": [
              "Ordre de charge respectant les dépendances : Product2 → Pricebook2 → PricebookEntry → Account → Contact → AccountContactRelation → Opportunity → OpportunityLineItem → Livraison__c → Transporter_Config__c",
              "Data Loader CLI pour l'import initial (lots de 50k), Talend + Bulk API v2 pour les flux transporteur (500 000 lignes/heure, 10 000 enregistrements/requête)",
              "Scénarios de test définis : import CSV de 500k lignes en sandbox Talend (< 15 min), timeout API simulé via HttpCalloutMock, doublons de Tracking Number fusionnés automatiquement via l'External Id",
              "Couverture de test cible : ≥90% sur les classes Apex d'intégration, 100% sur les handlers d'erreur",
              "Dashboard \"Import Monitor\" (imports/jour, taux de rejet) et alertes email Flow/Apex en cas d'échec critique"
            ],
            "title": "Stratégie d'import & gouvernance"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — Objects, Profiles, Roles, Sharing Rules, Platform Events, Flow, Apex (Queueable, Future, REST)",
              "Lightning Web Components — composant deliveryTracker",
              "Talend Open Studio — orchestration ETL, transformation CSV → Bulk API",
              "Salesforce Data Loader — import massif initial (CSV)",
              "Bulk API v2 & Webservices REST — intégration transporteurs",
              "UML — modélisation du schéma de données",
              "Workbench — tests API et vérification post-import"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse métier",
                "description": "Recueil des besoins de Marie et Sébastien, objectif -70% d'appels support identifié comme moteur du projet"
              },
              {
                "label": "Modèle de données",
                "description": "Diagramme UML : 5 objets custom (Livraison__c, Transporter_Config__c, CSV_Import_Log__c...) avec relations et champs"
              },
              {
                "label": "Sécurité",
                "description": "Matrice profils/rôles/OWD/sharing rules par zone, FLS ciblée, règle de validation sur le statut \"Livré\""
              },
              {
                "label": "Stratégie d'import",
                "description": "Ordre de dépendances sur 10 objets, choix des outils (Data Loader, Talend, Bulk API v2) et scénarios de test"
              },
              {
                "label": "Architecture d'intégration",
                "description": "Webhook Apex REST + Platform Event + Queueable pour le temps réel ; Talend + Bulk API v2 pour le batch SFTP"
              },
              {
                "label": "Composant Lightning",
                "description": "LWC deliveryTracker + contrôleur Apex DeliveryController pour le suivi client en un clic"
              },
              {
                "label": "Soutenance",
                "description": "Présentation au jury avec démonstration du modèle et justification des choix d'architecture — compétences validées"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Volumétrie de production visée",
                "label": "Comptes à gérer",
                "value": "2,1M"
              },
              {
                "note": "2 API REST temps réel + 1 batch CSV/Talend",
                "label": "Transporteurs intégrés",
                "value": "3"
              },
              {
                "note": "Modèle de données UML",
                "label": "Objets custom conçus",
                "value": "5"
              },
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "4/4"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/specifications.pdf",
                "label": "Spécifications techniques (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/uml-data-model.pdf",
                "label": "Diagramme UML (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/access-rights.pdf",
                "label": "Droits d'accès et partage (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/import-strategy.pdf",
                "label": "Stratégie d'import (PDF)"
              }
            ],
            "title": "Livrables"
          }
        ]
      },
      "es": {
        "title": "Diseño de CRM de seguimiento de entregas (LTP)",
        "heroSubtitle": "CRM Salesforce de seguimiento de entregas — diseño y entregables (LTP)",
        "sections": [
          {
            "body": "Le Temps des Papillons (LTP), casa francesa de alta costura nupcial, gestionaba el seguimiento de sus entregas a través de 3 transportistas con interfaces dispares — lo que generaba unas 194 llamadas/día al soporte solo para conocer un estado de entrega. Marie Dupont (seguimiento de entregas) y Sébastien Nozerac (equipo comercial) lideraron la necesidad del lado del cliente. Misión: diseñar la arquitectura técnica completa de la aplicación Salesforce antes de cualquier desarrollo — modelo de datos UML, matriz de seguridad, estrategia de importación y plan de integración de transportistas — con el objetivo funcional de reducir un 70% las llamadas entrantes mediante la automatización y ofrecer una visión 360° del cliente.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "Volumetría masiva: 2.123.000 cuentas, 3.239.870 contactos, 234.000 oportunidades, 56.700 productos",
              "3 transportistas con interfaces heterogéneas: API REST en tiempo real (LTP Francia, Transport Luxe Europe) frente a CSV vía SFTP (Rapid International Transport)",
              "≈194 llamadas/día al soporte por un simple estado de entrega — objetivo: -70% mediante automatización",
              "Importación inicial sin pérdidas ni duplicados, respetando el orden de dependencia padre-hijo entre 10 objetos"
            ],
            "title": "Retos del proyecto"
          },
          {
            "type": "bullets",
            "items": [
              "Canal en tiempo real (LTP Francia + Transport Luxe Europe): endpoint Apex REST (@RestResource /delivery-webhook, clase DeliveryWebhook) que recibe los webhooks de los transportistas, publicando en un Platform Event (DeliveryEvent__e) para desacoplar el procesamiento, consumido por un Flow record-triggered",
              "Actualización bajo demanda: clase Queueable RefreshStatusQueueable con verificación de límites (Limits.getCallouts()) y reencolado automático cuando se agotan los callouts; clases de servicio DeliveryService / TransporterCalloutService (@future(callout=true)) para las llamadas salientes GET /track",
              "Componente Lightning deliveryTracker (LWC) + controlador Apex DeliveryController (@AuraEnabled, verificación isAccessible() antes de leer) para mostrar el estado y el botón \"Actualizar\"",
              "Canal batch (Rapid International Transport): depósito SFTP cada 2h → job Talend (tSftpInput → tMap → tSalesforceOutputBulkExec) → Bulk API v2 en upsert sobre Tracking_Number__c (External Id) → registro en CSV_Import_Log__c",
              "Autenticación segura mediante Named Credentials (OAuth2) en ambos canales, Remote Site Settings obligatorios, pruebas mediante HttpCalloutMock"
            ],
            "title": "Arquitectura e integración de transportistas"
          },
          {
            "type": "bullets",
            "items": [
              "Un único perfil \"Support Agent\" para las 3 zonas — la restricción se aplica por jerarquía de roles (Responsable → Francia / Europa / Internacional) + reglas de colaboración sobre Zone__c, no multiplicando perfiles",
              "OWD Private en Livraison__c, Public Read Only en Account / Contact / Opportunity / Transporter_Config__c",
              "Field-Level Security específica: Zone__c en solo lectura para soporte (bloqueo del filtro), CSV_Imported__c protegido en solo lectura en ambos lados (modificable solo por Apex), campos financieros (AnnualRevenue, ExpectedRevenue) ocultos para soporte",
              "Validation Rule que bloquea cualquier estado \"Entregado\" sin un Tracking_Number__c informado",
              "Permission Sets puntuales (ReportingAccess, ImportControl, API_Access_Extension) para ampliar el acceso sin multiplicar perfiles"
            ],
            "title": "Seguridad y derechos de acceso"
          },
          {
            "type": "bullets",
            "items": [
              "Orden de carga respetando las dependencias: Product2 → Pricebook2 → PricebookEntry → Account → Contact → AccountContactRelation → Opportunity → OpportunityLineItem → Livraison__c → Transporter_Config__c",
              "Data Loader CLI para la importación inicial (lotes de 50k), Talend + Bulk API v2 para los flujos de transportista (500.000 líneas/hora, 10.000 registros/petición)",
              "Escenarios de prueba definidos: importación CSV de 500k líneas en sandbox de Talend (< 15 min), timeout de API simulado vía HttpCalloutMock, Tracking Numbers duplicados fusionados automáticamente vía External Id",
              "Cobertura de pruebas objetivo: ≥90% en las clases Apex de integración, 100% en los handlers de error",
              "Dashboard \"Import Monitor\" (importaciones/día, tasa de rechazo) y alertas por email vía Flow/Apex ante fallos críticos"
            ],
            "title": "Estrategia de importación y gobernanza"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — Objects, Profiles, Roles, Sharing Rules, Platform Events, Flow, Apex (Queueable, Future, REST)",
              "Lightning Web Components — componente deliveryTracker",
              "Talend Open Studio — orquestación ETL, transformación CSV → Bulk API",
              "Salesforce Data Loader — importación masiva inicial (CSV)",
              "Bulk API v2 y Webservices REST — integración de transportistas",
              "UML — modelado del esquema de datos",
              "Workbench — pruebas de API y verificación post-importación"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Análisis de negocio",
                "description": "Recogida de requisitos de Marie y Sébastien; el objetivo de -70% de llamadas al soporte se identifica como motor del proyecto"
              },
              {
                "label": "Modelo de datos",
                "description": "Diagrama UML: 5 objetos personalizados (Livraison__c, Transporter_Config__c, CSV_Import_Log__c...) con relaciones y campos"
              },
              {
                "label": "Seguridad",
                "description": "Matriz de perfiles/roles/OWD/reglas de colaboración por zona, FLS específica, regla de validación sobre el estado \"Entregado\""
              },
              {
                "label": "Estrategia de importación",
                "description": "Orden de dependencias entre 10 objetos, elección de herramientas (Data Loader, Talend, Bulk API v2) y escenarios de prueba"
              },
              {
                "label": "Arquitectura de integración",
                "description": "Webhook Apex REST + Platform Event + Queueable para tiempo real; Talend + Bulk API v2 para el batch SFTP"
              },
              {
                "label": "Componente Lightning",
                "description": "LWC deliveryTracker + controlador Apex DeliveryController para el seguimiento del cliente en un clic"
              },
              {
                "label": "Defensa",
                "description": "Presentación ante el tribunal con demostración del modelo y justificación de las decisiones de arquitectura — competencias validadas"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Volumetría de producción objetivo",
                "label": "Cuentas a gestionar",
                "value": "2,1M"
              },
              {
                "note": "2 API REST en tiempo real + 1 batch CSV/Talend",
                "label": "Transportistas integrados",
                "value": "3"
              },
              {
                "note": "Modelo de datos UML",
                "label": "Objetos personalizados diseñados",
                "value": "5"
              },
              {
                "note": "Tribunal OpenClassrooms",
                "label": "Competencias validadas",
                "value": "4/4"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/specifications.pdf",
                "label": "Especificaciones técnicas (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/uml-data-model.pdf",
                "label": "Diagrama UML (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/access-rights.pdf",
                "label": "Derechos de acceso y colaboración (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/import-strategy.pdf",
                "label": "Estrategia de importación (PDF)"
              }
            ],
            "title": "Entregables"
          }
        ]
      }
    }
  },
  {
    "slug": "fasha-apex-backend-optimization",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/fasha-apex-backend-optimization/screenshot-16.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Apex backend optimization (FASHA)",
        "heroSubtitle": "Optimization of FASHA's Apex backend: refactoring, removal of DML in loops and batch improvements.",
        "sections": [
          {
            "body": "FASHA, a multinational clothing distributor (350 employees, operating in Europe, the US, and APAC), used Salesforce to manage accounts, contacts, and orders. The app was slowing down and accumulating bugs. Mission assigned via the SFQUAL consultancy: diagnose, fix, and reorganize an existing Apex backend — not build from scratch, but take over production code with real users affected.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "The UpdateAccountCA trigger threw an error whenever a sales rep updated an order on an account that already had 100 orders or more — a sign of non-bulk-safe processing that didn't scale",
              "The NetAmount__c field (TotalAmount − ShipmentCost) recalculated correctly when a line was added from the UI, but only the first order was updated during a bulk Data Loader import — the logic implicitly depended on a single-record context",
              "Disorganized code: no naming conventions, overly long classes, business logic sitting directly in triggers",
              "Test classes that didn't follow Salesforce result-validation best practices — tests existed but weren't reliable",
              "The weekly revenue recalculation batch (triggered after product price updates) took several hours to run"
            ],
            "title": "Bugs diagnosed"
          },
          {
            "type": "bullets",
            "items": [
              "OrderTriggerHandler + TriggerHelper: logic extracted from the trigger, NetAmount now recalculates correctly whether triggered from the UI or a bulk import (collection-based processing, no more dependency on a single-row context)",
              "AccountService: revenue field (Chiffre_d_affaire__c) updated on after update via async processing (@future) — no longer blocks the sales rep's transaction",
              "UpdateAllAccountsBatch + UpdateAllAccountsScheduler: global revenue recalculation scheduled weekly (Sunday 10pm), replacing the old multi-hour synchronous process",
              "MyTeamOrdersController: new controller displaying orders for an entire team (same UserRoleId) — a feature requested on top of the bug fixes",
              "TestDataFactory + @testSetup: restructured test suite, over 85% coverage, nominal/edge/error cases for every class"
            ],
            "title": "Fixes & refactoring"
          },
          {
            "type": "bullets",
            "items": [
              "One trigger per object (OrderTrigger), all logic in dedicated handlers",
              "100% bulkified code: zero SOQL or DML inside a loop, everything via Set/Map",
              "Async done right: @future to avoid blocking the user transaction, Batchable + Schedulable for scheduled bulk processing",
              "Security: with sharing throughout, explicit FLS checks",
              "ApexDoc documentation and consistent naming conventions across the entire codebase taken over"
            ],
            "title": "Best practices applied"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, Handler pattern, @future, Batchable, Schedulable",
              "Visualforce — MyTeamOrders page for the team view",
              "SOQL — Bulkified queries, Set/Map collections",
              "Apex Test Framework — TestDataFactory, @testSetup, per-class coverage",
              "Salesforce DX — Compliant project structure, scratch org deployment"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Auditing the existing code",
                "description": "Reproduced both reported bugs (trigger failing past 100 orders, NetAmount broken on Data Loader import), analyzed the disorganized codebase"
              },
              {
                "label": "Refactoring the triggers",
                "description": "Extracted all logic into OrderTriggerHandler and TriggerHelper — testable architecture, bulk-safe by design"
              },
              {
                "label": "Async processing",
                "description": "AccountService via @future for one-off updates, UpdateAllAccountsBatch + Scheduler for the scheduled weekly recalculation"
              },
              {
                "label": "Team feature",
                "description": "Built MyTeamOrdersController for team-level order visibility, the sponsor's original feature request"
              },
              {
                "label": "Tests & coverage",
                "description": "Fully rewrote the test suite via TestDataFactory — over 85% coverage, zero regression on either fixed bug"
              },
              {
                "label": "Defense",
                "description": "Presented the audit and fixes to the jury — evaluation: Distinction, complete and well-justified fixes"
              }
            ],
            "title": "Project timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Non-bulk-safe trigger (100+ orders), NetAmount broken on bulk import",
                "label": "Real bugs fixed",
                "value": "2"
              },
              {
                "note": "After the full refactor",
                "label": "SOQL/DML in loops",
                "value": "0"
              },
              {
                "note": "TestDataFactory + @testSetup",
                "label": "Test coverage",
                "value": ">85%"
              },
              {
                "note": "OpenClassrooms jury",
                "label": "Validated competencies",
                "value": "2/2"
              },
              {
                "note": "Complete and well-justified fixes",
                "label": "Jury evaluation",
                "value": "Distinction!"
              }
            ],
            "title": "Outcomes"
          }
        ]
      },
      "fr": {
        "title": "Optimisation du backend Apex (FASHA)",
        "heroSubtitle": "Optimisation du backend Apex de FASHA : refactoring, suppression des DML en boucle et amélioration des batchs.",
        "sections": [
          {
            "body": "FASHA, distributeur de vêtements multinational (350 collaborateurs, présent en Europe, aux États-Unis et en zone APEC), utilisait Salesforce pour gérer comptes, contacts et commandes. L'application ralentissait et accumulait les bugs. Mission confiée via le cabinet SFQUAL : diagnostiquer, corriger et réorganiser un backend Apex existant — pas construire depuis une page blanche, mais reprendre du code en production avec de vrais utilisateurs impactés.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Le trigger UpdateAccountCA levait une erreur dès qu'un commercial modifiait une commande sur un compte ayant déjà 100 commandes ou plus — signe d'un traitement non bulk-safe qui ne passait pas à l'échelle",
              "Le champ NetAmount__c (TotalAmount − ShipmentCost) se recalculait correctement pour un ajout de ligne depuis l'interface, mais seule la première commande était mise à jour lors d'un import en masse via Data Loader — la logique dépendait implicitement d'un contexte mono-enregistrement",
              "Code désorganisé : aucune convention de nommage, classes trop longues, logique métier directement dans les triggers",
              "Classes de test ne respectant pas les bonnes pratiques Salesforce de validation des résultats — tests présents mais peu fiables",
              "Le batch hebdomadaire de recalcul du chiffre d'affaires (déclenché après la mise à jour des prix produits) prenait plusieurs heures"
            ],
            "title": "Bugs diagnostiqués"
          },
          {
            "type": "bullets",
            "items": [
              "OrderTriggerHandler + TriggerHelper : logique extraite du trigger, calcul de NetAmount recalculé correctement que ce soit via l'UI ou un import en masse (traitement par collections, plus de dépendance à un contexte mono-ligne)",
              "AccountService : mise à jour du chiffre d'affaires (Chiffre_d_affaire__c) déclenchée en after update via un traitement asynchrone (@future) — ne bloque plus la transaction du commercial",
              "UpdateAllAccountsBatch + UpdateAllAccountsScheduler : recalcul global du CA planifié chaque semaine (dimanche 22h), remplace l'ancien traitement synchrone de plusieurs heures",
              "MyTeamOrdersController : nouveau contrôleur affichant les commandes de toute une équipe (même UserRoleId) — fonctionnalité demandée en plus de la correction des bugs",
              "TestDataFactory + @testSetup : suite de tests restructurée, couverture supérieure à 85%, cas nominal/limite/erreur pour chaque classe"
            ],
            "title": "Corrections & refactoring"
          },
          {
            "type": "bullets",
            "items": [
              "Un seul trigger par objet (OrderTrigger), toute la logique dans des handlers dédiés",
              "Code 100% bulkifié : zéro SOQL ou DML dans une boucle, tout en Set/Map",
              "Asynchrone maîtrisé : @future pour ne pas bloquer la transaction utilisateur, Batchable + Schedulable pour le traitement de masse planifié",
              "Sécurité : with sharing systématique, vérifications FLS explicites",
              "Documentation ApexDoc et conventions de nommage cohérentes sur l'ensemble du code repris"
            ],
            "title": "Bonnes pratiques appliquées"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, Handler pattern, @future, Batchable, Schedulable",
              "Visualforce — Page MyTeamOrders pour la vue d'équipe",
              "SOQL — Requêtes bulkifiées, collections (Set/Map)",
              "Apex Test Framework — TestDataFactory, @testSetup, couverture par classe",
              "Salesforce DX — Structure de projet conforme, déploiement scratch org"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Audit du code existant",
                "description": "Reproduction des deux bugs signalés (trigger à 100+ commandes, NetAmount cassé sur import Data Loader), analyse du code désorganisé"
              },
              {
                "label": "Refactoring des triggers",
                "description": "Extraction de toute la logique vers OrderTriggerHandler et TriggerHelper — architecture testable, bulk-safe par construction"
              },
              {
                "label": "Traitement asynchrone",
                "description": "AccountService en @future pour la mise à jour ponctuelle, UpdateAllAccountsBatch + Scheduler pour le recalcul hebdomadaire planifié"
              },
              {
                "label": "Fonctionnalité équipe",
                "description": "Développement de MyTeamOrdersController pour l'affichage des commandes par équipe, demande initiale du commanditaire"
              },
              {
                "label": "Tests & couverture",
                "description": "Réécriture complète de la suite de tests via TestDataFactory — couverture >85%, 0 régression sur les deux bugs corrigés"
              },
              {
                "label": "Soutenance",
                "description": "Présentation de l'audit et des corrections devant le jury — évaluation : Félicitations, corrections complètes et bien justifiées"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Trigger non bulk-safe (100+ commandes), NetAmount cassé sur import en masse",
                "label": "Bugs réels corrigés",
                "value": "2"
              },
              {
                "note": "Après refactoring complet",
                "label": "SOQL/DML dans boucles",
                "value": "0"
              },
              {
                "note": "TestDataFactory + @testSetup",
                "label": "Couverture de tests",
                "value": ">85%"
              },
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "2/2"
              },
              {
                "note": "Corrections complètes et bien justifiées",
                "label": "Évaluation jury",
                "value": "Félicitations !"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Optimización de un backend Apex (FASHA)",
        "heroSubtitle": "Optimización de backend Apex (FASHA)",
        "sections": [
          {
            "body": "FASHA, distribuidora multinacional de ropa (350 empleados, presente en Europa, Estados Unidos y la zona APAC), usaba Salesforce para gestionar cuentas, contactos y pedidos. La aplicación se ralentizaba y acumulaba errores. Misión encargada a través de la consultora SFQUAL: diagnosticar, corregir y reorganizar un backend Apex existente — no construir desde cero, sino hacerse cargo de código en producción con usuarios reales afectados.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "El trigger UpdateAccountCA lanzaba un error cada vez que un comercial actualizaba un pedido en una cuenta que ya tenía 100 pedidos o más — señal de un procesamiento no bulk-safe que no escalaba",
              "El campo NetAmount__c (TotalAmount − ShipmentCost) se recalculaba correctamente al añadir una línea desde la interfaz, pero solo se actualizaba el primer pedido en una importación masiva con Data Loader — la lógica dependía implícitamente de un contexto de un solo registro",
              "Código desorganizado: sin convenciones de nomenclatura, clases demasiado largas, lógica de negocio directamente en los triggers",
              "Clases de test que no seguían las buenas prácticas de Salesforce para validar resultados — existían tests, pero no eran fiables",
              "El batch semanal de recálculo de facturación (disparado tras la actualización de precios de productos) tardaba varias horas"
            ],
            "title": "Errores diagnosticados"
          },
          {
            "type": "bullets",
            "items": [
              "OrderTriggerHandler + TriggerHelper: lógica extraída del trigger, el NetAmount ahora se recalcula correctamente tanto desde la interfaz como en una importación masiva (procesamiento por colecciones, sin dependencia de un contexto de una sola fila)",
              "AccountService: actualización del campo de facturación (Chiffre_d_affaire__c) en after update mediante procesamiento asíncrono (@future) — ya no bloquea la transacción del comercial",
              "UpdateAllAccountsBatch + UpdateAllAccountsScheduler: recálculo global de la facturación programado semanalmente (domingo 22h), sustituyendo el antiguo proceso síncrono de varias horas",
              "MyTeamOrdersController: nuevo controlador que muestra los pedidos de todo un equipo (mismo UserRoleId) — funcionalidad solicitada además de la corrección de errores",
              "TestDataFactory + @testSetup: suite de tests reestructurada, cobertura superior al 85%, casos nominal/límite/error para cada clase"
            ],
            "title": "Correcciones y refactorización"
          },
          {
            "type": "bullets",
            "items": [
              "Un único trigger por objeto (OrderTrigger), toda la lógica en handlers dedicados",
              "Código 100% bulkificado: cero SOQL o DML dentro de un bucle, todo mediante Set/Map",
              "Asíncrono bien gestionado: @future para no bloquear la transacción del usuario, Batchable + Schedulable para el procesamiento masivo programado",
              "Seguridad: with sharing sistemático, verificaciones FLS explícitas",
              "Documentación ApexDoc y convenciones de nomenclatura coherentes en todo el código heredado"
            ],
            "title": "Buenas prácticas aplicadas"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, patrón Handler, @future, Batchable, Schedulable",
              "Visualforce — Página MyTeamOrders para la vista de equipo",
              "SOQL — Consultas bulkificadas, colecciones Set/Map",
              "Apex Test Framework — TestDataFactory, @testSetup, cobertura por clase",
              "Salesforce DX — Estructura de proyecto conforme, despliegue en scratch org"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Auditoría del código existente",
                "description": "Reproducción de los dos errores señalados (trigger fallando con 100+ pedidos, NetAmount roto en importación con Data Loader), análisis del código desorganizado"
              },
              {
                "label": "Refactorización de los triggers",
                "description": "Extracción de toda la lógica hacia OrderTriggerHandler y TriggerHelper — arquitectura testeable, bulk-safe por diseño"
              },
              {
                "label": "Procesamiento asíncrono",
                "description": "AccountService en @future para actualizaciones puntuales, UpdateAllAccountsBatch + Scheduler para el recálculo semanal programado"
              },
              {
                "label": "Funcionalidad de equipo",
                "description": "Desarrollo de MyTeamOrdersController para la visualización de pedidos por equipo, solicitud inicial del cliente"
              },
              {
                "label": "Tests y cobertura",
                "description": "Reescritura completa de la suite de tests mediante TestDataFactory — cobertura >85%, cero regresión en ambos errores corregidos"
              },
              {
                "label": "Defensa",
                "description": "Presentación de la auditoría y las correcciones ante el jurado — evaluación: Felicitaciones, correcciones completas y bien justificadas"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Trigger no bulk-safe (100+ pedidos), NetAmount roto en importación masiva",
                "label": "Errores reales corregidos",
                "value": "2"
              },
              {
                "note": "Tras la refactorización completa",
                "label": "SOQL/DML en bucles",
                "value": "0"
              },
              {
                "note": "TestDataFactory + @testSetup",
                "label": "Cobertura de tests",
                "value": ">85%"
              },
              {
                "note": "Jurado de OpenClassrooms",
                "label": "Competencias validadas",
                "value": "2/2"
              },
              {
                "note": "Correcciones completas y bien justificadas",
                "label": "Evaluación del jurado",
                "value": "¡Felicitaciones!"
              }
            ],
            "title": "Resultados"
          }
        ]
      }
    }
  },
  {
    "slug": "legarant-axg-salesforce-deployment",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/legarant-axg-salesforce-deployment/screenshot-9.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Salesforce deployment with Heroku (Legarant‑AXG)",
        "heroSubtitle": "Salesforce deployment and integration for LEGARANT-AXG: REST API, Heroku synchronization and go-live.",
        "sections": [
          {
            "body": "LEGARANT, a life insurance company founded in 1980 in Nantes by Émile Gordon, serves over 1.2 million individuals in France. To accelerate its expansion into Germany, the company acquired AXG, which already managed over 50,000 customers on its own internal CRM. LEGARANT chose to keep Salesforce as its system of record rather than running two systems side by side: AXG data had to be synchronized into Salesforce (one-way, Germany → France), with REST APIs documented via Postman, and a mobile app for insurance agents deployed on Heroku Connect. Mission: design and deploy the complete technical architecture following Salesforce best practices.",
            "type": "text",
            "title": "Context"
          },
          {
            "body": "This project is the clearest proof that my Salesforce and infrastructure skills aren't two separate résumés: I built the Apex REST layer AND the Heroku application that accompanies it (Express + PostgreSQL API, separate staging and production environments on a Heroku pipeline), then wrote the deployment runbook a real ops handover requires. It's also the first step toward a deeper crossover project already scoped — a real-time Heroku↔Salesforce sync via Platform Events and OAuth 2.0 JWT Bearer Flow.",
            "type": "text",
            "title": "Proof of the skill crossover"
          },
          {
            "type": "bullets",
            "items": [
              "One-way AXG → Salesforce sync without creating duplicates (idempotency)",
              "DELETE on a contact = deactivation, not physical deletion (insurance sector business rule)",
              "Unique External ID to guarantee AXG ↔ Salesforce correspondence",
              "Bidirectional Heroku ↔ Salesforce connector for the mobile app",
              "Two isolated Heroku environments (staging tied to the sandbox, production tied to the Prod org) linked by a promotion pipeline, each with its own Connected Apps and its own Postgres database"
            ],
            "title": "Technical challenges"
          },
          {
            "type": "bullets",
            "items": [
              "Custom Apex REST controller: contact creation with prior email verification before insert",
              "Apex DELETE endpoint: contact deactivation (IsActive = false) instead of physical deletion",
              "Apex trigger for automatic External ID population — guarantees uniqueness on creation",
              "Heroku Connect configured for bidirectional Heroku PostgreSQL ↔ Salesforce sync, with per-object mapping (RW on Account/Contact/Contract, RO on Order/OrderItem/Product2/Pricebook2/PricebookEntry)",
              "Matching Rule + Duplicate Rule on Contact (email, first name, last name) in alert mode — blocks silent duplicate creation without blocking data entry",
              "Complete Postman collection: GET, POST, PATCH, DELETE — every endpoint tested and documented",
              "Deployment document: components, manual steps, install order"
            ],
            "title": "Solutions built"
          },
          {
            "type": "bullets",
            "items": [
              "Dedicated Permission Set (INTG_API_Policies_CRUD): explicit RW/RO rights per object, assigned only to the integration user — no API access via a generic profile",
              "Postman calls batched via the REST Composite API (up to 25 sub-requests / 200 objects per call): reduces API limit consumption and guarantees transactional consistency (rollback if a sub-request fails)",
              "API limits monitored via the Sforce-Limit-Info header on every HTTP response, instead of being discovered after the fact via a 403 error",
              "Contact Matching Rule + Duplicate Rule active in Alert only mode: a duplicate is flagged on create/edit without blocking the user — a product decision, not just a technical one"
            ],
            "title": "Governance & data quality"
          },
          {
            "type": "bullets",
            "items": [
              "Apex REST (@RestResource) — Custom endpoints exposed over HTTPS",
              "Node.js + Express + PostgreSQL (pg) — SOCMOB API on the Heroku side, with a front-end test console (index.html/app.js)",
              "Heroku Connect (Demo Edition) — PostgreSQL ↔ Salesforce sync",
              "Heroku Postgres (Essential-2) — one database per environment (staging, production)",
              "Papertrail — centralized, real-time application log tracking across both environments",
              "Postman — Complete REST API call collection, with an automated test suite",
              "Apex Trigger — Automatic External ID population",
              "Salesforce DX — Metadata deployment"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Architecture",
                "description": "Defined the integration schema: AXG→Salesforce flow, required endpoints, External ID strategy"
              },
              {
                "label": "Postman REST API",
                "description": "Implemented the 4 standard endpoints (GET/POST/PATCH/DELETE) on Salesforce objects via Postman, with pre-request/test scripts chaining calls without manually re-entering credentials"
              },
              {
                "label": "Apex controller",
                "description": "Built the custom Apex REST endpoint: contact creation with email check + deactivation on DELETE"
              },
              {
                "label": "External ID & deduplication",
                "description": "Apex trigger for automatic External ID population on contact creation, complemented by a Matching Rule + Duplicate Rule to block duplicates at data entry"
              },
              {
                "label": "Heroku Connect",
                "description": "Configured bidirectional Heroku PostgreSQL ↔ Salesforce sync for the mobile app, with per-object RW/RO mapping"
              },
              {
                "label": "Documentation & validation",
                "description": "Wrote the complete deployment document (delivered components, manual actions, install order) and ran the full Postman test suite end-to-end on the sandbox environment"
              }
            ],
            "title": "Project timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "OpenClassrooms jury",
                "label": "Validated competencies",
                "value": "2/2"
              },
              {
                "note": "GET, POST, PATCH, DELETE",
                "label": "API endpoints",
                "value": "4"
              },
              {
                "note": "Heroku ↔ Salesforce",
                "label": "Sync",
                "value": "Bidirectional"
              },
              {
                "note": "5.7s total run time, 232ms average response time — auth, CRUD, deduplication, batch upsert",
                "label": "Postman test suite",
                "value": "17 tests, 100% passed"
              },
              {
                "note": "Clean, well-documented architecture",
                "label": "Jury evaluation",
                "value": "Distinction!"
              }
            ],
            "title": "Outcomes"
          },
          {
            "type": "bullets",
            "items": [
              "Heroku over Azure: Azure's free-tier thresholds (see PDF) didn't cover the need, and Heroku Connect offered native Salesforce sync without coding a custom ETL layer.",
              "Different OAuth flow per environment rather than a single choice: Client Credentials Flow (server-to-server, no stored user credentials) for production, with Username-Password Flow confined to the sandbox/Postman PoC — production never relied on a stored password, unlike a \"fast but temporary\" choice that would have put everything behind Username-Password.",
              "External ID + Apex trigger for uniqueness, rather than deduplication on the Heroku Connect side: the source of truth for identity stays in Salesforce, which survives a future replacement of the sync layer.",
              "Duplicate Rule in Alert only mode rather than a hard block: a flagged-but-not-blocked duplicate leaves the final call to the business user, consistent with an integration flow where the contact may legitimately already exist on the AXG side.",
              "DELETE = deactivation, not physical deletion: mandated by insurance-sector data retention rules, not a default technical choice."
            ],
            "title": "Decisions & trade-offs"
          },
          {
            "type": "bullets",
            "items": [
              "Production authentication: OAuth 2.0 Client Credentials Flow (server-to-server) — no Salesforce user credentials stored on the Heroku side, only client_id/client_secret as config vars.",
              "Sandbox/PoC-only authentication: OAuth 2.0 Username-Password Flow, used exclusively for manual Postman testing — never exposed in production.",
              "Apex REST endpoints exposed over HTTPS only, accessible only with a valid Salesforce token and the INTG_API_Policies_CRUD Permission Set — no anonymous access.",
              "Accepted limitation: no conflict resolution — acceptable since the sync is one-way (AXG to Salesforce), not a problem code needs to solve.",
              "Accepted limitation: no documented retry/backoff on Heroku Connect calls — real-world scale would require a queue or retry mechanism.",
              "Data flow: AXG contact data (Germany) flows into the Salesforce France org — intra-EU flow, access restricted by permission sets rather than by geography.",
              "Next step already scoped: migrating the sandbox/PoC flow to OAuth 2.0 JWT Bearer Flow (certificate instead of password) to align every environment on a server-to-server flow — the exact starting point of the deeper Heroku-Salesforce crossover project."
            ],
            "title": "Security & limitations"
          }
        ]
      },
      "fr": {
        "title": "Déploiement Salesforce avec Heroku (Légarant‑AXG)",
        "heroSubtitle": "Déploiement et intégration Salesforce pour LEGARANT-AXG : API REST, synchronisation Heroku et mise en production.",
        "sections": [
          {
            "body": "LEGARANT, société d'assurance vie fondée en 1980 à Nantes par Émile Gordon, sert plus de 1,2 million de particuliers en France. Pour accélérer son implantation en Allemagne, l'entreprise a racheté AXG, qui gérait déjà plus de 50 000 clients sur son propre CRM interne. LEGARANT a choisi de conserver Salesforce comme CRM de référence plutôt que de faire cohabiter deux systèmes : les données AXG devaient être synchronisées vers Salesforce (sens unique, Allemagne → France), avec des APIs REST documentées via Postman, et une application mobile pour les assureurs déployée sur Heroku Connect. Mission : concevoir et déployer l'architecture technique complète en respectant les bonnes pratiques Salesforce.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "body": "Ce projet est la preuve la plus claire que mes compétences Salesforce et infrastructure ne sont pas deux CV séparés : j'ai construit la couche Apex REST ET l'application Heroku qui l'accompagne (API Express + PostgreSQL, environnements staging et production distincts sur une pipeline Heroku), puis rédigé le runbook de déploiement qu'exige une vraie passation ops. C'est aussi la première marche vers un projet de croisement plus poussé déjà cadré — une synchronisation temps réel Heroku↔Salesforce via Platform Events et OAuth 2.0 JWT Bearer Flow.",
            "type": "text",
            "title": "La preuve du croisement de compétences"
          },
          {
            "type": "bullets",
            "items": [
              "Synchronisation unidirectionnelle AXG → Salesforce sans création de doublons (idempotence)",
              "DELETE sur contact = désactivation et non suppression physique (règle métier Assurance)",
              "External ID unique pour garantir la correspondance AXG ↔ Salesforce",
              "Connecteur Heroku ↔ Salesforce bidirectionnel pour l'application mobile Heroku",
              "Deux environnements Heroku isolés (staging lié à la sandbox, production liée à l'org Prod) reliés par une pipeline de promotion, chacun avec ses propres Connected Apps et sa propre base Postgres"
            ],
            "title": "Défis techniques"
          },
          {
            "type": "bullets",
            "items": [
              "Contrôleur REST Apex custom : création de contact avec vérification email préalable avant insertion",
              "Endpoint DELETE Apex : désactivation du contact (IsActive = false) au lieu de suppression physique",
              "Trigger Apex pour le remplissage automatique de l'External ID — garantit l'unicité à la création",
              "Heroku Connect configuré pour la synchronisation bidirectionnelle Heroku PostgreSQL ↔ Salesforce, avec mapping différencié par objet (RW sur Account/Contact/Contract, RO sur Order/OrderItem/Product2/Pricebook2/PricebookEntry)",
              "Matching Rule + Duplicate Rule sur Contact (email, prénom, nom) en mode alerte — bloque la création silencieuse de doublons sans empêcher la saisie",
              "Collection Postman complète : GET, POST, PATCH, DELETE — tous les endpoints testés et documentés",
              "Document de déploiement : composants, étapes manuelles, ordre d'installation"
            ],
            "title": "Solutions développées"
          },
          {
            "type": "bullets",
            "items": [
              "Permission Set dédié (INTG_API_Policies_CRUD) : droits RW/RO explicites par objet, assigné uniquement à l'utilisateur d'intégration — aucun accès API via un profil générique",
              "Appels Postman groupés via l'API REST Composite (jusqu'à 25 sous-requêtes / 200 objets par appel) : réduit la consommation de limites API et garantit la cohérence transactionnelle (rollback si une sous-requête échoue)",
              "Limites API surveillées via l'en-tête Sforce-Limit-Info sur chaque réponse HTTP, plutôt que découvertes après coup par une erreur 403",
              "Matching Rule + Duplicate Rule Contact actives en mode Alert only : le doublon est signalé à la création/modification sans bloquer l'utilisateur — un choix produit, pas juste technique"
            ],
            "title": "Gouvernance & qualité des données"
          },
          {
            "type": "bullets",
            "items": [
              "Apex REST (@RestResource) — Endpoints custom exposés en HTTPS",
              "Node.js + Express + PostgreSQL (pg) — API SOCMOB côté Heroku, avec une console front-end de test (index.html/app.js)",
              "Heroku Connect (Demo Edition) — Synchronisation PostgreSQL ↔ Salesforce",
              "Heroku Postgres (Essential-2) — une base par environnement (staging, production)",
              "Papertrail — centralisation et suivi temps réel des logs applicatifs sur les deux environnements",
              "Postman — Collection complète des appels API REST, avec suite de tests automatisés",
              "Apex Trigger — Remplissage automatique External ID",
              "Salesforce DX — Déploiement des métadonnées"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Architecture",
                "description": "Définition du schéma d'intégration : flux AXG→Salesforce, endpoints nécessaires, stratégie External ID"
              },
              {
                "label": "API REST Postman",
                "description": "Implémentation des 4 endpoints standard (GET/POST/PATCH/DELETE) sur les objets Salesforce via Postman, avec scripts de test pre-request/test pour enchaîner les appels sans ressaisie manuelle des identifiants"
              },
              {
                "label": "Contrôleur Apex",
                "description": "Développement du endpoint REST Apex custom : création de contact avec vérification email + désactivation sur DELETE"
              },
              {
                "label": "External ID & dédoublonnage",
                "description": "Trigger Apex pour le remplissage automatique de l'External ID à la création du contact, complété par une Matching Rule + Duplicate Rule pour bloquer les doublons dès la saisie"
              },
              {
                "label": "Heroku Connect",
                "description": "Configuration de la synchronisation bidirectionnelle Heroku PostgreSQL ↔ Salesforce pour l'application mobile, avec mapping RW/RO différencié par objet"
              },
              {
                "label": "Documentation & validation",
                "description": "Rédaction du document de déploiement complet (composants livrés, actions manuelles, ordre d'installation) et exécution de la suite de tests Postman de bout en bout sur l'environnement sandbox"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "2/2"
              },
              {
                "note": "GET, POST, PATCH, DELETE",
                "label": "Endpoints API",
                "value": "4"
              },
              {
                "note": "Heroku ↔ Salesforce",
                "label": "Synchronisation",
                "value": "Bidirectionnelle"
              },
              {
                "note": "5,7 s d'exécution totale, 232 ms de temps de réponse moyen — auth, CRUD, dédoublonnage, upsert par lots",
                "label": "Suite de tests Postman",
                "value": "17 tests, 100% passés"
              },
              {
                "note": "Architecture propre et bien documentée",
                "label": "Évaluation jury",
                "value": "Félicitations !"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "bullets",
            "items": [
              "Heroku plutôt qu'Azure : les seuils du tier gratuit Azure (cf. PDF) ne couvraient pas le besoin, et Heroku Connect offrait une synchronisation native avec Salesforce sans coder une couche ETL maison.",
              "Flow OAuth différencié par environnement plutôt qu'un choix unique : Client Credentials Flow (server-to-server, sans identifiant utilisateur stocké) pour la production, contre Username-Password Flow réservé au sandbox/PoC Postman — la production n'a jamais reposé sur un mot de passe stocké, contrairement à un choix « rapide mais provisoire » qui aurait tout mis derrière Username-Password.",
              "External ID + Trigger Apex pour l'unicité, plutôt qu'une déduplication côté Heroku Connect : la source de vérité de l'identité reste dans Salesforce, ce qui survit à un futur remplacement de la couche de synchronisation.",
              "Duplicate Rule en mode Alert only plutôt que blocage strict : un doublon signalé mais pas bloqué laisse la décision finale à l'utilisateur métier, cohérent avec un flux d'intégration où le contact peut légitimement déjà exister côté AXG.",
              "DELETE = désactivation et non suppression physique : imposé par les règles de conservation des données du secteur assurance, pas un choix technique par défaut."
            ],
            "title": "Décisions & compromis"
          },
          {
            "type": "bullets",
            "items": [
              "Authentification en production : OAuth 2.0 Client Credentials Flow (server-to-server) — aucun identifiant utilisateur Salesforce stocké côté Heroku, seuls client_id/client_secret en variables de config.",
              "Authentification en sandbox/PoC uniquement : OAuth 2.0 Username-Password Flow, utilisé exclusivement pour les tests Postman manuels — jamais exposé en production.",
              "Endpoints Apex REST exposés uniquement en HTTPS, accessibles uniquement avec un token Salesforce valide et le Permission Set INTG_API_Policies_CRUD — pas d'accès anonyme.",
              "Limite assumée : pas de résolution de conflit — acceptable car la synchronisation est unidirectionnelle (AXG vers Salesforce), pas un problème résolu par du code.",
              "Limite assumée : pas de retry/backoff documenté sur les appels Heroku Connect — un passage à l'échelle réel demanderait une file d'attente ou un mécanisme de nouvelle tentative.",
              "Flux de données : les données de contact AXG (Allemagne) rejoignent l'org Salesforce France — flux intra-UE, accès restreint par permission sets plutôt que par la géographie.",
              "Prochaine étape déjà cadrée : migration du flux sandbox/PoC vers OAuth 2.0 JWT Bearer Flow (certificat plutôt que mot de passe) pour aligner tous les environnements sur un flow server-to-server — le point de départ exact du projet de croisement Heroku-Salesforce plus poussé."
            ],
            "title": "Sécurité & limites"
          }
        ]
      },
      "es": {
        "title": "Despliegue de Salesforce con Heroku (Legarant‑AXG)",
        "heroSubtitle": "Integrar AXG en Salesforce (Legarant) y entregar una capa de integración lista para una app móvil (REST + Heroku).",
        "sections": [
          {
            "body": "LEGARANT, compañía de seguros de vida fundada en 1980 en Nantes por Émile Gordon, atiende a más de 1,2 millones de particulares en Francia. Para acelerar su implantación en Alemania, la empresa adquirió AXG, que ya gestionaba más de 50.000 clientes en su propio CRM interno. LEGARANT eligió mantener Salesforce como sistema de referencia en lugar de hacer convivir dos sistemas: los datos de AXG debían sincronizarse hacia Salesforce (en un solo sentido, Alemania → Francia), con APIs REST documentadas vía Postman, y una aplicación móvil para los agentes de seguros desplegada sobre Heroku Connect. Misión: diseñar y desplegar la arquitectura técnica completa siguiendo las buenas prácticas de Salesforce.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "body": "Este proyecto es la prueba más clara de que mis competencias en Salesforce e infraestructura no son dos currículums separados: construí la capa Apex REST Y la aplicación Heroku que la acompaña (API Express + PostgreSQL, entornos de staging y producción separados en un pipeline de Heroku), y luego redacté el runbook de despliegue que exige una entrega real a operaciones. También es el primer paso hacia un proyecto de cruce más profundo ya definido — una sincronización en tiempo real Heroku↔Salesforce vía Platform Events y OAuth 2.0 JWT Bearer Flow.",
            "type": "text",
            "title": "La prueba del cruce de competencias"
          },
          {
            "type": "bullets",
            "items": [
              "Sincronización unidireccional AXG → Salesforce sin crear duplicados (idempotencia)",
              "DELETE sobre un contacto = desactivación, no eliminación física (regla de negocio del sector seguros)",
              "External ID único para garantizar la correspondencia AXG ↔ Salesforce",
              "Conector Heroku ↔ Salesforce bidireccional para la aplicación móvil",
              "Dos entornos Heroku aislados (staging vinculado a la sandbox, producción vinculada al org Prod) unidos por un pipeline de promoción, cada uno con sus propias Connected Apps y su propia base Postgres"
            ],
            "title": "Retos técnicos"
          },
          {
            "type": "bullets",
            "items": [
              "Controlador REST Apex personalizado: creación de contacto con verificación previa del email antes de insertar",
              "Endpoint DELETE Apex: desactivación del contacto (IsActive = false) en lugar de eliminación física",
              "Trigger Apex para el relleno automático del External ID — garantiza la unicidad en la creación",
              "Heroku Connect configurado para la sincronización bidireccional Heroku PostgreSQL ↔ Salesforce, con mapeo diferenciado por objeto (RW en Account/Contact/Contract, RO en Order/OrderItem/Product2/Pricebook2/PricebookEntry)",
              "Matching Rule + Duplicate Rule en Contact (email, nombre, apellido) en modo alerta — bloquea la creación silenciosa de duplicados sin impedir la introducción de datos",
              "Colección Postman completa: GET, POST, PATCH, DELETE — todos los endpoints probados y documentados",
              "Documento de despliegue: componentes, pasos manuales, orden de instalación"
            ],
            "title": "Soluciones desarrolladas"
          },
          {
            "type": "bullets",
            "items": [
              "Permission Set dedicado (INTG_API_Policies_CRUD): derechos RW/RO explícitos por objeto, asignado únicamente al usuario de integración — sin acceso a la API mediante un perfil genérico",
              "Llamadas Postman agrupadas mediante la API REST Composite (hasta 25 subsolicitudes / 200 objetos por llamada): reduce el consumo de límites de API y garantiza la coherencia transaccional (rollback si falla una subsolicitud)",
              "Límites de API monitorizados mediante la cabecera Sforce-Limit-Info en cada respuesta HTTP, en lugar de descubrirlos a posteriori con un error 403",
              "Matching Rule + Duplicate Rule de Contact activas en modo Alert only: el duplicado se señala al crear/editar sin bloquear al usuario — una decisión de producto, no solo técnica"
            ],
            "title": "Gobernanza y calidad de datos"
          },
          {
            "type": "bullets",
            "items": [
              "Apex REST (@RestResource) — Endpoints personalizados expuestos por HTTPS",
              "Node.js + Express + PostgreSQL (pg) — API SOCMOB del lado de Heroku, con una consola front-end de pruebas (index.html/app.js)",
              "Heroku Connect (Demo Edition) — Sincronización PostgreSQL ↔ Salesforce",
              "Heroku Postgres (Essential-2) — una base de datos por entorno (staging, producción)",
              "Papertrail — centralización y seguimiento en tiempo real de los logs de aplicación en ambos entornos",
              "Postman — Colección completa de llamadas a la API REST, con suite de pruebas automatizadas",
              "Apex Trigger — Relleno automático del External ID",
              "Salesforce DX — Despliegue de metadatos"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Arquitectura",
                "description": "Definición del esquema de integración: flujo AXG→Salesforce, endpoints necesarios, estrategia de External ID"
              },
              {
                "label": "API REST con Postman",
                "description": "Implementación de los 4 endpoints estándar (GET/POST/PATCH/DELETE) sobre los objetos Salesforce vía Postman, con scripts pre-request/test que encadenan las llamadas sin reintroducir credenciales manualmente"
              },
              {
                "label": "Controlador Apex",
                "description": "Desarrollo del endpoint REST Apex personalizado: creación de contacto con verificación de email + desactivación en DELETE"
              },
              {
                "label": "External ID y desduplicación",
                "description": "Trigger Apex para el relleno automático del External ID al crear el contacto, complementado con una Matching Rule + Duplicate Rule para bloquear duplicados desde la introducción de datos"
              },
              {
                "label": "Heroku Connect",
                "description": "Configuración de la sincronización bidireccional Heroku PostgreSQL ↔ Salesforce para la aplicación móvil, con mapeo RW/RO diferenciado por objeto"
              },
              {
                "label": "Documentación y validación",
                "description": "Redacción del documento de despliegue completo (componentes entregados, acciones manuales, orden de instalación) y ejecución de la suite de pruebas Postman de extremo a extremo en el entorno sandbox"
              }
            ],
            "title": "Desarrollo del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Jurado de OpenClassrooms",
                "label": "Competencias validadas",
                "value": "2/2"
              },
              {
                "note": "GET, POST, PATCH, DELETE",
                "label": "Endpoints de API",
                "value": "4"
              },
              {
                "note": "Heroku ↔ Salesforce",
                "label": "Sincronización",
                "value": "Bidireccional"
              },
              {
                "note": "5,7 s de ejecución total, 232 ms de tiempo de respuesta medio — auth, CRUD, desduplicación, upsert por lotes",
                "label": "Suite de pruebas Postman",
                "value": "17 pruebas, 100% superadas"
              },
              {
                "note": "Arquitectura limpia y bien documentada",
                "label": "Evaluación del jurado",
                "value": "¡Felicitaciones!"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "bullets",
            "items": [
              "Heroku en lugar de Azure: los umbrales del nivel gratuito de Azure (ver PDF) no cubrían la necesidad, y Heroku Connect ofrecía sincronización nativa con Salesforce sin programar una capa ETL propia.",
              "Flujo OAuth diferenciado por entorno en lugar de una única elección: Client Credentials Flow (servidor-a-servidor, sin credenciales de usuario almacenadas) para producción, con Username-Password Flow confinado al sandbox/PoC de Postman — la producción nunca dependió de una contraseña almacenada, a diferencia de una elección «rápida pero provisional» que habría puesto todo detrás de Username-Password.",
              "External ID + trigger Apex para la unicidad, en lugar de desduplicación del lado de Heroku Connect: la fuente de verdad de la identidad permanece en Salesforce, lo que sobrevive a un futuro reemplazo de la capa de sincronización.",
              "Duplicate Rule en modo Alert only en lugar de bloqueo estricto: un duplicado señalado pero no bloqueado deja la decisión final al usuario de negocio, coherente con un flujo de integración donde el contacto puede legítimamente existir ya del lado de AXG.",
              "DELETE = desactivación y no eliminación física: impuesto por las normas de conservación de datos del sector seguros, no una elección técnica por defecto."
            ],
            "title": "Decisiones y compromisos"
          },
          {
            "type": "bullets",
            "items": [
              "Autenticación en producción: OAuth 2.0 Client Credentials Flow (servidor-a-servidor) — ninguna credencial de usuario Salesforce almacenada del lado de Heroku, solo client_id/client_secret como variables de configuración.",
              "Autenticación solo en sandbox/PoC: OAuth 2.0 Username-Password Flow, utilizado exclusivamente para pruebas manuales con Postman — nunca expuesto en producción.",
              "Endpoints Apex REST expuestos únicamente por HTTPS, accesibles solo con un token Salesforce válido y el Permission Set INTG_API_Policies_CRUD — sin acceso anónimo.",
              "Limitación asumida: sin resolución de conflictos — aceptable porque la sincronización es unidireccional (de AXG a Salesforce), no un problema que deba resolver el código.",
              "Limitación asumida: sin retry/backoff documentado en las llamadas de Heroku Connect — un escalado real requeriría una cola o un mecanismo de reintento.",
              "Flujo de datos: los datos de contacto de AXG (Alemania) llegan al org Salesforce de Francia — flujo intra-UE, acceso restringido por permission sets en lugar de por geografía.",
              "Próximo paso ya definido: migrar el flujo de sandbox/PoC a OAuth 2.0 JWT Bearer Flow (certificado en lugar de contraseña) para alinear todos los entornos en un flujo servidor-a-servidor — el punto de partida exacto del proyecto de cruce Heroku-Salesforce más profundo."
            ],
            "title": "Seguridad y limitaciones"
          }
        ]
      }
    }
  },
  {
    "slug": "cicd-pipeline-setup",
    "gallery": [
      {
        "alt": "Cover",
        "src": "https://sxcwkbuvtxxdfpfdaukk.supabase.co/storage/v1/object/public/projects/cicd-pipeline-setup/cover.svg"
      }
    ],
    "locales": {
      "en": {
        "title": "CI/CD Pipeline — Multi-environment Salesforce Deployment",
        "heroSubtitle": "CI/CD pipeline setup",
        "sections": [
          {
            "body": "To ensure quality and traceability of Salesforce deployments across multiple environments, I designed and implemented a complete CI/CD pipeline. The goal: automate Apex validations, tests, and deployments from the development sandbox all the way to production — with a structured Git branching strategy and automated checks on every Pull Request.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Git branching strategy: feature → develop → staging → main with branch protection rules",
              "GitHub Actions workflow: Apex validation + automated tests triggered on every Pull Request",
              "Automatic deployment to sandbox on develop merge, staging deployment on main merge",
              "Quick Deploy to production after full test run validation",
              "Salesforce credentials management via GitHub Secrets (encrypted SFDX Auth URL)",
              "Deployment status notifications integrated at every pipeline stage"
            ],
            "title": "What I built"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce CLI (SFDX) — metadata packaging and deployment",
              "GitHub Actions — CI/CD pipeline orchestration",
              "GitHub Secrets — secure SFDX credential management",
              "Apex Test Run — automated unit test execution",
              "SFDX Source Format — Salesforce metadata version control"
            ],
            "title": "Tools & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analysis",
                "description": "Mapping of environments (Dev, Staging, Prod) and defining a branching strategy adapted to the Salesforce release cycle"
              },
              {
                "label": "SFDX Setup",
                "description": "Project initialization in SFDX Source Format, .forceignore configuration and authentication setup via SFDX Auth URL"
              },
              {
                "label": "CI Pipeline",
                "description": "GitHub Actions workflows: Apex validation job with unit test execution triggered on every Pull Request to develop"
              },
              {
                "label": "CD Pipeline",
                "description": "Deployment automation: sandbox on develop merge, staging on main merge — with Quick Deploy to production after validation"
              },
              {
                "label": "Security",
                "description": "SFDX Auth URL credentials stored in GitHub Secrets, main and staging branch protection, mandatory review rules"
              },
              {
                "label": "Documentation",
                "description": "Git contribution guide, naming conventions and rollback procedures in case of deployment failure"
              }
            ],
            "title": "Implementation steps"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Dev, Staging, Production",
                "label": "Environments covered",
                "value": "3"
              },
              {
                "note": "Per Pull Request",
                "label": "Validation time",
                "value": "< 5 min"
              },
              {
                "note": "Fully automated",
                "label": "Manual deployments",
                "value": "0"
              },
              {
                "note": "Apex — required for deployment",
                "label": "Test coverage",
                "value": "> 75%"
              }
            ],
            "title": "Results"
          }
        ]
      },
      "fr": {
        "title": "Pipeline CI/CD — Déploiement Salesforce multi-environnements",
        "heroSubtitle": "CI/CD pipeline setup",
        "sections": [
          {
            "body": "Pour garantir la qualité et la traçabilité des déploiements Salesforce sur plusieurs environnements, j'ai conçu et mis en place un pipeline CI/CD complet. L'objectif : automatiser les validations Apex, les tests, et les déploiements de la sandbox de développement jusqu'à la production — avec une stratégie de branches Git structurée et des checks automatiques à chaque Pull Request.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Stratégie de branches Git : feature → develop → staging → main avec protection des branches critiques",
              "Workflow GitHub Actions : validation Apex + tests automatiques à chaque Pull Request",
              "Déploiement automatique en sandbox dès merge sur develop, déploiement en staging sur main",
              "Quickdeploy en production après validation complète du test run",
              "Gestion des credentials Salesforce via GitHub Secrets (SFDX Auth URL chiffrée)",
              "Notifications de statut de déploiement intégrées à chaque étape du pipeline"
            ],
            "title": "Ce que j'ai mis en place"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce CLI (SFDX) — packaging et déploiement des métadonnées",
              "GitHub Actions — orchestration du pipeline CI/CD",
              "GitHub Secrets — gestion sécurisée des credentials SFDX",
              "Apex Test Run — exécution automatisée des tests unitaires",
              "SFDX Source Format — versionning des métadonnées Salesforce"
            ],
            "title": "Outils & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse",
                "description": "Cartographie des environnements (Dev, Staging, Prod) et définition de la stratégie de branches adaptée au cycle de release Salesforce"
              },
              {
                "label": "Configuration SFDX",
                "description": "Initialisation du projet en SFDX Source Format, configuration des .forceignore et mise en place de l'authentification via SFDX Auth URL"
              },
              {
                "label": "Pipeline CI",
                "description": "Création des workflows GitHub Actions : job de validation Apex avec exécution des tests unitaires déclenchée à chaque Pull Request sur develop"
              },
              {
                "label": "Pipeline CD",
                "description": "Automatisation des déploiements : sandbox au merge sur develop, staging au merge sur main — avec Quickdeploy en production après validation"
              },
              {
                "label": "Sécurisation",
                "description": "Stockage des credentials SFDX Auth URL dans GitHub Secrets, protection des branches main et staging, règles de review obligatoires"
              },
              {
                "label": "Documentation",
                "description": "Rédaction du guide de contribution Git, des conventions de nommage et des procédures de rollback en cas d'échec"
              }
            ],
            "title": "Étapes de mise en place"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Dev, Staging, Production",
                "label": "Environnements couverts",
                "value": "3"
              },
              {
                "note": "Par Pull Request",
                "label": "Temps de validation",
                "value": "< 5 min"
              },
              {
                "note": "Entièrement automatisé",
                "label": "Déploiements manuels",
                "value": "0"
              },
              {
                "note": "Apex — requis pour déploiement",
                "label": "Couverture de tests",
                "value": "> 75%"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "CI/CD pipeline setup",
        "heroSubtitle": "CI/CD pipeline setup",
        "sections": [
          {
            "type": "bullets",
            "items": [
              "Definición del alcance: objetivos, entregables, criterios de aceptación.",
              "Realización: implementación y/o documentación de principio a fin.",
              "Validación: pruebas / evidencias + redacción de la documentación."
            ],
            "title": "Lo que hice"
          }
        ]
      }
    }
  },
  {
    "slug": "crm-healthcare-salesforce",
    "gallery": [],
    "locales": {
      "en": {
        "title": "CRM Healthcare — Patient & Appointment Management",
        "heroSubtitle": "Salesforce Admin Portfolio Project — CRM for managing patients, doctors, clinics and medical appointments on Developer Org.",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "Personal Salesforce Admin portfolio project: building a complete Healthcare CRM from a blank Developer Org. The goal is to cover the full Salesforce Administrator scope — data model, security, automation, UI, reporting — on a real-world healthcare use case.",
              "Current status: steps 1 (data model) and 2 (security & access) are complete. Steps 3 through 7 are in progress."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Patient, Clinic, Doctor, Appointment, Prescription, Medical Record",
                "label": "Custom objects",
                "value": "6 objects"
              },
              {
                "note": "across all 6 objects",
                "label": "Custom fields",
                "value": "41 fields"
              },
              {
                "note": "Clinic Admin, Doctor, Nurse, Patient Portal",
                "label": "Profiles created",
                "value": "4 profiles"
              },
              {
                "note": "Patient Onboarding (Screen Flow) + New Appointment Notification (Record-Triggered)",
                "label": "Flows created",
                "value": "2 flows"
              },
              {
                "note": "Patient, Appointment, Prescription, Doctor",
                "label": "Validation Rules",
                "value": "6 rules"
              },
              {
                "note": "Steps 3–7 remaining",
                "label": "Overall progress",
                "value": "Steps 1–2 ✅"
              }
            ],
            "title": "Progress Overview"
          },
          {
            "type": "bullets",
            "items": [
              "Patient__c — 9 fields: Date of birth, Address, Allergies, Email, Active, Gender, Blood type, Referring doctor (Lookup), SSN, Phone",
              "Clinique__c — 5 fields: Address, Doctor count, Specialty, Phone, City",
              "Medecin__c — 5 fields: Clinic Lookup, Email, RPPS number, Specialty, Phone",
              "Rendez_Vous__c — 8 fields: Clinic, Date/Time, Duration, Doctor, Reason, Notes, Patient, Status",
              "Prescription__c — 7 fields: Start/End dates, Is Active, Doctor, Medication, Patient, Dosage",
              "Dossier_Medical__c — 7 fields: Opening date, Diagnosis, Is Confidential, Doctor, Notes, Patient, Treatment"
            ],
            "title": "Data Model — 6 Custom Objects"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Step 0 — Environment & Developer Org",
                "description": "MediCare Solutions Developer Org created. ✅ Completed 04/05/2026."
              },
              {
                "label": "Step 1 — Data Model",
                "description": "6 custom objects, 41 business fields, removed HC_Patient__c duplicate. ✅ Completed 22/06/2026."
              },
              {
                "label": "Step 2 — Security & Access",
                "description": "4 profiles, 1 Permission Set, 6 Validation Rules, 2 flows created. 🟡 In progress as of 23/06/2026."
              },
              {
                "label": "Step 3 — Automation (Flow Builder)",
                "description": "Create and activate all business flows. ⏳ Upcoming."
              },
              {
                "label": "Step 4 — User Interface",
                "description": "Lightning App Builder, Page Layouts, List Views. ⏳ Upcoming."
              },
              {
                "label": "Step 5 — Test Data (Data Loader)",
                "description": "Import realistic test datasets. ⏳ Upcoming."
              },
              {
                "label": "Step 6 — Reports & Dashboards",
                "description": "Patient tracking and medical activity dashboards. ⏳ Upcoming."
              },
              {
                "label": "Step 7 — Documentation & Publication",
                "description": "Technical documentation and portfolio publishing. ⏳ Upcoming."
              }
            ],
            "title": "Project Structure — 8 Steps"
          }
        ]
      },
      "fr": {
        "title": "CRM Healthcare — Gestion de Patients & Rendez-vous",
        "heroSubtitle": "Projet Salesforce Admin — CRM de gestion de patients, médecins, cliniques et rendez-vous médicaux sur Developer Org.",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Projet personnel de portfolio Salesforce Admin : construire un CRM Healthcare complet depuis une Developer Org vierge. L'objectif est de couvrir l'ensemble du périmètre Salesforce Administrator — modèle de données, sécurité, automatisation, interface, reporting — sur un cas métier concret dans le secteur médical.",
              "Statut actuel : étapes 1 (modèle de données) et 2 (sécurité & accès) terminées. Étapes 3 à 7 en cours de réalisation."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Patient, Clinique, Médecin, RDV, Prescription, Dossier Médical",
                "label": "Objets custom créés",
                "value": "6 objets"
              },
              {
                "note": "répartis sur les 6 objets",
                "label": "Champs custom",
                "value": "41 champs"
              },
              {
                "note": "Admin Clinique, Médecin, Infirmier, Patient Portal",
                "label": "Profils créés",
                "value": "4 profils"
              },
              {
                "note": "Onboarding Patient (Screen Flow) + Notification RDV (Record-Triggered)",
                "label": "Flows créés",
                "value": "2 flows"
              },
              {
                "note": "Patient, RDV, Prescription, Médecin",
                "label": "Validation Rules",
                "value": "6 règles"
              },
              {
                "note": "Étapes 3–7 à venir",
                "label": "Avancement global",
                "value": "Étapes 1–2 ✅"
              }
            ],
            "title": "État d'avancement"
          },
          {
            "type": "bullets",
            "items": [
              "Patient__c — 9 champs : Date de naissance, Adresse, Allergies, Email, Genre, Groupe sanguin, Médecin référent (Lookup), N° Sécu, Téléphone",
              "Clinique__c — 5 champs : Adresse, Nb Médecins, Spécialité, Téléphone, Ville",
              "Medecin__c — 5 champs : Lookup Clinique, Email, N° RPPS, Spécialité, Téléphone",
              "Rendez_Vous__c — 8 champs : Clinique, Date/Heure, Durée, Médecin, Motif, Notes, Patient, Statut",
              "Prescription__c — 7 champs : Dates début/fin, Est Active, Médecin, Médicament, Patient, Posologie",
              "Dossier_Medical__c — 7 champs : Date ouverture, Diagnostic, Est Confidentiel, Médecin, Notes, Patient, Traitement"
            ],
            "title": "Modèle de données — 6 objets custom"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Étape 0 — Environnement & Developer Org",
                "description": "Création de la Developer Org MediCare Solutions. ✅ Terminé le 04/05/2026."
              },
              {
                "label": "Étape 1 — Modèle de données",
                "description": "6 objets custom, 41 champs métier, suppression du doublon HC_Patient__c. ✅ Terminé le 22/06/2026."
              },
              {
                "label": "Étape 2 — Sécurité & Accès",
                "description": "4 profils, 1 Permission Set, 6 Validation Rules, 2 flows créés. 🟡 En cours au 23/06/2026."
              },
              {
                "label": "Étape 3 — Automatisation (Flow Builder)",
                "description": "Création et activation de tous les flows métier. ⏳ À venir."
              },
              {
                "label": "Étape 4 — Interface Utilisateur",
                "description": "Lightning App Builder, Page Layouts, List Views. ⏳ À venir."
              },
              {
                "label": "Étape 5 — Données de test (Data Loader)",
                "description": "Import de jeux de données réalistes. ⏳ À venir."
              },
              {
                "label": "Étape 6 — Reports & Dashboards",
                "description": "Tableaux de bord de suivi patients et activité médicale. ⏳ À venir."
              },
              {
                "label": "Étape 7 — Documentation & Publication",
                "description": "Documentation technique et publication dans le portfolio. ⏳ À venir."
              }
            ],
            "title": "Structure du projet — 8 étapes"
          }
        ]
      }
    }
  },
  {
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
                "value": "100%"
              },
              {
                "note": "Emergencies, SLA, parts, reports",
                "label": "Business scenarios",
                "value": "8+"
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
                "value": "100%"
              },
              {
                "note": "Urgences, SLA, pièces, rapports",
                "label": "Scenarios métier",
                "value": "8+"
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
  },
];
