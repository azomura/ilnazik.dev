import { useEffect, useState } from 'react'

import type { IPreviewTarget } from '@/interfaces/preview'

import { getPreviewTarget } from '@/lib/get-preview-target'

import { useLinkPreview } from './use-link-preview'

export function usePreview() {
  const [target, setTarget] = useState<IPreviewTarget | null>(null)
  const [open, setOpen] = useState(false)

  const { data, loading } = useLinkPreview(target?.url ?? '', open && !target?.developer)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let active: HTMLElement | null = null

    const inspect = (event: Event) => {
      const element = event.type === 'focusout' ? (event as FocusEvent).relatedTarget : event.target
      if (!(element instanceof Element)) {
        clearTimeout(timer)

        active = null
        timer = setTimeout(() => setOpen(false), 150)

        return
      }

      if (element.closest('[data-preview-popup]')) {
        clearTimeout(timer)
        return
      }

      const anchor = element.closest<HTMLElement>('[data-preview="developer"], a[href]')
      if (anchor && active === anchor) return

      clearTimeout(timer)

      const next = getPreviewTarget(anchor)

      if (next) {
        active = anchor

        setOpen(false)

        timer = setTimeout(
          () => {
            setTarget(next)
            setOpen(true)
          },
          next.developer ? 150 : 350
        )
      } else {
        active = null
        timer = setTimeout(() => setOpen(false), 150)
      }
    }

    const dismiss = () => {
      clearTimeout(timer)
      active = null
      setOpen(false)
    }

    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) dismiss()
    }

    const controller = new AbortController()
    const options = { signal: controller.signal }

    const handlers = {
      pointerover: inspect,
      focusin: inspect,
      focusout: inspect,
      pointerout: leave,
      keydown: escape,
      click: dismiss
    }

    for (const [event, handler] of Object.entries(handlers)) {
      document.addEventListener(event, handler as EventListener, options)
    }

    window.addEventListener('blur', dismiss, options)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [])

  return { target, open, setOpen, data, loading }
}
