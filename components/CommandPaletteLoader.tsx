"use client";
// components/CommandPaletteLoader.tsx
// -------------------------------------
// Wrapper client pour charger CommandPalette avec ssr: false.
// Nécessaire car next/dynamic avec ssr: false est interdit dans les
// Server Components (Next.js 16 App Router).
//
// ssr: false évite le rendu serveur d'un composant jamais visible au
// chargement (s'ouvre uniquement sur ⌘K / Ctrl+K), réduit le JS
// hydraté au first load et améliore l'INP en différant l'initialisation
// des listeners clavier.

import dynamic from "next/dynamic";

const CommandPalette = dynamic(
  () => import("@/components/CommandPalette"),
  { ssr: false }
);

export default function CommandPaletteLoader() {
  return <CommandPalette />;
}
