"use client";

// GlobalMetrics.tsx
// -----------------
// Animated counter strip, with 4 metrics per track. Counters animate from 0
// on scroll (AnimatedCounter), or show the final value with reduced motion.
// Every figure comes from a published project page (highlights of
// it-ops-rmm-supervision, it-ops-incident-management, it-ops-acronis-backup,
// workstation-mass-deployment): edit the arrays below to change them.

import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";

// ── Metrics ────────────────────────────────────────────────────────────────
// value    : AnimatedCounter target
// suffix   : shown after the number ("+", "%", …)
// labelKey : translation key in messages/{locale}.json#metrics
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
  // Time reference: the IT Ops figures come from internships that ended in
  // 2023 and must not read as current activity.
  const periodKey = track === "salesforce" ? "metrics.periodSalesforce" : "metrics.periodItops";

  return (
    <Reveal delayMs={80}>
      {/* Subtle separator above */}
      <div className="mt-10 border-t border-black/8 dark:border-white/8 pt-10">
        {/* 4 columns (2 on mobile); dl > div > dt + dd is valid markup */}
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {METRICS.map(({ value, suffix, labelKey }, i) => (
            // Reveal renders a <div> holding dt (label) and dd (value);
            // flex-col-reverse shows the number above the label.
            <Reveal key={labelKey} delayMs={i * 60} className="flex flex-col-reverse items-center text-center gap-1">
              {/* Label */}
              <dt className="text-xs font-medium text-muted-2 uppercase tracking-wider">
                {t(labelKey)}
              </dt>
              {/* Animated number */}
              <dd className="text-3xl font-display font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                <AnimatedCounter value={value} suffix={suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="mt-4 text-center text-xs text-muted-2">{t(periodKey)}</p>
      </div>
    </Reveal>
  );
}
