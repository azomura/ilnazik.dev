import { createContext } from 'react'

import type { II18nContextValue } from '@/interfaces/providers/i18n'

export const I18nContext = createContext<II18nContextValue | null>(null)
