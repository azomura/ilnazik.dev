import { musicTracks } from '@/data/music'

import type { IMusicState, IMusicTrack } from '@/interfaces/music/player'

import { MusicAnalyserService } from './music-analyser.service'
import { MusicAudioControlsService } from './music-audio-controls.service'
import { bindMusicEvents } from './music-events'
import { MusicRecentService } from './music-recent.service'
import { MusicStateService } from './music-state.service'

export class MusicService extends MusicStateService {
  public readonly audio = new Audio()
  public readonly analyser = new MusicAnalyserService()

  private recent = new MusicRecentService()
  private controls = new MusicAudioControlsService(this.audio, volume => this.update({ volume }))

  public setVolume = this.controls.setVolume
  public mute = this.controls.mute
  public seek = this.controls.seek

  private playRequest = 0

  constructor() {
    super()

    this.audio.preload = 'metadata'
    this.audio.volume = this.state.volume
    this.audio.loop = true
    this.audio.src = musicTracks[0] ?? ''

    bindMusicEvents(
      this.audio,
      state => this.update(state),
      () => this.next(1, true)
    )
  }

  public async play() {
    const request = ++this.playRequest
    try {
      await this.analyser.connect(this.audio)

      if (request !== this.playRequest) return

      await this.audio.play()
    } catch {
      if (request === this.playRequest) this.update({ loading: false, playing: false, error: true })
    }
  }

  public toggle = () => {
    if (this.audio.paused) return void this.play()

    this.playRequest++
    this.audio.pause()

    void this.analyser.suspend().catch(() => {})
  }

  public next = (direction: number, autoplay = this.state.playing) => {
    const index = this.state.index + direction

    if (!this.state.track && index >= 0 && index < musicTracks.length) {
      return this.select(index, autoplay)
    }

    void this.playRecent(direction, autoplay)
  }

  private async playRecent(direction: number, autoplay: boolean) {
    const request = ++this.playRequest
    this.update({ loading: true, error: false })

    try {
      const track = this.state.track
        ? await this.recent.next(direction)
        : await this.recent.start(direction)

      if (request !== this.playRequest) return
      if (!track) return this.select(0, autoplay)

      this.load(track.src, { index: -1, track }, autoplay)
    } catch {
      if (request === this.playRequest) this.update({ loading: false, error: true })
    }
  }

  public select = (index: number, autoplay = true) => {
    if (!musicTracks[index]) return

    this.load(musicTracks[index], { index, track: null }, autoplay)
  }

  public selectRecent = (tracks: IMusicTrack[], index: number, cursor: string | null) => {
    const track = this.recent.select(tracks, index, cursor)
    if (!track) return

    this.load(track.src, { index: -1, track }, true)
  }

  private load(src: string, state: Partial<IMusicState>, autoplay: boolean) {
    this.playRequest++
    this.audio.loop = false
    this.audio.pause()
    this.audio.src = src

    this.update({ ...state, loading: true, playing: false, error: false })

    if (autoplay) void this.play()
  }
}

export const musicService = new MusicService()
