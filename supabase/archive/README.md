# Archived SQL — reference only

The project pages are served from `content/` (`content/projects.ts`,
`content/projectDetails.ts`), no longer from the `public.projects` table.
These files filled or patched that table at earlier stages; they have all been
applied and are kept for history only. Do not re-run them: they would
overwrite the current copy of the content in Supabase.

- `one-off/` — one-off fixes (case studies, galleries, sort order, old slugs).
- `seeds/` — initial project rows and full snapshots of the former tables
  (`about_pages`, `goals_2026`, `certifications`, the latter dropped by
  migration `20260809074953`).

Still in use: `supabase/migrations/` (schema and RLS) and
`supabase/maintenance/retention.sql` (manual GDPR purge).
