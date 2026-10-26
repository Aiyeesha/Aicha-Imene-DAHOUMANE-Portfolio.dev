"use client";

// ProjectsSection.tsx
// -------------------
// "All projects" section: Salesforce / IT Ops / cross-domain / security tabs
// with per-tab counts, category filters and full-text search. Category and
// search reset when the track changes.

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Reveal from "./Reveal";
import { GlowCard } from "./GlowCard";
import ProjectClientLogo from "./ProjectClientLogo";
import { projectCardImage } from "@/lib/data/projectAssets";

// Project images are committed to the repo under /public/projects/<slug>/
// and served by Vercel's CDN (see lib/data/projectsSource.ts). Which image a
// card shows is resolved by projectCardImage() (lib/data/projectAssets.ts).

// Image with fallback: gallery src → cover.webp → empty background. Gallery
// entries stored in the database may point to renamed files. `src` is null
// when the project has neither, and the placeholder is shown directly.
function CoverImage({ src, fallback, alt }: { src: string | null; fallback?: string; alt: string }) {
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
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="object-cover"
      loading="lazy"
      unoptimized
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
import Link from "next/link";
import Image from "next/image";
import { useTrack } from "@/app/[locale]/providers";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getBadgeClass, tBadge, tCategory, tTag } from "@/i18n/projectTaxonomy";
import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

type ProjectsSectionProps = {
  locale?: "en" | "fr" | "es";
  projects: ProjectWithAssets[];
  /** On /projects, also list featured projects (no FeaturedProjects block above). */
  includeFeatured?: boolean;
};

