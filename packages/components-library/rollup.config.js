import analyze from 'rollup-plugin-analyzer'
import babel from 'rollup-plugin-babel'
import replace from '@rollup/plugin-replace'

import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import css from 'rollup-plugin-css-only'

process.env.ROLLUP_BUILD=1

const plugins = [
  // Filters inline css from vue files
  css({ output: 'dist/components-library.css' }),
  vue({ css: false, needMap: false }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  resolve({
    extensions: ['.ts', '.vue'],
    browser: true
  }),
  esbuild({
    minify: true,
    sourceMap: true,
    target: 'es2020'
  })
]

if (process.env.ROLLUP_ANALYZE) {
  plugins.push(analyze())
}

export default [
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/components-library.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/components-library.common.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [...plugins, babel({
      extensions: ['.js', '.vue', '.ts'],
      runtimeHelpers: true,
      sourceMap: true
    })]
  }
]
