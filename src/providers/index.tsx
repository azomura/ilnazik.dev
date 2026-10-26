import type { PropsWithChildren } from 'react'

import { AccentProvider } from './accent'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './theme'

import { ImageProvider } from './image.provider'
import { PreviewProvider } from './preview.provider'
import { QueryProvider } from './query.provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ImageProvider>
        <ThemeProvider>
          <AccentProvider>
            <I18nProvider>
              <PreviewProvider>{children}</PreviewProvider>
            </I18nProvider>
          </AccentProvider>
        </ThemeProvider>
      </ImageProvider>
    </QueryProvider>
  )
}
