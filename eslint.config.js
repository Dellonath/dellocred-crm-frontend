import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  {
    ignores: ["dist"]
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      prettier
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      ...reactHooks.configs["recommended"].rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      "simple-import-sort/imports": "error",
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"]
        }
      ]
    }
  }
);
