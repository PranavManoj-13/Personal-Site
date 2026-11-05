import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { pages } from './scripts/pages.mjs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.keys(pages).map(path => [path.replace(/\W/g, '_'), resolve(import.meta.dirname, path)])),
    },
  },
});
