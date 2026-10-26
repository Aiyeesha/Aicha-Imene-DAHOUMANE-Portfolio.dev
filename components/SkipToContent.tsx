// Server Component — audit 2026-10-23 (PERF-4) : simple lien d'évitement, sans
// état ni gestionnaire d'événement ; la directive "use client" l'envoyait
// inutilement dans le bundle JavaScript de chaque page.

export default function SkipToContent({
  targetId = "main",
  label = "Skip to content"
}: {
  targetId?: string;
  label?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      className={[
        "sr-only focus:not-sr-only",
        "fixed left-4 top-4 z-60",
        "rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black",
        "shadow-md soft-ring"
      ].join(" ")}
    >
      {label}
    </a>
  );
}
