import { BrowserRouter } from 'react-router-dom'

import { ScrollControls } from '@/components/scroll-controls'
import { Toaster } from '@/components/ui/sonner'

import { Providers } from './providers'
import { AppRouter } from './routers/app-router'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRouter />
        <ScrollControls />
        <Toaster />
      </Providers>
    </BrowserRouter>
  )
}
