"use client";

// track-aware-hero.tsx
// --------------------
// Hero section : photo + titre + tagline percutante + proof tags + CTAs.
// Deux variantes selon le track toggle (Salesforce / IT Ops).
//
// Animations (CSS — framer-motion retiré du héro à l'audit du 2026-10-25 : tout
// le bundle motion était chargé au premier écran pour une entrée et 28 px de
// parallaxe) :
//   - Entrance stagger : avatar + bloc texte s'animent en séquence au chargement
//                        (@keyframes hero-avatar-in / hero-text-in, globals.css)
//   - Track switch     : fondu CSS (@keyframes fadeIn, déjà utilisé ailleurs sur
//                        le site) sur le contenu dynamique — pas de Framer Motion
//                        ici : voir la note plus bas sur pourquoi AnimatePresence
//                        a été retiré de ce bloc précis.
//   - Parallaxe avatar : léger décalage vertical de l'avatar au scroll (écouteur
//                        passif + requestAnimationFrame, limité aux 400 premiers px)
//   - Reduced motion   : toutes les animations sont désactivées si prefers-reduced-motion

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTrack } from "./providers";
import { TypingText } from "@/components/TypingText";
import BookingLink from "@/components/BookingLink";

// AvailabilityModal n'est utile qu'au clic (modale fermée par défaut) : chargée
// en dynamic import (ssr: false) pour ne pas alourdir le JS exécuté au premier
// rendu du hero (above the fold).
const AvailabilityModal = dynamic(() => import("@/components/AvailabilityModal"), {
  ssr: false,
});

// ── Entrée animée ───────────────────────────────────────────────────────────
// Reprend les anciens variants : l'avatar garde opacity 1 (candidat LCP, rendu
// dès le premier paint) et ne fait qu'un léger zoom ; le bloc texte monte de
// 18 px sans fondu pour que le H1 reste visible dans le HTML SSR.
// Classes .hero-avatar-in / .hero-text-in : app/globals.css.

