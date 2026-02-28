// NOTE: jest.mock must run before importing the module under test.
jest.mock("next-intl", () => {
  return {
    useTranslations: () => ((key: string) => key),
    useLocale: () => "en"
  };
});

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
