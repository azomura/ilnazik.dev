import { createContext } from 'react'

import type { IAccentContextValue } from '@/interfaces/providers/accent'

export const AccentContext = createContext<IAccentContextValue | null>(null)
