import type { accentColors } from '@/config/appearance'

export type AccentColor = (typeof accentColors)[number]

export interface IAccentContextValue {
  accent: AccentColor
  setAccent: (color: AccentColor) => void
}
