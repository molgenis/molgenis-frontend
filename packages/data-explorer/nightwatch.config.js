var packageJson = require('./package.json')

const buildName = packageJson.name + '#PR-' + process.env.CHANGE_ID + '-build-' + process.env.BUILD_NUMBER

module.exports = {
  selenium: {
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {

    ci_chrome: {
      selenium_port: 80,
      selenium_host: 'ondemand.us-west-1.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_CRED_USR,
      access_key: process.env.SAUCE_CRED_PSW,
      selenium: {
        start_process: false
      },
      desiredCapabilities: {
        name: packageJson.name,
        build: buildName,
        'tunnel-identifier': process.env.TUNNEL_IDENTIFIER,
        browserName: 'chrome'
      }
    },
    ci_firefox: {
      selenium_port: 80,
      selenium_host: 'ondemand.us-west-1.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_CRED_USR,
      access_key: process.env.SAUCE_CRED_PSW,
      selenium: {
        start_process: false
      },
      desiredCapabilities: {
        name: packageJson.name,
        build: buildName,
        'tunnel-identifier': process.env.TUNNEL_IDENTIFIER,
        browserName: 'firefox'
      }
    },
    ci_ie11: {
      selenium_port: 80,
      selenium_host: 'ondemand.us-west-1.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_CRED_USR,
      access_key: process.env.SAUCE_CRED_PSW,
      selenium: {
        start_process: false
      },
      desiredCapabilities: {
        name: packageJson.name,
        build: buildName,
        'tunnel-identifier': process.env.TUNNEL_IDENTIFIER,
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11.103'
      }
    },
    ci_safari: {
      selenium_port: 80,
      selenium_host: 'ondemand.us-west-1.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_CRED_USR,
      access_key: process.env.SAUCE_CRED_PSW,
      selenium: {
        start_process: false
      },
      desiredCapabilities: {
        name: packageJson.name,
        build: buildName,
        'tunnel-identifier': process.env.TUNNEL_IDENTIFIER,
        browserName: 'safari'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        marionette: true
      },
      selenium: {
        cli_args: {
          'webdriver.firefox.driver': require('geckodriver').path
        }
      }
    },
    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
