import { BrowserRouter } from 'react-router-dom'

import { ScrollControls } from '@/components/scroll-controls'

import { Providers } from './providers'
import { AppRouter } from './routers/app-router'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRouter />
        <ScrollControls />
      </Providers>
    </BrowserRouter>
  )
}
