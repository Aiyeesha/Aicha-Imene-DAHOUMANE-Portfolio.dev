"use client";

import { useTrack } from "@/app/[locale]/providers";
import Reveal from "@/components/Reveal";
import { getSkillGroups, type Locale } from "@/content/skills";

export default function TrackAwareSkills({ locale }: { locale: Locale }) {
  const { track } = useTrack();
  const groups = getSkillGroups(locale, track);

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {groups.map((g, idx) => (
        <Reveal key={g.title} delayMs={110 + idx * 60}>
          <div className="card p-6">
            <h3 className="font-semibold">{g.title}</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
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
