-- supabase/update-network-security-casestudy.sql  [CORRECTED]
-- Uses correct section types: text / timeline / metrics
-- -----------------------------------------------------------

-- ── EN ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  hero_subtitle = 'pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Building on the virtualized lab from case study n°4 (AD DS / DNS / DHCP / WDS on Windows Server 2022), I added a pfSense 2.6.0 firewall VM to act as the network gateway. The goal was to secure outbound internet access for all machines on the private LAN (192.168.100.0/24), filter web traffic through a Squid transparent proxy, and enforce access policies — replicating real-world enterprise perimeter security."]},
    {"type":"metrics","title":"Network Architecture","items":[
      {"label":"Hypervisor","value":"VMware Workstation Pro 17"},
      {"label":"pfSense VM","value":"FreeBSD 12 64-bit — 10 GB HDD, 2 GB RAM"},
      {"label":"WAN (em0)","value":"Bridged to host 4G USB modem — DHCP — 192.168.1.110/24"},
      {"label":"LAN (em1)","value":"VMnet8 (NAT) — 192.168.100.220/24 (pfSense gateway)"},
      {"label":"AD server (DCAD22)","value":"192.168.100.250 — AD DS, DNS, DHCP, WDS"},
      {"label":"File server (SRVSAMBA)","value":"192.168.100.130 — Samba shares"},
      {"label":"Clients","value":"192.168.100.21, 192.168.100.22"},
      {"label":"pfSense web UI","value":"https://192.168.100.220"}
    ]},
    {"type":"timeline","title":"Setup phases","steps":[
      {"title":"Phase 1 — pfSense installation","description":"Created a new VM in VMware Workstation (FreeBSD 12 64-bit, 10 GB, 2 GB RAM) with two network adapters: NIC 1 set to Bridged (connecting directly to the host machine''s 4G USB dongle as WAN), NIC 2 set to Custom VMnet8 (the existing private LAN). Booted the pfSense 2.6.0 ISO, accepted the license, selected French keymap, and proceeded with the standard installation. After reboot, the console confirmed WAN on em0 (192.168.1.110/24) and LAN on em1 (192.168.100.220/24)."},
      {"title":"Phase 2 — Firewall aliases & rules","description":"In the pfSense web UI, created two IP aliases under Firewall → Aliases: ''SRV'' (192.168.100.130 = SRVSAMBA, 192.168.100.250 = DCAD22) and ''Client'' (192.168.100.21, 192.168.100.22). Configured LAN rules: allowed DNS (UDP 53) from SRV alias, allowed ICMP echo-requests from SRV, then added an explicit block rule ''REFUS SRV VERS INTERNET'' (IPv4 any from SRV) — placed above the default allow-all rule. This ensures servers can resolve DNS and respond to pings but cannot initiate outbound internet connections."},
      {"title":"Phase 3 — Squid proxy & SquidGuard","description":"Installed three packages via System → Package Manager: squid (0.4.45_9), squidGuard (1.16.18_20), and LightSquid (3.0.6_9 — reporting dashboard). Configured Squid as a transparent proxy on the LAN interface (port 3128), enabled SSL inspection using an internally generated CA (Pfsense-CA, self-signed, valid 10 years, C=FR / ST=Ile de France / O=greta / L=argenteuil). Configured SquidGuard with category-based URL blacklists. LightSquid was enabled for per-user traffic reporting accessible from the pfSense UI."},
      {"title":"Phase 4 — Certificate authority","description":"Generated an internal CA under System → Certificate Manager → CAs: ''Pfsense-CA'' (self-signed, RSA 2048 / SHA-256, 10-year validity). Distinguished name: C=FR, ST=Ile de France, O=greta, L=argenteuil, CN=internal-ca. This CA was used by Squid to re-sign intercepted HTTPS connections for inspection, and would need to be trusted by client browsers/OS for transparent HTTPS filtering."}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Gateway","value":"pfSense 2.6 routing and NATing all LAN traffic through the 4G WAN connection"},
      {"label":"Access control","value":"Servers (SRV alias) blocked from internet; only DNS + ICMP exceptions allowed"},
      {"label":"Web filtering","value":"Squid transparent proxy + SquidGuard blocking unwanted URL categories"},
      {"label":"HTTPS inspection","value":"Self-signed internal CA deployed for SSL bump on outbound HTTPS"},
      {"label":"Reporting","value":"LightSquid dashboard providing web usage statistics per client"},
      {"label":"Skills","value":"pfSense, firewall rules, IP aliases, Squid proxy, SquidGuard, PKI / CA management"}
    ]},
    {"type":"bullets","title":"Security notes","items":[
      "Least-privilege firewall rules: only allow the minimum required egress ports and destinations — the default allow-all rule must always be the last rule, never the first.",
      "HTTPS inspection requires a trust decision: the internal CA (Pfsense-CA) must be imported as a trusted root in every client browser or OS, otherwise HTTPS sites will show certificate warnings.",
      "SquidGuard URL blacklists only work on HTTP and on intercepted HTTPS — traffic that bypasses the proxy (direct IP connections, DNS-over-HTTPS) will not be filtered.",
      "Log review is part of operations: LightSquid reports and Squid access logs must be checked regularly to verify that rules are working and to detect anomalous traffic patterns.",
      "Alias maintenance matters: the SRV and Client IP aliases must be kept up to date as the network grows — outdated aliases silently break the firewall policy."
    ]}
  ]'
