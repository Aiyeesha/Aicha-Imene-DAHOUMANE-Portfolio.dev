"use client";
// components/PresentationModeLoader.tsx
// ----------------------------------------
// Wrapper client pour charger PresentationMode avec ssr: false.
// Nécessaire car next/dynamic avec ssr: false est interdit dans les
// Server Components (Next.js 16 App Router).

import dynamic from "next/dynamic";

const PresentationMode = dynamic(
  () => import("@/components/PresentationMode"),
  { ssr: false }
);

type Props = { locale?: "en" | "fr" };

export default function PresentationModeLoader({ locale }: Props) {
  return <PresentationMode locale={locale} />;
}
