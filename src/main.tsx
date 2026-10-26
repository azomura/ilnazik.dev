import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import { StartupReady } from '@/components/layout/startup-ready'

import { loadTranslations } from '@/lib/translate'
import { languageService } from '@/services/core/i18n.service'

import { App } from './App.tsx'

import './assets/styles/main.css'

async function bootstrap() {
  await loadTranslations(languageService.getSnapshot())

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Suspense fallback={null}>
        <App />
        <StartupReady />
      </Suspense>
    </StrictMode>
  )
}

void bootstrap().catch(error => window.reportError(error))
