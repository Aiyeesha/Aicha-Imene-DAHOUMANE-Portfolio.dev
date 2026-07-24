"use client";

// GlobalMetrics.tsx
// -----------------
// Bande de compteurs animés — preuve sociale chiffrée.
// Chiffres issus du profil réel d'Aïcha Imène DAHOUMANE (messages/en.json#profile.p3).
//
// Comportement :
// - AnimatedCounter (Framer Motion useSpring) : animation 0 → N au scroll
// - prefers-reduced-motion : valeur finale affichée directement (via AnimatedCounter)
// - 4 métriques par track — avant ce changement, le jeu Salesforce s'affichait
//   aussi sur le track IT Ops (copié-collé non contextualisé, cf. audit).
//
// Pour modifier les chiffres : éditer les tableaux ci-dessous. Chaque valeur
// est tirée d'une fiche projet déjà publiée (voir highlights des projets
// it-ops-rmm-supervision, it-ops-incident-management, it-ops-acronis-backup,
// workstation-mass-deployment) — aucun chiffre inventé.

import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

// ── Données métriques ──────────────────────────────────────────────────────
// value     : valeur cible de l'AnimatedCounter
// suffix    : affiché après le nombre ("+", "%", etc.)
// labelKey  : clé de traduction dans messages/{locale}.json#metrics
const SALESFORCE_METRICS = [
  { value: 10, suffix: "+", labelKey: "metrics.apex"      },
  { value: 20, suffix: "+", labelKey: "metrics.flows"     },
  { value: 30, suffix: "%", labelKey: "metrics.workload"  },
  { value: 10, suffix: "+", labelKey: "metrics.projects"  },
] as const;

const ITOPS_METRICS = [
  { value: 550, suffix: "+", labelKey: "metrics.rmm"         },
  { value: 316, suffix: "",  labelKey: "metrics.tickets"     },
  { value: 85,  suffix: "",  labelKey: "metrics.alerts"      },
  { value: 264, suffix: "",  labelKey: "metrics.deployments" },
] as const;

export default function GlobalMetrics() {
  const t = useTranslations();
  const { track } = useTrack();
  const METRICS = track === "salesforce" ? SALESFORCE_METRICS : ITOPS_METRICS;
  // Repère temporel — sans lui, les 4 chiffres IT Ops (tous issus d'un stage de
  // 3 mois terminé en 2023) peuvent se lire comme une activité actuelle. Un
  // recruteur qui creuse et découvre l'écart de date après coup lit ça comme
  // une tentative de gonfler la fraîcheur de l'expérience — la datation
  // explicite évite ce malentendu, quelle que soit la période réelle.
  const periodKey = track === "salesforce" ? "metrics.periodSalesforce" : "metrics.periodItops";

  return (
    <Reveal delayMs={80}>
      {/* Séparateur visuel discret au-dessus */}
      <div className="mt-10 border-t border-black/8 dark:border-white/8 pt-10">
        {/* Grille 4 colonnes (2 sur mobile) */}
        {/* dl > div(Reveal) > dt + dd — structure valide WCAG (dl > div wrapping dt/dd) */}
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {METRICS.map(({ value, suffix, labelKey }, i) => (
            // Reveal rend un <div> — doit contenir dt/dd directement pour un <dl> valide
            <Reveal key={labelKey} delayMs={i * 60} className="flex flex-col items-center text-center gap-1">
              {/* Nombre animé — grand et accentué */}
              <dt className="text-3xl font-display font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                <AnimatedCounter value={value} suffix={suffix} />
              </dt>
              {/* Label descriptif */}
              <dd className="text-xs font-medium text-muted-2 uppercase tracking-wider">
                {t(labelKey)}
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="mt-4 text-center text-xs text-muted-2">{t(periodKey)}</p>
      </div>
    </Reveal>
  );
}
