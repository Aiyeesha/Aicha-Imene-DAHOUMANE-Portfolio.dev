"use client";

// components/RecruiterPaths.tsx
// ------------------------------
// "What role are you hiring for?" block, right below the home hero. It
// starts from the recruiter's need and routes in one click:
//   - hybrid profile   → /hybride page + hybrid CV (highlighted card);
//   - Salesforce role  → switch to the "salesforce" track, scroll to skills;
//   - IT Ops role      → switch to the "itops" track, scroll to skills.
// The Salesforce and IT Ops cards also link to /about ("Full background"),
// setting the track first so the About page opens on that profile. Below the
// cards, a one-sentence teaser for the active track points to /about too:
// a hook, not a copy of the About page.
// The header toggle still drives all track-aware content; this block is an
// explicit entry point to it.

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useTrack, type Track } from "@/app/[locale]/providers";

type PathId = "hybrid" | "salesforce" | "itops";

export default function RecruiterPaths() {
  const t = useTranslations("recruiter");
  const locale = useLocale();
  const { track, setTrack } = useTrack();

  // A CV exists for every locale and profile (public/cv/).
  const cvFor = (profile: "hybrid" | Track) =>
    `/cv/Aicha-Imene-DAHOUMANE-CV-${locale}-${profile}.pdf`;

  // Switch the displayed profile, then scroll to skills (the first
  // track-aware section below this block).
  const choose = (next: Track) => {
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
          // Highlighted hybrid card (cyan → violet gradient); the other two
          // show which profile is active.
          const isActive = !isHybrid && track === p.id;
          const cls = isHybrid
            ? `${cardBase} border-violet-500/30 bg-linear-to-br from-cyan-500/10 to-violet-500/10 dark:from-cyan-400/10 dark:to-violet-400/10`
            : `${cardBase} ${isActive ? "border-cyan-500/40" : "border-black/10 dark:border-white/10"} bg-white dark:bg-white/3`;

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
                {/* Full background on /about. setTrack writes the cookie and
                    localStorage synchronously, before navigation, so /about
                    renders this profile (server and client). The aria-label
                    names the profile: two cards share the same visible text. */}
                {!isHybrid && (
                  <Link
                    href={`/${locale}/about`}
                    onClick={() => setTrack(p.id as Track)}
                    aria-label={`${t("aboutCta")} — ${p.title}`}
                    className={secondaryBtn}
                  >
                    {t("aboutCta")} <span aria-hidden="true">→</span>
                  </Link>
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

      {/* Teaser for the active track: one sentence, distinct from the hero
          subtitle, then a link to the full About page. The track is already
          active, so a plain link is enough. Cyan for Salesforce, violet for
          IT Ops, as on the About page. */}
      <div
        className={`mt-6 rounded-2xl border p-5 ${
          track === "salesforce" ? "border-cyan-500/20" : "border-violet-500/20"
        }`}
      >
        <p className="text-sm leading-relaxed text-muted">
          {track === "salesforce" ? t("teaserSalesforce") : t("teaserItops")}
        </p>
        <Link
          href={`/${locale}/about`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium hover:underline soft-ring rounded-sm"
        >
          {t("teaserCta")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
