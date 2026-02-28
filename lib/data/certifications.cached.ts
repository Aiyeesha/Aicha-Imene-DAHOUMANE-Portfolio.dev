import { cacheGetOrSet } from "@/lib/cache";
import { getCertifications } from "@/lib/data/certifications";
import type { CertificationRow } from "@/lib/data/certifications";

export async function getCertificationsCached(locale: "fr" | "en") {
  const key = `certifications:${locale}`;
  const ttl = 300; // 5 minutes

  return cacheGetOrSet<CertificationRow[]>(key, ttl, () => getCertifications(locale));
}
