import globals from "globals";
import pluginJs from "@eslint/js";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: {
      "@typescript-eslint": tseslintPlugin,
      prettier: prettierPlugin,
    },
  },
  {
    ...pluginJs.configs.recommended,
  },
  {
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
    },
  },
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-undef": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    ignores: ["node_modules", "dist", "temp", "__tests__"],
  },
];
