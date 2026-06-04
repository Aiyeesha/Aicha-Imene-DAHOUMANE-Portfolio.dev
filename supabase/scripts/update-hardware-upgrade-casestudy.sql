-- supabase/update-hardware-upgrade-casestudy.sql
-- ------------------------------------------------
-- Enrichit le projet "Upgrade matériel PC portable HP" en case study complet.
-- Badge : PERSONAL PROJECT / PROJET PERSONNEL
-- Sections : contexte, diagnostic, timeline (étapes), métriques, apprentissages
-- À exécuter dans SQL Editor → Primary Database
-- Prérequis : seed-hardware-upgrade-project.sql doit avoir été exécuté d''abord.

-- ══════════════════════════════════════════════════════
-- VERSION EN
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge        = '{"tone": "personal", "label": "PERSONAL PROJECT"}',
  hero_subtitle = 'RAM doubled, HDD swapped for SSD, system cloned with Acronis — full hardware upgrade on an HP laptop with zero data loss.',
  highlights   = ARRAY[
    'RAM: 16 GB → 32 GB (2 × 16 GB DDR4) — no reinstall required',
    'Storage: 500 GB HDD → 2 TB Samsung SSD',
    'Acronis clone: original system preserved on new SSD, zero data loss',
    'Component compatibility verified before purchase',
    'Full driver and Windows update pass post-upgrade'
  ],
  sections = '[
    {
      "type": "text",
      "title": "Context",
      "paragraphs": [
        "A friend''s HP laptop was struggling with two problems: lack of responsiveness (only 16 GB of RAM for daily use with multiple tabs and apps open) and running out of storage space (500 GB HDD, nearly full).",
        "Rather than buying a new machine, I proposed a targeted hardware upgrade: double the RAM and replace the HDD with a larger, faster SSD. I sourced the components, verified compatibility, performed the upgrade myself, and validated the result — all without any data loss or reinstallation."
      ]
    },
    {
      "type": "bullets",
      "title": "Diagnosis & component selection",
      "items": [
        "Identified the two bottlenecks: insufficient RAM causing constant paging, and a slow mechanical HDD limiting boot and app launch times.",
        "Checked the HP laptop''s service manual to confirm: SO-DIMM DDR4-2666 slots (2 available, max 32 GB), and a 2.5'' SATA slot for the storage drive.",
        "Selected 2 × 16 GB Samsung DDR4-2666 SO-DIMM sticks — same brand and speed as the original stick to ensure dual-channel compatibility.",
        "Selected a 2 TB Samsung SSD for storage — same interface (SATA), no adapter needed.",
        "Verified that Acronis True Image supported cloning from HDD to SSD on Windows before committing to the procedure."
      ]
    },
    {
      "type": "timeline",
      "title": "Step-by-step procedure",
      "steps": [
        {
          "title": "Step 1 — Parts received and verified",
          "description": "Received the 2 × 16 GB DDR4 RAM sticks and the 2 TB Samsung SSD. Cross-checked model numbers and specifications against the laptop''s memory and storage requirements to confirm compatibility before opening the machine."
        },
        {
          "title": "Step 2 — Acronis backup and clone",
          "description": "Connected the new SSD via a USB-to-SATA adapter. Launched Acronis True Image and used the disk clone feature to copy the entire 500 GB HDD (OS, apps, user data, partitions) to the new 2 TB SSD. The clone completed successfully with the partition layout preserved. This step ensures zero data loss even if the physical swap goes wrong."
        },
        {
          "title": "Step 3 — Disassembly",
          "description": "Powered off the laptop and unplugged the charger. Removed the bottom cover using a Phillips screwdriver (approx. 10 screws). Used a plastic spudger to release the cover clips without damaging the chassis. Disconnected the battery connector before touching any components."
        },
        {
          "title": "Step 4 — RAM swap",
          "description": "Released the two clips holding the original 16 GB stick (single module in dual-slot board). Removed the old stick and inserted the two new 16 GB DDR4 sticks in both slots at a 45° angle, then pressed down until the clips clicked into place."
        },
        {
          "title": "Step 5 — HDD replaced by SSD",
          "description": "Unscrewed the HDD bracket, disconnected the SATA + power connector from the old 500 GB HDD, and connected the cloned 2 TB SSD in its place. Secured the bracket and reconnected the SATA cable."
        },
        {
          "title": "Step 6 — First boot and validation",
          "description": "Reassembled the bottom cover and powered on. Windows booted from the cloned SSD on the first attempt — no recovery prompt, no missing files. Opened Task Manager to confirm 32 GB RAM detected and active. Checked Disk Management to verify the full 2 TB SSD capacity was visible. Ran Windows Update and updated all drivers to match the current hardware state."
        }
      ]
    },
    {
      "type": "metrics",
      "title": "Before / After",
      "items": [
        {
          "label": "RAM",
          "value": "16 → 32 GB",
          "note": "2 × 16 GB DDR4-2666 SO-DIMM dual-channel"
        },
        {
          "label": "Storage",
          "value": "500 GB → 2 TB",
          "note": "HDD → Samsung SSD (SATA)"
        },
        {
          "label": "Data loss",
          "value": "Zero",
          "note": "Acronis clone — full OS + data preserved"
        },
        {
          "label": "Reinstall required",
          "value": "None",
          "note": "Cloned system booted on first attempt"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Key learnings",
      "items": [
        "Always clone before you swap: connecting the new SSD via USB-to-SATA and cloning with Acronis before opening the machine eliminates the risk of data loss during disassembly.",
        "Verify the service manual first: SO-DIMM slot count, max supported RAM, and storage interface (SATA vs NVMe) vary by HP model — buying incompatible parts wastes time and money.",
        "Disconnect the battery before touching internals: even with the laptop powered off, residual charge can damage components.",
        "Dual-channel RAM requires matching sticks in both slots: mixing sticks of different speeds or capacities can drop performance below single-channel.",
        "After a storage swap, always check partition layout in Disk Management: Acronis preserves partitions, but Windows may need to extend the partition to use the full new capacity."
      ]
    }
  ]'
WHERE slug = 'hardware-upgrade-hp-laptop' AND locale = 'en';

-- ══════════════════════════════════════════════════════
-- VERSION FR
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge        = '{"tone": "personal", "label": "PROJET PERSONNEL"}',
  hero_subtitle = 'RAM doublée, HDD remplacé par un SSD, système cloné avec Acronis — upgrade complet d''un PC portable HP sans aucune perte de données.',
  highlights   = ARRAY[
    'RAM : 16 Go → 32 Go (2 × 16 Go DDR4) — sans réinstallation',
    'Stockage : 500 Go HDD → SSD Samsung 2 To',
    'Clone Acronis : système d''origine préservé sur le nouveau SSD, zéro perte de données',
    'Compatibilité des composants vérifiée avant achat',
    'Mise à jour complète des pilotes et de Windows après upgrade'
  ],
  sections = '[
    {
      "type": "text",
      "title": "Contexte",
      "paragraphs": [
        "Le PC portable HP d''une amie souffrait de deux problèmes : un manque de réactivité (seulement 16 Go de RAM pour une utilisation quotidienne avec plusieurs onglets et applications ouverts) et un espace disque insuffisant (HDD 500 Go, presque plein).",
        "Plutôt que d''acheter un nouveau PC, j''ai proposé un upgrade matériel ciblé : doubler la RAM et remplacer le HDD par un SSD plus grand et plus rapide. J''ai sélectionné les composants, vérifié la compatibilité, réalisé l''upgrade seule, et validé le résultat — sans aucune perte de données ni réinstallation."
      ]
    },
    {
      "type": "bullets",
      "title": "Diagnostic & sélection des composants",
      "items": [
        "Identification des deux goulots d''étranglement : RAM insuffisante causant une pagination constante, et HDD mécanique lent limitant les temps de démarrage et de lancement des applications.",
        "Consultation du manuel de service HP pour confirmer : emplacements SO-DIMM DDR4-2666 (2 disponibles, max 32 Go), et emplacement SATA 2,5'' pour le stockage.",
        "Sélection de 2 barrettes Samsung DDR4-2666 SO-DIMM 16 Go — même marque et fréquence que la barrette d''origine pour garantir la compatibilité en dual-channel.",
        "Sélection d''un SSD Samsung 2 To pour le stockage — même interface (SATA), aucun adaptateur nécessaire.",
        "Vérification qu''Acronis True Image prenait en charge le clonage de HDD vers SSD sous Windows avant de s''engager dans la procédure."
      ]
    },
    {
      "type": "timeline",
      "title": "Procédure étape par étape",
      "steps": [
        {
          "title": "Étape 1 — Réception et vérification des pièces",
          "description": "Réception des 2 barrettes DDR4 16 Go et du SSD Samsung 2 To. Vérification croisée des références et spécifications par rapport aux exigences mémoire et stockage du laptop pour confirmer la compatibilité avant d''ouvrir la machine."
        },
        {
          "title": "Étape 2 — Sauvegarde et clonage Acronis",
          "description": "Connexion du nouveau SSD via un adaptateur USB-SATA. Lancement d''Acronis True Image et utilisation de la fonction de clonage de disque pour copier l''intégralité du HDD 500 Go (OS, applications, données utilisateur, partitions) sur le nouveau SSD 2 To. Le clonage s''est terminé avec succès, la disposition des partitions préservée. Cette étape garantit zéro perte de données même en cas de problème lors du remplacement physique."
        },
        {
          "title": "Étape 3 — Démontage",
          "description": "Extinction du laptop et débranchement du chargeur. Retrait du capot inférieur à l''aide d''un tournevis cruciforme (environ 10 vis). Utilisation d''un spudger plastique pour libérer les clips du capot sans endommager le châssis. Déconnexion du connecteur de batterie avant de toucher les composants."
        },
        {
          "title": "Étape 4 — Échange de RAM",
          "description": "Libération des deux clips retenant la barrette d''origine 16 Go (module unique dans un plateau double emplacement). Retrait de l''ancienne barrette et insertion des deux nouvelles barrettes DDR4 16 Go dans les deux emplacements à 45°, puis pression jusqu''au clic des clips."
        },
        {
          "title": "Étape 5 — Remplacement HDD par SSD",
          "description": "Dévissage du support HDD, déconnexion du connecteur SATA + alimentation de l''ancien HDD 500 Go, et connexion du SSD cloné 2 To à sa place. Fixation du support et reconnexion du câble SATA."
        },
        {
          "title": "Étape 6 — Premier démarrage et validation",
          "description": "Remontage du capot inférieur et démarrage. Windows a démarré depuis le SSD cloné au premier essai — aucune invite de récupération, aucun fichier manquant. Ouverture du Gestionnaire des tâches pour confirmer la détection des 32 Go de RAM. Vérification dans la Gestion des disques de la capacité totale de 2 To visible. Exécution de Windows Update et mise à jour de tous les pilotes."
        }
      ]
    },
    {
      "type": "metrics",
      "title": "Avant / Après",
      "items": [
        {
          "label": "RAM",
          "value": "16 → 32 Go",
          "note": "2 × 16 Go DDR4-2666 SO-DIMM dual-channel"
        },
        {
          "label": "Stockage",
          "value": "500 Go → 2 To",
          "note": "HDD → SSD Samsung (SATA)"
        },
        {
          "label": "Perte de données",
          "value": "Zéro",
          "note": "Clone Acronis — OS + données intégralement préservés"
        },
        {
          "label": "Réinstallation",
          "value": "Aucune",
          "note": "Système cloné démarré au premier essai"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Apprentissages clés",
      "items": [
        "Toujours cloner avant d''échanger : connecter le nouveau SSD via USB-SATA et cloner avec Acronis avant d''ouvrir la machine élimine le risque de perte de données pendant le démontage.",
        "Consulter le manuel de service en premier : le nombre d''emplacements SO-DIMM, la RAM max supportée et l''interface de stockage (SATA vs NVMe) varient selon le modèle HP — acheter des pièces incompatibles est une perte de temps et d''argent.",
        "Déconnecter la batterie avant de toucher les composants : même PC éteint, une charge résiduelle peut endommager les composants.",
        "Le dual-channel nécessite des barrettes identiques dans les deux emplacements : mélanger des barrettes de fréquences ou de capacités différentes peut faire chuter les performances en dessous du mode single-channel.",
        "Après un échange de stockage, toujours vérifier la disposition des partitions dans la Gestion des disques : Acronis préserve les partitions, mais Windows peut nécessiter une extension de partition pour exploiter toute la capacité du nouveau disque."
      ]
    }
  ]'
WHERE slug = 'hardware-upgrade-hp-laptop' AND locale = 'fr';
