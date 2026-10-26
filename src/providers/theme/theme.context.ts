import { createContext } from 'react'

import type { IThemeContextValue } from '@/interfaces/providers/theme'

export const ThemeContext = createContext<IThemeContextValue | null>(null)
