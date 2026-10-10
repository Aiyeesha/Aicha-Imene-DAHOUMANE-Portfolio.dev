// lib/analytics.ts
// -----------------
// Wrapper typé autour d'Umami (`window.umami.track()`).
//
// Utilisation :
//   import { trackEvent } from "@/lib/analytics";
//   trackEvent("cv_download", { locale: "fr", track: "salesforce" });
//
// Le script Umami n'est chargé qu'en production et seulement si
// NEXT_PUBLIC_UMAMI_WEBSITE_ID est défini (voir app/layout.tsx). Ailleurs
// (dev, tests, preview sans identifiant), les appels sont des no-op silencieux.

// ── Typage minimal de l'API globale exposée par le script Umami ──────────────
type UmamiEventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: UmamiEventData) => void };
  }
}

// ── Catalogue d'événements typés ─────────────────────────────────────────────
// Ajouter un nouveau type d'événement ici avant de l'utiliser dans le code.

export type AnalyticsEvent =
  // ── Conversion principale ────────────────────────────────────────────────
  | { name: "cv_download";         props: { locale: string; track: string } }
  | { name: "calendly_open";       props: { locale: string; track: string } }
  | { name: "contact_click";       props: { locale: string; track: string } }
  | { name: "contact_form_submit"; props: { topic: string; locale: string } }
  // ── Funnel de conversion ─────────────────────────────────────────────────
  // Permet de mesurer le taux de complétion (started → submit) du formulaire
  | { name: "contact_form_started"; props: { locale: string } }
  // Mesure l'intérêt pour la disponibilité (modal "Book a call" ou équivalent)
  | { name: "availability_checked"; props: { locale: string; track: string } }
  // Mesure la lecture complète des articles (scroll >90 % de la page)
  | { name: "blog_article_completed"; props: { slug: string; locale: string; read_time_sec: number } }
  // ── Navigation et engagement ─────────────────────────────────────────────
  | { name: "track_switch";        props: { from: string; to: string } }
  | { name: "project_view";        props: { slug: string; track: string } }
  | { name: "linkedin_click";      props: { locale: string } }
  | { name: "email_click";         props: { locale: string } }
  // ── Performance réelle (Core Web Vitals, envoyées par components/WebVitals) ─
  | { name: "web_vital";           props: { metric: string; value: number; rating: string; path: string } };

// ── File d'attente ───────────────────────────────────────────────────────────
// Le script Umami est chargé après l'hydratation (strategy="afterInteractive") :
// les premières métriques (TTFB, FCP) peuvent arriver avant lui. On les met en
// attente et on réessaie brièvement, puis on abandonne pour ne rien accumuler.
const RETRY_DELAY_MS = 500;
const MAX_RETRIES = 20; // ~10 s au total

function send(name: string, data: UmamiEventData, attempt = 0): void {
  if (typeof window === "undefined") return;
  const umami = window.umami;
  if (umami) {
    try {
      umami.track(name, data);
    } catch {
      // Ne jamais casser l'UI à cause de la mesure d'audience
    }
    return;
  }
  if (attempt < MAX_RETRIES) {
    window.setTimeout(() => send(name, data, attempt + 1), RETRY_DELAY_MS);
  }
}

// ── Fonction principale ───────────────────────────────────────────────────────

/**
 * trackEvent — wrapper typé sur Umami `track()`.
 * - Silencieux si Umami n'est pas chargé (dev, tests, identifiant absent)
 * - Props entièrement typées via le catalogue ci-dessus
 */
export function trackEvent<E extends AnalyticsEvent>(
  name: E["name"],
  props: Extract<AnalyticsEvent, { name: E["name"] }>["props"]
): void {
  send(name, props as UmamiEventData);
}
