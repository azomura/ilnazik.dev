export function visibleSearchPanel() {
  return Array.from(document.querySelectorAll<HTMLElement>('.header-search-content')).find(
    element => element.getClientRects().length
  )
}

export function keepSearchFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab') return

  const controls = visibleSearchPanel()?.querySelectorAll<HTMLElement>('button, input, a[href]')

  if (!controls?.length) return

  const first = controls[0]
  const last = controls[controls.length - 1]
  const boundary = event.shiftKey ? first : last
  const target = event.shiftKey ? last : first

  if (document.activeElement !== boundary) return

  event.preventDefault()
  target.focus()
}
