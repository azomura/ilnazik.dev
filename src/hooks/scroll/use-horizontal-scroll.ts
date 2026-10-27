import { useEffect, useRef, useState } from 'react'

import { bindHorizontalWheel } from '@/lib/bind-horizontal-wheel'

import { useDragScroll } from './use-drag-scroll'
import { useScrollEdges } from './use-scroll-edges'

export function useHorizontalScroll<T extends HTMLElement>(observeEnd = false) {
  const ref = useRef<T | null>(null)

  const { drag, dragging, scrollProps } = useDragScroll(ref)

  const { start, end } = useScrollEdges(ref, 'horizontal')
  const [endVisible, setEndVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const unbindWheel = matchMedia('(any-hover: hover)').matches
      ? bindHorizontalWheel(element, () => Boolean(drag.current))
      : undefined

    const endObserver = observeEnd
      ? new IntersectionObserver(
          ([entry]) => {
            setEndVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5)
          },
          { root: element, threshold: 0.5 }
        )
      : undefined
    if (element.lastElementChild) endObserver?.observe(element.lastElementChild)

    return () => {
      endObserver?.disconnect()
      unbindWheel?.()
    }
  }, [observeEnd, drag])

  return {
    dragging,
    canScrollLeft: start,
    canScrollRight: end,
    endVisible,
    scrollBy: (direction: number) => {
      const element = ref.current

      if (!element) return

      element.scrollBy({
        left: direction * element.clientWidth * 0.8,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth'
      })
    },
    scrollProps
  }
}
