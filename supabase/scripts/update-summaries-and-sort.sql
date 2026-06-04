-- supabase/update-summaries-and-sort.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Updates summary column for all 13 IT Ops case studies (EN + FR)
-- 2. Reorders cases by professional impact (most impressive first)
-- ─────────────────────────────────────────────────────────────────────────────

-- ══ SORT ORDER — impact-first ranking ═══════════════════════════════════════
-- 1  it-ops-rmm-supervision        550+ devices MSP
-- 2  it-ops-acronis-backup         105 endpoints, 85 alerts resolved
-- 3  it-ops-network-security       pfSense + CA + Squid proxy
-- 4  workstation-mass-deployment   200+ laptops Autopilot
-- 5  it-ops-virtualization-lab     AD DS + DNS + DHCP + WDS lab
-- 6  it-ops-incident-management    316 tickets, Autotask PSA
-- 7  hardware-upgrade-hp-laptop    personal project
-- 8  it-ops-disk-backup            AOMEI + Windows Server Backup
-- 9  it-ops-workstation-setup      Windows 10 + Ninite
-- 10 it-ops-wifi-config            TP-Link AP
-- 11 it-ops-roaming-profiles       AD DS roaming profiles
-- 12 it-ops-hardware-procurement   Excel devis
-- 13 it-ops-email-config           Outlook Day-1 onboarding
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE projects SET sort_order = 10  WHERE slug = 'it-ops-rmm-supervision';
UPDATE projects SET sort_order = 20  WHERE slug = 'it-ops-acronis-backup';
UPDATE projects SET sort_order = 30  WHERE slug = 'it-ops-network-security';
UPDATE projects SET sort_order = 40  WHERE slug = 'workstation-mass-deployment';
UPDATE projects SET sort_order = 50  WHERE slug = 'it-ops-virtualization-lab';
UPDATE projects SET sort_order = 60  WHERE slug = 'it-ops-incident-management';
UPDATE projects SET sort_order = 70  WHERE slug = 'hardware-upgrade-hp-laptop';
UPDATE projects SET sort_order = 80  WHERE slug = 'it-ops-disk-backup';
UPDATE projects SET sort_order = 90  WHERE slug = 'it-ops-workstation-setup';
UPDATE projects SET sort_order = 100 WHERE slug = 'it-ops-wifi-config';
UPDATE projects SET sort_order = 110 WHERE slug = 'it-ops-roaming-profiles';
UPDATE projects SET sort_order = 120 WHERE slug = 'it-ops-hardware-procurement';
UPDATE projects SET sort_order = 130 WHERE slug = 'it-ops-email-config';

-- ══ SUMMARIES — EN ══════════════════════════════════════════════════════════

UPDATE projects SET summary =
  'Daily fleet supervision at MIDRANGE GROUP: 550+ devices monitored in Datto RMM, antivirus coverage gaps closed via Quick Jobs, and client support delivered remotely via Splashtop.'
WHERE slug = 'it-ops-rmm-supervision' AND locale = 'en';

UPDATE projects SET summary =
  'Daily backup monitoring at MIDRANGE GROUP: 105 protected endpoints across NAS and Acronis Cloud, 85 active alerts triaged, root causes identified (NAS full, plan corruption, network issues) and continuity restored.'
WHERE slug = 'it-ops-acronis-backup' AND locale = 'en';

UPDATE projects SET summary =
  'Network perimeter security lab: pfSense 2.6 VM as LAN gateway, firewall rules blocking server internet access, Squid + SquidGuard transparent proxy with URL filtering, LightSquid reporting and internal CA for HTTPS inspection.'
WHERE slug = 'it-ops-network-security' AND locale = 'en';

UPDATE projects SET summary =
  'End-to-end workstation provisioning at MIDRANGE GROUP: Blancco certified wipe, Dell Image Assist WIM imaging, and Windows Autopilot enrollment for a 200+ laptop fleet.'
WHERE slug = 'workstation-mass-deployment' AND locale = 'en';

UPDATE projects SET summary =
  'Full virtual infrastructure on VMware Workstation Pro 17: 4 VMs (DCAD22, SRVWIN22, SRVSAMBADEBI, CL10) running AD DS, DNS, DHCP, WDS and Samba file sharing on a private 192.168.100.0/24 LAN.'
WHERE slug = 'it-ops-virtualization-lab' AND locale = 'en';

UPDATE projects SET summary =
  'Tier-1/2 support at MIDRANGE GROUP MSP: ticket triage, remote resolution via Splashtop, and time billing in Autotask PSA — 316 open tickets managed across the client portfolio.'
WHERE slug = 'it-ops-incident-management' AND locale = 'en';

UPDATE projects SET summary =
  'Full hardware upgrade of an HP laptop: sourced compatible 32 GB DDR4 RAM and 2 TB Samsung SSD, Acronis drive clone for zero data loss, disassembly and post-upgrade validation.'
WHERE slug = 'hardware-upgrade-hp-laptop' AND locale = 'en';

UPDATE projects SET summary =
  'Backup strategy on VMs: partition resize with AOMEI Partition Assistant, full disk image with AOMEI Backupper Standard, and scheduled Windows Server Backup on a Windows Server 2012 VM.'
WHERE slug = 'it-ops-disk-backup' AND locale = 'en';

UPDATE projects SET summary =
  'Full workstation provisioning: clean Windows 10 install with custom partition, French OOBE configuration, then automated multi-app deployment using Ninite + Office 2016 in parallel.'
WHERE slug = 'it-ops-workstation-setup' AND locale = 'en';

UPDATE projects SET summary =
  'End-to-end TP-Link AP setup: WAN/LAN addressing, integrated DHCP server, SSID + WPA2-PSK security hardening — validated with a test device obtaining DHCP and reaching internet.'
