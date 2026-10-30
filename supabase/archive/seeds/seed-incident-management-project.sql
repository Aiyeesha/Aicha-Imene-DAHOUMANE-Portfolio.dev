-- supabase/seed-incident-management-project.sql
-- -----------------------------------------------
-- Insère le projet "Gestion d'incidents IT — Autotask / Webroot / Datto RMM"
-- Contexte : stage chez MIDRANGE GROUP (équipe Support Technique)
-- Incident : site web bloqué par Webroot → exclusion URL depuis la console Webroot
--
-- À exécuter dans l'éditeur SQL Supabase (dashboard → SQL Editor).
-- Idempotent : ON CONFLICT DO NOTHING évite les doublons si rejoué.

-- ── Version EN ───────────────────────────────────────────────────────────────

INSERT INTO projects (
  slug, locale, title, summary, content,
  tech_stack, repo_url, live_url,
  track, categories, tags, badge, highlights,
  featured, sort_order, status
)
VALUES (
  'it-ops-incident-management',
  'en',
  'IT Incident Management — Autotask, Webroot & Datto RMM',
  'Hands-on incident triage during an internship at MIDRANGE GROUP Support team: receiving tickets via Autotask, remote access via Datto RMM, and resolving a Webroot false positive by whitelisting the blocked URL from the management console.',
  'During an internship at MIDRANGE GROUP (Support Technique team), I worked under the supervision of a Systems & Network Administrator on live client tickets. Tickets could be opened by clients via phone, email, or automatically through the Datto RMM agent installed on managed endpoints. A client reported being unable to access a website — Webroot was displaying a "site blocked" warning. After taking remote control of the client machine via Datto RMM to reproduce the issue, we connected to the Webroot Management Console to add the URL to the suppression list, immediately restoring the client''s access.',
  ARRAY['Autotask', 'Webroot', 'Datto RMM'],
  NULL,
  NULL,
  'itops',
  ARRAY['IT Ops', 'Incident Management', 'ITSM'],
  ARRAY['IT Ops', 'ITSM', 'Security', 'RMM', 'Windows'],
  '{"tone": "professional", "label": "INTERNSHIP"}',
  ARRAY[
    'Ticket triage via Autotask (phone / email / Datto RMM agent)',
    'Remote diagnosis via Datto RMM — no on-site intervention needed',
    'Webroot false positive resolved by URL suppression from management console',
    'Client access restored without reinstalling or reconfiguring Webroot',
    'Documented resolution in Autotask time entry for billing and audit trail'
  ],
  true,
  20,
  'published'
)
ON CONFLICT (slug, locale) DO NOTHING;

-- ── Version FR ───────────────────────────────────────────────────────────────

INSERT INTO projects (
  slug, locale, title, summary, content,
  tech_stack, repo_url, live_url,
  track, categories, tags, badge, highlights,
  featured, sort_order, status
)
VALUES (
  'it-ops-incident-management',
  'fr',
  'Gestion d''incidents IT — Autotask, Webroot & Datto RMM',
  'Triage d''incidents en conditions réelles lors d''un stage chez MIDRANGE GROUP (équipe Support) : réception des tickets via Autotask, prise en main à distance via Datto RMM, et résolution d''un faux positif Webroot par exclusion d''URL depuis la console de gestion.',
  'Lors d''un stage chez MIDRANGE GROUP (équipe Support Technique), j''ai travaillé sous la tutelle d''un Administrateur Systèmes et Réseaux sur des tickets clients en production. Les tickets pouvaient être ouverts par les clients par téléphone, par e-mail, ou automatiquement via l''agent Datto RMM installé sur les postes gérés. Un client signalait ne pas pouvoir accéder à un site internet — Webroot affichait un message « site bloqué ». Après prise en main à distance du poste client via Datto RMM pour reproduire le problème, nous nous sommes connectés à la console de gestion Webroot pour ajouter l''URL à la liste de suppression, restaurant immédiatement l''accès du client.',
  ARRAY['Autotask', 'Webroot', 'Datto RMM'],
  NULL,
  NULL,
  'itops',
  ARRAY['IT Ops', 'Gestion des incidents', 'ITSM'],
  ARRAY['IT Ops', 'ITSM', 'Sécurité', 'RMM', 'Windows'],
  '{"tone": "professional", "label": "STAGE"}',
  ARRAY[
    'Triage de tickets via Autotask (téléphone / e-mail / agent Datto RMM)',
    'Diagnostic à distance via Datto RMM — aucune intervention sur site',
    'Faux positif Webroot résolu par exclusion d''URL depuis la console de gestion',
    'Accès client rétabli sans réinstallation ni reconfiguration de Webroot',
    'Résolution documentée dans Autotask (saisie de temps pour facturation et traçabilité)'
  ],
  true,
  20,
  'published'
)
ON CONFLICT (slug, locale) DO NOTHING;
