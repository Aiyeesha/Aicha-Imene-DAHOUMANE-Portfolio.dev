// __tests__/single-line.test.ts
// Single-line form fields forwarded to Formhook never carry CR/LF.

import { singleLine } from "@/lib/contactValidation";

describe("singleLine", () => {
  it("replaces control characters and trims", () => {
    expect(singleLine("  Jane\r\nBcc: x@evil.example ")).toBe("Jane  Bcc: x@evil.example");
    expect(singleLine("a\u0000b\tc\u007Fd")).toBe("a b c d");
  });
  it("keeps accented and typographic characters", () => {
    expect(singleLine("Aïcha — Développeuse « Salesforce »")).toBe("Aïcha — Développeuse « Salesforce »");
  });
});
