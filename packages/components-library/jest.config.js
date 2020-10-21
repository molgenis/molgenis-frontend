// Force use of modules in Babel when running tests
// with an external tool like vscode-jest.
process.env.VUE_CLI_BABEL_TARGET_NODE = true
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true
process.env.BOOTSTRAP_VUE_NO_WARN = true
process.env.TZ = 'GMT'

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/lib'],
  collectCoverage: true
}
