// lib/security/basicAuth.ts
// -------------------------
// Pure helper shared by proxy.ts (Edge) and lib/security/adminAuth.ts
// (server components / actions). No server-only import.

/**
 * Decodes the base64 part of an "Authorization: Basic" header as UTF-8.
 * atob() alone returns a Latin-1 "binary" string, so a password containing
 * é or € never matched although the challenge announces charset="UTF-8".
 * Works in Node.js and the Edge runtime (no Buffer). Throws on invalid input.
 */
export function decodeBasicCredentials(b64: string): string {
  const binary = atob(b64);
  return new TextDecoder("utf-8", { fatal: true }).decode(
    Uint8Array.from(binary, (c) => c.charCodeAt(0))
  );
}
