import alias from '@rollup/plugin-alias'
import analyze from 'rollup-plugin-analyzer'
import replace from '@rollup/plugin-replace'

import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import css from 'rollup-plugin-css-only'

const production = !process.env.ROLLUP_WATCH

const plugins = [
  alias({
    entries: [{ find: '@', replacement: __dirname + '/src/' }],
  }),
  // Filters inline css from vue files
  css({output: 'dist/components-library.css'}),
  vue({css: false, needMap: false }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  resolve({
    extensions: ['.ts', '.vue'],
    browser: true
  }),
  esbuild({
    minify: production,
    sourceMap: false,
    target: 'es2020'
  })
]

if (process.env.ROLLUP_ANALYZE) {
  plugins.push(analyze())
}

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/components-library.esm.js',
    format: 'esm',
    sourcemap: true
  },
  plugins,
  watch: {
    clearScreen: true
  }
};
