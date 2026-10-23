import { useEffect, useRef, useState } from 'react'

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
    if (!root || !track) return

    let frame = 0
    let timer: ReturnType<typeof setTimeout>

    let maximum = 0
    let travel = 0
    let active = false
    let topVisible = false

    const nativeProgress = CSS.supports('animation-timeline', 'scroll(root block)')

    stopRef.current = () => {
      clearTimeout(timer)
      active = false
      setScrolling(false)
    }

    const update = () => {
      frame = 0

      const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0
      if (!nativeProgress) root.style.setProperty('--page-scroll-progress', String(progress))

      root.style.setProperty('--scroll-thumb-offset', `${progress * travel}px`)

      const nextVisible = window.scrollY > 48
      if (nextVisible !== topVisible) {
        topVisible = nextVisible
        setShowTop(nextVisible)
      }
    }

    const measure = () => {
      maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

      const size = Math.min(
        track.clientHeight,
        Math.max(36, (track.clientHeight * window.innerHeight) / (maximum + window.innerHeight))
      )

      travel = track.clientHeight - size

      root.style.setProperty('--scroll-thumb-size', `${size}px`)

      setScrollable(maximum > 1)
      update()
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
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
