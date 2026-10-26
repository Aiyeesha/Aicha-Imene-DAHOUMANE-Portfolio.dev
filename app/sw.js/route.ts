// app/sw.js/route.ts
// ------------------
// Serves the service worker with the commit hash injected as CACHE_VERSION.
// VERCEL_GIT_COMMIT_SHA is available at runtime, so this does not depend on
// npm pre/postbuild hooks (Vercel may run `next build` directly). Served from
// the root, so the default scope is "/"; application/javascript is required
// for service workers.

import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const version =
    (process.env.VERCEL_GIT_COMMIT_SHA ?? "").slice(0, 8) || "dev";

  const template = readFileSync(
    join(process.cwd(), "public/sw-template.js"),
    "utf8"
  );

  const sw = template.replace(
    /const CACHE_VERSION = "[^"]*"/,
    `const CACHE_VERSION = "${version}"`
  );

  return new NextResponse(sw, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      // must-revalidate with max-age=0: the browser checks for a new worker on every visit.
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
