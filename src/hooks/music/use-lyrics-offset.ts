import { useLayoutEffect, useRef, useState } from 'react'

export function useLyricsOffset(index: number, fontSize: number) {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)

  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    const container = viewport.current
    const list = track.current
    const row = list?.querySelector<HTMLElement>('[data-active=true]')

    if (!container || !list || !row) return

    let disposed = false

    const measure = () => {
      if (disposed) return

      const next = container.clientHeight / 2 - row.offsetTop - row.offsetHeight / 2

      setOffset(previous => (Math.abs(previous - next) < 0.5 ? previous : next))
    }

    const observer = new ResizeObserver(measure)

    observer.observe(container)
    observer.observe(row)

    measure()
    void document.fonts.ready.then(measure)

    return () => {
      disposed = true
      observer.disconnect()
    }
  }, [index, fontSize])

  return { viewport, track, offset }
}
