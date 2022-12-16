import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ssr } from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ssr({ prerender: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#root': __dirname,
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: '@import "~@/assets/variables.scss"',
      },
    },
  },
  base: '/dnd-helpers/',
});
