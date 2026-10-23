export function scrollTo(top: number, smooth = true) {
  window.scrollTo({
    top,
    behavior:
      smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'smooth'
        : 'instant'
  })
}
