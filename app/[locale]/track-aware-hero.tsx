"use client";

// track-aware-hero.tsx
// --------------------
// Hero: photo, title, tagline, proof tags and CTAs, in two variants
// (Salesforce / IT Ops).
//
// Animations are plain CSS:
//   - entrance: avatar then text (hero-avatar-in / hero-text-in, globals.css);
//   - track switch: CSS fade on the dynamic content;
//   - avatar parallax: small vertical shift over the first 400px of scroll
//     (passive listener + requestAnimationFrame);
//   - all disabled with prefers-reduced-motion.

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTrack } from "./providers";
import { TypingText } from "@/components/TypingText";
import BookingLink from "@/components/BookingLink";
// Availability badge: rendered on the server (part of the initial HTML);
// the modal content it opens is loaded on demand inside the component.
import AvailabilityModal from "@/components/AvailabilityModal";


// ── Entrance ────────────────────────────────────────────────────────────────
// The avatar keeps opacity 1 (LCP candidate, painted immediately) and only
// zooms slightly; the text block rises 18px without fading, so the H1 stays
// visible in the SSR HTML. Classes in app/globals.css.

export default function TrackAwareHero() {
  const t = useTranslations();
  const { track, setTrack } = useTrack();
  const locale = useLocale();

  // ── Fade on track switch only ─────────────────────────────────────────────
  // The fade starts at opacity 0: applied on first render, it would hide the
  // tagline (the mobile LCP element) until the animation runs, which a busy
  // main thread delays by seconds. It is only enabled once the track changes.
  const [trackSwitched, setTrackSwitched] = useState(false);
  const firstTrack = useRef(track);
  useEffect(() => {
    if (track !== firstTrack.current) setTrackSwitched(true);
  }, [track]);

  // ── Avatar parallax ────────────────────────────────────────────────────────
  // 0 → 400px of scroll moves the avatar 0 → -28px. Written straight to the
  // style (no re-render); off with prefers-reduced-motion.
  const parallaxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const y = -28 * Math.min(window.scrollY, 400) / 400;
      el.style.transform = `translateY(${y}px)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Avatar: env var or local image
  const avatarUrl = useMemo(
    () => process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp",
    []
  );
  const [src, setSrc] = useState<string>(avatarUrl);

  // Proof tags per track.
  const proofTags: { label: string; href?: string }[] =
    track === "salesforce"
      ? [
          { label: t("hero.proof1_salesforce") },
          { label: t("hero.proof2_salesforce") },
          { label: t("hero.proof3_salesforce") },
        ]
      : [
          { label: t("hero.proof1_itops") },
          { label: t("hero.proof2_itops") },
          { label: t("hero.proof3_itops") },
        ];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[260px_1fr]">
      {/* ── Column 1: avatar with gradient border ──────────────────────────── */}
      {/* Parallax on this container, entrance zoom on the child: two separate
          transforms that do not override each other. */}
      <div ref={parallaxRef} className="mx-auto lg:mx-0">
       <div className="hero-avatar-in">
        <div className={`rounded-2xl p-[3px] shadow-xl ${track === "salesforce" ? "bg-linear-to-br from-cyan-400 via-cyan-500 to-blue-600 shadow-cyan-500/20 dark:shadow-cyan-400/15" : "bg-linear-to-br from-violet-400 via-violet-500 to-purple-700 shadow-violet-500/20 dark:shadow-violet-400/15"}`}>
          <div className="relative h-[140px] w-[140px] sm:h-[240px] sm:w-[240px] overflow-hidden rounded-2xl bg-[#0d1b2e]">
            <Image
              src={src}
              alt={t("hero.avatar_alt")}
              fill
              priority
              sizes="(max-width: 639px) 140px, 240px"
              className="object-cover object-top"
              onError={() => setSrc("/avatar-placeholder.svg")}
            />
          </div>
        </div>
       </div>
      </div>

      {/* ── Column 2: text ───────────────────────────────────────────────────── */}
      <div className="hero-text-in">

        {/* Availability badge: opens the details modal */}
        <div className="mb-2">
          <AvailabilityModal />
        </div>

        {/* Certifications and diplomas, visible without a click (RNCP 6
            diploma, active Trailhead, dated upcoming certification). */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Link
            href={`/${locale}/certifications`}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs text-muted hover:bg-black/10 dark:hover:bg-white/10 transition-colors soft-ring"
          >
            🎓 {t("hero.credentialsSummary")}
          </Link>
          {/* Hybrid profile: neutral entry point to the page showing
              Salesforce + infrastructure + security combined, on both tracks. */}
          <Link
            href={`/${locale}/hybride`}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 dark:border-cyan-400/20 bg-linear-to-r from-cyan-500/10 to-violet-500/10 px-3 py-1 text-xs text-muted hover:from-cyan-500/20 hover:to-violet-500/20 transition-colors soft-ring"
          >
            🔗 {t("nav.hybrid")} →
          </Link>
        </div>

        {/* Track-dependent content. A plain <div> (no mount/unmount) with a
            CSS fade: AnimatePresence got stuck mid-transition on repeated
            toggles (exit-complete callback not firing reliably with React 19
            + framer-motion 12), leaving old and new content both mounted. */}
        <div
          key={track}
          // motion-safe: no fade with prefers-reduced-motion
          className={trackSwitched ? "motion-safe:animate-[fadeIn_0.3s_ease_forwards]" : undefined}
          suppressHydrationWarning
        >
            {/* Short hook, typing effect */}
            <p className={`text-sm font-medium ${track === "salesforce" ? "text-cyan-800 dark:text-cyan-300" : "text-violet-800 dark:text-violet-300"}`}>
              <TypingText
                text={track === "salesforce" ? t("hero.value_salesforce") : t("hero.value_itops")}
                speed={28}
              />
            </p>

            {/* H1 with animated gradient */}
            <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight">
              <span className={`block animate-gradient-x bg-clip-text text-transparent bg-linear-to-r ${track === "salesforce" ? "from-slate-900 via-cyan-600 to-slate-900 dark:from-white dark:via-cyan-300 dark:to-white" : "from-slate-900 via-violet-600 to-slate-900 dark:from-white dark:via-violet-300 dark:to-white"}`}>
                {track === "salesforce" ? t("hero.title_salesforce") : t("hero.title_itops")}
              </span>
              {/* Hidden separator so screen readers and search engines do not
                  read the two spans as one word */}
              <span className="sr-only"> — </span>
              <span className={`mt-1 block text-xl sm:text-2xl font-medium ${track === "salesforce" ? "text-cyan-700 dark:text-cyan-300" : "text-violet-700 dark:text-violet-300"}`}>
                {track === "salesforce" ? t("hero.subtitle_salesforce") : t("hero.subtitle_itops")}
              </span>
            </h1>

            {/* Mobile CTA (< 640px): on small screens the avatar, badges and
                title push every button below the fold, so "Contact me" also sits
                right under the H1; the one in the CTA row below is hidden on
                mobile to avoid a duplicate. */}
            <div className="mt-4 sm:hidden">
              <a
                className={`inline-flex rounded-full px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring transition-opacity ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
                href="#contact"
              >
                {t("cta.workWithMe")}
              </a>
            </div>

            {/* Tagline: why work with me */}
            <p className="mt-3 max-w-2xl text-muted text-base sm:text-lg leading-relaxed">
              {track === "salesforce" ? t("hero.intro_salesforce") : t("hero.intro_itops")}
            </p>

            {/* Proof tags, per track */}
            <div className="mt-4 flex flex-wrap gap-2">
              {proofTags.map((tag) =>
                tag.href ? (
                  <Link
                    key={tag.label}
                    href={tag.href}
                    className="chip transition-colors hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-200 soft-ring"
                  >
                    {tag.label} →
                  </Link>
                ) : (
                  <span key={tag.label} className="chip">{tag.label}</span>
                )
              )}
            </div>
        </div>

        {/* CTAs: static, not re-animated on track change */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Primary CTA: scroll to the contact section */}
          <a
            className={`hidden sm:inline-block rounded-full px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring transition-opacity ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
            href="#contact"
          >
            {t("cta.workWithMe")}
          </a>

          {/* Secondary CTA: Proton Calendar booking page in a new tab (hidden
              when NEXT_PUBLIC_BOOKING_URL is not set) */}
          <BookingLink variant="hero" />
        </div>

        {/* Profile switch hint */}
        <p className="mt-4 text-xs text-muted-2">
          <button
            type="button"
            onClick={() => setTrack(track === "salesforce" ? "itops" : "salesforce")}
            className="underline underline-offset-2 hover:text-muted transition-colors soft-ring rounded-sm"
          >
            {track === "salesforce"
              ? t("hero.switchToItops")
              : t("hero.switchToSalesforce")}
          </button>
        </p>
      </div>
    </div>
  );
}
