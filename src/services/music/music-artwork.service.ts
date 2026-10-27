import { musicModule } from '@/services/api/modules/music.module'

import type { IMusicTrack, IResolvedMusicArtwork } from '@/interfaces/music'

import type { MusicCoverV1Dto } from '@/services/api/models'

import { musicPaletteService } from './music-palette.service'

export class MusicArtworkService {
  private pending = new Map<string, Promise<MusicCoverV1Dto | null>>()
  private base = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

  public async resolve(track: IMusicTrack): Promise<IResolvedMusicArtwork> {
    if (track.cover) {
      const colors = await musicPaletteService.extract(track.cover).catch(() => null)

      if (colors) return { cover: track.cover, colors }
    }

    const artwork = await this.find(track.title, track.artist)

    if (!artwork) return { cover: track.cover, colors: musicPaletteService.fallback }

    const colors = artwork.colors.length
      ? artwork.colors
      : await musicPaletteService.extract(artwork.url).catch(() => musicPaletteService.fallback)

    return { cover: track.cover ?? artwork.url, colors }
  }

  public find(title: string, artist: string): Promise<MusicCoverV1Dto | null> {
    if (!artist) return Promise.resolve(null)

    const key = title + '\n' + artist
    const existing = this.pending.get(key)

    if (existing) return existing

    const task = musicModule
      .getCover({ title, artist })
      .then(({ data }) => (data ? { ...data, url: this.base + data.url } : null))
      .catch(() => {
        this.pending.delete(key)

        return null
      })
    this.pending.set(key, task)

    return task
  }
}

export const musicArtworkService = new MusicArtworkService()
