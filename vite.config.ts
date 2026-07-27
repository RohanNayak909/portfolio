import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative assets allow the same build to work on a GitHub project page
  // without hard-coding the repository name.
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
