import { languages } from '@/config/appearance'

import type { Language } from '@/interfaces/providers/i18n'

import { SettingsService } from './settings.service'

const isLanguage = (value: unknown): value is Language =>
  languages.some(language => language.code === value)

export class LanguageService extends SettingsService<Language> {
  constructor() {
    super('app-language', 'ru', isLanguage)
  }

  public getBrowserLanguage(): Language {
    const language = typeof navigator === 'undefined' ? 'ru' : navigator.language.split('-')[0]
    return isLanguage(language) ? language : 'ru'
  }

  public setLanguage = (language: Language): void => {
    if (isLanguage(language)) this.setValue(language)
  }
}

export const languageService = new LanguageService()
