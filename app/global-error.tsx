// app/global-error.tsx
// --------------------
// Last-resort error boundary: replaces the root layout when it crashes
// (getLocale(), cookies(), validateEnv…), which app/error.tsx cannot catch.
// Without it, visitors saw Next.js's bare, unstyled English error page.
// It must render its own <html> and <body>; the language follows the
// browser, as in app/error.tsx.

"use client";

import "./globals.css";
import { useEffect } from "react";

const content = {
  fr: { title: "Le site est momentanément indisponible", text: "Une erreur inattendue s'est produite. Réessayez dans un instant.", retry: "Réessayer", home: "Accueil", href: "/fr" },
  en: { title: "The site is temporarily unavailable", text: "An unexpected error occurred. Please try again in a moment.", retry: "Try again", home: "Home", href: "/en" },
  es: { title: "El sitio no está disponible por el momento", text: "Se ha producido un error inesperado. Vuelve a intentarlo en un momento.", retry: "Reintentar", home: "Inicio", href: "/es" },
} as const;

function pickLocale(): keyof typeof content {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language?.toLowerCase() ?? "";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("es")) return "es";
  return "en";
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = pickLocale();
  const c = content[locale];

  useEffect(() => {
    // Digest only: the message of a server error is not sent to the client.
    console.error("[global-error]", error.digest ?? error.name);
  }, [error]);

  return (
    <html lang={locale}>
      <body className="min-h-screen grid place-items-center bg-white px-4 text-slate-900 dark:bg-[#070B1A] dark:text-white">
        <main className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">{c.title}</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-white/70">{c.text}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full bg-cyan-700 px-5 py-2 text-sm font-medium text-white hover:bg-cyan-800"
            >
              {c.retry}
            </button>
            {/* Plain <a>: a full reload rebuilds the crashed root layout. */}
            <a href={c.href} className="rounded-full border border-black/15 px-5 py-2 text-sm dark:border-white/20">
              {c.home}
            </a>
          </div>
          {error.digest ? <p className="mt-6 text-xs text-slate-500 dark:text-white/60">Ref. {error.digest}</p> : null}
        </main>
      </body>
    </html>
  );
}
