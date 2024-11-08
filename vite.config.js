// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/main.scss";`,
      },
    },
  },
  build: {
    // rollupOptions: {
    //   input: {
    //     main: path.resolve(__dirname, "src/styles/main.scss"),
    //   },
    //   output: {
    //     assetFileNames: "bundle.css", // Ger en slutlig CSS-fil
    //   },
    // },
  },
});
