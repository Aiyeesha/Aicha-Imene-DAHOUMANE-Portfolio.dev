# Changelog

All notable changes to this portfolio are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Security

- **T1 — HMAC invite tokens pour les témoignages** — Le lien d'invitation témoignage n'apparaît plus dans le HTML public. Le `TESTIMONIAL_SUBMIT_TOKEN` n'est jamais exposé dans une URL. Le système utilise désormais un jeton HMAC dérivé (`HMAC-SHA256(secret, "testimonial-invite:" + exp)`) avec date d'expiration. Un endpoint admin (`POST /api/admin/testimonial-invite`, auth Bearer `ADMIN_PASSWORD`) génère les liens privés à durée limitée (défaut 7 j, max 30 j). La page `/testimonial-submit` valide le token HMAC côté serveur avec `timingSafeEqual`.
- **Audit sécurité/perf/i18n (juillet 2026)** — Menu mobile rendu non focusable au clavier quand fermé (`inert`, corrige une violation WCAG 4.1.2 détectée par Lighthouse CI). `dependabot.yml` et `CODEOWNERS` pointaient vers un sous-dossier `/portfolio/` inexistant depuis une restructuration antérieure du repo : les mises à jour npm automatiques et la review obligatoire sur les fichiers sensibles (`proxy.ts`, `app/api/`, `app/admin/`, `lib/ratelimit.ts`…) ne s'appliquaient plus, corrigé. Alerte Dependabot GHSA-h67p-54hq-rp68 (js-yaml, DoS) corrigée via un override scopé à `gray-matter` (`^3.15.0`, reste dans la branche 3.x qui conserve l'API `safeLoad` requise par gray-matter) plutôt qu'un saut vers la 4.x qui avait cassé le build lors d'une tentative précédente. Force-push désactivé sur `main`. `tailwindcss`/`@tailwindcss/*` ajoutés à la liste d'ignore Dependabot pour les majors (la v4 change le plugin PostCSS et casse le build).
- **Alerte Dependabot GHSA-3jxr-9vmj-r5cp (`brace-expansion`, DoS — CVE-2026-13149)** — Dépendance transitive de `minimatch` (via `eslint`, `jest`/`test-exclude`), résolue en 2.1.0 (plage vulnérable `>= 2.0.0, < 2.1.2`). `expand()` a un comportement exponentiel — O(2ⁿ) — sur des groupes `{}` non-expansifs consécutifs : une entrée de ~90 octets peut bloquer le thread appelant pendant plusieurs minutes. Corrigée via un override `brace-expansion: ^2.1.2` (reste dans la branche majeure 2.x déjà utilisée par la chaîne de dépendances, pas de saut vers la 5.x). `npm audit` : 0 vulnérabilité après régénération du lockfile ; lint et typecheck inchangés.

### Added

- **Dashboard de gestion d'incidents (`/admin/incidents`)** — Nouvel outil admin qui opérationnalise les playbooks de [`playbook-reponse-incidents`](https://github.com/Aiyeesha/playbook-reponse-incidents) : création d'incidents (malware, ransomware, fuite de données, hameçonnage, accès non autorisé, déni de service) avec checklist de réponse pré-remplie par phase (détection → confinement → éradication → récupération → post-incident), suivi de progression et changement de statut. Nouvelles tables Supabase `incidents` / `incident_checklist_items` (RLS deny-all, accès `service_role` uniquement, même modèle que le reste de `/admin`). Server Actions protégées par le même garde `requireAdminAuth()` que le reste du dashboard admin.
- **T3 — JSON-LD `ProfessionalService` sur `/work-with-me`** — Données structurées Schema.org pour le référencement freelance. Inclut `serviceType`, `areaServed` (pays + « Worldwide »), `availableLanguage`, `workLocation: VirtualLocation`. Sans `priceRange` ni `offers.price` (décision D2).
- **T4 — Workflow GitHub Actions `drift-check.yml`** — Vérification quotidienne (06:00 UTC) + déclenchement manuel : (1) compare le SHA HEAD de main avec le déploiement de production Vercel, (2) contrôle la fraîcheur des données de monitoring (champ `lastStoredCheckAt` de `/api/health`, seuil 48 h). Émet `::error::` si dérive détectée, `::warning::` si monitoring stale. Gracieusement inactif si `VERCEL_TOKEN` ou `NEXT_PUBLIC_SITE_URL` ne sont pas configurés.
- Page contact dédiée avec métadonnées SEO propres. Onglet « All » sur la page Projects (les deux tracks Salesforce/IT Ops). Menu déroulant Projects dans la nav desktop avec projets à la une. Lien GitHub dans le footer et la nav mobile. Images Open Graph spécifiques par page (`/contact`, `/work-with-me`). JSON-LD `BreadcrumbList` sur toutes les pages de premier niveau. Locale espagnole (`messages/es.json`) traduite et activée publiquement — l'espagnol est disponible aux côtés du français et de l'anglais sur l'ensemble du site (sélecteur de langue, sitemap, hreflang, 55 articles de blog traduits).

