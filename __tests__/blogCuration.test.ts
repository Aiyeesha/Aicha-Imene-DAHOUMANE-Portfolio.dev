// __tests__/blogCuration.test.ts
// Blog curation rules:
//   - every published post links to at least one published case study
//     (frontmatter `projects`, shown as "Applied in");
//   - no script contains a plain-text password;
//   - the three languages publish exactly the same posts.

import fs from "node:fs";
import path from "node:path";
import { readAllPosts, type BlogLocale } from "@/content/blog/fs";
import { oneBySlug } from "@/lib/data/projectsSource";

const LOCALES: BlogLocale[] = ["fr", "en", "es"];

describe("blog élagué", () => {
  it("publie les mêmes articles dans les 3 langues", () => {
    const slugs = LOCALES.map((l) => readAllPosts(l).map((p) => p.slug).sort());
    expect(slugs[1]).toEqual(slugs[0]);
    expect(slugs[2]).toEqual(slugs[0]);
    expect(slugs[0].length).toBeLessThanOrEqual(15);
  });

  it("relie chaque article à une étude de cas publiée (ou au colophon)", () => {
    for (const locale of LOCALES) {
      for (const post of readAllPosts(locale)) {
        expect(post.projects.length).toBeGreaterThan(0);
        for (const target of post.projects) {
          if (target === "colophon") continue;
          expect({ post: post.slug, target, found: oneBySlug(locale, target) !== null })
            .toEqual({ post: post.slug, target, found: true });
        }
      }
    }
  });

  it("ne publie aucun mot de passe en clair dans les scripts", () => {
    for (const locale of LOCALES) {
      for (const post of readAllPosts(locale)) {
        const raw = fs.readFileSync(path.resolve(post.file), "utf-8");
        expect({ post: post.slug, plain: /ConvertTo-SecureString\s+"[^"]+"\s+-AsPlainText/.test(raw) })
          .toEqual({ post: post.slug, plain: false });
      }
    }
  });
});
