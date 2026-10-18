// components/home/HomeSections.tsx
// ---------------------------------
// Sections de la nouvelle page d'accueil (Option C : structure de la preview
// « hybride », profondeur du site actuel conservée dans les pages secondaires).
//
// Toutes ces sections sont des Server Components asynchrones :
//   - aucun JavaScript client (meilleure performance que l'ancien hero animé) ;
//   - textes lus dans messages/<locale>.json (namespace `home`) via
//     getTranslations — aucun texte en dur ;
//   - styles Tailwind uniquement (pas d'attribut style : la CSP à nonce
//     l'interdit), avec variantes claires et sombres.
//
// Ordre d'affichage (défini dans app/[locale]/page.tsx) :
//   Hero → Sélecteur de profil → Profil → Compétences → Pont → Projets →
//   Parcours → Certifications → FAQ → Contact.

import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BOOKING_URL } from "@/lib/booking";
import { homeShowcase } from "@/content/homeShowcase";
import ShowcaseProjectCard from "@/components/home/ShowcaseProjectCard";

type Locale = "en" | "fr" | "es";

// Classes partagées — reprises des boutons « pilule » existants du site.
const pillBtn =
  "inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring";
// Bouton principal : cyan-700 sur blanc (contraste 5,4:1, AA) ; en sombre,
// cyan-300 avec texte noir.
const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-cyan-700 px-5 py-2 text-sm font-medium text-white hover:bg-cyan-800 dark:bg-cyan-300 dark:text-black dark:hover:bg-cyan-200 soft-ring";

// ── 1. Hero ──────────────────────────────────────────────────────────────────
// Surtitre, nom (seul <h1> de la page), accroche, puces de disponibilité et
// deux CTA. Rendu serveur sans animation : le contenu est visible dès le
// premier octet HTML (LCP = photo, chargée en priorité).
export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const tc = await getTranslations({ locale, namespace: "contact" });
  const chips = t.raw("chips") as string[];
  const avatarSrc = process.env.NEXT_PUBLIC_AVATAR_URL || "/avatar.webp";

  return (
    <section id="hero" aria-labelledby="hero-title" className="py-10 md:py-14">
      <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr]">
        {/* Photo : bordure dégradée cyan → violet (les deux « mondes »). */}
        <div className="mx-auto lg:mx-0">
          <div className="rounded-2xl bg-linear-to-br from-cyan-400 to-violet-500 p-[3px] shadow-xl">
            <div className="relative h-[140px] w-[140px] overflow-hidden rounded-2xl bg-[#0d1b2e] sm:h-[200px] sm:w-[200px]">
              <Image
                src={avatarSrc}
                alt={t("avatarAlt")}
                fill
                priority
                sizes="(max-width: 639px) 140px, 200px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">{t("eyebrow")}</p>
          {/* Le nom propre n'est pas traduit : il reste identique dans les 3 langues. */}
          <h1 id="hero-title" className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Aïcha Imène DAHOUMANE
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t("tagline")}</p>

          {/* Puces : contrats (dont portage salarial), localisation, mode de
              travail, disponibilité. */}
          <ul aria-label={t("chipsLabel")} className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-black/10 dark:border-white/15 bg-black/3 dark:bg-white/5 px-3 py-1 text-sm text-slate-700 dark:text-white/80"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className={primaryBtn}>
              {t("ctaContact")}
            </a>
            {/* Réservation Proton Calendar : masquée si le lien n'est pas configuré. */}
            {BOOKING_URL && (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("ctaCall")} (${tc("opensInNewTab")})`}
                className={pillBtn}
              >
                {t("ctaCall")} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 3. Profil ────────────────────────────────────────────────────────────────
export async function HomeProfile({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.profile" });
  const paragraphs = t.raw("paragraphs") as string[];
  const languages = t.raw("languages") as { name: string; level: string }[];

  return (
    <section id="about" aria-labelledby="about-title" className="py-14">
      <h2 id="about-title" className="text-3xl font-semibold">{t("title")}</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_220px]">
        <div className="space-y-4 leading-[1.8] text-muted">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t("languagesTitle")}</h3>
          <dl className="mt-3 grid gap-2 text-sm">
            {languages.map((l) => (
              <div key={l.name} className="flex items-baseline justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-1">
                <dt>{l.name}</dt>
                <dd className="text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// ── 4. Compétences en 4 couches ──────────────────────────────────────────────
// 01 Infrastructure → 02 Sécurité (transverse) → 03 Salesforce → 04 Dev & DevOps.
export async function HomeSkills({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.skills" });
  const layers = t.raw("layers") as { title: string; role: string; transverse?: string; items: string[] }[];

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-stripe py-14">
      <h2 id="skills-title" className="text-3xl font-semibold">{t("title")}</h2>
      <p className="mt-3 text-muted">{t("intro")}</p>
      <ol className="mt-8 grid gap-4 md:grid-cols-2">
        {layers.map((layer, i) => (
          <li
            key={layer.title}
            className={`rounded-2xl border p-5 ${
              layer.transverse
                ? "border-amber-500/30 bg-amber-500/5 dark:bg-amber-400/5"
                : "border-black/10 dark:border-white/10 bg-white dark:bg-white/3"
            }`}
          >
            <div className="flex items-baseline gap-3">
              {/* Numéro décoratif : l'ordre est déjà porté par la liste <ol>. */}
              <span aria-hidden="true" className="font-mono text-sm text-cyan-700 dark:text-cyan-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {layer.title}
                {layer.transverse && (
                  <span className="ml-2 align-middle text-xs font-normal text-amber-800 dark:text-amber-300">({layer.transverse})</span>
                )}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted">{layer.role}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ── 5. « Là où mes deux mondes se rejoignent » (version raccourcie) ──────────
export async function HomeBridge({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.bridge" });
  const tc = await getTranslations({ locale, namespace: "contact" });

  return (
    <section id="bridge" aria-labelledby="bridge-title" className="py-14">
      <div className="rounded-2xl border border-violet-500/30 bg-linear-to-r from-cyan-500/10 to-violet-500/10 p-6 md:p-8 dark:from-cyan-400/10 dark:to-violet-400/10">
        <h2 id="bridge-title" className="text-2xl font-semibold">{t("title")}</h2>
        <p className="mt-4 leading-[1.8] text-muted">{t("body")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/${locale}/projects/legarant-axg-salesforce-deployment`} className={pillBtn}>
            {t("ctaCase")} <span aria-hidden="true">→</span>
          </Link>
          <a
            href="https://github.com/Aiyeesha/medicare-solutions/blob/main/.github/workflows/validate.yml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("ctaWorkflow")} (${tc("opensInNewTab")})`}
            className={pillBtn}
          >
            {t("ctaWorkflow")} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── 6. Projets phares (5) ────────────────────────────────────────────────────
