// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'can create new script': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('.navigator-actions button.btn', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .click('.navigator-actions button.btn') // Click new script

      .waitForElementVisible('#cancel-btn', 5000)
      .assert.visible('input#name') // new script form
      .assert.visible('input#fileExtension')
      .assert.visible('#generateToken')
      .click('#cancel-btn') // Cancel
      .pause(1000) // give the modal time to close.

      .waitForElementVisible('.navigator-actions button.btn', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .click('.navigator-actions button.btn') // Click new script

      .waitForElementVisible('#cancel-btn', 5000)
      .setValue('input#name', 'Hello world')
      .setValue('textarea', 'Hello dearest nightwatch world!')
      .click('#save-btn') // Save

      .waitForElementVisible('.navigator-actions button.btn', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .end()
  },
  'can edit a script': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('button[name="Hello World"].btn.editButton', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .click('button[name="Hello World"].btn.editButton') // Click edit "hello world" script

      .waitForElementVisible('#cancel-btn', 5000)
      .assert.visible('input#fileExtension')
      .assert.visible('#generateToken')
      .click('#cancel-btn') // Cancel
      .pause(1000) // give the modal time to close.

      .waitForElementVisible('button[name="Hello World"].btn.editButton', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .click('button[name="Hello World"].btn.editButton') // Click edit "hello world" script

      .waitForElementVisible('#cancel-btn', 5000)
      .click('.CodeMirror')
      .keys("print('Hallo world')")
      .click('#save-btn') // Save

      .waitForElementVisible('button[name="Hello World"].btn.editButton', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .end()
  },
  'can remove a script': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('button[name="Hello World"].btn.removeButton', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .click('button[name="Hello World"].btn.removeButton') // Click delete "hello world" script
      .waitForElementVisible('#removeScriptModal___BV_modal_footer_', 5000)
      .click('#removeScriptModal___BV_modal_footer_ button.btn-danger') // Click delete button
      .pause(2000) // give the modal time to close.
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .end()
  },
  'can run a script': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('span[name="test2"] button.btn.runButton', 5000)
      .assert.visible('table.b-table.table-hover') // The list of scripts is visible
      .click('span[name="test2"] button.btn.runButton')
      .waitForElementVisible('div.modal-dialog', 5000)
      .setValue('input#x', '3.14159264')
      .setValue('input#y', '42')
      .setValue('input#age', '30')
      .setValue('input#name', 'Jan Modal')
      .click('.modal-footer button.btn.btn-secondary') // Click cancel
      .pause(2000) // give the modal time to close.
      .end()
  }
}
