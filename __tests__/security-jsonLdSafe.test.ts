// __tests__/security-jsonLdSafe.test.ts
// Tests unitaires — lib/security/jsonLdSafe.ts
// Vérifie que < > & sont bien échappés et qu'une séquence </script> ne survit pas.

import { jsonLdStringify } from "@/lib/security/jsonLdSafe";

describe("jsonLdStringify", () => {
  it("escapes < to \\u003c", () => {
    const result = jsonLdStringify({ title: "<bad>" });
    expect(result).not.toContain("<");
    expect(result).toContain("\\u003c");
  });

  it("escapes > to \\u003e", () => {
    const result = jsonLdStringify({ title: "<bad>" });
    expect(result).not.toContain(">");
    expect(result).toContain("\\u003e");
  });

  it("escapes & to \\u0026", () => {
    const result = jsonLdStringify({ title: "A&B" });
    expect(result).not.toContain("&");
    expect(result).toContain("\\u0026");
  });

  it("a </script> injection sequence cannot survive serialization", () => {
    const dangerous = "</script><script>alert(1)</script>";
    const result = jsonLdStringify({ name: dangerous });
    expect(result).not.toContain("</script>");
    expect(result).not.toContain("<script>");
  });

  it("an HTML comment injection <!-- cannot survive serialization", () => {
    const result = jsonLdStringify({ desc: "<!-- evil -->" });
    expect(result).not.toContain("<!--");
    expect(result).not.toContain("-->");
  });

  it("does not corrupt normal alphanumeric content", () => {
    const result = jsonLdStringify({ name: "hello world 123" });
    expect(result).toContain("hello world 123");
  });

  it("serializes nested objects preserving structure", () => {
    const obj = { "@context": "https://schema.org", "@type": "FAQPage", nested: { key: "value" } };
    const result = jsonLdStringify(obj);
    expect(result).toContain('"@context"');
    expect(result).toContain('"FAQPage"');
    expect(result).toContain('"nested"');
    expect(result).toContain('"key"');
  });

  it("serializes arrays correctly", () => {
    const obj = { items: [{ q: "Q1", a: "A1" }, { q: "Q2", a: "A2" }] };
    const result = jsonLdStringify(obj);
    expect(result).toContain("Q1");
    expect(result).toContain("A2");
  });
});
