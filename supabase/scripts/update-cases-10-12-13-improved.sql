-- supabase/update-cases-10-12-13-improved.sql
-- Improved sections + hero_subtitle for cases 10, 12, 13
-- ─────────────────────────────────────────────────────────────────────────────

-- ══════════════════════════════════════════════════════════════════════════════
-- CASE 10 — it-ops-wifi-config  (Wi-Fi access point configuration)
-- ══════════════════════════════════════════════════════════════════════════════

-- EN
UPDATE projects SET
  hero_subtitle = 'TP-Link Access Point · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d''Oise',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["As part of the TAI training at Greta du Val d''Oise (Lycée Louis Jouvet, Taverny), I was tasked with configuring a TP-Link Wi-Fi access point from scratch. The exercise simulated a real-world scenario where a technician must set up wireless connectivity for a small office or classroom — covering both the physical network connection and the full software configuration of the AP."]},
    {"type":"metrics","title":"Equipment & Environment","items":[
      {"label":"Access point","value":"TP-Link (provided by Greta du Val d''Oise training lab)"},
      {"label":"Connection","value":"RJ45 cable from AP to LAN switch"},
      {"label":"Default admin UI","value":"http://192.168.0.1 (default gateway)"},
      {"label":"Configuration method","value":"Web browser — TP-Link admin panel"},
      {"label":"Supervisor","value":"Marc HAZAN (training instructor)"},
      {"label":"Work mode","value":"Autonomous — independent configuration"}
    ]},
    {"type":"timeline","title":"Configuration procedure","steps":[
      {"title":"Physical connection","description":"Connected the TP-Link access point to the lab network switch via RJ45. Powered on the device and confirmed LED activity indicating link establishment."},
      {"title":"Access the admin interface","description":"Opened a web browser and navigated to the default gateway (http://192.168.0.1). Entered the default credentials provided by the manufacturer (printed on the device label) to access the TP-Link configuration panel."},
      {"title":"WAN addressing","description":"In the WAN settings, configured the address type: chose automatic (DHCP) to obtain an IP from the upstream router, or set a static IP if required by the lab network topology. Verified that the AP obtained a valid WAN address."},
      {"title":"LAN & DHCP","description":"In the LAN settings, confirmed the AP''s local IP and subnet mask. Enabled the integrated DHCP server to automatically assign IP addresses to wireless clients connecting to the AP."},
      {"title":"Wireless network (SSID)","description":"Navigated to the Wireless settings page. Configured the SSID (network name), selected the Wi-Fi band (2.4 GHz), chose the channel and transmission mode. Set the security mode to WPA2-PSK with a strong passphrase."},
      {"title":"MAC filtering & security","description":"Reviewed optional security settings including MAC address filtering. Saved all configurations and rebooted the access point to apply changes."},
      {"title":"Verification","description":"Connected a test device to the configured SSID using the set passphrase. Verified successful IP assignment via DHCP, confirmed internet access (ping test to 8.8.8.8), and validated the access point appeared correctly on the admin dashboard."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Connectivity","value":"Wireless network operational — test device obtained DHCP address and reached internet"},
      {"label":"Security","value":"WPA2-PSK encryption configured with custom SSID and passphrase"},
      {"label":"DHCP","value":"Integrated DHCP server distributing addresses to wireless clients"},
      {"label":"Skills","value":"TP-Link admin panel, WAN/LAN configuration, DHCP, SSID setup, WPA2, AP troubleshooting"}
    ]}
  ]'
WHERE slug = 'it-ops-wifi-config' AND locale = 'en';

