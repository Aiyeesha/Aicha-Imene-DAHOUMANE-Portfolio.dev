-- supabase/update-cases-8-to-13.sql  [CORRECTED — correct section types]
-- Section types accepted by the detail page:
--   "text"     → { title, paragraphs: string[] }
--   "metrics"  → { title, items: [{label, value, note?}] }
--   "timeline" → { title, steps: [{title, description}] }
--   "bullets"  → { title, items: string[] }
-- -----------------------------------------------------------

-- ════════════════════════════════════════════════════════
-- n°8 — it-ops-disk-backup
-- ════════════════════════════════════════════════════════
UPDATE projects SET
  hero_subtitle = 'AOMEI Partition Assistant · AOMEI Backupper · Windows Server 2012 Backup · VirtualBox',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Training exercise at Greta du Val d''Oise (Lycée Louis Jouvet, Taverny) under trainer [formateur]. The task covered two VMs in VirtualBox: a Windows 10 client VM (disk partitioning + backup with AOMEI tools) and a Windows Server 2012 VM (Windows Server Backup feature + scheduled backup)."]},
    {"type":"timeline","title":"Procedure","steps":[
      {"title":"Partition resize — AOMEI Partition Assistant","description":"Opened AOMEI Partition Assistant. Right-clicked partition E: and chose Resize/Move. Dragged the slider to reduce E: from 50.04 GB to 47.71 GB (NTFS, 4 KB cluster, Disk 3). Clicked Apply to commit the pending operation."},
      {"title":"Disk backup — AOMEI Backupper","description":"Opened AOMEI Backupper Standard → Backup → Disk Backup. Named the task, selected the source disks, chose a destination path, and started the backup. Operation completed successfully."},
      {"title":"Install Windows Server Backup role","description":"On the Windows Server 2012 VM: Server Manager → Manage → Add Roles and Features. Skipped server roles, checked ''Windows Server Backup'' in the Features list. Enabled auto-restart and clicked Install."},
      {"title":"Configure scheduled backup","description":"Launched Windows Server Backup from the Tools menu. Added a dedicated 60 GB virtual disk as destination. Configured a scheduled backup: full recovery + system state, VSS full backup, daily at 14:00. Backup ran and transferred 22.67 GB to SRV2 2022_03_21 13:18 DISK_01."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Partitioning","value":"E: resized 50.04 GB → 47.71 GB without data loss"},
      {"label":"Client backup","value":"Full disk image created with AOMEI Backupper — success"},
      {"label":"Server backup","value":"Scheduled daily at 14:00 — 22.67 GB transferred on first run"},
      {"label":"Skills","value":"AOMEI Partition Assistant, AOMEI Backupper, Windows Server Backup, VirtualBox"}
    ]}
  ]'
WHERE slug = 'it-ops-disk-backup' AND locale = 'en';

