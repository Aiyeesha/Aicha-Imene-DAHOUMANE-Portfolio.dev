import { NextResponse } from "next/server";
import { buildRssFeed } from "@/lib/rss";

export async function GET() {
  return new NextResponse(buildRssFeed({ locale: "es" }), {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
