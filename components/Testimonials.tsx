"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/content/testimonials";
import Reveal from "./Reveal";

/**
 * Testimonials
 * ------------
 * Lightweight "carousel" without dependencies:
 * - One active testimonial
 * - Previous / Next controls
 * - List selector on the side (desktop)
 */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  const t = useTranslations();
  const [index, setIndex] = useState(0);

  const current = useMemo(() => items[index], [items, index]);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Reveal>
        <div className="card p-6">
          <div className="text-sm text-muted-2">{t("testimonials.kicker")}</div>
          <p className="mt-4 text-lg leading-relaxed text-strong">
            “{current.quote}”
          </p>

          {current.context ? (
            <div className="mt-3 text-sm text-muted-2">{current.context}</div>
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold">{current.name}</div>
              <div className="text-sm text-muted-2">
                {current.role}
                {current.company ? ` · ${current.company}` : ""}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
                aria-label={t("a11y.previousTestimonial")}
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
                aria-label={t("a11y.nextTestimonial")}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={120}>
        <div className="card p-6">
          <div className="text-sm text-muted-2">{t("testimonials.all")}</div>
          <div className="mt-4 space-y-2">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                className={[
                  "w-full text-left rounded-xl border px-4 py-3 transition-colors",
                  i === index
                    ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                    : "border-black/10 bg-black/5 text-slate-700 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 soft-ring"
                ].join(" ")}
              >
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-2">
                  {t.role}
                  {t.company ? ` · ${t.company}` : ""}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}