UPDATE projects SET
  hero_subtitle = 'AOMEI Partition Assistant · AOMEI Backupper · Sauvegarde Windows Server 2012 · VirtualBox',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Exercice de formation au Greta du Val d''Oise (Lycée Louis Jouvet, Taverny) sous la direction de [formateur]. L''exercice couvrait deux VM VirtualBox : une VM cliente Windows 10 (partitionnement + sauvegarde avec les outils AOMEI) et une VM serveur Windows Server 2012 (installation du rôle Sauvegarde Windows Server + sauvegarde planifiée)."]},
    {"type":"timeline","title":"Procédure","steps":[
      {"title":"Redimensionnement — AOMEI Partition Assistant","description":"Ouverture d''AOMEI Partition Assistant. Clic droit sur la partition E: → Redimensionner/Déplacer. Glissement du curseur pour réduire E: de 50,04 Go à 47,71 Go (NTFS, cluster 4 Ko, Disque 3). Clic sur Appliquer pour valider."},
      {"title":"Sauvegarde disque — AOMEI Backupper","description":"Ouverture d''AOMEI Backupper → Sauvegarder → Sauvegarde de disque. Nommage de la tâche, sélection des disques source, choix de la destination et démarrage. Opération terminée avec succès."},
      {"title":"Installation du rôle Sauvegarde Windows Server","description":"Gestionnaire de serveur → Gérer → Ajouter des rôles et fonctionnalités. Coche de ''Sauvegarde Windows Server'' dans les fonctionnalités. Activation du redémarrage automatique, puis Installer."},
      {"title":"Configuration de la sauvegarde planifiée","description":"Lancement de l''utilitaire Sauvegarde Windows Server. Ajout d''un disque virtuel dédié de 60 Go. Configuration : récupération complète + état du système, VSS complète, tous les jours à 14h00. Sauvegarde exécutée : 22,67 Go transférés vers SRV2 2022_03_21 13:18 DISK_01."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Partitionnement","value":"E: réduite de 50,04 Go à 47,71 Go sans perte de données"},
      {"label":"Sauvegarde client","value":"Image disque complète créée avec AOMEI Backupper — réussie"},
      {"label":"Sauvegarde serveur","value":"Planifiée quotidiennement à 14h00 — 22,67 Go transférés au premier lancement"},
      {"label":"Compétences","value":"AOMEI Partition Assistant, AOMEI Backupper, Sauvegarde Windows Server, VirtualBox"}
    ]}
  ]'
WHERE slug = 'it-ops-disk-backup' AND locale = 'fr';


-- ════════════════════════════════════════════════════════
-- n°9 — it-ops-workstation-setup
-- ════════════════════════════════════════════════════════
UPDATE projects SET
  hero_subtitle = 'Windows 10 Pro · Ninite · Office 2016 · BIOS · Driver setup',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Training exercise at Greta du Val d''Oise under trainer [formateur]. A client brought in an extremely slow HP laptop with no data to recover. The task was a full workstation rebuild: OS reinstall, driver validation, batch software deployment, and finalization."]},
    {"type":"timeline","title":"Procedure","steps":[
      {"title":"BIOS & USB boot","description":"Entered BIOS (F2/DEL), changed boot order to place the USB key (Windows 10 Pro ISO) first. Saved with F10 and rebooted."},
      {"title":"Windows 10 Pro installation","description":"Selected French language, Install, then Custom. Chose Windows 10 Pro 64-bit with an activation key provided by the trainer. Accepted the license, created the user account, and completed the OOBE (region France, Cortana, Microsoft Hello, geolocation)."},
      {"title":"Driver verification","description":"Opened Device Manager and confirmed audio, network (Ethernet + Wi-Fi), and GPU drivers were correctly installed. Connected to the network and installed antivirus."},
      {"title":"Batch software deployment via Ninite","description":"Used Ninite.com to batch-install Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15, and MalwareBytes in one unattended run (no toolbars, no clicks). Installed Office 2016 Professional Plus simultaneously."},
      {"title":"Finalization","description":"Configured desktop shortcuts, wallpaper, and Windows Backup. Workstation validated by trainer."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"OS","value":"Windows 10 Pro 64-bit clean install — OOBE completed, all drivers validated"},
      {"label":"Software","value":"7+ apps deployed via Ninite — no toolbars, no user interaction required"},
      {"label":"Office","value":"Office 2016 Pro Plus installed and activated"},
      {"label":"Skills","value":"BIOS, Windows 10 install, driver management, Ninite batch deployment"}
    ]}
  ]'
WHERE slug = 'it-ops-workstation-setup' AND locale = 'en';

