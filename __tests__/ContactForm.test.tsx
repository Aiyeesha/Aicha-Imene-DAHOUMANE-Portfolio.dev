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
});
