"use client";

// TrackAwareServices.tsx
// ----------------------
// Affiche les cartes de services adaptées au parcours actif (Salesforce / IT Ops).
// Chaque carte est enrichie d'une icône SVG distinctive pour faciliter le scanning.
// Icônes : SVG inline pour éviter toute dépendance externe (tree-shakeable, 0 KB réseau).

import { useTrack } from "@/app/[locale]/providers";
import Reveal from "@/components/Reveal";
import { getServices, type Locale } from "@/content/services";
import { useTranslations } from "next-intl";

// ── Icônes SVG inline (24×24, stroke-based) ──────────────────────────
// Chaque icône représente visuellement le type de service.

/** Icône loupe — Audit */
const IconAudit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/** Icône accolades — Développement */
const IconCode = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/** Icône chaîne — Intégrations & APIs */
const IconLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

/** Icône chapeau — Formation */
const IconGraduation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

/** Icône bouclier — Audit & durcissement sécurité */
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/** Icône serveur — Administration systèmes */
const IconServer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

/** Icône engrenages — CI/CD & automatisation */
const IconGear = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

/** Icône fichier — Support & documentation */
const IconFile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

// Jeux d'icônes par parcours — ordre = ordre des cartes dans content/services.ts
const SALESFORCE_ICONS = [<IconAudit key="a" />, <IconCode key="b" />, <IconLink key="c" />, <IconGraduation key="d" />];
const ITOPS_ICONS      = [<IconShield key="a" />, <IconServer key="b" />, <IconGear key="c" />, <IconFile key="d" />];

export default function TrackAwareServices({ locale }: { locale: Locale }) {
  const { track } = useTrack();
  const t = useTranslations();
  const cards = getServices(locale, track);

  // Sélectionner le jeu d'icônes selon le parcours actif
  const icons = track === "salesforce" ? SALESFORCE_ICONS : ITOPS_ICONS;

  /**
   * handleDiscuss — bouton "Discuter de ce service"
   *
   * 1. Dispatche un custom event `contact:prefill` avec topic + subject.
   *    ContactForm écoute cet événement et pré-remplit ses champs.
   * 2. Fait défiler jusqu'à la section #contact.
   */
  function handleDiscuss(title: string) {
    const topic = track === "salesforce" ? "salesforce" : "itops";

    // Notifier ContactForm via un event DOM (pas de state global nécessaire)
    window.dispatchEvent(
      new CustomEvent("contact:prefill", { detail: { topic, subject: title } })
    );

    // Scroll vers la section contact avec smooth
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {cards.map((c, idx) => (
        <Reveal key={c.title} delayMs={110 + idx * 60}>
          <div className="card p-6 flex flex-col">
            {/* En-tête : icône dans un badge coloré + titre */}
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-xl
                  bg-cyan-500/10 text-cyan-700 dark:text-cyan-200"
                aria-hidden="true"
              >
                {icons[idx]}
              </div>
              {/* Explicit dark:text-white avoids inheriting body color mid-transition */}
              <h3 className="font-semibold leading-snug pt-1.5 text-slate-900 dark:text-white">{c.title}</h3>
            </div>

            {/* Description courte */}
            {/* dark:text-slate-400 : explicit color breaks inheritance from transitioning body */}
            <p className="mt-3 text-sm text-muted dark:text-slate-400">{c.description}</p>

            {/* Bullets des prestations incluses */}
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted dark:text-slate-400">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            {/* CTA — pré-remplit le formulaire de contact avec ce service */}
            <div className="mt-4 pt-4 border-t border-black/8 dark:border-white/8">
              <button
                type="button"
                onClick={() => handleDiscuss(c.title)}
                className="
                  text-sm font-medium text-cyan-700 dark:text-cyan-300
                  hover:underline underline-offset-4
                  soft-ring rounded transition-opacity hover:opacity-80
                "
              >
                {t("services.discuss")} →
              </button>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