### Changed

- **T2 — Garde de fraîcheur sur la page Statut** — Bannière d'avertissement amber si les données de monitoring dépassent 48 h (`/status`). Timeout Formspree réduit de 4 s à 2 s dans `lib/health.ts` pour ne pas retarder le cron. `/api/health` expose un nouveau champ `lastStoredCheckAt` (timestamp du dernier run du cron stocké en Supabase/Redis) — consommé par T4.
- Disponibilité mise à jour : « Disponible dès maintenant » remplace la mention « août 2026 » (meta descriptions, page Work with me, objectifs 2026), FR et EN. Schéma JSON-LD des pages projet : `SoftwareApplication` remplacé par `CreativeWork` (plus juste sémantiquement pour des études de cas). Modales Calendly et Disponibilité chargées en lazy import sur la page d'accueil (améliore le score Lighthouse Performance mobile). Enrichissement itératif du schema.org `Person` (adresse, description) et des meta descriptions (mots-clés géographiques et de rôle). Diplômes de certification convertis en WebP (réduction de poids de 91 à 94 %).

### Fixed

- Redirection corrigée pour un slug de projet erroné (iDEM Connect). Redirections `/mentions-legales` → `/legal`, `/contact`, `/rss.xml`. Liens et images de badges de certification corrigés. CTA avec repli propre quand Calendly est indisponible ; placeholders de témoignages retirés. Mentions « Provence-Alpes-Côte d'Azur » harmonisées (remplacent « PACA ») et modes de travail (100 % remote/hybride/sur site + mobilité) alignés sur toutes les pages et les 4 CV. Locale explicite (`fr-FR`/`en-US`) dans `AnimatedCounter`. Titre de projet bilingue dans le script de seed pour éviter qu'un futur reseed n'écrase les traductions FR déjà en base. Seuil de couverture Jest rendu honnête (mesuré sur l'ensemble du code via `coverageProvider: "v8"`, pas seulement les fichiers déjà testés).
- `/uses` et `/changelog` rendaient un squelette vide en production (`export const dynamic = "force-static"` combiné à un rendu dynamique par ailleurs). Rendu dynamique par requête rétabli sur les deux pages.
- **Pages projet servant silencieusement une autre locale** — `getPublishedProjectBySlugWithAssets` retombe sur n'importe quelle ligne publiée d'une autre locale quand celle demandée n'a pas de ligne publiée (RLS anon ne voit que `status = 'published'`, donc impossible de distinguer côté requête « traduction manquante » de « brouillon en cours »). Repéré sur 7 slugs (`vulnerability-assessment-report`, `incident-response-playbook`, `risk-assessment-matrix`, `security-monitoring-dashboard`, `it-ops-email-config`, `it-ops-hardware-procurement`, `it-ops-wifi-config`) où la ligne EN/FR est un brouillon décrivant parfois un projet différent de la ligne ES publiée — un visiteur EN/FR voyait du contenu espagnol sans aucune indication. Ajout d'un bandeau visible sur `/projects/[slug]` quand `project.locale !== locale`, indiquant la locale réellement affichée.

### Changed

