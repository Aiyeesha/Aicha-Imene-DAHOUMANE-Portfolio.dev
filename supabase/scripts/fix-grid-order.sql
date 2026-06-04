-- supabase/fix-grid-order.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Met les 3 meilleurs cases IT Ops en "à la une" (featured = true)
-- 2. Pousse les projets Java/Web/Python après les 13 cases professionnels
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Featured : top 3 cases IT Ops ────────────────────────────────────────────
UPDATE projects SET featured = true
WHERE slug IN (
  'it-ops-rmm-supervision',
  'it-ops-acronis-backup',
  'it-ops-network-security'
);

-- ── Sort order Java/Web/Python/Admin → après les 13 cases ─────────────────────
UPDATE projects SET sort_order = 200 WHERE slug = 'hemebiotech-java-debug';
UPDATE projects SET sort_order = 210 WHERE slug = 'parkit-java-testing';
UPDATE projects SET sort_order = 220 WHERE slug = 'pochlib-ui';
UPDATE projects SET sort_order = 230 WHERE slug = 'python-password-checker';
UPDATE projects SET sort_order = 240 WHERE slug = 'python-network-scanner';
UPDATE projects SET sort_order = 250 WHERE slug = 'nextjs-admin-dashboard';

-- ── Vérification ─────────────────────────────────────────────────────────────
SELECT slug, locale, featured, sort_order
FROM projects
WHERE track = 'itops'
ORDER BY sort_order, locale;
