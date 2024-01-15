// import pkg from './package.json' assert { type: 'json' };
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import packageJson from './package.json' assert { type: 'json' };

const commonName = packageJson.main.replace(/\.js$/, '');
// const browserName = packageJson.browser.replace(/\.js$/, '.min.js');

// const name = require('./package.json').main.replace(/\.js$/, '');

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `${commonName}.js`,
        format: 'umd',
        name: 'color-lib',
      },
      {
        file: `${commonName}.cjs`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        format: 'es',
        // Use a directory instead of a file as it will output multiple
        dir: 'dist/esm',
        // Keep a separate file for each module
        preserveModules: true,
        // Optionally strip useless path from source
        preserveModulesRoot: 'lib',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${commonName}.d.ts`,
      format: 'es',
    },
  }),
];
