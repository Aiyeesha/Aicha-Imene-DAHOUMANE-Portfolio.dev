// app/feed/[tag]/route.ts
// -----------------------
// RSS 2.0 feed filtered by tag: GET /feed/{tag} (e.g. /feed/Salesforce,
// /feed/IT%20Ops); ?locale=fr selects the language. Tag pages
// (/[locale]/blog/tags) announce these feeds with <link rel="alternate">.
// A tag with no post in that language answers 404, so invented URLs are not
// served (and cached) as empty feeds.

import { NextResponse, type NextRequest } from "next/server";
import { buildRssFeed } from "@/lib/rss";
import { readAllPosts, type BlogLocale } from "@/content/blog/fs";

// The router normally hands over the decoded segment; decoding again is only
// a fallback and must never throw on a literal "%" (e.g. /feed/%25).
function decodeTag(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  const { tag } = await params;
  const decodedTag = decodeTag(tag).trim();
  const locale = request.nextUrl.searchParams.get("locale");
  const validLocale: BlogLocale = locale === "fr" ? "fr" : locale === "es" ? "es" : "en";

  const normalised = decodedTag.toLowerCase();
  const known = readAllPosts(validLocale).some((p) =>
    p.tags.some((t) => t.toLowerCase() === normalised)
  );
  if (!known) {
    return new NextResponse("Unknown tag.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const xml = buildRssFeed({ locale: validLocale, tag: decodedTag });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
