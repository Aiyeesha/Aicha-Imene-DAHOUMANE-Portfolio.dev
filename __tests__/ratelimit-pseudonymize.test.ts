/**
 * @jest-environment node
 */
// __tests__/ratelimit-pseudonymize.test.ts
// Covers pseudonymizeKey() (lib/ratelimit.ts): no IP reaches Upstash in
// clear once IP_HASH_SALT is set. Node environment: Web Crypto
// (crypto.subtle) is available.

jest.mock("@upstash/redis", () => ({ Redis: jest.fn() }));
jest.mock("@upstash/ratelimit", () => ({
  Ratelimit: Object.assign(jest.fn(), { slidingWindow: jest.fn() }),
}));

import { pseudonymizeKey, safeLimit } from "@/lib/ratelimit";

describe("pseudonymizeKey()", () => {
  const originalSalt = process.env.IP_HASH_SALT;
  afterEach(() => {
    if (originalSalt === undefined) delete process.env.IP_HASH_SALT;
    else process.env.IP_HASH_SALT = originalSalt;
  });

  it("laisse la clé lisible sans sel (dev / CI)", async () => {
    delete process.env.IP_HASH_SALT;
    await expect(pseudonymizeKey("contact:ip:1.2.3.4")).resolves.toBe("contact:ip:1.2.3.4");
  });

  it("remplace la clé par un HMAC hexadécimal de 32 caractères, sans l'IP", async () => {
    process.env.IP_HASH_SALT = "sel-de-test";
    const out = await pseudonymizeKey("contact:ip:1.2.3.4");
    expect(out).toMatch(/^[0-9a-f]{32}$/);
    expect(out).not.toContain("1.2.3.4");
  });

  it("est déterministe pour un même sel et distingue deux IP", async () => {
    process.env.IP_HASH_SALT = "sel-de-test";
    const a1 = await pseudonymizeKey("contact:ip:1.2.3.4");
    const a2 = await pseudonymizeKey("contact:ip:1.2.3.4");
    const b  = await pseudonymizeKey("contact:ip:1.2.3.5");
    expect(a1).toBe(a2);
    expect(a1).not.toBe(b);
  });

  it("change de valeur quand le sel change (rotation)", async () => {
    process.env.IP_HASH_SALT = "sel-a";
    const a = await pseudonymizeKey("contact:ip:1.2.3.4");
    process.env.IP_HASH_SALT = "sel-b";
    const b = await pseudonymizeKey("contact:ip:1.2.3.4");
    expect(a).not.toBe(b);
  });

  it("safeLimit() transmet la clé pseudonymisée au limiteur", async () => {
    process.env.IP_HASH_SALT = "sel-de-test";
    const limit = jest.fn().mockResolvedValue({ success: true, reset: 0 });
    await safeLimit({ limit }, "contact:ip:1.2.3.4");
    expect(limit).toHaveBeenCalledWith(await pseudonymizeKey("contact:ip:1.2.3.4"));
  });
});
