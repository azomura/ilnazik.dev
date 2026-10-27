import { useLayoutEffect, useRef } from 'react'

export function useSearchScrollShadows(open: boolean, query: string) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open || !ref.current) return

    const lists = ref.current.querySelectorAll<HTMLElement>('.search-results, .search-recent-list')
    const controller = new AbortController()

    const update = (list: HTMLElement) => {
      list.toggleAttribute('data-scroll-top', list.scrollTop > 1)
      list.toggleAttribute(
        'data-scroll-bottom',
        list.scrollHeight - list.clientHeight - list.scrollTop > 1
      )
    }

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => update(entry.target as HTMLElement))
    })

    lists.forEach(list => {
      list.addEventListener('scroll', () => update(list), {
        passive: true,
        signal: controller.signal
      })

      observer.observe(list)
      update(list)
    })

    return () => {
      controller.abort()
      observer.disconnect()
    }
  }, [open, query])

  return ref
}
