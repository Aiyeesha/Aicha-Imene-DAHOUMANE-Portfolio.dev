# Scripts

Utility scripts, grouped by theme. Run every command from the repository root.
Scripts that talk to Supabase read `.env.local` (or `.env`).

## `content/` — site content

| Command | Script | Purpose |
|---|---|---|
| `npm run content:safety` | `check-publish-safety.ts` | Checks `content/`: FR/EN/ES parity of published projects and the SaaS embargo (rules in `lib/contentChecks.ts`, also tested on every PR). Run daily by `.github/workflows/content-publish-safety.yml`, no secret needed. |
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

The site serves projects from `content/`; nothing in the app reads Supabase any more for them. These scripts maintained the former `public.projects` copy and are **kept on purpose**, in case the content moves back to a SQL database. Run them only against a database you intend to fill.

> **October 2026:** the `about_pages` table no longer exists in production, so `db:seed:about` fails until the table is recreated or the script is retired. The about page itself reads `content/about.ts` and is not affected.

| Command | Script | Purpose |
|---|---|---|
| `npm run db:seed:about` | `seed-about.ts` | Upserts `about_pages` from `content/about.ts` (non-destructive). |
| `npm run db:seed:es` | `seed-es-projects.ts` | (Re)inserts the `es` rows of `projects` (idempotent, fr/en untouched). |
| `npm run db:repos` | `update-github-repos.ts` | Updates only `projects.repo_url` from `content/github-repos.ts`. |
| `npm run db:uptime:copy` | `copy-uptime-to-redis.ts` | One-shot, optional copy of the last 30 days of `uptime_pings` to the Redis uptime history (`-- --dry` counts only). Idempotent. |
| — | `seed.ts` | **Destructive**: empties the tables, then re-seeds everything. Deliberately not an npm command: `npx tsx scripts/db/seed.ts`, only after a backup. |

Schema changes go through `supabase/migrations/` and the Supabase CLI (`supabase db push`), not through these scripts.

## `tooling/` — build and install

| Command | Script | Purpose |
|---|---|---|
| `postinstall` (automatic) | `fix-nested-sharp.mjs` | Removes the vulnerable nested copy of `sharp` pinned by Next.js. |

## `archive/` — no longer used

Kept for reference only, see [`archive/README.md`](archive/README.md). Do not run them.
