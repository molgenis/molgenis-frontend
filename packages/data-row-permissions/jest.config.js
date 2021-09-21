module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!@molgenis/molgenis-api-client|@molgenis/molgenis-vue-test-utils)']
}
