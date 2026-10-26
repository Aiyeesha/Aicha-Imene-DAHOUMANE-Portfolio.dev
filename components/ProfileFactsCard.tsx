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

  const isSalesforce = track === "salesforce";

  // Track-specific values
  const focusValue = isSalesforce
    ? t("profile.focusValueSalesforce")
    : t("profile.focusValueItOps");

  const rolesValue = isSalesforce
    ? t("profile.rolesValueSalesforce")
    : t("profile.rolesValueItops");

  const facts: Array<{ label: string; value: string }> = [
    { label: t("profile.focusLabel"),        value: focusValue },
    { label: t("profile.basedInLabel"),      value: t("profile.basedInValue") },
    { label: t("profile.languagesLabel"),    value: t("profile.languagesValue") },
    { label: t("profile.rolesLabel"),        value: rolesValue },
    { label: t("profile.availabilityLabel"), value: t("profile.availabilityValue") }
  ];

  return (
    <Reveal delayMs={delayMs}>
      <div className="card p-6">
        {/* h2: first section under the /about h1 (heading order) */}
        <h2 className="text-lg font-semibold">{t("profile.atAGlanceTitle")}</h2>

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
