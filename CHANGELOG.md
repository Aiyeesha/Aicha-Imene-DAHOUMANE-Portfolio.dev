# Changelog

All notable changes to this portfolio are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Fixed
- **CLS fix — `scrollbar-gutter: stable`** — adds `scrollbar-gutter: stable` to `<html>` in `globals.css`; prevents viewport width from changing when the scrollbar appears/disappears during SPA navigation between pages of different heights (real user CLS was 0.46 🔴)
- **CLS fix — hero `min-height`** — adds `min-h-[320px] sm:min-h-[400px]` to the hero section to prevent height collapse during Framer Motion entrance animation
- **TBT fix — font `display: swap`** — reverted `display: optional` → `display: swap` for Space Grotesk and Inter (other session regression); desktop TBT had regressed to 240ms
- **Vercel region** — changed from `iad1` (US East) to `cdg1` (Paris) for lower latency for FR/EU visitors

### Planned
- LinkedIn recommendations / testimonials (pending responses from colleagues)
- Newsletter opt-in (ConvertKit or Brevo)

---

## [1.5.0] — 2026-03-16

### Added
- **AvailabilityModal** — interactive "open to work" badge in the hero; click opens a modal detailing contract types (CDI · CDD · Freelance · Mission), work modes (Full remote · Hybrid · On-site), target roles, and location (Paris / Île-de-France · Marseille / PACA); bilingual EN/FR
- **OG image for `/about`** — dedicated `opengraph-image.tsx` (1200×630) with indigo accent, journey subtitle, and skill tags; consistent with certifications and blog post OG images
- **B2 case study SQL** — `supabase/update-sections.sql`: 22 UPDATE statements (11 projects × 2 locales) populating `hero_subtitle` and `sections` JSONB (text, bullets, metrics types) extracted from jury evaluation Word documents
- **FAQ updated** — new bilingual question "Êtes-vous ouverte à un CDI, ou uniquement en freelance ?" / "Are you open to permanent roles, or only freelance?"; updated remote work answer to reflect full remote + hybrid + on-site
- **Page Ressources / Boîte à outils** — `/en/resources` & `/fr/resources`, 20 tools in 4 categories (Salesforce, Dev Stack, IT Ops, Learning), static Server Component
- **Page de statut publique** — `/en/status` & `/fr/status`, shows operational status of all services; linked in footer
- **WCAG 2.2 AA fixes** — hamburger `aria-label` dynamic (open/close), ProjectsSection tab arrow-key navigation (APG), ContactForm `aria-describedby` on status region, ScrollToTop `aria-label` via i18n, ServicesFaq `focus-visible` ring
- **Navbar desktop** — pill scroll-spy now always stays on a visible item via `desktopActiveId` mapping; removed truncation at 1280px (5 items, `2xl:px-3`)
- **CommandPalette** — "Resources" page added to Pages group

### Changed
- Availability info updated across the entire portfolio — `ProfileFactsCard`, About page, i18n translations (`messages/fr.json`, `messages/en.json`), `content/about.ts` goals: CDI · CDD · Freelance · Mission, Full remote · Hybrid · On-site, Paris/IDF · Marseille/PACA
- Cron schedule in `vercel.json` changed from `*/5 * * * *` to `0 8 * * *` (Vercel Hobby plan compatibility)

### Fixed
- Navbar hamburger `aria-label` now reads "Close menu" when menu is open (was always "Open menu")
- NavbarPill now hides correctly when active section has no corresponding desktop link

### Removed
- `app/[locale]/projects-test/` — debug page listing all project slugs; was publicly accessible
- `public/projects/python-network-scanner/scanner-ui/node_modules/` — accidentally committed `node_modules` was being served as static assets

---

## [1.4.0] — 2026-03-04

### Added
- **Syntax highlighting** — `rehype-pretty-code` (shiki) integrated into the MDX pipeline
  - Dual theme: `github-light` in light mode, `github-dark-dimmed` in dark mode
  - Language badge in code block toolbar (TypeScript, Apex, SOQL, Bash…)
  - Highlighted lines support (`{2-4}` syntax in fences)
  - Optional line numbers support via CSS
