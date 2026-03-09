// eslint.config.mjs
// ------------------
// ESLint flat config pour Next.js 16.
// eslint-config-next v16 exporte directement un flat config array —
// FlatCompat n'est plus nécessaire et cause une référence circulaire.
//
// Règles assouplies :
//   react-hooks/set-state-in-effect : v5 est trop strict sur les patterns légitimes
//   react-hooks/static-components   : faux positifs sur les composants server-side
//   react/no-unescaped-entities     : du contenu texte existant contient des " légitimes

import nextConfig from "eslint-config-next/core-web-vitals";

// nextConfig[0] contient tous les plugins (react, react-hooks, import, jsx-a11y, @next/next).
// On surcharge ses règles directement pour rester dans le même objet de config
// (ESLint flat config exige que les règles d'un plugin soient dans le même objet
// que la déclaration du plugin — pas dans un objet séparé).
const [baseConfig, ...restConfig] = nextConfig;

const customBase = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // react-hooks v5 : trop strict sur certains patterns légitimes
    "react-hooks/set-state-in-effect": "warn",
    "react-hooks/static-components":   "warn",
    // Contenu JSX existant avec des guillemets ou apostrophes légitimes
    "react/no-unescaped-entities":     "warn",
  },
};

export default [customBase, ...restConfig];
