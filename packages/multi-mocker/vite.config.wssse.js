import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/vite-plugin-wssse.js"),
      formats: ["es"],
    },
    outDir: "dist/vite-plugin-wssse",
    emptyOutDir: true,
    // minify: false,
    // sourcemap: true,
    rollupOptions: {
      external: [
        "path",
        "fs",
        "child_process",
        "node:path",
        "node:fs",
        "node:fs/promises",
        "vite",
      ],
      output: {
        entryFileNames: `index.js`,
        format: "es",
      },
    },
  },
  resolve: {
    conditions: ["node"],
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
});
