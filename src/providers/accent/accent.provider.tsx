import { useLayoutEffect, useMemo, useSyncExternalStore, type PropsWithChildren } from 'react'

import { accentService } from '@/services/core/accent.service'

import { AccentContext } from './accent.context'

export function AccentProvider({ children }: PropsWithChildren) {
  const accent = useSyncExternalStore(accentService.subscribe, accentService.getSnapshot)

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--brand-accent', accent)
  }, [accent])

  const value = useMemo(() => ({ accent, setAccent: accentService.setAccent }), [accent])

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
}
