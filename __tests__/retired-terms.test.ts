/**
 * @jest-environment node
 */
// __tests__/retired-terms.test.ts
// Non-regression: nothing retired on purpose (lib/retiredTerms.ts) may come
// back in the published sources (messages, content, components, pages).

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { RETIRED_TERMS, retiredTermHits } from "@/lib/retiredTerms";

describe("termes retirés", () => {
  it("chaque entrée documente sa raison et sa date", () => {
    for (const t of RETIRED_TERMS) {
      expect(t.term.trim()).not.toBe("");
      expect(t.reason.trim()).not.toBe("");
      expect(t.since).toMatch(/^\d{4}(-\d{2}){0,2}$/);
    }
  });

  it("aucun terme retiré n'apparaît dans les sources publiées", () => {
    const hits = retiredTermHits();
    // Readable failure: file:line, term and the offending line.
    expect(hits.map((h) => `${h.file}:${h.line} « ${h.term} » → ${h.text}`)).toEqual([]);
  });

  // The scanner itself, on a throwaway tree (so a broken scanner cannot make
  // the check above pass silently).
  describe("détection", () => {
    let root: string;
    beforeAll(() => {
      root = fs.mkdtempSync(path.join(os.tmpdir(), "retired-"));
      fs.mkdirSync(path.join(root, "messages"));
      fs.mkdirSync(path.join(root, "content", "blog", "unpublished"), { recursive: true });
      fs.writeFileSync(path.join(root, "messages", "fr.json"), '{\n  "a": "Voir Acme Legacy ici",\n  "b": "lien /old-page/x"\n}\n');
      fs.writeFileSync(path.join(root, "messages", "en.json"), '{ "c": "AcmeLegacyX and /old-pages" }\n');
      fs.writeFileSync(path.join(root, "content", "blog", "unpublished", "draft.mdx"), "Acme Legacy\n");
    });
    afterAll(() => fs.rmSync(root, { recursive: true, force: true }));

    const terms = [
      { term: "Acme Legacy", reason: "test", since: "2026" },
      { term: "/old-page", reason: "test", since: "2026" },
    ];

    it("trouve un terme, sans tenir compte de la casse, avec fichier et ligne", () => {
      fs.writeFileSync(path.join(root, "messages", "es.json"), '{ "d": "acme legacy" }\n');
      const hits = retiredTermHits(terms, root);
      expect(hits).toContainEqual(expect.objectContaining({ term: "Acme Legacy", file: path.join("messages", "fr.json"), line: 2 }));
      expect(hits).toContainEqual(expect.objectContaining({ term: "Acme Legacy", file: path.join("messages", "es.json") }));
      expect(hits).toContainEqual(expect.objectContaining({ term: "/old-page", line: 3 }));
    });

    it("ignore les commentaires de code, mais pas le code qui les suit", () => {
      fs.mkdirSync(path.join(root, "app"), { recursive: true });
      fs.writeFileSync(
        path.join(root, "app", "page.tsx"),
        '// /old-page was merged\n * Acme Legacy retired\n{/* Acme Legacy */}\nconst href = "/old-page";\n',
      );
      const inApp = retiredTermHits(terms, root).filter((h) => h.file.startsWith("app"));
      expect(inApp).toEqual([expect.objectContaining({ term: "/old-page", line: 4 })]);
    });

    it("ignore les mots plus longs et les brouillons", () => {
      const hits = retiredTermHits(terms, root);
      expect(hits.some((h) => h.file === path.join("messages", "en.json"))).toBe(false);
      expect(hits.some((h) => h.file.includes("unpublished"))).toBe(false);
    });
  });
});
