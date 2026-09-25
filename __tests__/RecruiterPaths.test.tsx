// __tests__/RecruiterPaths.test.tsx
// Bloc « Vous recrutez pour quel poste ? » de l'accueil (audit de contenu
// 2026-09-25, lot 2) : lien vers /hybride, bascule du track et CV par profil.

const setTrack = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

jest.mock("@/app/[locale]/providers", () => ({
  useTrack: () => ({ track: "salesforce", setTrack }),
}));

jest.mock("@/lib/analytics", () => ({ trackEvent: jest.fn() }));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecruiterPaths from "@/components/RecruiterPaths";

describe("RecruiterPaths", () => {
  beforeEach(() => setTrack.mockClear());

  it("renvoie la carte hybride vers /hybride", () => {
    render(<RecruiterPaths />);
    expect(screen.getByRole("link", { name: /hybridCta/ })).toHaveAttribute("href", "/fr/hybride");
  });

  it("propose le CV correspondant à chaque profil", () => {
    render(<RecruiterPaths />);
    const cvHrefs = screen.getAllByRole("link", { name: "cv" }).map((a) => a.getAttribute("href"));
    expect(cvHrefs).toEqual([
      "/cv/Aicha-Imene-DAHOUMANE-CV-fr-hybrid.pdf",
      "/cv/Aicha-Imene-DAHOUMANE-CV-fr-salesforce.pdf",
      "/cv/Aicha-Imene-DAHOUMANE-CV-fr-itops.pdf",
    ]);
  });

  it("bascule le track IT Ops quand on choisit le poste systèmes & DevOps", async () => {
    const user = userEvent.setup();
    render(<RecruiterPaths />);
    const buttons = screen.getAllByRole("button", { name: /showProfile/ });
    // Ordre des cartes : hybride (lien), Salesforce, IT Ops.
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    await user.click(buttons[1]);
    expect(setTrack).toHaveBeenCalledWith("itops");
  });
});
