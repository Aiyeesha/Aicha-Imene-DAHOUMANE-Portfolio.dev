"use client";

import { useTrack } from "@/app/[locale]/providers";
import Reveal from "@/components/Reveal";
import { getServices, type Locale } from "@/content/services";

export default function TrackAwareServices({ locale }: { locale: Locale }) {
  const { track } = useTrack();
  const cards = getServices(locale, track);

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {cards.map((c, idx) => (
        <Reveal key={c.title} delayMs={110 + idx * 60}>
          <div className="card p-6">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted">{c.description}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
