/**
 * @jest-environment node
 */
// __tests__/testimonialInvite.test.ts
// Tests unitaires — liens d'invitation témoignage (lib/testimonialInvite.ts),
// utilisés par l'API admin et par le bouton de la page /admin.

import { createHmac } from "crypto";
import {
  createTestimonialInvite,
  normalizeInviteDays,
  normalizeInviteLocale,
  INVITE_DEFAULT_DAYS,
} from "@/lib/testimonialInvite";

const SECRET = "test-submit-token";

describe("createTestimonialInvite", () => {
  afterEach(() => {
    delete process.env.TESTIMONIAL_SUBMIT_TOKEN;
  });

  it("renvoie null si TESTIMONIAL_SUBMIT_TOKEN n'est pas configuré", () => {
    expect(createTestimonialInvite("fr", 7)).toBeNull();
  });

  it("produit un lien que la page de soumission accepte", () => {
    process.env.TESTIMONIAL_SUBMIT_TOKEN = SECRET;
    const before = Math.floor(Date.now() / 1000);
    const invite = createTestimonialInvite("fr", 30)!;

    const url = new URL(invite.url);
    expect(url.pathname).toBe("/fr/testimonial-submit");
    const exp = Number(url.searchParams.get("exp"));
    expect(exp).toBeGreaterThanOrEqual(before + 30 * 86_400);

    // Même calcul que app/[locale]/testimonial-submit/page.tsx
    const expected = createHmac("sha256", SECRET).update(`testimonial-invite:${exp}`).digest("hex");
    expect(url.searchParams.get("invite")).toBe(expected);
    // Le secret brut n'apparaît jamais dans le lien.
    expect(invite.url).not.toContain(SECRET);
    expect(invite).toMatchObject({ locale: "fr", daysValid: 30 });
  });
});

describe("normalisation des paramètres", () => {
  it("ramène la langue à fr, es ou en", () => {
    expect(normalizeInviteLocale("fr")).toBe("fr");
    expect(normalizeInviteLocale("es")).toBe("es");
    expect(normalizeInviteLocale("de")).toBe("en");
    expect(normalizeInviteLocale(undefined)).toBe("en");
  });

  it("borne la durée entre 1 et 30 jours", () => {
    expect(normalizeInviteDays(14)).toBe(14);
    expect(normalizeInviteDays(0.5)).toBe(1);
    expect(normalizeInviteDays(31)).toBe(INVITE_DEFAULT_DAYS);
    expect(normalizeInviteDays(-3)).toBe(INVITE_DEFAULT_DAYS);
    expect(normalizeInviteDays("30")).toBe(INVITE_DEFAULT_DAYS);
    expect(normalizeInviteDays(Number.NaN)).toBe(INVITE_DEFAULT_DAYS);
  });
});
