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
import { scrollToAnchorWhenStable, scrollToSection } from "@/lib/anchorScroll";
import { useTrack } from "@/app/[locale]/providers";
import { routing, type AppLocale } from "@/i18n/routing";
import { GITHUB_URL } from "@/lib/social";
import { BOOKING_URL } from "@/lib/booking";
import usePlatformShortcut from "@/lib/usePlatformShortcut";
import { openCommandPalette } from "@/lib/commandPaletteEvents";

/** Small ⌘K / Ctrl K button that opens the command palette. */
function CommandPaletteTrigger() {
  // Translated label; the shortcut shown matches the platform (⌘K on Apple,
  // Ctrl K elsewhere — see lib/usePlatformShortcut.ts).
  const t = useTranslations("commandPalette");
  const shortcut = usePlatformShortcut();
  return (
    <button
      type="button"
      aria-label={t("open", { shortcut })}
      onClick={openCommandPalette}
      // Shown where there is room: below xl (hamburger layout, touch screens)
      // and from 1850px. Hidden in between, where the desktop nav has no spare
      // width; those screens have a keyboard anyway.
      className="inline-flex xl:hidden min-[1850px]:inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1.5 text-xs text-muted-2 hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
    >
      <span aria-hidden="true">{shortcut}</span>
    </button>
  );
}

const SECTION_IDS = ["skills","experience","services","testimonials","projects","blog","contact"] as const;
// workWithMe (recruiter summary page) is listed in the mobile menu only.
const PAGE_IDS = ["about","hybrid","certifications","resources","workWithMe"] as const;
type NavId = (typeof SECTION_IDS)[number] | (typeof PAGE_IDS)[number];

const MENU_ID = "mobile-menu";
const BRAND_INITIALS = (process.env.NEXT_PUBLIC_BRAND_INITIALS || "A").toUpperCase();

// Items shown in the desktop nav. "hybrid" takes the slot of "resources":
// showing both overflows the nav. /resources stays reachable from the mobile
// menu, the command palette and the footer.
const DESKTOP_IDS_STATIC = new Set(["about", "hybrid", "skills", "experience", "certifications", "services", "testimonials", "projects", "blog", "contact"]);

