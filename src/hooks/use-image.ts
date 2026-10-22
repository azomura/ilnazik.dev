import { useCallback, useContext, useRef, useState } from 'react'

import { ImageContext } from '@/providers/image/image.context'

type ImageStatus = 'loading' | 'loaded' | 'error'

export function useImage(src?: string) {
  const decode = useContext(ImageContext)
  if (!decode) throw new Error('useImage must be used within ImageProvider')

  const current = useRef<HTMLImageElement | null>(null)

  const [result, setResult] = useState<{ src?: string; status: ImageStatus } | null>(null)

  const status = result && result.src === src ? result.status : 'loading'

  const onLoad = useCallback(async () => {
    const image = current.current
    if (!image) return

    const address = image.currentSrc || image.src
    let next: ImageStatus = 'loaded'

    try {
      await decode(image)
      if (!image.naturalWidth) next = 'error'
    } catch {
      next = 'error'
    }

    if (current.current === image && (image.currentSrc || image.src) === address) {
      setResult({ src, status: next })
    }
  }, [decode, src])

  const ref = useCallback(
    (image: HTMLImageElement | null) => {
      current.current = image
      if (image?.complete) {
        if (image.naturalWidth) void onLoad()
        else if (src) setResult({ src, status: 'error' })
      }
    },
    [onLoad, src]
  )

  const onError = useCallback(() => setResult({ src, status: 'error' }), [src])

  return { status, loading: status === 'loading', imageProps: { ref, onLoad, onError } }
}
