// lib/testimonialInvite.ts
// ------------------------
// Génération des liens d'invitation HMAC pour la page de soumission de
// témoignage. Partagé entre l'endpoint POST /api/admin/testimonial-invite et
// le bouton « Générer un lien d'invitation » de la page /admin.
//
// Le lien ne contient JAMAIS le token brut (TESTIMONIAL_SUBMIT_TOKEN) :
//   invite = HMAC-SHA256(TESTIMONIAL_SUBMIT_TOKEN, "testimonial-invite:" + exp)
//   URL    = /{locale}/testimonial-submit?invite={invite}&exp={exp}
// La vérification se fait dans app/[locale]/testimonial-submit/page.tsx.

import { createHmac } from "crypto";
import { getSiteUrl } from "@/lib/siteUrl";

export type InviteLocale = "en" | "fr" | "es";

export const INVITE_MAX_DAYS = 30;
export const INVITE_DEFAULT_DAYS = 7;

export type TestimonialInvite = {
  url: string;
  expiresAt: string;
  locale: InviteLocale;
  daysValid: number;
};

/** Ramène une valeur quelconque à une langue supportée (anglais par défaut). */
export function normalizeInviteLocale(value: unknown): InviteLocale {
  return value === "fr" ? "fr" : value === "es" ? "es" : "en";
}

/** Ramène une durée quelconque à un nombre entier de jours entre 1 et 30. */
export function normalizeInviteDays(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value > INVITE_MAX_DAYS) {
    return INVITE_DEFAULT_DAYS;
  }
  return Math.max(1, Math.floor(value));
}

/**
 * Construit un lien d'invitation signé valable `days` jours.
 * Renvoie null si TESTIMONIAL_SUBMIT_TOKEN n'est pas configuré.
 */
export function createTestimonialInvite(locale: InviteLocale, days: number): TestimonialInvite | null {
  const secret = process.env.TESTIMONIAL_SUBMIT_TOKEN ?? "";
  if (!secret) return null;

  // exp = timestamp Unix (secondes) — date d'expiration du lien
  const expUnix = Math.floor(Date.now() / 1000) + days * 86_400;

  // Préfixe "testimonial-invite:" : séparation de domaine avec la clé de session
  const invite = createHmac("sha256", secret)
    .update(`testimonial-invite:${expUnix}`)
    .digest("hex");

  return {
    url: `${getSiteUrl()}/${locale}/testimonial-submit?invite=${invite}&exp=${expUnix}`,
    expiresAt: new Date(expUnix * 1000).toISOString(),
    locale,
    daysValid: days,
  };
}
