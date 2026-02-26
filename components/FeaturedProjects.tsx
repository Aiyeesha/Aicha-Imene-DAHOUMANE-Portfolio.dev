"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { projects, featuredProjectSlugsByTrack } from "@/content/projects";
import { tBadge, tTag } from "@/i18n/projectTaxonomy";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";
import { useTrack } from "@/app/[locale]/providers";

export default function FeaturedProjects() {
  const t = useTranslations();
  const { track } = useTrack();
  const pathname = usePathname();
  const locale = (pathname.split("/")[1] || "en") as "en" | "fr";

  const featured = useMemo(() => {
    const set = new Set(featuredProjectSlugsByTrack[track]);
    return projects.filter((p) => set.has(p.slug as any));
  }, [track]);

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

            <p className="mt-3 text-sm text-muted">{p.excerpt}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="chip">
                  {tTag(tag, locale)}
                </span>
              ))}
            </div>

            {/* Single CTA: keep cards simple. (PDF lives on the details page) */}
            <div className="mt-6">
              <Link
                href={`/${locale}/projects/${p.slug}`}
                className="inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
              >
                {t("projects.details")}
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
