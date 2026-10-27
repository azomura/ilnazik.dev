import { useEffect } from 'react'

export function useMusicAutoplay() {
  useEffect(() => {
    const controller = new AbortController()

    void import('@/services/music/music.service').then(({ musicService }) => {
      if (controller.signal.aborted) return

      const activate = () => {
        controller.abort()
        void musicService.play()
      }

      const options = { signal: controller.signal, passive: true }

      window.addEventListener('click', activate, options)
      window.addEventListener('keydown', activate, options)

      void musicService.audio.play().catch(() => {})
    })

    return () => controller.abort()
  }, [])
}
