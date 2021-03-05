// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const timeOutDelay = 5000
const animationDelay = 300

const patientsLocation = `${process.env.VUE_DEV_SERVER_URL}#/root_hospital_patients`

module.exports = {
  'show table layout and card layout': browser => {
    browser
      .url(patientsLocation)
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
      .url(patientsLocation)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('.shopping-button', timeOutDelay)
      .click('.shopping-button')
      .waitForElementPresent('.toast-body .btn-secondary', timeOutDelay)
      .click('.toast-body .btn-secondary')
      .waitForElementPresent('.cart-order', timeOutDelay)
      .assert.elementNotPresent('.alert.alert-warning')
      .waitForElementPresent('.shopping-button', timeOutDelay)
      .click('.shopping-button')
      .waitForElementPresent('.alert.alert-warning', (timeOutDelay * 2))
      .end()
  },
  'should display custom card': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + '#/TableWithCustomCard')
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('div.entity-table', timeOutDelay)
      .pause(10)
      .waitForElementPresent('#app div.entity-table > div > div:nth-child(1) > div > div > div > p', timeOutDelay)
      .assert.containsText('#app div.entity-table > div > div:nth-child(1) > div > div > div > p', 'The custom card works')
      .end()
  },
  'expand and collapse default card in card layout': browser => {
    browser
      .url(patientsLocation)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('#app div.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(4)', timeOutDelay)
      .assert.visible('#app div.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(4)')
      .assert.elementNotPresent('#app div.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)')
      .waitForElementPresent('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand', timeOutDelay)
      .click('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand')
      .waitForElementPresent('#app div.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)', timeOutDelay)
      .waitForElementPresent('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand', timeOutDelay)
      .click('#app button.btn.btn-outline-info.btn-sm.mr-1.mg-card-expand')
      .assert.elementNotPresent('#app div.entity-table > div > div:nth-child(1) > div > div > div > div:nth-child(7)')
      .end()
  },
  'open/close filters sidebar': browser => {
    browser
      .url(patientsLocation)
      .waitForElementPresent('#app', timeOutDelay)
      .waitForElementPresent('.btn.hide-filters', timeOutDelay)
      .assert.elementNotPresent('show-filters-button')
      .assert.cssClassNotPresent('.mg-content', 'hidefilters')
      .click('.btn.hide-filters')
      .assert.cssClassPresent('.mg-content', 'hidefilters')
      .waitForElementPresent('.btn.show-filters-button', timeOutDelay)
      .click('.btn.show-filters-button')
      .waitForElementPresent('.btn.hide-filters', timeOutDelay)
      .assert.elementNotPresent('show-filters-button')
      .end()
  }
}
