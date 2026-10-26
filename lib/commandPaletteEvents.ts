// lib/commandPaletteEvents.ts
// ---------------------------
// Ouverture de la palette de commandes sans clavier (audit 2026-10-25,
// constat 7) : le bouton de la barre et l'entrée du menu mobile émettent cet
// événement ; CommandPaletteLoader charge la palette au premier appel, puis
// CommandPalette l'écoute elle-même.

export const OPEN_COMMAND_PALETTE_EVENT = "command-palette:open";

export function openCommandPalette(): void {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}
