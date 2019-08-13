const BannerPlugin = require('webpack').BannerPlugin
const pkgVersion = require('./package.json').version
const pkgName = require('./package.json').name

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `package-name: ${pkgName}
package-version: ${pkgVersion}
build-date: ${buildDate}`

// vue.config.js
module.exports = {
  filenameHashing: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/@molgenis-ui/context/dist/'
    : '/',
  configureWebpack: config => {
    config.plugins.push(
      new BannerPlugin({
        banner: bannerText
      })
    )

    config.externals = {
      'jquery': 'jQuery',
      'bootstrap': 'bootstrap',
      'popper.js': 'popper.js'
    }
  }
}
