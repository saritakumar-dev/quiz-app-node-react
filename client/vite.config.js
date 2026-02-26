import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import path from 'node:path' 


const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      // Manually map the broken relative paths to the actual files
      './icons/git': path.resolve(__dirname, 'node_modules/react-icons/dist/icons/git.js'),
      './icons/github': path.resolve(__dirname, 'node_modules/react-icons/dist/icons/github.js'),
      './icons/gitlab': path.resolve(__dirname, 'node_modules/react-icons/dist/icons/gitlab.js'),
    },
  },
    optimizeDeps: {
    // Prevents Vite from trying to pre-bundle the entire buggy library
    exclude: ['react-icons']
  }
})
