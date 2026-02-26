import Link from "next/link";
import { useTranslations } from "next-intl";
import { readAllPosts } from "@/content/blog/fs";
import matter from "gray-matter";
import fs from "node:fs";

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
};

export default function LatestPosts({ className = "", locale }: LatestPostsProps) {
  const t = useTranslations();

  const posts = readAllPosts(locale).slice(0, 2);

  return (
    <div className={className}>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.length ? (
          posts.map((p) => {
            const mins = readingTimeMinutes(p.file);

            return (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}`}
                className="card p-6 hover:bg-black/10 dark:hover:bg-white/5 soft-ring"
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
          <div className="card p-6 text-muted md:col-span-2">{t("blog.latest_empty")}</div>
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
