import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '^/auth(?!/callback)': {
        target: 'http://mutsa.shop',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[VITE PROXY] 요청 URL: ${req.url}`);
          });
        },
      },
    },
  },
});
