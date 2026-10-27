import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useRouteScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!hash) return window.scrollTo(0, 0)

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: reducedMotion ? 'instant' : 'smooth',
        block: 'start'
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])
}
