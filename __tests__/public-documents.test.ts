/**
 * @jest-environment node
 */
// __tests__/public-documents.test.ts
// -----------------------------------
// Scanned diplomas and certificates under public/ are served to everyone.
// Each one must be checked by eye before publication: no date or place of
// birth, signature, personal e-mail address, candidate number or certificate
// identifier (masked with grey bars, rebuilt from images with no text layer).
//
// This test lists every reviewed document with its SHA-256. Adding or
// replacing a PDF (outside the generated CVs in public/cv/) fails the test
// until the new file has been reviewed and its hash recorded below.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const REVIEWED: Record<string, string> = {
  // GRETA titles: birth details and identifiers blurred at scan time.
  "public/certifications/tai-greta-diploma.pdf": "bf328f7ea7c9fcacef99caa18c390a1aeb233812ccbeb81272d3e98286cad927",
  "public/certifications/tssr-greta-diploma.pdf": "04848dcee157c67e59380695b6ffe3916088d4cd140ccdab9dee2d5e05e39b85",
  // OpenClassrooms RNCP 6: birth line, both signatures and certificate id masked.
  "public/certifications/openclassrooms-dcl-diploma.pdf": "7c31263600e3d6efebaf07d630c20cb24c9c2e578be1dfa0b78ca1116b3a63ed",
  // Linguaskill: birth date, username, reference and candidate number masked.
  "public/certifications/Certification_LINGUASKILL.pdf": "107f821d51f9a8370dbd13e4e4caad5bfebfa4596223cde1b46d31e01e0ad37e",
};

function listPdfs(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path.relative(process.cwd(), abs) === path.join("public", "cv")) continue; // generated CVs
      listPdfs(abs, out);
    } else if (entry.name.toLowerCase().endsWith(".pdf")) {
      out.push(path.relative(process.cwd(), abs).split(path.sep).join("/"));
    }
  }
  return out;
}

describe("Documents publics relus (données personnelles masquées)", () => {
  it("chaque PDF public est relu et inchangé depuis sa relecture", () => {
    const found = listPdfs(path.join(process.cwd(), "public")).sort();
    expect(found).toEqual(Object.keys(REVIEWED).sort());
    for (const file of found) {
      const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
      expect({ file, hash }).toEqual({ file, hash: REVIEWED[file] });
    }
  });
});
