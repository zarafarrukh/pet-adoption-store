import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/pet-adoption-store/', 
  plugins: [vue()],
})
