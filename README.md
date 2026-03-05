# Aïcha Imène DAHOUMANE — Portfolio

[![CI](https://github.com/Aiyeesha/portfolio-next/actions/workflows/ci.yml/badge.svg)](https://github.com/Aiyeesha/portfolio-next/actions/workflows/ci.yml)
[![Live](https://img.shields.io/badge/live-portfolio--next--one--gold.vercel.app-22d3ee?style=flat)](https://portfolio-next-one-gold.vercel.app/en)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Professional portfolio of a **Salesforce Developer & Consultant** with a background in systems, networks, and DevOps.
Features a **track toggle** (Salesforce ↔ IT Ops) that dynamically adapts the hero, skills, services, and projects sections.

**Live → [portfolio-next-one-gold.vercel.app/en](https://portfolio-next-one-gold.vercel.app/en)**

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS + next-themes (dark mode) |
| i18n | next-intl (EN default / FR) |
| Backend | Supabase (PostgreSQL) — projects, about, certifications, contact |
| Cache / Rate-limit | Upstash Redis (stale-while-revalidate + rate-limiting) |
| Blog | MDX (`@next/mdx`) + gray-matter + rehype/remark |
| Forms | API Route + Formspree (fallback) + honeypot + rate-limit |
| Analytics | Vercel Analytics + Speed Insights (production only) |
| Deployment | Vercel (Hobby) |

---

## Features

- **Dual-track hero** — Salesforce and IT Ops profiles share the same avatar; text, tags, and accent colors adapt per track
- **Dedicated pages** — `/about`, `/certifications`, `/blog`, `/projects`
- **Blog** — MDX articles (EN + FR), syntax highlighting, copy button, table of contents, reading time
- **Certifications page** — 3 sections: Completed, Active (Trailhead Ranger), In preparation
- **Contact form** — rate-limited, honeypot, topic selector, Calendly modal
- **Security headers** — CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **RSS feed** — `/feed.xml` (EN articles)
- **PWA** — Web App Manifest, icons 192/512
- **Accessibility** — skip link, keyboard nav, focus rings, ARIA landmarks
- **SEO** — JSON-LD (WebSite + Person + ProfessionalService), sitemap, robots.txt, hreflang

---

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm / bun)

### Install & run

```bash
git clone https://github.com/Aiyeesha/portfolio-next.git
cd portfolio-next/portfolio
npm install
cp .env.example .env.local   # then fill in the required values
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

### Build

```bash
npm run build
npm start
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.
All `NEXT_PUBLIC_*` variables are exposed to the browser. Never put secrets in them.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Canonical site URL (no trailing slash) |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (server-only, never expose) |
| `UPSTASH_REDIS_REST_URL` | ✅ | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | ✅ | Upstash Redis REST token (server-only) |
| `FORMSPREE_ENDPOINT` | Recommended | Formspree form endpoint URL |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Displayed contact email |
| `NEXT_PUBLIC_LINKEDIN_URL` | Recommended | LinkedIn profile URL |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional | Calendly booking link |
| `NEXT_PUBLIC_CV_PDF_URL` | Optional | CV PDF URL (fallback: `/cv/cv-{locale}-{track}.pdf`) |
| `NEXT_PUBLIC_AVATAR_URL` | Optional | Avatar image URL (fallback: `/avatar.webp`) |
| `NEXT_PUBLIC_SAME_AS` | Optional | Comma-separated social profile URLs (JSON-LD sameAs) |
| `CACHE_INVALIDATE_SECRET` | Optional | Secret for `/api/cache/invalidate` endpoint |
| `CONTACT_RATE_LIMIT_WINDOW_SECONDS` | Optional | Rate-limit window in seconds (default: 600) |
| `CONTACT_RATE_LIMIT_MAX_REQUESTS` | Optional | Max requests per window (default: 5) |

---

## Project structure

```
portfolio/
├── app/
│   ├── [locale]/           # Locale-scoped pages (App Router)
│   │   ├── page.tsx        # One-page landing (home)
│   │   ├── about/          # Dedicated About page
│   │   ├── certifications/ # Certifications & Diplomas
│   │   ├── blog/           # Blog index + [slug] post pages
│   │   ├── projects/       # Projects [slug] detail pages
│   │   └── layout.tsx      # Locale layout (Navbar, Footer, ScrollToTop)
│   ├── api/                # API routes (contact, cache, blog, storage)
│   ├── feed.xml/           # RSS feed route handler
│   ├── layout.tsx          # Root HTML layout (JSON-LD, fonts, analytics)
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
├── components/             # Reusable React components
├── content/
│   ├── blog/posts/{en,fr}/ # MDX articles
│   ├── certifications.ts   # Static certifications data
│   ├── experience.tsx      # Work experience accordion data
│   └── skills.ts / services.ts / projects.ts
├── lib/
│   ├── data/               # Supabase data fetchers (cached)
│   ├── supabase/           # Supabase client helpers
│   └── ratelimit.ts / redis.ts / cache.ts
├── messages/
│   ├── en.json             # English translations
│   └── fr.json             # French translations
└── public/
    ├── .well-known/
    │   └── security.txt    # RFC 9116 security contact
    ├── companies/          # Trusted-by company logos
    └── cv/                 # CV PDFs (per locale/track)
```

---

## Deployment (Vercel)

1. Import the repository in [Vercel](https://vercel.com)
2. Set **Root Directory** to `portfolio`
3. Configure all required environment variables
4. Deploy — Vercel handles build, CDN, and HTTPS automatically

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run typecheck    # TypeScript check (tsc --noEmit)
npm test             # Jest unit tests
```

---

## Security

- HTTP security headers configured in `next.config.mjs` (CSP, HSTS, X-Frame-Options…)
- Supabase Row Level Security (RLS) enabled on all tables
- Contact form: rate-limiting (Upstash Redis), honeypot field, origin validation
- See [`SECURITY.md`](SECURITY.md) for vulnerability disclosure policy
- Security contact: [`/.well-known/security.txt`](public/.well-known/security.txt)

---

## License

MIT — see [LICENSE](LICENSE).
Content (texts, CV, photos) © Aïcha Imène DAHOUMANE — all rights reserved.
