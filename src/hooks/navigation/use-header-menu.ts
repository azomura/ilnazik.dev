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

    const controller = new AbortController()
    const options = { signal: controller.signal }
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

    desktop.addEventListener('change', onDesktop, options)

    document.addEventListener('keydown', onKeyDown, options)
    document.addEventListener('pointerdown', onPointerDown, options)

    return () => controller.abort()
  }, [open, close])

  return { open, close, toggle, headerRef, toggleRef, menuId }
}
