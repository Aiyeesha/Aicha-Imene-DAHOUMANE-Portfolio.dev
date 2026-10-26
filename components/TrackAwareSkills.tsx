"use client";

// TrackAwareSkills.tsx
// --------------------
// Skill groups for the active track (Salesforce / IT Ops), each with an
// inline SVG icon.

import { useTrack } from "@/app/[locale]/providers";
import Reveal from "@/components/Reveal";
import { getSkillGroups, type Locale } from "@/content/skills";

// ── Inline SVG icons (20×20, stroke-based) ──────────────────────────

/** Cloud with bolt — Salesforce (Lightning) */
const IconCloud = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
  </svg>
);

/** Braces — programming */
const IconCode = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/** Terminal — systems / DevOps */
const IconTerminal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

/** People — soft skills */
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/** Gear — pipelines & automation */
const IconGear = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M4.93 4.93A10 10 0 0 0 19.07 19.07" />
  </svg>
);

/** Headset — support & operations */
const IconHeadset = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

/** Server — systems administration */
const IconServer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

// Icons per track, in the order of the groups in content/skills.ts.
// Salesforce: Salesforce, programming, systems, soft skills
const SALESFORCE_ICONS = [
  <IconCloud key="sf" />,
  <IconCode key="prog" />,
  <IconTerminal key="sys" />,
  <IconUsers key="soft" />
];

// IT Ops: systems, pipelines, support, soft skills
const ITOPS_ICONS = [
  <IconServer key="sys" />,
  <IconGear key="pipe" />,
  <IconHeadset key="sup" />,
  <IconUsers key="soft" />
];

export default function TrackAwareSkills({ locale }: { locale: Locale }) {
  const { track } = useTrack();
  const dataLocale: Locale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";
  const groups = getSkillGroups(dataLocale, track);

  // Icon set for the active track
  const icons = track === "salesforce" ? SALESFORCE_ICONS : ITOPS_ICONS;

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {groups.map((g, idx) => (
        // Even columns slide in from the left, odd ones from the right
        <Reveal key={g.title} delayMs={110 + idx * 60} from={idx % 2 === 0 ? "left" : "right"}>
          <div className="card p-6">
            {/* Header: icon + group title */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className={`grid h-8 w-8 place-items-center rounded-lg shrink-0 ${
                  track === "salesforce"
                    ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                    : "bg-violet-500/10 text-violet-700 dark:text-violet-300"
                }`}
                aria-hidden="true"
                suppressHydrationWarning
              >
                {icons[idx]}
              </div>
              {/* Explicit dark:text-white avoids inheriting the body colour mid-transition */}
              <h3 className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">{g.title}</h3>
            </div>

            {/* Skills list; explicit dark colour avoids inheriting a transitioning body colour */}
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted dark:text-slate-400">
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
