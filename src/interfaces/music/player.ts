export interface IMusicTrack {
  id: string
  src: string
  title: string
  artist: string
  cover: string | null
  durationMs?: number | null
}

export interface IMusicState {
  track: IMusicTrack | null
  index: number
  loading: boolean
  playing: boolean
  volume: number
  error: boolean
}
