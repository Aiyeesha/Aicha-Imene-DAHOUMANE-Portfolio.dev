"use client";

// AvailabilityModal.tsx
// --------------------
// Petite modale "open to work" accessible depuis le badge du hero.
// Affiche les conditions de disponibilité : disponibilité, contrats,
// modes de travail, secteurs, postes ciblés, localisation.

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Modal from "./Modal";
import { useTrack } from "@/app/[locale]/providers";
import { trackEvent } from "@/lib/analytics";

// ── Icônes inline légères (SVG 16×16) ────────────────────────────────────

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-cyan-600 dark:text-cyan-400">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-cyan-600 dark:text-cyan-400">
      <rect x="5" y="4" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 9h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-cyan-600 dark:text-cyan-400">
      <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSector() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-cyan-600 dark:text-cyan-400">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8h12M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-cyan-600 dark:text-cyan-400">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-cyan-600 dark:text-cyan-400">
      <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="6" r="1.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

// ── Composant principal ───────────────────────────────────────────────────
export default function AvailabilityModal() {
  const t = useTranslations("availModal");
  const locale = useLocale();
  const { track } = useTrack();
  const [open, setOpen] = useState(false);

  const rows = [
    { icon: <IconClock />,     label: t("delay"),     value: t("delayValue")     },
    { icon: <IconBriefcase />, label: t("contracts"), value: t("contractValues") },
    { icon: <IconMonitor />,   label: t("workMode"),  value: t("workModeValues") },
    { icon: <IconSector />,    label: t("sector"),    value: t("sectorValues")   },
    { icon: <IconTarget />,    label: t("roles"),     value: t("rolesValues")    },
    { icon: <IconLocation />,  label: t("location"),  value: t("locationValues") },
  ];

  return (
    <>
      {/* ── Trigger : badge pulsant cliquable ─────────────────────────────── */}
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("availability_checked", { locale, track });
        }}
        className="group flex items-center gap-2 rounded-full px-2 py-1 -mx-2 -my-1
          hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-emerald-400/60 transition-colors soft-ring"
        aria-haspopup="dialog"
      >
        {/* Point vert pulsant */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400
          group-hover:underline group-hover:underline-offset-2 transition-all">
          {t("badge")}
        </span>
        {/* Indicateur visuel "cliquable" */}
        <span
          aria-hidden="true"
          className="text-[10px] text-emerald-600/60 dark:text-emerald-400/50
            group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
        >
          ℹ
        </span>
      </button>

      {/* ── Modale ────────────────────────────────────────────────────────── */}
      <Modal open={open} title={t("title")} onClose={() => setOpen(false)}>
        <div className="grid gap-4">
          {/* Lignes d'information */}
          <dl className="grid gap-3">
            {rows.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                {/* Icône dans un cercle discret */}
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 dark:bg-cyan-400/10">
                  {icon}
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="mt-0.5 text-sm font-medium leading-snug">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          {/* Séparateur */}
          <div className="border-t border-black/10 dark:border-white/10" />

          {/* CTA vers la section contact */}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full
              bg-cyan-500 px-4 py-2.5 text-sm font-medium text-black
              hover:opacity-90 soft-ring transition-opacity"
          >
            {t("cta")}
          </a>
        </div>
      </Modal>
    </>
  );
}
