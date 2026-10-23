export function bindHorizontalWheel(element: HTMLElement, isDragging: () => boolean) {
  let target = element.scrollLeft
  let timer: ReturnType<typeof setTimeout> | undefined

  const wheel = (event: WheelEvent) => {
    if (event.ctrlKey || isDragging()) return

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1

    const start = timer ? target : element.scrollLeft
    const next = Math.max(
      0,
      Math.min(element.scrollWidth - element.clientWidth, start + delta * unit)
    )

    if (Math.abs(next - start) < 1) {
      if (Math.abs(element.scrollLeft - next) > 1) event.preventDefault()
      return
    }

    event.preventDefault()
    target = next

    clearTimeout(timer)

    timer = setTimeout(() => {
      timer = undefined
    }, 200)

    element.scrollTo({
      left: next,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    })
  }

  element.addEventListener('wheel', wheel, { passive: false })

  return () => {
    element.removeEventListener('wheel', wheel)
    clearTimeout(timer)
  }
}
