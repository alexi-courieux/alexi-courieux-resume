import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import './i18n.tsx'
import {I18nContextProvider} from './contextProviders/I18nContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nContextProvider>
      <App />
    </I18nContextProvider>
  </StrictMode>,
)
