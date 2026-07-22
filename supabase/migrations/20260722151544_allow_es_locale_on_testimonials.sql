-- Allow 'es' as a valid locale on testimonials, mirroring the
-- testimonial_submissions/projects/about_pages migrations. Applied directly
-- in production via the Supabase MCP tools when the testimonial-submit form
-- gained Spanish support; this file backfills the migration history that was
-- missing it.
ALTER TABLE testimonials
  DROP CONSTRAINT testimonials_locale_check,
  ADD CONSTRAINT testimonials_locale_check
    CHECK (locale = ANY (ARRAY['fr'::text, 'en'::text, 'es'::text]));
