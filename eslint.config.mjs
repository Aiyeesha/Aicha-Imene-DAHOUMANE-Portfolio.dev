// eslint.config.mjs
// ------------------
// ESLint flat config for Next.js 16. eslint-config-next v16 exports a flat
// config array directly (FlatCompat is no longer needed and causes a circular
// reference).
//
// Relaxed rules:
//   react-hooks/set-state-in-effect : v5 is too strict on legitimate patterns
//   react-hooks/static-components   : false positives on server components
//   react/no-unescaped-entities     : existing text content has legitimate quotes

import nextConfig from "eslint-config-next/core-web-vitals";

// nextConfig[0] holds every plugin (react, react-hooks, import, jsx-a11y,
// @next/next). Its rules are overridden in place: flat config requires a
// plugin's rules in the same object as the plugin declaration.
const [baseConfig, ...restConfig] = nextConfig;

const customBase = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // react-hooks v5: too strict on some legitimate patterns
    "react-hooks/set-state-in-effect": "warn",
    "react-hooks/static-components":   "warn",
    // Existing JSX content with legitimate quotes or apostrophes
    "react/no-unescaped-entities":     "warn",
  },
};

// restConfig may override our rules (in flat config the last one wins): each
// config declaring react-hooks or react gets our relaxations re-applied in the
// same object.
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
