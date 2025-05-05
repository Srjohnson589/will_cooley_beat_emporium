import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import dotenv from 'dotenv';

// dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  globals: true,
  setupFiles: './tests/setup.js',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://beat-emporium-api.onrender.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/create_checkout_session': {
        target: 'https://beat-emporium-api.onrender.com',
        changeOrigin: true,
      },
      '/session_status': {
        target: 'https://beat-emporium-api.onrender.com',
        changeOrigin: true,
      }
    },
  }
})
