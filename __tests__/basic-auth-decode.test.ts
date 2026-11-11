/**
 * @jest-environment node
 */
// __tests__/basic-auth-decode.test.ts
// Basic auth credentials are decoded as UTF-8 (charset="UTF-8" challenge).

import { decodeBasicCredentials } from "@/lib/security/basicAuth";

const encode = (s: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(s)));

describe("decodeBasicCredentials", () => {
  it("decodes ASCII credentials", () => {
    expect(decodeBasicCredentials(encode("admin:secret"))).toBe("admin:secret");
  });
  it("decodes non-ASCII passwords as UTF-8", () => {
    expect(decodeBasicCredentials(encode("admin:pässwörd-€"))).toBe("admin:pässwörd-€");
  });
  it("throws on invalid base64", () => {
    expect(() => decodeBasicCredentials("%%%")).toThrow();
  });
});
