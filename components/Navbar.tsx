"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import LocaleSwitcher from "./LocaleSwitcher";
import NavbarPill from "./NavbarPill";
import ScrollProgress from "./ScrollProgress";
import ThemeToggle from "./ThemeToggle";
import TrackToggle from "./TrackToggle";
import useActiveSection from "./useActiveSection";
import useHashSync from "./useHashSync";

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
      className="hidden 2xl:inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1.5 text-xs text-muted-2 hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
    >
      <span>⌘K</span>
    </button>
  );
}

const SECTION_IDS = ["skills","experience","services","testimonials","projects","blog","contact"] as const;
const PAGE_IDS = ["about","certifications","resources"] as const;
type NavId = (typeof SECTION_IDS)[number] | (typeof PAGE_IDS)[number];

const MENU_ID = "mobile-menu";
const BRAND_INITIALS = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();

// IDs visibles dans le desktop nav — défini au niveau module pour être accessible
// depuis le mapToDesktopId et depuis DESKTOP_IDS dans le composant.
const DESKTOP_IDS_STATIC = new Set(["about", "skills", "experience", "certifications", "resources", "services", "testimonials", "projects", "blog", "contact"]);


export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = (pathname.split("/")[1] || "en") as "en" | "fr";

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const spyActiveId = useActiveSection(isHome ? [...SECTION_IDS] : []);

  // null pour les pages non mappées dans la nav (status, colophon, legal, uses…)
  // Évite un faux aria-current="page" sur "Compétences" par défaut.
  const routeActiveId: NavId | null = pathname.startsWith(`/${locale}/blog`)
    ? "blog"
    : pathname.startsWith(`/${locale}/projects`)
      ? "projects"
      : pathname.startsWith(`/${locale}/about`)
        ? "about"
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

  
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
// Close on Escape + prevent background scroll when menu is open
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
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
  // Focus management for mobile menu: trap focus when open and restore focus when closed.
  const onKeyDown = (e: KeyboardEvent) => {
    if (!mobileOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      // Close by clicking the menu button if present, so state stays consistent.
      menuButtonRef.current?.click();
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
  return () => document.removeEventListener("keydown", onKeyDown);
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
// Entrées qui naviguent vers des pages dédiées (≠ ancres de la landing).
  // Elles reçoivent un badge ↗ pour signaler visuellement le changement de page.
  const PAGE_LINKS = new Set<string>(["about", "certifications", "resources", "blog"]);

  // Pour le menu mobile — suit le scroll-spy complet
  const linkClass = (id: string) =>
    `relative z-10 rounded-full px-2 2xl:px-3 py-2 text-sm leading-none transition-colors soft-ring ${
      activeId === id
        ? "text-cyan-700 dark:text-cyan-200"
        : "text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
    }`;

  // Pour le desktop nav — suit desktopActiveId (sections hors-nav mappées vers la plus proche)
  const desktopLinkClass = (id: string) =>
    `relative z-10 rounded-full px-2 2xl:px-3 py-2 text-sm leading-none transition-colors soft-ring ${
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
    if (id === "certifications") return `/${locale}/certifications`;
    if (id === "resources") return `/${locale}/resources`;
    if (isHome) return `#${id}`;
    if (id === "blog") return `/${locale}/blog`;
    return `/${locale}/#${id}`;
  };

  const showTestimonials = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "true";

  const sections: { id: NavId; label: string }[] = [
    { id: "about", label: t("nav.about") },
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

  // Desktop nav : 9 items à xl (1280px) — About, Compétences, Expérience, Certifications, Ressources, Services, Projets, Blog, Contact.
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
        */}
        <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 lg:px-6">
          <Link
            href={`/${locale}`}
            className="flex flex-shrink-0 items-center gap-3 rounded-2xl soft-ring"
            aria-label={t("nav.home")}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-200 font-semibold">
              {BRAND_INITIALS}
            </div>
            {/* Texte du brand — masqué à xl pour libérer de l'espace au desktop nav (6 items) */}
            <div className="hidden sm:block xl:hidden 2xl:block leading-tight">
              <div className="text-sm font-semibold">Aïcha Imène DAHOUMANE</div>
              <div className="text-xs text-muted-2">{t("nav.tagline")}</div>
            </div>
          </Link>

          {/* Desktop nav — visible seulement à xl (≥1280px) pour éviter le débordement.
              En dessous de xl, le menu hamburger prend le relais. */}
          <div className="hidden xl:flex flex-1 min-w-0 items-center justify-center">
            <div
              id="desktop-nav"
              className="relative flex h-11 max-w-full min-w-0 items-center gap-0.5 overflow-x-auto rounded-full px-1
                         [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <NavbarPill activeId={desktopActiveId} containerId="desktop-nav" />
              {desktopSections.map((s) => {
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
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-3">
            {/*
              Desktop / tablet controls. On very small screens we move these into the mobile drawer
              to prevent them from being pushed out of view by the brand.
            */}
            <div className="hidden sm:flex items-center gap-3">
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
                const isPageLink = PAGE_LINKS.has(s.id) && !(isHome && s.id === "blog");
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
            </div>

            <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/10">
              <div className="grid gap-2">
                <Link
                  href={hrefFor("contact")}
                  className="inline-flex w-full justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-medium text-black hover:opacity-90 soft-ring"
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
              </div>
            </div>
            </div>{/* fin zone défilable */}
          </div>
      </div>
    </>
  );
}
