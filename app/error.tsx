// app/error.tsx
// -------------
// Error boundary racine — intercepte les crashs hors app/[locale]/ (ex: /admin).
// "use client" requis par Next.js App Router.
//
// Props injectés par Next.js :
//   error  — instance Error (+ .digest pour les erreurs serveur)
//   reset  — re-rend le segment crashé (sans rechargement complet)

"use client";

import { useEffect, useState } from "react";

function getPreferredLocale(): "fr" | "en" {
  if (typeof window === "undefined") return "en";
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

const content = {
  fr: {
    code: "500",
    title: "Une erreur est survenue",
    description: "Quelque chose s'est mal passé côté application.",
    hint: "Vous pouvez réessayer, ou revenir à l'accueil si le problème persiste.",
    retry: "Réessayer",
    home: "Retour à l'accueil",
    href: "/fr",
    altHref: "/en",
    altLabel: "EN",
  },
  en: {
    code: "500",
    title: "Something went wrong",
    description: "An unexpected error occurred in the application.",
    hint: "You can try again, or go back to the home page if the issue persists.",
    retry: "Try again",
    home: "Back to home",
    href: "/en",
    altHref: "/fr",
    altLabel: "FR",
  },
} as const;

// ── Icône : éclair (erreur serveur) ────────────────────────────────────────
function Icon500() {
  return (
    <svg
      aria-hidden="true"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="mx-auto text-rose-500/50 dark:text-rose-400/40"
    >
      {/* Cercle extérieur */}
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
      {/* Éclair */}
      <path
        d="M27 10 L18 26 H24 L21 38 L32 22 H26 L27 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<"fr" | "en">("en");

  useEffect(() => {
    setLocale(getPreferredLocale());
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[GlobalError]", error);
    }
  }, [error]);

  const c = content[locale];

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-white dark:bg-[#070B1A] text-slate-900 dark:text-white">
      <div className="w-full max-w-md text-center animate-[fadeIn_0.4s_ease_forwards]">

        <Icon500 />

        <p className="mt-4 text-8xl font-black text-rose-500/25 dark:text-rose-400/20 select-none leading-none">
          {c.code}
        </p>

        <h1 className="mt-4 text-2xl font-semibold">{c.title}</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-white/60">{c.description}</p>
        <p className="mt-2 text-sm text-slate-400 dark:text-white/40">{c.hint}</p>

        {/* Digest — dev uniquement */}
        {error.digest && process.env.NODE_ENV !== "production" && (
          <p className="mt-4 font-mono text-xs text-slate-300 dark:text-white/20">
            digest: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-medium text-black hover:opacity-90 transition-opacity"
          >
            {c.retry}
          </button>
          <a
            href={c.href}
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-6 py-2.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {c.home}
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
