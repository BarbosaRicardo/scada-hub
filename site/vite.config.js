import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When deploying to Vercel, base is '/'. For GitHub Pages, it was '/scada-hub/'.
const isVercel = process.env.VERCEL === '1'

export default defineConfig({
  plugins: [react()],
  base: isVercel ? '/' : '/scada-hub/',
  build: {
    outDir: isVercel ? 'dist' : '../docs',
    emptyOutDir: true,
  },
})
