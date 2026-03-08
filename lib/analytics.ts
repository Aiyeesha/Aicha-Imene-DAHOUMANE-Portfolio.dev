// lib/analytics.ts
// -----------------
// Wrapper typé autour de @vercel/analytics `track()`.
//
// Utilisation :
//   import { trackEvent } from "@/lib/analytics";
//   trackEvent("cv_download", { locale: "fr", track: "salesforce" });
//
// Les événements sont silencieusement ignorés en dev (Vercel Analytics
// n'est actif qu'en production). Pas d'import conditionnel nécessaire.

import { track } from "@vercel/analytics";

// ── Catalogue d'événements typés ─────────────────────────────────────────────
// Ajouter un nouveau type d'événement ici avant de l'utiliser dans le code.

export type AnalyticsEvent =
  | { name: "cv_download";         props: { locale: string; track: string } }
  | { name: "calendly_open";       props: { locale: string; track: string } }
  | { name: "contact_click";       props: { locale: string; track: string } }
  | { name: "contact_form_submit"; props: { topic: string; locale: string } }
  | { name: "track_switch";        props: { from: string; to: string } }
  | { name: "project_view";        props: { slug: string; track: string } }
  | { name: "linkedin_click";      props: { locale: string } }
  | { name: "email_click";         props: { locale: string } };

// ── Fonction principale ───────────────────────────────────────────────────────

/**
 * trackEvent — wrapper typé sur Vercel Analytics `track()`.
 * - Silencieux en dev (pas d'erreur si Vercel n'est pas configuré)
 * - Props entièrement typées via le catalogue ci-dessus
 */
export function trackEvent<E extends AnalyticsEvent>(
  name: E["name"],
  props: Extract<AnalyticsEvent, { name: E["name"] }>["props"]
): void {
  try {
    track(name, props as Record<string, string>);
  } catch {
    // Silencieux en dev / si Vercel Analytics n'est pas chargé
  }
}
