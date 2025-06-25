// Cambiar a CommonJS para compatibilidad con Node y ESLint 9
const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "config/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    ignores: [
      "public/",
      "node_modules/",
      "static/",
      ".cache/",
      "gatsby-*.js",
      "*.config.js",
      "*.d.ts"
    ]
  }
];