-- FR
UPDATE projects SET
  hero_subtitle = 'Point d''accès TP-Link · LAN/WAN · DHCP · SSID · WPA2 · Greta du Val d''Oise',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Dans le cadre de la formation TAI au Greta du Val d''Oise (Lycée Louis Jouvet, Taverny), j''ai été chargée de configurer un point d''accès Wi-Fi TP-Link de A à Z. L''exercice simulait un scénario réel où un technicien doit déployer la connectivité sans fil pour un petit bureau ou une salle de formation — couvrant à la fois le raccordement physique et la configuration logicielle complète du point d''accès."]},
    {"type":"metrics","title":"Matériel & environnement","items":[
      {"label":"Point d''accès","value":"TP-Link (fourni par le labo Greta du Val d''Oise)"},
      {"label":"Connexion","value":"Câble RJ45 du PA vers le switch LAN du labo"},
      {"label":"Interface admin par défaut","value":"http://192.168.0.1 (passerelle par défaut)"},
      {"label":"Méthode de configuration","value":"Navigateur web — panneau d''administration TP-Link"},
      {"label":"Formateur","value":"Marc HAZAN"},
      {"label":"Mode de travail","value":"En autonomie"}
    ]},
    {"type":"timeline","title":"Procédure de configuration","steps":[
      {"title":"Connexion physique","description":"Branchement du point d''accès TP-Link au switch réseau du labo via câble RJ45. Mise sous tension et vérification des LEDs indiquant l''établissement du lien réseau."},
      {"title":"Accès à l''interface d''administration","description":"Ouverture d''un navigateur web et navigation vers la passerelle par défaut (http://192.168.0.1). Saisie des identifiants par défaut du constructeur (inscrits sur l''étiquette de l''appareil) pour accéder au panneau de configuration TP-Link."},
      {"title":"Adressage WAN","description":"Dans les paramètres WAN, configuration du type d''adresse : mode automatique (DHCP) pour obtenir une IP du routeur amont, ou IP statique selon la topologie du labo. Vérification de l''obtention d''une adresse WAN valide."},
      {"title":"LAN & DHCP","description":"Dans les paramètres LAN, confirmation de l''adresse IP locale du PA et du masque de sous-réseau. Activation du serveur DHCP intégré pour l''attribution automatique d''adresses IP aux clients Wi-Fi se connectant au PA."},
      {"title":"Réseau sans fil (SSID)","description":"Navigation vers les paramètres Wi-Fi. Configuration du SSID (nom du réseau), sélection de la bande (2,4 GHz), du canal et du mode de transmission. Sécurité configurée en WPA2-PSK avec une phrase de passe robuste."},
      {"title":"Filtrage MAC & sécurité","description":"Consultation des paramètres optionnels de sécurité incluant le filtrage par adresse MAC. Sauvegarde de la configuration et redémarrage du point d''accès pour appliquer les modifications."},
      {"title":"Vérification","description":"Connexion d''un appareil test au SSID configuré avec le mot de passe défini. Vérification de l''attribution DHCP, confirmation de l''accès internet (ping 8.8.8.8) et validation du point d''accès dans le tableau de bord d''administration."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Connectivité","value":"Réseau sans fil opérationnel — l''appareil test a obtenu une adresse DHCP et atteint Internet"},
      {"label":"Sécurité","value":"Chiffrement WPA2-PSK configuré avec SSID et phrase de passe personnalisés"},
      {"label":"DHCP","value":"Serveur DHCP intégré distribuant les adresses aux clients Wi-Fi"},
      {"label":"Compétences","value":"Panneau admin TP-Link, configuration WAN/LAN, DHCP, paramétrage SSID, WPA2, dépannage PA"}
    ]}
  ]'
WHERE slug = 'it-ops-wifi-config' AND locale = 'fr';

-- ══════════════════════════════════════════════════════════════════════════════
-- CASE 12 — it-ops-hardware-procurement  (Hardware procurement quote)
-- ══════════════════════════════════════════════════════════════════════════════

