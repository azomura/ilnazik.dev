import type { PropsWithChildren } from 'react'

import { ImageProvider } from './image'

import { PreviewProvider } from './preview.provider'
import { QueryProvider } from './query.provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ImageProvider>
        <PreviewProvider>{children}</PreviewProvider>
      </ImageProvider>
    </QueryProvider>
  )
}
