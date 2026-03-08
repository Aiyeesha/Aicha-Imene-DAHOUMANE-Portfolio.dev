-- supabase/seed-acronis-backup-project.sql
-- -----------------------------------------------------------
-- Case study n°7 — IT Ops
-- "Cloud Computing & Backup Supervision with Acronis"
-- Internship at MIDRANGE GROUP — Exploitation team
-- Supervisor: Théo KACEL (Systems & Networks Administrator)
-- -----------------------------------------------------------

-- ── EN ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (
  slug, locale, title, summary,
  track, categories, tags,
  badge,
  highlights,
  featured, sort_order, status,
  repo_url, live_url,
  content
)
VALUES (
  'it-ops-acronis-backup',
  'en',
  'Cloud Backup Supervision with Acronis Cyber Backup',
  'During my internship at MIDRANGE GROUP, I monitored and maintained client backup plans using Acronis Cyber Backup and Acronis Cyber Protect Cloud: daily dashboard review, backup failure investigation (full disks, offline servers, corrupted plans, network issues), plan recreation, and storage capacity management across NAS and cloud destinations.',
  'itops',
  ARRAY['IT Ops', 'Backup', 'Operations'],
  ARRAY['Acronis', 'Backup', 'Monitoring', 'Windows Server'],
  '{"tone": "client", "label": "FIELD PRACTICE"}',
  ARRAY[
    'Monitored 105 protected devices across 5 backup plans (VMs, SQL, Exchange) in Acronis Cyber Backup',
    'Diagnosed 85 alerts (33 errors, 52 warnings) and identified root causes: full disks, offline servers, corrupted plans, network failures',
    'Recreated corrupted backup plans with corrected naming conventions to restore continuity',
    'Managed two NAS destinations (10.5 Tio each) and a cloud location (250 Gio) via Acronis',
    'Used Datto RMM / Splashtop to remotely access client servers during investigations'
  ],
  false,
  70,
  'published',
  NULL,
  NULL,
  'Internship at MIDRANGE GROUP: daily operational use of Acronis Cyber Backup and Acronis Cyber Protect Cloud to supervise backup plans for a client fleet of 100+ servers and VMs. Investigated and resolved backup failures, managed NAS storage capacity, and recreated corrupted plans.'
)
ON CONFLICT (slug, locale) DO NOTHING;

-- ── FR ───────────────────────────────────────────────────────────────────────
INSERT INTO projects (
  slug, locale, title, summary,
  track, categories, tags,
  badge,
  highlights,
  featured, sort_order, status,
  repo_url, live_url,
  content
)
VALUES (
  'it-ops-acronis-backup',
  'fr',
  'Supervision des sauvegardes Cloud avec Acronis Cyber Backup',
  'Lors de mon stage chez MIDRANGE GROUP, j''ai supervisé et maintenu les plans de sauvegarde clients avec Acronis Cyber Backup et Acronis Cyber Protect Cloud : contrôle quotidien du tableau de bord, investigation des échecs (disques pleins, serveurs hors ligne, plans corrompus, problèmes réseau), recréation de plans et gestion de la capacité de stockage NAS et cloud.',
  'itops',
  ARRAY['IT Ops', 'Backup', 'Operations'],
  ARRAY['Acronis', 'Backup', 'Monitoring', 'Windows Server'],
  '{"tone": "client", "label": "FIELD PRACTICE"}',
  ARRAY[
    'Supervision de 105 appareils protégés répartis sur 5 plans de sauvegarde (VM, SQL, Exchange) dans Acronis Cyber Backup',
    'Diagnostic de 85 alertes (33 erreurs, 52 avertissements) avec identification des causes : disques pleins, serveurs hors ligne, plans corrompus, pannes réseau',
    'Recréation de plans de sauvegarde corrompus avec conventions de nommage corrigées pour restaurer la continuité',
    'Gestion de deux destinations NAS (10,5 Tio chacune) et d''un emplacement cloud (250 Gio) via Acronis',
    'Utilisation de Datto RMM / Splashtop pour accéder à distance aux serveurs clients lors des investigations'
  ],
  false,
  70,
  'published',
  NULL,
  NULL,
  'Stage chez MIDRANGE GROUP : utilisation quotidienne d''Acronis Cyber Backup et Acronis Cyber Protect Cloud pour superviser les plans de sauvegarde d''un parc de 100+ serveurs et VM clients. Investigation et résolution des échecs de sauvegarde, gestion de la capacité des NAS, recréation de plans corrompus.'
)
ON CONFLICT (slug, locale) DO NOTHING;
