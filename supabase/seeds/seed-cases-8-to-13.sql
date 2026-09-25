-- supabase/seed-cases-8-to-13.sql
-- -----------------------------------------------------------
-- Case studies n°8 to n°13 — IT Ops (Greta training)
-- All badge: training / TRAINING LAB
-- Run AFTER the unique constraint (slug, locale) exists.
-- -----------------------------------------------------------

-- ════════════════════════════════════════════════════════
-- n°8 — Disk Partitioning, Backup & Server Backup
-- slug: it-ops-disk-backup
-- ════════════════════════════════════════════════════════

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-disk-backup', 'en',
  'Disk Partitioning & Backup (AOMEI + Windows Server Backup)',
  'Training lab at Greta du Val d''Oise: partitioned a client VM disk using AOMEI Partition Assistant, performed a full disk backup with AOMEI Backupper, then installed the Windows Server Backup role on a Windows Server 2012 VM and configured a scheduled daily backup to a dedicated virtual disk.',
  'itops', ARRAY['IT Ops', 'Backup', 'Systems'],
  ARRAY['AOMEI', 'Backup', 'Windows Server', 'Windows'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Resized partition E: (50 GB → 47.71 GB) on a virtual disk using AOMEI Partition Assistant',
    'Created a full disk image backup with AOMEI Backupper Standard — operation completed successfully',
    'Installed the Windows Server Backup feature via Server Manager on Windows Server 2012',
    'Configured a scheduled daily VSS backup (14:00) to a dedicated virtual disk (22.67 GB transferred)',
    'Supervised by trainer [formateur] — Greta du Val d''Oise, Lycée Louis Jouvet (Taverny)'
  ],
  false, 80, 'published', NULL, NULL,
  'Training exercise combining client-side disk partitioning and backup (AOMEI tools) with server-side backup scheduling (Windows Server 2012 Backup role) inside VirtualBox VMs.'
)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-disk-backup', 'fr',
  'Partitionnement & Sauvegarde disque (AOMEI + Sauvegarde Windows Server)',
  'TP au Greta du Val d''Oise : partitionnement d''un disque VM client avec AOMEI Partition Assistant, sauvegarde complète du disque avec AOMEI Backupper, puis installation du rôle Sauvegarde Windows Server sur une VM Windows Server 2012 et planification d''une sauvegarde quotidienne sur disque virtuel dédié.',
  'itops', ARRAY['IT Ops', 'Backup', 'Systems'],
  ARRAY['AOMEI', 'Backup', 'Windows Server', 'Windows'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Redimensionnement de la partition E: (50 Go → 47,71 Go) sur un disque virtuel avec AOMEI Partition Assistant',
    'Création d''une image disque complète avec AOMEI Backupper Standard — opération réussie',
    'Installation de la fonctionnalité Sauvegarde Windows Server via le Gestionnaire de serveur (Windows Server 2012)',
    'Planification d''une sauvegarde VSS complète quotidienne (14h00) sur disque virtuel dédié (22,67 Go transférés)',
    'Encadrement : [formateur], formateur — Greta du Val d''Oise, Lycée Louis Jouvet (Taverny)'
  ],
  false, 80, 'published', NULL, NULL,
  'Exercice de formation combinant partitionnement et sauvegarde côté client (outils AOMEI) et planification de sauvegarde côté serveur (rôle Sauvegarde Windows Server 2012) dans des VM VirtualBox.'
)
ON CONFLICT (slug, locale) DO NOTHING;


