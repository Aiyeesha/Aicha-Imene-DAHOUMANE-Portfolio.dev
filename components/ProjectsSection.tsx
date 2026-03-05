"use client";

// ProjectsSection.tsx
// -------------------
// Section "Tous les projets" de la landing page.
// Améliorations BLOC 4 :
// - Onglets IT Ops / Salesforce avec compteur de projets par track
//   (plus visible qu'un simple toggle de texte)
// - Protection des liens "Voir le détail" :
//   si p.published === false, le lien est masqué (pas de page 404 en production)
// - Réinitialisation auto du filtre catégorie et de la recherche au changement de track

import { useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import Link from "next/link";
import { useTrack } from "@/app/[locale]/providers";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { useTranslations } from "next-intl";
import { tBadge, tCategory, tTag } from "@/i18n/projectTaxonomy";
import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

// Correspondance badge → classes Tailwind
const tones: Record<string, string> = {
  client: "badge badge-client",
  personal: "badge badge-personal",
  training: "badge badge-training"
};

type ProjectsSectionProps = {
  locale?: "en" | "fr";
  projects: ProjectWithAssets[];
};

export default function ProjectsSection({ locale: localeProp, projects }: ProjectsSectionProps) {
  const t = useTranslations("projects");
  const { track, setTrack } = useTrack();
  const pathname = usePathname();
  const pathnameLocale = pathname.split("/")[1];
  const locale: "en" | "fr" = localeProp ?? (pathnameLocale === "fr" ? "fr" : "en");

  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>("All");

  // ── Compteur de projets par track (non-featured uniquement) ──────
  const trackCounts = useMemo(() => ({
    salesforce: projects.filter((p) => p.track === "salesforce" && !p.featured).length,
    itops:      projects.filter((p) => p.track === "itops"       && !p.featured).length
  }), [projects]);

  // ── Catégories disponibles pour le track actif ───────────────────
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects
      .filter((p) => p.track === track && !p.featured)
      .forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [track, projects]);

  // Refs pour les boutons d'onglets (navigation au clavier ← →)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const TRACKS = ["salesforce", "itops"] as const;

  // Changer de track en réinitialisant les filtres
  const handleTrackChange = (newTrack: "salesforce" | "itops") => {
    setTrack(newTrack);
    setActive("All");
    setQ("");
  };

  // Navigation clavier dans le tablist (APG pattern)
  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let target = -1;
    if (e.key === "ArrowRight") target = (idx + 1) % TRACKS.length;
    else if (e.key === "ArrowLeft") target = (idx - 1 + TRACKS.length) % TRACKS.length;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = TRACKS.length - 1;
    if (target === -1) return;
    e.preventDefault();
    handleTrackChange(TRACKS[target]);
    tabRefs.current[target]?.focus();
  };

  // ── Filtrage : track + catégorie + recherche texte ───────────────
  const filtered = useMemo(() => {
    const base = projects.filter((p) => p.track === track && !p.featured);
    return base.filter((p) => {
      const inCat = active === "All" ? true : (p.categories ?? []).includes(active);
      const text = ((p.title ?? "") + " " + (p.summary ?? "") + " " + (p.tags ?? []).join(" ")).toLowerCase();
      const inQ  = q.trim() === "" ? true : text.includes(q.trim().toLowerCase());
      return inCat && inQ;
    });
  }, [track, active, q, projects]);

  return (
    <div>
      {/* ── Onglets IT Ops / Salesforce avec compteur ───────────────
          Rendu comme vrais onglets ARIA pour une meilleure accessibilité.
          Le compteur (nombre de projets) est affiché dans un badge discret. */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div
          role="tablist"
          aria-label={locale === "fr" ? "Filtrer par parcours" : "Filter by track"}
          className="flex rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1"
        >
          {TRACKS.map((tr, idx) => {
            const count = trackCounts[tr];
            const label = tr === "salesforce" ? "Salesforce" : "IT Ops";
            const isActive = track === tr;
            return (
              <button
                key={tr}
                ref={(el) => { tabRefs.current[idx] = el; }}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTrackChange(tr)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={[
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors soft-ring",
                  "inline-flex items-center gap-2",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-200"
                    : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
                ].join(" ")}
              >
                {label}
                {/* Badge compteur */}
                <span className={[
                  "rounded-full px-1.5 py-0.5 text-xs leading-none",
                  isActive
                    ? "bg-cyan-500/30 text-cyan-800 dark:text-cyan-100"
                    : "bg-black/10 dark:bg-white/10 text-slate-500 dark:text-white/50"
                ].join(" ")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Recherche full-text ─────────────────────────────────── */}
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
            outline-none placeholder:text-slate-400 hover:bg-black/10 focus:border-cyan-400/40 soft-ring
            dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:placeholder:text-white/40 dark:hover:bg-white/10"
        />
      </div>

      {/* ── Filtres par catégorie ───────────────────────────────── */}
      {categories.length > 1 && (
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
      )}

      {/* ── Grille de projets ──────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, idx) => (
          <Reveal key={p.slug} delayMs={Math.min(280, idx * 60)}>
            <div className="card p-5">
              {/* En-tête : titre + badge */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.badge ? (
                  <span className={tones[p.badge.tone]}>{tBadge(p.badge.label, locale)}</span>
                ) : null}
              </div>

              {/* Résumé */}
              <p className="mt-3 text-sm text-muted">{p.summary}</p>

              {/* Tags techniques */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(p.tags ?? []).map((tag) => (
                  <span key={tag} className="chip">{tTag(tag, locale)}</span>
                ))}
              </div>

              {/* Points clés (max 3) */}
              {p.highlights && p.highlights.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-muted">
                  {p.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="list-disc list-inside">{h}</li>
                  ))}
                </ul>
              )}

              {/* CTAs
                  Le lien "Voir le détail" est affiché pour tous les projets récupérés.
                  La couche data filtre déjà sur status = "published", donc tous les
                  projets présents ici ont une page de détail accessible. */}
              <div className="mt-5 flex items-center gap-2 flex-wrap">
                {p.status === "published" && (
                  <Link
                    href={`/${locale}/projects/${p.slug}`}
                    className="inline-flex items-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
                    onClick={() => trackEvent("project_view", { slug: p.slug, track: p.track ?? track })}
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
            </div>
          </Reveal>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">
          {locale === "fr"
            ? "Aucun projet ne correspond à votre recherche."
            : "No projects match your search."}
        </p>
      )}
    </div>
  );
}
