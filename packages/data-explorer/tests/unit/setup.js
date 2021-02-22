const VueTestUtils = require('@vue/test-utils')
VueTestUtils.config.mocks.$t = key => key

// Distinguish test-specific code paths.
global.IS_TEST = true
