export class ImageService {
  public observe(root: HTMLElement): () => void {
    const pending = new WeakMap<HTMLImageElement, object>()
    let active = true

    const prepare = async (image: HTMLImageElement) => {
      const request = {}

      pending.set(image, request)
      image.dataset.imageState = 'loading'

      if (!image.complete) return

      try {
        await image.decode()

        if (!image.naturalWidth) throw new Error('Invalid image')
        if (active && pending.get(image) === request) image.dataset.imageState = 'loaded'
      } catch {
        if (active && pending.get(image) === request) image.dataset.imageState = 'error'
      }
    }

    const scan = (node: Node) => {
      if (!(node instanceof Element)) return
      if (node instanceof HTMLImageElement) void prepare(node)

      node.querySelectorAll('img').forEach(image => {
        void prepare(image)
      })
    }

    const settle = (event: Event) => {
      if (event.target instanceof HTMLImageElement) void prepare(event.target)
    }

    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'attributes') scan(record.target)
        else record.addedNodes.forEach(scan)
      }
    })

    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src', 'srcset', 'sizes']
    })

    root.addEventListener('load', settle, true)
    root.addEventListener('error', settle, true)

    scan(root)

    return () => {
      active = false

      observer.disconnect()

      root.removeEventListener('load', settle, true)
      root.removeEventListener('error', settle, true)
      root.querySelectorAll('img').forEach(image => {
        delete image.dataset.imageState
      })
    }
  }
}

export const imageService = new ImageService()
