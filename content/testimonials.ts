export type Testimonial = {
  id: string;
  /** Display name (can be anonymized) */
  name: string;
  role: string;
  company?: string;
  /** Optional: context (project type, timeframe, collaboration) */
  context?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Product Owner — Retail (EU)",
    role: "Product Owner",
    company: "Retail (EU)",
    context: "Salesforce delivery • coordination métier/tech • 6 semaines",
    quote:
      "Livraison fiable et communication très claire. Les choix techniques ont été expliqués, documentés, et la reprise par l’équipe a été fluide."
  },
  {
    id: "t2",
    name: "CTO — SaaS B2B",
    role: "CTO",
    company: "SaaS B2B",
    context: "Backend/API • CI/CD • qualité & tests",
    quote:
      "Autonome, pragmatique, et orienté qualité. Bon sens produit, bonnes pratiques (tests, CI), et un handover propre avec runbook."
  },
  {
    id: "t3",
    name: "Tech Lead — Conseil",
    role: "Tech Lead",
    company: "Conseil",
    context: "Refonte & stabilisation • réduction des risques • documentation",
    quote:
      "Très rigoureux sur la maintenabilité et la réduction des risques. Une approche structurée (checklists, doc, validation) qui sécurise la mise en production."
  }
];
