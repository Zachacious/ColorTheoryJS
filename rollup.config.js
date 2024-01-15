import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/main.js",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "color-theory-js",
    },
    {
      format: "es",
      // Use a directory instead of a file as it will output multiple
      dir: "dist/esm",
      // Keep a separate file for each module
      preserveModules: true,
      // Optionally strip useless path from source
      preserveModulesRoot: "lib",
    },
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  plugins: [resolve(), commonjs()],
};
