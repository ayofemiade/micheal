import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Workspace and tooling directories:
    "coverage/**",
    ".agent/**",
    ".claude/**",
    ".agents/**",
    "archive/**",
    "docs/**",
    "qa-shots/**",
    "potrait/**",
    "website gallery/**",
  ]),
]);

export default eslintConfig;
