import { useEffect, useRef, useState } from 'react'

export function useReveal() {
  const [visible, setVisible] = useState(false)

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.05 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