UPDATE projects SET
  hero_subtitle = 'Windows 10 Pro · Ninite · Office 2016 · BIOS · Installation pilotes',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Exercice de formation au Greta du Val d''Oise sous la direction de [formateur]. Un client a apporté un portable HP extrêmement lent, sans données à récupérer. La mission : remise à neuf complète — réinstallation de l''OS, validation des pilotes, déploiement en masse de logiciels et configuration finale."]},
    {"type":"timeline","title":"Procédure","steps":[
      {"title":"BIOS & démarrage USB","description":"Entrée dans le BIOS (F2/DEL), modification de l''ordre de démarrage pour placer la clé USB (ISO Windows 10 Pro) en premier. Sauvegarde F10 et redémarrage."},
      {"title":"Installation de Windows 10 Pro","description":"Sélection de la langue (Français), Installation, puis installation personnalisée. Windows 10 Pro 64 bits avec clé d''activation fournie par le formateur. Acceptation de la licence, création du compte utilisateur, finalisation de l''OOBE (région France, Cortana, Microsoft Hello, géolocalisation)."},
      {"title":"Vérification des pilotes","description":"Ouverture du Gestionnaire de périphériques, confirmation des pilotes audio, réseau (Ethernet + Wi-Fi) et carte graphique. Connexion réseau et installation d''un antivirus."},
      {"title":"Déploiement en masse via Ninite","description":"Utilisation de Ninite.com pour installer Chrome, Firefox, 7-Zip, Zoom, Skype, LibreOffice, TeamViewer 15 et MalwareBytes en un seul passage sans surveillance. Installation simultanée d''Office 2016 Professionnel Plus."},
      {"title":"Finalisation","description":"Configuration des raccourcis bureau, fond d''écran et sauvegarde Windows. Poste validé par le formateur."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"OS","value":"Windows 10 Pro 64 bits installé proprement — OOBE terminé, tous les pilotes validés"},
      {"label":"Logiciels","value":"7+ applications déployées via Ninite — sans toolbars, sans interaction utilisateur"},
      {"label":"Office","value":"Office 2016 Pro Plus installé et activé"},
      {"label":"Compétences","value":"BIOS, installation Windows 10, gestion des pilotes, déploiement Ninite"}
    ]}
  ]'
WHERE slug = 'it-ops-workstation-setup' AND locale = 'fr';


-- ════════════════════════════════════════════════════════
-- n°10 — it-ops-wifi-config
-- ════════════════════════════════════════════════════════
UPDATE projects SET
  hero_subtitle = 'TP-Link Wi-Fi access point · Router mode · DHCP · WPA2',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Training exercise at Greta du Val d''Oise under trainer [formateur]. The task was to configure a TP-Link Wi-Fi access point in router mode and verify internet connectivity from a wireless client."]},
    {"type":"timeline","title":"Configuration steps","steps":[
      {"title":"Physical setup","description":"Powered on the access point and connected it to the network via Ethernet cable."},
      {"title":"Admin interface login","description":"Typed the device default IP in the browser and logged in with factory credentials."},
      {"title":"WAN & LAN configuration","description":"Selected Router mode. Configured WAN as DHCP (automatic from upstream). Set a static IP on the LAN side. Enabled DHCP on the LAN with a scope matching the LAN subnet. Added optional static leases via client MAC addresses."},
      {"title":"Wi-Fi security","description":"Defined the SSID, selected WPA2 security type, and set a password. Saved the configuration at each step."},
      {"title":"Verification","description":"Checked the access point status page and tested internet connectivity from a wireless device — confirmed working."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Connectivity","value":"Wi-Fi in router mode — internet access confirmed from wireless client"},
      {"label":"DHCP","value":"LAN scope active, IPs assigned automatically to wireless clients"},
      {"label":"Security","value":"WPA2 with custom SSID and password"},
      {"label":"Skills","value":"Access point setup, router mode, WAN/LAN addressing, DHCP, Wi-Fi security"}
    ]}
  ]'
WHERE slug = 'it-ops-wifi-config' AND locale = 'en';

