-- Allow 'es' as a valid locale on projects, mirroring the about_pages migration
-- (20260702192059_allow_es_locale_on_about_pages.sql). Applied directly in
-- production via the Supabase MCP tools when the 31 projects were translated
-- to Spanish; this file backfills the migration history that was missing it.
ALTER TABLE projects DROP CONSTRAINT projects_locale_check;
ALTER TABLE projects ADD CONSTRAINT projects_locale_check CHECK (locale = ANY (ARRAY['fr'::text, 'en'::text, 'es'::text]));
