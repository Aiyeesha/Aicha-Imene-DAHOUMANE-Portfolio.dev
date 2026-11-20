// content/project-details/hardware-upgrade-hp-laptop.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
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
          "title": "Stack et outils"
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
};

export default details;
