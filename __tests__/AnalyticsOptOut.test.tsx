// __tests__/AnalyticsOptOut.test.tsx
// Droit d'opposition : le bouton pose / retire la clé `umami.disabled`
// que le script Umami relit avant chaque envoi.

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnalyticsOptOut from "@/components/AnalyticsOptOut";

describe("AnalyticsOptOut", () => {
  beforeEach(() => window.localStorage.clear());

  it("indique que la mesure est active par défaut", () => {
    render(<AnalyticsOptOut />);
    expect(screen.getByRole("status")).toHaveTextContent("optOutStatusOn");
    expect(screen.getByRole("button")).toHaveTextContent("optOutDisable");
  });

  it("pose umami.disabled au clic, puis le retire au second clic", async () => {
    const user = userEvent.setup();
    render(<AnalyticsOptOut />);

    await user.click(screen.getByRole("button"));
    expect(window.localStorage.getItem("umami.disabled")).toBe("1");
    expect(screen.getByRole("status")).toHaveTextContent("optOutStatusOff");

    await user.click(screen.getByRole("button"));
    expect(window.localStorage.getItem("umami.disabled")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("optOutStatusOn");
  });

  it("reflète une opposition déjà enregistrée", () => {
    window.localStorage.setItem("umami.disabled", "1");
    render(<AnalyticsOptOut />);
    expect(screen.getByRole("button")).toHaveTextContent("optOutEnable");
  });
});