- **Test coverage expanded** — 7 suites, 59 tests (from 1 suite, 2 tests)
  - Pure functions: `formatDate`, `detectTrack`, `getTopTags`, `slugify`, `extractToc`
  - Components: `Accordion`, `TrackToggle`, `ThemeToggle`, `ScrollToTop`
  - Fixed pre-existing `ContactForm` test (missing `useTrack` mock)
- **CHANGELOG.md** — this file, following Keep a Changelog format

### Changed
- `CodeBlockServer.tsx` — now forwards `data-language` and all shiki attrs to `<pre>`
- `mdx-components.tsx` — `pre` override now spreads all props (not just `children`)
- `globals.css` — added shiki CSS variable rules, language badge styles, highlighted line styles

---

## [1.3.4] — 2026-02-xx

### Added
- **Command Palette** (`⌘K` / `Ctrl+K`) — `cmdk` v1.1.1 + Radix UI Dialog
  - Navigation: sections, pages (About, Certifications, Blog, Contact)
  - Actions: switch track, switch theme, switch language, download CV, open LinkedIn
  - Styles injected via `<style>` tag (cmdk uses `data-*` attributes)
- **Navbar trigger** — `CommandPaletteTrigger` inline component dispatching `KeyboardEvent`

### Changed
- `Reveal.tsx` — migrated to Framer Motion `useInView` + `useReducedMotion`
- `AnimatedCounter.tsx` — scroll-triggered counting animation via Framer Motion `useSpring`

---

## [1.3.3] — 2026-01-xx

### Added
- **Framer Motion** — staggered entrance animations on hero, sections, project cards
  - `AnimatePresence mode="wait"` on track switch (Salesforce ↔ IT Ops)
  - `prefers-reduced-motion` respected everywhere
- **SkeletonCard.tsx** — `animate-pulse` skeleton for Supabase loading states
- **`loading.tsx`** — page-level loading skeleton (Next.js Suspense boundary)

---

## [1.3.2] — 2025-12-xx

### Added
- **Page `/certifications`** (dedicated) — diplomas, active certifications, in-preparation
  - RNCP 6 (Développeur Concepteur Logiciel), RNCP 5 (TSSR), RNCP 4 (TAI), Linguaskill C1+
  - Trailhead Ranger (active) with animated counters (badges, points, trails)
  - Upcoming: Salesforce Admin, Platform Developer I, ISC2 CC (2026)
  - Status badges: ✓ Completed, ↻ Active, ◎ In preparation
- **Table of Contents** (blog) — sticky sidebar on `lg` screens, auto-generated from `##`/`###`
  - `extractToc()` skips code fences to avoid false positives
  - `H2`/`H3` server components add `id` anchors with `scroll-mt-24`
- **Related posts** — tag-overlap scoring, max 3 per article
- **Prev/Next navigation** on blog posts
- **Author card** on each blog post
- **JSON-LD BlogPosting + BreadcrumbList** on each blog post page
- **`BackToTop`** client button on blog post pages
- **`RelatedPosts`** component

### Removed
- Certifications accordion from homepage (moved to dedicated page)

---

## [1.3.1] — 2025-11-xx

### Added
- **`TrustedBy.tsx`** — "Trusted by" logos section (replaces empty testimonials placeholder)
  - Logos: LD Digitales, Midrange (in `/public/companies/`)
- **Feature flag** `NEXT_PUBLIC_SHOW_TESTIMONIALS` — `false` by default (shows logos), `true` activates real testimonials from Supabase
- **`ScrollToTop.tsx`** — sticky scroll-to-top button (appears after 300px, smooth scroll)

---

## [1.3.0] — 2025-10-xx

### Added
- **Dark mode** — `next-themes` with `darkMode: ["class"]` Tailwind config
  - `suppressHydrationWarning` on `<html>` to prevent FOUC
  - `ThemeToggle` client component (persists to `localStorage`)
