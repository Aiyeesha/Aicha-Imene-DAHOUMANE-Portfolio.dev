// about/page.tsx
// ---------------
// Page dédiée "À propos" — alimentée par Supabase via getAboutPageCached.
//
// Structure :
//   1. ProfileFactsCard   — "En bref", adapté au track (Client Component)
//   2. AboutTrackIntro    — Introduction positionnement, entièrement track-aware (Client Component)
//   3. journey            — Timeline du parcours (Supabase) — contenu générique exhaustif
//   4. values             — Valeurs professionnelles (Supabase) — grille 2 colonnes
//   5. passions           — En dehors du travail (Supabase)
//   6. goals2026          — Objectifs 2026 avec checklist (Supabase)
//
// ProfileNarrative a été remplacé par AboutTrackIntro pour éliminer la redondance
// avec le contenu Supabase (journey, goals) et mieux adapter l'intro au track.

import type { Metadata } from "next";
import { getAboutPageCached } from "@/lib/data/about.cached";
import Link from "next/link";
import { Suspense } from "react";
import ProfileFactsCard from "@/components/ProfileFactsCard";
import AboutTrackIntro from "@/components/AboutTrackIntro";
import TechStackGrid from "@/components/TechStackGrid";
import VisualTimeline from "@/components/VisualTimeline";
import CareerTimeline from "@/components/CareerTimeline";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  const name  = process.env.NEXT_PUBLIC_OG_NAME || "Aïcha Imène DAHOUMANE";
  const title = isFr ? `À propos — ${name}` : `About — ${name}`;
  const description = isFr
    ? "De l'administration systèmes & réseaux au développement Salesforce. Développeuse Salesforce & IT Ops Engineer ouverte à toutes opportunités — CDI, CDD, freelance ou mission."
    : "From systems & network administration to Salesforce development. Salesforce Developer & IT Ops Engineer — open to all opportunities: permanent, fixed-term, freelance, or contract.";

  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/about`;

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/about`,
        fr: `${siteUrl}/fr/about`,
        "x-default": `${siteUrl}/en/about`,
      }
    },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      siteName,
      images: [{ url: `${siteUrl}/${locale}/about/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/${locale}/about/opengraph-image`],
    },
  };
}

