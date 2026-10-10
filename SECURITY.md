# Security Policy

## Contact for Responsible Disclosure

If you discover a security vulnerability in this portfolio, please report it responsibly:

**Email** : ai.dahoumane@proton.me

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
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), midi=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=()` | Disables unused sensitive browser APIs (including modern APIs exploitable via third-party scripts) |
| `Content-Security-Policy` | (see below) | Allowlists trusted sources for scripts, styles, frames, and API calls |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS for 2 years (HSTS preload) |
| `Cross-Origin-Opener-Policy` | `same-origin` | Prevents cross-origin window access (Spectre, `window.opener` hijack) |
| `Cross-Origin-Resource-Policy` | `same-origin` | Prevents other origins from embedding site resources |
| `X-Powered-By` | *(suppressed)* | Framework fingerprinting disabled via `poweredByHeader: false` |
| `Report-To` | `{"group":"csp-endpoint","max_age":86400,...}` | Reporting API v0 — routes CSP violations to `/api/csp-report` (Chrome, Edge) |
| `Reporting-Endpoints` | `csp-endpoint="/api/csp-report"` | Reporting API v1 — modern Chrome 96+ endpoint declaration |

#### Content Security Policy (CSP)

```
default-src 'self'
script-src 'self' 'nonce-{per-request}' https://assets.calendly.com
style-src 'self' 'unsafe-inline' https://assets.calendly.com
img-src 'self' data: https://*.supabase.co https://*.supabase.in
font-src 'self'
frame-src https://calendly.com
connect-src 'self' https://*.supabase.co https://*.upstash.io https://formhook.app
            https://github-contributions-api.jogruber.de
