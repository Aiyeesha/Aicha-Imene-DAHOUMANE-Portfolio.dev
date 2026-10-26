// lib/commandPaletteEvents.ts
// ---------------------------
// Opens the command palette without a keyboard: the nav button and the
// mobile menu entry dispatch this event; CommandPaletteLoader loads the
// palette on the first one, then CommandPalette listens itself.

export const OPEN_COMMAND_PALETTE_EVENT = "command-palette:open";

export function openCommandPalette(): void {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}
