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

The following security headers are set on all responses — static headers via `next.config.mjs`, the per-request CSP via `proxy.ts`:

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

Production policy, as built by `buildCSP()` in `proxy.ts`:

```
default-src 'self'
script-src 'self' 'nonce-{per-request}' 'strict-dynamic'
style-src 'self' 'unsafe-inline'
img-src 'self' data: https://*.supabase.co
font-src 'self'
frame-src 'none'
connect-src 'self' https://*.supabase.co
object-src 'none'
base-uri 'self'
form-action 'self'
worker-src 'self'
frame-ancestors 'none'
report-uri /api/csp-report
report-to csp-endpoint
```

Upstash Redis and Formhook are called server-side only, so neither appears in `connect-src`. No third-party script, stylesheet or frame is allowed: booking a call is a plain link to a Proton Calendar booking page, opened in a new tab. A second, report-only policy (`require-trusted-types-for 'script'`) reports Trusted Types violations to `/api/csp-report?ro=1` without blocking. Logged CSP reports have their URL query strings and fragments stripped, so tokens carried in URLs never reach the logs. Both report formats are parsed: CSP Level 2 (`{"csp-report": …}`, Firefox and Safari) and the Reporting API (`[{"type": "csp-violation", "body": …}]`, Chrome and Edge), see `lib/security/cspReport.ts`.

**Nonce-based CSP** — `'unsafe-inline'` has been removed from `script-src`. A cryptographically unique nonce (`btoa(crypto.randomUUID())`) is generated per request in `proxy.ts` using the Web Crypto API. The nonce is:
- Injected into the `Content-Security-Policy` response header as `'nonce-{value}'`
- Forwarded to Server Components via the `x-nonce` request header
- Applied to Next.js hydration scripts; scripts they load afterwards are trusted through `'strict-dynamic'`
- No analytics or tracking script is loaded

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
| `POST /api/admin/testimonial-invite` | 5 failed attempts | 15 minutes / IP | Bearer `TESTIMONIAL_INVITE_ADMIN_TOKEN` (dedicated, 32+ chars, never `ADMIN_PASSWORD`); failures share the `/admin` counter; fail closed if Redis is down |
| `POST /api/errors` | 10 requests | 60 seconds / IP | Client error reporting — absorbs crash-loop bursts, protected against flood |
| `GET /api/blog/latest` | 30 requests | 60 seconds / IP | Public read route |
| `GET /admin/*` | 5 failed attempts | 15 minutes / IP | **Brute-force protection** on HTTP Basic Auth — only failed authentications consume the quota; once it is exhausted, requests are refused before the credentials are checked |

IP extraction prioritises `x-real-ip` (injected by Vercel, not attacker-controlled) with `x-forwarded-for` as fallback.

**No IP in clear in Redis**: every limiter key is replaced by a truncated HMAC-SHA-256 keyed with `IP_HASH_SALT` before it reaches Upstash (`pseudonymizeKey()` in `lib/ratelimit.ts`). Without the salt (local development, CI) keys stay readable.

**Behaviour when Redis is degraded** (current state, documented as is):

| Situation | Effect |
|-----------|--------|
| Upstash variables missing in production | Fail-closed — every limiter returns `success: false` |
| Upstash variables missing in development / CI | Permissive — `success: true` |
| Redis slower than 500 ms (`timeout`) | Fail-open — the request is allowed |
| Redis throws (quota, network, token) | Fail-open through `safeLimit()`, **except `/admin`**, which is fail-closed (`proxy.ts`) |

Fail-open on slowness or errors keeps the contact form usable during an Upstash incident, at the cost of rate limiting during that window. Moving the sensitive limiters to fail-closed is under review.

---

### Admin Dashboard (`/admin`)

- Protected by HTTP Basic Auth (credentials from `ADMIN_USERNAME` / `ADMIN_PASSWORD` environment variables, compared in constant time)
- `ADMIN_PASSWORD` is validated at 8 characters minimum by `lib/env.ts`; 24 or more random characters are recommended (see the rotation table below)
- Rate-limited: **5 failed attempts per 15 minutes per IP** (`proxy.ts`). Authenticated requests do not consume the quota; an exhausted quota is refused before the credentials are checked
- Always routed through the middleware: the matcher lists `/admin/:path*` explicitly, and only real static file extensions (not any path containing a dot) are excluded elsewhere
- Never cached by the service worker (`/admin` is network-only in `public/sw-template.js`), so admin pages and invitation links are not stored in the browser cache
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

Row Level Security (RLS) is **enabled on all tables**. Content pages do not query the database (content is served from `content/`); `/status`, `/api/health`, `/api/cron/ping` and `/admin` access it through the server-side `service_role` client only. Policies in production, checked on 2026-10-31 (`pg_policies`):

| Table | Policy | Notes |
|-------|--------|-------|
| `projects` | `anon` SELECT where `status = 'published'` | Copy of `content/`, used by `/admin`, the health checks and `content:safety` |
| `project_assets` | `anon` SELECT only if the parent project is `published` | Assets of unpublished projects are protected |
| `uptime_pings` | Explicit deny (`false`) for `anon` and `authenticated` | Best-effort copy written by `/api/cron/ping` until Supabase is retired; `/status` now reads the Redis history |
| `incidents` | Explicit deny for `anon` and `authenticated` | No longer used: the incident dashboard is stored in Redis (`lib/incidents.ts`) |
| `incident_checklist_items` | Explicit deny for `anon` and `authenticated` | No longer used (see above) |
| `admins` | SELECT of one's own row (`auth.uid() = user_id`) | Legacy, used by `is_admin()`; no Supabase Auth login on the site |
| `testimonial_submissions` | `anon` INSERT denied, no other policy | **No longer written** — testimonials are e-mailed through Formhook; the table is empty and kept pending removal |

