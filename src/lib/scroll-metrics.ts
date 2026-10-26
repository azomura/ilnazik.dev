export function getScrollMetrics(track: HTMLElement) {
  const viewport = window.innerHeight
  const maximum = Math.max(0, document.documentElement.scrollHeight - viewport)
  const height = track.clientHeight
  const size = Math.min(height, Math.max(36, height * viewport / (maximum + viewport)))

  return { maximum, travel: height - size, size }
}
