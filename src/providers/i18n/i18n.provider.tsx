import { useLayoutEffect, useMemo, useSyncExternalStore, type PropsWithChildren } from 'react'

import type { TranslationParams } from '@/interfaces/providers/i18n'

import { translate } from '@/lib/translate'

import { languageService } from '@/services/core/i18n.service'

import { I18nContext } from './i18n.context'

export function I18nProvider({ children }: PropsWithChildren) {
  const lang = useSyncExternalStore(languageService.subscribe, languageService.getSnapshot)

  useLayoutEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLanguage: languageService.setLanguage,
      t: (key: string, params?: TranslationParams) => translate(lang, key, params)
    }),
    [lang]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
