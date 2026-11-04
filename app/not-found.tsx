// app/not-found.tsx
// -----------------
// 404 for every unmatched URL, including unknown URLs under /fr, /en and /es
// (e.g. /fr/page-inexistante). Server component: the page is in the HTML
// sent by the server, in the request's language (getLocale() reads the
// locale the next-intl proxy resolved from the URL), with a working home
// link, contact link and language switcher even without JavaScript.
//
// Why not a [locale]/[...rest] catch-all calling notFound(): in Next.js 16,
// notFound() thrown by a page is not rendered on the server; the response
// is an empty error shell (<html id="__next_error__">) and the 404 only
// appears once client JavaScript runs. An unmatched route renders this file
// on the server instead. app/[locale]/not-found.tsx still serves notFound()
// calls from locale pages (unknown blog post or project).

import { getLocale } from "next-intl/server";

type Locale = "fr" | "en" | "es";

const toLocale = (l: string): Locale => (l === "fr" || l === "es" ? l : "en");

const content = {
  fr: {
    code: "404",
    title: "Page introuvable",
    description: "Cette page n'existe pas ou a été déplacée.",
    hint: "Essayez de revenir à l'accueil ou utilisez le menu de navigation.",
    cta: "Retour à l'accueil",
    contact: "Contact",
    langLabel: "Langue",
  },
  en: {
    code: "404",
    title: "Page not found",
    description: "This page doesn't exist or may have been moved.",
    hint: "Try going back to the home page or use the navigation menu.",
    cta: "Back to home",
    contact: "Contact",
    langLabel: "Language",
  },
  es: {
    code: "404",
    title: "Página no encontrada",
    description: "Esta página no existe o ha sido movida.",
    hint: "Vuelve al inicio o usa el menú de navegación.",
    cta: "Volver al inicio",
    contact: "Contacto",
    langLabel: "Idioma",
  },
} as const;

const LANGUAGES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

// ── Icon: compass ──────────────────────────────────────────────────────────
function Icon404() {
  return (
    <svg
      aria-hidden="true"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="mx-auto text-cyan-500/50 dark:text-cyan-400/40"
    >
      {/* Outer circle */}
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      {/* Needle, top right */}
      <path d="M24 24 L32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Needle, bottom left */}
      <path d="M24 24 L16 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
      {/* Centre */}
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
      {/* Cardinal points */}
      <circle cx="24" cy="6"  r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="42" cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="24" cy="42" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="6"  cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export default async function NotFound() {
  // Locale of the request (URL segment, resolved by the next-intl proxy);
  // "en" for URLs outside any locale.
  let locale: Locale = "en";
  try {
    locale = toLocale(await getLocale());
  } catch {
    // No locale resolved for this request: keep the English default.
  }

  const c = content[locale];

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-white dark:bg-[#070B1A] text-slate-900 dark:text-white">
      <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease_forwards]">

        {/* React 19 hoists <title> into <head> (axe requires a title:
            document-title). */}
        <title>{`${c.title} — 404`}</title>

        <Icon404 />

        {/* Error code */}
        <p className="mt-4 text-8xl font-black text-cyan-700 dark:text-cyan-300 select-none leading-none">
          {c.code}
        </p>

        {/* Title + description */}
        <h1 className="mt-4 text-2xl font-semibold">{c.title}</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-white/75">{c.description}</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">{c.hint}</p>

        {/* CTAs: home + contact */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`/${locale}`}
            className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-black hover:opacity-90 transition-opacity"
          >
            {c.cta}
          </a>
          <a
            href={`/${locale}#contact`}
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-6 py-2.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {c.contact}
          </a>
        </div>

        {/* Full language switcher (EN/FR/ES) */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-slate-600 dark:text-white/70">
            {c.langLabel}
          </span>
          <div className="flex items-center gap-2">
            {LANGUAGES.map(({ code, label }) => (
              <a
                key={code}
                href={`/${code}`}
                aria-current={code === locale ? "true" : undefined}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  code === locale
                    ? "bg-cyan-500 text-black"
                    : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
