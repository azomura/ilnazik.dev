import type { PropsWithChildren } from 'react'

import { PreviewProvider } from './preview.provider'
import { QueryProvider } from './query.provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <PreviewProvider>{children}</PreviewProvider>
    </QueryProvider>
  )
}
