import { readAllPosts, type BlogLocale } from "@/content/blog/fs";
import { getSiteUrl } from "@/lib/siteUrl";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr + "T12:00:00Z").toUTCString();
}

export type RssOptions = {
  locale?: BlogLocale;
  tag?: string;
};

export function buildRssFeed(opts: RssOptions = {}): string {
  const { locale = "en", tag } = opts;
  const siteUrl = getSiteUrl();

  let posts = readAllPosts(locale);
  if (tag) {
    const normalised = tag.toLowerCase();
    posts = posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === normalised)
    );
  }

  const langPath = locale === "fr" ? "fr" : "en";
  const tagSuffix = tag ? ` — ${tag}` : "";
  const feedLink = tag
    ? `${siteUrl}/feed/${encodeURIComponent(tag)}${locale === "fr" ? "?locale=fr" : ""}`
    : locale === "fr"
    ? `${siteUrl}/feed-fr.xml`
    : `${siteUrl}/feed.xml`;

  const meta = {
    title: `Aïcha Imène DAHOUMANE — Blog${tagSuffix}`,
    description: tag
      ? `Articles tagged "${tag}" — Salesforce, IT Ops, DevOps.`
      : locale === "fr"
      ? "Tutoriels pratiques sur Salesforce, l'IT Ops et le développement web moderne."
      : "Practical tutorials on Salesforce, IT Ops, and modern web development.",
    link: `${siteUrl}/${langPath}/blog${tag ? `?tag=${encodeURIComponent(tag)}` : ""}`,
    feedLink,
    language: locale,
    copyright: `© ${new Date().getFullYear()} Aïcha Imène DAHOUMANE`,
  };

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/${langPath}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${toRfc822(post.date)}</pubDate>
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(meta.title)}</title>
    <link>${meta.link}</link>
    <description>${escapeXml(meta.description)}</description>
    <language>${meta.language}</language>
    <copyright>${escapeXml(meta.copyright)}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${meta.feedLink}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
