"use client";
// components/CommandPaletteLoader.tsx
// -------------------------------------
// Loads CommandPalette on demand. Only ⌘K / Ctrl K and the open event (nav
// button, mobile menu) are listened to; the palette bundle (cmdk + Radix
// Dialog) is fetched on first use and mounts already open, then handles its
// own shortcuts. A client wrapper is needed because next/dynamic with
// ssr: false is not allowed in a server component (the layout).

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
