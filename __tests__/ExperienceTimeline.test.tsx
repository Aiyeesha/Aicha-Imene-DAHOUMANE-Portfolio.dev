// __tests__/ExperienceTimeline.test.tsx
// "Experience" timeline: always expanded, accessible structure and complete
// content in the three languages.

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
    // Direct <li> children of the timeline (nested bullets excluded)
    expect(list.querySelectorAll(":scope > li")).toHaveLength(3);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it.each(LOCALES)("rend tout le contenu visible, sans bouton ni aria-expanded (%s)", (locale) => {
    const items = getExperienceItems(locale);
    const { container } = render(<ExperienceTimeline items={items} />);

    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(container.querySelector("[aria-expanded]")).toBeNull();

    // Testing Library normalises DOM whitespace (non-breaking → regular space)
    // but not the searched string: apply the same normalisation.
    const normalize = (text: string) => text.replace(/\s+/g, " ");
    for (const item of items) {
      for (const highlight of item.highlights) {
        expect(screen.getByText(normalize(highlight))).toBeInTheDocument();
      }
      if (item.note) expect(screen.getByText(normalize(item.note))).toBeInTheDocument();
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
    expect(meta).toHaveTextContent("Oct. 2025 — Nov. 2026");
    expect(meta).toHaveTextContent("Télétravail");
  });

  it("affiche la note du CDI en italique atténué, avant les réalisations", () => {
    const [first] = getExperienceItems("fr");
    render(<ExperienceTimeline items={[first]} />);

    const note = screen.getByText(first.note!);
    expect(note.tagName).toBe("LI");
    // slate-600 rather than slate-500 (4.34:1, below AA)
    expect(note).toHaveClass("italic", "text-slate-600");
    expect(note.parentElement?.firstElementChild).toBe(note);
  });

  it("parle du préavis jusqu'à la bascule de disponibilité, puis seulement de la fin de contrat", () => {
    const before = new Date("2026-11-30T12:00:00+01:00");
    const after = new Date("2026-12-01T00:00:00+01:00");
    for (const locale of ["fr", "en", "es"] as Locale[]) {
      const noteBefore = getExperienceItems(locale, before)[0].note!;
      const noteAfter = getExperienceItems(locale, after)[0].note!;
      expect(noteBefore).toMatch(/Préavis|Notice period|Preaviso/);
      expect(noteAfter).not.toMatch(/Préavis|Notice period|Preaviso|préavis|preaviso/);
      expect(noteAfter).toMatch(/30/);
    }
  });

  it("conserve le lieu d'origine en anglais et en espagnol", () => {
    expect(getExperienceItems("en")[0].location).toBe("Remote");
    expect(getExperienceItems("es")[0].location).toBe("Remoto");
  });
});
