-- supabase/update-incident-management-casestudy.sql
-- ---------------------------------------------------
-- Enrichit le projet "Gestion d'incidents IT" en case study complet.
-- Badge : INTERNSHIP / STAGE
-- Sections : contexte, workflow tickets, timeline résolution, métriques, apprentissages
-- À exécuter dans SQL Editor → Primary Database
-- Prérequis : seed-incident-management-project.sql doit avoir été exécuté d''abord.

-- ══════════════════════════════════════════════════════
-- VERSION EN
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge        = '{"tone": "professional", "label": "INTERNSHIP"}',
  hero_subtitle = 'Live incident triage at MIDRANGE GROUP: Autotask ticketing, Datto RMM remote access, and Webroot false-positive resolution.',
  highlights   = ARRAY[
    'Ticket triage via Autotask (phone / email / Datto RMM agent)',
    'Remote diagnosis via Datto RMM — no on-site intervention needed',
    'Webroot false positive resolved by URL suppression from management console',
    'Client access restored without reinstalling or reconfiguring Webroot',
    'Resolution documented in Autotask time entry for billing and audit trail'
  ],
  sections = '[
    {
      "type": "text",
      "title": "Context",
      "paragraphs": [
        "During an internship at MIDRANGE GROUP (Support Technique team), I was placed under the supervision of [administrateur systèmes & réseaux], a Systems & Network Administrator. The team handles support requests for managed clients across three intake channels: direct phone calls to the support line, email to the support address, and automatic alerts raised by the Datto RMM agent installed on client endpoints.",
        "Once a ticket is opened in Autotask, it is routed either to the Support Technique team (user-facing incidents) or to the Exploitation team (infrastructure and monitoring). Théo assigned me a live client ticket to handle under his guidance."
      ]
    },
    {
      "type": "bullets",
      "title": "How tickets reach the support team",
      "items": [
        "Phone: client calls the support line directly. The technician creates a ticket in Autotask manually and begins triage immediately.",
        "Email: client sends a message to the support address. Autotask ingests it automatically and creates a ticket, which is then assigned to the correct queue.",
        "Datto RMM agent: the agent installed on managed endpoints monitors the device in real time and can raise alerts automatically (CPU spike, disk full, security event). These generate tickets in Autotask without any client action."
      ]
    },
    {
      "type": "timeline",
      "title": "Incident resolution — step by step",
      "steps": [
        {
          "title": "Step 1 — Ticket received in Autotask",
          "description": "A client reported being unable to access a specific website. Webroot was displaying a ''site blocked'' warning on their machine. The ticket was assigned to Théo and delegated to me for hands-on resolution."
        },
        {
          "title": "Step 2 — Remote access via Datto RMM",
          "description": "We contacted the client and requested permission to take remote control of their workstation via Datto RMM. This allowed us to reproduce the issue in real time, see the exact Webroot warning message, and confirm which URL was being blocked."
        },
        {
          "title": "Step 3 — Diagnosis: Webroot false positive",
          "description": "After inspecting the blocked URL, we determined it was a legitimate business site incorrectly flagged by Webroot''s threat intelligence. The site was not malicious — Webroot had classified it as suspicious based on its domain reputation score."
        },
        {
          "title": "Step 4 — URL suppression in Webroot Management Console",
          "description": "We connected to the Webroot Management Console (CE 23.2) and navigated to the URL suppression list under the client''s policy. We added the blocked domain to the suppression (whitelist) list. The change propagated to the client''s endpoint within minutes, and the site became accessible without any further intervention on the machine."
        },
        {
          "title": "Step 5 — Resolution logged in Autotask",
          "description": "A time entry was created in Autotask with a summary of the issue, the root cause (false positive), and the resolution steps taken. The ticket was closed as ''Complete''. The time worked was recorded for client billing and used as part of the audit trail."
        }
      ]
    },
    {
      "type": "metrics",
      "title": "Key figures",
      "items": [
        {
          "label": "Ticket intake channels",
          "value": "3",
          "note": "Phone · Email · Datto RMM agent"
        },
        {
          "label": "On-site intervention",
          "value": "None",
          "note": "Full remote resolution via Datto RMM"
        },
        {
          "label": "Webroot reinstall required",
          "value": "No",
          "note": "URL suppression from console — endpoint untouched"
        },
        {
          "label": "Resolution documented",
          "value": "Yes",
          "note": "Autotask time entry with root cause and steps"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Key learnings",
      "items": [
        "Webroot false positives on legitimate business sites are a recurring support scenario: the first reflex should always be to check the URL suppression list before escalating or reconfiguring the endpoint.",
        "Datto RMM remote access eliminates the need for on-site visits for most user-facing incidents, reducing resolution time significantly.",
        "Autotask time entries are not optional: they serve as both a billing record for the client and a searchable knowledge base for recurring issues.",
        "Routing matters: distinguishing between a Support Technique ticket (user-facing) and an Exploitation ticket (infrastructure) from the first description saves time and avoids wrong-team assignments.",
        "Always reproduce the issue remotely before touching any configuration — confirming the exact symptom prevents premature or incorrect changes."
      ]
    },
    {
      "type": "resources",
      "title": "Tools used",
      "items": [
        {
          "href": "https://www.autotask.net",
          "label": "Autotask — PSA / Ticketing platform"
        },
        {
          "href": "https://www.webroot.com/us/en/business/smb/endpoint-protection",
          "label": "Webroot Business Endpoint Protection"
        },
        {
          "href": "https://www.datto.com/products/rmm",
          "label": "Datto RMM — Remote Monitoring & Management"
        }
      ]
    }
  ]'
WHERE slug = 'it-ops-incident-management' AND locale = 'en';

-- ══════════════════════════════════════════════════════
-- VERSION FR
-- ══════════════════════════════════════════════════════
UPDATE projects SET
  badge        = '{"tone": "professional", "label": "STAGE"}',
  hero_subtitle = 'Triage d''incidents en production chez MIDRANGE GROUP : ticketing Autotask, accès distant Datto RMM et résolution d''un faux positif Webroot.',
  highlights   = ARRAY[
    'Triage de tickets via Autotask (téléphone / e-mail / agent Datto RMM)',
    'Diagnostic à distance via Datto RMM — aucune intervention sur site',
    'Faux positif Webroot résolu par exclusion d''URL depuis la console de gestion',
    'Accès client rétabli sans réinstallation ni reconfiguration de Webroot',
    'Résolution documentée dans Autotask (saisie de temps pour facturation et traçabilité)'
  ],
  sections = '[
    {
      "type": "text",
      "title": "Contexte",
      "paragraphs": [
        "Lors d''un stage chez MIDRANGE GROUP (équipe Support Technique), j''ai été placée sous la tutelle de [administrateur systèmes & réseaux], Administrateur Systèmes et Réseaux. L''équipe traite les demandes de support des clients gérés via trois canaux d''entrée : appels téléphoniques directs vers la ligne support, e-mails à l''adresse support, et alertes automatiques levées par l''agent Datto RMM installé sur les postes clients.",
        "Une fois un ticket ouvert dans Autotask, il est routé soit vers l''équipe Support Technique (incidents utilisateurs), soit vers l''équipe Exploitation (infrastructure et supervision). Théo m''a confié un ticket client en production à traiter sous sa supervision."
      ]
    },
    {
      "type": "bullets",
      "title": "Les trois canaux d''ouverture de tickets",
      "items": [
        "Téléphone : le client appelle directement la ligne support. Le technicien crée le ticket manuellement dans Autotask et commence le triage immédiatement.",
        "E-mail : le client envoie un message à l''adresse support. Autotask l''ingère automatiquement et crée le ticket, qui est ensuite assigné à la file appropriée.",
        "Agent Datto RMM : l''agent installé sur les postes gérés supervise l''appareil en temps réel et peut lever des alertes automatiquement (pic CPU, disque plein, événement de sécurité). Ces alertes génèrent des tickets dans Autotask sans aucune action du client."
      ]
    },
    {
      "type": "timeline",
      "title": "Résolution de l''incident — étape par étape",
      "steps": [
        {
          "title": "Étape 1 — Ticket reçu dans Autotask",
          "description": "Un client signalait ne pas pouvoir accéder à un site internet spécifique. Webroot affichait un message « site bloqué » sur son poste. Le ticket a été assigné à Théo et délégué pour une résolution en conditions réelles."
        },
        {
          "title": "Étape 2 — Prise en main à distance via Datto RMM",
          "description": "Nous avons contacté le client et demandé son autorisation pour prendre le contrôle à distance de son poste via Datto RMM. Cela nous a permis de reproduire le problème en temps réel, de voir exactement le message d''avertissement Webroot, et de confirmer quelle URL était bloquée."
        },
        {
          "title": "Étape 3 — Diagnostic : faux positif Webroot",
          "description": "Après examen de l''URL bloquée, nous avons déterminé qu''il s''agissait d''un site professionnel légitime, incorrectement signalé par l''intelligence de menaces de Webroot. Le site n''était pas malveillant — Webroot l''avait classé comme suspect sur la base de son score de réputation de domaine."
        },
        {
          "title": "Étape 4 — Exclusion d''URL dans la console de gestion Webroot",
          "description": "Nous nous sommes connectés à la console de gestion Webroot (CE 23.2) et avons navigué vers la liste de suppression d''URL dans la politique du client. Nous avons ajouté le domaine bloqué à la liste de suppression (liste blanche). Le changement s''est propagé sur le poste du client en quelques minutes, et le site est devenu accessible sans aucune intervention supplémentaire sur la machine."
        },
        {
          "title": "Étape 5 — Résolution consignée dans Autotask",
          "description": "Une saisie de temps a été créée dans Autotask avec un résumé du problème, la cause racine (faux positif) et les étapes de résolution effectuées. Le ticket a été clôturé comme « Terminé ». Le temps de travail a été enregistré pour la facturation client et intégré à la traçabilité des interventions."
        }
      ]
    },
    {
      "type": "metrics",
      "title": "Chiffres clés",
      "items": [
        {
          "label": "Canaux d''entrée de tickets",
          "value": "3",
          "note": "Téléphone · E-mail · Agent Datto RMM"
        },
        {
          "label": "Intervention sur site",
          "value": "Aucune",
          "note": "Résolution 100% à distance via Datto RMM"
        },
        {
          "label": "Réinstallation Webroot",
          "value": "Non",
          "note": "Exclusion d''URL depuis la console — poste non modifié"
        },
        {
          "label": "Résolution documentée",
          "value": "Oui",
          "note": "Saisie Autotask avec cause racine et étapes"
        }
      ]
    },
    {
      "type": "bullets",
      "title": "Apprentissages clés",
      "items": [
        "Les faux positifs Webroot sur des sites professionnels légitimes sont un scénario de support récurrent : le premier réflexe doit toujours être de vérifier la liste de suppression d''URL avant d''escalader ou de reconfigurer le poste.",
        "L''accès distant Datto RMM élimine le besoin de déplacements sur site pour la majorité des incidents utilisateurs, réduisant significativement le temps de résolution.",
        "Les saisies de temps Autotask ne sont pas optionnelles : elles servent à la fois de pièce de facturation pour le client et de base de connaissances consultable pour les incidents récurrents.",
        "Le routage des tickets est essentiel : distinguer dès le premier signalement un ticket Support Technique (utilisateur) d''un ticket Exploitation (infrastructure) évite les mauvaises attributions et les pertes de temps.",
        "Toujours reproduire le problème à distance avant de modifier une configuration — confirmer le symptôme exact prévient les changements prématurés ou incorrects."
      ]
    },
    {
      "type": "resources",
      "title": "Outils utilisés",
      "items": [
        {
          "href": "https://www.autotask.net",
          "label": "Autotask — PSA / Plateforme de ticketing"
        },
        {
          "href": "https://www.webroot.com/fr/fr/business/smb/endpoint-protection",
          "label": "Webroot Business Endpoint Protection"
        },
        {
          "href": "https://www.datto.com/fr/products/rmm",
          "label": "Datto RMM — Supervision et gestion à distance"
        }
      ]
    }
  ]'
WHERE slug = 'it-ops-incident-management' AND locale = 'fr';
