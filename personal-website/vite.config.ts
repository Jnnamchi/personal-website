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
          src: './src/crapsgame/crapsgame.js',
          dest: './src/crapsgame/'
        },
        {
          src: './src/randomQuoteGenerator/randomQuoteGenerator.js',
          dest: './src/randomQuoteGenerator/'
        },
        {
          src: './src/aboutmesection/John_Nnamchi_CV.pdf',
          dest: './src/aboutmesection/'
        },
      ],
    }),
  ],
})
