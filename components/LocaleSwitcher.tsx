"use client";

import { usePathname } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import Link from "next/link";

export default function LocaleSwitcher({ current }: { current: AppLocale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|fr)/, "");

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          className={`rounded-full border px-3 py-1.5 text-sm ${
            l === current
              ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
              : "border-black/10 dark:border-white/10 text-muted hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
