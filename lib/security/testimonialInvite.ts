// lib/security/testimonialInvite.ts
// ---------------------------------
// Testimonial invitations: link verification, session key bound to the
// invitation, single use.
//   - at most 14 days (admin route);
//   - session key = HMAC(secret, invitation + 30-minute slot), so it is
//     specific to one link;
//   - a used (or revoked) invitation is marked in Redis until it expires:
//     `SET portfolio:testimonial:used:<invite> 1` revokes one link by hand;
//     changing TESTIMONIAL_SUBMIT_TOKEN revokes them all.

import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { redis } from "@/lib/redis";

const HMAC_HEX_LENGTH = 64; // SHA-256 = 32 bytes = 64 hex characters
const SESSION_BUCKET_MS = 30 * 60 * 1000;
export const MAX_INVITE_DAYS = 14;

const hmac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest();

function safeHexEqual(a: Buffer, hex: string): boolean {
  if (hex.length !== HMAC_HEX_LENGTH || !/^[0-9a-f]+$/.test(hex)) return false;
  return timingSafeEqual(a, Buffer.from(hex, "hex"));
}

/** Valid invitation link (correct signature, not expired). */
export function isInviteValid(secret: string, invite: string, expUnix: number, nowMs = Date.now()): boolean {
  if (!secret || !Number.isFinite(expUnix) || expUnix <= Math.floor(nowMs / 1000)) return false;
  return safeHexEqual(hmac(secret, `testimonial-invite:${expUnix}`), invite);
}

export function signInvite(secret: string, expUnix: number): string {
  return hmac(secret, `testimonial-invite:${expUnix}`).toString("hex");
}

/** Session key specific to an invitation, for the current 30-minute slot. */
export function sessionKeyFor(secret: string, invite: string, nowMs = Date.now()): string {
  const bucket = Math.floor(nowMs / SESSION_BUCKET_MS);
  return hmac(secret, `testimonial-session:${invite}:${bucket}`).toString("hex");
}

/** Accepts the current and previous slot (request straddling a boundary). */
export function isSessionKeyValid(secret: string, invite: string, sessionKey: string, nowMs = Date.now()): boolean {
  const bucket = Math.floor(nowMs / SESSION_BUCKET_MS);
  // Both comparisons always run (no short circuit).
  const results = [bucket, bucket - 1].map((b) =>
    safeHexEqual(hmac(secret, `testimonial-session:${invite}:${b}`), sessionKey),
  );
  return results.some(Boolean);
}

export const usedInviteKey = (invite: string) => `portfolio:testimonial:used:${invite}`;

// ── Single use (Redis) ──────────────────────────────────────────────────────
// Without Redis, single use cannot be guaranteed: fail closed in production
// (link refused), permissive in development.
const failClosed = () => process.env.NODE_ENV === "production";

export async function isInviteUsed(invite: string): Promise<boolean> {
  if (!redis) return failClosed();
  try {
    return (await redis.exists(usedInviteKey(invite))) === 1;
  } catch {
    return failClosed();
  }
}

/**
 * Atomically claims the invitation (SET NX): of two concurrent submissions
 * with the same link, only one gets true. The claim lasts until the link
 * expires, so it also marks the invitation as used.
 */
export async function claimInvite(invite: string, expUnix: number, nowMs = Date.now()): Promise<boolean> {
  if (!redis) return !failClosed();
  const ttl = Math.max(60, expUnix - Math.floor(nowMs / 1000));
  try {
    return (await redis.set(usedInviteKey(invite), "1", { nx: true, ex: ttl })) === "OK";
  } catch {
    return !failClosed();
  }
}

/** Gives the invitation back after a failed insert, so the author can retry. */
export async function releaseInvite(invite: string): Promise<void> {
  if (!redis) return;
  await redis.del(usedInviteKey(invite));
}