WHERE slug = 'it-ops-network-security' AND locale = 'en';

-- ── FR ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  hero_subtitle = 'pfSense 2.6.0 · Squid · SquidGuard · LightSquid · VMware Workstation 17',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["En prolongement du lab virtualisé de l''étude de cas n°4 (AD DS / DNS / DHCP / WDS sur Windows Server 2022), j''ai ajouté une VM pfSense 2.6.0 pour jouer le rôle de passerelle réseau. L''objectif : sécuriser les accès Internet sortants de toutes les machines du LAN privé (192.168.100.0/24), filtrer le trafic web via un proxy transparent Squid et appliquer des politiques d''accès — reproduisant la sécurité périmétrique d''une infrastructure d''entreprise réelle."]},
    {"type":"metrics","title":"Architecture réseau","items":[
      {"label":"Hyperviseur","value":"VMware Workstation Pro 17"},
      {"label":"VM pfSense","value":"FreeBSD 12 64-bit — 10 Go HDD, 2 Go RAM"},
      {"label":"WAN (em0)","value":"Bridge sur clé 4G de l''hôte — DHCP — 192.168.1.110/24"},
      {"label":"LAN (em1)","value":"VMnet8 (NAT) — 192.168.100.220/24 (passerelle pfSense)"},
      {"label":"Serveur AD (DCAD22)","value":"192.168.100.250 — AD DS, DNS, DHCP, WDS"},
      {"label":"Serveur fichiers (SRVSAMBA)","value":"192.168.100.130 — Partages Samba"},
      {"label":"Clients","value":"192.168.100.21, 192.168.100.22"},
      {"label":"Interface web pfSense","value":"https://192.168.100.220"}
    ]},
    {"type":"timeline","title":"Phases de mise en place","steps":[
      {"title":"Phase 1 — Installation de pfSense","description":"Création d''une nouvelle VM dans VMware Workstation (FreeBSD 12 64-bit, 10 Go, 2 Go RAM) avec deux cartes réseau : NIC 1 en mode Bridged (connectée à la clé 4G USB de l''hôte — WAN), NIC 2 en Custom VMnet8 (LAN privé existant). Démarrage sur l''ISO pfSense 2.6.0, acceptation de la licence, sélection du clavier français, installation standard. Après redémarrage, la console confirme WAN sur em0 (192.168.1.110/24) et LAN sur em1 (192.168.100.220/24)."},
      {"title":"Phase 2 — Alias et règles de pare-feu","description":"Dans l''interface web pfSense, création de deux alias IP sous Firewall → Aliases : ''SRV'' (192.168.100.130 = SRVSAMBA, 192.168.100.250 = DCAD22) et ''Client'' (192.168.100.21, 192.168.100.22). Configuration des règles LAN : autorisation DNS (UDP 53) depuis l''alias SRV, autorisation ICMP echo-request depuis SRV, puis ajout d''une règle de blocage explicite ''REFUS SRV VERS INTERNET'' (IPv4 any depuis SRV) — placée avant la règle allow-all par défaut. Les serveurs peuvent résoudre le DNS et répondre aux pings, mais ne peuvent pas initier de connexions Internet sortantes."},
      {"title":"Phase 3 — Proxy Squid & SquidGuard","description":"Installation de trois paquets via System → Package Manager : squid (0.4.45_9), squidGuard (1.16.18_20) et LightSquid (3.0.6_9 — tableau de bord de reporting). Configuration de Squid en proxy transparent sur l''interface LAN (port 3128), avec inspection SSL activée via une CA interne générée localement (Pfsense-CA, auto-signée, valide 10 ans, C=FR / ST=Ile de France / O=greta / L=argenteuil). Configuration de SquidGuard avec listes noires d''URL par catégorie. LightSquid activé pour les rapports de trafic par utilisateur, accessibles depuis l''interface pfSense."},
      {"title":"Phase 4 — Autorité de certification","description":"Génération d''une CA interne sous System → Certificate Manager → CAs : ''Pfsense-CA'' (auto-signée, RSA 2048 / SHA-256, validité 10 ans). Nom distinctif : C=FR, ST=Ile de France, O=greta, L=argenteuil, CN=internal-ca. Cette CA est utilisée par Squid pour re-signer les connexions HTTPS interceptées lors de l''inspection SSL, et doit être importée comme CA de confiance dans le navigateur ou l''OS des postes clients pour un filtrage HTTPS transparent."}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Passerelle","value":"pfSense 2.6 routant et nattant tout le trafic LAN vers la connexion WAN 4G"},
      {"label":"Contrôle d''accès","value":"Serveurs (alias SRV) bloqués sur Internet ; exceptions DNS + ICMP uniquement"},
      {"label":"Filtrage web","value":"Proxy transparent Squid + SquidGuard bloquant les catégories d''URL indésirables"},
      {"label":"Inspection HTTPS","value":"CA interne auto-signée déployée pour le SSL bump sur le trafic HTTPS sortant"},
      {"label":"Reporting","value":"Tableau de bord LightSquid fournissant les statistiques d''utilisation web par client"},
      {"label":"Compétences","value":"pfSense, règles pare-feu, alias IP, proxy Squid, SquidGuard, gestion PKI / CA"}
    ]},
    {"type":"bullets","title":"Points de sécurité","items":[
      "Règles de moindre privilège : n''autoriser que les ports et destinations strictement nécessaires — la règle allow-all par défaut doit toujours être la dernière, jamais la première.",
      "L''inspection HTTPS implique une décision de confiance : la CA interne (Pfsense-CA) doit être importée comme autorité racine de confiance dans chaque navigateur ou OS client, sinon les sites HTTPS afficheront des avertissements de certificat.",
      "Les listes noires SquidGuard ne fonctionnent que sur HTTP et sur HTTPS intercepté — le trafic contournant le proxy (connexions IP directes, DNS-over-HTTPS) ne sera pas filtré.",
      "La revue des logs fait partie de l''exploitation : les rapports LightSquid et les logs d''accès Squid doivent être consultés régulièrement pour vérifier l''efficacité des règles et détecter les anomalies de trafic.",
      "La maintenance des alias est importante : les alias SRV et Client doivent être mis à jour lorsque le réseau évolue — des alias obsolètes cassent silencieusement la politique de pare-feu."
    ]}
  ]'
WHERE slug = 'it-ops-network-security' AND locale = 'fr';
