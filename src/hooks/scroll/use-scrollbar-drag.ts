import { useRef, useState, type PointerEvent } from 'react'

import { scrollTo } from '@/lib/scroll-to'

export function useScrollbarDrag(onRelease: (hovered: boolean) => void) {
  const drag = useRef<{
    id: number
    offset: number
    top: number
    travel: number
    track: HTMLDivElement
  } | null>(null)

  const [dragging, setDragging] = useState(false)

  const move = (clientY: number) => {
    const current = drag.current
    if (!current || current.travel <= 0) return

    const progress = Math.min(
      1,
      Math.max(0, (clientY - current.top - current.offset) / current.travel)
    )

    current.track.style.setProperty('--scroll-thumb-offset', `${progress * current.travel}px`)

    scrollTo(progress * (document.documentElement.scrollHeight - window.innerHeight), false)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    const track = event.currentTarget
    const thumb = track.firstElementChild as HTMLElement
    const bounds = track.getBoundingClientRect()
    const thumbBounds = thumb.getBoundingClientRect()

    drag.current = {
      id: event.pointerId,
      track,
      offset: thumb.contains(event.target as Node)
        ? event.clientY - thumbBounds.top
        : thumbBounds.height / 2,
      top: bounds.top,
      travel: bounds.height - thumbBounds.height
    }

    event.preventDefault()
    track.setPointerCapture(event.pointerId)

    setDragging(true)
    move(event.clientY)
  }

  const stop = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const hovered =
      event.type !== 'pointercancel' &&
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom

    drag.current = null

    setDragging(false)
    onRelease(hovered)

    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return

    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return {
    dragging,
    dragProps: {
      onPointerDown,
      onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
        if (drag.current?.id === event.pointerId) move(event.clientY)
      },
      onPointerUp: stop,
      onPointerCancel: stop,
      onLostPointerCapture: stop
    }
  }
}
