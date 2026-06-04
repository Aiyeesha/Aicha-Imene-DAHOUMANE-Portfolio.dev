-- supabase/seed-workstation-deployment-project.sql
-- --------------------------------------------------
-- Insère le projet "Déploiement en masse de postes de travail" dans la table projects.
-- Contexte : stage chez MIDRANGE GROUP (équipe APS)
-- Périmètre : 64 Dell Optiplex (Blancco + Sysprep) + 200 Dell Latitude (Autopilot)
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
  'workstation-mass-deployment',
  'en',
  'Mass Workstation Deployment — 264 Dell Devices',
  'End-to-end deployment of 264 workstations during an internship at MIDRANGE GROUP (APS team): certified data erasure with Blancco on 64 Dell Optiplex PCs, Sysprep golden image rollout, and zero-touch Windows Autopilot enrollment of 200 Dell Latitude laptops via Dell ImageAssist.',
  'During an internship at MIDRANGE GROUP (Alternative Partner Solutions team), I was responsible for deploying two device fleets: 64 Dell Optiplex desktops for on-site staff and 200 Dell Latitude laptops for remote users. Each fleet required a different approach. The Optiplex machines were repurposed hardware: they went through certified data erasure with Blancco (NIST 800-88, automated certificate generation), then received a Sysprep golden image deployed via WinPE + DISM. The Latitude laptops were brand-new units: they were registered in Microsoft Intune via Dell ImageAssist (hardware hash capture + cloud image provisioning) and enrolled through Windows Autopilot for a fully zero-touch OOBE experience.',
  ARRAY['Windows Autopilot', 'Microsoft Intune', 'Dell ImageAssist', 'Blancco', 'Sysprep', 'WinPE / DISM', 'Microsoft Entra ID', 'PowerShell'],
  NULL,
  NULL,
  'itops',
  ARRAY['IT Ops', 'Deployment', 'Endpoint Management'],
  ARRAY['IT Ops', 'Windows', 'Deployment', 'Intune', 'Security'],
  '{"tone": "professional", "label": "INTERNSHIP"}',
  ARRAY[
    '64 Dell Optiplex — certified erasure (Blancco NIST 800-88) + Sysprep imaging',
    '200 Dell Latitude — zero-touch Autopilot via Dell ImageAssist',
    'Hands-on IT time per Latitude post-setup: < 5 minutes',
    'Blancco compliance certificates generated for all wiped devices',
    'Intune deployment profiles, BitLocker, Defender and update rings configured'
  ],
  true,
  10,
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
  'workstation-mass-deployment',
  'fr',
  'Déploiement en masse de postes de travail — 264 appareils Dell',
  'Déploiement de bout en bout de 264 postes lors d''un stage chez MIDRANGE GROUP (équipe APS) : effacement certifié Blancco sur 64 PC Dell Optiplex, déploiement d''image Sysprep, et enrôlement zero-touch Windows Autopilot de 200 laptops Dell Latitude via Dell ImageAssist.',
  'Lors d''un stage chez MIDRANGE GROUP (équipe Alternative Partner Solutions), j''ai pris en charge le déploiement de deux flottes d''appareils : 64 PC de bureau Dell Optiplex pour les collaborateurs sur site et 200 laptops Dell Latitude pour les utilisateurs en mobilité. Chaque flotte nécessitait une approche différente. Les machines Optiplex étaient du matériel reconditionné : elles ont subi un effacement certifié avec Blancco (norme NIST 800-88, génération automatique de certificats), puis ont reçu une image Sysprep déployée via WinPE + DISM. Les laptops Latitude étaient du matériel neuf : ils ont été enregistrés dans Microsoft Intune via Dell ImageAssist (capture du hash matériel + provisionnement d''image cloud) et enrôlés via Windows Autopilot pour une expérience OOBE entièrement zero-touch.',
  ARRAY['Windows Autopilot', 'Microsoft Intune', 'Dell ImageAssist', 'Blancco', 'Sysprep', 'WinPE / DISM', 'Microsoft Entra ID', 'PowerShell'],
  NULL,
  NULL,
  'itops',
  ARRAY['IT Ops', 'Déploiement', 'Gestion des terminaux'],
  ARRAY['IT Ops', 'Windows', 'Déploiement', 'Intune', 'Sécurité'],
  '{"tone": "professional", "label": "STAGE"}',
  ARRAY[
    '64 Dell Optiplex — effacement certifié (Blancco NIST 800-88) + image Sysprep',
    '200 Dell Latitude — Autopilot zero-touch via Dell ImageAssist',
    'Temps d''intervention IT par Latitude après configuration : < 5 minutes',
    'Certificats de conformité Blancco générés pour tous les appareils effacés',
    'Profils Intune, BitLocker, Defender et anneaux de mise à jour configurés'
  ],
  true,
  10,
  'published'
)
ON CONFLICT (slug, locale) DO NOTHING;
