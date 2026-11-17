// e2e/asset-not-found.spec.ts
// ---------------------------
// A missing file with an extension answers a real 404 (next.config.mjs,
// afterFiles rewrite to /api/asset-not-found), not a 200 with the HTML 404
// page (a "soft 404" for search engines). The file routes that share those
// extensions must keep answering 200.

import { test, expect } from "@playwright/test";

test.describe("Fichiers absents — vraie 404", () => {
  for (const path of ["/inexistant.txt", "/inexistant.css", "/inexistant.js", "/fr/inexistant.json", "/inexistant.png"]) {
    test(`${path} → 404`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(404);
      expect(res.headers()["x-robots-tag"]).toBe("noindex");
    });
  }
});

test.describe("Routes fichiers — toujours servies", () => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/feed.xml", "/feed-fr.xml", "/feed-es.xml", "/manifest.webmanifest", "/sw.js"]) {
    test(`${path} → 200`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
    });
  }
});
