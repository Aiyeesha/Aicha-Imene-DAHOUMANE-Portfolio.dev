# Scripts

Utility scripts, grouped by theme. Run every command from the repository root.
Scripts that talk to Supabase read `.env.local` (or `.env`).

## `content/` — site content

| Command | Script | Purpose |
|---|---|---|
| `npm run content:safety` | `check-publish-safety.ts` | Checks `public.projects`: FR/EN/ES parity and the SaaS embargo. Also run daily by `.github/workflows/content-publish-safety.yml`. |
| `npm run content:cv` | `generate-cv-pdf.mjs` | Builds the CV PDFs of `public/cv/` from their HTML sources (Puppeteer). |

## `assets/` — images and generated manifests

| Command | Script | Purpose |
|---|---|---|
| `npm run assets:manifest` | `generate-project-assets.mjs` | Regenerates `content/project-assets.json` (projects with a logo and a cover). Re-run after adding or removing one. |
| `npm run assets:optimize` | `optimize-images.mjs` | Converts `public/projects/` images to WebP into `public/projects-optimized/` (git-ignored); copy back what you keep. |

## `privacy/` — redaction before publishing

| Command | Script | Purpose |
|---|---|---|
| `npm run assets:redact` | `redact-screenshots.mjs` | OCR + blur of IPs, emails, domains, phone numbers and Salesforce ids in project screenshots. `-- --dry-run` previews, `-- --folder <slug>` limits to one project. |
| — | `redact-certifications.py` | Irreversibly blurs personal data on diploma scans: `python3 scripts/privacy/redact-certifications.py <originals> public/certifications`. |

## `db/` — copy of the content in Supabase

The site serves projects from `content/`. The `public.projects` and `about_pages` tables are a copy read by `/admin`, the health checks (`lib/health.ts`) and `content:safety`; these scripts keep that copy in sync.

| Command | Script | Purpose |
|---|---|---|
| `npm run db:seed:about` | `seed-about.ts` | Upserts `about_pages` from `content/about.ts` (non-destructive). |
| `npm run db:seed:es` | `seed-es-projects.ts` | (Re)inserts the `es` rows of `projects` (idempotent, fr/en untouched). |
| `npm run db:repos` | `update-github-repos.ts` | Updates only `projects.repo_url` from `content/github-repos.ts`. |
| — | `seed.ts` | **Destructive**: empties the tables, then re-seeds everything. Deliberately not an npm command: `npx tsx scripts/db/seed.ts`, only after a backup. |

Schema changes go through `supabase/migrations/` and the Supabase CLI (`supabase db push`), not through these scripts.

## `tooling/` — build and install

| Command | Script | Purpose |
|---|---|---|
| `postinstall` (automatic) | `fix-nested-sharp.mjs` | Removes the vulnerable nested copy of `sharp` pinned by Next.js. |

## `archive/` — no longer used

Kept for reference only, see [`archive/README.md`](archive/README.md). Do not run them.