- **`app/manifest.ts`** — PWA manifest (standalone, icons, theme color)
- **`SECURITY.md`** — security policy, responsible disclosure contact
- **`/.well-known/security.txt`** — RFC 9116 compliant
- **HTTP security headers** in `next.config.mjs`:
  - `Content-Security-Policy` (CSP with Calendly, Supabase, Upstash, Formspree)
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` (camera, microphone, geolocation disabled)
  - `Strict-Transport-Security` (HSTS, 2 years, preload)

### Changed
- Hero simplified: 2-column grid (avatar + text). `ProfileFactsCard` and `ProfileNarrative` moved to `/about`
- Track toggle persists via cookie (SSR-safe, no flash on first load)

---

## [1.2.0] — 2025-09-xx

### Added
- **Page `/about`** (dedicated) — `ProfileFactsCard`, `AboutTrackIntro`, timeline, values, goals
  - Track-aware content (Salesforce vs IT Ops)
  - Supabase cached data with Redis SWR
- **Page `/colophon`** — full stack documentation (frontend, backend, infra, security)
- **`DevConsoleMessage.tsx`** — styled `console.log` for developers opening DevTools
- **`SkipToContent.tsx`** — accessible skip link (visible on keyboard focus)
- **`ScrollProgress.tsx`** — reading progress bar on blog posts
- **JSON-LD** — `Person`, `WebSite`, `ProfessionalService` graph in root layout
- **OG images** — `opengraph-image.tsx` (1200×630) and `twitter-image.tsx` via `@vercel/og`
- **Dynamic OG** per blog post — `[slug]/opengraph-image.tsx`
- **RSS feed** — `/feed.xml` (RSS 2.0, 38 EN articles, `<link rel="alternate">` in `<head>`)
- **Sitemap** — `/sitemap.xml` with priorities, blog posts, and project slugs from Supabase
- **`robots.txt`** — allow all, sitemap URL declared
- **hreflang** — `alternates.languages` in metadata for EN/FR canonical handling
- **Rate-limiting** — Upstash Redis, 5 requests / 10 min per IP on `/api/contact`
- **Honeypot field** on contact form (anti-spam, no CAPTCHA)
- **Supabase RLS** — Row Level Security activated on all tables
- **`scripts/apply-supabase-sql.ts`** — idempotent migration script (`npm run db:migrate`)

---

## [1.1.0] — 2025-08-xx

### Added
- **Track toggle** — Salesforce ↔ IT Ops, persisted via cookie + localStorage
  - Hero: distinct taglines, tags, and accent colors per track
  - Skills, Services sections adapt to active track
- **next-intl** — EN (default) / FR bilingual support, `Accept-Language` detection
- **Space Grotesk** (display) + **Inter** (body) via `next/font/google`
- **Blog** — MDX pipeline (`@next/mdx`, `remark-frontmatter`), 38 articles (EN + FR)
  - Tag pages, reading time, date formatting
  - `BlogPostRenderer` client fallback for select posts
- **GitHub Actions CI** — Node 20, `npm ci`, lint → typecheck → test → build
- **`LICENSE`** — MIT
- **`README.md`** — badges CI/live/license, stack table, architecture, env vars, scripts

---

## [1.0.0] — 2025-07-xx

### Added
- Initial Next.js 15 (App Router) + React 19 + TypeScript 5 setup
- Tailwind CSS with custom design tokens
- Supabase backend: projects, about, certifications, contact, testimonials tables
- Upstash Redis: API response caching, rate-limiting
- Formspree: contact form fallback
- Vercel Analytics + Speed Insights (production only)
- One-page landing: Hero, Skills, Experience, Services, Projects, Blog, Contact sections
- `Accordion.tsx` for experience section (accessible: `aria-controls`, `aria-expanded`)
- `Navbar.tsx` with active section indicators
- `ContactForm.tsx` with Supabase API route + Formspree fallback + Calendly modal

---

[Unreleased]: https://github.com/Aiyeesha/portfolio-next/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.3.4...v1.4.0
[1.3.4]: https://github.com/Aiyeesha/portfolio-next/compare/v1.3.3...v1.3.4
[1.3.3]: https://github.com/Aiyeesha/portfolio-next/compare/v1.3.2...v1.3.3
[1.3.2]: https://github.com/Aiyeesha/portfolio-next/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/Aiyeesha/portfolio-next/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Aiyeesha/portfolio-next/releases/tag/v1.0.0
