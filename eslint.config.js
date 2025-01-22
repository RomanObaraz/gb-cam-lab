import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import preferArrow from "eslint-plugin-prefer-arrow";
import importPlugin from "eslint-plugin-import";

export default [
    { ignores: ["dist"] },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        settings: { react: { version: "18.3" } },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "prefer-arrow": preferArrow,
            import: importPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,

            "react/jsx-no-target-blank": "off",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "react/prop-types": "off",

            "prefer-arrow/prefer-arrow-functions": [
                "error",
                {
                    classPropertiesAllowed: false,
                    disallowPrototype: true,
                    singleReturnOnly: false,
                },
            ],
            "prefer-arrow-callback": "error",

            "import/order": [
                "error",
                {
                    groups: [["builtin", "external"], ["internal"], ["sibling", "parent"]],
                    "newlines-between": "always",
                },
            ],
        },
    },
];
