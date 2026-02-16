import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/liff-playground/',
  plugins: [vue()],
  server: {
    allowedHosts: ['.ngrok-free.dev'], // 開發階段搭配 ngrok 使用
    proxy: {
      '/webhook': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