-- EN
UPDATE projects SET
  hero_subtitle = 'Hardware Sizing · Excel Devis · Component Research · Greta du Val d''Oise',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["As part of the TAI training at Greta du Val d''Oise, I was given a client brief describing a workstation use case (office productivity + light virtualization) and asked to produce a complete hardware procurement quote (devis). The exercise covered the full sourcing workflow: identifying technical requirements, researching compatible components, validating compatibility, comparing suppliers and prices, and formalizing the quote in a structured Excel document — the standard deliverable in professional IT procurement."]},
    {"type":"text","title":"Client brief","paragraphs":["The client required a mid-range desktop workstation suitable for: daily office productivity (Office suite, browser, email), running 1–2 VMs simultaneously (VirtualBox for testing), local storage of professional files, and multi-monitor support. Budget constraint: under 1 000 € ex-VAT. The machine would join an existing Windows Active Directory domain."]},
    {"type":"timeline","title":"Procurement process","steps":[
      {"title":"Requirements analysis","description":"Read and analysed the client brief to extract hardware constraints: minimum RAM for virtualization (16 GB), SSD for OS responsiveness, discrete or integrated GPU for dual-monitor, compatibility with Windows 11 Pro, and standard ATX tower form factor for easy maintenance."},
      {"title":"Component research","description":"Used French B2B supplier catalogues (LDLC Pro, Materiel.net, Inmac Wstore) to identify candidate components for each category: CPU, motherboard, RAM, storage, PSU, case, and GPU (or verified iGPU sufficiency). Checked technical sheets for compatibility (socket, DDR generation, PCIe lanes)."},
      {"title":"Compatibility validation","description":"Cross-checked CPU–motherboard socket compatibility, RAM generation and speed support, storage interface (M.2 NVMe vs SATA), and PSU wattage adequacy using an estimated TDP calculator. Verified that Windows 11 hardware requirements (TPM 2.0, Secure Boot, minimum CPU list) were met."},
      {"title":"Quote formalisation","description":"Entered all selected components into a structured Excel devis: reference, supplier, unit price ex-VAT, quantity, total ex-VAT, VAT (20%), and total inc-VAT. Added a summary row with the grand total and verified the budget compliance. The quote was presented for instructor review."}
    ]},
    {"type":"metrics","title":"Quote summary","items":[
      {"label":"Form factor","value":"ATX mid-tower desktop workstation"},
      {"label":"CPU","value":"AMD Ryzen 5 or Intel Core i5 (12th/13th gen) — selected based on price/performance"},
      {"label":"RAM","value":"16 GB DDR4 (2× 8 GB) — upgradeable to 32 GB"},
      {"label":"Storage","value":"512 GB M.2 NVMe SSD (OS) + 1 TB HDD (data)"},
      {"label":"OS","value":"Windows 11 Pro (OEM licence included in quote)"},
      {"label":"Budget","value":"Under 1 000 € ex-VAT — budget compliant"},
      {"label":"Deliverable","value":"Excel quote with references, unit prices, quantities, totals ex/inc VAT"},
      {"label":"Skills","value":"Hardware sizing, compatibility research, B2B procurement, Excel devis, supplier comparison"}
    ]}
  ]'
WHERE slug = 'it-ops-hardware-procurement' AND locale = 'en';

