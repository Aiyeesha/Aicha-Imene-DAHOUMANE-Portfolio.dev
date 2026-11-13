// __tests__/blog-tags.test.ts
// Blog tags are canonical English in every locale's frontmatter and are
// translated at display time (lib/blog-utils.ts). Mixed-language tags split
// the filters, the per-tag feeds and the related posts.

import fs from "node:fs";
import path from "node:path";
import { translateTag } from "@/lib/blog-utils";

const BASE = path.join(process.cwd(), "content", "blog", "posts");
const tagsOf = (locale: string, file: string): string[] => {
  const raw = fs.readFileSync(path.join(BASE, locale, file), "utf8");
  const line = raw.match(/^tags:\s*(\[.*\])\s*$/m);
  return line ? (JSON.parse(line[1]) as string[]) : [];
};

const files = fs.readdirSync(path.join(BASE, "en")).filter((f) => f.endsWith(".mdx"));

describe("blog tags", () => {
  it.each(files)("%s has the same canonical tags in fr, en and es", (file) => {
    const en = tagsOf("en", file);
    expect(tagsOf("fr", file)).toEqual(en);
    expect(tagsOf("es", file)).toEqual(en);
  });

  // Tags that read the same in every language (product names, acronyms).
  const INVARIANT = new Set([
    "IT Ops", "Salesforce", "Apex", "API", "Flow", "Architecture", "SOQL", "Sandbox",
    "DevOps", "CI/CD", "Governor Limits", "Active Directory", "GPO", "Windows Server",
    "Windows", "Windows Autopilot", "Intune", "PfSense", "Proxy", "Supabase", "Runbook",
    "Performance", "Support",
  ]);

  it("every non-invariant tag has a French and a Spanish translation", () => {
    const all = new Set(files.flatMap((f) => tagsOf("en", f)));
    const missing = [...all].filter(
      (t) => !INVARIANT.has(t) && (translateTag(t, "fr") === t || translateTag(t, "es") === t)
    );
    // Firewall stays "Firewall" in Spanish on purpose; check French only.
    expect(missing.filter((t) => t !== "Firewall")).toEqual([]);
    expect(translateTag("Firewall", "fr")).toBe("Pare-feu");
  });

  // "Architecture" reads the same in English and French but not in Spanish:
  // it used to be listed as invariant and showed in English on /es/blog/tags.
  it("translates Architecture in Spanish only", () => {
    expect(translateTag("Architecture", "fr")).toBe("Architecture");
    expect(translateTag("Architecture", "es")).toBe("Arquitectura");
  });
});
