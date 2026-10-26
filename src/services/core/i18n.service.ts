import { languages } from '@/config/appearance'

import type { Language } from '@/interfaces/providers/i18n'

import { loadTranslations } from '@/lib/translate'

import { SettingsService } from './settings.service'

const isLanguage = (value: unknown): value is Language => {
  return languages.some(language => language.code === value)
}

export class LanguageService extends SettingsService<Language> {
  private requestedLanguage?: Language

  constructor() {
    super('app-language', 'ru', isLanguage)
  }

  public getBrowserLanguage(): Language {
    const language = typeof navigator === 'undefined' ? 'ru' : navigator.language.split('-')[0]

    return isLanguage(language) ? language : 'ru'
  }

  public setLanguage = (language: Language): void => {
    if (!isLanguage(language)) return

    this.requestedLanguage = language
    void loadTranslations(language)
      .then(() => {
        if (this.requestedLanguage === language) this.setValue(language)
      })
      .catch(error => window.reportError(error))
  }
}

export const languageService = new LanguageService()
