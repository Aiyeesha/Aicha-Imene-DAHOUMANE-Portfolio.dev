// fix-nested-sharp.mjs
// ---------------------
// next@16.2.x pins sharp as an optionalDependency at ^0.34.5, which carries a
// HIGH severity libvips vulnerability (CVE-2026-33327/33328/35590/35591,
// GHSA-f88m-g3jw-g9cj). npm's `overrides` field does not reliably cascade into
// a nested package's optionalDependencies (known npm limitation, verified
// against npm 11.6.0 with both a pinned-version and a `$sharp` reference
// override — the nested copy stays on 0.34.5 either way).
//
// The project already depends on a patched `sharp` (^0.35.3) at the root.
// Node's module resolution checks the closest node_modules first, so as long
// as next's own vulnerable copy exists, it wins over the patched root copy.
// Removing it after install lets resolution fall through to the patched one.
import { existsSync, rmSync } from "node:fs";

const nestedSharp = "node_modules/next/node_modules/sharp";

if (existsSync(nestedSharp)) {
  rmSync(nestedSharp, { recursive: true, force: true });
  console.log(`[fix-nested-sharp] removed vulnerable nested copy: ${nestedSharp}`);
}
