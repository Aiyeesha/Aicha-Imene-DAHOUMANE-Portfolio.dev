// app/api/palette-index/[locale]/route.ts
// ---------------------------------------
// GET /api/palette-index/fr → search index for the ⌘K palette (projects, blog
// posts, certifications; see lib/search/paletteIndex.ts).
//
// Built at build time for each locale (generateStaticParams) and served as a
// static file; any other locale returns 404. The content lives in the
// repository, so a new deployment is the only thing that changes it.

import { buildPaletteIndex } from "@/lib/search/paletteIndex";

const LOCALES = ["en", "fr", "es"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  return Response.json(buildPaletteIndex(locale));
}
