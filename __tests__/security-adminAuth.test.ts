/**
 * @jest-environment node
 */
// __tests__/security-adminAuth.test.ts
// Unit tests: lib/security/adminAuth.ts.
// Node environment: native crypto.subtle (constant-time comparison) and atob.

// `server-only` comes from Next.js (build alias), not node_modules: a neutral
// virtual module for Jest.
jest.mock("server-only", () => ({}), { virtual: true });

// Authorization header of the "current request", set per test.
let mockAuthHeader: string | null = null;
jest.mock("next/headers", () => ({
  headers: async () => new Headers(mockAuthHeader ? { authorization: mockAuthHeader } : {}),
}));

// Next.js notFound() throws a special error: mocked to check it is called.
const mockNotFound = jest.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
jest.mock("next/navigation", () => ({ notFound: () => mockNotFound() }));

import {
  isAdminAuthorizationValid,
  assertAdminOrNotFound,
  requireAdminAuth,
} from "@/lib/security/adminAuth";

const basic = (user: string, pass: string) => `Basic ${btoa(`${user}:${pass}`)}`;

describe("adminAuth", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.ADMIN_USERNAME = "admin-test";
    process.env.ADMIN_PASSWORD = "correct-horse-battery";
    mockAuthHeader = null;
    mockNotFound.mockClear();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("isAdminAuthorizationValid", () => {
    it("accepte des identifiants valides", async () => {
      await expect(isAdminAuthorizationValid(basic("admin-test", "correct-horse-battery"))).resolves.toBe(true);
    });

    it("accepte un mot de passe contenant « : » (seul le premier sépare)", async () => {
      process.env.ADMIN_PASSWORD = "pa:ss:word";
      await expect(isAdminAuthorizationValid(basic("admin-test", "pa:ss:word"))).resolves.toBe(true);
    });

    it.each([
      ["en-tête absent", null],
      ["en-tête vide", ""],
      ["schéma Bearer", "Bearer abc"],
      ["base64 invalide", "Basic %%%"],
      ["sans séparateur", `Basic ${btoa("admin-test")}`],
      ["mauvais mot de passe", basic("admin-test", "wrong")],
      ["mauvais identifiant", basic("root", "correct-horse-battery")],
      ["identifiants vides", basic("", "")],
    ])("refuse : %s", async (_label, header) => {
      await expect(isAdminAuthorizationValid(header)).resolves.toBe(false);
    });

    it("refuse tout si l'admin n'est pas configuré (fail-closed)", async () => {
      delete process.env.ADMIN_USERNAME;
      delete process.env.ADMIN_PASSWORD;
      // Even empty credentials must not "match" an empty configuration.
      await expect(isAdminAuthorizationValid(basic("", ""))).resolves.toBe(false);
    });
  });

  describe("assertAdminOrNotFound (layout et pages /admin)", () => {
    it("rend la 404 sans en-tête Authorization", async () => {
      await expect(assertAdminOrNotFound()).rejects.toThrow("NEXT_NOT_FOUND");
      expect(mockNotFound).toHaveBeenCalledTimes(1);
    });

    it("rend la 404 avec des identifiants invalides", async () => {
      mockAuthHeader = basic("admin-test", "wrong");
      await expect(assertAdminOrNotFound()).rejects.toThrow("NEXT_NOT_FOUND");
    });

    it("laisse passer une requête authentifiée", async () => {
      mockAuthHeader = basic("admin-test", "correct-horse-battery");
      await expect(assertAdminOrNotFound()).resolves.toBeUndefined();
      expect(mockNotFound).not.toHaveBeenCalled();
    });
  });

  describe("requireAdminAuth (Server Actions)", () => {
    it("lève Unauthorized sans authentification", async () => {
      await expect(requireAdminAuth()).rejects.toThrow("Unauthorized");
    });

    it("passe avec des identifiants valides", async () => {
      mockAuthHeader = basic("admin-test", "correct-horse-battery");
      await expect(requireAdminAuth()).resolves.toBeUndefined();
    });
  });
});
