import { useEffect, useState } from 'react'

import type { IMusicTrack, IResolvedMusicArtwork } from '@/interfaces/music'
import { musicArtworkService, musicPaletteService } from '@/services/music'

interface IArtworkResult extends IResolvedMusicArtwork {
  track: IMusicTrack
}

export function useMusicArtwork(track: IMusicTrack, active: boolean) {
  const [result, setResult] = useState<IArtworkResult | null>(null)

  useEffect(() => {
    if (!active) return

    let cancelled = false

    void musicArtworkService.resolve(track).then(artwork => {
      if (cancelled) return

      setResult({ track, ...artwork })
    })

    return () => {
      cancelled = true
    }
  }, [track, active])

  const resolved = result?.track === track

  return {
    cover: resolved ? result.cover : track.cover,
    colors: resolved ? result.colors : musicPaletteService.fallback,
    loading: !resolved
  }
}
