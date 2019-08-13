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
        { from: 'node_modules/@molgenis/molgenis-ui-context/dist/context.umd.min.js', to: '' },
        { from: 'node_modules/@molgenis/molgenis-ui-context/dist/context.umd.min.js.map', to: '' },
        { from: 'node_modules/@molgenis/molgenis-ui-context/dist/context.css', to: '' },
      ])
    )
  }
}
