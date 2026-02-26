"use client";

import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

/**
 * ProfileFactsCard
 * ----------------
 * Reusable "At a glance" card (fully localized).
 * Used in the Hero to surface key info above the fold.
 */
export default function ProfileFactsCard({ delayMs = 120 }: { delayMs?: number }) {
  const t = useTranslations();
  const { track } = useTrack();

  const focusValue =
    track === "salesforce" ? t("profile.focusValueSalesforce") : t("profile.focusValueItOps");

  const facts: Array<{ label: string; value: string }> = [
    { label: t("profile.focusLabel"), value: focusValue },
    { label: t("profile.basedInLabel"), value: t("profile.basedInValue") },
    { label: t("profile.languagesLabel"), value: t("profile.languagesValue") },
    { label: t("profile.rolesLabel"), value: t("profile.rolesValue") },
    { label: t("profile.availabilityLabel"), value: t("profile.availabilityValue") }
  ];

  return (
    <Reveal delayMs={delayMs}>
      <div className="card p-6">
        <h3 className="text-lg font-semibold">{t("profile.atAGlanceTitle")}</h3>

        <dl className="mt-4 space-y-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs uppercase tracking-wider text-muted-2">{f.label}</dt>
              <dd className="mt-1 text-sm text-muted">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
