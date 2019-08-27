// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'show table layout and card layout': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(300)
      .waitForElementVisible('.card-columns', 5000)
      .click('.table-layout')
      .waitForElementVisible('table.table', 5000)
      .click('.card-layout')
      .waitForElementVisible('.card-columns', 5000)
      .end()
  },
  'add and remove items from shoppingcart': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(300)
      .waitForElementVisible('.shopping-button', 5000)
      .click('.shopping-button')
      .pause(300)
      .click('.show-cart')
      .waitForElementVisible('.cart-order', 5000)
      .assert.elementNotPresent('.alert.alert-warningn')
      .click('.shopping-button')
      .pause(300)
      .waitForElementVisible('.alert.alert-warning', 5000)
      .end()
  },
  'Add and remove filters': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(300)
      .click('.remove-button')
      .pause(300)
      .click('.remove-button')
      .pause(300)
      .click('.add-button')
      .pause(300)
      .click('.btn.btn-primary')
      .pause(300)
      .click('.add-button')
      .pause(300)
      .click('.btn.btn-primary')
      .end()
  },
  'open/close filters sidebar': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(300)
      .waitForElementVisible('.btn.hide-filters', 5000)
      .assert.elementNotPresent('show-filters-button')
      .assert.cssClassNotPresent(".flex-mainview", "hidefilters")
      .click('.btn.hide-filters')
      .pause(300)
      .assert.cssClassPresent(".flex-mainview", "hidefilters")
      .waitForElementVisible('.btn.show-filters-button', 5000)
      .click('.btn.show-filters-button')
      .pause(300)
      .assert.elementNotPresent('show-filters-button')
      .assert.cssClassNotPresent(".flex-mainview", "hidefilters")
      .end()
  }
}
