export function getThemeClipPaths(x: number, y: number, width: number, height: number) {
  const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y))
  const center = `${(x / width) * 100}% ${(y / height) * 100}%`
  const size = (radius / (Math.hypot(width, height) / Math.SQRT2)) * 100

  return [`circle(0% at ${center})`, `circle(${size}% at ${center})`]
}

export function getThemeSnapshotSize(root: HTMLElement) {
  const snapshot = getComputedStyle(root, '::view-transition-group(root)')
  const viewport = getComputedStyle(root, '::view-transition')

  return {
    width: parseFloat(snapshot.width) || innerWidth,
    height: parseFloat(snapshot.height) || innerHeight,
    left: parseFloat(viewport.left) || 0,
    top: parseFloat(viewport.top) || 0
  }
}
