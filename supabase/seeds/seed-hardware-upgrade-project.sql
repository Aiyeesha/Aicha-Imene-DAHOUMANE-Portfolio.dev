-- supabase/seed-hardware-upgrade-project.sql
-- -------------------------------------------
-- Insère le projet "Upgrade matériel PC portable HP — RAM + SSD"
-- Contexte : intervention personnelle (amie) — ajout RAM 32 Go + SSD 2 To
-- Réalisé seule, hors cadre entreprise.
--
-- À exécuter dans l'éditeur SQL Supabase (dashboard → SQL Editor).
-- Idempotent : ON CONFLICT DO NOTHING évite les doublons si rejoué.

-- ── Version EN ───────────────────────────────────────────────────────────────

INSERT INTO projects (
  slug, locale, title, summary, content,
  tech_stack, repo_url, live_url,
  track, categories, tags, badge, highlights,
  featured, sort_order, status
)
VALUES (
  'hardware-upgrade-hp-laptop',
  'en',
  'HP Laptop Hardware Upgrade — RAM & SSD',
  'Full hardware upgrade on a friend''s HP laptop: RAM doubled from 16 GB to 32 GB (2 × 16 GB DDR4) and HDD replaced by a 2 TB SSD. System cloned with Acronis before disassembly — no data loss, no reinstall.',
  'A friend''s HP laptop was sluggish and running out of disk space. I sourced compatible components (2 × 16 GB DDR4 RAM sticks and a 2 TB Samsung SSD), verified compatibility against the laptop specs, and performed the full upgrade myself. Before opening the machine, I used Acronis to back up and clone the original 500 GB HDD to the new SSD. After disassembly (bottom cover removal with a Phillips screwdriver), I swapped both RAM sticks and replaced the HDD with the SSD. On first boot, I verified the clone was intact, confirmed the new RAM was detected, and ran a full Windows update and driver refresh.',
  ARRAY['Acronis True Image', 'Samsung SSD', 'DDR4 RAM', 'Windows Update'],
  NULL,
  NULL,
  'itops',
  ARRAY['IT Ops', 'Hardware', 'Maintenance'],
  ARRAY['IT Ops', 'Windows', 'Hardware', 'Backup'],
  '{"tone": "personal", "label": "PERSONAL PROJECT"}',
  ARRAY[
    'RAM: 16 GB → 32 GB (2 × 16 GB DDR4) — no reinstall required',
    'Storage: 500 GB HDD → 2 TB Samsung SSD',
    'Acronis clone: original system preserved on new SSD, zero data loss',
    'Component compatibility verified before purchase',
    'Full driver and Windows update pass post-upgrade'
  ],
  false,
  30,
  'published'
)
ON CONFLICT (slug, locale) DO NOTHING;

-- ── Version FR ───────────────────────────────────────────────────────────────

INSERT INTO projects (
  slug, locale, title, summary, content,
  tech_stack, repo_url, live_url,
  track, categories, tags, badge, highlights,
  featured, sort_order, status
)
VALUES (
  'hardware-upgrade-hp-laptop',
  'fr',
  'Upgrade matériel PC portable HP — RAM & SSD',
  'Upgrade complet sur le PC portable HP d''une amie : RAM doublée de 16 Go à 32 Go (2 × 16 Go DDR4) et HDD remplacé par un SSD de 2 To. Système cloné avec Acronis avant démontage — aucune perte de données, aucune réinstallation.',
  'Le PC portable HP d''une amie manquait de fluidité et d''espace disque. J''ai sélectionné des composants compatibles (2 barrettes de RAM DDR4 16 Go et un SSD Samsung 2 To), vérifié la compatibilité avec les spécifications du laptop, et réalisé l''upgrade entièrement seule. Avant d''ouvrir la machine, j''ai utilisé Acronis pour sauvegarder et cloner le disque dur d''origine (500 Go HDD) sur le nouveau SSD. Après démontage du capot inférieur (tournevis cruciforme), j''ai échangé les deux barrettes de RAM et remplacé le HDD par le SSD. Au premier démarrage, j''ai vérifié que le clone était intact, confirmé la détection des nouvelles barrettes de RAM, puis effectué une mise à jour complète de Windows et des pilotes.',
  ARRAY['Acronis True Image', 'Samsung SSD', 'DDR4 RAM', 'Windows Update'],
  NULL,
  NULL,
  'itops',
  ARRAY['IT Ops', 'Matériel', 'Maintenance'],
  ARRAY['IT Ops', 'Windows', 'Matériel', 'Backup'],
  '{"tone": "personal", "label": "PROJET PERSONNEL"}',
  ARRAY[
    'RAM : 16 Go → 32 Go (2 × 16 Go DDR4) — sans réinstallation',
    'Stockage : 500 Go HDD → SSD Samsung 2 To',
    'Clone Acronis : système d''origine préservé sur le nouveau SSD, zéro perte de données',
    'Compatibilité des composants vérifiée avant achat',
    'Mise à jour complète des pilotes et de Windows après upgrade'
  ],
  false,
  30,
  'published'
)
ON CONFLICT (slug, locale) DO NOTHING;
