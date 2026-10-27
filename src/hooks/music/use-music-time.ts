import { useEffect, useState } from 'react'

import { musicService } from '@/services/music/music.service'

export function useMusicTime(active: boolean) {
  const [time, setTime] = useState(() => musicService.audio.currentTime)

  useEffect(() => {
    if (!active) return

    const audio = musicService.audio
    const controller = new AbortController()
    const options = { signal: controller.signal }

    let timer: ReturnType<typeof setTimeout>

    const update = () => {
      clearTimeout(timer)
      setTime(audio.currentTime)

      if (audio.paused || document.hidden) return

      timer = setTimeout(update, 100)
    }

    const events = ['play', 'pause', 'seeking', 'seeked', 'loadedmetadata', 'emptied']

    events.forEach(event => audio.addEventListener(event, update, options))
    document.addEventListener('visibilitychange', update, options)

    update()

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [active])

  return time
}
