import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/colorVariables.module.scss" as *;\n@use "@/styles/fonts.modules.scss" as *;`,
      },
    },
  },
  server: {
    allowedHosts: ['38828430451a.ngrok-free.app', 'testing-storybrand-frontend.bakano.ec'],
  },
  build: {
    // Las librerías de animación y carrusel pesan y cambian con muy poca
    // frecuencia. Separarlas en chunks propios permite que el navegador las
    // conserve en caché entre despliegues, en vez de volver a descargarlas
    // cada vez que cambia el código de la aplicación.
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-animation': ['gsap', 'lenis', 'aos'],
          'vendor-carousel': ['swiper', '@splidejs/splide'],
          'vendor-forms': ['libphonenumber-js'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
