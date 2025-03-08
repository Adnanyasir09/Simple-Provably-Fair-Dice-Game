import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures correct routing on Vercel
  build: {
    outDir: "dist", // Ensures output goes to the correct directory
    emptyOutDir: true
  }
})
