import type { IMusicTrack } from '@/interfaces/music/player'

export class MusicMetadataService {
  private pending = new Map<string, Promise<IMusicTrack>>()

  public fallback(src: string): IMusicTrack {
    const name = decodeURIComponent(src.split('/').pop() || '').replace(/\.[^.]+$/, '')

    return { id: src, src, title: name, artist: '', cover: null }
  }

  public load(src: string) {
    const existing = this.pending.get(src)
    if (existing) return existing

    const task = this.read(src).catch(() => {
      this.pending.delete(src)
      return this.fallback(src)
    })

    this.pending.set(src, task)

    return task
  }

  private async read(src: string): Promise<IMusicTrack> {
    const [{ parseFromTokenizer }, { makeTokenizer }] = await Promise.all([
      import('music-metadata'),
      import('@tokenizer/http')
    ])

    const tokenizer = await makeTokenizer(new URL(src, window.location.href).href, {
      avoidHeadRequests: true,
      abortSignal: AbortSignal.timeout(15000),
      initialChunkSize: 4096,
      minimumChunkSize: 16384
    })

    try {
      const { common, format } = await parseFromTokenizer(tokenizer, { duration: true })
      const picture =
        common.picture?.find(item => item.type === 'Cover (front)') ?? common.picture?.[0]

      const cover = picture
        ? URL.createObjectURL(new Blob([Uint8Array.from(picture.data)], { type: picture.format }))
        : null

      return {
        ...this.fallback(src),
        title: common.title?.trim() || this.fallback(src).title,
        artist: common.artists?.join(', ') || common.artist || '',
        cover,
        durationMs: format.duration ? Math.round(format.duration * 1000) : null
      }
    } finally {
      await tokenizer.close()
    }
  }
}

export const musicMetadataService = new MusicMetadataService()
