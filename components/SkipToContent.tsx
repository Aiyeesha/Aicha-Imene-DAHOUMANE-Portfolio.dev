"use client";

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
        "fixed left-4 top-4 z-[60]",
        "rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black",
        "shadow-md soft-ring"
      ].join(" ")}
    >
      {label}
    </a>
  );
}
