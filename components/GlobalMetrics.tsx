"use client";

// GlobalMetrics.tsx
// -----------------
// Bande de compteurs animés — preuve sociale chiffrée.
// Chiffres issus du profil réel d'Aïcha Imène DAHOUMANE (messages/en.json#profile.p3).
//
// Comportement :
// - AnimatedCounter (Framer Motion useSpring) : animation 0 → N au scroll
// - prefers-reduced-motion : valeur finale affichée directement (via AnimatedCounter)
// - 4 métriques : Apex classes, Flows, réduction charge manuelle, projets livrés
//
// Pour modifier les chiffres : éditer le tableau METRICS ci-dessous.

import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ── Données métriques ──────────────────────────────────────────────────────
// value     : valeur cible de l'AnimatedCounter
// suffix    : affiché après le nombre ("+", "%", etc.)
// labelKey  : clé de traduction dans messages/{locale}.json#metrics
const METRICS = [
  { value: 10, suffix: "+", labelKey: "metrics.apex"      },
  { value: 20, suffix: "+", labelKey: "metrics.flows"     },
  { value: 30, suffix: "%", labelKey: "metrics.workload"  },
  { value: 5,  suffix: "+", labelKey: "metrics.projects"  },
] as const;

export default function GlobalMetrics() {
  const t = useTranslations();

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
      </div>
    </Reveal>
  );
}
