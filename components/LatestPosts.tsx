import Link from "next/link";
import { useTranslations } from "next-intl";
import { readAllPosts } from "@/content/blog/fs";
import { detectTrack, formatDate, translateTag } from "@/lib/blog-utils";
import type React from "react";

type LatestPostsProps = {
  locale: "en" | "fr" | "es";
  className?: string;
  /** Active track: filters the posts shown on the home page */
  track?: "salesforce" | "itops";
};

// Left border coloured by the post's track. Inline style is required: .card
// sets border-color outside @layer, which overrides Tailwind's border-l-*.
function trackBorderStyle(postTrack: "salesforce" | "itops" | null): React.CSSProperties | undefined {
  if (postTrack === "salesforce") return { borderLeft: "4px solid #06b6d4" }; // cyan-500
  if (postTrack === "itops")     return { borderLeft: "4px solid #8b5cf6" }; // violet-500
  return undefined;
}

export default function LatestPosts({ className = "", locale, track }: LatestPostsProps) {
  const t = useTranslations();

  const all = readAllPosts(locale);

  // Posts to show
  const posts = (() => {
    if (track) {
      // With a track: filter by it (track-neutral posts pass too)
      const filtered = all.filter((p) => { const pt = detectTrack(p.tags); return pt === null || pt === track; });
      return (filtered.length > 0 ? filtered : all).slice(0, 3);
    }
    // Without a track: at least one Salesforce and one IT Ops post
    const sfPost = all.find((p) => detectTrack(p.tags) === "salesforce");
    const itPost = all.find((p) => detectTrack(p.tags) === "itops");
    const diverse: typeof all = [];
    if (sfPost) diverse.push(sfPost);
    if (itPost && itPost.slug !== sfPost?.slug) diverse.push(itPost);
    const used = new Set(diverse.map((p) => p.slug));
    for (const p of all) {
      if (diverse.length >= 3) break;
      if (!used.has(p.slug)) { diverse.push(p); used.add(p.slug); }
    }
    // Selection ensures variety; display stays chronological.
    return diverse.sort((a, b) => (a.date < b.date ? 1 : -1));
  })();

  return (
    <div className={className}>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length ? (
          posts.map((p) => {
            const postTrack = detectTrack(p.tags);

            return (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}`}
                className="card p-6 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
                style={trackBorderStyle(postTrack)}
              >
                <div className="flex items-center gap-2 text-xs text-muted-2">
                  <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                  <span aria-hidden="true">·</span>
                  <span>
                    {p.readingTime} {t("blog.readingTime")}
                  </span>
                </div>

                <div className="mt-2 text-xl font-semibold">{p.title}</div>
                <div className="mt-2 text-muted">{p.excerpt}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="chip">
                      {translateTag(tag, locale)}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="card p-6 text-muted md:col-span-3">{t("blog.latest_empty")}</div>
        )}
      </div>

      <div className="mt-5">
        <Link
          href={`/${locale}/blog`}
          className="text-sm text-cyan-700 dark:text-cyan-200 hover:opacity-90"
        >
          {t("blog.latest_cta")} →
        </Link>
      </div>
    </div>
  );
}
