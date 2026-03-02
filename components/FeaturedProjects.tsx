"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { tBadge, tTag } from "@/i18n/projectTaxonomy";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";
import { useTrack } from "@/app/[locale]/providers";
import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

type FeaturedProjectsProps = {
  projects: ProjectWithAssets[];
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations();
  const { track } = useTrack();
  const pathname = usePathname();
  const locale = (pathname.split("/")[1] || "en") as "en" | "fr";

  const featured = useMemo(() => {
    return projects
      .filter((p) => p.featured && p.track === track)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .slice(0, 4);
  }, [projects, track]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {featured.map((p, i) => (
        <Reveal key={p.slug} delayMs={i * 80}>
          <div className="card p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              {p.badge ? (
                <span
                  className={
                    p.badge.tone === "client"
                      ? "badge badge-client"
                      : p.badge.tone === "personal"
                        ? "badge badge-personal"
                        : "badge badge-training"
                  }
                >
                  {tBadge(p.badge.label, locale)}
                </span>
              ) : null}
            </div>

            <p className="mt-3 text-sm text-muted">{p.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(p.tags ?? []).slice(0, 4).map((tag) => (
                <span key={tag} className="chip">
                  {tTag(tag, locale)}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <Link
                href={`/${locale}/projects/${p.slug}`}
                className="inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
              >
                {t("projects.details")}
              </Link>
              {p.repo_url ? (
                <a
                  href={p.repo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-muted hover:bg-black/10 dark:hover:bg-white/10 transition-colors soft-ring"
                >
                  ↗ GitHub
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
