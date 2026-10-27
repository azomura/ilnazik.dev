import type { IPreviewTarget } from '@/interfaces/ui/preview'

export function getPreviewTarget(anchor: HTMLElement | null): IPreviewTarget | null {
  if (anchor?.dataset.preview === 'developer') return { anchor, developer: true, url: '' }

  if (!(anchor instanceof HTMLAnchorElement)) return null

  const url = new URL(anchor.href, location.href)

  if (!['http:', 'https:'].includes(url.protocol)) return null
  if (url.origin === location.origin) return null

  return { anchor, developer: false, url: url.href }
}
