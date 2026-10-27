import type { IMusicTrack } from '@/interfaces/music/player'

import { useGetMusicLyrics } from '@/services/api/hooks/music.hooks'

export function useMusicLyrics(track: IMusicTrack, enabled = true) {
  const query = useGetMusicLyrics({ title: track.title, artist: track.artist }, enabled)

  if (!track.artist) return { status: 'missing', data: null } as const
  if (query.isError) return { status: 'error', data: null } as const
  if (query.isPending) return { status: 'loading', data: null } as const

  return { status: query.data ? 'ready' : 'missing', data: query.data ?? null } as const
}
