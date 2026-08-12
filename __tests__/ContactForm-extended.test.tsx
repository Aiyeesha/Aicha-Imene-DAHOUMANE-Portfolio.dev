// __tests__/ContactForm-extended.test.tsx
// ContactForm extended=true — les champs de qualification (secteur/délai/
// budget) de la page /contact, distincts du formulaire rapide de la home.

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

jest.mock("@/app/[locale]/providers", () => ({
  useTrack: () => ({ track: "salesforce", setTrack: jest.fn() }),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

describe("ContactForm extended=false (default, home anchor)", () => {
  it("ne rend aucun des 3 champs de qualification", () => {
    render(<ContactForm />);
    expect(document.getElementById("contact-sector")).toBeNull();
    expect(document.getElementById("contact-timeline")).toBeNull();
    expect(document.getElementById("contact-budget")).toBeNull();
  });
});

describe("ContactForm extended=true (page /contact)", () => {
  it("rend les 3 champs de qualification, tous facultatifs", () => {
    render(<ContactForm extended />);
    const sector = document.getElementById("contact-sector") as HTMLSelectElement;
    const timeline = document.getElementById("contact-timeline") as HTMLSelectElement;
    const budget = document.getElementById("contact-budget") as HTMLSelectElement;
    expect(sector).toBeInTheDocument();
    expect(timeline).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
    expect(sector).not.toBeRequired();
    expect(timeline).not.toBeRequired();
    expect(budget).not.toBeRequired();
  });

  it("réserve l'espace du préfixe de contexte dans le maximum du message (régression message_too_long)", async () => {
    // Avant ce garde-fou, sélectionner secteur/délai/budget composait un
    // préfixe ajouté au message SANS réduire le maxLength du textarea — un
    // message déjà proche de 2000 caractères pouvait dépasser la limite
    // serveur (MAX_MESSAGE_LEN, lib/contactValidation.ts) une fois le préfixe
    // ajouté, et échouer à l'envoi malgré une saisie valide à l'écran.
    const user = userEvent.setup();
    render(<ContactForm extended />);

    const textareaBefore = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textareaBefore.maxLength).toBe(2000);

    const sector = document.getElementById("contact-sector") as HTMLSelectElement;
    await user.selectOptions(sector, "cybersecurity");

    const textareaAfter = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    expect(textareaAfter.maxLength).toBeLessThan(2000);
  });
});
