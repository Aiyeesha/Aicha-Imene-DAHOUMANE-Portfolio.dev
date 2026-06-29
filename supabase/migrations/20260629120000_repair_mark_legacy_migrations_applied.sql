-- Repair : marque les migrations 002-008 comme déjà appliquées dans le tracking Supabase.
--
-- Ces 8 migrations ont été appliquées directement via le dashboard Supabase (SQL editor)
-- sans passer par `supabase migration apply`, donc elles n'étaient pas dans
-- supabase_migrations.schema_migrations. Résultat : Supabase Preview essayait de
-- les ré-exécuter sur chaque branche preview et échouait sur des CREATE POLICY déjà existantes.
--
-- ON CONFLICT DO NOTHING → idempotent si la version est déjà présente (ex: branche preview
-- clonée depuis la prod après que la version 20260629120000 soit déjà trackée).

INSERT INTO supabase_migrations.schema_migrations (version, name, statements)
VALUES
  ('002', 'policies',                             ARRAY[]::text[]),
  ('003', 'uptime',                               ARRAY[]::text[]),
  ('004', 'testimonial_submissions',              ARRAY[]::text[]),
  ('005', 'goals_2026',                           ARRAY[]::text[]),
  ('006', 'security_hardening',                   ARRAY[]::text[]),
  ('007', 'projects_schema',                      ARRAY[]::text[]),
  ('008', 'about_goals_certifications_schema',    ARRAY[]::text[])
ON CONFLICT (version) DO NOTHING;