-- ════════════════════════════════════════════════════════
-- n°9 — Workstation Setup: OS Install + Software Deployment
-- slug: it-ops-workstation-setup
-- ════════════════════════════════════════════════════════

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-workstation-setup', 'en',
  'Workstation Setup: Windows 10 Install & Software Deployment',
  'Training exercise at Greta du Val d''Oise: full rebuild of a slow HP laptop — BIOS boot order, clean Windows 10 Pro 64-bit install, driver verification, network setup, antivirus, and batch software deployment via Ninite (Chrome, Firefox, 7-zip, Zoom, Skype, LibreOffice, TeamViewer) + Office 2016 Pro Plus.',
  'itops', ARRAY['IT Ops', 'Deployment', 'Software'],
  ARRAY['Windows', 'Deployment'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Modified BIOS boot order to boot from USB and performed a clean Windows 10 Pro 64-bit install',
    'Verified drivers (audio, network, GPU) post-installation',
    'Deployed multiple applications simultaneously via Ninite (no toolbars, unattended)',
    'Installed Office 2016 Professional Plus with activation key provided by trainer',
    'Configured backup, personalization, and user account settings to finalize the workstation'
  ],
  false, 90, 'published', NULL, NULL,
  'End-to-end workstation rebuild: BIOS configuration, clean OS installation, driver validation, and batch software deployment using Ninite and Office 2016. Simulated a real client repair scenario at Greta du Val d''Oise training.'
)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-workstation-setup', 'fr',
  'Préparation poste client : Installation Windows 10 & Déploiement logiciels',
  'Exercice de formation au Greta du Val d''Oise : remise à neuf complète d''un portable HP lent — ordre de démarrage BIOS, installation propre de Windows 10 Pro 64 bits, vérification des pilotes, mise en réseau, antivirus et déploiement en masse de logiciels via Ninite (Chrome, Firefox, 7-zip, Zoom, Skype, LibreOffice, TeamViewer) + Office 2016 Pro Plus.',
  'itops', ARRAY['IT Ops', 'Deployment', 'Software'],
  ARRAY['Windows', 'Deployment'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Modification de l''ordre de démarrage BIOS pour booter sur USB et installation propre de Windows 10 Pro 64 bits',
    'Vérification des pilotes (son, réseau, carte graphique) après installation',
    'Déploiement simultané de plusieurs applications via Ninite (sans toolbars, sans interaction utilisateur)',
    'Installation d''Office 2016 Professionnel Plus avec clé d''activation fournie par le formateur',
    'Configuration de la sauvegarde, personnalisation et paramètres utilisateur pour finaliser le poste'
  ],
  false, 90, 'published', NULL, NULL,
  'Remise à neuf complète d''un poste client : configuration BIOS, installation OS propre, validation des pilotes et déploiement en masse via Ninite et Office 2016. Simulation d''un scénario réel de réparation client au Greta du Val d''Oise.'
)
ON CONFLICT (slug, locale) DO NOTHING;


-- ════════════════════════════════════════════════════════
-- n°10 — Wi-Fi Access Point Configuration
-- slug: it-ops-wifi-config
-- ════════════════════════════════════════════════════════

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-wifi-config', 'en',
  'Wi-Fi Access Point Configuration (TP-Link)',
  'Training exercise at Greta du Val d''Oise: configured a TP-Link Wi-Fi access point in router mode — WAN/LAN IP addressing, DHCP scope, SSID, WPA2 security, and connectivity verification. Supervised by trainer Marc HAZAN.',
  'itops', ARRAY['IT Ops', 'Network'],
  ARRAY['Wi‑Fi', 'DHCP', 'Routing'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Connected to access point default IP and logged in with factory credentials',
    'Configured router mode: WAN IP via DHCP, LAN static IP with DHCP scope enabled',
    'Set up SSID, WPA2 security type, and Wi-Fi password',
    'Configured optional static DHCP leases using client MAC addresses',
    'Verified internet connectivity and access point status after saving configuration'
  ],
  false, 100, 'published', NULL, NULL,
  'Hands-on TP-Link Wi-Fi access point configuration in router mode: WAN/LAN setup, DHCP, SSID and security settings. Training exercise at Greta du Val d''Oise under Marc HAZAN.'
)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-wifi-config', 'fr',
  'Configuration d''un point d''accès Wi-Fi (TP-Link)',
  'Exercice de formation au Greta du Val d''Oise : configuration d''un point d''accès Wi-Fi TP-Link en mode routeur — adressage IP WAN/LAN, étendue DHCP, SSID, sécurité WPA2 et vérification de la connectivité. Encadrement : formateur Marc HAZAN.',
  'itops', ARRAY['IT Ops', 'Network'],
  ARRAY['Wi‑Fi', 'DHCP', 'Routing'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Connexion à l''adresse IP par défaut du point d''accès et identification avec les credentials constructeur',
    'Configuration en mode routeur : IP WAN en DHCP, IP LAN statique avec étendue DHCP activée',
    'Paramétrage du SSID, type de sécurité WPA2 et mot de passe Wi-Fi',
    'Configuration de baux DHCP statiques optionnels via les adresses MAC des clients',
    'Vérification de la connectivité Internet et du statut du point d''accès après sauvegarde'
  ],
  false, 100, 'published', NULL, NULL,
  'Configuration pratique d''un point d''accès Wi-Fi TP-Link en mode routeur : paramétrage WAN/LAN, DHCP, SSID et sécurité. Exercice de formation au Greta du Val d''Oise sous la supervision de Marc HAZAN.'
)
ON CONFLICT (slug, locale) DO NOTHING;


