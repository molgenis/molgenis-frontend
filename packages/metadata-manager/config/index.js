const path = require('path')
const target = 'https://master.dev.molgenis.org'

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/@molgenis-ui/metadata-manager/dist/',
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
      '/login': {
        target,
        changeOrigin: true

      },
      '/api': {
        target,
        changeOrigin: true
      },
      '/plugin/metadata-manager': {
        target,
        changeOrigin: true
      }
    },
    cssSourceMap: false
  }
}
