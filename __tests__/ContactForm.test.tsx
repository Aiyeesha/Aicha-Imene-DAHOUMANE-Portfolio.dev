// NOTE: jest.mock must run before importing the module under test.
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// ContactForm utilise useTrack() → mock du contexte Track
jest.mock("@/app/[locale]/providers", () => ({
  useTrack: () => ({ track: "salesforce", setTrack: jest.fn() }),
}));

import { render, screen } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  it("requires privacy consent checkbox (HTML required)", () => {
    render(<ContactForm />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeRequired();
  });

  it("contains a honeypot field named company", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="company"]') as HTMLInputElement | null;
    expect(honeypot).toBeTruthy();
  });

  // ── Validation HTML5 ajoutée dans cette session ────────────────────────────

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
