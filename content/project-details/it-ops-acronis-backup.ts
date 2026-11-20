// content/project-details/it-ops-acronis-backup.ts
// Per-locale title, hero subtitle, sections and gallery of one project.
// Assembled in content/projectDetails.ts (see that file for the conventions).

import type { ProjectDetails } from "@/content/projectDetails";

const details: ProjectDetails = {
  "slug": "it-ops-acronis-backup",
  "gallery": [
    {
      "alt": "Acronis Backup — vue 1",
      "src": "/projects/it-ops-acronis-backup/2023-05-16%2015_54_50-.webp"
    },
    {
      "alt": "Acronis Backup — console de gestion, vue 1",
      "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_02_50-SRV-MGT.webp"
    },
    {
      "alt": "Acronis Backup — console de gestion, vue 2",
      "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_03_47-SRV-MGT.webp"
    },
    {
      "alt": "Acronis Backup — console de gestion, vue 3",
      "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_04_30-SRV-MGT.webp"
    },
    {
      "alt": "Acronis Backup — console de gestion, vue 4",
      "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_04_51-SRV-MGT.webp"
    },
    {
      "alt": "Acronis Backup — console de gestion, vue 5",
      "src": "/projects/it-ops-acronis-backup/2023-05-16%2016_05_10-SRV-MGT.webp"
    }
  ],
  "locales": {
    "en": {
      "title": "Cloud Backup Supervision with Acronis Cyber Backup",
      "heroSubtitle": "Triage of 85 backup alerts across 105 protected devices at MIDRANGE Group: root causes (NAS, server, plan, network) and data-loss risk prioritisation.",
      "sections": [
        {
          "type": "text",
          "title": "Context",
          "paragraphs": [
            "At MIDRANGE Group (a French IT services / MSP firm), within the Operations team alongside the team's systems & network administrator, I owned the daily monitoring of cloud and local backups for a managed client. The backup infrastructure relied on two distinct Acronis products: Acronis Cyber Backup (local/NAS backup solution) and Acronis Cyber Protect Cloud (MSP-oriented cloud backup platform). My mandate: check the Acronis dashboard daily, triage active alerts, and restore backup continuity on every failure detected."
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
              "value": "smb://nas-client/backups — 8.77 Tio / 10.5 Tio"
            },
            {
              "label": "NAS destination 2",
              "value": "smb://nas-client/backups-new — 9.57 Tio / 10.5 Tio"
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
              "value": "6 (UPS-01, VMware vCenter Server, ACRONIS, SRV-MAIL-01)"
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
            "The client had 5 active backup plans configured in Acronis Cyber Backup: 'Toutes les VM' (all VMs — 16 devices including SRV-RDS-01, SRV-DB-01, SRV-PRINT-01 and 13 others — scheduled Mon–Sat at 23:00, destination: smb backups-new, retention: 2 months monthly / 4 weeks weekly / 6 days daily); 'TMP-BDD' (1 device); 'SQL-CLOUD 2' (86 devices, Mon–Fri at 23:00); 'SQL-CLOUD' (86 devices); 'Bases_Exchange' (2 devices, daily at 03:00)."
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
              "label": "SRV-RDS-01 warning",
              "value": "VM backup succeeded with warning: CBT disabled — backup ran without Changed Block Tracking (VMware snapshots present)"
            },
            {
              "label": "SRV-DB-01 error",
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
      "heroSubtitle": "Triage de 85 alertes de sauvegarde sur 105 postes protégés chez MIDRANGE Group : causes racines (NAS, serveur, plan, réseau) et priorisation du risque de perte de données.",
      "sections": [
        {
          "type": "text",
          "title": "Contexte",
          "paragraphs": [
            "Chez MIDRANGE Group (ESN/MSP), au sein de l'équipe Exploitation aux côtés de l'administrateur systèmes & réseaux de l'équipe, j'assurais la supervision quotidienne des sauvegardes cloud et locales pour un client géré. L'infrastructure de sauvegarde reposait sur deux produits Acronis distincts : Acronis Cyber Backup (solution de sauvegarde locale/NAS) et Acronis Cyber Protect Cloud (plateforme de sauvegarde cloud orientée MSP). Ma mission : contrôler quotidiennement le tableau de bord Acronis, trier les alertes actives et rétablir la continuité de sauvegarde à chaque échec détecté."
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
              "value": "smb://nas-client/backups — 8,77 Tio / 10,5 Tio"
            },
            {
              "label": "Destination NAS 2",
              "value": "smb://nas-client/backups-new — 9,57 Tio / 10,5 Tio"
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
              "value": "6 (UPS-01, VMware vCenter Server, ACRONIS, SRV-MAIL-01)"
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
            "Le client disposait de 5 plans de sauvegarde actifs dans Acronis Cyber Backup : 'Toutes les VM' (16 appareils dont SRV-RDS-01, SRV-DB-01, SRV-PRINT-01 et 13 autres — planification Lun–Sam à 23h00, destination : smb backups-new, conservation : 2 mois mensuel / 4 semaines hebdo / 6 jours quotidien) ; 'TMP-BDD' (1 appareil) ; 'SQL-CLOUD 2' (86 appareils, Lun–Ven à 23h00) ; 'SQL-CLOUD' (86 appareils) ; 'Bases_Exchange' (2 appareils, tous les jours à 03h00)."
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
              "label": "Avertissement SRV-RDS-01",
              "value": "Sauvegarde VM réussie avec avertissement : CBT désactivé — sauvegarde exécutée sans Changed Block Tracking (snapshots VMware présents)"
            },
            {
              "label": "Erreur SRV-DB-01",
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
      "heroSubtitle": "Triaje de 85 alertas de copia de seguridad en 105 equipos protegidos en MIDRANGE Group: causas raíz (NAS, servidor, plan, red) y priorización del riesgo de pérdida de datos.",
      "sections": [
        {
          "type": "text",
          "title": "Contexto",
          "paragraphs": [
            "En MIDRANGE Group (ESN/MSP francesa), dentro del equipo de Operaciones junto al administrador de sistemas y redes del equipo, me encargué de la supervisión diaria de las copias de seguridad en la nube y locales de un cliente gestionado. La infraestructura de backup se apoyaba en dos productos Acronis distintos: Acronis Cyber Backup (solución de backup local/NAS) y Acronis Cyber Protect Cloud (plataforma de backup en la nube orientada a MSP). Mi misión: revisar a diario el panel de Acronis, triar las alertas activas y restablecer la continuidad de las copias de seguridad ante cada fallo detectado."
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
              "value": "smb://nas-client/backups — 8,77 Tio / 10,5 Tio"
            },
            {
              "label": "Destino NAS 2",
              "value": "smb://nas-client/backups-new — 9,57 Tio / 10,5 Tio"
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
              "value": "6 (UPS-01, VMware vCenter Server, ACRONIS, SRV-MAIL-01)"
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
            "El cliente disponía de 5 planes de backup activos configurados en Acronis Cyber Backup: ‘Toutes les VM’ (todas las VM — 16 dispositivos incluyendo SRV-RDS-01, SRV-DB-01, SRV-PRINT-01 y otros 13 — programado de lunes a sábado a las 23:00, destino: smb backups-new, retención: 2 meses mensual / 4 semanas semanal / 6 días diario); ‘TMP-BDD’ (1 dispositivo); ‘SQL-CLOUD 2’ (86 dispositivos, lunes a viernes a las 23:00); ‘SQL-CLOUD’ (86 dispositivos); ‘Bases_Exchange’ (2 dispositivos, diario a las 03:00)."
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
              "label": "Advertencia SRV-RDS-01",
              "value": "Backup de VM completado con advertencia: CBT desactivado — backup ejecutado sin Changed Block Tracking (snapshots VMware presentes)"
            },
            {
              "label": "Error SRV-DB-01",
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
};

export default details;
