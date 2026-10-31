// lib/search/paletteIndex.ts
// --------------------------
// Compact search index for the ⌘K command palette: published projects, blog
// posts and certifications, one list per locale.
//
// Served as static JSON by app/api/palette-index/[locale]/route.ts (built
// once per locale) and fetched only when the palette opens, so the pages'
// HTML does not grow. Each entry carries a title, a destination and a few
// keywords (tags, technologies, issuer) that cmdk also matches on.

import { readAllPosts, type BlogLocale } from "@/content/blog/fs";
import { allPublished } from "@/lib/data/projectsSource";
import { certifications } from "@/content/certifications";

export type PaletteLocale = "fr" | "en" | "es";

export type PaletteEntry = {
  /** Unique within the index: "project:<slug>", "post:<slug>", "cert:<id>". */
  id: string;
  title: string;
  /** Short secondary line (issuer, track, date). */
  hint?: string;
  href: string;
  keywords: string[];
};

export type PaletteIndex = {
  projects: PaletteEntry[];
  posts: PaletteEntry[];
  certifications: PaletteEntry[];
};

/** Keywords per entry: enough to match on a technology without bloating the JSON. */
const MAX_KEYWORDS = 12;

export const normPaletteLocale = (l: string): PaletteLocale =>
  l === "fr" ? "fr" : l === "es" ? "es" : "en";

/** Trims, removes duplicates (case-insensitive) and caps the keyword list. */
function keywords(...lists: (readonly string[] | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    for (const raw of list ?? []) {
      const k = raw.trim();
      if (!k || seen.has(k.toLowerCase())) continue;
      seen.add(k.toLowerCase());
      out.push(k);
      if (out.length === MAX_KEYWORDS) return out;
    }
  }
  return out;
}

// ── Certifications ──────────────────────────────────────────────────────────
// Ids match the <article id> anchors on the certifications page, so a result
// scrolls straight to its card. Names follow that page's wording; the
// earned-certification skills come from content/certifications.ts.
type CertDef = {
  id: string;
  name: Record<PaletteLocale, string>;
  issuer: string;
  extra?: string[];
};

const EARNED_CERTS: CertDef[] = [
  {
    id: "tai-greta-valdoise",
    name: {
      fr: "Technicien(ne) d'Assistance Informatique",
      en: "IT Support Technician",
      es: "Técnico/a de Asistencia Informática",
    },
    issuer: "GRETA du Val d'Oise",
    extra: ["TAI", "RNCP 4"],
  },
  {
    id: "tssr-greta-valdoise",
    name: {
      fr: "Technicienne Supérieure Systèmes & Réseaux",
      en: "Higher Technician in Systems & Networks",
      es: "Técnica Superior en Sistemas y Redes",
    },
    issuer: "GRETA du Val d'Oise",
    extra: ["TSSR", "RNCP 5"],
  },
  {
    id: "dev-concepteur-logiciel-openclassrooms",
    name: {
      fr: "Développeur Concepteur Logiciel",
      en: "Développeur Concepteur Logiciel",
      es: "Développeur Concepteur Logiciel",
    },
    issuer: "OpenClassrooms",
    extra: ["DCL", "RNCP 6", "Salesforce"],
  },
  {
    id: "linguaskill-cambridge",
    name: {
      fr: "Linguaskill Business — C1+",
      en: "Linguaskill Business — C1+",
      es: "Linguaskill Business — C1+",
    },
    issuer: "Cambridge Assessment English",
    extra: ["English", "Anglais", "Inglés"],
  },
];

const UPCOMING_CERTS: CertDef[] = [
  { id: "sf-platform-foundations", name: same("Salesforce Platform Foundations"), issuer: "Salesforce" },
  { id: "sf-platform-administrator", name: same("Salesforce Platform Administrator"), issuer: "Salesforce", extra: ["Admin"] },
  { id: "sf-platform-app-builder", name: same("Salesforce Platform App Builder"), issuer: "Salesforce" },
  { id: "sf-platform-developer-i", name: same("Salesforce Platform Developer"), issuer: "Salesforce", extra: ["Apex", "LWC", "PD1"] },
  { id: "comptia-security-plus", name: same("CompTIA Security+ (SY0-701)"), issuer: "CompTIA", extra: ["Security", "Cybersécurité", "Ciberseguridad"] },
];

function same(name: string): Record<PaletteLocale, string> {
  return { fr: name, en: name, es: name };
}

const UPCOMING_HINT: Record<PaletteLocale, string> = {
  fr: "en préparation",
  en: "in preparation",
  es: "en preparación",
};

/** Ids of every certification card the index links to (used by the tests). */
export const PALETTE_CERT_IDS = [...EARNED_CERTS, ...UPCOMING_CERTS].map((c) => c.id);

function certEntries(locale: PaletteLocale): PaletteEntry[] {
  const skillsById = new Map(certifications.map((c) => [c.id, c.skills]));
  const toEntry = (c: CertDef, upcoming: boolean): PaletteEntry => ({
    id: `cert:${c.id}`,
    title: c.name[locale],
    hint: upcoming ? `${c.issuer} · ${UPCOMING_HINT[locale]}` : c.issuer,
    href: `/${locale}/certifications#${c.id}`,
    keywords: keywords([c.issuer], c.extra, skillsById.get(c.id)),
  });
  return [
    ...EARNED_CERTS.map((c) => toEntry(c, false)),
    ...UPCOMING_CERTS.map((c) => toEntry(c, true)),
  ];
}

// ── Index ───────────────────────────────────────────────────────────────────

export function buildPaletteIndex(rawLocale: string): PaletteIndex {
  const locale = normPaletteLocale(rawLocale);

  const projects: PaletteEntry[] = allPublished(locale).map((p) => ({
    id: `project:${p.slug}`,
    title: p.title,
    hint: p.track === "salesforce" ? "Salesforce" : p.track === "itops" ? "IT Ops" : undefined,
    href: `/${locale}/projects/${p.slug}`,
    keywords: keywords(p.tech_stack, p.tags, p.categories),
  }));

  // Same source and order as the blog index (most recent first).
  const posts: PaletteEntry[] = readAllPosts(locale as BlogLocale).map((post) => ({
    id: `post:${post.slug}`,
    title: post.title,
    hint: post.date.slice(0, 10),
    href: `/${locale}/blog/${post.slug}`,
    keywords: keywords(post.tags),
  }));

  return { projects, posts, certifications: certEntries(locale) };
}
