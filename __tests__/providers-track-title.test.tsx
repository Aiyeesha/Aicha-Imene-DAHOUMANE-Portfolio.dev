// __tests__/providers-track-title.test.tsx
// Checks the app/[locale]/providers.tsx effect that updates document.title
// on a track switch (Salesforce ↔ IT Ops): the track title must only apply
// on the home page, never overwrite another page's title (e.g. /fr/about).

// Mocks declared before any import (required by Jest).
// Simulated current path, set per test.
let mockPathname = "/fr";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

// Mock translations: distinct, recognisable titles for the two keys used by
// the effect, the raw key otherwise.
jest.mock("next-intl", () => ({
  useLocale: () => "fr",
  useTranslations: () => (key: string) =>
    ({
      "metadata.title": "TITRE ACCUEIL SALESFORCE",
      "metadata.titleItops": "TITRE ACCUEIL IT OPS",
    })[key] ?? key,
}));

// next-themes renders an inline <script> and reads matchMedia (missing from
// jsdom): replaced by a plain pass-through, unrelated to this test.
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

import type React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Providers, { useTrack } from "@/app/[locale]/providers";

// Minimal test component: one button per track, wired to setTrack.
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
    // Initial title from the server (untouched on first render).
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
