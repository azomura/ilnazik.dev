import type { languages } from '@/config/appearance'

export type Language = (typeof languages)[number]['code']
export type TranslationParams = Record<string, string | number>

export interface II18nContextValue {
  lang: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: TranslationParams) => string
}
