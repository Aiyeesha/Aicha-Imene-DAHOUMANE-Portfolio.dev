// __tests__/cv-consistency.test.ts
// The CVs in public/cv/*.html (sources of the PDFs, see
// scripts/content/generate-cv-pdf.mjs) are hand-written HTML: nothing ties
// them to the site. This test fails when a fact a recruiter can compare
// drifts between the two: contract types, end of the work-study contract,
// and how the workstation deployment is described.
//
// After changing a CV's HTML, regenerate the PDFs with `npm run content:cv`.

import fs from "node:fs";
import path from "node:path";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

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
    const contracts = MESSAGES[locale].availModal.contractValues;

    it(`${locale}: 3 classic and 3 ATS CVs are checked`, () => {
      expect(classic).toHaveLength(3);
      expect(ats).toHaveLength(3);
    });

    it(`${locale}: contract types match the site`, () => {
      for (const f of classic) expect({ f, ok: read(f).includes(contracts) }).toEqual({ f, ok: true });
      // ATS CVs list the same types, comma-separated
      const commaList = contracts.split(" · ").join(", ");
      for (const f of ats) expect({ f, ok: read(f).includes(commaList) }).toEqual({ f, ok: true });
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
