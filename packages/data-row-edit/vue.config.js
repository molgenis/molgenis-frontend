/* eslint-disable */
const BannerPlugin = require('webpack').BannerPlugin
const pkgVersion = require('./package.json').version
const pkgName = require('./package.json').name

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `package-name: ${pkgName}
package-version: ${pkgVersion}
build-date: ${buildDate}`

const target = 'https://jelmer.gcc.rug.nl'
module.exports = {
  chainWebpack: (config) => {
    config.resolve.symlinks(false) // need this to do yarn link on ui-forms, so linter won't go ballistic
  },
  filenameHashing: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/@molgenis-ui/data-row-edit/dist/'
    : '/',
  'devServer': {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '/login': { target },
      '/api': { target },
      '/@molgenis': { target: 'https://unpkg.com' }
    }
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: false
    }
    config.devtool = 'source-map'
    config.externals = {
      bootstrap: 'bootstrap',
      // '@molgenis/molgenis-ui-form': 'window["molgenis-ui-form"]' // comment this out if you link molgenis forms lib
    }
    config.plugins.push(
      new BannerPlugin({
        banner: bannerText
      })
    )
  }
}
