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

- **X-Frame-Options: DENY** — prevents clickjacking attacks
- **X-Content-Type-Options: nosniff** — prevents MIME type sniffing
- **Referrer-Policy: strict-origin-when-cross-origin** — limits referrer information leakage
- **Permissions-Policy** — disables camera, microphone, and geolocation APIs
- **Content-Security-Policy** — allowlists trusted sources for scripts, styles, frames, and API calls
- **Strict-Transport-Security** — enforces HTTPS for 2 years (HSTS preload)

### Contact Form

- Rate-limited via Upstash Redis (`@upstash/ratelimit`)
- Honeypot field to filter automated spam bots
- Input validation and sanitization on the API route
- Dual submission: Supabase + Formspree for redundancy

### Backend (Supabase)

- Row Level Security (RLS) enabled on all tables
- Public tables (projects, certifications, about): `SELECT` for `anon` role only
- Contact table: `INSERT` for `anon` role only, no read access
- No `service_role` key exposed to the client

### Environment Variables

- All secrets (Supabase service role, Upstash tokens) are server-only variables (no `NEXT_PUBLIC_` prefix)
- Only truly public values use the `NEXT_PUBLIC_` prefix (Calendly URL, contact email, site URL)

---

## Reporting a Vulnerability

1. Send an email to the security contact above describing the vulnerability
2. Include steps to reproduce, affected URL/component, and potential impact
3. Allow up to **72 hours** for an initial response
4. We will coordinate a fix and disclosure timeline with you

We appreciate responsible disclosure and will credit researchers who report valid vulnerabilities (unless anonymity is preferred).
