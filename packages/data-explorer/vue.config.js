const schemas = require('./tests/test-schemas.js')
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

module.exports = {
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
      '^/api': {
        'target': PROXY_TARGET,
        'keepOrigin': true
      },
      '^/fonts': {
        'target': PROXY_TARGET,
        'keepOrigin': true
      },
      '^/img': {
        'target': PROXY_TARGET,
        'keepOrigin': true
      },
      '^/app-ui-context': {
        'target': PROXY_TARGET,
        'keepOrigin': true
      },
      '^/menu/main/dataexplorer/details': {
        'target': PROXY_TARGET,
        'changeOrigin': true
      },
      '^/css': {
        'target': PROXY_TARGET,
        'changeOrigin': true
      },
      '^/js': {
        'target': PROXY_TARGET,
        'changeOrigin': true
      },
      '^/@molgenis-ui': {
        'target': PROXY_TARGET,
        'changeOrigin': true
      }
    },
    // Used as mock in e2e tests
    before: process.env.NODE_ENV !== 'test' ? undefined : function (app) {
      app.get('/app-ui-context', function (req, res) {
        res.json(schemas.UIContext)
      })
      app.get('/api/v2/it_emx_datatypes_TypeTest', function (req, res) {
        res.json(schemas.MetaData)
      })
      app.get('/api/data/it_emx_datatypes_TypeTest', function (req, res) {
        res.json(schemas.TableData)
      })
      app.get('/api/data/de_dataexplorer_table_settings', function (req, res) {
        res.json(schemas.TableSettings)
      })
    }
  }
}
