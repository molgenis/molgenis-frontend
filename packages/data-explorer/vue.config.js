const webpack = require('webpack')
const BannerPlugin = require('webpack').BannerPlugin
const pkgVersion = packageJson.version
const pkgName = packageJson.name

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `package-name: ${pkgName}
package-version: ${pkgVersion}
build-date: ${buildDate}`

module.exports = {
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
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/api': {
        'target': 'https://preview-pr-8588-2.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/css': {
        'target': 'https://preview-pr-8588-2.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/fonts': {
        'target': 'https://preview-pr-8588-2.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/img': {
        'target': 'https://preview-pr-8588-2.dev.molgenis.org',
        'keepOrigin': true
      },
      '^/app-ui-context': {
        'target': 'https://preview-pr-8588-2.dev.molgenis.org',
        'keepOrigin': true
      }
    }
  }
}
