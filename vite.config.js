import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'], 
  define: {
    // This is more robust for production builds
    'process.env.NEXT_PUBLIC_TINA_CLIENT_ID': JSON.stringify(process.env.NEXT_PUBLIC_TINA_CLIENT_ID),
    'process.env.TINA_TOKEN': JSON.stringify(process.env.TINA_TOKEN),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }
})