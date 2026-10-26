import { lazy, Suspense, useEffect, type PropsWithChildren } from 'react'

import { usePreview } from '@/hooks/preview/use-preview'

const loadPreview = () =>
  import('./preview-popup').then(module => ({ default: module.PreviewPopup }))

const PreviewPopup = lazy(loadPreview)

export function PreviewProvider({ children }: PropsWithChildren) {
  const { target, open, setOpen } = usePreview()

  useEffect(() => {
    if (!matchMedia('(any-hover: hover)').matches) return

    const warmup = () => {
      void loadPreview().catch(() => {})
    }

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(warmup, { timeout: 1500 })
      return () => cancelIdleCallback(id)
    }

    const id = setTimeout(warmup, 1000)

    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {children}
      {target && (
        <Suspense fallback={null}>
          <PreviewPopup target={target} open={open} setOpen={setOpen} />
        </Suspense>
      )}
    </>
  )
}
