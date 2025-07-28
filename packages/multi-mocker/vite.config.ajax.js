import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/ajax.js"),
      formats: ["es"],
      fileName: "index",
    },
    outDir: "dist/ajax",
    emptyOutDir: true,
    // minify: false,
    // sourcemap: true,
  },
});
