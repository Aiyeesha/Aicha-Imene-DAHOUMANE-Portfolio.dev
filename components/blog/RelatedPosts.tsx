import Link from "next/link";
import type { BlogPostMeta } from "@/content/blog/fs";
import { formatDate, detectTrack } from "@/lib/blog-utils";

interface Props {
  posts: BlogPostMeta[];
  locale: string;
  label: string;
}

function TrackDot({ tags }: { tags: string[] }) {
  const track = detectTrack(tags);
  if (!track) return null;
  return (
    <span
      className={[
        "inline-block h-2 w-2 rounded-full shrink-0",
        track === "salesforce"
          ? "bg-cyan-400"
          : "bg-violet-400"
      ].join(" ")}
    />
  );
}

export default function RelatedPosts({ posts, locale, label }: Props) {
  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-2 mb-4">
        {label}
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/${locale}/blog/${p.slug}`}
            className="card p-4 hover:bg-black/10 dark:hover:bg-white/5 soft-ring flex flex-col gap-2"
          >
            <div className="flex items-center gap-1.5">
              <TrackDot tags={p.tags} />
              <span className="text-xs text-muted-2">{formatDate(p.date, locale)}</span>
            </div>
            <div className="text-sm font-semibold leading-snug line-clamp-3">{p.title}</div>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {p.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="chip text-xs">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
