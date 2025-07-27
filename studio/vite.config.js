import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      // Disable PostCSS for studio to avoid conflicts with root config
      plugins: []
    }
  }
}) 