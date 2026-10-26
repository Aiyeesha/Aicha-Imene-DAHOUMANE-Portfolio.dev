// app/feed/[tag]/route.ts
// -----------------------
// RSS 2.0 feed filtered by tag: GET /feed/{tag} (e.g. /feed/Salesforce,
// /feed/IT%20Ops); ?locale=fr selects the language. Tag pages
// (/[locale]/blog/tags) announce these feeds with <link rel="alternate">.

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
