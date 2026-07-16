import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ClassBridgeVue',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue', '@classbridge/sdk', '@classbridge/whiteboard', '@classbridge/whiteboard/vue'],
          output: {
            exports: 'named',
            globals: {
              vue: 'Vue',
            },
            assetFileNames: 'style.css',
          },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
  },
});