type AboutBody = {
  introduction?: string;
  journey?: { title?: string; paragraphs?: string[] };
  values?: { title?: string; items?: { title: string; description: string }[] };
  passions?: { title?: string; paragraphs?: string[] };
  goals2026?: { title?: string; items?: string[] };
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = locale === "fr" ? "fr" : "en";

  const siteUrl = getSiteUrl();
  const about = await getAboutPageCached(safeLocale);

  if (!about) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Breadcrumb retour accueil */}
        <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-sm text-muted-2">
          <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded">
            {safeLocale === "fr" ? "Accueil" : "Home"}
          </Link>
          <span aria-hidden="true">›</span>
          <span>{safeLocale === "fr" ? "À propos" : "About"}</span>
        </nav>
        <h1 className="text-3xl font-semibold">
          {safeLocale === "fr" ? "À propos" : "About"}
        </h1>
        <p className="mt-4 opacity-80">
          {safeLocale === "fr"
            ? "Contenu indisponible pour le moment."
            : "Content not available yet."}
        </p>
      </div>
    );
  }

  const body = (about.body ?? {}) as AboutBody;

  const journey = body.journey;
  const values = body.values;
  const passions = body.passions;
  // goals2026 délégué à AboutTrackGoals (Client Component track-aware)

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: safeLocale === "fr" ? "Accueil" : "Home", item: `${siteUrl}/${safeLocale}` },
      { "@type": "ListItem", position: 2, name: safeLocale === "fr" ? "À propos" : "About", item: `${siteUrl}/${safeLocale}/about` },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />

      {/* Breadcrumb — navigation retour vers l'accueil
          Permet à l'utilisateur de comprendre qu'il est sur une page dédiée (hors landing). */}
      <nav aria-label={safeLocale === "fr" ? "Fil d'Ariane" : "Breadcrumb"} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded px-1">
          {safeLocale === "fr" ? "Accueil" : "Home"}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{safeLocale === "fr" ? "À propos" : "About"}</span>
      </nav>

      <header>
        <h1 className="text-3xl font-semibold">{about.headline}</h1>
        {about.intro ? (
          <p className="mt-4 text-base opacity-90">{about.intro}</p>
        ) : null}
      </header>

      {/* EN BREF (ProfileFactsCard) — déplacé depuis le hero
          Affiche : focus, localisation, langues, postes visés, disponibilité.
          Utilise un hook client (useTrack), donc enveloppé dans Suspense. */}
      <section className="mt-10">
        <Suspense fallback={
          <div className="h-48 rounded-2xl border bg-black/5 dark:bg-white/5 animate-pulse" />
        }>
          <ProfileFactsCard />
        </Suspense>
      </section>

      {/* INTRODUCTION TRACK-AWARE (AboutTrackIntro)
          Remplace ProfileNarrative : positionnement + compétences + différenciant
          Adapté au track actif (Salesforce → cyan / IT Ops → violet).
          p4 exclu volontairement (objectif 2026 → déjà dans la section goals ci-dessous). */}
      <section className="mt-10">
        <SectionTitle>
          {safeLocale === "fr" ? "Positionnement" : "Positioning"}
        </SectionTitle>
        <div className="mt-4">
        <Suspense fallback={
          <div className="rounded-2xl border p-6 space-y-3">
            <div className="h-3 w-16 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
            <div className="h-4 rounded bg-black/5 dark:bg-white/5 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-black/5 dark:bg-white/5 animate-pulse" />
          </div>
        }>
          <AboutTrackIntro />
        </Suspense>
        </div>
      </section>

      {/* ── TECH STACK GRID ──────────────────────────────────────────────────── */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">
          {safeLocale === "fr" ? "Stack technique" : "Tech stack"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {safeLocale === "fr"
            ? "Survolez chaque badge pour voir le niveau de maîtrise et le contexte d'utilisation."
            : "Hover each badge to see proficiency level and usage context."}
        </p>
        <TechStackGrid />
      </section>

      {/* ── FRISE CHRONOLOGIQUE — données statiques, toujours visible ──────────
          Complément visuel à la section "Mon parcours" Supabase ci-dessous.
          Affiche les années, types et organisations clairement. */}
      <section className="mt-10 rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <SectionTitle>
          {safeLocale === "fr" ? "Parcours en un coup d'œil" : "Career at a glance"}
        </SectionTitle>
        <p className="mt-2 text-sm text-muted">
          {safeLocale === "fr"
            ? "Formation → Stage → Alternance → CDI — une montée en compétences continue."
            : "Training → Internship → Work-study → Full-time — continuous upskilling."}
        </p>
        <CareerTimeline locale={safeLocale} />
      </section>

      <div className="mt-10 space-y-10">
        {/* PARCOURS / JOURNEY — rendu en timeline verticale
            Chaque paragraphe représente une étape du parcours.
            Ligne verticale + numéro de phase pour rythmer la lecture. */}
        {journey?.title || (journey?.paragraphs?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>{journey?.title ?? (safeLocale === "fr" ? "Parcours" : "Journey")}</SectionTitle>
            {Array.isArray(journey?.paragraphs) ? (
              <VisualTimeline
                steps={journey!.paragraphs!}
                ariaLabel={journey?.title ?? (safeLocale === "fr" ? "Parcours" : "Journey")}
              />
            ) : null}
          </section>
        ) : null}

        {/* VALEURS / VALUES */}
        {values?.title || (values?.items?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>
              {values?.title ?? (safeLocale === "fr" ? "Valeurs" : "Values")}
            </SectionTitle>

            {Array.isArray(values?.items) ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {values!.items!.map((it, idx) => (
                  <article key={idx} className="rounded-2xl border p-4">
                    <h3 className="font-semibold">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed opacity-90">
                      {it.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {/* EN DEHORS DU TRAVAIL / PASSIONS */}
        {passions?.title || (passions?.paragraphs?.length ?? 0) > 0 ? (
          <section className="rounded-2xl border p-6">
            <SectionTitle>
              {passions?.title ?? (safeLocale === "fr" ? "En dehors du travail" : "Outside of work")}
            </SectionTitle>
            {Array.isArray(passions?.paragraphs) ? (
              <div className="mt-4 space-y-3">
                {passions!.paragraphs!.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed opacity-90">
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

      </div>

{/* Bouton retour accueil — navigation alternative en bas de page */}
      <div className="mt-12 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${safeLocale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 soft-ring"
        >
          ← {safeLocale === "fr" ? "Retour à l'accueil" : "Back to home"}
        </Link>
      </div>
    </div>
  );
}