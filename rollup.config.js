// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import path from 'path';

const packageJson = require('./package.json');

export default {
  input: 'src/js/RevealIt.js', 
  output: [
    {
      file: packageJson.main, 
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module, 
      format: 'es',
      sourcemap: true
    },
    {
      name: 'RevealIt',
      file: 'dist/reveal-it.umd.js', 
      format: 'umd',
      globals: {
        gsap: 'GSAP'
      },
      sourcemap: true
    }
  ],
  external: ['gsap'],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    terser() 
  ]
};
