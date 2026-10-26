import { useLayoutEffect, useMemo, useSyncExternalStore, type PropsWithChildren } from 'react'

import { themeService } from '@/services/core/theme.service'

import { ThemeContext } from './theme.context'

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useSyncExternalStore(themeService.subscribe, themeService.getSnapshot)
  const effectiveTheme = useSyncExternalStore(
    themeService.subscribe,
    themeService.getEffectiveTheme
  )

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark')
    document.documentElement.style.colorScheme = effectiveTheme
  }, [effectiveTheme])

  const value = useMemo(
    () => ({
      theme,
      effectiveTheme,
      setTheme: themeService.setTheme
    }),
    [theme, effectiveTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
