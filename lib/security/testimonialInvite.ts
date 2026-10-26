// lib/security/testimonialInvite.ts
// ---------------------------------
// Invitations à témoigner : vérification du lien, clé de session liée à
// l'invitation, usage unique.
//
// Audit du 2026-10-25 (à traiter avant de réactiver la section) :
//   - le lien restait valable 30 jours et réutilisable à volonté ;
//   - la clé de session ne dépendait que d'un créneau de 30 min : identique
//     pour tous les visiteurs, elle n'était liée à aucune invitation ;
//   - aucun moyen de révoquer un lien précis.
// Désormais :
//   - durée maximale de 14 jours (route d'administration) ;
//   - clé de session = HMAC(secret, invitation + créneau), donc propre à un lien ;
//   - une invitation utilisée (ou révoquée) est marquée dans Redis jusqu'à
//     son expiration : `SET portfolio:testimonial:used:<invite> 1` révoque un
//     lien à la main ; changer TESTIMONIAL_SUBMIT_TOKEN les révoque tous.

import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";

const HMAC_HEX_LENGTH = 64; // SHA-256 = 32 octets = 64 caractères hex
const SESSION_BUCKET_MS = 30 * 60 * 1000;
export const MAX_INVITE_DAYS = 14;

const hmac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest();

function safeHexEqual(a: Buffer, hex: string): boolean {
  if (hex.length !== HMAC_HEX_LENGTH || !/^[0-9a-f]+$/.test(hex)) return false;
  return timingSafeEqual(a, Buffer.from(hex, "hex"));
}

/** Lien d'invitation valide (signature correcte et non expiré). */
export function isInviteValid(secret: string, invite: string, expUnix: number, nowMs = Date.now()): boolean {
  if (!secret || !Number.isFinite(expUnix) || expUnix <= Math.floor(nowMs / 1000)) return false;
  return safeHexEqual(hmac(secret, `testimonial-invite:${expUnix}`), invite);
}

export function signInvite(secret: string, expUnix: number): string {
  return hmac(secret, `testimonial-invite:${expUnix}`).toString("hex");
}

/** Clé de session propre à une invitation, pour le créneau de 30 min courant. */
export function sessionKeyFor(secret: string, invite: string, nowMs = Date.now()): string {
  const bucket = Math.floor(nowMs / SESSION_BUCKET_MS);
  return hmac(secret, `testimonial-session:${invite}:${bucket}`).toString("hex");
}

/** Accepte le créneau courant et le précédent (requête à cheval sur une frontière). */
export function isSessionKeyValid(secret: string, invite: string, sessionKey: string, nowMs = Date.now()): boolean {
  const bucket = Math.floor(nowMs / SESSION_BUCKET_MS);
  // Les deux comparaisons sont toujours évaluées (pas de court-circuit).
  const results = [bucket, bucket - 1].map((b) =>
    safeHexEqual(hmac(secret, `testimonial-session:${invite}:${b}`), sessionKey),
  );
  return results.some(Boolean);
}

export const usedInviteKey = (invite: string) => `portfolio:testimonial:used:${invite}`;

// ── Usage unique (Redis) ────────────────────────────────────────────────────
// Sans Redis joignable, l'usage unique ne peut pas être garanti : fail-closed
// en production (lien refusé), permissif en développement.
const failClosed = () => process.env.NODE_ENV === "production";

export async function isInviteUsed(invite: string): Promise<boolean> {
  if (!redis) return failClosed();
  try {
    return (await redis.exists(usedInviteKey(invite))) === 1;
  } catch {
    return failClosed();
  }
}

/** Marque l'invitation comme utilisée jusqu'à son expiration. */
export async function markInviteUsed(invite: string, expUnix: number, nowMs = Date.now()): Promise<void> {
  if (!redis) return;
  const ttl = Math.max(60, expUnix - Math.floor(nowMs / 1000));
  await redis.set(usedInviteKey(invite), "1", { ex: ttl });
}
