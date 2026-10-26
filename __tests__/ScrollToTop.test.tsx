// __tests__/ScrollToTop.test.tsx
// ScrollToTop: shows and hides with the scroll position.

import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/app/[locale]/providers";

const renderWithProviders = (ui: React.ReactElement) =>
  render(<Providers initialTrack="salesforce">{ui}</Providers>);

// ── Setup window mocks ────────────────────────────────────────────────────────

// matchMedia does not exist in jsdom (needed by next-themes)
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

// scrollTo is not implemented in jsdom: mock it
const mockScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", { value: mockScrollTo, writable: true });

// Helper: simulate scrolling to a position
function simulateScroll(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, writable: true, configurable: true });
  window.dispatchEvent(new Event("scroll"));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ScrollToTop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset scrollY to 0 before each test
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  it("rend le bouton dans le DOM", () => {
    renderWithProviders(<ScrollToTop />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("le bouton est initialement invisible (opacity-0) avant 300px de scroll", () => {
    renderWithProviders(<ScrollToTop />);
    const btn = screen.getByRole("button");
    // opacity-0 is applied when visible=false
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
