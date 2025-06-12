import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Monitor Daty Ważności',
        short_name: 'Ważność',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [ {
      "src": "/icons/app-icon.png",
      "type": "image/png",
      "sizes": "144x144",
      "purpose": "any"
    },] 
      },
    })
  ]
})