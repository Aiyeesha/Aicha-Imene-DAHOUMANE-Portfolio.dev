// resources/page.tsx
// -------------------
// Page statique "Ressources & Boîte à outils".
// Présente les outils, stacks et références utilisés au quotidien.
// Aucune dépendance Supabase — données dans content/resources.ts.

import Link from "next/link";
import type { Metadata } from "next";
import { RESOURCE_CATEGORIES, type Locale } from "@/content/resources";

// ── Types ────────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ locale: string }>;
};

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "Ressources & Outils — Aïcha Imène DAHOUMANE"
      : "Resources & Toolbox — Aïcha Imène DAHOUMANE",
    description: isFr
      ? "Outils, stacks et ressources d'apprentissage utilisés en développement Salesforce, IT Ops et développement web."
      : "Tools, stacks, and learning resources used in Salesforce development, IT Ops, and web development.",
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

  const labels = {
    headline:    isFr ? "Ressources & Boîte à outils" : "Resources & Toolbox",
    intro:       isFr
      ? "Une sélection d'outils, de stacks et de références que j'utilise et recommande — en développement Salesforce, IT Ops et web."
      : "A curated selection of tools, stacks, and references I use and recommend — across Salesforce development, IT Ops, and web.",
    breadcrumb:  isFr ? "Ressources" : "Resources",
    home:        isFr ? "Accueil" : "Home",
    visitLink:   isFr ? "Visiter" : "Visit",
    backHome:    isFr ? "← Retour à l'accueil" : "← Back to home",
    ariaLabel:   isFr ? "Fil d'Ariane" : "Breadcrumb",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">

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
                    aria-label={`${labels.visitLink} ${resource.name} (${isFr ? "nouvel onglet" : "new tab"})`}
                    className="inline-flex items-center gap-1.5 self-start rounded-full border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-muted-2 hover:border-cyan-400/40 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors soft-ring"
                  >
                    {labels.visitLink} ↗
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
