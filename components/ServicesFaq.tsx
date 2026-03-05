"use client";

// ServicesFaq.tsx
// ---------------
// Accordion FAQ displayed below the Services section.
// Uses native <details>/<summary> for zero-JS open/close behavior,
// enhanced with a smooth height transition via CSS max-height animation.
// Reads translations from the "faq" namespace.

import { useTranslations } from "next-intl";

// ── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string;
  a: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ServicesFaq() {
  const t = useTranslations("faq");

  // next-intl raw() lets us read an array of objects from messages
  const items = t.raw("items") as FaqItem[];

  return (
    <section
      aria-labelledby="faq-heading"
      className="mt-14 border-t border-border pt-12"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Accordion list — <details>/<summary> fournissent nativement la sémantique Q&A */}
      <div className="mx-auto max-w-2xl divide-y divide-border rounded-2xl border border-border overflow-hidden">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group bg-card px-6 py-0 transition-colors hover:bg-accent/5 open:bg-accent/5"
          >
            <summary
              className={[
                // Layout
                "flex cursor-pointer list-none items-center justify-between gap-4 py-5",
                // Typography
                "text-sm font-semibold leading-snug",
                // Remove default disclosure triangle (webkit)
                "[&::-webkit-details-marker]:hidden",
                // Focus visible — ring visible pour les utilisateurs clavier
                "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2",
              ].join(" ")}
            >
              {/* Question */}
              <span>{item.q}</span>

              {/* Chevron icon — rotates when open */}
              <span
                aria-hidden="true"
                className="flex-none text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              >
                {/* Inline SVG: chevron-down */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>

            {/* Answer */}
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
