import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json' assert { type: 'json' };
const prettier = require('rollup-plugin-prettier');
import typescript from '@rollup/plugin-typescript';

// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'color-theory-js',
    },
    {
      format: 'es',
      // Use a directory instead of a file as it will output multiple
      dir: 'dist/esm',
      // Keep a separate file for each module
      preserveModules: true,
      // Optionally strip useless path from source
      preserveModulesRoot: 'lib',
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  plugins: [
    typescript(),
    // eslint({}),
    nodeResolve(),
    commonjs(),
    prettier({
      tabWidth: 2,
      singleQuote: false,
    }),
  ],
};
