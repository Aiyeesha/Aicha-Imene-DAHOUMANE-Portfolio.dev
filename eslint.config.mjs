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

// restConfig peut contenir des configs qui surchargent nos règles (flat config : dernier gagne).
// On patch chaque config de restConfig qui déclare react-hooks ou react pour ré-appliquer
// nos assouplissements dans le même objet (ESLint flat config exige plugin + règles dans le même objet).
const patchedRestConfig = restConfig.map((cfg) => {
  const hasReactHooks = cfg.plugins?.["react-hooks"];
  const hasReact      = cfg.plugins?.["react"];
  if (!hasReactHooks && !hasReact) return cfg;

  const ruleOverrides = {};
  if (hasReactHooks) {
    ruleOverrides["react-hooks/set-state-in-effect"] = "warn";
    ruleOverrides["react-hooks/static-components"]   = "warn";
  }
  if (hasReact) {
    ruleOverrides["react/no-unescaped-entities"] = "warn";
  }
  return { ...cfg, rules: { ...cfg.rules, ...ruleOverrides } };
});

const flatConfig = [customBase, ...patchedRestConfig];

export default flatConfig;