WHERE slug = 'it-ops-wifi-config' AND locale = 'en';

UPDATE projects SET summary =
  'Roaming profile infrastructure on ebtai.fr domain: shared folder with Modify permissions for EBTAI\Utilisateurs, AD profile path configured, and profile auto-creation validated on user login.'
WHERE slug = 'it-ops-roaming-profiles' AND locale = 'en';

UPDATE projects SET summary =
  'Full procurement workflow for a mid-range workstation: requirements analysis, B2B component research (LDLC Pro, Materiel.net), compatibility validation, and Excel quote under 1 000 € ex-VAT.'
WHERE slug = 'it-ops-hardware-procurement' AND locale = 'en';

UPDATE projects SET summary =
  'Day-1 user onboarding scenario: Outlook 2016 account auto-configured via Exchange ActiveSync (tai7@outlook.fr), bidirectional test email validated — inbox ready in under 5 minutes.'
WHERE slug = 'it-ops-email-config' AND locale = 'en';

-- ══ SUMMARIES — FR ══════════════════════════════════════════════════════════

UPDATE projects SET summary =
  'Supervision quotidienne du parc chez MIDRANGE GROUP : 550+ équipements supervisés dans Datto RMM, lacunes antivirus comblées via Quick Jobs, support client assuré à distance via Splashtop.'
WHERE slug = 'it-ops-rmm-supervision' AND locale = 'fr';

UPDATE projects SET summary =
  'Supervision quotidienne des sauvegardes chez MIDRANGE GROUP : 105 endpoints protégés sur NAS et Acronis Cloud, 85 alertes actives triées, causes racines identifiées (NAS plein, corruption de plan, réseau) et continuité rétablie.'
WHERE slug = 'it-ops-acronis-backup' AND locale = 'fr';

UPDATE projects SET summary =
  'Lab de sécurité périmétrique : VM pfSense 2.6 en passerelle LAN, règles pare-feu bloquant l''accès Internet des serveurs, proxy Squid + SquidGuard transparent avec filtrage URL, reporting LightSquid et CA interne pour inspection HTTPS.'
WHERE slug = 'it-ops-network-security' AND locale = 'fr';

UPDATE projects SET summary =
  'Provisioning de postes de bout en bout chez MIDRANGE GROUP : effacement certifié Blancco, imagerie WIM avec Dell Image Assist et enrôlement Windows Autopilot pour un parc de 200+ laptops.'
WHERE slug = 'workstation-mass-deployment' AND locale = 'fr';

UPDATE projects SET summary =
  'Infrastructure virtuelle complète sur VMware Workstation Pro 17 : 4 VM (DCAD22, SRVWIN22, SRVSAMBADEBI, CL10) avec AD DS, DNS, DHCP, WDS et partages Samba sur un LAN privé 192.168.100.0/24.'
WHERE slug = 'it-ops-virtualization-lab' AND locale = 'fr';

UPDATE projects SET summary =
  'Support N1/N2 chez MIDRANGE GROUP MSP : triage des tickets, résolution à distance via Splashtop et facturation dans Autotask PSA — 316 tickets ouverts gérés sur le portefeuille clients.'
WHERE slug = 'it-ops-incident-management' AND locale = 'fr';

UPDATE projects SET summary =
  'Upgrade matériel complet d''un laptop HP : RAM 32 Go DDR4 et SSD Samsung 2 To sourcés, clone du disque via Acronis (zéro perte de données), démontage et validation post-upgrade.'
WHERE slug = 'hardware-upgrade-hp-laptop' AND locale = 'fr';

UPDATE projects SET summary =
  'Stratégie de sauvegarde sur VM : redimensionnement de partition avec AOMEI Partition Assistant, image disque complète avec AOMEI Backupper Standard, et sauvegarde planifiée Windows Server Backup sur une VM Windows Server 2012.'
WHERE slug = 'it-ops-disk-backup' AND locale = 'fr';

UPDATE projects SET summary =
  'Provisioning complet de poste : installation Windows 10 propre avec partition personnalisée, configuration OOBE en français, puis déploiement multi-logiciels automatisé via Ninite + Office 2016 en parallèle.'
WHERE slug = 'it-ops-workstation-setup' AND locale = 'fr';

UPDATE projects SET summary =
  'Configuration complète d''un PA TP-Link : adressage WAN/LAN, serveur DHCP intégré, sécurisation SSID + WPA2-PSK — validé avec un appareil test obtenant une adresse DHCP et accédant à Internet.'
WHERE slug = 'it-ops-wifi-config' AND locale = 'fr';

UPDATE projects SET summary =
  'Infrastructure de profils itinérants sur le domaine ebtai.fr : dossier partagé avec permissions Modifier pour EBTAI\Utilisateurs, chemin de profil AD configuré et création automatique du profil validée à la connexion.'
WHERE slug = 'it-ops-roaming-profiles' AND locale = 'fr';

UPDATE projects SET summary =
  'Processus d''approvisionnement complet pour un poste de travail milieu de gamme : analyse des besoins, recherche composants B2B (LDLC Pro, Materiel.net), validation des compatibilités et devis Excel sous 1 000 € HT.'
WHERE slug = 'it-ops-hardware-procurement' AND locale = 'fr';

UPDATE projects SET summary =
  'Scénario d''onboarding Jour-1 : compte Outlook 2016 configuré automatiquement via Exchange ActiveSync (tai7@outlook.fr), email de test bidirectionnel validé — messagerie opérationnelle en moins de 5 minutes.'
WHERE slug = 'it-ops-email-config' AND locale = 'fr';