export default function ProjectsSection({ locale: localeProp, projects, includeFeatured = false }: ProjectsSectionProps) {
  const t = useTranslations("projects");
  const { track, setTrack } = useTrack();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameLocale = pathname.split("/")[1];
  const locale: "en" | "fr" | "es" = localeProp ?? (pathnameLocale === "fr" ? "fr" : pathnameLocale === "es" ? "es" : "en");

  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>("All");

  // ── Project count per track ───────────────────────────────────
  const trackCounts = useMemo(() => ({
    salesforce: projects.filter((p) => p.track === "salesforce" && (includeFeatured || !p.featured)).length,
    itops:      projects.filter((p) => p.track === "itops"       && (includeFeatured || !p.featured)).length
  }), [projects, includeFeatured]);

  type ActiveTab = "all" | "salesforce" | "itops" | "bridge" | "security";

  // "Cross-domain" tab: projects with is_bridge=true, whatever their track,
  // so the rarest kind of evidence has its own entry point.
  const bridgeCount = useMemo(
    () => projects.filter((p) => p.is_bridge && (includeFeatured || !p.featured)).length,
    [projects, includeFeatured]
  );

  // "Security" tab: projects with is_security=true, whatever their track (a
  // Salesforce project carries the flag too).
  const securityCount = useMemo(
    () => projects.filter((p) => p.is_security && (includeFeatured || !p.featured)).length,
    [projects, includeFeatured]
  );

  // Visible tabs in order, for arrow/Home/End keyboard navigation.
  const visibleTabs = useMemo<ActiveTab[]>(
    () => (includeFeatured ? ["all", "salesforce", "itops", "bridge", "security"] : ["salesforce", "itops"]),
    [includeFeatured]
  );

  // Initial tab: a `?tab=…` deep link wins (e.g. /projects?tab=security);
  // otherwise follow the global track instead of opening "All".
  const tabParam = includeFeatured ? searchParams.get("tab") : null;
  const initialTab: ActiveTab =
    tabParam === "security" || tabParam === "bridge" || tabParam === "salesforce" || tabParam === "itops"
      ? tabParam
      : (track as ActiveTab);
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  // Keep the tab in sync with the header track toggle on /projects, but only
  // when a track tab (salesforce/itops/all) is selected: an explicit
  // "Cross-domain" or "Security" choice is kept. Skipped when `?tab=` drives the
  // tab. Done during render from the previous value (React's "adjusting state
  // when a prop changes" pattern) rather than in an effect.
  const trackSyncSuspended = Boolean(tabParam);
  const [prevTrack, setPrevTrack] = useState(track);
  if (track !== prevTrack) {
    setPrevTrack(track);
    if (includeFeatured && !trackSyncSuspended) {
      setActiveTab((current) =>
        current === "bridge" || current === "security" ? current : (track as ActiveTab)
      );
      setActive("All");
      setQ("");
    }
  }

  // ── Categories available in the active tab ───────────────────
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects
      .filter((p) => {
        if (!(includeFeatured || !p.featured)) return false;
        if (activeTab === "all") return true;
        if (activeTab === "bridge") return !!p.is_bridge;
        if (activeTab === "security") return !!p.is_security;
        return p.track === activeTab;
      })
      .forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [activeTab, projects, includeFeatured]);

  const allCount = useMemo(() =>
    projects.filter((p) => includeFeatured || !p.featured).length,
    [projects, includeFeatured]
  );

  // Tab button refs (← → keyboard navigation)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Switch track and reset filters
  const handleTrackChange = (newTrack: "salesforce" | "itops") => {
    setTrack(newTrack);
    setActiveTab(newTrack);
    setActive("All");
    setQ("");
  };

  // "Cross-domain" is a display filter, not a profile preference: it leaves
  // the global track unchanged.
  const handleBridgeTabSelect = () => {
    setActiveTab("bridge");
    setActive("All");
    setQ("");
  };

  // "Security" tab: same as "Cross-domain".
  const handleSecurityTabSelect = () => {
    setActiveTab("security");
    setActive("All");
    setQ("");
  };

  // Tablist keyboard navigation (APG pattern) over the visible tabs.
  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let target = -1;
    if (e.key === "ArrowRight") target = (idx + 1) % visibleTabs.length;
    else if (e.key === "ArrowLeft") target = (idx - 1 + visibleTabs.length) % visibleTabs.length;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = visibleTabs.length - 1;
    if (target === -1) return;
    e.preventDefault();
    const nextTab = visibleTabs[target];
    if (nextTab === "salesforce" || nextTab === "itops") handleTrackChange(nextTab);
    else if (nextTab === "bridge") handleBridgeTabSelect();
    else if (nextTab === "security") handleSecurityTabSelect();
    else { setActiveTab("all"); setActive("All"); setQ(""); }
    tabRefs.current[target]?.focus();
  };

  // ── Filtering: tab + category + text search ───────────────────
  const filtered = useMemo(() => {
    const base = includeFeatured
      ? activeTab === "all"
        ? projects.filter((p) => includeFeatured || !p.featured)
        : activeTab === "bridge"
          ? projects.filter((p) => p.is_bridge && (includeFeatured || !p.featured))
          : activeTab === "security"
            ? projects.filter((p) => p.is_security && (includeFeatured || !p.featured))
            : projects.filter((p) => p.track === activeTab && (includeFeatured || !p.featured))
      : projects.filter((p) => p.track === track && (includeFeatured || !p.featured));
    return base.filter((p) => {
      const inCat = active === "All" ? true : (p.categories ?? []).includes(active);
      const text = ((p.title ?? "") + " " + (p.summary ?? "") + " " + (p.tags ?? []).join(" ")).toLowerCase();
      const inQ  = q.trim() === "" ? true : text.includes(q.trim().toLowerCase());
      return inCat && inQ;
    });
  }, [activeTab, track, active, q, projects, includeFeatured]);

  return (
    <div>
      {/* ── Track tabs with counts (ARIA tabs) ───────────────────────
          The bar scrolls horizontally inside the component on narrow screens;
          buttons neither shrink nor wrap. Arrow-key focus() scrolls the
          target tab into view. */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div
          role="tablist"
          aria-label={locale === "fr" ? "Filtrer par parcours" : locale === "es" ? "Filtrar por trayectoria" : "Filter by track"}
          className="flex max-w-full overflow-x-auto no-scrollbar rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1"
        >
          {visibleTabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            const count =
              tab === "all" ? allCount
              : tab === "bridge" ? bridgeCount
              : tab === "security" ? securityCount
              : trackCounts[tab];
            const label =
              tab === "all" ? (locale === "fr" ? "Tous" : locale === "es" ? "Todos" : "All")
              : tab === "bridge" ? (locale === "fr" ? "Croisés" : locale === "es" ? "Cruzados" : "Cross-domain")
              : tab === "security" ? (locale === "fr" ? "Sécurité" : locale === "es" ? "Seguridad" : "Security")
              : tab === "salesforce" ? "Salesforce"
              : "IT Ops";
            const onSelect = () => {
              if (tab === "salesforce" || tab === "itops") handleTrackChange(tab);
              else if (tab === "bridge") handleBridgeTabSelect();
              else if (tab === "security") handleSecurityTabSelect();
              else { setActiveTab("all"); setActive("All"); setQ(""); }
            };
            return (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[idx] = el; }}
                type="button"
                role="tab"
                aria-selected={isActive ? "true" : "false"}
                tabIndex={isActive ? 0 : -1}
                onClick={onSelect}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={[
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors soft-ring",
                  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-200"
                    : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
                ].join(" ")}
              >
                {label}
                {/* Count badge */}
                <span className={[
                  "rounded-full px-1.5 py-0.5 text-xs leading-none",
                  isActive
                    ? "bg-cyan-500/30 text-cyan-800 dark:text-cyan-100"
                    : "bg-black/10 dark:bg-white/10 text-slate-600 dark:text-white/70"
                ].join(" ")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Context note: why IT Ops has far more projects than Salesforce ──
          Without it, the raw ratio contradicts the positioning. */}
      <div className="mb-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3 px-4 py-3 text-sm text-muted">
        {locale === "fr"
          ? `Pourquoi ${trackCounts.itops} projets IT Ops pour ${trackCounts.salesforce} projets Salesforce ? Mon travail Salesforce en poste est confidentiel et ne peut pas être publié : les projets Salesforce présentés ici sont des projets de formation et une étude de cas reconstituée. Les projets IT Ops, surtout personnels, n'ont pas cette contrainte. Chaque page indique la nature du projet et sa période.`
          : locale === "es"
          ? `¿Por qué ${trackCounts.itops} proyectos IT Ops frente a ${trackCounts.salesforce} proyectos Salesforce? Mi trabajo Salesforce en el puesto es confidencial y no puede publicarse: los proyectos Salesforce que se presentan aquí son proyectos de formación y un caso de estudio reconstruido. Los proyectos IT Ops, sobre todo personales, no tienen esa restricción. Cada página indica la naturaleza del proyecto y su periodo.`
          : `Why ${trackCounts.itops} IT Ops projects for ${trackCounts.salesforce} Salesforce projects? My Salesforce work in my role is confidential and can't be published: the Salesforce projects shown here are training projects and one reconstructed case study. The IT Ops projects, mostly personal, don't carry that constraint. Each page states the project's type and period.`}
      </div>

      {/* ── Full-text search ─────────────────────────────────────── */}
      <div className="mb-5">
        <label htmlFor="projects-search" className="sr-only">{t("search")}</label>
        <input
          id="projects-search"
          name="projects-search"
          type="search"
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("search")}
          className="w-full rounded-full border border-black/10 bg-black/5 px-5 py-3 text-sm text-slate-900
            outline-hidden placeholder:text-slate-400 hover:bg-black/10 focus:border-cyan-400/40 soft-ring
            dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:placeholder:text-white/40 dark:hover:bg-white/10"
        />
      </div>

      {/* ── Category filters ─────────────────────────────────────── */}
      {categories.length > 1 && (
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm soft-ring ${
                active === c
                  ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                  : "border-black/10 bg-black/5 text-slate-700 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
              }`}
            >
              {tCategory(c, locale)}
            </button>
          ))}
        </div>
      )}

      {/* ── Empty state: data source unavailable or nothing published ──
          Not the same as "no search results" (projects.length === 0 here). */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-16 px-6 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-white/20"
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
          <p className="font-medium text-strong">{t("emptyState")}</p>
          <p className="mt-1 text-sm text-muted">{t("emptyStateSubtitle")}</p>
        </div>
      )}

      {/* ── Project grid ───────────────────────────────────────── */}
      {/* grid-cols-1 is minmax(0, 1fr): the implicit track would be
          minmax(auto, 1fr), and cards could not shrink below their content
          width, overflowing at 320px. */}
      {projects.length > 0 && (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, idx) => (
          <Reveal key={p.slug} delayMs={Math.min(280, idx * 60)}>
            <GlowCard className="card overflow-hidden">
              {/* Cover image */}
              <div className="relative h-36 w-full bg-black/5 dark:bg-white/5">
                <CoverImage
                  src={projectCardImage(p.slug, p.gallery)?.src ?? null}
                  fallback={projectCardImage(p.slug, p.gallery)?.fallback ?? undefined}
                  alt={p.title}
                />
              </div>
              <div className="p-5">
              {/* Header: title + badge. On narrow cards the badge wraps below
                  the title instead of being clipped. */}
              <div className="flex items-start justify-between gap-3 max-sm:flex-wrap">
                <h3 className="min-w-0 text-lg font-semibold break-words">{p.title}</h3>
                {p.badge ? (
                  <span className={getBadgeClass(p.badge.tone)}>{tBadge(p.badge.label, locale)}</span>
                ) : null}
              </div>

              {/* Project period, when known */}
              {p.nature?.period && (
                <p className="mt-1 text-xs text-muted-2">{p.nature.period}</p>
              )}

              {/* Client logo: nothing if missing, lazy-loaded */}
              <div className="mt-1">
                <ProjectClientLogo slug={p.slug} alt={p.title} size="sm" loading="lazy" />
              </div>

              {(p.is_bridge || p.is_security) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.is_bridge && (
                    <span className="badge badge-bridge inline-flex">{t("bridgeBadge")}</span>
                  )}
                  {p.is_security && (
                    <span className="badge badge-security inline-flex">{t("securityBadge")}</span>
                  )}
                </div>
              )}

              {/* Summary */}
              <p className="mt-3 text-sm text-muted line-clamp-2">{p.summary}</p>

              {/* Tech tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.tags ?? []).map((tag) => (
                  <span key={tag} className="chip">{tTag(tag, locale)}</span>
                ))}
              </div>

              {/* Highlights (max 3) */}
              {p.highlights && p.highlights.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-muted">
                  {p.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="list-disc list-inside">{h}</li>
                  ))}
                </ul>
              )}

              {/* CTAs. The data layer only returns published projects, so
                  every card has a detail page. */}
              <div className="mt-5 flex items-center gap-2 flex-wrap">
                {p.status === "published" && (
                  <Link
                    href={`/${locale}/projects/${p.slug}`}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
                  >
                    {t("details")}
                  </Link>
                )}
                {p.repo_url ? (
                  <a
                    href={p.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10
                      bg-black/5 dark:bg-white/5 px-4 py-2 text-sm text-muted
                      hover:bg-black/10 dark:hover:bg-white/10 transition-colors soft-ring"
                  >
                    ↗ GitHub
                  </a>
                ) : null}
              </div>
              </div>{/* /p-5 */}
            </GlowCard>
          </Reveal>
        ))}
      </div>
      )}
      {/* ── Empty state: no match for the search / filters ──────────── */}
      {projects.length > 0 && filtered.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-12 px-6 text-center">
          {/* Magnifier icon */}
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
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
            />
          </svg>
          <p className="text-sm text-muted">{t("noMatch")}</p>
          <button
            type="button"
            onClick={() => { setQ(""); setActive("All"); }}
            className="mt-4 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
          >
            {t("resetFilters")}
          </button>
        </div>
      )}
    </div>
  );
}
