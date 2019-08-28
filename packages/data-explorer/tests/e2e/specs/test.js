// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const timeOutDelay = 5000
const animationDelay = 300

module.exports = {
  'show table layout and card layout': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(animationDelay)
      .waitForElementVisible('.card-columns', timeOutDelay)
      .click('.table-layout')
      .waitForElementVisible('table.table', timeOutDelay)
      .click('.card-layout')
      .waitForElementVisible('.card-columns', timeOutDelay)
      .end()
  },
  'add and remove items from shoppingcart': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', timeOutDelay)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(animationDelay)
      .waitForElementVisible('.shopping-button', timeOutDelay)
      .click('.shopping-button')
      .click('.show-cart')
      .waitForElementVisible('.cart-order', timeOutDelay)
      .assert.elementNotPresent('.alert.alert-warningn')
      .click('.shopping-button')
      .waitForElementVisible('.alert.alert-warning', timeOutDelay)
      .end()
  },
  'open/close filters sidebar': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', timeOutDelay)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(animationDelay)
      .waitForElementVisible('.btn.hide-filters', timeOutDelay)
      .assert.elementNotPresent('show-filters-button')
      .assert.cssClassNotPresent('.flex-mainview', 'hidefilters')
      .click('.btn.hide-filters')
      .assert.cssClassPresent('.flex-mainview', 'hidefilters')
      .waitForElementVisible('.btn.show-filters-button', timeOutDelay)
      .click('.btn.show-filters-button')
      .assert.elementNotPresent('show-filters-button')
      .assert.cssClassNotPresent('.flex-mainview', 'hidefilters')
      .end()
  },
  'Add and remove filters': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', timeOutDelay)
      .click('.jumbotron .btn.btn-primary.btn-lg')
      .pause(animationDelay)
      .expect.elements('.filter-container .filter-card').count.to.equal(4)
    browser.click('.remove-button')
      .expect.elements('.filter-container .filter-card').count.to.equal(3)
    browser.click('.add-button')
      .assert.elementPresent('#modal-add-filter')
      .click('.btn.btn-primary')
    browser.end()
  }
}
