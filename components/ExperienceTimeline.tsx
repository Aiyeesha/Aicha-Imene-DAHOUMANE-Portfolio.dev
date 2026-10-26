// components/ExperienceTimeline.tsx
// ---------------------------------
// Vertical timeline of the home page "Experience" section, always expanded.
//
//   <ol>  newest first, in the order of content/experience.tsx
//   <li>  one experience, with a dot (::before)
//   <h3>  "Role · Company", the company in the accent colour
//   <p>   "Contract · Period · Location", muted
//   <ul>  optional note (muted italics), then achievements
//
// Server component, no client JavaScript. Tailwind classes only (the nonce
// CSP forbids style attributes). Cyan accent with AA contrast in both themes.
// The "·" separators are decorative: hidden from screen readers and replaced
// by a spoken comma.

import type { ExperienceItem } from "@/content/experience";

function Separator() {
  return (
    <>
      <span aria-hidden="true"> · </span>
      <span className="sr-only">, </span>
    </>
  );
}

export default function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="m-0 list-none border-l-2 border-black/10 p-0 dark:border-white/15">
      {items.map((item) => (
        <li
          key={item.id}
          className="relative pb-8 pl-6 last:pb-0 before:absolute before:left-[-7px] before:top-[0.45rem] before:h-3 before:w-3 before:rounded-full before:bg-cyan-600 before:content-[''] dark:before:bg-cyan-400"
        >
          <h3 className="text-lg font-semibold leading-snug">
            {item.role}
            <Separator />
            <span className="text-cyan-700 dark:text-cyan-300">{item.company}</span>
          </h3>

          <p className="mt-1 text-[0.95rem] text-muted-2">
            {item.contract}
            <Separator />
            {item.period}
            <Separator />
            {item.location}
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            {item.note ? (
              <li className="italic text-sm text-slate-600 dark:text-slate-400">{item.note}</li>
            ) : null}
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
