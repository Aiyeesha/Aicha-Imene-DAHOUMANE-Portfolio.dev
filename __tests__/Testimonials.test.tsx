// __tests__/Testimonials.test.tsx
// Testimonials: guard against publishing unattributed [PLACEHOLDER]
// templates (see content/testimonials.ts).

// matchMedia does not exist in jsdom (needed by next-themes, loaded
// transitively through neighbouring components in some environments)
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
  // The component wraps the quote in typographic quotes in the same text node
  // ("“{quote}”"), so match a substring, not strict equality.
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
    // Without the internal filter, NEXT_PUBLIC_SHOW_TESTIMONIALS=true alone
    // would publish the 4 templates.
    render(<Testimonials items={realTestimonials} />);
    for (const item of realTestimonials.filter((t) => t.isPlaceholder)) {
      expect(byQuoteText(item.quote)).not.toBeInTheDocument();
    }
  });
});
