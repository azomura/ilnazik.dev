export class MusicPaletteService {
  public readonly fallback: string[] = []

  private pending = new Map<string, Promise<string[]>>()

  public extract(src: string): Promise<string[]> {
    const cached = this.pending.get(src)
    if (cached) return cached

    const task = this.read(src).catch(error => {
      this.pending.delete(src)

      throw error
    })

    this.pending.set(src, task)

    return task
  }

  private async read(src: string) {
    const image = new Image()

    image.crossOrigin = 'anonymous'
    image.src = src

    await image.decode()

    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 64

    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return this.fallback

    context.drawImage(image, 0, 0, 64, 64)

    const { data } = context.getImageData(0, 0, 64, 64)
    const buckets = new Map<number, { count: number; r: number; g: number; b: number }>()

    for (let index = 0; index < data.length; index += 4) {
      if (data[index + 3] < 128) continue

      const [r, g, b] = [data[index], data[index + 1], data[index + 2]]
      const key = (r >> 5) * 64 + (g >> 5) * 8 + (b >> 5)

      const bin = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 }
      bin.count++
      bin.r += r
      bin.g += g
      bin.b += b

      buckets.set(key, bin)
    }

    const palette = [...buckets.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)
      .map(
        bin =>
          '#' +
          [bin.r, bin.g, bin.b]
            .map(value =>
              Math.round(value / bin.count)
                .toString(16)
                .padStart(2, '0')
            )
            .join('')
      )

    return palette.length ? palette : this.fallback
  }
}

export const musicPaletteService = new MusicPaletteService()
