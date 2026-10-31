"use client";

import Link from "next/link";
import Image from "next/image";

// Project images are committed to the repo under /public/projects/<slug>/
// and served by Vercel's CDN (see lib/data/projectsSource.ts). Which image a
// card shows is resolved by projectCardImage() (lib/data/projectAssets.ts).
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { getBadgeClass, tBadge, tTag } from "@/i18n/projectTaxonomy";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";
import { GlowCard } from "./GlowCard";
import ProjectClientLogo from "./ProjectClientLogo";
import { projectCardImage } from "@/lib/data/projectAssets";
import { useTrack } from "@/app/[locale]/providers";
import type { FeaturedProjectCard } from "@/lib/data/featuredProjects";

type FeaturedProjectsProps = {
  // Trimmed on the server (toFeaturedProjectCards): props end up in the HTML.
  projects: FeaturedProjectCard[];
};

// Image with fallback: gallery src → cover.webp → empty background. `src` is
// null when the project has neither, and the placeholder is shown directly.
function CoverImage({ src, fallback, alt, loading }: { src: string | null; fallback?: string; alt: string; loading?: "lazy" | "eager" }) {
  const [imgSrc, setImgSrc] = useState(src ?? "");
  const [failed, setFailed] = useState(src === null);

  if (failed) return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800/50" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-600">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 33vw"
      className="object-cover"
      loading={loading}
      onError={() => {
        if (fallback && imgSrc !== fallback) {
          setImgSrc(fallback);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations();
  const { track } = useTrack();
  const pathname = usePathname();
  const pathnameLocale = pathname.split("/")[1];
  const locale: "en" | "fr" | "es" = pathnameLocale === "fr" ? "fr" : pathnameLocale === "es" ? "es" : "en";

  // Cross-domain (is_bridge) projects stay visible on both tracks: they are
  // the proof that the two skill sets combine.
  const featured = useMemo(() => {
    const trackMatches = projects
      .filter((p) => p.featured && p.track === track)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .slice(0, 5);

    const missingBridgeProjects = projects.filter(
      (p) => p.featured && p.is_bridge && !trackMatches.some((tm) => tm.slug === p.slug)
    );

    return [...trackMatches, ...missingBridgeProjects];
  }, [projects, track]);

  // ── Empty state ─────────────────────────────────────────────────────────────
  // Data source unavailable, or no featured project for the active track.
  if (featured.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-12 px-6 text-center">
        {/* Empty folder icon */}
        <svg
          className="mx-auto mb-4 h-10 w-10 text-slate-300 dark:text-white/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7a2 2 0 012-2h3.586a1 1 0 01.707.293L10.414 6.5H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
          />
        </svg>
        <p className="text-sm text-muted">{t("projects.emptyFeatured")}</p>
      </div>
    );
  }

  return (
    // grid-cols-1 is minmax(0, 1fr), so cards can shrink below their content
    // width (otherwise the page overflows at 320px). Same as ProjectsSection.
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featured.map((p, i) => (
        <Reveal className="h-full" key={p.slug} delayMs={i * 80}>
          <GlowCard className="card flex h-full flex-col overflow-hidden">
            {/* Cover image */}
            <div className="relative h-40 w-full bg-black/5 dark:bg-white/5">
              <CoverImage
                src={projectCardImage(p.slug, p.gallery)?.src ?? null}
                fallback={projectCardImage(p.slug, p.gallery)?.fallback ?? undefined}
                alt={p.title}
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Client logo, in a white tile over the cover; nothing if missing.
                  Decorative (alt=""): the project title follows. */}
                <ProjectClientLogo slug={p.slug} alt="" size="tile" loading="lazy" />
              </div>
            {/* flex-1 + mt-auto on the CTAs: buttons aligned across a row of cards */}
            <div className="flex flex-1 flex-col p-6">
            {/* Header: title, then the badge on its own line. Side by side, a long
                badge ("Projet de formation — Titre RNCP 6") squeezed the title onto
                3–4 lines. */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="min-w-0 text-lg font-semibold break-words">{p.title}</h3>
              {p.badge ? (
                <span className={getBadgeClass(p.badge.tone)}>
                  {tBadge(p.badge.label, locale)}
                </span>
              ) : null}
            </div>

            {/* Project period, when known */}
            {p.nature?.period && (
              <p className="mt-1 text-xs text-muted-2">{p.nature.period}</p>
            )}


            {p.is_bridge ? (
              <span className="badge badge-bridge mt-2 inline-flex">{t("projects.bridgeBadge")}</span>
            ) : null}

            <p className="mt-3 text-sm text-muted">{p.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(p.tags ?? []).slice(0, 4).map((tag) => (
                <span key={tag} className="chip">
                  {tTag(tag, locale)}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-auto pt-6 flex items-center gap-2 flex-wrap">
              <Link
                href={`/${locale}/projects/${p.slug}`}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
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
            </div>{/* /p-6 */}
          </GlowCard>
        </Reveal>
      ))}
    </div>
  );
}
