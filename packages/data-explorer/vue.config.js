module.exports = {
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
