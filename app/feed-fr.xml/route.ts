// app/feed-fr.xml/route.ts
// -------------------------
// Flux RSS 2.0 des articles du blog en français.
// Accessible via GET /feed-fr.xml
// Symétrique de /feed.xml (version anglaise).

import { readAllPosts } from "@/content/blog/fs";
import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/siteUrl";

// ── Configuration ─────────────────────────────────────────────────────────────

const SITE_URL = getSiteUrl();

const FEED_META = {
  title: "Aïcha Imène DAHOUMANE — Blog (FR)",
  description:
    "Tutoriels pratiques sur Salesforce (Apex, Flows, LWC, CI/CD), IT Ops et développement web moderne.",
  link: `${SITE_URL}/fr/blog`,
  feedLink: `${SITE_URL}/feed-fr.xml`,
  language: "fr",
  copyright: `© ${new Date().getFullYear()} Aïcha Imène DAHOUMANE`,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Échappe les caractères spéciaux XML dans le contenu texte. */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Formate une date ISO (YYYY-MM-DD) en RFC-822 pour RSS. */
function toRfc822(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toUTCString();
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET() {
  // Lecture des articles FR — triés du plus récent au plus ancien
  const posts = readAllPosts("fr");

  // Construction des <item> RSS
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/fr/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${toRfc822(post.date)}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_META.title)}</title>
    <link>${FEED_META.link}</link>
    <description>${escapeXml(FEED_META.description)}</description>
    <language>${FEED_META.language}</language>
    <copyright>${escapeXml(FEED_META.copyright)}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${FEED_META.feedLink}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      // Cache 1h côté CDN, revalidé en arrière-plan (stale-while-revalidate)
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
