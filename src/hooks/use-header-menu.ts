import { useCallback, useEffect, useId, useRef, useState } from 'react'

export function useHeaderMenu() {
  const [open, setOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(value => !value), [])

  useEffect(() => {
    if (!open) return

    const desktop = window.matchMedia('(min-width: 640px)')
    const onDesktop = () => {
      if (desktop.matches) close()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      close()
      toggleRef.current?.focus()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) close()
    }

    onDesktop()

    desktop.addEventListener('change', onDesktop)

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      desktop.removeEventListener('change', onDesktop)

      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open, close])

  return { open, close, toggle, headerRef, toggleRef, menuId }
}
