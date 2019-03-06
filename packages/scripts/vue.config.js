// vue.config.js
module.exports = {
  filenameHashing: false,
  configureWebpack: config => {
    config.externals = {
      'bootstrap': 'bootstrap'
    }
  },
  "devServer": {
    "proxy": {
      "^/api": {
        "target": "http://localhost:8080"
      },
      "^/scripts": {
        "target": "http://localhost:8080"
      },
      "^/js": {
        "target": "http://localhost:8080"
      },
      "^/css": {
        "target": "http://localhost:8080"
      },
      "^/menu": {
        "target": "http://localhost:8080"
      }
    }
  }
}
