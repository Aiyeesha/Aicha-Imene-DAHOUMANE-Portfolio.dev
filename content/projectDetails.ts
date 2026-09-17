// SOURCE OF TRUTH — hand-edit this file.
// Per-slug, per-locale project content: title / heroSubtitle / sections + gallery.
// Card metadata lives in content/projects.ts. Deep case studies (which replace
// `sections` for a given slug) live in content/projects/<slug>/<locale>.mdx —
// those slugs keep only title + heroSubtitle here; their sections were removed
// once the MDX existed.
// Gallery `src` values are repo-local paths under public/projects/<slug>/.
// Read path: lib/data/projectsSource.ts.
//
// (Left Supabase in the de-Supabase refactor — this is now the only source.)

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

export const projectDetails: ProjectDetails[] = [
  {
    "slug": "hardware-upgrade-hp-laptop",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/hardware-upgrade-hp-laptop/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/hardware-upgrade-hp-laptop/screenshot-1.webp"
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
            "body": "Le PC portable HP d'une amie souffrait de deux problèmes bloquants : un manque de réactivité (16 Go de RAM insuffisants pour un usage quotidien multi-onglets) et un espace disque saturé (HDD 500 Go presque plein). Plutôt qu'acheter un nouveau PC, j'ai proposé un upgrade matériel ciblé : doubler la RAM et remplacer le HDD par un SSD plus grand — en clonant les données pour garantir zéro perte, zéro réinstallation.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Deux goulots identifiés : RAM insuffisante (pagination constante) et HDD mécanique lent (démarrage et lancement des apps)",
              "Manuel de service HP consulté : 2 emplacements SO-DIMM DDR4-2666 (max 32 Go) et slot SATA 2,5\"",
              "2 barrettes Samsung DDR4-2666 SO-DIMM 16 Go sélectionnées — même marque que l'origine pour compatibilité dual-channel",
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
                "description": "Clips libérés, barrette d'origine 16 Go retirée. 2 nouvelles barrettes DDR4 16 Go insérées à 45° dans les deux emplacements jusqu'au clic des clips."
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
        "title": "Actualización de hardware del portátil HP — RAM y SSD",
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
            "body": "Heme Biotech (\"Remedies for those we love\"), a pharmaceutical company specializing in blood disorders, had assigned Alex, a chemistry researcher, to build a small Java trend-analysis tool: read a symptom file and output each symptom's count, alphabetically sorted. Alex got stuck with a counter that always returned 0. Caroline, CTO and co-founder, brought me in to diagnose the bug, refactor the code to Java OOP standards, and document everything in Javadoc for team handover.",
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
            "body": "Heme Biotech (\"Des remèdes pour ceux qu'on aime\"), entreprise pharmaceutique spécialisée dans les troubles sanguins, avait confié à Alex, chercheur en chimie, le développement d'un petit outil Java d'analyse de tendances : lire un fichier de symptômes et produire le décompte de chacun, trié alphabétiquement. Alex s'est retrouvé bloqué avec un compteur qui retournait toujours 0. Caroline, directrice technique et cofondatrice, m'a confié la suite : diagnostiquer le bug, refactoriser vers des standards Java OOP, et documenter le tout en Javadoc pour la reprise en équipe.",
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
            "title": "Stack & Technologies"
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
              "La lectura del archivo era correcta, pero el conteo era incorrecto: el contador siempre devolvía 0, sin importar el número real de apariciones (ej. 3 apariciones de \"dolor de cabeza\" → 0 en la salida). Alex, investigador de química, se quedó bloqueado en este punto; Caroline, directora técnica y cofundadora, me encargó el resto: diagnosticar el error, refactorizar el código a POO y documentarlo todo para el traspaso al equipo."
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
  },
  {
    "slug": "homelab-cowrie-honeypot",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/homelab-cowrie-honeypot/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/homelab-cowrie-honeypot/screenshot-13.webp"
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
                "description": "I installed Cowrie on the target, redirected port 22 to the honeypot via iptables, and moved the real SSH service to port 2200, with persistent rules via iptables-persistent."
              },
              {
                "title": "Major incident: lost access to the attacker machine",
                "description": "I got locked out of the Kali Linux password with no usable recovery snapshot. I decided to fully reinstall the VM from the official image rather than attempt an uncertain recovery."
              },
              {
                "title": "Brute-force attack",
                "description": "I launched Hydra against the honeypot. My first attempt failed (default parallelism too high for Cowrie's Twisted-based SSH implementation); I fixed it by lowering the number of parallel tasks."
              },
              {
                "title": "Forensic log analysis",
                "description": "I extracted JSON events with jq: commands typed by the simulated attacker, file download attempts, full session reconstruction."
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
              "The most instructive part of this project was unplanned: a configuration mistake on my part locked me out of the attacker machine, with no usable snapshot to roll back to.",
              "Rather than lose time on an uncertain recovery (a failed GRUB single-user attempt), I fully reinstalled the VM from the official Kali image, restored the network configuration and tooling, and resumed the planned attack. I documented this incident in detail in the project log, with a full timeline and remediation commands."
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
                "description": "J'ai installé Cowrie sur la cible, redirigé le port 22 vers le honeypot via iptables et déplacé le vrai service SSH vers le port 2200, avec persistance des règles via iptables-persistent."
              },
              {
                "title": "Incident majeur : perte d'accès à la machine attaquante",
                "description": "Je me suis retrouvée bloquée hors du mot de passe de Kali Linux, sans snapshot de secours exploitable. J'ai décidé de réinstaller entièrement la VM à partir de l'image officielle plutôt que de tenter une récupération incertaine."
              },
              {
                "title": "Attaque par force brute",
                "description": "J'ai lancé Hydra contre le honeypot. Ma première tentative a échoué (parallélisme par défaut trop élevé pour l'implémentation Twisted de Cowrie) ; je l'ai corrigée en réduisant le nombre de tâches parallèles."
              },
              {
                "title": "Analyse forensique des logs",
                "description": "J'ai extrait les événements JSON avec jq : commandes tapées par l'attaquant simulé, tentatives de téléchargement de fichiers, reconstitution complète de la session."
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
              "Le point le plus formateur du projet n'était pas prévu au départ : une erreur de manipulation de ma part a verrouillé mon accès à la machine attaquante, sans snapshot exploitable pour revenir en arrière.",
              "Plutôt que de perdre du temps sur une récupération incertaine (tentative infructueuse en mode recovery GRUB), j'ai réinstallé entièrement la VM depuis l'image officielle Kali, restauré la configuration réseau et les outils nécessaires, puis repris l'attaque planifiée. J'ai documenté cet incident en détail dans le journal du projet, avec la chronologie complète et les commandes de remédiation."
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
                "description": "Instalé Cowrie en el objetivo, redirigí el puerto 22 al honeypot mediante iptables y trasladé el servicio SSH real al puerto 2200, con reglas persistentes vía iptables-persistent."
              },
              {
                "title": "Incidente mayor: pérdida de acceso a la máquina atacante",
                "description": "Me quedé bloqueada fuera de la contraseña de Kali Linux, sin ningún snapshot de recuperación utilizable. Decidí reinstalar por completo la VM desde la imagen oficial en lugar de intentar una recuperación incierta."
              },
              {
                "title": "Ataque de fuerza bruta",
                "description": "Lancé Hydra contra el honeypot. Mi primer intento falló (paralelismo por defecto demasiado alto para la implementación SSH basada en Twisted de Cowrie); lo corregí reduciendo el número de tareas paralelas."
              },
              {
                "title": "Análisis forense de logs",
                "description": "Extraje los eventos JSON con jq: comandos escritos por el atacante simulado, intentos de descarga de archivos, reconstrucción completa de la sesión."
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
              "La parte más formativa del proyecto no estaba planeada: un error de manipulación por mi parte bloqueó mi acceso a la máquina atacante, sin ningún snapshot utilizable para revertir.",
              "En lugar de perder tiempo en una recuperación incierta (un intento fallido en modo recovery de GRUB), reinstalé por completo la VM desde la imagen oficial de Kali, restauré la configuración de red y las herramientas necesarias, y retomé el ataque planificado. Documenté este incidente en detalle en el diario del proyecto, con la cronología completa y los comandos de remediación."
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
        "src": "/projects/homelab-network-sniffing/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/homelab-network-sniffing/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/homelab-network-sniffing/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/homelab-network-sniffing/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/homelab-network-sniffing/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/homelab-network-sniffing/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/homelab-network-sniffing/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/homelab-network-sniffing/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/homelab-network-sniffing/screenshot-8.webp"
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
                "description": "I captured ARP and ICMP traffic between the two lab machines, saved it to .pcap, and replayed it from the command line."
              },
              {
                "title": "Visual analysis with Wireshark",
                "description": "I opened the capture and explored the packet anatomy layer by layer (Ethernet → IP → TCP/ICMP), applying display filters."
              },
              {
                "title": "Plaintext HTTP interception",
                "description": "I started a test HTTP server, captured the targeted traffic, and read the full request and response via Follow HTTP Stream."
              },
              {
                "title": "FTP credential interception",
                "description": "I deployed a test vsftpd server, connected with a dedicated account, and read the login/password directly in cleartext in the Wireshark packet list."
              },
              {
                "title": "Custom Python sniffer (Scapy)",
                "description": "I wrote a script capturing and analyzing ARP/TCP/UDP traffic live, and successfully tested it on real traffic (ARP resolution, active SSH session)."
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
                "description": "J'ai capturé le trafic ARP et ICMP entre les deux machines du lab, enregistré au format .pcap, puis relu en ligne de commande."
              },
              {
                "title": "Analyse visuelle avec Wireshark",
                "description": "J'ai ouvert la capture et exploré l'anatomie de paquet couche par couche (Ethernet → IP → TCP/ICMP), en appliquant des filtres d'affichage."
              },
              {
                "title": "Interception HTTP en clair",
                "description": "J'ai démarré un serveur HTTP de test, capturé le trafic ciblé, puis lu la requête et la réponse complètes via Follow HTTP Stream."
              },
              {
                "title": "Interception d'identifiants FTP",
                "description": "J'ai déployé un serveur vsftpd de test, connecté avec un compte dédié, et lu directement le login/mot de passe en clair dans la liste des paquets Wireshark."
              },
              {
                "title": "Développement d'un sniffeur Python (Scapy)",
                "description": "J'ai écrit un script capturant et analysant le trafic ARP/TCP/UDP en direct, testé avec succès sur du trafic réel (résolution ARP, session SSH active)."
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
                "description": "Capturé el tráfico ARP e ICMP entre las dos máquinas del laboratorio, lo guardé en formato .pcap y lo repasé desde la línea de comandos."
              },
              {
                "title": "Análisis visual con Wireshark",
                "description": "Abrí la captura y exploré la anatomía del paquete capa por capa (Ethernet → IP → TCP/ICMP), aplicando filtros de visualización."
              },
              {
                "title": "Interceptación de HTTP en claro",
                "description": "Inicié un servidor HTTP de prueba, capturé el tráfico dirigido y leí la solicitud y la respuesta completas mediante Follow HTTP Stream."
              },
              {
                "title": "Interceptación de credenciales FTP",
                "description": "Desplegué un servidor vsftpd de prueba, me conecté con una cuenta dedicada y leí directamente el usuario/contraseña en texto plano en la lista de paquetes de Wireshark."
              },
              {
                "title": "Sniffer personalizado en Python (Scapy)",
                "description": "Escribí un script que captura y analiza tráfico ARP/TCP/UDP en vivo, y lo probé con éxito en tráfico real (resolución ARP, sesión SSH activa)."
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
        "src": "/projects/homelab-password-cracking-lab/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/homelab-password-cracking-lab/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/homelab-password-cracking-lab/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/homelab-password-cracking-lab/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/homelab-password-cracking-lab/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/homelab-password-cracking-lab/screenshot-5.webp"
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
                "description": "I generated unsalted MD5 / SHA1 / SHA256 hashes, then a salted SHA-512 one via mkpasswd, personally verifying the avalanche effect and the role of the salt."
              },
              {
                "title": "Cracking with John the Ripper",
                "description": "I ran a dictionary attack (rockyou.txt, 14.3 million entries) against test MD5 hashes."
              },
              {
                "title": "Cracking with Hashcat",
                "description": "I ran an MD5 vs bcrypt benchmark, then dictionary, rule-based (best64) and mask/brute-force attacks with keyspace calculations."
              },
              {
                "title": "GPU-less environment troubleshooting",
                "description": "I resolved a chain of OpenCL failures on a VM with no dedicated GPU: a missing software driver, a misplaced environment variable, and insufficient RAM."
              },
              {
                "title": "Multi-user case study",
                "description": "I ran three accounts of increasing strength (a dictionary word, a complexified word, a five-word passphrase) against the same combined attack."
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
              "Hashcat requires a working OpenCL backend even for CPU-only use, which was absent by default on this GPU-less VM. Resolving it took me several steps: the expected package (pocl-opencl-icd) did not exist in Kali's repositories, so I installed the mesa-opencl-icd alternative (llvmpipe software rendering) instead.",
              "The OpenCL platform then stayed invisible to Hashcat (0 devices exposed) until I explicitly enabled it via the RUSTICL_ENABLE environment variable. My first attempt at making this persistent failed because I'd placed it in ~/.bashrc, while Kali's default shell is Zsh, which doesn't read that file.",
              "Once I got the device detected, the benchmark still failed with a memory allocation error, which I resolved by raising the VM's allocated RAM from ~2 GB to 8 GB in VMware settings."
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
                "description": "J'ai généré des hashs MD5 / SHA1 / SHA256 non salés, puis un SHA-512 salé via mkpasswd, en vérifiant personnellement l'effet avalanche et le rôle du sel."
              },
              {
                "title": "Cassage avec John the Ripper",
                "description": "J'ai lancé une attaque par dictionnaire (rockyou.txt, 14,3 millions d'entrées) sur des hashs MD5 de test."
              },
              {
                "title": "Cassage avec Hashcat",
                "description": "J'ai exécuté un benchmark MD5 vs bcrypt, puis des attaques par dictionnaire, par règles de mutation (best64) et par masque / force brute avec calcul de l'espace de recherche."
              },
              {
                "title": "Dépannage environnement sans GPU",
                "description": "J'ai résolu une chaîne de pannes OpenCL sur une VM sans carte graphique dédiée : pilote logiciel manquant, variable d'environnement mal placée, RAM insuffisante."
              },
              {
                "title": "Cas pratique multi-utilisateurs",
                "description": "J'ai soumis trois comptes de robustesse croissante (mot du dictionnaire, mot complexifié, passphrase de cinq mots) à la même attaque combinée."
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
              "Hashcat nécessite un backend OpenCL fonctionnel même pour un usage CPU pur, absent par défaut sur cette VM sans GPU. La résolution m'a demandé plusieurs étapes successives : le paquet attendu (pocl-opencl-icd) n'existant pas dans les dépôts Kali, j'ai installé l'alternative mesa-opencl-icd (rendu logiciel llvmpipe).",
              "La plateforme OpenCL restait ensuite invisible pour Hashcat (0 device exposé) jusqu'à ce que je l'active explicitement via la variable d'environnement RUSTICL_ENABLE. Ma première tentative de persistance a échoué car je l'avais placée dans ~/.bashrc, alors que le shell par défaut de Kali est Zsh, qui ne lit pas ce fichier.",
              "Une fois le device détecté, le benchmark échouait encore avec une erreur d'allocation mémoire, que j'ai résolue en portant la RAM allouée à la VM de ~2 Go à 8 Go dans les paramètres VMware."
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
                "description": "Generé hashes MD5 / SHA1 / SHA256 sin salar, luego uno SHA-512 salado vía mkpasswd, verificando personalmente el efecto avalancha y el papel de la sal."
              },
              {
                "title": "Cracking con John the Ripper",
                "description": "Ejecuté un ataque por diccionario (rockyou.txt, 14,3 millones de entradas) sobre hashes MD5 de prueba."
              },
              {
                "title": "Cracking con Hashcat",
                "description": "Ejecuté un benchmark MD5 vs bcrypt, y luego ataques por diccionario, por reglas de mutación (best64) y por máscara/fuerza bruta con cálculo del espacio de búsqueda."
              },
              {
                "title": "Resolución de un entorno sin GPU",
                "description": "Resolví una cadena de fallos OpenCL en una VM sin tarjeta gráfica dedicada: controlador de software ausente, variable de entorno mal ubicada, RAM insuficiente."
              },
              {
                "title": "Caso práctico multiusuario",
                "description": "Sometí tres cuentas de robustez creciente (palabra de diccionario, palabra complejizada, passphrase de cinco palabras) al mismo ataque combinado."
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
              "Hashcat necesita un backend OpenCL funcional incluso para uso exclusivo de CPU, ausente por defecto en esta VM sin GPU. Resolverlo me llevó varios pasos: el paquete esperado (pocl-opencl-icd) no existía en los repositorios de Kali, así que instalé la alternativa mesa-opencl-icd (renderizado por software llvmpipe).",
              "La plataforma OpenCL seguía siendo invisible para Hashcat (0 dispositivos expuestos) hasta que la activé explícitamente mediante la variable de entorno RUSTICL_ENABLE. Mi primer intento de hacerla persistente falló porque la había colocado en ~/.bashrc, mientras que el shell por defecto de Kali es Zsh, que no lee ese archivo.",
              "Una vez detectado el dispositivo, el benchmark seguía fallando con un error de asignación de memoria, que resolví aumentando la RAM asignada a la VM de ~2 GB a 8 GB en la configuración de VMware."
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
        "src": "/projects/it-ops-disk-backup/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/it-ops-disk-backup/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/it-ops-disk-backup/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/it-ops-disk-backup/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/it-ops-disk-backup/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/it-ops-disk-backup/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/it-ops-disk-backup/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/it-ops-disk-backup/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/it-ops-disk-backup/screenshot-8.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Disk Partitioning & Backup (AOMEI + Windows Server Backup)",
        "heroSubtitle": "AOMEI Partition Assistant · AOMEI Backupper · Windows Server 2012 Backup · VirtualBox",
        "sections": [
          {
            "body": "As part of a training exercise at Greta du Val d'Oise (Lycée Louis Jouvet, Taverny) under trainer Miguel MI-POUDOU, I worked on two VMs in VirtualBox: a Windows 10 client VM (partition resize + disk backup with AOMEI tools) and a Windows Server 2012 VM (Windows Server Backup role installation + scheduled daily backup).",
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
              "I resized the E: partition from 50.04 GB to 47.71 GB via AOMEI Partition Assistant — zero data loss",
              "I created a full disk image backup with AOMEI Backupper Standard — completed successfully",
              "I installed and enabled the Windows Server Backup role on Windows Server 2012",
              "I configured a scheduled backup: full recovery + system state, VSS full, daily at 14:00",
              "The first run transferred 22.67 GB to the dedicated 60 GB virtual disk"
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
                "description": "I right-clicked E: → Resize/Move, reduced it from 50.04 GB to 47.71 GB (NTFS, 4 KB cluster, Disk 3), and clicked Apply to commit the pending operation."
              },
              {
                "label": "Disk backup — AOMEI Backupper",
                "description": "I went to Backup → Disk Backup, named the task, selected the source disks, chose the destination path, and started it. The operation completed successfully."
              },
              {
                "label": "Install Windows Server Backup role",
                "description": "I opened Server Manager → Manage → Add Roles and Features, checked Windows Server Backup in the Features list, enabled auto-restart, and clicked Install."
              },
              {
                "label": "Configure scheduled backup",
                "description": "I added a dedicated 60 GB virtual disk as destination and configured full recovery + system state, VSS full backup, daily at 14:00. The first run transferred 22.67 GB to SRV2 2022_03_21 13:18 DISK_01."
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
            "body": "Dans le cadre d'un exercice de formation au Greta du Val d'Oise (Lycée Louis Jouvet, Taverny) sous la direction de Miguel MI-POUDOU, j'ai travaillé sur deux VM VirtualBox : une VM cliente Windows 10 (redimensionnement de partition + sauvegarde avec les outils AOMEI) et une VM serveur Windows Server 2012 (installation du rôle Sauvegarde Windows Server + sauvegarde planifiée quotidienne).",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "VM cliente Windows 10 : partition E: surdimensionnée à réduire sans perte de données",
              "VM serveur Windows Server 2012 : aucune stratégie de sauvegarde planifiée en place",
              "Besoin d'une image disque complète de la VM cliente comme point de restauration",
              "Besoin d'une sauvegarde quotidienne automatisée du serveur incluant l'état système",
              "Environnement virtualisé VirtualBox — exercice en conditions de formation réelles"
            ],
            "title": "Périmètre & Objectifs"
          },
          {
            "type": "bullets",
            "items": [
              "J'ai réduit la partition E: de 50,04 Go à 47,71 Go via AOMEI Partition Assistant — aucune perte de données",
              "J'ai créé une image disque complète avec AOMEI Backupper Standard — opération réussie",
              "J'ai installé et activé le rôle Sauvegarde Windows Server sur Windows Server 2012",
              "J'ai configuré une sauvegarde planifiée : récupération complète + état du système, VSS complète, quotidienne à 14h00",
              "22,67 Go ont été transférés vers le disque virtuel dédié de 60 Go au premier lancement"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "AOMEI Partition Assistant — redimensionnement de partitions sans perte de données",
              "AOMEI Backupper Standard — sauvegarde image disque complète",
              "Sauvegarde Windows Server — rôle natif Windows Server 2012",
              "VSS (Volume Shadow Copy Service) — sauvegarde cohérente de l'état système",
              "VirtualBox — hyperviseur de type 2 pour l'environnement de formation",
              "Windows 10 / Windows Server 2012 — systèmes d'exploitation des VM"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Redimensionnement — AOMEI Partition Assistant",
                "description": "J'ai fait un clic droit sur E: → Redimensionner/Déplacer, réduit la partition de 50,04 Go à 47,71 Go (NTFS, cluster 4 Ko, Disque 3), puis cliqué sur Appliquer pour valider l'opération en attente."
              },
              {
                "label": "Sauvegarde disque — AOMEI Backupper",
                "description": "Je suis allée dans Sauvegarder → Sauvegarde de disque, j'ai nommé la tâche, sélectionné les disques source, choisi la destination, puis lancé l'opération. Elle s'est terminée avec succès."
              },
              {
                "label": "Installation du rôle Sauvegarde Windows Server",
                "description": "J'ai ouvert le Gestionnaire de serveur → Gérer → Ajouter des rôles et fonctionnalités, coché Sauvegarde Windows Server dans les fonctionnalités, activé le redémarrage automatique, puis cliqué sur Installer."
              },
              {
                "label": "Configuration de la sauvegarde planifiée",
                "description": "J'ai ajouté un disque virtuel dédié de 60 Go comme destination et configuré la sauvegarde : récupération complète + état système, VSS complète, quotidienne à 14h00. Le premier lancement a transféré 22,67 Go vers SRV2 2022_03_21 13:18 DISK_01."
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
        "title": "Particionado y copia de seguridad de disco (AOMEI + Windows Server Backup)",
        "heroSubtitle": "AOMEI Partition Assistant · AOMEI Backupper · Copia de seguridad Windows Server · VirtualBox · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Como parte de un ejercicio de formación en el Greta du Val d'Oise (Lycée Louis Jouvet, Taverny) bajo la dirección de Miguel MI-POUDOU, trabajé en dos VM VirtualBox: una VM cliente Windows 10 (redimensionamiento de partición + copia de seguridad con herramientas AOMEI) y una VM servidor Windows Server 2012 (instalación del rol Copia de seguridad de Windows Server + copia programada diaria)."
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
              "Reduje la partición E: de 50,04 GB a 47,71 GB mediante AOMEI Partition Assistant — sin pérdida de datos",
              "Creé una imagen de disco completa con AOMEI Backupper Standard — operación completada con éxito",
              "Instalé y activé el rol Copia de seguridad de Windows Server en Windows Server 2012",
              "Configuré una copia de seguridad programada: recuperación completa + estado del sistema, VSS completa, diaria a las 14:00",
              "La primera ejecución transfirió 22,67 GB al disco virtual dedicado de 60 GB"
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
                "description": "Hice clic derecho en E: → Redimensionar/Mover, reduje la partición de 50,04 GB a 47,71 GB (NTFS, clúster de 4 KB, Disco 3), y hice clic en Aplicar para confirmar la operación pendiente."
              },
              {
                "label": "Copia de seguridad de disco — AOMEI Backupper",
                "description": "Fui a Copia de seguridad → Copia de seguridad de disco, nombré la tarea, seleccioné los discos origen, elegí el destino y la inicié. La operación finalizó con éxito."
              },
              {
                "label": "Instalación del rol Copia de seguridad de Windows Server",
                "description": "Abrí el Administrador del servidor → Administrar → Agregar roles y características, marqué Copia de seguridad de Windows Server en las características, activé el reinicio automático y hice clic en Instalar."
              },
              {
                "label": "Configuración de la copia programada",
                "description": "Añadí un disco virtual dedicado de 60 GB como destino y configuré la copia: recuperación completa + estado del sistema, VSS completa, diaria a las 14:00. La primera ejecución transfirió 22,67 GB a SRV2 2022_03_21 13:18 DISK_01."
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
            "body": "As part of a training exercise at Greta du Val d'Oise under trainer Marc HAZAN, I configured roaming profiles on a Windows Server 2016 domain controller (ebtai.fr) and verified synchronization from a Windows 10 client VM — both running in VirtualBox. Goal: allow users to retrieve their full work environment (desktop, documents, settings) on any domain-joined machine they log into.",
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
            "body": "Dans le cadre d'un exercice de formation au Greta du Val d'Oise sous la supervision de Marc HAZAN, j'ai configuré des profils itinérants sur un contrôleur de domaine Windows Server 2016 (ebtai.fr) et vérifié la synchronisation depuis une VM cliente Windows 10 — les deux sous VirtualBox. L'objectif : permettre aux utilisateurs de retrouver leur environnement de travail (bureau, documents, paramètres) quelle que soit la machine du domaine sur laquelle ils se connectent.",
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
            "title": "Stack & Technologies"
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
              "Como parte de un ejercicio de formación en el Greta du Val d'Oise bajo la supervisión de Marc HAZAN, configuré perfiles itinerantes en un controlador de dominio Windows Server 2016 (ebtai.fr) y verifiqué la sincronización desde una VM cliente Windows 10 — ambas bajo VirtualBox. El objetivo: permitir que los usuarios recuperen su entorno de trabajo (escritorio, documentos, configuración) sin importar en qué máquina del dominio inicien sesión."
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
  },
  {
    "slug": "it-ops-virtualization-lab",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/it-ops-virtualization-lab/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/it-ops-virtualization-lab/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/it-ops-virtualization-lab/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/it-ops-virtualization-lab/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/it-ops-virtualization-lab/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/it-ops-virtualization-lab/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/it-ops-virtualization-lab/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/it-ops-virtualization-lab/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/it-ops-virtualization-lab/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/it-ops-virtualization-lab/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/it-ops-virtualization-lab/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "/projects/it-ops-virtualization-lab/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/it-ops-virtualization-lab/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/it-ops-virtualization-lab/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "/projects/it-ops-virtualization-lab/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "/projects/it-ops-virtualization-lab/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "/projects/it-ops-virtualization-lab/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "/projects/it-ops-virtualization-lab/screenshot-17.webp"
      },
      {
        "alt": "Screenshot 18",
        "src": "/projects/it-ops-virtualization-lab/screenshot-18.webp"
      },
      {
        "alt": "Screenshot 19",
        "src": "/projects/it-ops-virtualization-lab/screenshot-19.webp"
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
              "GPO: roaming profiles and mapped drive (\\\\DCAD22\\Partage) applied at logon",
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
                "description": "OUs and accounts created: LYES (standard) and Technicien (admin). GPOs applied for roaming profiles and mapped drive \\\\DCAD22\\Partage at logon."
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
            "body": "Lab personnel réalisé dans le cadre d'une formation Systèmes & Réseaux. J ai déployé un environnement Windows Server 2022 complet sous VMware Workstation Pro 17 pour reproduire une infrastructure IT d'entreprise : domaine Active Directory, DNS, DHCP et déploiement automatisé d'OS via WDS/PXE — sur un réseau NAT VMware privé entièrement géré.",
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
              "GPO : profils itinérants et lecteur réseau (\\\\DCAD22\\Partage) mappé à l'ouverture de session",
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
              "DHCP Server — Attribution dynamique d'adresses IP avec options PXE",
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
                "description": "Windows Server 2022 installé depuis ISO. IP statique 192.168.100.250, hostname DCAD22. Promotion DC via l'assistant AD DS — création de la forêt DP-AICHA.LAN. DNS installé avec redirecteur 8.8.8.8."
              },
              {
                "label": "DHCP & WDS",
                "description": "Rôle DHCP installé et autorisé. Étendue POOL1 créée avec option PXEClient. WDS lié au domaine AD, boot.wim importé. Mode validation manuelle activé pour les machines inconnues."
              },
              {
                "label": "Active Directory & GPO",
                "description": "OUs et comptes créés : LYES (standard) et Technicien (admin). GPO appliquées pour les profils itinérants et le mappage du lecteur réseau \\\\DCAD22\\Partage à l'ouverture de session."
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
        "title": "Mantener un entorno IT virtualizado",
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
              "GPO: perfiles itinerantes y unidad de red (\\\\DCAD22\\Partage) montada al iniciar sesión",
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
                "description": "UO y cuentas creadas: LYES (estándar) y Technicien (admin). GPO aplicadas para los perfiles itinerantes y la asignación de la unidad de red \\\\DCAD22\\Partage al iniciar sesión."
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
        "src": "/projects/it-ops-workstation-setup/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/it-ops-workstation-setup/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/it-ops-workstation-setup/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/it-ops-workstation-setup/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/it-ops-workstation-setup/screenshot-4.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Workstation Setup: Windows 10 Install & Software Deployment",
        "heroSubtitle": "Windows 10 Pro · Ninite · Office 2016 · BIOS · Driver setup",
        "sections": [
          {
            "body": "As part of a training exercise at Greta du Val d'Oise under trainer Miguel MI-POUDOU, a client brought me an extremely slow HP laptop with no data to recover. My mission: full workstation rebuild — clean OS reinstall, driver validation, batch software deployment, and final configuration before client handover.",
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
              "I configured USB boot via BIOS and installed Windows 10 Pro 64-bit with the trainer-provided OEM key",
              "I completed the OOBE: region France, user account creation, Cortana, Microsoft Hello, geolocation",
              "I validated all drivers in Device Manager — network, audio, GPU",
              "I deployed 7+ applications in one unattended pass via Ninite.com — no toolbars, no clicks",
              "I installed and activated Office 2016 Professional Plus at the same time",
              "I configured desktop shortcuts, wallpaper, and Windows Backup — workstation validated by the trainer"
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
                "description": "I entered the BIOS (F2/DEL), changed the boot order to place the USB key (Windows 10 Pro ISO) first, saved with F10, and rebooted."
              },
              {
                "label": "Windows 10 Pro installation",
                "description": "I ran a French, Custom installation of Windows 10 Pro 64-bit with the OEM key, accepted the license, created the user account, and completed the OOBE (region France, Cortana, Microsoft Hello)."
              },
              {
                "label": "Driver verification",
                "description": "I opened Device Manager and validated the audio, network (Ethernet + Wi-Fi), and GPU drivers, connected the network, and installed the antivirus."
              },
              {
                "label": "Batch deployment via Ninite",
                "description": "I used Ninite.com to install Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15, and MalwareBytes in one unattended run, installing Office 2016 Pro Plus at the same time."
              },
              {
                "label": "Finalization",
                "description": "I configured the desktop shortcuts, applied the wallpaper, and enabled Windows Backup. I handed the workstation over to the client after the trainer's validation."
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
            "body": "Dans le cadre d'un exercice de formation au Greta du Val d'Oise sous la direction de Miguel MI-POUDOU, un client m'a apporté un portable HP extrêmement lent, sans données à récupérer. Ma mission : remise à neuf complète du poste — réinstallation propre de l'OS, validation des pilotes, déploiement automatisé des logiciels métier et configuration finale avant remise au client.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Réinstaller Windows 10 Pro 64 bits depuis un support USB bootable",
              "Valider tous les pilotes (audio, réseau, carte graphique) après installation",
              "Déployer rapidement l'ensemble des logiciels métier requis (7+ applications)",
              "Configurer le poste pour remise immédiate au client (raccourcis, sauvegardes, antivirus)",
              "Intervenir sans perte de données — poste vierge, aucune récupération nécessaire"
            ],
            "title": "Périmètre & Objectifs"
          },
          {
            "type": "bullets",
            "items": [
              "J'ai configuré le démarrage USB via le BIOS et installé Windows 10 Pro 64 bits avec la clé OEM fournie par le formateur",
              "J'ai finalisé l'OOBE : région France, création du compte utilisateur, Cortana, Microsoft Hello, géolocalisation",
              "J'ai validé tous les pilotes dans le Gestionnaire de périphériques — réseau, audio, GPU",
              "J'ai déployé 7+ applications en une passe via Ninite.com, sans interaction utilisateur ni toolbars",
              "J'ai installé et activé Office 2016 Professionnel Plus en parallèle",
              "J'ai configuré les raccourcis bureau, le fond d'écran et la sauvegarde Windows — poste validé par le formateur"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "Windows 10 Pro 64 bits — OS réinstallé depuis ISO sur clé USB",
              "BIOS/UEFI — configuration de l'ordre de démarrage",
              "Gestionnaire de périphériques — validation des pilotes post-installation",
              "Ninite.com — déploiement batch d'applications sans interaction (Chrome, Firefox, 7-Zip, Zoom, LibreOffice, TeamViewer, MalwareBytes)",
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
                "description": "Je suis entrée dans le BIOS (F2/DEL), j'ai modifié l'ordre de démarrage pour placer la clé USB ISO Windows 10 Pro en premier, sauvegardé avec F10, puis redémarré."
              },
              {
                "label": "Installation Windows 10 Pro",
                "description": "J'ai lancé une installation personnalisée en français de Windows 10 Pro 64 bits avec la clé OEM, accepté la licence, créé le compte utilisateur et finalisé l'OOBE (région France, Cortana, Microsoft Hello)."
              },
              {
                "label": "Validation des pilotes",
                "description": "J'ai ouvert le Gestionnaire de périphériques et validé les pilotes audio, réseau (Ethernet + Wi-Fi) et GPU, établi la connexion réseau et installé l'antivirus."
              },
              {
                "label": "Déploiement batch via Ninite",
                "description": "J'ai utilisé Ninite.com pour installer Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 et MalwareBytes en un seul passage, tout en installant Office 2016 Pro Plus en parallèle."
              },
              {
                "label": "Finalisation",
                "description": "J'ai configuré les raccourcis bureau, appliqué le fond d'écran et activé la sauvegarde Windows. J'ai remis le poste au client après validation du formateur."
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
        "title": "Preparación de puesto de trabajo: instalación de Windows 10 y despliegue de software",
        "heroSubtitle": "Windows 10 · Ninite · Office 2016 · OOBE · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Como parte de un ejercicio de formación en el Greta du Val d'Oise bajo la dirección de Miguel MI-POUDOU, un cliente me trajo un portátil HP extremadamente lento, sin datos que recuperar. Mi misión: puesta a punto completa del equipo — reinstalación limpia del SO, validación de controladores, despliegue automatizado del software profesional y configuración final antes de la entrega al cliente."
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
              "Configuré el arranque USB vía BIOS e instalé Windows 10 Pro de 64 bits con la clave OEM proporcionada por el formador",
              "Finalicé el OOBE: región Francia, creación de la cuenta de usuario, Cortana, Microsoft Hello, geolocalización",
              "Validé todos los controladores en el Administrador de dispositivos — red, audio, GPU",
              "Desplegué 7+ aplicaciones en una sola pasada vía Ninite.com, sin interacción del usuario ni barras de herramientas",
              "Instalé y activé Office 2016 Professional Plus al mismo tiempo",
              "Configuré los accesos directos de escritorio, el fondo de pantalla y la copia de seguridad de Windows — equipo validado por el formador"
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
                "description": "Entré en la BIOS (F2/DEL), cambié el orden de arranque para colocar la llave USB con la ISO de Windows 10 Pro en primer lugar, guardé con F10 y reinicié."
              },
              {
                "label": "Instalación de Windows 10 Pro",
                "description": "Realicé una instalación personalizada en francés de Windows 10 Pro de 64 bits con la clave OEM, acepté la licencia, creé la cuenta de usuario y finalicé el OOBE (región Francia, Cortana, Microsoft Hello)."
              },
              {
                "label": "Validación de controladores",
                "description": "Abrí el Administrador de dispositivos y validé los controladores de audio, red (Ethernet + Wi-Fi) y GPU, establecí la conexión de red e instalé el antivirus."
              },
              {
                "label": "Despliegue por lotes vía Ninite",
                "description": "Usé Ninite.com para instalar Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 y MalwareBytes en una sola pasada, instalando Office 2016 Pro Plus al mismo tiempo."
              },
              {
                "label": "Finalización",
                "description": "Configuré los accesos directos de escritorio, apliqué el fondo de pantalla y activé la copia de seguridad de Windows. Entregué el equipo al cliente tras la validación del formador."
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
            "title": "Stack & Technologies"
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
        "src": "/projects/pochlib-ui/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/pochlib-ui/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/pochlib-ui/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/pochlib-ui/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/pochlib-ui/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/pochlib-ui/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/pochlib-ui/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/pochlib-ui/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/pochlib-ui/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/pochlib-ui/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/pochlib-ui/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "/projects/pochlib-ui/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/pochlib-ui/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/pochlib-ui/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "/projects/pochlib-ui/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "/projects/pochlib-ui/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "/projects/pochlib-ui/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "/projects/pochlib-ui/screenshot-17.webp"
      },
      {
        "alt": "Screenshot 18",
        "src": "/projects/pochlib-ui/screenshot-18.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "SPA front-end UI (Poch'Lib)",
        "heroSubtitle": "Development of the Poch'Lib SPA frontend interface, a book management library in HTML/CSS/JS.",
        "sections": [
          {
            "body": "Great'App, a 20-person Nice-based startup, had its CTO Marie bring me in to deliver Poch'Lib — a book management SPA commissioned by bookshop 'La plume enchantée'. My mission: build the entire frontend from scratch, matching UX designer Charlotte's wireframes exactly, with flawless responsive rendering across 3 formats (mobile, tablet, desktop), using no JavaScript framework.",
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
              "I built book search via the Google Books API (Fetch) with add-to-list into a personal list (\"Poch'List\")",
              "I persisted the list across views via sessionStorage — no loss on navigation, cleared when the tab closes",
              "I implemented dynamic book removal with real-time DOM updates (solid/empty Font Awesome bookmark icons reflecting state)",
              "I organized the code into 3 ES6 modules (application.js, search.js, util.js) with import/export — zero framework dependency",
              "I built a mobile-first responsive layout with media queries for 3 breakpoints",
              "I wrote semantic HTML5 aligned with Charlotte's UX wireframes",
              "I structured the SASS (variables, mixins, nesting) — DRY approach validated by the jury",
              "I delivered an installation README to the end client"
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
                "description": "I reviewed Charlotte's mockups and broke them down into HTML/CSS components"
              },
              {
                "label": "HTML/SASS integration",
                "description": "I built the semantic structure, mobile-first styles, and set up SASS variables and mixins"
              },
              {
                "label": "JavaScript logic",
                "description": "I integrated the Fetch API, implemented book add/remove, and wired up dynamic DOM updates"
              },
              {
                "label": "Responsive refinement",
                "description": "I adjusted the media queries for all 3 formats: mobile, tablet and desktop"
              },
              {
                "label": "Documentation & delivery",
                "description": "I wrote the installation README and passed my defense with 4/4 skills validated"
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
            "body": "Great'App, startup niçoise de 20 personnes, m'a fait intervenir via sa CTO Marie pour livrer Poch'Lib — une SPA de gestion de livres commandée par la librairie « La plume enchantée ». Ma mission : construire l'intégralité du frontend de zéro, en respectant les wireframes de l'UX designer Charlotte, avec un rendu responsive sur 3 formats (mobile, tablette, bureau), sans aucun framework JavaScript.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Aucune base de code existante — projet à créer intégralement de zéro",
              "Wireframes fournis par l'UX designer à respecter à la lettre",
              "Affichage multi-format requis : mobile, tablette et bureau",
              "Consommation d'une API externe pour la recherche de livres (Fetch API)",
              "Contrainte SPA : aucun rechargement de page autorisé",
              "Livraison d'un README d'installation pour la prise en main client"
            ],
            "title": "Problèmes & Périmètre"
          },
          {
            "type": "bullets",
            "items": [
              "J'ai développé la recherche de livres via la Google Books API (Fetch) avec ajout à une liste personnelle (« Poch'List »)",
              "J'ai assuré la persistance de la liste entre les pages via sessionStorage — pas de perte au changement de vue, réinitialisée à la fermeture de l'onglet",
              "J'ai implémenté la suppression dynamique des livres avec mise à jour du DOM en temps réel (icônes Font Awesome pleine/vide selon l'état du signet)",
              "J'ai organisé le code en 3 modules ES6 (application.js, search.js, util.js) avec import/export — zéro dépendance framework",
              "J'ai construit un responsive mobile-first avec media queries pour 3 breakpoints",
              "J'ai écrit un HTML5 sémantique aligné sur les wireframes UX de Charlotte",
              "J'ai structuré le SASS (variables, mixins, nesting) — approche DRY validée par le jury",
              "J'ai livré un README d'installation au client final"
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
                "description": "J'ai étudié les maquettes de Charlotte et les ai découpées en composants HTML/CSS"
              },
              {
                "label": "Intégration HTML/SASS",
                "description": "J'ai construit la structure sémantique, les styles mobile-first, et mis en place les variables et mixins SASS"
              },
              {
                "label": "Logique JavaScript",
                "description": "J'ai intégré la Fetch API, implémenté l'ajout et la suppression de livres, et mis à jour le DOM dynamiquement"
              },
              {
                "label": "Responsive",
                "description": "J'ai ajusté les media queries pour les 3 formats : mobile, tablette et bureau"
              },
              {
                "label": "Documentation & livraison",
                "description": "J'ai rédigé le README d'installation et validé ma soutenance avec 4/4 compétences"
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
            "type": "bullets",
            "items": [
              "HTML5 semántico — estructura de la interfaz",
              "SASS — preprocesador CSS (variables, mixins, DRY)",
              "JavaScript ES6 (módulos) — lógica de la SPA repartida en 3 archivos, manipulación del DOM",
              "Google Books API — búsqueda de libros vía Fetch",
              "sessionStorage — persistencia de la lista en el cliente",
              "Font Awesome — iconos de marcador y eliminación",
              "Media queries — responsive en 3 breakpoints (móvil, tablet, escritorio)",
              "Git — control de versiones y entrega"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Análisis de wireframes",
                "description": "Revisé las maquetas de Charlotte y las descompuse en componentes HTML/CSS"
              },
              {
                "label": "Integración HTML/SASS",
                "description": "Construí la estructura semántica, los estilos mobile-first, y configuré las variables y mixins de SASS"
              },
              {
                "label": "Lógica JavaScript",
                "description": "Integré la Fetch API, implementé añadir/eliminar libros, y actualicé el DOM dinámicamente"
              },
              {
                "label": "Ajuste responsive",
                "description": "Ajusté las media queries para los 3 formatos: móvil, tablet y escritorio"
              },
              {
                "label": "Documentación y entrega",
                "description": "Redacté el README de instalación y validé mi defensa con 4/4 competencias"
              }
            ],
            "title": "Cronograma del proyecto"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Competencias validadas",
                "value": "4/4"
              },
              {
                "label": "Formatos responsive",
                "value": "3"
              },
              {
                "label": "Valoración del jurado",
                "value": "Dominio excelente"
              },
              {
                "label": "Coherencia visual",
                "value": "Wireframes respetados + tipografía/espaciados coherentes"
              }
            ],
            "title": "Resultados de la defensa"
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
        "src": "/projects/python-network-scanner/cover.svg"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/python-network-scanner/screenshot-1.svg"
      }
    ],
    "locales": {
      "en": {
        "title": "Network Scanner (FastAPI + React)",
        "heroSubtitle": "Real-time network scanner — FastAPI backend + WebSocket + React/Vite UI",
        "sections": [
          {
            "body": "I built this personal network security project: a full-stack local network scanner capable of identifying live hosts and open ports on a LAN segment, streaming results in real time via WebSocket, and classifying each service by risk level. I built it in two layers: a Python FastAPI backend with concurrent threads, and a React/Vite frontend displaying results live.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "I built host discovery: local subnet resolution and a ping sweep to list all live hosts",
              "I implemented concurrent port scanning via ThreadPoolExecutor — all top ports probed in parallel per host",
              "I built a 45-service detection table (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s...)",
              "I implemented risk classification (high / medium / low) per port via RISK_MAP (Telnet, RDP, exposed DBs...)",
              "I wired up real-time WebSocket streaming — results pushed to the frontend as each host completes",
              "I built the React/Vite frontend: live host cards, risk-colour-coded port badges, scan progress indicator"
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
            "body": "J'ai construit ce projet personnel de sécurité réseau : un scanner de réseau local full-stack capable d'identifier les hôtes actifs et les ports ouverts sur un segment LAN, de diffuser les résultats en temps réel via WebSocket, et de classifier chaque service par niveau de risque. Je l'ai conçu en deux couches : un backend Python FastAPI avec threads concurrents, et un frontend React/Vite affichant les résultats en direct.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "J'ai développé la découverte d'hôtes : résolution du sous-réseau local et ping de chaque IP pour lister les hôtes actifs",
              "J'ai implémenté le scan de ports concurrent via ThreadPoolExecutor — tous les top ports scannés en parallèle par hôte",
              "J'ai construit une table de détection de 45 services connus (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s...)",
              "J'ai implémenté la classification des risques (élevé / moyen / faible) par port via RISK_MAP (Telnet, RDP, BDD exposées...)",
              "J'ai mis en place le streaming WebSocket en temps réel — résultats envoyés au frontend dès que chaque hôte termine",
              "J'ai développé le frontend React/Vite : cartes d'hôtes en live, badges de ports colorés par risque, indicateur de progression"
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
                "description": "Chaque port ouvert est recherché dans RISK_MAP et étiqueté élevé / moyen / faible selon le risque d'exposition connu."
              },
              {
                "label": "Streaming WebSocket",
                "description": "Résultats envoyés au frontend en temps réel dès que chaque hôte termine son scan — sans attendre la fin du scan complet."
              },
              {
                "label": "Rendu React",
                "description": "Le frontend reçoit les événements JSON via WebSocket et affiche des cartes d'hôtes avec badges de ports colorés à la volée."
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
        "title": "Escáner de red (FastAPI + React)",
        "heroSubtitle": "Escáner de red en tiempo real — backend FastAPI + WebSocket + interfaz React/Vite",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Construí este escáner de red local full-stack como proyecto personal de seguridad. Mi objetivo era producir una herramienta capaz de identificar los hosts activos y los puertos abiertos en un segmento LAN, transmitir los resultados en tiempo real y clasificar cada servicio por nivel de riesgo.",
              "Lo diseñé en dos capas: un backend Python FastAPI que realiza el escaneo real con hilos concurrentes, y un frontend React/Vite que se conecta vía WebSocket y muestra los resultados en directo."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Construí un backend FastAPI con un endpoint WebSocket que transmite los resultados a medida que se obtienen — sin polling ni recarga de página.",
              "Implementé un escáner de puertos concurrente mediante ThreadPoolExecutor: recorre todos los puertos principales de una subred en paralelo, y luego agrega los resultados por host.",
              "Construí una tabla de detección de servicios que cubre 45 puertos conocidos (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s API…).",
              "Implementé una clasificación de riesgo (alto / medio / bajo) por puerto abierto basada en un RISK_MAP curado (Telnet, RDP, listener de Metasploit, bases de datos expuestas…).",
              "Añadí una API REST con CORS habilitado en paralelo al endpoint WebSocket para facilitar la integración.",
              "Construí un frontend React/Vite con tarjetas de host actualizadas en tiempo real, badges de puertos coloreados por riesgo e indicador de progreso del escaneo."
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
        "src": "/projects/python-password-checker/cover.svg"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/python-password-checker/screenshot-1.svg"
      }
    ],
    "locales": {
      "en": {
        "title": "Password Strength Analyzer (Python CLI)",
        "heroSubtitle": "Password strength analyzer — entropy, regex, HaveIBeenPwned (Python CLI)",
        "sections": [
          {
            "body": "I built this personal security-focused CLI tool: it rigorously evaluates password strength without ever transmitting the password in plain text. I built it to explore Python's regex engine, entropy mathematics, and privacy-preserving API design (HaveIBeenPwned k-anonymity). It runs interactively in the terminal and produces a full structured report in one pass.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "I implemented entropy calculation: log₂(pool^length) character-pool-aware — composite 0–100 score",
              "I compiled 6 regex rules: repeated chars, numeric/alphabetic sequences, keyboard walks (qwerty/azerty), embedded years",
              "I added dictionary matching against 30+ common passwords and base words",
              "I built crack-time estimation at 3 attack speeds (10k/s, 1M/s, 1B/s)",
              "I integrated HaveIBeenPwned via k-anonymity: only the first 5 SHA-1 chars sent to the API — the password never leaves the machine",
              "I built ANSI-colored terminal output with a progress bar, per-criterion checklist, and improvement suggestions"
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
                "description": "6 compiled regex rules applied: repetitions, sequences, keyboard walks, embedded years. Each detected pattern penalizes the score."
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
                "value": "6 regex rules"
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
            "body": "J'ai construit cet outil CLI personnel centré sur la sécurité : il évalue rigoureusement la force d'un mot de passe sans jamais le transmettre en clair. Je l'ai conçu pour explorer le moteur regex de Python, le calcul d'entropie et la conception d'API respectueuses de la vie privée (k-anonymat HaveIBeenPwned). L'outil fonctionne en mode interactif dans le terminal et produit un rapport structuré complet en une seule passe.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "J'ai implémenté le calcul d'entropie : log₂(pool^longueur) adapté au pool de caractères — score composite 0-100",
              "J'ai compilé 6 règles regex : caractères répétés, séquences numériques/alphabétiques, walks clavier (qwerty/azerty), années intégrées",
              "J'ai ajouté une correspondance dictionnaire : 30+ mots de passe courants et mots de base",
              "J'ai construit l'estimation du temps de crack à 3 vitesses d'attaque (10k/s, 1M/s, 1 milliard/s)",
              "J'ai intégré HaveIBeenPwned par k-anonymat : seuls les 5 premiers caractères du hash SHA-1 envoyés — le mot de passe ne quitte jamais la machine",
              "J'ai construit une sortie terminal ANSI colorée avec barre de progression, checklist par critère et suggestions d'amélioration"
            ],
            "title": "Fonctionnalités développées"
          },
          {
            "type": "bullets",
            "items": [
              "Python 3 stdlib — re, hashlib (SHA-1), math, getpass (masquage saisie)",
              "Regex compilés — 6 règles (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD...)",
              "k-anonymat HIBP — seul le préfixe SHA-1 de 5 caractères envoyé à l'API",
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
                "label": "Calcul d'entropie & score",
                "description": "Pool de caractères détecté (minuscules, majuscules, chiffres, spéciaux). Entropie calculée : log₂(pool^longueur). Score composite 0-100 avec bonus longueur et complexité."
              },
              {
                "label": "Analyse de patterns",
                "description": "6 règles regex compilées appliquées : répétitions, séquences, walks clavier, années intégrées. Chaque pattern détecté pénalise le score."
              },
              {
                "label": "Vérification HIBP",
                "description": "Hash SHA-1 du mot de passe calculé. Seuls les 5 premiers caractères envoyés à l'API HIBP (k-anonymat). Réponse analysée pour détecter une compromission sans révéler le mot de passe."
              },
              {
                "label": "Rapport terminal",
                "description": "Sortie ANSI colorée : score, barre de progression, checklist des critères, estimation du temps de crack, suggestions d'amélioration ciblées."
              }
            ],
            "title": "Fonctionnement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Adapté au pool de caractères",
                "label": "Modèle d'entropie",
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
        "title": "Analizador de fortaleza de contraseñas (CLI Python)",
        "heroSubtitle": "Analizador de fortaleza de contraseñas — entropía, regex, HaveIBeenPwned (CLI Python)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Construí esta herramienta de línea de comandos que evalúa rigurosamente la fortaleza de una contraseña sin transmitirla nunca en texto plano. Es un proyecto personal centrado en la seguridad, pensado para explorar el motor de regex de Python, el cálculo de entropía y el diseño de APIs respetuosas con la privacidad.",
              "La herramienta funciona en modo interactivo en la terminal, enmascara la entrada y produce un informe estructurado completo en una sola pasada."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Implementé un cálculo de entropía basado en el tamaño del conjunto de caracteres y la longitud de la contraseña (bits), con una puntuación compuesta de 0 a 100.",
              "Construí una detección de patrones mediante regex: caracteres repetidos, secuencias numéricas/alfabéticas, patrones de teclado (qwerty/azerty), años incluidos, largas series numéricas.",
              "Añadí una comparación con un diccionario de 30+ contraseñas comunes.",
              "Implementé una estimación del tiempo de crackeo a tres velocidades de ataque (10k/s, 1M/s, 1.000M/s) mediante la fórmula del espacio de búsqueda.",
              "Integré HaveIBeenPwned mediante k-anonimato: solo envío a la API los 5 primeros caracteres del hash SHA-1 — la contraseña nunca sale de la máquina.",
              "Construí una salida de terminal coloreada con ANSI, barra de progreso, checklist por criterio y sugerencias de mejora accionables."
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
    "gallery": [
      {
        "alt": "Risk heat map and add-risk form",
        "src": "/projects/risk-assessment-matrix/screenshot-1.png"
      },
      {
        "alt": "Risk register table with scored entries",
        "src": "/projects/risk-assessment-matrix/screenshot-2.png"
      }
    ],
    "locales": {
      "en": {
        "title": "Matrice de Risques — Interactive Risk Register (Rebuilt)",
        "heroSubtitle": "Interactive 5×5 likelihood/impact risk matrix — localStorage persistence, in-place editing, and a tested Python CLI for report generation",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "I rebuilt and extended matrice-risques from risk-assessment-matrix, an open-source risk assessment project. My goal: an interactive risk register with a live Likelihood × Impact heat map (5×5), paired with a Python CLI for automation (bulk import, HTML report generation) — while fixing several blocking limitations of the original along the way."
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
              "No persistence, the register was lost on page reload → I added persistence via localStorage, with full register serialization/deserialization",
              "The README documented a flat CLI (--input, --risk) but the code required undocumented subcommands (report, eval) → I rewrote the CLI to match exactly what's documented",
              "The register class's update() method was never called by the UI → I built a full \"Edit\" button, a pre-filled form, and in-place save",
              "Likelihood/impact labels were hardcoded in JS despite already existing in JSON → I made the JS load categories_risques.json dynamically (single source of truth)",
              "No automated tests → I wrote 6 pytest tests covering scoring, level boundaries, sorting, and example-data validation",
              "Windows CLI output was mis-encoded (cp1252) → I fixed it with sys.stdout.reconfigure(encoding=\"utf-8\") — correct accented characters in console"
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
              "J'ai reconstruit et enrichi matrice-risques à partir de risk-assessment-matrix, un projet open source d'évaluation des risques. Mon objectif : un registre de risques interactif avec matrice de chaleur Probabilité × Impact (5×5) en direct, assorti d'une CLI Python pour l'automatisation (import en masse, génération de rapport HTML) — et corriger au passage plusieurs limites bloquantes de l'original."
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
              "Aucune persistance, le registre était perdu au rechargement de la page → j'ai ajouté la persistance via localStorage, avec sérialisation/désérialisation complète du registre",
              "Le README documentait une CLI à plat (--input, --risk) mais le code exigeait des sous-commandes non documentées (report, eval) → j'ai réécrit la CLI pour correspondre exactement à ce qui est documenté",
              "La méthode update() de la classe de registre n'était jamais appelée par l'interface → j'ai construit un bouton « Modifier » complet, un formulaire pré-rempli et une sauvegarde en place",
              "Les libellés probabilité/impact étaient codés en dur en JS alors qu'ils existaient déjà en JSON → j'ai fait en sorte que le JS charge dynamiquement categories_risques.json (source unique)",
              "Aucun test automatisé → j'ai écrit 6 tests pytest sur le scoring, les bornes de niveaux, le tri et la validation des données d'exemple",
              "La sortie CLI Windows était mal encodée (cp1252) → j'ai corrigé cela avec sys.stdout.reconfigure(encoding=\"utf-8\") — accents corrects en console"
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
              "Reconstruí y amplié matrice-risques a partir de risk-assessment-matrix, un proyecto open source de evaluación de riesgos. Mi objetivo: un registro de riesgos interactivo con un mapa de calor Probabilidad × Impacto (5×5) en vivo, junto con una CLI de Python para automatización (importación masiva, generación de informes HTML) — corrigiendo de paso varias limitaciones bloqueantes del original."
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
              "Sin persistencia, el registro se perdía al recargar la página → añadí persistencia mediante localStorage, con serialización/deserialización completa del registro",
              "El README documentaba una CLI plana (--input, --risk) pero el código exigía subcomandos no documentados (report, eval) → reescribí la CLI para que coincidiera exactamente con lo documentado",
              "El método update() de la clase de registro nunca era llamado por la interfaz → construí un botón «Modificar» completo, un formulario precargado y guardado en línea",
              "Las etiquetas de probabilidad/impacto estaban codificadas en JS aunque ya existían en JSON → hice que el JS cargara dinámicamente categories_risques.json (fuente única)",
              "Sin tests automatizados → escribí 6 tests pytest sobre la puntuación, los límites de nivel, el ordenamiento y la validación de datos de ejemplo",
              "La salida de la CLI de Windows estaba mal codificada (cp1252) → lo corregí con sys.stdout.reconfigure(encoding=\"utf-8\") — acentos correctos en consola"
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
  },
  {
    "slug": "second-brain-claude-code",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Second Brain 2.0 — Claude Code + Notion",
        "sections": [
          {
            "body": "LLMs lose all context between sessions: every conversation starts from scratch. Meanwhile, hundreds of my Notion notes sit unused because the AI never reads them. My idea: build a persistent memory architecture where Claude Code reads structured Markdown files at the start of each session, and automatically enriches them at the end.",
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
              "I built structured Markdown memory files (YAML frontmatter) in the .claude/projects/ folder",
              "I set up automatic loading at startup via CLAUDE.md and a memory index",
              "I implemented post-session enrichment: new decisions, projects, and technical context added automatically",
              "I integrated the Notion MCP server for bidirectional sync with my knowledge base",
              "I segmented memory into user profile, active projects, tech stack, and preferences"
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
                "description": "I built the user profile and project index as local Markdown files, now active"
              },
              {
                "label": "V2 — Auto enrichment",
                "description": "Claude Code enriches memories after each significant session"
              },
              {
                "label": "V3 — Notion sync",
                "description": "I connected an MCP Notion integration for bidirectional read/write"
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
            "body": "Les LLMs perdent tout contexte entre les sessions : chaque conversation repart de zéro. Parallèlement, des centaines de mes notes Notion restent inexploitées car jamais lues par l'IA. Mon idée : créer une architecture de mémoire persistante où Claude Code lit des fichiers Markdown structurés au démarrage de chaque session, et les enrichit automatiquement à la fin.",
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
              "J'ai créé des fichiers mémoire Markdown structurés (YAML frontmatter) dans le dossier .claude/projects/",
              "J'ai mis en place le chargement automatique au démarrage via CLAUDE.md et un memory index",
              "J'ai implémenté l'enrichissement post-session : nouvelles décisions, projets et contexte technique ajoutés automatiquement",
              "J'ai intégré le serveur Notion MCP pour une synchronisation bidirectionnelle avec ma base de connaissance",
              "J'ai segmenté la mémoire en profil utilisateur, projets actifs, stack technique et préférences"
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
                "description": "J'ai mis en place le profil utilisateur et l'index projets en fichiers Markdown locaux, actifs"
              },
              {
                "label": "V2 — Enrichissement auto",
                "description": "Claude Code enrichit les mémoires après chaque session significative"
              },
              {
                "label": "V3 — Sync Notion",
                "description": "J'ai connecté une intégration MCP Notion pour la lecture/écriture bidirectionnelle"
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
        "src": "/projects/it-ops-rmm-supervision/2023-05-16%2016_44_15-.webp"
      },
      {
        "alt": "RMM Supervision — vue 2",
        "src": "/projects/it-ops-rmm-supervision/2023-05-16%2016_52_39-.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/it-ops-rmm-supervision/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/it-ops-rmm-supervision/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/it-ops-rmm-supervision/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/it-ops-rmm-supervision/screenshot-5.webp"
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
            "type": "bullets",
            "items": [
              "Distinguishing a genuine problem from background noise across 550+ endpoints spread over multiple client sites requires a consistent daily triage method, not just a glance at the dashboard.",
              "Antivirus coverage gaps only became visible by cross-referencing the Default Dashboard's aggregate counts against the software inventory of individual devices — no single view surfaced both at once.",
              "A Quick Job has to be scoped to the exact device group that needs the fix; pushing MalwareBytes fleet-wide when only a handful of machines were missing it would have wasted bandwidth and cluttered the job history for the whole team.",
              "Splashtop sessions depend on the end user being present to grant access in real time, so remote troubleshooting has to work around whoever is actually at the keyboard, not around an ideal maintenance window.",
              "Datto RMM policies and Quick Job templates are owned at the Exploitation team level, shared across the MSP's full client base — every fix had to work within that existing framework rather than introducing a one-off exception for a single device or site."
            ],
            "title": "Technical challenges"
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
            "type": "timeline",
            "steps": [
              {
                "title": "Step 1 — Morning fleet review",
                "description": "Each day started with the Default Dashboard: offline device count by type, antivirus coverage across all client sites, and any new alerts raised overnight by the Datto RMM agents."
              },
              {
                "title": "Step 2 — Device-level triage",
                "description": "For any site or device flagged during the morning review, I opened the individual device profile to check hardware specs, OS version, patch status, and software inventory before deciding on an action."
              },
              {
                "title": "Step 3 — Remote remediation via Quick Job",
                "description": "When a device was missing MalwareBytes or another required agent, I launched a Quick Job scoped to that device (or a small group) to deploy it remotely — no physical access, no user interruption."
              },
              {
                "title": "Step 4 — End-user support via Splashtop",
                "description": "For issues that needed hands-on troubleshooting, I connected to the affected machine via Splashtop with the user's consent, working side by side with Théo on the more complex incidents."
              }
            ],
            "title": "How I worked — day to day"
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
          },
          {
            "type": "bullets",
            "items": [
              "Cross-check the dashboard's aggregate numbers against individual device profiles before declaring a fleet healthy — summary counts hide per-device patch or software drift.",
              "Scope every Quick Job to the smallest device group that solves the problem; a fleet-wide push when only a few machines need it adds noise without adding value.",
              "Explain what you're about to do before taking remote control via Splashtop — a short heads-up to the user avoids confusion mid-session and builds trust.",
              "Log every intervention, even a routine Quick Job — in an MSP, the audit trail in the job history matters as much as the fix itself.",
              "Escalate ambiguous cases early instead of guessing — triaging fast and handing a complex case to the right specialist beats improvising a fix under uncertainty."
            ],
            "title": "Best Practices"
          },
          {
            "type": "bullets",
            "items": [
              "Monitoring policies and Quick Job templates were owned at the Exploitation team level, not by any single operator — day-to-day execution (dashboard checks, Quick Jobs, remote sessions) was mine, while policy design belonged to the team lead, the same division of responsibility used across the MSP's client base.",
              "Antivirus coverage gaps were closed reactively, once flagged on the dashboard, rather than through a proactive compliance policy that would auto-remediate — that policy-level fix was outside the internship's scope.",
              "Splashtop support assumes the device is online and a user is present to grant access; offline machines or unattended desks had to wait for the next Quick Job window instead of an immediate session.",
              "RMM-only interventions were tracked through Datto RMM's own job history rather than logged as separate Autotask tickets — that ticketing trail applied to the Support Technique-side incidents, not to routine Exploitation tasks."
            ],
            "title": "Known Limitations & Decisions"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.datto.com/products/rmm",
                "label": "Datto RMM — Remote Monitoring & Management"
              },
              {
                "href": "https://www.splashtop.com/",
                "label": "Splashtop — Remote access"
              },
              {
                "href": "https://www.malwarebytes.com/business",
                "label": "Malwarebytes for Business"
              }
            ],
            "title": "Tools & references"
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
            "type": "bullets",
            "items": [
              "Distinguer un problème réel du bruit de fond sur 550+ postes répartis sur plusieurs sites clients exige une méthode de triage quotidienne cohérente, pas juste un coup d'œil au tableau de bord.",
              "Les écarts de couverture antivirus n'apparaissaient qu'en croisant les compteurs agrégés du Default Dashboard avec l'inventaire logiciel de chaque poste — aucune vue unique ne réunissait les deux.",
              "Un Quick Job doit être ciblé précisément sur le groupe d'appareils concerné : déployer MalwareBytes sur l'ensemble du parc alors que seule une poignée de postes en avait besoin aurait gaspillé de la bande passante et pollué l'historique des tâches pour toute l'équipe.",
              "Les sessions Splashtop dépendent de la présence de l'utilisateur pour autoriser l'accès en temps réel : le dépannage à distance doit s'adapter à qui est réellement devant le poste, pas à une fenêtre de maintenance idéale.",
              "Les politiques Datto RMM et les modèles de Quick Job sont détenus au niveau de l'équipe Exploitation, partagés sur l'ensemble du portefeuille clients du MSP — chaque correction devait s'inscrire dans ce cadre existant plutôt que d'introduire une exception ponctuelle pour un seul appareil ou site."
            ],
            "title": "Défis techniques"
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
            "type": "timeline",
            "steps": [
              {
                "title": "Étape 1 — Revue matinale du parc",
                "description": "Chaque journée commençait par le Default Dashboard : nombre d'appareils hors ligne par type, couverture antivirus sur l'ensemble des sites clients, et nouvelles alertes levées pendant la nuit par les agents Datto RMM."
              },
              {
                "title": "Étape 2 — Triage au niveau du poste",
                "description": "Pour tout site ou appareil signalé lors de la revue matinale, j'ouvrais la fiche de l'appareil pour vérifier les caractéristiques matérielles, la version de l'OS, le statut des correctifs et l'inventaire logiciel avant de décider d'une action."
              },
              {
                "title": "Étape 3 — Remédiation à distance via Quick Job",
                "description": "Quand un poste n'avait pas MalwareBytes ou un autre agent requis, je lançais un Quick Job ciblé sur cet appareil (ou un petit groupe) pour le déployer à distance — sans accès physique, sans interruption pour l'utilisateur."
              },
              {
                "title": "Étape 4 — Support utilisateur via Splashtop",
                "description": "Pour les incidents nécessitant une intervention manuelle, je me connectais au poste concerné via Splashtop avec l'accord de l'utilisateur, en binôme avec Théo sur les cas les plus complexes."
              }
            ],
            "title": "Mon quotidien — étape par étape"
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
          },
          {
            "type": "bullets",
            "items": [
              "Toujours croiser les compteurs agrégés du tableau de bord avec les fiches individuelles avant de déclarer un parc « sain » — les totaux masquent les écarts de correctifs ou de logiciels poste par poste.",
              "Cibler chaque Quick Job sur le plus petit groupe d'appareils qui résout le problème ; un déploiement à l'échelle du parc quand seuls quelques postes sont concernés ajoute du bruit sans valeur ajoutée.",
              "Expliquer ce qu'on s'apprête à faire avant de prendre la main via Splashtop — un court message à l'utilisateur évite la confusion en cours de session et instaure la confiance.",
              "Journaliser chaque intervention, même un Quick Job de routine — dans un MSP, la traçabilité dans l'historique des tâches compte autant que la correction elle-même.",
              "Escalader tôt les cas ambigus plutôt que de deviner — trier vite et transmettre un cas complexe au bon spécialiste vaut toujours mieux qu'improviser une correction dans l'incertitude."
            ],
            "title": "Bonnes pratiques"
          },
          {
            "type": "bullets",
            "items": [
              "Les politiques de supervision et les modèles de Quick Job étaient détenus au niveau de l'équipe Exploitation, pas par un opérateur isolé — l'exécution quotidienne (contrôles du tableau de bord, Quick Jobs, sessions à distance) m'incombait, tandis que la conception des politiques relevait du responsable d'équipe, la même répartition des responsabilités appliquée sur l'ensemble du portefeuille clients du MSP.",
              "Les écarts de couverture antivirus étaient corrigés de façon réactive, une fois signalés sur le tableau de bord, plutôt que via une politique de conformité proactive avec remédiation automatique — cette correction au niveau politique sortait du périmètre du stage.",
              "Le support via Splashtop suppose que le poste est en ligne et qu'un utilisateur est présent pour autoriser l'accès ; les postes hors ligne ou inoccupés devaient attendre la prochaine fenêtre de Quick Job plutôt qu'une session immédiate.",
              "Les interventions purement RMM étaient tracées dans l'historique des tâches de Datto RMM plutôt que consignées comme tickets Autotask séparés — cette traçabilité par ticket s'appliquait aux incidents côté Support Technique, pas aux tâches courantes d'Exploitation."
            ],
            "title": "Limites connues & décisions"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.datto.com/fr/products/rmm",
                "label": "Datto RMM — Supervision et gestion à distance"
              },
              {
                "href": "https://www.splashtop.com/fr",
                "label": "Splashtop — Accès à distance"
              },
              {
                "href": "https://www.malwarebytes.com/business",
                "label": "Malwarebytes for Business"
              }
            ],
            "title": "Outils & références"
          }
        ]
      },
      "es": {
        "title": "Supervisión de infraestructura con Datto RMM",
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
            "type": "bullets",
            "items": [
              "Distinguir un problema real del ruido de fondo en más de 550 equipos repartidos en varios sitios de clientes exige un método de triaje diario coherente, no solo un vistazo al panel.",
              "Las brechas de cobertura antivirus solo se hacían visibles cruzando los recuentos agregados del Default Dashboard con el inventario de software de cada equipo — ninguna vista única mostraba ambos a la vez.",
              "Un Quick Job debe acotarse exactamente al grupo de equipos que lo necesita; desplegar MalwareBytes en todo el parque cuando solo unos pocos equipos carecían de él habría desperdiciado ancho de banda y saturado el historial de tareas de todo el equipo.",
              "Las sesiones de Splashtop dependen de que el usuario esté presente para autorizar el acceso en tiempo real, así que la resolución remota debe adaptarse a quién está realmente frente al equipo, no a una ventana de mantenimiento ideal.",
              "Las políticas de Datto RMM y las plantillas de Quick Job pertenecen al equipo de Explotación, compartidas en toda la cartera de clientes del MSP — cada corrección debía encajar en ese marco existente en lugar de introducir una excepción puntual para un solo equipo o sitio."
            ],
            "title": "Retos técnicos"
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
            "type": "timeline",
            "steps": [
              {
                "title": "Paso 1 — Revisión matinal del parque",
                "description": "Cada jornada comenzaba con el Default Dashboard: número de equipos fuera de línea por tipo, cobertura antivirus en todos los sitios de clientes y nuevas alertas generadas durante la noche por los agentes de Datto RMM."
              },
              {
                "title": "Paso 2 — Triaje a nivel de equipo",
                "description": "Para cualquier sitio o equipo señalado en la revisión matinal, abría la ficha del dispositivo para comprobar las características de hardware, la versión del sistema operativo, el estado de los parches y el inventario de software antes de decidir una acción."
              },
              {
                "title": "Paso 3 — Corrección remota vía Quick Job",
                "description": "Cuando a un equipo le faltaba MalwareBytes u otro agente requerido, lanzaba un Quick Job dirigido a ese dispositivo (o a un pequeño grupo) para desplegarlo de forma remota, sin acceso físico ni interrupción para el usuario."
              },
              {
                "title": "Paso 4 — Soporte al usuario vía Splashtop",
                "description": "Para las incidencias que requerían intervención manual, me conectaba al equipo afectado vía Splashtop con el consentimiento del usuario, trabajando junto a Théo en los casos más complejos."
              }
            ],
            "title": "Mi día a día — paso a paso"
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
          },
          {
            "type": "bullets",
            "items": [
              "Cruzar siempre los recuentos agregados del panel con las fichas individuales antes de declarar un parque «sano» — los totales ocultan desviaciones de parches o software equipo por equipo.",
              "Acotar cada Quick Job al grupo de equipos más pequeño que resuelve el problema; un despliegue a todo el parque cuando solo unos pocos equipos lo necesitan añade ruido sin aportar valor.",
              "Explicar lo que se va a hacer antes de tomar el control remoto vía Splashtop — un breve aviso al usuario evita confusión durante la sesión y genera confianza.",
              "Registrar cada intervención, incluso un Quick Job rutinario — en un MSP, la trazabilidad en el historial de tareas importa tanto como la propia corrección.",
              "Escalar pronto los casos ambiguos en lugar de adivinar — triar rápido y derivar un caso complejo al especialista adecuado siempre vale más que improvisar una solución con incertidumbre."
            ],
            "title": "Buenas prácticas"
          },
          {
            "type": "bullets",
            "items": [
              "Las políticas de supervisión y las plantillas de Quick Job pertenecían al equipo de Explotación, no a un operador individual — la ejecución diaria (revisiones del panel, Quick Jobs, sesiones remotas) era responsabilidad mía, mientras que el diseño de políticas correspondía al responsable del equipo, el mismo reparto de responsabilidades aplicado en toda la cartera de clientes del MSP.",
              "Las brechas de cobertura antivirus se corregían de forma reactiva, una vez señaladas en el panel, en lugar de mediante una política de cumplimiento proactiva con remediación automática — esa corrección a nivel de política quedaba fuera del alcance de las prácticas.",
              "El soporte vía Splashtop asume que el equipo está en línea y que un usuario está presente para autorizar el acceso; los equipos fuera de línea o sin nadie delante debían esperar a la siguiente ventana de Quick Job en lugar de una sesión inmediata.",
              "Las intervenciones puramente de RMM se registraban en el historial de tareas de Datto RMM y no como tickets independientes en Autotask — esa trazabilidad por ticket se aplicaba a las incidencias del lado de Soporte Técnico, no a las tareas rutinarias de Explotación."
            ],
            "title": "Límites conocidos y decisiones"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.datto.com/products/rmm",
                "label": "Datto RMM — Supervisión y gestión remota"
              },
              {
                "href": "https://www.splashtop.com/es",
                "label": "Splashtop — Acceso remoto"
              },
              {
                "href": "https://www.malwarebytes.com/business",
                "label": "Malwarebytes for Business"
              }
            ],
            "title": "Herramientas y referencias"
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
        "src": "/projects/workstation-mass-deployment/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/workstation-mass-deployment/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/workstation-mass-deployment/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/workstation-mass-deployment/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/workstation-mass-deployment/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/workstation-mass-deployment/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/workstation-mass-deployment/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/workstation-mass-deployment/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/workstation-mass-deployment/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/workstation-mass-deployment/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/workstation-mass-deployment/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/workstation-mass-deployment/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "/projects/workstation-mass-deployment/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "/projects/workstation-mass-deployment/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "/projects/workstation-mass-deployment/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "/projects/workstation-mass-deployment/screenshot-17.webp"
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
            "type": "bullets",
            "items": [
              "No documented fallback for a device failing mid-process — a Optiplex failing Blancco erasure (disk fault) or a Latitude failing Autopilot enrollment (hardware defect) was handled case-by-case, not as part of the repeatable process",
              "The rollout covers day-1 provisioning only: no defined re-provisioning path for a device that comes back later (employee offboarding, hardware swap, repair return) — that's a separate lifecycle process this project didn't scope",
              "Zero-touch Autopilot assumes reliable internet at first boot to reach Intune — no offline or on-prem fallback was built for sites where that assumption might not hold",
              "20–30 devices/day was chosen to catch Intune policy failures early without slowing the rollout to a crawl — untested whether a larger batch size would have surfaced the same failures just as fast"
            ],
            "title": "Known Limitations & Decisions"
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
            "type": "bullets",
            "items": [
              "Aucun repli documenté pour un poste en échec en cours de process — un Optiplex échouant à l'effacement Blancco (disque défectueux) ou un Latitude échouant à l'enrôlement Autopilot (défaut matériel) était traité au cas par cas, pas intégré au processus reproductible",
              "Le déploiement couvre uniquement la mise en service jour 1 : aucun parcours de re-provisioning défini pour un poste qui revient plus tard (départ collaborateur, échange matériel, retour SAV) — c'est un processus de cycle de vie séparé, hors périmètre de ce projet",
              "L'Autopilot zero-touch suppose une connexion internet fiable au premier démarrage pour joindre Intune — aucun repli hors-ligne ou on-prem n'a été construit pour les sites où cette hypothèse pourrait ne pas tenir",
              "Le rythme de 20-30 postes/jour a été choisi pour détecter tôt les échecs de policy Intune sans ralentir excessivement le déploiement — jamais vérifié si un lot plus large aurait révélé les mêmes échecs aussi vite"
            ],
            "title": "Limites connues & décisions"
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
        "title": "Despliegue masivo de puestos de trabajo — 264 dispositivos Dell",
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
            "type": "bullets",
            "items": [
              "Sin repliegue documentado para un equipo que falla a mitad de proceso — un Optiplex que falla en el borrado Blancco (disco defectuoso) o un Latitude que falla en la inscripción Autopilot (defecto de hardware) se gestionaba caso por caso, sin formar parte del proceso repetible",
              "El despliegue cubre solo la puesta en marcha del día 1: no hay un proceso de re-aprovisionamiento definido para un equipo que vuelve más tarde (baja de empleado, cambio de hardware, retorno de reparación) — es un proceso de ciclo de vida aparte, fuera del alcance de este proyecto",
              "El Autopilot zero-touch asume una conexión a internet fiable en el primer arranque para llegar a Intune — no se construyó ningún repliegue offline u on-prem para sedes donde esa hipótesis pudiera no cumplirse",
              "El ritmo de 20-30 equipos/día se eligió para detectar pronto los fallos de política de Intune sin ralentizar demasiado el despliegue — nunca se verificó si un lote mayor habría revelado los mismos fallos igual de rápido"
            ],
            "title": "Límites conocidos y decisiones"
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
        "src": "/projects/it-ops-incident-management/2023-05-16%2016_44_15-.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/it-ops-incident-management/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/it-ops-incident-management/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/it-ops-incident-management/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/it-ops-incident-management/screenshot-5.webp"
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
              "Tickets arrive through three different channels (phone, email, Datto RMM alerts) with three different levels of detail, so the first job on every ticket is filling the gaps before any real diagnosis starts.",
              "A support ticket has to be routed correctly on first read — user-facing issues go to Support Technique, infrastructure issues go to Exploitation — and a misrouted ticket costs time on both sides.",
              "Reproducing the exact symptom remotely, before touching any configuration, is the only way to avoid changing the wrong setting on a live client machine.",
              "A security tool flagging a legitimate site as malicious (Webroot false positive) looks identical to a genuine block from the user's side — telling the two apart requires checking the domain's actual reputation, not just trusting the alert.",
              "Every fix has to be documented in Autotask well enough to double as both a billing record and a future troubleshooting reference — writing a vague ticket note creates work for the next technician."
            ],
            "title": "Technical challenges"
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
            "type": "bullets",
            "items": [
              "This case covers a single, representative ticket end to end rather than the full volume of tickets I handled — the workflow described (intake → remote access → diagnosis → fix → documentation) is the one applied to every ticket, at different depths depending on complexity.",
              "URL suppression in the Webroot console fixes the immediate symptom for the reported domain; it does not retrain Webroot's underlying reputation scoring, so a similar false positive can recur on a different URL — that's a vendor-side limitation, not something fixable from the console.",
              "Remote resolution via Datto RMM assumes the client machine is reachable and the user available to grant access; a ticket where either condition fails would need an on-site visit, which falls outside the Support Technique workflow described here.",
              "Routing between Support Technique and Exploitation was based on the description at intake, which is a judgment call — a ticket that looks user-facing at first (like this one) can still turn out to have an infrastructure root cause, and vice versa."
            ],
            "title": "Known Limitations & Decisions"
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
              "Les tickets arrivent par trois canaux différents (téléphone, e-mail, alertes Datto RMM) avec trois niveaux de détail différents ; le premier travail sur chaque ticket est donc de combler les manques avant tout diagnostic réel.",
              "Un ticket doit être routé correctement dès la première lecture — les incidents utilisateurs vers le Support Technique, les incidents infrastructure vers l'Exploitation — et un mauvais routage coûte du temps des deux côtés.",
              "Reproduire le symptôme exact à distance, avant de toucher à une configuration, est le seul moyen d'éviter de modifier le mauvais réglage sur un poste client en production.",
              "Un outil de sécurité qui signale un site légitime comme malveillant (faux positif Webroot) ressemble en tout point à un blocage réel côté utilisateur — les distinguer nécessite de vérifier la réputation réelle du domaine, pas seulement de faire confiance à l'alerte.",
              "Chaque correction doit être documentée dans Autotask de façon suffisamment claire pour servir à la fois de pièce de facturation et de référence de dépannage future — une note de ticket vague crée du travail pour le prochain technicien."
            ],
            "title": "Défis techniques"
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
            "type": "bullets",
            "items": [
              "Ce cas couvre un ticket représentatif de bout en bout plutôt que le volume complet des tickets traités — le déroulé décrit (prise en charge → accès distant → diagnostic → correction → documentation) est celui appliqué à chaque ticket, à des degrés de profondeur variables selon la complexité.",
              "L'exclusion d'URL dans la console Webroot corrige le symptôme immédiat pour le domaine signalé ; elle ne réentraîne pas le score de réputation sous-jacent de Webroot, donc un faux positif similaire peut réapparaître sur une autre URL — c'est une limite côté éditeur, pas quelque chose de corrigeable depuis la console.",
              "La résolution à distance via Datto RMM suppose que le poste client est joignable et que l'utilisateur est disponible pour autoriser l'accès ; un ticket où l'une de ces conditions ne serait pas remplie nécessiterait un déplacement sur site, ce qui sort du périmètre du workflow Support Technique décrit ici.",
              "Le routage entre Support Technique et Exploitation reposait sur la description à la prise en charge, ce qui reste une appréciation ; un ticket qui paraît utilisateur au premier abord (comme celui-ci) peut malgré tout avoir une cause racine infrastructure, et inversement."
            ],
            "title": "Limites connues & décisions"
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
        "title": "Gestión de incidencias IT — Autotask, Webroot y Datto RMM",
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
              "Los tickets llegan por tres canales distintos (teléfono, correo electrónico, alertas de Datto RMM) con tres niveles de detalle diferentes, así que la primera tarea en cada ticket es completar la información antes de empezar el diagnóstico real.",
              "Un ticket debe enrutarse correctamente desde la primera lectura — las incidencias de usuario van a Soporte Técnico, las de infraestructura a Explotación — y un enrutamiento incorrecto cuesta tiempo a ambos lados.",
              "Reproducir el síntoma exacto en remoto, antes de tocar cualquier configuración, es la única forma de evitar cambiar el ajuste equivocado en un equipo de cliente en producción.",
              "Una herramienta de seguridad que marca un sitio legítimo como malicioso (falso positivo de Webroot) resulta indistinguible de un bloqueo real desde el punto de vista del usuario — diferenciarlos exige comprobar la reputación real del dominio, no solo confiar en la alerta.",
              "Cada corrección debe documentarse en Autotask con claridad suficiente para servir tanto de justificante de facturación como de referencia de resolución futura — una nota de ticket vaga genera trabajo para el siguiente técnico."
            ],
            "title": "Retos técnicos"
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
            "type": "bullets",
            "items": [
              "Este caso cubre un ticket representativo de principio a fin, no el volumen completo de tickets que atendía — el flujo descrito (recepción → acceso remoto → diagnóstico → corrección → documentación) es el que se aplicaba a cada ticket, con distinta profundidad según la complejidad.",
              "La exclusión de URL en la consola de Webroot corrige el síntoma inmediato para el dominio señalado; no reentrena la puntuación de reputación subyacente de Webroot, por lo que un falso positivo similar puede repetirse en otra URL — es una limitación del propio fabricante, no algo corregible desde la consola.",
              "La resolución remota vía Datto RMM asume que el equipo del cliente es alcanzable y que el usuario está disponible para autorizar el acceso; un ticket en el que alguna de estas condiciones no se cumpla requeriría una visita in situ, fuera del alcance del flujo de Soporte Técnico descrito aquí.",
              "El enrutamiento entre Soporte Técnico y Explotación se basaba en la descripción inicial, lo cual sigue siendo una valoración; un ticket que a primera vista parece de usuario (como este) puede tener igualmente una causa raíz de infraestructura, y viceversa."
            ],
            "title": "Límites conocidos y decisiones"
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
        "src": "/projects/it-ops-acronis-backup/2023-05-16%2015_54_50-.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 1",
        "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_02_50-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 2",
        "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_03_47-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 3",
        "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_04_30-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 4",
        "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_04_51-SRV-MGT.webp"
      },
      {
        "alt": "Acronis Backup — SRV-MGT vue 5",
        "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_05_10-SRV-MGT.webp"
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
            "type": "bullets",
            "items": [
              "85 active alerts across 105 protected devices meant triage had to be systematic — treating every alert as equally urgent would have buried the handful that actually risked data loss.",
              "The same symptom (a red 'failure' status) could come from four unrelated root causes — a full NAS, an offline server, a corrupted backup plan, or a network fault — so the fix had to match the actual cause, not just the alert label.",
              "Recreating a corrupted backup plan meant preserving the exact same policy (schedule, retention, destination) under a new name, without silently changing retention windows or destinations the client was relying on.",
              "Two on-premises NAS destinations were both approaching their 10.5 Tio capacity ceiling at the same time, so freeing space on one without checking the other would only have delayed the same failure.",
              "Diagnosing a failure often required remote access to the client's own servers (via Datto RMM / Splashtop) rather than relying on the Acronis console alone, since some root causes (an unplugged server, a saturated network link) are only visible from the machine itself."
            ],
            "title": "Technical challenges"
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
            "type": "timeline",
            "steps": [
              {
                "title": "Step 1 — Daily dashboard review",
                "description": "Every morning, I opened the Acronis dashboard to note the number of active alerts and the split between errors and warnings."
              },
              {
                "title": "Step 2 — Root-cause check per alert",
                "description": "For each alert, I inspected the affected device or backup plan to determine which of the four common failure patterns applied: NAS full, server offline, corrupted plan, or network issue."
              },
              {
                "title": "Step 3 — Fix applied at the source",
                "description": "Depending on the case: freed NAS capacity by purging obsolete full backups, confirmed server availability, or recreated a corrupted plan under a new name with the same policy."
              },
              {
                "title": "Step 4 — Continuity verified",
                "description": "I waited for or triggered the next scheduled run on the affected plan to confirm the alert had actually cleared before closing it out."
              }
            ],
            "title": "How I triaged an alert — step by step"
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
          },
          {
            "type": "bullets",
            "items": [
              "Always confirm which of the recurring failure patterns (NAS full, server offline, corrupted plan, network issue) applies before acting — the same red status can hide four different fixes, and guessing wrong wastes a backup cycle.",
              "When a plan is corrupted, recreate it under an incremented name with the identical policy rather than starting from a blank configuration — this avoids silently changing retention or destinations the client is relying on.",
              "Check both NAS destinations' remaining capacity together, not just the one that raised the alert — if both are near their ceiling, freeing space on one only delays the same failure on the other.",
              "Use remote access (Datto RMM / Splashtop) to check the physical/network state of a server before assuming the backup software itself is at fault — an unplugged cable produces the same red status as a corrupted plan.",
              "Clear a warning only after confirming the next scheduled run actually completes clean — a status that looks fixed on paper can still fail again if the underlying cause (like a saturated link) wasn't fully resolved."
            ],
            "title": "Best Practices"
          },
          {
            "type": "bullets",
            "items": [
              "This mandate was reactive by design: I triaged and fixed alerts already raised on the dashboard rather than redesigning the backup architecture (retention policy, NAS sizing) itself — that scoping decision belonged to the Exploitation team lead.",
              "Freeing NAS capacity by purging old full backups reduces the retention window for that period; it was the fastest fix for an active failure, with the trade-off accepted by the team rather than left undocumented.",
              "A backup plan showing 'CBT disabled' (Changed Block Tracking) still completed successfully — I treated it as a warning to monitor rather than an active failure, since forcing a full VMware re-scan mid-cycle would have cost more backup time than it saved.",
              "Root-cause categories (NAS full, server offline, corrupted plan, network issue) covered every alert seen during this engagement, but they are not an exhaustive list for Acronis Cyber Backup in general — a different client environment could surface failure modes outside these four."
            ],
            "title": "Known Limitations & Decisions"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.acronis.com/en-us/products/cyber-backup/",
                "label": "Acronis Cyber Backup"
              },
              {
                "href": "https://www.acronis.com/en-us/products/cloud/cyber-protect/",
                "label": "Acronis Cyber Protect Cloud"
              },
              {
                "href": "https://www.datto.com/products/rmm",
                "label": "Datto RMM — Remote Monitoring & Management"
              }
            ],
            "title": "Tools & references"
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
            "type": "bullets",
            "items": [
              "85 alertes actives sur 105 postes protégés imposaient un triage systématique — traiter chaque alerte avec la même urgence aurait noyé les quelques cas qui présentaient un réel risque de perte de données.",
              "Le même symptôme (un statut rouge « échec ») pouvait provenir de quatre causes racines distinctes — NAS saturé, serveur hors ligne, plan de sauvegarde corrompu ou panne réseau — la correction devait donc coller à la cause réelle, pas seulement au libellé de l'alerte.",
              "Recréer un plan de sauvegarde corrompu impliquait de préserver exactement la même politique (planification, rétention, destination) sous un nouveau nom, sans modifier silencieusement les fenêtres de rétention ou les destinations dont dépendait le client.",
              "Les deux destinations NAS on-premise approchaient simultanément leur plafond de capacité de 10,5 Tio ; libérer de l'espace sur l'une sans vérifier l'autre n'aurait fait que retarder le même échec.",
              "Diagnostiquer un échec nécessitait souvent un accès distant aux serveurs du client (via Datto RMM / Splashtop) plutôt que de s'appuyer uniquement sur la console Acronis, certaines causes racines (serveur débranché, lien réseau saturé) n'étant visibles que depuis la machine elle-même."
            ],
            "title": "Défis techniques"
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
            "type": "timeline",
            "steps": [
              {
                "title": "Étape 1 — Revue quotidienne du tableau de bord",
                "description": "Chaque matin, j'ouvrais le tableau de bord Acronis pour relever le nombre d'alertes actives et la répartition erreurs/avertissements."
              },
              {
                "title": "Étape 2 — Recherche de la cause racine par alerte",
                "description": "Pour chaque alerte, j'inspectais l'appareil ou le plan de sauvegarde concerné pour déterminer lequel des quatre schémas d'échec courants s'appliquait (NAS saturé, serveur hors ligne, plan corrompu, problème réseau)."
              },
              {
                "title": "Étape 3 — Correction à la source",
                "description": "Selon le cas : libération d'espace NAS par purge de sauvegardes complètes obsolètes, vérification de la disponibilité du serveur, ou recréation d'un plan corrompu sous un nouveau nom avec la même politique."
              },
              {
                "title": "Étape 4 — Vérification de la continuité",
                "description": "J'attendais ou déclenchais la prochaine exécution planifiée du plan concerné pour confirmer que l'alerte était bien résolue avant de la clôturer."
              }
            ],
            "title": "Mon triage d'une alerte — étape par étape"
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
          },
          {
            "type": "bullets",
            "items": [
              "Toujours confirmer lequel des schémas d'échec récurrents (NAS saturé, serveur hors ligne, plan corrompu, problème réseau) s'applique avant d'agir — le même statut rouge peut cacher quatre corrections différentes, et se tromper fait perdre un cycle de sauvegarde complet.",
              "Quand un plan est corrompu, le recréer sous un nom incrémenté avec la politique identique plutôt que de repartir d'une configuration vierge — cela évite de modifier silencieusement la rétention ou les destinations dont dépend le client.",
              "Vérifier la capacité restante des deux destinations NAS ensemble, pas seulement celle ayant déclenché l'alerte — si les deux approchent leur plafond, libérer de l'espace sur l'une ne fait que retarder le même échec sur l'autre.",
              "Utiliser l'accès distant (Datto RMM / Splashtop) pour vérifier l'état physique/réseau d'un serveur avant de soupçonner le logiciel de sauvegarde lui-même — un câble débranché produit le même statut rouge qu'un plan corrompu.",
              "Ne clôturer un avertissement qu'après avoir confirmé que la prochaine exécution planifiée s'est bien déroulée sans accroc — un statut qui semble corrigé sur le papier peut réapparaître si la cause sous-jacente (comme un lien saturé) n'a pas été pleinement résolue."
            ],
            "title": "Bonnes pratiques"
          },
          {
            "type": "bullets",
            "items": [
              "Cette mission était réactive par construction : je triais et corrigeais les alertes déjà levées sur le tableau de bord plutôt que de reconcevoir l'architecture de sauvegarde elle-même (politique de rétention, dimensionnement NAS) — ce choix de périmètre revenait au responsable de l'équipe Exploitation.",
              "Libérer de l'espace NAS en purgeant d'anciennes sauvegardes complètes réduit la fenêtre de rétention sur cette période ; c'était la correction la plus rapide face à un échec actif, un compromis assumé par l'équipe plutôt que laissé non documenté.",
              "Un plan de sauvegarde affichant « CBT désactivé » (Changed Block Tracking) se terminait tout de même avec succès — je l'ai traité comme un avertissement à surveiller plutôt qu'un échec actif, car forcer un nouveau scan complet VMware en cours de cycle aurait coûté plus de temps de sauvegarde qu'il n'en aurait fait gagner.",
              "Les catégories de cause racine (NAS saturé, serveur hors ligne, plan corrompu, problème réseau) couvraient toutes les alertes observées durant cette mission, mais elles ne constituent pas une liste exhaustive pour Acronis Cyber Backup en général — un environnement client différent pourrait révéler d'autres modes de défaillance."
            ],
            "title": "Limites connues & décisions"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.acronis.com/fr-fr/products/cyber-backup/",
                "label": "Acronis Cyber Backup"
              },
              {
                "href": "https://www.acronis.com/fr-fr/products/cloud/cyber-protect/",
                "label": "Acronis Cyber Protect Cloud"
              },
              {
                "href": "https://www.datto.com/fr/products/rmm",
                "label": "Datto RMM — Supervision et gestion à distance"
              }
            ],
            "title": "Outils & références"
          }
        ]
      },
      "es": {
        "title": "Supervisión de copias de seguridad en la nube con Acronis Cyber Backup",
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
            "type": "bullets",
            "items": [
              "85 alertas activas en 105 equipos protegidos exigían un triaje sistemático — tratar cada alerta con la misma urgencia habría ocultado los pocos casos con riesgo real de pérdida de datos.",
              "El mismo síntoma (un estado rojo de «fallo») podía deberse a cuatro causas raíz distintas — NAS saturado, servidor fuera de línea, plan de backup corrupto o fallo de red — así que la corrección debía ajustarse a la causa real, no solo a la etiqueta de la alerta.",
              "Recrear un plan de backup corrupto implicaba conservar exactamente la misma política (programación, retención, destino) bajo un nuevo nombre, sin modificar silenciosamente las ventanas de retención o los destinos de los que dependía el cliente.",
              "Los dos destinos NAS on-premise se acercaban a la vez a su límite de capacidad de 10,5 Tio; liberar espacio en uno sin comprobar el otro solo habría retrasado el mismo fallo.",
              "Diagnosticar un fallo requería a menudo acceso remoto a los propios servidores del cliente (vía Datto RMM / Splashtop) en lugar de depender solo de la consola de Acronis, ya que algunas causas raíz (un servidor desconectado, un enlace de red saturado) solo son visibles desde la propia máquina."
            ],
            "title": "Retos técnicos"
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
            "type": "timeline",
            "steps": [
              {
                "title": "Paso 1 — Revisión diaria del panel",
                "description": "Cada mañana abría el panel de Acronis para comprobar el número de alertas activas y el reparto entre errores y advertencias."
              },
              {
                "title": "Paso 2 — Búsqueda de la causa raíz por alerta",
                "description": "Para cada alerta, inspeccionaba el equipo o el plan de backup afectado para determinar cuál de los cuatro patrones de fallo habituales aplicaba (NAS saturado, servidor fuera de línea, plan corrupto, problema de red)."
              },
              {
                "title": "Paso 3 — Corrección en el origen",
                "description": "Según el caso: liberación de espacio en el NAS purgando copias completas obsoletas, verificación de la disponibilidad del servidor, o recreación de un plan corrupto con un nuevo nombre y la misma política."
              },
              {
                "title": "Paso 4 — Verificación de la continuidad",
                "description": "Esperaba o lanzaba la siguiente ejecución programada del plan afectado para confirmar que la alerta quedaba realmente resuelta antes de cerrarla."
              }
            ],
            "title": "Cómo triaba una alerta — paso a paso"
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
          },
          {
            "type": "bullets",
            "items": [
              "Confirmar siempre cuál de los patrones de fallo recurrentes (NAS saturado, servidor fuera de línea, plan corrupto, problema de red) aplica antes de actuar — el mismo estado rojo puede ocultar cuatro correcciones distintas, y equivocarse hace perder un ciclo completo de backup.",
              "Cuando un plan está corrupto, recrearlo con un nombre incrementado y la misma política en lugar de partir de una configuración en blanco — esto evita cambiar silenciosamente la retención o los destinos de los que depende el cliente.",
              "Comprobar la capacidad restante de ambos destinos NAS a la vez, no solo el que generó la alerta — si los dos se acercan a su límite, liberar espacio en uno solo retrasa el mismo fallo en el otro.",
              "Usar el acceso remoto (Datto RMM / Splashtop) para comprobar el estado físico/de red de un servidor antes de suponer que el software de backup es el culpable — un cable desconectado produce el mismo estado rojo que un plan corrupto.",
              "Cerrar una advertencia solo tras confirmar que la siguiente ejecución programada se completa sin problemas — un estado que parece resuelto sobre el papel puede repetirse si la causa subyacente (como un enlace saturado) no se resolvió del todo."
            ],
            "title": "Buenas prácticas"
          },
          {
            "type": "bullets",
            "items": [
              "Esta misión era reactiva por diseño: triaba y corregía las alertas ya generadas en el panel en lugar de rediseñar la arquitectura de backup en sí (política de retención, dimensionamiento del NAS) — esa decisión de alcance correspondía al responsable del equipo de Explotación.",
              "Liberar capacidad del NAS purgando copias completas antiguas reduce la ventana de retención de ese periodo; era la corrección más rápida ante un fallo activo, una decisión asumida por el equipo y no dejada sin documentar.",
              "Un plan de backup que mostraba «CBT desactivado» (Changed Block Tracking) igualmente se completaba con éxito — lo traté como una advertencia a vigilar y no como un fallo activo, ya que forzar un nuevo escaneo completo de VMware a mitad de ciclo habría costado más tiempo de backup del que habría ahorrado.",
              "Las categorías de causa raíz (NAS saturado, servidor fuera de línea, plan corrupto, problema de red) cubrieron todas las alertas observadas durante esta misión, pero no son una lista exhaustiva para Acronis Cyber Backup en general — un entorno de cliente distinto podría revelar otros modos de fallo."
            ],
            "title": "Límites conocidos y decisiones"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "https://www.acronis.com/es-es/products/cyber-backup/",
                "label": "Acronis Cyber Backup"
              },
              {
                "href": "https://www.acronis.com/es-es/products/cloud/cyber-protect/",
                "label": "Acronis Cyber Protect Cloud"
              },
              {
                "href": "https://www.datto.com/products/rmm",
                "label": "Datto RMM — Supervisión y gestión remota"
              }
            ],
            "title": "Herramientas y referencias"
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
        "src": "/projects/it-ops-network-security/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/it-ops-network-security/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/it-ops-network-security/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/it-ops-network-security/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/it-ops-network-security/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/it-ops-network-security/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/it-ops-network-security/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/it-ops-network-security/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/it-ops-network-security/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/it-ops-network-security/screenshot-9.webp"
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
            "body": "En prolongement du lab virtualisé (AD DS / DNS / DHCP / WDS sur Windows Server 2022), j'ai ajouté une VM pfSense 2.6.0 pour jouer le rôle de passerelle réseau. Objectif : sécuriser les accès Internet sortants de toutes les machines du LAN privé (192.168.100.0/24), filtrer le trafic web via un proxy transparent Squid et appliquer des politiques d'accès — reproduisant la sécurité périmétrique d'une infrastructure d'entreprise réelle.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Hyperviseur : VMware Workstation Pro 17",
              "VM pfSense 2.6.0 : FreeBSD 12 64-bit, 10 Go HDD, 2 Go RAM — passerelle LAN/WAN",
              "WAN (em0) : Bridge sur clé 4G USB de l'hôte — DHCP — 192.168.1.110/24",
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
              "Proxy Squid transparent sur l'interface LAN (port 3128) avec inspection SSL activée",
              "CA interne Pfsense-CA (RSA 2048, SHA-256, 10 ans) pour SSL bump sur HTTPS sortant",
              "SquidGuard : filtrage par catégories d'URL avec listes noires",
              "LightSquid : tableau de bord de reporting du trafic web par client"
            ],
            "title": "Configurations déployées"
          },
          {
            "type": "bullets",
            "items": [
              "pfSense 2.6.0 — Firewall, NAT, routage (basé FreeBSD)",
              "Squid — Proxy transparent avec inspection SSL (port 3128)",
              "SquidGuard — Filtrage par catégories d'URL (listes noires)",
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
                "label": "Contrôle d'accès",
                "value": "Serveurs isolés d'Internet"
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
        "title": "Asegurar el acceso a Internet con pfSense y Squid",
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
        "src": "/projects/nextjs-admin-dashboard/cover.svg"
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
        "title": "Tableau de bord admin — Next.js 16 + Supabase",
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
        "title": "Panel de administración — Next.js 16 + Supabase",
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
        "src": "/projects/it-ops-wifi-config/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/it-ops-wifi-config/screenshot-1.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Wi-Fi Access Point Configuration (TP-Link)",
        "heroSubtitle": "TP-Link Access Point · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
        "sections": [
          {
            "body": "As part of the TAI training at Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), I was tasked with configuring a TP-Link Wi-Fi access point from scratch, working independently. The exercise simulates a real-world IT technician task: deploying wireless connectivity for an office or training room, from physical cabling to full network validation.",
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
            "body": "Dans le cadre de la formation TAI au Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), j'ai été chargée de configurer un point d'accès Wi-Fi TP-Link de A à Z en autonomie. L exercice simule une mission réelle de technicien IT : déployer la connectivité sans fil pour un bureau ou une salle de formation, du raccordement physique à la validation réseau complète.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Raccorder physiquement le point d'accès TP-Link au switch réseau du labo (RJ45)",
              "Accéder à l'interface d'administration web du PA (http://192.168.0.1)",
              "Configurer l'adressage WAN (DHCP ou IP statique selon la topologie)",
              "Activer le serveur DHCP intégré pour les clients Wi-Fi",
              "Configurer le réseau sans fil : SSID, bande, canal et sécurité WPA2-PSK",
              "Valider la connectivité Wi-Fi depuis un appareil test (DHCP + accès Internet)"
            ],
            "title": "Périmètre & Objectifs"
          },
          {
            "type": "bullets",
            "items": [
              "Point d'accès TP-Link raccordé au switch et alimenté — LEDs de lien confirmées",
              "Interface d'administration accessible via http://192.168.0.1 avec identifiants constructeur",
              "Adressage WAN configuré en DHCP — IP valide obtenue depuis le routeur amont",
              "Serveur DHCP intégré activé pour distribution automatique d'adresses aux clients",
              "SSID configuré, bande 2,4 GHz, chiffrement WPA2-PSK avec phrase de passe robuste",
              "Appareil test connecté avec IP DHCP obtenue, ping 8.8.8.8 validé, accès Internet confirmé"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "TP-Link Access Point — point d'accès Wi-Fi du labo de formation",
              "Interface d'administration web TP-Link — configuration via navigateur (192.168.0.1)",
              "WPA2-PSK — protocole de sécurité Wi-Fi avec phrase de passe",
              "DHCP intégré — attribution automatique d'adresses IP aux clients",
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
                "description": "PA TP-Link raccordé au switch labo via câble RJ45. Mise sous tension et vérification des LEDs indiquant l'établissement du lien réseau."
              },
              {
                "label": "Accès à l'interface admin",
                "description": "Navigateur → http://192.168.0.1. Saisie des identifiants constructeur (étiquette de l'appareil). Accès au panneau de configuration TP-Link."
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
        "title": "Configuración de un punto de acceso Wi-Fi (TP-Link)",
        "heroSubtitle": "Punto de acceso TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En el marco de la formación TAI en el Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), se me encargó configurar un punto de acceso Wi-Fi TP-Link de principio a fin de forma autónoma. El ejercicio simula una misión real de técnico IT: desplegar la conectividad inalámbrica para una oficina o una sala de formación, desde la conexión física hasta la validación completa de la red."
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
        "src": "/projects/it-ops-hardware-procurement/cover.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Hardware Procurement: Drafting a Multi-PC Quote",
        "heroSubtitle": "Hardware Sizing · Excel Devis · Component Research · Greta du Val d'Oise",
        "sections": [
          {
            "body": "As part of a group project during the TAI training at Greta du Val d'Oise, I was given a client brief describing a workstation use case (office productivity + light virtualization) and asked to produce a complete hardware procurement quote. The exercise covered the full B2B sourcing workflow: requirements analysis, compatible component research, technical validation, and formalizing the quote in a structured Excel document — the standard deliverable in professional IT procurement.",
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
            "body": "Dans le cadre d'un projet de groupe pendant la formation TAI au Greta du Val d'Oise, j'ai reçu un cahier des charges client décrivant un cas d'usage de poste de travail (bureautique + virtualisation légère) et j'ai dû produire un devis matériel complet. L exercice couvrait l'intégralité du processus d'approvisionnement B2B : analyse des besoins, recherche de composants compatibles, validation des contraintes techniques et formalisation dans un tableau Excel structuré — livrable standard en contexte professionnel IT.",
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
              "16 Go DDR4 (2× 8 Go) — évolutif jusqu'à 32 Go pour la virtualisation",
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
                "description": "Lecture du cahier des charges, extraction des contraintes : RAM min 16 Go, SSD pour l'OS, iGPU ou GPU discret, TPM 2.0, format ATX tour."
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
            "title": "Processus d'approvisionnement"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Conforme à l'enveloppe client",
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
        "title": "Aprovisionamiento de hardware IT: elaboración de un presupuesto Excel",
        "heroSubtitle": "Dimensionamiento de hardware · Presupuesto Excel · Investigación de componentes · Greta du Val d'Oise",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "En el marco de un proyecto en grupo durante la formación TAI en el Greta du Val d'Oise, recibí un pliego de condiciones de cliente describiendo un caso de uso de puesto de trabajo (ofimática + virtualización ligera) y tuve que elaborar un presupuesto de hardware completo. El ejercicio cubría todo el proceso de aprovisionamiento B2B: análisis de necesidades, búsqueda de componentes compatibles, validación de las limitaciones técnicas y formalización en una tabla Excel estructurada — entregable estándar en contexto profesional IT."
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
            "body": "Dans le cadre de la formation TAI au Greta du Val d'Oise, j'ai réalisé un exercice de provisioning de messagerie avec Microsoft Outlook 2016. Le scénario reproduit une tâche réelle de technicien IT : un nouvel employé arrive le premier jour, son poste est installé (Windows 10, Office 2016), et le technicien doit configurer son compte de messagerie professionnel pour qu'il soit opérationnel immédiatement.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Configurer un compte de messagerie Microsoft/Exchange (tai7@outlook.fr) dans Outlook 2016",
              "Valider la communication bidirectionnelle avec un compte pair (tai12@outlook.fr)",
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
              "Windows 10 — système d'exploitation du poste provisionné",
              "Office 2016 — suite bureautique préinstallée"
            ],
            "title": "Stack & Technologies"
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
                "description": "Nom de l'utilisateur, adresse (tai7@outlook.fr) et mot de passe saisis. Outlook 2016 supporte la configuration automatique et manuelle."
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
            "body": "Theoretical cybersecurity training is no longer enough: recruiters and SOCs look for analysts who can demonstrate documented practical experience. I'm building this curriculum to create a portfolio of 70 hands-on projects covering all SOC Tier 1 to 3 competencies, from network monitoring to advanced threat hunting.",
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
              "I'm documenting 70 projects covering: SIEM (Splunk, Elastic, Wazuh), network (Wireshark, Zeek), forensics (Autopsy, Volatility), threat hunting and red team basics",
              "I'm writing a detailed writeup for each project: context, methodology, tools, results",
              "I built a personal virtual lab: attack VMs (Kali) and defensive (Ubuntu SOC) on VMware",
              "I'm writing Python automation scripts: log parsers, SIEM alerts, IOC extractors",
              "I'm publishing progressively on GitHub and my portfolio website"
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
            "body": "Les formations cybersécurité théoriques ne suffisent plus : les recruteurs et les SOC cherchent des analystes capables de démontrer une expérience pratique documentée. Je construis ce curriculum pour bâtir un portfolio de 70 projets hands-on couvrant l'ensemble des compétences SOC Tier 1 à 3, du monitoring réseau au threat hunting avancé.",
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
              "Je documente 70 projets couvrant : SIEM (Splunk, Elastic, Wazuh), réseau (Wireshark, Zeek), forensics (Autopsy, Volatility), threat hunting et bases red team",
              "Je rédige un writeup détaillé pour chaque projet : contexte, méthodologie, outils, résultats",
              "J'ai construit un lab virtuel personnel : VMs attaquantes (Kali) et défensives (Ubuntu SOC) sur VMware",
              "J'écris des scripts Python d'automatisation : parsers de logs, alertes SIEM, IOC extractors",
              "Je publie progressivement sur GitHub et mon portfolio web"
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
        "heroSubtitle": "Herramienta CLI para evaluaciones de vulnerabilidades estructuradas con puntuación CVSS v3.1 y generación de informes HTML",
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
  },
  {
    "slug": "cve-watchlist",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/cve-watchlist/cover.webp"
      },
      {
        "alt": "Filtered to Critical priority",
        "src": "/projects/cve-watchlist/screenshot-1.webp"
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
              "I built an httpx-based NVD API v2.0 client with response parsing for CVSS v3.1/v2 metrics",
              "I wrote a pure scoring engine (scoring.py) combining CVSS base score, CISA KEV exploitation flag, attack vector, and recency into a 0-100 priority score",
              "I implemented SQLAlchemy upsert logic so re-syncing updates existing CVEs instead of duplicating them",
              "I built a React dashboard with severity-band filters and a manual Sync from NVD action",
              "I wrote 13 Pytest tests, with the NVD client mocked so the suite never depends on live network"
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
              "J'ai construit un client API NVD v2.0 basé sur httpx avec parsing des métriques CVSS v3.1/v2",
              "J'ai écrit un moteur de score pur (scoring.py) combinant score de base CVSS, drapeau d'exploitation CISA KEV, vecteur d'attaque et fraîcheur en un score de priorité 0-100",
              "J'ai implémenté une logique d'upsert SQLAlchemy pour que la resynchronisation mette à jour les CVE existantes au lieu de les dupliquer",
              "J'ai construit un tableau de bord React avec filtres par bande de sévérité et une action manuelle Sync from NVD",
              "J'ai écrit 13 tests Pytest, avec le client NVD simulé pour que la suite ne dépende jamais du réseau réel"
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
              "Construí un cliente de la API NVD v2.0 basado en httpx con análisis de las métricas CVSS v3.1/v2",
              "Escribí un motor de puntuación puro (scoring.py) que combina la puntuación base CVSS, el indicador de explotación CISA KEV, el vector de ataque y la actualidad en una puntuación de prioridad 0-100",
              "Implementé una lógica de upsert en SQLAlchemy para que la resincronización actualice las CVE existentes en lugar de duplicarlas",
              "Construí un dashboard React con filtros por banda de severidad y una acción manual Sync from NVD",
              "Escribí 13 pruebas Pytest, con el cliente NVD simulado para que la suite nunca dependa de la red real"
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
  },
  {
    "slug": "cosmonote-clone",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Cosmonote Clone — AI Meeting Transcription",
        "sections": [
          {
            "body": "Cosmonote is an AI-powered meeting transcription and summarization SaaS. I'm building this project to replicate its core features and deeply understand the architecture of an AI audio product: audio processing pipeline, speech-to-text transcription, LLM summarization and smooth user experience.",
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
            "body": "Cosmonote est une application SaaS de transcription et résumé de réunions propulsée par IA. Je construis ce projet pour reproduire ses fonctionnalités principales et comprendre en profondeur l'architecture d'un produit IA audio : pipeline audio, transcription speech-to-text, summarisation LLM et UX fluide.",
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
              "I built this playbook on top of incident-response-playbook, an open-source repository of incident response procedures. My goal: a set of structured procedures for the 6 most common cybersecurity threats, designed for SOC teams and IT admins at SMBs and mid-market companies alike — beyond theory, with documents a team can actually use."
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
              "J'ai construit ce playbook à partir de incident-response-playbook, un dépôt open source de procédures de réponse aux incidents. Mon objectif : un ensemble de procédures structurées pour les 6 menaces de cybersécurité les plus courantes, conçu pour des équipes SOC et administrateurs IT en PME comme en ETI — au-delà de la théorie, avec des documents directement utilisables par une équipe."
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
        "heroSubtitle": "Procedimientos estructurados de respuesta a incidentes: malware, ransomware, filtraciones de datos, phishing y accesos no autorizados",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Construí este playbook a partir de incident-response-playbook, un repositorio open source de procedimientos de respuesta a incidentes. Mi objetivo: un conjunto de procedimientos estructurados para las 6 amenazas de ciberseguridad más comunes, diseñado para equipos SOC y administradores IT tanto en pymes como en empresas medianas — más allá de la teoría, con documentos que un equipo puede usar directamente."
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
              "I built risque360 to extend matrice-risques (itself a French rebuild of the open-source risk-assessment-matrix project): a classic risk register poorly captures threats specific to an application's architecture, risks carried by vendors/third parties, and how a history of incidents should shift a probability declared \"in the abstract\". I brought these three angles together in a single register, with a data-driven probability recalibration mechanism — the most differentiating part of the project."
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
              "Automatic correlation-key generation (from a vendor name or a STRIDE component) didn't strip punctuation — for example \"PayGateway Inc.\" generated the vendor key fournisseur-paygateway-inc. with a trailing period, which would have silently broken the link to incidents logged under that same key. I fixed it with a shared slugifier() function that strips diacritics and punctuation before generating the key, and verified the fix with a direct isolated-module test (cache-busting import) to rule out any ES module caching effect during debugging."
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
              "J'ai construit risque360 pour étendre matrice-risques (elle-même une reconstruction française du projet open source risk-assessment-matrix) : un registre de risques classique capture mal les menaces propres à une architecture applicative, les risques portés par les fournisseurs/tiers, et la façon dont un historique d'incidents devrait faire évoluer une probabilité déclarée « à froid ». J'ai réuni ces trois angles dans un registre unique, avec un mécanisme de recalibration de probabilité piloté par les données — la partie la plus différenciante du projet."
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
              "La génération automatique de clé de corrélation (à partir du nom d'un fournisseur ou d'un composant STRIDE) ne retirait pas la ponctuation — par exemple « PayGateway Inc. » générait la clé fournisseur-paygateway-inc. avec un point final, ce qui aurait cassé silencieusement le lien avec les incidents journalisés partageant cette clé. Je l'ai corrigé avec une fonction slugifier() partagée qui retire diacritiques et ponctuation avant de générer la clé, et j'ai vérifié le correctif par un test direct du module en isolation (import avec cache-busting) pour écarter tout effet de cache de module ES pendant le débogage."
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
              "Construí risque360 para ampliar matrice-risques (a su vez una reconstrucción francesa del proyecto open source risk-assessment-matrix): un registro de riesgos clásico capta mal las amenazas propias de una arquitectura de aplicación, los riesgos que aportan los proveedores/terceros, y cómo un historial de incidentes debería modificar una probabilidad declarada «en frío». Reuní estos tres ángulos en un único registro, con un mecanismo de recalibración de probabilidad impulsado por datos — la parte más diferenciadora del proyecto."
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
              "La generación automática de la clave de correlación (a partir del nombre de un proveedor o un componente STRIDE) no eliminaba la puntuación — por ejemplo, «PayGateway Inc.» generaba la clave fournisseur-paygateway-inc. con un punto final, lo que habría roto silenciosamente el enlace con los incidentes registrados bajo esa misma clave. Lo corregí con una función slugifier() compartida que elimina diacríticos y puntuación antes de generar la clave, y verifiqué la corrección con una prueba directa del módulo en aislamiento (importación con cache-busting) para descartar cualquier efecto de caché de módulos ES durante la depuración."
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
        "src": "/projects/avenir-telecom-lightning-app/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/avenir-telecom-lightning-app/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/avenir-telecom-lightning-app/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/avenir-telecom-lightning-app/screenshot-3.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Lightning app delivery & backlog (Avenir Télécom)",
        "heroSubtitle": "Creation of a Lightning application for Avenir Télécom: backlog, testing and CRM interface migration."
      },
      "fr": {
        "title": "Livraison d'application Lightning & backlog Agile (Avenir Télécom)",
        "heroSubtitle": "Création d'une application Lightning pour Avenir Télécom : backlog, tests et migration de l'interface CRM."
      },
      "es": {
        "title": "Entrega de app Lightning y backlog (Avenir Télécom)",
        "heroSubtitle": "Estrategia de implementación de una app Salesforce Lightning de campo entregada por un equipo de 3 personas: backlog de producto de 20 user stories estimadas, cuaderno de pruebas + catálogo Apex, y luego una vuelta de piloto de 3 meses → backlog Kanban de evoluciones."
      }
    }
  },
  {
    "slug": "digit-learning-salesforce-update",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/digit-learning-salesforce-update/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/digit-learning-salesforce-update/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/digit-learning-salesforce-update/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/digit-learning-salesforce-update/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/digit-learning-salesforce-update/screenshot-4.webp"
      },
      {
        "alt": "Data model — Mentor, Étudiants, Formations, Formations achetées",
        "src": "/projects/digit-learning-salesforce-update/screenshot-data-model.png"
      },
      {
        "alt": "Dashboard — prospect-to-client conversion reports",
        "src": "/projects/digit-learning-salesforce-update/screenshot-dashboard.png"
      }
    ],
    "locales": {
      "en": {
        "title": "Salesforce application update (Digit Learning)",
        "heroSubtitle": "Quality audit of a 2-year-old Salesforce org, then modernization: a junction object to lift the \"one student = one training\" limit, automated enrollment and mentor assignment, 3 management reports, data migration — with a quantified impact analysis."
      },
      "fr": {
        "title": "Mise à jour de l'application Salesforce (Digit Learning)",
        "heroSubtitle": "Audit qualité d'une org Salesforce de 2 ans puis modernisation : objet de jonction pour lever la limite « un étudiant = une formation », automatisation de l'inscription et de l'affectation des mentors, 3 rapports de pilotage, migration des données — avec analyse d'impact chiffrée."
      },
      "es": {
        "title": "Actualización de la aplicación Salesforce (Digit Learning)",
        "heroSubtitle": "Auditoría de calidad de una org Salesforce de 2 años y luego modernización: un objeto de unión para eliminar el límite «un estudiante = una formación», automatización de la inscripción y la asignación de mentores, 3 informes de seguimiento, migración de datos — con un análisis de impacto cuantificado."
      }
    }
  },
  {
    "slug": "tours-for-life-salesforce-solution",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/tours-for-life-salesforce-solution/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "/projects/tours-for-life-salesforce-solution/screenshot-15.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Salesforce solution design (Tours For Life)",
        "heroSubtitle": "End-to-end Sales Cloud solution design for a travel agency: Prospect → Traveler conversion via Person Accounts, catalog / booking separation (Trip vs Purchased Trip), fleet management, 2 no-code Flows, North/South zone security — with an owned architecture retrospective."
      },
      "fr": {
        "title": "Conception de solution Salesforce (Tours For Life)",
        "heroSubtitle": "Conception d'une solution Sales Cloud de bout en bout pour une agence de voyages : conversion Prospect → Voyageur en Person Account, séparation catalogue / réservation (Voyage vs Voyage Acheté), gestion de flotte, 2 Flows no-code, sécurité par zone Nord/Sud — avec une rétrospective d'architecture assumée."
      },
      "es": {
        "title": "Diseño de solución Salesforce (Tours For Life)",
        "heroSubtitle": "Diseño de una solución Sales Cloud de extremo a extremo para una agencia de viajes: conversión Prospecto → Viajero mediante Person Accounts, separación catálogo / reserva (Viaje vs Viaje Comprado), gestión de flota, 2 Flows sin código, seguridad por zona Norte/Sur — con una retrospectiva de arquitectura asumida."
      }
    }
  },
  {
    "slug": "idemconnect-apex-backend",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/idemconnect-apex-backend/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/idemconnect-apex-backend/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/idemconnect-apex-backend/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/idemconnect-apex-backend/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/idemconnect-apex-backend/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/idemconnect-apex-backend/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/idemconnect-apex-backend/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/idemconnect-apex-backend/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/idemconnect-apex-backend/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/idemconnect-apex-backend/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/idemconnect-apex-backend/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "/projects/idemconnect-apex-backend/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/idemconnect-apex-backend/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/idemconnect-apex-backend/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "/projects/idemconnect-apex-backend/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "/projects/idemconnect-apex-backend/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "/projects/idemconnect-apex-backend/screenshot-16.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Apex backend development (iDEM Connect)",
        "heroSubtitle": "Development of an Apex backend for iDEM Connect: trigger, service classes and batch scheduler."
      },
      "fr": {
        "title": "Développement backend Apex (iDEM Connect)",
        "heroSubtitle": "Développement d'un backend Apex pour iDEM Connect : trigger, classes de service et batch scheduler."
      },
      "es": {
        "title": "Desarrollo backend Apex (iDEM Connect)",
        "heroSubtitle": "Un backend Apex completo para el equipo de ventas de iDEM Connect: trigger + handlers, batch mensual, scheduler — 3 reglas de negocio, seguridad CRUD/FLS de extremo a extremo, 23 tests, 90% de cobertura a nivel de org."
      }
    }
  },
  {
    "slug": "wirebright-visualforce-to-lightning",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/wirebright-visualforce-to-lightning/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-16.webp"
      },
      {
        "alt": "Screenshot 17",
        "src": "/projects/wirebright-visualforce-to-lightning/screenshot-17.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Visualforce to Lightning migration (WireBright)",
        "heroSubtitle": "Full scoping of a Salesforce Classic → Lightning migration: component inventory, a decomposed estimate (17 days), a per-component risk matrix, a tooled diagnostic, then a prototype of the two most critical components (LWC + Aura Quick Action)."
      },
      "fr": {
        "title": "Migration Visualforce vers Lightning (WireBright Consulting)",
        "heroSubtitle": "Cadrage complet d'une migration Salesforce Classic → Lightning : inventaire des composants, chiffrage décomposé (17 jours), matrice de risques par composant, diagnostic outillé, puis prototype des deux composants les plus critiques (LWC + Aura Quick Action)."
      },
      "es": {
        "title": "Migración de Visualforce a Lightning (WireBright)",
        "heroSubtitle": "Encuadre completo de una migración de Salesforce Classic → Lightning: inventario de componentes, una estimación descompuesta (17 días), una matriz de riesgos por componente, un diagnóstico apoyado en herramientas, y luego un prototipo de los dos componentes más críticos (LWC + Aura Quick Action)."
      }
    }
  },
  {
    "slug": "ltp-apex-backend-prototype",
    "gallery": [
      {
        "alt": "LTP Apex Backend - Vue 2",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-10.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 3",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-11.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 4",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-12.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 5",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-13.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 6",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-14.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 7",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-15.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 8",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-16.webp"
      },
      {
        "alt": "LTP Apex Backend - Vue 9",
        "src": "/projects/ltp-apex-backend-prototype/screenshot-17.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Delivery tracking CRM design (LTP)",
        "heroSubtitle": "Design of an Apex backend prototype for LTP (luxury & fashion): data model, security, import strategy."
      },
      "fr": {
        "title": "Conception CRM de suivi de livraison (LTP)",
        "heroSubtitle": "Conception d'un prototype backend Apex pour LTP (luxe & mode) : modèle de données, sécurité, stratégie d'import."
      },
      "es": {
        "title": "Diseño de CRM de seguimiento de entregas (LTP)",
        "heroSubtitle": "Arquitectura completa de un backend Salesforce de seguimiento de entregas multi-transportista para una casa de alta costura nupcial: modelo de datos UML, modelo de seguridad por zona, estrategia de importación de 2,1 M de cuentas, integración en tiempo real + batch — diseñada antes de la primera línea de código."
      }
    }
  },
  {
    "slug": "fasha-apex-backend-optimization",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/fasha-apex-backend-optimization/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-9.webp"
      },
      {
        "alt": "Screenshot 10",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-10.webp"
      },
      {
        "alt": "Screenshot 11",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-11.webp"
      },
      {
        "alt": "Screenshot 12",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-12.webp"
      },
      {
        "alt": "Screenshot 13",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-13.webp"
      },
      {
        "alt": "Screenshot 14",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-14.webp"
      },
      {
        "alt": "Screenshot 15",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-15.webp"
      },
      {
        "alt": "Screenshot 16",
        "src": "/projects/fasha-apex-backend-optimization/screenshot-16.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Apex backend optimization (FASHA)",
        "heroSubtitle": "Taking over a production Apex backend at FASHA: two real bugs diagnosed down to root cause (a trigger that breaks at 100 orders, a calculation that silently fails on bulk import), a full refactor into a bulk-safe handler pattern, the weekly batch moved to async, >85% coverage."
      },
      "fr": {
        "title": "Optimisation du backend Apex (FASHA)",
        "heroSubtitle": "Reprise d'un backend Apex en production chez FASHA : deux bugs réels diagnostiqués jusqu'à leur cause racine (trigger qui casse à 100 commandes, calcul silencieusement faux à l'import en masse), refactoring complet en pattern handler bulk-safe, batch hebdomadaire passé en asynchrone, couverture > 85 %."
      },
      "es": {
        "title": "Optimización de un backend Apex (FASHA)",
        "heroSubtitle": "Hacerse cargo de un backend Apex en producción en FASHA: dos errores reales diagnosticados hasta su causa raíz (un trigger que se rompe con 100 pedidos, un cálculo que falla en silencio en la importación masiva), refactorización completa a un patrón handler bulk-safe, el batch semanal pasado a asíncrono, cobertura >85%."
      }
    }
  },
  {
    "slug": "legarant-axg-salesforce-deployment",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/legarant-axg-salesforce-deployment/cover.webp"
      },
      {
        "alt": "Screenshot 1",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-1.webp"
      },
      {
        "alt": "Screenshot 2",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-2.webp"
      },
      {
        "alt": "Screenshot 3",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-3.webp"
      },
      {
        "alt": "Screenshot 4",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-4.webp"
      },
      {
        "alt": "Screenshot 5",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-5.webp"
      },
      {
        "alt": "Screenshot 6",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-6.webp"
      },
      {
        "alt": "Screenshot 7",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-7.webp"
      },
      {
        "alt": "Screenshot 8",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-8.webp"
      },
      {
        "alt": "Screenshot 9",
        "src": "/projects/legarant-axg-salesforce-deployment/screenshot-9.webp"
      }
    ],
    "locales": {
      "en": {
        "title": "Salesforce deployment with Heroku (Legarant‑AXG)",
        "heroSubtitle": "Salesforce deployment and integration for LEGARANT-AXG: REST API, Heroku synchronization and go-live."
      },
      "fr": {
        "title": "Déploiement Salesforce avec Heroku (Légarant‑AXG)",
        "heroSubtitle": "Déploiement et intégration Salesforce pour LEGARANT-AXG : API REST, synchronisation Heroku et mise en production."
      },
      "es": {
        "title": "Despliegue de Salesforce con Heroku (Legarant‑AXG)",
        "heroSubtitle": "Integrar AXG en Salesforce (Legarant) y entregar una capa de integración lista para una app móvil (REST + Heroku)."
      }
    }
  },
  {
    "slug": "cicd-pipeline-setup",
    "gallery": [
      {
        "alt": "Cover",
        "src": "/projects/cicd-pipeline-setup/cover.svg"
      }
    ],
    "locales": {
      "en": {
        "title": "CI/CD Pipeline — Multi-environment Salesforce Deployment",
        "heroSubtitle": "Git branching, automated Apex validation, and a documented rollback path for Salesforce releases — not a deployment checklist",
        "sections": [
          {
            "body": "Salesforce doesn't ship a native CI/CD story: deployments between sandboxes and production are either point-and-click Change Sets or hand-rolled scripts, and \"it worked in my sandbox\" is a common failure mode. I built this pipeline as a personal project to apply the release discipline I'd use on any platform — branch protection, automated validation on every Pull Request, staged promotion, a documented rollback path — specifically to the constraints of Salesforce metadata deployments: no partial rollback, mandatory Apex test coverage, environment-specific metadata.",
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
                "description": "Deployment automation: sandbox on develop merge, staging on main merge — with Quick Deploy to production reusing the already-validated test run instead of re-running the full suite"
              },
              {
                "label": "Security",
                "description": "SFDX Auth URL credentials stored in GitHub Secrets, main and staging branch protection, mandatory review rules"
              },
              {
                "label": "Rollback procedure",
                "description": "Salesforce metadata deployments have no native undo. Documented procedure: revert the merge commit on main, re-tag the last known-good package, and re-run it through the same CI pipeline — as long as a forward deploy, by design, since no shortcut exists for Salesforce metadata"
              }
            ],
            "title": "Implementation steps"
          },
          {
            "type": "bullets",
            "items": [
              "Quick Deploy reuses the CI stage's already-validated test run instead of re-running the full Apex suite — Salesforce allows this within a 10-day validation window, cutting minutes off every release without skipping coverage",
              "No automated rollback trigger: rollback is the documented manual procedure above, not a one-click tool — building true rollback tooling for Salesforce metadata would be its own separate project",
              "Branch protection requires one review before merge to main — sized for a single-maintainer pipeline, not yet exercised at multi-developer scale",
              "No post-deploy smoke tests: the pipeline validates before deploying, not after — a gap I'd close first if this pipeline had to support a live production org today"
            ],
            "title": "Decisions & Limitations"
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
        "heroSubtitle": "Branches Git, validation Apex automatisée et procédure de rollback documentée pour les releases Salesforce — pas une simple checklist de déploiement",
        "sections": [
          {
            "body": "Salesforce n'a pas de story CI/CD native : les déploiements entre sandboxes et production se font soit via des Change Sets en point-and-click, soit via des scripts maison — et « ça marchait dans ma sandbox » est un mode d'échec classique. J'ai construit ce pipeline en projet personnel pour appliquer la discipline de release que j'appliquerais sur n'importe quelle plateforme — protection des branches, validation automatique à chaque Pull Request, promotion par étapes, procédure de rollback documentée — mais adaptée aux contraintes propres aux déploiements de métadonnées Salesforce : pas de rollback partiel, couverture de tests Apex obligatoire, métadonnées propres à chaque environnement.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Stratégie de branches Git : feature → develop → staging → main avec protection des branches critiques",
              "Workflow GitHub Actions : validation Apex + tests automatiques à chaque Pull Request",
              "Déploiement automatique en sandbox dès merge sur develop, déploiement en staging sur main",
              "Quick Deploy en production après validation complète du test run",
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
                "description": "Automatisation des déploiements : sandbox au merge sur develop, staging au merge sur main — avec Quick Deploy en production réutilisant le test run déjà validé plutôt que de relancer toute la suite"
              },
              {
                "label": "Sécurisation",
                "description": "Stockage des credentials SFDX Auth URL dans GitHub Secrets, protection des branches main et staging, règles de review obligatoires"
              },
              {
                "label": "Procédure de rollback",
                "description": "Les déploiements de métadonnées Salesforce n'ont pas d'annulation native. Procédure documentée : revert du commit de merge sur main, re-tag du dernier package validé, puis re-déploiement via le même pipeline CI — aussi long qu'un déploiement normal, par construction, faute de raccourci possible sur les métadonnées Salesforce"
              }
            ],
            "title": "Étapes de mise en place"
          },
          {
            "type": "bullets",
            "items": [
              "Le Quick Deploy réutilise le test run déjà validé côté CI plutôt que de relancer toute la suite Apex — Salesforce l'autorise dans une fenêtre de validation de 10 jours, ce qui réduit chaque release de plusieurs minutes sans sacrifier la couverture",
              "Aucun déclenchement automatique de rollback : le rollback reste la procédure manuelle documentée ci-dessus, pas un outil en un clic — un vrai outillage de rollback pour les métadonnées Salesforce serait un projet à part entière",
              "La protection de branche exige une seule revue avant merge sur main — dimensionné pour un pipeline à un seul mainteneur, jamais éprouvé à l'échelle d'une équipe de plusieurs développeurs",
              "Aucun test de fumée post-déploiement : le pipeline valide avant de déployer, pas après — la première limite que je comblerais si ce pipeline devait servir une org de production réelle aujourd'hui"
            ],
            "title": "Décisions & Limites"
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
        "title": "Pipeline CI/CD — Despliegue Salesforce multi-entorno",
        "heroSubtitle": "Branching Git, validación Apex automatizada y un procedimiento de rollback documentado para releases de Salesforce — no una simple checklist de despliegue",
        "sections": [
          {
            "body": "Salesforce no tiene una historia CI/CD nativa: los despliegues entre sandboxes y producción se hacen con Change Sets point-and-click o con scripts caseros — y «funcionaba en mi sandbox» es un modo de fallo habitual. Construí este pipeline como proyecto personal para aplicar la misma disciplina de release que aplicaría en cualquier plataforma — protección de ramas, validación automática en cada Pull Request, promoción por etapas, procedimiento de rollback documentado — adaptada a las restricciones propias de los despliegues de metadatos de Salesforce: sin rollback parcial, cobertura de tests Apex obligatoria, metadatos específicos de cada entorno.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "Estrategia de ramas Git: feature → develop → staging → main con reglas de protección de ramas",
              "Workflow de GitHub Actions: validación Apex + tests automáticos en cada Pull Request",
              "Despliegue automático a sandbox al hacer merge en develop, despliegue a staging al hacer merge en main",
              "Quick Deploy a producción tras la validación completa del test run",
              "Gestión de credenciales Salesforce vía GitHub Secrets (SFDX Auth URL cifrada)",
              "Notificaciones de estado de despliegue integradas en cada etapa del pipeline"
            ],
            "title": "Lo que construí"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce CLI (SFDX) — empaquetado y despliegue de metadatos",
              "GitHub Actions — orquestación del pipeline CI/CD",
              "GitHub Secrets — gestión segura de credenciales SFDX",
              "Apex Test Run — ejecución automatizada de pruebas unitarias",
              "SFDX Source Format — control de versiones de metadatos Salesforce"
            ],
            "title": "Herramientas y tecnologías"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Análisis",
                "description": "Mapeo de entornos (Dev, Staging, Prod) y definición de una estrategia de ramas adaptada al ciclo de release de Salesforce"
              },
              {
                "label": "Configuración SFDX",
                "description": "Inicialización del proyecto en SFDX Source Format, configuración de .forceignore y autenticación vía SFDX Auth URL"
              },
              {
                "label": "Pipeline CI",
                "description": "Workflows de GitHub Actions: job de validación Apex con ejecución de tests unitarios en cada Pull Request hacia develop"
              },
              {
                "label": "Pipeline CD",
                "description": "Automatización de despliegues: sandbox al merge en develop, staging al merge en main — con Quick Deploy a producción reutilizando el test run ya validado en vez de repetir toda la suite"
              },
              {
                "label": "Seguridad",
                "description": "Credenciales SFDX Auth URL almacenadas en GitHub Secrets, protección de ramas main y staging, revisión obligatoria antes de merge"
              },
              {
                "label": "Procedimiento de rollback",
                "description": "Los despliegues de metadatos de Salesforce no tienen deshacer nativo. Procedimiento documentado: revertir el commit de merge en main, re-etiquetar el último paquete validado y volver a desplegarlo por el mismo pipeline CI — tan largo como un despliegue normal, por diseño, ya que no existe atajo posible para metadatos Salesforce"
              }
            ],
            "title": "Pasos de implementación"
          },
          {
            "type": "bullets",
            "items": [
              "El Quick Deploy reutiliza el test run ya validado en la etapa de CI en vez de repetir toda la suite Apex — Salesforce lo permite dentro de una ventana de validación de 10 días, recortando minutos en cada release sin sacrificar cobertura",
              "Sin disparador automático de rollback: el rollback sigue siendo el procedimiento manual documentado arriba, no una herramienta de un clic — construir un rollback automatizado real para metadatos Salesforce sería un proyecto aparte",
              "La protección de rama exige una sola revisión antes del merge a main — dimensionado para un pipeline con un único mantenedor, nunca probado a la escala de un equipo con varios desarrolladores",
              "Sin pruebas de humo tras el despliegue: el pipeline valida antes de desplegar, no después — la primera limitación que resolvería si este pipeline tuviera que dar servicio a una org de producción real hoy"
            ],
            "title": "Decisiones y límites"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Dev, Staging, Production",
                "label": "Entornos cubiertos",
                "value": "3"
              },
              {
                "note": "Por Pull Request",
                "label": "Tiempo de validación",
                "value": "< 5 min"
              },
              {
                "note": "Totalmente automatizado",
                "label": "Despliegues manuales",
                "value": "0"
              },
              {
                "note": "Apex — requerida para el despliegue",
                "label": "Cobertura de tests",
                "value": "> 75%"
              }
            ],
            "title": "Resultados"
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
  },
  {
    "slug": "nova-manufacturing-classic-to-lightning",
    "gallery": [],
    "locales": {
      "en": {
        "title": "Salesforce Classic to Lightning Experience Migration (Nova Manufacturing)",
        "heroSubtitle": "Classic to Lightning migration and Apex security hardening for an international industrial equipment manufacturer.",
        "sections": [
          {
            "body": "> Anonymized project, inspired by an engagement carried out in a professional environment. Names, data, and specific details have been altered to respect client confidentiality.\n\nNova Manufacturing is an international manufacturer of industrial equipment (~150 sales reps spread across 3 sites/hubs in Europe). Its Salesforce CRM, still mostly running on Classic, had accumulated several generations of development: Visualforce pages, JavaScript buttons, Process Builder, heavily customized profiles, and REST integrations with third-party systems (ERP, billing). With Classic being progressively deprecated, the company brought in a Salesforce consulting team (myself included) to modernize the application — with an explicit mandate: don't just migrate the interface, harden the security of the legacy Apex code along the way, some of which had never been audited since its initial release.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Visualforce page Compte360 (Account object): search and display orders and contracts linked to an account, SOQL query built dynamically in the controller → converted to a Lightning Web Component AccountOrdersOverview, wired to AccountOrdersController.getOrders() (6 days)",
              "JavaScript button UpdateContractStatus (Contract object): updated contract status with no rights check or user confirmation → replaced by a Quick Action triggering a Screen Flow with an invocable Apex method (3 days)",
              "Process Builder \"Order Validation\": multi-level approval workflow triggered on creation → migrated to a Record-Triggered Flow (separate before-save/after-save to respect Governor Limits) (4 days)",
              "4 legacy Apex controllers: systematic audit, no CRUD/FLS rights testing in place → rebuilt with a strict with sharing pattern. Plus 4 new controllers built for this project, with security designed in from the start (5 days total)",
              "Total estimate: 25 days (audit 2d, Visualforce→LWC migration 6d, JS button→Quick Action/Flow 3d, Process Builder→Flow 4d, Apex security 5d, testing 3d, documentation 2d), plus 8h of user training"
            ],
            "title": "Identified Components & Proposed Solutions"
          },
          {
            "type": "bullets",
            "items": [
              "LWC AccountOrdersOverview: lightning-datatable with server-side pagination and keyword search, wired to an @AuraEnabled(cacheable=true) Apex method using WITH SECURITY_ENFORCED",
              "Record-Triggered Flow \"Order Validation v2\": bulkified logic processing the full collection (the old Process Builder wasn't, and caused Governor Limit errors on bulk imports), with a reusable sub-flow for the notification step",
              "Permission Set Groups: consolidated 8 near-duplicate legacy profiles into 5 groups, reducing configuration debt and clarifying access audits",
              "Named Credentials: replaced hardcoded REST endpoints (credentials previously visible in Custom Settings to any admin) with Named Credentials, authentication managed by the platform"
            ],
            "title": "Delivered Development"
          },
          {
            "type": "bullets",
            "items": [
              "ContractService.updateStatus(): before the rebuild, it wrote directly to Contract with no checks, and the class ran without sharing by default from an old Visualforce controller. After: Security.stripInaccessible(AccessType.UPDATABLE, records) before every DML, explicit with sharing on the class",
              "Dedicated unit test simulating a user without edit rights on Contract.Statut__c to verify the write is correctly blocked by stripInaccessible()",
              "Audit of the 4 legacy controllers: no CRUD/FLS rights test existed before this engagement — systematic addition of explicit checks wherever queries weren't eligible for WITH SECURITY_ENFORCED. Security designed in from the start on the 4 new controllers built for the project",
              "Profile-to-permission-set mapping matrix validated with business managers before cutover, to avoid any silent regression on access rights"
            ],
            "title": "Security & Best Practices"
          },
          {
            "type": "bullets",
            "items": [
              "Legacy Apex controller incompatibility (medium impact) → sandbox regression testing before each cutover, component-by-component deployment rather than a single big-bang release",
              "User adoption (high probability) → 8h of training split across 2 sessions, short role-based documentation instead of a single manual",
              "Governor Limit errors on migrated Flows (low impact, already hit once in sandbox) → bulkification built in from the design stage, tested with 200+ record datasets",
              "Silent access-rights regression during profile consolidation (high impact) → profile-to-permission-set mapping matrix validated with business managers before production rollout"
            ],
            "title": "Risk Management"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components, Apex, SOQL",
              "Flow (Record-Triggered, before-save/after-save)",
              "Permission Set Groups, Named Credentials",
              "Salesforce Security Model — CRUD/FLS, WITH SECURITY_ENFORCED, stripInaccessible()"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "4 legacy hardened + 4 new built secure-by-design",
                "label": "Apex classes secured",
                "value": "8"
              },
              {
                "note": "Permission Set Groups",
                "label": "Profiles consolidated",
                "value": "8 → 5"
              },
              {
                "note": "audit + migration + security + testing + documentation",
                "label": "Total effort",
                "value": "25 days"
              },
              {
                "note": "Governor Limits validation on migrated Flows",
                "label": "Bulk tested",
                "value": "200+ records"
              }
            ],
            "title": "Results"
          },
          {
            "type": "bullets",
            "items": [
              "Progressive, component-by-component migration rather than a big bang: slower, but allows a targeted rollback if a migrated component reveals an unanticipated production issue",
              "Simple Visualforce pages with no real migration upside left as-is: Lightning Experience supports them natively, migrating the entire scope would have been cost with no measurable user benefit",
              "Named Credentials deployed only on the REST integrations flagged as priority during the audit — secondary integrations remain on the old mechanism, migration documented as a next step"
            ],
            "title": "Known Limitations & Decisions"
          }
        ]
      },
      "fr": {
        "title": "Migration Salesforce Classic vers Lightning Experience (Nova Manufacturing)",
        "heroSubtitle": "Migration Classic → Lightning et durcissement sécurité Apex pour un fabricant industriel international.",
        "sections": [
          {
            "body": "> Projet anonymisé, inspiré d'une mission réalisée en environnement professionnel. Noms, données et éléments spécifiques ont été modifiés pour respecter la confidentialité client.\n\nNova Manufacturing est un fabricant international d'équipements industriels (~150 commerciaux répartis sur 3 sites/pôles en Europe). Son CRM Salesforce, encore majoritairement sous Classic, accumulait plusieurs générations de développements : pages Visualforce, boutons JavaScript, Process Builder, profils très personnalisés, intégrations REST vers des systèmes tiers (ERP, facturation). Avec la dépréciation progressive de Classic, l'entreprise a confié à l'équipe de consultants Salesforce (dont moi) la modernisation de l'application — avec un mandat explicite : ne pas se contenter de migrer l'interface, mais durcir la sécurité des développements Apex historiques au passage, dont plusieurs n'avaient jamais été audités depuis leur mise en production initiale.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Page Visualforce Compte360 (objet Account) : recherche et affichage des commandes et contrats liés à un compte, requête SOQL construite dynamiquement côté contrôleur → convertie en Lightning Web Component AccountOrdersOverview, wiré à AccountOrdersController.getOrders() (6 jours)",
              "Bouton JavaScript UpdateContractStatus (objet Contract) : mise à jour du statut contractuel sans vérification de droits ni confirmation utilisateur → remplacé par une Quick Action déclenchant un Screen Flow avec Apex invocable (3 jours)",
              "Process Builder \"Validation commande\" : workflow d'approbation multi-niveaux déclenché à la création → migré vers un Record-Triggered Flow (before-save + after-save séparés pour respecter les Governor Limits) (4 jours)",
              "4 contrôleurs Apex historiques : audit systématique, aucun test de droits CRUD/FLS en place → refonte avec pattern with sharing strict. + 4 nouveaux contrôleurs créés pour ce projet, avec sécurité intégrée dès la conception (5 jours au total)",
              "Estimation totale : 25 jours (audit 2j, migration Visualforce→LWC 6j, bouton JS→Quick Action/Flow 3j, Process Builder→Flow 4j, sécurité Apex 5j, tests 3j, documentation 2j), + 8h de formation utilisateurs"
            ],
            "title": "Composants identifiés & solutions proposées"
          },
          {
            "type": "bullets",
            "items": [
              "LWC AccountOrdersOverview : lightning-datatable avec pagination côté serveur et recherche par mot-clé, wiré à une méthode Apex @AuraEnabled(cacheable=true) en WITH SECURITY_ENFORCED",
              "Record-Triggered Flow \"Validation commande v2\" : logique bulkifiée traitant la collection complète (l'ancien Process Builder ne l'était pas et provoquait des erreurs Governor Limits sur les imports en masse), avec sous-flow réutilisable pour la partie notification",
              "Permission Set Groups : consolidation de 8 profils historiques quasi-dupliqués en 5 groupes, réduisant la dette de configuration et clarifiant l'audit des accès",
              "Named Credentials : remplacement des endpoints REST codés en dur (identifiants auparavant visibles dans des Custom Settings par tout admin) par des Named Credentials avec authentification gérée par la plateforme"
            ],
            "title": "Développements livrés"
          },
          {
            "type": "bullets",
            "items": [
              "ContractService.updateStatus() : avant refonte, écriture directe sur Contract sans vérification et classe en without sharing par défaut d'un ancien contrôleur Visualforce. Après refonte : Security.stripInaccessible(AccessType.UPDATABLE, records) avant tout DML, with sharing explicite sur la classe",
              "Test unitaire dédié simulant un utilisateur sans droit d'édition sur Contract.Statut__c pour vérifier que l'écriture est bien bloquée par stripInaccessible()",
              "Audit des 4 contrôleurs historiques : aucun test de droits CRUD/FLS n'existait avant cette mission — ajout systématique de vérifications explicites là où les requêtes ne sont pas éligibles à WITH SECURITY_ENFORCED. Sécurité intégrée dès la conception sur les 4 nouveaux contrôleurs créés pour le projet",
              "Matrice de comparaison profils → permission sets validée avec les managers métier avant bascule, pour éviter toute régression silencieuse sur les droits d'accès"
            ],
            "title": "Sécurité & bonnes pratiques"
          },
          {
            "type": "bullets",
            "items": [
              "Incompatibilité de contrôleurs Apex existants (impact moyen) → tests de non-régression en sandbox avant chaque bascule, déploiement composant par composant plutôt qu'en bloc",
              "Adoption utilisateurs (probabilité élevée) → 8h de formation réparties sur 2 sessions, documentation courte par rôle plutôt qu'un manuel unique",
              "Erreurs Governor Limits sur les migrations Flow (impact faible, déjà rencontré une fois en sandbox) → bulkification systématique dès la conception, testée avec des jeux de données de 200+ enregistrements",
              "Régression silencieuse sur les droits d'accès pendant la consolidation des profils (impact élevé) → matrice de comparaison profils → permission sets validée avec les managers métier avant mise en production"
            ],
            "title": "Gestion des risques"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components, Apex, SOQL",
              "Flow (Record-Triggered, before-save/after-save)",
              "Permission Set Groups, Named Credentials",
              "Salesforce Security Model — CRUD/FLS, WITH SECURITY_ENFORCED, stripInaccessible()"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "4 historiques durcies + 4 nouvelles créées sécurisées dès la conception",
                "label": "Classes Apex sécurisées",
                "value": "8"
              },
              {
                "note": "Permission Set Groups",
                "label": "Profils consolidés",
                "value": "8 → 5"
              },
              {
                "note": "audit + migration + sécurité + tests + documentation",
                "label": "Charge totale",
                "value": "25 jours"
              },
              {
                "note": "validation Governor Limits sur les Flows migrés",
                "label": "Bulk testé",
                "value": "200+ enregistrements"
              }
            ],
            "title": "Résultats"
          },
          {
            "type": "bullets",
            "items": [
              "Migration progressive composant par composant plutôt qu'un big-bang : plus lent, mais permet un rollback ciblé si un composant migré révèle un problème non anticipé en production",
              "Pages Visualforce simples (sans réelle valeur ajoutée à migrer) laissées telles quelles : Lightning Experience les supporte nativement, migrer l'ensemble du périmètre n'aurait été qu'un coût sans bénéfice utilisateur mesurable",
              "Named Credentials déployés uniquement sur les intégrations REST identifiées comme prioritaires lors de l'audit — les intégrations secondaires restent sur l'ancien mécanisme, migration documentée comme prochaine étape"
            ],
            "title": "Limites connues & décisions"
          }
        ]
      },
      "es": {
        "title": "Migración de Salesforce Classic a Lightning Experience (Nova Manufacturing)",
        "heroSubtitle": "Migración de Classic a Lightning y refuerzo de seguridad Apex para un fabricante internacional de equipos industriales.",
        "sections": [
          {
            "body": "> Proyecto anonimizado, inspirado en un encargo realizado en un entorno profesional. Nombres, datos y elementos específicos han sido modificados para respetar la confidencialidad del cliente.\n\nNova Manufacturing es un fabricante internacional de equipos industriales (~150 comerciales repartidos en 3 sedes/polos en Europa). Su CRM Salesforce, todavía mayoritariamente en Classic, acumulaba varias generaciones de desarrollos: páginas Visualforce, botones JavaScript, Process Builder, perfiles muy personalizados, integraciones REST con sistemas externos (ERP, facturación). Con la progresiva desaparición de Classic, la empresa encargó al equipo de consultores Salesforce (yo incluida) la modernización de la aplicación — con un mandato explícito: no limitarse a migrar la interfaz, sino reforzar también la seguridad de los desarrollos Apex heredados, varios de los cuales nunca habían sido auditados desde su puesta en producción inicial.",
            "type": "text",
            "title": "Contexto"
          },
          {
            "type": "bullets",
            "items": [
              "Página Visualforce Compte360 (objeto Account): búsqueda y visualización de pedidos y contratos vinculados a una cuenta, consulta SOQL construida dinámicamente en el controlador → convertida en un Lightning Web Component AccountOrdersOverview, conectado a AccountOrdersController.getOrders() (6 días)",
              "Botón JavaScript UpdateContractStatus (objeto Contract): actualización del estado del contrato sin verificación de permisos ni confirmación del usuario → sustituido por una Quick Action que lanza un Screen Flow con un método Apex invocable (3 días)",
              "Process Builder \"Validación de pedido\": flujo de aprobación multinivel disparado en la creación → migrado a un Record-Triggered Flow (before-save y after-save separados para respetar los Governor Limits) (4 días)",
              "4 controladores Apex heredados: auditoría sistemática, sin ninguna prueba de permisos CRUD/FLS implementada → reconstruidos con un patrón with sharing estricto. Más 4 controladores nuevos creados para este proyecto, con seguridad integrada desde el diseño (5 días en total)",
              "Estimación total: 25 días (auditoría 2d, migración Visualforce→LWC 6d, botón JS→Quick Action/Flow 3d, Process Builder→Flow 4d, seguridad Apex 5d, pruebas 3d, documentación 2d), más 8h de formación de usuarios"
            ],
            "title": "Componentes identificados y soluciones propuestas"
          },
          {
            "type": "bullets",
            "items": [
              "LWC AccountOrdersOverview: lightning-datatable con paginación en el servidor y búsqueda por palabra clave, conectado a un método Apex @AuraEnabled(cacheable=true) con WITH SECURITY_ENFORCED",
              "Record-Triggered Flow \"Validación de pedido v2\": lógica bulkificada que procesa la colección completa (el antiguo Process Builder no lo hacía y provocaba errores de Governor Limits en las importaciones masivas), con un sub-flow reutilizable para la parte de notificación",
              "Permission Set Groups: consolidación de 8 perfiles heredados casi duplicados en 5 grupos, reduciendo la deuda de configuración y facilitando la auditoría de accesos",
              "Named Credentials: sustitución de los endpoints REST codificados directamente (credenciales antes visibles en Custom Settings para cualquier administrador) por Named Credentials, con autenticación gestionada por la plataforma"
            ],
            "title": "Desarrollos entregados"
          },
          {
            "type": "bullets",
            "items": [
              "ContractService.updateStatus(): antes de la reconstrucción, escribía directamente en Contract sin verificación, y la clase se ejecutaba en without sharing por defecto de un antiguo controlador Visualforce. Después: Security.stripInaccessible(AccessType.UPDATABLE, records) antes de cada DML, with sharing explícito en la clase",
              "Prueba unitaria dedicada que simula un usuario sin permiso de edición sobre Contract.Statut__c para verificar que stripInaccessible() bloquea correctamente la escritura",
              "Auditoría de los 4 controladores heredados: no existía ninguna prueba de permisos CRUD/FLS antes de este proyecto — se añadieron verificaciones explícitas allí donde las consultas no eran elegibles para WITH SECURITY_ENFORCED. Seguridad integrada desde el diseño en los 4 controladores nuevos creados para el proyecto",
              "Matriz de comparación perfiles → permission sets validada con los responsables de negocio antes del cambio, para evitar cualquier regresión silenciosa en los derechos de acceso"
            ],
            "title": "Seguridad y buenas prácticas"
          },
          {
            "type": "bullets",
            "items": [
              "Incompatibilidad de controladores Apex existentes (impacto medio) → pruebas de no regresión en sandbox antes de cada cambio, despliegue componente por componente en lugar de todo a la vez",
              "Adopción por parte de los usuarios (probabilidad alta) → 8h de formación repartidas en 2 sesiones, documentación breve por rol en lugar de un manual único",
              "Errores de Governor Limits en los Flows migrados (impacto bajo, ya detectado una vez en sandbox) → bulkificación sistemática desde el diseño, probada con conjuntos de 200+ registros",
              "Regresión silenciosa en los derechos de acceso durante la consolidación de perfiles (impacto alto) → matriz de comparación perfiles → permission sets validada con los responsables de negocio antes de la puesta en producción"
            ],
            "title": "Gestión de riesgos"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components, Apex, SOQL",
              "Flow (Record-Triggered, before-save/after-save)",
              "Permission Set Groups, Named Credentials",
              "Modelo de seguridad de Salesforce — CRUD/FLS, WITH SECURITY_ENFORCED, stripInaccessible()"
            ],
            "title": "Stack y tecnologías"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "4 heredadas reforzadas + 4 nuevas creadas con seguridad desde el diseño",
                "label": "Clases Apex aseguradas",
                "value": "8"
              },
              {
                "note": "Permission Set Groups",
                "label": "Perfiles consolidados",
                "value": "8 → 5"
              },
              {
                "note": "auditoría + migración + seguridad + pruebas + documentación",
                "label": "Esfuerzo total",
                "value": "25 días"
              },
              {
                "note": "validación de Governor Limits en los Flows migrados",
                "label": "Probado en bloque",
                "value": "200+ registros"
              }
            ],
            "title": "Resultados"
          },
          {
            "type": "bullets",
            "items": [
              "Migración progresiva componente por componente en lugar de un big bang: más lenta, pero permite un rollback específico si un componente migrado revela un problema no anticipado en producción",
              "Páginas Visualforce simples sin valor añadido real de migrar se dejaron tal cual: Lightning Experience las soporta de forma nativa, migrar todo el alcance solo habría supuesto coste sin beneficio medible para el usuario",
              "Named Credentials desplegadas únicamente en las integraciones REST identificadas como prioritarias durante la auditoría — las integraciones secundarias siguen con el mecanismo antiguo, migración documentada como siguiente paso"
            ],
            "title": "Limitaciones conocidas y decisiones"
          }
        ]
      }
    }
  },
];
