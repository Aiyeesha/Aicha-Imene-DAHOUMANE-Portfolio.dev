"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import Link from "next/link";
import { projects } from "@/content/projects";
import { useTrack } from "@/app/[locale]/providers";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { tBadge, tCategory, tTag } from "@/i18n/projectTaxonomy";

const tones: Record<string, string> = {
  client: "badge badge-client",
  personal: "badge badge-personal",
  training: "badge badge-training"
};

type ProjectsSectionProps = {
  locale?: "en" | "fr";
};

export default function ProjectsSection({ locale: localeProp }: ProjectsSectionProps) {
  // Keep project UI strings under the "projects" namespace in messages/{locale}.json.
  // This avoids runtime MISSING_MESSAGE errors for keys like "search", "details", "requirements".
  const t = useTranslations("projects");
  const { track } = useTrack();
  const pathname = usePathname();
  const pathnameLocale = pathname.split("/")[1];
  const locale: "en" | "fr" = localeProp ?? (pathnameLocale === "fr" ? "fr" : "en");

  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects
      .filter((p) => p.track === track)
      .forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [track]);

  const filtered = useMemo(() => {
    const base = projects.filter((p) => p.track === track);
    return base.filter((p) => {
      const inCat = active === "All" ? true : p.categories.includes(active);
      const text = (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase();
      const inQ = q.trim() === "" ? true : text.includes(q.trim().toLowerCase());
      return inCat && inQ;
    });
  }, [track, active, q]);

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="projects-search" className="sr-only">
          {t("search")}
        </label>
        <input
          id="projects-search"
          name="projects-search"
          type="search"
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("search")}
          className="w-full rounded-full border border-black/10 bg-black/5 px-5 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 hover:bg-black/10 focus:border-cyan-400/40 soft-ring dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:placeholder:text-white/40 dark:hover:bg-white/10"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm soft-ring ${
              active === c
                ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                : "border-black/10 bg-black/5 text-slate-700 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
            }`}
          >
            {tCategory(c, locale)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, idx) => (
          <Reveal key={p.slug} delayMs={Math.min(280, idx * 60)}>
            <div className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.badge ? (
                  <span className={tones[p.badge.tone]}>{tBadge(p.badge.label, locale)}</span>
                ) : null}
              </div>

              <p className="mt-3 text-sm text-muted">{p.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tTag(tag, locale)}
                  </span>
                ))}
              </div>

              {/* Highlights / outcomes (if provided). Display up to 3 bullet points. */}
              {p.highlights && p.highlights.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-muted">
                  {p.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="list-disc list-inside">
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Single CTA: keep cards simple. (PDF lives on the details page) */}
              <div className="mt-5">
                <Link
                  href={`/${locale}/projects/${p.slug}`}
                  className="inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
                >
                  {t("details")}
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
