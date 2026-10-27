import type { MusicLyricsV1MusicLyricsGetParams } from '@/services/api/models'

export const musicKeys = {
  all: ['music'] as const,
  recent: (limit: number) => [...musicKeys.all, 'recent', limit] as const,
  lyrics: ({ title, artist }: MusicLyricsV1MusicLyricsGetParams) =>
    [...musicKeys.all, 'lyrics', title, artist] as const
}
