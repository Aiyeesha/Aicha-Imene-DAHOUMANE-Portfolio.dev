// __tests__/ContactForm-extended.test.tsx
// ContactForm extended=true — les champs « recruteur » (poste, contrat, lieu,
// date de prise de poste) de la page /contact, distincts du formulaire rapide
// de la home. Ils remplacent depuis l'audit de contenu du 2026-09-25 les
// anciens champs de prestation (secteur / délai / enveloppe budgétaire).

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

describe("ContactForm extended=false (default, home anchor)", () => {
  it("ne rend aucun des 4 champs recruteur", () => {
    render(<ContactForm />);
    for (const id of RECRUITER_FIELD_IDS) {
      expect(document.getElementById(id)).toBeNull();
    }
  });
});

describe("ContactForm extended=true (page /contact)", () => {
  it("rend les 4 champs recruteur, tous facultatifs", () => {
    render(<ContactForm extended />);
    for (const id of RECRUITER_FIELD_IDS) {
      const el = document.getElementById(id);
      expect(el).toBeInTheDocument();
      expect(el).not.toBeRequired();
    }
  });

  it("ne rend plus les anciens champs de prestation (secteur, délai, budget)", () => {
    render(<ContactForm extended />);
    expect(document.getElementById("contact-sector")).toBeNull();
    expect(document.getElementById("contact-timeline")).toBeNull();
    expect(document.getElementById("contact-budget")).toBeNull();
  });

  it("propose CDI, CDD, intérim et portage comme types de contrat", () => {
    render(<ContactForm extended />);
    const contract = document.getElementById("contact-contract") as HTMLSelectElement;
    const values = Array.from(contract.options).map((o) => o.value);
    expect(values).toEqual(["", "permanent", "fixedTerm", "temp", "portage", "other"]);
  });

  it("réserve l'espace du préfixe de contexte dans le maximum du message (régression message_too_long)", async () => {
    // Le contexte du poste est composé en préfixe du message : sans ce garde-fou,
    // un message déjà proche de 2000 caractères pouvait dépasser la limite
    // serveur (MAX_MESSAGE_LEN, lib/contactValidation.ts) une fois le préfixe
    // ajouté, et échouer à l'envoi malgré une saisie valide à l'écran.
    const user = userEvent.setup();
    render(<ContactForm extended />);

    const textareaBefore = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textareaBefore.maxLength).toBe(2000);

    const contract = document.getElementById("contact-contract") as HTMLSelectElement;
    await user.selectOptions(contract, "permanent");
    await user.type(document.getElementById("contact-role") as HTMLInputElement, "Salesforce Developer");

    const textareaAfter = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textareaAfter.maxLength).toBeLessThan(2000);
  });
});
