import { NextResponse } from "next/server";
import { readAllPosts } from "@/content/blog/fs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = (searchParams.get("locale") || "en") as "en" | "fr";
  const limit = Math.min(6, Math.max(1, Number(searchParams.get("limit") || "2")));

  const posts = readAllPosts(locale).slice(0, limit).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    tags: p.tags
  }));

  return NextResponse.json({ ok: true, posts });
}
