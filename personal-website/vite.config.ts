import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './src/randomQuoteGenerator/randomQuoteGenerator.js',
          dest: './src/randomQuoteGenerator/randomQuoteGenerator.js',
        },
        {
          src: './src/crapsgame/crapsgame.js',
          dest: './src/crapsgame/crapsgame.js',
        },
      ],
    }),
  ],
  base: './'
})
