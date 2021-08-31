const PROXY_TARGET = "https://master.dev.molgenis.org";

const apiDevServerProxyConf = {
  target: PROXY_TARGET,
  keepOrigin: true,
};

module.exports = {
  transpileDependencies: ["@molgenis-ui/components-library"],
  devServer: {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || "localhost",
    // Used to proxy a external API server to have someone to talk to during development
    proxy:
      process.env.NODE_ENV !== "development"
        ? {
            "^/@molgenis": {
              target: "https://unpkg.com",
              changeOrigin: true,
            },
          }
        : {
            "^/api": apiDevServerProxyConf,
            "^/theme": {
              target: PROXY_TARGET,
              keepOrigin: true,
            },
            "^/files": {
              target: PROXY_TARGET,
              keepOrigin: true,
            },
            "^/fonts": {
              target: PROXY_TARGET,
              keepOrigin: true,
            },
            "^/img": {
              target: PROXY_TARGET,
              keepOrigin: true,
            },
            "^/app-ui-context": {
              target: PROXY_TARGET,
              keepOrigin: true,
            },
            "^/css": {
              target: PROXY_TARGET,
              changeOrigin: true,
            },
            "^/js": {
              target: PROXY_TARGET,
              changeOrigin: true,
            },
            "^/login": {
              target: PROXY_TARGET,
              changeOrigin: true,
            },
            "^/@molgenis(-ui)?": {
              target: "https://unpkg.com",
              changeOrigin: true,
            },
            "^/plugin": {
              target: PROXY_TARGET,
              changeOrigin: true,
            },
          },
  },
};
