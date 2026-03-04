"use client";

// AboutTrackGoals.tsx
// -------------------
// Section "Objectifs 2026" track-aware de la page About.
//
// - Salesforce track → objectifs freelance SF, certif PDII, open source, blog, événements
// - IT Ops track     → missions SRE/DevOps, IaC, certif cloud, homelab monitoring, open source
//
// Utilise les clés i18n profile.goals2026Salesforce / profile.goals2026Itops
// (tableaux ajoutés dans messages/fr.json et messages/en.json).

import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

// Icône check-circle inline (identique à about/page.tsx pour la cohérence visuelle)
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function AboutTrackGoals() {
  const t = useTranslations("profile");
  const { track } = useTrack();
  const isSalesforce = track === "salesforce";

  // next-intl expose les tableaux via t.raw() pour éviter les erreurs de type
  const goals = isSalesforce
    ? (t.raw("goals2026Salesforce") as string[])
    : (t.raw("goals2026Itops") as string[]);

  const title = t("goals2026Title");

  if (!goals?.length) return null;

  return (
    <section className="rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-5 space-y-3">
        {goals.map((g, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckIcon />
            <span className="text-sm leading-relaxed opacity-90">{g}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
