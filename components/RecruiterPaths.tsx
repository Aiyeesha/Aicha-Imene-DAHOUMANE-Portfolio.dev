// components/RecruiterPaths.tsx
// ------------------------------
// Sélecteur de profil « Vous recrutez pour quel poste ? », affiché juste sous
// le hero de l'accueil.
//
// Option C (brief §3.2) : chaque carte affiche une phrase et le lien vers le CV
// du profil, dans la langue du visiteur. Les anciens boutons « Afficher ce
// profil » sont retirés : ils basculaient le track Salesforce / IT Ops, alors
// que l'accueil est désormais commun aux trois profils — le clic ne changeait
// donc rien de visible. La bascule de track reste disponible dans la barre de
// navigation pour les pages qui en dépendent encore (/projects, blog).
//
// Cartes :
//   - profil hybride  → CV hybride + lien vers la page /hybride (carte mise en avant) ;
//   - poste Salesforce → CV Salesforce ;
//   - poste systèmes, réseau & DevOps → CV IT Ops.
//
// Server Component : aucun état ni JavaScript côté client.

import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Locale = "en" | "fr" | "es";
type Profile = "hybrid" | "salesforce" | "itops";

// Classes partagées des boutons « pilule », reprises du style du site.
const secondaryBtn =
  "inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring";
const cardBase = "flex h-full flex-col rounded-2xl border p-5";

export default async function RecruiterPaths({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "recruiter" });
  const tc = await getTranslations({ locale, namespace: "contact" });

  // Les CV existent pour chaque locale et chaque profil (public/cv/).
  const cvFor = (profile: Profile) => `/cv/Aicha-Imene-DAHOUMANE-CV-${locale}-${profile}.pdf`;

  const paths: { id: Profile; title: string; body: string }[] = [
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
          // Carte hybride mise en avant (dégradé cyan → violet) : c'est le
          // profil de référence.
          const cls = isHybrid
            ? `${cardBase} border-violet-500/30 bg-linear-to-br from-cyan-500/10 to-violet-500/10 dark:from-cyan-400/10 dark:to-violet-400/10`
            : `${cardBase} border-black/10 dark:border-white/10 bg-white dark:bg-white/3`;

          return (
            <li key={p.id} className={cls}>
              {isHybrid && (
                <span className="badge badge-bridge mb-3 self-start">{t("recommended")}</span>
              )}
              <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {/* CV du profil, dans la langue de la page ; ouvert dans un nouvel onglet. */}
                <a
                  href={cvFor(p.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("cv")} — ${p.title} (${tc("opensInNewTab")})`}
                  className={secondaryBtn}
                >
                  {t("cv")}
                </a>
                {isHybrid && (
                  <Link href={`/${locale}/hybride`} className={secondaryBtn}>
                    {t("hybridCta")} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
