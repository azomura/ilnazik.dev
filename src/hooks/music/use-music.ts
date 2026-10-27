import { useSyncExternalStore } from 'react'

import { musicService } from '@/services/music/music.service'

export function useMusic() {
  return useSyncExternalStore(musicService.subscribe, musicService.getSnapshot)
}
