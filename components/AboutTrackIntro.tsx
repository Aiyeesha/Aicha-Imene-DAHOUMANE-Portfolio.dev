"use client";

// AboutTrackIntro.tsx
// -------------------
// Encart d'introduction de la page About, adapté au track actif.
//
// Remplace ProfileNarrative sur la page About :
//   - Plus structuré (badge track + 3 paragraphes ciblés)
//   - Sans redondance avec le contenu Supabase (journey)
//   - p1 = positionnement, p2 = compétences/méthodes, p3 = différenciant
//
// Couleur :
//   - Salesforce → cyan
//   - IT Ops     → violet

import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

export default function AboutTrackIntro() {
  const t = useTranslations();
  const { track } = useTrack();
  const isSalesforce = track === "salesforce";

  // Paragraphes track-spécifiques depuis les traductions i18n
  const p1 = isSalesforce ? t("profile.p1_salesforce") : t("profile.p1_itops");
  const p2 = isSalesforce ? t("profile.p2_salesforce") : t("profile.p2_itops");
  const p3 = isSalesforce ? t("profile.p3_salesforce") : t("profile.p3_itops");

  // Styles adaptés au track
  const badgeClass = isSalesforce
    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
    : "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300";

  const borderClass = isSalesforce
    ? "border-cyan-500/20"
    : "border-violet-500/20";

  const trackLabel = isSalesforce ? "Salesforce" : "IT Ops";

  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${borderClass}`}>
      {/* Badge track — indique visuellement le profil actif */}
      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}>
        {trackLabel}
      </span>

      {/* p1 — déclaration de positionnement (visible immédiatement) */}
      <p className="text-base leading-relaxed text-muted font-medium">{p1}</p>

      {/* p2 — compétences et méthodes concrètes */}
      <p className="text-sm leading-relaxed text-muted">{p2}</p>

      {/* p3 — différenciant (background cross-domain) */}
      <p className="text-sm leading-relaxed text-muted">{p3}</p>
    </div>
  );
}
