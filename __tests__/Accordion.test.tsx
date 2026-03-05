// __tests__/Accordion.test.tsx
// Composant Accordion — tests d'interaction (ouverture/fermeture, accessibilité).

// next/image → rendu natif <img> en environnement de test
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "@/components/Accordion";
import type { AccordionItem } from "@/components/Accordion";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const items: AccordionItem[] = [
  {
    id: "item-1",
    title: "Développeuse Salesforce",
    subtitle: "LD Digitales — Remote",
    rightMeta: "Oct. 2023 — Present",
    content: "Développement Apex, Flows, LWC.",
  },
  {
    id: "item-2",
    title: "Technicien Systèmes",
    subtitle: "Midrange — Paris",
    rightMeta: "Jan. 2022 — Sep. 2023",
    content: "Administration Windows Server, Active Directory.",
  },
];

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Accordion", () => {
  it("affiche tous les titres des items", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("Développeuse Salesforce")).toBeInTheDocument();
    expect(screen.getByText("Technicien Systèmes")).toBeInTheDocument();
  });

  it("ouvre l'item par défaut (defaultOpenId)", () => {
    render(<Accordion items={items} defaultOpenId="item-1" />);
    // Le bouton doit être aria-expanded=true pour l'item ouvert
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });

  it("tous les items sont fermés si aucun defaultOpenId", () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("ouvre un item au clic et ferme les autres", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("ferme un item ouvert en cliquant dessus à nouveau", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpenId="item-1" />);
    const buttons = screen.getAllByRole("button");

    // Ferme l'item déjà ouvert
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("chaque bouton a un aria-controls pointant vers son panneau", () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      const controls = btn.getAttribute("aria-controls");
      expect(controls).toBeTruthy();
      // Le panneau correspondant doit exister dans le DOM
      expect(document.getElementById(controls!)).toBeInTheDocument();
    });
  });

  it("affiche le badge 'Current'/'Actuel' pour les postes en cours", () => {
    render(<Accordion items={items} />);
    // "Present" dans rightMeta déclenche le badge Current
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("affiche le subtitle quand il est fourni", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("LD Digitales — Remote")).toBeInTheDocument();
  });

  it("affiche le logo quand logoSrc est fourni", () => {
    const itemsWithLogo: AccordionItem[] = [
      {
        id: "logo-item",
        title: "Poste avec logo",
        content: "Contenu.",
        logoSrc: "/companies/ld-digitales.webp",
        logoAlt: "LD Digitales",
      },
    ];
    render(<Accordion items={itemsWithLogo} />);
    const logo = screen.getByAltText("LD Digitales");
    expect(logo).toBeInTheDocument();
  });
});
