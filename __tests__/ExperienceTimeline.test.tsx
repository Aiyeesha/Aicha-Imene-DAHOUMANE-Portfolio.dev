// __tests__/ExperienceTimeline.test.tsx
// Frise « Expérience » — rendu toujours déplié, structure accessible et
// contenu complet dans les trois langues (remplace les tests de l'accordéon).

import { render, screen, within } from "@testing-library/react";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { getExperienceItems, type Locale } from "@/content/experience";

const LOCALES: Locale[] = ["fr", "en", "es"];

describe("ExperienceTimeline", () => {
  it.each(LOCALES)("affiche les 3 expériences dans une liste ordonnée (%s)", (locale) => {
    const items = getExperienceItems(locale);
    render(<ExperienceTimeline items={items} />);

    const list = screen.getAllByRole("list")[0];
    expect(list.tagName).toBe("OL");
    // Enfants directs <li> de la frise (les puces imbriquées sont exclues)
    expect(list.querySelectorAll(":scope > li")).toHaveLength(3);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it.each(LOCALES)("rend tout le contenu visible, sans bouton ni aria-expanded (%s)", (locale) => {
    const items = getExperienceItems(locale);
    const { container } = render(<ExperienceTimeline items={items} />);

    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(container.querySelector("[aria-expanded]")).toBeNull();

    for (const item of items) {
      for (const highlight of item.highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
      if (item.note) expect(screen.getByText(item.note)).toBeInTheDocument();
    }
  });

  it("compose le titre « Poste · Entreprise » avec l'entreprise en couleur d'accent", () => {
    const [first] = getExperienceItems("fr");
    render(<ExperienceTimeline items={[first]} />);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Développeuse Salesforce");
    const company = within(heading).getByText("LD Digitales");
    expect(company).toHaveClass("text-cyan-700");
  });

  it("affiche la ligne « Contrat · Période · Lieu »", () => {
    const [first] = getExperienceItems("fr");
    render(<ExperienceTimeline items={[first]} />);

    const meta = screen.getByText((_, el) => el?.tagName === "P" && /CDI/.test(el.textContent ?? ""));
    expect(meta).toHaveTextContent("CDI");
    expect(meta).toHaveTextContent("Oct. 2025 — Aujourd’hui");
    expect(meta).toHaveTextContent("Télétravail");
  });

  it("affiche la note du CDI en italique atténué, avant les réalisations", () => {
    const [first] = getExperienceItems("fr");
    render(<ExperienceTimeline items={[first]} />);

    const note = screen.getByText(first.note!);
    expect(note.tagName).toBe("LI");
    expect(note).toHaveClass("italic", "text-slate-500");
    expect(note.parentElement?.firstElementChild).toBe(note);
  });

  it("conserve le lieu d'origine en anglais et en espagnol", () => {
    expect(getExperienceItems("en")[0].location).toBe("Remote");
    expect(getExperienceItems("es")[0].location).toBe("Remoto");
  });
});
