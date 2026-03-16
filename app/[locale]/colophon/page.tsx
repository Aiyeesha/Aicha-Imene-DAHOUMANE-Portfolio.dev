// app/[locale]/colophon/page.tsx
// --------------------------------
// Page "Comment ce site est construit" — détaille la stack technique complète,
// les décisions d'architecture, la stratégie de cache, et les pratiques de sécurité.
// Utile pour les développeurs curieux et renforce la crédibilité technique.

import Link from "next/link";
import type { Metadata } from "next";

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "Colophon — Comment ce site est construit"
      : "Colophon — How this site is built",
    description: isFr
      ? "Stack technique complète, décisions d'architecture, stratégie de cache et pratiques de sécurité de ce portfolio Next.js."
      : "Full technical stack, architecture decisions, caching strategy, and security practices behind this Next.js portfolio.",
  };
}

// ── Types ─────────────────────────────────────────────────────────────────────

type StackItem = {
  name: string;
  role: string;
  link?: string;
};

type StackSection = {
  title: string;
  items: StackItem[];
};

// ── Page ─────────────────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ locale: string }> };

export default async function ColophonPage({ params }: PageProps) {
  const { locale } = await params;
  const isFr = locale === "fr";

  // ── Labels ────────────────────────────────────────────────────────────────

  const labels = {
    breadcrumbHome: isFr ? "Accueil" : "Home",
    backHome: isFr ? "Retour à l'accueil" : "Back to home",
    title: isFr ? "Colophon" : "Colophon",
    subtitle: isFr
      ? "Comment ce site est construit — stack, architecture, cache et sécurité."
      : "How this site is built — stack, architecture, caching, and security.",
    stackTitle: isFr ? "Stack technique" : "Tech stack",
    archTitle: isFr ? "Décisions d'architecture" : "Architecture decisions",
    cacheTitle: isFr ? "Stratégie de cache" : "Caching strategy",
    secTitle: isFr ? "Sécurité" : "Security",
    openSourceTitle: isFr ? "Open source" : "Open source",
    learnMore: isFr ? "Voir le code source" : "View source code",
    viewLive: isFr ? "Voir le site en ligne" : "View live site",
  };

  // ── Stack sections ────────────────────────────────────────────────────────

  const stackSections: StackSection[] = [
    {
      title: isFr ? "Frontend" : "Frontend",
      items: [
        { name: "Next.js 16", role: isFr ? "Framework React (App Router, SSR, SSG, ISR)" : "React framework (App Router, SSR, SSG, ISR)", link: "https://nextjs.org" },
        { name: "React 19", role: isFr ? "Bibliothèque UI — Server & Client Components" : "UI library — Server & Client Components", link: "https://react.dev" },
        { name: "TypeScript 5", role: isFr ? "Typage statique de bout en bout" : "End-to-end static typing", link: "https://www.typescriptlang.org" },
        { name: "Tailwind CSS", role: isFr ? "Utility-first CSS — dark mode via class" : "Utility-first CSS — dark mode via class", link: "https://tailwindcss.com" },
        { name: "next-themes", role: isFr ? "Toggle dark/light avec persistance" : "Dark/light toggle with persistence", link: "https://github.com/pacocoursey/next-themes" },
      ],
    },
    {
      title: "i18n",
      items: [
        { name: "next-intl", role: isFr ? "Internationalisation EN/FR (App Router, middleware)" : "EN/FR internationalisation (App Router, middleware)", link: "https://next-intl-docs.vercel.app" },
      ],
    },
    {
      title: "Blog",
      items: [
        { name: "@next/mdx", role: isFr ? "Rendu MDX intégré Next.js" : "Next.js MDX rendering", link: "https://nextjs.org/docs/app/building-your-application/configuring/mdx" },
        { name: "gray-matter", role: isFr ? "Parsing des frontmatter YAML" : "YAML frontmatter parsing", link: "https://github.com/jonschlinkert/gray-matter" },
        { name: "rehype / remark", role: isFr ? "Transformation AST HTML + Markdown" : "HTML + Markdown AST transformation" },
        { name: "shiki", role: isFr ? "Coloration syntaxique côté serveur" : "Server-side syntax highlighting", link: "https://shiki.style" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Supabase", role: isFr ? "PostgreSQL hébergé — projets, certifications, contact, about. RLS activé sur toutes les tables." : "Hosted PostgreSQL — projects, certifications, contact, about. RLS enabled on all tables.", link: "https://supabase.com" },
        { name: "Upstash Redis", role: isFr ? "Cache stale-while-revalidate + rate-limiting sur 6 endpoints (contact, newsletter, témoignages, cache, health, admin)" : "Stale-while-revalidate cache + rate-limiting on 6 endpoints (contact, newsletter, testimonials, cache, health, admin)", link: "https://upstash.com" },
        { name: "Formspree", role: isFr ? "Acheminement email de secours pour le formulaire de contact" : "Email routing fallback for the contact form", link: "https://formspree.io" },
      ],
    },
    {
      title: isFr ? "Déploiement & Observabilité" : "Deployment & Observability",
      items: [
        { name: "Vercel", role: isFr ? "Hébergement (Hobby plan) — CDN mondial, HTTPS automatique, preview deployments" : "Hosting (Hobby plan) — global CDN, automatic HTTPS, preview deployments", link: "https://vercel.com" },
        { name: "Vercel Analytics", role: isFr ? "Métriques Core Web Vitals (production uniquement)" : "Core Web Vitals metrics (production only)" },
        { name: "Vercel Speed Insights", role: isFr ? "Analyse des performances en production" : "Production performance analysis" },
      ],
    },
  ];

  // ── Architecture decisions ────────────────────────────────────────────────

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

  // ── Cache strategy ────────────────────────────────────────────────────────

  const cachePoints = isFr
    ? [
        "**Upstash Redis** stocke les réponses des requêtes Supabase (projets, certifications, about) avec un TTL de 5 minutes.",
        "**stale-while-revalidate** : si la donnée est en cache, elle est retournée immédiatement pendant qu'une revalidation asynchrone se déclenche en arrière-plan.",
        "**Invalidation manuelle** : l'endpoint `POST /api/cache/invalidate` (protégé par secret) permet de purger le cache après une mise à jour des données.",
        "**RSS feed** : `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` — 1h en cache CDN, revalidé toutes les 24h.",
      ]
    : [
        "**Upstash Redis** stores Supabase query responses (projects, certifications, about) with a 5-minute TTL.",
        "**stale-while-revalidate**: if data is cached, it's returned immediately while an async revalidation runs in the background.",
        "**Manual invalidation**: the `POST /api/cache/invalidate` endpoint (protected by secret) allows purging cache after data updates.",
        "**RSS feed**: `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` — 1h CDN cache, revalidated every 24h.",
      ];

  // ── Security ──────────────────────────────────────────────────────────────

  const secPoints = isFr
    ? [
        "**En-têtes HTTP** dans `next.config.mjs` : CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy (`same-origin`), Cross-Origin-Resource-Policy (`same-origin`). Fingerprinting du framework désactivé (`poweredByHeader: false`).",
        "**Row Level Security (RLS)** activé sur toutes les tables Supabase. `project_assets` restreinte aux assets des projets publiés uniquement — les brouillons ne sont pas exposés via la clé anon.",
        "**Rate-limiting** via Upstash Redis (fenêtre glissante) sur 6 endpoints : contact (5 req/10 min), newsletter (3 req/h), témoignages (3 req/24h), invalidation cache (10 req/min), health check (30 req/min), panneau admin (10 req/5 min — protection anti brute-force).",
        "**Honeypot** : champs cachés dans les formulaires de contact et de témoignages — les bots remplissant ces champs reçoivent un 200 silencieux.",
        "**Validation d'origine** : les requêtes API provenant d'origines inconnues sont rejetées en production.",
        "**Routes de diagnostic désactivées en production** : `/api/redis-test` retourne 404 hors mode développement.",
        "**CORS restreint** : `/api/health` scoped à l'origine du site uniquement — les outils de monitoring opèrent en serveur-à-serveur.",
        "**security.txt** disponible à `/.well-known/security.txt` (RFC 9116) — contact de divulgation responsable.",
        "**Aucun secret** dans les variables `NEXT_PUBLIC_*` — toutes les clés sensibles (service role, token Redis, credentials admin) restent strictement côté serveur.",
      ]
    : [
        "**HTTP headers** in `next.config.mjs`: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy (`same-origin`), Cross-Origin-Resource-Policy (`same-origin`). Framework fingerprinting suppressed via `poweredByHeader: false`.",
        "**Row Level Security (RLS)** enabled on all Supabase tables. `project_assets` restricted to published-project assets only — draft assets are not exposed via the anon key.",
        "**Rate-limiting** via Upstash Redis (sliding window) on 6 endpoints: contact (5 req/10 min), newsletter (3 req/h), testimonials (3 req/24h), cache invalidation (10 req/min), health check (30 req/min), admin panel (10 req/5 min — brute-force protection).",
        "**Honeypot fields** on contact and testimonial forms — bots filling hidden fields receive a silent 200 response.",
        "**Origin validation**: API requests from unknown origins are rejected in production.",
        "**Debug routes disabled in production**: `/api/redis-test` returns 404 outside of development mode.",
        "**CORS restricted**: `/api/health` scoped to the site origin only — monitoring tools call server-to-server, no browser CORS needed.",
        "**security.txt** at `/.well-known/security.txt` (RFC 9116) — responsible disclosure contact.",
        "**No secrets in `NEXT_PUBLIC_*`** — all sensitive keys (service role, Redis token, admin credentials) remain strictly server-side.",
      ];

  // ── Helpers — rendu texte Markdown minimal (gras uniquement) ──────────────

  function renderBold(text: string): React.ReactNode[] {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part}</strong>
        : <span key={i}>{part}</span>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav
        aria-label={isFr ? "Fil d'Ariane" : "Breadcrumb"}
        className="mb-6 flex items-center gap-2 text-sm text-muted-2"
      >
        <Link href={`/${locale}`} className="hover:underline soft-ring rounded px-1">
          {labels.breadcrumbHome}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.title}</span>
      </nav>

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <h1 className="text-3xl font-semibold">{labels.title}</h1>
      <p className="mt-3 text-muted">{labels.subtitle}</p>

      {/* ── Stack technique ──────────────────────────────────────────────────── */}
      <section aria-labelledby="section-stack" className="mt-12">
        <h2 id="section-stack" className="text-xl font-semibold">{labels.stackTitle}</h2>

        <div className="mt-6 space-y-8">
          {stackSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-2 mb-3">
                {section.title}
              </h3>
              <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
                {section.items.map((item, idx) => (
                  <div
                    key={item.name}
                    className={`flex items-start gap-4 px-5 py-4 ${idx < section.items.length - 1 ? "border-b border-black/5 dark:border-white/5" : ""}`}
                  >
                    {/* Nom de la techno */}
                    <div className="w-40 shrink-0">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-sm hover:underline underline-offset-4 soft-ring rounded"
                        >
                          {item.name}<span aria-hidden="true"> ↗</span>
                        </a>
                      ) : (
                        <span className="font-medium text-sm">{item.name}</span>
                      )}
                    </div>
                    {/* Rôle */}
                    <div className="text-sm text-muted flex-1">{item.role}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="section-arch" className="mt-14">
        <h2 id="section-arch" className="text-xl font-semibold">{labels.archTitle}</h2>
        <ul className="mt-5 space-y-3">
          {archDecisions.map((d, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className="mt-1 shrink-0 text-cyan-500 dark:text-cyan-400">→</span>
              <span>{renderBold(d)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Cache ────────────────────────────────────────────────────────────── */}
      <section aria-labelledby="section-cache" className="mt-14">
        <h2 id="section-cache" className="text-xl font-semibold">{labels.cacheTitle}</h2>
        <ul className="mt-5 space-y-3">
          {cachePoints.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className="mt-1 shrink-0 text-cyan-500 dark:text-cyan-400">→</span>
              <span>{renderBold(p)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Sécurité ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="section-sec" className="mt-14">
        <h2 id="section-sec" className="text-xl font-semibold">{labels.secTitle}</h2>
        <ul className="mt-5 space-y-3">
          {secPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className="mt-1 shrink-0 text-emerald-500 dark:text-emerald-400">→</span>
              <span>{renderBold(p)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Open source ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="section-oss" className="mt-14">
        <h2 id="section-oss" className="text-xl font-semibold">{labels.openSourceTitle}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="https://github.com/Aiyeesha/portfolio-next"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
          >
            {labels.learnMore}<span aria-hidden="true"> ↗</span>
          </a>
          <a
            href="https://portfolio-next-one-gold.vercel.app/en"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
          >
            {labels.viewLive}<span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </section>

      {/* ── Retour accueil ───────────────────────────────────────────────────── */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {labels.backHome}
        </Link>
      </div>
    </div>
  );
}
