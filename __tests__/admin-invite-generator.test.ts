/**
 * @jest-environment node
 */
// __tests__/admin-invite-generator.test.ts
// /admin invitation link generator: the server action checks the admin
// session, and the link it returns is accepted by the submission page
// (signature, expiry capped at MAX_INVITE_DAYS).

jest.mock("server-only", () => ({}), { virtual: true });
jest.mock("@/lib/redis", () => ({ redis: null }));
jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

const auth = { ok: true };
jest.mock("@/lib/security/adminAuth", () => ({
  requireAdminAuth: async () => {
    if (!auth.ok) throw new Error("Unauthorized");
  },
}));

import { generateTestimonialInvite } from "@/app/admin/actions";
import { MAX_INVITE_DAYS, createInviteLink, isInviteValid } from "@/lib/security/testimonialInvite";

const SECRET = "s".repeat(40);

function parse(url: string) {
  const u = new URL(url);
  return { path: u.pathname, invite: u.searchParams.get("invite") ?? "", exp: Number(u.searchParams.get("exp")) };
}

describe("createInviteLink", () => {
  it("produit un lien accepté par la page de soumission, sans le secret", () => {
    const link = createInviteLink(SECRET, "fr", 7);
    const { path, invite, exp } = parse(link.url);
    expect(path).toBe("/fr/testimonial-submit");
    expect(isInviteValid(SECRET, invite, exp)).toBe(true);
    expect(link.url).not.toContain(SECRET);
    expect(link).toMatchObject({ locale: "fr", daysValid: 7 });
  });

  it("plafonne la validité à MAX_INVITE_DAYS et à 1 jour minimum", () => {
    expect(createInviteLink(SECRET, "en", 30).daysValid).toBe(MAX_INVITE_DAYS);
    expect(createInviteLink(SECRET, "en", 0).daysValid).toBe(1);
  });
});

describe("generateTestimonialInvite (server action)", () => {
  beforeEach(() => {
    auth.ok = true;
    process.env.TESTIMONIAL_SUBMIT_TOKEN = SECRET;
  });

  it("refuse un appel sans session admin", async () => {
    auth.ok = false;
    await expect(generateTestimonialInvite("fr", 7)).rejects.toThrow("Unauthorized");
  });

  it("normalise la langue et la durée envoyées par le client", async () => {
    const res = await generateTestimonialInvite("de", 99);
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.invite).toMatchObject({ locale: "en", daysValid: MAX_INVITE_DAYS });
  });

  it("signale un TESTIMONIAL_SUBMIT_TOKEN absent", async () => {
    delete process.env.TESTIMONIAL_SUBMIT_TOKEN;
    const res = await generateTestimonialInvite("fr", 7);
    expect(res.ok).toBe(false);
  });
});
