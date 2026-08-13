# Contributing

Thank you for your interest in this portfolio project.
This is a personal site — contributions are limited to bug reports, accessibility improvements, and invited collaborators.

---

## Table of Contents

- [Local setup](#local-setup)
- [Environment variables](#environment-variables)
- [Development workflow](#development-workflow)
- [Scripts](#scripts)
- [Code conventions](#code-conventions)
- [Commit messages](#commit-messages)
- [Pull request process](#pull-request-process)
- [Security](#security)

---

## Local setup

**Requirements:** Node.js 24+, npm 10+

```bash
# 1. Clone the repository
git clone https://github.com/Aiyeesha/portfolio-next.git
cd portfolio-next

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your own values (see section below)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

> **Note:** The site uses Next.js App Router with next-intl.
> The default locale is `en`. `/fr` is the secondary locale.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the required values.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key (public) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL (no trailing slash) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Contact email displayed on site |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key — **server-only, never expose** |
| `UPSTASH_REDIS_REST_URL` | Recommended | Upstash Redis URL (rate-limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | Upstash Redis token — server-only |
| `NEXT_PUBLIC_LINKEDIN_URL` | No | LinkedIn profile URL |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Calendly booking URL |
| `NEXT_PUBLIC_CV_PDF_URL` | No | CV PDF URL (fallback: `/cv/Aicha-Imene-DAHOUMANE-CV-{locale}-{track}.pdf`) |
| `FORMSPREE_ENDPOINT` | No | Formspree contact form endpoint |
| `ADMIN_USERNAME` | No | Username for `/admin` Basic Auth |
| `ADMIN_PASSWORD` | No | Password for `/admin` Basic Auth — server-only |
| `CRON_SECRET` | No | Bearer token for `/api/cron/ping` |
| `TESTIMONIAL_SUBMIT_TOKEN` | No | Token for the testimonial submission form |
| `CACHE_INVALIDATE_SECRET` | No | Secret header for `/api/cache/invalidate` |

The site works without Supabase in dev mode — most pages fall back gracefully.
Rate-limiting is disabled if Upstash is not configured (all limiters degrade to a no-op).

> **Security:** Never commit `.env.local` to version control. It is excluded by `.gitignore` (pattern `.env*`).
> All secrets must remain server-only — do not add `NEXT_PUBLIC_` to any sensitive variable.

---

## Development workflow

```
main
 └── feature/your-feature   ← work here
      └── PR → main
```

1. Create a branch from `main`: `git checkout -b fix/accessibility-nav`
2. Make your changes (see [Code conventions](#code-conventions))
3. Run checks locally before pushing (see [Scripts](#scripts))
4. Open a pull request against `main`

> **Before touching any API route or middleware**, re-read the rate-limiting strategy in `lib/ratelimit.ts`
> and confirm the route is covered (or intentionally public).

---

## Scripts

All commands run from the `portfolio/` directory.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on `localhost:3000` |
| `npm run build` | Production build (validates everything) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check (no emit) |
| `npm test` | Run Jest test suite |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:ci` | Tests in CI mode (no interactive output) |
| `npm run db:migrate` | Apply Supabase SQL migrations |

**Before opening a PR, always run:**

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

The CI pipeline runs exactly these four checks in order.

---

## Code conventions

### TypeScript
- Strict mode enabled (`tsconfig.json`)
- Prefer explicit types over `any` — use `unknown` when the type is truly unknown
- No `// @ts-ignore` without a comment explaining why

### React / Next.js
- **Server Components by default** — add `"use client"` only when needed (event handlers, hooks, browser APIs)
- Use `next/image` for all images with correct `sizes` attributes
- Use `next/font` for all fonts (already configured: Space Grotesk + Inter)
- No direct `fetch` in Client Components — use Server Components or API routes

### Styling
- Tailwind CSS utility classes — no custom CSS unless unavoidable
- Dark mode via `dark:` prefix (`html.dark` strategy via next-themes)
- Responsive design: mobile-first (`sm:`, `md:`, `lg:` breakpoints)

### i18n
- All user-facing strings must be in `messages/en.json` and `messages/fr.json`
- Never hardcode English text directly in components — use `useTranslations()`
- EN is the source language; FR is translated from EN

### Accessibility
- Every interactive element must be keyboard-navigable
- Use `aria-label` on icon buttons, `aria-live` on dynamic content
- Respect `prefers-reduced-motion` for all animations (Framer Motion's `useReducedMotion()` is already wired)
- Minimum contrast ratio: 4.5:1 (WCAG AA)

### Testing
- New components should have a corresponding test in `__tests__/`
- Mock `next-intl` and `@/app/[locale]/providers` in component tests (see existing tests for pattern)
- Pure functions (no React): test directly without mocks
- Aim to test behavior, not implementation details

---

## Commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>

[optional body]
```

**Types:**

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Refactoring, no feature/fix |
| `test` | Adding or fixing tests |
| `chore` | Build, deps, config |
| `a11y` | Accessibility improvement |
| `perf` | Performance improvement |

**Examples:**

```
feat(blog): add syntax highlighting with rehype-pretty-code
fix(contact): show rate-limit countdown instead of static error
a11y(navbar): add skip-to-content link
test(accordion): add open/close interaction tests
```

Keep the subject line under 72 characters.
Use the imperative mood: "add" not "added", "fix" not "fixed".

---

## Pull request process

1. **Title**: follow the commit message format above
2. **Description**: explain *what* changed and *why* (not *how*)
3. **Checklist** before requesting review:
   - [ ] `npm run typecheck` passes
   - [ ] `npm run lint` passes
   - [ ] `npm test` passes (all tests green)
   - [ ] `npm run build` succeeds
   - [ ] Tested on mobile (375px) and desktop (1440px)
   - [ ] Tested in dark mode and light mode
   - [ ] Tested with both tracks (Salesforce and IT Ops)
   - [ ] New strings added to both `messages/en.json` and `messages/fr.json`
   - [ ] `CHANGELOG.md` updated under `[Unreleased]`
   - [ ] No secrets introduced in `NEXT_PUBLIC_*` variables or committed files
   - [ ] New API routes have rate-limiting, input validation, and appropriate auth

PRs that break the CI pipeline will not be merged.

---

## Security

Found a vulnerability? Please **do not** open a public GitHub issue.

Report it privately following the instructions in [SECURITY.md](SECURITY.md)
or via the contact in [/.well-known/security.txt](/.well-known/security.txt).
