import { useEffect, useState } from 'react'

import { useLinkPreview } from './use-link-preview'

interface IPreviewTarget {
  anchor: HTMLElement
  url: string
  developer: boolean
}

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

      let next: IPreviewTarget | null = null
      if (anchor?.dataset.preview === 'developer') {
        next = { anchor, developer: true, url: '' }
      } else if (anchor instanceof HTMLAnchorElement) {
        const url = new URL(anchor.href, location.href)

        if (['http:', 'https:'].includes(url.protocol) && url.origin !== location.origin) {
          next = { anchor, developer: false, url: url.href }
        }
      }

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
