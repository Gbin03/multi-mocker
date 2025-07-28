import createMocker, { getSSEMocker, getWSMocker } from "./ws-sse";

function updateProxy(config, wsProxy = {}, sseProxy = {}) {
  if (!config.server) {
    config.server = {};
  }
  if (!config.server.proxy) {
    config.server.proxy = {};
  }
  config.server.proxy = {
    ...wsProxy,
    ...sseProxy,
    ...config.server.proxy,
  };
}

export default function vitePluginWsSse(options = {}) {
  return {
    name: "vite-plugin-wssse",
    apply: "serve",
    async config(config) {
      createMocker(options, config);
      const wsMocker = getWSMocker();
      const sseMocker = getSSEMocker();
      const wsProxy = wsMocker.getProxy();
      const sseProxy = sseMocker.getProxy();
      updateProxy(config, wsProxy, sseProxy);
      await wsMocker.setupWsServer();
      await sseMocker.setupSSEServer();
    },
    configureServer(server) {
      const wsMocker = getWSMocker();
      const sseMocker = getSSEMocker();
      wsMocker.configureServerCb(server);
      sseMocker.configureServerCb(server);
    },

    async closeBundle() {
      const { error } = this;
      const keepAlive = !error;
      const wsMocker = getWSMocker();
      const sseMocker = getSSEMocker();
      wsMocker.onCloseBundle(keepAlive);
      sseMocker.configureServerCb(server);
    },
  };
}
