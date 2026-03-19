// app/not-found.tsx
// -----------------
// Page 404 racine — fallback global quand aucun [locale]/not-found.tsx ne correspond.
// S'affiche pour les routes hors [locale]/ (ex: /admin/page-inconnue).
//
// Détection de langue via navigator.language (client only) — flash acceptable
// sur ce fallback rare. La version locale (app/[locale]/not-found.tsx) utilise
// useParams() et n'a pas ce flash.

"use client";

import { useEffect, useState } from "react";

function getPreferredLocale(): "fr" | "en" {
  if (typeof window === "undefined") return "en";
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

const content = {
  fr: {
    code: "404",
    title: "Page introuvable",
    description: "Cette page n'existe pas ou a été déplacée.",
    hint: "Essayez de revenir à l'accueil ou utilisez le menu de navigation.",
    cta: "Retour à l'accueil",
    href: "/fr",
    altHref: "/en",
    altLabel: "EN",
  },
  en: {
    code: "404",
    title: "Page not found",
    description: "This page doesn't exist or may have been moved.",
    hint: "Try going back to the home page or use the navigation menu.",
    cta: "Back to home",
    href: "/en",
    altHref: "/fr",
    altLabel: "FR",
  },
} as const;

// ── Icône : boussole / lien brisé ──────────────────────────────────────────
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
      {/* Cercle extérieur */}
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      {/* Aiguille boussole haut-droite */}
      <path d="M24 24 L32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Aiguille boussole bas-gauche */}
      <path d="M24 24 L16 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
      {/* Centre */}
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
      {/* Points cardinaux */}
      <circle cx="24" cy="6"  r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="42" cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="24" cy="42" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="6"  cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export default function NotFound() {
  const [locale, setLocale] = useState<"fr" | "en">("en");

  useEffect(() => {
    setLocale(getPreferredLocale());
  }, []);

  const c = content[locale];

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-white dark:bg-[#070B1A] text-slate-900 dark:text-white">
      <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease_forwards]">

        <Icon404 />

        {/* Code d'erreur */}
        <p className="mt-4 text-8xl font-black text-cyan-500/30 dark:text-cyan-400/20 select-none leading-none">
          {c.code}
        </p>

        {/* Titre + description */}
        <h1 className="mt-4 text-2xl font-semibold">{c.title}</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-white/60">{c.description}</p>
        <p className="mt-2 text-sm text-slate-400 dark:text-white/40">{c.hint}</p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={c.href}
            className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-black hover:opacity-90 transition-opacity"
          >
            {c.cta}
          </a>
          <a
            href={c.altHref}
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-6 py-2.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {c.altLabel}
          </a>
        </div>

      </div>
    </div>
  );
}
