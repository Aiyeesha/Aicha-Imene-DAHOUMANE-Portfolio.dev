# Archived scripts — do not run

These scripts belong to former stages of the project. They are kept for
reference (history, articles, case studies) and are no longer wired to any
npm command. Their header comments still show their former paths.

| Script | Why it is archived |
|---|---|
| `apply-supabase-sql.ts` (was `npm run db:migrate`) | Replays the legacy migrations `001`–`008` from a hard-coded list. **Dangerous today**: `003` and `004` would recreate the `anon` policies removed since. Migrations are applied with the Supabase CLI (`supabase db push`). |
| `sync-project-assets.mjs` | One-shot move of the images from Supabase Storage to `public/projects/`, already done. |
| `upload-to-supabase-storage.mjs` (was `npm run images:upload`) | Uploaded images to Supabase Storage, which the site no longer uses (images are served by Vercel from `public/`). |
| `upload-project-screenshots.mjs` | Same: upload to Supabase Storage. |
| `check-publish-safety-supabase.ts` | Former `content:safety`, which read the Supabase `projects` copy. The current check reads `content/`. Kept for a possible return to a SQL database. |
| `test-supabase-public.ts` | Ad-hoc connectivity check of the public key; `/api/health` and `/status` cover it. |
