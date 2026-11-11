// lib/security/ipBucket.ts
// ------------------------
// Pure helper (no Redis import) used by lib/ratelimit.ts before keys are
// pseudonymised, so every limiter (contact, search, errors, CSP reports,
// /admin…) buckets IPv6 clients by /64.

/**
 * IPv6 clients usually own a whole /64 (2^64 addresses): keying a limiter on
 * the full address let one client rotate addresses and bypass it. The IPv6
 * address at the end of a limiter key ("<ip>" or "<prefix>:ip:<ip>") is
 * reduced to its /64 network; IPv4 and IPv4-mapped addresses are unchanged.
 */
export function normalizeIpInKey(key: string): string {
  const m = key.match(/^(.*?:ip:|)([0-9a-f:]+)(%[\w.-]+)?$/i);
  if (!m) return key;
  const [, prefix, addr] = m;
  if ((addr.match(/:/g) ?? []).length < 2) return key; // not IPv6
  const halves = addr.split("::");
  if (halves.length > 2) return key;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (missing < 0 || (halves.length === 1 && missing !== 0)) return key;
  const groups = [...head, ...Array(missing).fill("0"), ...tail];
  if (groups.some((g) => !/^[0-9a-f]{1,4}$/i.test(g))) return key;
  const net = groups.slice(0, 4).map((g) => parseInt(g, 16).toString(16)).join(":");
  return `${prefix}${net}::/64`;
}
