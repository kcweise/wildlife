import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  root: './client', // Specify the root directory
  build: {
    outDir: './dist', // Specify the output directory
  },
});
