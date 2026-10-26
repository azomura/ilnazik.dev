export class ImageService {
  private pending = new WeakMap<HTMLImageElement, { source: string; promise: Promise<boolean> }>()

  public observe(root: HTMLElement): () => void {
    let active = true

    const prepare = async (image: HTMLImageElement) => {
      const address = image.currentSrc || image.src
      const source = `${address}\n${image.srcset}\n${image.sizes}`

      let cached = this.pending.get(image)

      if (cached?.source === source && image.dataset.imageState === 'loaded') return
      if (!image.complete) {
        if (image.dataset.imageState !== 'loading') image.dataset.imageState = 'loading'
        return
      }

      if (!cached || cached.source !== source) {
        image.dataset.imageState = 'loading'
        cached = {
          source,
          promise: image.decode().then(
            () => image.naturalWidth > 0,
            () => false
          )
        }
        this.pending.set(image, cached)
      }

      const loaded = await cached.promise
      if (
        active &&
        image.isConnected &&
        this.pending.get(image) === cached &&
        (image.currentSrc || image.src) === address
      ) {
        const state = loaded ? 'loaded' : 'error'
        if (image.dataset.imageState !== state) image.dataset.imageState = state
      }
    }

    const scan = (node: Node) => {
      if (!(node instanceof Element)) return
      if (node instanceof HTMLImageElement) void prepare(node)
      else
        node.querySelectorAll('img').forEach(image => {
          void prepare(image)
        })
    }

    const settle = (event: Event) => {
      if (event.target instanceof HTMLImageElement) void prepare(event.target)
    }

    const observer = new MutationObserver(records => {
      const added = new Set<Node>()

      for (const record of records) {
        if (record.type === 'attributes') {
          if (record.target instanceof HTMLImageElement) this.pending.delete(record.target)
          added.add(record.target)
        } else record.addedNodes.forEach(node => added.add(node))
      }

      added.forEach(scan)
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
    }
  }
}

export const imageService = new ImageService()
