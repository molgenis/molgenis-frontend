const target = 'https://master.dev.molgenis.org'
module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/@molgenis-ui/app-manager/dist/'
    : '/',
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
