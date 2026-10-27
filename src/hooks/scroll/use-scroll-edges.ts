import { useEffect, useState, type RefObject } from 'react'

export function useScrollEdges<T extends HTMLElement>(
  ref: RefObject<T | null>,
  axis: 'horizontal' | 'vertical' = 'vertical'
) {
  const [edges, setEdges] = useState({ start: false, end: false })

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const horizontal = axis === 'horizontal'

    let frame = 0
    let maximum = 0

    let start: boolean | undefined
    let end: boolean | undefined

    let disposed = false

    const update = () => {
      frame = 0

      const offset = horizontal ? element.scrollLeft : element.scrollTop
      const nextStart = offset > 1
      const nextEnd = offset < maximum - 1

      if (start === nextStart && end === nextEnd) return

      start = nextStart
      end = nextEnd

      setEdges({ start, end })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const measure = () => {
      maximum = horizontal
        ? element.scrollWidth - element.clientWidth
        : element.scrollHeight - element.clientHeight

      schedule()
    }

    const observer = new ResizeObserver(measure)

    observer.observe(element)
    element.addEventListener('scroll', schedule, { passive: true })

    void document.fonts.ready.then(() => {
      if (!disposed) measure()
    })

    measure()

    return () => {
      disposed = true
      observer.disconnect()

      cancelAnimationFrame(frame)

      element.removeEventListener('scroll', schedule)
    }
  }, [ref, axis])

  return edges
}
