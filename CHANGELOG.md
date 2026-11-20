# Changelog

All notable changes to this portfolio are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Maintenance

- **Témoignages** : schéma zod `.strict()` sur `/api/testimonial-submit` (clés inconnues et mauvais types refusés en 400 `invalid_payload`), et premiers tests de la route (8 cas).
- **Supabase archivé** : `@supabase/supabase-js` désinstallé, commandes `db:*` retirées, scripts déplacés dans `scripts/archive/db/` et historique SQL dans `docs/archive/supabase/` ; l'archive est exclue du typecheck et du lint.
- **Couverture** : seuils globaux relevés au niveau mesuré, et seuils par fichier sur `lib/security/**` (90 % des instructions, lignes et fonctions, 70 % des branches).

### Fixed

- **Formulaire de contact** : la case obligatoire « J'ai lu et j'accepte » est remplacée par une simple mention d'information, cohérente avec la base légale déclarée (intérêt légitime) ; le serveur n'exige plus d'accord.
- **Mentions légales** : localisation au même niveau de précision que le reste du site (« Val-d'Oise (95), Île-de-France »), adresse postale sur demande.
- **Formulations plus factuelles (FR/EN/ES)** : accueil sans secteurs non étayés (industrie, énergie, santé, logistique) ; profil hybride sans comparaison avec « un spécialiste seul », scénario Legarant-AXG présenté comme projet de formation, Matching Rule non décrite comme bloquante, « pratiques DevOps » au lieu de « discipline DevOps réelle » ; Nova Manufacturing n'est plus rattachée au poste et sa charge est présentée comme une estimation.
- **Note de fin de CDI** : « Préavis en cours » disparaît le 1er décembre 2026, en même temps que la bascule de disponibilité (test ajouté).
- **`SECURITY.md` et colophon** : comportement réel de la limitation de débit décrit (routes d'écriture bloquées en production si Redis échoue).
- **Titre « Certifications »** traduit en espagnol sur l'accueil.
- **Badge « Sécurité Salesforce »** sur les projets Salesforce, « Cybersécurité » réservé aux projets de sécurité.
- **CV** : Linguaskill précisé (C1+ compréhension orale, B2 lecture) dans les 12 CV qui le citent.
- **Confidentialité** : durée de conservation de l'adresse IP (jusqu'à 24 h), stockage local du thème, cache hors ligne et rapports d'erreurs mentionnés.
- **Accessibilité** : statut de conformité partielle, recours au Défenseur des droits, navigation au clavier décrite avec son périmètre.
- **Footer** : liens À propos, Projets, Blog et Sécurité Salesforce.
- **Divers** : en-tête HSTS sans `preload` (inapplicable sur `*.vercel.app`), piège à focus de la modale sans éléments désactivés, commentaire du hook pre-commit corrigé.

### Changed

- **Contenu statique** lu directement en mémoire, sans aller-retour Upstash à chaque rendu.
- **CHANGELOG** : version 2.0.0 résumée, détail archivé dans `docs/archive/`.

## [2.0.0] — 2026-11-19

Résumé de la version. Le détail complet (environ 550 entrées) est archivé dans [`docs/archive/CHANGELOG-2.0.0-detail.md`](docs/archive/CHANGELOG-2.0.0-detail.md).

### Added

- Page « Sécurité Salesforce » (`/salesforce-security`, FR/EN/ES) : modèle de partage, données, Apex et livraison, chaque point relié au projet qui le prouve.
- Alerte webhook sur les erreurs serveur en production (`onRequestError`), sans données personnelles.
- Bloc Certifications et trois projets phares par parcours sur l'accueil.
- Recherche dans la palette de commandes (⌘K / Ctrl K) et générateur de liens d'invitation pour les témoignages dans `/admin`.
- Nouvelles fiches projet cybersécurité (CVE Watchlist, Vulnerability Assessment Report, Risk Assessment Matrix, Incident Response Playbook, Port Scanner).
- Liens « Version ATS » à côté de chaque CV.

### Changed

- Disponibilité « dès décembre 2026 », avec bascule automatique sur « Disponible immédiatement » le 1er décembre 2026 (`lib/availability.ts`, testée).
- Examens Salesforce annoncés « fin décembre 2026 », sans date exacte, avec libellé « résultat à venir » automatique après la date.
- Projet « 264 postes Dell » réécrit de façon sobre et cohérente partout (64 réimagés, 200 via Windows Autopilot).
- Intitulés alignés : « Administratrice & Développeuse Salesforce » et « Administratrice Systèmes & Réseaux · orientée DevOps » ; recherche d'un CDI uniquement.
- 18 CV régénérés (FR/EN/ES, classiques et ATS) ; CV ATS sans coupure entre les pages et avec une nouvelle mise en page.
- Supabase retiré du site : contenu en TypeScript et MDX, historique de disponibilité et incidents dans Upstash Redis, témoignages reçus par e-mail.
- Accueil resserré, `/resources` fusionnée dans `/uses`, services déplacés vers « Me recruter ».

### Fixed

- Pages 404 complètes (langue, titre, texte) pour les projets et articles inconnus, et vraies 404 pour les fichiers absents.
- Formulaire de contact : plus de faux succès sans Formhook ; `/api/health` signale alors une panne.
- SEO : meta descriptions et titres raccourcis, canonical par page de blog, JSON-LD localisé et aligné sur l'intitulé.
- Accessibilité : contrastes AA, modale avec focus piégé et reste de la page inerte, 404 avec `<main>`, défilement des tableaux MDX.
- Contenu : affirmations corrigées après trois audits (Legarant-AXG, Linguaskill, 316 tickets, fin de CDI, WireBrite, colophon).

### Security

- Diplômes et certificat Linguaskill publiés en versions masquées sans couche texte, empreintes vérifiées par un test ; historique Git purgé des anciennes versions.
- Limitation de débit bloquante en production sur les routes d'écriture en cas de panne Redis ; clés IPv6 regroupées par /64.
- gitleaks reprend ses règles intégrées et la CI vérifie qu'il détecte un faux secret.
- Rapports CSP non falsifiables, contrôle d'origine sur `/api/errors` et `/api/testimonial-submit`, CSP stricte sur les CV HTML.
- Audit des dépendances avec exception documentée et auto-expirante pour `picomatch`.

## [1.8.0] — 2026-03-19

### Added

- **Error boundaries** — `app/error.tsx` (root) and `app/[locale]/error.tsx` (locale-level) catch unhandled rendering errors (Supabase timeout, Redis crash, etc.). Both expose a `reset()` button that re-renders the crashed segment without a full page reload. Locale detected via `useParams()` in the locale boundary (zero flash), via `navigator.language` in the root fallback. Error digest shown in development only.
- **`app/[locale]/not-found.tsx`** — locale-level 404 page, takes priority over the root `not-found.tsx` for all routes under `/[locale]/`. Locale resolved synchronously via `useParams()` (no hydration flash). Root `not-found.tsx` redesigned with compass icon + entrance animation.
- **Client-side error tracking** — `GlobalErrorHandler` (client component, mounted in root layout) intercepts `window.onerror` and `unhandledrejection`. Sends a structured payload to `POST /api/errors` via `navigator.sendBeacon` (non-blocking, survives page unload). Per-session dedup (module-level `Set`) avoids flooding the same error. Browser extension errors and cross-origin "Script error." filtered out. Dev mode: console only (no API call).
- **`POST /api/errors`** — new endpoint receiving client error reports. Rate-limited at 10 req / 60 s / IP (`errorRatelimit`). Strict payload validation (`type`, `message` required, size-bounded). Logs structured JSON tagged `[CLIENT-ERROR]` to stdout (captured by Vercel Runtime Logs, forward-compatible with homelab log aggregators).
- **`errorRatelimit`** — new Upstash Redis sliding-window limiter in `lib/ratelimit.ts` (10 req / 60 s, prefix `portfolio:rl:errors`). Fail-closed in production; permissive no-op in dev/CI.
- **Analytics events wired** — three typed events from `lib/analytics.ts` now fire from actual components:
  - `contact_form_started` — first `onChange` on `ContactForm` (bubbles from all fields, ref-guarded, fires once per mount)
  - `availability_checked` — button click in `AvailabilityModal` (locale + track captured)
  - `blog_article_completed` — `ArticleReadTracker` (new client component): `IntersectionObserver` on a sentinel at the bottom of `<article>`, `rootMargin: "-10% 0px"`, disconnects after first fire; `read_time_sec = readingTimeMin × 60`
- **JSON-LD `areaServed` expanded** — `ProfessionalService` now lists France, Algeria, Belgium, Switzerland, Luxembourg, Canada as structured `Country` objects, plus `"Worldwide"` (Schema.org `Text` value) for remote-international coverage.

### Fixed

- **Service Worker `networkFirst` bug** — on a non-ok server response (e.g. Supabase returning 500), the previous implementation returned the error response directly without consulting the cache. Fixed: on `!response.ok`, the cache is checked first; if a cached version exists it is served; only if absent is the error response returned (React error boundaries handle it client-side). Strategy explicitly documented as "without timeout" (intentional: no `AbortController` + `setTimeout`, avoids serving stale content to users on slow-but-available connections).
- **`adminRatelimit` doc** — `SECURITY.md` showed outdated limit (10 req / 5 min); corrected to current value (5 req / 15 min / IP).

### Changed

- `.env.example` — 9 missing variables documented: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `REVALIDATE_SECRET`, `CRON_SECRET`, `IP_HASH_SALT`, `TESTIMONIAL_SUBMIT_TOKEN`, `VERCEL_ENV`, `VERCEL_URL` (new sections: Admin, Cron jobs, Security, Testimonials, Vercel runtime).
- 404/500 pages — unified visual design: inline SVG icon (compass for 404, lightning bolt for 500), `animate-[fadeIn_0.4s_ease_forwards]` entrance animation, `type="button"` on all `<button>` elements.

---

## [1.7.0] — 2026-03-17

### Security

- **Nonce-based CSP** — `'unsafe-inline'` removed from `script-src`. A cryptographically unique nonce (`btoa(crypto.randomUUID())`) is generated per request in `proxy.ts` (Edge Runtime) via the Web Crypto API. The nonce is injected into the `Content-Security-Policy` response header and forwarded to Server Components via the `x-nonce` request header. Inline scripts that require explicit authorisation (JSON-LD in root layout, Vercel Analytics, Vercel Speed Insights, Next.js hydration) receive the nonce attribute. Any injected inline script without a matching nonce is now blocked by the browser.
- **CSP moved from static (`next.config.mjs`) to dynamic (`proxy.ts`)** — static CSP headers cannot embed per-request nonces. `next.config.mjs` no longer contains a `Content-Security-Policy` entry; all other security headers (HSTS, X-Frame-Options, Permissions-Policy, Report-To, etc.) remain static.
- **Security documentation updated** — `SECURITY.md`, `/colophon`, `/changelog` reflect the current security posture. Version numbers removed from public-facing tech stack listings. RLS policy on `uptime_pings` tightened (anon SELECT removed).
- **GitHub Advanced Security enabled** — CodeQL code scanning, Dependabot alerts + security updates, secret scanning all activated on the repository.

---

## [1.6.0] — 2026-03-16

### Security

- **Brute-force protection on `/admin`** — `proxy.ts` now applies a Redis rate-limit (10 attempts / 5 min / IP) before the HTTP Basic Auth check; returns `429 Too Many Requests` with `Retry-After: 300` when the limit is exceeded. Prior to this fix, credentials could be brute-forced without any server-side friction.
- **`/api/redis-test` disabled in production** — diagnostic route now returns `404` when `NODE_ENV !== "development"`. Previously accessible publicly, it confirmed Redis presence and allowed unauthenticated writes to the cache key `healthcheck`.
- **Rate-limiting on `/api/newsletter`** — 3 submissions / hour / IP via Upstash Redis. Without this, the endpoint was open to Brevo API quota exhaustion, email enumeration via distinct response codes, and unsolicited third-party submissions.
- **Rate-limiting on `/api/health`** — reuses the `blogRatelimit` limiter (30 req / 60 s / IP) to prevent loop-based infrastructure probing.
- **CORS on `/api/health` restricted** — `Access-Control-Allow-Origin` changed from `*` to `NEXT_PUBLIC_SITE_URL`. The wildcard allowed any third-party page to silently read internal service latencies (Supabase, Redis) via `fetch()` from a browser context. Uptime monitoring tools operate server-to-server and do not require CORS.
- **`poweredByHeader: false`** — suppresses `X-Powered-By: Next.js` response header. Removes framework fingerprinting that enabled targeted CVE scanning.
- **`Cross-Origin-Opener-Policy: same-origin`** — prevents cross-origin windows from accessing the browsing context (mitigates `window.opener` hijack and Spectre-class attacks via shared contexts).
- **`Cross-Origin-Resource-Policy: same-origin`** — prevents other origins from loading site resources (images, JSON, fonts) into their own context without explicit CORS.
- **RLS `project_assets` hardened** — policy changed from `USING (true)` to a sub-select requiring `projects.status = 'published'`. Previously, assets of draft and archived projects were publicly readable via the Supabase anon key REST API regardless of the parent project's visibility.
- **`robots.txt` updated** — added `Disallow: /cv/` (prevents direct PDF indexing by search engines) and `Disallow: /admin/` (explicit exclusion of the admin panel from crawlers).
- **`adminRatelimit` + `newsletterRatelimit` added to `lib/ratelimit.ts`** — two new Upstash sliding-window limiters centralised alongside existing limiters; both fall back to a no-op if Redis is unavailable (development / CI).

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

[Unreleased]: https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/Aiyeesha/Aicha-Imene-DAHOUMANE-Portfolio.dev/compare/v1.8.0...v2.0.0
[1.8.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/Aiyeesha/portfolio-next/compare/v1.5.0...v1.6.0
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
