/**
 * @jest-environment node
 */
// __tests__/env-validation.test.ts
// Audit 2026-10-25 : en production, une configuration invalide doit arrêter
// le démarrage. Les quatre secrets applicatifs sont requis (2026-10-26) ;
// leur longueur minimale ne déclenche qu'un avertissement.

jest.mock("server-only", () => ({}), { virtual: true });

const base = {
  NEXT_PUBLIC_SUPABASE_URL: "https://x.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon",
  NEXT_PUBLIC_SITE_URL: "https://example.com",
  SUPABASE_SERVICE_ROLE_KEY: "service",
  UPSTASH_REDIS_REST_URL: "https://x.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "token",
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD: "long-enough-password",
  CRON_SECRET: "c".repeat(32),
  IP_HASH_SALT: "s".repeat(16),
  REVALIDATE_SECRET: "r".repeat(32),
  CACHE_INVALIDATE_SECRET: "i".repeat(32),
  TESTIMONIAL_SUBMIT_TOKEN: "t".repeat(32),
};

describe("validateEnv", () => {
  const original = { ...process.env };
  let warn: jest.SpyInstance, error: jest.SpyInstance;

  beforeEach(() => {
    process.env = { ...base, NODE_ENV: "production" } as NodeJS.ProcessEnv;
    warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    error = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    process.env = original;
    warn.mockRestore();
    error.mockRestore();
  });

  const run = async () => (await import("@/lib/env")).validateEnv();

  it("bloque le démarrage en production si une variable requise manque", async () => {
    process.env.VERCEL_ENV = "production";
    delete process.env.CRON_SECRET;
    await expect(run()).rejects.toThrow(/CRON_SECRET/);
  });

  it("se contente d'un message en prévisualisation", async () => {
    process.env.VERCEL_ENV = "preview";
    delete process.env.CRON_SECRET;
    await expect(run()).resolves.toBeUndefined();
    expect(error).toHaveBeenCalled();
  });

  it("démarre sans message quand tout est présent et assez long", async () => {
    process.env.VERCEL_ENV = "production";
    await expect(run()).resolves.toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  it.each(["IP_HASH_SALT", "REVALIDATE_SECRET", "CACHE_INVALIDATE_SECRET", "TESTIMONIAL_SUBMIT_TOKEN"])(
    "bloque le démarrage en production si %s manque",
    async (key) => {
      process.env.VERCEL_ENV = "production";
      delete process.env[key];
      await expect(run()).rejects.toThrow(new RegExp(key));
    },
  );

  it("ne bloque jamais sur un secret présent mais trop court", async () => {
    process.env.VERCEL_ENV = "production";
    process.env.IP_HASH_SALT = "court";
    await expect(run()).resolves.toBeUndefined();
    expect(warn.mock.calls[0][0]).toMatch(/IP_HASH_SALT/);
  });
});