-- FR
UPDATE projects SET
  hero_subtitle = 'Dimensionnement matériel · Devis Excel · Recherche composants · Greta du Val d''Oise',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Dans le cadre de la formation TAI au Greta du Val d''Oise, j''ai reçu un cahier des charges client décrivant un cas d''usage de poste de travail (productivité bureautique + virtualisation légère) et j''ai dû produire un devis matériel complet. L''exercice couvrait l''intégralité du processus d''approvisionnement : identification des besoins techniques, recherche de composants compatibles, validation des compatibilités, comparaison fournisseurs/prix et formalisation du devis dans un tableau Excel structuré — livrable standard en contexte professionnel."]},
    {"type":"text","title":"Cahier des charges client","paragraphs":["Le client souhaitait un poste de travail bureau milieu de gamme adapté à : la bureautique quotidienne (suite Office, navigateur, messagerie), l''exécution de 1 à 2 VM simultanées (VirtualBox pour tests), le stockage local de fichiers professionnels, et le support multi-moniteurs. Contrainte budgétaire : moins de 1 000 € HT. Le poste devait rejoindre un domaine Active Directory Windows existant."]},
    {"type":"timeline","title":"Processus d''approvisionnement","steps":[
      {"title":"Analyse des besoins","description":"Lecture et analyse du cahier des charges pour extraire les contraintes matérielles : RAM minimale pour la virtualisation (16 Go), SSD pour la réactivité de l''OS, GPU discret ou iGPU pour le double écran, compatibilité Windows 11 Pro, et format ATX tour standard pour faciliter la maintenance."},
      {"title":"Recherche de composants","description":"Consultation des catalogues fournisseurs B2B français (LDLC Pro, Materiel.net, Inmac Wstore) pour identifier les composants candidats dans chaque catégorie : CPU, carte mère, RAM, stockage, alimentation, boîtier et GPU (ou vérification de la suffisance du GPU intégré). Vérification des fiches techniques pour les compatibilités (socket, génération DDR, lignes PCIe)."},
      {"title":"Validation des compatibilités","description":"Vérification croisée de la compatibilité socket CPU–carte mère, génération et vitesse RAM supportées, interface de stockage (M.2 NVMe ou SATA), et adéquation de la puissance de l''alimentation (calcul TDP estimé). Vérification du respect des prérequis Windows 11 (TPM 2.0, Secure Boot, liste des CPU compatibles)."},
      {"title":"Formalisation du devis","description":"Saisie de tous les composants sélectionnés dans un tableau Excel structuré : référence, fournisseur, prix unitaire HT, quantité, total HT, TVA (20 %) et total TTC. Ajout d''une ligne récapitulative avec le montant global et vérification de la conformité budgétaire. Devis présenté au formateur pour validation."}
    ]},
    {"type":"metrics","title":"Récapitulatif du devis","items":[
      {"label":"Format","value":"Tour ATX — poste de travail de bureau"},
      {"label":"CPU","value":"AMD Ryzen 5 ou Intel Core i5 (12e/13e gen) — sélectionné selon rapport qualité/prix"},
      {"label":"RAM","value":"16 Go DDR4 (2× 8 Go) — évolutif jusqu''à 32 Go"},
      {"label":"Stockage","value":"512 Go SSD M.2 NVMe (OS) + 1 To HDD (données)"},
      {"label":"OS","value":"Windows 11 Pro (licence OEM incluse dans le devis)"},
      {"label":"Budget","value":"Moins de 1 000 € HT — conforme à l''enveloppe"},
      {"label":"Livrable","value":"Devis Excel avec références, prix unitaires, quantités, totaux HT/TTC"},
      {"label":"Compétences","value":"Dimensionnement matériel, recherche compatibilité, approvisionnement B2B, devis Excel, comparaison fournisseurs"}
    ]}
  ]'
WHERE slug = 'it-ops-hardware-procurement' AND locale = 'fr';

-- ══════════════════════════════════════════════════════════════════════════════
-- CASE 13 — it-ops-email-config  (Outlook 2016 email configuration)
-- ══════════════════════════════════════════════════════════════════════════════

-- EN
UPDATE projects SET
  hero_subtitle = 'Outlook 2016 · IMAP/Exchange · User Onboarding · Email Provisioning · Greta du Val d''Oise',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["As part of the TAI training at Greta du Val d''Oise, I completed an end-user email provisioning exercise using Microsoft Outlook 2016. The scenario mirrors a real-world IT technician task: a new employee arrives on their first day, their workstation is already set up (Windows 10, Office 2016 installed), and the technician must configure their professional email account so they can start working immediately. The objective was to configure a Microsoft/Exchange account (tai7@outlook.fr) and validate delivery by sending and receiving a test email with a peer account (tai12@outlook.fr)."]},
    {"type":"timeline","title":"Configuration procedure","steps":[
      {"title":"Launch Outlook 2016","description":"Opened Microsoft Outlook 2016 for the first time on the provisioned workstation. The welcome wizard launched automatically: ''Bienvenue dans Microsoft Outlook 2016 — Au cours des prochaines étapes, nous allons ajouter votre compte de messagerie.''"},
      {"title":"Add a new email account","description":"Clicked ''Suivant'' to proceed with account addition. Entered the user''s name, email address (tai7@outlook.fr), and password. Outlook 2016 supports both manual (IMAP/SMTP/Exchange) and automatic account discovery."},
      {"title":"Automatic account configuration","description":"Outlook''s auto-discovery feature contacted Microsoft''s servers to automatically detect the correct server settings (Exchange ActiveSync protocol for Outlook.com accounts). No manual server entry was required — the wizard completed account setup automatically."},
      {"title":"Verification — send & receive","description":"Once the account was configured, sent a test email from tai7@outlook.fr to tai12@outlook.fr (peer account). Confirmed successful delivery by switching to the tai12 account and verifying receipt of the message in the inbox. Email subject: ''Test'' — confirmed bidirectional communication."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Account configured","value":"tai7@outlook.fr — Outlook 2016 profile created and fully operational"},
      {"label":"Protocol","value":"Exchange ActiveSync (auto-discovered via Outlook account wizard)"},
      {"label":"Validation","value":"Test email sent to tai12@outlook.fr and confirmed received in inbox"},
      {"label":"User ready","value":"End-user inbox, calendar and contacts immediately accessible in Outlook"},
      {"label":"Scenario","value":"New employee Day 1 onboarding — email ready within 5 minutes of workstation handover"},
      {"label":"Skills","value":"Outlook 2016 configuration, Exchange/IMAP account setup, email provisioning, end-user onboarding"}
    ]}
  ]'
