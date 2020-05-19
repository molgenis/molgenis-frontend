// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const timeOutDelay = 5000
const animationDelay = 300

module.exports = {
  'show table layout and card layout': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('.card-deck', timeOutDelay)
      .click('.table-layout')
      .waitForElementPresent('table.table', timeOutDelay)
      .click('.card-layout')
      .waitForElementPresent('.card-deck', timeOutDelay)
      .end()
  },
  'add and remove items from shoppingcart': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('.shopping-button', timeOutDelay)
      .click('.shopping-button')
      .click('.show-cart')
      .waitForElementPresent('.cart-order', timeOutDelay)
      .assert.elementNotPresent('.alert.alert-warning')
      .waitForElementPresent('.shopping-button', timeOutDelay)
      .click('.shopping-button')
      .pause(animationDelay)
      .waitForElementPresent('.alert.alert-warning', timeOutDelay)
      .end()
  },
  'should display custom card': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + '#/TableWithCustomCard')
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > p', timeOutDelay)
      .assert.containsText('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > p', 'The custom card works')
      .end()
  },
  'expand and collapse default card in card layout': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(4)', timeOutDelay)
      .assert.visible('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(4)')
      .assert.elementNotPresent('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)')
      .waitForElementPresent('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand', timeOutDelay)
      .click('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand')
      .waitForElementPresent('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)', timeOutDelay)
      .waitForElementPresent('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand', timeOutDelay)
      .click('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand')
      .assert.elementNotPresent('#app div.mt-3.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)')
      .end()
  },
  'open/close filters sidebar': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('.btn.hide-filters', timeOutDelay)
      .assert.elementNotPresent('show-filters-button')
      .assert.cssClassNotPresent('.flex-mainview', 'hidefilters')
      .click('.btn.hide-filters')
      .assert.cssClassPresent('.flex-mainview', 'hidefilters')
      .waitForElementPresent('.btn.show-filters-button', timeOutDelay)
      .click('.btn.show-filters-button')
      .assert.elementNotPresent('show-filters-button')
      .assert.cssClassNotPresent('.flex-mainview', 'hidefilters')
      .end()
  },
  'Add and remove filters': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('.dropdown-toggle.dropdown-toggle-no-caret', timeOutDelay)
      .click('.dropdown-toggle.dropdown-toggle-no-caret')
      .waitForElementPresent('.dropdown-menu', timeOutDelay)
      .assert.elementCount('.filter-card', 0)
      .click('.custom-control.custom-checkbox:nth-child(1) label')
      .assert.elementCount('.filter-card', 1)
      .click('.custom-control.custom-checkbox:nth-child(1) label')
      .assert.elementCount('.filter-card', 0)
      .end()
  }
}
