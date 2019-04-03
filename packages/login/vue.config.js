// vue.config.js
module.exports = {
  filenameHashing: false,
  outputDir: 'dist',
  configureWebpack: {
    devtool: 'source-map',
    externals: {
      'bootstrap': 'bootstrap'
    },
    output: {
      filename: 'js/login/[name].js',
      chunkFilename: 'js/login/[name].js'
    }
  },
  css: {
    extract: {
      filename: 'css/login/[name].css',
      chunkFilename: 'css/login/[name].css'
    }
  },
  'devServer': {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/api': {
        'target': 'http://localhost:8080'
      },
      '^/js': {
        'target': 'http://localhost:8080'
      },
      '^/css': {
        'target': 'http://localhost:8080'
      },
      '^/fonts': {
        'target': 'http://localhost:8080'
      },
      '^/login': {
        'target': 'http://localhost:8080'
      },
      '^/account': {
        'target': 'http://localhost:8080'
      }
    },
    before: function (app, server) {

    }
  }
}
