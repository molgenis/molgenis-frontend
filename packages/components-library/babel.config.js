if (process.env.ROLLUP_BUILD) {
  module.exports = {
    presets: [['@babel/preset-env', { modules: false }]]
  }
} else {
  module.exports = {
    presets: [['@vue/app']]
  }
}
