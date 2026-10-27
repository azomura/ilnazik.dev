import { useEffect, useRef } from 'react'

import { musicService, MusicWaveService } from '@/services/music'

export function useMusicGlow(active: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    let frame = 0
    let last = 0
    let level = 0

    const wave = new MusicWaveService()
    const layers = element.querySelectorAll<HTMLElement>('.music-glow-wave')

    const paint = (levels: Float32Array) =>
      layers.forEach((layer, index) => {
        layer.style.transform = 'scaleY(' + (0.4 + levels[index] * 1.8) + ')'
        layer.style.opacity = String(0.3 + levels[index] * 0.7)
      })

    const reduced = matchMedia('(prefers-reduced-motion: reduce)')

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate)

      if (time - last < 50) return

      const target = musicService.analyser.level() * musicService.getSnapshot().volume
      const smoothing = 1 - Math.exp(-Math.min(time - last, 100) / (target > level ? 140 : 320))

      last = time
      level += (target - level) * smoothing

      paint(wave.sample(level))
    }

    const sync = () => {
      cancelAnimationFrame(frame)
      level = 0
      wave.reset()

      if (!active || document.hidden || reduced.matches) {
        paint(wave.sample(0))

        return
      }

      frame = requestAnimationFrame(animate)
    }

    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    sync()

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [active])

  return ref
}
