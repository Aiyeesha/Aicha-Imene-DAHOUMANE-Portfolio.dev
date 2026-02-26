"use client";

import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

/**
 * ProfileNarrative
 * ----------------
 * Track-aware long-form profile text (fully localized), without extra section padding.
 *
 * UX goal:
 * - Show a concise intro immediately
 * - Let visitors expand the longer story on demand (native <details>, no JS needed)
 */
export default function ProfileNarrative() {
  const t = useTranslations();
  const { track } = useTrack();

  const p1 = track === "salesforce" ? t("profile.p1_salesforce") : t("profile.p1_itops");
  const p2 = track === "salesforce" ? t("profile.p2_salesforce") : t("profile.p2_itops");
  const p3 = track === "salesforce" ? t("profile.p3_salesforce") : t("profile.p3_itops");
  const p4 = track === "salesforce" ? t("profile.p4_salesforce") : t("profile.p4_itops");

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <p className="text-muted">{p1}</p>
      </Reveal>

      {/* Reduce cognitive load: keep the long story collapsible */}
      <Reveal delayMs={60}>
        <details className="mt-4">
          <summary className="cursor-pointer select-none text-sm font-medium text-cyan-800 hover:underline dark:text-cyan-200 soft-ring rounded-xl px-2 py-2">
            {t("profile.readMore")}
          </summary>

          <div className="mt-4">
            <p className="text-muted">{p2}</p>
            <p className="mt-4 text-muted">{p3}</p>
            <p className="mt-4 text-muted">{p4}</p>
          </div>
        </details>
      </Reveal>
    </div>
  );
}
