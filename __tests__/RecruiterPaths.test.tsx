// __tests__/RecruiterPaths.test.tsx
// Sélecteur de profil « Vous recrutez pour quel poste ? » de l'accueil.
// Option C (brief §3.2) : chaque carte = une phrase + le CV du profil dans la
// langue de la page ; plus de bouton de bascule du track.

jest.mock("next-intl/server", () => ({
  // Renvoie la clé telle quelle : on teste la structure, pas les traductions.
  getTranslations: async () => (key: string) => key,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

import { render, screen } from "@testing-library/react";
import RecruiterPaths from "@/components/RecruiterPaths";

// Server Component asynchrone : on attend son rendu avant de le monter.
async function renderPaths(locale: "fr" | "en" | "es") {
  render(await RecruiterPaths({ locale }));
}

describe("RecruiterPaths", () => {
  it("affiche les trois cartes de profil", async () => {
    await renderPaths("fr");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    for (const title of ["hybridTitle", "salesforceTitle", "itopsTitle"]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
  });

  it("propose le CV de chaque profil dans la langue de la page", async () => {
    await renderPaths("es");
    const cvHrefs = screen.getAllByRole("link", { name: /^cv/ }).map((a) => a.getAttribute("href"));
    expect(cvHrefs).toEqual([
      "/cv/Aicha-Imene-DAHOUMANE-CV-es-hybrid.pdf",
      "/cv/Aicha-Imene-DAHOUMANE-CV-es-salesforce.pdf",
      "/cv/Aicha-Imene-DAHOUMANE-CV-es-itops.pdf",
    ]);
  });

  it("renvoie la carte hybride vers /hybride", async () => {
    await renderPaths("fr");
    expect(screen.getByRole("link", { name: /hybridCta/ })).toHaveAttribute("href", "/fr/hybride");
  });

  it("n'affiche plus aucun bouton de bascule de profil", async () => {
    await renderPaths("fr");
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
