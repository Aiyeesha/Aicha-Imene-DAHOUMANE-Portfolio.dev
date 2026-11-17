// e2e/seo-meta.spec.ts
// --------------------
// Non-regression for search snippets. Google truncates titles beyond about
// 60–65 characters and descriptions beyond about 160: on every fixed page,
// in every locale, the <title> stays within 65 characters and the meta
// description within 160 (lib/seo.ts: TITLE_MAX, clampDescription). Article
// and project pages are left out: their titles are content, and pageTitle()
// already drops the name suffix when they are long.
// Also checks that the JSON-LD Person carries the role shown on the site, the
// CVs and the share images.

import { test, expect } from "@playwright/test";

const LOCALES = ["fr", "en", "es"] as const;

const PAGES = [
  "",
  "/about",
  "/hybride",
  "/certifications",
  "/uses",
  "/work-with-me",
  "/projects",
  "/blog",
  "/blog/tags",
  "/colophon",
  "/legal",
  "/privacy",
  "/accessibility",
  "/security/acknowledgments",
  "/status",
];

const TITLE_MAX = 65;
const DESCRIPTION_MAX = 160;

const ROLE = {
  fr: "Administratrice & Développeuse Salesforce",
  en: "Salesforce Administrator & Developer",
  es: "Administradora & Desarrolladora Salesforce",
} as const;

/** Decodes the few HTML entities found in <title> and meta content. */
const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** Length in code points ("é", "—", "×" count as 1), like lib/seo.ts. */
const len = (s: string) => [...s].length;

test.describe("Titres et descriptions — longueurs", () => {
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const path = `/${locale}${page}`;
      test(`${path} : title ≤ ${TITLE_MAX}, description ≤ ${DESCRIPTION_MAX}`, async ({ request }) => {
        const res = await request.get(path);
        expect(res.status()).toBe(200);
        const html = await res.text();

        const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
        const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");

        expect(title, `${path} doit avoir un <title>`).not.toBe("");
        expect(description, `${path} doit avoir une meta description`).not.toBe("");
        expect(len(title), `title de ${path} : « ${title} »`).toBeLessThanOrEqual(TITLE_MAX);
        expect(len(description), `description de ${path} : « ${description} »`).toBeLessThanOrEqual(DESCRIPTION_MAX);
      });
    }
  }
});

test.describe("JSON-LD Person — intitulé", () => {
  for (const locale of LOCALES) {
    test(`/${locale} : jobTitle commence par « ${ROLE[locale]} »`, async ({ request }) => {
      const html = await (await request.get(`/${locale}`)).text();
      const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
        JSON.parse(m[1]),
      );
      const graph = blocks.flatMap((b) => (Array.isArray(b["@graph"]) ? b["@graph"] : [b]));
      const person = graph.find((n) => n["@type"] === "Person");
      expect(person, "un nœud Person doit être présent").toBeTruthy();
      expect(person.jobTitle).toMatch(new RegExp(`^${ROLE[locale]}`));
    });
  }
});
