const origins = new WeakMap<HTMLElement, { rect: DOMRect; width: number; height: number }>()

export function searchDestination(header: HTMLElement, open: boolean, source: DOMRect) {
  const saved = origins.get(header)

  if (open && source.width >= 47.5) {
    origins.set(header, { rect: source, width: innerWidth, height: innerHeight })
  }

  if (!open && saved?.width === innerWidth && saved.height === innerHeight) return saved.rect

  const clone = header.cloneNode(true) as HTMLElement

  clone.classList.toggle('header-search-expanded', open)
  clone.dataset.searchOpen = String(open)
  clone.removeAttribute('data-search-morph')
  clone.inert = true

  Object.assign(clone.style, { visibility: 'hidden', transition: 'none', pointerEvents: 'none' })
  document.body.append(clone)

  const selector = open ? '.search-field' : '.header-search-trigger'
  const rect = clone.querySelector(selector)!.getBoundingClientRect()

  clone.remove()

  return rect
}
