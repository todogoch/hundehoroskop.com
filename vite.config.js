import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild'
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  server: {
    port: 5173,
    open: true
  }
});
