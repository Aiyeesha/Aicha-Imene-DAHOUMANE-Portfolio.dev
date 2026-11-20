// NOTE: jest.mock must run before importing the module under test.
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// ContactForm uses useTrack() → mock the Track context
jest.mock("@/app/[locale]/providers", () => ({
  useTrack: () => ({ track: "salesforce", setTrack: jest.fn() }),
}));

import { render, screen } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  it("shows a privacy information notice, without a consent checkbox", () => {
    // Legitimate interest (privacy policy): informing is enough, a mandatory
    // "I accept" box would look like a consent the form does not rely on.
    render(<ContactForm />);
    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(screen.getByText(/contact\.privacyNotice/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "contact.acceptPolicyLink" })).toHaveAttribute("href", "/en/privacy");
  });

  it("contains a honeypot field named company", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="company"]') as HTMLInputElement | null;
    expect(honeypot).toBeTruthy();
  });

  // ── HTML5 validation ─────────────────────────────────────────────────────────

  it("le champ name a minLength=2", () => {
    render(<ContactForm />);
    const input = document.querySelector('input[name="name"]') as HTMLInputElement;
    expect(input.minLength).toBe(2);
  });

  it("le champ name a maxLength=80", () => {
    render(<ContactForm />);
    const input = document.querySelector('input[name="name"]') as HTMLInputElement;
    expect(input.maxLength).toBe(80);
  });

  it("le champ message a minLength=10", () => {
    render(<ContactForm />);
    const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textarea.minLength).toBe(10);
  });

  it("le champ message a maxLength=2000", () => {
    render(<ContactForm />);
    const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textarea.maxLength).toBe(2000);
  });

  it("le compteur de caractères affiche 0/2000 initialement", () => {
    render(<ContactForm />);
    expect(screen.getByText("0/2000")).toBeInTheDocument();
  });
});