export default function TrackAwareHero() {
  const t = useTranslations();
  const { track, setTrack } = useTrack();
  const locale = useLocale();

  // ── Parallaxe avatar ───────────────────────────────────────────────────────
  // 0 → 400px de scroll → l'avatar remonte de 0 → -28px (subtil). Écrit
  // directement dans le style (pas de re-render) ; désactivé si
  // prefers-reduced-motion.
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

  // Les téléchargements de CV ne sont plus dans le hero : les trois CV
  // (hybride, Salesforce, IT Ops) sont proposés dans le bloc RecruiterPaths
  // juste en dessous — les répéter ici multipliait les choix au premier écran.

  // Avatar : env var ou image locale
  const avatarUrl = useMemo(
    () => process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp",
    []
  );
  const [src, setSrc] = useState<string>(avatarUrl);

  // Proof tags différenciés par track.
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
      {/* ── Colonne 1 — Avatar avec bordure gradient cyan→bleu ─────────────── */}
      {/* Parallaxe sur ce conteneur, zoom d'entrée sur l'enfant : deux
          transform distincts qui ne s'écrasent pas. */}
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

      {/* ── Colonne 2 — Texte ────────────────────────────────────────────────── */}
      <div className="hero-text-in">

        {/* Badge de disponibilité — cliquable → ouvre la modale de détails */}
        <div className="mb-2">
          <AvailabilityModal />
        </div>

        {/* Repère certifications/diplômes — visible sans clic, contrairement à la
            réponse FAQ "Do you have a Salesforce certification?" qui répond déjà
            bien à cette question mais reste cachée derrière un accordéon. L'absence
            de certification éditeur est précisément l'objection qui a coûté 3
            entretiens malgré un CDI sans période d'essai — la contre-preuve
            (diplôme RNCP6, Trailhead actif, certification en préparation datée)
            doit être visible dans les 30 premières secondes, pas après un clic. */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Link
            href={`/${locale}/certifications`}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs text-muted hover:bg-black/10 dark:hover:bg-white/10 transition-colors soft-ring"
          >
            🎓 {t("hero.credentialsSummary")}
          </Link>
          {/* Profil hybride — point d'entrée neutre vers la page qui prouve la
              combinaison Salesforce + infra + sécurité (audit P2). Visible quel
              que soit le track actif : c'est justement le sujet. */}
          <Link
            href={`/${locale}/hybride`}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 dark:border-cyan-400/20 bg-linear-to-r from-cyan-500/10 to-violet-500/10 px-3 py-1 text-xs text-muted hover:from-cyan-500/20 hover:to-violet-500/20 transition-colors soft-ring"
          >
            🔗 {t("nav.hybrid")} →
          </Link>
        </div>

        {/* Contenu dynamique (track-dépendant).
            Ancienne version : <AnimatePresence mode="wait"><motion.div key={track}>...
            Retiré entièrement (pas seulement mode="wait") : sur un second toggle, le
            callback de fin d'animation de sortie de Framer Motion ne se déclenchait pas
            de façon fiable (React 19 + framer-motion 12) — AnimatePresence restait bloqué
            à mi-transition. Sans mode="wait" seul, le symptôme changeait de forme mais ne
            disparaissait pas : l'ancien ET le nouveau contenu restaient tous les deux montés
            indéfiniment (texte dupliqué, superposé), preuve que c'est bien le signal de fin
            de sortie qui est en cause, pas mode="wait" en particulier.
            Un <div> simple, sans montage/démontage, élimine complètement la dépendance à ce
            callback : le contenu reflète toujours `track` immédiatement au re-render, sans
            jamais pouvoir rester bloqué entre deux états. Transition CSS légère (classe
            Tailwind) en remplacement du crossfade Framer Motion. */}
        <div
          key={track}
          // motion-safe : pas de fondu si prefers-reduced-motion
          className="motion-safe:animate-[fadeIn_0.3s_ease_forwards]"
          suppressHydrationWarning
        >
            {/* Accroche courte — typing effect */}
            <p className={`text-sm font-medium ${track === "salesforce" ? "text-cyan-800 dark:text-cyan-300" : "text-violet-800 dark:text-violet-300"}`}>
              <TypingText
                text={track === "salesforce" ? t("hero.value_salesforce") : t("hero.value_itops")}
                speed={28}
              />
            </p>

            {/* Titre H1 — gradient animé */}
            <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold leading-tight tracking-tight">
              <span className={`block animate-gradient-x bg-clip-text text-transparent bg-linear-to-r ${track === "salesforce" ? "from-slate-900 via-cyan-600 to-slate-900 dark:from-white dark:via-cyan-300 dark:to-white" : "from-slate-900 via-violet-600 to-slate-900 dark:from-white dark:via-violet-300 dark:to-white"}`}>
                {track === "salesforce" ? t("hero.title_salesforce") : t("hero.title_itops")}
              </span>
              {/* Séparateur invisible pour les lecteurs d'écran et les moteurs de recherche
                  — évite la concaténation des deux spans en un seul texte sans espace */}
              <span className="sr-only"> — </span>
              <span className={`mt-1 block text-xl sm:text-2xl font-medium ${track === "salesforce" ? "text-cyan-700 dark:text-cyan-300" : "text-violet-700 dark:text-violet-300"}`}>
                {track === "salesforce" ? t("hero.subtitle_salesforce") : t("hero.subtitle_itops")}
              </span>
            </h1>

            {/* CTA mobile (< 640 px) — audit 2026-10-01 : sur un écran de 390 × 844,
                l'avatar, les badges et le titre repoussaient tous les boutons sous le
                pli. Ce bouton placé juste sous le H1 rend « Me recruter » visible dès
                l'arrivée ; la rangée complète de CTA reste plus bas, où son propre
                « Me recruter » est masqué sur mobile pour éviter le doublon. */}
            <div className="mt-4 sm:hidden">
              <a
                className={`inline-flex rounded-full px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring transition-opacity ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
                href="#contact"
              >
                {t("cta.workWithMe")}
              </a>
            </div>

            {/* Tagline percutante — répond à "pourquoi travailler avec moi ?" */}
            <p className="mt-3 max-w-2xl text-muted text-base sm:text-lg leading-relaxed">
              {track === "salesforce" ? t("hero.intro_salesforce") : t("hero.intro_itops")}
            </p>

            {/* Proof tags — différents selon le track */}
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

        {/* CTAs — statiques, ne réaniment pas au changement de track */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* CTA primaire : scroll vers la section contact */}
          <a
            className={`hidden sm:inline-block rounded-full px-5 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring transition-opacity ${track === "salesforce" ? "bg-cyan-500" : "bg-violet-500"}`}
            href="#contact"
          >
            {t("cta.workWithMe")}
          </a>

          {/* CTA secondaire 1 : page de réservation Proton Calendar, nouvel onglet
              (disparaît si NEXT_PUBLIC_BOOKING_URL n'est pas configurée) */}
          <BookingLink variant="hero" />
        </div>

        {/* Hint de switch de profil */}
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
