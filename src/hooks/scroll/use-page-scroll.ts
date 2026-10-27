import { useEffect, useRef, useState } from 'react'

import { bindPageScroll } from '@/lib/bind-page-scroll'

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

    const { stop, destroy } = bindPageScroll(root, track, {
      onActivity: setScrolling,
      onTopVisible: setShowTop,
      onScrollable: setScrollable
    })

    stopRef.current = stop

    return destroy
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
