// __tests__/ScrollToTop.test.tsx
// Composant ScrollToTop — apparition/disparition selon la position de scroll.

import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/app/[locale]/providers";

const renderWithProviders = (ui: React.ReactElement) =>
  render(<Providers initialTrack="salesforce">{ui}</Providers>);

// ── Setup window mocks ────────────────────────────────────────────────────────

// matchMedia n'existe pas dans jsdom (requis par next-themes)
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

// scrollTo n'est pas implémenté dans jsdom — on le mocke
const mockScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", { value: mockScrollTo, writable: true });

// Helper : simuler un scroll à une position donnée
function simulateScroll(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, writable: true, configurable: true });
  window.dispatchEvent(new Event("scroll"));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ScrollToTop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Réinitialiser scrollY à 0 avant chaque test
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  it("rend le bouton dans le DOM", () => {
    renderWithProviders(<ScrollToTop />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("le bouton est initialement invisible (opacity-0) avant 300px de scroll", () => {
    renderWithProviders(<ScrollToTop />);
    const btn = screen.getByRole("button");
    // La classe CSS opacity-0 est appliquée quand visible=false
    expect(btn.className).toContain("opacity-0");
  });

  it("le bouton devient visible après plus de 300px de scroll", () => {
    renderWithProviders(<ScrollToTop />);
    act(() => {
      simulateScroll(400);
    });
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("opacity-100");
  });

  it("le bouton redevient invisible si on remonte sous 300px", () => {
    renderWithProviders(<ScrollToTop />);
    act(() => { simulateScroll(500); });
    act(() => { simulateScroll(100); });
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("opacity-0");
  });

  it("a un aria-label en français", () => {
    renderWithProviders(<ScrollToTop />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-label", "Retour en haut de page");
  });

  it("appelle window.scrollTo({top:0, behavior:'smooth'}) au clic", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ScrollToTop />);
    act(() => { simulateScroll(400); });
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
