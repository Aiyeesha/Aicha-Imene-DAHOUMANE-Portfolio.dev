// resources/page.tsx
// -------------------
// Page statique "Ressources & Boîte à outils".
// Présente les outils, stacks et références utilisés au quotidien.
// Aucune dépendance Supabase — données dans content/resources.ts.

import Link from "next/link";
import type { Metadata } from "next";
import { RESOURCE_CATEGORIES, type Locale } from "@/content/resources";
import { getSiteUrl } from "@/lib/siteUrl";
import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

// ── Types ────────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ locale: string }>;
};

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const isEs = locale === "es";
  const title = isFr
    ? "Ressources & Outils — Aïcha Imène DAHOUMANE"
    : isEs
    ? "Recursos y herramientas — Aïcha Imène DAHOUMANE"
    : "Resources & Toolbox — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Outils, stacks et ressources d'apprentissage utilisés en développement Salesforce, IT Ops et développement web."
    : isEs
    ? "Herramientas, stacks y recursos de aprendizaje utilizados en desarrollo Salesforce, IT Ops y desarrollo web."
    : "Tools, stacks, and learning resources used in Salesforce development, IT Ops, and web development.";
  const siteUrl = getSiteUrl();
  const urlPath = `${siteUrl}/${locale}/resources`;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: {
        en: `${siteUrl}/en/resources`,
        fr: `${siteUrl}/fr/resources`,
        "x-default": `${siteUrl}/en/resources`,
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
      images: [{ url: `${urlPath}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${urlPath}/opengraph-image`],
    },
  };
}

// ── Tag badge ────────────────────────────────────────────────────────────────

const TAG_CLASSES: Record<string, string> = {
  free:        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "open-source": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  book:        "bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

function ResourceTag({ tag }: { tag: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${TAG_CLASSES[tag] ?? "bg-black/10 text-slate-600 dark:bg-white/10 dark:text-white/60"}`}>
      {tag}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "fr" ? "fr" : "en";
  const isFr = safeLocale === "fr";
  // Note: `Locale` (content/resources.ts) is a fr/en-only content-data type
  // out of scope for this change, so `safeLocale`/`RESOURCE_CATEGORIES` keep
  // falling back to "en" for "es" as before. `isEs` only affects the plain
  // text labels below, in line with the isFr/isEs/en pattern used elsewhere.
  const isEs = locale === "es";
  const siteUrl = getSiteUrl();

  const labels = {
    headline:    isFr ? "Ressources & Boîte à outils" : isEs ? "Recursos y caja de herramientas" : "Resources & Toolbox",
    intro:       isFr
      ? "Une sélection d'outils, de stacks et de références que j'utilise et recommande — en développement Salesforce, IT Ops et web."
      : isEs
      ? "Una selección de herramientas, stacks y referencias que uso y recomiendo — en desarrollo Salesforce, IT Ops y web."
      : "A curated selection of tools, stacks, and references I use and recommend — across Salesforce development, IT Ops, and web.",
    breadcrumb:  isFr ? "Ressources" : isEs ? "Recursos" : "Resources",
    home:        isFr ? "Accueil" : isEs ? "Inicio" : "Home",
    visitLink:   isFr ? "Visiter" : isEs ? "Visitar" : "Visit",
    backHome:    isFr ? "← Retour à l'accueil" : isEs ? "← Volver al inicio" : "← Back to home",
    ariaLabel:   isFr ? "Fil d'Ariane" : isEs ? "Ruta de navegación" : "Breadcrumb",
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: labels.home, item: `${siteUrl}/${safeLocale}` },
      { "@type": "ListItem", position: 2, name: isFr ? "Ressources" : isEs ? "Recursos" : "Resources", item: `${siteUrl}/${safeLocale}/resources` },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLdBreadcrumb) }} />

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav aria-label={labels.ariaLabel} className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link
          href={`/${safeLocale}`}
          className="hover:underline soft-ring rounded px-1"
        >
          {labels.home}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{labels.breadcrumb}</span>
      </nav>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="mb-10">
        <h1 className="text-3xl font-semibold">{labels.headline}</h1>
        <p className="mt-3 text-base opacity-90 max-w-2xl">{labels.intro}</p>
      </header>

      {/* ── Category sections ───────────────────────────────────────────────── */}
      <div className="space-y-12">
        {RESOURCE_CATEGORIES.map((category) => (
          <section key={category.id} aria-labelledby={`cat-${category.id}`}>

            {/* Category header */}
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="text-2xl leading-none">
                {category.icon}
              </span>
              <h2
                id={`cat-${category.id}`}
                className="text-xl font-semibold"
              >
                {category.title[safeLocale]}
              </h2>
            </div>

            {/* Resource cards grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {category.resources.map((resource) => (
                <article
                  key={resource.name}
                  className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 flex flex-col gap-3 hover:border-cyan-400/40 transition-colors"
                >
                  {/* Name + tag */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-snug">
                      {resource.name}
                    </h3>
                    {resource.tag && <ResourceTag tag={resource.tag} />}
                  </div>

                  {/* Description */}
                  <p className="flex-1 text-sm text-muted-2 leading-relaxed">
                    {resource.description[safeLocale]}
                  </p>

                  {/* Visit link */}
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${labels.visitLink} ${resource.name} (${isFr ? "nouvel onglet" : isEs ? "nueva pestaña" : "new tab"})`}
                    className="inline-flex items-center gap-1.5 self-start rounded-full border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-muted-2 hover:border-cyan-400/40 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors soft-ring"
                  >
                    {labels.visitLink}<span aria-hidden="true"> ↗</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ── Back to home ────────────────────────────────────────────────────── */}
      <div className="mt-12 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${safeLocale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm text-muted-2 hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors"
        >
          {labels.backHome}
        </Link>
      </div>
    </div>
  );
}
