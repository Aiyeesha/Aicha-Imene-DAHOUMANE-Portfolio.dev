/**
 * @jest-environment node
 */
// __tests__/unpublished-redirects.test.ts
// next.config.mjs redirects the pages of UNPUBLISHED projects (UNPUBLISHED_PROJECTS)
// to the gallery or to the project that replaces them. A project that is published
// again must leave that list, otherwise its card is visible but its page silently
// redirects to another project (regression seen on python-password-checker).

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { projects } from "@/content/projects";

/** Reads the [slug, target] pairs of UNPUBLISHED_PROJECTS from next.config.mjs. */
function unpublishedRedirects(): Array<[string, string | null]> {
  const config = readFileSync(join(process.cwd(), "next.config.mjs"), "utf8");
  const start = config.indexOf("const UNPUBLISHED_PROJECTS = [");
  expect(start).toBeGreaterThanOrEqual(0);
  const block = config.slice(start, config.indexOf("];", start));
  return [...block.matchAll(/\["([^"]+)",\s*(?:"([^"]+)"|null)\]/g)].map(
    (m) => [m[1], m[2] ?? null] as [string, string | null],
  );
}

describe("next.config.mjs — redirections des projets dépubliés", () => {
  const statusBySlug = new Map(projects.map((p) => [p.slug, p.status]));
  const redirects = unpublishedRedirects();

  it("lit bien la liste", () => {
    expect(redirects.length).toBeGreaterThan(0);
  });

  it("ne redirige aucun projet publié", () => {
    const published = redirects.filter(([slug]) => statusBySlug.get(slug) === "published").map(([slug]) => slug);
    expect(published).toEqual([]);
  });

  it("redirige toujours vers un projet publié", () => {
    const badTargets = redirects
      .filter(([, target]) => target !== null && statusBySlug.get(target) !== "published")
      .map(([slug, target]) => `${slug} → ${target}`);
    expect(badTargets).toEqual([]);
  });
});
