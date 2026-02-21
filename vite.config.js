import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // This pulls the variables from Vercel/Process into Vite
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_TINA_CLIENT_ID': JSON.stringify(env.VITE_TINA_CLIENT_ID),
      'process.env.VITE_TINA_TOKEN': JSON.stringify(env.VITE_TINA_TOKEN),
    },
  }
})