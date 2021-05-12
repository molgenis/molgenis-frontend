const path = require('path')
const target = 'https://master.dev.molgenis.org'

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/@molgenis-ui/one-click-importer/dist/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/plugin/one-click-importer/upload': {
        target,
        changeOrigin: true
      },
      '/api': {
        target,
        changeOrigin: true
      },
      '/login': {
        target,
        changeOrigin: true
      }
    },
    cssSourceMap: false
  }
}
