// lib/security/timingSafeEqual.ts
// --------------------------------
// Comparaison de chaînes en temps constant — compatible Edge Runtime et Node.js.
//
// Implémentation via HMAC-SHA256 éphémère (Web Crypto API standard) :
//   1. Génère une clé HMAC aléatoire par appel (non extractible)
//   2. Signe les deux buffers (padded à la même longueur) avec cette clé
//   3. XOR les deux signatures de taille fixe (32 octets) — temps constant
//   4. Vérifie aussi l'égalité des longueurs originales
//
// Cette approche évite crypto.subtle.timingSafeEqual qui n'est pas standard
// W3C et absent de certains environnements Node.js (auto-hébergement local).
// HMAC + generateKey sont disponibles dans Edge Runtime et Node.js ≥ 15.

export async function timingSafeStringEqual(a: string, b: string): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const maxLen = Math.max(a.length, b.length);
    const aBuf = enc.encode(a.padEnd(maxLen, "\0"));
    const bBuf = enc.encode(b.padEnd(maxLen, "\0"));

    // Clé HMAC éphémère par appel — empêche tout oracle de timing sur les données
    const key = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const [sigA, sigB] = await Promise.all([
      crypto.subtle.sign("HMAC", key, aBuf),
      crypto.subtle.sign("HMAC", key, bBuf),
    ]);

    // Comparaison XOR sur des tableaux de taille fixe (32 octets) — temps constant
    const va = new Uint8Array(sigA);
    const vb = new Uint8Array(sigB);
    let diff = 0;
    for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];

    return diff === 0 && a.length === b.length;
  } catch {
    return false; // fail-closed
  }
}
