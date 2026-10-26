import { useEffect, useState, type RefObject } from 'react'

export function useScrollEdges<T extends HTMLElement>(
  ref: RefObject<T | null>,
  axis: 'horizontal' | 'vertical' = 'vertical'
) {
  const [edges, setEdges] = useState({ start: false, end: false })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const horizontal = axis === 'horizontal'
      const offset = horizontal ? element.scrollLeft : element.scrollTop

      const size = horizontal ? element.clientWidth : element.clientHeight
      const total = horizontal ? element.scrollWidth : element.scrollHeight

      const start = offset > 1
      const end = offset < total - size - 1

      setEdges(previous =>
        previous.start === start && previous.end === end ? previous : { start, end }
      )
    }

    const observer = new ResizeObserver(update)

    observer.observe(element)
    element.addEventListener('scroll', update, { passive: true })

    update()

    return () => {
      observer.disconnect()
      element.removeEventListener('scroll', update)
    }
  }, [ref, axis])

  return edges
}
