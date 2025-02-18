import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'axios-vendor': ['axios', 'axios-retry'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
