// __tests__/Testimonials.test.tsx
// Composant Testimonials — garde-fou contre la publication de gabarits
// [PLACEHOLDER] non attribués (voir content/testimonials.ts).

// matchMedia n'existe pas dans jsdom (requis par next-themes, chargé
// transitivement via des composants voisins dans certains environnements)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

import { render, screen } from "@testing-library/react";
import Testimonials from "@/components/Testimonials";
import type { Testimonial } from "@/content/testimonials";
import { testimonials as realTestimonials } from "@/content/testimonials";

const REAL: Testimonial = {
  id: "real-1",
  name: "CTO — SaaS B2B",
  role: "CTO",
  company: "SaaS B2B",
  quote: "Livraison fiable, autonomie et bon sens produit.",
};

const PLACEHOLDER: Testimonial = {
  id: "placeholder-1",
  name: "[Prénom Nom]",
  role: "[Rôle : ex. Mentor technique]",
  company: "[Contexte]",
  quote: "Gabarit non attribué — ne doit jamais s'afficher.",
  isPlaceholder: true,
};

describe("Testimonials", () => {
  // Le composant enveloppe la citation de guillemets typographiques dans le
  // même nœud texte ("“{quote}”") — on matche donc sur un sous-texte, pas
  // une égalité stricte.
  const byQuoteText = (quote: string) =>
    screen.queryByText((content) => content.includes(quote));

  it("n'affiche jamais un item marqué isPlaceholder", () => {
    render(<Testimonials items={[REAL, PLACEHOLDER]} />);
    expect(byQuoteText(PLACEHOLDER.quote)).not.toBeInTheDocument();
    expect(screen.queryByText("[Prénom Nom]")).not.toBeInTheDocument();
  });

  it("affiche bien les items réels non filtrés", () => {
    render(<Testimonials items={[REAL, PLACEHOLDER]} />);
    expect(byQuoteText(REAL.quote)).toBeInTheDocument();
  });

  it("ne rend rien (pas de crash) si tous les items sont des placeholders", () => {
    const { container } = render(<Testimonials items={[PLACEHOLDER]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("le contenu réel de content/testimonials.ts ne peut pas fuiter un placeholder même sans filtre appelant", () => {
    // Régression directe du bug corrigé le 2026-08-12 : avant le filtre interne,
    // NEXT_PUBLIC_SHOW_TESTIMONIALS=true suffisait à publier les 4 gabarits.
    render(<Testimonials items={realTestimonials} />);
    for (const item of realTestimonials.filter((t) => t.isPlaceholder)) {
      expect(byQuoteText(item.quote)).not.toBeInTheDocument();
    }
  });
});
