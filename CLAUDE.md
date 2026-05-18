# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Dev server (webpack mode)
npm run build         # Production build
npm run start         # Start production server
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm test              # Jest unit tests
npm run test:watch    # Jest in watch mode
npm run test:ci       # Jest (CI mode, passWithNoTests)
npm run test:e2e      # Playwright E2E (Chromium + Firefox)
npm run test:e2e:ui   # Playwright with UI
npm run test:e2e:debug # Playwright debug mode
npm run analyze       # Bundle analyzer (opens HTML reports)
npm run db:migrate    # Run SQL via scripts/apply-supabase-sql.ts
npm run images:optimize # Optimize project images to /public/projects-optimized/
```

Single test file: `npx jest __tests__/ContactForm.test.tsx`

## Architecture

### Routing & i18n

All user-facing pages live under `app/[locale]/`. The supported locales are `en` (default) and `fr`, defined in `i18n/routing.ts`. The `next-intl` plugin handles locale prefixing (`localePrefix: "always"`), so every URL is `/en/...` or `/fr/...`.

Translation strings (~400 keys each) live in `messages/en.json` and `messages/fr.json`. Server components use `getTranslations()`, client components consume them via `NextIntlClientProvider` set up in `app/[locale]/layout.tsx`.

### Middleware: `proxy.ts`

The Next.js middleware file is named `proxy.ts` (not `middleware.ts`) — this is intentional. It handles three things in order:
1. **CSP nonce** — generates a `crypto.randomUUID()` base64 nonce per request, injects it into `Content-Security-Policy` header and forwards it as `x-nonce` request header so Server Components can read it via `headers().get('x-nonce')`. This makes all HTML routes dynamically rendered (no CDN caching for HTML).
2. **Admin auth** — HTTP Basic Auth + Upstash rate-limit for `/admin` routes.
3. **i18n routing** — delegates to `next-intl` middleware. The `NEXT_LOCALE` cookie is intentionally filtered out from the response to preserve ISR caching on Vercel.

### Track Toggle System

The site has a dual-track mode: `"salesforce"` (default) and `"itops"`. The active track is stored in:
- `TrackContext` (React context) in `app/[locale]/providers.tsx`
- `localStorage` (persisted client-side)
- A `track` cookie (for SSR — but layout reads from localStorage on mount to avoid ISR cache busting)

Components that change based on track are prefixed `TrackAware*` (e.g., `TrackAwareServices`, `TrackAwareSkills`) or use `useTrack()` from providers. The hero section in `app/[locale]/track-aware-hero.tsx` is the primary track-adaptive component.

### Data Layer

Data flows: **Supabase → Redis cache → Server Component**.

The pattern in `lib/data/` is always two files:
- `*.ts` — raw Supabase query (e.g., `projects.ts`)
- `*.cached.ts` — wraps the raw fetcher with `cacheGetOrSet()` from `lib/cache.ts` using an Upstash Redis key with a TTL

`lib/cache.ts` is a thin wrapper: on cache miss it calls the fetcher and writes to Redis; on Redis unavailability it falls back to direct Supabase calls silently.

**Supabase client selection** — there are four clients in `lib/supabase/`:
- `server.ts` — service role, for server components reading protected data
- `admin.ts` — service role, for admin routes
- `client.ts` — anon key, for client components
- `public-server.ts` — anon key, for server components that only need public data

### Blog System

Blog posts exist in two parallel systems:
1. **Filesystem** — MDX files in `content/blog/posts/{en,fr}/*.mdx`. Loaded at build time by `content/blog/fs.ts` using `gray-matter` for frontmatter parsing. This is the source of truth for article content and metadata.
2. **Registry** — `content/blog/registry.ts` exports `BLOG_POSTS[]`, a curated list used for homepage highlights and navigation. Must be kept in sync with the filesystem.

Article series are defined in `content/blog/series.ts`. Table of contents is extracted via `content/blog/toc.ts`.

MDX rendering pipeline: `@next/mdx` + `remark-frontmatter` + `rehype-pretty-code` (Shiki syntax highlighting with dual light/dark themes via CSS variables `--shiki-light` / `--shiki-dark`).

### Content / Static Data

Most portfolio content lives in `content/*.ts` files (skills, services, certifications, experience, testimonials, etc.) as TypeScript exports — not in Supabase. Supabase stores: `projects`, `project_assets`, `about_pages`, `certifications`, `messages`, `testimonials`, `testimonial_submissions`, `goals_2026`, `uptime_pings`.

### API Routes

All API routes are in `app/api/`. Key ones:
- `/api/contact` — validates, rate-limits (Upstash), sends to Formspree + stores in Supabase
- `/api/cron/ping` — Vercel Cron (daily 08:00 UTC), writes to `uptime_pings` table, protected by `CRON_SECRET` bearer token
- `/api/health` — pings Supabase, Redis, and Formspree; used by the `/status` page (ISR 60s)
- `/api/csp-report` — receives CSP violation reports from browsers
- `/api/errors` — receives client JS errors from `GlobalErrorHandler` via `navigator.sendBeacon`
- `/api/cache/invalidate` — manual Redis cache invalidation, protected by `CACHE_INVALIDATE_SECRET`

### Admin Dashboard

`/admin` is a plain Next.js route group using Supabase service role. Access is gated entirely in `proxy.ts` middleware (HTTP Basic Auth + rate-limit). No NextAuth or session cookies.

### Security Notes

- CSP is dynamic (generated per request in `proxy.ts`), not static in `next.config.mjs`
- `'unsafe-inline'` is only present in development (webpack HMR); production uses `nonce-{nonce} 'strict-dynamic'`
- `/api/redis-test` returns 404 in production (debug route)
- All Supabase tables use RLS; `project_assets` restricts to published projects only

## Environment Variables

Required for local development (copy from README or ask):
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public, safe in browser
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, never expose
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — server-only
- `NEXT_PUBLIC_SITE_URL` — canonical URL, no trailing slash

The build succeeds without Redis/Supabase (falls back to empty arrays / direct fetches), which is how CI works.

## Key Conventions

- **Code comments are in French** — the developer's working language. Follow this convention.
- **`proxy.ts` not `middleware.ts`** — do not rename or create `middleware.ts`.
- **`lib/data/` pattern** — always add a `.cached.ts` companion when adding a new Supabase fetcher.
- **Track-adaptive components** — use `useTrack()` and name them `TrackAware*`.
- **Blog posts** — when adding a new post, add the MDX file to `content/blog/posts/{en,fr}/` AND add the metadata entry to `content/blog/registry.ts`.
- **No cookies for locale** — the middleware intentionally strips `NEXT_LOCALE` to preserve ISR caching; locale comes from the URL segment only.
- **Framer Motion** — all animations must respect `prefers-reduced-motion` (use `useReducedMotion()` or `motion` variants with `reducedMotion: "user"`).
- **Path alias** — `@/` maps to the project root (configured in `tsconfig.json` and `jest.config.cjs`).

## Changelog

### 18 May 2026
- **SEO audit (PRs #35–49)** — Correction complète des 8 findings de l'audit portfolio :
  - **F-01 (P0)** — Pages `/privacy`, `/legal`, `/accessibility` : contenu et `generateMetadata()` avec canonical corrects ajoutés
  - **F-02 (P1)** — Canonical URLs corrigées sur `/resources`, `/colophon`, `/changelog`, `/privacy`, `/accessibility` (pointaient vers la homepage)
  - **F-03 (P1)** — `generateMetadata()` complet (OG + Twitter + canonical + hreflang) sur `/projects/[slug]` ; JSON-LD `SoftwareApplication` ajouté en complément du `BreadcrumbList` existant
  - **F-04 (P2)** — Lien "Travaillons ensemble" uniformisé dans le footer via le layout partagé (`app/[locale]/layout.tsx`)
  - **F-05 (P2)** — Lien "Témoignages" supprimé du menu mobile (respecte `NEXT_PUBLIC_SHOW_TESTIMONIALS`)
  - **F-06 (P2)** — Page `/status` : `revalidate = 60` (ISR, données fraîches toutes les 60 s)
  - **F-07 (P3)** — Page `/blog` (liste) : metadata OG complétée (`og:image`, `og:locale`, `og:site_name`, `twitter:card`)
  - **F-08 (P3)** — Page `/certifications` : `twitter:image` aligné sur `og:image`
  - **Bonus** — `twitter:card` + `description` + `siteName` OG ajoutés sur `/privacy`, `/legal`, `/accessibility`, `/colophon`, `/changelog`

### 10 May 2026
- **Certifications** — Moved "Salesforce Platform Foundations" and "Salesforce Sales Foundations" from completed (Apr 2026) to upcoming (May 2026, `isActive: true`) in `app/[locale]/certifications/page.tsx`
- **About bio** — Replaced CTF paragraph with MITRE ATT&CK / Blue Team paragraph (FR + EN) in `content/about.ts`
- **Goals** — Set "international freelance" and "Platform Developer II" goals to `not_started` (À venir · 2027) in Supabase `goals_2026` table
- **Timeline** — Added Global Info internship (TAI end-of-training stage, 2022) to `components/CareerTimeline.tsx`
