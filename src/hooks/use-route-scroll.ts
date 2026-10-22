import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useRouteScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])
}
