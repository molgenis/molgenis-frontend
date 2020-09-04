// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('button.mg-button')
      .assert.elementPresent('button.mg-button')
      .end()
  }
}
