import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This tells Vite: "It is okay to show NEXT_PUBLIC variables to the browser"
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'], 
  define: {
    'process.env': process.env
  }
})
