"use client";

// components/AnalyticsOptOut.tsx
// -------------------------------
// Droit d'opposition à la mesure d'audience (exigence CNIL pour l'exemption
// de consentement). Umami relit la clé `umami.disabled` du stockage local avant
// chaque envoi : la poser coupe immédiatement pages vues, événements et Web
// Vitals sur ce navigateur ; la retirer réactive la mesure.

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "umami.disabled";

function readOptOut(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    // Stockage bloqué (navigation privée stricte) : rien n'a pu être enregistré
    return false;
  }
}

// Abonnés locaux (même onglet) + événement « storage » (autres onglets)
const listeners = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export default function AnalyticsOptOut() {
  const t = useTranslations("privacy");
  // null côté serveur (pas de stockage local) : rien n'est rendu avant
  // l'hydratation, ce qui évite tout écart entre serveur et client.
  const optedOut = useSyncExternalStore<boolean | null>(subscribe, readOptOut, () => null);

  if (optedOut === null) return null;

  const toggle = () => {
    try {
      if (optedOut) window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Écriture impossible : l'état affiché reste celui du stockage réel
    }
    listeners.forEach((notify) => notify());
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <p className="text-sm text-muted-2" role="status">
        {optedOut ? t("optOutStatusOff") : t("optOutStatusOn")}
      </p>
      <button
        type="button"
        onClick={toggle}
        className="rounded-full border border-black/10 bg-black/5 px-5 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring transition-colors"
      >
        {optedOut ? t("optOutEnable") : t("optOutDisable")}
      </button>
    </div>
  );
}
