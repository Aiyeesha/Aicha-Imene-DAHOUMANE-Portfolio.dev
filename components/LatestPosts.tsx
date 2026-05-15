import Link from "next/link";
import { useTranslations } from "next-intl";
import { readAllPosts } from "@/content/blog/fs";
import { detectTrack } from "@/lib/blog-utils";
import matter from "gray-matter";
import fs from "node:fs";
import type React from "react";

function readingTimeMinutes(mdxFileAbsPath: string): number {
  try {
    const raw = fs.readFileSync(mdxFileAbsPath, "utf-8");
    const parsed = matter(raw);
    const text = String(parsed.content || "")
      // remove markdown symbols roughly
      .replace(/[`*_>#\-\[\]\(\)!]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = text ? text.split(" ").length : 0;
    // 200 wpm baseline
    return Math.max(1, Math.round(words / 200));
  } catch {
    return 1;
  }
}

type LatestPostsProps = {
  locale: "en" | "fr";
  className?: string;
  /** Track actif — filtre les articles affichés sur la homepage */
  track?: "salesforce" | "itops";
};

// Bordure gauche colorée selon le track de l'article.
// Style inline requis car .card définit border-color en dehors de @layer,
// ce qui écrase les utilitaires Tailwind border-l-*.
function trackBorderStyle(postTrack: "salesforce" | "itops" | null): React.CSSProperties | undefined {
  if (postTrack === "salesforce") return { borderLeft: "4px solid #06b6d4" }; // cyan-500
  if (postTrack === "itops")     return { borderLeft: "4px solid #8b5cf6" }; // violet-500
  return undefined;
}

export default function LatestPosts({ className = "", locale, track }: LatestPostsProps) {
  const t = useTranslations();

  const all = readAllPosts(locale);

  // Sélection des posts à afficher
  const posts = (() => {
    if (track) {
      // Track spécifié → filtrer par track (les neutres passent aussi)
      const filtered = all.filter((p) => { const pt = detectTrack(p.tags); return pt === null || pt === track; });
      return (filtered.length > 0 ? filtered : all).slice(0, 3);
    }
    // Sans track → garantir au moins 1 article Salesforce + 1 IT Ops pour la diversité
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
    return diverse;
  })();

  return (
    <div className={className}>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.length ? (
          posts.map((p) => {
            const mins = readingTimeMinutes(p.file);

            const postTrack = detectTrack(p.tags);

            return (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}`}
                className="card p-6 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
                style={trackBorderStyle(postTrack)}
              >
                <div className="flex items-center gap-2 text-xs text-muted-2">
                  <span>{p.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {mins} {t("blog.readingTime")}
                  </span>
                </div>

                <div className="mt-2 text-xl font-semibold">{p.title}</div>
                <div className="mt-2 text-muted">{p.excerpt}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
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
