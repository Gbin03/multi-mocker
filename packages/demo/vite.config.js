import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginWsSse from "multi-mocker/vite-plugin-wssse";

export default defineConfig({
  base: "./",
  server: {
    open: true,
    sourcemap: true,
    proxy: {
      "/test-api": {
        target: "http://172.31.192.111:31443/",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [
    vue(),
    vitePluginWsSse({
      ws: {
        useMock: true,
        config: {
          proxy: {
            "/ws-test/api/mock-request-01": {
              target: "ws://localhost:3008",
              ws: true,
              secure: false,
              changeOrigin: true,
            },
          },
          serverPath: "./mock/ws-server.cjs",
        },
      },
      sse: {
        useMock: true,
        config: {
          proxy: {
            "/sse-test/api/mock-request-chat": {
              target: "http://localhost:3005",
              changeOrigin: true,
              secure: false,
            },
          },
          serverPath: "./mock/sse-server.cjs",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
