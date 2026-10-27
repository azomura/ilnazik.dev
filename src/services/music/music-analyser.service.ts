export class MusicAnalyserService {
  private context?: AudioContext
  private analyser?: AnalyserNode

  private transition: Promise<void> = Promise.resolve()

  private samples = new Uint8Array(512)
  private frequencies = new Uint8Array(256)

  private change(operation: () => Promise<void>) {
    const next = this.transition.catch(() => {}).then(operation)

    this.transition = next

    return next
  }

  public connect(audio: HTMLAudioElement) {
    if (!this.context) {
      this.context = new AudioContext()

      this.analyser = this.context.createAnalyser()
      this.analyser.fftSize = 512

      this.context.createMediaElementSource(audio).connect(this.analyser)
      this.analyser.connect(this.context.destination)
    }

    return this.change(async () => {
      if (this.context?.state !== 'running') await this.context?.resume()
    })
  }

  public suspend() {
    return this.change(async () => {
      if (this.context?.state === 'running') await this.context.suspend()
    })
  }

  public level() {
    if (!this.analyser) return 0

    this.analyser.getByteTimeDomainData(this.samples)

    let power = 0
    for (const sample of this.samples) power += ((sample - 128) / 128) ** 2

    this.analyser.getByteFrequencyData(this.frequencies)

    const lastBassBin = Math.min(
      this.frequencies.length - 1,
      Math.max(1, Math.floor((220 * this.analyser.fftSize) / (this.context?.sampleRate ?? 48000)))
    )

    let bass = 0
    for (let index = 1; index <= lastBassBin; index++) bass += this.frequencies[index] / 255

    const amplitude = Math.sqrt(power / this.samples.length) * 3

    return Math.min(1, amplitude * 0.65 + (bass / lastBassBin) * 0.35)
  }
}
