export class MusicAudioControlsService {
  private previousVolume = 0.7

  private audio: HTMLAudioElement
  private onVolume: (volume: number) => void

  constructor(audio: HTMLAudioElement, onVolume: (volume: number) => void) {
    this.audio = audio
    this.onVolume = onVolume
  }

  public setVolume = (volume: number) => {
    const next = Math.min(1, Math.max(0, volume))

    this.audio.volume = next
    if (next > 0) this.previousVolume = next

    this.onVolume(next)
  }

  public mute = () => this.setVolume(this.audio.volume ? 0 : this.previousVolume)

  public seek = (time: number) => {
    if (!Number.isFinite(this.audio.duration)) return

    this.audio.currentTime = Math.min(this.audio.duration, Math.max(0, time))
  }
}
