/**
 * Pre-publish safety check on content/ (projects are served from the
 * repository since Supabase was retired).
 *
 * Three rules, also enforced by Jest on every pull request:
 *   1. SaaS embargo: the author's own SaaS products are neither published nor
 *      given a live URL before 2027 (lib/contentChecks.ts);
 *   2. locale parity: a published project has a title in en, fr and es,
 *      otherwise the FR or ES site silently diverges (lib/contentChecks.ts);
 *   3. retired terms: nothing removed on purpose comes back in messages,
 *      content, components or pages (lib/retiredTerms.ts).
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
import { RETIRED_TERMS, retiredTermHits } from "../../lib/retiredTerms";

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

const retired = retiredTermHits();
if (retired.length > 0) {
  failed = true;
  console.error("\n✗ Retired term found (see lib/retiredTerms.ts for the reason):");
  for (const h of retired) console.error(`  - ${h.file}:${h.line} « ${h.term} » → ${h.text}`);
} else {
  console.log(`✓ Retired terms: none found (${RETIRED_TERMS.length} checked).`);
}

if (failed) {
  console.error("\ncheck-publish-safety: FAILED");
  process.exit(1);
}
console.log("\ncheck-publish-safety: OK");