// Accent for the "Hybrid profile" link, the most prominent nav entry. Same
// cyan→violet gradient as the /hybride page (the two tracks combined).
const HYBRID_ACCENT =
  "font-semibold bg-linear-to-r from-cyan-600 to-violet-600 dark:from-cyan-300 dark:to-violet-300 bg-clip-text text-transparent";

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

  // Projects dropdown follows the active track, capped at 6 entries.
  const trackFeaturedProjects = useMemo(
    () => featuredProjects.filter((p) => p.track === track).slice(0, 6),
    [featuredProjects, track]
  );

  const pathname = usePathname();
  const locale = (pathname.split("/")[1] || routing.defaultLocale) as AppLocale;
  const [avatarSrc, setAvatarSrc] = useState<string | null>(process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp");

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const showTestimonials = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === "true";
  const spyActiveId = useActiveSection(
    isHome ? SECTION_IDS.filter((id) => id !== "testimonials" || showTestimonials) : []
  );

  // null on pages without a nav entry (status, colophon, legal…), so no item
  // gets a wrong aria-current="page".
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
              : pathname.startsWith(`/${locale}/work-with-me`)
                ? "workWithMe"
                : null;

  const activeId = isHome ? spyActiveId : routeActiveId;

  // Sections missing from the desktop nav map to the closest preceding visible
  // item, so the pill always sits on something visible.
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

  // Home only: keep the URL hash in sync with the visible section.
  useHashSync(isHome ? spyActiveId : "");

  // Scroll to the hash target after a cross-page navigation (e.g. /about →
  // /#contact) or a direct visit. See lib/anchorScroll.ts.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    return scrollToAnchorWhenStable(decodeURIComponent(hash));
  }, [pathname]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const projectsDropdownRef = useRef<HTMLDivElement | null>(null);
  const projectsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const projectsMenuRef = useRef<HTMLDivElement | null>(null);
  // Fixed position of the portalled Projects menu (see the effect below).
  const [projectsMenuPos, setProjectsMenuPos] = useState<{ top: number; left: number } | null>(null);
  // Keyboard support for the Projects menu (WAI-ARIA menu button pattern).
  // The menu is portalled to the end of <body>, outside the tab order, so
  // focus moves into it on open and ↑/↓/Home/End/Tab are handled here
  // (Escape in the effect below). "last" when opened with ↑, else "first".
  const projectsFocusOnOpenRef = useRef<"first" | "last">("first");

  const focusProjectsMenuItem = (target: "first" | "last" | "next" | "prev") => {
    const items = Array.from(
      projectsMenuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    );
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLElement);
    const index =
      target === "first" ? 0
      : target === "last" ? items.length - 1
      : target === "next" ? (current + 1) % items.length
      : (current - 1 + items.length) % items.length;
    // preventScroll: any scroll closes the menu (see below).
    items[index].focus({ preventScroll: true });
  };

  const onProjectsTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      projectsFocusOnOpenRef.current = e.key === "ArrowUp" ? "last" : "first";
      if (projectsDropdownOpen) focusProjectsMenuItem(projectsFocusOnOpenRef.current);
      else setProjectsDropdownOpen(true);
    } else if (e.key === "Enter" || e.key === " ") {
      // The native click toggles the menu; only set where focus goes.
      projectsFocusOnOpenRef.current = "first";
    }
  };

  const onProjectsMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); focusProjectsMenuItem("next"); break;
      case "ArrowUp":   e.preventDefault(); focusProjectsMenuItem("prev"); break;
      case "Home":      e.preventDefault(); focusProjectsMenuItem("first"); break;
      case "End":       e.preventDefault(); focusProjectsMenuItem("last"); break;
      case "Tab":
        // The menu lives at the end of the document: close it and return
        // focus to the trigger so tabbing continues from the nav.
        e.preventDefault();
        setProjectsDropdownOpen(false);
        projectsTriggerRef.current?.focus();
        break;
    }
  };

  // #desktop-nav scrolls horizontally with a hidden scrollbar, so overflowing
  // items would be invisible. Chevrons (plus a fade) appear on the side that
  // has hidden content, and the mouse wheel scrolls horizontally on hover.
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

    // The first measurement is taken before the other header controls mount
    // and claim their width, and ResizeObserver alone misses it. Re-measure
    // once fonts load and after two short delays.
    document.fonts?.ready?.then(updateNavOverflow);
    const t1 = setTimeout(updateNavOverflow, 150);
    const t2 = setTimeout(updateNavOverflow, 600);

    const onWheel = (e: WheelEvent) => {
      // Only hijack the wheel when there is something to scroll horizontally.
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
  }, [locale, securityClusterCount, featuredProjects]);

  const scrollNavBy = (delta: number) => {
    // Instant scroll: smooth scrolling never completes in some automated
    // browsers, leaving the button inert.
    desktopNavRef.current?.scrollBy({ left: delta });
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  // Mobile menu: Escape closes it, Tab is trapped inside, page scroll is locked.
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

  // Set once the menu has been opened, so focus is not pulled to the menu
  // button on first render (which would bypass the skip link).
  const mobileWasOpenRef = useRef(false);
  // Set when a section link closes the menu: focus goes to that section
  // instead of back to the menu button.
  const mobileSkipFocusRestoreRef = useRef(false);
  useEffect(() => {
    if (mobileOpen) {
      mobileWasOpenRef.current = true;
      // Focus the first focusable element inside the menu.
      setTimeout(() => {
        const container = menuRef.current;
        const first = container?.querySelector<HTMLElement>('a[href], button:not([disabled])');
        first?.focus();
      }, 0);
    } else if (mobileWasOpenRef.current) {
      // Return focus to the menu button on close.
      mobileWasOpenRef.current = false;
      if (mobileSkipFocusRestoreRef.current) mobileSkipFocusRestoreRef.current = false;
      else menuButtonRef.current?.focus();
    }
  }, [mobileOpen]);

  // The Projects menu is portalled to document.body: #desktop-nav has
  // overflow-x: auto, which forces overflow-y to clip too, so an absolutely
  // positioned menu inside it would be invisible. It is placed with `fixed`
  // from the trigger's bounding rect.
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
    // A scroll or resize would detach the fixed menu from its trigger; closing
    // it is simpler than tracking the position.
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

  // Move focus into the Projects menu once it is positioned, then reset the
  // target to "first" for the next opening.
  useEffect(() => {
    if (!projectsDropdownOpen || !projectsMenuPos) return;
    focusProjectsMenuItem(projectsFocusOnOpenRef.current);
    projectsFocusOnOpenRef.current = "first";
    // focusProjectsMenuItem only reads refs, so it is not a dependency.
  }, [projectsDropdownOpen, projectsMenuPos]);

  // Entries that open a separate page (not a home anchor) get a ↗ badge.
  const PAGE_LINKS = new Set<string>(["about", "hybrid", "certifications", "resources", "workWithMe", "blog", "projects"]);

  // Compact padding and font size up to 1850px: French and Spanish labels are
  // longer and would overflow. 1850px is where everything fits once the
  // brand tagline and the ⌘K button reappear.
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
    if (id === "workWithMe") return `/${locale}/work-with-me`;
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
    { id: "workWithMe", label: t("nav.workWithMe") },
    { id: "services", label: t("nav.services") },
    ...(showTestimonials ? [{ id: "testimonials" as NavId, label: t("nav.testimonials") }] : []),
    { id: "projects", label: t("nav.projects") },
    { id: "blog", label: t("nav.blog") },
    { id: "contact", label: t("nav.contact") }
  ];

  const DESKTOP_IDS = DESKTOP_IDS_STATIC;
  const desktopSections = sections.filter((s) => DESKTOP_IDS.has(s.id));

  return (
    <>
      <ScrollProgress />

      <header
        className="fixed inset-x-0 top-0 z-50 h-(--nav-h) border-b border-black/10 bg-white/70 backdrop-blur-sm dark:border-white/10 dark:bg-[#070B1A]/70"
      >
        {/*
          Brand on the left, nav in the middle (flex-1, min-w-0), controls on
          the right. The header is wider than <main> so large screens give the
          nav more room.
        */}
        <div className="mx-auto flex h-full max-w-[1780px] items-center gap-3 px-4 lg:px-4 min-[1850px]:px-6">
          <Link
            href={`/${locale}`}
            className={`flex shrink-0 items-center gap-3 rounded-2xl border px-2.5 py-1.5 -mx-2.5 -my-1.5 transition-colors soft-ring ${
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
            {/* Brand text: hidden from xl to 1850px to leave room for the nav. */}
            <div className="hidden sm:block xl:hidden min-[1850px]:block leading-tight">
              <div className="text-sm font-semibold">Aïcha Imène DAHOUMANE</div>
              <div className="text-xs text-muted-2">{t("nav.tagline")}</div>
            </div>
          </Link>

          {/* Desktop nav from xl; the hamburger menu takes over below.
              `relative` anchors the scroll chevrons. */}
          <div className="hidden xl:flex relative flex-1 min-w-0 items-center justify-center">
            {/* Left fade + chevron, shown only when items are hidden on the left.
                The fade makes the hidden content noticeable; it sits under the
                chevron (z-10 vs z-20). */}
            {navOverflow.left && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 z-10 h-11 w-12 bg-linear-to-r from-white/95 dark:from-[#070B1A]/95 to-transparent"
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
                         [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
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
                        aria-haspopup="menu"
                        aria-controls={projectsDropdownOpen ? "projects-menu" : undefined}
                        onClick={() => setProjectsDropdownOpen((v) => !v)}
                        onKeyDown={onProjectsTriggerKeyDown}
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
                          id="projects-menu"
                          role="menu"
                          aria-label={s.label}
                          onKeyDown={onProjectsMenuKeyDown}
                          style={{ top: projectsMenuPos.top, left: projectsMenuPos.left }}
                          className="fixed w-72 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D1426] shadow-xl py-2 z-60"
                        >
                          {trackFeaturedProjects.length > 0 && (
                            <>
                              {trackFeaturedProjects.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={`/${locale}/projects/${p.slug}`}
                                  role="menuitem"
                                  tabIndex={-1}
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
                            tabIndex={-1}
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            onClick={() => setProjectsDropdownOpen(false)}
                          >
                            {t("nav.securityClusterLink", { count: securityClusterCount })}
                          </Link>
                          <div className="my-1 border-t border-black/10 dark:border-white/10" />
                          <Link
                            href={`/${locale}/projects`}
                            role="menuitem"
                            tabIndex={-1}
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

                // Links to separate pages
                if (isPageLink) {
                  return (
                    <Link key={s.id} className={cls} data-section={s.id} href={href}
                      aria-current={activeId === s.id ? "page" : undefined}>
                      {s.id === "hybrid" ? <span className={HYBRID_ACCENT}>{s.label}</span> : s.label}{pageIcon}
                    </Link>
                  );
                }

                // Section links: on the home page, scroll in place (and move focus).
                return (
                  <a key={s.id} className={cls} data-section={s.id}
                    href={isHome ? `#${s.id}` : `/${locale}/#${s.id}`}
                    aria-current={activeId === s.id ? "page" : undefined}
                    onClick={(e) => {
                      if (isHome) {
                        e.preventDefault();
                        scrollToSection(s.id);
                      }
                    }}>
                    {s.label}
                  </a>
                );
              })}
            </div>
            {/* Right fade + chevron, same as on the left. */}
            {navOverflow.right && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 z-10 h-11 w-12 bg-linear-to-l from-white/95 dark:from-[#070B1A]/95 to-transparent"
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

          <div className="flex shrink-0 items-center gap-2 min-[1850px]:gap-3">
            {/*
              Desktop / tablet controls. On very small screens they move into the
              mobile drawer. Tighter gap up to 1850px to leave room for the nav.
            */}
            <div className="hidden sm:flex items-center gap-2 min-[1850px]:gap-3">
              <TrackToggle />
              <ThemeToggle />
              <LocaleSwitcher current={locale} />
              <CommandPaletteTrigger />
            </div>

            {/* Hamburger button, below xl */}
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

      {/* Mobile drawer: always in the DOM, shown and hidden with CSS
          transitions (no animation library). When closed it is inert and
          aria-hidden. */}
      <div
        className={`fixed inset-0 z-80 xl:hidden transition-opacity duration-200 ease-out ${
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
            {/* Drawer header, always visible */}
            <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-0">
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

            {/* Scrollable area: controls, links and CTAs */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 pt-5">

            {/* Controls on mobile (track / theme / language) */}
            <div className="rounded-2xl border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <TrackToggle />
                <ThemeToggle />
                <LocaleSwitcher current={locale} />
              </div>
              {/* Command palette entry for touch devices */}
              <button
                type="button"
                onClick={() => { setMobileOpen(false); openCommandPalette(); }}
                className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10 soft-ring"
              >
                {t("commandPalette.title")}
              </button>
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

                // Links to separate pages
                if (isPageLink) {
                  return (
                    <Link key={s.id} href={hrefFor(s.id)} data-section={s.id}
                      className={cls} onClick={() => setMobileOpen(false)}
                      aria-current={activeId === s.id ? "page" : undefined}>
                      {s.id === "hybrid" ? <span className={HYBRID_ACCENT}>{s.label}</span> : s.label}{pageIcon}
                    </Link>
                  );
                }

                // Section links: close the drawer and scroll in place on the home page
                return (
                  <a key={s.id} data-section={s.id} className={cls}
                    href={isHome ? `#${s.id}` : `/${locale}/#${s.id}`}
                    onClick={(e) => {
                      if (isHome) {
                        e.preventDefault();
                        // Focus goes to the section, not back to the menu button.
                        mobileSkipFocusRestoreRef.current = true;
                        scrollToSection(s.id);
                      }
                      setMobileOpen(false);
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
                  className={`inline-flex w-full justify-center rounded-xl px-5 py-3 text-sm font-medium text-black hover:opacity-90 soft-ring ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("cta.workWithMe")}
                </Link>

                {/* Booking link (lib/booking.ts), hidden when not configured */}
                {BOOKING_URL && (
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("contact.bookCall")} (${t("contact.opensInNewTab")})`}
                    className="inline-flex w-full justify-center rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("contact.bookCall")}
                  </a>
                )}
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
            </div>{/* end scrollable area */}
          </div>
      </div>
    </>
  );
}
