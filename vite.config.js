import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AESTHETICS/', // Match your GitHub repository name
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper handling of dynamic imports
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
