import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      // Fix for plotly.js
      'plotly.js-basic-dist-min': 'plotly.js-basic-dist-min/plotly-basic.min.js',
    },
  },
});
