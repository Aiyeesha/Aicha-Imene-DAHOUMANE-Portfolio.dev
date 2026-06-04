-- supabase/update-acronis-backup-casestudy.sql  [CORRECTED]
-- Uses correct section types: text / metrics
-- -----------------------------------------------------------

-- ── EN ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  hero_subtitle = 'Acronis Cyber Backup · Acronis Cyber Protect Cloud · MIDRANGE GROUP internship',
  sections = '[
    {"type":"text","title":"Context","paragraphs":["Continuing my internship at MIDRANGE GROUP under Théo KACEL, I was involved in managing cloud and local backup operations for one of the company''s clients. The backup infrastructure relied on two distinct Acronis products: Acronis Cyber Backup (local/NAS backup solution) and Acronis Cyber Protect Cloud (MSP-oriented cloud backup platform). My daily task was to open the Acronis dashboard, review the alert status, and investigate any failures to restore backup continuity."]},
    {"type":"metrics","title":"Backup Infrastructure","items":[
      {"label":"Local backup tool","value":"Acronis Cyber Backup (NAS / private cloud)"},
      {"label":"Cloud backup tool","value":"Acronis Cyber Protect Cloud (Acronis-hosted)"},
      {"label":"NAS destination 1","value":"smb://10.15.231.11/backups — 8.77 Tio / 10.5 Tio"},
      {"label":"NAS destination 2","value":"smb://10.15.231.11/backups-new — 9.57 Tio / 10.5 Tio"},
      {"label":"Cloud destination","value":"Acronis cloud — 139 Gio / 250 Gio"},
      {"label":"Protected devices","value":"105 total (89 OK, 16 errors, 0 critical)"},
      {"label":"Unprotected devices","value":"6 (UPS_LENOVO, VMware vCenter Server, ACRONIS, SRV-EXCH)"},
      {"label":"Total storage used","value":"9.74 Tio backup / 21.18 Tio total"}
    ]},
    {"type":"text","title":"Backup Plans","paragraphs":["The client had 5 active backup plans configured in Acronis Cyber Backup: ''Toutes les VM'' (all VMs — 16 devices including SRV-RDS04, SRV-BDD, SRV-PRINT2 and 13 others — scheduled Mon–Sat at 23:00, destination: smb backups-new, retention: 2 months monthly / 4 weeks weekly / 6 days daily); ''TMP-BDD'' (1 device); ''SQL-CLOUD 2'' (86 devices, Mon–Fri at 23:00); ''SQL-CLOUD'' (86 devices); ''Bases_Exchange'' (2 devices, daily at 03:00)."]},
    {"type":"text","title":"Alert Investigation & Resolution","paragraphs":["The dashboard showed 85 active alerts: 33 activity failures and 52 warnings. I investigated each case to identify the root cause and apply the appropriate fix. The most common failure scenarios encountered were: (1) NAS storage full at 75%+ — requiring deletion of old full backups to free capacity; (2) server offline or unplugged at backup time — resolved by rescheduling or confirming server availability; (3) corrupted backup plan — requiring recreation of the plan under a new name (same base name + incremented suffix) while keeping the same backup policy; (4) network issue (defective cable or saturated NAS) — causing transfer failures mid-backup."]},
    {"type":"metrics","title":"Example Alerts (from dashboard)","items":[
      {"label":"SRV-RDS04 warning","value":"VM backup succeeded with warning: CBT disabled — backup ran without Changed Block Tracking (VMware snapshots present)"},
      {"label":"SRV-BDD.acces.local error","value":"Replication failed — storage quota exceeded for stchristophecloud@hotmail.fr, new backups will fail"},
      {"label":"SQL-CLOUD 2 plan","value":"86 devices backed up, Bases_Exchange plan shows red (failure) — investigated network/NAS saturation"}
    ]},
    {"type":"metrics","title":"Outcomes","items":[
      {"label":"Daily monitoring","value":"Systematic review of backup health across 100+ devices every morning"},
      {"label":"Failure resolution","value":"Root-cause analysis of 85 alerts — storage, network, server availability, and plan corruption"},
      {"label":"Plan management","value":"Corrupted backup plans recreated without data loss, continuity restored"},
      {"label":"Storage management","value":"NAS capacity freed by purging obsolete full backups, preventing future failures"},
      {"label":"Skills","value":"Acronis Cyber Backup, Acronis Cyber Protect Cloud, backup plan management, NAS storage, alert triage"}
    ]}
  ]'
WHERE slug = 'it-ops-acronis-backup' AND locale = 'en';

