import { getScrollMetrics } from './scroll-metrics'

interface IPageScrollCallbacks {
  onActivity: (active: boolean) => void
  onTopVisible: (visible: boolean) => void
  onScrollable: (scrollable: boolean) => void
}

export function bindPageScroll(
  root: HTMLElement,
  track: HTMLElement,
  callbacks: IPageScrollCallbacks
) {
  const { onActivity, onTopVisible, onScrollable } = callbacks
  const fill = root.querySelector<HTMLElement>('.page-scroll-fill')

  let frame = 0
  let timer: ReturnType<typeof setTimeout>

  let maximum = 0
  let travel = 0
  let active = false
  let topVisible = false
  let needsMeasure = true
  let wasScrollable = false

  const nativeProgress = CSS.supports('animation-timeline', 'scroll(root block)')

  const stop = () => {
    clearTimeout(timer)
    active = false
    onActivity(false)
  }

  const measureMetrics = () => {
    if (!needsMeasure) return

    const metrics = getScrollMetrics(track)

    needsMeasure = false
    maximum = metrics.maximum
    travel = metrics.travel

    track.style.setProperty('--scroll-thumb-size', `${metrics.size}px`)
    track.style.setProperty('--scroll-thumb-travel', `${travel}px`)

    if (wasScrollable === maximum > 1) return

    wasScrollable = maximum > 1
    onScrollable(wasScrollable)
  }

  const update = () => {
    frame = 0
    measureMetrics()

    const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0

    if (!nativeProgress) {
      fill?.style.setProperty('--page-scroll-progress', String(progress))
      track.style.setProperty('--scroll-thumb-offset', `${progress * travel}px`)
    }

    updateVisibility()
  }

  const updateVisibility = () => {
    const nextVisible = window.scrollY > 48

    if (nextVisible === topVisible) return

    topVisible = nextVisible
    onTopVisible(nextVisible)
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  const measure = () => {
    needsMeasure = true
    schedule()
  }

  const updateOnScroll = nativeProgress ? updateVisibility : schedule

  const onScroll = () => {
    updateOnScroll()

    clearTimeout(timer)
    timer = setTimeout(stop, 800)

    if (active) return

    active = true
    onActivity(true)
  }

  const controller = new AbortController()

  window.addEventListener('scroll', onScroll, { passive: true, signal: controller.signal })
  window.addEventListener('resize', measure, { passive: true, signal: controller.signal })

  const observer = new ResizeObserver(measure)

  observer.observe(document.body)
  measure()

  const destroy = () => {
    controller.abort()
    observer.disconnect()

    cancelAnimationFrame(frame)
    clearTimeout(timer)
  }

  return { stop, destroy }
}
