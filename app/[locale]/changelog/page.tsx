// app/[locale]/changelog/page.tsx
// ---------------------------------
// Page publique du changelog — lit CHANGELOG.md depuis le système de fichiers
// et l'affiche avec un rendu structuré par version.
//
// Le fichier suit le format "Keep a Changelog" :
//   ## [x.y.z] — YYYY-MM-DD
//   ### Added / Changed / Fixed / Removed
//   - item

import fs   from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";

// SSG : le changelog ne change qu'à chaque déploiement
export const dynamic = "force-static";

type Locale = "en" | "fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Aïcha Imène DAHOUMANE — Salesforce & IT Ops";
  const urlPath = `${siteUrl}/${locale}/changelog`;
  const title = "Changelog — Aïcha Imène DAHOUMANE";
  const description = isFr
    ? "Historique des versions et des améliorations du portfolio."
    : "Version history and improvements of the portfolio.";
  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
      languages: { en: `${siteUrl}/en/changelog`, fr: `${siteUrl}/fr/changelog` },
    },
    openGraph: { url: urlPath, type: "website", locale, title, description, siteName },
    twitter: { card: "summary", title, description },
  };
}

// ── Parser CHANGELOG.md ───────────────────────────────────────────────────────

type ChangeSection = {
  type: string;   // "Added" | "Changed" | "Fixed" | "Removed" | "Planned"
  items: string[];
};

type ChangeVersion = {
  version: string;   // "1.4.0" | "Unreleased"
  date: string;      // "2026-03-04" | ""
  sections: ChangeSection[];
  compareUrl?: string;
};

function parseChangelog(raw: string): ChangeVersion[] {
  const lines    = raw.split("\n");
  const versions: ChangeVersion[] = [];
  let   current: ChangeVersion | null = null;
  let   section: ChangeSection | null = null;

  // Extraire les liens de comparaison en bas du fichier
  const compareLinks: Record<string, string> = {};
  for (const line of lines) {
    const m = line.match(/^\[([^\]]+)\]:\s*(https?:\/\/\S+)/);
    if (m) compareLinks[m[1].toLowerCase()] = m[2];
  }

  for (const line of lines) {
    // Titre de version : ## [1.4.0] — 2026-03-04  ou  ## [Unreleased]
    const versionMatch = line.match(/^##\s+\[([^\]]+)\](?:\s+[—-]\s+(.+))?/);
    if (versionMatch) {
      if (current) versions.push(current);
      const vLabel = versionMatch[1];
      current = {
        version:    vLabel,
        date:       versionMatch[2]?.trim() || "",
        sections:   [],
        compareUrl: compareLinks[vLabel.toLowerCase()],
      };
      section = null;
      continue;
    }

    // Titre de section : ### Added
    const sectionMatch = line.match(/^###\s+(.+)/);
    if (sectionMatch && current) {
      section = { type: sectionMatch[1].trim(), items: [] };
      current.sections.push(section);
      continue;
    }

    // Item de liste : - ...
    const itemMatch = line.match(/^-\s+(.+)/);
    if (itemMatch && section) {
      section.items.push(itemMatch[1].trim());
    }
  }

  if (current) versions.push(current);
  return versions;
}

// ── Couleurs des badges de section ───────────────────────────────────────────

const SECTION_COLORS: Record<string, string> = {
  Added:    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Changed:  "bg-sky-500/10     text-sky-700     dark:text-sky-300",
  Fixed:    "bg-amber-500/10   text-amber-700   dark:text-amber-300",
  Removed:  "bg-rose-500/10    text-rose-700    dark:text-rose-300",
  Planned:  "bg-violet-500/10  text-violet-700  dark:text-violet-300",
};

function sectionColor(type: string) {
  return SECTION_COLORS[type] ?? "bg-slate-500/10 text-slate-700 dark:text-slate-300";
}

// ── Labels i18n minimaux (inline — pas de namespace séparé) ──────────────────

const LABELS = {
  en: {
    title:      "Changelog",
    subtitle:   "All notable changes to this portfolio.",
    unreleased: "Unreleased",
    backHome:   "← Back to home",
    compare:    "View diff ↗",
    format:     "Follows",
    formatLink: "Keep a Changelog",
    semver:     "Semantic Versioning",
  },
  fr: {
    title:      "Changelog",
    subtitle:   "Toutes les modifications notables de ce portfolio.",
    unreleased: "Non publié",
    backHome:   "← Retour à l'accueil",
    compare:    "Voir le diff ↗",
    format:     "Format",
    formatLink: "Keep a Changelog",
    semver:     "Semantic Versioning",
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "fr" ? "fr" : "en";
  const l = LABELS[safeLocale];

  // Lire le fichier depuis la racine du projet (process.cwd() = portfolio/)
  const raw      = fs.readFileSync(path.join(process.cwd(), "CHANGELOG.md"), "utf-8");
  const versions = parseChangelog(raw);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-2">
        <Link href={`/${safeLocale}`} className="hover:underline soft-ring rounded px-1">
          {safeLocale === "fr" ? "Accueil" : "Home"}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-muted">{l.title}</span>
      </nav>

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <h1 className="text-3xl font-semibold">{l.title}</h1>
      <p className="mt-2 text-sm text-muted-2">{l.subtitle}</p>

      {safeLocale === "fr" && (
        <p className="mt-3 rounded-lg border border-black/10 bg-black/5 px-4 py-2.5 text-xs text-muted-2 dark:border-white/10 dark:bg-white/5">
          Ce changelog est rédigé en anglais, langue de référence du code source.
        </p>
      )}

      <p className="mt-2 text-xs text-muted-2">
        {l.format}{" "}
        <a
          href="https://keepachangelog.com/en/1.1.0/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:opacity-80"
        >
          {l.formatLink}
        </a>
      </p>

      {/* ── Liste des versions ──────────────────────────────────────────────── */}
      <div className="mt-10 space-y-10">
        {versions.map((v) => (
          <article key={v.version}>

            {/* En-tête de version */}
            <div className="flex flex-wrap items-baseline gap-3 border-b border-black/10 dark:border-white/10 pb-3">
              <h2 className="text-xl font-semibold">
                {v.version === "Unreleased" ? l.unreleased : v.date || "—"}
              </h2>
            </div>

            {/* Sections (Added, Changed, Fixed…) */}
            {v.sections.length > 0 ? (
              <div className="mt-4 space-y-5">
                {v.sections.map((s) => (
                  <div key={s.type}>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${sectionColor(s.type)}`}
                    >
                      {s.type}
                    </span>
                    <ul className="mt-2 space-y-1.5 pl-4">
                      {s.items.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted">
                          <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
                          {/* Mise en gras du texte entre ** */}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item
                                .replace(/&/g, "&amp;")
                                .replace(/</g, "&lt;")
                                .replace(/>/g, "&gt;")
                                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                                .replace(/`(.+?)`/g, "<code class=\"font-mono text-xs bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded\">$1</code>"),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-2 italic">—</p>
            )}
          </article>
        ))}
      </div>

      {/* ── Retour accueil ──────────────────────────────────────────────────── */}
      <div className="mt-14 border-t border-black/10 dark:border-white/10 pt-8">
        <Link
          href={`/${safeLocale}`}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-5 py-2.5 text-sm text-muted-2 hover:bg-black/5 dark:hover:bg-white/5 soft-ring transition-colors"
        >
          {l.backHome}
        </Link>
      </div>
    </div>
  );
}
