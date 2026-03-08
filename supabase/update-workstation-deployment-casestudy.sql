-- supabase/update-workstation-deployment-casestudy.sql
-- ------------------------------------------------------
-- Enrichit le projet "Déploiement en masse de postes de travail" en case study complet.
-- Badge : INTERNSHIP / STAGE
-- Sections : contexte, défis, timeline (3 phases), métriques, ressources
-- À exécuter dans SQL Editor → Primary Database
-- Prérequis : seed-workstation-deployment-project.sql doit avoir été exécuté d''abord.

-- ══════════════════════════════════════════════════════
-- VERSION EN
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge        = '{"tone": "professional", "label": "INTERNSHIP"}',
  hero_subtitle = 'Certified data erasure, Sysprep imaging, and zero-touch Autopilot — 264 Dell devices deployed during an internship at MIDRANGE GROUP.',
  highlights   = ARRAY[
    '64 Dell Optiplex — Blancco NIST 800-88 erasure + Sysprep golden image',
    '200 Dell Latitude — zero-touch Autopilot via Dell ImageAssist',
    'Hands-on IT time per Latitude post-setup: < 5 minutes',
    'Blancco compliance certificates generated for every wiped device',
    'Intune: deployment profiles, BitLocker, Defender, update rings'
  ],
  sections = '[
    {
      "type": "text",
      "title": "Context",
      "paragraphs": [
        "During an internship at MIDRANGE GROUP (Alternative Partner Solutions team), I was tasked with deploying two device fleets for a client rollout: 64 Dell Optiplex desktop PCs for on-site staff and 200 Dell Latitude laptops for field users.",
        "The two fleets required completely different workflows: the Optiplex machines were repurposed hardware that needed certified wiping before reuse, while the Latitude laptops were brand-new units destined for zero-touch remote deployment via Windows Autopilot."
      ]
    },
    {
      "type": "bullets",
      "title": "Technical challenges",
      "items": [
        "Repurposed hardware must be certified-erased before re-enrollment — a simple format is not sufficient for compliance. Required: traceable erasure standard (NIST 800-88) with per-device certificates.",
        "Sysprep imaging requires a stable golden image: drivers, Windows updates, and corporate apps must all be baked in before capturing. Any delta after capture means a new image cycle.",
        "Windows Autopilot requires hardware hashes to be pre-registered in Intune before the device is powered on. On new Dell hardware without ProDeploy, Dell ImageAssist is the fastest hash capture path.",
        "Intune deployment profiles, BitLocker policies, Defender configuration, and update rings must all be validated on a test device before rolling out to 200 machines.",
        "Staggered deployment (20–30 devices/day) to catch Intune policy failures before they affect the full fleet."
      ]
    },
    {
      "type": "timeline",
      "title": "How it was done — 3 phases",
      "steps": [
        {
          "title": "Phase 1 — Blancco data erasure (64 Dell Optiplex)",
          "description": "Each repurposed Optiplex was booted from a Blancco USB key. An erasure task was created (NIST 800-88 standard), all disks selected, and erasure launched. Blancco overwrites every sector and verifies. A tamper-proof PDF compliance certificate is auto-generated per machine. All 64 machines ran overnight in parallel — 2 to 3 hours each depending on disk size."
        },
        {
          "title": "Phase 2 — Sysprep golden image (64 Dell Optiplex)",
          "description": "A reference Optiplex was fully configured: Windows 11, latest drivers, corporate app suite, domain join settings. Sysprep was run (/oobe /generalize /shutdown) to prepare the image for deployment. A WinPE USB key was used to boot and capture the image with DISM (dism /Capture-Image). The resulting .wim file was deployed to all 63 remaining Optiplex machines via the same WinPE environment (dism /Apply-Image). Each machine then completed OOBE and joined the domain."
        },
        {
          "title": "Phase 3 — Windows Autopilot via Dell ImageAssist (200 Dell Latitude)",
          "description": "Each new Latitude was booted from a Dell ImageAssist USB key. ImageAssist automatically applied the deployment profile, pulled a fresh Windows image from the cloud, captured the hardware hash, and uploaded it to the Intune tenant. The machine rebooted into a clean, pre-registered OOBE. Users then only needed to enter their corporate email — Azure AD authenticated them, the Autopilot profile downloaded, and Intune silently pushed policies and apps in the background. Total IT intervention per Latitude after initial setup: under 5 minutes."
        }
      ]
    },
    {
      "type": "metrics",
      "title": "Key figures",
      "items": [
        {
          "label": "Devices deployed",
          "value": "264",
          "note": "64 Optiplex (Sysprep) + 200 Latitude (Autopilot)"
        },
        {
          "label": "Blancco certificates",
          "value": "64",
          "note": "One per wiped Optiplex — NIST 800-88 compliant"
        },
        {
          "label": "IT time per Latitude",
          "value": "< 5 min",
          "note": "After Intune profile and ImageAssist setup"
        },
        {
          "label": "Zero-touch Autopilot",
          "value": "200",
          "note": "No physical IT at user desks"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Key learnings",
      "items": [
        "Blancco and Autopilot are complementary, not competing tools: Blancco handles the compliance layer for repurposed hardware, Autopilot handles the zero-touch provisioning layer for new hardware.",
        "Dell ImageAssist significantly reduces Autopilot setup time on large Dell orders: no need to run PowerShell per device, no pre-enrollment requirement.",
        "Sysprep golden images must be rebuilt for each hardware model — drivers are hardware-specific. A single image covering all Optiplex SKUs requires careful driver injection.",
        "Staggering Autopilot rollouts (batch of 20–30/day) is critical: it surfaces Intune policy failures early, before they affect hundreds of users.",
        "Generating Blancco certificates at the time of erasure (not retroactively) is the only way to guarantee an unbroken chain of custody for compliance audits."
      ]
    },
    {
      "type": "resources",
      "title": "Tools & references",
      "items": [
        {
          "href": "https://docs.microsoft.com/en-us/mem/autopilot/windows-autopilot",
          "label": "Windows Autopilot documentation — Microsoft"
        },
        {
          "href": "https://www.dell.com/en-us/dt/services/deployment-services/imageassist.htm",
          "label": "Dell ImageAssist"
        },
        {
          "href": "https://www.blancco.com/products/drive-eraser/",
          "label": "Blancco Drive Eraser"
        },
        {
          "href": "https://docs.microsoft.com/en-us/mem/intune/enrollment/windows-enrollment-status",
          "label": "Intune Enrollment Status Page"
        }
      ]
    }
  ]'
WHERE slug = 'workstation-mass-deployment' AND locale = 'en';

-- ══════════════════════════════════════════════════════
-- VERSION FR
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge        = '{"tone": "professional", "label": "STAGE"}',
  hero_subtitle = 'Effacement certifié, image Sysprep et Autopilot zero-touch — 264 appareils Dell déployés lors d''un stage chez MIDRANGE GROUP.',
  highlights   = ARRAY[
    '64 Dell Optiplex — effacement Blancco NIST 800-88 + image Sysprep dorée',
    '200 Dell Latitude — Autopilot zero-touch via Dell ImageAssist',
    'Temps d''intervention IT par Latitude après configuration : < 5 minutes',
    'Certificats de conformité Blancco générés pour chaque appareil effacé',
    'Intune : profils de déploiement, BitLocker, Defender, anneaux de mise à jour'
  ],
  sections = '[
    {
      "type": "text",
      "title": "Contexte",
      "paragraphs": [
        "Lors d''un stage chez MIDRANGE GROUP (équipe Alternative Partner Solutions), j''ai été chargée de déployer deux flottes d''appareils pour un client : 64 PC de bureau Dell Optiplex pour les collaborateurs sur site et 200 laptops Dell Latitude pour les utilisateurs en mobilité.",
        "Les deux flottes nécessitaient des workflows entièrement différents : les machines Optiplex étaient du matériel reconditionné qui devait être effacé de manière certifiée avant réutilisation, tandis que les laptops Latitude étaient du matériel neuf destiné à un déploiement zero-touch à distance via Windows Autopilot."
      ]
    },
    {
      "type": "bullets",
      "title": "Défis techniques",
      "items": [
        "Le matériel reconditionné doit être effacé de manière certifiée avant réenrôlement — un simple formatage ne suffit pas pour la conformité. Exigence : norme d''effacement traçable (NIST 800-88) avec certificats par appareil.",
        "L''image Sysprep nécessite une image dorée stable : pilotes, mises à jour Windows et applications métier doivent tous être intégrés avant la capture. Tout delta après la capture impose un nouveau cycle d''image.",
        "Windows Autopilot nécessite que les hashs matériels soient pré-enregistrés dans Intune avant la mise sous tension. Sur du nouveau matériel Dell sans ProDeploy, Dell ImageAssist est le chemin le plus rapide pour la capture des hashs.",
        "Les profils Intune, les stratégies BitLocker, la configuration Defender et les anneaux de mise à jour doivent tous être validés sur un appareil de test avant de déployer sur 200 machines.",
        "Déploiement échelonné (20–30 appareils/jour) pour détecter les échecs de stratégie Intune avant qu''ils touchent la flotte entière."
      ]
    },
    {
      "type": "timeline",
      "title": "Déroulement — 3 phases",
      "steps": [
        {
          "title": "Phase 1 — Effacement des données Blancco (64 Dell Optiplex)",
          "description": "Chaque Optiplex reconditionné a été démarré depuis une clé USB Blancco. Une tâche d''effacement a été créée (norme NIST 800-88), tous les disques sélectionnés, et l''effacement lancé. Blancco écrase chaque secteur et vérifie. Un certificat PDF de conformité inviolable est généré automatiquement par machine. Les 64 machines ont tourné en parallèle la nuit — 2 à 3 heures chacune selon la capacité du disque."
        },
        {
          "title": "Phase 2 — Image Sysprep dorée (64 Dell Optiplex)",
          "description": "Une machine Optiplex de référence a été entièrement configurée : Windows 11, derniers pilotes, suite d''applications métier, paramètres de jonction au domaine. Sysprep a été exécuté (/oobe /generalize /shutdown) pour préparer l''image au déploiement. Une clé USB WinPE a été utilisée pour démarrer et capturer l''image avec DISM (dism /Capture-Image). Le fichier .wim résultant a été déployé sur les 63 autres Optiplex via le même environnement WinPE (dism /Apply-Image). Chaque machine a ensuite complété l''OOBE et rejoint le domaine."
        },
        {
          "title": "Phase 3 — Windows Autopilot via Dell ImageAssist (200 Dell Latitude)",
          "description": "Chaque nouveau Latitude a été démarré depuis une clé USB Dell ImageAssist. ImageAssist a appliqué automatiquement le profil de déploiement, récupéré une image Windows fraîche depuis le cloud, capturé le hash matériel et l''a uploadé dans le tenant Intune. La machine a redémarré sur une OOBE propre et pré-enregistrée. Les utilisateurs n''avaient plus qu''à saisir leur email professionnel — Azure AD les authentifiait, le profil Autopilot se téléchargeait et Intune poussait silencieusement stratégies et applications en arrière-plan. Temps d''intervention IT par Latitude après la configuration initiale : moins de 5 minutes."
        }
      ]
    },
    {
      "type": "metrics",
      "title": "Chiffres clés",
      "items": [
        {
          "label": "Appareils déployés",
          "value": "264",
          "note": "64 Optiplex (Sysprep) + 200 Latitude (Autopilot)"
        },
        {
          "label": "Certificats Blancco",
          "value": "64",
          "note": "Un par Optiplex effacé — conformité NIST 800-88"
        },
        {
          "label": "Temps IT par Latitude",
          "value": "< 5 min",
          "note": "Après configuration du profil Intune et ImageAssist"
        },
        {
          "label": "Autopilot zero-touch",
          "value": "200",
          "note": "Aucune intervention physique de l''IT chez les utilisateurs"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Apprentissages clés",
      "items": [
        "Blancco et Autopilot sont complémentaires, pas concurrents : Blancco gère la couche conformité pour le matériel reconditionné, Autopilot gère la couche provisionnement zero-touch pour le matériel neuf.",
        "Dell ImageAssist réduit significativement le temps de configuration Autopilot sur les grandes commandes Dell : pas besoin d''exécuter PowerShell appareil par appareil, pas de prérequis d''enrôlement préalable.",
        "Les images Sysprep dorées doivent être reconstruites pour chaque modèle matériel — les pilotes sont spécifiques au hardware. Une seule image couvrant tous les SKU Optiplex nécessite une injection de pilotes soigneuse.",
        "Échelonner les déploiements Autopilot (lots de 20–30/jour) est critique : cela fait remonter les échecs de stratégie Intune tôt, avant qu''ils touchent des centaines d''utilisateurs.",
        "Générer les certificats Blancco au moment de l''effacement (pas rétroactivement) est le seul moyen de garantir une chaîne de traçabilité ininterrompue pour les audits de conformité."
      ]
    },
    {
      "type": "resources",
      "title": "Outils & références",
      "items": [
        {
          "href": "https://docs.microsoft.com/fr-fr/mem/autopilot/windows-autopilot",
          "label": "Documentation Windows Autopilot — Microsoft"
        },
        {
          "href": "https://www.dell.com/fr-fr/dt/services/deployment-services/imageassist.htm",
          "label": "Dell ImageAssist"
        },
        {
          "href": "https://www.blancco.com/fr/products/drive-eraser/",
          "label": "Blancco Drive Eraser"
        },
        {
          "href": "https://docs.microsoft.com/fr-fr/mem/intune/enrollment/windows-enrollment-status",
          "label": "Page de statut d''enrôlement Intune"
        }
      ]
    }
  ]'
WHERE slug = 'workstation-mass-deployment' AND locale = 'fr';
