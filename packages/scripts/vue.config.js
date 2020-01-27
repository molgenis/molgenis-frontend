// vue.config.js
const schemas = require('./tests/test-schemas.js')
const BannerPlugin = require('webpack').BannerPlugin
const pkgVersion = require('./package.json').version
const pkgName = require('./package.json').name

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `package-name: ${pkgName}
package-version: ${pkgVersion}
build-date: ${buildDate}`

module.exports = {
  filenameHashing: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/@molgenis-ui/scripts/dist/'
    : '/',
  configureWebpack: config => {
    config.devtool = 'source-map'
    config.externals = {
      'bootstrap': 'bootstrap'
    }
    config.plugins.push(
      new BannerPlugin({
        banner: bannerText
      })
    )
  },
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    }
  },
  'devServer': {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/scripts': {
        'target': 'http://localhost:8080'
      },
      '^/js': {
        'target': 'http://localhost:8080'
      },
      '^/css': {
        'target': 'http://localhost:8080'
      },
      '^/menu': {
        'target': 'http://localhost:8080'
      }
    },
    before: function (app, server) {
      app.get('/api/v2/sys_scr_Script', function (req, res) {
        res.json(schemas.Script)
      })
      app.get('/api/v2/sys_scr_ScriptType', function (req, res) {
        res.json(schemas.ScriptType)
      })
      app.get('/api/v2/sys_scr_ScriptParameter', function (req, res) {
        res.json(schemas.ScriptParameter)
      })
      app.put('/api/v2/sys_scr_Script', function (req, res) { // edit script
        res.json(schemas.Created)
      })
      app.post('/api/v2/sys_scr_Script', function (req, res) { // New script
        res.json(schemas.Created)
      })
      app.post('/api/v2/sys_scr_ScriptParameter', function (req, res) {
        res.json(schemas.Created)
      })
      app.post('/api/v2/i18n/scripts/en', function (req, res) {
        res.json(schemas.i18n)
      })
      app.post('/api/v2/i18n/scripts', function (req, res) {
        res.json(schemas.i18n)
      })
    }
  }
}