-- ════════════════════════════════════════════════════════
-- n°11 — AD DS Roaming Profiles
-- slug: it-ops-roaming-profiles
-- ════════════════════════════════════════════════════════

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-roaming-profiles', 'en',
  'Configuring AD DS Roaming Profiles',
  'Training exercise at Greta du Val d''Oise: configured roaming profiles on a Windows Server 2016 VM in the ebtai.fr Active Directory domain — created and shared a profile folder, set NTFS and share permissions, linked user profile paths in AD, and verified profile synchronization from a Windows 10 client VM.',
  'itops', ARRAY['IT Ops', 'Identity', 'Systems'],
  ARRAY['AD DS', 'Roaming Profiles', 'Windows Server'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Created shared folder "Profil itinérant" on the server with permissions: EBTAI\\Utilisateurs (Modify + Read)',
    'Configured NTFS Full Control permissions for profile folder ownership',
    'Set user profile path in AD Users & Computers: \\\\DC1\\Profil itinérants\\%username%',
    'Verified roaming profile creation: technicien.tai.V6 folder appeared in share after first client login',
    'Domain: ebtai.fr — supervised by trainer Marc HAZAN'
  ],
  false, 110, 'published', NULL, NULL,
  'Full roaming profile setup on Windows Server 2016 / ebtai.fr domain: shared folder, NTFS permissions, AD user profile path, and client verification. Training at Greta du Val d''Oise.'
)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-roaming-profiles', 'fr',
  'Configuration des profils itinérants AD DS',
  'Exercice de formation au Greta du Val d''Oise : configuration de profils itinérants sur une VM Windows Server 2016 dans le domaine Active Directory ebtai.fr — création et partage du dossier de profils, paramétrage des permissions NTFS et de partage, liaison du chemin de profil dans l''AD, et vérification de la synchronisation depuis une VM cliente Windows 10.',
  'itops', ARRAY['IT Ops', 'Identity', 'Systems'],
  ARRAY['AD DS', 'Roaming Profiles', 'Windows Server'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Création du dossier partagé "Profil itinérant" sur le serveur avec permissions : EBTAI\\Utilisateurs (Modifier + Lire)',
    'Configuration des permissions NTFS Contrôle total pour la propriété du dossier de profils',
    'Paramétrage du chemin de profil dans Utilisateurs et ordinateurs AD : \\\\DC1\\Profil itinérants\\%username%',
    'Vérification de la création du profil itinérant : dossier technicien.tai.V6 apparu dans le partage après première connexion cliente',
    'Domaine : ebtai.fr — encadrement : formateur Marc HAZAN'
  ],
  false, 110, 'published', NULL, NULL,
  'Configuration complète de profils itinérants sur Windows Server 2016 / domaine ebtai.fr : dossier partagé, permissions NTFS, chemin de profil AD et vérification depuis le client. Formation au Greta du Val d''Oise.'
)
ON CONFLICT (slug, locale) DO NOTHING;


