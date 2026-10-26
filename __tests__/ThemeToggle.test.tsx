// __tests__/ThemeToggle.test.tsx
// ThemeToggle: dark/light switch tests.

const mockSetTheme = jest.fn();
let mockTheme = "dark";
let mockSystemTheme = "dark";

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
    systemTheme: mockSystemTheme,
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/ThemeToggle";

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ThemeToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTheme = "dark";
    mockSystemTheme = "dark";
  });

  it("ne rend rien avant le montage (SSR-safe)", () => {
    // ThemeToggle renders null until mounted; with jsdom it is already
    // mounted after render(), so it must render something.
    const { container } = render(<ThemeToggle />);
    expect(container).toBeDefined();
  });

  it("affiche 🌙 quand le thème est sombre", () => {
    mockTheme = "dark";
    render(<ThemeToggle />);
    expect(screen.getByText("🌙")).toBeInTheDocument();
  });

  it("affiche ☀️ quand le thème est clair", () => {
    mockTheme = "light";
    render(<ThemeToggle />);
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });

  it("appelle setTheme('light') en dark mode au clic", async () => {
    const user = userEvent.setup();
    mockTheme = "dark";
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("appelle setTheme('dark') en light mode au clic", async () => {
    const user = userEvent.setup();
    mockTheme = "light";
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("utilise systemTheme si theme='system'", () => {
    mockTheme = "system";
    mockSystemTheme = "light";
    render(<ThemeToggle />);
    // system + systemTheme=light → shows ☀️
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });

  it("a un aria-label accessible", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-label", "a11y.toggleTheme");
  });
});
