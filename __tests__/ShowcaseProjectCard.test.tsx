// __tests__/ShowcaseProjectCard.test.tsx
// Carte « projet phare » de l'accueil (Option C) : format Problème → Solution →
// Résultat, statut honnête toujours affiché, et aucun lien vide ou provisoire.

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

import { render, screen, within } from "@testing-library/react";
import ShowcaseProjectCard, { type ShowcaseCardProps } from "@/components/home/ShowcaseProjectCard";
import { homeShowcase } from "@/content/homeShowcase";

const labels = {
  problem: "Problème",
  solution: "Solution",
  result: "Résultat",
  tech: "Technologies",
  readCase: "Lire l'étude de cas",
  viewRepo: "Voir le dépôt GitHub",
  viewWorkflow: "Voir le workflow",
  opensInNewTab: "s'ouvre dans un nouvel onglet",
};

const base: ShowcaseCardProps = {
  categories: "Salesforce · Intégration",
  title: "Projet test",
  status: "Projet de formation RNCP niveau 6",
  problem: "Le problème.",
  solution: "La solution.",
  result: "Le résultat.",
  tech: ["Apex", "Heroku"],
  caseStudyHref: "/fr/projects/projet-test",
  repoUrl: "https://github.com/Aiyeesha/projet-test",
  labels,
};

describe("ShowcaseProjectCard", () => {
  it("affiche le titre, le statut et les trois blocs Problème / Solution / Résultat", () => {
    render(<ShowcaseProjectCard {...base} />);
    expect(screen.getByRole("heading", { level: 3, name: "Projet test" })).toBeInTheDocument();
    expect(screen.getByText("Projet de formation RNCP niveau 6")).toBeInTheDocument();
    for (const [term, def] of [
      ["Problème", "Le problème."],
      ["Solution", "La solution."],
      ["Résultat", "Le résultat."],
    ]) {
      const dt = screen.getByText(term);
      expect(dt.tagName).toBe("DT");
      expect(dt.nextElementSibling).toHaveTextContent(def);
    }
  });

  it("liste les technologies", () => {
    render(<ShowcaseProjectCard {...base} />);
    const list = screen.getByRole("list", { name: "Technologies" });
    expect(within(list).getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Apex", "Heroku"]);
  });

  it("relie l'étude de cas en interne et le dépôt en nouvel onglet sécurisé", () => {
    render(<ShowcaseProjectCard {...base} />);
    expect(screen.getByRole("link", { name: /Lire l'étude de cas/ })).toHaveAttribute("href", "/fr/projects/projet-test");
    const repo = screen.getByRole("link", { name: /Voir le dépôt GitHub/ });
    expect(repo).toHaveAttribute("href", "https://github.com/Aiyeesha/projet-test");
    expect(repo).toHaveAttribute("target", "_blank");
    expect(repo).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("ne rend aucun lien d'étude de cas ni de workflow quand ils sont absents", () => {
    render(<ShowcaseProjectCard {...base} caseStudyHref={undefined} />);
    expect(screen.queryByRole("link", { name: /Lire l'étude de cas/ })).toBeNull();
    expect(screen.queryByRole("link", { name: /Voir le workflow/ })).toBeNull();
  });
});

describe("homeShowcase (données des projets phares)", () => {
  it("contient exactement 5 projets", () => {
    expect(homeShowcase).toHaveLength(5);
  });

  it("ne publie que des dépôts GitHub réels du compte Aiyeesha, sans lien provisoire", () => {
    for (const p of homeShowcase) {
      for (const url of [p.repoUrl, p.workflowUrl].filter(Boolean) as string[]) {
        expect(url).toMatch(/^https:\/\/github\.com\/Aiyeesha\/[\w.-]+/);
        expect(url).not.toMatch(/TODO|example\.com|placeholder/i);
      }
    }
  });
});
