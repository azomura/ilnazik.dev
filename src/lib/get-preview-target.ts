import type { IPreviewTarget } from '@/interfaces/preview'

export function getPreviewTarget(anchor: HTMLElement | null): IPreviewTarget | null {
  if (anchor?.dataset.preview === 'developer') return { anchor, developer: true, url: '' }

  if (anchor instanceof HTMLAnchorElement) {
    const url = new URL(anchor.href, location.href)
    if (['http:', 'https:'].includes(url.protocol) && url.origin !== location.origin) {
      return { anchor, developer: false, url: url.href }
    }
  }

  return null
}
