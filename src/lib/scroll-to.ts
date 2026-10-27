export function scrollTo(top: number, smooth = true) {
  const animate = smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({
    top,
    behavior: animate ? 'smooth' : 'instant'
  })
}
