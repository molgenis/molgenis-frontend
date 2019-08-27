// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 50000)
      .assert.containsText('h2', 'Filters')
      .end()
  },
  'open/close filters': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 50000)
      .assert.con
      .click('.btn .hide-filters')
      .end()
  }
}
