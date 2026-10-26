// app/[locale]/not-found.tsx
// --------------------------
// Locale 404 for everything under app/[locale]/ (including unknown URLs, via
// the [...rest] catch-all). useParams() gives the locale with no flash.

"use client";

import { useParams } from "next/navigation";

const content = {
  fr: {
    code: "404",
    title: "Page introuvable",
    description: "Cette page n'existe pas ou a été déplacée.",
    metaDescription: "Cette page n'existe pas ou a été déplacée. Retrouvez les projets, l'expérience Salesforce et IT Ops et les articles d'Aïcha Imène DAHOUMANE depuis l'accueil.",
    hint: "Essayez de revenir à l'accueil ou utilisez le menu de navigation.",
    cta: "Retour à l'accueil",
    contact: "Contact",
    langLabel: "Langue",
  },
  en: {
    code: "404",
    title: "Page not found",
    description: "This page doesn't exist or may have been moved.",
    metaDescription: "This page doesn't exist or has been moved. Find Aïcha Imène DAHOUMANE's projects, Salesforce and IT Ops experience and articles from the home page.",
    hint: "Try going back to the home page or use the navigation menu.",
    cta: "Back to home",
    contact: "Contact",
    langLabel: "Language",
  },
  es: {
    code: "404",
    title: "Página no encontrada",
    description: "Esta página no existe o ha sido movida.",
    metaDescription: "Esta página no existe o ha sido movida. Encuentra los proyectos, la experiencia Salesforce e IT Ops y los artículos de Aïcha Imène DAHOUMANE desde el inicio.",
    hint: "Vuelve al inicio o usa el menú de navegación.",
    cta: "Volver al inicio",
    contact: "Contacto",
    langLabel: "Idioma",
  },
} as const;

type Locale = keyof typeof content;

const LANGUAGES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

// ── Icon: compass ───────────────────────────────────────────────────────────
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
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      <path d="M24 24 L32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 24 L16 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
      <circle cx="24" cy="6"  r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="42" cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="24" cy="42" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="6"  cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export default function LocaleNotFound() {
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale = raw === "fr" || raw === "es" ? raw : "en";
  const c = content[locale];

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-white dark:bg-[#070B1A] text-slate-900 dark:text-white">
      <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease_forwards]">

        {/* React 19 hoists <title> and <meta> into <head>: a client component
            cannot export metadata, and axe requires a title (document-title).
            The page has its own description rather than the home page's. */}
        <title>{`${c.title} — 404`}</title>
        <meta name="description" content={c.metaDescription} />

        <Icon404 />

        <p className="mt-4 text-8xl font-black text-cyan-700 dark:text-cyan-300 select-none leading-none">
          {c.code}
        </p>

        <h1 className="mt-4 text-2xl font-semibold">{c.title}</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-white/75">{c.description}</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/70">{c.hint}</p>

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
