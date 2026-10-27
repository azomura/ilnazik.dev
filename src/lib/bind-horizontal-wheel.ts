function wheelUnit(mode: number, width: number) {
  if (mode === 1) return 16
  if (mode === 2) return width

  return 1
}

export function bindHorizontalWheel(element: HTMLElement, isDragging: () => boolean) {
  let target = element.scrollLeft
  let timer: ReturnType<typeof setTimeout> | undefined

  const wheel = (event: WheelEvent) => {
    if (event.ctrlKey || isDragging()) return

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    const unit = wheelUnit(event.deltaMode, element.clientWidth)

    const start = timer ? target : element.scrollLeft
    const next = Math.max(
      0,
      Math.min(element.scrollWidth - element.clientWidth, start + delta * unit)
    )

    const changed = Math.abs(next - start) >= 1

    if (!changed && Math.abs(element.scrollLeft - next) <= 1) return

    event.preventDefault()

    if (!changed) return

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