export async function HomeProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.projects" });
  const tc = await getTranslations({ locale, namespace: "contact" });
  const labels = {
    problem: t("problem"),
    solution: t("solution"),
    result: t("result"),
    tech: t("tech"),
    readCase: t("readCase"),
    viewRepo: t("viewRepo"),
    viewWorkflow: t("viewWorkflow"),
    opensInNewTab: tc("opensInNewTab"),
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-stripe py-14">
      <h2 id="projects-title" className="text-3xl font-semibold">{t("title")}</h2>
      <p className="mt-3 max-w-3xl text-muted">{t("subtitle")}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {homeShowcase.map((p) => (
          <li key={p.key}>
            <ShowcaseProjectCard
              categories={t(`items.${p.key}.categories`)}
              title={t(`items.${p.key}.title`)}
              status={t(`items.${p.key}.status`)}
              problem={t(`items.${p.key}.problem`)}
              solution={t(`items.${p.key}.solution`)}
              result={t(`items.${p.key}.result`)}
              tech={p.tech}
              caseStudyHref={p.caseStudySlug ? `/${locale}/projects/${p.caseStudySlug}` : undefined}
              repoUrl={p.repoUrl}
              workflowUrl={p.workflowUrl}
              labels={labels}
            />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end">
        <Link href={`/${locale}/projects`} className={pillBtn}>
          {t("allProjects")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

// ── 8. Certifications & formation ────────────────────────────────────────────
// Les certifications Salesforce sont affichées « en préparation » : aucune
// n'est acquise à ce jour (brief §0.2).
export async function HomeCertifications({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.certs" });
  const sfList = t.raw("salesforceList") as string[];

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section-stripe py-14">
      <h2 id="certifications-title" className="text-3xl font-semibold">{t("title")}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/3 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white">{t("rncp")}</h3>
          <p className="mt-2 text-sm text-muted">{t("rncpMeta")}</p>
          <p className="mt-4 text-sm">{t("trailhead")}</p>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/3 p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white">{t("salesforceTitle")}</h3>
          <p className="mt-1 text-sm italic text-amber-800 dark:text-amber-300">{t("salesforceStatus")}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {sfList.map((name) => (
              <li key={name}>Salesforce {name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <Link href={`/${locale}/certifications`} className={pillBtn}>
          {t("cta")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

// ── 9. FAQ courte (4 questions) ──────────────────────────────────────────────
// Reprend 4 des questions existantes (`faq.items`) : disponibilité, contrats,
// certifications, localisation. La FAQ complète reste sur /work-with-me.
const SHORT_FAQ_INDEXES = [0, 1, 3, 4];

export async function HomeFaq({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.faq" });
  const tf = await getTranslations({ locale, namespace: "faq" });
  const all = tf.raw("items") as { q: string; a: string }[];
  const items = SHORT_FAQ_INDEXES.map((i) => all[i]).filter(Boolean);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-14">
      <h2 id="faq-title" className="text-3xl font-semibold">{t("title")}</h2>
      {/* <details>/<summary> natifs : accessibles au clavier sans JavaScript. */}
      <div className="mt-6 divide-y divide-black/10 dark:divide-white/10 rounded-2xl border border-black/10 dark:border-white/10">
        {items.map((item) => (
          <details key={item.q} className="group p-5">
            <summary className="cursor-pointer list-none font-medium text-slate-900 dark:text-white soft-ring rounded">
              <span className="mr-2 inline-block transition-transform group-open:rotate-90" aria-hidden="true">›</span>
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-6">
        <Link href={`/${locale}/work-with-me#section-faq`} className={pillBtn}>
          {t("seeAll")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
