import { useLayoutEffect, useRef, useState } from 'react'

export function useTabsHeight() {
  const ref = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    let active: HTMLElement | undefined
    const resize = new ResizeObserver(() => {
      if (active) setHeight(active.offsetHeight)
    })

    const update = () => {
      const panel = Array.from(root.children).find(
        (child): child is HTMLElement =>
          child instanceof HTMLElement &&
          !child.hidden &&
          !child.hasAttribute('data-hidden') &&
          !child.hasAttribute('data-ending-style')
      )
      if (!panel || panel === active) return

      resize.disconnect()
      active = panel
      resize.observe(panel)

      setHeight(panel.offsetHeight)
    }

    const mutation = new MutationObserver(update)

    mutation.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden', 'data-hidden', 'data-ending-style']
    })

    update()

    return () => {
      resize.disconnect()
      mutation.disconnect()
    }
  }, [])

  return { ref, height }
}
