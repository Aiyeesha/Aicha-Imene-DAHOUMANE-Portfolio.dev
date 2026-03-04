// not-found.tsx (app root)
// ------------------------
// Page 404 personnalisée — bilingue (FR/EN) et cohérente avec le design du site.
//
// En App Router, cette page s'affiche pour toute route non trouvée.
// La détection de la langue se base sur Accept-Language (header navigateur).
// Note : dans un contexte next-intl, le middleware redirige vers /fr ou /en
// avant que le 404 ne s'affiche — ce composant sert de fallback global.
//
// Design : sobre, message sympa, lien de retour à l'accueil.

"use client";

import { useEffect, useState } from "react";

// Détecte la langue préférée du navigateur (fr en priorité si disponible)
function getPreferredLocale(): "fr" | "en" {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language?.toLowerCase() || "";
  return lang.startsWith("fr") ? "fr" : "en";
}

const content = {
  fr: {
    code: "404",
    title: "Page introuvable",
    description: "Cette page n'existe pas ou a été déplacée.",
    hint: "Essayez de revenir à l'accueil ou utilisez le menu de navigation.",
    cta: "Retour à l'accueil",
    href: "/fr"
  },
  en: {
    code: "404",
    title: "Page not found",
    description: "This page doesn't exist or may have been moved.",
    hint: "Try going back to the home page or use the navigation menu.",
    cta: "Back to home",
    href: "/en"
  }
};

export default function NotFound() {
  const [locale, setLocale] = useState<"fr" | "en">("en");

  // Détecte la langue côté client (évite les erreurs de hydratation SSR)
  useEffect(() => {
    setLocale(getPreferredLocale());
  }, []);

  const c = content[locale];

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-white dark:bg-[#070B1A] text-slate-900 dark:text-white">
      <div className="w-full max-w-md text-center">

        {/* Code d'erreur stylisé */}
        <p className="text-8xl font-black text-cyan-500/30 dark:text-cyan-400/20 select-none leading-none">
          {c.code}
        </p>

        {/* Titre + description */}
        <h1 className="mt-4 text-2xl font-semibold">{c.title}</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-white/60">{c.description}</p>
        <p className="mt-2 text-sm text-slate-400 dark:text-white/40">{c.hint}</p>

        {/* CTA retour à l'accueil */}
        <div className="mt-8 flex justify-center gap-3">
          <a
            href={c.href}
            className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-black hover:opacity-90 transition-opacity"
          >
            {c.cta}
          </a>

          {/* Lien alternatif vers l'autre langue */}
          <a
            href={locale === "fr" ? "/en" : "/fr"}
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-6 py-2.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {locale === "fr" ? "EN" : "FR"}
          </a>
        </div>

      </div>
    </div>
  );
}
