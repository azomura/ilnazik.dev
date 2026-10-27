import type { IMusicState } from '@/interfaces/music/player'

export class MusicStateService {
  private listeners = new Set<() => void>()

  protected state: IMusicState = {
    track: null,
    index: 0,
    loading: true,
    playing: false,
    volume: 0.7,
    error: false
  }

  protected update(next: Partial<IMusicState>) {
    this.state = { ...this.state, ...next }
    this.listeners.forEach(listener => listener())
  }

  public getSnapshot = () => this.state

  public subscribe = (listener: () => void) => {
    this.listeners.add(listener)

    return () => void this.listeners.delete(listener)
  }
}