-- ════════════════════════════════════════════════════════
-- n°12 — Hardware Procurement Quote
-- slug: it-ops-hardware-procurement
-- ════════════════════════════════════════════════════════

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-hardware-procurement', 'en',
  'Hardware Procurement: Drafting a Multi-PC Quote',
  'Training exercise at Greta du Val d''Oise: researched and selected desktop PC components (case, motherboard, CPU, RAM, HDD, PSU) on LDLC Pro, then compiled a formal procurement quote in Excel. Group exercise under trainer Julien CHARLES-NICOLAS.',
  'itops', ARRAY['IT Ops', 'Hardware'],
  ARRAY['Procurement', 'Sizing', 'Excel'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Researched compatible desktop components on LDLC Pro based on client specifications',
    'Selected and compared components (case, motherboard, CPU, RAM, storage, PSU) for multiple units',
    'Compiled a structured procurement quote in Excel with part references, unit prices, and totals',
    'Presented the quote to the trainer for review and validation',
    'Group exercise (team of 4) — Greta du Val d''Oise, supervised by Julien CHARLES-NICOLAS'
  ],
  false, 120, 'published', NULL, NULL,
  'Hardware procurement exercise: component research on LDLC Pro and formal Excel quote for a multi-workstation acquisition. Group project at Greta du Val d''Oise training.'
)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-hardware-procurement', 'fr',
  'Devis matériel : Proposition d''acquisition de postes de travail',
  'Exercice de formation au Greta du Val d''Oise : recherche et sélection de composants PC bureautiques (boîtier, carte mère, processeur, RAM, disque dur, alimentation) sur LDLC Pro, puis élaboration d''un devis formel sous Excel. Exercice en groupe sous la supervision du formateur Julien CHARLES-NICOLAS.',
  'itops', ARRAY['IT Ops', 'Hardware'],
  ARRAY['Procurement', 'Sizing', 'Excel'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Recherche de composants bureautiques compatibles sur LDLC Pro selon le cahier des charges client',
    'Sélection et comparaison des composants (boîtier, carte mère, CPU, RAM, stockage, alimentation) pour plusieurs unités',
    'Élaboration d''un devis structuré sous Excel avec références, prix unitaires et totaux',
    'Présentation du devis au formateur pour révision et validation',
    'Exercice en groupe (équipe de 4) — Greta du Val d''Oise, encadrement : Julien CHARLES-NICOLAS'
  ],
  false, 120, 'published', NULL, NULL,
  'Exercice d''approvisionnement matériel : recherche de composants sur LDLC Pro et devis Excel formel pour l''acquisition de plusieurs postes de travail. Projet de groupe au Greta du Val d''Oise.'
)
ON CONFLICT (slug, locale) DO NOTHING;


-- ════════════════════════════════════════════════════════
-- n°13 — Outlook Email Configuration
-- slug: it-ops-email-config
-- ════════════════════════════════════════════════════════

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-email-config', 'en',
  'Configuring Outlook 2016 Email Account',
  'Training exercise at Greta du Val d''Oise: wrote a step-by-step user support script for configuring a Microsoft Outlook 2016 email account, then applied it hands-on by setting up tai7@outlook.fr in Outlook and validating message delivery from tai12@outlook.fr.',
  'itops', ARRAY['IT Ops', 'IT Support'],
  ARRAY['Outlook', 'Email'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Drafted a user support script covering the full Outlook 2016 account setup procedure',
    'Launched Outlook, navigated to File → Account Settings → New to add a new email account',
    'Configured automatic account setup: name, email address (tai7@outlook.fr), and password',
    'Verified successful configuration and received a test email from tai12@outlook.fr',
    'Supervised by trainer Julien CHARLES-NICOLAS — Greta du Val d''Oise'
  ],
  false, 130, 'published', NULL, NULL,
  'Outlook 2016 email account configuration exercise: wrote a user support dialog/script, applied it hands-on with a real Outlook account, and validated email delivery. Training at Greta du Val d''Oise.'
)
ON CONFLICT (slug, locale) DO NOTHING;

INSERT INTO projects (slug, locale, title, summary, track, categories, tags, badge, highlights, featured, sort_order, status, repo_url, live_url, content)
VALUES (
  'it-ops-email-config', 'fr',
  'Configuration d''une messagerie Outlook 2016',
  'Exercice de formation au Greta du Val d''Oise : rédaction d''un script de support utilisateur pour configurer un compte de messagerie Microsoft Outlook 2016, puis application pratique en paramétrant le compte tai7@outlook.fr dans Outlook et validation de la réception d''un message envoyé par tai12@outlook.fr.',
  'itops', ARRAY['IT Ops', 'IT Support'],
  ARRAY['Outlook', 'Email'],
  '{"tone": "training", "label": "TRAINING LAB"}',
  ARRAY[
    'Rédaction d''un script de support utilisateur couvrant la procédure complète de configuration Outlook 2016',
    'Lancement d''Outlook, navigation vers Fichier → Paramètres du compte → Nouveau pour ajouter un compte',
    'Configuration automatique du compte : nom, adresse email (tai7@outlook.fr) et mot de passe',
    'Vérification de la configuration réussie et réception d''un email de test envoyé par tai12@outlook.fr',
    'Encadrement : formateur Julien CHARLES-NICOLAS — Greta du Val d''Oise'
  ],
  false, 130, 'published', NULL, NULL,
  'Exercice de configuration d''un compte messagerie Outlook 2016 : rédaction d''un dialogue de support utilisateur, application pratique sur un vrai compte Outlook et validation de l''envoi/réception. Formation au Greta du Val d''Oise.'
)
ON CONFLICT (slug, locale) DO NOTHING;
