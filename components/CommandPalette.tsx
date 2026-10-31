"use client";

// CommandPalette.tsx
// ------------------
// ⌘K / Ctrl+K command palette, available on every page: jump to a section,
// open a page, switch track, theme or language, download the CV, open
// LinkedIn.

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import * as RadixDialog from "@radix-ui/react-dialog";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useTrack } from "@/app/[locale]/providers";
import { LINKEDIN_URL } from "@/lib/social";
import usePlatformShortcut from "@/lib/usePlatformShortcut";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/lib/commandPaletteEvents";
import { scrollToSection } from "@/lib/anchorScroll";
import { showTestimonials } from "@/content/testimonials";

// ── Styles injected once via <style> ─────────────────────────────────────────
// cmdk only accepts class names, so the overlay and panel are styled here.
const PALETTE_STYLES = `
  @keyframes cmdk-overlay-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes cmdk-panel-in {
    from { opacity: 0; transform: translateX(-50%) scale(0.96) translateY(-8px); }
    to   { opacity: 1; transform: translateX(-50%) scale(1)    translateY(0);    }
  }
  [cmdk-overlay] {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: cmdk-overlay-in 150ms ease;
  }
  [cmdk-dialog] {
    position: fixed;
    left: 50%;
    top: 20vh;
    z-index: 50;
    transform: translateX(-50%);
    width: min(90vw, 560px);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
    animation: cmdk-panel-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  [cmdk-input] {
    width: 100%;
    border: none;
    background: transparent;
    padding: 1rem 1.25rem;
    font-size: 0.9375rem;
    outline: none;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  [cmdk-list] {
    max-height: 340px;
    overflow-y: auto;
    padding: 0.5rem;
  }
  [cmdk-group-heading] {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    /* Keeps 4.5:1 contrast */
    opacity: 0.75;
    margin-top: 0.25rem;
  }
  [cmdk-item] {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    cursor: pointer;
    user-select: none;
    outline: none;
  }
  [cmdk-item][aria-selected="true"],
  [cmdk-item]:hover {
    background: rgba(34, 211, 238, 0.08);
  }
  [cmdk-empty] {
    padding: 2rem;
    text-align: center;
    font-size: 0.875rem;
    opacity: 0.45;
  }
  [cmdk-separator] {
    height: 1px;
    margin: 0.35rem 0;
    opacity: 0.07;
    background: currentColor;
  }
`;

