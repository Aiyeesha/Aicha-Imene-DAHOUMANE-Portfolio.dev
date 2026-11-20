-- Allow 'es' as a valid locale on testimonial_submissions, mirroring the
-- projects/about_pages migrations. Applied directly in production via the
-- Supabase MCP tools when the testimonial-submit form gained Spanish support;
-- this file backfills the migration history that was missing it.
ALTER TABLE testimonial_submissions
  DROP CONSTRAINT testimonial_submissions_locale_check,
  ADD CONSTRAINT testimonial_submissions_locale_check
    CHECK (locale = ANY (ARRAY['fr'::text, 'en'::text, 'es'::text]));
