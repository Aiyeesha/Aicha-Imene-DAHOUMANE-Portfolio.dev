/**
 * @jest-environment node
 */
// __tests__/testimonial-submit-page.test.tsx
// /[locale]/testimonial-submit: a missing or forged invitation answers 404
// (notFound, the page's existence is not revealed) instead of a 200 "access
// denied" page; a genuine but expired link keeps a short "link expired"
// message for the invitee; a valid link renders the form.

jest.mock("server-only", () => ({}), { virtual: true });
jest.mock("@/lib/redis", () => ({ redis: null }));
jest.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));
jest.mock("@/lib/security/testimonialInvite", () => {
  const actual = jest.requireActual("@/lib/security/testimonialInvite");
  return { ...actual, isInviteUsed: jest.fn(async () => false) };
});
jest.mock("@/components/TestimonialSubmitForm", () => () => null);

import Page from "@/app/[locale]/testimonial-submit/page";
import { signInvite } from "@/lib/security/testimonialInvite";

const SECRET = "t".repeat(32);
const render = (sp: Record<string, string>) =>
  Page({ params: Promise.resolve({ locale: "fr" }), searchParams: Promise.resolve(sp) });

describe("/testimonial-submit", () => {
  const original = process.env.TESTIMONIAL_SUBMIT_TOKEN;
  beforeEach(() => { process.env.TESTIMONIAL_SUBMIT_TOKEN = SECRET; });
  afterAll(() => { process.env.TESTIMONIAL_SUBMIT_TOKEN = original; });

  it("répond 404 sans paramètres d'invitation", async () => {
    await expect(render({})).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("répond 404 pour une invitation falsifiée", async () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    await expect(render({ invite: "0".repeat(64), exp: String(exp) })).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("garde un message « lien expiré » pour une invitation authentique expirée", async () => {
    const exp = Math.floor(Date.now() / 1000) - 60;
    const el = await render({ invite: signInvite(SECRET, exp), exp: String(exp) });
    expect(JSON.stringify(el)).toContain("Lien expiré");
  });

  it("affiche le formulaire pour une invitation valide", async () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const el = await render({ invite: signInvite(SECRET, exp), exp: String(exp) });
    expect(JSON.stringify(el)).not.toContain("Lien expiré");
  });
});
