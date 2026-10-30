-- supabase/update-galleries.sql
-- -----------------------------------------------------------
-- Updates the gallery column for all 13 IT Ops case studies.
-- Run after all seed files have been executed.
-- Gallery format: [{"src": "/projects/[slug]/filename", "alt": "..."}]
-- -----------------------------------------------------------

-- ── CASE 1 — workstation-mass-deployment ─────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/workstation-mass-deployment/cover.jpg","alt":"Dell laptop running Image Assist Dynamic WinPC — workstation imaging at MIDRANGE GROUP"},
  {"src":"/projects/workstation-mass-deployment/img-2.jpg","alt":"Dell Image Assist — WIM image restore in progress on Dell Latitude"},
  {"src":"/projects/workstation-mass-deployment/img-3.jpg","alt":"Blancco disk erasure at 98% on Lenovo monitor — secure data wiping before redeployment"}
]' WHERE slug = 'workstation-mass-deployment';

-- ── CASE 2 — it-ops-incident-management ──────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-incident-management/cover.png","alt":"Autotask PSA dashboard — open incidents, SLA metrics and alert overview at MIDRANGE GROUP"},
  {"src":"/projects/it-ops-incident-management/img-2.png","alt":"Autotask ticket — PB Webroot / Site bloqué (Datto RMM device linked)"},
  {"src":"/projects/it-ops-incident-management/img-3.png","alt":"Autotask time entry — ticket billing and intervention timeline"}
]' WHERE slug = 'it-ops-incident-management';

-- ── CASE 3 — hardware-upgrade-hp-laptop ──────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/hardware-upgrade-hp-laptop/cover.png","alt":"HP laptop disassembled — bottom cover removed for RAM and SSD replacement"},
  {"src":"/projects/hardware-upgrade-hp-laptop/img-2.png","alt":"Samsung 16 GB DDR4-2666 SO-DIMM RAM stick — component sourced for the upgrade"}
]' WHERE slug = 'hardware-upgrade-hp-laptop';

-- ── CASE 4 — it-ops-virtualization-lab ───────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-virtualization-lab/cover.png","alt":"VMware Workstation Pro 17 home screen — host for the virtualized Windows Server 2022 lab"},
  {"src":"/projects/it-ops-virtualization-lab/img-2.png","alt":"New VM Wizard — naming the virtual machine DCAD22"},
  {"src":"/projects/it-ops-virtualization-lab/img-3.png","alt":"Windows Server 2022 Datacenter Evaluation selected for installation"},
  {"src":"/projects/it-ops-virtualization-lab/img-4.png","alt":"Server Manager — DCAD22 with AD DS, DHCP, DNS, WDS roles installed and static IP 192.168.100.250"},
  {"src":"/projects/it-ops-virtualization-lab/img-5.png","alt":"DNS Manager — DP-AICHALAN forward and reverse lookup zones on DCAD22"}
]' WHERE slug = 'it-ops-virtualization-lab';

-- ── CASE 5 — it-ops-network-security ─────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-network-security/cover.png","alt":"pfSense 2.6.0 web UI login page at 192.168.100.220 — gateway for the private LAN"},
  {"src":"/projects/it-ops-network-security/img-2.png","alt":"pfSense Firewall / Rules / LAN — REFUS SRV VERS INTERNET rule blocking server outbound traffic"},
  {"src":"/projects/it-ops-network-security/img-3.png","alt":"pfSense Firewall Aliases — IP — Client (192.168.100.21-22) and SRV (192.168.100.130, 192.168.100.250)"},
  {"src":"/projects/it-ops-network-security/img-4.png","alt":"pfSense Package Manager — LightSquid, squid and squidGuard installed"},
  {"src":"/projects/it-ops-network-security/img-5.png","alt":"pfSense Certificate Manager — Pfsense-CA self-signed internal CA (C=FR, O=greta, CN=internal-ca)"}
]' WHERE slug = 'it-ops-network-security';

-- ── CASE 6 — it-ops-rmm-supervision ──────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-rmm-supervision/cover.png","alt":"Datto RMM Default Dashboard — 551 managed devices with MalwareBytes and antivirus coverage overview"},
  {"src":"/projects/it-ops-rmm-supervision/img-2.png","alt":"Datto RMM device profile — LENOVO laptop with Quick Job panel open for MalwareBytes deployment"},
  {"src":"/projects/it-ops-rmm-supervision/img-3.png","alt":"Datto RMM device summary — Windows 10 Pro endpoint detail view (agent 4.4.2195)"}
]' WHERE slug = 'it-ops-rmm-supervision';

