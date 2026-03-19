// app/[locale]/error.tsx
// ----------------------
// Error boundary locale — intercepte les crashs dans app/[locale]/* :
// home, about, certifications, blog… (Supabase/Redis/Upstash timeout, etc.).
//
// useParams() résout la locale sans flash. "use client" requis par Next.js.
//
// Props injectés par Next.js :
//   error  — instance Error (.digest = ID serveur pour le logging)
//   reset  — re-rend le segment sans rechargement complet

"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

const content = {
  fr: {
    code: "500",
    title: "Une erreur est survenue",
    description: "Une erreur inattendue s'est produite lors du chargement de cette page.",
    hint: "Il peut s'agir d'un problème temporaire. Réessayez ou revenez à l'accueil.",
    retry: "Réessayer",
    home: "Retour à l'accueil",
    href: "/fr",
    altHref: "/en",
    altLabel: "EN",
  },
  en: {
    code: "500",
    title: "Something went wrong",
    description: "An unexpected error occurred while loading this page.",
    hint: "This might be a temporary issue. Try again or go back to the home page.",
    retry: "Try again",
    home: "Back to home",
    href: "/en",
    altHref: "/fr",
    altLabel: "FR",
  },
} as const;

type Locale = keyof typeof content;

// ── Icône : éclair ──────────────────────────────────────────────────────────
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
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
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

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale = raw === "fr" || raw === "en" ? raw : "en";

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[LocaleError]", error);
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
