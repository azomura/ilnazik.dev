import type { IMusicState } from '@/interfaces/music/player'

export function bindMusicEvents(
  audio: HTMLAudioElement,
  update: (state: Partial<IMusicState>) => void,
  next: () => void
) {
  audio.addEventListener('play', () => update({ playing: true, error: false }))
  audio.addEventListener('pause', () => update({ playing: !audio.paused && !audio.ended }))

  audio.addEventListener('loadstart', () => update({ loading: true }))
  audio.addEventListener('waiting', () => update({ loading: true }))

  audio.addEventListener('canplay', () => update({ loading: false }))
  audio.addEventListener('playing', () => update({ loading: false, playing: true, error: false }))

  audio.addEventListener('loadedmetadata', () => {
    if (audio.paused) update({ loading: false })
  })

  audio.addEventListener('ended', next)
  audio.addEventListener('error', () => update({ loading: false, playing: false, error: true }))
}