WHERE slug = 'it-ops-email-config' AND locale = 'en';

-- FR
UPDATE projects SET
  hero_subtitle = 'Outlook 2016 · IMAP/Exchange · Onboarding utilisateur · Provisioning messagerie · Greta du Val d''Oise',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Dans le cadre de la formation TAI au Greta du Val d''Oise, j''ai réalisé un exercice de provisioning de messagerie pour utilisateur final avec Microsoft Outlook 2016. Le scénario reproduit une tâche réelle de technicien IT : un nouvel employé arrive le premier jour, son poste est déjà installé (Windows 10, Office 2016), et le technicien doit configurer son compte de messagerie professionnel pour qu''il soit opérationnel immédiatement. L''objectif était de configurer un compte Microsoft/Exchange (tai7@outlook.fr) et de valider la communication en envoyant et recevant un email de test avec un compte pair (tai12@outlook.fr)."]},
    {"type":"timeline","title":"Procédure de configuration","steps":[
      {"title":"Lancer Outlook 2016","description":"Ouverture de Microsoft Outlook 2016 pour la première fois sur le poste provisionné. L''assistant de bienvenue se lance automatiquement : ''Bienvenue dans Microsoft Outlook 2016 — Au cours des prochaines étapes, nous allons ajouter votre compte de messagerie.''"},
      {"title":"Ajouter un nouveau compte de messagerie","description":"Clic sur ''Suivant'' pour lancer l''ajout de compte. Saisie du nom de l''utilisateur, de l''adresse email (tai7@outlook.fr) et du mot de passe. Outlook 2016 prend en charge la configuration automatique (Exchange ActiveSync) et manuelle (IMAP/SMTP)."},
      {"title":"Configuration automatique du compte","description":"La fonction de découverte automatique d''Outlook a contacté les serveurs Microsoft pour détecter automatiquement les bons paramètres serveur (protocole Exchange ActiveSync pour les comptes Outlook.com). Aucune saisie manuelle de serveur n''a été nécessaire — l''assistant a finalisé la configuration automatiquement."},
      {"title":"Vérification — envoi et réception","description":"Une fois le compte configuré, envoi d''un email de test depuis tai7@outlook.fr vers tai12@outlook.fr (compte pair). Confirmation de la bonne réception en basculant sur le compte tai12 et en vérifiant la présence du message dans la boîte de réception. Objet : ''Test'' — communication bidirectionnelle validée."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Compte configuré","value":"tai7@outlook.fr — profil Outlook 2016 créé et pleinement opérationnel"},
      {"label":"Protocole","value":"Exchange ActiveSync (détecté automatiquement via l''assistant de compte Outlook)"},
      {"label":"Validation","value":"Email de test envoyé à tai12@outlook.fr et confirmé reçu dans la boîte de réception"},
      {"label":"Utilisateur prêt","value":"Boîte mail, calendrier et contacts immédiatement accessibles dans Outlook"},
      {"label":"Scénario","value":"Onboarding Jour 1 nouvel employé — messagerie opérationnelle en moins de 5 minutes après remise du poste"},
      {"label":"Compétences","value":"Configuration Outlook 2016, paramétrage compte Exchange/IMAP, provisioning messagerie, onboarding utilisateur"}
    ]}
  ]'
WHERE slug = 'it-ops-email-config' AND locale = 'fr';
