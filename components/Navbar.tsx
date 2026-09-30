"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import LocaleSwitcher from "./LocaleSwitcher";
import NavbarPill from "./NavbarPill";
import ScrollProgress from "./ScrollProgress";
import ThemeToggle from "./ThemeToggle";
import TrackToggle from "./TrackToggle";
import useActiveSection from "./useActiveSection";
import useHashSync from "./useHashSync";
import { useTrack } from "@/app/[locale]/providers";
import { routing, type AppLocale } from "@/i18n/routing";
import { GITHUB_URL } from "@/lib/social";

/** Petit bouton discret ⌘K pour rappeler le raccourci palette de commandes. */
function CommandPaletteTrigger() {
  return (
    <button
      type="button"
      aria-label="Open command palette (⌘K)"
      onClick={() => {
        // Simule le raccourci clavier pour ouvrir la palette
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
      }}
      // Repoussé de 2xl à 1850px avec le reste du relâchement d'espacement du
      // header (audit 2026-08-13, itération 4) — voir desktopLinkClass.
      className="hidden min-[1850px]:inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1.5 text-xs text-muted-2 hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
    >
      <span>⌘K</span>
    </button>
  );
}

const SECTION_IDS = ["skills","experience","services","testimonials","projects","blog","contact"] as const;
const PAGE_IDS = ["about","hybrid","certifications","resources"] as const;
type NavId = (typeof SECTION_IDS)[number] | (typeof PAGE_IDS)[number];

const MENU_ID = "mobile-menu";
const BRAND_INITIALS = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();

// IDs visibles dans le desktop nav — défini au niveau module pour être accessible
// depuis le mapToDesktopId et depuis DESKTOP_IDS dans le composant.
// "hybrid" (page /hybride) REMPLACE "resources" depuis l'audit de contenu du
// 2026-09-25 : /hybride est la page la plus différenciante pour un recruteur,
// /resources la moins utile. Les AJOUTER toutes les deux recréait un débordement
// du nav scrollable (+111px à 1280px, +137px à 1920px) ; l'échange à nombre
// d'items constant n'ajoute que l'écart de longueur des libellés. /resources
// reste accessible via le menu mobile, la palette ⌘K et le pied de page.
const DESKTOP_IDS_STATIC = new Set(["about", "hybrid", "skills", "experience", "certifications", "services", "testimonials", "projects", "blog", "contact"]);

type FeaturedProjectForNav = { slug: string; title: string; track: string | null };

