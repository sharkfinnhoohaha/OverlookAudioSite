import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    'global': 'globalThis', // The "Black Screen" killer
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Helps us see the error if this still fails
  }
})