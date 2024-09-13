import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const entryPath = resolve(__dirname, 'src/js/RevealIt.js');

export default defineConfig({
  root,
  publicDir: 'public',
  plugins: [], 
  build: {
    lib: {
      entry: entryPath,
      name: 'RevealIt', 
      formats: ['es', 'umd'], // Output formats
      fileName: (format) => `reveal-it.${format}.js`, // File naming 
    },
    outDir, 
    emptyOutDir: true, 
    rollupOptions: {
      external: ['gsap'],
      output: {
        globals: {
          gsap: 'gsap'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@js': resolve(__dirname, './src/js'),
      '@scss': resolve(__dirname, './src/scss'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/scss/framework/_vars/_vars.scss";
          @import "@/scss/framework/_mixins/_mixins.scss";
          @import "@/scss/framework/foundation/foundation.scss";
        `,
      },
    },
  },
});