export default function Navbar({
  featuredProjects = [],
  securityClusterCount = 0,
}: {
  featuredProjects?: FeaturedProjectForNav[];
  securityClusterCount?: number;
}) {
  const t = useTranslations();
  const { track } = useTrack();

  // Filtered by the active track, not the raw fetch order — otherwise the dropdown
  // mixes Salesforce/IT Ops items regardless of the toggle, which is the exact
  // inconsistency flagged in the audit (a toggle that only affects the hero, not
  // the one nav element that already carries per-project track data). Capped at 6,
  // matching the original dropdown size before this became track-aware.
  const trackFeaturedProjects = useMemo(
    () => featuredProjects.filter((p) => p.track === track).slice(0, 6),
    [featuredProjects, track]
  );

  const pathname = usePathname();
  // Was cast to "en" | "fr" only, missing "es" — i18n/routing.ts has supported
  // 3 locales all along, so the runtime value could already be "es" here
  // (harmless in template strings, but the type lied about it). AppLocale is
  // the single source of truth for the locale union, shared with routing/middleware.
  const locale = (pathname.split("/")[1] || routing.defaultLocale) as AppLocale;
  const [avatarSrc, setAvatarSrc] = useState<string | null>(process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp");

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const showTestimonials = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "true";
  const spyActiveId = useActiveSection(
    isHome ? SECTION_IDS.filter((id) => id !== "testimonials" || showTestimonials) : []
  );

  // null pour les pages non mappées dans la nav (status, colophon, legal, uses…)
  // Évite un faux aria-current="page" sur "Compétences" par défaut.
  const routeActiveId: NavId | null = pathname.startsWith(`/${locale}/blog`)
    ? "blog"
    : pathname.startsWith(`/${locale}/projects`)
      ? "projects"
      : pathname.startsWith(`/${locale}/about`)
        ? "about"
        : pathname.startsWith(`/${locale}/hybride`)
          ? "hybrid"
          : pathname.startsWith(`/${locale}/certifications`)
            ? "certifications"
            : pathname.startsWith(`/${locale}/resources`)
              ? "resources"
              : null;

  const activeId = isHome ? spyActiveId : routeActiveId;

  // Desktop nav : mappe les sections non affichées (experience, services, blog…)
  // vers la section desktop précédente la plus proche, pour que la pill reste
  // toujours ancrée sur un item visible. Sur les pages non mappées (activeId null),
  // aucun item n'est mis en évidence.
  const SECTION_ORDER = [...SECTION_IDS] as string[];
  const desktopActiveId: string = (() => {
    if (activeId === null) return "";
    const id = activeId;
    if (DESKTOP_IDS_STATIC.has(id)) return id;
    const idx = SECTION_ORDER.indexOf(id);
    if (idx === -1) return "";
    for (let i = idx - 1; i >= 0; i--) {
      if (DESKTOP_IDS_STATIC.has(SECTION_ORDER[i])) return SECTION_ORDER[i];
    }
    return "";
  })();

  // Hash sync actif sur la home uniquement — l'URL reflète la section visible au scroll.
  useHashSync(isHome ? spyActiveId : "");

  // Scroll vers l'ancre après navigation cross-page (ex: /about → /#projects).
  // router.push avec scroll:false ne déclenche pas le scroll natif du navigateur
  // dans les SPAs — on le fait manuellement après que la page est rendue.
  // Retry toutes les 150 ms (max 20 tentatives ≈ 3 s) pour attendre que les
  // sections dynamiques (Supabase / Suspense) soient montées dans le DOM.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let attempts = 0;
    const MAX = 20;
    let timer: ReturnType<typeof setTimeout>;

    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < MAX) {
        attempts++;
        timer = setTimeout(tryScroll, 150);
      }
    };

    // Premier essai après 100 ms (laisse le temps au premier render)
    timer = setTimeout(tryScroll, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const projectsDropdownRef = useRef<HTMLDivElement | null>(null);
  const projectsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const projectsMenuRef = useRef<HTMLDivElement | null>(null);
  // Position calculée du menu Projets — voir le useEffect plus bas pour le pourquoi
  // (portail hors de #desktop-nav, qui clippe verticalement le menu en position absolute).
  const [projectsMenuPos, setProjectsMenuPos] = useState<{ top: number; left: number } | null>(null);

  // Débordement du nav desktop — voir audit 2026-08-13 : #desktop-nav est
  // overflow-x-auto avec scrollbar masquée ([scrollbar-width:none]), ce qui
  // veut dire qu'un contenu débordant (mesuré : ~1011px de contenu pour
  // ~512px de large sur un des viewports testés, autour du seuil xl=1280px)
  // était invisible ET indétectable — pas de scrollbar, pas de dégradé, pas
  // de molette (le scroll vertical natif ne redirige pas vers le scroll
  // horizontal d'un conteneur overflow-x-auto). Résultat : Projets/Blog/
  // Contact/Cluster Sécurité pouvaient être hors champ sans aucun indice.
  // Fix : boutons chevron visibles uniquement quand il y a réellement du
  // contenu cliqué hors champ de ce côté, + molette redirigée en scroll
  // horizontal pendant le survol.
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const [navOverflow, setNavOverflow] = useState({ left: false, right: false });

  const updateNavOverflow = () => {
    const el = desktopNavRef.current;
    if (!el) return;
    setNavOverflow({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    const el = desktopNavRef.current;
    if (!el) return;

    updateNavOverflow();

    // Débordement non détecté au premier rendu (audit 2026-08-13, itération 3) :
    // vérifié en prod par instrumentation directe — au tout premier paint,
    // #desktop-nav mesure clientWidth === scrollWidth (pas de débordement),
    // puis clientWidth rétrécit de plusieurs dizaines de px dans les instants
    // qui suivent pendant que les autres contrôles du header (toggle track,
    // thème, sélecteur de langue — plusieurs ont leurs propres gardes
    // `mounted` post-hydratation pour éviter un mismatch SSR/client) montent
    // et réclament leur espace flex. Un simple `window.dispatchEvent(new
    // Event("resize"))` recalcule correctement et fait apparaître le chevron
    // — la logique elle-même est juste, seul le calcul initial est pris trop
    // tôt. `ResizeObserver` sur #desktop-nav n'a pas suffi à rattraper ce cas
    // en pratique ; on ajoute donc des recalculs différés (charge des polices
    // + deux délais courts) en filet de sécurité pendant que le reste du
    // header finit de se stabiliser après hydratation.
    document.fonts?.ready?.then(updateNavOverflow);
    const t1 = setTimeout(updateNavOverflow, 150);
    const t2 = setTimeout(updateNavOverflow, 600);

    const onWheel = (e: WheelEvent) => {
      // Ne redirige que si le conteneur a réellement quelque chose à défiler
      // horizontalement — sinon on casse le scroll vertical de la page pour rien.
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    const ro = new ResizeObserver(updateNavOverflow);
    ro.observe(el);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", updateNavOverflow, { passive: true });
    window.addEventListener("resize", updateNavOverflow);

    return () => {
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", updateNavOverflow);
      window.removeEventListener("resize", updateNavOverflow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, securityClusterCount, featuredProjects]);

  const scrollNavBy = (delta: number) => {
    // Pas de behavior:"smooth" — sur certains environnements (navigateurs
    // automatisés/CI notamment) l'animation ne se termine jamais et scrollLeft
    // reste bloqué à 0, ce qui a rendu le bouton silencieusement inopérant
    // pendant la vérification de ce correctif. Un scroll instantané est fiable
    // partout et reste un pattern courant pour ce type de chevrons de nav.
    desktopNavRef.current?.scrollBy({ left: delta });
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
// Single keydown handler: Escape closes menu + Tab focus-trap + scroll-lock.
  // Fusionné depuis deux useEffect distincts pour éviter le double listener keydown.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const container = menuRef.current;
      if (!container) return;

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

useEffect(() => {
  if (mobileOpen) {
    // Focus first focusable element inside menu on open.
    setTimeout(() => {
      const container = menuRef.current;
      const first = container?.querySelector<HTMLElement>('a[href], button:not([disabled])');
      first?.focus();
    }, 0);
  } else {
    // Restore focus to menu button on close.
    menuButtonRef.current?.focus();
  }
}, [mobileOpen]);

  // Menu Projets rendu en portail (voir plus bas) : #desktop-nav a overflow-x-auto,
  // ce qui force le navigateur à traiter overflow-y comme "auto" aussi (règle CSS
  // implicite — un seul axe ne peut pas rester "visible" si l'autre ne l'est pas).
  // Résultat en prod (audit temps réel 2026-08-13) : le menu déroulant "Projets"
  // s'ouvrait bien côté React (chevron, aria-expanded, items dans le DOM) mais
  // restait totalement invisible — entièrement clippé par la boîte de #desktop-nav
  // (h-11) puisqu'il dépasse en position absolute/top-full. Un simple overflow-y
  // explicite ne suffit pas à contourner cette règle CSS. Fix : sortir le menu de
  // l'arbre DOM de #desktop-nav via un portail vers document.body, positionné en
  // fixed à partir du rect du bouton déclencheur.
  useEffect(() => {
    if (!projectsDropdownOpen) return;

    const computePosition = () => {
      const trigger = projectsTriggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const MENU_WIDTH = 288; // w-72
      const MARGIN = 8;
      const left = Math.min(
        Math.max(rect.left + rect.width / 2 - MENU_WIDTH / 2, MARGIN),
        window.innerWidth - MENU_WIDTH - MARGIN
      );
      setProjectsMenuPos({ top: rect.bottom + MARGIN, left });
    };

    computePosition();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProjectsDropdownOpen(false);
        projectsTriggerRef.current?.focus();
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = projectsDropdownRef.current?.contains(target);
      const insideMenu = projectsMenuRef.current?.contains(target);
      if (!insideTrigger && !insideMenu) {
        setProjectsDropdownOpen(false);
      }
    };
    // Le menu est positionné en fixed à partir du rect du déclencheur — un scroll
    // ou un resize le désynchroniserait visuellement de son bouton. Le fermer est
    // plus simple et plus sûr qu'un recalcul en continu pour un menu de nav.
    const onScrollOrResize = () => setProjectsDropdownOpen(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("scroll", onScrollOrResize, { capture: true, passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("scroll", onScrollOrResize, { capture: true });
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [projectsDropdownOpen]);

// Entrées qui naviguent vers des pages dédiées (≠ ancres de la landing).
  // Elles reçoivent un badge ↗ pour signaler visuellement le changement de page.
  const PAGE_LINKS = new Set<string>(["about", "hybrid", "certifications", "resources", "blog", "projects"]);

  // Pour le desktop nav — suit desktopActiveId (sections hors-nav mappées vers la plus proche)
  // Padding/police réduits à xl (px-1, text-[13px] au lieu de px-2, text-sm) : les libellés
  // FR/ES sont plus longs qu'en anglais et débordaient le conteneur scrollable à 1280px
  // (ex: "Contact"/"Contacto" tronqué, ~32-48px de débordement mesuré) — voir audit.
  // Seuil d'élargissement repoussé de 2xl (1536px) à 1850px (itération 4) : le
  // relâchement pile à 2xl (padding + taille de texte qui grossissent en même
  // temps que ⌘K et le tagline de marque réapparaissent) recréait un pic de
  // débordement à 1536-1849px (jusqu'à 244px mesuré à 1536px pile) — pire que
  // sans aucun relâchement. Vérifié empiriquement : 0 débordement de 1280 à
  // 1849px avec ce seuil, ≤5px à 1920px une fois tout relâché ensemble.
  const desktopLinkClass = (id: string) =>
    `relative z-10 rounded-full px-1 min-[1850px]:px-3 py-2 text-[13px] min-[1850px]:text-sm leading-none transition-colors soft-ring ${
      desktopActiveId === id
        ? "text-cyan-700 dark:text-cyan-200"
        : "text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
    }`;

  const mobileLinkClass = (id: string) =>
    `block w-full rounded-xl px-4 py-3 text-left text-sm transition-colors soft-ring ${
      activeId === id
        ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
        : "text-slate-700 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10"
    }`;

  const hrefFor = (id: NavId): string => {
    if (id === "about") return `/${locale}/about`;
    if (id === "hybrid") return `/${locale}/hybride`;
    if (id === "certifications") return `/${locale}/certifications`;
    if (id === "resources") return `/${locale}/resources`;
    if (isHome) return `#${id}`;
    if (id === "blog") return `/${locale}/blog`;
    if (id === "projects") return `/${locale}/projects`;
    return `/${locale}/#${id}`;
  };

  const sections: { id: NavId; label: string }[] = [
    { id: "about", label: t("nav.about") },
    { id: "hybrid", label: t("nav.hybrid") },
    { id: "skills", label: t("nav.skills") },
    { id: "experience", label: t("nav.experience") },
    { id: "certifications", label: t("nav.certifications") },
    { id: "resources", label: t("nav.resources") },
    { id: "services", label: t("nav.services") },
    ...(showTestimonials ? [{ id: "testimonials" as NavId, label: t("nav.testimonials") }] : []),
    { id: "projects", label: t("nav.projects") },
    { id: "blog", label: t("nav.blog") },
    { id: "contact", label: t("nav.contact") }
  ];

  // Desktop nav : 9 items à xl (1280px) — About, Profil hybride, Compétences, Expérience, Certifications, Services, Projets, Blog, Contact.
  // Le conteneur est scrollable (overflow-x-auto) pour les écrans compacts.
  const DESKTOP_IDS = DESKTOP_IDS_STATIC;
  const desktopSections = sections.filter((s) => DESKTOP_IDS.has(s.id));

  return (
    <>
      <ScrollProgress />

      <header
        className="fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-[#070B1A]/70"
      >
        {/*
          Desktop layout (robust against truncation):
          - Left: brand
          - Center: menu (flex-1, min-w-0)
          - Right: toggles + CTA

          max-w élargi de 7xl (1280px) à 1600px (audit 2026-08-13, itération 4) :
          au-delà de 1280px de viewport, ce conteneur restait plafonné à 1280px
          quelle que soit la largeur d'écran réelle — un moniteur large n'apportait
          donc AUCUNE marge supplémentaire au nav, alors que ⌘K (dès 2xl=1536px) et
          le tagline de marque (masqué à xl, réaffiché à 2xl) réclament tous deux
          plus d'espace pile à ce seuil. Résultat mesuré en prod : le débordement
          était pire à 1920px (1011px de contenu pour 526px de large) qu'à 1280px,
          alors qu'un écran plus large devrait justement donner plus de place.
          `main` reste à max-w-6xl (1152px) — un header plus large que le corps de
          page est déjà le pattern existant du site (7xl vs 6xl), donc pas un
          changement visuel nouveau, juste un plafond relevé. */}
        <div className="mx-auto flex h-full max-w-[1780px] items-center gap-3 px-4 lg:px-4 min-[1850px]:px-6">
          <Link
            href={`/${locale}`}
            className={`flex flex-shrink-0 items-center gap-3 rounded-2xl border px-2.5 py-1.5 -mx-2.5 -my-1.5 transition-colors soft-ring ${
              track === "salesforce"
                ? "border-cyan-500/20 hover:bg-cyan-500/5 dark:hover:bg-cyan-400/5"
                : "border-violet-500/20 hover:bg-violet-500/5 dark:hover:bg-violet-400/5"
            }`}
            aria-label={t("nav.home")}
          >
            <div className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full font-semibold ${track === "salesforce" ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-200" : "bg-violet-500/15 text-violet-700 dark:text-violet-200"}`}>
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="40px"
                  className="object-cover object-top"
                  onError={() => setAvatarSrc(null)}
                />
              ) : (
                BRAND_INITIALS
              )}
            </div>
            {/* Texte du brand — masqué à xl pour libérer de l'espace au desktop nav.
                Réapparaît à 1850px plutôt que 2xl (1536px), même seuil que le
                reste du relâchement d'espacement du header — voir desktopLinkClass. */}
            <div className="hidden sm:block xl:hidden min-[1850px]:block leading-tight">
              <div className="text-sm font-semibold">Aïcha Imène DAHOUMANE</div>
              <div className="text-xs text-muted-2">{t("nav.tagline")}</div>
            </div>
          </Link>

          {/* Desktop nav — visible seulement à xl (≥1280px) pour éviter le débordement.
              En dessous de xl, le menu hamburger prend le relais.
              `relative` ajouté pour ancrer les boutons chevron de scroll (voir plus bas). */}
          <div className="hidden xl:flex relative flex-1 min-w-0 items-center justify-center">
            {/* Chevron gauche — visible seulement s'il y a du contenu défilé hors champ à gauche.
                Dégradé de fondu (audit 2026-08-13, itération 2) : le chevron seul, à 8x8px,
                s'est révélé trop discret en usage réel (repéré par l'utilisatrice elle-même
                sur le site de prod) — la moitié des items de nav (Services/Projets/Blog/
                Contact/Cluster Sécurité) pouvait rester hors champ sans qu'un visiteur ne le
                remarque. Le dégradé rend le "il y a plus de contenu ici" perceptible même
                sans regarder le petit bouton rond. z-10, sous le chevron (z-20). */}
            {navOverflow.left && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 z-10 h-11 w-12 bg-gradient-to-r from-white/95 dark:from-[#070B1A]/95 to-transparent"
              />
            )}
            {navOverflow.left && (
              <button
                type="button"
                onClick={() => scrollNavBy(-140)}
                aria-label={t("a11y.scrollNavLeft")}
                className="absolute left-0 z-20 grid h-8 w-8 place-items-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D1426] shadow-md hover:bg-black/5 dark:hover:bg-white/10 soft-ring"
              >
                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 1.5 3.5 5l3 3.5" />
                </svg>
              </button>
            )}
            <div
              id="desktop-nav"
              ref={desktopNavRef}
              className="relative flex h-11 max-w-full min-w-0 items-center gap-0 overflow-x-auto rounded-full px-1
                         [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <NavbarPill activeId={desktopActiveId} containerId="desktop-nav" />
              {desktopSections.map((s) => {
                // Projects: dropdown with featured projects + "see all" link
                if (s.id === "projects") {
                  return (
                    <div key="projects" className="relative" ref={projectsDropdownRef}>
                      <button
                        ref={projectsTriggerRef}
                        type="button"
                        data-section="projects"
                        aria-expanded={projectsDropdownOpen}
                        aria-haspopup="true"
                        onClick={() => setProjectsDropdownOpen((v) => !v)}
                        className={`${desktopLinkClass("projects")} whitespace-nowrap inline-flex items-center gap-1`}
                      >
                        {s.label}
                        <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                          className={`transition-transform duration-200 ${projectsDropdownOpen ? "rotate-180" : ""}`}>
                          <path d="M2 3.5 L5 6.5 L8 3.5" />
                        </svg>
                      </button>
                      {projectsDropdownOpen && projectsMenuPos && createPortal(
                        <div
                          ref={projectsMenuRef}
                          role="menu"
                          style={{ top: projectsMenuPos.top, left: projectsMenuPos.left }}
                          className="fixed w-72 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D1426] shadow-xl py-2 z-[60]"
                        >
                          {trackFeaturedProjects.length > 0 && (
                            <>
                              {trackFeaturedProjects.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/${locale}/projects/${p.slug}`}
                                  role="menuitem"
                                  className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                  onClick={() => setProjectsDropdownOpen(false)}
                                >
                                  <span className="truncate">{p.title}</span>
                                </Link>
                              ))}
                              <div className="my-1 border-t border-black/10 dark:border-white/10" />
                            </>
                          )}
                          <Link
                            href={`/${locale}/projects?tab=security`}
                            role="menuitem"
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            {t("nav.securityClusterLink", { count: securityClusterCount })}
                          </Link>
                          <div className="my-1 border-t border-black/10 dark:border-white/10" />
                          <Link
                            href={`/${locale}/projects`}
                            role="menuitem"
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-cyan-700 dark:text-cyan-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            {t("nav.seeAllProjects")}
                            <svg aria-hidden="true" width="9" height="9" viewBox="0 0 9 9" fill="none"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                              className="opacity-60">
                              <path d="M1.5 7.5 L7.5 1.5 M3 1.5 H7.5 V6" />
                            </svg>
                          </Link>
                        </div>,
                        document.body
                      )}
                    </div>
                  );
                }

                const href = hrefFor(s.id);
                const cls = `${desktopLinkClass(s.id)} whitespace-nowrap inline-flex items-center gap-1`;
                const isPageLink = PAGE_LINKS.has(s.id) && !(isHome && s.id === "blog");
                const pageIcon = isPageLink ? (
                  <svg aria-hidden="true" width="9" height="9" viewBox="0 0 9 9"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                    <title>{t("a11y.opensPage")}</title>
                    <path d="M1.5 7.5 L7.5 1.5 M3 1.5 H7.5 V6" />
                  </svg>
                ) : null;

                // Page links (About, Certifications) — navigation complète via Link
                if (isPageLink) {
                  return (
                    <Link key={s.id} className={cls} data-section={s.id} href={href}
                      aria-current={activeId === s.id ? "page" : undefined}>
                      {s.label}{pageIcon}
                    </Link>
                  );
                }

                // Section links — <a> natif + scrollIntoView sur la home pour
                // garantir le smooth scroll même si le navigateur l'ignore sur les ancres.
                return (
                  <a key={s.id} className={cls} data-section={s.id}
                    href={isHome ? `#${s.id}` : `/${locale}/#${s.id}`}
                    aria-current={activeId === s.id ? "page" : undefined}
                    onClick={(e) => {
                      if (isHome) {
                        e.preventDefault();
                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}>
                    {s.label}
                  </a>
                );
              })}
              {/* Cluster Sécurité — entrée de nav autonome, plus au 5e onglet d'un dropdown.
                  17 projets is_security=true à cheval sur les deux tracks : le sous-cluster
                  le plus dense du portfolio mérite mieux qu'un lien enterré (voir audit). */}
              <Link
                href={`/${locale}/projects?tab=security`}
                data-section="security-cluster"
                className="relative z-10 whitespace-nowrap rounded-full px-1 min-[1850px]:px-3 py-2 text-[13px] min-[1850px]:text-sm leading-none inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 transition-colors soft-ring"
              >
                {t("nav.securityClusterLink", { count: securityClusterCount })}
              </Link>
            </div>
            {/* Chevron droit — visible seulement s'il reste du contenu hors champ à droite.
                Voir le commentaire du chevron gauche : dégradé ajouté en itération 2 de
                l'audit 2026-08-13, le chevron seul ne suffisait pas comme affordance. */}
            {navOverflow.right && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 z-10 h-11 w-12 bg-gradient-to-l from-white/95 dark:from-[#070B1A]/95 to-transparent"
              />
            )}
            {navOverflow.right && (
              <button
                type="button"
                onClick={() => scrollNavBy(140)}
                aria-label={t("a11y.scrollNavRight")}
                className="absolute right-0 z-20 grid h-8 w-8 place-items-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D1426] shadow-md hover:bg-black/5 dark:hover:bg-white/10 soft-ring"
              >
                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 1.5 6.5 5l-3 3.5" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex flex-shrink-0 items-center gap-2 min-[1850px]:gap-3">
            {/*
              Desktop / tablet controls. On very small screens we move these into the mobile drawer
              to prevent them from being pushed out of view by the brand.
              gap resserré à xl (audit 2026-08-13, itération 4) : quelques px de
              marge en plus pour le nav central pile là où l'espace est le plus
              contraint (voir aussi LocaleSwitcher et le max-w du header).
            */}
            <div className="hidden sm:flex items-center gap-2 min-[1850px]:gap-3">
              <TrackToggle />
              <ThemeToggle />
              <LocaleSwitcher current={locale} />
              {/* Bouton ⌘K — ouvre la palette de commandes */}
              <CommandPaletteTrigger />
            </div>
            {/* CTA retiré de la navbar — présent dans le hero et le menu mobile.
                Évite le débordement des liens nav sur les écrans ≤1440px. */}


            {/* Bouton hamburger — visible jusqu'à xl, remplacé par le desktop nav à xl */}
            <button
              type="button"
              className="inline-flex xl:hidden rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
              ref={menuButtonRef}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? t("a11y.closeMenu") : t("a11y.openMenu")}
              aria-expanded={mobileOpen ? "true" : "false"}
              aria-controls={MENU_ID}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — toujours dans le DOM, affiché/masqué par CSS.
          pointer-events-none + aria-hidden quand fermé pour bloquer interaction
          et navigation clavier. Le panel slide depuis la droite (translate-x),
          le backdrop fade en opacity — aucune dépendance Framer Motion pour
          ne pas charger ~25 KB gzip sur toutes les pages. */}
      <div
        className={`fixed inset-0 z-[80] xl:hidden transition-opacity duration-200 ease-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
      >
          <button
            className="absolute inset-0 bg-black/40"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-[#070B1A] transition-transform duration-300 ease-out flex flex-col overflow-hidden ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
            id={MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menu")}
            ref={menuRef}>
            {/* En-tête fixe — toujours visible en haut du drawer */}
            <div className="flex flex-shrink-0 items-center justify-between px-5 pt-5 pb-0">
              <div className="text-sm font-semibold">{t("nav.menu")}</div>
              <button
                type="button"
                className="rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 soft-ring"
                onClick={() => setMobileOpen(false)}
                aria-label={t("a11y.closeMenu")}
              >
                ✕
              </button>
            </div>

            {/* Zone défilable — contient les contrôles, les liens et les CTAs */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 pt-5">

            {/* Controls on mobile (track / theme / language) */}
            <div className="rounded-2xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <TrackToggle />
                <ThemeToggle />
                <LocaleSwitcher current={locale} />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {sections.map((s) => {
                const cls = `${mobileLinkClass(s.id)} flex items-center justify-between`;
                const isPageLink = PAGE_LINKS.has(s.id) && !(isHome && (s.id === "blog" || s.id === "projects"));
                const pageIcon = isPageLink ? (
                  <svg aria-hidden="true" width="10" height="10" viewBox="0 0 9 9"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                    <path d="M1.5 7.5 L7.5 1.5 M3 1.5 H7.5 V6" />
                  </svg>
                ) : null;

                // Page links — navigation via Link
                if (isPageLink) {
                  return (
                    <Link key={s.id} href={hrefFor(s.id)} data-section={s.id}
                      className={cls} onClick={() => setMobileOpen(false)}
                      aria-current={activeId === s.id ? "page" : undefined}>
                      {s.label}{pageIcon}
                    </Link>
                  );
                }

                // Section links — <a> natif + fermeture du menu mobile + scrollIntoView
                return (
                  <a key={s.id} data-section={s.id} className={cls}
                    href={isHome ? `#${s.id}` : `/${locale}/#${s.id}`}
                    onClick={(e) => {
                      setMobileOpen(false);
                      if (isHome) {
                        e.preventDefault();
                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    aria-current={activeId === s.id ? "page" : undefined}>
                    {s.label}
                  </a>
                );
              })}
              <Link
                href={`/${locale}/projects?tab=security`}
                data-section="security-cluster"
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-amber-700 dark:text-amber-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors soft-ring"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.securityClusterLink", { count: securityClusterCount })}
              </Link>
            </div>

            <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/10">
              <div className="grid gap-2">
                <Link
                  href={hrefFor("contact")}
                  className={`inline-flex w-full justify-center rounded-xl px-5 py-3 text-sm font-medium text-black hover:opacity-90 soft-ring ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("cta.workWithMe")}
                </Link>

                <a
                  href={calendlyUrl || "#"}
                  target={calendlyUrl ? "_blank" : undefined}
                  rel={calendlyUrl ? "noreferrer" : undefined}
                  aria-disabled={!calendlyUrl ? true : undefined}
                  className={`inline-flex w-full justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring ${
                    calendlyUrl ? "" : "pointer-events-none opacity-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                  title={!calendlyUrl ? t("contact.bookCallMissing") : undefined}
                >
                  {t("contact.bookCall")}
                </a>
                {GITHUB_URL && (
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
                    onClick={() => setMobileOpen(false)}
                    aria-label="GitHub"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
            </div>{/* fin zone défilable */}
          </div>
      </div>
    </>
  );
}
