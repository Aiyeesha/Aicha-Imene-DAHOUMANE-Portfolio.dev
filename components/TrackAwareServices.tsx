"use client";

// TrackAwareServices.tsx
// ----------------------
// Service cards for the active track (Salesforce / IT Ops), each with an
// inline SVG icon.

import { useTrack } from "@/app/[locale]/providers";
import Reveal from "@/components/Reveal";
import { getServices, type Locale } from "@/content/services";
import { useTranslations } from "next-intl";
import useHydrated from "@/lib/useHydrated";
import Link from "next/link";

// ── Inline SVG icons (24×24, stroke-based) ──────────────────────────

/** Magnifier — audit */
const IconAudit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/** Braces — development */
const IconCode = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/** Chain — integrations & APIs */
const IconLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

/** Mortarboard — training */
const IconGraduation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

/** Shield — security audit & hardening */
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/** Server — systems administration */
const IconServer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

/** Gears — CI/CD & automation */
const IconGear = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

/** File — support & documentation */
const IconFile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

// Icons per track, in the same order as the cards in content/services.ts
const SALESFORCE_ICONS = [<IconAudit key="a" />, <IconCode key="b" />, <IconLink key="c" />, <IconGraduation key="d" />];
const ITOPS_ICONS      = [<IconShield key="a" />, <IconServer key="b" />, <IconGear key="c" />, <IconFile key="d" />];

export default function TrackAwareServices({ locale }: { locale: Locale }) {
  const { track } = useTrack();
  const t = useTranslations();
  const dataLocale: Locale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";

  // Render track-dependent content only after hydration: the server renders
  // the default track, and the client may switch on mount, which would cause
  // a hydration mismatch.
  const mounted = useHydrated();

  const effectiveTrack = mounted ? track : "salesforce";
  const cards = getServices(dataLocale, effectiveTrack);
  const icons = effectiveTrack === "salesforce" ? SALESFORCE_ICONS : ITOPS_ICONS;

  // "Sectors" strip: the same on both tracks, driven by i18n.
  const sectors = t.raw("services.sectors") as { label: string; note: string }[];

  /**
   * "Discuss this for a role" button: dispatches `contact:prefill` (handled by
   * ContactForm) and scrolls to #contact.
   */
  function handleDiscuss(title: string) {
    const topic = track === "salesforce" ? "salesforce" : "itops";

    // Notify ContactForm through a DOM event (no global state needed)
    window.dispatchEvent(
      new CustomEvent("contact:prefill", { detail: { topic } })
    );

    // Smooth scroll to the contact section
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {cards.map((c, idx) => (
        <Reveal key={c.title} delayMs={110 + idx * 60}>
          <div className="card p-6 flex flex-col">
            {/* Header: icon badge + title */}
            <div className="flex items-start gap-3">
              <div
                className={`shrink-0 grid h-10 w-10 place-items-center rounded-xl ${
                  effectiveTrack === "salesforce"
                    ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                    : "bg-violet-500/10 text-violet-700 dark:text-violet-300"
                }`}
                aria-hidden="true"
              >
                {mounted && icons[idx]}
              </div>
              {/* Explicit dark:text-white avoids inheriting the body colour mid-transition */}
              <h3 className="font-semibold leading-snug pt-1.5 text-slate-900 dark:text-white">{c.title}</h3>
            </div>

            {/* What I bring to the team (1-2 sentences) */}
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{c.pitch}</p>

            {/* Technical details */}
            <div className="mt-3 border-t border-black/8 dark:border-white/8 pt-3">

            {/* Short description; explicit dark colour avoids inheriting a transitioning body colour */}
            <p className="text-sm text-muted dark:text-slate-400">{c.description}</p>

            {/* Concrete skills */}
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted dark:text-slate-400">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            </div>{/* end technical details */}

            {/* Where I practised it + where to check it */}
            <div className="mt-4 rounded-xl bg-black/3 dark:bg-white/4 px-4 py-3 space-y-1.5 text-sm">
              <p className="text-muted dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {locale === "fr" ? "Où je l'ai pratiqué :" : locale === "es" ? "Dónde lo he practicado:" : "Where I've practised it:"}
                </span>{" "}
                {c.experience}
              </p>
              <p className="text-muted dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {locale === "fr" ? "Preuves :" : locale === "es" ? "Pruebas:" : "Evidence:"}
                </span>{" "}
                {c.proof}
              </p>
            </div>

            {/* CTA: prefills the contact form subject */}
            <div className="mt-4 pt-4 border-t border-black/8 dark:border-white/8">
              <button
                type="button"
                onClick={() => handleDiscuss(c.title)}
                className={`text-sm font-medium ${effectiveTrack === "salesforce" ? "text-cyan-700 dark:text-cyan-300" : "text-violet-700 dark:text-violet-300"} hover:underline underline-offset-4 soft-ring rounded-sm transition-opacity hover:opacity-80`}
              >
                {t("services.discuss")} →
              </button>
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    {/* SECTORS: ties each case study to a sector and its compliance and
        traceability constraints. Static i18n content, rendered on both tracks
        (no hydration risk). */}
    <Reveal delayMs={110 + cards.length * 60}>
      <div className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/2 dark:bg-white/3 p-6 md:p-7">
        <h3 className="font-semibold text-slate-900 dark:text-white">{t("services.sectorsTitle")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted dark:text-slate-400">{t("services.sectorsBody")}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {sectors.map((s) => (
            <li
              key={s.label}
              className="rounded-xl border border-black/8 dark:border-white/8 bg-white dark:bg-white/3 p-4"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted dark:text-slate-400">{s.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
          >
            {t("services.sectorsCta")}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </Reveal>

    {/* OPERATIONAL MATURITY: /status and /colophon presented as DevSecOps
        evidence (real monitoring, documented security), on both tracks. The
        Salesforce text frames it around the Salesforce CI/CD pipeline. */}
    {mounted && (
      <Reveal delayMs={110 + (cards.length + 1) * 60}>
        <div className={`mt-4 rounded-2xl border p-6 md:p-7 ${
          effectiveTrack === "salesforce"
            ? "border-cyan-500/20 bg-cyan-500/4 dark:bg-cyan-400/6"
            : "border-violet-500/20 bg-violet-500/4 dark:bg-violet-400/6"
        }`}>
          <h3 className="font-semibold text-slate-900 dark:text-white">{t("services.maturityTitle")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted dark:text-slate-400">
            {t(effectiveTrack === "salesforce" ? "services.maturityBodySalesforce" : "services.maturityBody")}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/status`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
            >
              {t("services.maturityStatusCta")}
              <span aria-hidden="true"> ↗</span>
            </Link>
            <Link
              href={`/${locale}/colophon`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
            >
              {t("services.maturityChangelogCta")}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </Reveal>
    )}
    </>
  );
}
