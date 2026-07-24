// AUTO-GENERATED — do not hand-edit.
// Exported from Supabase (public.projects) by scripts/export-projects-from-supabase.ts.
// Re-run that script after any content change in Supabase to keep this file current.
// Last export: 2026-07-24T19:19:23.205Z

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
        "sections": []
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
            "body": "Heme Biotech is a pharmaceutical company specializing in blood disorders. Alex, a chemistry researcher, had started a Java program for counting and alphabetically sorting symptoms — but all counters returned 0. Mission: diagnose the bugs, refactor the codebase to Java OOP standards, and deliver full Javadoc documentation for team handover.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Symptom counter consistently returning 0 — root cause to be identified",
              "Sort algorithm broken — output not alphabetical",
              "Monolithic code with no separation of concerns",
              "No interfaces or OOP patterns in place",
              "Naming not compliant with Java camelCase conventions",
              "No Javadoc documentation available for team handover"
            ],
            "title": "Problem Scope"
          },
          {
            "type": "bullets",
            "items": [
              "Replaced data structure with TreeMap — native alphabetical ordering and corrected counting",
              "Created ISymptomReader and ISymptomWriter interfaces",
              "Implemented AnalyticsCounter class with 4 methods: getSymptoms, countSymptoms, sortSymptoms, writeSymptoms",
              "Isolated entry point into a dedicated Main class",
              "camelCase naming applied throughout the entire codebase",
              "Full Javadoc on all public methods",
              "result.out file generated with alphabetically sorted symptoms"
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
            "body": "Heme Biotech est une entreprise pharmaceutique spécialisée dans les maladies du sang. Alex, chercheur en chimie, avait développé un programme Java de comptage et de tri alphabétique des symptômes — mais tous les compteurs retournaient 0. Mission : diagnostiquer les bugs, refactoriser la base de code selon les standards OOP Java et livrer une Javadoc complète pour permettre la reprise en équipe.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Compteur de symptômes retournant systématiquement 0 — cause racine à identifier",
              "Algorithme de tri non fonctionnel — résultats non alphabétiques",
              "Code monolithique sans séparation des responsabilités",
              "Absence d interfaces et de patterns OOP",
              "Nommage non conforme aux conventions Java (camelCase)",
              "Aucune documentation Javadoc disponible pour la reprise par l équipe"
            ],
            "title": "Problèmes & Périmètre"
          },
          {
            "type": "bullets",
            "items": [
              "Remplacement de la structure de données par TreeMap — tri alphabétique natif et comptage corrigé",
              "Création des interfaces ISymptomReader et ISymptomWriter",
              "Implémentation de la classe AnalyticsCounter avec 4 méthodes : getSymptoms, countSymptoms, sortSymptoms, writeSymptoms",
              "Isolation du point d entrée dans une classe Main dédiée",
              "Nommage camelCase appliqué sur l ensemble du code",
              "Javadoc complète sur toutes les méthodes publiques",
              "Fichier result.out généré avec les symptômes triés alphabétiquement"
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
              "La lectura del archivo era correcta, pero el conteo era incorrecto (ej. 3 ocurrencias en el archivo → 0 en la salida para todos los síntomas)."
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
                "href": "/docs/projects/hemebiotech-java-debug/brief.docx",
                "label": "Brief del proyecto (DOCX)"
              },
              {
                "href": "/docs/projects/hemebiotech-java-debug/key-steps-guide.pdf",
                "label": "Guía de pasos clave (PDF)"
              },
              {
                "href": "/docs/projects/hemebiotech-java-debug/directives.pdf",
                "label": "Directrices (PDF)"
              },
              {
                "href": "/docs/projects/hemebiotech-java-debug/email-exchange.pdf",
                "label": "Intercambio de emails (PDF)"
              },
              {
                "href": "/docs/projects/hemebiotech-java-debug/deliverable.pdf",
                "label": "Entrega (PDF)"
              },
              {
                "href": "/docs/projects/hemebiotech-java-debug/legacy-version-may-2023.pdf",
                "note": "Referencia",
                "label": "Versión anterior (PDF)"
              },
              {
                "href": "/docs/projects/hemebiotech-java-debug/repository.txt",
                "label": "Enlace del repositorio (TXT)"
              }
            ],
            "title": "Entregables"
          },
          {
            "code": "https://github.com/Aiyeesha/DAHOUMANE-Aicha-Imene-Debuggez-une-applicationJava.git",
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
        "sections": []
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
        "sections": []
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
        "sections": []
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
        "sections": []
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
              "ParkingDatabaseIT integration tests on real database — global coverage above 70%",
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
                "description": "ParkingDatabaseIT on real database — global coverage above 70%, defense validated 4/4"
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
              "Tests d intégration ParkingDatabaseIT sur base de données réelle — couverture globale > 70%",
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
                "description": "ParkingDatabaseIT sur base réelle — couverture globale > 70%, soutenance validée 4/4"
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
        "title": "Java testing & TDD feature delivery (Parkit)",
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
                "href": "/docs/projects/parkit-java-testing/brief-parkit.docx",
                "label": "Brief del proyecto (DOCX)"
              },
              {
                "href": "/docs/projects/parkit-java-testing/guide-etapes.pdf",
                "label": "Guía de pasos (PDF)"
              },
              {
                "href": "/docs/projects/parkit-java-testing/guide-etapes-cles.pdf",
                "label": "Guía de pasos clave (PDF)"
              },
              {
                "href": "/docs/projects/parkit-java-testing/kit-technique-onboarding.pdf",
                "label": "Kit técnico de incorporación (PDF)"
              },
              {
                "href": "/docs/projects/parkit-java-testing/ancienne-version-mai-2023.pdf",
                "label": "Versión archivada (PDF)"
              },
              {
                "href": "/docs/projects/parkit-java-testing/screenshots.zip",
                "label": "Capturas de informes de pruebas (ZIP)"
              },
              {
                "href": "https://github.com/Aiyeesha/ParkingSystem.git",
                "label": "Repositorio GitHub"
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
              "Book search via Fetch API and add to personal list",
              "Dynamic book removal with real-time DOM updates",
              "Full SPA in vanilla ES6 JavaScript — zero framework dependency",
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
              "JavaScript ES6 — SPA logic, Fetch API, DOM manipulation",
              "Fetch API — requests to external book API",
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
              "Recherche de livres via Fetch API et ajout dans une liste personnelle",
              "Suppression dynamique des livres avec mise à jour du DOM en temps réel",
              "SPA complète en JavaScript ES6 pur — zéro dépendance framework",
              "Responsive mobile-first avec media queries pour 3 breakpoints",
              "HTML5 sémantique aligné sur les wireframes UX de Charlotte",
              "SASS structuré (variables, mixins, nesting) — approche DRY validée par le jury",
              "README d installation livré au client final"
            ],
            "title": "Solution & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "HTML5 sémantique — structure de l interface",
              "SASS — préprocesseur CSS (variables, mixins, DRY)",
              "JavaScript ES6 — logique SPA, Fetch API, manipulation du DOM",
              "Fetch API — requêtes vers l API externe de livres",
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
        "title": "SPA front-end UI (Poch'Lib)",
        "heroSubtitle": "Interfaz Single Page Application para una librería (Poch’Lib)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Great’App (Niza) me encargó la realización del front-end de Poch’Lib, una aplicación de gestión de libros solicitada por la librería «La plume enchantée».",
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
              "Integración mobile-first respetando al máximo los wireframes proporcionados.",
              "HTML semántico + estilos estructurados (enfoque DRY, Sass).",
              "JavaScript vanilla para actualizar el DOM (añadir/eliminar, estados de UI).",
              "Fetch para interactuar con una API y obtener el contenido dinámicamente."
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
                "value": "Manipulación del DOM + Fetch (API)"
              }
            ],
            "title": "Señales de calidad"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/pochlib-ui/functional-specs.pdf",
                "label": "Especificaciones funcionales (PDF)"
              },
              {
                "href": "/docs/projects/pochlib-ui/brief.docx",
                "label": "Brief e informe del jurado (DOCX)"
              },
              {
                "href": "/docs/projects/pochlib-ui/index.html",
                "label": "Página HTML de demostración (HTML)"
              },
              {
                "href": "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git",
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
            "code": "https://github.com/Aiyeesha/Projet-6-Creez-une-interface-utilisateur-pour-votre-application-PochLib.git",
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
              "100+ known service detection table (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s...)",
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
                "value": "100+ services"
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
              "Table de détection de 100+ services connus (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s...)",
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
                "value": "100+ services"
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
              "Tabla de detección de servicios que cubre 100+ puertos conocidos (HTTP, SSH, RDP, MSSQL, Redis, MongoDB, Docker, K8s API…).",
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
                "value": "100+ servicios conocidos en el dict KNOWN_SERVICES"
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
              "Compiled regex — 9 rules (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD...)",
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
              "9 règles regex compilées : caractères répétés, séquences numériques/alphabétiques, walks clavier (qwerty/azerty), années intégrées",
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
              "Regex compilés — 9 règles (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD...)",
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
                "description": "9 règles regex compilées appliquées : répétitions, séquences, walks clavier, années intégrées. Chaque pattern détecté pénalise le score."
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
                "value": "9 règles regex"
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
                "value": "9 reglas regex compiladas (RE_REPEAT, RE_SEQ_NUM, RE_KEYBOARD…)"
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
        "sections": []
      },
      "fr": {
        "title": "Matrice de Risques — Registre de Risques Interactif (Reconstruit)",
        "heroSubtitle": "Matrice de risque interactive 5×5 Probabilité/Impact — persistance localStorage, édition en place, et CLI Python testée pour la génération de rapports",
        "sections": []
      },
      "es": {
        "title": "Risk Assessment Matrix (5×5)",
        "heroSubtitle": "Matriz de riesgos interactiva 5×5 probabilidad/impacto — persistencia localStorage, edición en línea, y CLI Python probada para generación de informes.",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Construcción de una matriz de riesgos 5×5 estructurada como herramienta reutilizable para evaluar los riesgos de TI, infraestructura y cumplimiento dentro de una organización.",
              "La matriz cruza la probabilidad (1–5) con el impacto (1–5) para producir una puntuación de riesgo, con zonas coloreadas (verde / amarillo / naranja / rojo) que guían la priorización y las decisiones de tratamiento."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Matriz 5×5: probabilidad (1 = rara → 5 = casi segura) × impacto (1 = insignificante → 5 = catastrófico).",
              "Zonas de severidad coloreadas: Baja (1–4), Media (5–9), Alta (10–16), Crítica (17–25).",
              "Plantilla de registro de riesgos: ID, descripción, probabilidad, impacto, puntuación, propietario, tratamiento y fecha de revisión.",
              "Ejemplos de riesgos que cubren infraestructura, control de acceso, exposición de datos y continuidad de negocio."
            ],
            "title": "Lo que construí"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Dimensiones",
                "value": "5×5 — probabilidad × impacto"
              },
              {
                "label": "Rango de puntuación",
                "value": "1 (baja) → 25 (crítica)"
              },
              {
                "label": "Zonas de severidad",
                "value": "Baja / Media / Alta / Crítica"
              },
              {
                "label": "Casos de uso",
                "value": "Infraestructura IT, cloud, GRC, auditorías de cumplimiento"
              }
            ],
            "title": "Estructura de la matriz"
          },
          {
            "type": "bullets",
            "items": [
              "Identificación, puntuación y planificación del tratamiento de riesgos (alineado con ISO 27005 / NIST RMF).",
              "Herramientas GRC: diseño de registro de riesgos y gestión del ciclo de vida.",
              "Traducción de riesgos técnicos a un lenguaje de impacto de negocio para las partes interesadas.",
              "Aplicable a riesgos de infraestructura, seguridad cloud y marcos de cumplimiento (ISO 27001, NIS2, RGPD)."
            ],
            "title": "Competencias demostradas"
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
        "heroSubtitle": "Datto RMM · Splashtop · MalwareBytes · MIDRANGE GROUP internship",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "During my internship at MIDRANGE GROUP, a managed service provider (MSP) based in the Île-de-France region, I was assigned to the Exploitation team under the supervision of Théo KACEL, a Systems & Networks Administrator. The technical floor was split into two units: Technical Support (handling client calls, ticket creation, and L1/L2 resolution) and Exploitation (server maintenance, security, and L2/L3 escalation support). My role in Exploitation gave me direct hands-on access to the company's RMM platform."
            ]
          },
          {
            "type": "text",
            "title": "Platform: Datto RMM",
            "paragraphs": [
              "Datto RMM (Remote Monitoring and Management) is an enterprise-grade platform designed for MSPs and IT teams to remotely monitor and manage endpoints, networks, and systems at scale. Théo introduced me to the platform and its core capabilities: real-time device health monitoring, automated patch management, software inventory, remote access, security status tracking, and job automation via Quick Jobs and policies."
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
                "label": "Site used in training",
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
              "Under Théo's guidance, I carried out the following operational tasks on the Datto RMM platform: reviewed the Default Dashboard to assess the overall health of the managed fleet (offline device count by type, antivirus coverage across all sites); navigated device profiles to inspect hardware specs, OS version, patch status, and software inventory for individual endpoints; used the Quick Job feature to remotely deploy the MalwareBytes endpoint agent on targeted machines without requiring physical access or user interaction; and connected to client machines via Splashtop for remote troubleshooting and user support sessions."
            ]
          },
          {
            "type": "text",
            "title": "Remote Access: Splashtop",
            "paragraphs": [
              "Splashtop is integrated natively into Datto RMM and provides secure remote desktop access to managed endpoints. During the internship, I used it for: remote technical support for end users (viewing and controlling the client's screen to resolve issues without physical presence); server management tasks (accessing and checking server configurations remotely); and collaborative troubleshooting alongside Théo on complex incidents affecting client infrastructure."
            ]
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
                "label": "MSP exposure",
                "value": "First-hand understanding of MSP operations: multi-client management, SLA-driven support, tiered escalation"
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
        "heroSubtitle": "Datto RMM · Splashtop · MalwareBytes · Stage MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Lors de mon stage chez MIDRANGE GROUP, ESN/MSP basée en Île-de-France, j'ai été intégrée à l'équipe Exploitation sous la tutelle de Théo KACEL, Administrateur Systèmes & Réseaux. Le plateau technique de l'entreprise se divise en deux pôles : Support Technique (gestion des appels clients, création de tickets, résolution N1/N2) et Exploitation (maintenance des serveurs, sécurité, renfort N2/N3). Mon affectation à l'Exploitation m'a donné un accès opérationnel direct à la plateforme RMM de l'entreprise."
            ]
          },
          {
            "type": "text",
            "title": "Plateforme : Datto RMM",
            "paragraphs": [
              "Datto RMM (Remote Monitoring and Management) est une plateforme professionnelle conçue pour les MSP et les équipes IT afin de surveiller et gérer à distance les équipements, réseaux et systèmes à grande échelle. Théo m'a présenté la plateforme et ses fonctionnalités principales : surveillance en temps réel de la santé des équipements, gestion automatisée des correctifs, inventaire logiciel, accès à distance, suivi de l'état de sécurité et automatisation des tâches via Quick Jobs et politiques."
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
                "label": "Site utilisé en stage",
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
              "Sous l'encadrement de Théo, j'ai réalisé les opérations suivantes sur la plateforme Datto RMM : consultation du tableau de bord Default Dashboard pour évaluer l'état global du parc (comptage des équipements hors ligne par type, couverture antivirus sur l'ensemble des sites) ; navigation dans les profils d'équipements pour inspecter les caractéristiques matérielles, la version OS, le statut des correctifs et l'inventaire logiciel ; utilisation de la fonctionnalité Quick Job pour déployer à distance l'agent MalwareBytes sur les postes ciblés, sans accès physique ni intervention utilisateur ; connexion aux postes clients via Splashtop pour des sessions de dépannage et de support à distance."
            ]
          },
          {
            "type": "text",
            "title": "Accès distant : Splashtop",
            "paragraphs": [
              "Splashtop est intégré nativement à Datto RMM et fournit un accès bureau à distance sécurisé aux équipements gérés. Durant le stage, je l'ai utilisé pour : le support technique à distance aux utilisateurs finaux (visualisation et contrôle du poste client pour résoudre les incidents sans déplacement) ; la gestion à distance des serveurs (accès et vérification des configurations) ; et le dépannage collaboratif avec Théo sur des incidents complexes affectant l'infrastructure clients."
            ]
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
                "value": "Découverte des opérations MSP réelles : gestion multi-clients, support orienté SLA, escalade en niveaux"
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
        "heroSubtitle": "Datto RMM · Splashtop · MalwareBytes · Prácticas en MIDRANGE GROUP",
        "sections": []
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
        "heroSubtitle": "Certified data erasure, Sysprep imaging, and zero-touch Autopilot — 264 Dell devices deployed during an internship at MIDRANGE GROUP.",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "During an internship at MIDRANGE GROUP (Alternative Partner Solutions team), I was tasked with deploying two device fleets for a client rollout: 64 Dell Optiplex desktop PCs for on-site staff and 200 Dell Latitude laptops for field users.",
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
            "title": "Key learnings"
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
        "heroSubtitle": "Effacement certifié, image Sysprep et Autopilot zero-touch — 264 appareils Dell déployés lors d'un stage chez MIDRANGE GROUP.",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Lors d'un stage chez MIDRANGE GROUP (équipe Alternative Partner Solutions), j'ai été chargée de déployer deux flottes d'appareils pour un client : 64 PC de bureau Dell Optiplex pour les collaborateurs sur site et 200 laptops Dell Latitude pour les utilisateurs en mobilité.",
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
            "title": "Apprentissages clés"
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
        "heroSubtitle": "Windows Autopilot · Dell Image Assist · Blancco · Intune · Prácticas en MIDRANGE GROUP",
        "sections": []
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
              "During an internship at MIDRANGE GROUP (Support Technique team), I was placed under the supervision of Théo KACEL, a Systems & Network Administrator. The team handles support requests for managed clients across three intake channels: direct phone calls to the support line, email to the support address, and automatic alerts raised by the Datto RMM agent installed on client endpoints.",
              "Once a ticket is opened in Autotask, it is routed either to the Support Technique team (user-facing incidents) or to the Exploitation team (infrastructure and monitoring). Théo assigned me a live client ticket to handle under his guidance."
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
                "description": "A client reported being unable to access a specific website. Webroot was displaying a 'site blocked' warning on their machine. The ticket was assigned to Théo and delegated to me for hands-on resolution."
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
            "title": "Key learnings"
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
              "Lors d'un stage chez MIDRANGE GROUP (équipe Support Technique), j'ai été placée sous la tutelle de Théo KACEL, Administrateur Systèmes et Réseaux. L'équipe traite les demandes de support des clients gérés via trois canaux d'entrée : appels téléphoniques directs vers la ligne support, e-mails à l'adresse support, et alertes automatiques levées par l'agent Datto RMM installé sur les postes clients.",
              "Une fois un ticket ouvert dans Autotask, il est routé soit vers l'équipe Support Technique (incidents utilisateurs), soit vers l'équipe Exploitation (infrastructure et supervision). Théo m'a confié un ticket client en production à traiter sous sa supervision."
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
                "description": "Un client signalait ne pas pouvoir accéder à un site internet spécifique. Webroot affichait un message « site bloqué » sur son poste. Le ticket a été assigné à Théo et délégué pour une résolution en conditions réelles."
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
            "title": "Apprentissages clés"
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
        "heroSubtitle": "Autotask PSA · Splashtop · Webroot · Datto RMM · Prácticas en MIDRANGE GROUP",
        "sections": []
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
        "heroSubtitle": "Acronis Cyber Backup · Acronis Cyber Protect Cloud · MIDRANGE GROUP internship",
        "sections": [
          {
            "type": "text",
            "title": "Context",
            "paragraphs": [
              "Continuing my internship at MIDRANGE GROUP under Théo KACEL, I was involved in managing cloud and local backup operations for one of the company's clients. The backup infrastructure relied on two distinct Acronis products: Acronis Cyber Backup (local/NAS backup solution) and Acronis Cyber Protect Cloud (MSP-oriented cloud backup platform). My daily task was to open the Acronis dashboard, review the alert status, and investigate any failures to restore backup continuity."
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
                "value": "smb://10.15.231.11/backups — 8.77 Tio / 10.5 Tio"
              },
              {
                "label": "NAS destination 2",
                "value": "smb://10.15.231.11/backups-new — 9.57 Tio / 10.5 Tio"
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
                "value": "Replication failed — storage quota exceeded for stchristophecloud@hotmail.fr, new backups will fail"
              },
              {
                "label": "SQL-CLOUD 2 plan",
                "value": "86 devices backed up, Bases_Exchange plan shows red (failure) — investigated network/NAS saturation"
              }
            ],
            "title": "Example Alerts (from dashboard)"
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
        "heroSubtitle": "Acronis Cyber Backup · Acronis Cyber Protect Cloud · Stage MIDRANGE GROUP",
        "sections": [
          {
            "type": "text",
            "title": "Contexte",
            "paragraphs": [
              "Dans la continuité de mon stage chez MIDRANGE GROUP sous la tutelle de Théo KACEL, j'ai participé à la gestion des opérations de sauvegarde cloud et locales pour un des clients de l'entreprise. L'infrastructure de sauvegarde reposait sur deux produits Acronis distincts : Acronis Cyber Backup (solution de sauvegarde locale/NAS) et Acronis Cyber Protect Cloud (plateforme de sauvegarde cloud orientée MSP). Ma tâche quotidienne était d'ouvrir le tableau de bord Acronis, contrôler l'état des alertes et investiguer les échecs pour rétablir la continuité des sauvegardes."
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
                "value": "smb://10.15.231.11/backups — 8,77 Tio / 10,5 Tio"
              },
              {
                "label": "Destination NAS 2",
                "value": "smb://10.15.231.11/backups-new — 9,57 Tio / 10,5 Tio"
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
                "value": "Réplication échouée — quota de stockage dépassé pour stchristophecloud@hotmail.fr, les nouvelles sauvegardes échoueront"
              },
              {
                "label": "Plan SQL-CLOUD 2",
                "value": "86 appareils sauvegardés, plan Bases_Exchange en rouge (échec) — investigation saturation réseau/NAS"
              }
            ],
            "title": "Exemples d'alertes (tableau de bord)"
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
        "heroSubtitle": "Acronis Cyber Backup · Acronis Cyber Protect Cloud · Prácticas en MIDRANGE GROUP",
        "sections": []
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
        "sections": []
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
        "sections": []
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
        "sections": []
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
        "sections": []
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
        "sections": []
      },
      "fr": {
        "title": "Outil d'évaluation de vulnérabilités (Python + CVSS)",
        "heroSubtitle": "CLI Python pour des audits de vulnérabilités structurés avec scoring CVSS v3.1 et génération de rapports HTML",
        "sections": []
      },
      "es": {
        "title": "Vulnerability Assessment Report (Tenable SecurityCenter)",
        "heroSubtitle": "Evaluación de vulnerabilidades Tenable SecurityCenter — resumen ejecutivo, clasificación por severidad y remediación mapeada a CVE.",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Realización de una evaluación estructurada de vulnerabilidades con Tenable SecurityCenter para evaluar la postura de seguridad de un segmento de red objetivo.",
              "El entregable cubre dos niveles: un resumen ejecutivo para las partes interesadas, y un informe técnico de detalles de vulnerabilidades por puerto para el equipo de remediación — cada hallazgo vinculado a referencias CVE y puntuaciones CVSS."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Definición del alcance y ejecución de un escaneo Tenable SecurityCenter sobre el entorno objetivo.",
              "Informe de resumen ejecutivo: puntuación de riesgo global, recuentos crítico/alto/medio/bajo, comparación de tendencias.",
              "Informe de detalles de vulnerabilidades por puerto: desglose por host y por puerto con CVE, puntuaciones CVSS y salida de los plugins.",
              "Lista de prioridades de remediación: hallazgos críticos y altos clasificados por explotabilidad, con las correcciones recomendadas."
            ],
            "title": "Lo que entregué"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Herramienta",
                "value": "Tenable SecurityCenter"
              },
              {
                "label": "Capas del informe",
                "value": "Resumen ejecutivo + detalles de vulnerabilidades por puerto"
              },
              {
                "label": "Puntuación",
                "value": "CVSS v3 — crítica / alta / media / baja"
              },
              {
                "label": "Entregable",
                "value": "Hallazgos mapeados a CVE con guía de remediación"
              }
            ],
            "title": "Resumen de la evaluación"
          },
          {
            "type": "bullets",
            "items": [
              "Configuración del escáner de vulnerabilidades y definición de la política de escaneo.",
              "Interpretación de las puntuaciones CVSS y mapeo de los hallazgos al riesgo de negocio.",
              "Producción de informes de doble audiencia (ejecutivo + técnico).",
              "Priorización de la remediación por explotabilidad y criticidad de los activos."
            ],
            "title": "Competencias demostradas"
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
        "sections": []
      },
      "fr": {
        "title": "Playbook de réponse aux incidents (SOC)",
        "heroSubtitle": "Procédures structurées de réponse aux incidents : malware, ransomware, violations de données, phishing et accès non autorisés",
        "sections": []
      },
      "es": {
        "title": "Incident Response Playbook (Phishing)",
        "heroSubtitle": "Playbook de respuesta a incidentes de phishing — detectar, triar, contener, erradicar, recuperar.",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "El phishing sigue siendo uno de los vectores de acceso inicial más frecuentes. Este playbook proporciona a los analistas un flujo de trabajo estructurado y guiado por decisiones para tratar los incidentes de phishing de manera coherente y eficaz.",
              "Cubre el ciclo de vida completo del incidente — desde la detección inicial hasta la revisión posterior — con puntos de decisión explícitos, rutas de escalado y directrices de comunicación en cada etapa."
            ]
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Detección y notificación",
                "description": "Alerta generada por la pasarela de correo, una regla SIEM o una notificación de usuario. Triaje inicial: confirmar los indicadores de phishing (remitente, enlaces, adjuntos, cabeceras)."
              },
              {
                "title": "Contención",
                "description": "Bloquear el remitente/dominio malicioso a nivel de pasarela. Poner en cuarentena los buzones afectados. Aislar cualquier endpoint que haya abierto un enlace o adjunto. Restablecer credenciales si se sospecha compromiso."
              },
              {
                "title": "Erradicación",
                "description": "Eliminar los correos de phishing de todos los buzones (purga de administrador). Revocar las sesiones activas. Escanear los endpoints en busca de malware depositado por algún payload abierto."
              },
              {
                "title": "Recuperación",
                "description": "Restaurar el acceso a cuentas y endpoints tras la verificación. Reactivar los servicios progresivamente. Confirmar la ausencia de mecanismos de persistencia."
              },
              {
                "title": "Revisión post-incidente",
                "description": "Documentar la cronología, la causa raíz y las lecciones aprendidas. Actualizar las reglas de detección y la formación de concienciación. Producir un informe de incidente para las partes interesadas."
              }
            ],
            "title": "Etapas del playbook"
          },
          {
            "type": "bullets",
            "items": [
              "Organigrama de decisión con puertas de rombo en cada punto de triaje (¿Es phishing? ¿Se hizo clic en un enlace? ¿Se introdujeron credenciales?).",
              "Matriz de escalado: analista L1 → responsable SOC → CISO según el alcance y el compromiso confirmado.",
              "Plantillas de comunicación para notificaciones a usuarios y actualizaciones a la dirección.",
              "Checklist de recopilación de evidencias para transferencia forense o requisitos legales."
            ],
            "title": "Características del playbook"
          },
          {
            "type": "bullets",
            "items": [
              "Diseño del ciclo de vida de respuesta a incidentes (alineado con NIST SP 800-61).",
              "Modelado de amenazas para vectores de ataque de phishing.",
              "Diseño de organigramas de proceso para el apoyo a la decisión de los analistas.",
              "Planificación de comunicación con partes interesadas y escalado."
            ],
            "title": "Competencias demostradas"
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
        "sections": []
      },
      "fr": {
        "title": "risque360 — Modélisation STRIDE, Risques Fournisseurs & Recalibration par Incidents",
        "sections": []
      },
      "es": {
        "title": "risque360 — Modelado STRIDE, Riesgo de Proveedores y Recalibración por Incidentes",
        "sections": []
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
            "body": "Avenir Télécom, a Southern France telecom operator, wanted to equip its field teams with a dedicated Salesforce Lightning application for managing customer interventions. The mission ran in two phases: agile delivery of the app in Scrum mode (backlog, sprints, test plan), then managing post-pilot evolutions in Kanban after 3 months in the field. The mission covered both product coordination and technical delivery.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Product backlog written in Scrum: user stories with acceptance criteria for each feature",
              "Story estimation in points with the dev team (planning poker)",
              "Unit and integration test plan covering nominal and error cases",
              "Salesforce Lightning application delivered for the South zone: intervention management and customer tracking",
              "Functional acceptance testing with field users before pilot deployment"
            ],
            "title": "Phase Scrum — Initial Delivery"
          },
          {
            "type": "bullets",
            "items": [
              "Field user feedback collected after 3 months of pilot",
              "Kanban evolution backlog: prioritized by business value and complexity estimate",
              "Kanban board: To Do / In Progress / In Testing / Done columns",
              "Acceptance criteria defined for each evolution before development starts"
            ],
            "title": "Phase Kanban — Post-Pilot Evolutions"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Lightning — Field business application",
              "Scrum — Product backlog and sprint management",
              "Kanban — Post-pilot evolution management",
              "User Stories — Functional specifications with acceptance criteria",
              "Test Plan — Unit and integration testing"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Sprint 0 — Framing",
                "description": "Requirements gathering, Scrum backlog written with user stories and acceptance criteria"
              },
              {
                "label": "Sprints 1-N — Dev",
                "description": "Iterative implementation of the Salesforce Lightning app, sprint demos at each iteration"
              },
              {
                "label": "Test Plan",
                "description": "Unit and integration test plan written — nominal, boundary and error cases covered"
              },
              {
                "label": "3-Month Pilot",
                "description": "App deployed to Southern zone field teams, real-world feedback collected"
              },
              {
                "label": "Feedback Analysis",
                "description": "Synthesis of user feedback: bugs reported, improvements requested, new feature ideas"
              },
              {
                "label": "Kanban Backlog",
                "description": "Evolution backlog built, prioritized by business value, Kanban flow started"
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
                "note": "Pivot after field pilot",
                "label": "Methodologies",
                "value": "Scrum + Kanban"
              },
              {
                "note": "South zone — real field feedback",
                "label": "Pilot duration",
                "value": "3 months"
              },
              {
                "note": "Complete and documented delivery",
                "label": "Jury assessment",
                "value": "Validated"
              }
            ],
            "title": "Results"
          }
        ]
      },
      "fr": {
        "title": "Livraison d'application Lightning & backlog Agile (Avenir Télécom)",
        "heroSubtitle": "Création d'une application Lightning pour Avenir Télécom : backlog, tests et migration de l'interface CRM.",
        "sections": [
          {
            "body": "Avenir Télécom, opérateur télécom de la zone Sud, voulait doter ses équipes terrain d'une application Salesforce Lightning dédiée à la gestion des interventions clients. Mission menée en deux temps : livraison agile de l'application en mode Scrum (backlog, sprints, plan de tests), puis gestion des évolutions post-pilote en Kanban après 3 mois de terrain. La mission couvrait aussi bien la coordination produit que la livraison technique.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Rédaction du backlog produit Scrum : user stories avec critères d'acceptation pour chaque fonctionnalité",
              "Estimation des stories en points avec l'équipe de développement (planning poker)",
              "Plan de tests unitaires et d'intégration couvrant les cas nominaux et les cas d'erreur",
              "Application Salesforce Lightning livrée pour la zone Sud : gestion des interventions et suivi client",
              "Recette fonctionnelle avec les utilisateurs terrain avant déploiement pilote"
            ],
            "title": "Phase Scrum — Livraison initiale"
          },
          {
            "type": "bullets",
            "items": [
              "Collecte des retours utilisateurs terrain après 3 mois de pilote",
              "Backlog Kanban d'évolutions : priorisation par valeur métier et estimation de complexité",
              "Tableau Kanban : colonnes À faire / En cours / En recette / Terminé",
              "Critères d'acceptation définis pour chaque évolution avant développement"
            ],
            "title": "Phase Kanban — Évolutions post-pilote"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Lightning — Application métier terrain",
              "Scrum — Gestion du backlog produit et des sprints",
              "Kanban — Gestion des évolutions post-pilote",
              "User Stories — Spécification fonctionnelle avec critères d'acceptation",
              "Plan de tests — Tests unitaires et d'intégration"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Sprint 0 — Cadrage",
                "description": "Recueil des besoins terrain, rédaction du backlog Scrum avec user stories et critères d'acceptation"
              },
              {
                "label": "Sprints 1-N — Dev",
                "description": "Implémentation de l'application Salesforce Lightning en itérations, démos à chaque sprint"
              },
              {
                "label": "Plan de tests",
                "description": "Cahier de tests unitaires et d'intégration — cas nominaux, cas limites et cas d'erreur"
              },
              {
                "label": "Pilote 3 mois",
                "description": "Déploiement de l'application auprès des équipes terrain zone Sud, collecte des retours"
              },
              {
                "label": "Analyse retours",
                "description": "Synthèse des feedbacks utilisateurs : bugs remontés, améliorations souhaitées, nouvelles fonctionnalités"
              },
              {
                "label": "Backlog Kanban",
                "description": "Construction du backlog d'évolutions, priorisation par valeur métier et démarrage du flux Kanban"
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
                "note": "Pivot après pilote terrain",
                "label": "Méthodologies",
                "value": "Scrum + Kanban"
              },
              {
                "note": "Zone Sud — retours terrain réels",
                "label": "Durée pilote",
                "value": "3 mois"
              },
              {
                "note": "Livraison complète et documentée",
                "label": "Évaluation jury",
                "value": "Validé"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Lightning app delivery & backlog (Avenir Télécom)",
        "heroSubtitle": "Entrega de una aplicación Lightning, estrategia de pruebas y mejoras continuas (Avenir Télécom)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Tras una auditoría interna, los equipos de venta al consumidor de la zona Sur de Avenir Télécom necesitaban una nueva aplicación Lightning, mejor alineada con sus usos diarios.",
              "Definí la estrategia de implementación y coordiné la organización de la entrega con un pequeño equipo (3 desarrolladores Salesforce: senior / confirmado / júnior) en dos fases: plan y calidad, y luego backlog de evoluciones tras 3 meses de piloto."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Definir una estrategia de implementación a partir del pliego de requisitos.",
              "Construir un Product Backlog (buenas prácticas Scrum): valor de negocio, prioridad y estimación.",
              "Producir un cuaderno de pruebas unitarias y de integración: funcionalidades a probar, clases de test asociadas y buenas prácticas/requisitos.",
              "Tras 3 meses de uso, consolidar las solicitudes y crear un backlog Kanban (evoluciones / correcciones) con estados y límites WIP."
            ],
            "title": "Necesidades de negocio"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Fase 1 — Plan y estrategia de calidad",
                "description": "Backlog Scrum, estrategia de entrega y cuaderno de pruebas (unitarias + integración) para garantizar una puesta en producción controlada y verificable."
              },
              {
                "title": "Fase 2 — Mejoras continuas",
                "description": "Tras 3 meses de uso por parte de los comerciales, consolidación de las solicitudes y producción de un backlog Kanban priorizado (estados distintos + límites WIP)."
              }
            ],
            "title": "Enfoque de implementación"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Valor de negocio + orden + esfuerzo",
                "label": "Calidad del backlog",
                "value": "Detallado, priorizado y estimado"
              },
              {
                "note": "Mapeo funcionalidades → clases",
                "label": "Preparación para pruebas",
                "value": "Cuaderno de pruebas completo"
              },
              {
                "note": "Flujo de trabajo claro",
                "label": "Mejora continua",
                "value": "Kanban + límites WIP"
              }
            ],
            "title": "Lo que demuestra este proyecto"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Lightning (App Builder y configuración).",
              "Ágil: Scrum (Product Backlog), luego Kanban para las evoluciones.",
              "Calidad: cuaderno de pruebas unitarias/integración + buenas prácticas."
            ],
            "title": "Stack y método"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/brief.docx",
                "label": "Brief (DOCX)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/cahier-des-charges.pdf",
                "label": "Pliego de requisitos (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/strategy-implementation.pdf",
                "label": "Estrategia de implementación (PDF)"
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
                "href": "/docs/projects/avenir-telecom-lightning-app/audit-report.pdf",
                "label": "Informe de auditoría (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/requests-evolutions-corrections.pdf",
                "label": "Solicitudes de evoluciones/correcciones (PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions-kanban.pdf",
                "label": "Backlog de evoluciones (export Kanban, PDF)"
              },
              {
                "href": "/docs/projects/avenir-telecom-lightning-app/backlog-evolutions.xlsx",
                "label": "Backlog de evoluciones (XLSX)"
              }
            ],
            "title": "Entregables y evidencias"
          },
          {
            "type": "bullets",
            "items": [
              "Cuaderno de pruebas completo.",
              "Backlog único, detallado, priorizado y estimado.",
              "Flujo de trabajo claro (estados distintos) y límites WIP respetados.",
              "Solicitudes clasificadas por prioridad, herramienta adecuada utilizada."
            ],
            "title": "Feedback del jurado (síntesis)"
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
            "body": "Digit Learning, an online professional training school, had been using Salesforce for 2 years with custom objects (Student, Mentor, Training). Project manager Jeanne Pierron requested a comprehensive audit followed by a full modernization: a new data model supporting multiple simultaneous enrollments, automation of manual processes via Flows, and reporting dashboards for sales teams and management.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Rigid data model: impossible to enroll a student in multiple trainings simultaneously",
              "Repetitive manual tasks: enrollment creation, payment tracking, follow-ups — no automation",
              "No reporting: sales reps and directors had no visibility on key indicators",
              "Unimported data: students, mentors and trainings managed outside Salesforce in Excel files"
            ],
            "title": "Problems Identified at Audit"
          },
          {
            "type": "bullets",
            "items": [
              "Data model refactored: intermediate Enrollment object enabling multiple enrollments per student",
              "Salesforce Flows automating enrollment creation, payment status calculation and follow-up reminders",
              "Sales reports: active students per training, conversion rate, revenue by period",
              "Management dashboard: real-time KPIs (enrollments, revenue, satisfaction rate)",
              "Data import via Data Loader: students, mentors and trainings migrated from Excel files",
              "Quantitative productivity gain analysis: estimated time saved per user per week"
            ],
            "title": "Improvements Deployed"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Flows — No-code process automation",
              "Data Loader — Import and migration of existing data",
              "Salesforce Reports & Dashboards — Sales and management monitoring",
              "Custom Objects & Fields — New data schema modeling",
              "Profiles & Permissions — Role-based access control"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Audit",
                "description": "Analysis of existing objects, manual processes and off-CRM data — prioritized improvement list produced"
              },
              {
                "label": "Data model",
                "description": "Intermediate Enrollment object created and relationships refactored to support multiple enrollments per student"
              },
              {
                "label": "Automation",
                "description": "Salesforce Flows developed: automatic enrollment creation, status calculation and follow-up reminders"
              },
              {
                "label": "Reporting",
                "description": "Sales reports and management dashboard built with KPIs defined together with Jeanne"
              },
              {
                "label": "Data import",
                "description": "Existing data migrated via Data Loader: students, mentors, trainings — imported records validated"
              },
              {
                "label": "Defense",
                "description": "Audit and improvements presented — jury: good understanding of business challenges"
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
                "note": "Enrollment, Payment, Follow-up",
                "label": "Flows deployed",
                "value": "3"
              },
              {
                "note": "Sales + Management",
                "label": "Reports created",
                "value": "4+"
              },
              {
                "note": "Students + Mentors + Trainings",
                "label": "Data imported",
                "value": "100%"
              }
            ],
            "title": "Results"
          }
        ]
      },
      "fr": {
        "title": "Mise à jour de l'application Salesforce (Digit Learning)",
        "heroSubtitle": "Audit et mise à jour de l'application Salesforce Digit Learning pour répondre aux besoins des commerciaux.",
        "sections": [
          {
            "body": "Digit Learning, école en ligne de formation professionnelle, utilisait Salesforce depuis 2 ans avec des objets custom (Étudiant, Mentor, Formation). Jeanne Pierron, cheffe de projet, a commandé un audit complet suivi d'une modernisation de l'application : nouveau modèle de données pour gérer les multi-inscriptions, automatisation des processus manuels via Flows, et mise en place de rapports de pilotage pour les équipes commerciales et la direction.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Modèle de données rigide : impossible d'inscrire un étudiant à plusieurs formations simultanément",
              "Tâches manuelles répétitives : création d'inscriptions, suivi des paiements, relances — aucune automatisation",
              "Absence de rapports : commerciaux et directeurs sans visibilité sur les indicateurs clés",
              "Données non importées : étudiants, mentors et formations gérés hors Salesforce dans des fichiers Excel"
            ],
            "title": "Problèmes identifiés à l'audit"
          },
          {
            "type": "bullets",
            "items": [
              "Modèle de données refactorisé : objet Inscription intermédiaire permettant les multi-inscriptions par étudiant",
              "Flows Salesforce automatisant la création d'inscriptions, le calcul du statut de paiement et les relances",
              "Rapports commerciaux : liste des étudiants actifs par formation, taux de conversion, CA par période",
              "Tableau de bord direction : KPIs temps réel (inscriptions, CA, taux de satisfaction)",
              "Import des données via Data Loader : étudiants, mentors et formations migrés depuis les fichiers Excel",
              "Analyse quantitative du gain de productivité : estimation du temps économisé par utilisateur par semaine"
            ],
            "title": "Améliorations déployées"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Flows — Automatisation des processus sans code",
              "Data Loader — Import et migration des données existantes",
              "Salesforce Reports & Dashboards — Pilotage commercial et direction",
              "Objects & Fields Custom — Modélisation du nouveau schéma de données",
              "Profiles & Permissions — Contrôle d'accès par rôle"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Audit",
                "description": "Analyse des objets existants, des processus manuels et des données hors-CRM — liste des points d'amélioration priorisés"
              },
              {
                "label": "Modèle de données",
                "description": "Création de l'objet Inscription intermédiaire et refactoring des relations pour supporter les multi-inscriptions"
              },
              {
                "label": "Automatisation",
                "description": "Développement des Flows Salesforce : création automatique d'inscriptions, calcul des statuts et envoi de relances"
              },
              {
                "label": "Reporting",
                "description": "Création des rapports commerciaux et du tableau de bord direction avec les KPIs définis avec Jeanne"
              },
              {
                "label": "Import des données",
                "description": "Migration des données existantes via Data Loader : étudiants, mentors, formations — validation des enregistrements importés"
              },
              {
                "label": "Soutenance",
                "description": "Présentation de l'audit et des améliorations — jury : bonne compréhension des enjeux métier"
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
                "note": "Inscription, Paiement, Relance",
                "label": "Flows déployés",
                "value": "3"
              },
              {
                "note": "Commerciaux + Direction",
                "label": "Rapports créés",
                "value": "4+"
              },
              {
                "note": "Étudiants + Mentors + Formations",
                "label": "Données importées",
                "value": "100%"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Salesforce application update (Digit Learning)",
        "heroSubtitle": "Auditoría y modernización de una org Salesforce para una escuela en línea: rediseño del modelo de datos, automatizaciones (Flows) y reporting.",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Digit Learning es una escuela en línea. Los equipos comerciales llevan ~2 años usando Salesforce para gestionar Estudiantes, Mentores y Formaciones.",
              "Tras entrevistas con usuarios clave, el departamento de IT solicitó una auditoría estructurada y la implementación de mejoras concretas para reducir el trabajo manual, fiabilizar los datos y mejorar la toma de decisiones."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Permitir que un mismo estudiante se inscriba en varias formaciones (el modelo inicial era demasiado restrictivo).",
              "Automatizar las inscripciones y la asignación de mentores para reducir manipulaciones y errores.",
              "Implementar un seguimiento de antiguos clientes para mejorar la reactivación y el reenganche.",
              "Gestionar mejor las formaciones (capacidad, seguimiento) con indicadores fiables.",
              "Proporcionar informes/paneles accionables (estudiantes por estado, plazas disponibles, tasa de conversión)."
            ],
            "title": "Necesidades de los usuarios (entrevistas)"
          },
          {
            "type": "bullets",
            "items": [
              "Actualización del modelo de datos: creación de un objeto de unión «Formaciones compradas» (master-detail hacia Estudiantes y Formaciones) para gestionar varias inscripciones por estudiante + roll-up summaries (historial, contadores…).",
              "Automatización: Flow record-triggered sobre «Formaciones compradas» para fiabilizar el proceso de inscripción y mantener actualizadas las plazas disponibles.",
              "Automatización: Flow programado para gestionar el ciclo de vida de los estudiantes (Cliente activo vs Antiguo cliente) según las formaciones activas.",
              "Reporting: creación de informes (plazas disponibles, estudiantes agrupados por estado y por mentor, comparativo de la tasa de conversión prospecto → cliente activo).",
              "Documentación: guías de despliegue + importación de datos para un paso a producción reproducible."
            ],
            "title": "Lo que implementé"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Estimación: 75% de tiempo ahorrado por inscripción gracias a la automatización.",
                "label": "Tiempo de procesamiento de una inscripción",
                "value": "20 → 5 min / estudiante"
              },
              {
                "note": "Reenganche observado: +15% (seguimiento habilitado y accionable).",
                "label": "Seguimiento de antiguos clientes",
                "value": "500 registros"
              },
              {
                "note": "Mejora: +15% gracias a un mejor seguimiento y una gestión más fiable.",
                "label": "Tasa de éxito de las formaciones",
                "value": "70% → 85%"
              }
            ],
            "title": "Resultados medidos (cualitativos y cuantitativos)"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/digit-learning-salesforce-update/audit-report.docx",
                "note": "Hallazgos + recomendaciones basados en entrevistas con usuarios.",
                "label": "Informe de auditoría (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/analysis-report.docx",
                "note": "Estimaciones de tiempo ahorrado + explicación del impacto en el negocio.",
                "label": "Análisis cualitativo y cuantitativo (DOCX)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/deployment-guide.pdf",
                "label": "Guía de despliegue (PDF)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/data-import-guide.pdf",
                "label": "Guía de importación de datos (PDF)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/interview-notes.pdf",
                "label": "Notas de las entrevistas (PDF)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/package-installation-link.txt",
                "label": "Enlace de instalación del paquete (TXT)"
              },
              {
                "href": "/docs/projects/digit-learning-salesforce-update/screenshots.zip",
                "note": "Schema Builder + Flows + reporting.",
                "label": "Pack de capturas de pantalla (ZIP)"
              }
            ],
            "title": "Entregables y evidencias"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce: objetos personalizados, relaciones master-detail, roll-up summaries, validación y reporting.",
              "Automatización: Flows record-triggered y programados (patrones mantenibles).",
              "Documentación: guías de despliegue e importación para una operación reproducible."
            ],
            "title": "Stack y herramientas"
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
            "body": "Tours for Life, a fast-growing travel agency, wanted to fully digitize its commercial management. President Philippe Bouvet needed a Salesforce CRM capable of managing the full cycle: lead acquisition, conversion to travelers, tour and bus fleet management, process automation, and commercial performance tracking. The mission covered design, configuration and delivery of a fully operational Salesforce solution.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Manage Leads and convert them to travelers via Salesforce Person Accounts",
              "Create a custom Bus Fleet object linked to tours with seat capacity management",
              "Automate seat decrement via a Flow triggered on each new confirmed registration",
              "Set up hierarchical profiles and roles (Sales Rep, Sales Director, Manager)",
              "Provide reports and dashboards directly accessible from the Salesforce home page"
            ],
            "title": "Project Objectives"
          },
          {
            "type": "bullets",
            "items": [
              "Person Accounts activated: Lead → Traveler conversion with business fields (preferences, loyalty)",
              "Custom Bus Fleet object: bus number, total capacity, lookup to Tour object",
              "Record-Triggered Flow: automatic decrement of Available Seats on each validated registration",
              "3 hierarchical roles + 2 profiles: Sales Rep (read/write on tours) and Director (full access)",
              "Reports: top destinations, revenue per sales rep, fill rate per tour",
              "Management dashboard: real-time KPIs accessible from the Salesforce home page"
            ],
            "title": "Solution Implemented"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Sales Cloud — Full commercial CRM",
              "Person Accounts — Managing travelers as individuals",
              "Salesforce Flows — No-code automation (Record-Triggered Flow)",
              "Custom Objects & Fields — Bus fleet, tours, registrations",
              "Profiles, Roles & Sharing — Data security and visibility",
              "Reports & Dashboards — Real-time commercial monitoring"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analysis",
                "description": "Requirements gathered with Philippe Bouvet, data schema identified and processes to automate mapped"
              },
              {
                "label": "Data model",
                "description": "Person Accounts activated, Bus Fleet custom object created with fields and relations"
              },
              {
                "label": "Security",
                "description": "3 hierarchical roles, 2 profiles and object-level permissions configured"
              },
              {
                "label": "Automation",
                "description": "Record-Triggered Flow built for automatic available seats management on registration"
              },
              {
                "label": "Reporting",
                "description": "Sales reports and management dashboard created — accessible directly from home page"
              },
              {
                "label": "Defense",
                "description": "Full solution demonstration — all features validated by jury"
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
                "note": "Sales Rep + Director",
                "label": "Profiles created",
                "value": "2"
              },
              {
                "note": "Data visibility fully controlled",
                "label": "Hierarchical roles",
                "value": "3"
              },
              {
                "note": "Seat management without Apex code",
                "label": "Automations",
                "value": "1 Flow"
              }
            ],
            "title": "Results"
          }
        ]
      },
      "fr": {
        "title": "Conception de solution Salesforce (Tours For Life)",
        "heroSubtitle": "Implémentation d'une solution Salesforce complète pour Tours For Life, agence de voyages en croissance.",
        "sections": [
          {
            "body": "Tours for Life, agence de voyages en pleine croissance, souhaitait digitaliser sa gestion commerciale de A à Z. Philippe Bouvet, le président, avait besoin d'un CRM Salesforce capable de gérer le cycle complet : acquisition de prospects, conversion en voyageurs, gestion des voyages et de la flotte de bus, automatisation des processus et suivi des performances commerciales. La mission couvrait la conception, la configuration et la livraison d'une solution Salesforce opérationnelle.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Gérer les prospects (Leads) et les convertir en voyageurs via Person Accounts Salesforce",
              "Créer un objet custom Flotte de Bus lié aux voyages avec gestion de la capacité",
              "Automatiser la décrémentation des places disponibles via un Flow à chaque nouvelle inscription",
              "Mettre en place des profils et rôles hiérarchiques (Commercial, Directeur commercial, Responsable)",
              "Fournir des rapports et tableaux de bord directement accessibles depuis la page d'accueil Salesforce"
            ],
            "title": "Objectifs du projet"
          },
          {
            "type": "bullets",
            "items": [
              "Person Accounts activés : conversion Lead → Voyageur avec champs métier (préférences, fidélité)",
              "Objet custom Flotte de Bus : numéro de bus, capacité totale, lookup vers Voyage",
              "Flow Record-Triggered : décrémentation automatique de Places disponibles à chaque inscription validée",
              "3 rôles hiérarchiques + 2 profils : Commercial (lecture/écriture voyages) et Directeur (accès total)",
              "Rapports : top destinations, CA par commercial, taux de remplissage par voyage",
              "Dashboard direction : KPIs temps réel accessibles depuis la page d'accueil Salesforce"
            ],
            "title": "Solution mise en place"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Sales Cloud — CRM commercial complet",
              "Person Accounts — Gestion des voyageurs comme individus",
              "Salesforce Flows — Automatisation sans code (Record-Triggered Flow)",
              "Custom Objects & Fields — Flotte de bus, voyages, inscriptions",
              "Profiles, Roles & Sharing — Sécurité et visibilité des données",
              "Reports & Dashboards — Pilotage commercial en temps réel"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse",
                "description": "Recueil des besoins avec Philippe Bouvet, identification du schéma de données et des processus à automatiser"
              },
              {
                "label": "Modèle de données",
                "description": "Activation Person Accounts, création de l'objet Flotte de Bus avec ses champs et relations"
              },
              {
                "label": "Sécurité",
                "description": "Configuration des 3 rôles hiérarchiques, des 2 profils et des permissions sur chaque objet"
              },
              {
                "label": "Automatisation",
                "description": "Développement du Flow Record-Triggered pour la gestion automatique des places disponibles"
              },
              {
                "label": "Reporting",
                "description": "Création des rapports commerciaux et du dashboard direction — accessible depuis la page d'accueil"
              },
              {
                "label": "Soutenance",
                "description": "Démonstration complète de la solution — toutes les fonctionnalités validées par le jury"
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
                "note": "Commercial + Directeur",
                "label": "Profils créés",
                "value": "2"
              },
              {
                "note": "Visibilité données maîtrisée",
                "label": "Rôles hiérarchiques",
                "value": "3"
              },
              {
                "note": "Gestion places sans code Apex",
                "label": "Automatisations",
                "value": "1 Flow"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Salesforce solution design (Tours For Life)",
        "heroSubtitle": "Diseño de una solución Salesforce (Tours For Life)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Tours For Life quería acelerar su desarrollo comercial simplificando a la vez la gestión de los viajes (proceso demasiado complejo). El objetivo era diseñar una solución Salesforce realmente utilizable por los comerciales: creación de prospectos, conversión en viajeros, gestión de viajes, informes y paneles de control.",
              "Durante el encuadre se añadió una necesidad adicional: gestionar la flota de autobuses directamente en Salesforce, controlada por los directores comerciales y vinculada a los viajes (un mismo autobús puede usarse en varios viajes)."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Crear y calificar prospectos en Salesforce (Lead).",
              "Convertir los prospectos en viajeros (Person Accounts) y centralizar la información del cliente.",
              "Crear y gestionar viajes para los viajeros, con seguimiento de capacidad y plazas disponibles.",
              "Generar informes y paneles de control para el seguimiento comercial y operativo.",
              "Gestionar una flota de autobuses y vincular los autobuses a los viajes (varios viajes por autobús)."
            ],
            "title": "Necesidades clave (brief del cliente)"
          },
          {
            "type": "text",
            "title": "Visión general de la solución",
            "paragraphs": [
              "El modelo de datos y la automatización se diseñaron en torno al ciclo completo: Lead → Viajero → Viaje. La implementación prioriza los objetos estándar (Lead, Actividades) e introduce objetos personalizados para la parte operativa (Viaje) y para la gestión de flota (Flota de autobuses).",
              "Se implementó un Flow record-triggered para decrementar automáticamente el campo «Plazas disponibles» cuando se asignan viajeros a un viaje, garantizando un seguimiento de capacidad fiable."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Los prospectos se gestionan mediante el objeto estándar Lead y luego se convierten en Person Accounts (viajeros).",
              "Los viajes se crean y se asocian a los viajeros para el seguimiento operativo.",
              "Nuevo objeto «Flota de autobuses»: número del autobús (Texto), capacidad (Número), lookup hacia «Viaje».",
              "El modelo está construido para alimentar dashboards en la página de inicio (KPIs + vistas operativas)."
            ],
            "title": "Puntos clave del modelo de datos"
          },
          {
            "type": "text",
            "title": "Seguridad (roles, perfiles, accesos)",
            "paragraphs": [
              "Los accesos se diseñaron para dos audiencias: comerciales y directores comerciales. En la configuración entregada se crearon dos perfiles (Comercial y Director comercial) y tres roles para reflejar la jerarquía.",
              "Con perspectiva, un enfoque más escalable consiste en mantener un único perfil «Comercial» y otorgar los permisos de director mediante un Permission Set: esto reduce el mantenimiento y hace más flexible la evolución de los accesos."
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Análisis de necesidades, decisiones técnicas, modelo de datos y reglas de negocio, especificaciones detalladas.",
                "label": "Competencias validadas",
                "value": "4/4"
              },
              {
                "note": "Decremento automático de «Plazas disponibles» para un seguimiento fiable de la capacidad.",
                "label": "Automatización entregada",
                "value": "Flow"
              },
              {
                "note": "Accesos a objetos documentados y jerarquía implementada (con propuesta de mejora).",
                "label": "Diseño de seguridad",
                "value": "2 perfiles + 3 roles"
              }
            ],
            "title": "Lo que demuestra este proyecto"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/specifications.pdf",
                "note": "Especificaciones funcionales + técnicas alineadas con el pliego de requisitos.",
                "label": "Especificaciones detalladas (PDF)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/presentation.pptx",
                "note": "Soporte de presentación de la solución (encuadre, decisiones, demostración).",
                "label": "Presentación (PPTX)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/data-model.png",
                "note": "Captura del esquema (objetos y relaciones).",
                "label": "Modelo de datos (PNG)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/cahier-des-charges.pdf",
                "note": "Brief inicial + incorporación de la gestión de flota.",
                "label": "Pliego de requisitos (PDF)"
              },
              {
                "href": "/docs/projects/tours-for-life-salesforce-solution/sandbox-creation-guide.pdf",
                "note": "Procedimiento utilizado para preparar un entorno de demostración.",
                "label": "Guía de creación de sandbox (PDF)"
              }
            ],
            "title": "Entregables y evidencias"
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
            "body": "iDEM Connect is a global internet service provider (€1.8B revenue, 3,950 employees). Frédéric Lambert, senior Salesforce architect, needed a complete Apex backend to manage customer subscriptions on Account and Order objects. The mission covered writing technical specifications, developing Apex components (trigger, service classes, batch, scheduler) and delivering test coverage above 75%.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Apex Trigger on Account and Order — delegates business logic to service classes (handler pattern)",
              "3 Apex service classes implementing the business feature grid",
              "Batch Apex for bulk processing of the subscription lifecycle",
              "Apex Scheduler for automatic daily batch scheduling",
              "Unit tests with 3 scenarios per method — coverage above 75% on all classes",
              "Complete PDF documentation: classes, methods, parameters and test cases"
            ],
            "title": "Technical Scope"
          },
          {
            "type": "bullets",
            "items": [
              "Zero DML and SOQL inside FOR loops — all queries externalized",
              "Handler pattern: triggers with no direct logic, clear separation of concerns",
              "Full bulkification — correct processing of 1 to 200 records per transaction",
              "Code coverage above 75% on each Apex class (platform requirement)",
              "Salesforce naming conventions respected (classes, methods, variables)"
            ],
            "title": "Apex Best Practices Applied"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, Service Classes, Batch Apex, Schedulable",
              "SOQL — Queries on Account, Order and related objects",
              "Salesforce DX — Deployment and metadata management",
              "Apex Test Framework — @isTest, Test.startTest/stopTest",
              "PDF Documentation — Complete technical specifications"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Specifications",
                "description": "Feature grid analyzed, detailed technical specs written for the 3 business features"
              },
              {
                "label": "Trigger & Handler",
                "description": "Account/Order Trigger built with handler pattern — business logic delegated to dedicated service classes"
              },
              {
                "label": "Service classes",
                "description": "3 business features implemented in specialized Apex classes, each method unit tested"
              },
              {
                "label": "Batch & Scheduler",
                "description": "Batch Apex for bulk subscription processing and Scheduler for daily automated execution"
              },
              {
                "label": "Tests & Coverage",
                "description": "Unit test suite with 3 scenarios per method (nominal, boundary, error) — coverage validated above 75%"
              },
              {
                "label": "Documentation",
                "description": "Complete PDF documentation written and defense prepared — jury assessment: Félicitations!"
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
                "value": "3/3"
              },
              {
                "note": "On all Apex classes",
                "label": "Code coverage",
                "value": "> 75%"
              },
              {
                "note": "Trigger + Services + Batch + Scheduler",
                "label": "Components delivered",
                "value": "4"
              },
              {
                "note": "Special mention from evaluator",
                "label": "Jury assessment",
                "value": "Félicitations!"
              }
            ],
            "title": "Results"
          }
        ]
      },
      "fr": {
        "title": "Développement backend Apex (iDEM Connect)",
        "heroSubtitle": "Développement d'un backend Apex pour iDEM Connect : trigger, classes de service et batch scheduler.",
        "sections": [
          {
            "body": "iDEM Connect est un fournisseur d'accès à Internet mondial (CA 1,8 Md€, 3 950 salariés). Frédéric Lambert, architecte Salesforce senior, avait besoin d'un backend Apex complet pour gérer les abonnements clients sur les objets Account et Order. La mission couvrait la rédaction des spécifications techniques, le développement des composants Apex (trigger, classes de service, batch, scheduler) et la livraison d'une couverture de tests supérieure à 75%.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Apex Trigger sur Account et Order — délègue la logique métier aux classes de service (handler pattern)",
              "3 classes de service Apex implémentant les fonctionnalités de la grille métier",
              "Batch Apex pour le traitement en masse du cycle de vie des abonnements",
              "Scheduler Apex pour la planification automatique du batch (exécution journalière)",
              "Tests unitaires avec 3 scénarios par méthode — couverture > 75% sur toutes les classes",
              "Documentation complète PDF : classes, méthodes, paramètres et cas de test"
            ],
            "title": "Périmètre technique"
          },
          {
            "type": "bullets",
            "items": [
              "Zéro DML et SOQL dans les boucles FOR — toutes les requêtes externalisées",
              "Handler pattern : triggers sans logique directe, séparation claire des responsabilités",
              "Bulkification complète — traitement correct de 1 à 200 enregistrements par transaction",
              "Couverture de code > 75% sur chaque classe Apex (exigence plateforme)",
              "Conventions de nommage Salesforce respectées (classes, méthodes, variables)"
            ],
            "title": "Bonnes pratiques Apex respectées"
          },
          {
            "type": "bullets",
            "items": [
              "Apex — Triggers, Classes de service, Batch Apex, Schedulable",
              "SOQL — Requêtes sur Account, Order, objets liés",
              "Salesforce DX — Déploiement et gestion des métadonnées",
              "Test Framework Apex — @isTest, Test.startTest/stopTest",
              "PDF Documentation — Spécifications techniques complètes"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Spécifications",
                "description": "Analyse de la grille de fonctionnalités, rédaction des spécifications techniques détaillées pour les 3 fonctionnalités métier"
              },
              {
                "label": "Trigger & Handler",
                "description": "Développement du Trigger sur Account/Order avec handler pattern — logique déportée dans des classes de service dédiées"
              },
              {
                "label": "Classes de service",
                "description": "Implémentation des 3 fonctionnalités métier dans des classes Apex spécialisées, chaque méthode testée unitairement"
              },
              {
                "label": "Batch & Scheduler",
                "description": "Développement du Batch Apex pour le traitement masse et du Scheduler pour l'exécution planifiée quotidienne"
              },
              {
                "label": "Tests & Couverture",
                "description": "Suite de tests unitaires couvrant 3 scénarios par méthode (cas nominal, limite, erreur) — couverture validée > 75%"
              },
              {
                "label": "Documentation",
                "description": "Rédaction de la documentation PDF complète et préparation de la soutenance — évaluation jury : Félicitations"
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
                "note": "Sur toutes les classes Apex",
                "label": "Couverture de code",
                "value": "> 75%"
              },
              {
                "note": "Trigger + Services + Batch + Scheduler",
                "label": "Composants livrés",
                "value": "4"
              },
              {
                "note": "Mention spéciale de l'évaluateur",
                "label": "Évaluation jury",
                "value": "Félicitations !"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Apex backend development (iDEM Connect)",
        "heroSubtitle": "Entrega de un backend Apex (iDEM Connect)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "iDEM Connect es un proveedor de acceso a Internet global y un actor de las tecnologías de conexión. Se diseñó una nueva aplicación Salesforce para ayudar a los equipos comerciales a vender mejor, hacer seguimiento de clientes y gestionar contratos de suscripción.",
              "Mi alcance: entregar el backend Apex (trigger, clases de servicio, batch + scheduler) con un enfoque «listo para producción»: documentación, pruebas unitarias y trazabilidad requisitos → implementación."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Desarrollar un Trigger Apex y clases Apex que cubran las funcionalidades de la grilla.",
              "Proporcionar un Batch Apex y su Scheduler para los procesos recurrentes.",
              "Respetar las buenas prácticas de Apex (bulkificación, límites de Salesforce).",
              "Producir la documentación de las clases (PDF) y un informe de ejecución de pruebas mostrando la cobertura."
            ],
            "title": "Lo que se solicitaba"
          },
          {
            "type": "bullets",
            "items": [
              "Arquitectura en capa de servicio: triggers «ligeros», responsabilidades claras, mejor mantenibilidad.",
              "Bulkificación sistemática (colecciones/maps), con 0 SOQL/DML dentro de bucles.",
              "Batch + Scheduler para ejecutar actualizaciones recurrentes de forma fiable y predecible.",
              "Pruebas unitarias alineadas con la grilla funcional + informe de pruebas para demostrar la cobertura."
            ],
            "title": "Enfoque de implementación"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Competencias validadas (evaluación)",
                "value": "3/3"
              },
              {
                "label": "Cobertura de código",
                "value": "> 75%"
              },
              {
                "label": "SOQL/DML en bucles",
                "value": "0"
              }
            ],
            "title": "Calidad y evidencias"
          },
          {
            "type": "text",
            "title": "Comentarios de la evaluación",
            "paragraphs": [
              "Los comentarios destacan entregables completos y pertinentes: clases documentadas, pruebas unitarias ejecutadas correctamente cubriendo las funcionalidades, respeto de los estándares Apex (bulk-safe), y un backend que combina trigger, servicios y batch/scheduler para responder a los casos de uso sobre Account y Order."
            ]
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/idemconnect-apex-backend/brief.docx",
                "label": "Brief del proyecto (DOCX)"
              },
              {
                "href": "/docs/projects/idemconnect-apex-backend/cahier-des-charges.pdf",
                "label": "Requisitos (PDF)"
              },
              {
                "href": "/docs/projects/idemconnect-apex-backend/grille-de-fonctionnalites.pdf",
                "label": "Grilla de funcionalidades (PDF)"
              },
              {
                "href": "/docs/projects/idemconnect-apex-backend/code-repo.txt",
                "label": "Enlace del repositorio / código (TXT)"
              },
              {
                "href": "/docs/projects/idemconnect-apex-backend/documentation.pdf",
                "label": "Documentación de las clases (PDF)"
              },
              {
                "href": "/docs/projects/idemconnect-apex-backend/rapport-tests.pdf",
                "label": "Informe de ejecución de pruebas (PDF)"
              }
            ],
            "title": "Entregables y evidencias"
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
            "body": "EG Manufacture, a large tapestry manufacturer, was using Salesforce Classic with Visualforce pages and JavaScript buttons — all incompatible with Lightning Experience. WireBright Consulting managed the migration. Mission: inventory all components to migrate, produce technical specifications comparing available options, and convert the components to Lightning (LWC / Quick Actions) with before/after evidence.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Complete inventory of active Visualforce pages and JavaScript buttons to migrate",
              "For each component: feature analysis, migration risks and Lightning alternatives",
              "Prioritization matrix: business impact × technical complexity × dependencies",
              "Detailed specifications with 2 to 3 options per component (pros/cons + cost estimate)",
              "Comparative screenshots Classic vs Lightning for the 3 main screens"
            ],
            "title": "Analysis of Existing Setup"
          },
          {
            "type": "bullets",
            "items": [
              "Visualforce pages converted to Lightning Web Components (LWC) or Aura Components based on complexity",
              "JavaScript buttons replaced by Salesforce Lightning Quick Actions",
              "Migrated components validated: functional tests on Lightning sandbox",
              "Lightning gains documented: productivity, improved UX, native mobile access",
              "Code deployed via Salesforce DX and validated on EG sandbox Lightning pages"
            ],
            "title": "Migration Completed"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components (LWC) — Replacement of Visualforce pages",
              "Aura Components — For components with existing Aura dependencies",
              "Quick Actions Salesforce — JavaScript button migration",
              "Apex Controllers — Server-side logic for Lightning components",
              "Salesforce DX / SFDX — Metadata deployment and versioning",
              "Salesforce Classic & Lightning — Comparative test environments"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Inventory",
                "description": "All Visualforce pages and JavaScript components to migrate identified — dependencies fully mapped"
              },
              {
                "label": "Specifications",
                "description": "Technical specs written — 2-3 options per component with pros/cons, cost estimate and recommendation"
              },
              {
                "label": "Mockup",
                "description": "Comparative screenshots Classic vs Lightning for the 3 key screens (quote form, client record, dashboard)"
              },
              {
                "label": "LWC development",
                "description": "Visualforce pages converted to LWC — server-side Apex logic unchanged, presentation layer rebuilt"
              },
              {
                "label": "Button migration",
                "description": "JavaScript buttons replaced by Lightning Quick Actions — functional tests on sandbox completed"
              },
              {
                "label": "Validation",
                "description": "Regression tests, functional validation with simulated client and defense — jury: complete and relevant solutions"
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
                "note": "Classic → Lightning",
                "label": "Components migrated",
                "value": "JS Button + VF Page"
              },
              {
                "note": "With cost estimate",
                "label": "Options documented",
                "value": "2-3 / component"
              },
              {
                "note": "Special mention",
                "label": "Jury assessment",
                "value": "Complete & relevant solutions"
              }
            ],
            "title": "Results"
          }
        ]
      },
      "fr": {
        "title": "Migration Visualforce vers Lightning (WireBright Consulting)",
        "heroSubtitle": "Migration de l'application Visualforce d'EG Manufacture vers Lightning Web Components chez WireBright Consulting.",
        "sections": [
          {
            "body": "EG Manufacture, grande manufacture de tapisserie, utilisait Salesforce Classic avec des pages Visualforce et des boutons JavaScript — tous incompatibles avec Lightning Experience. Le cabinet WireBright Consulting pilotait la migration. Mission : réaliser l'inventaire des composants à migrer, produire des spécifications techniques comparant les options, et convertir les composants vers Lightning (LWC / Quick Actions) avec preuves avant/après.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Inventaire complet des pages Visualforce actives et des boutons JavaScript à migrer",
              "Pour chaque composant : analyse des fonctionnalités, risques de migration et alternatives Lightning",
              "Matrice de priorisation : impact métier × complexité technique × dépendances",
              "Spécifications détaillées avec 2 à 3 options par composant (pour/contre + estimation chiffrage)",
              "Captures d'écran comparatives Classic vs Lightning pour les 3 écrans principaux"
            ],
            "title": "Analyse de l'existant"
          },
          {
            "type": "bullets",
            "items": [
              "Pages Visualforce converties en Lightning Web Components (LWC) ou Aura Components selon la complexité",
              "Boutons JavaScript remplacés par des Quick Actions Salesforce Lightning",
              "Validation des composants migrés : tests fonctionnels sur sandbox Lightning",
              "Documentation des gains Lightning : productivité, UX améliorée, accès mobile natif",
              "Code déployé via Salesforce DX et validé sur les pages Lightning de la sandbox EG"
            ],
            "title": "Migration réalisée"
          },
          {
            "type": "bullets",
            "items": [
              "Lightning Web Components (LWC) — Remplacement des pages Visualforce",
              "Aura Components — Pour les composants avec dépendances Aura",
              "Quick Actions Salesforce — Migration des boutons JavaScript",
              "Apex Controllers — Logique serveur pour les composants Lightning",
              "Salesforce DX / SFDX — Déploiement et versionning des métadonnées",
              "Salesforce Classic & Lightning — Environnements de test comparatifs"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Inventaire",
                "description": "Identification de tous les composants Visualforce et JavaScript à migrer — cartographie des dépendances"
              },
              {
                "label": "Spécifications",
                "description": "Rédaction des specs techniques : 2-3 options par composant avec pros/cons, chiffrage et recommandation"
              },
              {
                "label": "Maquettage",
                "description": "Captures d'écran comparatives Classic vs Lightning pour les 3 écrans clés (formulaire devis, fiche client, tableau de bord)"
              },
              {
                "label": "Développement LWC",
                "description": "Conversion des pages Visualforce en LWC — logique Apex inchangée côté serveur, refonte de la couche présentation"
              },
              {
                "label": "Migration boutons",
                "description": "Remplacement des boutons JavaScript par des Quick Actions Lightning — tests fonctionnels sur sandbox"
              },
              {
                "label": "Validation",
                "description": "Tests de non-régression, validation fonctionnelle avec le client simulé et soutenance — jury : solutions complètes et pertinentes"
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
                "note": "Classic → Lightning",
                "label": "Composants migrés",
                "value": "Bouton JS + Page VF"
              },
              {
                "note": "Avec chiffrage",
                "label": "Options documentées",
                "value": "2-3 / composant"
              },
              {
                "note": "Mention spéciale",
                "label": "Évaluation jury",
                "value": "Solutions complètes et pertinentes"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Visualforce to Lightning migration (WireBright)",
        "heroSubtitle": "Migración de Visualforce a Lightning (WireBright)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "EG Manufacturing utilizaba Salesforce Classic con páginas Visualforce y botones JavaScript personalizados.",
              "El objetivo era migrar a Lightning Experience para acceder a las funcionalidades recientes, modernizar la UX y mantener un comportamiento de negocio equivalente.",
              "El trabajo incluye un plan de migración (especificaciones), evidencias antes/después (capturas) y las primeras conversiones (Visualforce + botón JavaScript)."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Identificar los componentes Classic afectados por la migración a Lightning (páginas Visualforce, botones JavaScript, UI personalizada).",
              "Proponer opciones de conversión con pros/contras (patrones Lightning) y estimar el esfuerzo por componente.",
              "Proporcionar evidencias antes/después y explicar las ventajas de Lightning para cada pantalla.",
              "Empezar convirtiendo las páginas Visualforce y los botones JavaScript que dejarían de funcionar en Lightning."
            ],
            "title": "Objetivos"
          },
          {
            "type": "bullets",
            "items": [
              "Especificaciones técnicas y funcionales: inventario de componentes + propuesta de conversión.",
              "Estrategia de conversión de los botones JavaScript (acciones/patrones compatibles con Lightning).",
              "Validación mediante capturas de pantalla comparativas (Classic vs Lightning) y controles funcionales."
            ],
            "title": "Solución"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Pantallas comparadas",
                "value": "3 (antes/después)"
              },
              {
                "label": "Componentes legacy migrados",
                "value": "2 (Visualforce + botón JS)"
              },
              {
                "label": "Competencias validadas (jurado)",
                "value": "2/2"
              }
            ],
            "title": "Impacto y evidencias"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/specifications.pdf",
                "label": "Especificaciones técnicas y funcionales (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/installation-manual.pdf",
                "label": "Manual de instalación (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/lightning-advantages.pdf",
                "label": "Ventajas de Lightning (PDF)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/screenshots.zip",
                "label": "Capturas antes/después (ZIP)"
              },
              {
                "href": "/docs/projects/wirebright-visualforce-to-lightning/brief.docx",
                "label": "Solicitud / brief del proyecto (DOCX)"
              }
            ],
            "title": "Entregables y evidencias"
          },
          {
            "type": "text",
            "title": "Comentarios del jurado",
            "paragraphs": [
              "Se validaron las 2 competencias evaluadas: integración de wireframes / evidencias mediante capturas, y producción de documentación técnica y funcional.",
              "Puntos fuertes señalados: buena comprensión, propuesta de solución completa (pros/contras + estimaciones), y migración efectiva de los componentes clave."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce Classic → Lightning Experience (Visualforce, patrones Lightning).",
              "Entrega orientada a documentación (especificaciones, guía de instalación, pack de evidencias)."
            ],
            "title": "Stack y herramientas"
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
            "body": "Le Temps des Papillons (LTP), France's leading bridal couture house, needed a Salesforce CRM to manage 2 million accounts and integrate 3 carriers with distinct interfaces. Marie Dupont (delivery tracking) and Sébastien Nozerac (sales team) led the project client-side. Mission: design the complete architecture — UML data model, security matrix, import strategy and integration plan — before any development began.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Massive data volume: 2,123,000 accounts, 3,239,870 contacts, 234,000 opportunities, 56,700 products",
              "3 carriers with heterogeneous interfaces: REST (Livreur LTP France + Transport Luxe Europe), ETL (Rapid International Transport)",
              "Data security: read-only OWD, sharing via profile-based sharing rules",
              "Initial data import without loss or duplicates — parent-child dependency order critical"
            ],
            "title": "Project Challenges"
          },
          {
            "type": "bullets",
            "items": [
              "Complete UML data model diagram (standard objects + 5 custom objects)",
              "Security matrix: profiles, OWD, sharing rules — least-privilege access",
              "Import strategy: Data Loader for FR/EU carriers, Talend ETL for Rapid International",
              "Integration plan: REST webservices for French carriers, ETL connector for international",
              "Automation: Salesforce Flow triggering customer notification on each delivery status change",
              "Complete technical specifications (PDF) — delivered to jury and simulated client"
            ],
            "title": "Architecture & Deliverables"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — Objects, Profiles, OWD, Sharing Rules, Flows",
              "Data Loader — Bulk CSV data import",
              "Talend ETL — Rapid International Transport integration",
              "REST Webservices — FR/EU carrier integration",
              "UML — Data schema modeling",
              "Postman — REST endpoint documentation and testing"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Business analysis",
                "description": "Requirements gathered from Marie and Sébastien, standard and custom Salesforce objects identified"
              },
              {
                "label": "Data model",
                "description": "UML diagram designed — 5 custom objects (Delivery, Carrier, Parcel…) with relations and fields"
              },
              {
                "label": "Security",
                "description": "Access matrix configured — read-only OWD, role-based sharing rules, Sales and Manager profiles"
              },
              {
                "label": "Import strategy",
                "description": "Import order defined respecting parent-child dependencies: Accounts → Contacts → Products → Opportunities"
              },
              {
                "label": "Integration plan",
                "description": "Architecture of the 3 carrier connectors — REST (2 FR carriers), Talend ETL (international)"
              },
              {
                "label": "Automation",
                "description": "Customer notification Flow triggered on delivery status change — no Apex code required"
              },
              {
                "label": "Defense",
                "description": "Presentation to jury with model demonstration and architecture choices — skills fully validated"
              }
            ],
            "title": "Project Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Production data volume",
                "label": "Accounts to manage",
                "value": "2.1M"
              },
              {
                "note": "2 REST + 1 ETL",
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
          }
        ]
      },
      "fr": {
        "title": "Conception CRM de suivi de livraison (LTP)",
        "heroSubtitle": "Conception d'un prototype backend Apex pour LTP (luxe & mode) : modèle de données, sécurité, stratégie d'import.",
        "sections": [
          {
            "body": "Le Temps des Papillons (LTP), leader français des maisons de couture et robes de mariée, avait besoin d'un CRM Salesforce pour gérer 2 millions de comptes et intégrer 3 transporteurs aux interfaces distinctes. Marie Dupont (suivi des livraisons) et Sébastien Nozerac (équipe commerciale) portaient le projet côté client. La mission : concevoir l'architecture complète — modèle de données UML, sécurité, stratégie d'import et plan d'intégration — avant tout développement.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Volumétrie massive : 2 123 000 comptes, 3 239 870 contacts, 234 000 opportunités, 56 700 produits",
              "3 transporteurs avec interfaces hétérogènes : REST (Livreur LTP France + Transport Luxe Europe), ETL (Rapid International Transport)",
              "Sécurité des données : OWD lecture seule, partage par règles de partage configurées par profil",
              "Import des données initiales sans perte ni doublon — ordre des dépendances parent-enfant critique"
            ],
            "title": "Enjeux du projet"
          },
          {
            "type": "bullets",
            "items": [
              "Diagramme UML complet du modèle de données (objets standard + 5 objets custom)",
              "Matrice de sécurité : profils, OWD, règles de partage — accès least-privilege",
              "Stratégie d'import : Data Loader pour les 2 transporteurs FR/EU, ETL Talend pour Rapid International",
              "Plan d'intégration : webservices REST pour les transporteurs français, connecteur ETL pour l'international",
              "Automatisation : Flow Salesforce déclenchant une notification client à chaque changement de statut de livraison",
              "Spécifications techniques complètes (PDF) — livrées au jury et au client simulé"
            ],
            "title": "Architecture & Livrables"
          },
          {
            "type": "bullets",
            "items": [
              "Salesforce — Objects, Profiles, OWD, Sharing Rules, Flows",
              "Data Loader — Import massif de données CSV",
              "Talend ETL — Intégration Rapid International Transport",
              "Webservices REST — Intégration transporteurs FR/EU",
              "UML — Modélisation du schéma de données",
              "Postman — Documentation et test des endpoints REST"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Analyse métier",
                "description": "Recueil des besoins de Marie et Sébastien, identification des objets Salesforce standard et custom nécessaires"
              },
              {
                "label": "Modèle de données",
                "description": "Conception du diagramme UML : 5 objets custom (Livraison, Transporteur, Colis...) avec relations et champs"
              },
              {
                "label": "Sécurité",
                "description": "Configuration de la matrice d'accès : OWD lecture seule, règles de partage par rôle, profils Commercial et Manager"
              },
              {
                "label": "Stratégie d'import",
                "description": "Définition de l'ordre d'import respectant les dépendances parent-enfant : Accounts → Contacts → Products → Opportunities"
              },
              {
                "label": "Plan d'intégration",
                "description": "Architecture des 3 connecteurs transporteurs : REST (2 transporteurs FR), ETL Talend (international)"
              },
              {
                "label": "Automatisation",
                "description": "Flow de notification client déclenché sur changement de statut de livraison — sans code Apex"
              },
              {
                "label": "Soutenance",
                "description": "Présentation au jury avec démonstration du modèle et des choix d'architecture — compétences validées"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Volumétrie de production",
                "label": "Comptes à gérer",
                "value": "2,1M"
              },
              {
                "note": "2 REST + 1 ETL",
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
          }
        ]
      },
      "es": {
        "title": "Delivery tracking CRM design (LTP)",
        "heroSubtitle": "CRM Salesforce de seguimiento de entregas — diseño y entregables (LTP)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "Le Temps des Papillons (LTP) es un grupo francés (lujo / moda / belleza). Los comerciales necesitan un CRM fluido para gestionar el ciclo Lead → Cuenta/Contacto/Oportunidad, y luego crear entregas.",
              "Los agentes de soporte reciben ~194 llamadas/día de clientes que quieren conocer el estado de su entrega, pero los datos están repartidos entre 3 transportistas (Francia, Europa, Internacional).",
              "El objetivo del proyecto: producir un diseño técnico completo de la aplicación Salesforce (especificaciones, modelo de datos, seguridad, estrategia de importación e integración)."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Acceder rápidamente a la ficha del cliente desde un número de pedido, el nombre o el email.",
              "Automatizar el seguimiento de entregas e informar automáticamente a los clientes de los cambios de estado.",
              "Diseñar un modelo de datos claro (objetos estándar + personalizados) para las entregas y el tracking.",
              "Definir un modelo de seguridad (perfiles / roles / reglas de colaboración) adaptado a los usos de Comercial vs Soporte.",
              "Preparar una estrategia de importación inicial realista y compatible con un alto volumen de datos."
            ],
            "title": "Necesidades clave"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Especificaciones técnicas",
                "description": "Definición del alcance, lista de objetos (estándar + personalizados), procesos clave e interfaces de integración por transportista."
              },
              {
                "title": "Diagrama UML (modelo de datos)",
                "description": "Formalización de entidades y relaciones para dar soporte a Oportunidades, Pedidos/Entregas, Transportistas y estados de tracking."
              },
              {
                "title": "Seguridad y visibilidad",
                "description": "Perfiles + roles, permisos de acceso por objeto y reglas de colaboración (quién ve qué) para los equipos comerciales y de soporte."
              },
              {
                "title": "Estrategia de importación / migración",
                "description": "Plan de carga (Data Loader / ETL), External IDs, orden de dependencias y validaciones para conjuntos de datos voluminosos."
              }
            ],
            "title": "Enfoque de entrega"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Francia / Europa / Internacional",
                "label": "Transportistas",
                "value": "3"
              },
              {
                "note": "Solicitudes de seguimiento de entrega",
                "label": "Soporte",
                "value": "≈194 llamadas/día"
              },
              {
                "note": "Volumetría inicial",
                "label": "Cuentas",
                "value": "2.123.000"
              },
              {
                "note": "Volumetría inicial",
                "label": "Contactos",
                "value": "3.239.870"
              }
            ],
            "title": "Cifras clave (alcance)"
          },
          {
            "type": "text",
            "title": "Evaluación y comentarios",
            "paragraphs": [
              "⚠️ Nota: el documento proporcionado contiene dos bloques de evaluación distintos (uno indicando las competencias validadas, el otro listando puntos a corregir). Para evitar cualquier interpretación errónea, destaco a continuación los comentarios accionables.",
              "Puntos de mejora mencionados: (1) orden de dependencias en la importación (ej. Productos antes que PricebookEntry), (2) respetar el punto de partida «Público de solo lectura» cuando se solicita explícitamente, (3) integración SFTP: preferir un ETL en lugar de un Batch Apex."
            ]
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
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/requirements.pdf",
                "label": "Requisitos (PDF)"
              },
              {
                "href": "/docs/projects/ltp-apex-backend-prototype/brief.docx",
                "label": "Escenario del proyecto (DOCX)"
              }
            ],
            "title": "Entregables y evidencias"
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
            "body": "FASHA, a multinational clothing distribution company (present in 60 countries), used Salesforce to manage accounts, orders and revenue calculations. Three critical issues affected CRM reliability: abnormally slow revenue update batches, deadlocks during simultaneous modifications on Account and Order objects, and disorganized code with no naming conventions. Mission via SFQUAL consulting: audit, optimize and refactor the entire Apex backend.",
            "type": "text",
            "title": "Context"
          },
          {
            "type": "bullets",
            "items": [
              "Weekly revenue update batches: abnormally high execution time after price changes",
              "Deadlocks during simultaneous modifications on Account and Order — intermittent data loss",
              "SOQL and DML inside FOR loops: N+1 queries, Salesforce governor limits at risk",
              "Code with no separation of concerns: triggers with inline business logic, overly long classes",
              "No unit tests — no guarantee of non-regression during future evolutions"
            ],
            "title": "Problems Identified"
          },
          {
            "type": "bullets",
            "items": [
              "Extracted all SOQL queries out of loops — collections used for bulk operations",
              "Removed all DML inside loops: upsert/update lists processed in a single operation",
              "Handler pattern applied: triggers emptied of logic, delegated to dedicated service classes",
              "Batch Apex refactored with filtered SOQL queries and bulk-safe processing",
              "Unit test suite covering nominal, boundary and error scenarios for each method — 0 SOQL/DML in loops confirmed"
            ],
            "title": "Optimizations Made"
          },
          {
            "type": "bullets",
            "items": [
              "Apex Triggers — Handler pattern, logic/presentation separation",
              "Batch Apex — Bulk processing of revenue updates",
              "SOQL — Query optimization (collections, filters, one-shot)",
              "Apex Test Framework — Unit tests with @isTest and assertions",
              "Salesforce DX — Deployment and versioning"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Code audit",
                "description": "Analysis of existing code — SOQL/DML in loops, inline trigger logic and untested classes mapped"
              },
              {
                "label": "Trigger refactoring",
                "description": "All trigger logic extracted to dedicated handler classes — clean, testable architecture"
              },
              {
                "label": "SOQL/DML optimization",
                "description": "All queries moved out of loops, collection-based processing, dramatic reduction of consumed governor limits"
              },
              {
                "label": "Batch Apex",
                "description": "Revenue update batch refactored: filtered queries, bulk-safe processing, corrected net calculation"
              },
              {
                "label": "Unit tests",
                "description": "Tests written for each method (3 scenarios: nominal, boundary, error) — coverage validated, 0 regression"
              },
              {
                "label": "Defense",
                "description": "Audit and corrections presented — jury: Félicitations! Corrections complètes et bien justifiées"
              }
            ],
            "title": "Project Timeline"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "After full refactoring",
                "label": "SOQL in loops",
                "value": "0"
              },
              {
                "note": "All operations externalized",
                "label": "DML in loops",
                "value": "0"
              },
              {
                "note": "OpenClassrooms jury",
                "label": "Skills validated",
                "value": "2/2"
              },
              {
                "note": "Special mention",
                "label": "Jury assessment",
                "value": "Félicitations!"
              }
            ],
            "title": "Results"
          }
        ]
      },
      "fr": {
        "title": "Optimisation du backend Apex (FASHA)",
        "heroSubtitle": "Optimisation du backend Apex de FASHA : refactoring, suppression des DML en boucle et amélioration des batchs.",
        "sections": [
          {
            "body": "FASHA, multinationale de distribution de vêtements (présente dans 60 pays), utilisait Salesforce pour gérer ses comptes, commandes et calculs de chiffre d'affaires. Trois problèmes critiques affectaient la fiabilité du CRM : des batchs de mise à jour du CA anormalement lents, des blocages lors de modifications simultanées sur Account et Order, et un code désorganisé sans conventions. Mission via le cabinet SFQUAL : auditer, optimiser et refactoriser le backend Apex.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "type": "bullets",
            "items": [
              "Batchs de mise à jour du CA hebdomadaire : temps d'exécution anormalement élevé après changements de prix",
              "Deadlocks lors de modifications simultanées sur Account et Order — pertes de données intermittentes",
              "SOQL et DML dans les boucles FOR : N+1 queries, risques de governor limits Salesforce",
              "Code sans séparation des responsabilités : triggers avec logique métier inline, classes trop longues",
              "Absence de tests unitaires — aucune garantie de non-régression lors des évolutions"
            ],
            "title": "Problèmes identifiés"
          },
          {
            "type": "bullets",
            "items": [
              "Extraction de toutes les requêtes SOQL hors boucles — collections utilisées pour les opérations en masse",
              "Suppression de tous les DML dans les boucles : listes d'upsert/update traitées en une seule opération",
              "Handler pattern : triggers vidés de leur logique, déléguée à des classes de service dédiées",
              "Batch Apex refactorisé avec requêtes SOQL filtrées et traitement bulk-safe",
              "Suite de tests unitaires couvrant nominal, limite et erreur pour chaque méthode — 0 SOQL/DML dans les boucles confirmé"
            ],
            "title": "Optimisations réalisées"
          },
          {
            "type": "bullets",
            "items": [
              "Apex Triggers — Handler pattern, séparation logique/présentation",
              "Batch Apex — Traitement masse des mises à jour CA",
              "SOQL — Optimisation des requêtes (collections, filtres, one-shot)",
              "Test Framework Apex — Tests unitaires avec @isTest et assertions",
              "Salesforce DX — Déploiement et versionning"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Audit du code",
                "description": "Analyse du code existant : identification des SOQL/DML dans les boucles, des triggers avec logique inline et des classes sans tests"
              },
              {
                "label": "Refactoring Triggers",
                "description": "Extraction de toute la logique des triggers vers des classes handler dédiées — architecture propre et testable"
              },
              {
                "label": "Optimisation SOQL/DML",
                "description": "Déplacement de toutes les requêtes hors boucles, traitement par collections, réduction drastique des governor limits consommées"
              },
              {
                "label": "Batch Apex",
                "description": "Refactorisation du batch de mise à jour du CA : requêtes filtrées, traitement bulk-safe, correction du calcul net"
              },
              {
                "label": "Tests unitaires",
                "description": "Rédaction des tests pour chaque méthode (3 scénarios : nominal, limite, erreur) — couverture validée, 0 régression"
              },
              {
                "label": "Soutenance",
                "description": "Présentation de l'audit et des corrections — jury : Félicitations ! Corrections complètes et bien justifiées"
              }
            ],
            "title": "Déroulement du projet"
          },
          {
            "type": "metrics",
            "items": [
              {
                "note": "Après refactoring complet",
                "label": "SOQL dans boucles",
                "value": "0"
              },
              {
                "note": "Toutes les opérations externalisées",
                "label": "DML dans boucles",
                "value": "0"
              },
              {
                "note": "Jury OpenClassrooms",
                "label": "Compétences validées",
                "value": "2/2"
              },
              {
                "note": "Mention spéciale",
                "label": "Évaluation jury",
                "value": "Félicitations !"
              }
            ],
            "title": "Résultats"
          }
        ]
      },
      "es": {
        "title": "Apex backend optimization (FASHA)",
        "heroSubtitle": "Optimización de backend Apex (FASHA)",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "FASHA (distribución de ropa) presentaba problemas de rendimiento y fiabilidad en el backend de Salesforce.",
              "Los batches semanales se volvían demasiado lentos tras las actualizaciones de precios de productos, la aplicación se bloqueaba al editar simultáneamente Cuentas y Pedidos, y el código estaba poco estructurado (naming, clases demasiado largas)."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Optimizar los batches que recalculan la facturación de las cuentas tras cambios de precio de los productos.",
              "Evitar comportamientos bloqueantes durante ediciones concurrentes en Cuentas y Pedidos.",
              "Reorganizar el código Apex para mejorar la mantenibilidad (responsabilidades claras, convenciones de nombres)."
            ],
            "title": "Necesidades del cliente"
          },
          {
            "type": "bullets",
            "items": [
              "Refactorización en arquitectura trigger → handler/servicios: triggers «ligeros», DML/SOQL trasladados a clases dedicadas (bulk-safe).",
              "Bulkificación de los cálculos (facturación / importe neto) mediante colecciones y maps; consolidación de consultas; eliminación de todo SOQL/DML en bucles.",
              "Optimización de las consultas sobre pedidos (filtros selectivos) y refuerzo del batch para procesar mayores volúmenes sin timeout."
            ],
            "title": "Implementación"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Competencias validadas (jurado)",
                "value": "2/2"
              },
              {
                "label": "SOQL/DML en bucles",
                "value": "0"
              },
              {
                "label": "Cobertura de pruebas",
                "value": "Buena (feedback del jurado)"
              }
            ],
            "title": "Calidad y evidencias"
          },
          {
            "type": "text",
            "title": "Comentarios de la evaluación",
            "paragraphs": [
              "El jurado destaca: triggers sin operaciones de BD/DML (trasladadas a clases separadas), código bien testeado con buena cobertura, cálculos de facturación/importe neto correctos, batch + controlador funcionales, consultas SOQL optimizadas con filtro y capacidad de procesar varias líneas de pedido."
            ]
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/fasha-apex-backend-optimization/brief.docx",
                "label": "Brief del proyecto (DOCX)"
              },
              {
                "href": "/docs/projects/fasha-apex-backend-optimization/note-de-cadrage.pdf",
                "label": "Nota de encuadre (PDF)"
              },
              {
                "href": "/docs/projects/fasha-apex-backend-optimization/repository.txt",
                "label": "Enlace del repositorio (TXT)"
              }
            ],
            "title": "Entregables y evidencias"
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
            "body": "LEGARANT, a life insurance company founded in 1980 in Nantes, acquired AXG in Germany. Integrating both CRMs required one-way synchronization of AXG data to Salesforce France, REST APIs documented via Postman, and deployment of a mobile application via Heroku Connect. Mission: design and deploy the complete technical architecture following Salesforce best practices.",
            "type": "text",
            "title": "Context"
          },
          {
            "body": "This project is the clearest evidence that my Salesforce and infrastructure skills aren't two separate résumés: I built the Apex REST layer AND the Heroku app that runs beside it, then wrote the deployment runbook a real ops handoff needs. It's also the first step toward a deeper crossover already scoped next — a real-time Heroku↔Salesforce sync via Platform Events and OAuth 2.0 JWT Bearer Flow.",
            "type": "text",
            "title": "The hybrid-skill proof point"
          },
          {
            "type": "bullets",
            "items": [
              "One-way AXG → Salesforce sync without creating duplicates (idempotency required)",
              "DELETE on contact = deactivation, not physical deletion (insurance industry business rule)",
              "Unique External ID to guarantee AXG ↔ Salesforce record matching",
              "Heroku ↔ Salesforce bidirectional connector for the Heroku mobile application"
            ],
            "title": "Technical Challenges"
          },
          {
            "type": "bullets",
            "items": [
              "Custom Apex REST controller: contact creation with email verification before insertion",
              "Apex DELETE endpoint: contact deactivation (IsActive = false) instead of physical deletion",
              "Apex Trigger for automatic External ID population — uniqueness guaranteed on creation",
              "Heroku Connect configured for bidirectional sync: Heroku PostgreSQL ↔ Salesforce",
              "Complete Postman collection: GET, POST, PATCH, DELETE — all endpoints tested and documented",
              "Deployment document: delivered components, manual steps, installation order"
            ],
            "title": "Solutions Developed"
          },
          {
            "type": "bullets",
            "items": [
              "Apex REST (@RestResource) — Custom endpoints exposed over HTTPS",
              "Postman — Complete REST API calls collection",
              "Heroku Connect — PostgreSQL ↔ Salesforce synchronization",
              "Apex Trigger — Automatic External ID population",
              "Salesforce DX — Metadata deployment",
              "JSON — REST API data exchange format"
            ],
            "title": "Stack & Technologies"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "label": "Architecture",
                "description": "Integration schema defined — AXG→Salesforce flow, required endpoints, External ID strategy"
              },
              {
                "label": "REST API (Postman)",
                "description": "4 standard endpoints implemented (GET/POST/PATCH/DELETE) on Salesforce objects, tested via Postman"
              },
              {
                "label": "Apex controller",
                "description": "Custom Apex REST endpoint built — contact creation with email check + deactivation on DELETE"
              },
              {
                "label": "External ID",
                "description": "Apex Trigger auto-populating External ID on contact creation — uniqueness guaranteed"
              },
              {
                "label": "Heroku Connect",
                "description": "Bidirectional Heroku PostgreSQL ↔ Salesforce sync configured for the mobile application"
              },
              {
                "label": "Documentation",
                "description": "Complete deployment document written — delivered components, manual steps, installation order"
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
                "note": "GET, POST, PATCH, DELETE",
                "label": "API endpoints",
                "value": "4"
              },
              {
                "note": "Heroku ↔ Salesforce",
                "label": "Synchronization",
                "value": "Bidirectional"
              },
              {
                "note": "Clean architecture, well documented",
                "label": "Jury assessment",
                "value": "Félicitations!"
              }
            ],
            "title": "Results"
          },
          {
            "type": "bullets",
            "items": [
              "Heroku over Azure: the Azure free-tier limits (see PDF) didn't cover the need, and Heroku Connect gave a native Salesforce sync without hand-rolling an ETL layer.",
              "OAuth Username-Password Flow over JWT Bearer: faster to stand up for this server-to-server flow, at the cost of a stored client secret (in Heroku config vars) instead of a certificate — the deliberate first step before the JWT Bearer migration already scoped next.",
              "External ID + Apex Trigger for uniqueness, not Heroku Connect dedup: keeps the source of truth for identity matching inside Salesforce, so it survives a future replacement of the sync layer.",
              "DELETE = deactivation, not physical delete: driven by the insurance industry's data retention rules, not a technical default."
            ],
            "title": "Decisions & trade-offs"
          },
          {
            "type": "bullets",
            "items": [
              "Auth: OAuth 2.0 (Username-Password Flow), short-lived tokens, no credentials in code — stored as Heroku config vars.",
              "Apex REST endpoints are HTTPS-only and require a valid Salesforce token; no anonymous access.",
              "Assumed limit: no conflict resolution — accepted because the sync is one-way (AXG to Salesforce), not because it was solved.",
              "Assumed limit: no documented retry/backoff on Heroku Connect calls — a real scale-up would need a queue or retry mechanism.",
              "Data flow: AXG (Germany) contact data moves into the Salesforce France org — intra-EU only, access restricted by permission sets rather than by geography.",
              "Next step already scoped: migrate to OAuth 2.0 JWT Bearer Flow (certificate instead of a stored password) — the exact starting point for the deeper Heroku-Salesforce crossover project."
            ],
            "title": "Security & limits"
          }
        ]
      },
      "fr": {
        "title": "Déploiement Salesforce avec Heroku (Légarant‑AXG)",
        "heroSubtitle": "Déploiement et intégration Salesforce pour LEGARANT-AXG : API REST, synchronisation Heroku et mise en production.",
        "sections": [
          {
            "body": "LEGARANT, société d'assurance vie fondée en 1980 à Nantes, a racheté AXG en Allemagne. L'intégration des deux CRM nécessitait une synchronisation des données AXG vers Salesforce France (sens unique), des APIs REST documentées via Postman, et un déploiement d'une application mobile via Heroku Connect. Mission : concevoir et déployer l'architecture technique complète en respectant les bonnes pratiques Salesforce.",
            "type": "text",
            "title": "Contexte"
          },
          {
            "body": "Ce projet est la preuve la plus claire que mes compétences Salesforce et infrastructure ne sont pas deux CV séparés : j'ai construit la couche Apex REST ET l'application Heroku qui l'accompagne, puis rédigé le runbook de déploiement qu'exige une vraie passation ops. C'est aussi la première marche vers un projet de croisement plus poussé déjà cadré — une synchronisation temps réel Heroku↔Salesforce via Platform Events et OAuth 2.0 JWT Bearer Flow.",
            "type": "text",
            "title": "La preuve du croisement de compétences"
          },
          {
            "type": "bullets",
            "items": [
              "Synchronisation unidirectionnelle AXG → Salesforce sans création de doublons (idempotence)",
              "DELETE sur contact = désactivation et non suppression physique (règle métier Assurance)",
              "External ID unique pour garantir la correspondance AXG ↔ Salesforce",
              "Connecteur Heroku ↔ Salesforce bidirectionnel pour l'application mobile Heroku"
            ],
            "title": "Défis techniques"
          },
          {
            "type": "bullets",
            "items": [
              "Contrôleur REST Apex custom : création de contact avec vérification email préalable avant insertion",
              "Endpoint DELETE Apex : désactivation du contact (IsActive = false) au lieu de suppression physique",
              "Trigger Apex pour le remplissage automatique de l'External ID — garantit l'unicité à la création",
              "Heroku Connect configuré pour la synchronisation bidirectionnelle Heroku PostgreSQL ↔ Salesforce",
              "Collection Postman complète : GET, POST, PATCH, DELETE — tous les endpoints testés et documentés",
              "Document de déploiement : composants, étapes manuelles, ordre d'installation"
            ],
            "title": "Solutions développées"
          },
          {
            "type": "bullets",
            "items": [
              "Apex REST (@RestResource) — Endpoints custom exposés en HTTPS",
              "Postman — Collection complète des appels API REST",
              "Heroku Connect — Synchronisation PostgreSQL ↔ Salesforce",
              "Apex Trigger — Remplissage automatique External ID",
              "Salesforce DX — Déploiement des métadonnées",
              "JSON — Format d'échange des APIs REST"
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
                "description": "Implémentation des 4 endpoints standard (GET/POST/PATCH/DELETE) sur les objets Salesforce via Postman"
              },
              {
                "label": "Contrôleur Apex",
                "description": "Développement du endpoint REST Apex custom : création de contact avec vérification email + désactivation sur DELETE"
              },
              {
                "label": "External ID",
                "description": "Trigger Apex pour le remplissage automatique de l'External ID à la création du contact — garantie d'unicité"
              },
              {
                "label": "Heroku Connect",
                "description": "Configuration de la synchronisation bidirectionnelle Heroku PostgreSQL ↔ Salesforce pour l'application mobile"
              },
              {
                "label": "Documentation",
                "description": "Rédaction du document de déploiement complet : composants livrés, actions manuelles, ordre d'installation"
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
              "OAuth Username-Password Flow plutôt que JWT Bearer : plus rapide à mettre en place pour ce flux serveur-à-serveur, au prix d'un secret client stocké (variables de config Heroku) plutôt qu'un certificat — le premier palier assumé avant la migration JWT Bearer déjà cadrée.",
              "External ID + Trigger Apex pour l'unicité, plutôt qu'une déduplication côté Heroku Connect : la source de vérité de l'identité reste dans Salesforce, ce qui survit à un futur remplacement de la couche de synchronisation.",
              "DELETE = désactivation et non suppression physique : imposé par les règles de conservation des données du secteur assurance, pas un choix technique par défaut."
            ],
            "title": "Décisions & compromis"
          },
          {
            "type": "bullets",
            "items": [
              "Authentification : OAuth 2.0 (Username-Password Flow), tokens à durée de vie limitée, aucun identifiant en clair dans le code — stockés en variables de config Heroku.",
              "Endpoints Apex REST exposés uniquement en HTTPS, accessibles uniquement avec un token Salesforce valide — pas d'accès anonyme.",
              "Limite assumée : pas de résolution de conflit — acceptable car la synchronisation est unidirectionnelle (AXG vers Salesforce), pas un problème résolu par du code.",
              "Limite assumée : pas de retry/backoff documenté sur les appels Heroku Connect — un passage à l'échelle réel demanderait une file d'attente ou un mécanisme de nouvelle tentative.",
              "Flux de données : les données de contact AXG (Allemagne) rejoignent l'org Salesforce France — flux intra-UE, accès restreint par permission sets plutôt que par la géographie.",
              "Prochaine étape déjà cadrée : migration vers OAuth 2.0 JWT Bearer Flow (certificat plutôt que mot de passe stocké) — le point de départ exact du projet de croisement Heroku-Salesforce plus poussé."
            ],
            "title": "Sécurité & limites"
          }
        ]
      },
      "es": {
        "title": "Salesforce deployment with Heroku (Legarant‑AXG)",
        "heroSubtitle": "Integrar AXG en Salesforce (Legarant) y entregar una capa de integración lista para una app móvil (REST + Heroku).",
        "sections": [
          {
            "type": "text",
            "title": "Contexto",
            "paragraphs": [
              "LEGARANT (seguro de vida) adquirió AXG para expandirse en Alemania. El objetivo era mantener la org de Salesforce de Legarant como CRM principal e integrar en ella los datos clave de AXG.",
              "La integración es unidireccional (AXG → Salesforce). Como se preveía una app móvil, también se necesitaba una capa aplicativa (tipo Heroku) conectada a Salesforce, y llamadas REST para consultar la base de clientes."
            ]
          },
          {
            "type": "text",
            "title": "La prueba del cruce de competencias",
            "paragraphs": [
              "Este proyecto es la prueba más clara de que mis competencias en Salesforce e infraestructura no son dos currículums separados: construí la capa Apex REST Y la aplicación Heroku que la acompaña, y redacté el runbook de despliegue que exige un traspaso operativo real.",
              "También es el primer paso hacia un proyecto de cruce más avanzado ya definido — una sincronización en tiempo real Heroku↔Salesforce mediante Platform Events y OAuth 2.0 JWT Bearer Flow."
            ]
          },
          {
            "type": "bullets",
            "items": [
              "Una colección Postman que cubre las llamadas REST solicitadas (API estándar + endpoints personalizados cuando fue necesario).",
              "Controladores REST Apex personalizados para implementar reglas de negocio no cubiertas por la API estándar de Contact (crear o devolver el Id, borrado lógico vía DELETE).",
              "Una aplicación desplegada en Heroku y conectada a Salesforce, con replicación de datos y documentación de los cambios de configuración.",
              "Un paquete de despliegue + runbook: lista de componentes, acciones manuales y checklist de validación (test y producción)."
            ],
            "title": "Lo que entregué"
          },
          {
            "type": "bullets",
            "items": [
              "POST /services/oauth2/token — Token OAuth (Password Flow / client credentials).",
              "POST /services/apexrest/v1/contacts — Creación de Contact (crear o devolver según la especificación).",
              "GET /services/apexrest/v1/contacts/{idOrExt} — Lectura de Contact por Id o External Id.",
              "PATCH /services/apexrest/v1/contacts/{externalId} — Actualización de Contact por External Id.",
              "PATCH /services/apexrest/v1/contacts/{id} — Desactivación de Contact (borrado lógico).",
              "POST /services/apexrest/v1/accounts — Creación de Account.",
              "GET /services/apexrest/v1/accounts/{idOrExt} — Lectura de Account por Id o External Id.",
              "PATCH /services/apexrest/v1/accounts/{externalId} — Actualización de Account por External Id.",
              "POST /services/apexrest/v1/contracts — Creación de Contract.",
              "GET /services/apexrest/v1/contracts/{idOrExt} — Lectura de Contract por Id o External Id.",
              "PATCH /services/apexrest/v1/contracts/{externalId} — Actualización de Contract por External Id."
            ],
            "title": "Endpoints REST cubiertos"
          },
          {
            "code": "POST <instance_url>/services/apexrest/v1/contacts\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n  Cuerpo (JSON): campos LastName, city, Email\n  Ejemplo:\n    {\n      \"LastName\": \"axG -tests Contact Test\",\n      \"city\" : \"Berlin\",\n      \"Email\": \"test.Contact@example.com\"\n    }\n\nGET <instance_url>/services/apexrest/v1/contacts/{{idOrExt}}\n  Parámetros de ruta: idOrExt\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n\nPATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactExt}}\n  Parámetros de ruta: lastContactExt\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n  Cuerpo (JSON): campo MobilePhone\n  Ejemplo:\n    {\n      \"MobilePhone\": \"+491111\"\n    }\n\nPATCH <instance_url>/services/apexrest/v1/contacts/{{lastContactId}}\n  Parámetros de ruta: lastContactId\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n  Cuerpo (JSON): campo Active\n  Ejemplo:\n    {\n      \"Active\": \"false\"\n    }\n\nPOST <instance_url>/services/apexrest/v1/accounts\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n  Cuerpo (JSON): campos Name, Phone\n  Ejemplo:\n    {\n      \"Name\": \"AXG GmbH\",\n      \"Phone\": \"12345\"\n    }\n\nGET <instance_url>/services/apexrest/v1/accounts/{{idOrExt}}\n  Parámetros de ruta: idOrExt\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n\nPATCH <instance_url>/services/apexrest/v1/accounts/{{lastAccountExt}}\n  Parámetros de ruta: lastAccountExt\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n  Cuerpo (JSON): campo Website\n  Ejemplo:\n    {\n      \"Website\": \"https://axg.de\"\n    }\n\nPOST <instance_url>/services/apexrest/v1/contracts\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n  Cuerpo (JSON): campos AccountId, Status, StartDate, ContractTerm\n  Ejemplo:\n    {\n      \"AccountId\": \"<axgAccountId>\",\n      \"Status\": \"Draft\",\n      \"StartDate\": \"2025-01-01\",\n      \"ContractTerm\": 12\n    }\n\nGET <instance_url>/services/apexrest/v1/contracts/{{idOrExt}}\n  Parámetros de ruta: idOrExt\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n\nPATCH <instance_url>/services/apexrest/v1/contracts/{{lastContractExt}}\n  Parámetros de ruta: lastContractExt\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n  Cuerpo (JSON): campo Description\n  Ejemplo:\n    {\n      \"Description\": \"Actualizado\"\n    }\n\nGET <instance_url>/services/data/v59.0/limits\n  Headers:\n    - Authorization: Bearer <access_token>\n    - Content-Type: application/json\n\nPOST <instance_url>/services/oauth2/token\n  Cuerpo (x-www-form-urlencoded): grant_type, client_id, client_secret",
            "type": "code",
            "title": "Parámetros de los endpoints (desde Postman)",
            "language": "text"
          },
          {
            "type": "timeline",
            "steps": [
              {
                "title": "Diseño de la integración",
                "description": "Validación del sentido de los datos (AXG → Salesforce), identificación de los endpoints y elección de la autenticación (Connected App + OAuth username/password flow)."
              },
              {
                "title": "Implementación y pruebas de la API",
                "description": "Construcción y validación de las llamadas en Postman. Se añadió REST Apex personalizado cuando la API estándar no cumplía con la especificación (creación de Contact y comportamiento DELETE)."
              },
              {
                "title": "Capa Heroku para el móvil",
                "description": "Despliegue en Heroku, conexión a Salesforce y verificación de la sincronización bidireccional (Heroku ↔ Salesforce) en los objetos necesarios."
              },
              {
                "title": "Fiabilización de la sincronización",
                "description": "Automatización del llenado del External ID utilizado para la sincronización (trigger) para garantizar la unicidad y evitar errores manuales."
              },
              {
                "title": "Despliegue y documentación",
                "description": "Redacción del documento de despliegue (componentes + acciones manuales) y del documento de cambios de Heroku, seguido de la preparación de la demo."
              }
            ],
            "title": "Flujo de implementación"
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Conformidad de la API",
                "value": "Colección Postman validada según las especificaciones"
              },
              {
                "label": "Reglas de negocio",
                "value": "REST Apex personalizado para los requisitos de create/DELETE"
              },
              {
                "label": "Fiabilidad de la sincronización",
                "value": "External ID autocompletado con unicidad garantizada"
              },
              {
                "label": "Listo para producción",
                "value": "Runbook de despliegue + checklist de validación"
              }
            ],
            "title": "Calidad y garantías"
          },
          {
            "type": "resources",
            "items": [
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/postman-collection.json",
                "label": "Colección Postman (JSON)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/heroku-changes.pdf",
                "label": "Cambios en Heroku (PDF)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/deployment.pdf",
                "label": "Guía de despliegue (PDF)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/requirements.pdf",
                "label": "Requisitos / especificación (PDF)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/brief.docx",
                "label": "Brief del proyecto (DOCX)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/legacy-heroku-guide.pdf",
                "label": "Guía Heroku anterior (PDF)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/azure-free-tier-thresholds.pdf",
                "label": "Umbrales del nivel gratuito de Azure (PDF)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/repository-link.txt",
                "label": "Enlace del repositorio (TXT)"
              },
              {
                "href": "/docs/projects/legarant-axg-salesforce-deployment/sandbox-link.txt",
                "label": "Enlace de staging (TXT)"
              }
            ],
            "title": "Entregables"
          },
          {
            "code": "Repository: https://github.com/Aiyeesha/Projet-12/tree/main\nStaging app: https://legarant-staging-78a7880351d1.herokuapp.com",
            "type": "code",
            "title": "Enlaces (repo + staging)",
            "language": "text"
          },
          {
            "type": "bullets",
            "items": [
              "Heroku en lugar de Azure: los límites del nivel gratuito de Azure (ver PDF) no cubrían la necesidad, y Heroku Connect ofrecía una sincronización nativa con Salesforce sin programar una capa ETL propia.",
              "OAuth Username-Password Flow en lugar de JWT Bearer: más rápido de implementar para este flujo servidor-a-servidor, a costa de un secreto de cliente almacenado (variables de configuración de Heroku) en vez de un certificado — el primer escalón asumido antes de la migración a JWT Bearer ya prevista.",
              "External ID + Trigger Apex para la unicidad, en lugar de la deduplicación de Heroku Connect: la fuente de verdad de la identidad permanece en Salesforce, lo que sobrevive a un futuro reemplazo de la capa de sincronización.",
              "DELETE = desactivación y no borrado físico: exigido por las normas de conservación de datos del sector seguros, no una elección técnica por defecto."
            ],
            "title": "Decisiones y compromisos"
          },
          {
            "type": "bullets",
            "items": [
              "Autenticación: OAuth 2.0 (Username-Password Flow), tokens de vida corta, ninguna credencial en el código — almacenadas como variables de configuración de Heroku.",
              "Los endpoints Apex REST solo son accesibles vía HTTPS y requieren un token de Salesforce válido — sin acceso anónimo.",
              "Límite asumido: sin resolución de conflictos — aceptable porque la sincronización es unidireccional (AXG hacia Salesforce), no un problema resuelto con código.",
              "Límite asumido: sin reintento/backoff documentado en las llamadas de Heroku Connect — un paso a mayor escala real requeriría una cola o un mecanismo de reintento.",
              "Flujo de datos: los datos de contacto de AXG (Alemania) llegan a la org de Salesforce Francia — flujo intra-UE, acceso restringido por permission sets y no por geografía.",
              "Siguiente paso ya previsto: migrar a OAuth 2.0 JWT Bearer Flow (certificado en lugar de contraseña almacenada) — el punto de partida exacto del proyecto de cruce Heroku-Salesforce más avanzado."
            ],
            "title": "Seguridad y límites"
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
