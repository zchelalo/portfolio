import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from '@/Router.tsx'
import '@/index.css'

import { i18next } from '@/config/i18n'
i18next.init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
