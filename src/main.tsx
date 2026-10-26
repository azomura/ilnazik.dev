import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { StartupReady } from '@/components/layout/startup-ready'

import { App } from './App.tsx'

import './assets/styles/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <StartupReady />
  </StrictMode>
)
