import { BrowserRouter } from 'react-router-dom'

import { Providers } from './providers'
import { AppRouter } from './routers/app-router'

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRouter />
      </Providers>
    </BrowserRouter>
  )
}
