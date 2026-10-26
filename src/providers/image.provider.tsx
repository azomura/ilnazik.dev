import { useLayoutEffect, type PropsWithChildren } from 'react'

import { imageService } from '@/services/core/image.service'

export function ImageProvider({ children }: PropsWithChildren) {
  useLayoutEffect(() => imageService.observe(document.body), [])

  return children
}
