export class FontService {
  private pending: Promise<void> | null = null

  public load(): Promise<void> {
    if (this.pending) return this.pending
    if (!document.fonts) return Promise.resolve()

    const requests: Promise<FontFace>[] = []
    document.fonts.forEach(font => requests.push(font.load()))

    this.pending = Promise.allSettled(requests)
      .then(() => document.fonts.ready)
      .then(() => undefined)

    return this.pending
  }
}

export const fontService = new FontService()
