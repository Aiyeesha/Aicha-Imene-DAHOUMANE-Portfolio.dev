"use client";

// AvailabilityDialog.tsx
// ----------------------
// Content of the "open to work" modal: availability, contract types, work
// modes, sectors, target roles, location.
//
// Loaded on demand by AvailabilityModal (dynamic import) the first time the
// badge is hovered, focused or clicked: none of this is needed to paint the
// hero, unlike the badge itself, which is server-rendered.

import { useTranslations } from "next-intl";
import Modal from "./Modal";
import { useTrack } from "@/app/[locale]/providers";

// ── Lightweight inline icons (16×16 SVG) ─────────────────────────────────
// Colour comes from the parent (currentColor): no text-* classes here.

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSector() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8h12M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="6" r="1.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

// ── Dialog ────────────────────────────────────────────────────────────────
// Mounted only while open (see AvailabilityModal), so `open` is always true
// here; Modal still receives it to keep its own contract.
export default function AvailabilityDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("availModal");
  const { track } = useTrack();

  const isSalesforce = track === "salesforce";
  const iconBg  = isSalesforce ? "bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400"   : "bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400";
  const ctaCls  = isSalesforce ? "bg-cyan-500"   : "bg-violet-500";

  const rows = [
    { icon: <IconClock />,    label: t("delay"),    value: t("delayValue")     },
    { icon: <IconTarget />,   label: t("contracts"), value: t("contractValues") },
    { icon: <IconMonitor />,  label: t("workMode"), value: t("workModeValues") },
    { icon: <IconLocation />, label: t("mobility"), value: t("mobilityValues") },
    { icon: <IconSector />,   label: t("sector"),   value: t("sectorValues")   },
    { icon: <IconTarget />,   label: t("roles"),    value: isSalesforce ? t("rolesValuesSalesforce") : t("rolesValuesItops") },
    { icon: <IconLocation />, label: t("location"), value: t("locationValues") },
  ];

  return (
      <Modal open title={t("title")} onClose={onClose}>
        <div className="grid gap-4">
          {/* Information rows: dl > div > dt + dd; the decorative icon sits
              in the dt and the grid aligns the value under the label. */}
          <dl className="grid gap-3">
            {rows.map(({ icon, label, value }) => (
              <div key={label} className="grid grid-cols-[1.75rem_1fr] gap-x-3">
                <dt className="col-span-2 flex items-center gap-3 text-xs text-muted">
                  {/* Icon in a track-coloured circle */}
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                    {icon}
                  </span>
                  {label}
                </dt>
                <dd className="col-start-2 -mt-1.5 min-w-0 text-sm font-medium leading-snug">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Separator */}
          <div className="border-t border-black/10 dark:border-white/10" />

          {/* CTA to the contact section */}
          <a
            href="#contact"
            onClick={onClose}
            className={`inline-flex w-full items-center justify-center rounded-full ${ctaCls} px-4 py-2.5 text-sm font-medium text-black hover:opacity-90 soft-ring transition-opacity`}
          >
            {t("cta")}
          </a>
        </div>
      </Modal>
  );
}
