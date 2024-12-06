import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: "dist",
  // },

  build: {
    outDir: "dist", // set the build output directory
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"), // set the input path to index.html
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"), // add a new alias to create a shortcut to @styles folder
    },
  },
});
