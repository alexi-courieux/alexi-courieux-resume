import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import './i18n.tsx'
import { I18nContextProvider } from './contextProviders/I18nContextProvider.tsx'
import { ThemeProvider } from './contextProviders/ThemeContextProvider.tsx'

import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </I18nContextProvider>
  </StrictMode>,
)