- Sous-titre du hero (FR/EN/ES) reformulé : liste plate de technologies (« Apex · LWC · Intégrations · Sysadmin ») remplacée par un one-liner qui fusionne stack technique et bénéfice (« Apex · LWC · Intégrations — livrées sécurisées, prêtes pour la prod » et équivalents EN/ES).
- **Calendrier de certifications Salesforce décalé (sept.–oct. 2026)** — Plus de créneau disponible en centre agréé avant septembre. Les 4 certifications initialement étalées juil.–sept. 2026 (Foundations, ADM-201, App Builder, PD1) sont repoussées et compressées sur sept.–oct. 2026, même ordre relatif. FAQ disponibilité (FR/EN/ES) : « courant août 2026 » → « courant septembre 2026 ». Meta description et sous-titre du sprint sur `/certifications` mis à jour en conséquence.

### Changed

- **`/certifications`** — Les diplômes de la section « Obtenu » sont réordonnés du plus ancien au plus récent (RNCP 4 → 5 → 6) au lieu du plus récent au plus ancien, pour rendre la progression explicite. Le sous-titre de section mentionne désormais directement « progression RNCP 4 → 5 → 6 » (FR/EN/ES).

### Known issues

- **Streaming RSC parfois bloqué sur un fallback `Suspense` obsolète** — Race condition connue dans l'implémentation native `TransformStream` de Node.js (un `writer.write()` tardif entre en collision avec un `reader.cancel()`), reproduite en local sur Node 22.23.1 et 24.8.0, **et confirmée en direct sur la production** (`<main>` figé sur le HTML brut du fallback `Loading…`, marqueur `<!--$~-->` jamais remplacé, sur `/fr` et `/es`, plus de 20 s après chargement). Correspond à [vercel/next.js#75994](https://github.com/vercel/next.js/issues/75994). Le correctif Node ([nodejs/node#62040](https://github.com/nodejs/node/pull/62040)) n'a atterri que dans Node 25 (non-LTS, mergé 28/02/2026) — pas encore backporté sur les branches 22.x/24.x LTS. Rester sur `engines.node: 24.x` en attendant le backport ; revisiter à chaque release LTS Node 22/24. Symptôme additionnel observé, probablement lié : le badge de disponibilité (`components/AvailabilityModal.tsx`, `next/dynamic` avec `ssr: false`) ne se monte parfois pas dans le DOM bien que son chunk JS soit chargé (200 OK) — reproduit sur FR et EN, donc indépendant de la locale.
  **Escalade (21/07/2026)** : sur un chargement affecté, la page peut devenir totalement non interactive — aucun `onClick` ne se déclenche (testé sur le toggle de thème et le toggle de parcours Salesforce/IT Ops, via `dispatchEvent` direct pour exclure un problème d'outillage de test), alors que React signale un arbre hydraté (`__reactFiber` présent sur `document.body`) et qu'aucune erreur n'apparaît en console. Reproduit sur deux onglets indépendants, chargement neuf. Cohérent avec une corruption de l'arbre de réconciliation côté client causée par le même bug de streaming : le DOM visible ne correspondrait plus aux nœuds sur lesquels React a attaché ses écouteurs d'événements. Priorité à réévaluer à la hausse : au-delà d'un simple retard d'affichage, un visiteur peut se retrouver sur une page qui a l'air normale mais où aucun bouton ne répond.
  **Précision suite à re-test (21/07/2026)** : sur un redémarrage serveur propre + premier chargement + premier clic, le toggle thème et le toggle de parcours (FR/EN/ES, hero + nav) répondent correctement. La panne totale d'interactivité observée plus haut n'est donc pas systématique — cohérent avec une race condition qui s'aggrave après de nombreuses requêtes rapprochées (mon propre enchaînement de tests automatisés), plutôt qu'un défaut présent à chaque chargement pour un visiteur normal. Reste un risque réel à surveiller, pas une panne constante.

### Planned
- LinkedIn recommendations / testimonials (pending responses from colleagues)

---

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

[Unreleased]: https://github.com/Aiyeesha/portfolio-next/compare/v1.8.0...HEAD
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
