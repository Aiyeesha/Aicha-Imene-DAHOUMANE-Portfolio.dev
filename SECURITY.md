# Security Policy

## Contact for Responsible Disclosure

If you discover a security vulnerability in this portfolio, please report it responsibly:

**Email** : ai.dahoumane@gmail.com

Please **do not** open a public GitHub issue for security vulnerabilities.

---

## Supported Versions

This portfolio is a single-version application. Security fixes are applied to the current production deployment only.

| Version | Supported |
|---------|-----------|
| Latest (main) | ✅ |
| Older commits | ❌ |

---

## Security Measures in Place

### HTTP Headers

The following security headers are set on all responses via `next.config.mjs`:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking — blocks all iframe embedding |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage to same-origin only |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables unused sensitive browser APIs |
| `Content-Security-Policy` | (see below) | Allowlists trusted sources for scripts, styles, frames, and API calls |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS for 2 years (HSTS preload) |
| `Cross-Origin-Opener-Policy` | `same-origin` | Prevents cross-origin window access (Spectre, `window.opener` hijack) |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents other origins from embedding site resources |
| `X-Powered-By` | *(suppressed)* | Framework fingerprinting disabled via `poweredByHeader: false` |

#### Content Security Policy (CSP)

```
default-src 'self'
script-src 'self' 'unsafe-inline' https://assets.calendly.com https://va.vercel-scripts.com
style-src 'self' 'unsafe-inline' https://assets.calendly.com
img-src 'self' data: https://*.supabase.co https://*.supabase.in
font-src 'self'
frame-src https://calendly.com
connect-src 'self' https://*.supabase.co https://*.upstash.io https://formspree.io
            https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de
object-src 'none'
base-uri 'self'
frame-ancestors 'none'
```

> **Note:** `'unsafe-inline'` is required by Next.js App Router for hydration inline scripts and Tailwind CSS.
> A nonce-based CSP (removing `'unsafe-inline'` entirely) is planned for a future hardening phase.

---

### Rate Limiting

All write and sensitive endpoints are rate-limited via **Upstash Redis** (sliding window algorithm):

| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| `POST /api/contact` | 5 requests | 10 minutes / IP | Anti-spam, anti-flood |
| `POST /api/newsletter` | 3 requests | 1 hour / IP | Protects Brevo API quota, prevents email enumeration |
| `POST /api/testimonial-submit` | 3 requests | 24 hours / IP | Anti-spam |
| `POST /api/cache/invalidate` | 10 requests | 60 seconds / IP | DoS protection on cache invalidation |
| `GET /api/health` | 30 requests | 60 seconds / IP | Prevents infrastructure probing in a loop |
| `GET /admin/*` | 10 requests | 5 minutes / IP | **Brute-force protection** on HTTP Basic Auth |

IP extraction prioritises `x-real-ip` (injected by Vercel, not attacker-controlled) with `x-forwarded-for` as fallback.

If Upstash Redis is unavailable, rate limiting degrades gracefully to a no-op (development / CI use case).

---

### Admin Dashboard (`/admin`)

- Protected by HTTP Basic Auth (credentials from `ADMIN_USERNAME` / `ADMIN_PASSWORD` environment variables)
- Rate-limited: **10 failed attempts per 5 minutes per IP** — brute force locked out at the middleware level (`proxy.ts`)
- Returns `503` if credentials are not configured
- Metadata set to `robots: { index: false, follow: false }` — not indexed by search engines
- Not linked from public navigation

---

### Contact Form

- Rate-limited via Upstash Redis (5 req / 10 min / IP)
- **Honeypot field** (`company`) filters automated bots — silent 200 response on detection
- Origin validation (production only): rejects requests not matching `NEXT_PUBLIC_SITE_URL`
- Input validation server-side: name (2–80 chars), email (regex + 254 char cap), message (10–2000 chars), topic enum, max 3 URLs
- Dual submission: Supabase (primary) + Formspree (fallback) — failure of one does not block the other
- Stores IP and User-Agent for audit purposes (server-side only, never exposed to client)

---

### Backend (Supabase + RLS)

Row Level Security (RLS) is **enabled on all tables**. Policies by table:

| Table | `anon` SELECT | `anon` INSERT | Notes |
|-------|---------------|---------------|-------|
| `projects` | `status = 'published'` only | ❌ | Draft and archived projects are invisible |
| `project_assets` | Only if parent project is `published` | ❌ | Assets of unpublished projects are protected |
| `about_pages` | ✅ (all) | ❌ | Public content |
| `certifications` | ✅ (all) | ❌ | Public content |
| `testimonials` | `is_published = true` only | ❌ | Unpublished testimonials not visible |
| `messages` | ❌ | ✅ | Contact submissions: write-only for `anon` |
| `testimonial_submissions` | ❌ | ✅ | Pending admin review, `approved = false` by default |
| `uptime_pings` | ❌ | ❌ | Server-side only (service_role) |

The `service_role` key bypasses RLS automatically and is **strictly server-side** — never exposed to the client or in any `NEXT_PUBLIC_*` variable.

---

### API Routes — Authentication & Access Control

| Route | Protection mechanism |
|-------|---------------------|
| `GET /admin/*` | HTTP Basic Auth + rate-limit (middleware) |
| `POST /api/cache/invalidate` | `x-cache-secret` header compared to `CACHE_INVALIDATE_SECRET` |
| `GET /api/cron/ping` | `Authorization: Bearer {CRON_SECRET}` (Vercel injects automatically) |
| `POST /api/testimonial-submit` | `token` field in body compared to `TESTIMONIAL_SUBMIT_TOKEN` |
| `GET /api/redis-test` | **Only available in `development` mode** — returns 404 in production |
| `GET /api/health` | Public — CORS restricted to `NEXT_PUBLIC_SITE_URL` (no wildcard `*`) |

---

### Environment Variables

- All secrets (`SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_REDIS_REST_TOKEN`, `ADMIN_PASSWORD`, etc.) are server-only — no `NEXT_PUBLIC_` prefix
- Only genuinely public values use `NEXT_PUBLIC_*` (site URL, Supabase anon key, contact email, Calendly URL)
- `.env.local` is excluded from version control via `.gitignore` (pattern: `.env*`)
- See `.env.example` for the full list of expected variables

---

### CI / CD

- GitHub Actions: `npm ci` (lockfile-enforced installs), lint → typecheck → test → build
- Secrets injected via GitHub Secrets — never hardcoded in workflow files
- Dependabot configured for npm and GitHub Actions dependency updates

---

## Reporting a Vulnerability

1. Send an email to the security contact above describing the vulnerability
2. Include steps to reproduce, affected URL/component, and potential impact
3. Allow up to **72 hours** for an initial response
4. We will coordinate a fix and disclosure timeline with you

We appreciate responsible disclosure and will credit researchers who report valid vulnerabilities (unless anonymity is preferred).
