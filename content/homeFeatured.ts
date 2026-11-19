// content/homeFeatured.ts
// -----------------------
// The three projects shown on the home page for each track, in order, each
// with one quantified result line. Fewer cards, each with a number, convince
// a recruiter faster than six; every other project stays on /projects.
//
// Every figure below comes from the project's own published content
// (content/projectHighlights.ts, content/projects/<slug>): never add a number
// that the project page does not show. Checked by
// __tests__/home-featured.test.ts (slugs exist, are published and featured,
// three per track, a result line in every locale).

export type HomeTrack = "salesforce" | "itops";
export type HomeFeaturedEntry = {
  slug: string;
  /** One-line, quantified result shown on the card. */
  result: { fr: string; en: string; es: string };
};

// Legarant-AXG is the Salesforce ⇄ infrastructure bridge project: it comes
// first on both tracks.
const LEGARANT: HomeFeaturedEntry = {
  slug: "legarant-axg-salesforce-deployment",
  result: {
    fr: "Apex REST + application Heroku, 2 environnements isolés reliés par une pipeline",
    en: "Apex REST + Heroku app, 2 isolated environments linked by a pipeline",
    es: "Apex REST + aplicación Heroku, 2 entornos aislados unidos por un pipeline",
  },
};

export const HOME_FEATURED: Record<HomeTrack, HomeFeaturedEntry[]> = {
  salesforce: [
    LEGARANT,
    {
      slug: "idemconnect-apex-backend",
      result: {
        fr: "23 tests unitaires, 100 % de réussite, 90 % de couverture",
        en: "23 unit tests, 100% passing, 90% coverage",
        es: "23 pruebas unitarias, 100 % superadas, 90 % de cobertura",
      },
    },
    {
      slug: "ltp-apex-backend-prototype",
      result: {
        fr: "500 000 lignes/heure en Bulk API v2, import de 2,1 M de comptes",
        en: "500,000 rows/hour with Bulk API v2, import of 2.1M accounts",
        es: "500 000 filas/hora con Bulk API v2, importación de 2,1 M de cuentas",
      },
    },
  ],
  itops: [
    LEGARANT,
    {
      slug: "workstation-mass-deployment",
      result: {
        fr: "264 postes Dell : 64 réimagés (Sysprep), 200 enrôlés via Windows Autopilot",
        en: "264 Dell devices: 64 re-imaged (Sysprep), 200 enrolled through Windows Autopilot",
        es: "264 equipos Dell: 64 reinstalados (Sysprep), 200 inscritos mediante Windows Autopilot",
      },
    },
    {
      slug: "it-ops-rmm-supervision",
      result: {
        fr: "Plus de 550 appareils clients supervisés au quotidien",
        en: "550+ client devices monitored daily",
        es: "Más de 550 equipos de clientes supervisados a diario",
      },
    },
  ],
};
