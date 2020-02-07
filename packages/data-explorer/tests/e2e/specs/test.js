// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const timeOutDelay = 5000
const animationDelay = 300

module.exports = {
  'show table layout and card layout': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', timeOutDelay)
      .waitForElementVisible('.card-deck', timeOutDelay)
      .click('.table-layout')
      .waitForElementVisible('table.table', timeOutDelay)
      .click('.card-layout')
      .waitForElementVisible('.card-deck', timeOutDelay)
      .end()
  },
  'add and remove items from shoppingcart': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', timeOutDelay)
      .waitForElementVisible('.shopping-button', timeOutDelay)
      .click('.shopping-button')
      .click('.show-cart')
      .waitForElementVisible('.cart-order', timeOutDelay)
      .assert.elementNotPresent('.alert.alert-warning')
      .waitForElementVisible('.shopping-button', timeOutDelay)
      .click('.shopping-button')
      .pause(animationDelay)
      .waitForElementVisible('.alert.alert-warning', timeOutDelay)
      .end()
  },
  'should display custom card': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + '#/TableWithCustomCard')
      .waitForElementVisible('#app', timeOutDelay)
      .waitForElementVisible('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > p', timeOutDelay)
      .assert.containsText('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > p', 'The custom card works')
      .end()
  },
  'expand and collapse default card in card layout': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + '#/TableWithMoreColumns')
      .waitForElementVisible('#app', timeOutDelay)
      .assert.visible('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(5)')
      .assert.elementNotPresent('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)')
      .waitForElementVisible('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand', timeOutDelay)
      .click('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand')
      .waitForElementVisible('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)', timeOutDelay)
      .waitForElementVisible('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand', timeOutDelay)
      .click('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand')
      .assert.elementNotPresent('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)')
      .end()
  },
  'open/close filters sidebar': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', timeOutDelay)
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
      .click('.add-button')
      .waitForElementVisible('#modal-add-filter', timeOutDelay)
      .assert.elementPresent('#modal-add-filter')
      .click('.btn.btn-primary')
      .pause(animationDelay)
      .click('.remove-button')
      .pause(animationDelay)
      .assert.elementNotPresent('.remove-button')
      .end()
  }
}
