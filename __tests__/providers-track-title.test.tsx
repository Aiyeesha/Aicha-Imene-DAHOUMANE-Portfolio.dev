// __tests__/providers-track-title.test.tsx
// Vérifie l'effet de app/[locale]/providers.tsx qui met à jour document.title
// lors d'une bascule de parcours (Salesforce ↔ IT Ops).
// Régression couverte — audit 2026-10-23 (P1) : la bascule écrasait le titre
// de N'IMPORTE QUELLE page (ex. /fr/about) par le titre générique de
// l'accueil. Le titre de parcours ne doit s'appliquer que sur l'accueil.

// Mocks déclarés avant tout import (requis par Jest).
// Chemin courant simulé, modifiable test par test.
let mockPathname = "/fr";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

// Traductions simulées : on renvoie des titres distincts et reconnaissables
// pour les deux clés utilisées par l'effet, la clé brute sinon.
jest.mock("next-intl", () => ({
  useLocale: () => "fr",
  useTranslations: () => (key: string) =>
    ({
      "metadata.title": "TITRE ACCUEIL SALESFORCE",
      "metadata.titleItops": "TITRE ACCUEIL IT OPS",
    })[key] ?? key,
}));

// next-themes rend un <script> inline et lit matchMedia, absent de jsdom :
// on le remplace par un simple passe-plat, sans rapport avec ce test.
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

import type React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Providers, { useTrack } from "@/app/[locale]/providers";

// Composant de test minimal : un bouton par parcours, branché sur setTrack.
function Toggle() {
  const { setTrack } = useTrack();
  return (
    <>
      <button onClick={() => setTrack("itops")}>itops</button>
      <button onClick={() => setTrack("salesforce")}>salesforce</button>
    </>
  );
}

function renderWithProviders() {
  return render(
    <Providers initialTrack="salesforce">
      <Toggle />
    </Providers>
  );
}

describe("Providers — titre de l'onglet lors d'une bascule de parcours", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("met à jour le titre sur l'accueil (/fr)", async () => {
    mockPathname = "/fr";
    // Titre initial produit par le serveur (non modifié au premier rendu).
    document.title = "TITRE ACCUEIL SALESFORCE";
    renderWithProviders();
    expect(document.title).toBe("TITRE ACCUEIL SALESFORCE");

    await act(() => userEvent.click(screen.getByText("itops")));
    expect(document.title).toBe("TITRE ACCUEIL IT OPS");

    await act(() => userEvent.click(screen.getByText("salesforce")));
    expect(document.title).toBe("TITRE ACCUEIL SALESFORCE");
  });

  it("met aussi à jour le titre sur l'accueil avec barre oblique finale (/fr/)", async () => {
    mockPathname = "/fr/";
    document.title = "TITRE ACCUEIL SALESFORCE";
    renderWithProviders();

    await act(() => userEvent.click(screen.getByText("itops")));
    expect(document.title).toBe("TITRE ACCUEIL IT OPS");
  });

  it.each(["/fr/about", "/fr/projects", "/fr/projects/idemconnect-apex-backend"])(
    "ne modifie pas le titre d'une page interne (%s)",
    async (path) => {
      mockPathname = path;
      document.title = "À propos — Aïcha Imène DAHOUMANE";
      renderWithProviders();

      await act(() => userEvent.click(screen.getByText("itops")));
      expect(document.title).toBe("À propos — Aïcha Imène DAHOUMANE");

      await act(() => userEvent.click(screen.getByText("salesforce")));
      expect(document.title).toBe("À propos — Aïcha Imène DAHOUMANE");
    }
  );
});
