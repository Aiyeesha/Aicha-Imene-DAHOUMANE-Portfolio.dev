"use client";

// AboutTrackIntro.tsx
// -------------------
// About page introduction for the active track: track badge, then
// positioning (p1), skills and methods (p2), cross-domain edge (p3) and
// concrete proof (p4). Cyan for Salesforce, violet for IT Ops.

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useTrack } from "@/app/[locale]/providers";

export default function AboutTrackIntro() {
  const t = useTranslations();
  const locale = useLocale();
  const { track } = useTrack();
  const isSalesforce = track === "salesforce";

  // Track-specific paragraphs from i18n
  const p1 = isSalesforce ? t("profile.p1_salesforce") : t("profile.p1_itops");
  const p2 = isSalesforce ? t("profile.p2_salesforce") : t("profile.p2_itops");
  const p3 = isSalesforce ? t("profile.p3_salesforce") : t("profile.p3_itops");
  // p4 backs the hero's promise with concrete proof (Legarant-AXG for
  // Salesforce, transferable IT Ops skills for itops).
  const p4 = isSalesforce ? t("profile.p4_salesforce") : t("profile.p4_itops");

  // Track-dependent styles
  const badgeClass = isSalesforce
    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
    : "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300";

  const borderClass = isSalesforce
    ? "border-cyan-500/20"
    : "border-violet-500/20";

  const trackLabel = isSalesforce ? "Salesforce" : "IT Ops";

  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${borderClass}`}>
      {/* Track badge */}
      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}>
        {trackLabel}
      </span>

      {/* p1: positioning */}
      <p className="text-base leading-relaxed text-muted font-medium">{p1}</p>

      {/* p2: concrete skills and methods */}
      <p className="text-sm leading-relaxed text-muted">{p2}</p>

      {/* p3: cross-domain background */}
      <p className="text-sm leading-relaxed text-muted">{p3}</p>

      {/* p4: concrete proof and current status */}
      <p className="text-sm leading-relaxed text-muted">{p4}</p>

      {/* Link to the "Hybrid profile" page: three concrete cases where
          Salesforce, infrastructure and security combine. */}
      <p className="pt-1 text-sm">
        <Link
          href={`/${locale}/hybride`}
          className="font-medium bg-linear-to-r from-cyan-700 to-violet-700 dark:from-cyan-300 dark:to-violet-300 bg-clip-text text-transparent hover:underline soft-ring rounded-sm"
        >
          {t("nav.hybrid")} →
        </Link>
      </p>
    </div>
  );
}
