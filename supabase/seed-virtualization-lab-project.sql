-- supabase/seed-virtualization-lab-project.sql
-- -----------------------------------------------------------
-- Case study n°4 — IT Ops
-- "Maintaining a Virtualized IT Environment"
-- VMware Workstation Pro 17, Windows Server 2022, AD DS / DNS / DHCP / WDS
-- Training lab — done alone at home
-- -----------------------------------------------------------
-- Run AFTER the unique constraint exists: (slug, locale)
-- Run fix-itops-casestudies.sql beforehand if the 3 previous
-- case studies are not yet visible.
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
  'it-ops-virtualization-lab',
  'en',
  'Maintaining a Virtualized IT Environment',
  'Set up and operated a full Windows Server 2022 infrastructure inside VMware Workstation Pro 17: Active Directory domain (DP-AICHA.LAN), DNS, DHCP with PXE boot, and WDS for automated OS deployment to domain-joined clients.',
  'itops',
  ARRAY['IT Ops', 'Systems', 'Virtualization'],
  ARRAY['VMware', 'Windows Server', 'AD DS', 'DHCP', 'Roaming Profiles', 'Deployment', 'Windows'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Designed the full network architecture on a VMware NAT segment (192.168.100.0/24)',
    'Deployed AD DS, DNS, DHCP, and WDS roles on a single Windows Server 2022 VM',
    'Automated OS provisioning via PXE boot (WDS + DHCP option 060 PXEClient)',
    'Applied GPOs, roaming profiles, and a mapped shared drive (\\DCAD22\Partage)',
    'Joined a Windows 10 client to the domain with admin-controlled WDS approval'
  ],
  false,
  40,
  'published',
  NULL,
  NULL,
  'Full setup and operation of a virtualized Windows Server 2022 environment using VMware Workstation Pro 17. Configured AD DS, DNS, DHCP, and WDS to replicate a real enterprise IT infrastructure, culminating in domain-joined PXE-boot OS deployment.'
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
  'it-ops-virtualization-lab',
  'fr',
  'Maintenir et exploiter un environnement virtualisé',
  'Mise en place et exploitation d''une infrastructure Windows Server 2022 complète sous VMware Workstation Pro 17 : domaine Active Directory (DP-AICHA.LAN), DNS, DHCP avec amorçage PXE et WDS pour le déploiement automatisé d''OS sur les clients joints au domaine.',
  'itops',
  ARRAY['IT Ops', 'Systems', 'Virtualization'],
  ARRAY['VMware', 'Windows Server', 'AD DS', 'DHCP', 'Roaming Profiles', 'Deployment', 'Windows'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Architecture réseau sur segment NAT VMware (192.168.100.0/24) avec IP statique 192.168.100.250',
    'Déploiement des rôles AD DS, DNS, DHCP et WDS sur une seule VM Windows Server 2022',
    'Provisionnement OS automatisé via PXE (WDS + option DHCP 060 PXEClient)',
    'Application des GPO, profils itinérants et lecteur réseau mappé (\\\\DCAD22\\Partage)',
    'Jonction d''un client Windows 10 au domaine avec validation manuelle WDS'
  ],
  false,
  40,
  'published',
  NULL,
  NULL,
  'Mise en œuvre complète d''un environnement Windows Server 2022 virtualisé sous VMware Workstation Pro 17. Configuration d''AD DS, DNS, DHCP et WDS pour reproduire une infrastructure IT d''entreprise, avec déploiement OS par amorçage PXE sur client joint au domaine.'
)
ON CONFLICT (slug, locale) DO NOTHING;
