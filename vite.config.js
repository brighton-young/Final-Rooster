import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  root: './',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        scholarship: resolve(__dirname, 'scholarship.html'),
        testimonials: resolve(__dirname, 'testimonials.html'),
        contact: resolve(__dirname, 'contact-apply.html')
      }
    },
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/functions"; @import "bootstrap/scss/variables"; @import "bootstrap/scss/mixins";`
      }
    }
  }
});