import { useLayoutEffect, useRef } from 'react'

export function useScrollShadows() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const list = ref.current
    if (!list) return

    const update = () => {
      list.toggleAttribute('data-scroll-top', list.scrollTop > 1)
      list.toggleAttribute(
        'data-scroll-bottom',
        list.scrollHeight - list.clientHeight - list.scrollTop > 1
      )
    }

    const observer = new ResizeObserver(update)
    observer.observe(list)
    if (list.firstElementChild) observer.observe(list.firstElementChild)

    list.addEventListener('scroll', update, { passive: true })
    update()

    return () => {
      observer.disconnect()
      list.removeEventListener('scroll', update)
    }
  }, [])

  return ref
}