-- ── FR ───────────────────────────────────────────────────────────────────────
UPDATE projects SET
  hero_subtitle = 'Acronis Cyber Backup · Acronis Cyber Protect Cloud · Stage MIDRANGE GROUP',
  sections = '[
    {"type":"text","title":"Contexte","paragraphs":["Dans la continuité de mon stage chez MIDRANGE GROUP sous la tutelle de Théo KACEL, j''ai participé à la gestion des opérations de sauvegarde cloud et locales pour un des clients de l''entreprise. L''infrastructure de sauvegarde reposait sur deux produits Acronis distincts : Acronis Cyber Backup (solution de sauvegarde locale/NAS) et Acronis Cyber Protect Cloud (plateforme de sauvegarde cloud orientée MSP). Ma tâche quotidienne était d''ouvrir le tableau de bord Acronis, contrôler l''état des alertes et investiguer les échecs pour rétablir la continuité des sauvegardes."]},
    {"type":"metrics","title":"Infrastructure de sauvegarde","items":[
      {"label":"Outil sauvegarde locale","value":"Acronis Cyber Backup (NAS / cloud privé)"},
      {"label":"Outil sauvegarde cloud","value":"Acronis Cyber Protect Cloud (hébergé chez Acronis)"},
      {"label":"Destination NAS 1","value":"smb://10.15.231.11/backups — 8,77 Tio / 10,5 Tio"},
      {"label":"Destination NAS 2","value":"smb://10.15.231.11/backups-new — 9,57 Tio / 10,5 Tio"},
      {"label":"Destination cloud","value":"Cloud Acronis — 139 Gio / 250 Gio"},
      {"label":"Appareils protégés","value":"105 au total (89 OK, 16 en erreur, 0 critique)"},
      {"label":"Appareils non protégés","value":"6 (UPS_LENOVO, VMware vCenter Server, ACRONIS, SRV-EXCH)"},
      {"label":"Stockage total utilisé","value":"9,74 Tio sauvegarde / 21,18 Tio total"}
    ]},
    {"type":"text","title":"Plans de sauvegarde","paragraphs":["Le client disposait de 5 plans de sauvegarde actifs dans Acronis Cyber Backup : ''Toutes les VM'' (16 appareils dont SRV-RDS04, SRV-BDD, SRV-PRINT2 et 13 autres — planification Lun–Sam à 23h00, destination : smb backups-new, conservation : 2 mois mensuel / 4 semaines hebdo / 6 jours quotidien) ; ''TMP-BDD'' (1 appareil) ; ''SQL-CLOUD 2'' (86 appareils, Lun–Ven à 23h00) ; ''SQL-CLOUD'' (86 appareils) ; ''Bases_Exchange'' (2 appareils, tous les jours à 03h00)."]},
    {"type":"text","title":"Investigation des alertes & résolution","paragraphs":["Le tableau de bord affichait 85 alertes actives : 33 échecs d''activité et 52 avertissements. J''ai investigué chaque cas pour identifier la cause racine et appliquer la correction appropriée. Les scénarios d''échec les plus fréquemment rencontrés : (1) NAS saturé à 75%+ — nécessitant la suppression d''anciennes sauvegardes complètes pour libérer de l''espace ; (2) serveur hors ligne ou débranché lors de la sauvegarde — résolu par reprogrammation ou vérification de disponibilité ; (3) plan de sauvegarde corrompu — nécessitant la recréation du plan sous un nouveau nom (même base + suffixe incrémenté) en conservant la même politique de sauvegarde ; (4) problème réseau (câble défectueux ou NAS saturé) — provoquant des échecs de transfert en cours de sauvegarde."]},
    {"type":"metrics","title":"Exemples d''alertes (tableau de bord)","items":[
      {"label":"Avertissement SRV-RDS04","value":"Sauvegarde VM réussie avec avertissement : CBT désactivé — sauvegarde exécutée sans Changed Block Tracking (snapshots VMware présents)"},
      {"label":"Erreur SRV-BDD.acces.local","value":"Réplication échouée — quota de stockage dépassé pour stchristophecloud@hotmail.fr, les nouvelles sauvegardes échoueront"},
      {"label":"Plan SQL-CLOUD 2","value":"86 appareils sauvegardés, plan Bases_Exchange en rouge (échec) — investigation saturation réseau/NAS"}
    ]},
    {"type":"metrics","title":"Résultats","items":[
      {"label":"Surveillance quotidienne","value":"Contrôle systématique de la santé des sauvegardes sur 100+ appareils chaque matin"},
      {"label":"Résolution des échecs","value":"Analyse des causes racines de 85 alertes — stockage, réseau, disponibilité serveur et corruption de plan"},
      {"label":"Gestion des plans","value":"Plans de sauvegarde corrompus recréés sans perte de données, continuité rétablie"},
      {"label":"Gestion du stockage","value":"Capacité NAS libérée par purge des sauvegardes complètes obsolètes, évitant de futurs échecs"},
      {"label":"Compétences","value":"Acronis Cyber Backup, Acronis Cyber Protect Cloud, gestion de plans de sauvegarde, NAS, triage d''alertes"}
    ]}
  ]'
WHERE slug = 'it-ops-acronis-backup' AND locale = 'fr';
