// __tests__/cv-consistency.test.ts
// The CVs in public/cv/*.html (sources of the PDFs, see
// scripts/content/generate-cv-pdf.mjs) are hand-written HTML: nothing ties
// them to the site. This test fails when a fact a recruiter can compare
// drifts between the two: the contract sought, end of the work-study
// contract, and how the workstation deployment is described.
//
// After changing a CV's HTML, regenerate the PDFs with `npm run content:cv`.

import fs from "node:fs";
import path from "node:path";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { LINKEDIN_PROFILE_URL } from "@/lib/social";

const CV_DIR = path.join(process.cwd(), "public", "cv");
const MESSAGES = { fr, en, es } as const;
type Locale = keyof typeof MESSAGES;

// Work-study (LD Digitales) end date, as written in each CV layout. Must
// match content/experience.tsx ("Oct. 2023 — Sept. 2025").
const WORK_STUDY_PERIOD: Record<Locale, { classic: string; ats: string }> = {
  fr: { classic: "Oct. 2023 — Sept. 2025", ats: "Octobre 2023 à Septembre 2025" },
  en: { classic: "Oct 2023 — Sep 2025", ats: "October 2023 to September 2025" },
  es: { classic: "Oct. 2023 — Sept. 2025", ats: "Octubre 2023 a Septiembre 2025" },
};

// Contract sought, as written in the CV header (classic) and on the ATS
// availability line. The CVs target a permanent contract only, while the site
// (availModal.contractValues) may list more types: the CVs must not drift back
// to that broader list.
const CONTRACT_SOUGHT: Record<Locale, { classic: string; ats: string }> = {
  fr: { classic: "<span>Recherche un CDI</span>", ats: "décembre 2026 — recherche un CDI" },
  en: { classic: "<span>Seeking a permanent role</span>", ats: "December 2026 — seeking a permanent role" },
  es: { classic: "<span>Busco un contrato indefinido</span>", ats: "diciembre de 2026 — busco un contrato indefinido" },
};

/** CV files of a locale, split by layout (classic one-pager / ATS). */
function cvFiles(locale: Locale) {
  const all = fs.readdirSync(CV_DIR).filter((f) => f.includes(`-CV-${locale}-`) && f.endsWith(".html"));
  return {
    classic: all.filter((f) => !f.endsWith("-ats.html")),
    ats: all.filter((f) => f.endsWith("-ats.html")),
  };
}

const read = (file: string) => fs.readFileSync(path.join(CV_DIR, file), "utf-8");

describe("CV / site consistency", () => {
  for (const locale of Object.keys(MESSAGES) as Locale[]) {
    const { classic, ats } = cvFiles(locale);
    // Site wording of the contract types, e.g. "CDI · CDD · Intérim · Portage salarial"
    const siteContracts = MESSAGES[locale].availModal.contractValues;

    it(`${locale}: 3 classic and 3 ATS CVs are checked`, () => {
      expect(classic).toHaveLength(3);
      expect(ats).toHaveLength(3);
    });

    it(`${locale}: CVs state the permanent contract sought`, () => {
      for (const f of classic) {
        expect({ f, ok: read(f).includes(CONTRACT_SOUGHT[locale].classic) }).toEqual({ f, ok: true });
      }
      for (const f of ats) {
        expect({ f, ok: read(f).includes(CONTRACT_SOUGHT[locale].ats) }).toEqual({ f, ok: true });
      }
      // ...and no longer list the site's broader set of contract types
      // (dotted in the classic layout, comma-separated on the ATS one).
      const lists = [siteContracts, siteContracts.split(" · ").join(", ")];
      for (const f of [...classic, ...ats]) {
        expect({ f, stale: lists.some((l) => l.includes(" · ") || l.includes(", ") ? read(f).includes(l) : false) })
          .toEqual({ f, stale: false });
      }
    });

    it(`${locale}: work-study period ends in September 2025`, () => {
      for (const f of classic) {
        expect({ f, ok: read(f).includes(WORK_STUDY_PERIOD[locale].classic) }).toEqual({ f, ok: true });
      }
      for (const f of ats) {
        expect({ f, ok: read(f).includes(WORK_STUDY_PERIOD[locale].ats) }).toEqual({ f, ok: true });
      }
    });
  }

  it("every CV links to the canonical LinkedIn profile (accented handle)", () => {
    // The unaccented handle "aicha-imene-dahoumane" is another profile: a
    // recruiter clicking it from a CV would land on "profile not found".
    for (const f of fs.readdirSync(CV_DIR).filter((x) => x.endsWith(".html"))) {
      const html = read(f);
      expect({ f, ok: html.includes(`href="${LINKEDIN_PROFILE_URL}"`) }).toEqual({ f, ok: true });
      expect({ f, stale: /linkedin\.com\/in\/aicha-imene-dahoumane/.test(html) }).toEqual({ f, stale: false });
    }
  });

  it("Trailhead links use the final salesforce.com URL, not the retired trailblazer.me", () => {
    // trailblazer.me/id/… answers with a 302 redirect: link the final URL.
    for (const f of fs.readdirSync(CV_DIR).filter((x) => x.endsWith(".html"))) {
      expect({ f, stale: read(f).includes("trailblazer.me") }).toEqual({ f, stale: false });
    }
  });

  it("no CV describes Windows Autopilot as image-based (Sysprep/WDS/PXE)", () => {
    // Autopilot provisions from the cloud without an image; Sysprep, WDS and
    // PXE belong to the 64 re-imaged machines and must not be attributed to it.
    // Tool lists ("Windows Autopilot, Sysprep, Datto RMM") stay allowed: only
    // the imaging chain written as Autopilot's method is rejected.
    const wrong = /Autopilot(<\/strong>)?,? \(?Sysprep, WDS/;
    for (const f of fs.readdirSync(CV_DIR).filter((x) => x.endsWith(".html"))) {
      expect({ f, wrong: wrong.test(read(f)) }).toEqual({ f, wrong: false });
    }
  });
});
