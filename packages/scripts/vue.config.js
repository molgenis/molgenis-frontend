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
      filename: 'js/scripts/[name].js',
      chunkFilename: 'js/scripts/[name].js'
    }
  },
  css: {
    extract: {
      filename: 'css/scripts/[name].css',
      chunkFilename: 'css/scripts/[name].css'
    }
  },
  'devServer': {
    'proxy': {
      '^/api': {
        'target': 'http://localhost:8080'
      },
      '^/scripts': {
        'target': 'http://localhost:8080'
      },
      '^/js': {
        'target': 'http://localhost:8080'
      },
      '^/css': {
        'target': 'http://localhost:8080'
      },
      '^/menu': {
        'target': 'http://localhost:8080'
      }
    }
  }
}
