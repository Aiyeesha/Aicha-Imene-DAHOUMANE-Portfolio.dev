"use client";

// ArticleReadTracker.tsx
// ----------------------
// Client component that fires `blog_article_completed` when the reader
// scrolls past 90 % of the article content.
//
// Approach: an invisible sentinel <div> is placed at the bottom of the
// article. IntersectionObserver fires as soon as it enters the viewport.
// The event is fired at most once per page load (observer disconnects after).
//
// Props:
//   slug           — article slug (e.g. "salesforce-lwc-basics")
//   locale         — "en" | "fr"
//   readingTimeMin — reading time in minutes (from frontmatter); converted
//                    to seconds before being sent to analytics

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  slug: string;
  locale: string;
  readingTimeMin: number;
};

export default function ArticleReadTracker({ slug, locale, readingTimeMin }: Props) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Fire once — disconnect immediately so it never re-fires on scroll up/down
        observer.disconnect();
        trackEvent("blog_article_completed", {
          slug,
          locale,
          read_time_sec: Math.round(readingTimeMin * 60),
        });
      },
      // rootMargin: "-10% 0px" means the sentinel must be 10% inside the viewport
      // before we consider the article "completed" (avoids fast-scroll false positives).
      { rootMargin: "-10% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [slug, locale, readingTimeMin]);

  // Invisible sentinel at the bottom of the article
  return <div ref={sentinelRef} aria-hidden="true" />;
}