// ── Lightweight inline icons ──────────────────────────────────────────────────
const Icon = ({ d }: { d: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    className="opacity-50 shrink-0">
    <path d={d} />
  </svg>
);

export default function CommandPalette({ defaultOpen = false }: { defaultOpen?: boolean }) {
  // defaultOpen: the palette is loaded on demand (CommandPaletteLoader) on the
  // first ⌘K / Ctrl K or button click, so it mounts already open.
  const [open, setOpen] = useState(defaultOpen);
  const { track, setTrack } = useTrack();
  const { setTheme, resolvedTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // ── ⌘K / Ctrl+K shortcut ──────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    // Nav button and mobile menu entry (no keyboard needed).
    const onOpenRequest = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpenRequest);
    };
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const run = (fn: () => void) => {
    setOpen(false);
    // Short delay so the palette visibly closes before the action
    setTimeout(fn, 60);
  };

  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const scrollTo = (id: string) => {
    if (onHome) {
      run(() => scrollToSection(id));
    } else {
      run(() => router.push(`/${locale}/#${id}`));
    }
  };

  const navigate = (href: string) => run(() => router.push(href));

  const cvUrl = (
    process.env.NEXT_PUBLIC_CV_PDF_URL ||
    process.env.NEXT_PUBLIC_CV_URL ||
    `/cv/Aicha-Imene-DAHOUMANE-CV-{locale}-{track}.pdf`
  ).replace("{locale}", locale).replace("{track}", track);

  const linkedInUrl = LINKEDIN_URL || "https://www.linkedin.com";

  // ── i18n labels ──────────────────────────────────────────────────────────────
  // `commandPalette` for palette-specific labels, `nav` for sections and pages,
  // so each entry has the same name everywhere.
  const t = useTranslations("commandPalette");
  const tNav = useTranslations("nav");
  const shortcut = usePlatformShortcut();
  const L = {
    title:       t("title"),
    placeholder: t("placeholder"),
    sections:    t("sections"),
    pages:       t("pages"),
    actions:     t("actions"),
    links:       t("links"),
    skills:      tNav("skills"),
    experience:  tNav("experience"),
    services:    tNav("services"),
    testimonials: tNav("testimonials"),
    projects:    tNav("projects"),
    blog:        tNav("blog"),
    contact:     tNav("contact"),
    about:       tNav("about"),
    certifications: tNav("certifications"),
    resources:   tNav("resources"),
    allProjects: t("allProjects"),
    workWithMe:  t("workWithMe"),
    hybride:     t("hybride"),
    blogAll:     t("blogAll"),
    uses:        t("uses"),
    colophon:    t("colophon"),
    legal:       t("legal"),
    privacy:     t("privacy"),
    accessibility: t("accessibility"),
    status:      t("status"),
    info:        t("info"),
    switchToSf:  t("switchToSf"),
    switchToOps: t("switchToOps"),
    lightMode:   t("lightMode"),
    darkMode:    t("darkMode"),
    downloadCv:  t("downloadCv"),
    linkedin:    t("linkedin"),
    noResults:   t("noResults"),
    switchLang:  t("switchLang"),
    shortcut:    t("close"),
    navigate:    t("navigate"),
    select:      t("select"),
    alsoShortcut: t("alsoShortcut", { shortcut }),
  };

  // ── Shared item class ────────────────────────────────────────────────────────
  const itemCls = "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm cursor-pointer outline-hidden";

  return (
    <>
      {/* cmdk styles, injected once */}
      <style>{PALETTE_STYLES}</style>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={L.title}
      >
        {/* Main panel */}
        <div className="bg-white dark:bg-[#0f1929] text-slate-900 dark:text-white">

          {/* Radix requires a DialogTitle for accessibility (visually hidden) */}
          <RadixDialog.Title className="sr-only">
            {L.title}
          </RadixDialog.Title>

          {/* Search input */}
          <Command.Input
            placeholder={L.placeholder}
            className="dark:placeholder:text-white/40 placeholder:text-slate-400 dark:text-white text-slate-900 border-b border-black/10 dark:border-white/10"
          />

          {/* Command list */}
          <Command.List>
            <Command.Empty>{L.noResults}</Command.Empty>

            {/* ── Sections (scroll to anchor) ─────────────────────────── */}
            <Command.Group heading={L.sections}>
              {[
                { id: "skills",      label: L.skills,      icon: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" },
                { id: "experience",  label: L.experience,  icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" },
                ...(showTestimonials
                  ? [{ id: "testimonials", label: L.testimonials, icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }]
                  : []),
                { id: "projects",    label: L.projects,    icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
                { id: "blog",        label: L.blog,        icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
                { id: "contact",     label: L.contact,     icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" },
              ].map(({ id, label, icon }) => (
                <Command.Item
                  key={id}
                  onSelect={() => scrollTo(id)}
                  className={itemCls}
                >
                  <Icon d={icon} />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator />

            {/* ── Pages ──────────────────────────────────────────────── */}
            <Command.Group heading={L.pages}>
              {[
                { href: `/${locale}/about`,           label: L.about,           icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
                { href: `/${locale}/certifications`,  label: L.certifications,  icon: "M12 15l8-8-3-3-5 5-2-2-3 3z M20 7l-8 8-4-4" },
                { href: `/${locale}/projects`,        label: L.allProjects,     icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
                { href: `/${locale}/resources`,       label: L.resources,        icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
                { href: `/${locale}/blog`,            label: L.blogAll,          icon: "M4 6h16M4 12h8m-8 6h16" },
                { href: `/${locale}/uses`,            label: L.uses, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                { href: `/${locale}/hybride`,         label: L.hybride,          icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
                { href: `/${locale}/work-with-me#services`, label: L.services, icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
                { href: `/${locale}/work-with-me`,   label: L.workWithMe,       icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                { href: `/${locale}/colophon`,        label: L.colophon,         icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
              ].map(({ href, label, icon }) => (
                <Command.Item
                  key={href}
                  onSelect={() => navigate(href)}
                  className={itemCls}
                >
                  <Icon d={icon} />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator />

            {/* ── Legal & info pages ──────────────────────────────────── */}
            <Command.Group heading={L.info}>
              {[
                { href: `/${locale}/status`,        label: L.status,        icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
                { href: `/${locale}/legal`,         label: L.legal,         icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
                { href: `/${locale}/privacy`,       label: L.privacy,       icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                { href: `/${locale}/accessibility`, label: L.accessibility, icon: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01" },
              ].map(({ href, label, icon }) => (
                <Command.Item
                  key={href}
                  onSelect={() => navigate(href)}
                  className={itemCls}
                >
                  <Icon d={icon} />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator />

            {/* ── Actions ────────────────────────────────────────────── */}
            <Command.Group heading={L.actions}>
              {/* Track switch: only the other track is offered */}
              {track !== "salesforce" && (
                <Command.Item onSelect={() => run(() => setTrack("salesforce"))} className={itemCls}>
                  <Icon d="M13 10V3L4 14h7v7l9-11h-7z" />
                  {L.switchToSf}
                </Command.Item>
              )}
              {track !== "itops" && (
                <Command.Item onSelect={() => run(() => setTrack("itops"))} className={itemCls}>
                  <Icon d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  {L.switchToOps}
                </Command.Item>
              )}

              {/* Theme */}
              <Command.Item
                onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
                className={itemCls}
              >
                <Icon d={resolvedTheme === "dark"
                  ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                  : "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                } />
                {resolvedTheme === "dark" ? L.lightMode : L.darkMode}
              </Command.Item>

              {/* Language */}
              <Command.Item
                // Stays on the current page
                onSelect={() => {
                  const next = locale === "fr" ? "en" : locale === "en" ? "es" : "fr";
                  navigate(`/${next}${pathname.replace(/^\/(en|fr|es)(?=\/|$)/, "")}`);
                }}
                className={itemCls}
              >
                <Icon d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13z" />
                {L.switchLang}
              </Command.Item>
            </Command.Group>

            <Command.Separator />

            {/* ── External links ──────────────────────────────────────── */}
            <Command.Group heading={L.links}>
              <Command.Item
                onSelect={() => run(() => {
                  const a = document.createElement("a");
                  a.href = cvUrl;
                  a.download = `Aicha-Imene-DAHOUMANE-CV-${locale}-${track}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                })}
                className={itemCls}
              >
                <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" />
                {L.downloadCv}
              </Command.Item>
              <Command.Item
                onSelect={() => run(() => window.open(linkedInUrl, "_blank", "noreferrer"))}
                className={itemCls}
              >
                <Icon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                {L.linkedin}
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer: keyboard legend */}
          <div className="border-t border-black/10 dark:border-white/10 px-4 py-2 flex items-center gap-4 text-xs text-slate-500 dark:text-white/40">
            <span><kbd className="font-mono">↑↓</kbd> {L.navigate}</span>
            <span><kbd className="font-mono">↵</kbd> {L.select}</span>
            <span><kbd className="font-mono">Esc</kbd> {L.shortcut}</span>
            <span className="ml-auto opacity-60">{L.alsoShortcut}</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