No table has an `anon` INSERT, UPDATE or DELETE policy; migration `20261030170000_reassert_no_anon_policies.sql` drops the legacy ones if they reappear. The `messages`, `testimonials`, `about_pages`, `goals_2026` and `certifications` tables mentioned in older migrations no longer exist in production.

The `service_role` key bypasses RLS automatically and is **strictly server-side** — never exposed to the client or in any `NEXT_PUBLIC_*` variable. The admin Supabase client (`lib/supabase/admin.ts`) uses `import 'server-only'` to produce a build-time error if accidentally imported into a client bundle.

---

### API Routes — Authentication & Access Control

| Route | Protection mechanism |
|-------|---------------------|
| `GET /admin/*` | HTTP Basic Auth + rate-limit (middleware), re-checked in the admin layout and in every admin page (`lib/security/adminAuth.ts` — 404 when unauthenticated, independent of the middleware matcher) |
| `POST /api/cache/invalidate` | `x-cache-secret` header compared to `CACHE_INVALIDATE_SECRET`; body validated with zod (`locale` ∈ supported locales, `slug` kebab-case, no unknown keys, ≤ 1 KiB) |
| `POST /api/revalidate` | `x-revalidate-secret` header compared to `REVALIDATE_SECRET` |
| `GET /api/cron/ping` | `Authorization: Bearer {CRON_SECRET}` (Vercel injects automatically) |
| `POST /api/testimonial-submit` | Signed invitation link (HMAC of `TESTIMONIAL_SUBMIT_TOKEN`, 14 days max), **single use** (claimed atomically in Redis with `SET NX` before the e-mail is sent, so two concurrent submissions cannot both pass; reuse → 410; released if Formhook fails), plus a 30-minute session key bound to that invitation (`lib/security/testimonialInvite.ts`) |
| `POST /api/errors` | Public (client reports) — rate-limited 10 req / 60 s / IP; strict payload validation; no PII stored |
| `GET /api/palette-index/[locale]` | Public, static JSON generated at build time from public content only (titles, links, tags); unknown locales return 404 |
| `GET /api/health` | Public — CORS restricted to `NEXT_PUBLIC_SITE_URL` (no wildcard `*`) |

---

### Environment Variables

- All secrets (`SUPABASE_SERVICE_ROLE_KEY`, `UPSTASH_REDIS_REST_TOKEN`, `ADMIN_PASSWORD`, etc.) are server-only — no `NEXT_PUBLIC_` prefix
- Only genuinely public values use `NEXT_PUBLIC_*` (site URL, Supabase anon key, contact email, booking page URL)
- `.env.local` is excluded from version control via `.gitignore` (pattern: `.env*`)
- See `.env.example` for the full list of expected variables

---

### CI / CD

- GitHub Actions (`ci.yml`): gitleaks secret scan, then `npm ci` (lockfile-enforced installs) → depcheck → `npm audit` → lint → typecheck → test → build; Playwright E2E (with axe accessibility checks) and Lighthouse CI run after the build
- `npm audit --audit-level=high --omit=dev --omit=optional` runs on every CI build — fails on HIGH/CRITICAL CVEs in production dependencies
- All third-party GitHub Actions pinned to **immutable commit SHAs** (not mutable tags) — supply chain attack mitigation
- CI jobs run with `permissions: contents: read` (principle of least privilege — default GITHUB_TOKEN write access revoked)
- Secrets injected via GitHub Secrets — never hardcoded in workflow files
- Dependabot enabled for npm and GitHub Actions dependency updates (security updates + alerts)
- CodeQL code scanning enabled — runs on every push and PR to `main` and weekly (Mondays 04:30 UTC)
- OpenSSF Scorecard and a daily drift check (production runs the `main` HEAD, monitoring data under 48 h old)
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
| `TESTIMONIAL_INVITE_ADMIN_TOKEN` | `openssl rand -base64 32` | Vercel env vars → redeploy |
| `IP_HASH_SALT` | `openssl rand -hex 32` | Vercel env vars → redeploy (invalidates existing hashes) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API | Vercel env vars → redeploy |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Console → Database → REST API | Vercel env vars → redeploy |

### Step-by-step procedure

1. **Generate** a new secret value (use the command shown in the table, or a password manager)
2. **Update** the secret in Vercel → Project Settings → Environment Variables (Production + Preview)
3. **Trigger a redeploy** on Vercel (or push a commit) — the new value takes effect immediately after deployment
4. **Revoke** the old secret from its source (Supabase, Upstash Console) if applicable
5. **Verify** the deployment is healthy via `/api/health` and `/status`

> **Note on `IP_HASH_SALT` rotation**: changing this salt invalidates all existing rate-limit keys in Upstash Redis (keys are HMAC-pseudonymised with this salt before storage). This has no functional impact beyond briefly resetting in-flight rate-limit counters.

### Signs of compromise to watch for

- Any entry in the Supabase `testimonial_submissions` table (no longer written by the site)
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
