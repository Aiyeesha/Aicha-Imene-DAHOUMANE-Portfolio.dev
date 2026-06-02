// app/sw.js/route.ts
// ------------------
// Sert le Service Worker avec le hash du commit injecté dans CACHE_VERSION.
//
// Avantage vs postbuild : indépendant du build command Vercel (qui peut
// exécuter `next build` directement, contournant les hooks npm pre/postbuild).
// VERCEL_GIT_COMMIT_SHA est disponible à runtime — pas de dépendance au build.
//
// Scope SW : /sw.js servi depuis la racine → scope par défaut = "/"
// MIME type : application/javascript requis par les navigateurs pour les SW.

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
      // must-revalidate : le navigateur revérifie à chaque visite si le SW a changé.
      // Pas de max-age positif : on veut toujours la version la plus fraîche.
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
