"use client";
// components/CommandPaletteLoader.tsx
// -------------------------------------
// Charge CommandPalette à la demande (audit 2026-10-25, constat 7).
//
// Avant : dynamic(..., { ssr: false }) rendu dès le chargement de chaque page,
// donc cmdk + Radix Dialog téléchargés et hydratés partout, y compris sur
// mobile où la palette n'était pas atteignable. Désormais ce composant n'écoute
// que ⌘K / Ctrl K et l'événement d'ouverture (bouton de la barre, menu
// mobile) ; le bundle de la palette n'est demandé qu'au premier appel, et la
// palette s'ouvre aussitôt montée. Elle gère ensuite elle-même ses raccourcis.
//
// next/dynamic avec ssr: false reste interdit dans un Server Component (le
// layout), d'où ce wrapper client.

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/lib/commandPaletteEvents";

const CommandPalette = dynamic(
  () => import("@/components/CommandPalette"),
  { ssr: false }
);

export default function CommandPaletteLoader() {
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (requested) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setRequested(true);
      }
    };
    const onOpenRequest = () => setRequested(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    };
  }, [requested]);

  return requested ? <CommandPalette defaultOpen /> : null;
}
