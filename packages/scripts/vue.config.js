// vue.config.js
const schemas = require('./tests/test-schemas.js')

module.exports = {
  filenameHashing: false,
  outputDir: 'dist',
  configureWebpack: {
    devtool: 'source-map',
    externals: {
      'bootstrap': 'bootstrap'
    },
    output: {
      filename: 'js/scripts/[name].js',
      chunkFilename: 'js/scripts/[name].js'
    }
  },
  css: {
    extract: {
      filename: 'css/scripts/[name].css',
      chunkFilename: 'css/scripts/[name].css'
    }
  },
  'devServer': {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/api': {
        'target': 'http://localhost:8080'
      },
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
    }
  }
}
