import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? `https://little-frontend.github.io/${pkg.name}/`
      : "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});