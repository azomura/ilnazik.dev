import type { LyricLineV1Dto } from '@/services/api/models/lyricLineV1Dto'

export interface ILyricCueWord {
  text: string
  time: number
  end: number
}

export interface ILyricCue {
  line: LyricLineV1Dto
  words: ILyricCueWord[]
}
