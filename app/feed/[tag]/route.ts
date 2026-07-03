// app/feed/[tag]/route.ts
// -----------------------
// Flux RSS 2.0 filtré par tag. Accessible via GET /feed/{tag}
// Ex: /feed/Salesforce  /feed/IT%20Ops  /feed/Security
//
// Le paramètre `locale` (query string) permet de choisir la langue du flux.
// Ex: /feed/Salesforce?locale=fr  → articles FR tagués "Salesforce"
//
// Les balises <link rel="alternate" type="application/rss+xml"> sont ajoutées
// sur les pages de tag (/[locale]/blog/tags) pour la découverte automatique.

import { NextResponse, type NextRequest } from "next/server";
import { buildRssFeed } from "@/lib/rss";
import type { BlogLocale } from "@/content/blog/fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const locale = (request.nextUrl.searchParams.get("locale") ?? "en") as BlogLocale;
  const validLocale: BlogLocale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";

  const xml = buildRssFeed({ locale: validLocale, tag: decodedTag });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
