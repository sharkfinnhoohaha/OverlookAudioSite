import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // This maps the Node-style process.env to the real values for the browser
      'process.env.VITE_TINA_CLIENT_ID': JSON.stringify(env.VITE_TINA_CLIENT_ID),
      'process.env.VITE_TINA_TOKEN': JSON.stringify(env.VITE_TINA_TOKEN),
      'process.env.VITE_TINA_BRANCH': JSON.stringify(env.VITE_TINA_BRANCH || 'main'),
    },
  }
})