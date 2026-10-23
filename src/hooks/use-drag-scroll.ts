import { useRef, useState, type PointerEvent, type RefObject } from 'react'

export function useDragScroll<T extends HTMLElement>(ref: RefObject<T | null>) {
  const drag = useRef<{ id: number; x: number; left: number } | null>(null)

  const [dragging, setDragging] = useState(false)

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

    if (start?.id === event.pointerId) {
      event.currentTarget.scrollLeft = start.left + start.x - event.clientX
    }
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
    drag,
    dragging,
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
