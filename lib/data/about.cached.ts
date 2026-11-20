// lib/data/about.cached.ts
// ------------------------
// Kept as the single entry point used by the About page. The content is
// static TypeScript already in memory, so it is no longer copied to Upstash
// (see lib/data/projects.cached.ts).
import { getAboutPage } from "@/lib/data/about";

export async function getAboutPageCached(locale: "fr" | "en" | "es") {
  return getAboutPage(locale);
}
