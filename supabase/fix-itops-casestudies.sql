-- supabase/fix-itops-casestudies.sql
-- ------------------------------------
-- Corrige les 3 case studies IT Ops insérés précédemment.
-- Problèmes résolus :
--   1. featured: true  → les projets étaient exclus de la grille (filtre !p.featured)
--   2. badge tone "professional" → n'existe pas dans la map CSS du frontend
--      (seuls "client" | "personal" | "training" sont valides)
--   3. badge label "INTERNSHIP"/"STAGE" → non référencé dans BADGE_LABELS
--      (utiliser "FIELD PRACTICE" → "Pratique terrain" en FR)
--   4. Catégories FR en français → le système utilise toujours des clés anglaises
--   5. Catégories inconnues → alignées sur CATEGORY_LABELS existants
-- À exécuter dans SQL Editor → Primary Database

-- ══════════════════════════════════════════════════════
-- 1. WORKSTATION MASS DEPLOYMENT (slug: workstation-mass-deployment)
-- ══════════════════════════════════════════════════════

UPDATE projects SET
  featured   = false,
  badge      = '{"tone": "client", "label": "FIELD PRACTICE"}',
  categories = ARRAY['IT Ops', 'Deployment', 'Endpoint']
WHERE slug = 'workstation-mass-deployment' AND locale = 'en';

UPDATE projects SET
  featured   = false,
  badge      = '{"tone": "client", "label": "FIELD PRACTICE"}',
  categories = ARRAY['IT Ops', 'Deployment', 'Endpoint']
WHERE slug = 'workstation-mass-deployment' AND locale = 'fr';

-- ══════════════════════════════════════════════════════
-- 2. IT INCIDENT MANAGEMENT (slug: it-ops-incident-management)
-- ══════════════════════════════════════════════════════

UPDATE projects SET
  featured   = false,
  badge      = '{"tone": "client", "label": "FIELD PRACTICE"}',
  categories = ARRAY['IT Ops', 'IT Support']
WHERE slug = 'it-ops-incident-management' AND locale = 'en';

UPDATE projects SET
  featured   = false,
  badge      = '{"tone": "client", "label": "FIELD PRACTICE"}',
  categories = ARRAY['IT Ops', 'IT Support']
WHERE slug = 'it-ops-incident-management' AND locale = 'fr';

-- ══════════════════════════════════════════════════════
-- 3. HARDWARE UPGRADE (slug: hardware-upgrade-hp-laptop)
-- ══════════════════════════════════════════════════════
-- Ce projet avait déjà featured: false et tone: "personal" — correct.
-- On corrige uniquement les catégories FR (utilisaient du français).

UPDATE projects SET
  badge      = '{"tone": "personal", "label": "PERSONAL PROJECT"}',
  categories = ARRAY['IT Ops', 'Hardware', 'Maintenance']
WHERE slug = 'hardware-upgrade-hp-laptop' AND locale = 'en';

UPDATE projects SET
  badge      = '{"tone": "personal", "label": "PERSONAL PROJECT"}',
  categories = ARRAY['IT Ops', 'Hardware', 'Maintenance']
WHERE slug = 'hardware-upgrade-hp-laptop' AND locale = 'fr';

-- ══════════════════════════════════════════════════════
-- VÉRIFICATION — exécuter après pour confirmer
-- ══════════════════════════════════════════════════════
-- SELECT slug, locale, featured, badge, categories, status
-- FROM projects
-- WHERE slug IN (
--   'workstation-mass-deployment',
--   'it-ops-incident-management',
--   'hardware-upgrade-hp-laptop'
-- )
-- ORDER BY slug, locale;
