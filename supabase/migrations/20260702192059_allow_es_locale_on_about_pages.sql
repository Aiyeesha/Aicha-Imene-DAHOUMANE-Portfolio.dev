-- Allow 'es' as a valid locale on about_pages, in preparation for Spanish
-- support. The Spanish row itself is inserted directly in production via
-- the Supabase MCP tools (not via scripts/seed.ts), matching fr/en content.
ALTER TABLE about_pages DROP CONSTRAINT about_pages_locale_check;
ALTER TABLE about_pages ADD CONSTRAINT about_pages_locale_check CHECK (locale = ANY (ARRAY['fr'::text, 'en'::text, 'es'::text]));
