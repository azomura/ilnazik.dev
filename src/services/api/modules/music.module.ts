import { apiClient } from '@/services/api/client'

import type {
  MusicCoverV1MusicCoverGetParams,
  MusicCoverV1ResponseDto,
  MusicLyricsV1MusicLyricsGetParams,
  MusicLyricsV1ResponseDto
} from '@/services/api/models'

import type { MusicRecentV1MusicYandexRecentGetParams } from '@/services/api/models/musicRecentV1MusicYandexRecentGetParams'
import type { MusicRecentV1ResponseDto } from '@/services/api/models/musicRecentV1ResponseDto'

export const musicModule = {
  streamUrl: (path: string) => (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '') + path,
  getRecent: (params: MusicRecentV1MusicYandexRecentGetParams, signal?: AbortSignal) =>
    apiClient.get<MusicRecentV1ResponseDto>('music/yandex/recent', {
      params,
      signal,
      timeout: 15000
    }),
  getCover: (params: MusicCoverV1MusicCoverGetParams, signal?: AbortSignal) =>
    apiClient.get<MusicCoverV1ResponseDto>('music/cover', {
      params,
      signal,
      timeout: 30000
    }),
  getLyrics: (params: MusicLyricsV1MusicLyricsGetParams, signal?: AbortSignal) =>
    apiClient.get<MusicLyricsV1ResponseDto>('music/lyrics', {
      params,
      signal,
      timeout: 25000
    })
}
