import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { 
          browser: 'chromium',
          name: 'chromium-mobile',
          headless: true,
        },
        {
          browser: 'chromium',
          name: 'chromium-desktop',
          viewport: { width: 1920, height: 1080 }
        }
      ],
    },
  },
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
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', 'axios', 'axios-retry', 'i18next', 'react-i18next'],
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
