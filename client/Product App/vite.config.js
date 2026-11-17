import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: './', // <-- Relative paths so images & scripts never 404
  plugins: [react()],
})