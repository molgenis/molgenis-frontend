const webpack = require('webpack')
const BannerPlugin = require('webpack').BannerPlugin
const packageJson = require('./package.json')
const pkgVersion = packageJson.version
const pkgName = packageJson.name

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `package-name: ${pkgName}
package-version: ${pkgVersion}
build-date: ${buildDate}`

const PROXY_TARGET = 'https://master.dev.molgenis.org'

let apiDevServerProxyConf = {
  target: PROXY_TARGET,
  keepOrigin: true
}

if (process.env.DATA_EXPLORER_DEV_PW) {
  apiDevServerProxyConf.auth = 'admin:' + process.env.DATA_EXPLORER_DEV_PW
}

module.exports = {
  runtimeCompiler: true,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? pkgName + '/dist/'
    : '/',
  configureWebpack: config => {
    config.plugins.push(
      new BannerPlugin({
        banner: bannerText
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    )
  },
  devServer: {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    // Used to proxy a external API server to have someone to talk to during development
    proxy: process.env.NODE_ENV !== 'development' ? undefined : {
      '^/api': apiDevServerProxyConf,
      '^/fonts': {
        target: PROXY_TARGET,
        keepOrigin: true
      },
      '^/img': {
        target: PROXY_TARGET,
        keepOrigin: true
      },
      '^/app-ui-context': {
        target: PROXY_TARGET,
        keepOrigin: true
      },
      '^/menu/main/dataexplorer/details': {
        target: PROXY_TARGET,
        changeOrigin: true
      },
      '^/css': {
        target: PROXY_TARGET,
        changeOrigin: true
      },
      '^/js': {
        target: PROXY_TARGET,
        changeOrigin: true
      },
      '^/login': {
        target: PROXY_TARGET,
        changeOrigin: true
      },
      '^/@molgenis-ui': {
        target: PROXY_TARGET,
        changeOrigin: true
      }
    },
    // Used as mock in e2e tests
    before: process.env.NODE_ENV !== 'test' ? undefined : function (app) {
      app.get('/app-ui-context', function (req, res) {
        res.json(require('./tests/e2e/resources/uiContext.js'))
      })
      app.get('/api/v2/root_hospital_patients', function (req, res) {
        res.json(require('./tests/e2e/resources/typeTestMetaData.js'))
      })
      app.get('/api/data/TableWithMoreColumns', function (req, res) {
        res.json(require('./tests/e2e/resources/tableWithMoreColumns.js'))
      })
      app.get('/api/data/TableWithCustomCard', function (req, res) {
        res.json(require('./tests/e2e/resources/tableWithMoreColumns.js'))
      })
      app.get('/api/data/TableWithMoreColumns/p000000001_2014_11_11', function (req, res) {
        res.json(require('./tests/e2e/resources/tableWithMoreColumnsExpanded.js'))
      })
      app.get('/api/v2/TableWithCustomCard', function (req, res) {
        res.json(require('./tests/e2e/resources/tableWithMoreColumnsMeta'))
      })
      app.get('/api/v2/TableWithMoreColumns', function (req, res) {
        res.json(require('./tests/e2e/resources/tableWithMoreColumnsMeta'))
      })
      app.get('/api/data/root_hospital_patients', function (req, res) {
        res.json(require('./tests/e2e/resources/typeTestData.js'))
      })
      app.get('/api/v2/root_hospital_diagnosis', function (req, res) {
        res.json(require('./tests/e2e/resources/diagnosisOptions.js'))
      })
      app.get('/api/v2/root_cities', function (req, res) {
        res.json(require('./tests/e2e/resources/cityOptions.js'))
      })
      app.get('/api/v2/root_gender', function (req, res) {
        res.json(require('./tests/e2e/resources/genderOptions.js.js'))
      })
      app.get('/api/v2/it_emx_datatypes_TypeTestRef', function (req, res) {
        res.json(require('./tests/e2e/resources/typeTestMetaData.js'))
      })
      app.get('/api/v2/root_hospital_sample_types', function (req, res) {
        res.json(require('./tests/e2e/resources/typeTestMetaData.js'))
      })
      app.get('/api/data/de_dataexplorer_table_settings', function (req, res) {
        if (req.url.includes('TableWithMoreColumns')) {
          res.json({ items: [] })
        } else if (req.url.includes('TableWithCustomCard')) {
          res.json(require('./tests/e2e/resources/tableSettingsWithCustom'))
        } else {
          res.json(require('./tests/e2e/resources/tableSettings.js'))
        }
      })
    }
  }
}
