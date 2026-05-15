"use client";

import Link from "next/link";
import Image from "next/image";

// CDN Supabase Storage — images optimisées dans le bucket "projects"
const STORAGE_CDN = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects`;
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { tBadge, tTag } from "@/i18n/projectTaxonomy";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";
import { GlowCard } from "./GlowCard";
import { useTrack } from "@/app/[locale]/providers";
import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

type FeaturedProjectsProps = {
  projects: ProjectWithAssets[];
};

// Wrapper avec fallback en cascade : gallery src → cover.webp → fond vide
function CoverImage({ src, fallback, alt, loading }: { src: string; fallback?: string; alt: string; loading?: "lazy" | "eager" }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

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
  const locale = (pathname.split("/")[1] || "en") as "en" | "fr";

  const featured = useMemo(() => {
    return projects
      .filter((p) => p.featured && p.track === track)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .slice(0, 4);
  }, [projects, track]);

  // ── Empty state ─────────────────────────────────────────────────────────────
  // Déclenché quand Supabase est indisponible (retourne []) ou quand aucun
  // projet n'a featured=true pour le track actif.
  if (featured.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-12 px-6 text-center">
        {/* Icône dossier vide */}
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
    <div className="grid gap-4 lg:grid-cols-3">
      {featured.map((p, i) => (
        <Reveal key={p.slug} delayMs={i * 80}>
          <GlowCard className="card overflow-hidden">
            {/* Image de couverture */}
            <div className="relative h-40 w-full bg-black/5 dark:bg-white/5">
              <CoverImage
                src={p.gallery?.[0]?.src || `${STORAGE_CDN}/${p.slug}/cover.webp`}
                fallback={`${STORAGE_CDN}/${p.slug}/cover.webp`}
                alt={p.title}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="p-6">
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
            </div>{/* /p-6 */}
          </GlowCard>
        </Reveal>
      ))}
    </div>
  );
}
