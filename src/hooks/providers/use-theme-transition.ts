import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'

import { getThemeClipPaths, getThemeSnapshotSize } from '@/lib/theme-transition'

import { useTheme } from './use-theme'

export function useThemeTransition() {
  const { effectiveTheme, setTheme } = useTheme()

  const active = useRef<ViewTransition | null>(null)
  const animation = useRef<Animation | null>(null)

  useEffect(
    () => () => {
      active.current?.skipTransition()
      animation.current?.cancel()
      delete document.documentElement.dataset.themeTransition
    },
    []
  )

  const toggleTheme = async (button: HTMLElement) => {
    if (active.current) return

    const apply = () => setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply()
      return
    }

    const { left, top, width, height } = button.getBoundingClientRect()

    const x = left + width / 2
    const y = top + height / 2

    const clips = getThemeClipPaths(x, y, innerWidth, innerHeight)
    const root = document.documentElement

    root.dataset.themeTransition = 'active'
    root.style.setProperty('--theme-transition-start', clips[0])

    const transition = document.startViewTransition(() => flushSync(apply))

    active.current = transition

    try {
      await transition.ready

      const snapshot = getThemeSnapshotSize(root)
      const resolvedClips = getThemeClipPaths(
        x - snapshot.left,
        y - snapshot.top,
        snapshot.width,
        snapshot.height
      )

      root.style.setProperty('--theme-transition-start', resolvedClips[0])

      animation.current = root.animate(
        { clipPath: resolvedClips },
        {
          duration: 400,
          easing: 'ease-in-out',
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)'
        }
      )
      await transition.finished
    } catch {
    } finally {
      animation.current?.cancel()

      animation.current = null
      active.current = null

      delete root.dataset.themeTransition

      root.style.removeProperty('--theme-transition-start')
    }
  }

  return { effectiveTheme, toggleTheme }
}
