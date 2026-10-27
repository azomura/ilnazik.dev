import type { ILyricCue, ILyricCueWord } from '@/interfaces/music/timeline'

import type { LyricLineV1Dto } from '@/services/api/models'

export function lyricFontSize(lines: LyricLineV1Dto[]) {
  const longest = lines.reduce((length, line) => Math.max(length, line.text.length), 0)

  if (longest < 20) return 28
  if (longest < 40) return 24
  if (longest < 65) return 21
  if (longest < 95) return 18
  if (longest < 140) return 16

  return 14
}

function lineWords(line: LyricLineV1Dto, end: number): ILyricCueWord[] {
  if (line.words.length) {
    return line.words.map((word, index) => ({
      ...word,
      end: Math.max(word.time + 0.05, line.words[index + 1]?.time ?? end)
    }))
  }

  const words = line.text.match(/\S+\s*/gu) ?? []
  const weights = words.map(word => Math.max(1, Array.from(word.trim()).length))
  const total = weights.reduce((sum, weight) => sum + weight, 0) || 1

  let elapsed = 0

  return words.map((text, index) => {
    const time = line.time + ((end - line.time) * elapsed) / total

    elapsed += weights[index]

    return { text, time, end: line.time + ((end - line.time) * elapsed) / total }
  })
}

export function lyricTimeline(lines: LyricLineV1Dto[], duration: number): ILyricCue[] {
  return lines.map((line, index) => ({
    line,
    words: lineWords(
      line,
      Math.max(line.time + 0.1, lines[index + 1]?.time || duration || line.time + 5)
    )
  }))
}
