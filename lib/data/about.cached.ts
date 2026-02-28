import { cacheGetOrSet } from "@/lib/cache";
import { getAboutPage } from "@/lib/data/about";
import type { AboutPageRow } from "@/lib/data/about";

export async function getAboutPageCached(locale: "fr" | "en") {
  const key = `about:${locale}`;
  const ttl = 300; // 5 minutes

  return cacheGetOrSet<AboutPageRow | null>(key, ttl, () => getAboutPage(locale));
}
