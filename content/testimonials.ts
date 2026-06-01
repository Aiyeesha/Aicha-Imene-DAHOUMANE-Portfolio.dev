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

// POLITIQUE : n'afficher que des avis réels et attribuables.
// Les entrées marquées [PLACEHOLDER] ne doivent JAMAIS être publiées —
// elles servent de gabarit uniquement. Activer NEXT_PUBLIC_SHOW_TESTIMONIALS=true
// uniquement lorsque toutes les entrées sont réelles et vérifiées.
export const testimonials: Testimonial[] = [
  // ── Avis réels (à compléter avec des informations d'attribution vérifiées) ──
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
  },
  // ── [PLACEHOLDER] — gabarits à remplacer par de vrais avis avant publication ──
  {
    id: "t4",
    name: "[Prénom Nom]",
    role: "[Rôle : ex. Mentor technique / Évaluateur Salesforce]",
    company: "[Contexte : ex. OpenClassrooms / Formation Salesforce]",
    context: "Mentor/Évaluateur de formation",
    quote:
      "Aïcha a suivi une trajectoire atypique et c’est précisément ce qui la distingue. Elle est arrivée dans l’écosystème Salesforce avec un bagage solide en systèmes et administration, ce qui lui a donné une lecture différente des problèmes — plus orientée exploitation et maintenabilité que la plupart des développeurs que j’ai accompagnés. Ce qui m’a marqué dans son travail, c’est la qualité de la documentation qu’elle produit systématiquement. Sur les projets Apex, ses livrables incluaient toujours des specs claires, des choix d’architecture justifiés et une couverture de tests > 75%. Elle ne livre pas juste du code qui “passe” — elle livre du code qu’un autre développeur peut reprendre. Je la recommande sans hésitation pour des missions de développement ou d’administration Salesforce, notamment dans des contextes où la rigueur et la traçabilité sont importantes."
  },
  {
    id: "t5",
    name: "[Prénom Nom]",
    role: "[Rôle : ex. Développeur Salesforce / Développeur Full-Stack]",
    company: "[Entreprise ou “En freelance”]",
    context: "Collaboration Flows & Apex • pipeline CI/CD",
    quote:
      "J’ai eu l’occasion de travailler avec Aïcha sur un projet Salesforce impliquant des Flows complexes et une couche Apex. Ce que j’ai apprécié, c’est sa capacité à poser les bonnes questions avant de coder — elle prend le temps de comprendre les règles métier, ce qui évite beaucoup de va-et-vient ensuite. Elle a notamment pris en charge la mise en place du pipeline CI/CD avec Salesforce CLI et GitHub Actions, et a documenté le tout de façon très claire. Je me souviens avoir utilisé sa documentation pour reproduire le setup de mon côté — c’était directement actionnable. C’est quelqu’un de rigoureux, avec qui la collaboration à distance est fluide. Elle communique régulièrement sur l’avancement et remonte les blocages rapidement."
  },
  {
    id: "t6",
    name: "[First Name Last Name]",
    role: "[Role : ex. Project Manager / Product Owner]",
    company: "[Company]",
    context: "Salesforce implementation project",
    quote:
      "We worked with Aïcha on a Salesforce implementation project that required both technical depth and clear communication with non-technical stakeholders. She managed to bridge that gap effectively — translating business requirements into clean data models and automation logic without overcomplicating things. She delivered a full set of documentation alongside the solution: deployment runbooks, validation checklists, and an API test suite. This made the handover genuinely smooth and gave us confidence in what was deployed to production. What stood out was her security-first mindset — she flagged potential sharing rule issues before they became a problem, which we really appreciated. I’d work with her again on a future project."
  },
  {
    id: "t7",
    name: "[Prénom Nom]",
    role: "[Rôle : ex. Responsable IT / DSI / Team Lead]",
    company: "[Entreprise]",
    context: "Administration système & supervision",
    quote:
      "Aïcha a travaillé dans notre équipe sur des missions d’administration système et de supervision. Elle s’est démarquée par sa capacité à documenter des procédures complexes de façon accessible — ses runbooks étaient clairs, structurés, et réutilisables par toute l’équipe. Elle a notamment mis en place et documenté des workflows de ticketing et des procédures de remédiation pour des alertes de sécurité, ce qui a réduit le temps de traitement des incidents. Elle est autonome, pose les bonnes questions au bon moment, et livre dans les délais. Pour quelqu’un qui cherche un profil technique à la fois rigoureux et orienté utilisateur final, je la recommande."
  }
];
