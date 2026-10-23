import { useEffect, useRef, useState, type PointerEvent } from 'react'

export function useHorizontalScroll<T extends HTMLElement>(observeEnd = false) {
  const ref = useRef<T | null>(null)
  const drag = useRef<{ id: number; x: number; left: number } | null>(null)

  const [dragging, setDragging] = useState(false)
  const [edges, setEdges] = useState({ left: false, right: false })
  const [endVisible, setEndVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let wheelTarget = element.scrollLeft
    let wheelTimer: ReturnType<typeof setTimeout> | undefined

    const updateEdges = () => {
      const leftDistance = Math.max(0, element.scrollLeft)
      const rightDistance = Math.max(0, element.scrollWidth - element.clientWidth - leftDistance)
      const left = leftDistance > 1
      const right = rightDistance > 1

      setEdges(previous =>
        previous.left === left && previous.right === right ? previous : { left, right }
      )
    }

    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || drag.current) return

      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1
      const start = wheelTimer ? wheelTarget : element.scrollLeft

      const next = Math.max(
        0,
        Math.min(element.scrollWidth - element.clientWidth, start + delta * unit)
      )

      if (Math.abs(next - start) < 1) {
        if (Math.abs(element.scrollLeft - next) > 1) event.preventDefault()
        return
      }

      event.preventDefault()

      wheelTarget = next
      clearTimeout(wheelTimer)

      wheelTimer = setTimeout(() => {
        wheelTimer = undefined
      }, 200)

      element.scrollTo({
        left: next,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth'
      })
    }

    const controller = new AbortController()

    element.addEventListener('wheel', wheel, { passive: false, signal: controller.signal })
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
      clearTimeout(wheelTimer)
    }
  }, [observeEnd])

  const onPointerDown = (event: PointerEvent<T>) => {
    const element = event.currentTarget

    if (event.pointerType !== 'mouse' || event.button !== 0) return
    if (element.scrollWidth <= element.clientWidth) return
    if (event.target instanceof Element && event.target.closest('a, button, input')) return

    event.preventDefault()
    drag.current = { id: event.pointerId, x: event.clientX, left: element.scrollLeft }
    element.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const onPointerMove = (event: PointerEvent<T>) => {
    const start = drag.current
    if (!start || start.id !== event.pointerId) return

    event.currentTarget.scrollLeft = start.left + start.x - event.clientX
  }

  const stopDrag = (event: PointerEvent<T>) => {
    if (drag.current?.id !== event.pointerId) return

    drag.current = null
    setDragging(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

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
    scrollProps: {
      ref,
      onPointerDown,
      onPointerMove,
      onPointerUp: stopDrag,
      onPointerCancel: stopDrag,
      onLostPointerCapture: stopDrag
    }
  }
}
