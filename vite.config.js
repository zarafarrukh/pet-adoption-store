import { defineConfig } from 'vite'
import vue from '@vitejs/vue'

export default defineConfig({
  base: '/pet-adoption-store/', 
  plugins: [vue()],
})
