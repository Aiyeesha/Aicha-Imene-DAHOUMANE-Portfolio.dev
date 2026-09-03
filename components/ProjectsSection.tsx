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
import { useSearchParams } from "next/navigation";
import Reveal from "./Reveal";
import { GlowCard } from "./GlowCard";
import ProjectClientLogo from "./ProjectClientLogo";

// Project images are committed to the repo under /public/projects/<slug>/
// and served by Vercel's CDN (see lib/data/projectsSource.ts).
const STORAGE_CDN = "/projects";

// Wrapper avec fallback en cascade : gallery src → cover.webp → fond vide
// Nécessaire car les gallery JSON en base peuvent référencer d'anciens noms de fichiers
function CoverImage({ src, fallback, alt }: { src: string; fallback?: string; alt: string }) {
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
import { trackEvent } from "@/lib/analytics";
import { useTranslations } from "next-intl";
import { getBadgeClass, tBadge, tCategory, tTag } from "@/i18n/projectTaxonomy";
import type { ProjectWithAssets } from "@/lib/data/projectBySlug";

type ProjectsSectionProps = {
  locale?: "en" | "fr" | "es";
  projects: ProjectWithAssets[];
  /** Sur la page /projects, afficher aussi les projets featured (pas de FeaturedProjects au-dessus) */
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

  // ── Compteur de projets par track ────────────────────────────────
  const trackCounts = useMemo(() => ({
    salesforce: projects.filter((p) => p.track === "salesforce" && (includeFeatured || !p.featured)).length,
    itops:      projects.filter((p) => p.track === "itops"       && (includeFeatured || !p.featured)).length
  }), [projects, includeFeatured]);

  type ActiveTab = "all" | "salesforce" | "itops" | "bridge" | "security";

  // Onglet "Cross-domain" — projets is_bridge=true, indépendamment du track.
  // Sans lui, la seule façon de trouver ces projets était de connaître
  // l'existence du badge "Salesforce ⇄ Infra bridge" et de tomber dessus par
  // hasard dans l'onglet Salesforce ou IT Ops — pas de vitrine dédiée pour la
  // catégorie de preuve la plus rare du portfolio (voir FeaturedProjects.tsx
  // pour le même contournement sur la home).
  const bridgeCount = useMemo(
    () => projects.filter((p) => p.is_bridge && (includeFeatured || !p.featured)).length,
    [projects, includeFeatured]
  );

  // Onglet "Sécurité" — projets is_security=true, indépendamment du track
  // (même patron que "bridge" ci-dessus). Volontairement transversal plutôt
  // que rattaché au seul track IT Ops : Légarant-AXG (côté Salesforce) porte
  // aussi le flag, pour que ce filtre reste une preuve de croisement plutôt
  // qu'un 3e bucket isolé du narratif hybride.
  const securityCount = useMemo(
    () => projects.filter((p) => p.is_security && (includeFeatured || !p.featured)).length,
    [projects, includeFeatured]
  );

  // Ordre des onglets visibles — utilisé pour la navigation clavier (flèches/Home/End).
  const visibleTabs = useMemo<ActiveTab[]>(
    () => (includeFeatured ? ["all", "salesforce", "itops", "bridge", "security"] : ["salesforce", "itops"]),
    [includeFeatured]
  );

  // Onglet initial : un deep-link `?tab=…` gagne toujours (ex. /projects?tab=security
  // depuis la home ou la nav). Sinon, la page /projects s'aligne sur le track global
  // (cookie) au lieu d'ouvrir « Tous » — c'était l'incohérence relevée à l'audit :
  // le toggle du header ne pilotait ni cette page ni ses onglets. « Tous » reste à
  // un clic. Sur la home, même logique (track global).
  const tabParam = includeFeatured ? searchParams.get("tab") : null;
  const initialTab: ActiveTab =
    tabParam === "security" || tabParam === "bridge" || tabParam === "salesforce" || tabParam === "itops"
      ? tabParam
      : (track as ActiveTab);
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  // Sync onglet ↔ track global : quand le visiteur bascule le toggle du header
  // (contexte `track`) alors qu'il est sur /projects, l'onglet suit — mais
  // uniquement s'il est sur un onglet de parcours (salesforce/itops/all). Un
  // choix délibéré « Croisés » ou « Sécurité » n'est pas écrasé. Ne s'applique
  // que sur la page complète (includeFeatured) ; la home a déjà son propre
  // `handleTrackChange`. Suspendu quand un `?tab=` pilote l'onglet initial.
  // Pattern « ajuster un état quand une prop change » (React docs) plutôt qu'un
  // useEffect : réconciliation pendant le rendu via un state précédent.
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

  // ── Catégories disponibles pour l'onglet actif ───────────────────
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

  // Refs pour les boutons d'onglets (navigation au clavier ← →)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Changer de track en réinitialisant les filtres
  const handleTrackChange = (newTrack: "salesforce" | "itops") => {
    setTrack(newTrack);
    setActiveTab(newTrack);
    setActive("All");
    setQ("");
  };

  // Sélectionner l'onglet "Cross-domain" (ne touche pas au track global —
  // contrairement aux onglets Salesforce/IT Ops, celui-ci ne représente pas
  // une préférence de profil, juste un filtre d'affichage ponctuel).
  const handleBridgeTabSelect = () => {
    setActiveTab("bridge");
    setActive("All");
    setQ("");
  };

  // Sélectionner l'onglet "Sécurité" — même logique que "Cross-domain".
  const handleSecurityTabSelect = () => {
    setActiveTab("security");
    setActive("All");
    setQ("");
  };

  // Navigation clavier dans le tablist (APG pattern) — flèches, Home, End,
  // sur la liste ordonnée des onglets réellement affichés.
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

  // ── Filtrage : onglet + catégorie + recherche texte ───────────────
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
      {/* ── Onglets IT Ops / Salesforce avec compteur ───────────────
          Rendu comme vrais onglets ARIA pour une meilleure accessibilité.
          Le compteur (nombre de projets) est affiché dans un badge discret. */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div
          role="tablist"
          aria-label={locale === "fr" ? "Filtrer par parcours" : locale === "es" ? "Filtrar por trayectoria" : "Filter by track"}
          className="flex rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1"
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
                    : "bg-black/10 dark:bg-white/10 text-slate-600 dark:text-white/70"
                ].join(" ")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Note de cadrage — pourquoi IT Ops (30) dépasse largement Salesforce (9) ──
          Sans contexte, le ratio brut raconte l'histoire inverse du positionnement.
          Uniquement sur la page /projects complète (ce composant n'est monté que là). */}
      <div className="mb-6 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-4 py-3 text-sm text-muted">
        {locale === "fr"
          ? `Ce déséquilibre (${trackCounts.itops} IT Ops vs ${trackCounts.salesforce} Salesforce) reflète une contrainte de confidentialité, pas un écart de compétence : mon travail Salesforce en poste relève du secret professionnel et ne peut pas être publié tel quel — les projets IT Ops, très majoritairement personnels, n'ont pas cette contrainte.`
          : locale === "es"
          ? `Este desequilibrio (${trackCounts.itops} IT Ops frente a ${trackCounts.salesforce} Salesforce) refleja una restricción de confidencialidad, no una diferencia de nivel: mi trabajo Salesforce en el puesto está sujeto a confidencialidad con el cliente y no puede publicarse tal cual — los proyectos IT Ops, mayoritariamente personales, no tienen esa restricción.`
          : `This imbalance (${trackCounts.itops} IT Ops vs ${trackCounts.salesforce} Salesforce) reflects a confidentiality constraint, not a skill gap: my Salesforce work in post is bound by client confidentiality and can't be published as-is — the IT Ops projects, mostly personal, don't carry that constraint.`}
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

      {/* ── Empty state : Supabase indisponible ou aucun projet publié ──────────
          Cas distinct de "aucun résultat de recherche" (projects.length === 0).
          Affiché avant la grille pour ne pas rendre une grille vide. */}
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

      {/* ── Grille de projets ──────────────────────────────────── */}
      {projects.length > 0 && (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, idx) => (
          <Reveal key={p.slug} delayMs={Math.min(280, idx * 60)}>
            <GlowCard className="card overflow-hidden">
              {/* Image de couverture */}
              <div className="relative h-36 w-full bg-black/5 dark:bg-white/5">
                <CoverImage
                  src={p.gallery?.[0]?.src || `${STORAGE_CDN}/${p.slug}/cover.webp`}
                  fallback={`${STORAGE_CDN}/${p.slug}/cover.webp`}
                  alt={p.title}
                />
              </div>
              <div className="p-5">
              {/* En-tête : titre + badge */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.badge ? (
                  <span className={getBadgeClass(p.badge.tone)}>{tBadge(p.badge.label, locale)}</span>
                ) : null}
              </div>

              {/* Logo client — silencieux si absent, lazy (grille jusqu'à ~39 cartes) */}
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

              {/* Résumé */}
              <p className="mt-3 text-sm text-muted line-clamp-2">{p.summary}</p>

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
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
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
              </div>{/* /p-5 */}
            </GlowCard>
          </Reveal>
        ))}
      </div>
      )}
      {/* ── Empty state : aucun résultat pour la recherche / les filtres ──────────
          Cas distinct de "Supabase indisponible" (projects.length > 0 ici). */}
      {projects.length > 0 && filtered.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 py-12 px-6 text-center">
          {/* Icône loupe */}
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
