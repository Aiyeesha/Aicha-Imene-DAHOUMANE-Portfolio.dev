"use client";

import { usePathname } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTrack } from "@/app/[locale]/providers";

export default function LocaleSwitcher({ current }: { current: AppLocale }) {
  const { track } = useTrack();
  const pathname = usePathname();
  // Map locale → alternate URL discovered from <link rel="alternate" hreflang> tags.
  // Falls back to constructing the URL from pathname when no alternate is present.
  const [alternates, setAlternates] = useState<Partial<Record<AppLocale, string>>>({});

  useEffect(() => {
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]');
    const map: Partial<Record<AppLocale, string>> = {};
    links.forEach((el) => {
      const lang = el.hreflang as AppLocale;
      if (routing.locales.includes(lang)) {
        try {
          map[lang] = new URL(el.href).pathname;
        } catch {
          map[lang] = el.getAttribute("href") ?? el.href;
        }
      }
    });
    setAlternates(map);
  }, [pathname]);

  function hrefFor(locale: AppLocale): string {
    if (alternates[locale]) return alternates[locale]!;
    const rest = pathname.replace(/^\/(en|fr)/, "");
    return `/${locale}${rest}`;
  }

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            l === current
              ? track === "salesforce"
                ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                : "border-violet-400/40 bg-violet-500/10 text-violet-700 dark:text-violet-200"
              : "border-black/10 dark:border-white/10 text-muted hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
