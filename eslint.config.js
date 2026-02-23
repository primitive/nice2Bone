import babelParser from "@babel/eslint-parser"
import globals from "globals"

const { browser, node } = globals

function cleanGlobals(globalSet) {
  return Object.fromEntries(
    Object.entries(globalSet).filter(([key]) => key.trim() === key)
  );
}

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        ...cleanGlobals(browser),
        ...cleanGlobals(node),
      },
    },
    plugins: {}, // no plugins
    rules: {},   // no rules at all
  },
];
