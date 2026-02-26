"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { TocItem } from "@/content/blog/toc";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const t = useTranslations();
  const locale = useLocale() as "en" | "fr";

  if (!items.length) return null;

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
      <div className="card p-6">
        <div className="text-sm font-semibold">{t("blogToc.title")}</div>

        <nav className="mt-4 space-y-2 text-sm">
          {items.map((it) => (
            <a
              key={`${it.depth}-${it.id}`}
              href={`#${it.id}`}
              className={[
                "block text-muted hover:text-slate-900 dark:hover:text-white",
                it.depth === 3 ? "pl-4" : ""
              ].join(" ")}
            >
              {it.text}
            </a>
          ))}
        </nav>

        <div className="mt-5 border-t border-black/10 pt-4 dark:border-white/10">
          <Link href={`/${locale}/blog`} className="text-xs text-cyan-700 dark:text-cyan-200 hover:opacity-90">
            ← {t("blogToc.backToList")}
          </Link>
        </div>
      </div>
    </aside>
  );
}
