"use client";

// AvailabilityModal.tsx
// --------------------
// "Open to work" badge of the hero, and the modal it opens.
//
// The badge is part of the server-rendered HTML (visible to crawlers, link
// previews and visitors before hydration). Only the modal content
// (AvailabilityDialog) is loaded on demand.

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

// Same module for the dynamic import and the preload, so webpack emits a
// single chunk and the preload fills the cache dynamic() then reads.
const loadDialog = () => import("./AvailabilityDialog");
const AvailabilityDialog = dynamic(loadDialog, { ssr: false });

/** Starts downloading the dialog chunk; errors surface on the real open. */
function preloadDialog() {
  void loadDialog().catch(() => undefined);
}

export default function AvailabilityModal() {
  const t = useTranslations("availModal");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Trigger: pulsing badge ──────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        // Warm the dialog chunk as soon as an intent shows, so the first
        // click opens it without a visible delay.
        onPointerEnter={preloadDialog}
        onFocus={preloadDialog}
        className="group flex items-center gap-2 rounded-full px-2 py-1 -mx-2 -my-1
          hover:bg-emerald-500/10 focus-visible:outline-hidden focus-visible:ring-2
          focus-visible:ring-emerald-400/60 transition-colors soft-ring"
        aria-haspopup="dialog"
      >
        {/* Pulsing green dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400
          group-hover:underline group-hover:underline-offset-2 transition-all">
          {t("badge")}
        </span>
        {/* "Clickable" hint */}
        <span
          aria-hidden="true"
          className="text-[10px] text-emerald-600/60 dark:text-emerald-400/50
            group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
        >
          ℹ
        </span>
      </button>

      {/* ── Modal: mounted only while open ──────────────────────────────── */}
      {open && <AvailabilityDialog onClose={() => setOpen(false)} />}
    </>
  );
}
