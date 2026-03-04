-- supabase/policies.sql
-- ----------------------
-- Politiques Row Level Security (RLS) pour toutes les tables du portfolio.
-- À exécuter dans l'éditeur SQL Supabase ou via : supabase db push
--
-- PRINCIPE :
--   - Les tables publiques (projets, certifications, about, témoignages) :
--     → SELECT autorisé pour le rôle `anon` (visiteurs non authentifiés)
--     → INSERT / UPDATE / DELETE refusés pour `anon`
--   - La table contact :
--     → INSERT autorisé pour `anon` (soumission de formulaire)
--     → SELECT / UPDATE / DELETE refusés pour `anon` (lecture protégée)
--   - Le rôle `service_role` (utilisé côté serveur uniquement via SUPABASE_SERVICE_KEY)
--     contourne automatiquement le RLS — ne jamais exposer cette clé côté client.
--
-- VÉRIFICATION :
--   SELECT tablename, rowsecurity FROM pg_tables
--   WHERE schemaname = 'public';
-- ─────────────────────────────────────────────────────────────────────


-- ════════════════════════════════════════════════════════════════════
-- TABLE : projects (projets publiés)
-- ════════════════════════════════════════════════════════════════════

-- Activer RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Lecture publique : seuls les projets dont status = 'published' sont visibles
-- (la colonne s'appelle "status" et contient le texte 'published', pas un booléen)
DROP POLICY IF EXISTS "anon can read published projects" ON projects;
CREATE POLICY "anon can read published projects"
  ON projects
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Aucune écriture anonyme
DROP POLICY IF EXISTS "anon cannot write projects" ON projects;


-- ════════════════════════════════════════════════════════════════════
-- TABLE : project_assets (médias associés aux projets)
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS project_assets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can read project assets" ON project_assets;
CREATE POLICY "anon can read project assets"
  ON project_assets
  FOR SELECT
  TO anon
  USING (true);


-- ════════════════════════════════════════════════════════════════════
-- TABLE : about_pages (page À propos)
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS about_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can read about" ON about_pages;
CREATE POLICY "anon can read about"
  ON about_pages
  FOR SELECT
  TO anon
  USING (true);


-- ════════════════════════════════════════════════════════════════════
-- TABLE : certifications
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS certifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can read certifications" ON certifications;
CREATE POLICY "anon can read certifications"
  ON certifications
  FOR SELECT
  TO anon
  USING (true);


-- ════════════════════════════════════════════════════════════════════
-- TABLE : testimonials (témoignages professionnels)
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS testimonials ENABLE ROW LEVEL SECURITY;

-- Seuls les témoignages publiés (is_published = true) sont lisibles publiquement
DROP POLICY IF EXISTS "anon can read published testimonials" ON testimonials;
CREATE POLICY "anon can read published testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Aucune écriture anonyme
-- (les témoignages sont créés via le dashboard Supabase, pas via l'API publique)


-- ════════════════════════════════════════════════════════════════════
-- TABLE : messages (soumissions du formulaire de contact)
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;

-- INSERT autorisé : les visiteurs peuvent soumettre un message
-- Le rate-limiting est géré côté API route (Redis Upstash)
DROP POLICY IF EXISTS "anon can insert contact messages" ON messages;
CREATE POLICY "anon can insert contact messages"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Lecture interdite pour `anon` : les messages sont privés
-- Seul le rôle `service_role` (côté serveur) peut les lire
DROP POLICY IF EXISTS "anon cannot read contact messages" ON messages;


-- ════════════════════════════════════════════════════════════════════
-- VÉRIFICATION FINALE
-- ════════════════════════════════════════════════════════════════════
-- Exécuter pour vérifier que RLS est activé sur toutes les tables :
--
-- SELECT
--   tablename,
--   rowsecurity AS rls_enabled
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
--
-- Exécuter pour lister toutes les politiques actives :
--
-- SELECT
--   tablename,
--   policyname,
--   roles,
--   cmd,
--   qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