-- ── CASE 7 — it-ops-acronis-backup ───────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-acronis-backup/cover.png","alt":"Acronis Cyber Backup dashboard — 105 protected devices, 85 active alerts, 21.18 Tio total storage"},
  {"src":"/projects/it-ops-acronis-backup/img-2.png","alt":"Acronis Cyber Backup — backup plans list (Toutes les VM, SQL-CLOUD 2, Bases_Exchange)"},
  {"src":"/projects/it-ops-acronis-backup/img-3.png","alt":"Acronis Cyber Backup — Toutes les VM plan details (16 devices, NAS backups-new, 2-month retention)"},
  {"src":"/projects/it-ops-acronis-backup/img-4.png","alt":"Acronis Cyber Backup — Alertes view with SRV-BDD01 replication failure and CBT warning"},
  {"src":"/projects/it-ops-acronis-backup/img-5.png","alt":"Acronis Cyber Backup — Emplacements NAS (smb://10.0.0.10/backups, backups-new) and Acronis cloud"}
]' WHERE slug = 'it-ops-acronis-backup';

-- ── CASE 8 — it-ops-disk-backup ──────────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-disk-backup/cover.png","alt":"AOMEI Backupper Standard — disk backup selection screen"},
  {"src":"/projects/it-ops-disk-backup/img-2.png","alt":"AOMEI Partition Assistant — right-click menu with Resize/Move partition option"},
  {"src":"/projects/it-ops-disk-backup/img-3.png","alt":"AOMEI Partition Assistant — pending operation: resize partition E from 50.04 GB to 47.71 GB"},
  {"src":"/projects/it-ops-disk-backup/img-4.png","alt":"AOMEI Backupper — operation completed successfully"},
  {"src":"/projects/it-ops-disk-backup/img-5.png","alt":"Windows Server 2012 (VirtualBox) — Windows Server Backup feature selected for installation"},
  {"src":"/projects/it-ops-disk-backup/img-6.png","alt":"Windows Server Backup wizard — Mise en route (getting started page)"},
  {"src":"/projects/it-ops-disk-backup/img-7.png","alt":"Windows Server Backup — Specify destination type (dedicated disk recommended)"},
  {"src":"/projects/it-ops-disk-backup/img-8.png","alt":"Windows Server Backup — Progression dialog showing backup completed (22.67 Go transferred)"},
  {"src":"/projects/it-ops-disk-backup/img-9.png","alt":"Windows Server Backup — Modify scheduled backup settings (daily 14:00, destination SRV2 DISK_01)"}
]' WHERE slug = 'it-ops-disk-backup';

-- ── CASE 9 — it-ops-workstation-setup ────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-workstation-setup/cover.png","alt":"Ninite installer running on Windows 10 — installing Chrome, Skype, Spotify, Dropbox, LibreOffice, Malwarebytes"},
  {"src":"/projects/it-ops-workstation-setup/img-2.png","alt":"Ninite + Microsoft Office 2016 installation running in parallel"},
  {"src":"/projects/it-ops-workstation-setup/img-3.png","alt":"Windows 10 installation — Preparation des fichiers pour l installation (9%)"},
  {"src":"/projects/it-ops-workstation-setup/img-4.png","alt":"Windows 10 OOBE — region selection (France)"},
  {"src":"/projects/it-ops-workstation-setup/img-5.png","alt":"Windows 10 — Cette operation peut durer plusieurs minutes (first-run configuration)"}
]' WHERE slug = 'it-ops-workstation-setup';

-- ── CASE 10 — it-ops-wifi-config ─────────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-wifi-config/cover.png","alt":"Dossier Professionnel — Activite-type 2, Exemple n1: Configurer un point d acces WIFI (TP-Link, Greta du Val d Oise)"},
  {"src":"/projects/it-ops-wifi-config/img-2.jpg","alt":"Greta training lab — network rack with switch and router equipment used during Wi-Fi configuration exercise"}
]' WHERE slug = 'it-ops-wifi-config';

-- ── CASE 11 — it-ops-roaming-profiles ────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-roaming-profiles/cover.png","alt":"Active Directory Users and Computers + Explorer showing technicien.tai.V6 roaming profile folder created on login"},
  {"src":"/projects/it-ops-roaming-profiles/img-2.png","alt":"Share permissions for Profil itinérant — Utilisateurs (EBTAI) with Modify + Read access"},
  {"src":"/projects/it-ops-roaming-profiles/img-3.png","alt":"Profil itinérant folder advanced sharing — share name and concurrent user limit set"}
]' WHERE slug = 'it-ops-roaming-profiles';

-- ── CASE 12 — it-ops-hardware-procurement ────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-hardware-procurement/cover.jpg","alt":"Greta du Val d Oise training lab — IT workstations and network equipment used during hardware procurement exercise"}
]' WHERE slug = 'it-ops-hardware-procurement';

-- ── CASE 13 — it-ops-email-config ────────────────────────────────────────────
UPDATE projects SET gallery = '[
  {"src":"/projects/it-ops-email-config/cover.png","alt":"Outlook 2016 inbox — tai7@outlook.fr account configured with test email received from tai12@outlook.fr"},
  {"src":"/projects/it-ops-email-config/img-2.png","alt":"Bienvenue dans Microsoft Outlook 2016 — account setup wizard launch screen"}
]' WHERE slug = 'it-ops-email-config';
