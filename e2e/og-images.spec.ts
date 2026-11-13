// e2e/og-images.spec.ts
// ---------------------
// Non-regression for share images. A next/og image only fails at request
// time (500), never at build time: /work-with-me/opengraph-image went out
// broken that way. For every page type and locale, this spec reads the
// og:image and twitter:image URLs the page itself advertises and checks that
// each one answers 200 as PNG or JPEG (accepted by every network) and, for a
// PNG, really measures at least 1200×630. New pages are covered without
// editing a list of image routes. Project pages used to advertise their
// first screenshot (WebP, 108×126 to 1191×1684) declared as 1200×630.

import { test, expect } from "@playwright/test";

const LOCALES = ["fr", "en", "es"] as const;

// One page per page type that has its own image (plus the pages inheriting
// the locale or root image). Slugs exist in all three locales.
const PAGES = [
  "",
  "/about",
  "/hybride",
  "/certifications",
  "/uses",
  "/work-with-me",
  "/projects",
  "/projects/idemconnect-apex-backend",
  "/blog",
  "/blog/apex-integration-patterns",
];

/** Width and height of a PNG, read from its IHDR chunk (bytes 16–23). */
function pngSize(buf: Buffer): { width: number; height: number } {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** og:image / twitter:image URLs declared in a page's <head>. */
function shareImageUrls(html: string): string[] {
  const urls = new Set<string>();
  const re = /<meta[^>]+(?:property|name)="(?:og:image|twitter:image)"[^>]+content="([^"]+)"/g;
  for (const m of html.matchAll(re)) urls.add(m[1].replace(/&amp;/g, "&"));
  return [...urls];
}

test.describe("Images de partage — non-régression", () => {
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const path = `/${locale}${page}`;

      test(`${path} : chaque og:image / twitter:image répond 200, au bon format et à la bonne taille`, async ({ request }) => {
        const res = await request.get(path);
        expect(res.status(), `${path} doit répondre 200`).toBe(200);

        const urls = shareImageUrls(await res.text());
        expect(urls.length, `${path} doit déclarer au moins une image de partage`).toBeGreaterThan(0);

        for (const url of urls) {
          // Absolute URLs point at NEXT_PUBLIC_SITE_URL: request the same path
          // on the server under test instead.
          const { pathname, search } = new URL(url, "http://localhost");
          const img = await request.get(pathname + search);
          expect(img.status(), `${pathname} (déclarée par ${path}) doit répondre 200`).toBe(200);
          const type = img.headers()["content-type"] ?? "";
          expect(type, `${pathname} doit être un PNG ou un JPEG`).toMatch(/^image\/(png|jpeg)/);
          if (type.startsWith("image/png")) {
            const { width, height } = pngSize(await img.body());
            expect(width, `${pathname} : largeur réelle`).toBeGreaterThanOrEqual(1200);
            expect(height, `${pathname} : hauteur réelle`).toBeGreaterThanOrEqual(630);
          }
        }
      });
    }
  }
});
