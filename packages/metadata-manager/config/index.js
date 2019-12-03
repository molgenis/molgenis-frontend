var path = require('path')

const config = require('rc')('metadata-manager', {
  development: {
    changeOrigin: true,
    proxy: 'http://localhost:8080'
  }
})

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
        changeOrigin: config.development.changeOrigin,
        target: config.development.proxy
      },
      '/api': {
        changeOrigin: config.development.changeOrigin,
        target: config.development.proxy
      },
      '/plugin/metadata-manager': {
        changeOrigin: config.development.changeOrigin,
        target: config.development.proxy
      }
    },
    cssSourceMap: false
  }
}
