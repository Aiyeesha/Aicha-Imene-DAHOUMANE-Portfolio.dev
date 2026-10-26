// __tests__/ContactForm-extended.test.tsx
// Recruiter fields (role, contract, location, start date) of the single home
// page contact form, grouped in a <details> collapsed by default.

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

jest.mock("@/app/[locale]/providers", () => ({
  useTrack: () => ({ track: "salesforce", setTrack: jest.fn() }),
}));

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

const RECRUITER_FIELD_IDS = ["contact-role", "contact-contract", "contact-workplace", "contact-start"];

describe("ContactForm — bloc recruteur replié", () => {
  it("regroupe les 4 champs recruteur dans un <details> fermé par défaut", () => {
    render(<ContactForm />);
    for (const id of RECRUITER_FIELD_IDS) {
      const details = document.getElementById(id)?.closest("details");
      expect(details).not.toBeNull();
      expect(details).not.toHaveAttribute("open");
    }
  });
});

describe("ContactForm — champs recruteur", () => {
  it("rend les 4 champs recruteur, tous facultatifs", () => {
    render(<ContactForm />);
    for (const id of RECRUITER_FIELD_IDS) {
      const el = document.getElementById(id);
      expect(el).toBeInTheDocument();
      expect(el).not.toBeRequired();
    }
  });

  it("ne rend plus les anciens champs de prestation (secteur, délai, budget)", () => {
    render(<ContactForm />);
    expect(document.getElementById("contact-sector")).toBeNull();
    expect(document.getElementById("contact-timeline")).toBeNull();
    expect(document.getElementById("contact-budget")).toBeNull();
  });

  it("propose CDI, CDD, intérim et portage comme types de contrat", () => {
    render(<ContactForm />);
    const contract = document.getElementById("contact-contract") as HTMLSelectElement;
    const values = Array.from(contract.options).map((o) => o.value);
    expect(values).toEqual(["", "permanent", "fixedTerm", "temp", "portage", "other"]);
  });

  it("réserve l'espace du préfixe de contexte dans le maximum du message (régression message_too_long)", async () => {
    // The role context is prepended to the message: without this guard, a
    // message close to 2000 characters could exceed the server limit
    // (MAX_MESSAGE_LEN, lib/contactValidation.ts) once prefixed, and fail to
    // send despite valid input on screen.
    const user = userEvent.setup();
    render(<ContactForm />);

    const textareaBefore = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textareaBefore.maxLength).toBe(2000);

    const contract = document.getElementById("contact-contract") as HTMLSelectElement;
    await user.selectOptions(contract, "permanent");
    await user.type(document.getElementById("contact-role") as HTMLInputElement, "Salesforce Developer");

    const textareaAfter = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textareaAfter.maxLength).toBeLessThan(2000);
  });
});
