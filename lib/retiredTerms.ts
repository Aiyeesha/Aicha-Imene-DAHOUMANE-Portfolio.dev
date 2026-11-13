// lib/retiredTerms.ts
// -------------------
// Terms, routes and names that were deliberately removed from the site and
// must not come back through a copy-paste, an old branch or a translation.
// Checked on every pull request by __tests__/retired-terms.test.ts and by
// `npm run content:safety` (scripts/content/check-publish-safety.ts).
//
// To retire something: remove it everywhere, then add an entry here with the
// reason and the date, so the next person knows why it is forbidden.
//
// Scope: what the site publishes (UI messages, content, components, pages).
// Drafts (content/blog/unpublished), editorial notes, the CHANGELOG and code
// comments in .ts/.tsx files are left out on purpose: they may name a
// retired item to document it, and are never shown to visitors.

import fs from "node:fs";
import path from "node:path";

export type RetiredTerm = {
  /** Literal text, matched case-insensitively. */
  term: string;
  /** Why it was retired (shown when the check fails). */
  reason: string;
  /** When it was retired (YYYY-MM-DD or YYYY-MM). */
  since: string;
};

export const RETIRED_TERMS: RetiredTerm[] = [
  {
    term: "/resources",
    reason: "Page fusionnée dans /uses (« Setup & Outils ») ; l'ancienne URL ne fait plus que rediriger.",
    since: "2026",
  },
  {
    term: "/api/redis-test",
    reason: "Endpoint de diagnostic supprimé : ne doit plus être référencé.",
    since: "2026",
  },
];

/** Folders scanned, relative to the repository root. */
export const RETIRED_SCAN_ROOTS = ["messages", "content", "components", "app"] as const;

/** Paths skipped inside the scanned folders (drafts and editorial notes). */
const EXCLUDED = [
  path.join("content", "blog", "unpublished"),
  path.join("content", "blog", "EDITORIAL_PLAN.md"),
  path.join("content", "blog", "TEMPLATE.mdx"),
];

const SCANNED_EXT = new Set([".json", ".ts", ".tsx", ".mdx", ".md"]);

export type RetiredHit = { term: string; file: string; line: number; text: string };

/** A whole-line code comment ("// …", "* …", "/* …", "{/* …"). */
const isCommentLine = (line: string) => /^\s*(\/\/|\/?\*|\{\/\*)/.test(line);

function walk(dir: string, root: string, out: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(root, abs);
    if (EXCLUDED.some((ex) => rel === ex || rel.startsWith(ex + path.sep))) continue;
    if (entry.isDirectory()) walk(abs, root, out);
    else if (SCANNED_EXT.has(path.extname(entry.name))) out.push(abs);
  }
}

/** Escapes a literal for use inside a RegExp. */
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Every occurrence of a retired term in the published sources. A term is
 * matched on its own: "/resources" does not match "/resources-hub", and a
 * name does not match inside a longer word.
 */
export function retiredTermHits(
  terms: RetiredTerm[] = RETIRED_TERMS,
  root: string = process.cwd(),
): RetiredHit[] {
  if (terms.length === 0) return [];
  const files: string[] = [];
  for (const dir of RETIRED_SCAN_ROOTS) {
    const abs = path.join(root, dir);
    if (fs.existsSync(abs)) walk(abs, root, files);
  }
  // Word boundaries only where the term starts or ends with a word character
  // ("/resources" starts with "/", which \b would not anchor).
  const patterns = terms.map((t) => {
    const start = /^\w/.test(t.term) ? "\\b" : "";
    const end = /\w$/.test(t.term) ? "(?![\\w-])" : "";
    return { term: t.term, re: new RegExp(start + escapeRe(t.term) + end, "i") };
  });

  const hits: RetiredHit[] = [];
  for (const file of files) {
    const isCode = /\.tsx?$/.test(file);
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((text, i) => {
      if (isCode && isCommentLine(text)) return;
      for (const { term, re } of patterns) {
        if (re.test(text)) {
          hits.push({ term, file: path.relative(root, file), line: i + 1, text: text.trim().slice(0, 160) });
        }
      }
    });
  }
  return hits;
}
