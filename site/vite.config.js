import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/scada-hub/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
})
