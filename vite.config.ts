import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { URL, fileURLToPath } from "url"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@i', replacement: fileURLToPath(new URL('./src/assets/images', import.meta.url)) },
    ]
  }
})
