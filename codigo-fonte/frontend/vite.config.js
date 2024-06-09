import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inspect from 'vite-plugin-inspect';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inspect()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
})
