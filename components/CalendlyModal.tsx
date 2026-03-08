"use client";

// CalendlyModal.tsx
// -----------------
// Bouton + modale d'intégration Calendly (réservation de créneaux).
// Améliorations BLOC 5 / BLOC 7 :
// - L'iframe n'est montée en DOM que lorsque la modale est ouverte (lazy mount)
//   → aucun chargement de Calendly au départ de page, impact positif sur LCP/INP
// - Hauteur responsive : 70vh desktop, 85vh mobile (l'iframe Calendly a un min-height)
// - Fallback "Ouvrir dans un nouvel onglet" pour les cas où l'iframe bloque (iOS Safari, CSP)
// - Indicateur de chargement pendant que l'iframe se charge (skeleton animé)

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "./Modal";

// Récupération de l'URL Calendly depuis l'env var (côté client uniquement)
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

type Props = {
  /**
   * "contact" (défaut) : bouton full-width pour la section contact.
   * "hero"             : pill compacte pour les CTAs du hero.
   */
  variant?: "contact" | "hero";
};

export default function CalendlyModal({ variant = "contact" }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  // Suivi de l'état de chargement de l'iframe pour afficher le skeleton
  const [loaded, setLoaded] = useState(false);

  // Si l'URL Calendly n'est pas configurée, ne rien afficher
  if (!CALENDLY) return null;

  const handleOpen = () => {
    setLoaded(false); // Réinitialiser l'état à chaque ouverture
    setOpen(true);
  };

  return (
    <>
      {variant === "hero" ? (
        /* ── Variante hero : pill compacte alignée avec les autres CTAs ── */
        <button
          type="button"
          onClick={handleOpen}
          className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring transition-colors"
        >
          {t("cta.call15")} ↗
        </button>
      ) : (
        /* ── Variante contact : bouton full-width (usage original) ── */
        <button
          type="button"
          onClick={handleOpen}
          className="flex w-full items-center justify-between rounded-xl border border-black/10 dark:border-white/10
            bg-black/5 dark:bg-white/5 px-4 py-3 text-sm
            hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          <span>{t("contact.bookCall")}</span>
          <span aria-hidden="true">↗</span>
        </button>
      )}

      {/* Modale Calendly */}
      <Modal open={open} title={t("contact.bookCall")} onClose={() => setOpen(false)}>
        <div className="grid gap-3">
          <p className="text-sm text-muted">{t("contact.calendlyHint")}</p>

          {/* Conteneur iframe avec skeleton de chargement */}
          <div className="relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            {/* Skeleton visible pendant le chargement de l'iframe */}
            {!loaded && (
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-pulse bg-black/5 dark:bg-white/5"
              />
            )}

            {/* L'iframe n'est montée que quand open=true (lazy mount).
                - h-[85svh] sur mobile (small viewport height unit — iOS Safari compatible)
                - h-[70vh]  sur desktop
                - min-h pour éviter que Calendly soit trop écrasé sur petit écran */}
            <iframe
              title="Calendly"
              src={CALENDLY}
              onLoad={() => setLoaded(true)}
              className="
                w-full
                h-[85svh] min-h-[500px]
                sm:h-[70vh]
              "
              loading="lazy"
              // allow nécessaire pour que Calendly fonctionne dans certains navigateurs
              allow="camera; microphone; payment"
            />
          </div>

          {/* Actions : lien nouvel onglet (fallback iOS/CSP) + fermeture */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* Fallback : ouvrir dans un nouvel onglet si l'iframe pose problème */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted hover:underline"
            >
              {t("contact.openInNewTab")} ↗
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:opacity-90 soft-ring"
              >
                {t("contact.close")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
