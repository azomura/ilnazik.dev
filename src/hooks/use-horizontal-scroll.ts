import { useEffect, useRef, useState } from 'react'

import { bindHorizontalWheel } from '@/lib/bind-horizontal-wheel'

import { useDragScroll } from './use-drag-scroll'

export function useHorizontalScroll<T extends HTMLElement>(observeEnd = false) {
  const ref = useRef<T | null>(null)

  const { drag, dragging, scrollProps } = useDragScroll(ref)

  const [edges, setEdges] = useState({ left: false, right: false })
  const [endVisible, setEndVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateEdges = () => {
      const leftDistance = Math.max(0, element.scrollLeft)
      const rightDistance = Math.max(0, element.scrollWidth - element.clientWidth - leftDistance)

      const left = leftDistance > 1
      const right = rightDistance > 1

      setEdges(previous =>
        previous.left === left && previous.right === right ? previous : { left, right }
      )
    }

    const unbindWheel = bindHorizontalWheel(element, () => Boolean(drag.current))

    const controller = new AbortController()

    element.addEventListener('scroll', updateEdges, { passive: true, signal: controller.signal })

    const observer = new ResizeObserver(updateEdges)

    observer.observe(element)
    updateEdges()

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
      controller.abort()
      observer.disconnect()
      endObserver?.disconnect()
      unbindWheel()
    }
  }, [observeEnd, drag])

  return {
    dragging,
    canScrollLeft: edges.left,
    canScrollRight: edges.right,
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
