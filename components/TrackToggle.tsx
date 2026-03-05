"use client";

import { useTrack } from "@/app/[locale]/providers";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";

export default function TrackToggle() {
  const { track, setTrack } = useTrack();
  const t = useTranslations();

  // Trackage + switch — pas d'événement si on clique le track déjà actif
  const handleSwitch = (to: "itops" | "salesforce") => {
    if (to === track) return;
    trackEvent("track_switch", { from: track, to });
    setTrack(to);
  };

  return (
    <div
      role="group"
      aria-label={t("a11y.chooseTrack")}
      className="flex rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1"
    >
      <button
        type="button"
        onClick={() => handleSwitch("itops")}
        aria-pressed={track === "itops"}
        aria-label={t("a11y.chooseItOps")}
        className={`rounded-full px-3 py-1.5 text-sm ${
          track === "itops"
            ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-200"
            : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        {t("tracks.itops")}
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("salesforce")}
        aria-pressed={track === "salesforce"}
        aria-label={t("a11y.chooseSalesforce")}
        className={`rounded-full px-3 py-1.5 text-sm ${
          track === "salesforce"
            ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-200"
            : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        {t("tracks.salesforce")}
      </button>
    </div>
  );
}
