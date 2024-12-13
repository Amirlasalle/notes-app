// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolving __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create FlatCompat instance
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define the ESLint configuration
const eslintConfig = [
  // Extending Next.js core and typescript rules
  ...compat.config({
    extends: [
      "next/core-web-vitals", // Core web vitals rules for Next.js
      "next/typescript", // TypeScript rules for Next.js
    ],
    rules: {
      'react/no-unescaped-entities': 'off', // Disable specific rule
      '@next/next/no-page-custom-font': 'off', // Disable specific rule
    },
  }),
];

export default eslintConfig;
