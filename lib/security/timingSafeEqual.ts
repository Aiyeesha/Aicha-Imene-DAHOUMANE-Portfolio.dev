// lib/security/timingSafeEqual.ts
// --------------------------------
// Comparaison de chaînes en temps constant — compatible Edge Runtime et Node.js.
//
// Utilise crypto.subtle.timingSafeEqual() (Web Crypto API, disponible dans
// Node.js ≥ 15 et dans l'Edge Runtime Vercel). Évite le timing oracle : un
// attaquant ne peut pas déduire le secret en mesurant les temps de réponse.
//
// Technique : on encode les deux chaînes en UTF-8 et on les pad à la même
// longueur avant la comparaison pour masquer un oracle sur la longueur.
// La longueur originale est vérifiée séparément avant de retourner le résultat.

// crypto.subtle.timingSafeEqual n'est pas dans les types W3C standard de SubtleCrypto.
type SubtleCryptoWithTimingSafe = SubtleCrypto & {
  timingSafeEqual(a: BufferSource, b: BufferSource): Promise<boolean>;
};

export async function timingSafeStringEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const maxLen = Math.max(a.length, b.length);
  const aBuf = enc.encode(a.padEnd(maxLen, "\0"));
  const bBuf = enc.encode(b.padEnd(maxLen, "\0"));
  const equal = await (crypto.subtle as SubtleCryptoWithTimingSafe).timingSafeEqual(aBuf, bBuf);
  return equal && a.length === b.length;
}
