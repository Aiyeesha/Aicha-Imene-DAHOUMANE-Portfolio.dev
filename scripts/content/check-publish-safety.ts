/**
 * Pre-publish safety check on content/ (projects are served from the
 * repository since Supabase was retired).
 *
 * Two rules, implemented in lib/contentChecks.ts and also enforced by
 * __tests__/content-checks.test.ts on every pull request:
 *   1. SaaS embargo: the author's own SaaS products are neither published nor
 *      given a live URL before 2027;
 *   2. locale parity: a published project has a title in en, fr and es,
 *      otherwise the FR or ES site silently diverges.
 *
 * Read-only, needs no secret. The former version, which read the Supabase
 * `projects` table, is kept in scripts/archive/check-publish-safety-supabase.ts.
 *
 * Usage:
 *   npm run content:safety
 */

import {
  SAAS_EMBARGO_SLUGS,
  SAAS_EMBARGO_UNTIL,
  localeParityGaps,
  saasEmbargoViolations,
} from "../../lib/contentChecks";

let failed = false;

const embargo = saasEmbargoViolations();
if (embargo.length > 0) {
  failed = true;
  console.error(`\n✗ SaaS embargo violation (must stay unpublished, without live URL, until ${SAAS_EMBARGO_UNTIL}):`);
  for (const v of embargo) console.error(`  - ${v.slug}: status=${v.status}, liveUrl=${v.liveUrl ?? "none"}`);
} else {
  console.log(`✓ SaaS embargo: no violations (${SAAS_EMBARGO_SLUGS.join(", ")}).`);
}

const parity = localeParityGaps();
if (parity.length > 0) {
  failed = true;
  console.error("\n✗ Locale parity violation (published without a title in all 3 locales):");
  for (const v of parity) console.error(`  - ${v.slug}: missing [${v.missing.join(", ")}]`);
} else {
  console.log("✓ Locale parity: every published project covers en/fr/es.");
}

if (failed) {
  console.error("\ncheck-publish-safety: FAILED");
  process.exit(1);
}
console.log("\ncheck-publish-safety: OK");
