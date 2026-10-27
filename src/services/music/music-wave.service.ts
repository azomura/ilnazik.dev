export class MusicWaveService {
  private history = new Float32Array(25)
  private levels = new Float32Array(5)

  private head = 0

  public sample(level: number) {
    this.history[this.head] = level

    for (let index = 0; index < this.levels.length; index++) {
      const delay = (this.levels.length - 1 - index) * 6

      this.levels[index] =
        this.history[(this.head - delay + this.history.length) % this.history.length]
    }

    this.head = (this.head + 1) % this.history.length

    return this.levels
  }

  public reset() {
    this.history.fill(0)
    this.levels.fill(0)
    this.head = 0
  }
}
