import { useEffect } from 'react'

import { fontService } from '@/services/core/font.service'

const MIN_VISIBLE_TIME = 650
const FADE_DURATION = 350

export function StartupReady() {
  useEffect(() => {
    const started = performance.getEntriesByName('startup-start')[0]?.startTime ?? performance.now()
    let cancelled = false
    let hideTimer: number | undefined
    let cleanupTimer: number | undefined
    let frame: number | undefined

    void fontService.load().then(() => {
      if (cancelled) return
      hideTimer = window.setTimeout(() => {
        frame = requestAnimationFrame(() => {
          document.documentElement.dataset.startup = 'ready'
          cleanupTimer = window.setTimeout(() => {
            performance.clearMarks('startup-start')
          }, FADE_DURATION)
        })
      }, Math.max(0, MIN_VISIBLE_TIME - (performance.now() - started)))
    })

    return () => {
      cancelled = true
      window.clearTimeout(hideTimer)
      window.clearTimeout(cleanupTimer)
      if (frame !== undefined) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