UPDATE projects SET
  hero_subtitle = 'Point d''accès Wi-Fi TP-Link · Mode routeur · DHCP · WPA2',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Exercice de formation au Greta du Val d''Oise sous la supervision de [formateur]. La mission : configurer un point d''accès Wi-Fi TP-Link en mode routeur et vérifier la connectivité Internet depuis un client sans fil."]},
    {"type":"timeline","title":"Étapes de configuration","steps":[
      {"title":"Mise en place physique","description":"Alimentation du point d''accès et connexion au réseau par câble Ethernet."},
      {"title":"Connexion à l''interface d''administration","description":"Saisie de l''adresse IP par défaut dans le navigateur et identification avec les identifiants constructeur."},
      {"title":"Configuration WAN & LAN","description":"Sélection du mode Routeur. WAN en DHCP (IP automatique depuis le réseau amont). IP statique côté LAN. Activation du DHCP LAN avec une étendue correspondant au sous-réseau. Ajout de baux statiques optionnels via les adresses MAC."},
      {"title":"Sécurité Wi-Fi","description":"Définition du SSID, sélection du type WPA2 et paramétrage d''un mot de passe. Sauvegarde de la configuration à chaque étape."},
      {"title":"Vérification","description":"Contrôle du statut du point d''accès et test de la connectivité Internet depuis un périphérique sans fil — confirmé fonctionnel."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Connectivité","value":"Wi-Fi en mode routeur — accès Internet confirmé depuis un client sans fil"},
      {"label":"DHCP","value":"Étendue LAN active, IP attribuées automatiquement aux clients Wi-Fi"},
      {"label":"Sécurité","value":"WPA2 avec SSID et mot de passe personnalisés"},
      {"label":"Compétences","value":"Configuration point d''accès, mode routeur, adressage WAN/LAN, DHCP, sécurité Wi-Fi"}
    ]}
  ]'
WHERE slug = 'it-ops-wifi-config' AND locale = 'fr';


-- ════════════════════════════════════════════════════════
-- n°11 — it-ops-roaming-profiles
-- ════════════════════════════════════════════════════════
UPDATE projects SET
  hero_subtitle = 'Windows Server 2016 · AD DS · Roaming Profiles · ebtai.fr domain',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Training exercise at Greta du Val d''Oise under trainer [formateur]. Configured roaming profiles on a Windows Server 2016 domain controller (ebtai.fr) and verified synchronization from a Windows 10 client VM, both in VirtualBox."]},
    {"type":"timeline","title":"Procedure","steps":[
      {"title":"Create shared folder on server","description":"Created directory ''Profil itinérant'' on C:. Properties → Sharing → Advanced Sharing. Enabled share with name ''Profil itinérant''."},
      {"title":"Configure share permissions","description":"Clicked Permissions. Removed ''Everyone''. Added EBTAI\\Utilisateurs (AD Users group) with Modify + Read. Clicked Apply."},
      {"title":"Configure NTFS permissions","description":"Right-clicked the folder → Security. Verified Full Control was granted to allow profile ownership. Network path: \\\\serveur\\Profil itinérant."},
      {"title":"Set profile path in Active Directory","description":"Opened AD Users and Computers (ebtai.fr). Right-clicked user ''technicien'' → Properties → Profile tab. Set Profile path: \\\\DC1\\Profil itinérants\\%username%. Applied and closed."},
      {"title":"Verify from client VM","description":"Logged into Windows 10 client as EBTAI\\technicien. Server share showed new subfolder ''technicien.tai.V6'' (15/06/2022) — roaming profile linked and synchronized."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Shared folder","value":"Profil itinérant — EBTAI\\Utilisateurs: Modify + Read"},
      {"label":"AD profile path","value":"\\\\DC1\\Profil itinérants\\%username%"},
      {"label":"Verification","value":"technicien.tai.V6 subfolder auto-created on first client login"},
      {"label":"Skills","value":"AD DS, roaming profiles, NTFS permissions, shared folder, %username% variable"}
    ]}
  ]'
WHERE slug = 'it-ops-roaming-profiles' AND locale = 'en';

