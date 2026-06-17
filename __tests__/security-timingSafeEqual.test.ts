/**
 * @jest-environment node
 */
// __tests__/security-timingSafeEqual.test.ts
// Tests unitaires — lib/security/timingSafeEqual.ts
// Vérifie les invariants de sécurité : longueurs différentes → false, égalité stricte → true.
// @jest-environment node requis : crypto.subtle n'est pas disponible dans jsdom.

import { timingSafeStringEqual } from "@/lib/security/timingSafeEqual";

describe("timingSafeStringEqual", () => {
  it("returns true for two identical strings", async () => {
    expect(await timingSafeStringEqual("abc", "abc")).toBe(true);
  });

  it("returns true for two empty strings", async () => {
    expect(await timingSafeStringEqual("", "")).toBe(true);
  });

  it("returns false when strings differ in content (same length)", async () => {
    expect(await timingSafeStringEqual("abc", "abd")).toBe(false);
  });

  it("returns false when strings differ in length", async () => {
    expect(await timingSafeStringEqual("abc", "abcd")).toBe(false);
  });

  it("returns false for empty vs non-empty string", async () => {
    expect(await timingSafeStringEqual("", "a")).toBe(false);
  });

  it("returns false for a </script> injection attempt vs a valid bearer token", async () => {
    const valid = "Bearer supersecrettoken1234567890";
    const attack = "Bearer </script><script>alert(1)</script>";
    expect(await timingSafeStringEqual(valid, attack)).toBe(false);
  });

  it("returns false for strings that differ only by case", async () => {
    expect(await timingSafeStringEqual("Secret", "secret")).toBe(false);
  });

  it("handles long strings correctly", async () => {
    const long = "a".repeat(1000);
    expect(await timingSafeStringEqual(long, long)).toBe(true);
    expect(await timingSafeStringEqual(long, long + "b")).toBe(false);
  });
});
