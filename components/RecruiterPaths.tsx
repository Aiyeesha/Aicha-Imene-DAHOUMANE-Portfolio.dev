"use client";

// components/RecruiterPaths.tsx
// ------------------------------
// Bloc « Vous recrutez pour quel poste ? » affiché juste sous le hero de
// l'accueil (audit de contenu du 2026-09-25, lot 2).
//
// Pourquoi : le toggle Salesforce / IT Ops coupait le profil en deux alors que
// le positionnement est hybride, et un recruteur qui ne touchait pas au toggle
// ne voyait que la moitié Salesforce. Ce bloc part du besoin du recruteur
// (le poste à pourvoir) et l'oriente en un clic :
//   - profil hybride  → page /hybride + CV hybride (carte mise en avant) ;
//   - poste Salesforce → bascule le track "salesforce" puis descend aux compétences ;
//   - poste IT Ops     → bascule le track "itops" puis descend aux compétences.
// Le toggle reste en place : il pilote tous les contenus track-aware du site
// (hero, compétences, services, projets). Ce bloc en devient simplement le
// point d'entrée explicite.

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useTrack, type Track } from "@/app/[locale]/providers";
import { trackEvent } from "@/lib/analytics";

type PathId = "hybrid" | "salesforce" | "itops";

export default function RecruiterPaths() {
  const t = useTranslations("recruiter");
  const locale = useLocale();
  const { track, setTrack } = useTrack();

  // Les CV existent pour chaque locale et chaque profil (public/cv/).
  const cvFor = (profile: "hybrid" | Track) =>
    `/cv/Aicha-Imene-DAHOUMANE-CV-${locale}-${profile}.pdf`;

  // Bascule le profil affiché puis fait défiler jusqu'aux compétences, qui
  // sont la première section track-aware sous ce bloc.
  const choose = (next: Track) => {
    trackEvent("track_switch", { from: track, to: next });
    setTrack(next);
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cardBase =
    "flex h-full flex-col rounded-2xl border p-5 transition-colors";
  const secondaryBtn =
    "inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring";

  const paths: { id: PathId; title: string; body: string }[] = [
    { id: "hybrid", title: t("hybridTitle"), body: t("hybridBody") },
    { id: "salesforce", title: t("salesforceTitle"), body: t("salesforceBody") },
    { id: "itops", title: t("itopsTitle"), body: t("itopsBody") },
  ];

  return (
    <section id="recruiter-paths" aria-labelledby="recruiter-paths-title" className="py-10">
      <h2 id="recruiter-paths-title" className="text-2xl font-semibold">{t("title")}</h2>
      <p className="mt-2 text-muted">{t("subtitle")}</p>

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {paths.map((p) => {
          const isHybrid = p.id === "hybrid";
          // Carte hybride mise en avant (dégradé cyan → violet repris du bloc
          // « pont » de l'accueil) ; les deux autres signalent le profil actif.
          const isActive = !isHybrid && track === p.id;
          const cls = isHybrid
            ? `${cardBase} border-violet-500/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 dark:from-cyan-400/10 dark:to-violet-400/10`
            : `${cardBase} ${isActive ? "border-cyan-500/40" : "border-black/10 dark:border-white/10"} bg-white dark:bg-white/[0.03]`;

          return (
            <li key={p.id} className={cls}>
              {isHybrid && (
                <span className="badge badge-bridge mb-3 self-start">{t("recommended")}</span>
              )}
              <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {isHybrid ? (
                  <Link href={`/${locale}/hybride`} className={secondaryBtn}>
                    {t("hybridCta")} <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => choose(p.id as Track)}
                    aria-pressed={isActive}
                    className={secondaryBtn}
                  >
                    {t("showProfile")} <span aria-hidden="true">↓</span>
                  </button>
                )}
                <a
                  href={cvFor(isHybrid ? "hybrid" : (p.id as Track))}
                  target="_blank"
                  rel="noreferrer"
                  className={secondaryBtn}
                >
                  {t("cv")}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