object-src 'none'
base-uri 'self'
frame-ancestors 'none'
report-uri /api/csp-report
report-to csp-endpoint
```

**Nonce-based CSP** — `'unsafe-inline'` has been removed from `script-src`. A cryptographically unique nonce (`btoa(crypto.randomUUID())`) is generated per request in `proxy.ts` (Edge Runtime) using the Web Crypto API. The nonce is:
- Injected into the `Content-Security-Policy` response header as `'nonce-{value}'`
- Forwarded to Server Components via the `x-nonce` request header
- Applied to Next.js hydration scripts; scripts they load afterwards (such as the Umami tracker, loaded via `next/script`) are trusted through `'strict-dynamic'`
- Umami analytics is relayed same-origin through `/api/umami/*` (Next.js rewrites to `cloud.umami.is` for the script and `gateway.umami.is` for events), so no third-party origin is needed in `script-src` or `connect-src`

Any inline script without a matching nonce is blocked by the browser. `'unsafe-eval'` is retained in development only (webpack HMR).

> **Note:** `'unsafe-inline'` remains in `style-src` — CSS injection cannot execute JavaScript, and Tailwind requires it. Nonce-based style CSP is not planned.

---

### Rate Limiting

All write and sensitive endpoints are rate-limited via **Upstash Redis** (sliding window algorithm):

| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| `POST /api/contact` | 5 requests | 10 minutes / IP | Anti-spam, anti-flood |
| `POST /api/testimonial-submit` | 3 requests | 24 hours / IP | Anti-spam |
| `POST /api/cache/invalidate` | 10 requests | 60 seconds / IP | DoS protection on cache invalidation |
| `POST /api/revalidate` | 10 requests | 60 seconds / IP | Protects ISR invalidation against REVALIDATE_SECRET brute-force |
| `GET /api/health` | 30 requests | 60 seconds / IP | Prevents infrastructure probing in a loop |
| `POST /api/csp-report` | 20 requests | 60 seconds / IP | Prevents flood of CSP violation reports (replaces in-memory counter, cold-start safe) |
| `POST /api/errors` | 10 requests | 60 seconds / IP | Client error reporting — absorbs crash-loop bursts, protected against flood |
| `GET /admin/*` | 5 requests | 15 minutes / IP | **Brute-force protection** on HTTP Basic Auth |

IP extraction prioritises `x-real-ip` (injected by Vercel, not attacker-controlled) with `x-forwarded-for` as fallback.

**Fail-closed in production**: if Upstash Redis is unavailable, rate limiters return `success: false` — no request passes through unthrottled. In development and CI (no Redis configured), limiters are permissive (`success: true`).

---

### Admin Dashboard (`/admin`)

- Protected by HTTP Basic Auth (credentials from `ADMIN_USERNAME` / `ADMIN_PASSWORD` environment variables)
- Rate-limited: **5 failed attempts per 15 minutes per IP** — brute force locked out at the middleware level (`proxy.ts`)
- Returns `503` if credentials are not configured
- Metadata set to `robots: { index: false, follow: false }` — not indexed by search engines
- Not linked from public navigation

---

### Contact Form

- Rate-limited via Upstash Redis (5 req / 10 min / IP) — Redis holds only a per-IP counter, never message content
- **Honeypot field** (`company`) filters automated bots — silent 200 response on detection
- Origin validation (production only): the `Origin` header must match either the configured site origin (`NEXT_PUBLIC_SITE_URL` / `SITE_URL`) **or** be same-origin with the host actually serving the route (`x-forwarded-host`), so real submissions from any of the deployment's hostnames pass; Origin-less or cross-site requests are rejected. See `isAllowedOrigin()` in `lib/contactValidation.ts`.
- Input validation server-side: name (2–80 chars), email (regex + 254 char cap), message (10–2000 chars), topic enum, max 3 URLs
- **No server-side persistence**: the submission is forwarded to Formhook (email delivery, EU-hosted) and nothing is stored at rest — no database write, no IP or User-Agent kept with the message. On success only the topic and locale are logged (no PII).

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
| `messages` | ❌ | ❌ | **No longer used** — the contact form forwards to Formhook with no DB write; the table is retained only for historical rows |
| `testimonial_submissions` | ❌ | ✅ | Pending admin review, `approved = false` by default |
| `uptime_pings` | ❌ | ❌ | Server-side only (service_role) — anon SELECT policy removed |
| `goals_2026` | ✅ (all) | ❌ | Public content (intentional — used for public roadmap display) |

The `service_role` key bypasses RLS automatically and is **strictly server-side** — never exposed to the client or in any `NEXT_PUBLIC_*` variable. The admin Supabase client (`lib/supabase/admin.ts`) uses `import 'server-only'` to produce a build-time error if accidentally imported into a client bundle.

---

### API Routes — Authentication & Access Control

| Route | Protection mechanism |
|-------|---------------------|
| `GET /admin/*` | HTTP Basic Auth + rate-limit (middleware) |
| `POST /api/cache/invalidate` | `x-cache-secret` header compared to `CACHE_INVALIDATE_SECRET` |
| `POST /api/revalidate` | `?secret=` query param compared to `REVALIDATE_SECRET` |
| `GET /api/cron/ping` | `Authorization: Bearer {CRON_SECRET}` (Vercel injects automatically) |
| `POST /api/testimonial-submit` | `token` field in body compared to `TESTIMONIAL_SUBMIT_TOKEN` |
| `POST /api/errors` | Public (client reports) — rate-limited 10 req / 60 s / IP; strict payload validation; no PII stored |
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
- `npm audit --audit-level=high --production` runs on every CI build — fails on HIGH/CRITICAL CVEs in production dependencies
- All third-party GitHub Actions pinned to **immutable commit SHAs** (not mutable tags) — supply chain attack mitigation
- CI jobs run with `permissions: contents: read` (principle of least privilege — default GITHUB_TOKEN write access revoked)
- Secrets injected via GitHub Secrets — never hardcoded in workflow files
- Dependabot enabled for npm and GitHub Actions dependency updates (security updates + alerts)
- CodeQL code scanning enabled — runs on every push/PR and weekly
- Secret scanning enabled — GitHub alerts on any accidentally committed credentials

---

## Secret Rotation Procedure

All secrets below should be rotated **immediately** if compromised, and periodically (every 6–12 months for credentials, every 90 days for tokens if policy requires it).

### Rotation checklist per secret

| Secret | Where generated | Where to update |
|--------|----------------|-----------------|
| `ADMIN_PASSWORD` | Random strong password (min. 24 chars) | Vercel env vars → redeploy |
| `ADMIN_USERNAME` | Arbitrary string (avoid obvious names) | Vercel env vars → redeploy |
| `CRON_SECRET` | `openssl rand -base64 32` | Vercel env vars + Vercel Cron config → redeploy |
| `REVALIDATE_SECRET` | `openssl rand -base64 32` | Vercel env vars → redeploy |
| `CACHE_INVALIDATE_SECRET` | `openssl rand -base64 32` | Vercel env vars → redeploy |
| `TESTIMONIAL_SUBMIT_TOKEN` | `openssl rand -base64 32` | Vercel env vars → redeploy |
| `IP_HASH_SALT` | `openssl rand -hex 32` | Vercel env vars → redeploy (invalidates existing hashes) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API | Vercel env vars → redeploy |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Console → Database → REST API | Vercel env vars → redeploy |

### Step-by-step procedure

1. **Generate** a new secret value (use the command shown in the table, or a password manager)
2. **Update** the secret in Vercel → Project Settings → Environment Variables (Production + Preview)
3. **Trigger a redeploy** on Vercel (or push a commit) — the new value takes effect immediately after deployment
4. **Revoke** the old secret from its source (Supabase, Upstash Console) if applicable
5. **Verify** the deployment is healthy via `/api/health` and `/status`

> **Note on `IP_HASH_SALT` rotation**: changing this salt invalidates all existing rate-limit keys in Upstash Redis (IPs are hashed before storage). This has no functional impact beyond briefly resetting in-flight rate-limit counters.

### Signs of compromise to watch for

- Unexpected entries in the Supabase `testimonial_submissions` table
- Unusual spike in Vercel function invocations (> 100k/month on Hobby plan)
- CSP violations reported to `/api/csp-report` from unexpected `document-uri`
- `/api/health` returning degraded status for Redis (possible token invalidation)
- GitHub Secret Scanning alert (auto-sent by GitHub if a secret is pushed)

---

## Reporting a Vulnerability

1. Send an email to the security contact above describing the vulnerability
2. Include steps to reproduce, affected URL/component, and potential impact
3. Allow up to **72 hours** for an initial response
4. We will coordinate a fix and disclosure timeline with you

We appreciate responsible disclosure and will credit researchers who report valid vulnerabilities (unless anonymity is preferred).
