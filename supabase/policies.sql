-- supabase/policies.sql
-- ----------------------
-- Politiques Row Level Security (RLS) pour toutes les tables du portfolio.
-- À exécuter dans l'éditeur SQL Supabase ou via : supabase db push
--
-- PRINCIPE :
--   - Les tables publiques (projets, certifications, about, témoignages) :
--     → SELECT autorisé pour le rôle `anon` (visiteurs non authentifiés)
--     → INSERT / UPDATE / DELETE refusés pour `anon`
--   - La table messages :
--     → INSERT via service_role uniquement (Route Handler /api/contact)
--     → Aucune policy anon INSERT — la clé anon ne peut pas écrire directement
--     → Empêche le bypass du formulaire via l'API REST Supabase publique
--   - Le rôle `service_role` (utilisé côté serveur uniquement via SUPABASE_SERVICE_ROLE_KEY)
--     contourne automatiquement le RLS — ne jamais exposer cette clé côté client.
--
-- NETTOYAGE des policies redondantes créées via le dashboard :
--   Les policies *_read_public / *_write_admin / messages_insert_public
--   ont été créées manuellement et sont soit redondantes, soit trop permissives.
--   Ce script les supprime et définit l'état cible propre.
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

-- Supprimer les policies redondantes / trop permissives créées via dashboard.
-- `projects_read_published` (role: public) pouvait avoir USING(true) et exposer
-- tous les projets (draft, archived) — les policies permissives s'additionnent en OR.
-- `projects_write_admin` (role: authenticated) est inutile ici (service_role suffit).
DROP POLICY IF EXISTS "projects_read_published" ON projects;
DROP POLICY IF EXISTS "projects_write_admin" ON projects;
DROP POLICY IF EXISTS "anon cannot write projects" ON projects;

-- Lecture publique : seuls les projets dont status = 'published' sont visibles
-- (la colonne s'appelle "status" et contient le texte 'published', pas un booléen)
DROP POLICY IF EXISTS "anon can read published projects" ON projects;
CREATE POLICY "anon can read published projects"
  ON projects
  FOR SELECT
  TO anon
  USING (status = 'published');


-- ════════════════════════════════════════════════════════════════════
-- TABLE : project_assets (médias associés aux projets)
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS project_assets ENABLE ROW LEVEL SECURITY;

-- Supprimer les policies redondantes / trop permissives créées via dashboard.
-- `project_assets_read_public` (role: public) pouvait avoir USING(true) et
-- exposer les assets de projets draft/archived — neutralisant la policy restrictive.
-- `project_assets_write_admin` (role: authenticated) inutile (service_role suffit).
DROP POLICY IF EXISTS "project_assets_read_public" ON project_assets;
DROP POLICY IF EXISTS "project_assets_write_admin" ON project_assets;
DROP POLICY IF EXISTS "anon can read project assets" ON project_assets;

-- Lecture restreinte : jointure explicite sur le statut du projet parent.
-- Seuls les assets dont le projet a status = 'published' sont lisibles par anon.
CREATE POLICY "anon can read published project assets"
  ON project_assets
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1
      FROM projects p
      WHERE p.id = project_assets.project_id
        AND p.status = 'published'
    )
  );


-- ════════════════════════════════════════════════════════════════════
-- TABLE : about_pages (page À propos)
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS about_pages ENABLE ROW LEVEL SECURITY;

-- Supprimer les policies redondantes créées via dashboard.
DROP POLICY IF EXISTS "about_read_published" ON about_pages;
DROP POLICY IF EXISTS "about_write_admin" ON about_pages;

-- Filtre sur status = 'published' — la table utilise status et non is_published.
-- Protège contre l'exposition accidentelle d'un brouillon (status = 'draft').
DROP POLICY IF EXISTS "anon can read about" ON about_pages;
CREATE POLICY "anon can read about"
  ON about_pages
  FOR SELECT
  TO anon
  USING (status = 'published');


-- ════════════════════════════════════════════════════════════════════
-- TABLE : certifications
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS certifications ENABLE ROW LEVEL SECURITY;

-- Supprimer les policies redondantes créées via dashboard.
DROP POLICY IF EXISTS "certifications_read_published" ON certifications;
DROP POLICY IF EXISTS "certifications_write_admin" ON certifications;

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

-- CORRECTION SÉCURITÉ : suppression de la policy INSERT anon sur testimonial_submissions.
-- La policy "anon can submit testimonials" existait en production et permettait à
-- n'importe qui avec la clé anon publique d'insérer directement dans Supabase,
-- bypassant honeypot, rate-limit Redis, validation des champs et token HMAC.
-- Toutes les insertions passent désormais par /api/testimonial-submit (service_role).
DROP POLICY IF EXISTS "anon can submit testimonials" ON testimonial_submissions;
ALTER TABLE IF EXISTS testimonial_submissions ENABLE ROW LEVEL SECURITY;
-- Aucune policy anon = deny by default. Le service_role (côté serveur) contourne RLS.

-- CORRECTION SÉCURITÉ : suppression du SELECT anon sur uptime_pings.
-- La policy était documentée comme supprimée mais toujours active en production.
-- uptime_pings contient des données d'infrastructure (latences, historique uptime)
-- qui ne doivent pas être lisibles publiquement.
DROP POLICY IF EXISTS "anon can read uptime pings" ON uptime_pings;
ALTER TABLE IF EXISTS uptime_pings ENABLE ROW LEVEL SECURITY;
-- Aucune policy anon = deny by default.


-- ════════════════════════════════════════════════════════════════════
-- TABLE : messages (soumissions du formulaire de contact)
-- ════════════════════════════════════════════════════════════════════

ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;

-- CORRECTION CRITIQUE : suppression de toutes les policies INSERT anon/public.
-- La route /api/contact utilise désormais service_role (createAdminSupabaseClient)
-- pour insérer les messages. Aucune policy anon n'est nécessaire — cela empêche
-- le bypass direct de l'API REST Supabase avec la clé anon publique, qui
-- contournait honeypot, origin guard et rate-limiting de la Route Handler.
DROP POLICY IF EXISTS "anon can insert contact messages" ON messages;
DROP POLICY IF EXISTS "messages_insert_public" ON messages;
DROP POLICY IF EXISTS "anon cannot read contact messages" ON messages;

-- Aucune policy INSERT anon — insertion via service_role uniquement (côté serveur).
-- Lecture interdite pour `anon` : les messages sont privés.
-- Seul le rôle `service_role` (côté serveur) peut lire et écrire.


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
