import { useEffect, useRef, useState } from 'react'

import { getScrollMetrics } from '@/lib/scroll-metrics'

export function usePageScroll() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const stopRef = useRef<() => void>(() => {})

  const [scrolling, setScrolling] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const fill = root?.querySelector<HTMLElement>('.page-scroll-fill')
    if (!root || !track) return

    let frame = 0
    let timer: ReturnType<typeof setTimeout>

    let maximum = 0
    let travel = 0
    let active = false
    let topVisible = false
    let needsMeasure = true
    let wasScrollable = false

    const nativeProgress = CSS.supports('animation-timeline', 'scroll(root block)')

    stopRef.current = () => {
      clearTimeout(timer)
      active = false
      setScrolling(false)
    }

    const update = () => {
      frame = 0
      if (needsMeasure) {
        needsMeasure = false
        const metrics = getScrollMetrics(track)
        maximum = metrics.maximum
        travel = metrics.travel
        track.style.setProperty('--scroll-thumb-size', `${metrics.size}px`)
        track.style.setProperty('--scroll-thumb-travel', `${travel}px`)
        if (wasScrollable !== maximum > 1) {
          wasScrollable = maximum > 1
          setScrollable(wasScrollable)
        }
      }

      const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0
      if (!nativeProgress) {
        fill?.style.setProperty('--page-scroll-progress', String(progress))
        track.style.setProperty('--scroll-thumb-offset', `${progress * travel}px`)
      }
      updateVisibility()
    }

    const updateVisibility = () => {
      const nextVisible = window.scrollY > 48
      if (nextVisible !== topVisible) {
        topVisible = nextVisible
        setShowTop(nextVisible)
      }
    }

    const measure = () => {
      needsMeasure = true
      if (!frame) frame = requestAnimationFrame(update)
    }

    const onScroll = () => {
      if (nativeProgress) updateVisibility()
      else if (!frame) frame = requestAnimationFrame(update)
      if (!active) {
        active = true
        setScrolling(true)
      }

      clearTimeout(timer)
      timer = setTimeout(() => stopRef.current(), 800)
    }

    const controller = new AbortController()

    window.addEventListener('scroll', onScroll, { passive: true, signal: controller.signal })
    window.addEventListener('resize', measure, { passive: true, signal: controller.signal })

    const observer = new ResizeObserver(measure)

    observer.observe(document.body)
    measure()

    return () => {
      controller.abort()
      observer.disconnect()

      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [])

  return {
    rootRef,
    trackRef,
    scrolling,
    showTop,
    scrollable,
    stopScrolling: () => stopRef.current()
  }
}
