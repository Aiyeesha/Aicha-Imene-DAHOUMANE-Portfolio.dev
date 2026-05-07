// __tests__/BlogAuthorCard.test.tsx
// Carte auteur blog — track-aware (Salesforce ↔ IT Ops).

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: { src: string; alt: string; [k: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...rest} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

const mockTrack = { current: "salesforce" };

jest.mock("@/app/[locale]/providers", () => ({
  useTrack: () => ({ track: mockTrack.current, setTrack: jest.fn() }),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import BlogAuthorCard from "@/components/blog/BlogAuthorCard";

const defaultProps = {
  authorName: "Aïcha Imène DAHOUMANE",
  avatarUrl: "/avatar.webp",
  locale: "en",
};

describe("BlogAuthorCard", () => {
  beforeEach(() => {
    mockTrack.current = "salesforce";
  });

  it("affiche le nom de l'auteure", () => {
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByText("Aïcha Imène DAHOUMANE")).toBeInTheDocument();
  });

  it("affiche l'avatar", () => {
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByAltText("Aïcha Imène DAHOUMANE")).toBeInTheDocument();
  });

  it("affiche le badge 'Salesforce' en mode salesforce", () => {
    mockTrack.current = "salesforce";
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByText("Salesforce")).toBeInTheDocument();
  });

  it("affiche le badge 'IT Ops' en mode itops", () => {
    mockTrack.current = "itops";
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByText("IT Ops")).toBeInTheDocument();
  });

  it("affiche le rôle Salesforce en mode salesforce", () => {
    mockTrack.current = "salesforce";
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByText("authorRoleSalesforce")).toBeInTheDocument();
  });

  it("affiche le rôle IT Ops en mode itops", () => {
    mockTrack.current = "itops";
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByText("authorRoleItops")).toBeInTheDocument();
  });

  it("affiche la bio Salesforce en mode salesforce", () => {
    mockTrack.current = "salesforce";
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByText("authorBioSalesforce")).toBeInTheDocument();
  });

  it("affiche la bio IT Ops en mode itops", () => {
    mockTrack.current = "itops";
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.getByText("authorBioItops")).toBeInTheDocument();
  });

  it("contient un lien vers la page About", () => {
    render(<BlogAuthorCard {...defaultProps} />);
    const link = screen.getByText("authorProfileLink").closest("a");
    expect(link).toHaveAttribute("href", "/en/about");
  });

  it("n'affiche pas le lien LinkedIn si non fourni", () => {
    render(<BlogAuthorCard {...defaultProps} />);
    expect(screen.queryByText("LinkedIn")).not.toBeInTheDocument();
  });

  it("affiche le lien LinkedIn si fourni", () => {
    render(<BlogAuthorCard {...defaultProps} linkedInUrl="https://linkedin.com/in/test" />);
    const link = screen.getByText("LinkedIn").closest("a");
    expect(link).toHaveAttribute("href", "https://linkedin.com/in/test");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("la bordure est cyan en mode salesforce", () => {
    mockTrack.current = "salesforce";
    const { container } = render(<BlogAuthorCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/border-cyan/);
  });

  it("la bordure est violet en mode itops", () => {
    mockTrack.current = "itops";
    const { container } = render(<BlogAuthorCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/border-violet/);
  });
});
