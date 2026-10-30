-- supabase/update-rmm-supervision-casestudy.sql  [CORRECTED]
-- Uses correct section types: text / metrics
-- -----------------------------------------------------------

-- ── EN ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  hero_subtitle = 'Datto RMM · Splashtop · MalwareBytes · MIDRANGE GROUP internship',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["During my internship at MIDRANGE GROUP, a managed service provider (MSP) based in the Île-de-France region, I was assigned to the Exploitation team under the supervision of [administrateur systèmes & réseaux], a Systems & Networks Administrator. The technical floor was split into two units: Technical Support (handling client calls, ticket creation, and L1/L2 resolution) and Exploitation (server maintenance, security, and L2/L3 escalation support). My role in Exploitation gave me direct hands-on access to the company''s RMM platform."]},
    {"type":"text","title":"Platform: Datto RMM","paragraphs":["Datto RMM (Remote Monitoring and Management) is an enterprise-grade platform designed for MSPs and IT teams to remotely monitor and manage endpoints, networks, and systems at scale. Théo introduced me to the platform and its core capabilities: real-time device health monitoring, automated patch management, software inventory, remote access, security status tracking, and job automation via Quick Jobs and policies."]},
    {"type":"metrics","title":"Platform Details","items":[
      {"label":"Devices monitored","value":"550+ endpoints (desktops, laptops, servers) across multiple client sites"},
      {"label":"Site used in training","value":"MID-S0A (MIDRANGE GROUP internal site)"},
      {"label":"Agent version","value":"4.4.2195.2195"},
      {"label":"Remote access tool","value":"Splashtop (integrated into Datto RMM)"},
      {"label":"Antivirus","value":"Webroot SecureAnywhere Endpoint / MalwareBytes"}
    ]},
    {"type":"text","title":"Tasks Performed","paragraphs":["Under Théo''s guidance, I carried out the following operational tasks on the Datto RMM platform: reviewed the Default Dashboard to assess the overall health of the managed fleet (offline device count by type, antivirus coverage across all sites); navigated device profiles to inspect hardware specs, OS version, patch status, and software inventory for individual endpoints; used the Quick Job feature to remotely deploy the MalwareBytes endpoint agent on targeted machines without requiring physical access or user interaction; and connected to client machines via Splashtop for remote troubleshooting and user support sessions."]},
    {"type":"text","title":"Remote Access: Splashtop","paragraphs":["Splashtop is integrated natively into Datto RMM and provides secure remote desktop access to managed endpoints. During the internship, I used it for: remote technical support for end users (viewing and controlling the client''s screen to resolve issues without physical presence); server management tasks (accessing and checking server configurations remotely); and collaborative troubleshooting alongside Théo on complex incidents affecting client infrastructure."]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Fleet visibility","value":"Real-time monitoring of 550+ devices with health, patch, and antivirus status at a glance"},
      {"label":"Remote deployment","value":"MalwareBytes deployed to unprotected endpoints via Quick Jobs — zero on-site travel"},
      {"label":"Remote support","value":"End-user issues resolved via Splashtop without physical intervention"},
      {"label":"MSP exposure","value":"First-hand understanding of MSP operations: multi-client management, SLA-driven support, tiered escalation"},
      {"label":"Skills","value":"Datto RMM, remote monitoring, patch management, endpoint security, Splashtop, MSP workflows"}
    ]}
  ]'
WHERE slug = 'it-ops-rmm-supervision' AND locale = 'en';

-- ── FR ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  hero_subtitle = 'Datto RMM · Splashtop · MalwareBytes · Stage MIDRANGE GROUP',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Lors de mon stage chez MIDRANGE GROUP, ESN/MSP basée en Île-de-France, j''ai été intégrée à l''équipe Exploitation sous la tutelle de [administrateur systèmes & réseaux], Administrateur Systèmes & Réseaux. Le plateau technique de l''entreprise se divise en deux pôles : Support Technique (gestion des appels clients, création de tickets, résolution N1/N2) et Exploitation (maintenance des serveurs, sécurité, renfort N2/N3). Mon affectation à l''Exploitation m''a donné un accès opérationnel direct à la plateforme RMM de l''entreprise."]},
    {"type":"text","title":"Plateforme : Datto RMM","paragraphs":["Datto RMM (Remote Monitoring and Management) est une plateforme professionnelle conçue pour les MSP et les équipes IT afin de surveiller et gérer à distance les équipements, réseaux et systèmes à grande échelle. Théo m''a présenté la plateforme et ses fonctionnalités principales : surveillance en temps réel de la santé des équipements, gestion automatisée des correctifs, inventaire logiciel, accès à distance, suivi de l''état de sécurité et automatisation des tâches via Quick Jobs et politiques."]},
    {"type":"metrics","title":"Détails de la plateforme","items":[
      {"label":"Équipements supervisés","value":"550+ postes (desktops, laptops, serveurs) sur plusieurs sites clients"},
      {"label":"Site utilisé en stage","value":"MID-S0A (site interne MIDRANGE GROUP)"},
      {"label":"Version agent","value":"4.4.2195.2195"},
      {"label":"Outil d''accès distant","value":"Splashtop (intégré à Datto RMM)"},
      {"label":"Antivirus","value":"Webroot SecureAnywhere Endpoint / MalwareBytes"}
    ]},
    {"type":"text","title":"Tâches effectuées","paragraphs":["Sous l''encadrement de Théo, j''ai réalisé les opérations suivantes sur la plateforme Datto RMM : consultation du tableau de bord Default Dashboard pour évaluer l''état global du parc (comptage des équipements hors ligne par type, couverture antivirus sur l''ensemble des sites) ; navigation dans les profils d''équipements pour inspecter les caractéristiques matérielles, la version OS, le statut des correctifs et l''inventaire logiciel ; utilisation de la fonctionnalité Quick Job pour déployer à distance l''agent MalwareBytes sur les postes ciblés, sans accès physique ni intervention utilisateur ; connexion aux postes clients via Splashtop pour des sessions de dépannage et de support à distance."]},
    {"type":"text","title":"Accès distant : Splashtop","paragraphs":["Splashtop est intégré nativement à Datto RMM et fournit un accès bureau à distance sécurisé aux équipements gérés. Durant le stage, je l''ai utilisé pour : le support technique à distance aux utilisateurs finaux (visualisation et contrôle du poste client pour résoudre les incidents sans déplacement) ; la gestion à distance des serveurs (accès et vérification des configurations) ; et le dépannage collaboratif avec Théo sur des incidents complexes affectant l''infrastructure clients."]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Visibilité parc","value":"Supervision en temps réel de 550+ équipements avec état de santé, correctifs et antivirus en un coup d''œil"},
      {"label":"Déploiement distant","value":"MalwareBytes déployé sur les postes non protégés via Quick Jobs — zéro déplacement sur site"},
      {"label":"Support à distance","value":"Incidents utilisateurs résolus via Splashtop sans intervention physique"},
      {"label":"Contexte MSP","value":"Découverte des opérations MSP réelles : gestion multi-clients, support orienté SLA, escalade en niveaux"},
      {"label":"Compétences","value":"Datto RMM, supervision à distance, gestion des patchs, sécurité endpoint, Splashtop, workflows MSP"}
    ]}
  ]'
WHERE slug = 'it-ops-rmm-supervision' AND locale = 'fr';
