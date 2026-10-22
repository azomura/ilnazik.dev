import { useCallback, useRef, type PropsWithChildren } from 'react'

import { ImageContext } from './image.context'

export function ImageProvider({ children }: PropsWithChildren) {
  const pending = useRef(new WeakMap<HTMLImageElement, { src: string; promise: Promise<void> }>())

  const decode = useCallback((image: HTMLImageElement) => {
    const src = image.currentSrc || image.src
    const cached = pending.current.get(image)
    if (cached?.src === src) return cached.promise

    const promise = image.decode()

    pending.current.set(image, { src, promise })

    return promise
  }, [])

  return <ImageContext.Provider value={decode}>{children}</ImageContext.Provider>
}
