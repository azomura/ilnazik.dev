import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { musicKeys } from '@/services/api/keys/music.keys'
import type { MusicLyricsV1MusicLyricsGetParams } from '@/services/api/models'
import { musicModule } from '@/services/api/modules/music.module'

export function useGetMusicLyrics(params: MusicLyricsV1MusicLyricsGetParams, enabled = true) {
  return useQuery({
    queryKey: musicKeys.lyrics(params),
    queryFn: ({ signal }) => musicModule.getLyrics(params, signal),
    select: response => response.data,
    enabled: enabled && Boolean(params.title.trim() && params.artist.trim()),
    staleTime: 30 * 60_000,
    gcTime: 30 * 60_000
  })
}

export function useGetRecentMusic(enabled: boolean, limit = 20) {
  return useInfiniteQuery({
    queryKey: musicKeys.recent(limit),
    queryFn: ({ pageParam, signal }) => musicModule.getRecent({ limit, cursor: pageParam }, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: page => page.nextCursor ?? undefined,
    enabled,
    staleTime: 60_000,
    retry: false
  })
}
