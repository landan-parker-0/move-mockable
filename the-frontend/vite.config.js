import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import linaria from '@wyw-in-js/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [viteReact(),  linaria(),],
  server:{
    host: '127.0.0.1'
  }
})
