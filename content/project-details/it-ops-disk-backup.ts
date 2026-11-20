// content/project-details/it-ops-disk-backup.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
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
          "body": "As part of a training exercise at Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), I worked on two VMs in VirtualBox: a Windows 10 client VM (partition resize + disk backup with AOMEI tools) and a Windows Server 2012 VM (Windows Server Backup role installation + scheduled daily backup).",
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
          "body": "Dans le cadre d'un exercice de formation au Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), j'ai travaillé sur deux VM VirtualBox : une VM cliente Windows 10 (redimensionnement de partition + sauvegarde avec les outils AOMEI) et une VM serveur Windows Server 2012 (installation du rôle Sauvegarde Windows Server + sauvegarde planifiée quotidienne).",
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
          "title": "Stack et outils"
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
            "Como parte de un ejercicio de formación en el Greta du Val d'Oise (Lycée Louis Jouvet, Taverny), trabajé en dos VM VirtualBox: una VM cliente Windows 10 (redimensionamiento de partición + copia de seguridad con herramientas AOMEI) y una VM servidor Windows Server 2012 (instalación del rol Copia de seguridad de Windows Server + copia programada diaria)."
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
};

export default details;
