// lib/security/timingSafeEqual.ts
// --------------------------------
// Constant-time string comparison for the Edge runtime and Node.js, through
// an ephemeral HMAC-SHA256 (standard Web Crypto):
//   1. a random, non-extractable HMAC key per call;
//   2. both buffers (padded to the same length) signed with it;
//   3. the two fixed-size (32-byte) signatures XOR-compared in constant time;
//   4. original lengths compared too.
// crypto.subtle.timingSafeEqual is not a W3C standard and is missing from some
// Node.js environments; HMAC + generateKey exist in Edge and Node.js ≥ 15.

export async function timingSafeStringEqual(a: string, b: string): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const maxLen = Math.max(a.length, b.length);
    const aBuf = enc.encode(a.padEnd(maxLen, "\0"));
    const bBuf = enc.encode(b.padEnd(maxLen, "\0"));

    // Ephemeral per-call HMAC key: no timing oracle on the data
    const key = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const [sigA, sigB] = await Promise.all([
      crypto.subtle.sign("HMAC", key, aBuf),
      crypto.subtle.sign("HMAC", key, bBuf),
    ]);

    // XOR comparison over fixed-size (32-byte) arrays: constant time
    const va = new Uint8Array(sigA);
    const vb = new Uint8Array(sigB);
    let diff = 0;
    for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];

    return diff === 0 && a.length === b.length;
  } catch {
    return false; // fail-closed
  }
}
