-- supabase/update-virtualization-lab-casestudy.sql  [CORRECTED]
-- Uses correct section types: text / timeline / metrics
-- -----------------------------------------------------------

UPDATE projects SET
  hero_subtitle = 'VMware Workstation Pro 17 · Windows Server 2022 · AD DS / DNS / DHCP / WDS',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Training lab built at home as part of a Systems & Networks program. I deployed a complete Windows Server 2022 environment inside VMware Workstation Pro 17 (Type 2 hypervisor) to replicate a real enterprise IT infrastructure: an Active Directory domain, DNS, DHCP, and automated OS deployment via WDS/PXE — all on a private VMware NAT network."]},
    {"type":"metrics","title":"Environment","items":[
      {"label":"Hypervisor","value":"VMware Workstation Pro 17 (Type 2)"},
      {"label":"Server VM","value":"DCAD22 — Windows Server 2022"},
      {"label":"Network","value":"VMware NAT — 192.168.100.0/24"},
      {"label":"Server IP","value":"192.168.100.250 (static)"},
      {"label":"Gateway","value":"192.168.100.2"},
      {"label":"DNS","value":"192.168.100.250 + 8.8.8.8 (forwarder)"},
      {"label":"Domain","value":"DP-AICHA.LAN (AD forest root)"},
      {"label":"Client","value":"Windows 10 Pro — joined as PC LYES"}
    ]},
    {"type":"timeline","title":"Setup phases","steps":[
      {"title":"Phase 1 — VM setup & domain controller promotion","description":"Installed Windows Server 2022 from ISO in VMware. Assigned static IP 192.168.100.250, set hostname DCAD22, and promoted to domain controller via the AD DS role wizard. Created the new forest root domain DP-AICHA.LAN. DNS was installed alongside AD DS with a forwarder to 8.8.8.8."},
      {"title":"Phase 2 — DHCP & WDS configuration","description":"Installed and authorized the DHCP Server role. Created scope POOL1 (192.168.100.0/24, range .1–.254, exclusions .1–.20 and .240–.254). Added DHCP option 060 PXEClient. Installed WDS, linked to the AD DS domain, imported boot image Boot\\x64\\Images\\boot.wim. WDS set to respond to all PXE clients with admin approval for unknown machines."},
      {"title":"Phase 3 — Active Directory & Group Policies","description":"Created OUs and domain user accounts: LYES (standard) and Technicien (IT admin). Applied GPOs to enforce roaming profiles and map a shared drive (\\\\DCAD22\\Partage) at logon. Shared folder permissions: Modify + Read for LYES, Read for Technicien."},
      {"title":"Phase 4 — Domain join & PXE deployment","description":"Started a second VM (Windows 10, no OS) configured to boot from NIC. The VM got an IP from DHCP, obtained PXE options, and contacted the WDS server. After admin approval in the WDS console, Windows 10 was deployed over the network. Machine renamed PC LYES and joined to DP-AICHA.LAN. Logged in as LYES@DP-AICHA.LAN to verify roaming profile and mapped drive."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Infrastructure","value":"AD DS domain fully operational on VMware NAT network"},
      {"label":"Automation","value":"PXE/WDS network OS deployment — no USB or manual install required"},
      {"label":"Policies","value":"GPO roaming profiles and mapped drives applied automatically at logon"},
      {"label":"Security","value":"WDS admin-approval workflow for unknown machines"},
      {"label":"Skills","value":"AD DS, DNS, DHCP, WDS, GPO, VMware networking, PXE boot"}
    ]},
    {"type":"bullets","title":"Key takeaways","items":[
      "Network first: addressing, DNS and DHCP must be working before anything else — every other role depends on them.",
      "Standardize and automate wherever possible: WDS for OS deployment, GPO baselines for user settings. Manual steps = drift.",
      "Validate incrementally: after each role install, confirm expected behavior before moving to the next phase.",
      "Static IP on the domain controller is non-negotiable — a DHCP-assigned IP on the DC breaks DNS and AD replication.",
      "WDS admin-approval mode is essential in a lab: it prevents rogue machines from pulling an image and joining the domain."
    ]}
  ]'
WHERE slug = 'it-ops-virtualization-lab' AND locale = 'en';