UPDATE projects SET
  hero_subtitle = 'Windows Server 2016 · AD DS · Profils itinérants · domaine ebtai.fr',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Exercice de formation au Greta du Val d''Oise sous la supervision de [formateur]. Configuration de profils itinérants sur un contrôleur de domaine Windows Server 2016 (ebtai.fr) et vérification depuis une VM cliente Windows 10, les deux sous VirtualBox."]},
    {"type":"timeline","title":"Procédure","steps":[
      {"title":"Création du dossier partagé sur le serveur","description":"Création du répertoire ''Profil itinérant'' sur C:. Propriétés → Partage → Partage avancé. Activation du partage avec le nom ''Profil itinérant''."},
      {"title":"Configuration des autorisations de partage","description":"Clic sur Autorisations. Suppression de ''Tout le monde''. Ajout de EBTAI\\Utilisateurs avec Modifier + Lire. Clic sur Appliquer."},
      {"title":"Configuration des permissions NTFS","description":"Clic droit sur le dossier → Sécurité. Vérification du Contrôle total pour l''appropriation des profils. Chemin réseau : \\\\serveur\\Profil itinérant."},
      {"title":"Paramétrage du chemin de profil dans AD","description":"Ouverture d''Utilisateurs et ordinateurs AD (ebtai.fr). Clic droit sur ''technicien'' → Propriétés → onglet Profil. Chemin : \\\\DC1\\Profil itinérants\\%username%. Appliquer et fermer."},
      {"title":"Vérification depuis la VM cliente","description":"Connexion à Windows 10 avec EBTAI\\technicien. Le sous-dossier ''technicien.tai.V6'' est apparu dans le partage (15/06/2022) — profil itinérant lié et synchronisé."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Dossier partagé","value":"Profil itinérant — EBTAI\\Utilisateurs : Modifier + Lire"},
      {"label":"Chemin AD","value":"\\\\DC1\\Profil itinérants\\%username%"},
      {"label":"Vérification","value":"Sous-dossier technicien.tai.V6 créé automatiquement à la première connexion"},
      {"label":"Compétences","value":"AD DS, profils itinérants, permissions NTFS, dossier partagé, variable %username%"}
    ]}
  ]'
WHERE slug = 'it-ops-roaming-profiles' AND locale = 'fr';


-- ════════════════════════════════════════════════════════
-- n°12 — it-ops-hardware-procurement
-- ════════════════════════════════════════════════════════
UPDATE projects SET
  hero_subtitle = 'LDLC Pro · Excel · Component sizing · Hardware quote',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Group training exercise (team of 4) at Greta du Val d''Oise under trainer Julien CHARLES-NICOLAS. The task was to respond to a procurement brief for multiple desktop PCs: select compatible components on LDLC Pro and formalize a quote in Excel."]},
    {"type":"bullets","title":"Process","items":[
      "Analyzed client requirements: use case, budget, performance needs",
      "Browsed LDLC Pro and selected components: case, motherboard, CPU, RAM, HDD/SSD, PSU",
      "Compared options on price/performance ratio, socket/form-factor compatibility, and warranty",
      "Compiled parts into Excel: reference, name, unit price (excl. tax), quantity, line total",
      "Presented the completed quote to the trainer for review and validation"
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Deliverable","value":"Structured Excel quote with references, prices, quantities, and totals"},
      {"label":"Skills","value":"Hardware sizing, compatibility analysis, LDLC Pro sourcing, Excel quote formatting"},
      {"label":"Teamwork","value":"Group of 4 — collective component selection and validation"}
    ]}
  ]'
WHERE slug = 'it-ops-hardware-procurement' AND locale = 'en';

UPDATE projects SET
  hero_subtitle = 'LDLC Pro · Excel · Dimensionnement composants · Devis matériel',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Exercice de formation en groupe (équipe de 4) au Greta du Val d''Oise sous la supervision de Julien CHARLES-NICOLAS. La mission : répondre à un cahier des charges pour l''acquisition de plusieurs PC bureautiques — sélectionner les composants sur LDLC Pro et formaliser un devis sous Excel."]},
    {"type":"bullets","title":"Démarche","items":[
      "Analyse des besoins techniques du client : usage, budget, performances attendues",
      "Navigation sur LDLC Pro pour sélectionner les composants : boîtier, carte mère, CPU, RAM, disque dur/SSD, alimentation",
      "Comparaison selon le rapport qualité/prix, la compatibilité (socket, format) et la garantie",
      "Compilation dans Excel : référence, désignation, prix unitaire HT, quantité, total ligne",
      "Présentation du devis finalisé au formateur pour révision et validation"
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Livrable","value":"Devis Excel structuré avec références, prix, quantités et totaux"},
      {"label":"Compétences","value":"Dimensionnement matériel, compatibilité, approvisionnement LDLC Pro, devis Excel"},
      {"label":"Travail en équipe","value":"Groupe de 4 — sélection et validation collective des composants"}
    ]}
  ]'
