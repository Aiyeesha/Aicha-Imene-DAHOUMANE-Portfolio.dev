import coreWebVitals from "eslint-config-next/core-web-vitals";
import reactHooks from "eslint-plugin-react-hooks";

const config = [
  { ignores: ["public/**", ".next/**", "node_modules/**"] },
  ...coreWebVitals,
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      // react-hooks/set-state-in-effect and static-components are new strict rules
      // in eslint-plugin-react-hooks v5 that flag common patterns like hydration guards.
      // Downgraded to warn so they don't block CI.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      // Config files (eslint.config.mjs, postcss.config.mjs) use anonymous exports by convention.
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default config;
