const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://cn.vitejs.dev/config
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8850,
    open: true
  }
})
