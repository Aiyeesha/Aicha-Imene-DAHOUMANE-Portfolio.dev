-- supabase/seed-rmm-supervision-project.sql
-- -----------------------------------------------------------
-- Case study n°6 — IT Ops
-- "Infrastructure Monitoring with Datto RMM"
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
  'it-ops-rmm-supervision',
  'en',
  'Infrastructure Monitoring with Datto RMM',
  'During my internship at MIDRANGE GROUP (MSP), I used Datto RMM under the supervision of a Systems & Networks Administrator to remotely monitor and manage the IT infrastructure of the company and its clients: device inventory, patch management, antivirus status, remote access via Splashtop, and software deployment via Quick Jobs.',
  'itops',
  ARRAY['IT Ops', 'Operations', 'IT Support'],
  ARRAY['RMM', 'Monitoring', 'Windows', 'User Support', 'Ticketing'],
  '{"tone": "client", "label": "FIELD PRACTICE"}',
  ARRAY[
    'Monitored 550+ devices (desktops, laptops, servers) across multiple client sites via Datto RMM dashboard',
    'Checked patch status, antivirus coverage, and software inventory for managed endpoints',
    'Deployed software components (MalwareBytes) remotely via Quick Jobs without on-site intervention',
    'Used Splashtop remote access to assist end users and troubleshoot issues on client machines',
    'Worked within the Exploitation team of a real MSP alongside a senior SysAdmin'
  ],
  false,
  60,
  'published',
  NULL,
  NULL,
  'Internship at MIDRANGE GROUP: hands-on use of Datto RMM platform to monitor and manage a fleet of 550+ endpoints for MSP clients. Covered device health monitoring, patch management, remote support via Splashtop, and automated deployments via Quick Jobs.'
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
  'it-ops-rmm-supervision',
  'fr',
  'Supervision d''infrastructure avec Datto RMM',
  'Lors de mon stage chez MIDRANGE GROUP (ESN/MSP), j''ai utilisé Datto RMM sous la tutelle d''un Administrateur Systèmes & Réseaux pour superviser et gérer à distance l''infrastructure IT de l''entreprise et de ses clients : inventaire des équipements, gestion des correctifs, état de l''antivirus, accès distant via Splashtop et déploiement de logiciels via Quick Jobs.',
  'itops',
  ARRAY['IT Ops', 'Operations', 'IT Support'],
  ARRAY['RMM', 'Monitoring', 'Windows', 'User Support', 'Ticketing'],
  '{"tone": "client", "label": "FIELD PRACTICE"}',
  ARRAY[
    'Supervision de plus de 550 équipements (desktops, laptops, serveurs) sur plusieurs sites clients via le tableau de bord Datto RMM',
    'Contrôle du statut des correctifs, de la couverture antivirus et de l''inventaire logiciel des postes gérés',
    'Déploiement de composants logiciels (MalwareBytes) à distance via Quick Jobs, sans intervention sur site',
    'Utilisation de Splashtop pour assister les utilisateurs finaux et résoudre les incidents sur les postes clients',
    'Travail au sein de l''équipe Exploitation d''un MSP réel, encadré par un Administrateur Systèmes senior'
  ],
  false,
  60,
  'published',
  NULL,
  NULL,
  'Stage chez MIDRANGE GROUP : utilisation opérationnelle de la plateforme Datto RMM pour superviser et gérer un parc de plus de 550 postes pour des clients MSP. Couverture de la surveillance des équipements, gestion des patchs, support à distance via Splashtop et déploiements automatisés via Quick Jobs.'
)
ON CONFLICT (slug, locale) DO NOTHING;
