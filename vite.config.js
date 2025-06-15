import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/AESTHETICS/', // Set base path for GitHub Pages deployment
  plugins: [vue()],
})