UPDATE projects SET
  hero_subtitle = 'VMware Workstation Pro 17 · Windows Server 2022 · AD DS / DNS / DHCP / WDS',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Lab d''entraînement réalisé à domicile dans le cadre d''une formation Systèmes & Réseaux. J''ai déployé un environnement Windows Server 2022 complet sous VMware Workstation Pro 17 (hyperviseur de type 2) pour reproduire une infrastructure IT d''entreprise réelle : domaine Active Directory, DNS, DHCP et déploiement automatisé d''OS via WDS/PXE — sur un réseau NAT VMware privé."]},
    {"type":"metrics","title":"Environnement","items":[
      {"label":"Hyperviseur","value":"VMware Workstation Pro 17 (type 2)"},
      {"label":"VM serveur","value":"DCAD22 — Windows Server 2022"},
      {"label":"Réseau","value":"NAT VMware — 192.168.100.0/24"},
      {"label":"IP serveur","value":"192.168.100.250 (statique)"},
      {"label":"Passerelle","value":"192.168.100.2"},
      {"label":"DNS","value":"192.168.100.250 + 8.8.8.8 (redirecteur)"},
      {"label":"Domaine","value":"DP-AICHA.LAN (racine de forêt AD)"},
      {"label":"Client","value":"Windows 10 Pro — joint sous le nom PC LYES"}
    ]},
    {"type":"timeline","title":"Phases de mise en place","steps":[
      {"title":"Phase 1 — Installation VM & promotion contrôleur de domaine","description":"Installation de Windows Server 2022 depuis l''ISO dans VMware. Attribution de l''IP statique 192.168.100.250, hostname DCAD22, promotion en contrôleur de domaine via l''assistant AD DS. Création de la nouvelle forêt racine DP-AICHA.LAN. DNS installé avec AD DS et redirecteur 8.8.8.8."},
      {"title":"Phase 2 — Configuration DHCP & WDS","description":"Installation et autorisation du rôle Serveur DHCP. Création de l''étendue POOL1 (192.168.100.0/24, plage .1–.254, exclusions .1–.20 et .240–.254). Ajout de l''option DHCP 060 PXEClient. Installation de WDS, liaison au domaine AD DS, import de l''image Boot\\x64\\Images\\boot.wim. WDS configuré pour répondre à tous les clients PXE avec validation manuelle pour les machines inconnues."},
      {"title":"Phase 3 — Active Directory & Stratégies de groupe","description":"Création des OU et comptes utilisateurs de domaine : LYES (standard) et Technicien (admin IT). Application de GPO pour les profils itinérants et le mappage d''un lecteur réseau (\\\\DCAD22\\Partage) à l''ouverture de session. Permissions du dossier partagé : Modifier + Lire pour LYES, Lire pour Technicien."},
      {"title":"Phase 4 — Jonction au domaine & déploiement PXE","description":"Démarrage d''une deuxième VM (Windows 10, sans OS) configurée pour booter depuis la carte réseau. La VM a obtenu une IP depuis DHCP, récupéré les options PXE et contacté le serveur WDS. Après validation dans la console WDS, Windows 10 a été déployé via le réseau. Machine renommée PC LYES et jointe à DP-AICHA.LAN. Connexion avec LYES@DP-AICHA.LAN pour vérifier le profil itinérant et le lecteur mappé."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Infrastructure","value":"Domaine AD DS complet opérationnel sur réseau NAT VMware"},
      {"label":"Automatisation","value":"Déploiement OS réseau via PXE/WDS — sans clé USB ni installation manuelle"},
      {"label":"Stratégies","value":"Profils itinérants et lecteurs mappés appliqués automatiquement par GPO"},
      {"label":"Sécurité","value":"Workflow de validation WDS pour les machines inconnues"},
      {"label":"Compétences","value":"AD DS, DNS, DHCP, WDS, GPO, réseau VMware, amorçage PXE"}
    ]},
    {"type":"bullets","title":"Apprentissages clés","items":[
      "Le réseau d''abord : l''adressage, le DNS et le DHCP doivent fonctionner avant tout — tous les autres rôles en dépendent.",
      "Standardiser et automatiser autant que possible : WDS pour le déploiement OS, GPO pour les paramètres utilisateurs. Les étapes manuelles créent de la dérive.",
      "Valider de manière incrémentale : après chaque installation de rôle, confirmer le comportement attendu avant de passer à la phase suivante.",
      "L''IP statique sur le contrôleur de domaine est non négociable — une IP DHCP sur le DC casse le DNS et la réplication AD.",
      "Le mode validation WDS est indispensable en lab : il empêche les machines inconnues de récupérer une image et de rejoindre le domaine sans contrôle."
    ]}
  ]'
WHERE slug = 'it-ops-virtualization-lab' AND locale = 'fr';
