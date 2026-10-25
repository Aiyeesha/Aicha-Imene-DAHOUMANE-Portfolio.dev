"use client";

// lib/usePlatformShortcut.ts
// --------------------------
// Libellé du raccourci de la palette de commandes selon la plateforme :
// « ⌘K » sur macOS / iOS, « Ctrl K » ailleurs.
//
// Audit 2026-10-23 (NAV-1) : le bouton affichait « ⌘K » pour tout le monde,
// symbole qui ne parle pas aux utilisateurs Windows et Linux (le raccourci
// réel y est Ctrl+K, voir CommandPalette.tsx).
//
// useSyncExternalStore plutôt que useState + useEffect : le rendu serveur (et
// l'hydratation) utilise getServerSnapshot (« Ctrl K », valeur neutre), puis
// React relit la valeur client sans erreur d'hydratation ni setState dans un
// effet (règle react-hooks/set-state-in-effect).

import { useSyncExternalStore } from "react";

// La plateforme ne change pas pendant la vie de la page : rien à écouter.
const subscribe = () => () => {};

function isApplePlatform(): boolean {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform || nav.platform || nav.userAgent;
  return /mac|iphone|ipad|ipod/i.test(platform);
}

export default function usePlatformShortcut(key = "K"): string {
  const isApple = useSyncExternalStore(subscribe, isApplePlatform, () => false);
  return isApple ? `⌘${key}` : `Ctrl ${key}`;
}
