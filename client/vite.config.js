import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': "https://mr2-chats-backend.vercel.app" 
    },
  },
  plugins: [react(),tailwindcss(),],
})
