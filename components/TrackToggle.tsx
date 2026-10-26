"use client";

import { useTrack } from "@/app/[locale]/providers";
import { useTranslations } from "next-intl";

export default function TrackToggle() {
  const { track, setTrack } = useTrack();
  const t = useTranslations();

  // Clicking the active track does nothing
  const handleSwitch = (to: "itops" | "salesforce") => {
    if (to === track) return;
    setTrack(to);
  };

  // The active button has an opaque background, a ring in the track colour,
  // a coloured dot and semibold text, so the selection reads on any
  // background; the inactive one keeps AA contrast (text-slate-700).
  const btnBase =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors soft-ring";
  const activeItops =
    "bg-white dark:bg-white/10 font-semibold text-violet-700 dark:text-violet-200 ring-1 ring-violet-500/40 shadow-xs";
  const activeSalesforce =
    "bg-white dark:bg-white/10 font-semibold text-cyan-700 dark:text-cyan-200 ring-1 ring-cyan-500/40 shadow-xs";
  const inactive =
    "text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white";

  return (
    <div
      role="group"
      aria-label={t("a11y.chooseTrack")}
      className="flex rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 p-1"
    >
      <button
        type="button"
        onClick={() => handleSwitch("itops")}
        aria-pressed={track === "itops"}
        aria-label={t("a11y.chooseItOps")}
        className={`${btnBase} ${track === "itops" ? activeItops : inactive}`}
      >
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${track === "itops" ? "bg-violet-500" : "bg-current opacity-30"}`}
        />
        {t("tracks.itops")}
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("salesforce")}
        aria-pressed={track === "salesforce"}
        aria-label={t("a11y.chooseSalesforce")}
        className={`${btnBase} ${track === "salesforce" ? activeSalesforce : inactive}`}
      >
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${track === "salesforce" ? "bg-cyan-500" : "bg-current opacity-30"}`}
        />
        {t("tracks.salesforce")}
      </button>
    </div>
  );
}
