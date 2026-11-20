# Scripts

Utility scripts, grouped by theme. Run every command from the repository root.
Scripts read `.env.local` (or `.env`). The `db/` scripts need the optional Supabase variables listed at the end of `.env.example`.

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

## Former Supabase tooling — archived

The site no longer uses a database: projects, the About page and certifications live in `content/`, the uptime history and incidents in Upstash Redis. The scripts that maintained the former Supabase copy are archived in `scripts/archive/db/` and the SQL history in `docs/archive/supabase/`. They are kept for reference only: no npm command runs them, `@supabase/supabase-js` is no longer installed, and the archive is excluded from the typecheck and the lint. To revive one, reinstall the client and run it with `npx tsx`.

## `tooling/` — build and install

| Command | Script | Purpose |
|---|---|---|
| `postinstall` (automatic) | `fix-nested-sharp.mjs` | Removes the vulnerable nested copy of `sharp` pinned by Next.js. |

## `archive/` — no longer used

Kept for reference only, see [`archive/README.md`](archive/README.md). Do not run them.
