module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    globalThis: true
  },
  ignorePatterns: [],
  overrides: [
    {
      files: [ '**/*.ts' ],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
      }
    },
    {
      parser: 'vue-eslint-parser',
      files: [ '**/*.vue' ],
      extends: [
        'plugin:vue/recommended'
      ],
      rules: {
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/max-attributes-per-line': [ 'error', {
          singleline: 3,
          multiline: {
            max: 2,
            allowFirstLine: false
          }
        } ]
      }
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      modules: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  root: true,
  rules: {
    'array-bracket-spacing': [ 2, 'always' ],
    'eol-last': [ 2, 'always' ],
    indent: [ 'error', 2 ],
    'object-curly-spacing': [ 2, 'always' ],
    'no-console': [ 2 ],
    'no-multiple-empty-lines': [ 2, { max: 2, maxBOF: 0, maxEOF: 1 } ]
  },

}
