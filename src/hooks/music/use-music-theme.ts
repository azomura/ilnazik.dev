import { useMemo, type CSSProperties } from 'react'

import { useAccent, useTheme } from '@/hooks/providers'
import { musicTheme } from '@/lib/music-theme'

export function useMusicTheme(colors: readonly string[]) {
  const { effectiveTheme } = useTheme()
  const { accent } = useAccent()

  return useMemo(
    () => musicTheme(colors, effectiveTheme === 'dark', accent) as CSSProperties,
    [colors, effectiveTheme, accent]
  )
}
