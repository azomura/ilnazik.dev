import { cn } from './utils'

export function createSearchVisual(header: HTMLElement, source: Element) {
  const input = header.querySelector<HTMLInputElement>('.header-search-input')!
  const icon = source.querySelector('svg')?.cloneNode(true)

  const ghost = document.createElement('div')
  const surface = document.createElement('div')
  const text = document.createElement('span')

  ghost.className = cn(
    'search-morph-ghost pointer-events-none fixed top-0 left-0 z-100 box-border flex items-center',
    'overflow-hidden pl-4 text-primary [contain:layout_paint] [&_svg]:size-4.5 [&_svg]:shrink-0'
  )
  surface.className = 'search-morph-surface absolute inset-0 -z-1 bg-secondary origin-top-left'
  text.className = cn(
    'search-morph-text ml-3 shrink-0 origin-left whitespace-nowrap',
    input.value ? 'text-foreground' : 'text-muted-foreground'
  )

  text.textContent = input.value || input.placeholder
  text.style.font = getComputedStyle(input).font

  ghost.append(surface)

  if (icon) ghost.append(icon)

  ghost.append(text)

  return { ghost, surface, text }
}
