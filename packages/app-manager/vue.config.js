const BannerPlugin = require('webpack').BannerPlugin
const pkgVersion = require('./package.json').version
const pkgName = require('./package.json').name

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `package-name: ${pkgName}
package-version: ${pkgVersion}
build-date: ${buildDate}`

const target = 'https://master.dev.molgenis.org'
module.exports = {
  filenameHashing: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/@molgenis-ui/app-manager/dist/'
    : '/',
  configureWebpack: config => {
    config.devtool = 'source-map'
    config.externals = {
      bootstrap: 'bootstrap'
    }
    config.plugins.push(
      new BannerPlugin({
        banner: bannerText
      })
    )
  },
  devServer: {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '/login': { target },
      '/api': { target },
      '/plugin/appmanager': { target }
    }
  }
}
