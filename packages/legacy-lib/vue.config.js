const CopyPlugin = require('copy-webpack-plugin')

// vue.config.js
module.exports = {
  filenameHashing: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/@molgenis-ui/legacy-lib/dist/'
    : '/',
  configureWebpack: config => {
    config.plugins.push(
      new CopyPlugin([
        { from: 'node_modules/@molgenis/molgenis-ui-context/dist/context.umd.min.js' },
        { from: 'node_modules/@molgenis/molgenis-ui-context/dist/context.umd.min.js.map' },
        { from: 'node_modules/@molgenis/molgenis-ui-context/dist/context.css' },
        { from: 'node_modules/requirejs/require.js' },
        { from: 'node_modules/vue/dist/vue.min.js' },
        { from: 'node_modules/jquery/dist/jquery.slim.min.js' },
        { from: 'node_modules/jquery/dist/jquery.slim.min.map' },
        { from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js' },
        { from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map' }
      ])
    )
  }
}
