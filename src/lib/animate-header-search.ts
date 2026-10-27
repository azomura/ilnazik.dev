import { searchDestination } from './header-search-geometry'
import { createSearchVisual } from './header-search-visual'

const motions = new WeakMap<HTMLElement, Animation>()
const options: KeyframeAnimationOptions = { duration: 450, easing: 'ease', fill: 'forwards' }

export function animateHeaderSearch(open: boolean) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const header = Array.from(document.querySelectorAll<HTMLElement>('.site-header')).find(
    element => element.getClientRects().length
  )

  if (!header) return

  const previous = motions.get(header)
  const moving = (previous?.effect as KeyframeEffect | null)?.target as HTMLElement | undefined
  const movingRect = moving?.querySelector('.search-morph-surface')?.getBoundingClientRect()

  previous?.cancel()

  const source = header.querySelector(open ? '.header-search-trigger' : '.search-field')!
  const sourceRect = source.getBoundingClientRect()

  const from = movingRect ?? sourceRect
  const to = searchDestination(header, open, sourceRect)

  const { ghost, surface, text } = createSearchVisual(header, source)

  const width = Math.max(from.width, to.width)
  const height = Math.max(from.height, to.height)

  Object.assign(ghost.style, { left: '0', top: '0', width: `${width}px`, height: `${height}px` })
  document.body.append(ghost)

  header.dataset.searchMorph = 'active'

  const frame = (rect: DOMRect, expanded: boolean) => ({
    transform: `translate(${rect.left}px, ${rect.top}px)`,
    clipPath: `inset(0 ${width - rect.width}px ${height - rect.height}px 0 round ${expanded ? 16 : 8}px)`
  })

  const motion = ghost.animate([frame(from, !open), frame(to, open)], options)

  surface.animate(
    [
      { transform: `scale(${from.width / width}, ${from.height / height})` },
      { transform: `scale(${to.width / width}, ${to.height / height})` }
    ],
    options
  )

  const hiddenText = { opacity: 0, transform: 'scale(0.65)' }
  const visibleText = { opacity: 1, transform: 'scale(1)' }

  text.animate(open ? [hiddenText, visibleText] : [visibleText, hiddenText], options)

  motions.set(header, motion)

  const cleanup = () => {
    ghost.remove()

    if (motions.get(header) !== motion) return

    delete header.dataset.searchMorph
    motions.delete(header)
  }

  motion.onfinish = cleanup
  motion.oncancel = cleanup
}
