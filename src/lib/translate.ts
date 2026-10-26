import type { Language, TranslationParams } from '@/interfaces/providers/i18n'

import ru from '@/locales/ru.json'

const loaders = import.meta.glob<{ default: typeof ru }>(['../locales/*.json', '!../locales/ru.json'])
const translations = new Map<Language, typeof ru>([['ru', ru]])
const pending = new Map<Language, Promise<void>>()

export function loadTranslations(lang: Language): Promise<void> {
  if (translations.has(lang)) return Promise.resolve()
  const existing = pending.get(lang)
  if (existing) return existing

  const request = loaders[`../locales/${lang}.json`]().then(module => {
    translations.set(lang, module.default)
  }).catch(error => {
    pending.delete(lang)
    throw error
  })
  pending.set(lang, request)
  return request
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
  const value = findTranslation(translations.get(lang), key) ?? findTranslation(ru, key)

  if (typeof value !== 'string') return key

  return value.replace(/\{\{(\w+)\}\}/g, (match, name: string) => String(params?.[name] ?? match))
}
