import { useEffect, useMemo, useState } from 'react'

import type { IMusicTrack } from '@/interfaces/music/player'

import { musicMetadataService } from '@/services/music/music-metadata.service'

export function useMusicMetadata(src: string) {
  const [result, setResult] = useState<IMusicTrack | null>(null)

  const fallback = useMemo(() => musicMetadataService.fallback(src), [src])

  useEffect(() => {
    let cancelled = false

    void musicMetadataService.load(src).then(track => {
      if (cancelled) return

      setResult(track)
    })

    return () => {
      cancelled = true
    }
  }, [src])

  return { track: result?.src === src ? result : fallback, loading: result?.src !== src }
}
