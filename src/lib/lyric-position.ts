import type { LyricLineV1Dto } from '@/services/api/models/lyricLineV1Dto'

export function lyricPosition(lines: LyricLineV1Dto[], time: number) {
  let low = 0
  let high = lines.length

  while (low < high) {
    const middle = (low + high) >>> 1

    if (lines[middle].time <= time) {
      low = middle + 1

      continue
    }

    high = middle
  }

  const current = lines[low - 1]

  if (current?.text) return { line: current, index: low - 1, countdown: 0, waiting: false }

  let next = low

  while (next < lines.length && !lines[next].text) next++

  if (next === lines.length) next = -1

  const remaining = next >= 0 ? lines[next].time - time : Infinity

  return {
    line: next >= 0 ? lines[next] : null,
    index: next,
    waiting: true,
    countdown: remaining > 0 && remaining <= 3 ? Math.ceil(remaining) : 0
  }
}
