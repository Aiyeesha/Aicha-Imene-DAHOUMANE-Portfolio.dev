"use client";

// lib/useHydrated.ts
// ------------------
// `false` pendant le rendu serveur et l'hydratation, `true` ensuite.
//
// Audit 2026-10-23 (PERF-5) : remplace le motif
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);
// signalé par react-hooks/set-state-in-effect (rendu supplémentaire en
// cascade). useSyncExternalStore utilise getServerSnapshot (false) pendant
// l'hydratation — le premier rendu client reste identique au HTML serveur —
// puis relit la valeur client. Lors d'un montage après une navigation côté
// client, la valeur est directement `true` : aucun rendu intermédiaire.

import { useSyncExternalStore } from "react";

// Rien à écouter : l'état « hydraté » ne change qu'une fois, géré par React.
const subscribe = () => () => {};

export default function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
