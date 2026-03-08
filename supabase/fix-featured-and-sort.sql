-- supabase/fix-featured-and-sort.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- Corrige featured + sort_order pour tous les projets IT Ops.
-- featured = false  → apparaît dans la grille
-- sort_order        → ordre d'affichage (plus petit = en premier)
-- ─────────────────────────────────────────────────────────────────────────────

-- ── IT OPS — tous featured: false pour apparaître dans la grille ──────────────
UPDATE projects SET featured = false
WHERE track = 'itops'
  AND slug IN (
    'workstation-mass-deployment',
    'it-ops-incident-management',
    'hardware-upgrade-hp-laptop',
    'it-ops-rmm-supervision',
    'it-ops-acronis-backup',
    'it-ops-virtualization-lab',
    'it-ops-network-security',
    'it-ops-disk-backup',
    'it-ops-workstation-setup',
    'it-ops-wifi-config',
    'it-ops-roaming-profiles',
    'it-ops-hardware-procurement',
    'it-ops-email-config'
  );

-- ── Sort order — impact décroissant ──────────────────────────────────────────
UPDATE projects SET sort_order = 10  WHERE slug = 'it-ops-rmm-supervision';
UPDATE projects SET sort_order = 20  WHERE slug = 'it-ops-acronis-backup';
UPDATE projects SET sort_order = 30  WHERE slug = 'it-ops-network-security';
UPDATE projects SET sort_order = 40  WHERE slug = 'workstation-mass-deployment';
UPDATE projects SET sort_order = 50  WHERE slug = 'it-ops-virtualization-lab';
UPDATE projects SET sort_order = 60  WHERE slug = 'it-ops-incident-management';
UPDATE projects SET sort_order = 70  WHERE slug = 'hardware-upgrade-hp-laptop';
UPDATE projects SET sort_order = 80  WHERE slug = 'it-ops-disk-backup';
UPDATE projects SET sort_order = 90  WHERE slug = 'it-ops-workstation-setup';
UPDATE projects SET sort_order = 100 WHERE slug = 'it-ops-wifi-config';
UPDATE projects SET sort_order = 110 WHERE slug = 'it-ops-roaming-profiles';
UPDATE projects SET sort_order = 120 WHERE slug = 'it-ops-hardware-procurement';
UPDATE projects SET sort_order = 130 WHERE slug = 'it-ops-email-config';

-- ── Vérification ─────────────────────────────────────────────────────────────
SELECT slug, locale, featured, sort_order
FROM projects
WHERE track = 'itops'
  AND slug NOT IN (
    'hemebiotech-java-debug','parkit-java-testing','pochlib-ui',
    'python-password-checker','python-network-scanner','nextjs-admin-dashboard',
    'monitoring-automation-pack'
  )
ORDER BY sort_order, locale;
