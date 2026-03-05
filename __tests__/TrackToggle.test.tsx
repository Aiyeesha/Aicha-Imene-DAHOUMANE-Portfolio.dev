// __tests__/TrackToggle.test.tsx
// Composant TrackToggle — tests du switch Salesforce ↔ IT Ops.

// Mocks déclarés avant tout import (requis par Jest)
const mockSetTrack = jest.fn();
let mockTrack = "salesforce";

jest.mock("@/app/[locale]/providers", () => ({
  useTrack: () => ({
    track: mockTrack,
    setTrack: mockSetTrack,
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TrackToggle from "@/components/TrackToggle";

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("TrackToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTrack = "salesforce";
  });

  it("rend deux boutons (IT Ops et Salesforce)", () => {
    render(<TrackToggle />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("le composant a un role='group' accessible", () => {
    render(<TrackToggle />);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("le bouton Salesforce est aria-pressed=true quand track='salesforce'", () => {
    mockTrack = "salesforce";
    render(<TrackToggle />);
    const sfBtn = screen.getByLabelText("a11y.chooseSalesforce");
    expect(sfBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("le bouton IT Ops est aria-pressed=false quand track='salesforce'", () => {
    mockTrack = "salesforce";
    render(<TrackToggle />);
    const itBtn = screen.getByLabelText("a11y.chooseItOps");
    expect(itBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("appelle setTrack('itops') au clic sur le bouton IT Ops", async () => {
    const user = userEvent.setup();
    render(<TrackToggle />);
    const itBtn = screen.getByLabelText("a11y.chooseItOps");
    await user.click(itBtn);
    expect(mockSetTrack).toHaveBeenCalledWith("itops");
  });

  it("appelle setTrack('salesforce') au clic sur le bouton Salesforce", async () => {
    const user = userEvent.setup();
    mockTrack = "itops";
    render(<TrackToggle />);
    const sfBtn = screen.getByLabelText("a11y.chooseSalesforce");
    await user.click(sfBtn);
    expect(mockSetTrack).toHaveBeenCalledWith("salesforce");
  });

  it("le bouton IT Ops est aria-pressed=true quand track='itops'", () => {
    mockTrack = "itops";
    render(<TrackToggle />);
    const itBtn = screen.getByLabelText("a11y.chooseItOps");
    expect(itBtn).toHaveAttribute("aria-pressed", "true");
  });
});
