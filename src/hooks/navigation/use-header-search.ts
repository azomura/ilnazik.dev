import { useEffect, useEffectEvent } from 'react'

import { keepSearchFocus, visibleSearchPanel } from '@/lib/search-focus'

export function useHeaderSearch(open: boolean, onClose: () => void) {
  const close = useEffectEvent(onClose)

  useEffect(() => {
    if (!open) return

    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const frame = requestAnimationFrame(() => {
      visibleSearchPanel()?.querySelector<HTMLInputElement>('.header-search-input')?.focus()
    })

    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()

      keepSearchFocus(event)
    }

    document.addEventListener('keydown', keydown)

    return () => {
      cancelAnimationFrame(frame)

      document.body.style.overflow = overflow
      document.removeEventListener('keydown', keydown)

      previous?.focus({ preventScroll: true })
    }
  }, [open])
}
