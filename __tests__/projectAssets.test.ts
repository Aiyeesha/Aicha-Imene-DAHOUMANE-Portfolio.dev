/**
 * @jest-environment node
 */
// __tests__/projectAssets.test.ts
// Project logo/cover presence and the lightweight asset 404.
//
// 1. content/project-assets.json must match public/projects, otherwise an
//    added logo would not show, or a removed one would 404 again.
//    → on failure: `npm run assets:manifest`.
// 2. Every gallery image referenced by content/projectDetails.ts must exist
//    on disk, or it would bring back the 404 requests.
// 3. projectCardImage() never offers a missing URL.
// 4. /api/asset-not-found returns a plain-text 404.

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import manifest from "@/content/project-assets.json";
import { projectDetails } from "@/content/projectDetails";
import { hasProjectLogo, projectCardImage, projectCoverPath } from "@/lib/data/projectAssets";
import { GET, HEAD } from "@/app/api/asset-not-found/route";

const PUBLIC_DIR = join(process.cwd(), "public");
const PROJECTS_DIR = join(PUBLIC_DIR, "projects");

// URL path (/projects/x/a%20b.webp) → file on disk.
const existsOnDisk = (urlPath: string) =>
  existsSync(join(PUBLIC_DIR, decodeURIComponent(urlPath)));

describe("content/project-assets.json", () => {
  const slugs = readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  it("liste exactement les logos présents sur le disque", () => {
    const onDisk = slugs.filter((s) => existsSync(join(PROJECTS_DIR, s, "logo.webp")));
    expect(manifest.logos).toEqual(onDisk);
  });

  it("liste exactement les couvertures présentes sur le disque", () => {
    const onDisk = slugs.filter((s) => existsSync(join(PROJECTS_DIR, s, "cover.webp")));
    expect(manifest.covers).toEqual(onDisk);
  });
});

describe("galeries de projet", () => {
  it("chaque image de galerie référencée existe dans public/", () => {
    const missing: string[] = [];
    for (const detail of projectDetails) {
      for (const img of detail.gallery ?? []) {
        if (img.src.startsWith("/") && !existsOnDisk(img.src)) missing.push(`${detail.slug}: ${img.src}`);
      }
    }
    expect(missing).toEqual([]);
  });
});

describe("lib/data/projectAssets", () => {
  it("hasProjectLogo suit le manifeste", () => {
    expect(hasProjectLogo("idemconnect-apex-backend")).toBe(true);
    expect(hasProjectLogo("risque360")).toBe(false);
  });

  it("projectCardImage : galerie d'abord, couverture en repli", () => {
    const img = projectCardImage("idemconnect-apex-backend", [{ src: "/projects/idemconnect-apex-backend/screenshot-1.webp" }]);
    expect(img?.src).toBe("/projects/idemconnect-apex-backend/screenshot-1.webp");
    expect(img?.fallback).toBe(projectCoverPath("idemconnect-apex-backend"));
  });

  it("projectCardImage : couverture seule quand la galerie est vide", () => {
    expect(projectCardImage("idemconnect-apex-backend", [])).toEqual({
      src: "/projects/idemconnect-apex-backend/cover.webp",
      fallback: null,
    });
  });

  it("projectCardImage : null (aucune requête) sans galerie ni couverture", () => {
    expect(projectCardImage("risque360", [])).toBeNull();
    expect(projectCardImage("projet-inexistant", undefined)).toBeNull();
  });

  it("aucune couverture proposée n'est absente du disque", () => {
    for (const slug of manifest.covers) {
      expect(existsOnDisk(projectCoverPath(slug)!)).toBe(true);
    }
  });
});

describe("GET/HEAD /api/asset-not-found", () => {
  it("renvoie une 404 en texte brut, non indexable", async () => {
    const res = GET();
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(res.headers.get("x-robots-tag")).toBe("noindex");
    expect((await res.text()).length).toBeLessThan(100);
  });

  it("HEAD renvoie une 404 sans corps", async () => {
    const res = HEAD();
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("");
  });
});