WHERE slug = 'it-ops-hardware-procurement' AND locale = 'fr';


-- ════════════════════════════════════════════════════════
-- n°13 — it-ops-email-config
-- ════════════════════════════════════════════════════════
UPDATE projects SET
  hero_subtitle = 'Outlook 2016 · Microsoft account · Email configuration · User support',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Training exercise at Greta du Val d''Oise under trainer Julien CHARLES-NICOLAS. The task was twofold: write a step-by-step user support script for configuring Outlook 2016, then apply the procedure hands-on with a real Microsoft account (tai7@outlook.fr)."]},
    {"type":"timeline","title":"Procedure","steps":[
      {"title":"Launch Outlook 2016","description":"Opened Microsoft Outlook 2016 and clicked through the welcome screen."},
      {"title":"Add new email account","description":"Navigated to File → Info → Account Settings → Account Settings → Email tab → New."},
      {"title":"Automatic account configuration","description":"In the Add New Account dialog: entered full name, email (tai7@outlook.fr), and password. Clicked Next — Outlook auto-configured the settings. Dialog confirmed account created. Clicked Finish then Close."},
      {"title":"Verification","description":"Inbox received a test email from tai12 greta (tai12@outlook.fr) on 23/03/2022 at 13:30 with subject ''Test envoi d''un message'' — send/receive confirmed."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Account","value":"tai7@outlook.fr configured in Outlook 2016 via automatic setup"},
      {"label":"Email test","value":"Test message received from tai12@outlook.fr — confirmed"},
      {"label":"Support script","value":"Step-by-step dialogue written covering automatic and manual setup"},
      {"label":"Skills","value":"Outlook 2016 account setup, user support communication, Microsoft account"}
    ]}
  ]'
WHERE slug = 'it-ops-email-config' AND locale = 'en';

UPDATE projects SET
  hero_subtitle = 'Outlook 2016 · Compte Microsoft · Configuration messagerie · Support utilisateur',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Exercice de formation au Greta du Val d''Oise sous la supervision de Julien CHARLES-NICOLAS. La mission était double : rédiger un script de support utilisateur pour configurer un compte Outlook 2016, puis appliquer la procédure en pratique avec un vrai compte Microsoft (tai7@outlook.fr)."]},
    {"type":"timeline","title":"Procédure","steps":[
      {"title":"Lancement d''Outlook 2016","description":"Ouverture de Microsoft Outlook 2016 et navigation à travers l''écran de bienvenue."},
      {"title":"Ajout d''un nouveau compte","description":"Navigation vers Fichier → Informations → Paramètres du compte → Paramètres du compte → onglet Adresse de courrier → Nouveau."},
      {"title":"Configuration automatique du compte","description":"Dans la boîte de dialogue : renseignement du nom complet, de l''adresse email (tai7@outlook.fr) et du mot de passe. Clic sur Suivant — Outlook configure automatiquement le compte. Confirmation de création. Clic sur Terminer puis Fermer."},
      {"title":"Vérification","description":"La boîte de réception a reçu un email de tai12 greta (tai12@outlook.fr) le 23/03/2022 à 13h30, objet ''Test envoi d''un message'' — envoi/réception confirmés."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Compte","value":"tai7@outlook.fr configuré dans Outlook 2016 via configuration automatique"},
      {"label":"Test email","value":"Message de test reçu de tai12@outlook.fr — confirmé"},
      {"label":"Script support","value":"Dialogue rédigé couvrant les scénarios automatique et manuel"},
      {"label":"Compétences","value":"Configuration Outlook 2016, support utilisateur, compte Microsoft"}
    ]}
  ]'
WHERE slug = 'it-ops-email-config' AND locale = 'fr';
