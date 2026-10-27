import { useEffect, useRef } from 'react'

export function useLoadMore(enabled: boolean, load: () => unknown) {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) load()
      },
      { root: element.closest('.music-queue'), rootMargin: '0px 0px 120px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [enabled, load])

  return ref
}
