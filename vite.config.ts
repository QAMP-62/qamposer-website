import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Use '/qamposer-website/' for GitHub Pages, '/' for custom domain
  base: "/",
  resolve: {
    alias: {
      // Fix for plotly.js
      "plotly.js-basic-dist-min":
        "plotly.js-basic-dist-min/plotly-basic.min.js",
    },
  },
});
