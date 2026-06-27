"use client";

import Link from "next/link";
import { useTrack } from "@/app/[locale]/providers";

type StackItem = { name: string; role: string; link?: string };
type StackSection = { title: string; items: StackItem[] };

export default function ColophonContent({ locale }: { locale: string }) {
  const { track } = useTrack();
  const isFr = locale === "fr";
  const isSf = track === "salesforce";

  const arrowClass  = isSf ? "text-cyan-500 dark:text-cyan-400" : "text-violet-500 dark:text-violet-400";
  const ctaBtnClass = isSf ? "bg-cyan-500 text-black hover:opacity-90" : "bg-violet-600 text-white hover:opacity-90";

  const labels = {
    breadcrumbHome: isFr ? "Accueil" : "Home",
    backHome:       isFr ? "Retour à l'accueil" : "Back to home",
    title:          "Colophon",
    subtitle: isFr
      ? "Comment ce site est construit — stack, architecture, cache et sécurité."
      : "How this site is built — stack, architecture, caching, and security.",
    stackTitle:     isFr ? "Stack technique" : "Tech stack",
    archTitle:      isFr ? "Décisions d'architecture" : "Architecture decisions",
    cacheTitle:     isFr ? "Stratégie de cache" : "Caching strategy",
    secTitle:       isFr ? "Sécurité" : "Security",
    openSourceTitle:isFr ? "Open source" : "Open source",
    learnMore:      isFr ? "Voir le code source" : "View source code",
    viewLive:       isFr ? "Voir le site en ligne" : "View live site",
  };

  const stackSections: StackSection[] = [
    {
      title: "Frontend",
      items: [
        { name: "Next.js",      role: isFr ? "Framework React (App Router, SSR, SSG, ISR)" : "React framework (App Router, SSR, SSG, ISR)", link: "https://nextjs.org" },
        { name: "React",        role: isFr ? "Bibliothèque UI — Server & Client Components" : "UI library — Server & Client Components", link: "https://react.dev" },
        { name: "TypeScript",   role: isFr ? "Typage statique de bout en bout" : "End-to-end static typing", link: "https://www.typescriptlang.org" },
        { name: "Tailwind CSS", role: isFr ? "Utility-first CSS — dark mode via class" : "Utility-first CSS — dark mode via class", link: "https://tailwindcss.com" },
        { name: "next-themes",  role: isFr ? "Toggle dark/light avec persistance" : "Dark/light toggle with persistence", link: "https://github.com/pacocoursey/next-themes" },
      ],
    },
    {
      title: "i18n",
      items: [{ name: "next-intl", role: isFr ? "Internationalisation EN/FR (App Router, middleware)" : "EN/FR internationalisation (App Router, middleware)", link: "https://next-intl-docs.vercel.app" }],
    },
    {
      title: "Blog",
      items: [
        { name: "@next/mdx",     role: isFr ? "Rendu MDX intégré Next.js" : "Next.js MDX rendering", link: "https://nextjs.org/docs/app/building-your-application/configuring/mdx" },
        { name: "gray-matter",   role: isFr ? "Parsing des frontmatter YAML" : "YAML frontmatter parsing", link: "https://github.com/jonschlinkert/gray-matter" },
        { name: "rehype / remark", role: isFr ? "Transformation AST HTML + Markdown" : "HTML + Markdown AST transformation" },
        { name: "shiki",         role: isFr ? "Coloration syntaxique côté serveur" : "Server-side syntax highlighting", link: "https://shiki.style" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Supabase",      role: isFr ? "PostgreSQL hébergé — projets, certifications, contact, about. RLS activé sur toutes les tables." : "Hosted PostgreSQL — projects, certifications, contact, about. RLS enabled on all tables.", link: "https://supabase.com" },
        { name: "Upstash Redis", role: isFr ? "Cache stale-while-revalidate + rate-limiting sur les endpoints d'écriture et sensibles (contact, témoignages, invalidation cache, admin, rapports CSP, health)" : "Stale-while-revalidate cache + rate-limiting on write and sensitive endpoints (contact, testimonials, cache invalidation, admin, CSP reports, health)", link: "https://upstash.com" },
        { name: "Formspree",     role: isFr ? "Acheminement email de secours pour le formulaire de contact" : "Email routing fallback for the contact form", link: "https://formspree.io" },
      ],
    },
    {
      title: isFr ? "Déploiement & Observabilité" : "Deployment & Observability",
      items: [
        { name: "Vercel",                role: isFr ? "Hébergement (Hobby plan) — CDN mondial, HTTPS automatique, preview deployments" : "Hosting (Hobby plan) — global CDN, automatic HTTPS, preview deployments", link: "https://vercel.com" },
        { name: "Vercel Analytics",      role: isFr ? "Métriques Core Web Vitals (production uniquement)" : "Core Web Vitals metrics (production only)" },
        { name: "Vercel Speed Insights", role: isFr ? "Analyse des performances en production" : "Production performance analysis" },
      ],
    },
    {
      title: isFr ? "CI/CD & Qualité" : "CI/CD & Quality",
      items: [
        { name: "GitHub Actions",    role: isFr ? "Pipeline CI : build, lint, typecheck, tests unitaires, audit sécurité npm, E2E Playwright, Lighthouse CI" : "CI pipeline: build, lint, typecheck, unit tests, npm security audit, Playwright E2E, Lighthouse CI" },
        { name: "Lighthouse CI",     role: isFr ? "Budgets performance & accessibilité sur chaque PR — accessibilité ≥ 95 (bloquant), performance ≥ 65 (avertissement)" : "Performance & accessibility budgets on every PR — accessibility ≥ 95 (blocking), performance ≥ 65 (warning)", link: "https://github.com/GoogleChrome/lighthouse-ci" },
        { name: "axe-core / Playwright", role: isFr ? "Audit WCAG 2.2 AA automatisé sur 6 routes — zéro tolérance pour les violations critiques" : "Automated WCAG 2.2 AA audit on 6 routes — zero tolerance for critical violations", link: "https://github.com/dequelabs/axe-core" },
        { name: "Dependabot",        role: isFr ? "Mises à jour npm hebdomadaires (8 groupes), Actions mensuelles — majors next-intl/framer-motion en revue manuelle" : "Weekly npm updates (8 groups), monthly Actions — next-intl/framer-motion majors require manual review" },
        { name: "OpenSSF Scorecard", role: isFr ? "Score supply chain sécurité hebdomadaire — branch protection, SAST, dependency pinning, signed commits" : "Weekly supply chain security scoring — branch protection, SAST, dependency pinning, signed commits", link: "https://securityscorecard.com" },
      ],
    },
  ];

  const archDecisions = isFr
    ? [
        "**One-page landing** avec sections distinctes pour les compétences, l'expérience, les services, les projets et le contact — navigation par ancres.",
        "**Track toggle** côté client (cookie `track`) : un seul composant hero, compétences et services adaptés selon le profil Salesforce ou IT Ops.",
        "**Pages dédiées** pour About, Certifications et Blog — accessibles via la navbar, non dupliquées dans la landing.",
        "**Server Components par défaut** : seuls les composants interactifs (hero, toggle de thème, formulaire) sont marqués `use client`.",
        "**Données Supabase** récupérées côté serveur avec cache Redis (stale-while-revalidate) — pas de requêtes client directes.",
        "**Blog MDX** : articles écrits en `.mdx` dans `content/blog/posts/{locale}/` — rendu statique au build, pas de base de données requise.",
      ]
    : [
        "**One-page landing** with distinct sections for skills, experience, services, projects, and contact — anchor-based navigation.",
        "**Client-side track toggle** (cookie `track`): a single hero component, skills and services adapt to Salesforce or IT Ops profile.",
        "**Dedicated pages** for About, Certifications, and Blog — accessible via the navbar, not duplicated in the landing.",
        "**Server Components by default**: only interactive components (hero, theme toggle, contact form) are marked `use client`.",
        "**Supabase data** fetched server-side with Redis cache (stale-while-revalidate) — no direct client queries.",
        "**MDX Blog**: articles written as `.mdx` files in `content/blog/posts/{locale}/` — statically rendered at build time, no database required.",
      ];

  const cachePoints = isFr
    ? [
        "**Upstash Redis** stocke les réponses des requêtes Supabase (projets, certifications, about) avec un TTL de 5 minutes.",
        "**stale-while-revalidate** : si la donnée est en cache, elle est retournée immédiatement pendant qu'une revalidation asynchrone se déclenche en arrière-plan.",
        "**Invalidation manuelle** : l'endpoint `POST /api/cache/invalidate` (protégé par secret) permet de purger le cache après une mise à jour des données.",
        "**RSS feed** : `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` — 1h en cache CDN, revalidé toutes les 24h.",
        "**ISR (pages HTML)** : non activé sur Vercel CDN par choix de sécurité — le nonce CSP généré par requête (suppression de `'unsafe-inline'`) est incompatible avec un HTML mis en cache. Cache prévu via reverse-proxy homelab (Q4 2026), qui pourra mettre en cache le HTML à sa couche sans compromettre le nonce.",
      ]
    : [
        "**Upstash Redis** stores Supabase query responses (projects, certifications, about) with a 5-minute TTL.",
        "**stale-while-revalidate**: if data is cached, it's returned immediately while an async revalidation runs in the background.",
        "**Manual invalidation**: the `POST /api/cache/invalidate` endpoint (protected by secret) allows purging cache after data updates.",
        "**RSS feed**: `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` — 1h CDN cache, revalidated every 24h.",
        "**ISR (HTML pages)**: disabled on Vercel CDN by security design — the per-request CSP nonce (eliminating `'unsafe-inline'`) is incompatible with cached HTML. Caching is planned via a homelab reverse proxy (Q4 2026), which will cache HTML at its own layer without compromising the nonce.",
      ];

  const secPoints = isFr
    ? [
        "**CSP nonce-based** : `'unsafe-inline'` retiré de `script-src`. Un nonce cryptographique unique est généré par requête dans le middleware Edge (`proxy.ts`) et injecté dans tous les scripts inline autorisés (JSON-LD, Vercel Analytics, hydratation Next.js). Tout script inline sans nonce est bloqué par le navigateur.",
        "**En-têtes HTTP** dans `next.config.mjs` : HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy étendu, Cross-Origin-Opener-Policy (`same-origin`), Cross-Origin-Resource-Policy (`same-origin`), Report-To, Reporting-Endpoints. Fingerprinting du framework désactivé (`poweredByHeader: false`).",
        "**Row Level Security (RLS)** activé sur toutes les tables Supabase. `project_assets` restreinte aux assets des projets publiés uniquement — les brouillons ne sont pas exposés via la clé anon.",
        "**Rate-limiting** via Upstash Redis (fenêtre glissante) sur les endpoints sensibles : contact (5 req/10 min), témoignages (3 req/24h), invalidation cache (10 req/min), health check (30 req/min), rapports CSP (20 req/min), panneau admin (5 req/15 min — protection anti brute-force). Si Redis **n'est pas configuré** en production, le limiteur bascule en *fail-closed* (toutes les requêtes bloquées). En cas de **panne transitoire** de Redis, il bascule en *fail-open* pour ne pas pénaliser les utilisateurs légitimes — sauf sur `/admin` où le comportement reste *fail-closed*.",
        "**Honeypot** : champs cachés dans les formulaires de contact et de témoignages — les bots remplissant ces champs reçoivent un 200 silencieux.",
        "**Validation d'origine** : les requêtes API provenant d'origines inconnues sont rejetées en production.",
        "**Routes de diagnostic désactivées en production** : `/api/redis-test` retourne 404 hors mode développement.",
        "**CORS restreint** : `/api/health` scoped à l'origine du site uniquement — les outils de monitoring opèrent en serveur-à-serveur.",
        "**security.txt** disponible à `/.well-known/security.txt` (RFC 9116) — contact de divulgation responsable.",
        "**Aucun secret** dans les variables `NEXT_PUBLIC_*` — toutes les clés sensibles (service role, token Redis, credentials admin) restent strictement côté serveur.",
        "**Validation externe (tiers neutres)** : [securityheaders.com](https://securityheaders.com/?q=portfolio-next-one-gold.vercel.app&followRedirects=on) · [Mozilla Observatory](https://observatory.mozilla.org/analyze/portfolio-next-one-gold.vercel.app) — posture HTTP vérifiée indépendamment du site.",
      ]
    : [
        "**HTTP headers** in `next.config.mjs`: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy (`same-origin`), Cross-Origin-Resource-Policy (`same-origin`). Framework fingerprinting suppressed via `poweredByHeader: false`.",
        "**Row Level Security (RLS)** enabled on all Supabase tables. `project_assets` restricted to published-project assets only — draft assets are not exposed via the anon key.",
        "**Rate-limiting** via Upstash Redis (sliding window) on sensitive endpoints: contact (5 req/10 min), testimonials (3 req/24h), cache invalidation (10 req/min), health check (30 req/min), CSP reports (20 req/min), admin panel (5 req/15 min — brute-force protection). If Redis is **not configured** in production, the limiter fails closed (all requests blocked). During a **transient Redis outage**, it fails open to avoid blocking legitimate users — except on `/admin`, which remains fail-closed.",
        "**Honeypot fields** on contact and testimonial forms — bots filling hidden fields receive a silent 200 response.",
        "**Origin validation**: API requests from unknown origins are rejected in production.",
        "**Debug routes disabled in production**: `/api/redis-test` returns 404 outside of development mode.",
        "**CORS restricted**: `/api/health` scoped to the site origin only — monitoring tools call server-to-server, no browser CORS needed.",
        "**security.txt** at `/.well-known/security.txt` (RFC 9116) — responsible disclosure contact.",
        "**No secrets in `NEXT_PUBLIC_*`** — all sensitive keys (service role, Redis token, admin credentials) remain strictly server-side.",
        "**External validation (neutral third parties)**: [securityheaders.com](https://securityheaders.com/?q=portfolio-next-one-gold.vercel.app&followRedirects=on) · [Mozilla Observatory](https://observatory.mozilla.org/analyze/portfolio-next-one-gold.vercel.app) — HTTP security posture verified independently from the site.",
      ];

  function renderMarkdown(text: string): React.ReactNode[] {
    const regex = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) result.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
      if (match[1] !== undefined) {
        result.push(<strong key={key++} className="font-semibold text-slate-900 dark:text-white">{match[1]}</strong>);
      } else {
        result.push(<a key={key++} href={match[3]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 soft-ring rounded">{match[2]}</a>);
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) result.push(<span key={key++}>{text.slice(lastIndex)}</span>);
    return result;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">

      <nav aria-label={isFr ? "Fil d'Ariane" : "Breadcrumb"} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded px-1">{labels.breadcrumbHome}</Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.title}</span>
      </nav>

      <h1 className="text-3xl font-semibold">{labels.title}</h1>
      <p className="mt-3 text-muted">{labels.subtitle}</p>

      {/* Stack */}
      <section aria-labelledby="section-stack" className="mt-12">
        <h2 id="section-stack" className="text-xl font-semibold">{labels.stackTitle}</h2>
        <div className="mt-6 space-y-8">
          {stackSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-2 mb-3">{section.title}</h3>
              <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
                {section.items.map((item, idx) => (
                  <div key={item.name} className={`flex items-start gap-4 px-5 py-4 ${idx < section.items.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""}`}>
                    <div className="w-40 shrink-0">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer noopener" className="font-medium text-sm hover:underline underline-offset-4 soft-ring rounded">
                          {item.name}<span aria-hidden="true"> ↗</span>
                        </a>
                      ) : (
                        <span className="font-medium text-sm">{item.name}</span>
                      )}
                    </div>
                    <div className="text-sm text-muted flex-1">{item.role}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section aria-labelledby="section-arch" className="mt-14">
        <h2 id="section-arch" className="text-xl font-semibold">{labels.archTitle}</h2>
        <ul className="mt-5 space-y-3">
          {archDecisions.map((d, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className={`mt-1 shrink-0 ${arrowClass}`}>→</span>
              <span>{renderMarkdown(d)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cache */}
      <section aria-labelledby="section-cache" className="mt-14">
        <h2 id="section-cache" className="text-xl font-semibold">{labels.cacheTitle}</h2>
        <ul className="mt-5 space-y-3">
          {cachePoints.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className={`mt-1 shrink-0 ${arrowClass}`}>→</span>
              <span>{renderMarkdown(p)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sécurité */}
      <section aria-labelledby="section-sec" className="mt-14">
        <h2 id="section-sec" className="text-xl font-semibold">{labels.secTitle}</h2>
        <ul className="mt-5 space-y-3">
          {secPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className="mt-1 shrink-0 text-emerald-500 dark:text-emerald-400">→</span>
              <span>{renderMarkdown(p)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Open source */}
      <section aria-labelledby="section-oss" className="mt-14">
        <h2 id="section-oss" className="text-xl font-semibold">{labels.openSourceTitle}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://github.com/Aiyeesha/portfolio-next" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring">
            {labels.learnMore}<span aria-hidden="true"> ↗</span>
          </a>
          <a href={`/${locale}`} target="_blank" rel="noreferrer noopener" className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium soft-ring ${ctaBtnClass}`}>
            {labels.viewLive}<span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </section>

      {/* Retour */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring">
          ← {labels.backHome}
        </Link>
      </div>
    </div>
  );
}
