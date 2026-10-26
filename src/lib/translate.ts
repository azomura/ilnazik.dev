import type { Language, TranslationParams } from '@/interfaces/providers/i18n'

import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import uk from '@/locales/uk.json'
import be from '@/locales/be.json'
import kk from '@/locales/kk.json'
import ky from '@/locales/ky.json'
import tg from '@/locales/tg.json'
import uz from '@/locales/uz.json'
import tk from '@/locales/tk.json'
import az from '@/locales/az.json'
import hy from '@/locales/hy.json'
import ro from '@/locales/ro.json'
import ka from '@/locales/ka.json'
import zh from '@/locales/zh.json'
import ja from '@/locales/ja.json'
import de from '@/locales/de.json'
import tt from '@/locales/tt.json'
import ba from '@/locales/ba.json'

const translations: Record<Language, typeof ru> = {
  ru, en, uk, be, kk, ky, tg, uz, tk, az, hy, ro, ka, zh, ja, de, tt, ba
}

function findTranslation(dictionary: unknown, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>(
      (value, part) =>
        value &&
        typeof value === 'object' &&
        part in value &&
        (value as Record<string, unknown>)[part],
      dictionary
    )
}

export function translate(lang: Language, key: string, params?: TranslationParams): string {
  const value = findTranslation(translations[lang], key) ?? findTranslation(ru, key)

  if (typeof value !== 'string') return key

  return value.replace(/\{\{(\w+)\}\}/g, (match, name: string) => String(params?.[name] ?? match))
}
