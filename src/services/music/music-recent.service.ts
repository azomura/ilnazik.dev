import type { IMusicTrack } from '@/interfaces/music/player'

import type { MusicRecentTrackV1Dto } from '@/services/api/models'
import { musicModule } from '@/services/api/modules/music.module'

export function recentMusicTrack(track: MusicRecentTrackV1Dto): IMusicTrack {
  return { ...track, src: musicModule.streamUrl(track.streamUrl) }
}

export class MusicRecentService {
  private tracks: IMusicTrack[] = []
  private index = 0
  private cursor: string | null = null

  public select(tracks: IMusicTrack[], index: number, cursor: string | null) {
    this.tracks = [...tracks]
    this.index = index
    this.cursor = cursor

    return tracks[index]
  }

  public async start(direction: number) {
    const page = await musicModule.getRecent({ limit: 20 })
    const tracks = page.data.map(recentMusicTrack)
    const index = direction > 0 ? 0 : tracks.length - 1

    return this.select(tracks, index, page.nextCursor)
  }

  public async next(direction: number) {
    const index = this.index + direction

    while (index >= this.tracks.length && this.cursor) {
      const page = await musicModule.getRecent({ limit: 20, cursor: this.cursor })
      this.tracks.push(...page.data.map(recentMusicTrack))
      this.cursor = page.nextCursor
    }

    this.index = (index + this.tracks.length) % this.tracks.length

    return this.tracks[this.index]
  }
}
