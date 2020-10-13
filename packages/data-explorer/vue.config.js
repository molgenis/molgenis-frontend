const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const BannerPlugin = require('webpack').BannerPlugin
const path = require('path')
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
  publicPath: process.env.NODE_ENV === 'production' ? pkgName + '/dist/' : '/',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack: config => {
    config.plugin('html')
    .tap(args => {
      args[0].template = path.join(__dirname, 'src', 'index.html')
      return args
    })
  },
  configureWebpack: config => {
    // config.externals = ['Vue']
    console.log(config.plugins)

    // Disable type checking service
    config.plugins = config.plugins.filter((p) => !(p instanceof ForkTsCheckerWebpackPlugin))
    config.plugins.push(
      new BannerPlugin({
        banner: bannerText
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
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
      },
      '^/plugin': {
        target: PROXY_TARGET,
        changeOrigin: true
      }
    },
    // Used as mock in e2e tests
    before: process.env.NODE_ENV !== 'test' ? undefined : function (app) {
      app.get('/app-ui-context', function (req, res) {
        res.json(require('./tests/e2e/resources/uiContext.js'))
      })
      app.get('/api/metadata/root_hospital_diagnosis', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/metadata_root_hospital_diagnosis.js'))
      })
      app.get('/api/metadata/root_hospital_lab_results', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/metadata_root_hospital_lab_results.js'))
      })
      app.get('/api/metadata/root_cities', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/metadata_root_cities.js'))
      })
      app.get('/api/metadata/root_gender', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/metadata_root_gender.js'))
      })
      app.get('/api/metadata/root_hospital_users', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/metadata_root_hospital_users.js'))
      })
      app.get('/api/metadata/root_hospital_patients', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/metadata_root_hospital_patients_flat.js'))
      })
      app.get('/api/metadata/TableWithCustomCard', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/metadata_root_hospital_patients_flat.js'))
      })
      app.get('/api/data/root_hospital_patients/p000000001', function (req, res) {
        res.json(require('./tests/e2e/resources/v3/data_p00001'))
      })

      app.get('/api/data/root_hospital_patients', function (req, res) {
        res.json(require('./tests/e2e/resources/typeTestData.js'))
      })
      app.get('/api/data/sys_ts_DataExplorerEntitySettings', function (req, res) {
        if (req.url.includes('TableWithMoreColumns')) {
          res.json({ items: [] })
        } else if (req.url.includes('TableWithCustomCard')) {
          res.json(require('./tests/e2e/resources/tableSettingsWithCustom'))
        } else {
          res.json(require('./tests/e2e/resources/tableSettings.js'))
        }
      })
      app.get('/api/data/TableWithCustomCard', function (req, res) {
        res.json(require('./tests/e2e/resources/tableWithMoreColumns.js'))
      })
    }
  }
}
