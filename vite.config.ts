import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mystify/",
  plugins: [
    vue(),
    vueJsx(),
    vuetify(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    port: 8080,
    proxy: {
      '^(/api|/meta|/login|/logout)': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false,
      },
    },
  },
})
