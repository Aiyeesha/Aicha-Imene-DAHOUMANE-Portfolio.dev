/**
 * Pre-publish safety check for `public.projects`.
 *
 * Origin: portfolio audit, 2026-08-13. Two real risks were found by querying
 * Supabase directly (not hypothetical):
 *   1. 9 draft projects (4 itops + 5 salesforce) existed in en/fr with zero
 *      matching es row — if published as-is, the ES site would silently
 *      diverge from EN/FR (missing card, or a wrong total on /projects).
 *   2. Two of those drafts (orgdocs-saas, sfrelease-saas) are this author's
 *      own SaaS products, which must never go `live_url`/`published` before
 *      2027 regardless of who flips the status — a career-strategy
 *      constraint, not a code bug, so nothing in the schema enforces it on
 *      its own.
 *
 * This script re-checks both conditions against the live table. Read-only —
 * it never mutates `public.projects`. Run it before flipping any project's
 * status to "published", or on a schedule (see
 * .github/workflows/content-publish-safety.yml).
 *
 * Usage:
 *   npx tsx scripts/check-publish-safety.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing env vars:\n  - NEXT_PUBLIC_SUPABASE_URL\n  - SUPABASE_SERVICE_ROLE_KEY\n\n" +
      "In CI, add SUPABASE_SERVICE_ROLE_KEY as a repo secret (Settings → Secrets and " +
      "variables → Actions) — see .github/workflows/content-publish-safety.yml."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const REQUIRED_LOCALES = ["en", "fr", "es"] as const;

// Slugs that must never be published/have a live_url before 2027, independent
// of who flips the status — these are the author's own SaaS products, not
// portfolio case studies. Add any future SaaS product slug here as soon as
// its first Supabase row is created, even in draft.
const SAAS_EMBARGO_SLUGS = ["orgdocs-saas", "sfrelease-saas"] as const;
const SAAS_EMBARGO_UNTIL = "2027-01-01";

type Row = {
  slug: string;
  locale: string;
  status: string | null;
  live_url: string | null;
  featured: boolean | null;
};

async function main() {
  const { data, error } = await supabase
    .from("projects")
    .select("slug, locale, status, live_url, featured");

  if (error) {
    console.error("Fetch failed:", error.message);
    process.exit(1);
  }

  const rows = (data ?? []) as Row[];
  let failed = false;

  // ── Check 1: SaaS embargo ────────────────────────────────────────────────
  // Hard-fail on ANY row for an embargoed slug that is published or carries
  // a live_url, in any locale — this is the one check with zero tolerance.
  const embargoViolations = rows.filter(
    (r) =>
      SAAS_EMBARGO_SLUGS.includes(r.slug as (typeof SAAS_EMBARGO_SLUGS)[number]) &&
      (r.status === "published" || Boolean(r.live_url))
  );

  if (embargoViolations.length > 0) {
    failed = true;
    console.error(
      `\n✗ SaaS embargo violation (must stay unpublished/no live_url until ${SAAS_EMBARGO_UNTIL}):`
    );
    for (const v of embargoViolations) {
      console.error(
        `  - ${v.slug} [${v.locale}]: status=${v.status ?? "null"}, live_url=${v.live_url ?? "null"}`
      );
    }
  } else {
    console.log(`✓ SaaS embargo: no violations (${SAAS_EMBARGO_SLUGS.join(", ")}).`);
  }

  // ── Check 2: locale parity for published projects ───────────────────────
  // A slug published in any locale must have a published (or "multi") row
  // for all 3 locales, or the missing-locale site silently diverges.
  const bySlug = new Map<string, Row[]>();
  for (const r of rows) {
    const list = bySlug.get(r.slug) ?? [];
    list.push(r);
    bySlug.set(r.slug, list);
  }

  const parityViolations: { slug: string; missing: string[] }[] = [];
  for (const [slug, localeRows] of bySlug) {
    const hasPublished = localeRows.some((r) => r.status === "published");
    if (!hasPublished) continue;

    const coveredLocales = new Set<string>();
    for (const r of localeRows) {
      if (r.status !== "published") continue;
      if (r.locale === "multi") {
        REQUIRED_LOCALES.forEach((l) => coveredLocales.add(l));
      } else {
        coveredLocales.add(r.locale);
      }
    }

    const missing = REQUIRED_LOCALES.filter((l) => !coveredLocales.has(l));
    if (missing.length > 0) {
      parityViolations.push({ slug, missing });
    }
  }

  if (parityViolations.length > 0) {
    failed = true;
    console.error(`\n✗ Locale parity violation (published without all 3 locales):`);
    for (const v of parityViolations) {
      console.error(`  - ${v.slug}: missing [${v.missing.join(", ")}]`);
    }
  } else {
    console.log("✓ Locale parity: every published slug covers en/fr/es (or 'multi').");
  }

  if (failed) {
    console.error("\ncheck-publish-safety: FAILED");
    process.exit(1);
  }

  console.log("\ncheck-publish-safety: OK");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
